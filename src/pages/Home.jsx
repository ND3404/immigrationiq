import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, ArrowRight, MessageSquare, FileCheck, Clock, Scale, Compass, Shield, Zap,
  Sparkles, Newspaper, Briefcase, FileText,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { categories } from '../data/categories';
import { newsItems } from '../data/news';
import CategoryCard from '../components/immigration/CategoryCard';
import NewsCard from '../components/shared/NewsCard';
import VisaBulletinDashboard from '../components/immigration/VisaBulletinDashboard';
import NewsletterSignup from '../components/shared/NewsletterSignup';
import AdBanner from '../components/shared/AdBanner';

const QUICK_ACCESS_ITEMS = [
  { icon: MessageSquare, labelKey: 'chat', to: '/chat', color: 'var(--color-primary-500)' },
  { icon: Compass, labelKey: 'categories', to: '/categories', color: 'var(--color-secondary-500)' },
  { icon: Clock, labelKey: 'processingTimes', to: '/processing-times', color: 'var(--color-accent-600)' },
  { icon: FileCheck, labelKey: 'checklist', to: '/checklist', color: 'var(--color-success-500)' },
];

const CHAT_PROMPT_KEYS = ['homeChatPrompt1', 'homeChatPrompt2', 'homeChatPrompt3', 'homeChatPrompt4'];

const HEADLINE_TERRACOTTA = '#C75B45';

