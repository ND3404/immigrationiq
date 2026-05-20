import { Link } from 'react-router-dom';
import { Check, Sparkles, FileText, ClipboardCheck, Printer, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/shared/SEO';
import EmailCaptureForm from '../components/shared/EmailCaptureForm';
import ServiceTile from '../components/shared/ServiceTile';
import WhatsAppButton from '../components/shared/WhatsAppButton';

const BRAND = {
  navy: '#1B2D4F',
  cream: '#F5F1E8',
  red: '#C9384B',
  gold: '#E5B547',
  mutedNavy: '#5B6B85',
};

const WHATSAPP_NUMBER = '+1 385-201-7220';

export default function I130ComingSoon() {
  const { t } = useLanguage();

  const howItWorksSteps = [
    { icon: ClipboardCheck, titleKey: 'i130.howItWorks.step1Title', descKey: 'i130.howItWorks.step1Desc' },
    { icon: Sparkles, titleKey: 'i130.howItWorks.step2Title', descKey: 'i130.howItWorks.step2Desc' },
    { icon: Printer, titleKey: 'i130.howItWorks.step3Title', descKey: 'i130.howItWorks.step3Desc' },
  ];

  const includedItems = [
    { titleKey: 'i130.included.b1Title', descKey: 'i130.included.b1Desc' },
    { titleKey: 'i130.included.b2Title', descKey: 'i130.included.b2Desc' },
    { titleKey: 'i130.included.b3Title', descKey: 'i130.included.b3Desc' },
  ];

  const comingSoonServices = [
    { code: 'I-485', titleKey: 'i130.services.i485Title', descKey: 'i130.services.i485Desc' },
    { code: 'I-864', titleKey: 'i130.services.i864Title', descKey: 'i130.services.i864Desc' },
    { code: 'I-765', titleKey: 'i130.services.i765Title', descKey: 'i130.services.i765Desc' },
    { code: 'N-400', titleKey: 'i130.services.n400Title', descKey: 'i130.services.n400Desc' },
  ];

  const sectionPad = 'px-4 sm:px-6 lg:px-8 py-12 sm:py-16';

  return (
    <div style={{ backgroundColor: BRAND.cream, color: BRAND.navy, fontFamily: 'var(--font-body)' }}>
      <SEO
        title={t('i130.seo.title')}
        description={t('i130.seo.description')}
        path="/i-130"
      />

      {/* ─── Section 1 — Hero ─────────────────────────────── */}
      <section style={{ backgroundColor: BRAND.cream }}>
        <div className={`max-w-3xl mx-auto ${sectionPad} text-center`}>
          <p
            style={{
              color: BRAND.mutedNavy,
              fontSize: '13px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            ImmigrationIQ · {t('i130.hero.tagline')}
          </p>
          <p
            style={{
              display: 'inline-block',
              backgroundColor: BRAND.navy,
              color: BRAND.gold,
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            {t('i130.product.name')}
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              color: BRAND.navy,
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {t('i130.hero.headline')}
          </h1>
          <p
            style={{
              marginTop: '16px',
              fontSize: '18px',
              lineHeight: 1.5,
              color: BRAND.mutedNavy,
              maxWidth: '36rem',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {t('i130.hero.subheadline')}
          </p>

          <div style={{ marginTop: '32px', maxWidth: '28rem', marginLeft: 'auto', marginRight: 'auto' }}>
            <EmailCaptureForm source="i-130-coming-soon" />
            <p
              style={{
                marginTop: '14px',
                fontSize: '13px',
                color: BRAND.mutedNavy,
                lineHeight: 1.45,
              }}
            >
              {t('i130.hero.priceNote')}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Section 2 — How It Works ─────────────────────── */}
      <section style={{ backgroundColor: BRAND.cream }}>
        <div className={`max-w-5xl mx-auto ${sectionPad}`}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              color: BRAND.navy,
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 800,
              textAlign: 'center',
              margin: 0,
              marginBottom: '40px',
            }}
          >
            {t('i130.howItWorks.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map(({ icon: Icon, titleKey, descKey }) => (
              <div key={titleKey} className="text-center">
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '999px',
                    backgroundColor: BRAND.navy,
                    color: BRAND.gold,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: BRAND.navy,
                    fontSize: '20px',
                    fontWeight: 700,
                    margin: 0,
                    marginBottom: '8px',
                  }}
                >
                  {t(titleKey)}
                </h3>
                <p style={{ color: BRAND.mutedNavy, fontSize: '15px', lineHeight: 1.5, margin: 0 }}>
                  {t(descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 3 — What's Included (navy) ───────────── */}
      <section style={{ backgroundColor: BRAND.navy, color: '#FFFFFF' }}>
        <div className={`max-w-5xl mx-auto ${sectionPad}`}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              color: '#FFFFFF',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 800,
              textAlign: 'center',
              margin: 0,
              marginBottom: '40px',
            }}
          >
            {t('i130.included.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {includedItems.map(({ titleKey, descKey }) => (
              <div
                key={titleKey}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: `1px solid rgba(229, 181, 71, 0.3)`,
                  borderRadius: '16px',
                  padding: '24px',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '999px',
                    backgroundColor: BRAND.gold,
                    color: BRAND.navy,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                  }}
                  aria-hidden="true"
                >
                  <Check className="h-5 w-5" strokeWidth={3} />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: '#FFFFFF',
                    fontSize: '18px',
                    fontWeight: 700,
                    margin: 0,
                    marginBottom: '8px',
                  }}
                >
                  {t(titleKey)}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '15px', lineHeight: 1.5, margin: 0 }}>
                  {t(descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 3.5 — For individuals and professionals (dual audience) ── */}
      <section style={{ backgroundColor: BRAND.cream }}>
        <div className={`max-w-4xl mx-auto ${sectionPad}`}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: `2px solid ${BRAND.navy}`,
              borderRadius: '20px',
              padding: '32px 24px',
            }}
          >
            <p
              style={{
                display: 'inline-block',
                backgroundColor: BRAND.gold,
                color: BRAND.navy,
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700,
                marginBottom: '16px',
              }}
            >
              {t('i130.b2b.badge')}
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                color: BRAND.navy,
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 800,
                margin: 0,
                marginBottom: '12px',
                lineHeight: 1.15,
              }}
            >
              {t('i130.b2b.title')}
            </h2>
            <p
              style={{
                color: BRAND.mutedNavy,
                fontSize: '16px',
                lineHeight: 1.5,
                margin: 0,
                marginBottom: '24px',
              }}
            >
              {t('i130.b2b.subtitle')}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '28px' }}>
              {['i130.b2b.bullet1', 'i130.b2b.bullet2', 'i130.b2b.bullet3'].map((bulletKey) => (
                <li
                  key={bulletKey}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '8px 0',
                    color: BRAND.navy,
                    fontSize: '15px',
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '999px',
                      backgroundColor: BRAND.gold,
                      color: BRAND.navy,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '1px',
                    }}
                    aria-hidden="true"
                  >
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span>{t(bulletKey)}</span>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <WhatsAppButton
                number={WHATSAPP_NUMBER}
                message={t('i130.b2b.whatsappMessage')}
                label={t('i130.b2b.cta')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 4 — Price comparison ─────────────────── */}
      <section style={{ backgroundColor: BRAND.cream }}>
        <div className={`max-w-4xl mx-auto ${sectionPad}`}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              color: BRAND.navy,
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              fontWeight: 800,
              textAlign: 'center',
              margin: 0,
              marginBottom: '32px',
            }}
          >
            {t('i130.price.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Lawyer card */}
            <div
              style={{
                border: `2px solid rgba(27, 45, 79, 0.18)`,
                borderRadius: '16px',
                padding: '24px',
                backgroundColor: '#FFFFFF',
                textAlign: 'center',
              }}
            >
              <p style={{ color: BRAND.mutedNavy, fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
                {t('i130.price.lawyerLabel')}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '32px',
                  fontWeight: 800,
                  color: BRAND.mutedNavy,
                  textDecoration: 'line-through',
                  margin: '8px 0 0 0',
                }}
              >
                {t('i130.price.lawyerAmount')}
              </p>
              <p style={{ color: BRAND.mutedNavy, fontSize: '14px', margin: '8px 0 0 0' }}>
                {t('i130.price.lawyerNote')}
              </p>
            </div>
            {/* ImmigrationIQ card */}
            <div
              style={{
                border: `3px solid ${BRAND.gold}`,
                borderRadius: '16px',
                padding: '24px',
                backgroundColor: '#FFFFFF',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: BRAND.gold,
                  color: BRAND.navy,
                  padding: '4px 14px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('i130.price.recommended')}
              </span>
              <p style={{ color: BRAND.navy, fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
                {t('i130.price.iiqLabel')}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '40px',
                  fontWeight: 900,
                  color: BRAND.red,
                  margin: '8px 0 0 0',
                  lineHeight: 1,
                }}
              >
                $39
              </p>
              <p style={{ color: BRAND.navy, fontSize: '14px', margin: '8px 0 0 0', fontWeight: 600 }}>
                {t('i130.price.iiqLaunchNote')}
              </p>
              <p style={{ color: BRAND.mutedNavy, fontSize: '13px', margin: '4px 0 0 0' }}>
                {t('i130.price.iiqRegularNote')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 5 — Coming Soon services ─────────────── */}
      <section style={{ backgroundColor: BRAND.cream }}>
        <div className={`max-w-5xl mx-auto ${sectionPad}`}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              color: BRAND.navy,
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              fontWeight: 800,
              textAlign: 'center',
              margin: 0,
              marginBottom: '32px',
            }}
          >
            {t('i130.services.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {comingSoonServices.map((s) => (
              <ServiceTile
                key={s.code}
                formCode={s.code}
                title={t(s.titleKey)}
                description={t(s.descKey)}
                status="coming-soon"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 6 — WhatsApp + Trust ─────────────────── */}
      <section style={{ backgroundColor: BRAND.cream }}>
        <div className={`max-w-2xl mx-auto ${sectionPad} text-center`}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              color: BRAND.navy,
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 800,
              margin: 0,
              marginBottom: '20px',
            }}
          >
            {t('i130.whatsapp.title')}
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WhatsAppButton
              number={WHATSAPP_NUMBER}
              message={t('i130.whatsapp.message')}
              label={t('i130.whatsapp.label')}
            />
          </div>
          <p
            style={{
              marginTop: '20px',
              color: BRAND.mutedNavy,
              fontSize: '14px',
              lineHeight: 1.5,
            }}
          >
            {t('i130.whatsapp.trust')}
          </p>
        </div>
      </section>

      {/* ─── Cross-link to /kits educational guide ────────── */}
      <section style={{ backgroundColor: BRAND.cream }}>
        <div className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8`}>
          <div
            style={{
              backgroundColor: 'rgba(27, 45, 79, 0.05)',
              border: `1px dashed rgba(27, 45, 79, 0.25)`,
              borderRadius: '12px',
              padding: '16px 20px',
              textAlign: 'center',
            }}
          >
            <Link
              to="/kits"
              className="no-underline inline-flex items-center gap-2 hover:gap-3 transition-all"
              style={{
                color: BRAND.navy,
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              <FileText className="h-4 w-4" />
              <span>{t('i130.kitsLink.text')}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Section 7 — Legal disclaimer (both languages) ── */}
      <section style={{ backgroundColor: BRAND.cream, borderTop: `1px solid rgba(27, 45, 79, 0.1)` }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p
            style={{
              color: BRAND.mutedNavy,
              fontSize: '12px',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            <strong style={{ color: BRAND.navy }}>Aviso legal:</strong>{' '}
            ImmigrationIQ no es un bufete de abogados y no proporciona asesoría legal. Este servicio es una herramienta
            de auto-ayuda para preparar documentos. Para asesoría legal sobre su caso específico, consulte un abogado
            de inmigración licenciado.
          </p>
          <p
            style={{
              color: BRAND.mutedNavy,
              fontSize: '12px',
              lineHeight: 1.6,
              margin: '12px 0 0 0',
            }}
          >
            <strong style={{ color: BRAND.navy }}>Legal disclaimer:</strong>{' '}
            ImmigrationIQ is not a law firm and does not provide legal advice. This service is a self-help tool to
            prepare documents. For legal advice on your specific case, consult a licensed immigration attorney.
          </p>
        </div>
      </section>
    </div>
  );
}
