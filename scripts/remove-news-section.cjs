#!/usr/bin/env node
/**
 * remove-news-section.cjs — remove every trace of the news/ section.
 *
 *   node scripts/remove-news-section.cjs          # apply
 *   node scripts/remove-news-section.cjs --check  # report only, exit 1 on drift
 *
 * IDEMPOTENT. Every transform is a no-op once applied, so re-running is safe.
 *
 * Background — AdSense rejected the site for "Low value content". The news
 * section published ~11 unreviewed AI-written articles per day across 9
 * locales into near-empty client-rendered shells, matching Google's "scaled
 * content abuse" pattern. It was never indexed and is not the site's core
 * value, so the owner chose deletion over pausing.
 *
 * The news/ directory itself is deleted with `git rm` — not by this script.
 * This script removes the *references*: nav/footer links, the about-page
 * card, meta/prose mentions, the js/app.js news modules, dead .news-* CSS,
 * news-only translation keys, and the news entries in the generator scripts
 * so a future generator run cannot reintroduce the section.
 *
 * DELIBERATELY PRESERVED — the "news" vocabulary topic is real learning
 * content and is unrelated to the news section:
 *   learn/data/vocabulary-news.json, vocabulary.html?cat=news / #news,
 *   the WOD_FILES / VOCAB category maps in js/app.js, and every translation
 *   key that a surviving page still renders (verified per key at runtime).
 *
 * Files are mixed LF/CRLF. Each is read as a buffer, normalized to LF for
 * matching, and restored to its original ending on write.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

let changed = 0;
let drift = 0;
const touched = new Set();

/* ── IO helpers that preserve line endings ─────────────── */
function readLF(abs) {
  const raw = fs.readFileSync(abs, 'utf8');
  const crlf = raw.includes('\r\n');
  return { text: crlf ? raw.replace(/\r\n/g, '\n') : raw, crlf };
}

function writeLF(abs, text, crlf) {
  fs.writeFileSync(abs, crlf ? text.replace(/\n/g, '\r\n') : text, 'utf8');
}

function edit(rel, fn) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) return;
  const { text, crlf } = readLF(abs);
  const out = fn(text, rel);
  if (out === text) return;
  if (CHECK) { drift++; console.log(`  DRIFT ${rel}`); return; }
  writeLF(abs, out, crlf);
  changed++;
  touched.add(rel);
}

/* ── File discovery ────────────────────────────────────── */
function walk(dir, filter, acc = []) {
  let entries = [];
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (_) { return acc; }
  for (const e of entries) {
    const abs = path.join(dir, e.name);
    const rel = path.relative(ROOT, abs).split(path.sep).join('/');
    if (e.isDirectory()) {
      if (['node_modules', '.git', 'news', '.claude', '.agents'].includes(e.name)) continue;
      walk(abs, filter, acc);
    } else if (filter(rel)) {
      acc.push(rel);
    }
  }
  return acc;
}

/* ══════════════════════════════════════════════════════════
   1. HTML — nav links, footer links, about card, prose
   ══════════════════════════════════════════════════════════ */

// Matches any href pointing into the news section, at any relative depth.
const NEWS_HREF = /(?:\.{1,2}\/)*news\/(?:[a-z-]+\/)?(?:index|article|board|admin)\.html/;

/** Remove <li>…</li> items whose anchor targets the news section. */
function stripNewsListItems(text) {
  // Whole-line <li> (nav + block footers): drop the line entirely.
  text = text.replace(
    /^[ \t]*<li><a href="[^"]*news\/[^"]*"[^>]*>.*?<\/a><\/li>[ \t]*\r?\n/gm,
    ''
  );
  // Inline <li> inside a single-line footer <div>: drop just the item.
  text = text.replace(
    /<li><a href="[^"]*news\/[^"]*"[^>]*>[^<]*(?:<[^>]+>[^<]*)*?<\/a><\/li>/g,
    ''
  );
  return text;
}

