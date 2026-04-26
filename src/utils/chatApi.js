/**
 * Send a message to the serverless API proxy.
 * The API key is kept server-side — never exposed to the browser.
 * @param {Array<{role: string, content: string}>} messages - Conversation history
 * @param {{ language?: string, t?: (key: string) => string }} [opts] - Localization options
 * @returns {Promise<string>} The assistant's response text
 */
export async function sendMessage(messages, opts = {}) {
  const { language = 'en', t } = opts;
  const tr = (key, fallback) => (typeof t === 'function' ? t(key) : fallback);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: messages.map(({ role, content }) => ({ role, content })),
        language,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData?.error ||
        tr('chatErrorGeneric', `API request failed with status ${response.status}`);
      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (!data.text) {
      throw new Error(tr('chatErrorNoText', 'No text content in API response'));
    }

    return data.text;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        tr('chatErrorNetwork', 'Network error. Please check your internet connection and try again.')
      );
    }
    throw error;
  }
}

/**
 * Export chat messages to a PDF file using html2pdf.js.
 * @param {Array<{role: string, content: string, timestamp?: number}>} messages
 * @param {string} [language='en']
 * @param {(key: string) => string} [t] - Translation function
 */
export async function exportChatToPdf(messages, language = 'en', t) {
  const tr = (key, fallback) => (typeof t === 'function' ? t(key) : fallback);
  const locale = language === 'es' ? 'es-ES' : 'en-US';
  const { default: html2pdf } = await import('html2pdf.js');

  const container = document.createElement('div');
  container.style.padding = '20px';
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.maxWidth = '800px';

  const title = document.createElement('h1');
  title.textContent = tr('chatExportTitle', 'ImmigrationIQ - Chat History');
  title.style.color = '#1a365d';
  title.style.borderBottom = '2px solid #2b6cb0';
  title.style.paddingBottom = '10px';
  container.appendChild(title);

  const exportDate = document.createElement('p');
  exportDate.textContent = `${tr('chatExportTimestamp', 'Exported on')} ${new Date().toLocaleString(locale)}`;
  exportDate.style.color = '#718096';
  exportDate.style.fontSize = '12px';
  exportDate.style.marginBottom = '20px';
  container.appendChild(exportDate);

  const youLabel = tr('chatExportYou', 'You');
  const aiLabel = tr('chatExportAi', 'AI Assistant');

  messages.forEach((msg) => {
    const msgDiv = document.createElement('div');
    msgDiv.style.marginBottom = '16px';
    msgDiv.style.padding = '12px';
    msgDiv.style.borderRadius = '8px';
    msgDiv.style.backgroundColor = msg.role === 'user' ? '#ebf8ff' : '#f7fafc';
    msgDiv.style.borderLeft = `4px solid ${msg.role === 'user' ? '#3182ce' : '#48bb78'}`;

    const roleLabel = document.createElement('strong');
    roleLabel.textContent = msg.role === 'user' ? youLabel : aiLabel;
    roleLabel.style.display = 'block';
    roleLabel.style.marginBottom = '4px';
    roleLabel.style.color = msg.role === 'user' ? '#2b6cb0' : '#276749';
    msgDiv.appendChild(roleLabel);

    if (msg.timestamp) {
      const time = document.createElement('span');
      time.textContent = new Date(msg.timestamp).toLocaleString(locale);
      time.style.fontSize = '11px';
      time.style.color = '#a0aec0';
      time.style.display = 'block';
      time.style.marginBottom = '6px';
      msgDiv.appendChild(time);
    }

    const content = document.createElement('div');
    content.textContent = msg.content;
    content.style.whiteSpace = 'pre-wrap';
    content.style.fontSize = '14px';
    content.style.lineHeight = '1.5';
    msgDiv.appendChild(content);

    container.appendChild(msgDiv);
  });

  const disclaimer = document.createElement('p');
  disclaimer.textContent = tr(
    'chatExportDisclaimer',
    'Disclaimer: This chat provides general information only and is not legal advice. Consult a qualified immigration attorney for your specific situation.'
  );
  disclaimer.style.marginTop = '30px';
  disclaimer.style.fontSize = '11px';
  disclaimer.style.color = '#a0aec0';
  disclaimer.style.borderTop = '1px solid #e2e8f0';
  disclaimer.style.paddingTop = '10px';
  container.appendChild(disclaimer);

  const options = {
    margin: [10, 10, 10, 10],
    filename: `immigrationiq-chat-${Date.now()}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  await html2pdf().set(options).from(container).save();
}
