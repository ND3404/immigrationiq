import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, MessageSquare, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { faqData } from '../data/faq';
import SearchBar from '../components/shared/SearchBar';

export default function FAQ() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedQ, setExpandedQ] = useState(null);

  const filteredData = faqData
    .filter(cat => activeCategory === 'all' || cat.category === activeCategory)
    .map(cat => ({
      ...cat,
      questions: cat.questions.filter(q => {
        if (!search) return true;
        const s = search.toLowerCase();
        return q.q.toLowerCase().includes(s) || q.a.toLowerCase().includes(s);
      }),
    }))
    .filter(cat => cat.questions.length > 0);

  return (
    <div className="page-container max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="section-title">{t('faq')}</h1>
        <p className="mt-2 text-base" style={{ color: 'var(--color-text-light)' }}>
          {t('faqIntro')}
        </p>
      </div>

      <SearchBar placeholder={t('faqSearchPlaceholder')} onSearch={setSearch} className="max-w-lg mx-auto mb-6" />

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className="badge px-3 py-2 text-sm cursor-pointer transition-colors min-h-[36px]"
          style={{
            backgroundColor: activeCategory === 'all' ? 'var(--color-primary-500)' : 'var(--color-surface)',
            color: activeCategory === 'all' ? 'white' : 'var(--color-text)',
          }}
        >
          {t('all')}
        </button>
        {faqData.map(cat => (
          <button
            key={cat.category}
            onClick={() => setActiveCategory(cat.category)}
            className="badge px-3 py-2 text-sm cursor-pointer transition-colors min-h-[36px]"
            style={{
              backgroundColor: activeCategory === cat.category ? 'var(--color-primary-500)' : 'var(--color-surface)',
              color: activeCategory === cat.category ? 'white' : 'var(--color-text)',
            }}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* FAQ sections */}
      <div className="space-y-8">
        {filteredData.map(cat => (
          <div key={cat.category}>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
              <HelpCircle className="h-5 w-5" style={{ color: 'var(--color-primary-500)' }} />
              {cat.category}
            </h2>
            <div className="space-y-2">
              {cat.questions.map((q, i) => {
                const key = `${cat.category}-${i}`;
                const isExpanded = expandedQ === key;
                return (
                  <div key={key} className="card p-0 overflow-hidden">
                    <button
                      onClick={() => setExpandedQ(isExpanded ? null : key)}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3 min-h-[48px] text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-sm pr-4" style={{ color: 'var(--color-text)' }}>{q.q}</span>
                      {isExpanded ? <ChevronUp className="h-4 w-4 flex-shrink-0" style={{ color: 'var(--color-text-light)' }} /> : <ChevronDown className="h-4 w-4 flex-shrink-0" style={{ color: 'var(--color-text-light)' }} />}
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t animate-fade-in" style={{ borderColor: 'var(--color-border)' }}>
                        <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--color-text-light)' }}>{q.a}</p>
                        <Link
                          to={`/chat?q=I have a follow-up question about: ${encodeURIComponent(q.q)}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold mt-3 no-underline"
                          style={{ color: 'var(--color-primary-500)' }}
                        >
                          <MessageSquare className="h-3 w-3" /> {t('askFollowUp')}
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg" style={{ color: 'var(--color-text-light)' }}>{t('faqNoResults')}</p>
        </div>
      )}
    </div>
  );
}