/** Remove the about-page "Korean News" feature card (a flat <a>…</a> block). */
function stripNewsCard(text) {
  return text.replace(
    /^[ \t]*<a href="[^"]*news\/[^"]*index\.html" class="animate-on-scroll"[\s\S]*?<\/a>[ \t]*\r?\n/gm,
    ''
  );
}

/**
 * Prose + metadata rewrites. Each entry is a literal find/replace; a locale
 * whose string is absent is simply skipped, which keeps this idempotent.
 */
const PROSE = [
  // ── Homepage / site meta descriptions ──
  ['Free Korean language learning — lessons, culture, travel, and news.',
   'Free Korean language learning — lessons, culture, and travel.'],
  ['Koreanisch kostenlos lernen — Lektionen, K-Culture, Reisen und Nachrichten für alle Niveaus.',
   'Koreanisch kostenlos lernen — Lektionen, K-Culture und Reisen für alle Niveaus.'],
  ['Aprende coreano gratis — lecciones, K-cultura, viajes y noticias para todos los niveles.',
   'Aprende coreano gratis — lecciones, K-cultura y viajes para todos los niveles.'],
  ['Apprenez le coréen gratuitement — leçons, K-culture, voyages et actualités pour tous les niveaux.',
   'Apprenez le coréen gratuitement — leçons, K-culture et voyages pour tous les niveaux.'],
  ['Belajar bahasa Korea gratis — materi interaktif, K-culture, panduan wisata, dan berita Korea untuk semua tingkat.',
   'Belajar bahasa Korea gratis — materi interaktif, K-culture, dan panduan wisata untuk semua tingkat.'],
  ['無料韓国語学習 — レッスン、K-カルチャー、旅行ガイド、ニュース。すべてのレベルに対応。',
   '無料韓国語学習 — レッスン、K-カルチャー、旅行ガイド。すべてのレベルに対応。'],
  ['เรียนภาษาเกาหลีฟรี — บทเรียนแบบโต้ตอบ วัฒนธรรมเกาหลี คู่มือท่องเที่ยว และข่าวสาร สำหรับผู้เรียนทุกระดับ',
   'เรียนภาษาเกาหลีฟรี — บทเรียนแบบโต้ตอบ วัฒนธรรมเกาหลี และคู่มือท่องเที่ยว สำหรับผู้เรียนทุกระดับ'],
  ['Học tiếng Hàn miễn phí — bài học tương tác, K-culture, cẩm nang du lịch và tin tức Hàn Quốc cho mọi trình độ.',
   'Học tiếng Hàn miễn phí — bài học tương tác, K-culture và cẩm nang du lịch cho mọi trình độ.'],
  ['免費韓語學習 — 課程、K文化、旅遊與新聞。', '免費韓語學習 — 課程、K文化與旅遊。'],

  // ── search.html descriptions ──
  ['Search Korean School — find lessons, vocabulary, culture guides, and Korean news.',
   'Search Korean School — find lessons, vocabulary, and culture guides.'],
  ['Search Korean School — find lessons, vocabulary, culture guides, and Korea news in English.',
   'Search Korean School — find lessons, vocabulary, and culture guides in English.'],

  // ── about.html "real cultural context" sentence ──
  ['but K-pop, food, travel, and news.', 'but K-pop, food, and travel.'],
  ['sondern K-Pop, Essen, Reisen und Nachrichten.', 'sondern K-Pop, Essen und Reisen.'],
  ['sino K-pop, comida, viajes y noticias.', 'sino K-pop, comida y viajes.'],
  ['mais K-pop, nourriture, voyages et actualités.', 'mais K-pop, nourriture et voyages.'],
  ['tetapi K-pop, kuliner, wisata, dan berita.', 'tetapi K-pop, kuliner, dan wisata.'],
  ['K-POP・ドラマ・料理・旅行・ニュースという実際の文化的文脈で',
   'K-POP・ドラマ・料理・旅行という実際の文化的文脈で'],
  ['แต่รวมถึง K-pop อาหาร การท่องเที่ยว และข่าวสาร', 'แต่รวมถึง K-pop อาหาร และการท่องเที่ยว'],
  ['mà còn có K-pop, ẩm thực, du lịch và tin tức.', 'mà còn có K-pop, ẩm thực và du lịch.'],
  ['而是透過K-Pop、韓劇、美食、旅遊、新聞等真實文化脈絡學習語言。',
   '而是透過K-Pop、韓劇、美食、旅遊等真實文化脈絡學習語言。'],

  // ── about.html AdSense disclosure ──
  ['any lesson, culture guide, or news summary.', 'any lesson or culture guide.'],
  ['eine Lektion, einen Kulturartikel oder eine Nachrichtenzusammenfassung.',
   'eine Lektion oder einen Kulturartikel.'],
  ['ninguna lección, guía cultural o resumen de noticias.', 'ninguna lección o guía cultural.'],
  ["une leçon, un guide culturel ou un résumé d'actualité.", 'une leçon ou un guide culturel.'],
  ['pelajaran, panduan budaya, maupun ringkasan berita apa pun.',
   'pelajaran maupun panduan budaya apa pun.'],
  ['レッスン・文化ガイド・ニュース要約を確認したり', 'レッスン・文化ガイドを確認したり'],
  ['บทเรียน คู่มือวัฒนธรรม หรือบทสรุปข่าวใด ๆ', 'บทเรียน หรือคู่มือวัฒนธรรมใด ๆ'],
  ['bất kỳ bài học, bài viết văn hoá hoặc bản tóm tắt tin tức nào.',
   'bất kỳ bài học hoặc bài viết văn hoá nào.'],
  ['任何課程、文化指南或新聞摘要。', '任何課程或文化指南。'],
];

