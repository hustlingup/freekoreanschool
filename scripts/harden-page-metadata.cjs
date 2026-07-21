#!/usr/bin/env node
/**
 * harden-page-metadata.cjs — AdSense remediation wave 2: <head> metadata and
 * indexability for the learn section and the root/legal pages.
 *
 *   node scripts/harden-page-metadata.cjs          # apply
 *   node scripts/harden-page-metadata.cjs --check  # verify only, exit 1 on drift
 *
 * IDEMPOTENT and MARKER-GUARDED. Every generated region is delimited by
 * <!-- ks-hreflang:start/end --> or <!-- ks-schema:start/end -->, so a re-run
 * regenerates in place rather than appending. This exists as a script rather
 * than hand edits because concurrent site-wide generation scripts have twice
 * reverted hand-applied work to HEAD today; re-running this restores it in one
 * command.
 *
 * SCOPE — deliberately narrow, because culture/, travel/, news/ and
 * sitemap.xml are owned by other agents working concurrently:
 *
 *     learn/*.html                     (16 English lesson/tool pages)
 *     learn/<lang>/*.html              (16 x 8 locales)
 *     <root>.html                      (index about contact privacy terms search quiz)
 *     <lang>/<root>.html               (7 x 8 locales)
 *     = 207 files
 *
 * Only the <head> region is touched. The <details id="lesson-static"> blocks in
 * <body> (committed at f2fee74) and js/step-runner.js are never read or written.
 *
 * Files are mixed LF/CRLF. Each is normalized to LF in memory for matching and
 * restored to its original ending on write, so patterns stay newline-agnostic.
 *
 * ── What this fixes ──────────────────────────────────────────────────────────
 *
 * 1. NOINDEX. Audited, not blindly stripped. The 2026-07-07 "translation gate"
 *    noindexed ~96 URLs on the belief that de/fr/vi/th/id carried untranslated
 *    English prose. That belief was wrong, but the gate never reached this
 *    scope: learn/ has ZERO noindex and the only 18 in scope are the deliberate
 *    wave-1 noindex on search.html + quiz.html across all 9 locales, which are
 *    pure JS widgets with no crawlable content. Those 18 are PRESERVED — this
 *    script asserts they stay, and asserts no learn page ever acquires one.
 *    (The real stale gate lives in culture/ (74) and travel/ (22); out of scope.)
 *
 * 2. HREFLANG. Sets ranged from 1 to 9 tags with no reciprocity. `th` was
 *    present on only 13 of 207 pages. All 58 `vi` learn tags carried a `.html`
 *    extension and every locale-index tag carried a trailing slash — both hit a
 *    vercel redirect (cleanUrls:true, trailingSlash:false) and hreflang does not
 *    follow redirects, so those annotations were silently discarded. Every page
 *    now emits the same complete, reciprocal, self-referential 10-tag set
 *    (9 locales + x-default) in canonical extensionless form, and the verifier
 *    proves both reciprocity and on-disk existence of every target.
 *
 * 3. CANONICAL. Exactly one self-referential canonical per page. Two id/ learn
 *    pages canonicalised to the English URL, which tells Google to drop the
 *    Indonesian page entirely.
 *
 * 4. SCHEMA.ORG. Course for the 10 sequenced, progress-tracked lessons;
 *    LearningResource for the 4 prose guides and 2 study tools. Rationale in
 *    schemaFor() below. Author/publisher/dates/inLanguage on every page; dates
 *    come from git history only (see DATES), never invented.
 *
 * 5. TITLES + DESCRIPTIONS. 16 pages had no meta description; 14 shared a title
 *    and 10 shared a description with another page — vi/th/id had simply never
 *    had index/quiz/search localized, and fr/contact kept the English title.
 *    Duplicate titles across locales are a thin-content signal, which is what
 *    the site was rejected for.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CHECK_ONLY = process.argv.includes('--check');
const BASE = 'https://freekoreanschool.com';

const AUTHOR_NAME = '해본놈RK (Haebonnom RK)';
const ORG_NAME = 'Korean School 한국어 학교';

let changed = 0;
const report = [];

/* ── CRLF-safe read/write ──────────────────────────────────────────────── */
function read(rel) {
  const raw = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  return { src: raw.replace(/\r\n/g, '\n'), crlf: /\r\n/.test(raw) };
}
function write(rel, src, crlf) {
  if (CHECK_ONLY) return;
  fs.writeFileSync(path.join(ROOT, rel), crlf ? src.replace(/\n/g, '\r\n') : src, 'utf8');
}
function note(rel, msgs) {
  if (msgs.length) report.push(`${rel.padEnd(38)} ${msgs.join(', ')}`);
}
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;');
const unesc = s => String(s).replace(/&quot;/g, '"').replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>').replace(/&amp;/g, '&');

