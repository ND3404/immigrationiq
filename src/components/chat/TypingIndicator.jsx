import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-surface)' }}>
        <Bot className="h-4 w-4" style={{ color: 'var(--color-primary-500)' }} />
      </div>
      <div className="rounded-2xl rounded-tl-md px-4 py-3 bg-white" style={{ border: '1px solid var(--color-border)' }}>
        <div className="flex gap-1.5 items-center h-5">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      </div>
    </div>
  );
}
