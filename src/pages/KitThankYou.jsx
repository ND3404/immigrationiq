import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Download, ArrowLeft, Mail, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/shared/SEO';

const KIT_TITLES = {
  marriage: { kind: 'key', value: 'kitMarriageTitle' },
  naturalization: { kind: 'key', value: 'kitNaturalizationTitle' },
  'naturalization-exam': { kind: 'key', value: 'kitNaturalizationExamTitle' },
  daca: { kind: 'key', value: 'kitDacaTitle' },
  eb1: { kind: 'key', value: 'kitEB1Title' },
  eb2: { kind: 'key', value: 'kitEB2Title' },
  eb3: { kind: 'key', value: 'kitEB3Title' },
  'eb1-es': { kind: 'literal', value: 'Guía Visa EB-1 (Español)' },
  'eb2-es': { kind: 'literal', value: 'Guía Visa EB-2 (Español)' },
  'eb3-es': { kind: 'literal', value: 'Guía Visa EB-3 (Español)' },
};

export default function KitThankYou() {
  const { t } = useLanguage();
  const [params] = useSearchParams();
  const kitId = params.get('kit');
  const sessionId = params.get('session_id') || '';
  const sessionValid = sessionId.startsWith('cs_');
  const titleEntry = useMemo(() => (kitId ? KIT_TITLES[kitId] : null), [kitId]);
  const displayTitle = titleEntry
    ? (titleEntry.kind === 'key' ? t(titleEntry.value) : titleEntry.value)
    : null;

  if (!sessionValid) {
    return (
      <div className="page-container max-w-2xl">
        <SEO
          title="Access required — ImmigrationIQ Kits"
          description="Complete your purchase to download your immigration kit."
          path="/kits/thank-you"
        />
        <div
          className="rounded-2xl p-6 sm:p-10 text-center"
          style={{
            background: 'linear-gradient(180deg, var(--color-warning-50) 0%, #ffffff 100%)',
            border: '1px solid var(--color-accent-300)',
          }}
        >
          <div
            className="inline-flex items-center justify-center rounded-full mb-4"
            style={{
              width: 64,
              height: 64,
              backgroundColor: 'var(--color-accent-100)',
            }}
          >
            <AlertTriangle className="h-8 w-8" style={{ color: 'var(--color-accent-700)' }} />
          </div>
          <h1 className="section-title">{t('thankYouAccessDeniedTitle')}</h1>
          <p className="mt-3 text-base" style={{ color: 'var(--color-text-light)' }}>
            {t('thankYouAccessDeniedBody')}
          </p>
          <div className="mt-6">
            <Link
              to="/kits"
              className="buy-now-btn inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold no-underline"
              style={{ backgroundColor: '#003087', color: '#ffffff', minHeight: '48px' }}
            >
              <ArrowLeft className="h-4 w-4" />
              {t('thankYouBackToKits')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const downloadUrl = kitId
    ? `/api/download-kit?session_id=${encodeURIComponent(sessionId)}&kit=${encodeURIComponent(kitId)}`
    : null;

  return (
    <div className="page-container max-w-2xl">
      <SEO
        title="Thank You — Download Your Immigration Kit | ImmigrationIQ"
        description="Thank you for your purchase. Download your immigration document preparation kit."
        path="/kits/thank-you"
      />

      <div
        className="rounded-2xl p-6 sm:p-10 text-center"
        style={{
          background: 'linear-gradient(180deg, var(--color-primary-50) 0%, #ffffff 100%)',
          border: '1px solid var(--color-primary-200)',
        }}
      >
        <div
          className="inline-flex items-center justify-center rounded-full mb-4"
          style={{
            width: 64,
            height: 64,
            backgroundColor: 'var(--color-success-100)',
          }}
        >
          <CheckCircle2 className="h-9 w-9" style={{ color: 'var(--color-success-600)' }} />
        </div>

        <h1 className="section-title">{t('thankYouTitle')}</h1>
        <p className="mt-3 text-base" style={{ color: 'var(--color-text-light)' }}>
          {t('thankYouSubtitle')}
        </p>

        {downloadUrl ? (
          <div className="mt-6">
            {displayTitle && (
              <p className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                {displayTitle}
              </p>
            )}
            <a
              href={downloadUrl}
              className="buy-now-btn inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold no-underline"
              style={{ backgroundColor: '#003087', color: '#ffffff', minHeight: '48px' }}
            >
              <Download className="h-5 w-5" />
              {t('thankYouDownloadBtn')}
            </a>
            <p
              className="mt-4 text-sm font-semibold"
              style={{ color: 'var(--color-accent-700)' }}
            >
              {t('thankYouLinkExpiresNote')}
            </p>
          </div>
        ) : (
          <p className="mt-6 text-sm" style={{ color: 'var(--color-text-light)' }}>
            {t('thankYouFallbackBody')}
          </p>
        )}

        <p className="mt-6 inline-flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-light)' }}>
          <Mail className="h-3.5 w-3.5" />
          {t('thankYouEmailNote')}
        </p>

        <div className="mt-8">
          <Link
            to="/kits"
            className="inline-flex items-center gap-1.5 text-sm font-semibold no-underline"
            style={{ color: 'var(--color-primary-600)' }}
          >
            <ArrowLeft className="h-4 w-4" />
            {t('thankYouBackToKits')}
          </Link>
        </div>
      </div>
    </div>
  );
}
