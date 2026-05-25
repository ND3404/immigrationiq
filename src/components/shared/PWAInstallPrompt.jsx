import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const STORAGE_KEY = 'iiq-pwa-install-dismissed-v1';

function isStandalone() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia?.('(display-mode: standalone)').matches) return true;
  if (window.navigator.standalone === true) return true;
  return false;
}

function detectIOSSafari() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
  if (!isIOS) return false;
  // Exclude in-app browsers / non-Safari iOS browsers — only real Safari can
  // Add-to-Home-Screen on iOS.
  const isSafari = /Safari\//.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS|GSA/.test(ua);
  return isSafari;
}

function readDismissed() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function writeDismissed() {
  try {
    localStorage.setItem(STORAGE_KEY, '1');
  } catch {
    // Private mode etc — fall back to in-memory only.
  }
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function IOSShareIcon() {
  // Apple's canonical Share glyph: square with up-arrow rising out the top.
  return (
    <svg width="20" height="22" viewBox="0 0 24 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v15" />
      <path d="M7 7l5-5 5 5" />
      <path d="M5 12v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V12" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

export default function PWAInstallPrompt() {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [platform, setPlatform] = useState('none'); // 'android' | 'ios' | 'none'
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Don't surface anything if already installed or previously dismissed.
    if (isStandalone() || readDismissed()) return;

    const onBeforeInstall = (e) => {
      e.preventDefault();
      // Re-check guards on every fire — Chrome can re-emit beforeinstallprompt
      // (e.g. after a manifest update), and dismissed/standalone status can
      // change after mount. Without this, dismissing and then triggering the
      // event again would re-show the prompt.
      if (isStandalone() || readDismissed()) return;
      setDeferredPrompt(e);
      setPlatform('android');
      setHidden(false);
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstall);

    const onInstalled = () => {
      setHidden(true);
      setDeferredPrompt(null);
      writeDismissed();
    };
    window.addEventListener('appinstalled', onInstalled);

    // iOS Safari never fires beforeinstallprompt — show the manual hint
    // instead. Slight delay so it doesn't slam in during the initial paint.
    let iosTimer;
    if (detectIOSSafari()) {
      iosTimer = setTimeout(() => {
        setPlatform('ios');
        setHidden(false);
      }, 1500);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
      if (iosTimer) clearTimeout(iosTimer);
    };
  }, []);

  if (hidden || platform === 'none') return null;

  const dismiss = () => {
    setHidden(true);
    writeDismissed();
  };

  const onInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    try {
      const choice = await deferredPrompt.userChoice;
      // Regardless of accepted/dismissed, the event can only be used once.
      setDeferredPrompt(null);
      setHidden(true);
      if (choice?.outcome === 'dismissed') writeDismissed();
      // If accepted, the appinstalled handler will write dismissed.
    } catch {
      setHidden(true);
    }
  };

  return (
    <div
      role="dialog"
      aria-label={t('pwa.install.title')}
      className="fixed bottom-4 left-4 z-50 w-[calc(100%-2rem)] max-w-sm rounded-xl bg-white shadow-2xl"
      style={{ border: '1px solid var(--color-border)' }}
    >
      <div className="flex items-start gap-3 p-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary-600)' }}
          aria-hidden="true"
        >
          {platform === 'ios' ? <IOSShareIcon /> : <DownloadIcon />}
        </div>

        <div className="min-w-0 flex-1">
          <div
            className="text-sm font-semibold"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
          >
            {t('pwa.install.title')}
          </div>
          <div className="mt-1 text-xs leading-snug" style={{ color: 'var(--color-text-light)' }}>
            {platform === 'ios' ? t('pwa.install.ios.subtitle') : t('pwa.install.subtitle')}
          </div>

          {platform === 'android' && (
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={onInstallClick}
                className="btn-primary"
                style={{ padding: '8px 16px', minHeight: '36px', fontSize: '13px' }}
              >
                {t('pwa.install.cta')}
              </button>
              <button
                type="button"
                onClick={dismiss}
                className="text-xs font-medium"
                style={{ color: 'var(--color-text-light)', padding: '8px 4px' }}
              >
                {t('pwa.install.dismiss')}
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={dismiss}
          aria-label={t('pwa.install.close')}
          className="-mr-1 -mt-1 shrink-0 rounded-md p-1.5 transition-colors hover:bg-[var(--color-primary-50)]"
          style={{ color: 'var(--color-text-light)' }}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
