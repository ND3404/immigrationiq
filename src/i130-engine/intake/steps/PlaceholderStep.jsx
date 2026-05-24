import React from 'react';
import { useWizard } from '../WizardContext';
import { useLanguage } from '../../../context/LanguageContext';

export default function PlaceholderStep() {
  const { currentStep } = useWizard();
  const { language, t } = useLanguage();
  const title = currentStep.title?.[language] ?? currentStep.title?.en ?? currentStep.id;

  return (
    <section>
      <h1
        className="text-2xl font-bold"
        style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
      >
        {title}
      </h1>
      <div
        className="mt-6 rounded-lg border border-dashed p-6 text-sm"
        style={{
          borderColor: 'var(--color-primary-200)',
          backgroundColor: 'var(--color-primary-50)',
          color: 'var(--color-primary-700)',
        }}
      >
        {t('i130.wizard.placeholder')}
      </div>
    </section>
  );
}
