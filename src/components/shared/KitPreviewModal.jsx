import { useEffect, useRef } from 'react';
import { X, Lock, FileText, Globe2, CheckCircle2, Download } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function KitPreviewModal({ kit, open, onClose }) {
  const { t, language } = useLanguage();
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open || !kit) return null;

  const Icon = kit.icon;
  const bullets = kit.previewBullets?.[language] || kit.previewBullets?.en || [];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-stretch sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="kit-preview-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label={t('servicesPreviewClose')}
        onClick={onClose}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm cursor-default"
      />

      {/* Dialog */}
      <div
        className="relative w-full sm:max-w-2xl sm:mx-4 bg-white sm:rounded-2xl shadow-2xl flex flex-col max-h-screen sm:max-h-[90vh] animate-fade-in-up"
        style={{ borderTop: '4px solid var(--color-primary-500)' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 sm:px-6 pt-5 pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-start gap-3 min-w-0">
            <div className="rounded-xl p-2.5 flex-shrink-0" style={{ backgroundColor: 'var(--color-primary-50)' }}>
              {Icon ? <Icon className="h-6 w-6" style={{ color: 'var(--color-primary-500)' }} /> : null}
            </div>
            <div className="min-w-0">
              <h2 id="kit-preview-title" className="text-lg sm:text-xl font-bold leading-snug" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                {t(kit.titleKey)}
              </h2>
              <p className="mt-1 inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-xs" style={{ color: 'var(--color-text-light)' }}>
                <span className="inline-flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  {kit.pages} {t('servicesPreviewPagesLabel')}
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="font-semibold" style={{ color: '#2c5282' }}>${kit.price}</span>
                </span>
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                  style={{ backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary-700)' }}
                >
                  <Globe2 className="h-3 w-3" />
                  {t('servicesPreviewLanguageLabel')}
                </span>
              </p>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label={t('servicesPreviewClose')}
            className="rounded-full p-2 -mr-1 transition-colors hover:bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]"
          >
            <X className="h-5 w-5" style={{ color: 'var(--color-text-light)' }} />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="px-5 sm:px-6 py-5 overflow-y-auto flex-1">
          {/* Cover */}
          <div
            className="rounded-xl mb-5 flex items-center justify-center overflow-hidden"
            style={{
              aspectRatio: '16 / 9',
              background: 'linear-gradient(135deg, var(--color-primary-700) 0%, var(--color-primary-500) 100%)',
            }}
          >
            {kit.coverImage ? (
              <img
                src={kit.coverImage}
                alt=""
                width="640"
                height="360"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-white text-center px-6 py-8">
                {Icon ? <Icon className="h-10 w-10 sm:h-12 sm:w-12 mb-3" /> : null}
                <p className="text-sm sm:text-base font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                  {t(kit.titleKey)}
                </p>
                <p className="text-xs mt-1 opacity-80">ImmigrationIQ</p>
              </div>
            )}
          </div>

          {/* What's Inside */}
          <h3 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: 'var(--color-primary-700)' }}>
            {t('servicesPreviewHeading')}
          </h3>
          <ul className="space-y-2">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
                <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-success-500)' }} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-4 border-t flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-3" style={{ borderColor: 'var(--color-border)' }}>
          <button
            type="button"
            onClick={onClose}
            className="order-3 sm:order-1 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
            style={{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
              minHeight: '44px',
            }}
          >
            {t('servicesPreviewClose')}
          </button>
          {kit.esPdf && (
            <a
              href={kit.esPdf}
              download
              className="order-2 rounded-full px-5 py-2.5 text-sm font-semibold no-underline inline-flex items-center justify-center gap-1.5 transition-colors hover:bg-[var(--color-primary-50)]"
              style={{
                backgroundColor: '#ffffff',
                color: 'var(--color-primary-700)',
                border: '2px solid var(--color-primary-500)',
                minHeight: '44px',
              }}
            >
              <Download className="h-4 w-4" />
              {t('servicesFreeSpanishDownload')}
            </a>
          )}
          {kit.stripeUrl && (
            <a
              href={kit.stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="buy-now-btn order-1 sm:order-3 rounded-full px-5 py-2.5 text-sm font-semibold no-underline inline-flex items-center justify-center gap-1.5 transition-colors"
              style={{ backgroundColor: '#003087', color: '#ffffff', minHeight: '44px' }}
            >
              <Lock className="h-4 w-4" />
              {t('servicesBuyNow')} — ${kit.price}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
