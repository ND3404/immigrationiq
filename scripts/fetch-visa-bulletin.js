#!/usr/bin/env node
/**
 * Fetch the latest U.S. Department of State Visa Bulletin and update
 * src/data/visaBulletin.js in place. Designed to run unattended in CI:
 *
 *   - Auto-detects the latest available bulletin (tries next month, falls
 *     back to current month).
 *   - Adds the parsed bulletin as the new `currentVisaBulletin`, demoting
 *     the previous current to `previousVisaBulletin`, and prepends it to
 *     `visaBulletinHistory`.
 *   - Idempotent: exits cleanly with code 0 if the bulletin is already
 *     in the file.
 *
 * Usage:
 *   node scripts/fetch-visa-bulletin.js                  # auto-detect
 *   node scripts/fetch-visa-bulletin.js --month=may --year=2026
 *   node scripts/fetch-visa-bulletin.js --dry-run        # print, don't write
 *
 * Exit codes:
 *   0  success — file updated, already current, or not yet published (404)
 *   1  hard failure — blocked (403), server error, or network failure
 *   2  parsing failed (HTML structure changed)
 *
 * Only a 404 means "not yet published". Anything else (notably the 403 that
 * Akamai returns when it decides the caller is a bot) is a real failure and
 * must exit non-zero — otherwise CI reports success over stale data, which is
 * exactly what happened silently through July 2026.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = resolve(__dirname, '..', 'src', 'data', 'visaBulletin.js');

const MONTH_NAMES = [
  'january','february','march','april','may','june',
  'july','august','september','october','november','december',
];

const FAMILY_KEY_MAP = { F1: 'F1', F2A: 'F2A', F2B: 'F2B', F3: 'F3', F4: 'F4' };

function normalizeEbCategory(text) {
  const s = text.trim().toLowerCase().replace(/\s+/g, ' ');
  if (/^1st\b/.test(s)) return 'EB1';
  if (/^2nd\b/.test(s)) return 'EB2';
  if (/^3rd\b/.test(s)) return 'EB3';
  if (s.startsWith('other workers')) return 'EB3_OTHER';
  if (/^4th\b/.test(s)) return 'EB4';
  if (s.startsWith('certain religious workers')) return 'EB4_RELIGIOUS';
  if (/^5th\b.*unreserved/.test(s)) return 'EB5_UNRESERVED';
  if (s.includes('rural')) return 'EB5_RURAL';
  if (s.includes('high unemployment')) return 'EB5_HIGH_UNEMP';
  if (s.includes('infrastructure')) return 'EB5_INFRA';
  return null;
}

function parseArgs(argv) {
  const opts = { dryRun: false };
  for (const arg of argv.slice(2)) {
    if (arg === '--dry-run') opts.dryRun = true;
    else if (arg.startsWith('--month=')) opts.month = arg.split('=')[1].toLowerCase();
    else if (arg.startsWith('--year=')) opts.year = Number(arg.split('=')[1]);
  }
  return opts;
}

function bulletinUrl(monthLower, year) {
  return `https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin/${year}/visa-bulletin-for-${monthLower}-${year}.html`;
}

function offsetMonth(date, deltaMonths) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + deltaMonths, 1));
}

/** Build candidate (month, year) tuples in priority order. */
function candidateMonths(opts) {
  if (opts.month && opts.year) {
    return [{ month: opts.month, year: opts.year }];
  }
  const now = new Date();
  // The DoS publishes M+1's bulletin around the 8th–15th of M.
  // So the most-likely target is `next month`, falling back to `this month`.
  const next = offsetMonth(now, 1);
  const cur  = offsetMonth(now, 0);
  return [
    { month: MONTH_NAMES[next.getUTCMonth()], year: next.getUTCFullYear() },
    { month: MONTH_NAMES[cur.getUTCMonth()],  year: cur.getUTCFullYear()  },
  ];
}

