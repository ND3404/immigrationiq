const SYSTEM_PROMPT_EN = `You are an expert U.S. immigration assistant with deep knowledge of USCIS, DOS, and immigration law. Provide accurate, up-to-date guidance. Always clarify you are not a lawyer and recommend consulting one for legal advice. Be empathetic, clear, and thorough. When referencing official information, mention the relevant USCIS or DOS website. Format your responses with clear structure using markdown when helpful.`;

const SYSTEM_PROMPT_ES = `Eres un experto asistente de inmigración de EE.UU. con profundo conocimiento de USCIS, el Departamento de Estado y la ley de inmigración. Proporciona orientación precisa y actualizada. Siempre aclara que no eres abogado y recomienda consultar a uno para asesoría legal. Sé empático, claro y detallado. Cuando menciones información oficial, refiere los sitios web pertinentes de USCIS o del Departamento de Estado. Formatea tus respuestas con estructura clara usando markdown cuando sea útil. **Responde siempre en español**, sin importar el idioma del mensaje del usuario.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server misconfigured: missing API key' });
  }

  try {
    const { messages, language } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const systemPrompt = language === 'es' ? SYSTEM_PROMPT_ES : SYSTEM_PROMPT_EN;

    const sanitizedMessages = messages.map(({ role, content }) => ({
      role,
      content: String(content).slice(0, 10000),
    }));

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: systemPrompt,
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
