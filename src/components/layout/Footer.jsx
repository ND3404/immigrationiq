import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import NewsletterSignup from '../shared/NewsletterSignup';

const HEADING = 'rgba(255,255,255,0.95)';
const BODY = 'rgba(255,255,255,0.75)';
const BORDER = 'rgba(255,255,255,0.15)';

// Visible build marker. Bump on deploy to eyeball that a new build reached a
// browser (see README "PWA service worker"). Doubles as the change used to
// verify the auto-update path end-to-end.
const BUILD_TAG = 'build 2026.07.22-3';

// Brand glyphs — lucide-react omits these for trademark reasons, so we ship
// our own. Paths from Simple Icons (CC0). Same inlined-SVG pattern the
// WhatsAppButton uses.
function FacebookIcon({ size = 18 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.881 0 1.44 1.44 0 0 1 2.881 0z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61588998314613', Icon: FacebookIcon },
  { name: 'Instagram', href: 'https://www.instagram.com/immigrationiq1/', Icon: InstagramIcon },
  { name: 'TikTok', href: 'https://www.tiktok.com/@immigrationiq', Icon: TikTokIcon },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ backgroundColor: 'var(--color-primary-700)' }}>
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About + Newsletter */}
          <div className="text-center sm:text-left">
            <Link to="/" className="inline-block mb-3 no-underline" aria-label="ImmigrationIQ home">
              <img
                src="/logo-full-white.svg"
                alt="ImmigrationIQ"
                width="180"
                height="36"
                loading="lazy"
                className="h-9 w-auto mx-auto sm:mx-0"
              />
            </Link>
            <p className="text-sm mb-4" style={{ color: BODY }}>
              {t('footerAbout')}
            </p>
            <NewsletterSignup variant="compact" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold mb-3" style={{ color: HEADING }}>{t('footerQuickLinks')}</h3>
            <ul className="space-y-1">
              {[['/', t('home')], ['/categories', t('categories')], ['/chat', t('chat')], ['/timeline', t('timeline')], ['/services', t('services')], ['/contact', t('contact')]].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="block py-2 text-sm no-underline transition-colors hover:underline" style={{ color: BODY }}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold mb-3" style={{ color: HEADING }}>{t('footerOfficialResources')}</h3>
            <ul className="space-y-1">
              {[
                ['https://www.uscis.gov', 'USCIS.gov'],
                ['https://travel.state.gov', 'State Department'],
                ['https://www.ailalawyer.com', 'AILA Lawyer Search'],
                ['https://egov.uscis.gov/processing-times', t('processingTimes')],
              ].map(([url, label]) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 py-2 text-sm no-underline transition-colors hover:underline" style={{ color: BODY }}>
                    {label} <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold mb-3" style={{ color: HEADING }}>{t('footerLegal')}</h3>
            <ul className="space-y-2 text-sm" style={{ color: BODY }}>
              <li>{t('footerLegal1')}</li>
              <li>{t('footerLegal2')}</li>
              <li>{t('footerLegal3')}</li>
              <li className="font-semibold" style={{ color: 'var(--color-accent-300)' }}>{t('footerLegal4')}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t pt-6 text-center" style={{ borderColor: BORDER }}>
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: BODY }}>
              {t('footerFollowUs')}
            </span>
            <ul className="flex items-center gap-1">
              {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    title={name}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                    style={{ color: BODY }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = HEADING; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = BODY; e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    <Icon size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs" style={{ color: BODY }}>
            {t('copyright')}
            <span style={{ opacity: 0.5 }}> · {BUILD_TAG}</span>
          </p>
        </div>
      </div>

      {/* Slim disclaimer bar */}
      <div className="border-t px-4 py-4 text-center" style={{ backgroundColor: 'var(--color-primary-800)', borderColor: BORDER }}>
        <p className="text-[11px] max-w-3xl mx-auto" style={{ color: BODY, lineHeight: 1.55 }}>
          {t('i130.legal.disclaimer')}
        </p>
        <p
          className="text-[12px] mt-2"
          style={{ color: 'var(--color-accent-300)', fontWeight: 600, fontStyle: 'italic' }}
        >
          {t('i130.legal.tagline')}
        </p>
      </div>
    </footer>
  );
}
