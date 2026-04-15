import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { newsItems } from '../data/news';
import NewsCard from '../components/shared/NewsCard';
import SearchBar from '../components/shared/SearchBar';

const newsCategories = ['All', 'USCIS Policy', 'Visa Bulletins', 'Executive Orders', 'Court Decisions', 'Fee Changes'];

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
          Latest immigration policy updates, visa bulletins, and court decisions.
        </p>
      </div>

      <SearchBar placeholder="Search news..." onSearch={setSearch} className="max-w-lg mx-auto mb-6" />

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {newsCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="badge px-3 py-1.5 text-sm cursor-pointer transition-colors"
            style={{
              backgroundColor: filter === cat ? 'var(--color-primary-500)' : 'var(--color-surface)',
              color: filter === cat ? 'white' : 'var(--color-text)',
            }}
          >
            {cat}
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
          <p className="text-lg" style={{ color: 'var(--color-text-light)' }}>No news articles match your criteria.</p>
        </div>
      )}

      {/* Subscribe CTA (UI only) */}
      <div className="mt-10 card text-center">
        <h3 className="font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
          Stay Updated
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-light)' }}>
          Get immigration news and policy updates delivered to your inbox.
        </p>
        <div className="flex max-w-md mx-auto gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]"
            style={{ borderColor: 'var(--color-border)' }}
          />
          <button className="btn-primary text-sm">Subscribe</button>
        </div>
        <p className="text-[10px] mt-2" style={{ color: 'var(--color-text-light)' }}>
          Feature coming soon. No data is collected.
        </p>
      </div>
    </div>
  );
}
