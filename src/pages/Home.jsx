import { Link } from 'react-router-dom';
import {
  ArrowRight, MessageSquare, CalendarDays, FileText, Newspaper,
  CheckCircle, LayoutGrid, Search, Lock, Globe, Zap, Smartphone, Users,
  Calculator, FileCheck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { newsItems } from '../data/news';
import SEO from '../components/shared/SEO';
import Reveal from '../components/shared/Reveal';

const HOME_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ImmigrationIQ',
  url: 'https://www.immigrationiq.us',
  description: 'AI-powered U.S. immigration platform in Spanish — I-130 drafter, chat, and visa bulletin.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.immigrationiq.us/chat?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const HEADLINE_TERRACOTTA = '#C75B45';

// Brand palette — scoped to NEW elements on this page (do not touch global theme tokens)
const BRAND = {
  navy: '#1B2D4F',
  cream: '#F5F1E8',
  red: '#C9384B',
  gold: '#E5B547',
  mutedNavy: '#5B6B85',
};

const TRUST_STRIP = [
  { icon: Lock, key: 'homeTrustStripSecure' },
  { icon: Globe, key: 'homeTrustStripBilingual' },
  { icon: Zap, key: 'homeTrustStripInstant' },
  { icon: Smartphone, key: 'homeTrustStripDevices' },
];

export default function Home() {
  const { t } = useLanguage();

  return (
    <div>
      <SEO
        title="ImmigrationIQ | Tu plataforma de inmigración con IA"
        description="AI-powered U.S. immigration platform in Spanish — I-130 drafter, immigration chat, and real-time visa bulletin. Information, forms, and guidance from your phone."
        path="/"
        jsonLd={HOME_JSON_LD}
      />

      {/* ─── Hero (cream, brand-aligned) ─────────────────── */}
      <section style={{ backgroundColor: BRAND.cream }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 sm:pb-12">
          <div className="text-center">
            <p
              style={{
                color: BRAND.mutedNavy,
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                margin: 0,
                marginBottom: '12px',
              }}
            >
              ImmigrationIQ
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                color: BRAND.navy,
                fontSize: 'clamp(2rem, 6.5vw, 3.5rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                margin: 0,
                maxWidth: '46rem',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {t('i130.home.heroHeadline')}
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
              {t('i130.home.heroSubhead')}
            </p>
          </div>

          {/* 3-card CTA grid */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Card 1 — primary, largest (I-130) */}
            <Link
              to="/i-130"
              className="no-underline md:col-span-6 transition-all duration-150 hover:-translate-y-1 hover:shadow-2xl"
              style={{
                backgroundColor: BRAND.red,
                color: '#FFFFFF',
                borderRadius: '20px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                minHeight: '200px',
                boxShadow: '0 10px 30px rgba(201, 56, 75, 0.25)',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  margin: 0,
                  color: '#FFFFFF',
                }}
              >
                {t('i130.home.card1Title')}
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', margin: 0, flex: 1 }}>
                {t('i130.home.card1Desc')}
              </p>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: BRAND.gold,
                  color: BRAND.navy,
                  padding: '10px 18px',
                  borderRadius: '999px',
                  fontWeight: 800,
                  fontSize: '14px',
                  alignSelf: 'flex-start',
                }}
              >
                {t('i130.home.card1Cta')} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            {/* Card 2 — chat (navy) */}
            <Link
              to="/chat"
              className="no-underline md:col-span-3 transition-all duration-150 hover:-translate-y-1 hover:shadow-xl"
              style={{
                backgroundColor: BRAND.navy,
                color: '#FFFFFF',
                borderRadius: '20px',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                minHeight: '200px',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  backgroundColor: 'rgba(229, 181, 71, 0.3)',
                  color: BRAND.gold,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '20px',
                  fontWeight: 800,
                  lineHeight: 1.2,
                  margin: 0,
                  color: '#FFFFFF',
                }}
              >
                {t('i130.home.card2Title')}
              </h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', margin: 0, flex: 1 }}>
                {t('i130.home.card2Desc')}
              </p>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: BRAND.gold,
                  fontWeight: 700,
                  fontSize: '14px',
                }}
              >
                {t('i130.home.card2Cta')} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            {/* Card 3 — case tracker (white/gold) */}
            <Link
              to="/case-tracker"
              className="no-underline md:col-span-3 transition-all duration-150 hover:-translate-y-1 hover:shadow-xl"
              style={{
                backgroundColor: '#FFFFFF',
                color: BRAND.navy,
                borderRadius: '20px',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                minHeight: '200px',
                border: `2px solid ${BRAND.gold}`,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  backgroundColor: 'rgba(229, 181, 71, 0.25)',
                  color: BRAND.navy,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Search className="h-5 w-5" />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '20px',
                  fontWeight: 800,
                  lineHeight: 1.2,
                  margin: 0,
                  color: BRAND.navy,
                }}
              >
                {t('i130.home.toolsGrid.caseTitle')}
              </h3>
              <p style={{ fontSize: '14px', color: BRAND.mutedNavy, margin: 0, flex: 1 }}>
                {t('i130.home.toolsGrid.caseDesc')}
              </p>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: BRAND.navy,
                  fontWeight: 700,
                  fontSize: '14px',
                }}
              >
                {t('i130.home.toolsGrid.openCta')} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip — below hero (kept) */}
      <section
        className="border-y"
        style={{ backgroundColor: 'var(--color-primary-50)', borderColor: 'var(--color-primary-100)' }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium" style={{ color: 'var(--color-primary-700)' }}>
            {TRUST_STRIP.map(({ icon: Icon, key }) => (
              <li key={key} className="inline-flex items-center gap-1.5">
                <Icon className="h-4 w-4" style={{ color: 'var(--color-primary-500)' }} />
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Tools Grid (Phase 6.5 — brand-aligned, conversion-focused) ─── */}
      <section style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              color: BRAND.navy,
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              fontWeight: 800,
              textAlign: 'center',
              margin: 0,
              marginBottom: '28px',
            }}
          >
            {t('i130.home.toolsGrid.title')}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { to: '/visa-bulletin', icon: CalendarDays, titleKey: 'i130.home.card3Title', descKey: 'i130.home.card3Desc' },
              { to: '/fee-calculator', icon: Calculator, titleKey: 'i130.home.toolsGrid.feeTitle', descKey: 'i130.home.toolsGrid.feeDesc' },
              { to: '/kits', icon: FileCheck, titleKey: 'i130.home.toolsGrid.kitsTitle', descKey: 'i130.home.toolsGrid.kitsDesc' },
              { to: '/lawyers', icon: Users, titleKey: 'i130.home.toolsGrid.lawyersTitle', descKey: 'i130.home.toolsGrid.lawyersDesc' },
            ].map(({ to, icon: Icon, titleKey, descKey }) => (
              <Link
                key={to}
                to={to}
                className="no-underline transition-all duration-150 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg flex flex-col"
                style={{
                  backgroundColor: BRAND.cream,
                  color: BRAND.navy,
                  borderRadius: '16px',
                  padding: '20px',
                  border: `1px solid rgba(27, 45, 79, 0.15)`,
                  minHeight: '180px',
                  gap: '10px',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    color: BRAND.navy,
                    border: `1px solid rgba(27, 45, 79, 0.12)`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: BRAND.navy,
                    fontSize: '17px',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  {t(titleKey)}
                </h3>
                <p style={{ color: BRAND.mutedNavy, fontSize: '13px', lineHeight: 1.4, margin: 0, flexGrow: 1 }}>
                  {t(descKey)}
                </p>
                <span
                  style={{
                    color: BRAND.red,
                    fontWeight: 700,
                    fontSize: '13px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: 'auto',
                  }}
                >
                  {t('i130.home.toolsGrid.openCta')} <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section C — How It Works (kept) */}
      <section className="page-container">
        <h2 className="section-title text-center">{t('homeStepsHeading')}</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: LayoutGrid, titleKey: 'homeStepChooseTitle', descKey: 'homeStepChooseDesc', num: '1' },
            { icon: Search, titleKey: 'homeStepAskTitle', descKey: 'homeStepAskDesc', num: '2' },
            { icon: CheckCircle, titleKey: 'homeStepGetTitle', descKey: 'homeStepGetDesc', num: '3' },
          ].map(({ icon: Icon, titleKey, descKey, num }, idx) => (
            <Reveal key={num} delay={idx * 150} className="text-center">
              <div className="relative mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                <Icon className="h-7 w-7" style={{ color: 'var(--color-primary-500)' }} />
                <span
                  className="absolute -top-1 -right-1 h-6 w-6 rounded-full text-xs font-bold inline-flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-accent-400)', color: 'var(--color-primary-900)' }}
                >
                  {num}
                </span>
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
              >
                {t(titleKey)}
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>{t(descKey)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Section D — Latest news (Phase 6.5 compact) */}
      <section style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex items-baseline justify-between gap-3 mb-4">
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                color: BRAND.navy,
                fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                fontWeight: 800,
                margin: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Newspaper className="h-5 w-5" style={{ color: HEADLINE_TERRACOTTA }} />
              {t('i130.home.news.title')}
            </h2>
            <Link
              to="/news"
              className="no-underline inline-flex items-center gap-1"
              style={{ color: BRAND.red, fontWeight: 700, fontSize: '13px' }}
            >
              {t('i130.home.news.viewAll')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {newsItems.slice(0, 3).map((item) => {
              const title = item.title && typeof item.title === 'object'
                ? (item.title.es || item.title.en || '')
                : (item.title || '');
              const titleEn = item.title && typeof item.title === 'object'
                ? (item.title.en || '')
                : (item.title || '');
              return (
                <Link
                  key={item.id}
                  to="/news"
                  className="no-underline flex gap-3 transition-all hover:-translate-y-0.5"
                  style={{
                    backgroundColor: BRAND.cream,
                    borderRadius: '12px',
                    padding: '12px',
                    border: `1px solid rgba(27, 45, 79, 0.1)`,
                    minHeight: '88px',
                    maxHeight: '120px',
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '8px',
                      backgroundColor: BRAND.navy,
                      color: BRAND.gold,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    <Newspaper className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      title={titleEn}
                      style={{
                        fontFamily: 'var(--font-heading)',
                        color: BRAND.navy,
                        fontSize: '13px',
                        fontWeight: 700,
                        lineHeight: 1.3,
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {title}
                    </p>
                    <p style={{ color: BRAND.mutedNavy, fontSize: '11px', margin: '4px 0 0 0' }}>{item.date}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
