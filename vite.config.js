import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

const SYSTEM_PROMPT_EN = 'You are an expert U.S. immigration assistant with deep knowledge of USCIS, DOS, and immigration law. Provide accurate, up-to-date guidance. Always clarify you are not a lawyer and recommend consulting one for legal advice. Be empathetic, clear, and thorough. When referencing official information, mention the relevant USCIS or DOS website. Format your responses with clear structure using markdown when helpful.';

const SYSTEM_PROMPT_ES = 'Eres un experto asistente de inmigración de EE.UU. con profundo conocimiento de USCIS, el Departamento de Estado y la ley de inmigración. Proporciona orientación precisa y actualizada. Siempre aclara que no eres abogado y recomienda consultar a uno para asesoría legal. Sé empático, claro y detallado. Cuando menciones información oficial, refiere los sitios web pertinentes de USCIS o del Departamento de Estado. Formatea tus respuestas con estructura clara usando markdown cuando sea útil. **Responde siempre en español**, sin importar el idioma del mensaje del usuario.';

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

        let body = '';
        for await (const chunk of req) body += chunk;

        try {
          const { messages, language } = JSON.parse(body);
          const apiKey = process.env.VITE_ANTHROPIC_API_KEY;

          if (!apiKey) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Missing VITE_ANTHROPIC_API_KEY in .env.local' }));
            return;
          }

          const systemPrompt = language === 'es' ? SYSTEM_PROMPT_ES : SYSTEM_PROMPT_EN;

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
  plugins: [
    react(),
    tailwindcss(),
    apiChatPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon-180x180.png'],
      manifest: {
        name: 'ImmigrationIQ',
        short_name: 'ImmigrationIQ',
        description: 'Free AI-powered U.S. immigration assistant providing guidance on visas, green cards, and citizenship in English and Spanish.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#003087',
        theme_color: '#003087',
        lang: 'es',
        orientation: 'portrait',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Precache only the static app shell built into dist/.
        // Note: this is the manifest of files Workbox will install on first load.
        // PII-bearing PDFs/kits aren't matched by these globs.
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        // Hard cap any one precache entry; the build chunks are well below this.
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        // SPA routing: any navigation falls back to index.html, EXCEPT API paths.
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        // Explicit NetworkOnly for every PII / freshness-critical endpoint.
        // Nothing here ever enters the SW cache. Order matters — first match wins.
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
            handler: 'NetworkOnly',
            method: 'GET',
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
            handler: 'NetworkOnly',
            method: 'POST',
          },
          {
            // Anthropic API direct calls (defense in depth — currently proxied
            // through /api/chat, but lock it down in case that ever changes).
            urlPattern: /^https:\/\/api\.anthropic\.com\//,
            handler: 'NetworkOnly',
          },
        ],
      },
    }),
  ],
})
