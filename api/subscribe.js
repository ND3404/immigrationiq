const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_SOURCES = new Set(['i-130-coming-soon', 'homepage', 'unknown']);
const MAX_EMAIL_LEN = 254;
const MAX_SOURCE_LEN = 64;

const RATE_LIMIT_MAX = 3;
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
  const source = typeof body.source === 'string' ? body.source.trim().slice(0, MAX_SOURCE_LEN) : 'unknown';

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address' });
  }

  const safeSource = ALLOWED_SOURCES.has(source) ? source : 'unknown';

  console.log('[subscribe]', JSON.stringify({
    ts: new Date().toISOString(),
    email,
    source: safeSource,
    ip,
  }));

  return res.status(200).json({ success: true });
}
