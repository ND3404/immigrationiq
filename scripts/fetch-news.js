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
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = resolve(__dirname, '..', 'src', 'data', 'news.js');

const FEED_CANDIDATES = [
  'https://www.uscis.gov/news/rss-feeds/news-releases-rss-feed',
  'https://www.uscis.gov/news/rss-feeds/alerts-rss-feed',
];

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
      'User-Agent': 'ImmigrationIQ-news-bot/1.0 (+https://github.com)',
      'Accept': 'application/rss+xml, application/xml, text/xml, text/html',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return res.text();
}

function parseRss(xml) {
  const items = [];
  const itemRe = /<item\b[\s\S]*?<\/item>/gi;
  const matches = xml.match(itemRe) || [];
  for (const block of matches) {
    const title = (block.match(/<title>([\s\S]*?)<\/title>/i) || [, ''])[1];
    const link = (block.match(/<link>([\s\S]*?)<\/link>/i) || [, ''])[1];
    const pubDate = (block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i) || [, ''])[1];
    const desc = (block.match(/<description>([\s\S]*?)<\/description>/i) || [, ''])[1];
    if (!title || !link) continue;
    items.push({
      title: decodeEntities(title),
      url: decodeEntities(link),
      pubDate: pubDate.trim(),
      summary: decodeEntities(desc),
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

function isoDate(input) {
  if (!input) return new Date().toISOString().slice(0, 10);
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
}

function summarize(text, fallbackTitle, max = 280) {
  const cleaned = (text || '').trim();
  if (!cleaned) return `${fallbackTitle}.`;
  if (cleaned.length <= max) return cleaned;
  return cleaned.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}

function dedupKey(item) {
  return [
    (item.url || '').toLowerCase().replace(/[#?].*$/, '').replace(/\/$/, ''),
    (item.title || '').toLowerCase().trim(),
  ].join('|');
}

async function loadExistingNews() {
  const src = await readFile(DATA_FILE, 'utf8');
  const startMatch = src.match(/export\s+const\s+newsItems\s*=\s*\[/);
  if (!startMatch) throw new Error('Could not locate `export const newsItems` in news.js');
  const start = startMatch.index + startMatch[0].length - 1; // include `[`
  let depth = 0, end = -1;
  for (let i = start; i < src.length; i++) {
    const ch = src[i];
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  if (end === -1) throw new Error('Unterminated newsItems array');
  const arrayLiteral = src.slice(start, end + 1);
  // Convert the JS array literal into JSON (very narrow scope — only handles
  // our well-formed news.js). We trust our own file format here.
  const json = arrayLiteral
    .replace(/(\w+)\s*:/g, '"$1":')
    .replace(/'((?:[^'\\]|\\.)*)'/g, (_m, inner) => JSON.stringify(inner.replace(/\\'/g, "'")))
    .replace(/,(\s*[\]}])/g, '$1');
  const parsed = JSON.parse(json);
  return { src, parsed };
}

function serializeItems(items) {
  const lines = ['export const newsItems = ['];
  items.forEach((it, idx) => {
    lines.push('  {');
    lines.push(`    id: ${it.id},`);
    lines.push(`    title: ${JSON.stringify(it.title)},`);
    lines.push(`    date: ${JSON.stringify(it.date)},`);
    lines.push(`    category: ${JSON.stringify(it.category)},`);
    lines.push(`    summary: ${JSON.stringify(it.summary)},`);
    lines.push(`    source: ${JSON.stringify(it.source)},`);
    lines.push(`    url: ${JSON.stringify(it.url)},`);
    lines.push(`  }${idx === items.length - 1 ? '' : ','}`);
  });
  lines.push('];', '');
  return lines.join('\n');
}

async function main() {
  const opts = parseArgs(process.argv);

  let feedXml = null;
  let usedUrl = null;
  for (const url of FEED_CANDIDATES) {
    try {
      log('fetching', url);
      feedXml = await fetchText(url);
      usedUrl = url;
      break;
    } catch (err) {
      warn(`failed: ${err.message}`);
    }
  }
  if (!feedXml) {
    warn('No USCIS feed reachable — exiting cleanly with no changes.');
    process.exit(1);
  }

  let fetched;
  try {
    fetched = parseRss(feedXml);
  } catch (err) {
    warn(`parse error: ${err.message}`);
    process.exit(2);
  }

  if (!fetched.length) {
    log('Feed parsed but contained no <item> entries — exiting clean.');
    process.exit(0);
  }
  log(`parsed ${fetched.length} items from ${usedUrl}`);

  const { src: existingSrc, parsed: existing } = await loadExistingNews();
  const seen = new Set(existing.map(dedupKey));
  const maxId = existing.reduce((m, it) => Math.max(m, Number(it.id) || 0), 0);

  const newItems = [];
  for (const raw of fetched) {
    const title = raw.title;
    const url = raw.url;
    const candidate = {
      title,
      url,
      date: isoDate(raw.pubDate),
      category: categorize(title),
      summary: summarize(raw.summary, title),
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
  merged.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
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
