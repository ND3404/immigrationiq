import { Link, useLocation } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

export default function FloatingChatButton() {
  const { pathname } = useLocation();

  // Hide on the chat page itself.
  if (pathname.startsWith('/chat')) return null;

  return (
    <Link
      to="/chat"
      aria-label="Ask ImmigrationIQ — AI Assistant"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white no-underline shadow-xl transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        background: 'linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-500) 100%)',
        boxShadow: '0 10px 30px rgba(0, 48, 135, 0.35)',
        fontFamily: 'var(--font-heading)',
      }}
    >
      <MessageSquare className="h-5 w-5" />
      <span className="hidden sm:inline">Ask ImmigrationIQ</span>
    </Link>
  );
}
