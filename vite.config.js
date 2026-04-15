import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Dev middleware that mimics the Vercel /api/chat serverless function
function apiChatPlugin() {
  return {
    name: 'api-chat-dev',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        // Read request body
        let body = '';
        for await (const chunk of req) body += chunk;

        try {
          const { messages } = JSON.parse(body);
          const apiKey = process.env.VITE_ANTHROPIC_API_KEY;

          if (!apiKey) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Missing VITE_ANTHROPIC_API_KEY in .env.local' }));
            return;
          }

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
              system: 'You are an expert U.S. immigration assistant with deep knowledge of USCIS, DOS, and immigration law. Provide accurate, up-to-date guidance. Always clarify you are not a lawyer and recommend consulting one for legal advice. Be empathetic, clear, and thorough. When referencing official information, mention the relevant USCIS or DOS website. Format your responses with clear structure using markdown when helpful.',
              messages: messages.map(({ role, content }) => ({ role, content })),
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            res.statusCode = response.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: data?.error?.message || 'Anthropic API error' }));
            return;
          }

          const text = data.content
            ?.filter((block) => block.type === 'text')
            .map((block) => block.text)
            .join('');

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ text }));
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), apiChatPlugin()],
})