/* ── Inventory ─────────────────────────────────────────────────────────── */
const LANGS = ['ja', 'zh-tw', 'es', 'de', 'fr', 'vi', 'th', 'id'];
const ALL = ['en', ...LANGS];
const ROOTPAGES = ['index', 'about', 'contact', 'privacy', 'terms', 'search', 'quiz'];
// hreflang code per directory. zh-tw ships as the region-qualified zh-TW.
const HREF = { en: 'en', ja: 'ja', 'zh-tw': 'zh-TW', es: 'es', de: 'de', fr: 'fr', vi: 'vi', th: 'th', id: 'id' };
// BCP-47 for schema.org inLanguage — the language the PAGE is written in.
const BCP = HREF;

const LEARN_SLUGS = fs.readdirSync(path.join(ROOT, 'learn'))
  .filter(f => f.endsWith('.html')).map(f => f.replace(/\.html$/, '')).sort();

/** Every in-scope file, as {rel, lang, kind, slug}. */
function inventory() {
  const out = [];
  for (const slug of LEARN_SLUGS) {
    out.push({ rel: `learn/${slug}.html`, lang: 'en', kind: 'learn', slug });
    for (const l of LANGS) out.push({ rel: `learn/${l}/${slug}.html`, lang: l, kind: 'learn', slug });
  }
  for (const p of ROOTPAGES) {
    out.push({ rel: `${p}.html`, lang: 'en', kind: 'root', slug: p });
    for (const l of LANGS) out.push({ rel: `${l}/${p}.html`, lang: l, kind: 'root', slug: p });
  }
  return out.filter(f => fs.existsSync(path.join(ROOT, f.rel)));
}
const FILES = inventory();

/** Canonical, extensionless, redirect-free URL for a page.
 *  cleanUrls:true strips .html; trailingSlash:false means /ja/ 308s to /ja.
 *  Only the site root keeps its slash. */
function urlFor(lang, kind, slug) {
  if (kind === 'root' && slug === 'index') return lang === 'en' ? `${BASE}/` : `${BASE}/${lang}`;
  const dir = kind === 'learn' ? (lang === 'en' ? 'learn' : `learn/${lang}`) : (lang === 'en' ? '' : lang);
  return `${BASE}/${dir ? dir + '/' : ''}${slug}`;
}
/** Which locales actually have this page on disk — hreflang must never point
 *  at a 404, so the set is computed from the filesystem, not assumed. */
function siblings(kind, slug) {
  return ALL.filter(l => {
    const rel = kind === 'learn'
      ? (l === 'en' ? `learn/${slug}.html` : `learn/${l}/${slug}.html`)
      : (l === 'en' ? `${slug}.html` : `${l}/${slug}.html`);
    return fs.existsSync(path.join(ROOT, rel));
  });
}

/* ── Dates: git history only, never invented ───────────────────────────────
   One `git log --all --name-status` pass over the whole repo (per-file --follow
   on 207 files exceeded the command timeout). Newest-first, so within the walk
   the FIRST status seen for a path is its latest touch and the LAST A/R seen is
   its introduction. Spot-checked against direct
   `git log --format=%aI --diff-filter=A -- <file>` for learn/hangul.html,
   learn/th/hangul.html, index.html and th/about.html — exact match, and all 207
   files resolved, so nothing here falls back to a synthetic date. If a future
   file ever fails to resolve, DATE_FALLBACK is used and the file is listed
   under "unresolved git history" in the run report. */
