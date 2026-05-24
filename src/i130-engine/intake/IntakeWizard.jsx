// I-130 Intake Wizard — shell.
//
// Responsibilities (Session 2):
//   - Wrap children in WizardProvider so every step reads/writes ONE shared
//     intake-data object (the same object will feed the PDF filler later).
//   - Render the active step component (Step1Relationship for the
//     `relationship` step; PlaceholderStep for steps 2-10 until they are
//     fleshed out in later sessions).
//   - Show a "Step X of N" progress indicator, Back, and Next.
//   - Compute validation against the active step via validateStep() on
//     every render. Next is disabled while the current step has errors.
//   - Pass localized errors down to the step component for inline display.
//
// TODO Session 3+: persist answers to localStorage via src/utils/storage.js
// under a versioned key (e.g. 'iiq-i130-intake-v1'). Deliberately omitted
// this session to keep the diff focused.
//
// The route mounting this component is /i-130/wizard. The public /i-130
// route still points at I130ComingSoon — production is untouched.

import React from 'react';
import { WizardProvider, useWizard } from './WizardContext';
import { useLanguage } from '../../context/LanguageContext';
import { validateStep } from './validateStep';
import Step1Relationship from './steps/Step1Relationship';
import PlaceholderStep from './steps/PlaceholderStep';

const STEP_COMPONENTS = {
  relationship: Step1Relationship,
  // All other step ids fall through to PlaceholderStep in Session 2.
};

function interp(template, vars) {
  if (typeof template !== 'string') return '';
  return Object.entries(vars).reduce(
    (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
    template
  );
}

function WizardShell() {
  const { step, totalSteps, currentStep, answers, next, back } = useWizard();
  const { language, t } = useLanguage();

  const validation = validateStep(currentStep, answers, language);
  const StepComponent = STEP_COMPONENTS[currentStep.id] || PlaceholderStep;

  const isFirst = step === 0;
  const isLast = step === totalSteps - 1;
  const nextDisabled = !validation.ok || isLast;

  return (
    <div className="page-container max-w-3xl">
      {/* Progress indicator */}
      <div className="mb-6">
        <div
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: 'var(--color-primary-600)' }}
        >
          {interp(t('i130.wizard.stepOf'), { current: step + 1, total: totalSteps })}
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-[var(--color-primary-100)]">
          <div
            className="h-1.5 rounded-full bg-[var(--color-primary-500)] transition-all"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            aria-hidden="true"
          />
        </div>
      </div>

      <StepComponent errors={validation.errors} />

      {/* Nav row */}
      <div
        className="mt-10 flex items-center justify-between border-t pt-6"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <button
          type="button"
          className="btn-outline"
          onClick={back}
          disabled={isFirst}
          aria-disabled={isFirst}
          style={isFirst ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
        >
          {t('i130.wizard.back')}
        </button>
        <button
          type="button"
          className="btn-primary"
          onClick={next}
          disabled={nextDisabled}
          aria-disabled={nextDisabled}
          style={nextDisabled ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
        >
          {t('i130.wizard.next')}
        </button>
      </div>
    </div>
  );
}

export default function IntakeWizard() {
  return (
    <WizardProvider>
      <WizardShell />
    </WizardProvider>
  );
}
