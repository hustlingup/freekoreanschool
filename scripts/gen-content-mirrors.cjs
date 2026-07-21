// ══════════════════════════════════════════════════════════════════════════
// gen-content-mirrors.cjs — regenerate culture/<lang>/, travel/<lang>/,
// news/<lang>/ pages from the clean ENGLISH sources.
//
// Fixes the systemic Spanish-corruption: gen-<lang>-site.cjs cloned these from
// culture/de/ (etc.), which were themselves untranslated Spanish. This script
// sources from the clean English pages, translates the CHROME through
// js/langs/lang-<lang>.js, and fixes all depth-2 paths + canonical + flag.
//
// PHASE 1 (this script): body PROSE is left in English — a clean, consistent
// scaffold with zero wrong-language (Spanish/German) content. PHASE 2: the prose
// is translated per page by editing the generated files directly.
//
// Only de/fr/vi/th/id are (re)generated. es/ja/zh-tw are already fully localized
// and must NOT be touched.
// ══════════════════════════════════════════════════════════════════════════
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const LANGS = process.argv.slice(2).length ? process.argv.slice(2) : ['de', 'fr', 'vi', 'th', 'id'];
const FLAG = { de: '🇩🇪 DE', es: '🇪🇸 ES', fr: '🇫🇷 FR', vi: '🇻🇳 VI', th: '🇹🇭 TH', id: '🇮🇩 ID' };
const SECTIONS = ['culture', 'travel'];

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

function fixPaths(html, lang) {
  return html
    .replace(/(href|src)="\.\.\/(learn|culture|travel|news)\//g, `$1="../../$2/${lang}/`)
    .replace(/(href|src)="\.\.\/(css|js)\//g, `$1="../../$2/`)
    .replace(/(href|src)="\.\.\/(index|about|contact|quiz|privacy|terms|search)\.html"/g, `$1="../../${lang}/$2.html"`);
}

let total = 0;
for (const lang of LANGS) {
  const dict = loadDict(lang);
  for (const section of SECTIONS) {
    const srcDir = path.join(ROOT, section);
    const outDir = path.join(ROOT, section, lang);
    if (!fs.existsSync(outDir)) continue;
    for (const file of fs.readdirSync(srcDir)) {
      if (!file.endsWith('.html')) continue;                       // English source pages only
      const page = file.replace(/\.html$/, '');
      let out = fs.readFileSync(path.join(srcDir, file), 'utf8');

      out = out.replace(/lang="en"/, `lang="${lang}"`);
      out = fixPaths(out, lang);
      out = out.replace(/(<script src="\.\.\/\.\.\/js\/lang-core\.js"><\/script>)/,
        `$1\n<script src="../../js/langs/lang-${lang}.js"></script>`);

      // canonical + og:url → /<section>/<lang>/<page>
      const enUrl = `https://freekoreanschool.com/${section}/${page}`;
      const langUrl = `https://freekoreanschool.com/${section}/${lang}/${page}`;
      out = out
        .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${langUrl}$2`)
        .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${langUrl}$2`);

      // translate chrome/labels via dict; set flag. (prose stays English — Phase 1)
      out = translate(out, dict).replace('🇺🇸 EN', FLAG[lang]);

      fs.writeFileSync(path.join(outDir, file), out, 'utf8');
      total++;
    }
    console.log(`✓ ${section}/${lang}/ (${fs.readdirSync(srcDir).filter(f => f.endsWith('.html')).length} pages)`);
  }
}
console.log(`\nDone. ${total} content pages regenerated (Phase 1 scaffold).`);
