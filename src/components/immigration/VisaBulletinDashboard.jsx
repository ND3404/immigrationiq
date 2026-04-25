import { useMemo, useState } from 'react';
import {
  CalendarDays, ExternalLink, ArrowUp, ArrowDown, Minus,
  Users, Briefcase, Info,
} from 'lucide-react';
import {
  CHARGEABILITY_AREAS,
  FAMILY_CATEGORIES,
  EMPLOYMENT_CATEGORIES,
  currentVisaBulletin,
  previousVisaBulletin,
  getCellValue,
  formatBulletinDate,
  compareBulletinCells,
} from '../../data/visaBulletin';

const SECTION_TABS = [
  { key: 'family',     label: 'Family-Based',     icon: Users,     categories: FAMILY_CATEGORIES },
  { key: 'employment', label: 'Employment-Based', icon: Briefcase, categories: EMPLOYMENT_CATEGORIES },
];

const CHART_TABS = [
  { key: 'finalActionDates', label: 'Final Action Dates' },
  { key: 'datesForFiling',   label: 'Dates for Filing' },
];

function chartLabel(key) {
  return key === 'datesForFiling' ? 'Dates for Filing' : 'Final Action Dates';
}

function valueColor(value) {
  if (value === 'C') return 'var(--color-success-500)';
  if (value === 'U') return 'var(--color-secondary-500)';
  return 'var(--color-text)';
}

function MovementCell({ value, prevValue }) {
  const cmp = compareBulletinCells(value, prevValue);
  const showArrow = cmp.direction === 'forward' || cmp.direction === 'backward';
  const arrowColor =
    cmp.direction === 'forward'  ? 'var(--color-success-500)' :
    cmp.direction === 'backward' ? 'var(--color-secondary-500)' :
                                    'var(--color-text-light)';
  const Arrow =
    cmp.direction === 'forward'  ? ArrowUp :
    cmp.direction === 'backward' ? ArrowDown :
                                    Minus;

  return (
    <div className="inline-flex items-center gap-1 whitespace-nowrap">
      <span className="font-mono text-sm font-semibold" style={{ color: valueColor(value) }}>
        {value ?? '—'}
      </span>
      {prevValue !== undefined && (
        <>
          <Arrow className="h-3 w-3" style={{ color: arrowColor }} aria-hidden />
          {cmp.label && (
            <span className="text-[10px] font-semibold" style={{ color: arrowColor }}>
              {cmp.label}
            </span>
          )}
        </>
      )}
    </div>
  );
}

function chargeabilityHeader(area) {
  const isCa = area.group === 'central-america';
  return (
    <th
      key={area.key}
      scope="col"
      className="text-left font-semibold px-3 py-2.5 text-xs uppercase tracking-wide whitespace-nowrap"
      style={{ color: isCa ? 'var(--color-text-light)' : 'var(--color-primary-700)' }}
      title={isCa ? 'Falls under "All Chargeability Areas" unless the bulletin lists a separate cutoff' : (area.tooltip || area.label)}
    >
      {area.shortLabel || area.label}
      {isCa && <span className="ml-1 text-[9px] align-top" style={{ color: 'var(--color-accent-600)' }}>†</span>}
    </th>
  );
}

