// ══════════════════════════════════════════════════════════════════════════
// gen-learn-mirrors.cjs — regenerate learn/<lang>/ mirrors for de/es/fr/vi/th.
//
// Replaces the old per-language gen-learn-de/es/fr/vi/th.cjs scripts, which
// sourced their chrome from the CORRUPTED learn/de/vocabulary.html (mislabeled
// Spanish content + a duplicated <!DOCTYPE>/<head>/<body> shell). That bug left
// every de/es/fr/vi/th learn page showing Spanish nav/sidebar/footer and two
// nested document shells.
//
// Strategy (validated — see scratchpad analysis):
//   • The <head> and <main> of the 13 content pages are already correctly
//     translated per language (German head + German lesson body, etc.). Only the
//     CHROME (header/sidebar/footer, outside <main>) was Spanish + duplicated.
//     → We SALVAGE the first <head>, the <main>…</main>, and the trailing
//       <script> block from each existing file, and REBUILD the chrome by
//       translating the clean English chrome through js/langs/lang-<lang>.js
//       (the same dictionary LangManager uses at runtime — 0 untranslated
//       segments for all five languages after augmenting lang-th.js).
//   • The 3 app pages (vocabulary, flashcard, vocabulary-browser) had a Spanish
//     <head> AND a Spanish body, so nothing was salvageable. → We regenerate them
//     wholesale from the clean English source, translate via the dictionary, and
//     fix paths / canonical / <title> / description.
// ══════════════════════════════════════════════════════════════════════════
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const LEARN = path.join(ROOT, 'learn');

const LANGS = ['de', 'es', 'fr', 'vi', 'th'];
const FLAG = { de: '🇩🇪 DE', es: '🇪🇸 ES', fr: '🇫🇷 FR', vi: '🇻🇳 VI', th: '🇹🇭 TH' };

// 13 salvage pages (head + main + scripts kept; chrome rebuilt)
const SALVAGE_PAGES = [
  'hangul', 'letter-writing', 'typing', 'syllable-blocks', 'pronunciation', 'grammar', 'nouns', 'pronouns',
  'shopping', 'emotions', 'speech-levels',
  'dialogues', 'business-korean', 'classical-korean', 'writing-essays',
];
// 3 app pages (regenerated wholesale from clean English)
const APP_PAGES = ['vocabulary', 'flashcard', 'vocabulary-browser'];

