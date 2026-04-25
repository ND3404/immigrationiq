import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex gap-3 items-end">
      <div className="flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary-50)' }}>
        <Bot className="h-5 w-5" style={{ color: 'var(--color-primary-500)' }} />
      </div>
      <div
        className="rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-2.5"
        style={{ backgroundColor: '#F1F3F5', border: '1px solid var(--color-border)' }}
      >
        <div className="flex gap-1.5 items-center">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
        <span className="text-sm font-medium" style={{ color: 'var(--color-text-light)' }}>
          Thinking…
        </span>
      </div>
    </div>
  );
}
