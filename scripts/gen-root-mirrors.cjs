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
//
// ☠️  THIS SCRIPT REBUILDS PAGES FROM ENGLISH AND WIPES HAND-TRANSLATED PROSE.
//     translation/GUIDE.md §2 and GUIDE2.md §4 both name it as the single most
//     dangerous thing in the repo. It therefore now REFUSES to write into a
//     locale directory that already contains .html files unless --force is
//     passed. Use --out <dir> to generate somewhere harmless instead.
//
// Locales come from scripts/_locales.cjs — no hardcoded list, no flag map.
// The default set is the LIVE locales; a `planned` locale is only ever
// generated when named explicitly on the command line.
//
//   node scripts/gen-root-mirrors.cjs --out /tmp/probe      # all live, harmless
//   node scripts/gen-root-mirrors.cjs pt-br                 # scaffold a new locale
//   node scripts/gen-root-mirrors.cjs de --force            # DESTRUCTIVE
// ══════════════════════════════════════════════════════════════════════════
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const REG = require('./_locales.cjs');

const ROOT = path.join(__dirname, '..');
const PAGES = ['index', 'about', 'contact', 'quiz', 'privacy', 'terms', 'search'];

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

/* Default = live locales only. A `planned` locale is generated only when it is
   named on the command line — that is what keeps unfinished locales out of the
   working tree and out of the sitemap. */
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

/* ── Registry-driven page bits ──────────────────────────────────────────── */
/* Language-toggle button label. Historically a hardcoded map that knew only 6
   locales, so a 7th generated with the US flag still on the button. */
const flagLabel = loc => `${loc.flag} ${loc.code.toUpperCase()}`;

/* <html lang> comes from the registry (htmlLang, not code — they diverge for
   locales such as pt-br → pt-BR). dir="rtl" is emitted for the one rtl locale. */
function setHtmlLang(html, loc) {
  let out = html.replace(/lang="en"/, `lang="${loc.htmlLang}"`);
  if (loc.writing === 'rtl') {
    out = out.replace(/<html\b([^>]*)>/i, (m, attrs) => (/\bdir\s*=/.test(attrs) ? m : `<html${attrs} dir="rtl">`));
  }
  return out;
}

/* Per-locale webfont <link>. NEVER emitted for a locale whose registry `font`
   is null — the CJK/Arabic subsets are heavy and would regress LCP on all ~400
   existing pages. Marker-guarded so re-running never duplicates the tag. */
const FONT_START = '<!-- ks:locale-font -->';
const FONT_END = '<!-- /ks:locale-font -->';
const RX = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function injectLocaleFont(html, loc) {
  html = html.replace(new RegExp(`[ \\t]*${RX(FONT_START)}[\\s\\S]*?${RX(FONT_END)}[ \\t]*\\r?\\n?`, 'g'), '');
  if (!loc.font) return html;
  const block = `  ${FONT_START}\n  <link href="${loc.font.href}" rel="stylesheet">\n  ${FONT_END}\n`;
  const gfonts = /^[ \t]*<link [^>]*href="https:\/\/fonts\.googleapis\.com\/css2[^>]*>[ \t]*\r?\n/im;
  if (gfonts.test(html)) return html.replace(gfonts, m => m + block);
  const css = /^[ \t]*<link rel="stylesheet" href="[^"]*style\.css"[^>]*>[ \t]*\r?\n/im;
  if (css.test(html)) return html.replace(css, m => block + m);
  return html.replace(/^([ \t]*<\/head>)/im, block + '$1');
}

/* ── The guard ──────────────────────────────────────────────────────────── */
/* This is a from-English rebuild. If the target directory already holds pages
   they are almost certainly hand-translated, and this run would destroy them. */
function alreadyPopulated(dir) {
  return fs.existsSync(dir) && fs.readdirSync(dir).some(f => f.endsWith('.html'));
}

/* ── Run ────────────────────────────────────────────────────────────────── */
let total = 0, refused = 0;

for (const loc of TARGETS) {
  const lang = loc.code;
  const outDir = path.join(OUT_ROOT, lang);

  if (alreadyPopulated(outDir) && !ARGS.force) {
    console.error(
      `✗ ${lang}: REFUSED — ${outDir} already contains .html pages.\n` +
      `    This script rebuilds them from English and WIPES translated prose\n` +
      `    (translation/GUIDE.md §2). Use --out <dir> to generate elsewhere, or\n` +
      `    --force if you really mean to discard that locale's translations.`);
    refused++;
    continue;
  }

  const dict = loadDict(lang);
  fs.mkdirSync(outDir, { recursive: true });

  for (const page of PAGES) {
    const enFile = path.join(ROOT, page + '.html');
    const outFile = path.join(outDir, page + '.html');
    if (!fs.existsSync(enFile)) continue;

    let out = setHtmlLang(fs.readFileSync(enFile, 'utf8'), loc)
      // section links → ../<section>/<lang>/...
      .replace(/(href|src)="(learn|culture|travel)\//g, `$1="../$2/${lang}/`)
      .replace(/(href|src)="(css|js)\//g, `$1="../$2/`)
      // load the language pack after lang-core.js
      .replace(/(<script src="\.\.\/js\/lang-core\.js"><\/script>)/, `$1\n<script src="../js/langs/lang-${lang}.js"></script>`);

    // canonical + og:url → /<lang>/<page>
    const langCanon = 'https://freekoreanschool.com/' + lang + '/' + (page === 'index' ? '' : page);
    out = out
      .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${langCanon}$2`)
      .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${langCanon}$2`);

    // translate body + set flag
    out = translate(out, dict).replace('🇺🇸 EN', flagLabel(loc));
    out = injectLocaleFont(out, loc);

    fs.writeFileSync(outFile, out, 'utf8');
    total++;
    console.log(`✓ ${lang}/${page}.html`);
  }
}

console.log(`\nDone. ${total} root pages regenerated${OUT_ROOT === ROOT ? '' : ' into ' + OUT_ROOT}.`);
if (refused) {
  console.error(`${refused} locale(s) refused (already populated; pass --force to override).`);
  process.exit(1);
}
