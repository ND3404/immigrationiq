import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, ArrowRight, MessageSquare, Calculator, CalendarDays,
  CheckCircle, LayoutGrid, Newspaper, Lock, Globe, Zap, Smartphone,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { newsItems } from '../data/news';
import NewsCard from '../components/shared/NewsCard';
import NewsletterSignup from '../components/shared/NewsletterSignup';
import SEO from '../components/shared/SEO';
import Reveal from '../components/shared/Reveal';

const HOME_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ImmigrationIQ',
  url: 'https://www.immigrationiq.us',
  description: 'Free AI-powered U.S. immigration assistant providing guidance in English and Spanish',
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

const TRUST_STRIP = [
  { icon: Lock, key: 'homeTrustStripSecure' },
  { icon: Globe, key: 'homeTrustStripBilingual' },
  { icon: Zap, key: 'homeTrustStripInstant' },
  { icon: Smartphone, key: 'homeTrustStripDevices' },
];

const SECONDARY_TOOLS = [
  {
    to: '/visa-bulletin',
    icon: CalendarDays,
    titleKey: 'homeToolVBTitle',
    descKey: 'homeToolVBDesc',
    ctaKey: 'homeToolVBCta',
  },
  {
    to: '/case-tracker',
    icon: Search,
    titleKey: 'homeToolCaseTitle',
    descKey: 'homeToolCaseDesc',
    ctaKey: 'homeToolCaseCta',
  },
  {
    to: '/fee-calculator',
    icon: Calculator,
    titleKey: 'homeToolFeeTitle',
    descKey: 'homeToolFeeDesc',
    ctaKey: 'homeToolFeeCta',
  },
];

export default function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) navigate(`/chat?q=${encodeURIComponent(searchValue)}`);
  };

  return (
    <div>
      <SEO
        title="ImmigrationIQ | Free AI-Powered U.S. Immigration Assistant in English & Spanish"
        description="Free AI-powered U.S. immigration assistant providing guidance on visas, green cards, and citizenship in English and Spanish. Step-by-step processes, document checklists, and lawyer directory."
        path="/"
        jsonLd={HOME_JSON_LD}
      />

      {/* Section A — Hero (compact ~60vh) */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary-900) 0%, var(--color-primary-600) 50%, var(--color-primary-500) 100%)',
          minHeight: '60vh',
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:py-20 text-center w-full">
          <div className="animate-fade-in-up">
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('heroTitle')}
            </h1>
            <p className="mt-4 sm:mt-5 text-base sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              {t('heroSubtitleNew')}
            </p>

            {/* Search bar — animated glow */}
            <form onSubmit={handleSearch} className="mt-7 sm:mt-9 mx-auto max-w-2xl">
              <div className="relative rounded-full animate-pulse-glow" style={{ boxShadow: '0 0 0 2px rgba(245, 166, 35, 0.45)' }}>
                <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full rounded-full bg-white py-4 pl-12 pr-4 sm:pr-36 text-base shadow-xl outline-none"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}
                />
                <Link
                  to="/chat"
                  className="btn-secondary hidden sm:inline-flex absolute right-2 top-1/2 -translate-y-1/2 rounded-full no-underline"
                >
                  <MessageSquare className="h-4 w-4" /> {t('askAI')}
                </Link>
              </div>
              <Link to="/chat" className="btn-secondary sm:hidden mt-3 w-full no-underline rounded-full">
                <MessageSquare className="h-4 w-4" /> {t('askAI')}
              </Link>
            </form>

            {/* Trust indicators */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium" style={{ color: 'rgba(255,255,255,0.9)' }}>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4" style={{ color: 'var(--color-accent-300)' }} />
                {t('homeTrustFree')}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4" style={{ color: 'var(--color-accent-300)' }} />
                {t('homeTrustBilingual')}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4" style={{ color: 'var(--color-accent-300)' }} />
                {t('homeTrustUpdatedDaily')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip — below hero */}
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

      {/* Section B — Tools Dashboard */}
      <section className="page-container">
        <div className="text-center mb-8">
          <h2 className="section-title">{t('homeToolsHeading')}</h2>
          <p className="mt-2 text-base max-w-2xl mx-auto" style={{ color: 'var(--color-text-light)' }}>
            {t('homeToolsSubheading')}
          </p>
        </div>

        {/* Featured AI Chat tool — full width, navy background */}
        <Reveal
          as={Link}
          to="/chat"
          className="tool-card block rounded-2xl no-underline transition-all duration-200 hover:shadow-2xl hover:-translate-y-1"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary-700) 0%, var(--color-primary-500) 100%)',
            boxShadow: '0 10px 30px rgba(0, 48, 135, 0.25)',
          }}
        >
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5">
            <div
              className="tool-icon rounded-2xl p-4 self-start flex-shrink-0"
              style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
            >
              <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className="text-xl sm:text-2xl font-bold text-white mb-1.5"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {t('homeToolAIChatTitle')}
              </h3>
              <p className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {t('homeToolAIChatDesc')}
              </p>
            </div>
            <span
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold whitespace-nowrap self-start sm:self-auto flex-shrink-0"
              style={{ backgroundColor: 'var(--color-accent-400)', color: 'var(--color-primary-900)' }}
            >
              {t('homeToolAIChatCta')} <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Reveal>

        {/* Secondary tools — 3 cards, navy-bordered */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
          {SECONDARY_TOOLS.map(({ to, icon: Icon, titleKey, descKey, ctaKey }, idx) => (
            <Reveal
              key={to}
              as={Link}
              to={to}
              delay={idx * 100}
              className="tool-card rounded-2xl bg-white p-6 no-underline flex flex-col h-full transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
              style={{ border: '2px solid var(--color-primary-500)' }}
            >
              <div
                className="tool-icon rounded-xl inline-flex p-3 mb-4 self-start"
                style={{ backgroundColor: 'var(--color-primary-50)' }}
              >
                <Icon className="h-6 w-6" style={{ color: 'var(--color-primary-500)' }} />
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
              >
                {t(titleKey)}
              </h3>
              <p className="text-sm flex-1 mb-4" style={{ color: 'var(--color-text-light)' }}>
                {t(descKey)}
              </p>
              <span
                className="inline-flex items-center gap-1 text-sm font-semibold"
                style={{ color: 'var(--color-primary-500)' }}
              >
                {t(ctaKey)} <ArrowRight className="h-4 w-4" />
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Section C — How It Works */}
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

      {/* Section D — Latest Immigration News (3 + View All) */}
      <section className="page-container">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Newspaper className="h-6 w-6" style={{ color: HEADLINE_TERRACOTTA }} />
            <h2 className="section-title m-0" style={{ color: HEADLINE_TERRACOTTA }}>
              {t('homeLatestNewsTitle')}
            </h2>
          </div>
          <Link to="/news" className="btn-outline text-sm no-underline">
            {t('homeViewAllNews')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mb-6 text-sm" style={{ color: 'var(--color-text-light)' }}>
          {t('homeLatestNewsIntro')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newsItems.slice(0, 3).map(item => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Section E — Newsletter signup */}
      <NewsletterSignup variant="banner" />
    </div>
  );
}
