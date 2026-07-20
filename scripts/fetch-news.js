#!/usr/bin/env node
/**
 * Best-effort fetcher for the USCIS newsroom feed. Merges new headlines
 * into src/data/news.js without clobbering manually-curated entries.
 *
 * Strategy:
 *   1. Fetch the USCIS newsroom RSS / HTML index.
 *   2. Parse out (title, url, pubDate, summary) for recent items.
 *   3. Map each to one of our existing categories ("USCIS Policy",
 *      "Visa Bulletins", "Executive Orders", "Court Decisions").
 *   4. Merge into src/data/news.js, deduplicating by URL and (lower-cased)
 *      title. Curated entries always win — the script only ever appends.
 *
 * Exit codes:
 *   0  success — file updated, or no new items (idempotent)
 *   1  network error or feed unreachable (soft failure; CI logs a notice)
 *   2  parse failure (HTML / RSS structure changed)
 *
 * Usage:
 *   node scripts/fetch-news.js
 *   node scripts/fetch-news.js --dry-run        # print, don't write
 *   node scripts/fetch-news.js --max=12         # cap merged-in items
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = resolve(__dirname, '..', 'src', 'data', 'news.js');

// USCIS retired its RSS feeds: both former endpoints under /news/rss-feeds/
// now 404, and the surviving https://www.uscis.gov/rss.xml is a relic holding
// two archive items from 2013 and 2015 — worse than nothing, since merging it
// would backdate the news list. The newsroom listing page is now the source.
const NEWS_INDEX_URL = 'https://www.uscis.gov/news/all-news';
const NEWS_ORIGIN = 'https://www.uscis.gov';

function parseArgs(argv) {
  const opts = { dryRun: false, max: 8 };
  for (const arg of argv.slice(2)) {
    if (arg === '--dry-run') opts.dryRun = true;
    else if (arg.startsWith('--max=')) opts.max = Math.max(1, Number(arg.split('=')[1]) || 8);
  }
  return opts;
}

function log(...args) { console.log('[fetch-news]', ...args); }
function warn(...args) { console.warn('[fetch-news]', ...args); }

function decodeEntities(s) {
  return String(s)
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return res.text();
}

/**
 * Scrape the newsroom listing. Each entry is a `views-row` block holding a
 * title anchor, a machine-readable <time datetime>, and a body blurb:
 *
 *   <div class="views-row">
 *     <div class="views-field views-field-title">
 *       <h3 class="field-content"><a href="/newsroom/...">Title</a></h3></div>
 *     <div class="views-field views-field-field-display-date">
 *       <div class="field-content"><time datetime="2026-07-17T13:20:25Z" ...>
 *     <div class="views-field views-field-body">
 *       <div class="field-content">Summary…</div></div>
 *
 * Splitting on the row boundary keeps each record's fields from bleeding into
 * the next one, which a single global regex over the whole document would do.
 */
function parseNewsIndex(html) {
  const items = [];
  for (const chunk of html.split(/<div class="views-row/).slice(1)) {
    const link = /<h3 class="field-content"><a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/.exec(chunk);
    if (!link) continue;
    const time = /<time[^>]*datetime="([^"]+)"/.exec(chunk);
    const body = /views-field-body"[^>]*><div class="field-content">([\s\S]*?)<\/div>/.exec(chunk);
    const title = decodeEntities(link[2]);
    if (!title) continue;
    items.push({
      title,
      url: new URL(link[1], NEWS_ORIGIN).toString(),
      pubDate: time ? time[1] : '',
      summary: body ? decodeEntities(body[1]) : '',
    });
  }
  return items;
}

function categorize(title) {
  const s = title.toLowerCase();
  if (/visa bulletin|priority date|final action|adjustment of status/.test(s)) return 'Visa Bulletins';
  if (/executive order|proclamation|presidential|department of labor|prevailing wage/.test(s)) return 'Executive Orders';
  if (/court|ruling|supreme|injunction|judge|lawsuit/.test(s)) return 'Court Decisions';
  return 'USCIS Policy';
}

