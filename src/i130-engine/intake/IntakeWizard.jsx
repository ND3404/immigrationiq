// TODO Session 2: Build the multi-step wizard shell.
//
// Responsibilities (Session 2):
//   - Read `intakeSchema` and render one step at a time.
//   - Persist answers in localStorage under a versioned key.
//   - Run validation and conditional `visible`/`required` predicates.
//   - Honor the LanguageContext (en/es) for every label and helpText.
//   - Provide Next / Back / Save & Exit controls.
//   - On final step submit, hand answers to the mapping + filler layer.
//
// Not in scope for Session 1: rendering anything beyond an "under
// construction" placeholder. The route mounting this component will not
// be wired into the public /i-130 path until the wizard is real.

import React from 'react';

export default function IntakeWizard() {
  return (
    <div className="mx-auto max-w-2xl p-8 text-center">
      <h1 className="text-2xl font-semibold">I-130 Wizard — under construction</h1>
      <p className="mt-4 text-sm text-gray-600">
        Session 1 (architecture) complete. The interactive wizard ships in Session 2.
      </p>
    </div>
  );
}