export default function VisaBulletinDashboard({
  bulletin = currentVisaBulletin,
  prior = previousVisaBulletin,
  defaultSection = 'family',
  defaultChart = 'finalActionDates',
  className = '',
}) {
  const [section, setSection] = useState(defaultSection);
  const [chart, setChart] = useState(defaultChart);

  const sectionDef = SECTION_TABS.find(s => s.key === section) ?? SECTION_TABS[0];
  const data = bulletin[section]?.[chart];
  const priorData = prior?.[section]?.[chart];
  const recommendedChart = bulletin.uscisFilingChart?.[section];

  const movementSummary = useMemo(() => {
    if (!data || !priorData) return { forward: 0, backward: 0, same: 0 };
    let f = 0, b = 0, s = 0;
    for (const cat of sectionDef.categories) {
      const row = data[cat.key];
      const prevRow = priorData[cat.key];
      if (!row || !prevRow) continue;
      for (const area of CHARGEABILITY_AREAS) {
        const cmp = compareBulletinCells(getCellValue(row, area), getCellValue(prevRow, area));
        if (cmp.direction === 'forward')  f += 1;
        else if (cmp.direction === 'backward') b += 1;
        else if (cmp.direction === 'same') s += 1;
      }
    }
    return { forward: f, backward: b, same: s };
  }, [data, priorData, sectionDef]);

  return (
    <div className={`rounded-2xl bg-white shadow-md ${className}`} style={{ border: '1px solid var(--color-border)' }}>
      {/* Header */}
      <div
        className="rounded-t-2xl px-5 sm:px-6 py-4 flex flex-wrap items-center gap-3 text-white"
        style={{ background: 'linear-gradient(135deg, var(--color-primary-800) 0%, var(--color-primary-500) 100%)' }}
      >
        <div className="rounded-lg p-2" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
          <CalendarDays className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg sm:text-xl font-bold leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Visa Bulletin Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-blue-200">U.S. Department of State — updated monthly</p>
        </div>
        <span
          className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
          style={{ backgroundColor: 'var(--color-accent-400)', color: 'var(--color-primary-900)' }}
          title={`Bulletin published ${formatBulletinDate(bulletin.publishedDate?.replace(/-/g, '').replace(/^(\d{4})(\d{2})(\d{2})$/, ''))}`}
        >
          Last Updated: {bulletin.label}
        </span>
        <a
          href={bulletin.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold no-underline hover:bg-blue-50"
          style={{ color: 'var(--color-primary-700)' }}
        >
          Official Source <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* USCIS chart designation banner */}
      <div className="px-5 sm:px-6 py-3 flex items-start gap-2" style={{ backgroundColor: 'var(--color-accent-50)', borderBottom: '1px solid var(--color-border)' }}>
        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent-700)' }} />
        <p className="text-xs sm:text-sm leading-snug" style={{ color: 'var(--color-text)' }}>
          <strong>For {bulletin.label}:</strong>{' '}
          Family — <strong>{chartLabel(bulletin.uscisFilingChart.family)}</strong>{' | '}
          Employment — <strong>{chartLabel(bulletin.uscisFilingChart.employment)}</strong>{' '}
          <span style={{ color: 'var(--color-text-light)' }}>(USCIS adjustment-of-status filing chart)</span>
        </p>
      </div>

      {/* Toggles */}
      <div className="px-5 sm:px-6 pt-4 flex flex-wrap items-center gap-2">
        <div className="inline-flex rounded-full border p-1 bg-white" style={{ borderColor: 'var(--color-border)' }}>
          {SECTION_TABS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setSection(s.key)}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold transition"
              style={
                section === s.key
                  ? { backgroundColor: 'var(--color-primary-500)', color: 'white' }
                  : { color: 'var(--color-text)' }
              }
            >
              <s.icon className="h-4 w-4" /> {s.label}
            </button>
          ))}
        </div>

        <div className="inline-flex rounded-full border p-1 bg-white" style={{ borderColor: 'var(--color-border)' }}>
          {CHART_TABS.map((c) => {
            const active = chart === c.key;
            const isRecommended = recommendedChart === c.key;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setChart(c.key)}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold transition whitespace-nowrap"
                style={active ? { backgroundColor: 'var(--color-primary-500)', color: 'white' } : { color: 'var(--color-text)' }}
              >
                {c.label}
                {isRecommended && (
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                    style={
                      active
                        ? { backgroundColor: 'var(--color-accent-400)', color: 'var(--color-primary-900)' }
                        : { backgroundColor: 'var(--color-success-50)', color: 'var(--color-success-500)' }
                    }
                  >
                    USCIS
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Movement summary */}
      <div className="px-5 sm:px-6 pt-3 flex flex-wrap items-center gap-3 text-xs" style={{ color: 'var(--color-text-light)' }}>
        <span className="inline-flex items-center gap-1">
          <ArrowUp className="h-3.5 w-3.5" style={{ color: 'var(--color-success-500)' }} />
          <strong style={{ color: 'var(--color-success-500)' }}>{movementSummary.forward}</strong> advanced
        </span>
        <span className="inline-flex items-center gap-1">
          <Minus className="h-3.5 w-3.5" style={{ color: 'var(--color-text-light)' }} />
          <strong>{movementSummary.same}</strong> unchanged
        </span>
        <span className="inline-flex items-center gap-1">
          <ArrowDown className="h-3.5 w-3.5" style={{ color: 'var(--color-secondary-500)' }} />
          <strong style={{ color: 'var(--color-secondary-500)' }}>{movementSummary.backward}</strong> retrogressed
        </span>
        <span className="ml-auto" style={{ color: 'var(--color-text-light)' }}>
          vs <strong>{prior?.label || 'prior month'}</strong>
        </span>
      </div>

      {/* Table */}
      <div className="px-5 sm:px-6 pt-3 pb-5">
        <div className="overflow-x-auto -mx-1 rounded-lg" style={{ border: '1px solid var(--color-border)' }}>
          <table className="w-full text-sm">
            <caption className="sr-only">
              {sectionDef.label} — {chartLabel(chart)} for {bulletin.label}
            </caption>
            <thead style={{ backgroundColor: 'var(--color-surface)' }}>
              <tr>
                <th
                  scope="col"
                  className="text-left font-semibold px-3 py-2.5 text-xs uppercase tracking-wide sticky left-0 z-10"
                  style={{ color: 'var(--color-primary-700)', backgroundColor: 'var(--color-surface)' }}
                >
                  Category
                </th>
                {CHARGEABILITY_AREAS.map(chargeabilityHeader)}
              </tr>
            </thead>
            <tbody>
              {sectionDef.categories.map((cat) => {
                const row = data?.[cat.key];
                const prevRow = priorData?.[cat.key];
                if (!row) return null;
                return (
                  <tr key={cat.key} style={{ borderTop: '1px solid var(--color-border)' }}>
                    <td className="px-3 py-2.5 sticky left-0 bg-white z-10">
                      <div className="font-bold whitespace-nowrap" style={{ color: 'var(--color-primary-700)' }}>{cat.label}</div>
                      <div className="text-[11px] leading-tight" style={{ color: 'var(--color-text-light)' }}>{cat.description}</div>
                    </td>
                    {CHARGEABILITY_AREAS.map((area) => (
                      <td key={area.key} className="px-3 py-2.5">
                        <MovementCell value={getCellValue(row, area)} prevValue={getCellValue(prevRow, area)} />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px]" style={{ color: 'var(--color-text-light)' }}>
          <span className="inline-flex items-center gap-1">
            <span className="font-mono font-bold" style={{ color: 'var(--color-success-500)' }}>C</span> Current — no waiting
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="font-mono font-bold" style={{ color: 'var(--color-secondary-500)' }}>U</span> Unauthorized
          </span>
          <span className="inline-flex items-center gap-1">
            <ArrowUp className="h-3 w-3" style={{ color: 'var(--color-success-500)' }} /> Advanced vs {prior?.label || 'prior'}
          </span>
          <span className="inline-flex items-center gap-1">
            <ArrowDown className="h-3 w-3" style={{ color: 'var(--color-secondary-500)' }} /> Retrogressed
          </span>
          <span className="inline-flex items-center gap-1">
            <Minus className="h-3 w-3" style={{ color: 'var(--color-text-light)' }} /> Unchanged
          </span>
          <span className="inline-flex items-center gap-1">
            <span style={{ color: 'var(--color-accent-600)' }}>†</span>
            Falls under Worldwide unless the bulletin lists a separate cutoff
          </span>
        </div>
      </div>
    </div>
  );
}
