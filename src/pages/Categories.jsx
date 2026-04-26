import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { categories, categoryTypes } from '../data/categories';
import CategoryCard from '../components/immigration/CategoryCard';
import SearchBar from '../components/shared/SearchBar';

export default function Categories() {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = categories.filter(c => {
    const matchesType = filter === 'all' || c.type === filter;
    const matchesSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.shortName.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="page-container">
      <div className="text-center mb-8">
        <h1 className="section-title">{t('categories')}</h1>
        <p className="mt-2 text-base" style={{ color: 'var(--color-text-light)' }}>
          {t('categoriesIntro')}
        </p>
      </div>

      {/* Search + Filters */}
      <div className="mb-6 space-y-4">
        <SearchBar placeholder={t('searchPlaceholder')} onSearch={setSearch} className="max-w-lg mx-auto" />
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`badge px-4 py-1.5 text-sm cursor-pointer transition-colors ${filter === 'all' ? '' : 'opacity-60 hover:opacity-100'}`}
            style={{ backgroundColor: filter === 'all' ? 'var(--color-primary-500)' : 'var(--color-surface)', color: filter === 'all' ? 'white' : 'var(--color-text)' }}
          >
            {t('all')} ({categories.length})
          </button>
          {categoryTypes.map(ct => {
            const count = categories.filter(c => c.type === ct.key).length;
            const active = filter === ct.key;
            return (
              <button
                key={ct.key}
                onClick={() => setFilter(ct.key)}
                className={`badge px-4 py-1.5 text-sm cursor-pointer transition-colors ${active ? '' : 'opacity-60 hover:opacity-100'}`}
                style={{ backgroundColor: active ? 'var(--color-primary-500)' : 'var(--color-surface)', color: active ? 'white' : 'var(--color-text)' }}
              >
                {language === 'es' ? ct.labelEs : ct.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Category type groups */}
      {filter === 'all' ? (
        categoryTypes.map(ct => {
          const typeCats = filtered.filter(c => c.type === ct.key);
          if (typeCats.length === 0) return null;
          return (
            <div key={ct.key} className="mb-8">
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                {language === 'es' ? ct.labelEs : ct.label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {typeCats.map(cat => <CategoryCard key={cat.id} category={cat} />)}
              </div>
            </div>
          );
        })
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(cat => <CategoryCard key={cat.id} category={cat} />)}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg" style={{ color: 'var(--color-text-light)' }}>{t('categoriesNoResults')}</p>
        </div>
      )}
    </div>
  );
}
