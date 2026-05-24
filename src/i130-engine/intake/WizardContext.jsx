// I-130 Intake Wizard — shared state.
//
// Holds the one answer object (`answers`) that every step reads from and
// writes to. The PDF filler (Session 5) and the AI prompts (Session 6)
// will consume the same object.
//
// Intentionally NOT persisted to localStorage yet — Session 3 adds that
// behind a versioned key once we have enough fleshed-out questions to
// make persistence meaningful.

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import intakeSchema from './intakeSchema';

const WizardContext = createContext(null);

export function WizardProvider({ children }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [touched, setTouched] = useState(() => new Set());

  const totalSteps = intakeSchema.steps.length;
  const currentStep = intakeSchema.steps[step];

  const setAnswer = useCallback((id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setTouched((prev) => {
      if (prev.has(id)) return prev;
      const nextSet = new Set(prev);
      nextSet.add(id);
      return nextSet;
    });
  }, []);

  const isTouched = useCallback((id) => touched.has(id), [touched]);

  const next = useCallback(() => {
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  }, [totalSteps]);

  const back = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const value = useMemo(
    () => ({ step, totalSteps, currentStep, answers, setAnswer, isTouched, next, back }),
    [step, totalSteps, currentStep, answers, setAnswer, isTouched, next, back],
  );

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizard must be used inside <WizardProvider>');
  return ctx;
}
