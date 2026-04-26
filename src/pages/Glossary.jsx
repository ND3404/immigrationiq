import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { glossaryTerms } from '../data/glossary';
import SearchBar from '../components/shared/SearchBar';

export default function Glossary() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [expandedTerm, setExpandedTerm] = useState(null);
  const [activeLetter, setActiveLetter] = useState(null);

  const filtered = useMemo(() => {
    let terms = glossaryTerms;
    if (search) {
      const s = search.toLowerCase();
      terms = terms.filter(item => item.term.toLowerCase().includes(s) || item.definition.toLowerCase().includes(s));
    }
    if (activeLetter) {
      terms = terms.filter(item => item.term[0].toUpperCase() === activeLetter);
    }
    return terms.sort((a, b) => a.term.localeCompare(b.term));
  }, [search, activeLetter]);

  const letters = useMemo(() => {
    const set = new Set(glossaryTerms.map(item => item.term[0].toUpperCase()));
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => ({ letter: l, active: set.has(l) }));
  }, []);

  return (
    <div className="page-container max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="section-title">{t('glossary')}</h1>
        <p className="mt-2 text-base" style={{ color: 'var(--color-text-light)' }}>
          {t('glossaryIntro')}
        </p>
      </div>

      <SearchBar placeholder={t('glossarySearchPlaceholder')} onSearch={setSearch} className="max-w-lg mx-auto mb-6" />

      {/* Alphabet bar */}
      <div className="flex flex-wrap justify-center gap-1 mb-6">
        <button
          onClick={() => setActiveLetter(null)}
          className={`w-7 h-7 rounded text-xs font-bold transition-colors ${!activeLetter ? 'text-white' : ''}`}
          style={{ backgroundColor: !activeLetter ? 'var(--color-primary-500)' : 'transparent', color: !activeLetter ? 'white' : 'var(--color-text-light)' }}
        >
          {t('all')}
        </button>
        {letters.map(({ letter, active }) => (
          <button
            key={letter}
            onClick={() => active && setActiveLetter(activeLetter === letter ? null : letter)}
            disabled={!active}
            className={`w-7 h-7 rounded text-xs font-bold transition-colors ${activeLetter === letter ? 'text-white' : ''} ${!active ? 'opacity-30 cursor-default' : 'cursor-pointer hover:bg-gray-100'}`}
            style={{ backgroundColor: activeLetter === letter ? 'var(--color-primary-500)' : 'transparent', color: activeLetter === letter ? 'white' : 'var(--color-text)' }}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Terms */}
      <div className="space-y-2">
        {filtered.map((term, i) => {
          const isExpanded = expandedTerm === i;
          return (
            <div key={i} className="card p-0 overflow-hidden">
              <button
                onClick={() => setExpandedTerm(isExpanded ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 flex-shrink-0" style={{ color: 'var(--color-primary-500)' }} />
                  <span className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>{term.term}</span>
                </div>
                {isExpanded ? <ChevronUp className="h-4 w-4" style={{ color: 'var(--color-text-light)' }} /> : <ChevronDown className="h-4 w-4" style={{ color: 'var(--color-text-light)' }} />}
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 border-t animate-fade-in" style={{ borderColor: 'var(--color-border)' }}>
                  <p className="text-sm mt-3 mb-2" style={{ color: 'var(--color-text-light)' }}>{term.definition}</p>
                  <div className="rounded-lg p-3 mb-3" style={{ backgroundColor: 'var(--color-surface)' }}>
                    <p className="text-xs font-medium italic" style={{ color: 'var(--color-text-light)' }}>
                      <strong>{t('glossaryExample')}</strong> {term.context}
                    </p>
                  </div>
                  {term.relatedTerms.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-xs font-medium" style={{ color: 'var(--color-text-light)' }}>{t('glossaryRelated')}</span>
                      {term.relatedTerms.map((rt, j) => (
                        <span key={j} className="badge text-[10px]" style={{ backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary-600)' }}>{rt}</span>
                      ))}
                    </div>
                  )}
                  <Link
                    to={`/chat?q=Explain the immigration term "${term.term}" in simple language`}
                    className="inline-flex items-center gap-1 text-xs font-semibold mt-2 no-underline"
                    style={{ color: 'var(--color-primary-500)' }}
                  >
                    <MessageSquare className="h-3 w-3" /> {t('glossaryExplainSimply')}
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg" style={{ color: 'var(--color-text-light)' }}>{t('glossaryNoResults')}</p>
        </div>
      )}
    </div>
  );
}
