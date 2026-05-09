import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingChatButton from '../chat/FloatingChatButton';
import BackToTop from '../shared/BackToTop';

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const isChat = pathname === '/chat';

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      {!isChat && <Footer />}
      {!isChat && <FloatingChatButton />}
      {!isChat && <BackToTop />}
    </div>
  );
}
