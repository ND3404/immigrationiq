import { Link, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function FloatingChatButton() {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  if (pathname.startsWith('/chat')) return null;

  return (
    <Link
      to="/chat"
      aria-label={t('floatingChatAria')}
      title={t('floatingChatAria')}
      className="group fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 inline-flex items-center justify-center rounded-full text-white no-underline transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 animate-float-pulse"
      style={{
        width: '60px',
        height: '60px',
        background: 'linear-gradient(135deg, var(--color-primary-700) 0%, var(--color-primary-500) 100%)',
        fontFamily: 'var(--font-heading)',
      }}
    >
      <Sparkles className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />

      {/* Free / Gratis badge */}
      <span
        className="absolute -top-1.5 -right-1.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide leading-none ring-2 ring-white"
        style={{ backgroundColor: 'var(--color-success-500)', color: '#ffffff' }}
      >
        {t('floatingChatFree')}
      </span>

      {/* Desktop label tooltip — appears on hover, sits to the left of the button */}
      <span
        className="hidden sm:block absolute right-[68px] top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md"
        style={{
          backgroundColor: 'var(--color-primary-700)',
          color: '#ffffff',
          fontFamily: 'var(--font-body)',
        }}
      >
        {t('floatingChatShort')}
      </span>
    </Link>
  );
}
