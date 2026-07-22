// ══════════════════════════════════════════════════════════════════════════
// regen-es-stale-culture.cjs — Phase 3 scaffold for Spanish culture pages.
//
// The 12 pages listed in STALE below are old standalone Spanish stubs written
// BEFORE the English culture pages were expanded into full deep-dive articles.
// This script rebuilds ONLY those 12 files from the current English source,
// exactly like scripts/gen-content-mirrors.cjs did for de/fr/vi/th/id:
// chrome translated via js/langs/lang-es.js, depth-2 paths, canonical/og:url,
// lang attribute, language flag — article PROSE left in English for the
// Phase-3 translation passes (see translation/GUIDE2.md).
//
// Safety:
//   • touches NOTHING outside the 12 whitelisted culture/es/ files — the
//     fully-translated es pages (kbeauty, kchicken, mandu, index, all of
//     travel/es/, news/es/) are never read or written
//   • before overwriting, each current file is backed up once to
//     translation/_old-es/<page>.html (kpop especially holds ~half a page of
//     good Spanish worth mining during retranslation); an existing backup is
//     never overwritten, so re-running is safe
//   • run ONCE, BEFORE translation starts — like every generator, running it
//     after Phase-3 edits would wipe them
//
//   node scripts/regen-es-stale-culture.cjs            → regenerate in place
//   node scripts/regen-es-stale-culture.cjs --dry <dir>→ write output to <dir>
// ══════════════════════════════════════════════════════════════════════════
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const LANG = 'es';
const FLAG = '🇪🇸 ES';
const STALE = ['kpop', 'kdrama', 'kmovie', 'kfood', 'kfashion', 'kbbq', 'kimchi',
  'ramyeon', 'kgaming', 'ksports', 'koreanthing'];

const dry = process.argv[2] === '--dry' ? process.argv[3] : null;
if (process.argv[2] === '--dry' && !dry) { console.error('--dry needs an output dir'); process.exit(1); }

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

const dict = loadDict(LANG);
const backupDir = path.join(ROOT, 'translation', '_old-es');
if (!dry) fs.mkdirSync(backupDir, { recursive: true });
const outDir = dry ? dry : path.join(ROOT, 'culture', LANG);
if (dry) fs.mkdirSync(outDir, { recursive: true });

for (const page of STALE) {
  const file = page + '.html';
  const cur = path.join(ROOT, 'culture', LANG, file);

  if (!dry && fs.existsSync(cur)) {
    const bak = path.join(backupDir, file);
    if (!fs.existsSync(bak)) fs.copyFileSync(cur, bak);
  }

  let out = fs.readFileSync(path.join(ROOT, 'culture', file), 'utf8');
  out = out.replace(/lang="en"/, `lang="${LANG}"`);
  out = fixPaths(out, LANG);
  out = out.replace(/(<script src="\.\.\/\.\.\/js\/lang-core\.js"><\/script>)/,
    `$1\n<script src="../../js/langs/lang-${LANG}.js"></script>`);

  const langUrl = `https://freekoreanschool.com/culture/${LANG}/${page}`;
  out = out
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${langUrl}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${langUrl}$2`);

  out = translate(out, dict).replace('🇺🇸 EN', FLAG);
  fs.writeFileSync(path.join(outDir, file), out, 'utf8');
  console.log(`✓ ${dry ? '(dry) ' : ''}culture/es/${file}${dry ? '' : '  (backup → translation/_old-es/)'}`);
}
console.log(`\nDone. ${STALE.length} pages scaffolded. Next: Phase-3 Spanish translation per translation/GUIDE2.md.`);
