import { useState } from 'react';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const BRAND = {
  navy: '#1B2D4F',
  red: '#C9384B',
  redDark: '#A52C3C',
  cream: '#F5F1E8',
  mutedNavy: '#5B6B85',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailCaptureForm({ source = 'i-130-launch' }) {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus('error');
      setErrorMsg(t('i130.email.errorInvalid'));
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source, language }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 502) {
        setStatus('error');
        setErrorMsg(
          language === 'es'
            ? 'Hubo un error. Por favor intenta de nuevo.'
            : 'There was an error. Please try again.'
        );
        return;
      }

      if (!res.ok || data.success === false) {
        setStatus('error');
        setErrorMsg(data.error || t('i130.email.errorGeneric'));
        return;
      }

      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setErrorMsg(t('i130.email.errorNetwork'));
    }
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          backgroundColor: 'rgba(229, 181, 71, 0.18)',
          border: `2px solid ${BRAND.navy}`,
          borderRadius: '16px',
          padding: '20px',
          color: BRAND.navy,
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          fontFamily: 'var(--font-body)',
        }}
      >
        <CheckCircle2 className="h-6 w-6 flex-shrink-0" style={{ color: BRAND.navy }} />
        <p style={{ margin: 0, fontWeight: 600, lineHeight: 1.4 }}>{t('i130.email.success')}</p>
      </div>
    );
  }

  const isSubmitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full" style={{ fontFamily: 'var(--font-body)' }}>
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Mail
            className="absolute top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none"
            style={{ left: '16px', color: BRAND.mutedNavy }}
            aria-hidden="true"
          />
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('i130.email.placeholder')}
            aria-label={t('i130.email.placeholder')}
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '16px 16px 16px 48px',
              minHeight: '52px',
              borderRadius: '999px',
              border: `2px solid ${BRAND.navy}`,
              backgroundColor: '#FFFFFF',
              color: BRAND.navy,
              fontSize: '16px',
              outline: 'none',
            }}
            onFocus={(e) => { e.target.style.boxShadow = `0 0 0 4px rgba(229, 181, 71, 0.45)`; }}
            onBlur={(e) => { e.target.style.boxShadow = 'none'; }}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            backgroundColor: isSubmitting ? BRAND.redDark : BRAND.red,
            color: '#FFFFFF',
            padding: '16px 24px',
            minHeight: '52px',
            borderRadius: '999px',
            border: `2px solid ${BRAND.red}`,
            fontSize: '16px',
            fontWeight: 700,
            cursor: isSubmitting ? 'wait' : 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'transform 150ms ease-out, box-shadow 150ms ease-out',
            lineHeight: 1.15,
          }}
          className="hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
        >
          {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
          <span>{isSubmitting ? t('i130.email.submitting') : t('i130.email.submit')}</span>
        </button>
      </div>
      {status === 'error' && errorMsg && (
        <p
          role="alert"
          style={{
            marginTop: '10px',
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
  );
}
