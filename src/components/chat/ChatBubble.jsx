import { useState } from 'react';
import { Copy, Check, Bot, User } from 'lucide-react';

function renderContent(text) {
  // Simple markdown-like rendering
  let html = text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]\((https?:\/\/.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline" style="color:var(--color-primary-500)">$1</a>')
    .replace(/^### (.+)$/gm, '<h4 class="font-bold mt-3 mb-1" style="font-family:var(--font-heading)">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 class="font-bold text-lg mt-3 mb-1" style="font-family:var(--font-heading)">$1</h3>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal">$2</li>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
  return html;
}

export default function ChatBubble({ message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const time = message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''} group`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${isUser ? '' : ''}`}
        style={{ backgroundColor: isUser ? 'var(--color-primary-500)' : 'var(--color-surface)' }}>
        {isUser ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4" style={{ color: 'var(--color-primary-500)' }} />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[80%] relative ${isUser ? 'text-right' : ''}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${isUser ? 'rounded-tr-md' : 'rounded-tl-md'}`}
          style={{
            backgroundColor: isUser ? 'var(--color-primary-500)' : 'white',
            color: isUser ? 'white' : 'var(--color-text)',
            border: isUser ? 'none' : '1px solid var(--color-border)',
          }}
        >
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: renderContent(message.content) }} />
          )}
        </div>
        <div className={`flex items-center gap-2 mt-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-[10px]" style={{ color: 'var(--color-text-light)' }}>{time}</span>
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-100"
            aria-label="Copy message"
          >
            {copied ? <Check className="h-3 w-3" style={{ color: 'var(--color-success-500)' }} /> : <Copy className="h-3 w-3" style={{ color: 'var(--color-text-light)' }} />}
          </button>
        </div>
      </div>
    </div>
  );
}
