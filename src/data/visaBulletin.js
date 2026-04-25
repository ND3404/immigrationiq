// U.S. Department of State Visa Bulletin data.
// Source: https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html
// Dates use the State Department's DDMMMYY format ("01JAN16"); "C" = Current, "U" = Unauthorized.

// The State Dept bulletin officially lists five columns. El Salvador, Guatemala,
// and Honduras don't have separate columns — they fall under "All Chargeability"
// unless the bulletin explicitly carves them out (which has happened for F4
// during retrogression years). The render layer falls back to `all` when a
// per-row override isn't present.
export const CHARGEABILITY_AREAS = [
  { key: 'all',         label: 'Worldwide',          shortLabel: 'Worldwide',  group: 'official', tooltip: 'All chargeability areas except those listed' },
  { key: 'china',       label: 'China',              shortLabel: 'China',      group: 'official', tooltip: 'China — mainland born' },
  { key: 'india',       label: 'India',              shortLabel: 'India',      group: 'official' },
  { key: 'mexico',      label: 'Mexico',             shortLabel: 'Mexico',     group: 'official' },
  { key: 'philippines', label: 'Philippines',        shortLabel: 'Philippines', group: 'official' },
  { key: 'salvador',    label: 'El Salvador',        shortLabel: 'El Salvador', group: 'central-america', fallbackTo: 'all' },
  { key: 'guatemala',   label: 'Guatemala',          shortLabel: 'Guatemala',   group: 'central-america', fallbackTo: 'all' },
  { key: 'honduras',    label: 'Honduras',           shortLabel: 'Honduras',    group: 'central-america', fallbackTo: 'all' },
];

/** Read a cell with chargeability fallback. */
export function getCellValue(row, area) {
  if (!row) return undefined;
  const direct = row[area.key];
  if (direct !== undefined) return direct;
  if (area.fallbackTo) return row[area.fallbackTo];
  return undefined;
}

// ── Date / movement helpers ───────────────────────────────────────────────
const _MONTHS = { JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5, JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11 };

export function parseBulletinDate(value) {
  if (!value || value === 'C' || value === 'U') return null;
  const m = /^(\d{2})([A-Z]{3})(\d{2})$/.exec(value);
  if (!m) return null;
  const [, day, mon, yr] = m;
  const year = Number(yr) < 50 ? 2000 + Number(yr) : 1900 + Number(yr);
  return new Date(Date.UTC(year, _MONTHS[mon] ?? 0, Number(day)));
}

