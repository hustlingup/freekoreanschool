// ══════════════════════════════════════════════════════════════════════════
// gen-content-mirrors.cjs — regenerate culture/<lang>/ and travel/<lang>/
// pages from the clean ENGLISH sources.
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
// ☠️  THIS IS THE MOST DANGEROUS SCRIPT IN THE REPO. translation/GUIDE.md §2
//     and GUIDE2.md §4.2 both say: NEVER run it, with any argument, once Phase-2
//     translation has begun — it rebuilds from English and wipes every
//     hand-translated page in the section. It therefore now REFUSES to write
//     into a <section>/<lang>/ directory that already contains .html files
//     unless --force is passed. All 8 live locales are populated, so the only
//     invocation that does anything without --force is a brand-new locale
//     (run exactly once, BEFORE any translation of that language begins).
//     Use --out <dir> to generate somewhere harmless.
//
// Locales come from scripts/_locales.cjs — no hardcoded list, no flag map.
// The default set is the LIVE locales; a `planned` locale is only ever
// generated when named explicitly on the command line.
//
//   node scripts/gen-content-mirrors.cjs --out /tmp/probe    # harmless
//   node scripts/gen-content-mirrors.cjs pt-br               # scaffold, once
//   node scripts/gen-content-mirrors.cjs de --force          # DESTRUCTIVE
// ══════════════════════════════════════════════════════════════════════════
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const REG = require('./_locales.cjs');

const ROOT = path.join(__dirname, '..');
const SECTIONS = ['culture', 'travel'];

/* ── CLI ────────────────────────────────────────────────────────────────── */
function parseArgs(argv) {
  const codes = [];
  let out = null, force = false;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--force') { force = true; continue; }
    if (a === '--out') { out = argv[++i]; continue; }
    if (a.startsWith('--out=')) { out = a.slice(6); continue; }
    if (a.startsWith('--')) { console.error(`unknown option: ${a}`); process.exit(2); }
    codes.push(a.toLowerCase());
  }
  return { codes, out: out == null ? ROOT : path.resolve(out), force };
}
const ARGS = parseArgs(process.argv.slice(2));
const OUT_ROOT = ARGS.out;

/* Default = live locales only. Historically the default was the hardcoded
   ['de','fr','vi','th','id'] — a list that silently excluded es/ja/zh-tw
   because they were already translated. The guard below is a better
   expression of that intent: it protects EVERY populated locale, including
   the three the old list forgot to mention and any locale added later. */
const TARGETS = (ARGS.codes.length ? ARGS.codes : REG.liveDirs()).map(code => {
  const loc = REG.get(code);
  if (!loc) { console.error(`unknown locale: ${code} (not in scripts/_locales.cjs)`); process.exit(2); }
  if (loc.code === 'en') { console.error(`refusing to generate a mirror for 'en' — it is the source`); process.exit(2); }
  return loc;
});

