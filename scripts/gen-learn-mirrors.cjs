// ══════════════════════════════════════════════════════════════════════════
// gen-learn-mirrors.cjs — regenerate learn/<lang>/ mirrors.
//
// Replaces the old per-language gen-learn-de/es/fr/vi/th.cjs scripts, which
// sourced their chrome from the CORRUPTED learn/de/vocabulary.html (mislabeled
// Spanish content + a duplicated <!DOCTYPE>/<head>/<body> shell). That bug left
// every de/es/fr/vi/th learn page showing Spanish nav/sidebar/footer and two
// nested document shells.
//
// TWO STRATEGIES:
//
//   SALVAGE (default) — for the five locales that already have correctly
//   translated content but corrupted chrome (de/es/fr/vi/th):
//   • The <head> and <main> of the 15 content pages are already correctly
//     translated per language (German head + German lesson body, etc.). Only
//     the CHROME (header/sidebar/footer, outside <main>) was Spanish +
//     duplicated. → We SALVAGE the first <head>, the <main>…</main>, and the
//     trailing <script> block from each existing file, and REBUILD the chrome
//     by translating the clean English chrome through js/langs/lang-<lang>.js
//     (the same dictionary LangManager uses at runtime).
//   • The 3 app pages (vocabulary, flashcard, vocabulary-browser) had a
//     Spanish <head> AND a Spanish body, so nothing was salvageable there
//     either — they are regenerated wholesale from clean English, same as
//     --fresh below.
//
//   FRESH (--fresh <locale>) — for a brand-new locale with nothing to
//   salvage. All 18 pages are generated wholesale from clean English, exactly
//   the path SALVAGE already uses for its 3 app pages: translate the chrome
//   AND body through the locale's dictionary (lesson prose stays English —
//   Phase 1 scaffold, same as gen-content-mirrors.cjs — until Stage 5
//   translates it page by page). Refuses to touch a `learn/<code>/` that
//   already has any file, unless --force.
//
// Locales come from scripts/_locales.cjs — no hardcoded FLAG map. Which
// locales are SALVAGE candidates is not a registry fact (it is which mirrors
// got corrupted by the old per-language generators, a one-time historical
// fact), so that list stays an explicit constant; only its *data* (flag,
// htmlLang, font, writing) is read from the registry rather than a local map.
//
//   node scripts/gen-learn-mirrors.cjs                    # salvage the 5, in place — DESTRUCTIVE
//   node scripts/gen-learn-mirrors.cjs --out <dir>         # salvage the 5, harmless
//   node scripts/gen-learn-mirrors.cjs --fresh pt-br --out <dir>   # scaffold a new locale, harmless
//   node scripts/gen-learn-mirrors.cjs --fresh pt-br               # scaffold a new locale — DESTRUCTIVE if already populated (refuses without --force)
// ══════════════════════════════════════════════════════════════════════════
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const REG = require('./_locales.cjs');

const ROOT = path.join(__dirname, '..');
const LEARN = path.join(ROOT, 'learn');

/* Historical fact, not a registry fact: these five learn/<lang>/ mirrors were
   corrupted (Spanish chrome + duplicated shell) and are what SALVAGE exists to
   fix. Adding a locale to the registry does not make it a salvage candidate —
   a brand-new locale has nothing to salvage and must use --fresh instead. */
const DEFAULT_SALVAGE_LANGS = ['de', 'es', 'fr', 'vi', 'th'];

/* Per-locale flag label ("🇩🇪 DE"), same format gen-root-mirrors.cjs and
   gen-content-mirrors.cjs use — sourced from the registry, not a local map. */
const flagLabel = loc => `${loc.flag} ${loc.code.toUpperCase()}`;

// 15 salvage pages (head + main + scripts kept; chrome rebuilt)
const SALVAGE_PAGES = [
  'hangul', 'letter-writing', 'typing', 'syllable-blocks', 'pronunciation', 'grammar', 'nouns', 'pronouns',
  'shopping', 'emotions', 'speech-levels',
  'dialogues', 'business-korean', 'classical-korean', 'writing-essays',
];
// 3 app pages (regenerated wholesale from clean English)
const APP_PAGES = ['vocabulary', 'flashcard', 'vocabulary-browser'];
// All 18 — the set --fresh regenerates wholesale, since a new locale has no
// salvageable content anywhere.
const FRESH_PAGES = SALVAGE_PAGES.concat(APP_PAGES);

