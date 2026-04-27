import { useState } from 'react';
import { Mail, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const NEWSLETTER_FORMSPREE_ENDPOINT = 'https://formspree.io/f/newsletterplaceholder';

export default function NewsletterSignup({ variant = 'banner' }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || status === 'submitting') return;
    setStatus('submitting');
    try {
      const res = await fetch(NEWSLETTER_FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, source: variant }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (variant === 'compact') {
    return (
      <div
        className="rounded-lg p-4"
        style={{ background: 'linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-500) 100%)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Mail className="h-4 w-4 text-white" />
          <h3 className="text-sm font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            {t('newsletterFooterTitle')}
          </h3>
        </div>
        <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.85)' }}>
          {t('newsletterFooterSubtitle')}
        </p>

        {status === 'success' ? (
          <div className="flex items-start gap-2 rounded p-2" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-white" />
            <p className="text-xs text-white">{t('newsletterSuccess')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletterEmailPlaceholder')}
              aria-label={t('newsletterEmailPlaceholder')}
              className="w-full rounded-md px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-white/60"
              style={{ color: 'var(--color-text)', minHeight: '40px' }}
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full rounded-md px-3 py-2 text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-1.5"
              style={{ backgroundColor: 'var(--color-secondary-500)', color: '#ffffff', minHeight: '40px' }}
            >
              <Send className="h-3.5 w-3.5" />
              {status === 'submitting' ? t('newsletterSubmitting') : t('newsletterSubmit')}
            </button>
            {status === 'error' && (
              <p className="text-xs flex items-start gap-1.5" style={{ color: '#ffd6d6' }}>
                <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                {t('newsletterError')}
              </p>
            )}
          </form>
        )}
      </div>
    );
  }

  // banner (homepage)
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--color-primary-700) 0%, var(--color-primary-500) 100%)' }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
          <div className="lg:col-span-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <Mail className="h-3.5 w-3.5 text-white" />
              <span className="text-xs font-semibold uppercase tracking-wide text-white">
                {t('newsletterSubmit')}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('newsletterTitle')}
            </h2>
            <p className="mt-3 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.9)' }}>
              {t('newsletterSubtitle')}
            </p>
          </div>

          <div className="lg:col-span-2">
            {status === 'success' ? (
              <div
                className="flex items-start gap-3 rounded-lg p-4"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-white" />
                <p className="text-sm text-white">{t('newsletterSuccess')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('newsletterEmailPlaceholder')}
                    aria-label={t('newsletterEmailPlaceholder')}
                    className="flex-1 rounded-full px-5 py-3 text-base bg-white outline-none focus:ring-2 focus:ring-white/60"
                    style={{ color: 'var(--color-text)', minHeight: '48px' }}
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="rounded-full px-6 py-3 text-sm font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
                    style={{ backgroundColor: 'var(--color-secondary-500)', color: '#ffffff', minHeight: '48px' }}
                  >
                    <Send className="h-4 w-4" />
                    {status === 'submitting' ? t('newsletterSubmitting') : t('newsletterSubmit')}
                  </button>
                </div>
                {status === 'error' ? (
                  <p className="text-xs flex items-start gap-1.5" style={{ color: '#ffd6d6' }}>
                    <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                    {t('newsletterError')}
                  </p>
                ) : (
                  <p className="text-[11px] text-center sm:text-left" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {t('newsletterPrivacy')}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
