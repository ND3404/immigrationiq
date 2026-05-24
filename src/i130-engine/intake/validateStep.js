// I-130 Intake Wizard — per-step validation.
//
// Given a step from intakeSchema and the current answers, return:
//   { ok: boolean, errors: { [questionId]: string } }
//
// Validation honors:
//   - `visible(answers)` — hidden questions are skipped entirely.
//   - `required` — boolean or predicate. Empty answers on required-visible
//     questions block Next.
//   - `validation.pattern` (string regex) — applied to non-empty answers.
//   - `validation.min` / `max` — applied to numeric types.
//   - `validation.minLength` / `maxLength` — applied to text types.
//
// Error messages are pulled from `validation.message[language]` when
// present, with English fallback. A generic "required" message is used
// when a required value is missing and no custom message is defined.

const isFn = (x) => typeof x === 'function';

const REQUIRED_MSG = {
  en: 'This field is required.',
  es: 'Este campo es obligatorio.',
};

function evalPredicate(p, answers, fallback) {
  if (p === undefined) return fallback;
  if (isFn(p)) return Boolean(p(answers));
  return Boolean(p);
}

function isEmpty(value) {
  if (value === undefined || value === null) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

function localize(message, language) {
  if (!message) return null;
  return message[language] ?? message.en ?? null;
}

export function validateStep(step, answers, language = 'en') {
  const errors = {};
  if (!step || !Array.isArray(step.questions)) {
    return { ok: true, errors };
  }

  for (const q of step.questions) {
    const visible = evalPredicate(q.visible, answers, true);
    if (!visible) continue;

    const required = evalPredicate(q.required, answers, false);
    const value = answers[q.id];

    if (isEmpty(value)) {
      if (required) {
        errors[q.id] =
          localize(q.validation?.message, language) ||
          REQUIRED_MSG[language] ||
          REQUIRED_MSG.en;
      }
      continue;
    }

    const v = q.validation;
    if (!v) continue;

    if (v.pattern) {
      try {
        const re = new RegExp(v.pattern);
        if (!re.test(String(value))) {
          errors[q.id] = localize(v.message, language) || 'Invalid format.';
          continue;
        }
      } catch {
        // Bad regex in the schema — fail soft, don't block the user.
      }
    }

    if (typeof v.minLength === 'number' && String(value).length < v.minLength) {
      errors[q.id] = localize(v.message, language) || `Min length ${v.minLength}.`;
      continue;
    }
    if (typeof v.maxLength === 'number' && String(value).length > v.maxLength) {
      errors[q.id] = localize(v.message, language) || `Max length ${v.maxLength}.`;
      continue;
    }

    if (q.type === 'number') {
      const n = Number(value);
      if (Number.isFinite(n)) {
        if (typeof v.min === 'number' && n < v.min) {
          errors[q.id] = localize(v.message, language) || `Min ${v.min}.`;
          continue;
        }
        if (typeof v.max === 'number' && n > v.max) {
          errors[q.id] = localize(v.message, language) || `Max ${v.max}.`;
          continue;
        }
      }
    }
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

export default validateStep;
