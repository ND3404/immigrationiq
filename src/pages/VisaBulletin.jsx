import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info, MessageSquare, ArrowRight } from 'lucide-react';
import {
  visaBulletinHistory,
  currentVisaBulletin,
  previousVisaBulletin,
} from '../data/visaBulletin';
import VisaBulletinDashboard from '../components/immigration/VisaBulletinDashboard';

export default function VisaBulletin() {
  const [bulletinIndex, setBulletinIndex] = useState(0);
  const bulletin = visaBulletinHistory[bulletinIndex] ?? currentVisaBulletin;
  const prior = visaBulletinHistory[bulletinIndex + 1] ?? previousVisaBulletin;

  return (
    <div className="page-container max-w-7xl">
      {/* Page intro */}
      <div className="mb-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="section-title m-0">Visa Bulletin</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-light)' }}>
              The U.S. Department of State publishes the Visa Bulletin monthly. Use the toggles below to switch between
              Final Action Dates and Dates for Filing, and between family- and employment-based categories.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="bulletin-month" className="text-xs uppercase tracking-wide font-semibold" style={{ color: 'var(--color-text-light)' }}>
              Month:
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
                  {b.label}{i === 0 ? ' (latest)' : ''}
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
              How to read this bulletin
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
              Find the row for your preference category and the column for your country of chargeability. If your priority
              date is <em>earlier</em> than the date shown, you may proceed with the next step in your case. The dates use
              the State Department's <code>DDMMMYY</code> format (e.g. <code>01JAN16</code> = January 1, 2016).{' '}
              <strong>"C"</strong> means Current — no waiting.
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
