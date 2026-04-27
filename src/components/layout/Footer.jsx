import { Scale, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import NewsletterSignup from '../shared/NewsletterSignup';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-white" style={{ borderColor: 'var(--color-border)' }}>
      <div className="mx-auto max-w-7xl px-4 pt-6 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About + Newsletter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Scale className="h-5 w-5" style={{ color: 'var(--color-primary-500)' }} />
              <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-500)' }}>
                Immigration<span style={{ color: 'var(--color-secondary-500)' }}>IQ</span>
              </span>
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-light)' }}>
              {t('footerAbout')}
            </p>
            <NewsletterSignup variant="compact" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>{t('footerQuickLinks')}</h3>
            <ul className="space-y-1">
              {[['/', t('home')], ['/categories', t('categories')], ['/chat', t('chat')], ['/timeline', t('timeline')], ['/checklist', t('checklist')], ['/contact', t('contact')]].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="block py-2 text-sm no-underline transition-colors hover:underline" style={{ color: 'var(--color-text-light)' }}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>{t('footerOfficialResources')}</h3>
            <ul className="space-y-1">
              {[
                ['https://www.uscis.gov', 'USCIS.gov'],
                ['https://travel.state.gov', 'State Department'],
                ['https://www.ailalawyer.com', 'AILA Lawyer Search'],
                ['https://egov.uscis.gov/processing-times', t('processingTimes')],
              ].map(([url, label]) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 py-2 text-sm no-underline transition-colors hover:underline" style={{ color: 'var(--color-text-light)' }}>
                    {label} <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>{t('footerLegal')}</h3>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-text-light)' }}>
              <li>{t('footerLegal1')}</li>
              <li>{t('footerLegal2')}</li>
              <li>{t('footerLegal3')}</li>
              <li className="font-semibold" style={{ color: 'var(--color-secondary-500)' }}>{t('footerLegal4')}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t pt-6 text-center" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-xs" style={{ color: 'var(--color-text-light)' }}>{t('copyright')}</p>
        </div>
      </div>

      {/* Slim disclaimer bar */}
      <div className="border-t px-4 py-3 text-center" style={{ backgroundColor: '#F3F4F6', borderColor: 'var(--color-border)' }}>
        <p className="text-[11px]" style={{ color: 'var(--color-text-light)' }}>
          {t('disclaimer')}
        </p>
      </div>
    </footer>
  );
}
