import { useState } from 'react';
import { Search, ExternalLink, Info, AlertTriangle, FileText, Clock, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/shared/SEO';

const RECEIPT_REGEX = /^[A-Za-z]{3}\d{10}$/;

const OTHER_TOOLS = [
  {
    icon: Clock,
    titleKey: 'caseTrackerOtherProcessing',
    descKey: 'caseTrackerOtherProcessingDesc',
    url: 'https://egov.uscis.gov/processing-times/',
  },
  {
    icon: Search,
    titleKey: 'caseTrackerOtherCaseLanding',
    descKey: 'caseTrackerOtherCaseLandingDesc',
    url: 'https://egov.uscis.gov/casestatus/landing.do',
  },
  {
    icon: Globe,
    titleKey: 'caseTrackerOtherCEAC',
    descKey: 'caseTrackerOtherCEACDesc',
    url: 'https://ceac.state.gov/ceac/',
  },
];

export default function CaseTracker() {
  const { t } = useLanguage();
  const [receipt, setReceipt] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = receipt.trim().toUpperCase();
    if (!RECEIPT_REGEX.test(value)) {
      setError(t('caseTrackerInvalid'));
      return;
    }
    setError('');
    const url = `https://egov.uscis.gov/casestatus/mycasestatus.do?appReceiptNum=${encodeURIComponent(value)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="page-container max-w-3xl">
      <SEO
        title="USCIS Case Status Tracker | Check Your Immigration Case | ImmigrationIQ"
        description="Track your USCIS immigration case status online. Enter your receipt number to check the status of your green card, work permit, citizenship, or visa application."
        path="/case-tracker"
      />

      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
          style={{ backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary-600)' }}
        >
          <Search className="h-3.5 w-3.5" />
          <span className="text-xs font-semibold uppercase tracking-wide">{t('caseTracker')}</span>
        </div>
        <h1 className="section-title">{t('caseTrackerTitle')}</h1>
        <p className="mt-3 text-base max-w-2xl mx-auto" style={{ color: 'var(--color-text-light)' }}>
          {t('caseTrackerSubtitle')}
        </p>
      </div>

      {/* Lookup card */}
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="receipt" className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-text)' }}>
              {t('caseTrackerInputLabel')}
            </label>
            <input
              id="receipt"
              type="text"
              autoComplete="off"
              spellCheck="false"
              value={receipt}
              onChange={(e) => { setReceipt(e.target.value); if (error) setError(''); }}
              placeholder={t('caseTrackerInputPlaceholder')}
              className="w-full rounded-lg border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-[var(--color-primary-400)] tracking-wider uppercase"
              style={{ borderColor: error ? 'var(--color-secondary-500)' : 'var(--color-border)', minHeight: '48px', fontFamily: 'var(--font-mono)' }}
              maxLength={13}
              aria-invalid={!!error}
              aria-describedby={error ? 'receipt-error' : undefined}
            />
            {error && (
              <p id="receipt-error" className="mt-2 text-sm flex items-start gap-1.5" style={{ color: 'var(--color-secondary-500)' }}>
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                {error}
              </p>
            )}
          </div>
          <button type="submit" className="btn-primary w-full sm:w-auto">
            <Search className="h-4 w-4" />
            {t('caseTrackerCheckBtn')}
            <ExternalLink className="h-3.5 w-3.5 opacity-80" />
          </button>
        </form>
      </div>

      {/* Where to find your receipt number */}
      <div
        className="mt-8 rounded-xl p-5 sm:p-6"
        style={{ backgroundColor: 'var(--color-primary-50)', border: '1px solid var(--color-primary-200)' }}
      >
        <div className="flex items-start gap-3">
          <div className="rounded-lg p-2 flex-shrink-0" style={{ backgroundColor: 'var(--color-primary-100)' }}>
            <Info className="h-5 w-5" style={{ color: 'var(--color-primary-600)' }} />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-700)' }}>
              {t('caseTrackerWhereTitle')}
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text)' }}>
              {t('caseTrackerWhereBody')}
            </p>
          </div>
        </div>

        {/* Visual example of I-797 receipt number location */}
        <figure className="mt-5">
          <div
            className="relative rounded-lg overflow-hidden bg-white"
            style={{ border: '1px solid var(--color-primary-200)' }}
          >
            <div
              className="px-4 py-2.5 text-[10px] font-semibold tracking-wider uppercase"
              style={{ backgroundColor: 'var(--color-primary-700)', color: 'white' }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" /> Form I-797, Notice of Action
                </span>
                <span className="opacity-70 hidden sm:inline">U.S. Citizenship and Immigration Services</span>
              </div>
            </div>
            <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs" style={{ color: 'var(--color-text)' }}>
              <div>
                <p className="font-semibold mb-1" style={{ color: 'var(--color-text-light)' }}>NOTICE TYPE</p>
                <p>Receipt Notice</p>
                <p className="font-semibold mt-3 mb-1" style={{ color: 'var(--color-text-light)' }}>CASE TYPE</p>
                <p>I-485, Application to Register Permanent Residence</p>
              </div>
              <div className="relative">
                <p className="font-semibold mb-1" style={{ color: 'var(--color-text-light)' }}>RECEIPT NUMBER</p>
                <div
                  className="inline-flex items-center rounded-md px-3 py-2 font-mono text-sm font-bold tracking-wider"
                  style={{
                    backgroundColor: 'var(--color-accent-100)',
                    color: 'var(--color-primary-800)',
                    border: '2px dashed var(--color-accent-500)',
                  }}
                >
                  EAC1234567890
                </div>
                <p className="font-semibold mt-3 mb-1" style={{ color: 'var(--color-text-light)' }}>RECEIVED DATE</p>
                <p>January 15, 2026</p>
                <span
                  className="absolute -top-1 right-0 text-[10px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5 hidden sm:inline-flex items-center"
                  style={{ backgroundColor: 'var(--color-accent-400)', color: 'var(--color-primary-900)' }}
                >
                  ← {t('caseTrackerInputLabel')}
                </span>
              </div>
            </div>
          </div>
          <figcaption className="mt-2 text-xs text-center" style={{ color: 'var(--color-text-light)' }}>
            {t('caseTrackerExampleCaption')}
          </figcaption>
        </figure>
      </div>

      {/* Other useful tracking tools */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
          {t('caseTrackerOtherToolsTitle')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {OTHER_TOOLS.map(({ icon: Icon, titleKey, descKey, url }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="card flex flex-col gap-2 no-underline transition-shadow hover:shadow-lg"
            >
              <div className="rounded-lg p-2 inline-flex self-start" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                <Icon className="h-5 w-5" style={{ color: 'var(--color-primary-500)' }} />
              </div>
              <h3 className="font-bold text-sm inline-flex items-center gap-1" style={{ color: 'var(--color-primary-600)' }}>
                {t(titleKey)} <ExternalLink className="h-3 w-3" />
              </h3>
              <p className="text-xs" style={{ color: 'var(--color-text-light)' }}>{t(descKey)}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div
        className="mt-8 rounded-lg p-4 flex items-start gap-3"
        style={{ backgroundColor: 'var(--color-warning-50)', border: '1px solid var(--color-accent-300)' }}
      >
        <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-accent-700)' }} />
        <p className="text-sm" style={{ color: 'var(--color-accent-800)' }}>
          {t('caseTrackerDisclaimer')}
        </p>
      </div>
    </div>
  );
}
