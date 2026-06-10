const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.mp3':  'audio/mpeg',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
};

function proxyTTS(req, res) {
  const u = new URL(req.url, 'http://localhost');
  const text  = u.searchParams.get('text');
  const speed = u.searchParams.get('speed');
  if (!text) { res.writeHead(400); res.end(); return; }

  const ttsUrl =
    'https://translate.google.com/translate_tts?ie=UTF-8' +
    '&q=' + encodeURIComponent(text) +
    '&tl=ko&client=tw-ob' +
    (speed && parseFloat(speed) < 1 ? '&ttsspeed=' + speed : '');

  https.get(ttsUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      'Referer':    'https://translate.google.com/',
      'Accept':     'audio/*,*/*;q=0.9',
    }
  }, r => {
    res.writeHead(r.statusCode === 200 ? 200 : 502, {
      'Content-Type':                r.headers['content-type'] || 'audio/mpeg',
      'Cache-Control':               'public, max-age=86400',
      'Access-Control-Allow-Origin': '*',
    });
    r.pipe(res);
  }).on('error', () => { res.writeHead(502); res.end(); });
}

function serveFile(req, res) {
  const pathname = req.url.split('?')[0];
  const base = path.join(ROOT, pathname);
  const candidates = [base, base + '.html', path.join(base, 'index.html')];

  for (const p of candidates) {
    try {
      if (fs.statSync(p).isFile()) {
        const ext = path.extname(p).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain; charset=utf-8' });
        res.end(fs.readFileSync(p));
        return;
      }
    } catch { /* not found, try next */ }
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
}

http.createServer((req, res) => {
  if (req.url.startsWith('/api/tts')) return proxyTTS(req, res);
  serveFile(req, res);
}).listen(PORT, () => {
  console.log(`Dev server → http://localhost:${PORT}`);
});