// Curated entries render dates as "June 16, 2026" / "16 de junio de 2026",
// not ISO. Match that, or new rows look foreign next to the existing ones.
function toDate(input) {
  const d = input ? new Date(input) : new Date();
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

function displayDate(d, locale) {
  return d.toLocaleDateString(locale, {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
}

/** Sort key: the human-readable strings above don't compare correctly. */
function sortKey(item) {
  const d = new Date(item.date);
  return Number.isNaN(d.getTime()) ? 0 : d.getTime();
}

function summarize(text, fallbackTitle, max = 280) {
  const cleaned = (text || '').trim();
  if (!cleaned) return `${fallbackTitle}.`;
  if (cleaned.length <= max) return cleaned;
  return cleaned.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}

/** `title` may be a plain string or a { en, es } object — key off English. */
function titleText(item) {
  const t = item?.title;
  if (t && typeof t === 'object') return t.en || '';
  return t || '';
}

function dedupKey(item) {
  return [
    (item.url || '').toLowerCase().replace(/[#?].*$/, '').replace(/\/$/, ''),
    titleText(item).toLowerCase().trim(),
  ].join('|');
}

/**
 * Read the existing entries.
 *
 * This used to convert the JS array literal to JSON by regex, and
 * `.replace(/(\w+)\s*:/g, '"$1":')` quoted any word followed by a colon —
 * including words *inside* string values. It rewrote curated prose:
 *   "Boletín de Visas de julio de 2026: EB-2"  ->  ...de \"2026\": EB-2
 *   "Las categorías familiares avanzaron: F1"  ->  ...familiares \"avanzaron\":
 * Every successful run would have corrupted more Spanish and English text.
 *
 * news.js is a plain ES module we own, so just import it: real objects, no
 * parser to get wrong. The cache-buster keeps repeat runs in one process
 * honest.
 */
async function loadExistingNews() {
  const src = await readFile(DATA_FILE, 'utf8');
  const mod = await import(`${pathToFileURL(DATA_FILE).href}?t=${Date.now()}`);
  if (!Array.isArray(mod.newsItems)) {
    throw new Error('news.js does not export a `newsItems` array');
  }
  // Clone so later mutation (id renumbering) can't write through to the
  // module's live objects.
  return { src, parsed: mod.newsItems.map((it) => ({ ...it })) };
}

// news.js is bilingual and hand-curated: `title` and `summary` are
// { en, es } objects and there's a separate `dateEs`. The previous serializer
// emitted a fixed flat field list, so the first successful run would have
// silently dropped dateEs from every curated entry. Emit each item's own
// fields instead, so anything we don't know about survives a round-trip.
const FIELD_ORDER = ['id', 'title', 'date', 'dateEs', 'category', 'summary', 'source', 'url'];

function emitValue(value, indent) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const inner = Object.entries(value)
      .map(([k, v]) => `${indent}  ${k}: ${JSON.stringify(v)},`)
      .join('\n');
    return `{\n${inner}\n${indent}}`;
  }
  return JSON.stringify(value);
}

function serializeItems(items) {
  const lines = ['export const newsItems = ['];
  items.forEach((it, idx) => {
    lines.push('  {');
    const keys = [
      ...FIELD_ORDER.filter((k) => it[k] !== undefined),
      ...Object.keys(it).filter((k) => !FIELD_ORDER.includes(k)),
    ];
    for (const key of keys) {
      const value = key === 'id' ? it.id : emitValue(it[key], '    ');
      lines.push(`    ${key}: ${value},`);
    }
    lines.push(`  }${idx === items.length - 1 ? '' : ','}`);
  });
  lines.push('];', '');
  return lines.join('\n');
}

async function main() {
  const opts = parseArgs(process.argv);

  let indexHtml;
  try {
    log('fetching', NEWS_INDEX_URL);
    indexHtml = await fetchText(NEWS_INDEX_URL);
  } catch (err) {
    console.error(`::error::USCIS newsroom unreachable — ${err.message}`);
    process.exit(1);
  }

  const fetched = parseNewsIndex(indexHtml);
  if (!fetched.length) {
    // The page loaded but yielded nothing, so the markup moved. Silence here
    // is what let the dead RSS feeds rot unnoticed — fail loudly instead.
    console.error(
      `::error::Fetched ${NEWS_INDEX_URL} but parsed 0 items — the newsroom ` +
      'markup has changed and parseNewsIndex needs updating.'
    );
    process.exit(2);
  }
  log(`parsed ${fetched.length} items from ${NEWS_INDEX_URL}`);

  const { src: existingSrc, parsed: existing } = await loadExistingNews();
  const seen = new Set(existing.map(dedupKey));
  const maxId = existing.reduce((m, it) => Math.max(m, Number(it.id) || 0), 0);

  const newItems = [];
  for (const raw of fetched) {
    const title = raw.title;
    const url = raw.url;
    const published = toDate(raw.pubDate);
    // Only `en` is populated: we have no translation, and inventing one by
    // putting English text under `es` would silently show English to Spanish
    // readers as though it were translated. NewsCard's pickLocalized already
    // falls back to `.en`, so an es-less entry renders correctly today and
    // can be translated in place later.
    const candidate = {
      title: { en: title },
      url,
      date: displayDate(published, 'en-US'),
      dateEs: displayDate(published, 'es-ES'),
      category: categorize(title),
      summary: { en: summarize(raw.summary, title) },
      source: 'USCIS Newsroom',
    };
    if (seen.has(dedupKey(candidate))) continue;
    seen.add(dedupKey(candidate));
    newItems.push(candidate);
    if (newItems.length >= opts.max) break;
  }

  if (!newItems.length) {
    log('No new headlines — file already up to date.');
    process.exit(0);
  }

  // Newest first: prepend new items, then existing.
  const merged = [
    ...newItems.map((it, i) => ({ id: maxId + newItems.length - i, ...it })),
    ...existing,
  ];
  // Keep ids unique & descending — re-sort by date desc, then renumber stably.
  merged.sort((a, b) => sortKey(b) - sortKey(a));
  merged.forEach((it, i) => { it.id = merged.length - i; });

  const nextSrc = serializeItems(merged);

  if (opts.dryRun) {
    log(`DRY RUN — would write ${merged.length} items (${newItems.length} new)`);
    console.log(nextSrc);
    return;
  }

  // Replace just the export-array region; preserve any trailing content
  // (none today, but be defensive).
  const startMatch = existingSrc.match(/export\s+const\s+newsItems\s*=\s*\[/);
  const start = startMatch.index;
  let depth = 0, end = -1;
  for (let i = start + startMatch[0].length - 1; i < existingSrc.length; i++) {
    const ch = existingSrc[i];
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  // Find the trailing semicolon after `]`.
  let tail = end + 1;
  while (tail < existingSrc.length && /[;\s]/.test(existingSrc[tail])) tail++;
  const before = existingSrc.slice(0, start);
  const after = existingSrc.slice(tail);
  const written = `${before}${nextSrc}${after}`.replace(/\n{3,}/g, '\n\n');
  await writeFile(DATA_FILE, written.endsWith('\n') ? written : written + '\n', 'utf8');
  log(`wrote ${merged.length} items (${newItems.length} new) to ${DATA_FILE}`);
}

main().catch((err) => {
  console.error('[fetch-news] FATAL', err);
  process.exit(2);
});
