const SYSTEM_PROMPT = `You are an expert U.S. immigration assistant with deep knowledge of USCIS, DOS, and immigration law. Provide accurate, up-to-date guidance. Always clarify you are not a lawyer and recommend consulting one for legal advice. Be empathetic, clear, and thorough. When referencing official information, mention the relevant USCIS or DOS website. Format your responses with clear structure using markdown when helpful.`;

/**
 * Send a message to the Claude API via the Vite proxy.
 * @param {Array<{role: string, content: string}>} messages - Conversation history
 * @param {string} apiKey - Anthropic API key
 * @returns {Promise<string>} The assistant's response text
 */
export async function sendMessage(messages, apiKey) {
  try {
    const response = await fetch('/api/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages.map(({ role, content }) => ({ role, content })),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData?.error?.message || `API request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Extract text from the response content blocks
    const text = data.content
      ?.filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('');

    if (!text) {
      throw new Error('No text content in API response');
    }

    return text;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection and try again.');
    }
    throw error;
  }
}

/**
 * Export chat messages to a PDF file using html2pdf.js.
 * @param {Array<{role: string, content: string, timestamp?: number}>} messages
 */
export async function exportChatToPdf(messages) {
  const { default: html2pdf } = await import('html2pdf.js');

  const container = document.createElement('div');
  container.style.padding = '20px';
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.maxWidth = '800px';

  // Title
  const title = document.createElement('h1');
  title.textContent = 'ImmigrationIQ - Chat History';
  title.style.color = '#1a365d';
  title.style.borderBottom = '2px solid #2b6cb0';
  title.style.paddingBottom = '10px';
  container.appendChild(title);

  // Timestamp
  const exportDate = document.createElement('p');
  exportDate.textContent = `Exported on ${new Date().toLocaleString()}`;
  exportDate.style.color = '#718096';
  exportDate.style.fontSize = '12px';
  exportDate.style.marginBottom = '20px';
  container.appendChild(exportDate);

  // Messages
  messages.forEach((msg) => {
    const msgDiv = document.createElement('div');
    msgDiv.style.marginBottom = '16px';
    msgDiv.style.padding = '12px';
    msgDiv.style.borderRadius = '8px';
    msgDiv.style.backgroundColor = msg.role === 'user' ? '#ebf8ff' : '#f7fafc';
    msgDiv.style.borderLeft = `4px solid ${msg.role === 'user' ? '#3182ce' : '#48bb78'}`;

    const roleLabel = document.createElement('strong');
    roleLabel.textContent = msg.role === 'user' ? 'You' : 'AI Assistant';
    roleLabel.style.display = 'block';
    roleLabel.style.marginBottom = '4px';
    roleLabel.style.color = msg.role === 'user' ? '#2b6cb0' : '#276749';
    msgDiv.appendChild(roleLabel);

    if (msg.timestamp) {
      const time = document.createElement('span');
      time.textContent = new Date(msg.timestamp).toLocaleString();
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

  // Disclaimer
  const disclaimer = document.createElement('p');
  disclaimer.textContent =
    'Disclaimer: This chat provides general information only and is not legal advice. Consult a qualified immigration attorney for your specific situation.';
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
