import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { consumeJustUpdated } from '../pwa/registerPwa';

// Read the one-shot "just updated" flag once, at module load — before any
// (possibly StrictMode-doubled) render — so clearing sessionStorage happens
// exactly once and the value is stable across re-mounts. Safe during
// prerender/SSR: consumeJustUpdated() swallows storage-access errors.
const justUpdatedOnLoad = consumeJustUpdated();

// Small, non-blocking toast shown once after the service worker auto-updated
// the page (see registerPwa.js). Silent auto-update stays silent; this only
// exists to explain the sudden reload — visible for a few seconds, then gone.
export default function UpdateToast() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(justUpdatedOnLoad);

  useEffect(() => {
    if (!visible) return undefined;
    const hide = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(hide);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        left: '50%',
        bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        maxWidth: 'calc(100vw - 2rem)',
        padding: '0.625rem 1rem',
        borderRadius: '9999px',
        backgroundColor: 'var(--color-primary-700)',
        color: '#fff',
        fontSize: '0.875rem',
        fontWeight: 600,
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.35)',
        animation: 'iiq-toast-in 220ms ease-out',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: '0.5rem',
          height: '0.5rem',
          borderRadius: '9999px',
          backgroundColor: 'var(--color-accent-300, #7dd3fc)',
        }}
      />
      {t('pwaUpdatedToast')}
      <style>{`@keyframes iiq-toast-in{from{opacity:0;transform:translate(-50%,0.5rem)}to{opacity:1;transform:translate(-50%,0)}}`}</style>
    </div>
  );
}
