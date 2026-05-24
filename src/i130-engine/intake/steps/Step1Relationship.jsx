// Step 1 — Relationship type.
//
// First fleshed-out step in the wizard. The questions and their
// conditional visibility/required predicates live in intakeSchema; this
// component is mostly a layout for the step's title, description, and
// the QuestionField list.

import React from 'react';
import { useWizard } from '../WizardContext';
import { useLanguage } from '../../../context/LanguageContext';
import QuestionField from './QuestionField';

export default function Step1Relationship({ errors = {} }) {
  const { currentStep } = useWizard();
  const { language } = useLanguage();

  const title = currentStep.title?.[language] ?? currentStep.title?.en;
  const description = currentStep.description?.[language] ?? currentStep.description?.en;

  return (
    <section>
      <h1
        className="text-2xl font-bold"
        style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
      >
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-sm" style={{ color: 'var(--color-text)', opacity: 0.8 }}>
          {description}
        </p>
      )}

      <div className="mt-8 space-y-6">
        {currentStep.questions.map((q) => (
          <QuestionField key={q.id} question={q} error={errors[q.id]} />
        ))}
      </div>
    </section>
  );
}
