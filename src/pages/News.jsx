import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { newsItems } from '../data/news';
import NewsCard from '../components/shared/NewsCard';
import SearchBar from '../components/shared/SearchBar';

const NEWS_CATEGORIES = [
  { value: 'All', labelKey: 'newsCatAll' },
  { value: 'USCIS Policy', labelKey: 'newsCatUscis' },
  { value: 'Visa Bulletins', labelKey: 'newsCatVisaBulletins' },
  { value: 'Executive Orders', labelKey: 'newsCatExecutive' },
  { value: 'Court Decisions', labelKey: 'newsCatCourt' },
  { value: 'Fee Changes', labelKey: 'newsCatFee' },
];

export default function News() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = newsItems.filter(item => {
    const matchesCat = filter === 'All' || item.category === filter;
    const matchesSearch = !search || item.title.toLowerCase().includes(search.toLowerCase()) || item.summary.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="page-container max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="section-title">{t('news')}</h1>
        <p className="mt-2 text-base" style={{ color: 'var(--color-text-light)' }}>
          {t('newsIntro')}
        </p>
      </div>

      <SearchBar placeholder={t('newsSearchPlaceholder')} onSearch={setSearch} className="max-w-lg mx-auto mb-6" />

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {NEWS_CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className="badge px-3 py-2 text-sm cursor-pointer transition-colors min-h-[36px]"
            style={{
              backgroundColor: filter === cat.value ? 'var(--color-primary-500)' : 'var(--color-surface)',
              color: filter === cat.value ? 'white' : 'var(--color-text)',
            }}
          >
            {t(cat.labelKey)}
          </button>
        ))}
      </div>

      {/* News grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(item => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg" style={{ color: 'var(--color-text-light)' }}>{t('newsNoResults')}</p>
        </div>
      )}

      {/* Subscribe CTA (UI only) */}
      <div className="mt-10 card text-center">
        <h3 className="font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
          {t('newsSubscribeTitle')}
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-light)' }}>
          {t('newsSubscribeBody')}
        </p>
        <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 rounded-lg border px-3 py-3 text-base sm:text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]"
            style={{ borderColor: 'var(--color-border)', minHeight: '44px' }}
          />
          <button className="btn-primary text-sm">{t('newsSubscribe')}</button>
        </div>
        <p className="text-[10px] mt-2" style={{ color: 'var(--color-text-light)' }}>
          {t('newsSubscribeNote')}
        </p>
      </div>
    </div>
  );
}