export default function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [chatInput, setChatInput] = useState('');

  const popularCategories = categories.filter(c =>
    ['h1b', 'family-based', 'naturalization', 'marriage-green-card', 'f1', 'b1-b2', 'daca', 'eb2'].includes(c.id)
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) navigate(`/chat?q=${encodeURIComponent(searchValue)}`);
  };

  const handleChatStart = (e) => {
    e.preventDefault();
    const q = chatInput.trim();
    navigate(q ? `/chat?q=${encodeURIComponent(q)}` : '/chat');
  };

  return (
    <div>
      {/* Ad slot — below navbar */}
      <AdBanner size="leaderboard" />

      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--color-primary-900) 0%, var(--color-primary-600) 50%, var(--color-primary-500) 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:py-28 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
              <Scale className="h-4 w-4" />
              <span className="text-sm font-medium">{t('homeAskBadge')}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('heroTitle')}
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="mt-8 mx-auto max-w-2xl">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full rounded-full bg-white py-4 pl-13 pr-4 sm:pr-36 text-base shadow-xl outline-none"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}
                />
                <Link to="/chat" className="btn-secondary hidden sm:inline-flex absolute right-2 top-1/2 -translate-y-1/2 rounded-full no-underline">
                  <MessageSquare className="h-4 w-4" /> {t('askAI')}
                </Link>
              </div>
              <Link to="/chat" className="btn-secondary sm:hidden mt-3 w-full no-underline rounded-full">
                <MessageSquare className="h-4 w-4" /> {t('askAI')}
              </Link>
            </form>
          </div>
        </div>
      </section>

      {/* Ask ImmigrationIQ — primary AI Chat CTA, just below hero */}
      <section className="page-container -mt-10 relative z-10">
        <div
          className="rounded-2xl p-6 sm:p-8 shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, var(--color-primary-50) 100%)',
            border: '1px solid var(--color-primary-100)',
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3" style={{ backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary-600)' }}>
                <Sparkles className="h-3.5 w-3.5" />
                <span className="text-xs font-semibold uppercase tracking-wide">{t('homeAskBadge')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                {t('homeAskTitle')}
              </h2>
              <p className="text-base mb-5" style={{ color: 'var(--color-text-light)' }}>
                {t('homeAskSubtitle')}
              </p>

              <form onSubmit={handleChatStart} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={t('homeAskInputPlaceholder')}
                  className="flex-1 rounded-full border bg-white px-5 py-3 text-base sm:text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]"
                  style={{ borderColor: 'var(--color-border)', fontFamily: 'var(--font-body)', minHeight: '44px' }}
                />
                <button type="submit" className="btn-primary rounded-full px-5 whitespace-nowrap">
                  <MessageSquare className="h-4 w-4" /> {t('startChat')}
                </button>
              </form>

              <div className="flex flex-wrap gap-2 mt-4">
                {CHAT_PROMPT_KEYS.map((key) => {
                  const p = t(key);
                  return (
                    <Link
                      key={key}
                      to={`/chat?q=${encodeURIComponent(p)}`}
                      className="rounded-full border bg-white px-3 py-1.5 text-xs no-underline transition hover:shadow-sm"
                      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    >
                      {p}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:flex lg:w-72 flex-col items-center justify-center rounded-xl p-6 text-center"
              style={{ background: 'linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-500) 100%)' }}
            >
              <MessageSquare className="h-10 w-10 text-white mb-3" />
              <p className="text-white text-sm leading-relaxed">
                {t('homeAITrained')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="page-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {QUICK_ACCESS_ITEMS.map(({ icon: Icon, labelKey, to, color }) => (
            <Link key={to} to={to} className="card flex items-center gap-3 no-underline hover:shadow-lg">
              <div className="rounded-lg p-2" style={{ backgroundColor: `${color}15` }}>
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{t(labelKey)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Our Services — promotes the three monetization features */}
      <section className="page-container">
        <div className="text-center mb-8">
          <h2 className="section-title">{t('homeServicesTitle')}</h2>
          <p className="mt-2 text-base max-w-2xl mx-auto" style={{ color: 'var(--color-text-light)' }}>
            {t('homeServicesIntro')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              to: '/chat',
              icon: MessageSquare,
              titleKey: 'homeServiceChatTitle',
              descKey: 'homeServiceChatDesc',
              ctaKey: 'homeServiceChatCta',
              color: 'var(--color-primary-500)',
              bg: 'var(--color-primary-50)',
            },
            {
              to: '/lawyers',
              icon: Briefcase,
              titleKey: 'homeServiceLawyersTitle',
              descKey: 'homeServiceLawyersDesc',
              ctaKey: 'homeServiceLawyersCta',
              color: 'var(--color-secondary-500)',
              bg: 'var(--color-danger-50)',
            },
            {
              to: '/services',
              icon: FileText,
              titleKey: 'homeServiceKitsTitle',
              descKey: 'homeServiceKitsDesc',
              ctaKey: 'homeServiceKitsCta',
              color: 'var(--color-accent-700)',
              bg: 'var(--color-warning-50)',
            },
          ].map(({ to, icon: Icon, titleKey, descKey, ctaKey, color, bg }) => (
            <Link
              key={to}
              to={to}
              className="card flex flex-col h-full no-underline transition-shadow hover:shadow-lg"
            >
              <div className="rounded-xl inline-flex p-3 mb-4 self-start" style={{ backgroundColor: bg }}>
                <Icon className="h-6 w-6" style={{ color }} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                {t(titleKey)}
              </h3>
              <p className="text-sm flex-1 mb-4" style={{ color: 'var(--color-text-light)' }}>
                {t(descKey)}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color }}>
                {t(ctaKey)} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Immigration News */}
      <section className="page-container">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Newspaper className="h-6 w-6" style={{ color: HEADLINE_TERRACOTTA }} />
            <h2 className="section-title m-0" style={{ color: HEADLINE_TERRACOTTA }}>
              {t('homeLatestNewsTitle')}
            </h2>
          </div>
          <Link to="/news" className="btn-outline text-sm no-underline">
            {t('viewAll')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="-mt-3 mb-6 text-sm" style={{ color: 'var(--color-text-light)' }}>
          {t('homeLatestNewsIntro')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {newsItems.slice(0, 6).map(item => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="page-container">
        <h2 className="section-title text-center">{t('howItWorks')}</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Search, title: t('step1Title'), desc: t('step1Desc'), num: '1' },
            { icon: Zap, title: t('step2Title'), desc: t('step2Desc'), num: '2' },
            { icon: Shield, title: t('step3Title'), desc: t('step3Desc'), num: '3' },
          ].map(({ icon: Icon, title, desc, num }) => (
            <div key={num} className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                <Icon className="h-7 w-7" style={{ color: 'var(--color-primary-500)' }} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{title}</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="page-container" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">{t('homePopularCategories')}</h2>
          <Link to="/categories" className="btn-outline text-sm no-underline">
            {t('viewAll')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularCategories.map(cat => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Visa Bulletin Dashboard */}
      <section className="page-container">
        <div className="flex items-end justify-between mb-4 flex-wrap gap-2">
          <div>
            <h2 className="section-title m-0">{t('homeVisaBulletinDashTitle')}</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-light)' }}>
              {t('homeVisaBulletinDashIntro')}
            </p>
          </div>
          <Link to="/visa-bulletin" className="btn-outline text-sm no-underline">
            {t('fullPageView')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <VisaBulletinDashboard />
      </section>

      {/* Newsletter signup — above footer */}
      <NewsletterSignup variant="banner" />
    </div>
  );
}
