import { useState } from 'react';
import { Clock, Printer } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { timelineScenarios } from '../data/timelines';
import TimelineVisualizer from '../components/immigration/TimelineVisualizer';
import DisclaimerBanner from '../components/shared/DisclaimerBanner';

export default function Timeline() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);

  return (
    <div className="page-container max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="section-title">{t('timeline')}</h1>
        <p className="mt-2 text-base" style={{ color: 'var(--color-text-light)' }}>
          {t('timelineIntro')}
        </p>
      </div>

      <DisclaimerBanner className="mb-6" />

      {/* Scenario Selection */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{t('timelineSelectScenario')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {timelineScenarios.map(scenario => (
            <button
              key={scenario.id}
              onClick={() => setSelected(scenario)}
              className={`card text-left transition-all ${selected?.id === scenario.id ? 'ring-2' : ''}`}
              style={{ ringColor: 'var(--color-primary-500)', borderColor: selected?.id === scenario.id ? 'var(--color-primary-500)' : 'var(--color-border)' }}
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg p-2" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                  <Clock className="h-5 w-5" style={{ color: 'var(--color-primary-500)' }} />
                </div>
                <div>
                  <h3 className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>{scenario.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-light)' }}>
                    {scenario.fromStatus} → {scenario.toStatus}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-light)' }}>{scenario.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Display */}
      {selected && (
        <div className="animate-fade-in-up">
          <div className="flex items-center justify-between mb-4 no-print">
            <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{t('timelineYourTimeline')}</h2>
            <button onClick={() => window.print()} className="btn-outline text-sm">
              <Printer className="h-4 w-4" /> {t('print')}
            </button>
          </div>
          <TimelineVisualizer scenario={selected} />
        </div>
      )}
    </div>
  );
}
