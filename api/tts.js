export default async function handler(req, res) {
  const { text, speed } = req.query;
  if (!text) return res.status(400).end();

  const url = 'https://translate.google.com/translate_tts?ie=UTF-8' +
    '&q=' + encodeURIComponent(text) +
    '&tl=ko&client=tw-ob' +
    (speed && parseFloat(speed) < 1 ? '&ttsspeed=' + speed : '');

  try {
    const r = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Referer': 'https://translate.google.com/',
        'Accept': 'audio/*,*/*;q=0.9',
      }
    });
    if (!r.ok) return res.status(502).end();
    const buf = Buffer.from(await r.arrayBuffer());
    res.setHeader('Content-Type', r.headers.get('content-type') || 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.end(buf);
  } catch {
    res.status(502).end();
  }
}
