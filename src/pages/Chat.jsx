import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, Plus, Download, AlertCircle, MessageSquare } from 'lucide-react';
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
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q && messages.length === 0) {
      sendMessage(q);
    } else if (q) {
      setInput(q);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Auto-grow textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 180) + 'px';
  }, [input]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    const msg = input;
    setInput('');
    await sendMessage(msg);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleNewChat = () => {
    if (messages.length === 0) return;
    if (window.confirm('Start a new chat? This will clear the current conversation.')) {
      clearChat();
      inputRef.current?.focus();
    }
  };

  const suggestions = [t('chatSuggestion1'), t('chatSuggestion2'), t('chatSuggestion3')];

  return (
    <div
      className="flex flex-col"
      style={{ height: 'calc(100vh - 4rem)', minHeight: '600px', backgroundColor: 'var(--color-surface)' }}
    >
      {/* Header */}
      <div
        className="border-b bg-white"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="hidden sm:flex h-10 w-10 rounded-full items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'var(--color-primary-50)' }}
            >
              <MessageSquare className="h-5 w-5" style={{ color: 'var(--color-primary-500)' }} />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold truncate" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                {t('chatTitle')}
              </h1>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-light)' }}>
                {t('chatSubtitle')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 no-print flex-shrink-0">
            <button
              onClick={handleNewChat}
              disabled={messages.length === 0}
              className="inline-flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-2 text-sm font-semibold border transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              title="Start a new chat"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Chat</span>
            </button>
            {messages.length > 0 && (
              <button
                onClick={() => exportChatToPdf(messages)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
                title="Export PDF"
              >
                <Download className="h-4 w-4" style={{ color: 'var(--color-text-light)' }} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5 sm:space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <div
                className="h-20 w-20 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: 'var(--color-primary-50)' }}
              >
                <MessageSquare className="h-10 w-10" style={{ color: 'var(--color-primary-500)' }} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                {t('chatTitle')}
              </h2>
              <p className="text-base mb-7 max-w-lg" style={{ color: 'var(--color-text-light)' }}>
                Ask any question about U.S. immigration — visas, green cards, citizenship, and more.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(s)}
                    className="rounded-full border bg-white px-4 py-2 text-sm transition-colors hover:bg-gray-50 hover:shadow-sm"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="mt-10 max-w-md w-full">
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
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t bg-white"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div
            className="flex items-end gap-3 rounded-2xl border bg-white px-4 py-2.5 focus-within:ring-2 focus-within:ring-[var(--color-primary-400)]"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <textarea
              ref={(el) => { inputRef.current = el; textareaRef.current = el; }}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('chatPlaceholder')}
              disabled={isLoading}
              className="flex-1 resize-none bg-transparent outline-none disabled:opacity-50"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                lineHeight: '1.5',
                color: 'var(--color-text)',
                minHeight: '28px',
                maxHeight: '180px',
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="btn-primary rounded-xl px-5 py-3 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Send message"
              style={{ minHeight: '48px' }}
            >
              <Send className="h-5 w-5" />
              <span className="hidden sm:inline ml-1.5 font-semibold">Send</span>
            </button>
          </div>
          <p className="text-[11px] mt-2 text-center" style={{ color: 'var(--color-text-light)' }}>
            Press <kbd className="px-1.5 py-0.5 rounded border" style={{ borderColor: 'var(--color-border)' }}>Enter</kbd> to send · <kbd className="px-1.5 py-0.5 rounded border" style={{ borderColor: 'var(--color-border)' }}>Shift</kbd>+<kbd className="px-1.5 py-0.5 rounded border" style={{ borderColor: 'var(--color-border)' }}>Enter</kbd> for new line
          </p>
        </div>
      </form>
    </div>
  );
}
