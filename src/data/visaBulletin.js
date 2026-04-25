// U.S. Department of State Visa Bulletin data.
// Source: https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html
// Dates use the State Department's DDMMMYY format ("01JAN16"); "C" = Current, "U" = Unauthorized.

export const CHARGEABILITY_AREAS = [
  { key: 'all', label: 'All Chargeability Areas Except Those Listed' },
  { key: 'china', label: 'China — mainland born' },
  { key: 'india', label: 'India' },
  { key: 'mexico', label: 'Mexico' },
  { key: 'philippines', label: 'Philippines' },
];

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
