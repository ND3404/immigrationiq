#!/usr/bin/env node
/**
 * Fetches the next U.S. Department of State Visa Bulletin and updates
 * src/data/visaBulletin.js in place. Designed to run inside CI (GitHub
 * Actions) on a monthly cron and open a PR with the new data.
 *
 * Usage:
 *   node scripts/update-visa-bulletin.mjs              # next calendar month
 *   node scripts/update-visa-bulletin.mjs --month=may --year=2026
 *   node scripts/update-visa-bulletin.mjs --dry-run    # don't write file
 *
 * Exit codes:
 *   0  file updated (or no changes needed when bulletin already present)
 *   1  bulletin not yet published / fetch failed
 *   2  parsing failed (HTML structure changed)
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = resolve(__dirname, '..', 'src', 'data', 'visaBulletin.js');

const MONTH_NAMES = ['january','february','march','april','may','june','july','august','september','october','november','december'];

const FAMILY_KEY_MAP = {
  'F1': 'F1', 'F2A': 'F2A', 'F2B': 'F2B', 'F3': 'F3', 'F4': 'F4',
};

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

function targetMonth(opts) {
  if (opts.month && opts.year) return { month: opts.month, year: opts.year };
  // Default: next calendar month relative to today (UTC).
  const now = new Date();
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
  return { month: MONTH_NAMES[next.getUTCMonth()], year: next.getUTCFullYear() };
}

function bulletinUrl(month, year) {
  return `https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin/${year}/visa-bulletin-for-${month}-${year}.html`;
}

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'ImmigrationIQ-bot/1.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return await res.text();
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

// Locate each section's table by walking the doc looking for section headings.
// Headings on travel.state.gov use &nbsp; between words, so normalize first.
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

    // First 5 value-shaped cells become [all, china, india, mexico, philippines].
    const valueCells = vals.filter(v => VALUE_RE.test(v.trim().toUpperCase())).slice(0, 5);
    if (valueCells.length !== 5) continue;
    const [all, china, india, mexico, philippines] = valueCells.map(v => v.trim().toUpperCase());
    data[key] = { all, china, india, mexico, philippines };
  }
  return Object.keys(data).length ? data : null;
}

function formatRow(key, row, padKey) {
  const padVal = (v) => `'${v}'`.padEnd(10);
  const k = `${key}:`.padEnd(padKey + 1);
  return `      ${k} { all: ${padVal(row.all)}, china: ${padVal(row.china)}, india: ${padVal(row.india)}, mexico: ${padVal(row.mexico)}, philippines: '${row.philippines}' },`;
}

function formatBlock(label, data, orderedKeys) {
  const padKey = Math.max(...orderedKeys.map(k => k.length));
  const rows = orderedKeys
    .filter((k) => data[k])
    .map((k) => formatRow(k, data[k], padKey))
    .join('\n');
  return `    ${label}: {\n${rows}\n    },`;
}

function buildBulletinObject({ month, year, parsed, monthCapitalized, monthLower }) {
  const FAMILY_ORDER = ['F1','F2A','F2B','F3','F4'];
  const EMP_ORDER = ['EB1','EB2','EB3','EB3_OTHER','EB4','EB4_RELIGIOUS','EB5_UNRESERVED','EB5_RURAL','EB5_HIGH_UNEMP','EB5_INFRA'];
  const today = new Date().toISOString().slice(0, 10);
  return `// ────────────────────────────────────────────────────────────────────────────
// ${monthCapitalized.toUpperCase()} ${year} — auto-generated by scripts/update-visa-bulletin.mjs
// ────────────────────────────────────────────────────────────────────────────
export const visaBulletin${monthCapitalized}${year} = {
  month: '${monthCapitalized}',
  year: ${year},
  label: '${monthCapitalized} ${year}',
  publishedDate: '${today}',
  sourceUrl: '${bulletinUrl(monthLower, year)}',
  // NOTE: USCIS designation is not in the bulletin HTML itself. Verify at
  // https://www.uscis.gov/visabulletininfo and adjust this block if needed.
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

async function updateDataFile({ monthCapitalized, year, monthLower, bulletinBlock }) {
  const original = await readFile(DATA_FILE, 'utf8');
  const constName = `visaBulletin${monthCapitalized}${year}`;
  if (original.includes(`export const ${constName} =`)) {
    console.log(`[update-visa-bulletin] ${constName} already present — no changes.`);
    return false;
  }
  // Find the previous "current" by scanning the existing file's
  // `currentVisaBulletin = visaBulletinXxxYYYY;` line.
  const prevCurrentMatch = /export const currentVisaBulletin = (visaBulletin[A-Za-z]+\d{4});/.exec(original);
  if (!prevCurrentMatch) throw new Error('Could not find existing currentVisaBulletin export.');
  const prevCurrentName = prevCurrentMatch[1];

  // Insert the new block immediately before the previous current bulletin's section comment.
  const insertAnchor = `// ────────────────────────────────────────────────────────────────────────────\n// ${prevCurrentName.replace('visaBulletin', '').replace(/(\d{4})$/, ' $1').toUpperCase()}`;
  let updated;
  if (original.includes(insertAnchor)) {
    updated = original.replace(insertAnchor, `${bulletinBlock}\n${insertAnchor}`);
  } else {
    // Fallback: insert before the history export.
    updated = original.replace(/\/\/ Newest first\./, `${bulletinBlock}\n// Newest first.`);
  }

  // Update the trailing exports.
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
  console.log(`[update-visa-bulletin] Wrote ${constName} to ${DATA_FILE}`);
  return true;
}

async function main() {
  const opts = parseArgs(process.argv);
  const { month, year } = targetMonth(opts);
  const monthLower = month.toLowerCase();
  const monthCapitalized = monthLower.charAt(0).toUpperCase() + monthLower.slice(1);
  const url = bulletinUrl(monthLower, year);
  console.log(`[update-visa-bulletin] Fetching ${url}`);

  let html;
  try {
    html = await fetchHtml(url);
  } catch (err) {
    console.error(`[update-visa-bulletin] ${err.message}`);
    console.error('[update-visa-bulletin] Bulletin not yet published or unreachable.');
    process.exit(1);
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
    console.error(`[update-visa-bulletin] Failed to parse sections: ${missing.join(', ')}`);
    console.error('[update-visa-bulletin] State Dept HTML structure may have changed.');
    process.exit(2);
  }

  const block = buildBulletinObject({ month, year, parsed, monthCapitalized, monthLower });

  if (opts.dryRun) {
    console.log('---- DRY RUN OUTPUT ----');
    console.log(block);
    return;
  }
  const wrote = await updateDataFile({ monthCapitalized, year, monthLower, bulletinBlock: block });
  if (!wrote) process.exit(0);
}

main().catch((err) => {
  console.error('[update-visa-bulletin] Unhandled error:', err);
  process.exit(2);
});