// ── Dictionary loader (sandbox the IIFE, capture the registered object) ──────
function loadDict(lang) {
  const src = fs.readFileSync(path.join(ROOT, 'js/langs/lang-' + lang + '.js'), 'utf8');
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

// ── Path fixes: clean-English chrome (learn/*.html, depth 1) → learn/<lang>/ ──
function fixChromePaths(html, lang) {
  return html
    .replace(/href="\.\.\/index\.html"/g, `href="../../${lang}/index.html"`)
    .replace(/href="\.\.\/culture\/index\.html"/g, `href="../../culture/${lang}/index.html"`)
    .replace(/href="\.\.\/travel\/index\.html"/g, `href="../../travel/${lang}/index.html"`)
    .replace(/href="\.\.\/news\/index\.html"/g, `href="../../news/${lang}/index.html"`)
    .replace(/href="\.\.\/quiz\.html"/g, `href="../../${lang}/quiz.html"`)
    .replace(/href="\.\.\/about\.html"/g, `href="../../${lang}/about.html"`)
    .replace(/href="\.\.\/contact\.html"/g, `href="../../${lang}/contact.html"`)
    .replace(/href="\.\.\/privacy\.html"/g, `href="../../${lang}/privacy.html"`)
    .replace(/href="\.\.\/terms\.html"/g, `href="../../${lang}/terms.html"`)
    .replace(/href="\.\.\/css\//g, 'href="../../css/')
    .replace(/src="\.\.\/js\//g, 'src="../../js/');
}

// ── Build the shared chrome (beforeMain header/sidebar + footer) per lang ────
const enHangul = fs.readFileSync(path.join(LEARN, 'hangul.html'), 'utf8');
const EN_BEFORE = enHangul.slice(enHangul.indexOf('<body>') + '<body>'.length, enHangul.indexOf('<main'));
const EN_FOOTER = enHangul.slice(enHangul.indexOf('</main>') + '</main>'.length).replace(/<script[\s\S]*$/, '');

function buildChrome(lang, dict) {
  let before = translate(fixChromePaths(EN_BEFORE, lang), dict).replace('🇺🇸 EN', FLAG[lang]);
  let footer = translate(fixChromePaths(EN_FOOTER, lang), dict).replace('🇺🇸 EN', FLAG[lang]);
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

let total = 0;

for (const lang of LANGS) {
  const dict = loadDict(lang);
  const chrome = buildChrome(lang, dict);
  const dir = path.join(LEARN, lang);
  const homeLabel = dict['Home'] ? encodeText(dict['Home']) : null;

  // ── 13 salvage pages ──────────────────────────────────────────────────────
  for (const page of SALVAGE_PAGES) {
    const file = path.join(dir, page + '.html');
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

    const out = `${head}\n<body>\n${before}\n${main}\n\n${chrome.footer}\n${scripts}\n</body>\n</html>\n`;
    fs.writeFileSync(file, out, 'utf8');
    total++;
  }

  // ── 3 app pages (regenerate wholesale from clean English) ─────────────────
  for (const page of APP_PAGES) {
    const enSrc = fs.readFileSync(path.join(LEARN, page + '.html'), 'utf8');
    const meta = appMeta(lang, page);

    let out = enSrc
      .replace(/lang="en"/, `lang="${lang}"`)
      .replace(/href="\.\.\/css\//g, 'href="../../css/')
      .replace(/src="\.\.\/js\//g, 'src="../../js/')
      .replace(/href="\.\.\/index\.html"/g, `href="../../${lang}/index.html"`)
      .replace(/href="\.\.\/culture\/index\.html"/g, `href="../../culture/${lang}/index.html"`)
      .replace(/href="\.\.\/travel\/index\.html"/g, `href="../../travel/${lang}/index.html"`)
      .replace(/href="\.\.\/news\/index\.html"/g, `href="../../news/${lang}/index.html"`)
      .replace(/href="\.\.\/quiz\.html"/g, `href="../../${lang}/quiz.html"`)
      .replace(/href="\.\.\/about\.html"/g, `href="../../${lang}/about.html"`)
      .replace(/href="\.\.\/contact\.html"/g, `href="../../${lang}/contact.html"`)
      .replace(/href="\.\.\/privacy\.html"/g, `href="../../${lang}/privacy.html"`)
      .replace(/href="\.\.\/terms\.html"/g, `href="../../${lang}/terms.html"`)
      // self-referential canonical + og:url → target language
      .replace(new RegExp(`(canonical" href="https://freekoreanschool\\.com/learn)/${page}"`), `$1/${lang}/${page}"`)
      .replace(new RegExp(`(og:url" content="https://freekoreanschool\\.com/learn)/${page}"`), `$1/${lang}/${page}"`)
      // load the language pack right after lang-core.js
      .replace(
        /(<script src="\.\.\/\.\.\/js\/lang-core\.js"><\/script>)/,
        `$1\n<script src="../../js/langs/lang-${lang}.js"></script>`
      );

    // <title> + og/twitter title + descriptions
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

    // translate the body chrome + labels, set the flag
    out = translate(out, dict).replace('🇺🇸 EN', FLAG[lang]);

    fs.writeFileSync(path.join(dir, page + '.html'), out, 'utf8');
    total++;
  }

  console.log(`✓ ${lang}: regenerated ${SALVAGE_PAGES.length + APP_PAGES.length} learn/${lang}/ pages`);
}

console.log(`\nDone. ${total} files regenerated across ${LANGS.length} languages.`);

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
  return T[page][lang];
}
