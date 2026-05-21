import { useState, useEffect, useRef } from 'react';
import { X, Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const BRAND = {
  navy: '#1B2D4F',
  red: '#C9384B',
  redDark: '#A52C3C',
  cream: '#F5F1E8',
  gold: '#E5B547',
  mutedNavy: '#5B6B85',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function KitDownloadModal({ isOpen, onClose, kitName }) {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setStatus('idle');
      setErrorMsg('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(focusTimer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus('error');
      setErrorMsg(t('kitModal.errorInvalid'));
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          source: 'kit-download',
          language,
          kit_name: kitName || '',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) {
        setStatus('error');
        setErrorMsg(t('kitModal.errorGeneric'));
        return;
      }
      setStatus('success');
      setTimeout(() => onClose(), 1500);
    } catch {
      setStatus('error');
      setErrorMsg(t('kitModal.errorGeneric'));
    }
  };

  const isSubmitting = status === 'submitting';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="kit-modal-title"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backgroundColor: 'rgba(27, 45, 79, 0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          backgroundColor: BRAND.cream,
          color: BRAND.navy,
          borderRadius: '20px',
          border: `2px solid ${BRAND.navy}`,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          padding: '28px 24px 24px',
          fontFamily: 'var(--font-body)',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t('kitModal.closeAria')}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: 'transparent',
            color: BRAND.navy,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X className="h-5 w-5" />
        </button>

        <div
          style={{
            width: '52px',
            height: '4px',
            borderRadius: '999px',
            backgroundColor: BRAND.gold,
            marginBottom: '14px',
          }}
        />

        <h2
          id="kit-modal-title"
          style={{
            margin: 0,
            fontFamily: 'var(--font-heading)',
            fontSize: '22px',
            lineHeight: 1.25,
            fontWeight: 800,
            color: BRAND.navy,
          }}
        >
          {t('kitModal.title')}
        </h2>
        <p
          style={{
            marginTop: '8px',
            marginBottom: '18px',
            fontSize: '15px',
            lineHeight: 1.45,
            color: BRAND.mutedNavy,
          }}
        >
          {t('kitModal.subtitle')}
        </p>

        {status === 'success' ? (
          <div
            role="status"
            aria-live="polite"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'rgba(229, 181, 71, 0.22)',
              border: `2px solid ${BRAND.navy}`,
              borderRadius: '14px',
              padding: '16px',
              color: BRAND.navy,
              fontWeight: 700,
            }}
          >
            <CheckCircle2 className="h-5 w-5" />
            <span>{t('kitModal.success')}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ position: 'relative' }}>
              <Mail
                className="h-5 w-5"
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: BRAND.mutedNavy,
                  pointerEvents: 'none',
                }}
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('kitModal.placeholder')}
                aria-label={t('kitModal.placeholder')}
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 46px',
                  minHeight: '50px',
                  borderRadius: '999px',
                  border: `2px solid ${BRAND.navy}`,
                  backgroundColor: '#FFFFFF',
                  color: BRAND.navy,
                  fontSize: '16px',
                  outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                marginTop: '12px',
                width: '100%',
                backgroundColor: isSubmitting ? BRAND.redDark : BRAND.red,
                color: '#FFFFFF',
                padding: '14px 20px',
                minHeight: '50px',
                borderRadius: '999px',
                border: `2px solid ${BRAND.red}`,
                fontSize: '16px',
                fontWeight: 700,
                cursor: isSubmitting ? 'wait' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
              <span>{isSubmitting ? t('kitModal.submitting') : t('kitModal.submit')}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{
                marginTop: '10px',
                width: '100%',
                backgroundColor: 'transparent',
                color: BRAND.mutedNavy,
                padding: '10px',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {t('kitModal.dismiss')}
            </button>

            {status === 'error' && errorMsg && (
              <p
                role="alert"
                style={{
                  marginTop: '10px',
                  marginBottom: 0,
                  color: BRAND.red,
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}
              >
                {errorMsg}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
