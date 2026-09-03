const http = require('http');
const fs = require('fs');
const path = require('path');

// Load .env variables if present
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      if (!process.env[key]) process.env[key] = value.trim();
    }
  });
}

const port = process.env.PORT || 3000;
const root = __dirname;

const systemPrompt = `You are the Myntra Wishlist Conversion PM Research AI Copilot on the Growth Team.
You have access to 20,703 real customer reviews and discussions (Google Play India, Apple App Store, Reddit r/myntra, shopping communities, YouTube comments, Product Q&A) and 2,508 in-scope wishlist friction signals.

Verified Dataset Breakdown:
- Fit & Fabric Anxiety: 2,252 signals (89.8% of friction) - sizing uncertainty, fabric quality doubts, return/exchange hassle.
- Wishlist Clutter & Organization: 181 signals (7.2%) - 50+ saved items, forgotten items, lack of folders/filters.
- Delivery & Shipping Friction: 91 signals (3.6%) - ₹99 shipping fees on single wishlisted items below threshold.
- Occasion & Styling Inspiration: 89 signals (3.5%) - hesitation on how to style/pair with existing wardrobe.
- Size & Stock Availability: 17 signals (0.7%) - sizes selling out before decision, notify-me fatigue.

Strategic Goal: Increase % of users purchasing at least one item from their wishlist within 30 days.
Key Constraint: CANNOT offer monetary discounts, coupons, price cuts, or monetary promotions. Solutions must be 100% product-led.
Target User Segment: High-Intent Wishlist Accumulators (users with >= 10 wishlisted items over 30 days, 0 conversion).

When answering a PM question:
1. Executive PM Finding (clear, concise diagnosis of user behavior and root cause).
2. Data Signals & Evidence (cite the exact numbers, percentages, and representative customer quotes).
3. Non-Monetary Product Opportunity (specific UX/product features, behavioral nudges, or experimentation hypotheses).
Format your response with clean GitHub Markdown (headers, bullet points, and tables where helpful).`;

async function askGroq(question) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY is not configured on the server.');

  const models = ['openai/gpt-oss-120b', 'qwen/qwen3.8-27b'];
  let lastError;

  for (const model of models) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          temperature: 0.2,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: question }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) return { answer: content, model };
    } catch (err) {
      lastError = err;
      console.warn(`[Groq] Model ${model} failed, trying next...`, err.message);
    }
  }

  throw lastError || new Error('All LLM models failed.');
}

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  const requestPath = parsedUrl.pathname;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    response.end();
    return;
  }

  // Live LLM Copilot API Endpoint
  if (request.method === 'POST' && requestPath === '/api/ask') {
    let body = '';
    request.on('data', chunk => body += chunk);
    request.on('end', async () => {
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Content-Type', 'application/json; charset=utf-8');
      try {
        const parsed = JSON.parse(body || '{}');
        const question = (parsed.question || '').trim();
        if (!question) {
          response.writeHead(400);
          response.end(JSON.stringify({ error: 'Question is required.' }));
          return;
        }

        const result = await askGroq(question);
        response.writeHead(200);
        response.end(JSON.stringify({ ok: true, question, answer: result.answer, model: result.model }));
      } catch (err) {
        response.writeHead(500);
        response.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Static File Serving
  const targetFile = requestPath === '/' ? '/index.html' : decodeURIComponent(requestPath);
  const filePath = path.resolve(root, `.${targetFile}`);

  if (!filePath.startsWith(root) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  const contentType = path.extname(filePath) === '.html'
    ? 'text/html; charset=utf-8'
    : (path.extname(filePath) === '.json' ? 'application/json; charset=utf-8'
    : (path.extname(filePath) === '.svg' ? 'image/svg+xml'
    : 'application/octet-stream'));
  
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(response);
});

server.listen(port, () => console.log(`Myntra Discovery Engine & LLM Copilot running on port ${port}`));
