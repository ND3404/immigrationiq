import { useState, useMemo } from 'react';
import { FileCheck, Printer, User, Heart, Briefcase, Baby } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { categories } from '../data/categories';
import DocumentChecklist from '../components/immigration/DocumentChecklist';
import DisclaimerBanner from '../components/shared/DisclaimerBanner';

const SITUATIONS = [
  { id: 'married', labelKey: 'situationMarried', icon: Heart },
  { id: 'children', labelKey: 'situationChildren', icon: Baby },
  { id: 'employed', labelKey: 'situationEmployed', icon: Briefcase },
];

export default function Checklist() {
  const { t } = useLanguage();
  const [selectedVisa, setSelectedVisa] = useState('');
  const [selectedSituations, setSelectedSituations] = useState([]);

  const toggleSituation = (id) => {
    setSelectedSituations(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const category = categories.find(c => c.id === selectedVisa);

  const personalizedDocs = useMemo(() => {
    if (!category) return [];
    let docs = [...category.documents];

    if (selectedSituations.includes('married')) {
      docs.push('Marriage certificate (certified copy)');
      docs.push('Spouse\'s identification documents');
    }
    if (selectedSituations.includes('children')) {
      docs.push('Children\'s birth certificates');
      docs.push('Children\'s passport photos');
      docs.push('School enrollment records (if applicable)');
    }
    if (selectedSituations.includes('employed')) {
      docs.push('Current employment verification letter');
      docs.push('Recent pay stubs (last 3 months)');
      docs.push('W-2 forms (last 2 years)');
    }

    return [...new Set(docs)];
  }, [category, selectedSituations]);

  return (
    <div className="page-container max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="section-title">{t('checklist')}</h1>
        <p className="mt-2 text-base" style={{ color: 'var(--color-text-light)' }}>
          {t('checklistIntro')}
        </p>
      </div>

      <DisclaimerBanner className="mb-6" />

      {/* Step 1: Select Visa Type */}
      <div className="card mb-6">
        <h2 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
          {t('checklistStep1')}
        </h2>
        <select
          value={selectedVisa}
          onChange={(e) => setSelectedVisa(e.target.value)}
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]"
          style={{ borderColor: 'var(--color-border)', fontFamily: 'var(--font-body)' }}
        >
          <option value="">{t('checklistChooseVisa')}</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.shortName} — {c.name}</option>
          ))}
        </select>
      </div>

      {/* Step 2: Personal Situation */}
      <div className="card mb-6">
        <h2 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
          {t('checklistStep2')}
        </h2>
        <div className="flex flex-wrap gap-2">
          {SITUATIONS.map(({ id, labelKey, icon: Icon }) => {
            const active = selectedSituations.includes(id);
            return (
              <button
                key={id}
                onClick={() => toggleSituation(id)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${active ? 'shadow-sm' : ''}`}
                style={{
                  backgroundColor: active ? 'var(--color-primary-50)' : 'white',
                  borderColor: active ? 'var(--color-primary-500)' : 'var(--color-border)',
                  color: active ? 'var(--color-primary-600)' : 'var(--color-text)',
                }}
              >
                <Icon className="h-4 w-4" />
                {t(labelKey)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Generated Checklist */}
      {category && (
        <div className="card animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
              <FileCheck className="h-5 w-5 inline mr-2" style={{ color: 'var(--color-primary-500)' }} />
              {category.shortName} — {t('checklistDocChecklist')}
            </h2>
            <button onClick={() => window.print()} className="btn-outline text-sm no-print">
              <Printer className="h-4 w-4" /> {t('print')}
            </button>
          </div>
          <DocumentChecklist documents={personalizedDocs} visaType={`${category.id}-${selectedSituations.join('-')}`} />
        </div>
      )}
    </div>
  );
}
