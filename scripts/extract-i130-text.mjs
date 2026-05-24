// Pull text from the first and last page so we can read the USCIS edition
// stamp (usually bottom-left of page 1) and the OMB expiration on the back.
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const pdfjs = require('pdfjs-dist/legacy/build/pdf.mjs');

const data = new Uint8Array(readFileSync('src/i130-engine/data/uscis-i130-form.pdf'));
const doc = await pdfjs.getDocument({ data, verbosity: 0, enableXfa: true }).promise;

const pages = [];
for (let p = 1; p <= doc.numPages; p++) {
  const page = await doc.getPage(p);
  const content = await page.getTextContent();
  const text = content.items.map((it) => ('str' in it ? it.str : '')).join(' ');
  pages.push(text);
}

// Look for edition stamp markers across all pages
const all = pages.join('\n--- PAGE BREAK ---\n');
writeFileSync('src/i130-engine/data/pages.text.txt', all);

const editionMatches = [
  ...all.matchAll(/(Form\s+I-130(?:A)?[^\n]{0,40}Edition[^\n]{0,40})/gi),
];
const ombMatches = [...all.matchAll(/Expires?[^\n]{0,40}/gi)];
console.log('Edition stamps found:');
for (const m of editionMatches.slice(0, 5)) console.log(' ', m[1].trim());
console.log('\nOMB expiry mentions:');
for (const m of ombMatches.slice(0, 5)) console.log(' ', m[0].trim());

console.log('\nPage 1 first 600 chars:');
console.log(pages[0].slice(0, 600));