function applyProse(text) {
  for (const [from, to] of PROSE) {
    if (text.includes(from)) text = text.split(from).join(to);
  }
  return text;
}

const htmlFiles = walk(ROOT, rel => rel.endsWith('.html'));
for (const rel of htmlFiles) {
  edit(rel, text => applyProse(stripNewsCard(stripNewsListItems(text))));
}

/* ══════════════════════════════════════════════════════════
   2. js/app.js — search index entries, ticker, NEWS SECTION
   ══════════════════════════════════════════════════════════ */
edit('js/app.js', text => {
  // 2a. Search-index entries in the NEWS category (7 entries + banner comment).
  text = text.replace(
    /^[ \t]*\/\/ ── NEWS ─+\n(?:[ \t]*\{ title: [^\n]*category: 'news'[^\n]*\n)+/m,
    ''
  );

  // 2b. Fake "news ticker" — the #news-ticker element exists on no page.
  text = text.replace(
    /^\/\* ── News Feed Simulation ─+ \*\/\nfunction initNewsTicker\(\) \{[\s\S]*?\n\}\n\n/m,
    ''
  );
  text = text.replace(/^[ \t]*initNewsTicker\(\);[ \t]*\n/m, '');

  // 2c. SearchPage category metadata. NOTE: `home` also uses badgeClass
  // 'tag-news', so the CSS rule .tag-news is deliberately kept alive.
  text = text.replace(/^[ \t]*news:[ \t]*\{ label: 'News',[^\n]*\n/m, '');
  text = text.replace(
    /const ORDER = \['learn', 'words', 'culture', 'travel', 'news', 'home'\];/,
    "const ORDER = ['learn', 'words', 'culture', 'travel', 'home'];"
  );

  // 2d. The whole NEWS SECTION block: banner comment through the end of
  // AdminPage, stopping immediately before the Quiz Page banner.
  text = text.replace(
    /\/\* ═+\n[ \t]*NEWS SECTION — NewsAPI[\s\S]*?(?=\/\* ── Quiz Page ─)/,
    ''
  );

  // 2e. Boot router — drop the dispatch arms for the deleted page modules.
  // These name identifiers that no longer exist, so they must go with them.
  text = text.replace(
    /^[ \t]*(?:else )?if \(page === 'news-(?:index|board|article|admin)'\) \w+\.init\(\);[ \t]*\n/gm,
    ''
  );
  // The quiz arm was an `else if`; with the news arms gone it leads.
  text = text.replace(
    /(const page = document\.body\.dataset\.page;\n[ \t]*)else if \(page === 'quiz'\)/,
    "$1if (page === 'quiz')"
  );

  // 2f. Search-index description for the home entry.
  text = applyProse(text);

  return text;
});

/* ══════════════════════════════════════════════════════════
   3. js/ads.js — stale comment referencing the news renderers
   ══════════════════════════════════════════════════════════ */
edit('js/ads.js', text =>
  text.replace(
    'Dynamic renderers (news grid, article body) call window.KSAds.push() after',
    'Dynamic renderers call window.KSAds.push() after'
  )
);

/* ══════════════════════════════════════════════════════════
   4. css/style.css — dead .news-* rules
   ══════════════════════════════════════════════════════════
   Only rules whose EVERY selector starts with `.news-` are removed, so a
   grouped selector shared with a surviving component is never touched.
   `.tag-news` is not `.news-*` and stays: SearchPage still uses it for the
   `home` badge.
*/
edit('css/style.css', text => {
  const out = [];
  let i = 0;
  // `boundary` is the start of the current selector: the position just past
  // the last rule close OR the last at-rule opening brace. Tracking it is
  // what lets a `.news-*` rule nested inside @media be seen as `.news-*`
  // rather than as "@media (...) { .news-*".
  let boundary = 0;
  while (i < text.length) {
    const brace = text.indexOf('{', i);
    if (brace === -1) { out.push(text.slice(i)); break; }

    const selStart = Math.max(
      boundary,
      text.lastIndexOf('}', brace) + 1,
      text.lastIndexOf('*/', brace) + 2
    );
    const selector = text.slice(selStart, brace).trim();

    // At-rules nest — step inside and keep scanning.
    if (selector.startsWith('@') || !selector) {
      out.push(text.slice(i, brace + 1));
      i = brace + 1; boundary = i;
      continue;
    }

    const close = text.indexOf('}', brace);
    if (close === -1) { out.push(text.slice(i)); break; }

    const parts = selector.split(',').map(s => s.trim()).filter(Boolean);
    const allNews = parts.length > 0 && parts.every(s => s.startsWith('.news-'));

    // Emit up to selStart only (dropping the rule) or the whole rule.
    // Trailing whitespace is left intact and collapsed afterwards — eating it
    // here would join the following rule onto the previous line.
    out.push(text.slice(i, allNews ? selStart : close + 1));
    i = close + 1; boundary = i;
  }

  let css = out.join('');
  // Section comments that now head nothing.
  css = css.replace(/\/\* ── (?:News|Daily Summary Bar|Filter Bar \(news topics\)|Featured Bento Grid|Weekly Top Strip|Article Vocabulary Cards)[^\n]*─+ \*\/\n/g, '');
  css = css.replace(/\/\* ═+\n[ \t]*NEWS SECTION — Landing, Article, Admin\n[ \t]*═+ \*\/\n/g, '');
  css = css.replace(/\/\* ═+\n[ \t]*NEWS HERO COVER[^\n]*\n[ \t]*═+ \*\/\n/g, '');
  // Tidy the gaps the removals left behind.
  css = css.replace(/[ \t]+$/gm, '');
  css = css.replace(/\n{3,}/g, '\n\n');
  css = css.replace(/\{\n\n+/g, '{\n');
  css = css.replace(/\n\n+\}/g, '\n}');
  return css;
});

/* ══════════════════════════════════════════════════════════
   5. Translation packs — news-section-only keys
   ══════════════════════════════════════════════════════════
   A key is removed ONLY if its English source string appears nowhere in the
   surviving HTML/JS. That check is what keeps shared keys — 'News & Society'
   (vocabulary category), 'Korean News · 뉴스' (vocabulary topic), 'Reading
   Short Texts & News' (learn curriculum) — safely in place.
*/
const survivingText = (() => {
  let blob = '';
  for (const rel of walk(ROOT, r =>
    (r.endsWith('.html') || r.endsWith('.js') || r.endsWith('.json')) &&
    !r.startsWith('scripts/') && !r.startsWith('docs/') && !r.startsWith('js/lang')
  )) {
    try { blob += fs.readFileSync(path.join(ROOT, rel), 'utf8'); } catch (_) {}
  }
  return blob;
})();

const LANG_FILES = ['js/lang-ja.js', ...fs.existsSync(path.join(ROOT, 'js/langs'))
  ? fs.readdirSync(path.join(ROOT, 'js/langs')).map(f => `js/langs/${f}`)
  : []];

for (const rel of LANG_FILES) {
  edit(rel, text => {
    const lines = text.split('\n');
    const kept = [];
    for (const line of lines) {
      // Drop the news section banner comments.
      if (/^\s*\/\/ ── News(?: [Ff]ilter [Cc]ategories)? ─+$/.test(line)) continue;

      // A line may hold several 'key': 'value' pairs. Rebuild it without the
      // pairs whose key is news-only and unused by any surviving page.
      const pairRe = /'((?:[^'\\]|\\.)*)':\s*'(?:[^'\\]|\\.)*',?/g;
      if (!/news|Nachrichten|Noticias|Actualités|Berita|ニュース|ข่าว|Tin tức|新聞/i.test(line)) {
        kept.push(line);
        continue;
      }
      let dropped = false;
      const rebuilt = line.replace(pairRe, (m, key) => {
        const k = key.replace(/\\'/g, "'");
        const isNewsKey = /news/i.test(k) || k.includes('한국 뉴스');
        if (!isNewsKey) return m;
        // Keep it if any surviving page still renders this string.
        if (survivingText.includes(k)) return m;
        dropped = true;
        return '';
      });
      if (!dropped) { kept.push(line); continue; }
      const cleaned = rebuilt.replace(/\s+/g, ' ').trim();
      // Line held only news keys → drop it; otherwise keep the remainder.
      if (cleaned === '' || cleaned === ',') continue;
      kept.push(tidyPairLine(rebuilt));
    }
    return kept.join('\n');
  });
}

/* Re-indent a line a pair was spliced out of, so the survivors stay aligned. */
function tidyPairLine(line) {
  const indent = (line.match(/^[ \t]*/) || [''])[0];
  const body = line.trim().replace(/,\s*,/g, ',').replace(/^,\s*/, '');
  return indent + body;
}

/* ══════════════════════════════════════════════════════════
   5b. News-page-only keys that carry no "news" in the key text
   ══════════════════════════════════════════════════════════
   These were the chrome of the news landing/article/board pages. Each is
   removed ONLY when the string appears nowhere in the surviving site, so the
   generic ones in this list ('Culture', 'Sports', 'All', 'Level:', …) that
   other pages still render are automatically kept.
*/
const NEWS_ONLY_KEYS = [
  "TODAY'S KOREA · 오늘의 한국", 'All 전체', 'LATEST · 최신 기사',
  'FEATURED · 주목 기사', 'ARTICLES · 기사 목록', 'Admin ⚙️',
  '더 보기 — Load More', 'All articles loaded', 'Most Read This Week',
  "THIS WEEK'S TOP STORIES · 이번 주 인기 뉴스",
  'VOCABULARY SPOTLIGHT · 핵심 어휘', 'Full Vocabulary Lists →',
  'International', 'Politics', 'Economy', 'Society', 'Science',
  'Culture', 'Sports', 'Education', 'Environment', 'Level:',
].filter(k => !survivingText.includes(k));

for (const rel of LANG_FILES) {
  edit(rel, text => {
    const lines = text.split('\n');
    const kept = [];
    for (const line of lines) {
      let dropped = false;
      const rebuilt = line.replace(
        /'((?:[^'\\]|\\.)*)':\s*'(?:[^'\\]|\\.)*',?/g,
        (m, key) => {
          const k = key.replace(/\\'/g, "'");
          if (!NEWS_ONLY_KEYS.includes(k)) return m;
          dropped = true;
          return '';
        }
      );
      if (!dropped) { kept.push(line); continue; }
      if (rebuilt.trim() === '' || rebuilt.trim() === ',') continue;
      kept.push(tidyPairLine(rebuilt));
    }
    return kept.join('\n');
  });
}

/* ══════════════════════════════════════════════════════════
   6. scripts/gen-sitemap.cjs — drop news from the scanned sections
   ══════════════════════════════════════════════════════════ */
edit('scripts/gen-sitemap.cjs', text => {
  text = text.replace(
    "const SECTIONS = ['learn', 'culture', 'travel', 'news'];",
    "const SECTIONS = ['learn', 'culture', 'travel'];"
  );
  text = text.replace(
    /\/\/ Never emit these regardless of what is on disk: admin tooling and the\n\/\/ dynamic news templates that render nothing without a query param\.\nconst SLUG_DENYLIST = new Set\(\['admin', 'article', 'board'\]\);/,
    "// Never emit these regardless of what is on disk: admin tooling.\nconst SLUG_DENYLIST = new Set(['admin']);"
  );
  text = text.replace(/^[ \t]*if \(section === 'news'\)[^\n]*\n/m, '');
  return text;
});

/* ══════════════════════════════════════════════════════════
   7. Generator scripts — strip news from their nav templates
   ══════════════════════════════════════════════════════════
   These scripts are NOT run here (several are known to clobber translated
   prose). They are patched so that if anyone runs them later, they cannot
   reintroduce the deleted section.
*/
const GENERATORS = [
  'gen-content-mirrors.cjs', 'gen-root-mirrors.cjs', 'gen-learn-mirrors.cjs',
  'gen-learn-id.cjs', 'gen-de-site.cjs', 'gen-fr-site.cjs', 'gen-id-site.cjs',
  'gen-th-site.cjs', 'gen-vi-site.cjs', 'gen-lesson-static.cjs',
  'harden-page-metadata.cjs', 'inject-ad-zones.cjs', 'inject-seo.mjs',
  'fix-culture-travel-seo.cjs',
];

for (const g of GENERATORS) {
  edit(`scripts/${g}`, text => {
    // Nav/footer <li> templates inside JS string literals.
    text = text.replace(
      /^[ \t]*<li><a href="[^"]*news\/[^"]*"[^>]*>.*?<\/a><\/li>[ \t]*\n/gm,
      ''
    );
    text = text.replace(
      /<li><a href="[^"]*news\/[^"]*"[^>]*>[^<]*(?:<[^>]+>[^<]*)*?<\/a><\/li>/g,
      ''
    );
    // Section lists that enumerate news alongside learn/culture/travel.
    text = text.replace(/'news',\s*/g, '');
    text = text.replace(/,\s*'news'/g, '');
    text = text.replace(/"news",\s*/g, '');
    text = text.replace(/,\s*"news"/g, '');
    return text;
  });
}

/* ── Report ────────────────────────────────────────────── */
if (CHECK) {
  console.log(drift ? `\n${drift} file(s) need changes.` : '\nClean — no drift.');
  process.exit(drift ? 1 : 0);
}
console.log(`\nRewrote ${changed} file(s).`);
for (const f of [...touched].sort()) {
  if (!f.includes('/') || f.startsWith('js/') || f.startsWith('scripts/') || f.startsWith('css/')) {
    console.log(`  ${f}`);
  }
}
console.log(`  (+ ${[...touched].filter(f => f.endsWith('.html')).length} HTML pages)`);
