import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, Trash2, Download, Key, AlertCircle, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useChatContext } from '../context/ChatContext';
import { exportChatToPdf } from '../utils/chatApi';
import ChatBubble from '../components/chat/ChatBubble';
import TypingIndicator from '../components/chat/TypingIndicator';
import DisclaimerBanner from '../components/shared/DisclaimerBanner';

export default function Chat() {
  const { t } = useLanguage();
  const { messages, isLoading, error, sendMessage, clearChat } = useChatContext();
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState(() => {
    try { return localStorage.getItem('immigrationiq-api-key') || import.meta.env.VITE_ANTHROPIC_API_KEY || ''; } catch { return import.meta.env.VITE_ANTHROPIC_API_KEY || ''; }
  });
  const [showKeyInput, setShowKeyInput] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [searchParams] = useSearchParams();

  // Handle pre-loaded query from URL
  useEffect(() => {
    const q = searchParams.get('q');
    if (q && apiKey && messages.length === 0) {
      sendMessage(q, apiKey);
    } else if (q && !apiKey) {
      setInput(q);
      setShowKeyInput(true);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!apiKey) {
      setShowKeyInput(true);
      return;
    }
    const msg = input;
    setInput('');
    await sendMessage(msg, apiKey);
    inputRef.current?.focus();
  };

  const handleSaveKey = () => {
    try { localStorage.setItem('immigrationiq-api-key', apiKey); } catch {}
    setShowKeyInput(false);
    if (input.trim()) {
      const msg = input;
      setInput('');
      sendMessage(msg, apiKey);
    }
  };

  const suggestions = [t('chatSuggestion1'), t('chatSuggestion2'), t('chatSuggestion3')];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="border-b px-4 py-3 flex items-center justify-between bg-white" style={{ borderColor: 'var(--color-border)' }}>
        <div>
          <h1 className="text-lg font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{t('chatTitle')}</h1>
          <p className="text-xs" style={{ color: 'var(--color-text-light)' }}>{t('chatSubtitle')}</p>
        </div>
        <div className="flex gap-2 no-print">
          <button onClick={() => setShowKeyInput(!showKeyInput)} className="p-2 rounded-lg hover:bg-gray-100 transition" title="API Key">
            <Key className="h-4 w-4" style={{ color: apiKey ? 'var(--color-success-500)' : 'var(--color-text-light)' }} />
          </button>
          {messages.length > 0 && (
            <>
              <button onClick={() => exportChatToPdf(messages)} className="p-2 rounded-lg hover:bg-gray-100 transition" title="Export PDF">
                <Download className="h-4 w-4" style={{ color: 'var(--color-text-light)' }} />
              </button>
              <button onClick={clearChat} className="p-2 rounded-lg hover:bg-gray-100 transition" title="Clear chat">
                <Trash2 className="h-4 w-4" style={{ color: 'var(--color-secondary-500)' }} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* API Key Input */}
      {showKeyInput && (
        <div className="px-4 py-3 border-b" style={{ backgroundColor: 'var(--color-primary-50)', borderColor: 'var(--color-border)' }}>
          <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-primary-700)' }}>Enter your Anthropic API key to use the AI assistant:</p>
          <div className="flex gap-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-..."
              className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary-400)]"
              style={{ borderColor: 'var(--color-border)', fontFamily: 'var(--font-mono)' }}
            />
            <button onClick={handleSaveKey} className="btn-primary text-sm">Save</button>
          </div>
          <p className="text-[10px] mt-1" style={{ color: 'var(--color-text-light)' }}>Your key is stored locally and never sent to our servers.</p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6" style={{ backgroundColor: 'var(--color-surface)' }}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="h-16 w-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--color-primary-50)' }}>
              <MessageSquare className="h-8 w-8" style={{ color: 'var(--color-primary-500)' }} />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
              {t('chatTitle')}
            </h2>
            <p className="text-sm mb-6 max-w-md" style={{ color: 'var(--color-text-light)' }}>
              Ask any question about U.S. immigration — visas, green cards, citizenship, and more.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (!apiKey) { setInput(s); setShowKeyInput(true); }
                    else { sendMessage(s, apiKey); }
                  }}
                  className="rounded-full border px-4 py-2 text-sm transition-colors hover:bg-white hover:shadow-sm"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="mt-8 max-w-md">
              <DisclaimerBanner />
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <ChatBubble key={i} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
            {error && (
              <div className="flex items-center gap-2 rounded-lg p-3" style={{ backgroundColor: 'var(--color-danger-50)' }}>
                <AlertCircle className="h-4 w-4" style={{ color: 'var(--color-secondary-500)' }} />
                <p className="text-sm" style={{ color: 'var(--color-secondary-500)' }}>{error}</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t px-4 py-3 bg-white" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex gap-2 max-w-4xl mx-auto">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('chatPlaceholder')}
            disabled={isLoading}
            className="flex-1 rounded-full border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary-400)] disabled:opacity-50"
            style={{ borderColor: 'var(--color-border)', fontFamily: 'var(--font-body)' }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="btn-primary rounded-full px-4 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
