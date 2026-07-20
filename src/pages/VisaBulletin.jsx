import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info, MessageSquare, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  visaBulletinHistory,
  currentVisaBulletin,
  previousVisaBulletin,
} from '../data/visaBulletin';
import VisaBulletinDashboard from '../components/immigration/VisaBulletinDashboard';
import SEO from '../components/shared/SEO';

// Whole days between an ISO date (YYYY-MM-DD, treated as UTC) and today.
// null if the input can't be parsed.
function daysSince(isoDate) {
  const then = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(then.getTime())) return null;
  const now = new Date();
  const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.floor((todayUtc - then.getTime()) / 86_400_000);
}

export default function VisaBulletin() {
  const { t, language } = useLanguage();
  const [bulletinIndex, setBulletinIndex] = useState(0);
  const bulletin = visaBulletinHistory[bulletinIndex] ?? currentVisaBulletin;
  const prior = visaBulletinHistory[bulletinIndex + 1] ?? previousVisaBulletin;

  // "Data as of …" note: only for archive-sourced data whose capture is more
  // than 3 days old. Live proxy data, and archive data 3 days old or less,
  // show nothing. Older/curated bulletins have no fetchSource → nothing.
  const captureAgeDays = bulletin.fetchSource === 'wayback' && bulletin.waybackCaptureDate
    ? daysSince(bulletin.waybackCaptureDate)
    : null;
  const showAsOf = captureAgeDays !== null && captureAgeDays > 3;
  const asOfDate = showAsOf
    ? new Date(`${bulletin.waybackCaptureDate}T00:00:00Z`).toLocaleDateString(
        language === 'es' ? 'es-ES' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' },
      )
    : null;

  return (
    <div className="page-container max-w-7xl">
      <SEO
        title="Visa Bulletin | Current Priority Dates & Movement | ImmigrationIQ"
        description="Track the current State Department Visa Bulletin, priority date movement, and final action dates for family and employment-based green cards."
        path="/visa-bulletin"
      />
      {/* Page intro */}
      <div className="mb-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="section-title m-0">{t('visaBulletin')}</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-light)' }}>
              {t('visaBulletinPageIntro')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="bulletin-month" className="text-xs uppercase tracking-wide font-semibold" style={{ color: 'var(--color-text-light)' }}>
              {t('visaBulletinMonth')}:
            </label>
            <select
              id="bulletin-month"
              value={bulletinIndex}
              onChange={(e) => setBulletinIndex(Number(e.target.value))}
              className="rounded-lg border bg-white px-3 py-1.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              {visaBulletinHistory.map((b, i) => (
                <option key={b.label} value={i}>
                  {b.label}{i === 0 ? ` (${t('visaBulletinLatest')})` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Muted "data as of" note — only for stale archive-sourced data.
          Informational, not a warning: navy/gray text, no alarm colors. */}
      {showAsOf && (
        <div
          className="mb-4 flex items-start gap-2 text-sm"
          style={{ color: 'var(--color-text-light)' }}
          role="status"
        >
          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary-500)' }} />
          <span>
            {t('visaBulletinAsOfPrefix')}
            <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{asOfDate}</span>
            {t('visaBulletinAsOfSuffix')}
          </span>
        </div>
      )}

      <VisaBulletinDashboard bulletin={bulletin} prior={prior} />

      {/* How to read */}
      <div className="card mt-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary-500)' }} />
          <div>
            <h3 className="font-bold text-base mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
              {t('visaBulletinHowToRead')}
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
              {t('visaBulletinHowToReadBody')}
            </p>
          </div>
        </div>
      </div>

      {/* Ask AI CTA */}
      <div className="mt-6 card flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: 'linear-gradient(135deg, var(--color-primary-50) 0%, #ffffff 100%)' }}>
        <div>
          <h3 className="font-bold text-base mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            {t('visaBulletinNotSurePD')}
          </h3>
          <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
            {t('visaBulletinNotSurePDBody')}
          </p>
        </div>
        <Link to="/chat?q=How do I find my priority date and read the visa bulletin?" className="btn-primary no-underline whitespace-nowrap">
          <MessageSquare className="h-4 w-4" /> {t('visaBulletinAskBtn')} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
