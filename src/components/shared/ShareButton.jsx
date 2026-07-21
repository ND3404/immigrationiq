import { useState, useRef, useEffect, useCallback } from 'react';
import { Share2, Mail, Link2, Check } from 'lucide-react';
import { track } from '@vercel/analytics';
import { useLanguage } from '../../context/LanguageContext';
import { currentVisaBulletin } from '../../data/visaBulletin';
import { buildBulletinShare, platformShareUrl } from '../../utils/visaBulletinShare';

// lucide dropped brand icons, so inline monochrome brand glyphs (24×24).
const brandGlyph = (path) => function Glyph(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d={path} />
    </svg>
  );
};
const WhatsAppIcon = brandGlyph('M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z');
const FacebookIcon = brandGlyph('M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z');
const XIcon = brandGlyph('M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z');
const LinkedInIcon = brandGlyph('M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z');

async function copyToClipboard(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { /* fall through to legacy path */ }
  // Legacy fallback: hidden textarea + execCommand.
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

// Same white-pill styling as the neighbouring "Official Source" button.
const PILL_CLASS =
  'inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold no-underline hover:bg-blue-50 cursor-pointer';

export default function ShareButton() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const copyTimer = useRef(null);

  // Always share the CURRENT bulletin (the page URL always shows current),
  // regardless of any historical month the user is viewing.
  const share = buildBulletinShare(currentVisaBulletin, language);

  const canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const closePopover = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  }, []);

  const fire = (platform) => {
    try { track('share_visa_bulletin', { platform }); } catch { /* analytics optional */ }
  };

  const handleTrigger = async () => {
    if (canNativeShare) {
      fire('native_share');
      try {
        await navigator.share({ title: share.title, text: share.text, url: share.url });
      } catch { /* user cancelled / not allowed — no-op */ }
      return;
    }
    setOpen((v) => !v);
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(share.url);
    if (ok) {
      fire('copy_link');
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    }
  };

  // Close on outside click / Esc, and trap focus inside the popover.
  useEffect(() => {
    if (!open) return undefined;

    const onDown = (e) => {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)
      ) {
        closePopover(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); closePopover(true); return; }
      if (e.key !== 'Tab') return;
      const items = popoverRef.current?.querySelectorAll('a[href],button:not([disabled])');
      if (!items || items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    // Move focus into the popover.
    const firstItem = popoverRef.current?.querySelector('a[href],button:not([disabled])');
    firstItem?.focus();

    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, closePopover]);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const linkPlatforms = [
    { key: 'whatsapp', name: 'WhatsApp', Icon: WhatsAppIcon, color: '#25D366' },
    { key: 'facebook', name: 'Facebook', Icon: FacebookIcon, color: '#1877F2' },
    { key: 'x',        name: 'X',         Icon: XIcon,        color: '#000000' },
    { key: 'linkedin', name: 'LinkedIn', Icon: LinkedInIcon, color: '#0A66C2' },
  ];

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={handleTrigger}
        className={PILL_CLASS}
        style={{ color: 'var(--color-primary-700)', border: 'none' }}
        aria-label={t('vbShareAria')}
        aria-haspopup={canNativeShare ? undefined : 'menu'}
        aria-expanded={canNativeShare ? undefined : open}
      >
        {t('vbShare')} <Share2 className="h-3.5 w-3.5" />
      </button>

      {/* Screen-reader announcement for the copy action. */}
      <span aria-live="polite" className="sr-only">
        {copied ? t('vbShareCopied') : ''}
      </span>

      {!canNativeShare && open && (
        <div
          ref={popoverRef}
          role="menu"
          aria-label={t('vbShareVia')}
          className="absolute right-0 z-50 mt-2 w-64 rounded-xl bg-white p-3 shadow-xl"
          style={{ border: '1px solid var(--color-border)' }}
        >
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-light)' }}>
            {t('vbShareVia')}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {linkPlatforms.map((p) => (
              <a
                key={p.key}
                role="menuitem"
                href={platformShareUrl(p.key, share)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => fire(p.key)}
                className="flex flex-col items-center gap-1 rounded-lg p-2 text-xs font-medium no-underline hover:bg-gray-50"
                style={{ color: 'var(--color-text)' }}
                aria-label={`${t('vbShareOn')} ${p.name}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ backgroundColor: p.color }}>
                  <p.Icon />
                </span>
                {p.name}
              </a>
            ))}

            <a
              role="menuitem"
              href={platformShareUrl('email', share)}
              onClick={() => fire('email')}
              className="flex flex-col items-center gap-1 rounded-lg p-2 text-xs font-medium no-underline hover:bg-gray-50"
              style={{ color: 'var(--color-text)' }}
              aria-label={t('vbShareEmailAria')}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ backgroundColor: 'var(--color-primary-600)' }}>
                <Mail className="h-5 w-5" />
              </span>
              {t('vbShareEmail')}
            </a>

            <button
              type="button"
              role="menuitem"
              onClick={handleCopy}
              className="flex flex-col items-center gap-1 rounded-lg p-2 text-xs font-medium hover:bg-gray-50 cursor-pointer"
              style={{ color: 'var(--color-text)', border: 'none', background: 'none' }}
              aria-label={t('vbShareCopyLink')}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: copied ? 'var(--color-success-500)' : 'var(--color-primary-800)' }}
              >
                {copied ? <Check className="h-5 w-5" /> : <Link2 className="h-5 w-5" />}
              </span>
              {copied ? t('vbShareCopiedShort') : t('vbShareCopyLink')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
