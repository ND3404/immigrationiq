// Service-worker update handling.
//
// The PWA is configured with registerType: 'autoUpdate' + skipWaiting +
// clientsClaim (see vite.config.js), so a freshly deployed service worker
// installs and takes control on its own. What was missing: nothing ever
// reloaded the *already-open page* after that hand-off, so a returning
// visitor's current visit kept rendering the previously-cached app shell and
// only picked up new code on their NEXT visit — i.e. every fix landed one
// visit late.
//
// This wires the missing piece: when a new service worker takes control
// (controllerchange), reload once so the visitor gets the new build on THIS
// visit, and leave a one-shot breadcrumb in sessionStorage so the app can
// show a small "Site updated" toast after the reload (see UpdateToast.jsx).
//
// Tradeoff: the reload discards in-progress, non-persisted form state (e.g. an
// unsaved I-130 wizard step). That's acceptable for an information site where
// updates are infrequent and always tied to a deploy; the toast makes the
// otherwise-surprising reload self-explanatory.

const UPDATED_FLAG = 'pwa:justUpdated';

export function registerPwa() {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;

  // A controller present at load time means this browser already had the app's
  // service worker installed, so a later controllerchange is a real update.
  // If there's no controller yet, the first controllerchange is just the
  // initial install claiming the page — not an update — so we must not reload.
  const hadControllerAtLoad = !!navigator.serviceWorker.controller;
  let reloading = false;

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadControllerAtLoad || reloading) return;
    reloading = true;
    try {
      sessionStorage.setItem(UPDATED_FLAG, '1');
    } catch {
      // sessionStorage can throw in private modes / when storage is full;
      // the reload is the important part, the toast is best-effort.
    }
    window.location.reload();
  });
}

// Returns true exactly once after an update-triggered reload, clearing the
// flag so the toast shows a single time.
export function consumeJustUpdated() {
  try {
    if (sessionStorage.getItem(UPDATED_FLAG) === '1') {
      sessionStorage.removeItem(UPDATED_FLAG);
      return true;
    }
  } catch {
    // ignore storage access errors
  }
  return false;
}
