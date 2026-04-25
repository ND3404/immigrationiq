import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays, ExternalLink, ArrowUp, ArrowDown, Minus, Info,
  Users, Briefcase, MessageSquare, ArrowRight,
} from 'lucide-react';
import {
  CHARGEABILITY_AREAS,
  FAMILY_CATEGORIES,
  EMPLOYMENT_CATEGORIES,
  visaBulletinHistory,
  currentVisaBulletin,
  previousVisaBulletin,
} from '../data/visaBulletin';

// ── DDMMMYY ↔ Date helpers ────────────────────────────────────────────────
const MONTHS = { JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5, JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11 };

function parseBulletinDate(value) {
  if (!value || value === 'C' || value === 'U') return null;
  const m = /^(\d{2})([A-Z]{3})(\d{2})$/.exec(value);
  if (!m) return null;
  const [, day, mon, yr] = m;
  const year = Number(yr) < 50 ? 2000 + Number(yr) : 1900 + Number(yr);
  return new Date(Date.UTC(year, MONTHS[mon] ?? 0, Number(day)));
}

function formatBulletinDate(value) {
  if (value === 'C') return 'Current';
  if (value === 'U') return 'Unauthorized';
  const d = parseBulletinDate(value);
  if (!d) return value;
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

function compareValues(current, previous) {
  if (current === previous) return 'same';
  if (current === 'C' && previous !== 'C') return 'forward';
  if (previous === 'C' && current !== 'C') return 'backward';
  const c = parseBulletinDate(current);
  const p = parseBulletinDate(previous);
  if (!c || !p) return 'changed';
  if (c.getTime() > p.getTime()) return 'forward';
  if (c.getTime() < p.getTime()) return 'backward';
  return 'same';
}

function MovementBadge({ current, previous }) {
  if (!previous) return null;
  const dir = compareValues(current, previous);
  if (dir === 'same') {
    return <Minus className="h-3.5 w-3.5 inline ml-1" style={{ color: 'var(--color-text-light)' }} aria-label="No change" />;
  }
  if (dir === 'forward') {
    return <ArrowUp className="h-3.5 w-3.5 inline ml-1" style={{ color: 'var(--color-success-500)' }} aria-label="Advanced" />;
  }
  if (dir === 'backward') {
    return <ArrowDown className="h-3.5 w-3.5 inline ml-1" style={{ color: 'var(--color-secondary-500)' }} aria-label="Retrogressed" />;
  }
  return null;
}

function valueClass(value) {
  if (value === 'C') return 'var(--color-success-500)';
  if (value === 'U') return 'var(--color-secondary-500)';
  return 'var(--color-text)';
}

// ── Table component ───────────────────────────────────────────────────────
function BulletinTable({ rows, data, prevData, areas, label }) {
  return (
    <div className="overflow-x-auto rounded-lg border" style={{ borderColor: 'var(--color-border)' }}>
      <table className="w-full text-sm">
        <caption className="sr-only">{label}</caption>
        <thead style={{ backgroundColor: 'var(--color-surface)' }}>
          <tr>
            <th className="text-left font-semibold px-3 py-2.5 sticky left-0" style={{ color: 'var(--color-text-light)', backgroundColor: 'var(--color-surface)' }}>
              Category
            </th>
            {areas.map((a) => (
              <th key={a.key} className="text-left font-semibold px-3 py-2.5 whitespace-nowrap" style={{ color: 'var(--color-text-light)' }}>
                {a.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cat) => {
            const row = data?.[cat.key];
            const prev = prevData?.[cat.key];
            if (!row) return null;
            return (
              <tr key={cat.key} style={{ borderTop: '1px solid var(--color-border)' }}>
                <td className="px-3 py-2.5 sticky left-0 bg-white">
                  <div className="font-semibold" style={{ color: 'var(--color-text)' }}>{cat.label}</div>
                  <div className="text-[11px]" style={{ color: 'var(--color-text-light)' }}>{cat.description}</div>
                </td>
                {areas.map((a) => {
                  const v = row[a.key];
                  return (
                    <td key={a.key} className="px-3 py-2.5 font-mono text-sm whitespace-nowrap" style={{ color: valueClass(v) }}>
                      {v}
                      <MovementBadge current={v} previous={prev?.[a.key]} />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
const CHART_TABS = [
  { key: 'finalActionDates', label: 'Final Action Dates' },
  { key: 'datesForFiling', label: 'Dates for Filing' },
];

const SECTION_TABS = [
  { key: 'family', label: 'Family-Sponsored', icon: Users, categories: FAMILY_CATEGORIES },
  { key: 'employment', label: 'Employment-Based', icon: Briefcase, categories: EMPLOYMENT_CATEGORIES },
];

export default function VisaBulletin() {
  const [bulletinIndex, setBulletinIndex] = useState(0);
  const [section, setSection] = useState('family');
  const [chart, setChart] = useState('finalActionDates');

  const bulletin = visaBulletinHistory[bulletinIndex] ?? currentVisaBulletin;
  const prior = visaBulletinHistory[bulletinIndex + 1] ?? previousVisaBulletin;
  const sectionDef = SECTION_TABS.find((s) => s.key === section) ?? SECTION_TABS[0];
  const tableData = bulletin[section]?.[chart];
  const priorTableData = prior?.[section]?.[chart];

  // Recommended chart based on USCIS designation for this bulletin & section
  const recommendedChart = bulletin.uscisFilingChart?.[section];

  // Movement summary
  const movements = useMemo(() => {
    if (!tableData || !priorTableData) return { forward: 0, backward: 0, same: 0 };
    let f = 0, b = 0, s = 0;
    for (const cat of sectionDef.categories) {
      const row = tableData[cat.key];
      const prevRow = priorTableData[cat.key];
      if (!row || !prevRow) continue;
      for (const area of CHARGEABILITY_AREAS) {
        const dir = compareValues(row[area.key], prevRow[area.key]);
        if (dir === 'forward') f += 1;
        else if (dir === 'backward') b += 1;
        else if (dir === 'same') s += 1;
      }
    }
    return { forward: f, backward: b, same: s };
  }, [tableData, priorTableData, sectionDef]);

  return (
    <div className="page-container max-w-7xl">
      {/* Header */}
      <div
        className="rounded-2xl p-6 sm:p-8 mb-6 text-white"
        style={{ background: 'linear-gradient(135deg, var(--color-primary-800) 0%, var(--color-primary-500) 100%)' }}
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <div className="rounded-lg p-2.5" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            <CalendarDays className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
              Visa Bulletin Dashboard
            </h1>
            <p className="text-sm text-blue-200">U.S. Department of State — updated monthly</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-5">
          <label htmlFor="bulletin-month" className="text-xs uppercase tracking-wide text-blue-200 font-semibold">
            Bulletin Month:
          </label>
          <select
            id="bulletin-month"
            value={bulletinIndex}
            onChange={(e) => setBulletinIndex(Number(e.target.value))}
            className="rounded-lg bg-white/10 border border-white/20 px-3 py-1.5 text-sm font-semibold text-white outline-none"
          >
            {visaBulletinHistory.map((b, i) => (
              <option key={b.label} value={i} style={{ color: 'var(--color-text)' }}>
                {b.label} {i === 0 ? '(latest)' : ''}
              </option>
            ))}
          </select>

          <a
            href={bulletin.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1 text-sm font-semibold rounded-full bg-white text-[var(--color-primary-700)] px-4 py-1.5 no-underline hover:bg-blue-50"
          >
            View Official Bulletin <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* USCIS guidance banner */}
      <div className="card mb-6 flex items-start gap-3" style={{ backgroundColor: 'var(--color-primary-50)', borderColor: 'var(--color-primary-100)' }}>
        <Info className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary-600)' }} />
        <div className="text-sm" style={{ color: 'var(--color-text)' }}>
          <strong>USCIS adjustment-of-status filing for {bulletin.label}:</strong>{' '}
          Family — <span className="font-semibold">{bulletin.uscisFilingChart.family === 'datesForFiling' ? 'Dates for Filing' : 'Final Action Dates'}</span>;{' '}
          Employment — <span className="font-semibold">{bulletin.uscisFilingChart.employment === 'datesForFiling' ? 'Dates for Filing' : 'Final Action Dates'}</span>.{' '}
          <span style={{ color: 'var(--color-text-light)' }}>
            If you're filing an I-485, use the chart USCIS specifies for your category.
          </span>
        </div>
      </div>

      {/* Movement summary vs previous month */}
      {prior && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="card text-center">
            <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-text-light)' }}>Advanced</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-success-500)' }}>{movements.forward}</p>
            <p className="text-[10px]" style={{ color: 'var(--color-text-light)' }}>cells moved forward vs {prior.label}</p>
          </div>
          <div className="card text-center">
            <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-text-light)' }}>Unchanged</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{movements.same}</p>
            <p className="text-[10px]" style={{ color: 'var(--color-text-light)' }}>held steady</p>
          </div>
          <div className="card text-center">
            <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-text-light)' }}>Retrogressed</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-secondary-500)' }}>{movements.backward}</p>
            <p className="text-[10px]" style={{ color: 'var(--color-text-light)' }}>cells moved backward</p>
          </div>
        </div>
      )}

      {/* Section + chart tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="inline-flex rounded-full border p-1" style={{ borderColor: 'var(--color-border)', backgroundColor: 'white' }}>
          {SECTION_TABS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSection(s.key)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition ${section === s.key ? 'text-white' : 'text-[var(--color-text)] hover:bg-gray-50'}`}
              style={section === s.key ? { backgroundColor: 'var(--color-primary-500)' } : undefined}
            >
              <s.icon className="h-4 w-4" /> {s.label}
            </button>
          ))}
        </div>

        <div className="inline-flex rounded-full border p-1" style={{ borderColor: 'var(--color-border)', backgroundColor: 'white' }}>
          {CHART_TABS.map((c) => (
            <button
              key={c.key}
              onClick={() => setChart(c.key)}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${chart === c.key ? 'text-white' : 'text-[var(--color-text)] hover:bg-gray-50'}`}
              style={chart === c.key ? { backgroundColor: 'var(--color-primary-500)' } : undefined}
            >
              {c.label}
              {recommendedChart === c.key && (
                <span className="ml-1.5 text-[10px] uppercase font-bold" style={{ color: chart === c.key ? '#fff' : 'var(--color-success-500)' }}>
                  USCIS
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <BulletinTable
        rows={sectionDef.categories}
        data={tableData}
        prevData={priorTableData}
        areas={CHARGEABILITY_AREAS}
        label={`${sectionDef.label} — ${chart === 'finalActionDates' ? 'Final Action Dates' : 'Dates for Filing'} for ${bulletin.label}`}
      />

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs" style={{ color: 'var(--color-text-light)' }}>
        <span className="inline-flex items-center gap-1">
          <span className="font-mono font-bold" style={{ color: 'var(--color-success-500)' }}>C</span> Current — no waiting
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="font-mono font-bold" style={{ color: 'var(--color-secondary-500)' }}>U</span> Unauthorized
        </span>
        <span className="inline-flex items-center gap-1">
          <ArrowUp className="h-3.5 w-3.5" style={{ color: 'var(--color-success-500)' }} /> Advanced vs prior month
        </span>
        <span className="inline-flex items-center gap-1">
          <ArrowDown className="h-3.5 w-3.5" style={{ color: 'var(--color-secondary-500)' }} /> Retrogressed
        </span>
        <span className="inline-flex items-center gap-1">
          <Minus className="h-3.5 w-3.5" style={{ color: 'var(--color-text-light)' }} /> Unchanged
        </span>
      </div>

      {/* Selected priority date helper — sample row for the user */}
      <div className="card mt-8">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary-500)' }} />
          <div>
            <h3 className="font-bold text-base mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
              How to read this bulletin
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
              Find the row for your preference category and the column for your country of chargeability. If your priority date is{' '}
              <em>earlier</em> than the date shown, you may proceed with the next step. The example shows the formatted date for{' '}
              <span className="font-mono">{tableData?.[sectionDef.categories[0].key]?.all || '—'}</span>:{' '}
              <strong>{formatBulletinDate(tableData?.[sectionDef.categories[0].key]?.all)}</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Ask AI CTA */}
      <div className="mt-6 card flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: 'linear-gradient(135deg, var(--color-primary-50) 0%, #ffffff 100%)' }}>
        <div>
          <h3 className="font-bold text-base mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            Not sure what your priority date is?
          </h3>
          <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
            Ask the AI assistant — it can walk through your case category and help you read the bulletin.
          </p>
        </div>
        <Link to="/chat?q=How do I find my priority date and read the visa bulletin?" className="btn-primary no-underline whitespace-nowrap">
          <MessageSquare className="h-4 w-4" /> Ask ImmigrationIQ <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
