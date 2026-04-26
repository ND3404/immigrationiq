const RATE_LIMIT_KEY = 'immigrationiq-chat-usage';
export const DAILY_LIMIT = 10;

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function read() {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    if (!raw) return { date: todayKey(), count: 0 };
    const parsed = JSON.parse(raw);
    if (parsed?.date !== todayKey()) return { date: todayKey(), count: 0 };
    return { date: parsed.date, count: Number(parsed.count) || 0 };
  } catch {
    return { date: todayKey(), count: 0 };
  }
}

function write(state) {
  try {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable
  }
}

export function getUsageCount() {
  return read().count;
}

export function getRemaining() {
  return Math.max(0, DAILY_LIMIT - read().count);
}

export function isLimitReached() {
  return read().count >= DAILY_LIMIT;
}

export function incrementUsage() {
  const state = read();
  const next = { date: state.date, count: state.count + 1 };
  write(next);
  return Math.max(0, DAILY_LIMIT - next.count);
}