/* ── Dictionary ─────────────────────────────────────────────────────────── */
function loadDict(lang) {
  const file = path.join(ROOT, 'js/langs/lang-' + lang + '.js');
  if (!fs.existsSync(file)) {
    throw new Error(
      `no UI language pack for "${lang}": js/langs/lang-${lang}.js does not exist.\n` +
      `  A locale cannot be scaffolded before its chrome dict exists — see\n` +
      `  docs/i18n-expansion/00-plan.md Stage 2 (UI chrome pack), then verify\n` +
      `  with: node scripts/ui-lang.cjs --status`);
  }
  const src = fs.readFileSync(file, 'utf8');
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
    .replace(/(href|src)="\.\.\/(learn|culture|travel)\//g, `$1="../../$2/${lang}/`)
    .replace(/(href|src)="\.\.\/(css|js)\//g, `$1="../../$2/`)
    .replace(/(href|src)="\.\.\/(index|about|contact|quiz|privacy|terms|search)\.html"/g, `$1="../../${lang}/$2.html"`);
}

/* ── Registry-driven page bits ──────────────────────────────────────────── */
/* Language-toggle button label. Historically a hardcoded map that knew only 6
   locales, so a 7th generated with the US flag still on the button. */
const flagLabel = loc => `${loc.flag} ${loc.code.toUpperCase()}`;

/* <html lang> from the registry (htmlLang, not code); dir="rtl" for `ar`. */
function setHtmlLang(html, loc) {
  let out = html.replace(/lang="en"/, `lang="${loc.htmlLang}"`);
  if (loc.writing === 'rtl') {
    out = out.replace(/<html\b([^>]*)>/i, (m, attrs) => (/\bdir\s*=/.test(attrs) ? m : `<html${attrs} dir="rtl">`));
  }
  return out;
}

/* Per-locale webfont <link>. NEVER emitted for a locale whose registry `font`
   is null — the CJK/Arabic subsets are heavy and would regress LCP on all ~400
   existing pages. Marker-guarded so re-running never duplicates the tag.
   culture/travel pages carry no Google-Fonts <link> of their own (they inherit
   the @import inside css/style.css), so the stylesheet link is the anchor. */
const FONT_START = '<!-- ks:locale-font -->';
const FONT_END = '<!-- /ks:locale-font -->';
const RX = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function injectLocaleFont(html, loc) {
  html = html.replace(new RegExp(`[ \\t]*${RX(FONT_START)}[\\s\\S]*?${RX(FONT_END)}[ \\t]*\\r?\\n?`, 'g'), '');
  if (!loc.font) return html;
  const block = `  ${FONT_START}\n  <link href="${loc.font.href}" rel="stylesheet">\n  ${FONT_END}\n`;
  const gfonts = /^[ \t]*<link [^>]*href="https:\/\/fonts\.googleapis\.com\/css2[^>]*>[ \t]*\r?\n/im;
  if (gfonts.test(html)) return html.replace(gfonts, m => m + block);
  const css = /^[ \t]*<link rel="stylesheet" href="[^"]*style\.css"[^>]*\/?>[ \t]*\r?\n/im;
  if (css.test(html)) return html.replace(css, m => block + m);
  return html.replace(/^([ \t]*<\/head>)/im, block + '$1');
}

/* ── The guard ──────────────────────────────────────────────────────────── */
function alreadyPopulated(dir) {
  return fs.existsSync(dir) && fs.readdirSync(dir).some(f => f.endsWith('.html'));
}

/* ── Run ────────────────────────────────────────────────────────────────── */
let total = 0, refused = 0;

for (const loc of TARGETS) {
  const lang = loc.code;
  let dict = null;

  for (const section of SECTIONS) {
    const srcDir = path.join(ROOT, section);
    const outDir = path.join(OUT_ROOT, section, lang);
    if (!fs.existsSync(srcDir)) continue;

    if (alreadyPopulated(outDir) && !ARGS.force) {
      console.error(
        `✗ ${section}/${lang}: REFUSED — ${outDir} already contains .html pages.\n` +
        `    This script rebuilds them from English and WIPES translated prose\n` +
        `    (translation/GUIDE2.md §4.2). Use --out <dir> to generate elsewhere,\n` +
        `    or --force if you really mean to discard that locale's translations.`);
      refused++;
      continue;
    }

    if (!dict) dict = loadDict(lang);
    fs.mkdirSync(outDir, { recursive: true });

    let n = 0;
    for (const file of fs.readdirSync(srcDir)) {
      if (!file.endsWith('.html')) continue;                       // English source pages only
      const page = file.replace(/\.html$/, '');
      let out = fs.readFileSync(path.join(srcDir, file), 'utf8');

      out = setHtmlLang(out, loc);
      out = fixPaths(out, lang);
      out = out.replace(/(<script src="\.\.\/\.\.\/js\/lang-core\.js"><\/script>)/,
        `$1\n<script src="../../js/langs/lang-${lang}.js"></script>`);

      // canonical + og:url → /<section>/<lang>/<page>
      const langUrl = `https://freekoreanschool.com/${section}/${lang}/${page}`;
      out = out
        .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${langUrl}$2`)
        .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${langUrl}$2`);

      // translate chrome/labels via dict; set flag. (prose stays English — Phase 1)
      out = translate(out, dict).replace('🇺🇸 EN', flagLabel(loc));
      out = injectLocaleFont(out, loc);

      fs.writeFileSync(path.join(outDir, file), out, 'utf8');
      total++; n++;
    }
    console.log(`✓ ${section}/${lang}/ (${n} pages)`);
  }
}

console.log(`\nDone. ${total} content pages regenerated (Phase 1 scaffold)${OUT_ROOT === ROOT ? '' : ' into ' + OUT_ROOT}.`);
if (refused) {
  console.error(`${refused} section/locale pair(s) refused (already populated; pass --force to override).`);
  process.exit(1);
}
