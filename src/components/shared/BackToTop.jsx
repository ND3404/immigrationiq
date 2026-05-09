import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function BackToTop() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={t('backToTop')}
      title={t('backToTop')}
      className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 inline-flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
      style={{
        width: '44px',
        height: '44px',
        backgroundColor: 'var(--color-primary-500)',
        color: '#ffffff',
        boxShadow: '0 6px 18px rgba(0, 48, 135, 0.35)',
      }}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
