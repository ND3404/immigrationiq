import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

function renderContent(text) {
  let html = text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]\((https?:\/\/.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline" style="color:var(--color-primary-500)">$1</a>')
    .replace(/^### (.+)$/gm, '<h4 class="font-bold mt-3 mb-1 text-base" style="font-family:var(--font-heading)">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 class="font-bold text-lg mt-3 mb-1" style="font-family:var(--font-heading)">$1</h3>')
    .replace(/^- (.+)$/gm, '<li class="ml-5 list-disc">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-5 list-decimal">$2</li>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
  return html;
}

const USER_BG = '#1e3a5f';
const AI_BG = '#f5f5f5';

export default function ChatBubble({ message }) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const time = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} group`}>
      {/* Label */}
      <div className={`flex items-center gap-2 mb-1 px-1 ${isUser ? 'flex-row-reverse' : ''}`}>
        <span className="text-xs font-semibold" style={{ color: isUser ? 'var(--color-primary-600)' : 'var(--color-secondary-500)' }}>
          {isUser ? t('chatLabelYou') : t('chatLabelAssistant')}
        </span>
        {time && <span className="text-[11px]" style={{ color: 'var(--color-text-light)' }}>{time}</span>}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[95%] ${isUser ? 'sm:max-w-[80%]' : 'sm:max-w-[85%]'} min-w-0 rounded-2xl shadow-sm leading-relaxed text-[15px] sm:text-base ${isUser ? 'rounded-br-md' : 'rounded-bl-md'}`}
        style={{
          backgroundColor: isUser ? USER_BG : AI_BG,
          color: isUser ? '#ffffff' : 'var(--color-text)',
          padding: '16px',
          border: isUser ? 'none' : '1px solid var(--color-border)',
          wordBreak: 'break-word',
          overflowWrap: 'anywhere',
        }}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: renderContent(message.content) }} />
        )}
      </div>

      {/* Copy button (assistant only — user doesn't need to copy own message) */}
      {!isUser && (
        <button
          onClick={handleCopy}
          className="mt-1 opacity-60 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity p-2 rounded hover:bg-gray-100 min-h-[36px] min-w-[36px] inline-flex items-center justify-center"
          aria-label={t('copyMessageAria')}
        >
          {copied
            ? <Check className="h-4 w-4" style={{ color: 'var(--color-success-500)' }} />
            : <Copy className="h-4 w-4" style={{ color: 'var(--color-text-light)' }} />}
        </button>
      )}
    </div>
  );
}
