// Generic renderer for one intake question.
//
// Reads its current value and writer from WizardContext; the parent step
// component only has to pass the question object and (optional) error
// string. Supported types: text, longtext, date, number, tel, email,
// ssn, a-number, select, radio, checkbox.

import React from 'react';
import { useWizard } from '../WizardContext';
import { useLanguage } from '../../../context/LanguageContext';

const labelStyle = {
  color: 'var(--color-text)',
  fontFamily: 'var(--font-body)',
};

const inputClass =
  'w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2';
const inputStyleBase = {
  borderColor: 'var(--color-border)',
  backgroundColor: 'white',
};

function loc(obj, language) {
  if (!obj) return '';
  return obj[language] ?? obj.en ?? '';
}

function isFn(x) {
  return typeof x === 'function';
}

export default function QuestionField({ question, error }) {
  const { answers, setAnswer, isTouched } = useWizard();
  const { language, t } = useLanguage();

  const visible = question.visible === undefined
    ? true
    : isFn(question.visible) ? question.visible(answers) : Boolean(question.visible);
  if (!visible) return null;

  const showError = error && isTouched(question.id);

  const required = isFn(question.required)
    ? question.required(answers)
    : Boolean(question.required);

  const value = answers[question.id] ?? '';
  const label = loc(question.label, language);
  const helpText = loc(question.helpText, language);

  const inputId = `q-${question.id}`;
  const inputStyle = {
    ...inputStyleBase,
    borderColor: showError ? 'var(--color-danger-500)' : 'var(--color-border)',
  };

  const inputProps = {
    id: inputId,
    name: question.id,
    value,
    onChange: (e) => setAnswer(question.id, e.target.value),
    className: inputClass,
    style: inputStyle,
    'aria-invalid': Boolean(showError) || undefined,
    'aria-describedby': helpText ? `${inputId}-help` : undefined,
  };

  let control;
  switch (question.type) {
    case 'longtext':
      control = <textarea rows={3} {...inputProps} />;
      break;
    case 'date':
      control = <input type="date" {...inputProps} />;
      break;
    case 'number':
      control = <input type="number" {...inputProps} />;
      break;
    case 'tel':
      control = <input type="tel" {...inputProps} />;
      break;
    case 'email':
      control = <input type="email" {...inputProps} />;
      break;
    case 'ssn':
      control = <input type="text" inputMode="numeric" placeholder="123-45-6789" {...inputProps} />;
      break;
    case 'a-number':
      control = <input type="text" placeholder="A123456789" {...inputProps} />;
      break;
    case 'select':
      control = (
        <select {...inputProps}>
          <option value="" disabled>—</option>
          {(question.options || []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {loc(opt.label, language)}
            </option>
          ))}
        </select>
      );
      break;
    case 'radio':
      control = (
        <div role="radiogroup" aria-labelledby={`${inputId}-label`} className="space-y-2">
          {(question.options || []).map((opt) => {
            const checked = value === opt.value;
            return (
              <label
                key={opt.value}
                className="flex cursor-pointer items-start gap-3 rounded-md border p-3 transition-colors"
                style={{
                  borderColor: checked ? 'var(--color-primary-500)' : 'var(--color-border)',
                  backgroundColor: checked ? 'var(--color-primary-50)' : 'white',
                }}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={opt.value}
                  checked={checked}
                  onChange={() => setAnswer(question.id, opt.value)}
                  className="mt-0.5"
                  style={{ accentColor: 'var(--color-primary-500)' }}
                />
                <span className="text-sm" style={{ color: 'var(--color-text)' }}>
                  {loc(opt.label, language)}
                </span>
              </label>
            );
          })}
        </div>
      );
      break;
    case 'checkbox':
      control = (
        <label className="flex cursor-pointer items-start gap-2">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => setAnswer(question.id, e.target.checked)}
            style={{ accentColor: 'var(--color-primary-500)' }}
          />
          <span className="text-sm" style={{ color: 'var(--color-text)' }}>{label}</span>
        </label>
      );
      break;
    case 'text':
    default:
      control = <input type="text" {...inputProps} />;
  }

  return (
    <div className="space-y-1.5">
      {question.type !== 'checkbox' && (
        <label
          id={`${inputId}-label`}
          htmlFor={inputId}
          className="block text-sm font-medium"
          style={labelStyle}
        >
          {label}
          {!required && (
            <span className="ml-2 text-xs font-normal" style={{ color: 'var(--color-primary-400)' }}>
              ({t('i130.wizard.optional')})
            </span>
          )}
        </label>
      )}
      {control}
      {helpText && (
        <p
          id={`${inputId}-help`}
          className="text-xs"
          style={{ color: 'var(--color-primary-700)', opacity: 0.75 }}
        >
          {helpText}
        </p>
      )}
      {showError && (
        <p className="text-xs font-medium" style={{ color: 'var(--color-danger-500)' }} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