const DATE_FALLBACK = null;
function gitDates() {
  const { execSync } = require('child_process');
  let log = '';
  try {
    log = execSync('git log --all --format="C|%aI" --name-status --diff-filter=AMR',
      { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  } catch { return { add: {}, mod: {} }; }
  const add = {}, mod = {};
  let date = null;
  for (const ln of log.split('\n')) {
    if (ln.startsWith('C|')) { date = ln.slice(2).trim(); continue; }
    const m = ln.match(/^([AMR])\d*\t(.+)$/);
    if (!m || !date) continue;
    const parts = m[2].split('\t');
    const p = parts[parts.length - 1];
    if (!mod[p]) mod[p] = date;            // first seen  = newest commit
    if (m[1] === 'A' || m[1] === 'R') add[p] = date;  // last seen = oldest add
  }
  return { add, mod };
}
const DATES = gitDates();
const unresolvedDates = [];
function datesFor(rel) {
  const a = DATES.add[rel], m = DATES.mod[rel];
  if (!a || !m) unresolvedDates.push(rel);
  return { published: a || DATE_FALLBACK, modified: m || a || DATE_FALLBACK };
}

/* ── Lesson data: the truthful source for teaches / workload ───────────── */
const LESSON_JSON = {};
for (const slug of LEARN_SLUGS) {
  const p = path.join(ROOT, 'learn', 'data', `${slug}.json`);
  if (fs.existsSync(p)) { try { LESSON_JSON[slug] = JSON.parse(fs.readFileSync(p, 'utf8')); } catch {} }
}
// vocabulary.html swaps categories at runtime; vocabulary.json is the union.
if (!LESSON_JSON.vocabulary && fs.existsSync(path.join(ROOT, 'learn/data/vocabulary.json'))) {
  try { LESSON_JSON.vocabulary = JSON.parse(fs.readFileSync(path.join(ROOT, 'learn/data/vocabulary.json'), 'utf8')); } catch {}
}

/** teaches[] from the lesson JSON's stage names, in the page's own language.
 *  Stage names carry name_zh_tw/_es/_de/_fr/_vi/_th/_id but no name_ja, so ja
 *  falls back to the English stage name — truthful, just not localized. */
function teachesFromJson(slug, lang) {
  const j = LESSON_JSON[slug];
  if (!j || !Array.isArray(j.stages)) return null;
  const key = lang === 'en' ? 'name' : `name_${lang.replace('-', '_')}`;
  const out = j.stages.map(s => s[key] || s.name).filter(Boolean);
  return out.length ? [...new Set(out)] : null;
}
/** teaches[] for the prose guides, read from that page's own <h2> headings —
 *  already translated per locale, so this localizes for free. */
function teachesFromHeadings(src) {
  const out = [...src.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)]
    .map(m => unesc(m[1].replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim())
    .map(s => s.replace(/^\d+[.)]?\s+/, ''))   // strip the CSS counter prefix
    .filter(Boolean);
  return out.length ? [...new Set(out)].slice(0, 12) : null;
}
/** Total instructional minutes, summed from the lesson's own stage timings.
 *  grammar.json has no timings (sums to 0) so it emits no courseWorkload. */
function workload(slug) {
  const j = LESSON_JSON[slug];
  if (!j || !Array.isArray(j.stages)) return null;
  const mins = j.stages.reduce((a, s) => a + (Number(s.time_minutes) || 0), 0);
  return mins > 0 ? `PT${mins}M` : null;
}

/** educationalLevel, parsed from each page's own visible ".lesson-tag"
   ("✏️ Starter · Lesson 1"). Read from the English page and reused across
   locales because proficiency level is language-independent. */
const LEVEL = {};
for (const slug of LEARN_SLUGS) {
  const h = read(`learn/${slug}.html`).src;
  const tag = h.match(/<div class="lesson-tag">([\s\S]*?)<\/div>/);
  if (!tag) continue;
  const txt = unesc(tag[1].replace(/<[^>]*>/g, ''));
  if (/Starter|Beginner/i.test(txt)) LEVEL[slug] = 'Beginner';
  else if (/Intermediate/i.test(txt)) LEVEL[slug] = 'Intermediate';
  else if (/Advanced/i.test(txt)) LEVEL[slug] = 'Advanced';
  else if (/All Levels/i.test(txt)) LEVEL[slug] = 'Beginner to Advanced';
  // "Study Tool" intentionally yields no educationalLevel.
}

/* ── Copy: titles + descriptions that were missing or duplicated ───────────
   Only the pages the audit flagged appear here; everything else keeps the copy
   it already had. Keys are file paths so a re-run is an exact-match no-op. */
const COPY = {
  /* vi/th/id never had index/quiz/search localized — English leaked through and
     collided with the EN page, producing 4-way duplicate titles. */
  'vi/index.html': {
    title: 'Korean School 한국어 학교 — Học tiếng Hàn miễn phí',
    desc: 'Học tiếng Hàn miễn phí — bài học tương tác, K-culture, cẩm nang du lịch và tin tức Hàn Quốc cho mọi trình độ.',
  },
  'th/index.html': {
    title: 'Korean School 한국어 학교 — เรียนภาษาเกาหลีฟรี',
    desc: 'เรียนภาษาเกาหลีฟรี — บทเรียนแบบโต้ตอบ วัฒนธรรมเกาหลี คู่มือท่องเที่ยว และข่าวสาร สำหรับผู้เรียนทุกระดับ',
  },
  'id/index.html': {
    title: 'Korean School 한국어 학교 — Belajar Bahasa Korea Gratis',
    desc: 'Belajar bahasa Korea gratis — materi interaktif, K-culture, panduan wisata, dan berita Korea untuk semua tingkat.',
  },
  'vi/quiz.html': {
    title: 'Trắc nghiệm tiếng Hàn 퀴즈 | 한국어 학교',
    desc: 'Kiểm tra trình độ tiếng Hàn của bạn với 10 cấp độ câu hỏi trắc nghiệm — Hangul, ngữ pháp, từ vựng và nhiều hơn nữa.',
  },
  'th/quiz.html': {
    title: 'แบบทดสอบภาษาเกาหลี 퀴즈 | 한국어 학교',
    desc: 'ทดสอบภาษาเกาหลีของคุณด้วยแบบทดสอบปรนัย 10 ระดับ — ฮันกึล ไวยากรณ์ คำศัพท์ และอื่น ๆ อีกมากมาย',
  },
  'id/quiz.html': {
    title: 'Kuis Bahasa Korea 퀴즈 | 한국어 학교',
    desc: 'Uji kemampuan bahasa Koreamu dengan 10 tingkat kuis pilihan ganda — Hangul, tata bahasa, kosakata, dan lainnya.',
  },
  'search.html': {
    desc: 'Search Korean School — find lessons, vocabulary, culture guides, and Korea news in English.',
  },
  'ja/search.html': {
    desc: 'Korean School を検索 — レッスン、単語、文化ガイド、韓国ニュースを日本語で探せます。',
  },
  'vi/search.html': {
    title: 'Kết quả tìm kiếm | 한국어 학교',
    desc: 'Tìm kiếm trên Korean School — tra cứu bài học, từ vựng, cẩm nang văn hoá và tin tức Hàn Quốc bằng tiếng Việt.',
  },
  'th/search.html': {
    title: 'ผลการค้นหา | 한국어 학교',
    desc: 'ค้นหาใน Korean School — ค้นบทเรียน คำศัพท์ คู่มือวัฒนธรรม และข่าวเกาหลีเป็นภาษาไทย',
  },
  'id/search.html': {
    title: 'Hasil Pencarian | 한국어 학교',
    desc: 'Cari di Korean School — temukan materi pelajaran, kosakata, panduan budaya, dan berita Korea dalam bahasa Indonesia.',
  },
  /* fr/contact kept the English title verbatim. */
  'fr/contact.html': { title: 'Contactez-nous | 한국어 학교 — Korean School' },

  /* learn/flashcard: spaced-repetition deck builder with per-card audio. Only
     zh-tw ever had a description. */
  'learn/flashcard.html': {
    desc: 'Study Korean vocabulary with spaced-repetition flashcards. Build a deck from any lesson, flip each card for meaning and romanization, and play native audio on every card.',
  },
  'learn/ja/flashcard.html': {
    desc: '間隔反復フラッシュカードで韓国語の単語を復習。どのレッスンからでも自分のデッキを作り、カードをめくって意味とローマ字を確認し、各カードの音声を再生できます。',
  },
  'learn/es/flashcard.html': {
    desc: 'Estudia vocabulario coreano con tarjetas de repetición espaciada. Crea tu mazo desde cualquier lección, gira cada tarjeta para ver el significado y la romanización, y escucha el audio nativo de cada una.',
  },
  'learn/de/flashcard.html': {
    desc: 'Koreanischen Wortschatz mit Lernkarten und Spaced Repetition üben. Stelle dein Kartendeck aus jeder Lektion zusammen, drehe die Karten für Bedeutung und Umschrift und höre zu jeder Karte die native Aussprache.',
  },
  'learn/fr/flashcard.html': {
    desc: 'Révisez le vocabulaire coréen avec des cartes mémoire à répétition espacée. Composez votre paquet à partir de n\'importe quelle leçon, retournez chaque carte pour le sens et la romanisation, et écoutez l\'audio natif.',
  },
  'learn/vi/flashcard.html': {
    desc: 'Ôn từ vựng tiếng Hàn bằng thẻ ghi nhớ lặp lại ngắt quãng. Tự tạo bộ thẻ từ bất kỳ bài học nào, lật thẻ để xem nghĩa và phiên âm, và nghe phát âm bản ngữ trên từng thẻ.',
  },
  'learn/th/flashcard.html': {
    desc: 'ทบทวนคำศัพท์ภาษาเกาหลีด้วยบัตรคำแบบทบทวนเว้นระยะ สร้างชุดบัตรของคุณเองจากบทเรียนใดก็ได้ พลิกบัตรเพื่อดูความหมายและคำอ่าน และฟังเสียงเจ้าของภาษาในทุกบัตร',
  },
  'learn/id/flashcard.html': {
    desc: 'Pelajari kosakata Korea dengan kartu hafalan berbasis pengulangan berjarak. Susun dek dari materi mana pun, balik kartu untuk melihat arti dan romanisasi, serta putar audio penutur asli di setiap kartu.',
  },

  /* learn/writing-essays: essay structure, register, connectives. */
  'learn/writing-essays.html': {
    desc: 'Learn to write Korean essays and formal texts — paragraph structure, written vs spoken register, connective endings, transition words, citation, and a worked sample paragraph.',
  },
  'learn/ja/writing-essays.html': {
    desc: '韓国語で小論文や公式文書を書く方法を学びます — 文章構成、文語体と口語体の違い、連結語尾、接続表現、引用の作法、そして例文の段落まで。',
  },
  'learn/zh-tw/writing-essays.html': {
    desc: '學習用韓語撰寫論說文與正式文章 — 文章結構、文言體與口語體的差異、連結語尾、轉折用語、引用方式，並附完整範例段落。',
  },

  /* learn/id/vocabulary-browser still carried the English description. */
  'learn/id/vocabulary-browser.html': {
    desc: 'Jelajahi seluruh kosakata Korea dan pilih kata untuk ditambahkan ke dek kartu hafalanmu. Saring berdasarkan kategori atau cari dalam bahasa Korea maupun Inggris.',
  },
};

/* ══ PART 1 — noindex audit (assert, don't strip) ═════════════════════════
   The deliberate wave-1 noindex on the two JS-only widgets, in every locale. */
const DELIBERATE_NOINDEX = new Set();
for (const l of ALL) for (const p of ['search', 'quiz'])
  DELIBERATE_NOINDEX.add(l === 'en' ? `${p}.html` : `${l}/${p}.html`);

function auditNoindex() {
  const unexpected = [], missing = [];
  for (const f of FILES) {
    const has = /<meta\s+name="robots"[^>]*noindex/i.test(read(f.rel).src);
    if (has && !DELIBERATE_NOINDEX.has(f.rel)) unexpected.push(f.rel);
    if (!has && DELIBERATE_NOINDEX.has(f.rel)) missing.push(f.rel);
  }
  return { unexpected, missing };
}

/* ══ PART 2/3 — canonical + hreflang ══════════════════════════════════════ */
function hreflangBlock(kind, slug) {
  const sibs = siblings(kind, slug);
  const lines = sibs.map(l => `  <link rel="alternate" hreflang="${HREF[l]}" href="${urlFor(l, kind, slug)}">`);
  // x-default points at English, the site's default locale.
  if (sibs.includes('en')) lines.push(`  <link rel="alternate" hreflang="x-default" href="${urlFor('en', kind, slug)}">`);
  return `  <!-- ks-hreflang:start — generated by scripts/harden-page-metadata.cjs -->\n${lines.join('\n')}\n  <!-- ks-hreflang:end -->`;
}

function patchLinks(f, src) {
  const msgs = [];
  const canonical = urlFor(f.lang, f.kind, f.slug);
  let out = src;

  // Drop any previous generated block, then every stray alternate line, so the
  // rebuild below is the single source of truth for this page.
  const before = out;
  out = out.replace(/[ \t]*<!-- ks-hreflang:start[\s\S]*?<!-- ks-hreflang:end -->\n?/g, '');
  // NOT line-anchored: every zh-tw page carries two alternate tags concatenated
  // onto one line, which a /^...$/m pattern silently skips. Consuming optional
  // leading indent and an optional trailing newline per tag collapses both the
  // one-per-line and the two-on-one-line layouts without leaving blank lines.
  out = out.replace(/[ \t]*<link rel="alternate" hreflang="[^"]*" href="[^"]*">[ \t]*\n?/gi, '');

  // Exactly one self-referential canonical.
  const canonRe = /^[ \t]*<link rel="canonical"[^>]*>[ \t]*\n/gim;
  const existing = [...before.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map(m => m[1]);
  out = out.replace(canonRe, '');
  if (existing.length === 0) msgs.push('canonical-added');
  else if (existing.length > 1) msgs.push(`canonical-deduped(${existing.length})`);
  else if (existing[0] !== canonical) msgs.push(`canonical-fixed(${existing[0]} -> ${canonical})`);

  const block = `  <link rel="canonical" href="${canonical}">\n${hreflangBlock(f.kind, f.slug)}\n`;

  // Re-anchor after the stylesheet link, else before </head>.
  if (/^[ \t]*<link rel="stylesheet" href="[^"]*style\.css">[ \t]*\n/im.test(out)) {
    out = out.replace(/^([ \t]*<link rel="stylesheet" href="[^"]*style\.css">[ \t]*\n)/im, `$1${block}`);
  } else {
    out = out.replace(/([ \t]*<\/head>)/i, `${block}$1`);
  }

  const oldSet = [...before.matchAll(/<link rel="alternate" hreflang="([^"]*)" href="([^"]*)"/g)];
  const newSet = [...out.matchAll(/<link rel="alternate" hreflang="([^"]*)" href="([^"]*)"/g)];
  if (oldSet.length !== newSet.length || oldSet.some((m, i) => m[0] !== newSet[i]?.[0]))
    msgs.push(`hreflang ${oldSet.length}->${newSet.length}`);
  return { out, msgs };
}

/* ══ PART 4 — schema.org ══════════════════════════════════════════════════ */
const ORG = {
  '@type': 'Organization',
  name: ORG_NAME,
  url: BASE,
  logo: { '@type': 'ImageObject', url: `${BASE}/assets/images/android-chrome-512x512.png` },
};
const PERSON = { '@type': 'Person', name: AUTHOR_NAME, url: `${BASE}/about` };

/* Type choice, page by page:
 *
 *   Course — the 10 lessons driven by learn/data/*.json (hangul, syllable-blocks,
 *     pronunciation, pronouns, nouns, grammar, speech-levels, emotions, shopping,
 *     vocabulary). These are not articles: they are ordered multi-stage syllabi
 *     with defined stages, per-stage timings, exercises and per-step progress
 *     tracking (KSProgress). schema.org/Course is "a description of an
 *     educational course which may be offered as distinct instances at which
 *     take place at different times" — which is exactly a self-paced online
 *     lesson, and it is the type Google documents for course rich results.
 *     Article would misdescribe a sequenced syllabus as a piece of writing.
 *
 *   LearningResource — the 4 prose guides (business-korean, classical-korean,
 *     dialogues, writing-essays) and the 2 study tools (flashcard,
 *     vocabulary-browser). These teach but have no stages, no ordering and no
 *     completion state, so Course's semantics (and its hasCourseInstance
 *     requirement) would be a false claim. LearningResource carries teaches /
 *     educationalLevel / learningResourceType without implying a syllabus.
 *
 * Root/legal pages keep whatever WebPage/WebSite/Organization graph they
 * already have; those blocks are only enriched, never replaced.            */
const TOOL_PAGES = new Set(['flashcard', 'vocabulary-browser']);
const RESOURCE_TYPE = {
  'flashcard': 'Flashcards',
  'vocabulary-browser': 'Vocabulary reference',
  'business-korean': 'Guide',
  'classical-korean': 'Guide',
  'dialogues': 'Guide',
  'writing-essays': 'Guide',
};

function schemaFor(f, src) {
  const url = urlFor(f.lang, f.kind, f.slug);
  const title = unesc((src.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1].trim());
  const desc = unesc((src.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1].trim());
  const { published, modified } = datesFor(f.rel);
  const isCourse = !!LESSON_JSON[f.slug] && !TOOL_PAGES.has(f.slug);

  const node = {
    '@context': 'https://schema.org',
    '@type': isCourse ? 'Course' : 'LearningResource',
    name: title,
    url,
    inLanguage: BCP[f.lang],
    isAccessibleForFree: true,
    author: PERSON,
    publisher: ORG,
  };
  if (desc) node.description = desc;
  if (published) node.datePublished = published;
  if (modified) node.dateModified = modified;

  const teaches = teachesFromJson(f.slug, f.lang) || teachesFromHeadings(src);
  if (teaches) node.teaches = teaches;
  if (LEVEL[f.slug]) node.educationalLevel = LEVEL[f.slug];

  // The subject taught is Korean regardless of the page's own language.
  node.about = { '@type': 'Thing', name: 'Korean language' };
  node.audience = { '@type': 'EducationalAudience', educationalRole: 'student' };

  if (isCourse) {
    node.provider = ORG;
    const inst = { '@type': 'CourseInstance', courseMode: 'online' };
    const w = workload(f.slug);
    if (w) inst.courseWorkload = w;   // omitted where the JSON has no timings
    node.hasCourseInstance = [inst];
  } else if (RESOURCE_TYPE[f.slug]) {
    node.learningResourceType = RESOURCE_TYPE[f.slug];
  }
  return node;
}

function patchSchema(f, src) {
  const msgs = [];
  let out = src;

  if (f.kind === 'learn') {
    const block = '  <!-- ks-schema:start — generated by scripts/harden-page-metadata.cjs -->\n' +
      '  <script type="application/ld+json">\n' +
      JSON.stringify(schemaFor(f, src), null, 2).split('\n').map(l => '  ' + l).join('\n') +
      '\n  </script>\n  <!-- ks-schema:end -->\n';

    const had = /<!-- ks-schema:start/.test(out);
    out = out.replace(/[ \t]*<!-- ks-schema:start[\s\S]*?<!-- ks-schema:end -->\n?/g, '');

    // Retire the pre-existing hand-written Course/LearningResource/WebPage
    // block this replaces. Anything else (WebSite, Organization, BreadcrumbList)
    // is left in place.
    let removed = 0;
    out = out.replace(/[ \t]*<script type="application\/ld\+json">([\s\S]*?)<\/script>[ \t]*\n?/g, (m, body) => {
      try {
        const o = JSON.parse(body);
        const t = [].concat(o['@type'] || []);
        if (t.some(x => ['Course', 'LearningResource', 'WebPage', 'Article'].includes(x))) { removed++; return ''; }
      } catch { /* leave unparseable blocks alone */ }
      return m;
    });

    if (/^[ \t]*<meta name="twitter:image"[^>]*>[ \t]*\n/im.test(out))
      out = out.replace(/^([ \t]*<meta name="twitter:image"[^>]*>[ \t]*\n)/im, `$1${block}`);
    else
      out = out.replace(/([ \t]*<\/head>)/i, `${block}$1`);

    msgs.push(had ? 'schema-regenerated' : (removed ? `schema-replaced(${removed})` : 'schema-added'));
    return { out, msgs };
  }

  // Root pages: enrich the existing WebPage node in place; never replace.
  const { published, modified } = datesFor(f.rel);
  out = out.replace(/([ \t]*)<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (m, ind, body) => {
    let o;
    try { o = JSON.parse(body); } catch { return m; }
    const nodes = Array.isArray(o['@graph']) ? o['@graph'] : [o];
    let touched = false;
    for (const n of nodes) {
      const t = [].concat(n['@type'] || []);
      if (!t.includes('WebPage')) continue;
      if (!n.inLanguage) { n.inLanguage = BCP[f.lang]; touched = true; }
      if (!n.publisher) { n.publisher = ORG; touched = true; }
      if (!n.author) { n.author = PERSON; touched = true; }
      if (!n.datePublished && published) { n.datePublished = published; touched = true; }
      if (!n.dateModified && modified) { n.dateModified = modified; touched = true; }
    }
    if (!touched) return m;
    msgs.push('root-schema-enriched');
    const json = JSON.stringify(o, null, 2).split('\n').map(l => ind + l).join('\n');
    return `${ind}<script type="application/ld+json">\n${json}\n${ind}</script>`;
  });
  return { out, msgs };
}

/* ══ PART 5 — titles + descriptions ═══════════════════════════════════════ */
function patchCopy(f, src) {
  const msgs = [];
  const c = COPY[f.rel];
  let out = src;
  if (!c) return { out, msgs };

  if (c.title) {
    const cur = (out.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1].trim();
    if (cur !== c.title) { out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(c.title)}</title>`); msgs.push('title'); }
  }
  if (c.desc) {
    if (/<meta name="description" content="/.test(out)) {
      const cur = unesc((out.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1]);
      if (cur !== c.desc) {
        out = out.replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(c.desc)}">`);
        msgs.push('desc-rewritten');
      }
    } else {
      out = out.replace(/(<title>[\s\S]*?<\/title>[ \t]*\n)/, `$1  <meta name="description" content="${esc(c.desc)}">\n`);
      msgs.push('desc-added');
    }
  }
  // Keep the social cards in step with the copy they mirror.
  const title = (out.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1].trim();
  const desc = (out.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1];
  for (const [prop, val] of [['og:title', title], ['twitter:title', title], ['og:description', desc], ['twitter:description', desc]]) {
    if (!val) continue;
    const attr = prop.startsWith('og:') ? 'property' : 'name';
    const re = new RegExp(`(<meta ${attr}="${prop}" content=")[^"]*(">)`);
    if (re.test(out)) out = out.replace(re, `$1${val}$2`);
  }
  const ogUrl = urlFor(f.lang, f.kind, f.slug);
  if (/<meta property="og:url" content="/.test(out))
    out = out.replace(/(<meta property="og:url" content=")[^"]*(">)/, `$1${ogUrl}$2`);
  return { out, msgs };
}

/* ══ Apply ════════════════════════════════════════════════════════════════ */
function apply() {
  for (const f of FILES) {
    const { src: orig, crlf } = read(f.rel);
    let src = orig;
    const msgs = [];
    // Copy first: schema reads the final title/description.
    for (const step of [patchCopy, patchLinks, patchSchema]) {
      const r = step(f, src);
      src = r.out; msgs.push(...r.msgs);
    }
    if (src !== orig) { write(f.rel, src, crlf); changed++; }
    note(f.rel, msgs);
  }
}

/* ══ Verification ═════════════════════════════════════════════════════════ */
function resolveUrl(u) {
  let p = u.replace(/^https:\/\/freekoreanschool\.com\/?/, '');
  if (p === '') p = 'index.html';
  for (const c of [p, p + '.html', p.replace(/\/$/, '') + '/index.html']) {
    const abs = path.join(ROOT, c);
    if (c && fs.existsSync(abs) && fs.statSync(abs).isFile()) return c;
  }
  return null;
}

function verify() {
  const problems = [];
  const seenTitle = {}, seenDesc = {};
  const hreflangMap = {};   // url -> {code -> url}

  const ni = auditNoindex();
  ni.unexpected.forEach(r => problems.push(`UNEXPECTED noindex: ${r}`));
  ni.missing.forEach(r => problems.push(`LOST deliberate noindex: ${r}`));

  for (const f of FILES) {
    const h = read(f.rel).src;
    const self = urlFor(f.lang, f.kind, f.slug);
    const p = [];

    // canonical
    const canon = [...h.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map(m => m[1]);
    if (canon.length !== 1) p.push(`CANON x${canon.length}`);
    else if (canon[0] !== self) p.push(`CANON ${canon[0]}`);

    // hreflang
    const hl = [...h.matchAll(/<link rel="alternate" hreflang="([^"]*)" href="([^"]*)"/g)];
    const map = {};
    for (const m of hl) {
      if (map[m[1]]) p.push(`DUP hreflang ${m[1]}`);
      map[m[1]] = m[2];
      if (!resolveUrl(m[2])) p.push(`404 hreflang ${m[1]} ${m[2]}`);
      if (/\.html$/.test(m[2])) p.push(`EXT hreflang ${m[1]}`);
      if (m[2] !== BASE + '/' && /\/$/.test(m[2])) p.push(`SLASH hreflang ${m[1]}`);
    }
    const expected = siblings(f.kind, f.slug);
    for (const l of expected) if (!map[HREF[l]]) p.push(`MISSING hreflang ${HREF[l]}`);
    if (!map['x-default']) p.push('MISSING x-default');
    if (map[HREF[f.lang]] !== self) p.push('NOT self-referential');
    hreflangMap[self] = map;

    // title / description
    const t = (h.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1].trim();
    const d = (h.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1].trim();
    if (!t) p.push('NO TITLE');
    if (!d) p.push('NO DESC');
    if (t.length > 70) p.push(`TITLE ${t.length}c`);
    // Length floors are script-aware: ja/zh-TW/th pack far more meaning per
    // character, so a 32-character Japanese description is a full sentence, not
    // a stub. Judging them on a Latin-script floor would flag good copy.
    const dense = ['ja', 'zh-tw', 'th'].includes(f.lang);
    const minD = dense ? 20 : 50;
    if (d && (d.length < minD || d.length > 320)) p.push(`DESC ${d.length}c`);
    if (t) (seenTitle[t] = seenTitle[t] || []).push(f.rel);
    if (d) (seenDesc[d] = seenDesc[d] || []).push(f.rel);

    // JSON-LD must parse, and learn pages must carry the generated block
    const lds = [...h.matchAll(/<script[^>]*ld\+json[^>]*>([\s\S]*?)<\/script>/g)].filter(m => m[1].trim());
    if (!lds.length) p.push('NO JSON-LD');
    for (const m of lds) { try { JSON.parse(m[1]); } catch { p.push('BAD JSON-LD'); } }
    if (f.kind === 'learn') {
      if (!/<!-- ks-schema:start/.test(h)) p.push('NO ks-schema block');
      const gen = lds.map(m => { try { return JSON.parse(m[1]); } catch { return {}; } })
        .find(o => ['Course', 'LearningResource'].includes(o['@type']));
      if (!gen) p.push('NO Course/LearningResource');
      else {
        for (const k of ['author', 'publisher', 'datePublished', 'dateModified', 'inLanguage', 'name', 'url'])
          if (!gen[k]) p.push(`LD missing ${k}`);
        if (gen.url !== self) p.push('LD url mismatch');
        if (gen.inLanguage !== BCP[f.lang]) p.push('LD inLanguage mismatch');
        if (gen['@type'] === 'Course' && !gen.hasCourseInstance) p.push('Course w/o hasCourseInstance');
      }
    }

    // the static lesson block must survive untouched
    if (f.kind === 'learn' && /lesson-static:start/.test(h)) {
      if (!/<details id="lesson-static"/.test(h)) p.push('lesson-static DAMAGED');
    }
    if (p.length) problems.push(`${f.rel.padEnd(38)} ${p.join(' ')}`);
  }

  // Reciprocity: if A lists B under code c, B must list A under A's own code.
  for (const [self, map] of Object.entries(hreflangMap)) {
    for (const [code, target] of Object.entries(map)) {
      if (code === 'x-default') continue;
      const back = hreflangMap[target];
      if (!back) { problems.push(`RECIPROCITY: ${self} -> ${target} (${code}) which publishes no set`); continue; }
      if (!Object.values(back).includes(self))
        problems.push(`RECIPROCITY: ${self} -> ${target} (${code}) does not point back`);
    }
  }

  for (const [t, files] of Object.entries(seenTitle))
    if (files.length > 1) problems.push(`DUP TITLE [${files.length}] "${t.slice(0, 60)}" :: ${files.join(', ')}`);
  for (const [d, files] of Object.entries(seenDesc))
    if (files.length > 1) problems.push(`DUP DESC [${files.length}] "${d.slice(0, 60)}" :: ${files.join(', ')}`);

  return problems;
}

/* ══ Main ═════════════════════════════════════════════════════════════════ */
if (!CHECK_ONLY) apply();

if (report.length) console.log(report.join('\n') + '\n');
if (unresolvedDates.length)
  console.log(`unresolved git history (used fallback): ${[...new Set(unresolvedDates)].length} file(s)\n` +
    [...new Set(unresolvedDates)].map(r => '  ' + r).join('\n') + '\n');

const problems = verify();
if (problems.length) {
  console.error(`VERIFICATION FAILED (${problems.length}):\n` + problems.map(p => '  ' + p).join('\n'));
  process.exit(1);
}
console.log(CHECK_ONLY
  ? `CHECK: ${FILES.length} pages — canonical, hreflang, schema and copy all clean.`
  : `Applied. ${changed} of ${FILES.length} file(s) written. Verification passed.`);
