const CHAT_HISTORY_KEY = 'immigrationiq-chat-history';
const CHECKLIST_KEY_PREFIX = 'immigrationiq-checklist-';

/**
 * Save chat messages to localStorage.
 * @param {Array<{role: string, content: string, timestamp?: number}>} messages
 */
export function saveChatHistory(messages) {
  try {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
  } catch {
    // localStorage full or unavailable
  }
}

/**
 * Load chat messages from localStorage.
 * @returns {Array<{role: string, content: string, timestamp?: number}>}
 */
export function loadChatHistory() {
  try {
    const data = localStorage.getItem(CHAT_HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Clear chat history from localStorage.
 */
export function clearChatHistory() {
  try {
    localStorage.removeItem(CHAT_HISTORY_KEY);
  } catch {
    // localStorage unavailable
  }
}

/**
 * Save checklist items for a specific visa type.
 * @param {string} visaType - e.g. 'H-1B', 'F-1'
 * @param {Array<{id: string, label: string, checked: boolean}>} items
 */
export function saveChecklist(visaType, items) {
  try {
    const key = CHECKLIST_KEY_PREFIX + visaType;
    localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // localStorage full or unavailable
  }
}

/**
 * Load checklist items for a specific visa type.
 * @param {string} visaType - e.g. 'H-1B', 'F-1'
 * @returns {Array<{id: string, label: string, checked: boolean}>}
 */
export function loadChecklist(visaType) {
  try {
    const key = CHECKLIST_KEY_PREFIX + visaType;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
