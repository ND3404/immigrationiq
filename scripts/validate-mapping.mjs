// Build-time validator for src/i130-engine/mapping/fieldMapping.json.
// Confirms that every PDF field name referenced in the mapping is a known
// leaf in src/i130-engine/data/fields.raw.json. Run automatically by
// Session 5 (PDF filler) at build time, but useful right now as a sanity
// check that Session 1 architecture is internally consistent.
import { readFileSync } from 'node:fs';

const dump = JSON.parse(readFileSync('src/i130-engine/data/fields.raw.json', 'utf8'));
const mapping = JSON.parse(readFileSync('src/i130-engine/mapping/fieldMapping.json', 'utf8'));

const fullByLeaf = new Map();
for (const f of dump) {
  const leaf = f.name.split('.').slice(-1)[0];
  if (!fullByLeaf.has(leaf)) fullByLeaf.set(leaf, []);
  fullByLeaf.get(leaf).push(f.name);
}

const refs = new Set();
for (const [k, v] of Object.entries(mapping.mappings)) {
  if (k.startsWith('__TODO_')) continue;
  if (v.field) refs.add(v.field);
  if (v.fields) for (const f of v.fields) refs.add(f);
  if (v.options) for (const o of Object.values(v.options)) if (o.check) refs.add(o.check);
  if (v.alsoCheck) for (const f of Object.keys(v.alsoCheck)) refs.add(f);
}

const missing = [];
const ambiguous = [];
for (const r of refs) {
  const hits = fullByLeaf.get(r);
  if (!hits) missing.push(r);
  else if (hits.length > 1) ambiguous.push([r, hits]);
}

console.log(`Mapping references: ${refs.size} PDF fields`);
console.log(`Missing (no such field in PDF): ${missing.length}`);
for (const m of missing) console.log('  -', m);
console.log(`Ambiguous (multiple matches): ${ambiguous.length}`);
for (const [r, hits] of ambiguous) {
  console.log('  -', r);
  for (const h of hits) console.log('       ', h);
}

if (missing.length || ambiguous.length) {
  process.exitCode = 1;
} else {
  console.log('OK — every mapping reference resolves uniquely.');
}
