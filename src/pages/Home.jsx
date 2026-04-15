import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, MessageSquare, FileCheck, Clock, Scale, Compass, Shield, Zap, CalendarDays, ExternalLink, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { categories } from '../data/categories';
import { newsItems } from '../data/news';
import CategoryCard from '../components/immigration/CategoryCard';
import NewsCard from '../components/shared/NewsCard';

const quickAccessItems = [
  { icon: MessageSquare, label: 'AI Chat', to: '/chat', color: 'var(--color-primary-500)' },
  { icon: Compass, label: 'Visa Finder', to: '/categories', color: 'var(--color-secondary-500)' },
  { icon: Clock, label: 'Processing Times', to: '/processing-times', color: 'var(--color-accent-600)' },
  { icon: FileCheck, label: 'Checklist', to: '/checklist', color: 'var(--color-success-500)' },
];

export default function Home() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const popularCategories = categories.filter(c => ['h1b', 'family-based', 'naturalization', 'marriage-green-card', 'f1', 'b1-b2', 'daca', 'eb2'].includes(c.id));

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/chat?q=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--color-primary-900) 0%, var(--color-primary-600) 50%, var(--color-primary-500) 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:py-28 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
              <Scale className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Immigration Guidance</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('heroTitle')}
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="mt-8 mx-auto max-w-2xl relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full rounded-full bg-white py-4 pl-13 pr-36 text-base shadow-xl outline-none"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}
              />
              <Link to="/chat" className="btn-secondary absolute right-2 top-1/2 -translate-y-1/2 rounded-full no-underline">
                <MessageSquare className="h-4 w-4" /> {t('askAI')}
              </Link>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="page-container -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickAccessItems.map(({ icon: Icon, label, to, color }) => (
            <Link key={to} to={to} className="card flex items-center gap-3 no-underline hover:shadow-lg">
              <div className="rounded-lg p-2" style={{ backgroundColor: `${color}15` }}>
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{label}</span>
            </Link>
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
          <h2 className="section-title">Popular Categories</h2>
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

      {/* Recent News */}
      <section className="page-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">{t('recentNews')}</h2>
          <Link to="/news" className="btn-outline text-sm no-underline">
            {t('viewAll')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newsItems.slice(0, 3).map(item => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Visa Bulletin */}
      <section className="page-container">
        <div className="card p-0 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left: header area */}
            <div className="lg:w-2/5 p-8" style={{ background: 'linear-gradient(135deg, var(--color-primary-800) 0%, var(--color-primary-600) 100%)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg p-2.5" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                  <CalendarDays className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                    {t('visaBulletinTitle')}
                  </h2>
                  <p className="text-sm text-blue-200">
                    {new Date().toLocaleString(language === 'es' ? 'es-US' : 'en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <p className="text-sm text-blue-100 leading-relaxed mb-6">
                {t('visaBulletinDesc')}
              </p>
              <a
                href="https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent no-underline inline-flex items-center gap-2"
              >
                {t('visaBulletinCta')} <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            {/* Right: priority date explainer */}
            <div className="lg:w-3/5 p-8">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-5 w-5" style={{ color: 'var(--color-primary-500)' }} />
                <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                  {t('visaBulletinPriorityDate')}
                </h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-light)' }}>
                {t('visaBulletinPriorityDateDesc')}
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-primary-600)' }}>Final Action Dates</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-light)' }}>
                    {language === 'es' ? 'Fecha límite para emitir visas en un mes dado.' : 'The cutoff for when a visa can actually be issued in a given month.'}
                  </p>
                </div>
                <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--color-accent-50)' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-accent-600)' }}>Dates for Filing</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-light)' }}>
                    {language === 'es' ? 'Fecha más temprana para presentar tu solicitud de ajuste de estatus.' : 'The earliest date you can submit your adjustment of status application.'}
                  </p>
                </div>
                <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--color-success-50)' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-success-500)' }}>"C" = Current</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-light)' }}>
                    {language === 'es' ? 'No hay espera — puedes proceder con tu solicitud inmediatamente.' : 'No wait — you can proceed with your application immediately.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
