import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Download, ArrowLeft, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/shared/SEO';

const KIT_PDFS = {
  marriage: { titleKey: 'kitMarriageTitle', enPdf: '/kits/Marriage_Green_Card_Kit_EN.pdf' },
  naturalization: { titleKey: 'kitNaturalizationTitle', enPdf: '/kits/Naturalization_Kit_EN.pdf' },
  'naturalization-exam': { titleKey: 'kitNaturalizationExamTitle', enPdf: '/kits/Citizenship_Exam_Prep_Kit_EN.pdf' },
  daca: { titleKey: 'kitDacaTitle', enPdf: '/kits/DACA_Kit_EN.pdf' },
  eb1: { titleKey: 'kitEB1Title', enPdf: '/kits/EB1_Visa_Kit_EN.pdf' },
  eb2: { titleKey: 'kitEB2Title', enPdf: '/kits/EB2_Visa_Kit_EN.pdf' },
  eb3: { titleKey: 'kitEB3Title', enPdf: '/kits/EB3_Visa_Kit_EN.pdf' },
};

export default function KitThankYou() {
  const { t } = useLanguage();
  const [params] = useSearchParams();
  const kitId = params.get('kit');
  const kit = useMemo(() => (kitId ? KIT_PDFS[kitId] : null), [kitId]);

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

        {kit ? (
          <div className="mt-6">
            <p className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
              {t(kit.titleKey)}
            </p>
            <a
              href={kit.enPdf}
              download
              className="buy-now-btn inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold no-underline"
              style={{ backgroundColor: '#003087', color: '#ffffff', minHeight: '48px' }}
            >
              <Download className="h-5 w-5" />
              {t('thankYouDownloadBtn')}
            </a>
          </div>
        ) : (
          <div className="mt-6 text-left">
            <h2 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
              {t('thankYouFallbackTitle')}
            </h2>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-light)' }}>
              {t('thankYouFallbackBody')}
            </p>
            <ul className="space-y-2">
              {Object.entries(KIT_PDFS).map(([id, k]) => (
                <li key={id}>
                  <a
                    href={k.enPdf}
                    download
                    className="flex items-center justify-between gap-3 rounded-lg px-4 py-3 no-underline transition-colors hover:bg-[var(--color-primary-50)]"
                    style={{ border: '1px solid var(--color-border)', backgroundColor: '#ffffff' }}
                  >
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                      {t(k.titleKey)}
                    </span>
                    <Download className="h-4 w-4 flex-shrink-0" style={{ color: 'var(--color-primary-600)' }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-6 inline-flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-light)' }}>
          <Mail className="h-3.5 w-3.5" />
          {t('thankYouEmailNote')}
        </p>

        <div className="mt-8">
          <Link
            to="/services"
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