/* ── CLI ────────────────────────────────────────────────────────────────── */
function parseArgs(argv) {
  const codes = [];
  let out = null, force = false, fresh = null;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--force') { force = true; continue; }
    if (a === '--fresh') { fresh = argv[++i]; continue; }
    if (a.startsWith('--fresh=')) { fresh = a.slice(8); continue; }
    if (a === '--out') { out = argv[++i]; continue; }
    if (a.startsWith('--out=')) { out = a.slice(6); continue; }
    if (a.startsWith('--')) { console.error(`unknown option: ${a}`); process.exit(2); }
    codes.push(a.toLowerCase());
  }
  return { codes, out: out == null ? ROOT : path.resolve(out), force, fresh: fresh ? fresh.toLowerCase() : null };
}
const ARGS = parseArgs(process.argv.slice(2));
const OUT_ROOT = ARGS.out;
const OUT_LEARN = path.join(OUT_ROOT, 'learn');

// ── Dictionary loader (sandbox the IIFE, capture the registered object) ──────
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
  const lm = { register: (code, dict) => { captured = dict; } };
  vm.runInNewContext(src, { window: { LangManager: lm }, LangManager: lm });
  if (!captured) throw new Error('no dict captured for ' + lang);
  return captured;
}

// ── HTML-entity decode (for dict lookup) / encode (for writing text back) ────
const DEC = { '&amp;': '&', '&#39;': "'", '&quot;': '"', '&lt;': '<', '&gt;': '>', '&nbsp;': ' ' };
function decode(s) { return s.replace(/&amp;|&#39;|&quot;|&lt;|&gt;|&nbsp;/g, m => DEC[m]); }
function encodeText(s) { return s.replace(/&(?![a-zA-Z#][a-zA-Z0-9]*;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

// ── Translate text nodes + placeholders exactly like LangManager does ────────
function translate(html, dict) {
  // protect <script>/<style> blocks from text-node substitution (inline JS
  // contains ">" from arrow functions etc.)
  const guards = [];
  html = html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, m => {
    guards.push(m);
    return `@@GUARD${guards.length - 1}GUARD@@`;
  });
  // text nodes: >…<
  html = html.replace(/>([^<>]+)</g, (m, seg) => {
    const norm = decode(seg.replace(/\s+/g, ' ').trim());
    if (!norm || dict[norm] === undefined) return m;
    // preserve leading/trailing whitespace around the segment
    const lead = seg.match(/^\s*/)[0];
    const trail = seg.match(/\s*$/)[0];
    return '>' + lead + encodeText(dict[norm]) + trail + '<';
  });
  // placeholders
  html = html.replace(/placeholder="([^"]+)"/g, (m, val) => {
    const norm = decode(val.replace(/\s+/g, ' ').trim());
    if (dict[norm] === undefined) return m;
    return 'placeholder="' + dict[norm].replace(/"/g, '&quot;') + '"';
  });
  // restore guarded script/style blocks
  html = html.replace(/@@GUARD(\d+)GUARD@@/g, (m, i) => guards[+i]);
  return html;
}

// ── Path fixes: clean-English source (learn/*.html, depth 1) → learn/<lang>/ ──
function fixChromePaths(html, lang) {
  return html
    .replace(/href="\.\.\/index\.html"/g, `href="../../${lang}/index.html"`)
    .replace(/href="\.\.\/culture\/index\.html"/g, `href="../../culture/${lang}/index.html"`)
    .replace(/href="\.\.\/travel\/index\.html"/g, `href="../../travel/${lang}/index.html"`)
    .replace(/href="\.\.\/quiz\.html"/g, `href="../../${lang}/quiz.html"`)
    .replace(/href="\.\.\/about\.html"/g, `href="../../${lang}/about.html"`)
    .replace(/href="\.\.\/contact\.html"/g, `href="../../${lang}/contact.html"`)
    .replace(/href="\.\.\/privacy\.html"/g, `href="../../${lang}/privacy.html"`)
    .replace(/href="\.\.\/terms\.html"/g, `href="../../${lang}/terms.html"`)
    .replace(/href="\.\.\/css\//g, 'href="../../css/')
    .replace(/src="\.\.\/js\//g, 'src="../../js/');
}

/* <html lang> from the registry (htmlLang, not code — they diverge for
   locales such as pt-br → pt-BR). dir="rtl" is emitted for the one rtl
   locale. Matches whatever lang value is currently on the tag, not just
   "en" — so it is a safe idempotent no-op on an already-correct salvaged
   head, and a real rewrite on a fresh English source. */
function setHtmlLang(html, loc) {
  let out = html.replace(/(<html\b[^>]*\blang=")[^"]*(")/i, `$1${loc.htmlLang}$2`);
  if (loc.writing === 'rtl') {
    out = out.replace(/<html\b([^>]*)>/i, (m, attrs) => (/\bdir\s*=/.test(attrs) ? m : `<html${attrs} dir="rtl">`));
  }
  return out;
}

/* Per-locale webfont <link>. NEVER emitted for a locale whose registry `font`
   is null — the CJK/Arabic subsets are heavy and would regress LCP. Marker-
   guarded so re-running never duplicates the tag (pattern copied from
   fix-culture-travel-seo.cjs / gen-root-mirrors.cjs). */
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

// ── Build the shared chrome (beforeMain header/sidebar + footer) per lang ────
const enHangul = fs.readFileSync(path.join(LEARN, 'hangul.html'), 'utf8');
const EN_BEFORE = enHangul.slice(enHangul.indexOf('<body>') + '<body>'.length, enHangul.indexOf('<main'));
const EN_FOOTER = enHangul.slice(enHangul.indexOf('</main>') + '</main>'.length).replace(/<script[\s\S]*$/, '');

function buildChrome(lang, dict, loc) {
  let before = translate(fixChromePaths(EN_BEFORE, lang), dict).replace('🇺🇸 EN', flagLabel(loc));
  let footer = translate(fixChromePaths(EN_FOOTER, lang), dict).replace('🇺🇸 EN', flagLabel(loc));
  // strip all active markers — set per page later
  before = before
    .replace(/class="sidebar-link active"/g, 'class="sidebar-link"')
    .replace(/class="sidebar-accordion-btn active"/g, 'class="sidebar-accordion-btn"');
  return { before, footer };
}

// ── SALVAGE the correct head / main / scripts from an existing file ──────────
function salvage(html) {
  const headEnd = html.indexOf('<body>');
  const head = html.slice(0, headEnd).trimEnd();          // correct first <head>
  const mainStart = html.indexOf('<main');
  const mainEnd = html.indexOf('</main>') + '</main>'.length;
  const main = html.slice(mainStart, mainEnd);
  const scriptStart = html.indexOf('<script src="../../js/lang-core.js"');
  const bodyClose = html.indexOf('</body>', scriptStart);
  const scripts = html.slice(scriptStart, bodyClose).trimEnd();
  return { head, main, scripts };
}

/* --fresh must never clobber an already-populated locale. "any file", not
   just .html — a locale directory could hold anything hand-placed. */
function dirHasAnyFile(dir) {
  return fs.existsSync(dir) && fs.readdirSync(dir).length > 0;
}

// ── Regenerate ONE page wholesale from clean English. Used by --fresh for all
//    18 pages, and by SALVAGE mode for its 3 app pages (same strategy). ──────
function buildFreshPage(page, lang, loc, dict) {
  const enFile = path.join(LEARN, page + '.html');
  let out = fs.readFileSync(enFile, 'utf8');
  out = setHtmlLang(out, loc);
  out = fixChromePaths(out, lang);
  // load the language pack right after lang-core.js
  out = out.replace(
    /(<script src="\.\.\/js\/lang-core\.js"><\/script>)/,
    `$1\n<script src="../../js/langs/lang-${lang}.js"></script>`
  );
  // self-referential canonical + og:url → target language
  const langUrl = `https://freekoreanschool.com/learn/${lang}/${page}`;
  out = out
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${langUrl}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${langUrl}$2`);

  // per-language <title>/<meta description> for the 3 app pages, where they
  // exist (established locales). A locale with none yet keeps the English
  // metadata — Phase 1 scaffold, same as gen-content-mirrors.cjs; Stage 5
  // translates it page by page.
  if (APP_PAGES.includes(page)) {
    const meta = appMeta(lang, page);
    if (meta) {
      out = out.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
      const ogTitle = meta.title.replace(/\s*\|\s*한국어 학교\s*$/, '');
      out = out
        .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${ogTitle}$2`)
        .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${ogTitle}$2`);
      if (meta.desc) {
        out = out
          .replace(/(<meta name="description" content=")[^"]*(")/, `$1${meta.desc}$2`)
          .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${meta.desc}$2`)
          .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${meta.desc}$2`);
      }
    }
  }

  // translate the body chrome + labels, set the flag
  out = translate(out, dict).replace('🇺🇸 EN', flagLabel(loc));
  out = injectLocaleFont(out, loc);
  return out;
}

// ── Per-language <title>/<meta description> for the 3 app pages ──────────────
function appMeta(lang, page) {
  // es keeps its established Spanish metadata (harvested from the current file)
  if (lang === 'es') {
    const cur = fs.readFileSync(path.join(LEARN, 'es', page + '.html'), 'utf8');
    return {
      title: (cur.match(/<title>([^<]*)<\/title>/) || [])[1] || '',
      desc: (cur.match(/<meta name="description" content="([^"]*)"/) || [])[1] || null,
    };
  }
  const T = {
    vocabulary: {
      de: { title: 'Koreanisches Vokabular — 어휘 | 한국어 학교', desc: 'Lerne wichtiges koreanisches Vokabular in interaktiven Häppchen — Begrüßungen, Zahlen, Familie, Essen, Orte, Verben und mehr. Audio auf jeder Karte.' },
      fr: { title: 'Vocabulaire coréen — 어휘 | 한국어 학교', desc: 'Apprenez le vocabulaire coréen essentiel par petites étapes interactives — salutations, nombres, famille, nourriture, lieux, verbes et plus encore. Audio sur chaque carte.' },
      vi: { title: 'Từ vựng tiếng Hàn — 어휘 | 한국어 학교', desc: 'Học từ vựng tiếng Hàn thiết yếu qua từng bước tương tác ngắn gọn — chào hỏi, con số, gia đình, đồ ăn, địa điểm, động từ và hơn thế nữa. Có âm thanh trên mỗi thẻ.' },
      th: { title: 'คำศัพท์ภาษาเกาหลี — 어휘 | 한국어 학교', desc: 'เรียนคำศัพท์ภาษาเกาหลีที่จำเป็นทีละขั้นตอนแบบโต้ตอบ — การทักทาย ตัวเลข ครอบครัว อาหาร สถานที่ คำกริยา และอื่นๆ พร้อมเสียงในทุกบัตรคำ' },
    },
    flashcard: {
      de: { title: 'Lernkarten | 한국어 학교', desc: null },
      fr: { title: 'Fiches de révision | 한국어 학교', desc: null },
      vi: { title: 'Thẻ ghi nhớ | 한국어 학교', desc: null },
      th: { title: 'บัตรคำ | 한국어 학교', desc: null },
    },
    'vocabulary-browser': {
      de: { title: 'Vokabel-Browser — Zu Lernkarten hinzufügen | 한국어 학교', desc: 'Durchstöbere das gesamte koreanische Vokabular und wähle Wörter für dein Lernkartenset aus. Nach Kategorie filtern oder auf Koreanisch oder Englisch suchen.' },
      fr: { title: 'Explorateur de vocabulaire — Ajouter aux fiches | 한국어 학교', desc: 'Parcourez tout le vocabulaire coréen et choisissez des mots à ajouter à votre jeu de fiches. Filtrez par catégorie ou recherchez en coréen ou en anglais.' },
      vi: { title: 'Trình duyệt từ vựng — Thêm vào thẻ ghi nhớ | 한국어 학교', desc: 'Duyệt toàn bộ từ vựng tiếng Hàn và chọn từ để thêm vào bộ thẻ ghi nhớ của bạn. Lọc theo danh mục hoặc tìm kiếm bằng tiếng Hàn hoặc tiếng Anh.' },
      th: { title: 'เบราเซอร์คำศัพท์ — เพิ่มลงบัตรคำ | 한국어 학교', desc: 'เรียกดูคำศัพท์ภาษาเกาหลีทั้งหมดและเลือกคำเพื่อเพิ่มลงในชุดบัตรคำของคุณ กรองตามหมวดหมู่หรือค้นหาด้วยภาษาเกาหลีหรือภาษาอังกฤษ' },
    },
  };
  return (T[page] && T[page][lang]) || null;
}

// ── SALVAGE mode: rebuild chrome around salvaged head/main/scripts for the
//    known-corrupted locales; app pages are regenerated wholesale. ──────────
function runSalvage(langs) {
  let total = 0;
  for (const lang of langs) {
    const loc = REG.get(lang);
    if (!loc) throw new Error(`unknown locale: ${lang} (not in scripts/_locales.cjs)`);

    const dict = loadDict(lang);
    const chrome = buildChrome(lang, dict, loc);
    const srcDir = path.join(LEARN, lang);
    const outDir = path.join(OUT_LEARN, lang);
    fs.mkdirSync(outDir, { recursive: true });
    const homeLabel = dict['Home'] ? encodeText(dict['Home']) : null;

    // ── salvage pages ─────────────────────────────────────────────────────
    for (const page of SALVAGE_PAGES) {
      const file = path.join(srcDir, page + '.html');
      const orig = fs.readFileSync(file, 'utf8');
      const { head, main: mainRaw, scripts } = salvage(orig);

      // fix the English "Home" breadcrumb that survives in the 4 static-page mains
      let main = mainRaw;
      if (homeLabel) {
        main = main.replace(
          /(class="lesson-breadcrumb">\s*<a[^>]*>)\s*Home\s*(<\/a>)/,
          `$1${homeLabel}$2`
        );
      }

      // set the active sidebar link for this page
      let before = chrome.before.replace(
        new RegExp(`(href="${page}\\.html"\\s+class="sidebar-link)"`),
        '$1 active"'
      );

      let out = `${head}\n<body>\n${before}\n${main}\n\n${chrome.footer}\n${scripts}\n</body>\n</html>\n`;
      out = setHtmlLang(out, loc);
      out = injectLocaleFont(out, loc);
      fs.writeFileSync(path.join(outDir, page + '.html'), out, 'utf8');
      total++;
    }

    // ── app pages (regenerate wholesale from clean English) ────────────────
    for (const page of APP_PAGES) {
      const out = buildFreshPage(page, lang, loc, dict);
      fs.writeFileSync(path.join(outDir, page + '.html'), out, 'utf8');
      total++;
    }

    console.log(`✓ ${lang}: regenerated ${SALVAGE_PAGES.length + APP_PAGES.length} learn/${lang}/ pages`);
  }
  console.log(`\nDone. ${total} files regenerated across ${langs.length} language(s)${OUT_ROOT === ROOT ? '' : ' into ' + OUT_LEARN}.`);
}

// ── FRESH mode: no salvageable content exists — regenerate all 18 pages
//    wholesale from clean English. Refuses on an already-populated locale. ──
function runFresh(code) {
  const loc = REG.get(code);
  if (!loc) throw new Error(`unknown locale: ${code} (not in scripts/_locales.cjs)`);
  if (loc.code === 'en') throw new Error(`refusing to generate a mirror for 'en' — it is the source`);

  const outDir = path.join(OUT_LEARN, code);
  if (dirHasAnyFile(outDir) && !ARGS.force) {
    console.error(
      `✗ ${code}: REFUSED — ${outDir} already contains files.\n` +
      `    --fresh rebuilds every learn/${code}/ page wholesale from English and\n` +
      `    would overwrite anything already there. Use --out <dir> to generate\n` +
      `    elsewhere, or --force if you really mean to overwrite it.`);
    process.exitCode = 1;
    return;
  }

  const dict = loadDict(code);
  fs.mkdirSync(outDir, { recursive: true });

  let n = 0;
  for (const page of FRESH_PAGES) {
    const out = buildFreshPage(page, code, loc, dict);
    fs.writeFileSync(path.join(outDir, page + '.html'), out, 'utf8');
    n++;
  }
  console.log(`✓ ${code}: generated ${n} fresh learn/${code}/ pages${OUT_ROOT === ROOT ? '' : ' into ' + outDir}`);
}

// ── Run ────────────────────────────────────────────────────────────────────
function main() {
  if (ARGS.fresh) {
    runFresh(ARGS.fresh);
    return;
  }
  runSalvage(ARGS.codes.length ? ARGS.codes : DEFAULT_SALVAGE_LANGS);
}

try {
  main();
} catch (err) {
  console.error(`✗ ${err.message}`);
  process.exit(1);
}
