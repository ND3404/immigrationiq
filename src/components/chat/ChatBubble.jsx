import { useState } from 'react';
import { Copy, Check, Bot, User } from 'lucide-react';
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

const USER_BG = '#1E3A8A';   // dark blue
const AI_BG = '#F1F3F5';     // light gray

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
    <div className={`flex gap-3 items-end ${isUser ? 'flex-row-reverse' : ''} group`}>
      <div
        className="flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center"
        style={{ backgroundColor: isUser ? USER_BG : 'var(--color-primary-50)' }}
      >
        {isUser
          ? <User className="h-5 w-5 text-white" />
          : <Bot className="h-5 w-5" style={{ color: 'var(--color-primary-500)' }} />}
      </div>

      <div className={`max-w-[78%] sm:max-w-[72%] relative ${isUser ? 'text-right' : ''}`}>
        <div
          className={`rounded-2xl px-5 py-3.5 leading-relaxed shadow-sm ${isUser ? 'rounded-br-md text-left' : 'rounded-bl-md'}`}
          style={{
            backgroundColor: isUser ? USER_BG : AI_BG,
            color: isUser ? '#ffffff' : 'var(--color-text)',
            fontSize: '16px',
            border: isUser ? 'none' : '1px solid var(--color-border)',
          }}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: renderContent(message.content) }} />
          )}
        </div>
        <div className={`flex items-center gap-2 mt-1.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-[11px]" style={{ color: 'var(--color-text-light)' }}>{time}</span>
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-100"
            aria-label={t('copyMessageAria')}
          >
            {copied
              ? <Check className="h-3.5 w-3.5" style={{ color: 'var(--color-success-500)' }} />
              : <Copy className="h-3.5 w-3.5" style={{ color: 'var(--color-text-light)' }} />}
          </button>
        </div>
      </div>
    </div>
  );
}
