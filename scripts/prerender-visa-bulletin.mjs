#!/usr/bin/env node
/**
 * Post-build prerender for the /visa-bulletin route.
 *
 * The site is a client-rendered SPA, so per-page OG/Twitter tags set by
 * react-helmet-async only exist after JavaScript runs. Non-JS social crawlers
 * (WhatsApp, Facebook, LinkedIn, iMessage, Slack, X) never run that JS, so they
 * only ever see the static index.html — the generic site card, not the bulletin.
 *
 * This copies the built dist/index.html to dist/visa-bulletin/index.html with
 * the head meta swapped for the current bulletin's tags baked in. Vercel serves
 * that static file at /visa-bulletin (static files match before the SPA
 * rewrite), so crawlers get correct tags with zero JS.
 *
 * Runs as part of `npm run build`, reading currentVisaBulletin, so every deploy
 * regenerates it for whatever month is current — no manual step.
 *
 * No new dependencies; reuses the same visaBulletinShare util the Share button
 * uses, so the baked tags and the share payload can never drift.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { currentVisaBulletin } from '../src/data/visaBulletin.js';
import { buildBulletinShare } from '../src/utils/visaBulletinShare.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '..', 'dist');

// Crawlers read a single static file, so bake the English payload (the site's
// primary language); the client helmet still localizes once JS runs.
const share = buildBulletinShare(currentVisaBulletin, 'en');
const pageTitle = `${share.title} | ImmigrationIQ`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const META_BLOCK = `    <title>${esc(pageTitle)}</title>
    <meta name="description" content="${esc(share.text)}" />
    <link rel="canonical" href="${esc(share.url)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="ImmigrationIQ" />
    <meta property="og:title" content="${esc(share.title)}" />
    <meta property="og:description" content="${esc(share.text)}" />
    <meta property="og:url" content="${esc(share.url)}" />
    <meta property="og:image" content="${esc(share.image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(share.title)}" />
    <meta name="twitter:description" content="${esc(share.text)}" />
    <meta name="twitter:image" content="${esc(share.image)}" />`;

async function main() {
  const indexPath = resolve(DIST, 'index.html');
  let html = await readFile(indexPath, 'utf8');

  // Strip the tags we're about to replace so we don't emit duplicates that a
  // crawler might read in the wrong order.
  html = html
    .replace(/[ \t]*<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/[ \t]*<meta\s+name="description"[^>]*>\s*/i, '')
    .replace(/[ \t]*<link\s+rel="canonical"[^>]*>\s*/i, '')
    .replace(/[ \t]*<meta\s+property="og:[^"]*"[^>]*>\s*/gi, '')
    .replace(/[ \t]*<meta\s+name="twitter:[^"]*"[^>]*>\s*/gi, '');

  if (!html.includes('</head>')) throw new Error('dist/index.html has no </head>; cannot inject meta.');
  html = html.replace('</head>', `${META_BLOCK}\n  </head>`);

  const outDir = resolve(DIST, 'visa-bulletin');
  await mkdir(outDir, { recursive: true });
  await writeFile(resolve(outDir, 'index.html'), html, 'utf8');

  console.log(`[prerender] Wrote dist/visa-bulletin/index.html for "${share.title}"`);
}

main().catch((err) => {
  console.error('[prerender] FAILED:', err);
  process.exit(1);
});
