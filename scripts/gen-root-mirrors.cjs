// ══════════════════════════════════════════════════════════════════════════
// gen-root-mirrors.cjs — regenerate the <lang>/ ROOT pages (index, about,
// contact, quiz, privacy, terms, search) from the clean English root pages,
// translating body text through js/langs/lang-<lang>.js.
//
// Replaces the buggy root output of gen-<lang>-site.cjs, which cloned from the
// German mirror and applied an ORDER-SENSITIVE word-replacement array that left
// partial German (e.g. "Lernende" → "Họcde"). Sourcing from English + full-node
// dictionary lookup avoids all partial-word corruption. Root pages are 100%
// covered by the 626-key dictionaries (verified 0 gaps).
// ══════════════════════════════════════════════════════════════════════════
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const LANGS = process.argv.slice(2).length ? process.argv.slice(2) : ['vi'];
const FLAG = { de: '🇩🇪 DE', es: '🇪🇸 ES', fr: '🇫🇷 FR', vi: '🇻🇳 VI', th: '🇹🇭 TH', id: '🇮🇩 ID' };
const PAGES = ['index', 'about', 'contact', 'quiz', 'privacy', 'terms', 'search'];

function loadDict(lang) {
  const src = fs.readFileSync(path.join(ROOT, 'js/langs/lang-' + lang + '.js'), 'utf8');
  let captured = null;
  const lm = { register: (c, d) => { captured = d; } };
  vm.runInNewContext(src, { window: { LangManager: lm }, LangManager: lm });
  if (!captured) throw new Error('no dict for ' + lang);
  return captured;
}

const DEC = { '&amp;': '&', '&#39;': "'", '&quot;': '"', '&lt;': '<', '&gt;': '>', '&nbsp;': ' ' };
const decode = s => s.replace(/&amp;|&#39;|&quot;|&lt;|&gt;|&nbsp;/g, m => DEC[m]);
const encodeText = s => s.replace(/&(?![a-zA-Z#][a-zA-Z0-9]*;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function translate(html, dict) {
  const guards = [];
  html = html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, m => { guards.push(m); return `@@GUARD${guards.length - 1}GUARD@@`; });
  html = html.replace(/>([^<>]+)</g, (m, seg) => {
    const norm = decode(seg.replace(/\s+/g, ' ').trim());
    if (!norm || dict[norm] === undefined) return m;
    const lead = seg.match(/^\s*/)[0], trail = seg.match(/\s*$/)[0];
    return '>' + lead + encodeText(dict[norm]) + trail + '<';
  });
  html = html.replace(/placeholder="([^"]+)"/g, (m, val) => {
    const norm = decode(val.replace(/\s+/g, ' ').trim());
    return dict[norm] === undefined ? m : 'placeholder="' + dict[norm].replace(/"/g, '&quot;') + '"';
  });
  html = html.replace(/@@GUARD(\d+)GUARD@@/g, (m, i) => guards[+i]);
  return html;
}

let total = 0;
for (const lang of LANGS) {
  const dict = loadDict(lang);
  for (const page of PAGES) {
    const enFile = path.join(ROOT, page + '.html');
    const outFile = path.join(ROOT, lang, page + '.html');
    if (!fs.existsSync(enFile) || !fs.existsSync(outFile)) continue;

    let out = fs.readFileSync(enFile, 'utf8')
      .replace(/lang="en"/, `lang="${lang}"`)
      // section links → ../<section>/<lang>/...
      .replace(/(href|src)="(learn|culture|travel|news)\//g, `$1="../$2/${lang}/`)
      .replace(/(href|src)="(css|js)\//g, `$1="../$2/`)
      // load the language pack after lang-core.js
      .replace(/(<script src="\.\.\/js\/lang-core\.js"><\/script>)/, `$1\n<script src="../js/langs/lang-${lang}.js"></script>`);

    // canonical + og:url → /<lang>/<page>
    const enCanon = 'https://freekoreanschool.com/' + (page === 'index' ? '' : page);
    const viCanon = 'https://freekoreanschool.com/' + lang + '/' + (page === 'index' ? '' : page);
    out = out
      .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${viCanon}$2`)
      .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${viCanon}$2`);

    // translate body + set flag
    out = translate(out, dict).replace('🇺🇸 EN', FLAG[lang]);

    fs.writeFileSync(outFile, out, 'utf8');
    total++;
    console.log(`✓ ${lang}/${page}.html`);
  }
}
console.log(`\nDone. ${total} root pages regenerated.`);
