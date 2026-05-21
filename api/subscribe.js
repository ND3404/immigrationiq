const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwvynwog';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_SOURCES = new Set([
  'i-130-launch',
  'kit-download',
  'newsletter-footer',
  'homepage-hero',
]);
const MAX_EMAIL_LEN = 254;
const MAX_SOURCE_LEN = 64;
const MAX_LANGUAGE_LEN = 8;
const MAX_KIT_NAME_LEN = 120;
const MAX_PAGE_URL_LEN = 2048;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const ipHits = new Map();

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length > 0) {
    return fwd.split(',')[0].trim();
  }
  return (req.socket && req.socket.remoteAddress) || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const hits = (ipHits.get(ip) || []).filter((ts) => ts > cutoff);

  if (hits.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, hits);
    return true;
  }

  hits.push(now);
  ipHits.set(ip, hits);

  if (ipHits.size > 5000) {
    for (const [k, v] of ipHits.entries()) {
      const fresh = v.filter((ts) => ts > cutoff);
      if (fresh.length === 0) ipHits.delete(k);
      else ipHits.set(k, fresh);
    }
  }

  return false;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res
      .status(429)
      .json({ success: false, error: 'Too many requests. Please try again in an hour.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  const email = typeof body.email === 'string' ? body.email.trim().slice(0, MAX_EMAIL_LEN) : '';
  const source = typeof body.source === 'string' ? body.source.trim().slice(0, MAX_SOURCE_LEN) : '';
  const language = typeof body.language === 'string'
    ? body.language.trim().slice(0, MAX_LANGUAGE_LEN)
    : 'unknown';
  const kitName = typeof body.kit_name === 'string'
    ? body.kit_name.trim().slice(0, MAX_KIT_NAME_LEN)
    : '';

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address' });
  }
  if (!ALLOWED_SOURCES.has(source)) {
    return res.status(400).json({ success: false, error: 'Invalid source' });
  }

  const referer = req.headers.referer || req.headers.referrer;
  const pageUrl = typeof referer === 'string' ? referer.slice(0, MAX_PAGE_URL_LEN) : '';
  const submittedAt = new Date().toISOString();

  const payload = {
    email,
    _subject: `New ImmigrationIQ signup — ${source}`,
    source,
    language: language || 'unknown',
    kit_name: kitName,
    page_url: pageUrl,
    submitted_at: submittedAt,
  };

  console.log('[subscribe]', JSON.stringify({ ts: submittedAt, source, ip }));

  try {
    const fsRes = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!fsRes.ok) {
      return res
        .status(502)
        .json({ success: false, error: 'Subscription service unavailable' });
    }

    return res.status(200).json({ success: true });
  } catch {
    return res
      .status(502)
      .json({ success: false, error: 'Subscription service unavailable' });
  }
}
