import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import { ChatProvider } from './context/ChatContext';
import App from './App';
import { registerPwa } from './pwa/registerPwa';
import './index.css';

// Reload the open page when a new service worker takes over, so returning
// visitors get the latest deploy on this visit rather than the next one.
registerPwa();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