// travel.state.gov (and uscis.gov) sit behind Cloudflare/Akamai, which serve a
// 403 challenge to cloud egress like GitHub Actions runners regardless of
// headers, TLS, or a real headless browser — the block is IP reputation. So we
// don't fetch the origin directly anymore; we go through a residential proxy
// (ScraperAPI) and fall back to the Wayback Machine. This UA is still used for
// the proxy/archive requests.
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36';

const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY;

/**
 * Low-level GET returning { status, text }. Transport failures (DNS/TLS/
 * timeout) throw a 'network' error; HTTP status interpretation is left to
 * callers. undici handles Accept-Encoding and decompression itself, so
 * response.text() is always decoded.
 */
async function httpGet(url) {
  let res;
  try {
    res = await fetch(url, { headers: { 'User-Agent': USER_AGENT }, redirect: 'follow' });
  } catch (cause) {
    throw Object.assign(new Error(`network failure: ${cause.message}`), { kind: 'network', cause });
  }
  return { status: res.status, text: await res.text() };
}

/**
 * PRIMARY path: travel.state.gov through the ScraperAPI proxy, which egresses
 * from a residential IP Cloudflare doesn't challenge. ScraperAPI passes the
 * upstream status through, so a 404 here means the month genuinely isn't
 * published yet — surfaced as 'notfound' so the candidate loop advances to the
 * next month. Any other non-200 (including ScraperAPI's own 401/403/429/500
 * for a bad key or exhausted quota) is 'blocked', so the caller falls back to
 * Wayback rather than mistaking an outage for "unpublished".
 */
async function fetchViaScraperApi(targetUrl) {
  if (!SCRAPER_API_KEY) {
    throw Object.assign(new Error('SCRAPER_API_KEY not set'), { kind: 'blocked' });
  }
  const proxied = `http://api.scraperapi.com/?api_key=${SCRAPER_API_KEY}&url=${encodeURIComponent(targetUrl)}`;
  const { status, text } = await httpGet(proxied);
  if (status === 404) throw Object.assign(new Error('HTTP 404 via ScraperAPI'), { kind: 'notfound', status });
  if (status !== 200) throw Object.assign(new Error(`HTTP ${status} via ScraperAPI`), { kind: 'blocked', status });
  return text;
}

