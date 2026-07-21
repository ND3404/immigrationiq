// Single source of truth for the Visa Bulletin share payload, so the Open
// Graph / Twitter meta tags on the page and the Share button always agree —
// a scraped preview that says "August 2026" while the share text says
// something else would look broken.
//
// The month/year come from the passed bulletin (use currentVisaBulletin) so
// this stays accurate automatically as new bulletins land.

const SHARE_URL = 'https://www.immigrationiq.us/visa-bulletin';
const OG_IMAGE = 'https://www.immigrationiq.us/og-visa-bulletin.png';

// The data stores the month as an English name ("August"); map to an index so
// we can render it localized.
const MONTH_INDEX = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

function localizedMonthYear(bulletin, language) {
  const idx = MONTH_INDEX[String(bulletin?.month || '').toLowerCase()];
  if (idx === undefined || !bulletin?.year) return bulletin?.label || '';
  // Format month and year separately then join, so both languages read as
  // "Month Year" (e.g. "August 2026" / "Agosto 2026") — es-ES's default
  // "agosto de 2026" would break the parallel with the English title.
  const monthName = new Date(Date.UTC(bulletin.year, idx, 1)).toLocaleDateString(
    language === 'es' ? 'es-ES' : 'en-US',
    { month: 'long', timeZone: 'UTC' },
  );
  const capitalized = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  return `${capitalized} ${bulletin.year}`;
}

const DESC = {
  en: 'Track priority dates, advancements, and USCIS filing charts for family- and employment-based green card categories. Updated monthly by ImmigrationIQ.',
  es: 'Rastree fechas de prioridad, avances, y tablas de presentación de USCIS para Green Cards familiares y de empleo. Actualizado mensualmente por ImmigrationIQ.',
};

/**
 * Build the share/OG payload for a bulletin in the given language.
 * @returns {{ url: string, image: string, title: string, text: string }}
 */
export function buildBulletinShare(bulletin, language = 'en') {
  const lang = language === 'es' ? 'es' : 'en';
  const monthYear = localizedMonthYear(bulletin, lang);
  const title = lang === 'es'
    ? `Boletín de Visas EE.UU. — ${monthYear}`
    : `U.S. Visa Bulletin — ${monthYear}`;
  return { url: SHARE_URL, image: OG_IMAGE, title, text: DESC[lang] };
}

/**
 * Build a platform share-intent URL. Pure — exported for testing.
 * Returns null for 'copy_link' (handled via the Clipboard API, not a URL).
 * @param {'whatsapp'|'facebook'|'x'|'linkedin'|'email'|'copy_link'} platform
 * @param {{title:string,text:string,url:string}} share
 */
export function platformShareUrl(platform, { title, text, url }) {
  const u = encodeURIComponent(url);
  const titleAndTextAndUrl = encodeURIComponent(`${title}\n${text}\n${url}`);
  switch (platform) {
    case 'whatsapp': return `https://wa.me/?text=${titleAndTextAndUrl}`;
    case 'facebook': return `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    case 'x':        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${u}`;
    case 'linkedin': return `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    case 'email':    return `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;
    default:         return null;
  }
}