export function formatBulletinDate(value) {
  if (value === 'C') return 'Current';
  if (value === 'U') return 'Unauthorized';
  const d = parseBulletinDate(value);
  if (!d) return value || '—';
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

/**
 * Compares a current-bulletin cell to the previous month's cell.
 * Returns:
 *   { direction: 'forward' | 'backward' | 'same' | 'unknown',
 *     days:      integer | null    (positive = advanced, negative = retrogressed),
 *     label:     string             ('+28d', '+2mo', 'Now Current', 'Retrogressed', '') }
 */
export function compareBulletinCells(current, previous) {
  if (current === undefined || previous === undefined) return { direction: 'unknown', days: null, label: '' };
  if (current === previous) return { direction: 'same', days: 0, label: '' };
  if (current === 'C' && previous !== 'C') return { direction: 'forward', days: null, label: 'Now Current' };
  if (previous === 'C' && current !== 'C') return { direction: 'backward', days: null, label: 'Retrogressed' };
  const c = parseBulletinDate(current);
  const p = parseBulletinDate(previous);
  if (!c || !p) return { direction: 'unknown', days: null, label: '' };
  const days = Math.round((c.getTime() - p.getTime()) / (1000 * 60 * 60 * 24));
  if (days === 0) return { direction: 'same', days: 0, label: '' };
  const abs = Math.abs(days);
  const sign = days > 0 ? '+' : '−';
  const label = abs >= 60 ? `${sign}${Math.round(abs / 30)}mo` : `${sign}${abs}d`;
  return { direction: days > 0 ? 'forward' : 'backward', days, label };
}

export const FAMILY_CATEGORIES = [
  { key: 'F1',  label: 'F1',  description: 'Unmarried sons & daughters of U.S. citizens' },
  { key: 'F2A', label: 'F2A', description: 'Spouses & children (under 21) of LPRs' },
  { key: 'F2B', label: 'F2B', description: 'Unmarried sons & daughters (21+) of LPRs' },
  { key: 'F3',  label: 'F3',  description: 'Married sons & daughters of U.S. citizens' },
  { key: 'F4',  label: 'F4',  description: 'Brothers & sisters of adult U.S. citizens' },
];

export const EMPLOYMENT_CATEGORIES = [
  { key: 'EB1',           label: 'EB-1', description: 'Priority workers' },
  { key: 'EB2',           label: 'EB-2', description: 'Advanced degree / exceptional ability' },
  { key: 'EB3',           label: 'EB-3', description: 'Skilled workers & professionals' },
  { key: 'EB3_OTHER',     label: 'EB-3 Other Workers', description: 'Unskilled labor (other workers)' },
  { key: 'EB4',           label: 'EB-4', description: 'Special immigrants' },
  { key: 'EB4_RELIGIOUS', label: 'EB-4 Certain Religious Workers', description: 'Non-minister religious workers (SR)' },
  { key: 'EB5_UNRESERVED', label: 'EB-5 Unreserved', description: 'C5 / T5 — non-set-aside investors' },
  { key: 'EB5_RURAL',      label: 'EB-5 Rural (20%)', description: 'Set-aside: rural area investments' },
  { key: 'EB5_HIGH_UNEMP', label: 'EB-5 High Unemployment (10%)', description: 'Set-aside: targeted employment area' },
  { key: 'EB5_INFRA',      label: 'EB-5 Infrastructure (2%)', description: 'Set-aside: infrastructure projects' },
];

// ────────────────────────────────────────────────────────────────────────────
// MAY 2026 — current bulletin
// ────────────────────────────────────────────────────────────────────────────
export const visaBulletinMay2026 = {
  month: 'May',
  year: 2026,
  label: 'May 2026',
  publishedDate: '2026-04-09',
  sourceUrl: 'https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin/2026/visa-bulletin-for-may-2026.html',
  // USCIS designation for adjustment-of-status filing in May 2026:
  //   Family-sponsored → Dates for Filing
  //   Employment-based → Final Action Dates  (notable shift away from DFF)
  uscisFilingChart: {
    family: 'datesForFiling',
    employment: 'finalActionDates',
  },
  family: {
    finalActionDates: {
      F1:  { all: '01SEP17', china: '01SEP17', india: '01SEP17', mexico: '15AUG07', philippines: '01MAY13' },
      F2A: { all: '01AUG24', china: '01AUG24', india: '01AUG24', mexico: '01AUG23', philippines: '01AUG24' },
      F2B: { all: '22MAY17', china: '22MAY17', india: '22MAY17', mexico: '15FEB09', philippines: '08APR13' },
      F3:  { all: '15FEB12', china: '15FEB12', india: '15FEB12', mexico: '01MAY01', philippines: '22NOV05' },
      F4:  { all: '15SEP08', china: '15SEP08', india: '01NOV06', mexico: '08APR01', philippines: '15JUL07' },
    },
    datesForFiling: {
      F1:  { all: '01OCT18', china: '01OCT18', india: '01OCT18', mexico: '01OCT08', philippines: '22APR15' },
      F2A: { all: 'C',       china: 'C',       india: 'C',       mexico: 'C',       philippines: 'C' },
      F2B: { all: '01JAN18', china: '01JAN18', india: '01JAN18', mexico: '15MAY10', philippines: '01OCT13' },
      F3:  { all: '08DEC12', china: '08DEC12', india: '08DEC12', mexico: '15JUL01', philippines: '08AUG06' },
      F4:  { all: '01SEP09', china: '01SEP09', india: '15DEC06', mexico: '30APR01', philippines: '22MAR08' },
    },
  },
  employment: {
    finalActionDates: {
      EB1:            { all: 'C',       china: '01APR23', india: '01APR23', mexico: 'C',       philippines: 'C' },
      EB2:            { all: 'C',       china: '01SEP21', india: '15JUL14', mexico: 'C',       philippines: 'C' },
      EB3:            { all: '01JUN24', china: '15JUN21', india: '15NOV13', mexico: '01JUN24', philippines: '01AUG23' },
      EB3_OTHER:      { all: '01FEB22', china: '01FEB19', india: '15NOV13', mexico: '01FEB22', philippines: '01NOV21' },
      EB4:            { all: '15JUL22', china: '15JUL22', india: '15JUL22', mexico: '15JUL22', philippines: '15JUL22' },
      EB4_RELIGIOUS:  { all: '15JUL22', china: '15JUL22', india: '15JUL22', mexico: '15JUL22', philippines: '15JUL22' },
      EB5_UNRESERVED: { all: 'C',       china: '22SEP16', india: '01MAY22', mexico: 'C',       philippines: 'C' },
      EB5_RURAL:      { all: 'C',       china: 'C',       india: 'C',       mexico: 'C',       philippines: 'C' },
      EB5_HIGH_UNEMP: { all: 'C',       china: 'C',       india: 'C',       mexico: 'C',       philippines: 'C' },
      EB5_INFRA:      { all: 'C',       china: 'C',       india: 'C',       mexico: 'C',       philippines: 'C' },
    },
    datesForFiling: {
      EB1:            { all: 'C',       china: '01DEC23', india: '01DEC23', mexico: 'C',       philippines: 'C' },
      EB2:            { all: 'C',       china: '01JAN22', india: '15JAN15', mexico: 'C',       philippines: 'C' },
      EB3:            { all: 'C',       china: '01JAN22', india: '15JAN15', mexico: 'C',       philippines: '01JAN24' },
      EB3_OTHER:      { all: '01AUG22', china: '01OCT19', india: '15JAN15', mexico: '01AUG22', philippines: '01AUG22' },
      EB4:            { all: '01JAN23', china: '01JAN23', india: '01JAN23', mexico: '01JAN23', philippines: '01JAN23' },
      EB4_RELIGIOUS:  { all: '01JAN23', china: '01JAN23', india: '01JAN23', mexico: '01JAN23', philippines: '01JAN23' },
      EB5_UNRESERVED: { all: 'C',       china: '01MAR17', india: '01MAY24', mexico: 'C',       philippines: 'C' },
      EB5_RURAL:      { all: 'C',       china: 'C',       india: 'C',       mexico: 'C',       philippines: 'C' },
      EB5_HIGH_UNEMP: { all: 'C',       china: 'C',       india: 'C',       mexico: 'C',       philippines: 'C' },
      EB5_INFRA:      { all: 'C',       china: 'C',       india: 'C',       mexico: 'C',       philippines: 'C' },
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────
// APRIL 2026 — kept for month-over-month comparison
// ────────────────────────────────────────────────────────────────────────────
export const visaBulletinApril2026 = {
  month: 'April',
  year: 2026,
  label: 'April 2026',
  publishedDate: '2026-03-12',
  sourceUrl: 'https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin/2026/visa-bulletin-for-april-2026.html',
  uscisFilingChart: {
    family: 'datesForFiling',
    employment: 'datesForFiling',
  },
  family: {
    finalActionDates: {
      F1:  { all: '01MAY17', china: '01MAY17', india: '01MAY17', mexico: '15FEB07', philippines: '01MAY13' },
      F2A: { all: '01FEB24', china: '01FEB24', india: '01FEB24', mexico: '01FEB23', philippines: '01FEB24' },
      F2B: { all: '22MAY17', china: '22MAY17', india: '22MAY17', mexico: '15FEB09', philippines: '08APR13' },
      F3:  { all: '22DEC11', china: '22DEC11', india: '22DEC11', mexico: '01MAY01', philippines: '01JUL05' },
      F4:  { all: '08JUN08', china: '08JUN08', india: '01NOV06', mexico: '08APR01', philippines: '01FEB07' },
    },
    datesForFiling: {
      F1:  { all: '01MAR18', china: '01MAR18', india: '01MAR18', mexico: '15APR08', philippines: '22APR15' },
      F2A: { all: 'C',       china: 'C',       india: 'C',       mexico: 'C',       philippines: 'C' },
      F2B: { all: '08AUG17', china: '08AUG17', india: '08AUG17', mexico: '15MAY10', philippines: '01OCT13' },
      F3:  { all: '22NOV12', china: '22NOV12', india: '22NOV12', mexico: '01JUL01', philippines: '15JUL06' },
      F4:  { all: '15MAY09', china: '15MAY09', india: '15DEC06', mexico: '30APR01', philippines: '22MAR08' },
    },
  },
  employment: {
    finalActionDates: {
      EB1:            { all: 'C',       china: '01APR23', india: '01APR23', mexico: 'C',       philippines: 'C' },
      EB2:            { all: 'C',       china: '01SEP21', india: '15JUL14', mexico: 'C',       philippines: 'C' },
      EB3:            { all: '01JUN24', china: '15JUN21', india: '15NOV13', mexico: '01JUN24', philippines: '01AUG23' },
      EB3_OTHER:      { all: '01NOV21', china: '01FEB19', india: '15NOV13', mexico: '01NOV21', philippines: '01NOV21' },
      EB4:            { all: '15JUL22', china: '15JUL22', india: '15JUL22', mexico: '15JUL22', philippines: '15JUL22' },
      EB4_RELIGIOUS:  { all: '15JUL22', china: '15JUL22', india: '15JUL22', mexico: '15JUL22', philippines: '15JUL22' },
      EB5_UNRESERVED: { all: 'C',       china: '01SEP16', india: '01MAY22', mexico: 'C',       philippines: 'C' },
      EB5_RURAL:      { all: 'C',       china: 'C',       india: 'C',       mexico: 'C',       philippines: 'C' },
      EB5_HIGH_UNEMP: { all: 'C',       china: 'C',       india: 'C',       mexico: 'C',       philippines: 'C' },
      EB5_INFRA:      { all: 'C',       china: 'C',       india: 'C',       mexico: 'C',       philippines: 'C' },
    },
    datesForFiling: {
      EB1:            { all: 'C',       china: '01DEC23', india: '01DEC23', mexico: 'C',       philippines: 'C' },
      EB2:            { all: 'C',       china: '01JAN22', india: '15JAN15', mexico: 'C',       philippines: 'C' },
      EB3:            { all: 'C',       china: '01JAN22', india: '15JAN15', mexico: 'C',       philippines: '01JAN24' },
      EB3_OTHER:      { all: '01AUG22', china: '01OCT19', india: '15JAN15', mexico: '01AUG22', philippines: '01AUG22' },
      EB4:            { all: '01JAN23', china: '01JAN23', india: '01JAN23', mexico: '01JAN23', philippines: '01JAN23' },
      EB4_RELIGIOUS:  { all: '01JAN23', china: '01JAN23', india: '01JAN23', mexico: '01JAN23', philippines: '01JAN23' },
      EB5_UNRESERVED: { all: 'C',       china: '01OCT16', india: '01MAY22', mexico: 'C',       philippines: 'C' },
      EB5_RURAL:      { all: 'C',       china: 'C',       india: 'C',       mexico: 'C',       philippines: 'C' },
      EB5_HIGH_UNEMP: { all: 'C',       china: 'C',       india: 'C',       mexico: 'C',       philippines: 'C' },
      EB5_INFRA:      { all: 'C',       china: 'C',       india: 'C',       mexico: 'C',       philippines: 'C' },
    },
  },
};

// Newest first.
export const visaBulletinHistory = [visaBulletinMay2026, visaBulletinApril2026];
export const currentVisaBulletin = visaBulletinMay2026;
export const previousVisaBulletin = visaBulletinApril2026;