/** Wayback capture timestamp 20260714171833 -> ISO date 2026-07-14. */
function waybackTsToIsoDate(ts) {
  const m = /^(\d{4})(\d{2})(\d{2})/.exec(String(ts));
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

/**
 * FALLBACK path: the newest 200 snapshot of the target in the Wayback Machine.
 * Good for backfilling history and for covering a proxy outage, but it lags the
 * State Dept by days and only holds months the Archive crawled before
 * Cloudflare began blocking its crawler too — so it can legitimately have
 * nothing for the current month, which surfaces as 'notfound'.
 *
 * Returns { html, capturedAt } where capturedAt is the snapshot's ISO date.
 * The `id_` snapshot form returns the original archived bytes with no Wayback
 * toolbar injected, so the existing parser works on it unchanged.
 */
async function fetchViaWayback(targetUrl) {
  const cdxUrl =
    `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(targetUrl)}` +
    '&filter=statuscode:200&limit=-1&output=json';
  const cdx = await httpGet(cdxUrl);
  if (cdx.status !== 200) {
    throw Object.assign(new Error(`Wayback CDX HTTP ${cdx.status}`), { kind: 'blocked', status: cdx.status });
  }
  let rows;
  try { rows = JSON.parse(cdx.text); } catch { rows = []; }
  // rows[0] is the column header; captures are rows[1..], oldest→newest, so the
  // last row is the most recent 200. limit=-1 already narrows it, but reading
  // the last row is correct either way.
  if (!Array.isArray(rows) || rows.length < 2) {
    throw Object.assign(new Error('no 200 capture in Wayback'), { kind: 'notfound' });
  }
  const tsIdx = rows[0].indexOf('timestamp');
  const timestamp = rows[rows.length - 1][tsIdx >= 0 ? tsIdx : 1];
  const snapUrl = `https://web.archive.org/web/${timestamp}id_/${targetUrl}`;
  const snap = await httpGet(snapUrl);
  if (snap.status !== 200) {
    throw Object.assign(new Error(`Wayback snapshot HTTP ${snap.status}`), { kind: 'blocked', status: snap.status });
  }
  return { html: snap.text, capturedAt: waybackTsToIsoDate(timestamp) };
}

/**
 * Orchestrates PRIMARY → FALLBACK and reports which path won. Returns
 * { html, source, capturedAt }. Propagates 'notfound' from the proxy so the
 * candidate loop can try the next month; only reaches Wayback when the proxy
 * hits a real error (not a 404).
 */
async function fetchBulletin(targetUrl) {
  try {
    const html = await fetchViaScraperApi(targetUrl);
    console.log('[fetch-visa-bulletin]   ✓ fetched via ScraperAPI (primary)');
    return { html, source: 'scraperapi', capturedAt: null };
  } catch (err) {
    if (err.kind === 'notfound') throw err;
    console.log(`[fetch-visa-bulletin]   ScraperAPI unavailable (${err.message}) — falling back to Wayback`);
  }
  const { html, capturedAt } = await fetchViaWayback(targetUrl);
  console.log(`[fetch-visa-bulletin]   ✓ fetched via Wayback Machine (fallback), capture ${capturedAt}`);
  return { html, source: 'wayback', capturedAt };
}

// ── HTML helpers ────────────────────────────────────────────────────────────
function stripTags(html) {
  return html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
}
function splitRows(tableHtml) {
  return [...tableHtml.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map(m => m[1]);
}
function splitCells(rowHtml) {
  return [...rowHtml.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(m => stripTags(m[1]));
}

function findTablesBySection(rawHtml) {
  const html = rawHtml.replace(/&nbsp;/g, ' ');
  const sections = {
    familyFinal:      /FINAL\s+ACTION\s+DATES\s+FOR\s+FAMILY-SPONSORED/i,
    familyFiling:     /DATES\s+FOR\s+FILING\s+FAMILY-SPONSORED/i,
    employmentFinal:  /FINAL\s+ACTION\s+DATES\s+FOR\s+EMPLOYMENT-BASED/i,
    employmentFiling: /DATES\s+FOR\s+FILING\s+OF\s+EMPLOYMENT-BASED/i,
  };
  const out = {};
  for (const [key, regex] of Object.entries(sections)) {
    const headingMatch = regex.exec(html);
    if (!headingMatch) continue;
    const after = html.slice(headingMatch.index);
    const tableMatch = /<table[\s\S]*?<\/table>/i.exec(after);
    if (tableMatch) out[key] = tableMatch[0];
  }
  return out;
}

const VALUE_RE = /^(C|U|\d{2}[A-Z]{3}\d{2})$/;

function parseTable(tableHtml, kind /* 'family' | 'employment' */) {
  if (!tableHtml) return null;
  const rows = splitRows(tableHtml);
  const data = {};
  for (const rowHtml of rows) {
    const cells = splitCells(rowHtml);
    if (cells.length < 6) continue;
    const [catText, ...vals] = cells;
    let key = null;
    if (kind === 'family') key = FAMILY_KEY_MAP[catText.trim().toUpperCase()];
    else key = normalizeEbCategory(catText);
    if (!key) continue;
    const valueCells = vals.filter(v => VALUE_RE.test(v.trim().toUpperCase())).slice(0, 5);
    if (valueCells.length !== 5) continue;
    const [all, china, india, mexico, philippines] = valueCells.map(v => v.trim().toUpperCase());
    data[key] = { all, china, india, mexico, philippines };
  }
  return Object.keys(data).length ? data : null;
}

// ── Code-emit helpers ───────────────────────────────────────────────────────
function formatRow(key, row, padKey) {
  const padVal = (v) => `'${v}'`.padEnd(10);
  const k = `${key}:`.padEnd(padKey + 1);
  return `      ${k} { all: ${padVal(row.all)}, china: ${padVal(row.china)}, india: ${padVal(row.india)}, mexico: ${padVal(row.mexico)}, philippines: '${row.philippines}' },`;
}

function formatBlock(label, data, orderedKeys) {
  const padKey = Math.max(...orderedKeys.map(k => k.length));
  const rows = orderedKeys.filter(k => data[k]).map(k => formatRow(k, data[k], padKey)).join('\n');
  return `    ${label}: {\n${rows}\n    },`;
}

function buildBulletinObject({ year, parsed, monthCapitalized, monthLower, source, capturedAt }) {
  const FAMILY_ORDER = ['F1','F2A','F2B','F3','F4'];
  const EMP_ORDER = ['EB1','EB2','EB3','EB3_OTHER','EB4','EB4_RELIGIOUS','EB5_UNRESERVED','EB5_RURAL','EB5_HIGH_UNEMP','EB5_INFRA'];
  const today = new Date().toISOString().slice(0, 10);
  const fetchedAt = new Date().toISOString();
  // waybackCaptureDate only when the data came from the archive — it drives the
  // "Data as of …" note the UI shows when a capture is more than 3 days old.
  const waybackLine = source === 'wayback' && capturedAt
    ? `\n  waybackCaptureDate: '${capturedAt}',`
    : '';
  return `// ────────────────────────────────────────────────────────────────────────────
// ${monthCapitalized.toUpperCase()} ${year} — auto-generated by scripts/fetch-visa-bulletin.js
// ────────────────────────────────────────────────────────────────────────────
export const visaBulletin${monthCapitalized}${year} = {
  month: '${monthCapitalized}',
  year: ${year},
  label: '${monthCapitalized} ${year}',
  publishedDate: '${today}',
  // Provenance of this fetch: 'scraperapi' (live proxy) or 'wayback' (archive).
  fetchSource: '${source}',
  fetchedAt: '${fetchedAt}',${waybackLine}
  sourceUrl: '${bulletinUrl(monthLower, year)}',
  // NOTE: USCIS adjustment-of-status filing chart designation is NOT part of
  // the bulletin HTML. Verify at https://www.uscis.gov/visabulletininfo and
  // adjust this block by hand if it differs from the conservative defaults.
  uscisFilingChart: {
    family: 'datesForFiling',
    employment: 'finalActionDates',
  },
  family: {
${formatBlock('finalActionDates', parsed.familyFinal, FAMILY_ORDER)}
${formatBlock('datesForFiling',    parsed.familyFiling, FAMILY_ORDER)}
  },
  employment: {
${formatBlock('finalActionDates', parsed.employmentFinal, EMP_ORDER)}
${formatBlock('datesForFiling',    parsed.employmentFiling, EMP_ORDER)}
  },
};
`;
}

async function updateDataFile({ monthCapitalized, year, bulletinBlock }) {
  const original = await readFile(DATA_FILE, 'utf8');
  const constName = `visaBulletin${monthCapitalized}${year}`;
  if (original.includes(`export const ${constName} =`)) {
    console.log(`[fetch-visa-bulletin] ${constName} already present — no changes.`);
    return false;
  }
  const prevCurrentMatch = /export const currentVisaBulletin = (visaBulletin[A-Za-z]+\d{4});/.exec(original);
  if (!prevCurrentMatch) throw new Error('Could not find existing currentVisaBulletin export.');
  const prevCurrentName = prevCurrentMatch[1];

  const insertAnchor = `// ────────────────────────────────────────────────────────────────────────────\n// ${prevCurrentName.replace('visaBulletin', '').replace(/(\d{4})$/, ' $1').toUpperCase()}`;
  let updated = original.includes(insertAnchor)
    ? original.replace(insertAnchor, `${bulletinBlock}\n${insertAnchor}`)
    : original.replace(/\/\/ Newest first\./, `${bulletinBlock}\n// Newest first.`);

  updated = updated.replace(
    /export const visaBulletinHistory = \[[^\]]*\];/,
    `export const visaBulletinHistory = [${constName}, ${prevCurrentName}];`
  );
  updated = updated.replace(
    /export const currentVisaBulletin = visaBulletin[A-Za-z]+\d{4};/,
    `export const currentVisaBulletin = ${constName};`
  );
  updated = updated.replace(
    /export const previousVisaBulletin = visaBulletin[A-Za-z]+\d{4};/,
    `export const previousVisaBulletin = ${prevCurrentName};`
  );

  await writeFile(DATA_FILE, updated, 'utf8');
  console.log(`[fetch-visa-bulletin] Wrote ${constName} to ${DATA_FILE}`);
  return true;
}

async function main() {
  const opts = parseArgs(process.argv);
  const candidates = candidateMonths(opts);

  let html, monthLower, year, fetchSource, waybackCaptureDate;
  let sawHardFailure = false;
  let lastHardError = null;
  for (const c of candidates) {
    const url = bulletinUrl(c.month, c.year);
    console.log(`[fetch-visa-bulletin] Trying ${url}`);
    try {
      const result = await fetchBulletin(url);
      html = result.html;
      fetchSource = result.source;
      waybackCaptureDate = result.capturedAt;
      monthLower = c.month;
      year = c.year;
      console.log(`[fetch-visa-bulletin] Found bulletin for ${monthLower} ${year} (source: ${fetchSource})`);
      break;
    } catch (err) {
      if (err.kind === 'notfound') {
        console.log('[fetch-visa-bulletin]   not published / not archived — trying next candidate');
        continue;
      }
      // Both the proxy AND Wayback failed for this month — a deeper outage.
      // Keep trying remaining candidates (e.g. next-month proxy down but the
      // current month is archived), and hard-fail only if none resolve.
      sawHardFailure = true;
      lastHardError = err;
      console.error(`::error::All fetch paths failed for ${url} — ${err.message}`);
    }
  }
  if (!html) {
    if (sawHardFailure) {
      const tried = candidates.map((c) => `${c.month} ${c.year}`).join(', ');
      console.error(
        `::error::Could not fetch any candidate bulletin via ScraperAPI or Wayback ` +
        `(tried, in order: ${tried}). Last error: ${lastHardError?.message}. ` +
        'This is NOT "not yet published" — both the proxy and the archive are failing.'
      );
      return 1;
    }
    console.log('::notice::Bulletin not yet published (no candidate is live at the proxy or archived); will retry.');
    return 0;
  }

  const tables = findTablesBySection(html);
  const parsed = {
    familyFinal:      parseTable(tables.familyFinal, 'family'),
    familyFiling:     parseTable(tables.familyFiling, 'family'),
    employmentFinal:  parseTable(tables.employmentFinal, 'employment'),
    employmentFiling: parseTable(tables.employmentFiling, 'employment'),
  };
  const missing = Object.entries(parsed).filter(([, v]) => !v).map(([k]) => k);
  if (missing.length) {
    console.error(`[fetch-visa-bulletin] Failed to parse sections: ${missing.join(', ')}`);
    console.error('::error::State Dept HTML structure may have changed.');
    return 2;
  }

  const monthCapitalized = monthLower.charAt(0).toUpperCase() + monthLower.slice(1);
  const block = buildBulletinObject({
    year, parsed, monthCapitalized, monthLower,
    source: fetchSource, capturedAt: waybackCaptureDate,
  });

  if (opts.dryRun) {
    console.log('---- DRY RUN OUTPUT ----');
    console.log(block);
    return 0;
  }
  await updateDataFile({ monthCapitalized, year, bulletinBlock: block });
  return 0;
}

// Set `exitCode` rather than calling process.exit(): a hard exit while undici
// still holds keep-alive sockets trips a libuv assertion on Windows and
// reports a bogus 127. Letting Node drain gives the correct code everywhere.
main()
  .then((code) => { process.exitCode = code ?? 0; })
  .catch((err) => {
    console.error(`::error::fetch-visa-bulletin unhandled error: ${err?.stack || err}`);
    process.exitCode = 2;
  });
