import { useLanguage } from '../../context/LanguageContext';

export default function TypingIndicator() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-start">
      <span className="text-xs font-semibold mb-1 px-1" style={{ color: 'var(--color-secondary-500)' }}>
        {t('chatLabelAssistant')}
      </span>
      <div
        className="rounded-2xl rounded-bl-md flex items-center gap-2.5"
        style={{ backgroundColor: '#f5f5f5', border: '1px solid var(--color-border)', padding: '14px 16px' }}
      >
        <div className="flex gap-1.5 items-center">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
        <span className="text-sm font-medium" style={{ color: 'var(--color-text-light)' }}>
          {t('chatThinking')}
        </span>
      </div>
    </div>
  );
}
