import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import NewsletterSignup from '../shared/NewsletterSignup';

const HEADING = 'rgba(255,255,255,0.95)';
const BODY = 'rgba(255,255,255,0.75)';
const BORDER = 'rgba(255,255,255,0.15)';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ backgroundColor: 'var(--color-primary-700)' }}>
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About + Newsletter */}
          <div>
            <Link to="/" className="inline-block mb-3 no-underline" aria-label="ImmigrationIQ home">
              <img src="/logo-full-white.svg" alt="ImmigrationIQ" className="h-9 w-auto" />
            </Link>
            <p className="text-sm mb-4" style={{ color: BODY }}>
              {t('footerAbout')}
            </p>
            <NewsletterSignup variant="compact" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold mb-3" style={{ color: HEADING }}>{t('footerQuickLinks')}</h3>
            <ul className="space-y-1">
              {[['/', t('home')], ['/categories', t('categories')], ['/chat', t('chat')], ['/timeline', t('timeline')], ['/services', t('services')], ['/contact', t('contact')]].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="block py-2 text-sm no-underline transition-colors hover:underline" style={{ color: BODY }}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold mb-3" style={{ color: HEADING }}>{t('footerOfficialResources')}</h3>
            <ul className="space-y-1">
              {[
                ['https://www.uscis.gov', 'USCIS.gov'],
                ['https://travel.state.gov', 'State Department'],
                ['https://www.ailalawyer.com', 'AILA Lawyer Search'],
                ['https://egov.uscis.gov/processing-times', t('processingTimes')],
              ].map(([url, label]) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 py-2 text-sm no-underline transition-colors hover:underline" style={{ color: BODY }}>
                    {label} <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold mb-3" style={{ color: HEADING }}>{t('footerLegal')}</h3>
            <ul className="space-y-2 text-sm" style={{ color: BODY }}>
              <li>{t('footerLegal1')}</li>
              <li>{t('footerLegal2')}</li>
              <li>{t('footerLegal3')}</li>
              <li className="font-semibold" style={{ color: 'var(--color-accent-300)' }}>{t('footerLegal4')}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t pt-6 text-center" style={{ borderColor: BORDER }}>
          <p className="text-xs" style={{ color: BODY }}>{t('copyright')}</p>
        </div>
      </div>

      {/* Slim disclaimer bar */}
      <div className="border-t px-4 py-3 text-center" style={{ backgroundColor: 'var(--color-primary-800)', borderColor: BORDER }}>
        <p className="text-[11px]" style={{ color: BODY }}>
          {t('disclaimer')}
        </p>
      </div>
    </footer>
  );
}
