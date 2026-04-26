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

export default function VisaBulletin() {
  const { t } = useLanguage();
  const [bulletinIndex, setBulletinIndex] = useState(0);
  const bulletin = visaBulletinHistory[bulletinIndex] ?? currentVisaBulletin;
  const prior = visaBulletinHistory[bulletinIndex + 1] ?? previousVisaBulletin;

  return (
    <div className="page-container max-w-7xl">
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
