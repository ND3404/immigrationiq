#!/usr/bin/env node
/**
 * Staleness alarm for the Visa Bulletin data.
 *
 * Runs BEFORE the fetch so that a fetcher which has been failing for any
 * reason — bot-blocking, a moved endpoint, an expired cert — surfaces as a
 * red run on its own, without depending on the fetcher correctly reporting
 * its own failure. Fix 1 makes the fetcher honest; this is the backstop for
 * when it isn't.
 *
 * The Department of State publishes each month's bulletin between roughly
 * the 9th and 16th of the preceding month, so healthy data is never much
 * more than ~35 days old. 40 days gives one full publish cycle of slack:
 * we learn within ~10 days of a missed cycle instead of ~40+.
 *
 * Usage:
 *   node scripts/check-bulletin-freshness.js
 *   node scripts/check-bulletin-freshness.js --max-age-days=60
 *   node scripts/check-bulletin-freshness.js --warn-only
 *
 * --warn-only downgrades staleness to a ::warning:: and exits 0. The workflow
 * uses it for the pre-fetch report and the enforcing form afterwards. If the
 * pre-fetch check aborted the job, stale data could never self-heal: the run
 * would die before attempting the fetch that would fix it, staying red and
 * stale forever even once the underlying block cleared.
 *
 * Exit codes:
 *   0  data is fresh (or stale under --warn-only)
 *   1  data is stale, or publishedDate is missing/unparseable
 */

import { currentVisaBulletin } from '../src/data/visaBulletin.js';

const DEFAULT_MAX_AGE_DAYS = 40;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function parseMaxAge(argv) {
  const arg = argv.slice(2).find((a) => a.startsWith('--max-age-days='));
  if (!arg) return DEFAULT_MAX_AGE_DAYS;
  const n = Number(arg.split('=')[1]);
  if (!Number.isFinite(n) || n <= 0) {
    console.error(`::error::Invalid --max-age-days value: ${arg.split('=')[1]}`);
    process.exit(1);
  }
  return n;
}

const maxAgeDays = parseMaxAge(process.argv);
const warnOnly = process.argv.slice(2).includes('--warn-only');
const label = currentVisaBulletin?.label ?? '(unlabelled)';
const published = currentVisaBulletin?.publishedDate;

if (!published) {
  console.error('::error::currentVisaBulletin has no publishedDate — cannot assess freshness.');
  process.exit(1);
}

const publishedAt = new Date(`${published}T00:00:00Z`);
if (Number.isNaN(publishedAt.getTime())) {
  console.error(`::error::currentVisaBulletin.publishedDate is unparseable: "${published}"`);
  process.exit(1);
}

// Compare date-to-date in UTC so the result doesn't drift with run time-of-day.
const today = new Date();
const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
const ageDays = Math.floor((todayUtc - publishedAt.getTime()) / MS_PER_DAY);

if (ageDays > maxAgeDays) {
  console.error(
    `::${warnOnly ? 'warning' : 'error'}::Visa bulletin data is STALE: current bulletin is "${label}" ` +
    `(published ${published}, ${ageDays} days ago, limit ${maxAgeDays}). ` +
    'The fetcher has missed at least one publish cycle — check whether ' +
    'travel.state.gov is blocking us or the URL scheme changed.'
  );
  process.exit(warnOnly ? 0 : 1);
}

console.log(
  `[check-bulletin-freshness] OK — "${label}" published ${published} ` +
  `(${ageDays} days ago, limit ${maxAgeDays}).`
);
