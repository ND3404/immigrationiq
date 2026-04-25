const SYSTEM_PROMPT = `You are an expert U.S. immigration assistant with deep knowledge of USCIS, DOS, and immigration law. Provide accurate, up-to-date guidance. Always clarify you are not a lawyer and recommend consulting one for legal advice. Be empathetic, clear, and thorough. When referencing official information, mention the relevant USCIS or DOS website. Format your responses with clear structure using markdown when helpful.`;

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server misconfigured: missing API key' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Sanitize messages to only include role and content
    const sanitizedMessages = messages.map(({ role, content }) => ({
      role,
      content: String(content).slice(0, 10000), // limit message length
    }));

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: sanitizedMessages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData?.error?.message || `Anthropic API error: ${response.status}`;
      console.error('Anthropic upstream error', {
        status: response.status,
        type: errorData?.error?.type,
        message: errorMessage,
      });
      return res.status(response.status).json({ error: errorMessage });
    }

    const data = await response.json();

    // Extract text from response
    const text = data.content
      ?.filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('');

    return res.status(200).json({ text });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
