// Generate all learn/id/ HTML mirrors from the clean English chrome template.
// NOTE: learn/de/vocabulary.html (used by gen-learn-vi.cjs/gen-learn-th.cjs as their
// "German" source) is itself corrupted — it contains mislabeled Spanish content and a
// duplicated <!DOCTYPE>/<head>/<body> shell. To avoid inheriting that bug, this script
// sources chrome directly from the clean English learn/vocabulary.html and translates
// English → Indonesian directly.
'use strict';

const fs   = require('fs');
const path = require('path');

const LEARN_ID = path.join(__dirname, '..', 'learn', 'id');
const LEARN_EN = path.join(__dirname, '..', 'learn');

if (!fs.existsSync(LEARN_ID)) fs.mkdirSync(LEARN_ID, { recursive: true });

function buildHead({ title, desc, canonical, ja, zhTw, es, fr, de, en, schema }) {
  return `<!DOCTYPE html>
<html lang="id" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/assets/images/favicon-32x32.png" type="image/png" sizes="32x32">
  <link rel="icon" href="/assets/images/favicon-16x16.png" type="image/png" sizes="16x16">
  <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+KR:wght@300;400;500;700;900&family=Noto+Serif+KR:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../css/style.css">
  <link rel="canonical" href="https://freekoreanschool.com/learn/id/${canonical}">
  <link rel="alternate" hreflang="en" href="https://freekoreanschool.com/learn/${en}">
  <link rel="alternate" hreflang="ja" href="https://freekoreanschool.com/learn/ja/${ja}">
  <link rel="alternate" hreflang="zh-TW" href="https://freekoreanschool.com/learn/zh-tw/${zhTw}">
  <link rel="alternate" hreflang="es" href="https://freekoreanschool.com/learn/es/${es}">
  <link rel="alternate" hreflang="fr" href="https://freekoreanschool.com/learn/fr/${fr}">
  <link rel="alternate" hreflang="de" href="https://freekoreanschool.com/learn/de/${de}">
  <link rel="alternate" hreflang="id" href="https://freekoreanschool.com/learn/id/${canonical}">
  <link rel="alternate" hreflang="x-default" href="https://freekoreanschool.com/learn/${en}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:url" content="https://freekoreanschool.com/learn/id/${canonical}">
  <meta property="og:image" content="https://freekoreanschool.com/assets/images/og-image.webp">
  <meta property="og:site_name" content="Korean School 한국어 학교">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="https://freekoreanschool.com/assets/images/og-image.webp">
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>

  <meta name="google-adsense-account" content="ca-pub-6791974364232767">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6791974364232767" crossorigin="anonymous"></script>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-D94KSYG9DE"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-D94KSYG9DE');
  </script>
</head>`;
}

function schema(name, desc, url, level = 'Pemula hingga Mahir') {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description: desc,
    url: `https://freekoreanschool.com/learn/id/${url}`,
    isAccessibleForFree: true,
    inLanguage: "ko",
    provider: {
      "@type": "Organization",
      name: "Korean School 한국어 학교",
      url: "https://freekoreanschool.com",
      logo: "https://freekoreanschool.com/assets/images/android-chrome-512x512.png"
    },
    educationalLevel: level
  };
}

// Build chrome from the clean ENGLISH vocabulary.html (learn/de/vocabulary.html is
// corrupted — see file header comment — so we do NOT use it as a source).
const enVocab = fs.readFileSync(path.join(__dirname, '..', 'learn', 'vocabulary.html'), 'utf8');

const bodyIdx = enVocab.indexOf('<body>') + '<body>'.length;
let beforeMain = enVocab.slice(bodyIdx, enVocab.indexOf('<!-- ═══ MAIN CONTENT'));
let afterMain  = enVocab.slice(enVocab.indexOf('</main>') + 7);

// English → Indonesian chrome text, and path depth fix (source is one level
// shallower than learn/id/, e.g. "../index.html" → "../../id/index.html").
function adaptChrome(src) {
  return src
    .replace(/lang="en"/g, 'lang="id"')
    // path depth fixes (learn/vocabulary.html → learn/id/vocabulary.html)
    .replace(/href="\.\.\/index\.html"/g, 'href="../../id/index.html"')
    .replace(/href="\.\.\/culture\/index\.html"/g, 'href="../../culture/id/index.html"')
    .replace(/href="\.\.\/travel\/index\.html"/g, 'href="../../travel/id/index.html"')
    .replace(/href="\.\.\/news\/index\.html"/g, 'href="../../news/id/index.html"')
    .replace(/href="\.\.\/quiz\.html"/g, 'href="../../id/quiz.html"')
    .replace(/href="\.\.\/about\.html"/g, 'href="../../id/about.html"')
    .replace(/href="\.\.\/contact\.html"/g, 'href="../../id/contact.html"')
    .replace(/href="\.\.\/privacy\.html"/g, 'href="../../id/privacy.html"')
    .replace(/href="\.\.\/terms\.html"/g, 'href="../../id/terms.html"')
    // compound / multi-word phrases FIRST (must precede single-word rules below —
    // e.g. "Vocabulary" must be replaced before "Vocab" to avoid partial corruption)
    .replace(/Food &amp; Drink/g, 'Makanan & Minuman')
    .replace(/Days &amp; Time/g, 'Hari & Waktu')
    .replace(/Body Parts/g, 'Bagian Tubuh')
    .replace(/Media &amp; K-Culture/g, 'Media & K-Budaya')
    .replace(/Proverbs &amp; Idioms/g, 'Peribahasa & Idiom')
    .replace(/Academic Korean/g, 'Bahasa Korea Akademik')
    .replace(/News &amp; Society/g, 'Berita & Masyarakat')
    .replace(/Health &amp; Medicine/g, 'Kesehatan & Obat-obatan')
    .replace(/Verbs &amp; Actions/g, 'Kata Kerja & Aksi')
    .replace(/Common Nouns/g, 'Kata Benda Umum')
    .replace(/Sentence Structure/g, 'Struktur Kalimat')
    .replace(/Korean Particles/g, 'Partikel Bahasa Korea')
    .replace(/Verb Conjugation/g, 'Konjugasi Kata Kerja')
    .replace(/Question Forms/g, 'Bentuk Pertanyaan')
    .replace(/And, With/g, 'Dan, Dengan')
    .replace(/To\/From Someone/g, 'Kepada\/Dari Seseorang')
    .replace(/Telling Time/g, 'Menyebutkan Waktu')
    .replace(/Present Progressive/g, 'Bentuk Sedang Berlangsung')
    .replace(/Self Introduction/g, 'Perkenalan Diri')
    .replace(/Dates and Months/g, 'Tanggal dan Bulan')
    .replace(/Degree Adverbs/g, 'Kata Keterangan Derajat')
    .replace(/Nominalizer -는 것/g, 'Nominalisasi -는 것')
    .replace(/Comparatives/g, 'Perbandingan')
    .replace(/Imperative -\(으\)세요/g, 'Perintah -(으)세요')
    .replace(/Don&#39;t: -지 마세요/g, 'Jangan: -지 마세요')
    .replace(/Don't: -지 마세요/g, 'Jangan: -지 마세요')
    .replace(/Method: -\(으\)로/g, 'Cara: -(으)로')
    .replace(/Formal vs Informal/g, 'Formal vs Santai')
    .replace(/Expressing Emotions/g, 'Mengungkapkan Emosi')
    .replace(/Shopping Phrases/g, 'Frasa Belanja')
    .replace(/Writing Essays/g, 'Menulis Esai')
    .replace(/Business Korean/g, 'Bahasa Korea Bisnis')
    .replace(/Classical Korean/g, 'Bahasa Korea Klasik')
    .replace(/Korean Dialogues/g, 'Dialog Bahasa Korea')
    .replace(/Vocab Browser/g, 'Penjelajah Kosakata')
    .replace(/Hangul Alphabet/g, 'Alfabet Hangul')
    .replace(/Syllable Blocks/g, 'Blok Suku Kata')
    .replace(/Pronunciation Guide/g, 'Panduan Pelafalan')
    .replace(/Getting Started/g, 'Memulai')
    .replace(/Introduction/g, 'Pengantar')
    .replace(/Travel Guide/g, 'Panduan Wisata')
    .replace(/Korean News/g, 'Berita Korea')
    .replace(/About Us/g, 'Tentang Kami')
    .replace(/Privacy Policy/g, 'Kebijakan Privasi')
    .replace(/Terms of Use/g, 'Ketentuan Penggunaan')
    .replace(/Vocabulary/g, 'Kosakata')
    .replace(/A free Korean language learning platform — combining language study with K-culture, travel guides, and real-world practice\. For learners of every level, worldwide\./g,
             'Platform belajar bahasa Korea gratis — menggabungkan pembelajaran bahasa dengan K-budaya, panduan wisata, dan praktik dunia nyata. Untuk pembelajar semua level, di seluruh dunia.')
    .replace(/© 2026 한국어 학교\. Made with ❤️ for Korean learners worldwide\./g,
             '© 2026 한국어 학교. Dibuat dengan ❤️ untuk pembelajar bahasa Korea di seluruh dunia.')
    .replace(/\(Enjoy your learning!\)/g, '(Selamat belajar!)')
    // breadcrumb (appears in vocabulary/flashcard/vocabulary-browser pages)
    .replace(/>Home</g, '>Beranda<')
    // single words (safe — no remaining prefix-collision risk after the above)
    .replace(/\bLearn\b/g, 'Belajar')
    .replace(/K-Culture/g, 'K-Budaya')
    .replace(/Travel/g, 'Wisata')
    .replace(/News/g, 'Berita')
    .replace(/Quiz/g, 'Kuis')
    .replace(/Search lessons, vocabulary…/g, 'Cari pelajaran, kosakata…')
    .replace(/Search lessons\.\.\./g, 'Cari pelajaran...')
    .replace(/Toggle theme/g, 'Ganti tampilan')
    .replace(/Switch language/g, 'Ganti bahasa')
    .replace(/🇺🇸 EN/g, '🇮🇩 ID')
    .replace(/Vocab\b/g, 'Kosakata')
    .replace(/Greetings/g, 'Salam')
    .replace(/Numbers/g, 'Angka')
    .replace(/Family/g, 'Keluarga')
    .replace(/Colors/g, 'Warna')
    .replace(/Places/g, 'Tempat')
    .replace(/Emotions/g, 'Emosi')
    .replace(/Shopping/g, 'Belanja')
    .replace(/Weather/g, 'Cuaca')
    .replace(/Adjectives/g, 'Kata Sifat')
    .replace(/Workplace/g, 'Tempat Kerja')
    .replace(/Health/g, 'Kesehatan')
    .replace(/Media/g, 'Media')
    .replace(/Proverbs/g, 'Peribahasa')
    .replace(/Academic/g, 'Akademik')
    .replace(/Konglish/g, 'Konglish')
    .replace(/Pronouns/g, 'Kata Ganti')
    .replace(/Grammar/g, 'Tata Bahasa')
    .replace(/Connectors/g, 'Kata Sambung')
    .replace(/Counters/g, 'Kata Bantu Bilangan')
    .replace(/Beginner/g, 'Pemula')
    .replace(/Intermediate/g, 'Menengah')
    .replace(/Advanced/g, 'Mahir')
    .replace(/Tools/g, 'Alat Bantu')
    .replace(/Flashcards/g, 'Kartu Hafalan')
    .replace(/Explore/g, 'Jelajahi')
    .replace(/Company/g, 'Perusahaan')
    .replace(/Contact/g, 'Kontak');
}

beforeMain = adaptChrome(beforeMain);
afterMain  = adaptChrome(afterMain);

function buildStepRunnerPage({
  filename, title, desc, canonical, enPath, tag, h1, breadcrumb, metaItems, bullets,
  jsonFile, sidebarHref, prevHref, prevLabel, prevTitle, nextHref, nextLabel, nextTitle,
  extraSection = '', extraScripts = ''
}) {
  const head = buildHead({
    title, desc, canonical,
    ja: canonical, zhTw: canonical, es: canonical, fr: canonical, de: canonical, en: enPath,
    schema: schema(title, desc, canonical)
  });

  let chrome = beforeMain
    .replace(/class="sidebar-link active"/g, 'class="sidebar-link"')
    .replace(/class="sidebar-accordion-btn active"/g, 'class="sidebar-accordion-btn"');

  chrome = chrome.replace(
    `href="${sidebarHref}" class="sidebar-link"`,
    `href="${sidebarHref}" class="sidebar-link active"`
  );
  chrome = chrome.replace(
    `href="${sidebarHref}" class="sidebar-link" data-level`,
    `href="${sidebarHref}" class="sidebar-link active" data-level`
  );

  const footer = afterMain.replace(/<script[\s\S]*$/, '');

  const main = `
<!-- ═══ MAIN CONTENT ═══════════════════════════════════ -->
<main class="main-content" style="margin-left:var(--sidebar-width);padding-top:calc(var(--header-height) + 40px)">
  <div class="lesson-wrap">

    <div class="lesson-header animate-on-scroll">
      <div class="lesson-breadcrumb">
        <a href="../../id/index.html">Beranda</a>
        <span>›</span>
        <span>${breadcrumb}</span>
      </div>
      <div class="lesson-tag">${tag}</div>
      ${h1}
      <div class="lesson-meta">
        ${metaItems.map(m => `<span>${m}</span>`).join('\n        ')}
      </div>
      <ul class="lesson-intro-bullets">
        ${bullets.map(b => `<li>${b}</li>`).join('\n        ')}
      </ul>
    </div>

    <!-- ── Step-Runner Shell ─────────────────────────── -->
    <div id="step-shell">
      <div style="text-align:center;padding:60px 20px;color:var(--text-muted)">
        Memuat pelajaran…
      </div>
    </div>
${extraSection}
    <div class="lesson-nav-footer">
      <a href="${prevHref}" class="lesson-nav-btn">
        <span>←</span>
        <div>
          <span class="lesson-nav-label">${prevLabel}</span>
          <span class="lesson-nav-title">${prevTitle}</span>
        </div>
      </a>
      <a href="${nextHref}" class="lesson-nav-btn next">
        <span>→</span>
        <div>
          <span class="lesson-nav-label">${nextLabel}</span>
          <span class="lesson-nav-title">${nextTitle}</span>
        </div>
      </a>
    </div>

  </div>
</main>`;

  const scripts = `<script src="../../js/lang-core.js"></script>
<script src="../../js/langs/lang-id.js"></script>
<script src="../../js/app.js"></script>
${extraScripts}<script src="../../js/step-runner.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    StepRunner.init('/learn/data/${jsonFile}');${jsonFile === 'hangul.json' || jsonFile === 'syllable-blocks.json' ? "\n    HangulFreeBuilder.init('syllable-builder-widget');" : ''}
  });
</script>`;

  const out = `${head}
<body>
${chrome}
${main}

${footer}
${scripts}
</body>
</html>`;

  fs.writeFileSync(path.join(LEARN_ID, filename), out, 'utf8');
  console.log('✓ wrote', filename);
}

// ─── 1. hangul.html ───────────────────────────────────────────────────────────
buildStepRunnerPage({
  filename: 'hangul.html',
  title: 'Belajar Hangul dalam 1 Jam — 한글 | 한국어 학교',
  desc: 'Belajar alfabet bahasa Korea (Hangul) dalam kurang dari 1 jam. 6 tahap interaktif: konsonan, vokal, suku kata, bunyi khusus, vokal majemuk, dan membaca kata sungguhan.',
  canonical: 'hangul', enPath: 'hangul',
  tag: '✏️ Pemula · Pelajaran 1',
  h1: '<h1 class="lesson-title">Belajar Hangul dalam 1 Jam: <span class="grad-text">한글</span></h1>',
  breadcrumb: 'Alfabet Hangul',
  metaItems: ['🎯 6 Tahap · 84 Langkah', '📊 Pemula', '⏱️ ~60–90 menit', '⚡ Sistem XP + Beruntun'],
  bullets: [
    'Diciptakan pada 1443 oleh Raja Sejong yang Agung',
    'Alfabet fonetik — setiap simbol = satu bunyi',
    '6 tahap yang mencakup semua karakter Hangul',
    'Sebagian besar pembelajar selesai dalam kurang dari 90 menit'
  ],
  jsonFile: 'hangul.json',
  sidebarHref: 'hangul.html',
  prevHref: '../../id/index.html', prevLabel: 'Sebelumnya', prevTitle: 'Beranda',
  nextHref: 'syllable-blocks.html', nextLabel: 'Selanjutnya', nextTitle: 'Blok Suku Kata',
  extraSection: `
    <!-- ── Free-play Syllable Builder ──────────────────── -->
    <div class="lesson-section animate-on-scroll" style="margin-top:48px" id="syllable-builder-section">
      <h2><span class="section-num">+</span> Latihan Bebas</h2>
      <p>Setelah menyelesaikan tahap-tahap, coba bereksperimen bebas — gabungkan konsonan dan vokal apa saja dan dengarkan cara pelafalannya.</p>
      <div id="syllable-builder-widget"></div>
    </div>
`,
  extraScripts: '<script src="../../js/syllable-builder.js"></script>\n'
});

// ─── 2. syllable-blocks.html ──────────────────────────────────────────────────
buildStepRunnerPage({
  filename: 'syllable-blocks.html',
  title: 'Blok Suku Kata Korea — 음절 블록 | 한국어 학교',
  desc: 'Belajar cara menyusun blok suku kata Korea — posisi awal, tengah, dan akhir, pola CV/CVC, dan sistem blok persegi. 5 tahap interaktif.',
  canonical: 'syllable-blocks', enPath: 'syllable-blocks',
  tag: '🔷 Pemula · Pelajaran 2',
  h1: '<h1 class="lesson-title">Blok Suku Kata: <span class="grad-text">음절</span></h1>',
  breadcrumb: 'Blok Suku Kata',
  metaItems: ['🎯 5 Tahap · 61 Langkah', '📊 Pemula', '⏱️ ~45 menit', '⚡ Sistem XP + Beruntun'],
  bullets: [
    'Setiap suku kata Korea adalah blok persegi yang ringkas',
    'Konsonan dan vokal menumpuk pada posisi yang tetap',
    'Pelajari 4 pola struktur — CV, VC, CVC, dan lainnya',
    'Sebagian besar pembelajar selesai dalam kurang dari 45 menit'
  ],
  jsonFile: 'syllable-blocks.json',
  sidebarHref: 'syllable-blocks.html',
  prevHref: 'hangul.html', prevLabel: 'Sebelumnya', prevTitle: 'Alfabet Hangul',
  nextHref: 'pronunciation.html', nextLabel: 'Selanjutnya', nextTitle: 'Panduan Pelafalan',
  extraSection: `
    <!-- ── Free-play Syllable Builder ──────────────────── -->
    <div class="lesson-section animate-on-scroll" style="margin-top:48px" id="syllable-builder-section">
      <h2><span class="section-num">+</span> Latihan Membangun Suku Kata</h2>
      <p>Berlatih membangun suku kata secara bebas — gabungkan konsonan dan vokal apa saja dan dengarkan cara pelafalannya.</p>
      <div id="syllable-builder-widget"></div>
    </div>
`,
  extraScripts: '<script src="../../js/syllable-builder.js"></script>\n'
});

// ─── 3. pronunciation.html ────────────────────────────────────────────────────
buildStepRunnerPage({
  filename: 'pronunciation.html',
  title: 'Panduan Pelafalan Bahasa Korea — 발음 | 한국어 학교',
  desc: 'Kuasai pelafalan bahasa Korea dengan aturan perubahan bunyi, asimilasi, reduksi, dan lainnya. Langkah-langkah interaktif dengan audio di setiap langkah.',
  canonical: 'pronunciation', enPath: 'pronunciation',
  tag: '🔊 Pemula · Pelajaran 3',
  h1: '<h1 class="lesson-title">Panduan Pelafalan: <span class="grad-text">발음</span></h1>',
  breadcrumb: 'Panduan Pelafalan',
  metaItems: ['🎯 Beberapa Tahap', '📊 Pemula–Menengah', '⏱️ ~60 menit', '⚡ Sistem XP + Beruntun'],
  bullets: [
    'Konsonan berubah bunyi tergantung posisinya dalam suku kata',
    'Asimilasi, reduksi, dan proses fonologi penting lainnya',
    'Audio di setiap langkah untuk latihan mendengar instan',
    'Sangat penting untuk berbicara secara alami'
  ],
  jsonFile: 'pronunciation.json',
  sidebarHref: 'pronunciation.html',
  prevHref: 'syllable-blocks.html', prevLabel: 'Sebelumnya', prevTitle: 'Blok Suku Kata',
  nextHref: 'vocabulary.html', nextLabel: 'Selanjutnya', nextTitle: 'Kosakata'
});

// ─── 4. grammar.html ──────────────────────────────────────────────────────────
buildStepRunnerPage({
  filename: 'grammar.html',
  title: 'Tata Bahasa Korea — Panduan Lengkap | 한국어 학교',
  desc: 'Kuasai tata bahasa Korea melalui 26 tahap interaktif — urutan kata SOV, partikel, konjugasi, pertanyaan, dan pola tingkat lanjut.',
  canonical: 'grammar', enPath: 'grammar',
  tag: '📐 Menengah · Pelajaran 5',
  h1: '<h1 class="lesson-title">Tata Bahasa Korea: <span class="grad-text">문법</span></h1>',
  breadcrumb: 'Tata Bahasa Korea',
  metaItems: ['🎯 26 Tahap · 70 Langkah', '📊 Pemula–Mahir', '⏱️ ~90 menit', '⚡ Sistem XP + Beruntun'],
  bullets: [
    'Urutan kata SOV — kata kerja selalu di akhir',
    'Partikel menggantikan aturan posisi kata yang kaku',
    '26 tahap: dari kalimat sederhana hingga pola tingkat lanjut',
    'Sebagian besar pembelajar selesai dalam kurang dari 90 menit'
  ],
  jsonFile: 'grammar.json',
  sidebarHref: 'grammar.html',
  prevHref: 'vocabulary.html', prevLabel: 'Sebelumnya', prevTitle: 'Kosakata',
  nextHref: 'pronouns.html', nextLabel: 'Selanjutnya', nextTitle: 'Kata Ganti'
});

// ─── 5. nouns.html ────────────────────────────────────────────────────────────
buildStepRunnerPage({
  filename: 'nouns.html',
  title: 'Kata Benda Korea yang Umum — 명사 | 한국어 학교',
  desc: 'Pelajari kata benda paling penting dalam bahasa Korea — benda sehari-hari, tempat, orang, dan lainnya. Lengkap dengan audio dan latihan interaktif.',
  canonical: 'nouns', enPath: 'nouns',
  tag: '🏠 Pemula · Pelajaran',
  h1: '<h1 class="lesson-title">Kata Benda Umum: <span class="grad-text">명사</span></h1>',
  breadcrumb: 'Kata Benda Umum',
  metaItems: ['📊 Pemula', '🔊 Audio di setiap kartu', '⚡ Sistem XP + Beruntun'],
  bullets: [
    'Kata benda yang paling banyak digunakan dalam bahasa Korea sehari-hari',
    'Benda rumah tangga, makanan, tempat, dan orang',
    'Audio penutur asli di setiap kartu',
    'Kuis untuk mengunci ingatan'
  ],
  jsonFile: 'nouns.json',
  sidebarHref: 'nouns.html',
  prevHref: 'pronouns.html', prevLabel: 'Sebelumnya', prevTitle: 'Kata Ganti',
  nextHref: 'grammar.html', nextLabel: 'Selanjutnya', nextTitle: 'Tata Bahasa'
});

// ─── 6. pronouns.html ─────────────────────────────────────────────────────────
buildStepRunnerPage({
  filename: 'pronouns.html',
  title: 'Kata Ganti Korea — 대명사 | 한국어 학교',
  desc: 'Pelajari kata ganti orang dalam bahasa Korea — orang pertama, kedua, dan ketiga dengan tingkat kesopanan formal dan santai.',
  canonical: 'pronouns', enPath: 'pronouns',
  tag: '👥 Pemula · Pelajaran',
  h1: '<h1 class="lesson-title">Kata Ganti Korea: <span class="grad-text">대명사</span></h1>',
  breadcrumb: 'Kata Ganti Korea',
  metaItems: ['📊 Pemula', '🔊 Audio di setiap kartu', '⚡ Sistem XP + Beruntun'],
  bullets: [
    'Orang pertama, kedua, dan ketiga dalam bahasa Korea',
    'Membedakan formal dan santai (나 vs 저, 너 vs 당신)',
    'Kata tunjuk: 이, 그, 저',
    'Berlatih dengan kuis interaktif'
  ],
  jsonFile: 'pronouns.json',
  sidebarHref: 'pronouns.html',
  prevHref: 'vocabulary.html', prevLabel: 'Sebelumnya', prevTitle: 'Kosakata',
  nextHref: 'nouns.html', nextLabel: 'Selanjutnya', nextTitle: 'Kata Benda Umum'
});

// ─── 7. shopping.html ─────────────────────────────────────────────────────────
buildStepRunnerPage({
  filename: 'shopping.html',
  title: 'Belanja dalam Bahasa Korea — 쇼핑 | 한국어 학교',
  desc: 'Pelajari frasa belanja penting di Korea — menanyakan harga, menghitung angka, diskon, dan menemukan yang Anda butuhkan.',
  canonical: 'shopping', enPath: 'shopping',
  tag: '🛒 Menengah · Pelajaran',
  h1: '<h1 class="lesson-title">Belanja: <span class="grad-text">쇼핑</span></h1>',
  breadcrumb: 'Belanja dalam Bahasa Korea',
  metaItems: ['📊 Menengah', '🔊 Audio di setiap kartu', '⚡ Sistem XP + Beruntun'],
  bullets: [
    'Frasa penting untuk pasar dan toko Korea',
    'Berapa harganya? Apakah ada diskon? Apakah ada ukuran…?',
    'Kosakata transaksi: pembayaran, kembalian, tas',
    'Kuis untuk mengunci setiap frasa'
  ],
  jsonFile: 'shopping.json',
  sidebarHref: 'shopping.html',
  prevHref: 'emotions.html', prevLabel: 'Sebelumnya', prevTitle: 'Emosi',
  nextHref: 'speech-levels.html', nextLabel: 'Selanjutnya', nextTitle: 'Tingkat Kesopanan Bahasa'
});

// ─── 8. emotions.html ─────────────────────────────────────────────────────────
buildStepRunnerPage({
  filename: 'emotions.html',
  title: 'Mengungkapkan Emosi dalam Bahasa Korea — 감정 | 한국어 학교',
  desc: 'Pelajari cara mengungkapkan emosi dalam bahasa Korea — senang, sedih, marah, terkejut, dan lainnya. Kosakata emosi dengan pola kalimat nyata.',
  canonical: 'emotions', enPath: 'emotions',
  tag: '😊 Menengah · Pelajaran',
  h1: '<h1 class="lesson-title">Emosi: <span class="grad-text">감정</span></h1>',
  breadcrumb: 'Mengungkapkan Emosi',
  metaItems: ['📊 Menengah', '🔊 Audio di setiap kartu', '⚡ Sistem XP + Beruntun'],
  bullets: [
    'Kosakata emosi dari kehidupan nyata dan K-Drama',
    'Senang, sedih, marah, terkejut, takut, dan lainnya',
    'Kalimat lengkap: "Saya sangat senang", "Saya merasa sedih"',
    'Memahami bahasa Korea dalam film dan serial dengan lebih baik'
  ],
  jsonFile: 'emotions.json',
  sidebarHref: 'emotions.html',
  prevHref: 'speech-levels.html', prevLabel: 'Sebelumnya', prevTitle: 'Tingkat Kesopanan Bahasa',
  nextHref: 'shopping.html', nextLabel: 'Selanjutnya', nextTitle: 'Belanja'
});

// ─── 9. speech-levels.html ───────────────────────────────────────────────────
buildStepRunnerPage({
  filename: 'speech-levels.html',
  title: 'Tingkat Kesopanan Bahasa Korea — Formal vs Santai | 한국어 학교',
  desc: 'Kuasai tingkat kesopanan bahasa Korea — formal (합쇼체), sopan (해요체), dan santai (해체). Sangat penting untuk komunikasi nyata di Korea.',
  canonical: 'speech-levels', enPath: 'speech-levels',
  tag: '🗣️ Menengah · Pelajaran',
  h1: '<h1 class="lesson-title">Tingkat Kesopanan Bahasa: <span class="grad-text">말투</span></h1>',
  breadcrumb: 'Tingkat Kesopanan Bahasa',
  metaItems: ['📊 Menengah', '🔊 Audio di setiap kartu', '⚡ Sistem XP + Beruntun'],
  bullets: [
    'Bahasa Korea memiliki tingkat kesopanan yang wajib',
    'Formal (합쇼체), sopan (해요체), dan santai (해체)',
    'Kapan menggunakan tingkat yang mana: kerja, teman, orang asing',
    'Kesalahan umum dan cara menghindarinya'
  ],
  jsonFile: 'speech-levels.json',
  sidebarHref: 'speech-levels.html',
  prevHref: 'nouns.html', prevLabel: 'Sebelumnya', prevTitle: 'Kata Benda Umum',
  nextHref: 'emotions.html', nextLabel: 'Selanjutnya', nextTitle: 'Emosi'
});

// ─── STATIC PAGES ────────────────────────────────────────────────────────────
function buildStaticPage({ filename, title, desc, canonical, enPath, enFile }) {
  const enSrc = fs.readFileSync(path.join(LEARN_EN, enFile), 'utf8');

  const mainStart = enSrc.indexOf('<main ');
  const mainEnd   = enSrc.indexOf('</main>') + 7;
  const mainBlock = enSrc.slice(mainStart, mainEnd);

  const fixedMain = mainBlock
    .replace(/href="\.\.\/css\//g, 'href="../../css/')
    .replace(/src="\.\.\/js\//g,  'src="../../js/')
    .replace(/href="\.\.\/index\.html">Home</g, 'href="../../id/index.html">Beranda')
    .replace(/href="\.\.\/index\.html"/g, 'href="../../id/index.html"')
    .replace(/href="\.\.\/(hangul|syllable-blocks|pronunciation|grammar|nouns|pronouns|shopping|emotions|speech-levels|vocabulary|dialogues|business-korean|classical-korean|writing-essays|flashcard|vocabulary-browser)\.html"/g,
             'href="$1.html"')
    .replace(/(<a href="[a-z-]+\.html">)Learn(<\/a>)/g, '$1Belajar$2');

  const head = buildHead({
    title, desc, canonical,
    ja: canonical, zhTw: canonical, es: canonical, fr: canonical, de: canonical, en: enPath,
    schema: schema(title, desc, canonical)
  });

  let chrome = beforeMain
    .replace(/class="sidebar-link active"/g, 'class="sidebar-link"')
    .replace(/class="sidebar-accordion-btn active"/g, 'class="sidebar-accordion-btn"');

  const sidebarHref = canonical + '.html';
  chrome = chrome.replace(
    `href="${sidebarHref}" class="sidebar-link"`,
    `href="${sidebarHref}" class="sidebar-link active"`
  );

  const footer = afterMain.replace(/<script[\s\S]*$/, '');

  const out = `${head}
<body>
${chrome}

${fixedMain}

${footer}
<script src="../../js/lang-core.js"></script>
<script src="../../js/langs/lang-id.js"></script>
<script src="../../js/app.js"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(LEARN_ID, filename), out, 'utf8');
  console.log('✓ wrote', filename);
}

buildStaticPage({
  filename: 'dialogues.html',
  title: 'Dialog Bahasa Korea — 40 Percakapan Nyata | 한국어 학교',
  desc: '40 percakapan bahasa Korea sehari-hari — perkenalan diri, belanja, membuat janji, pekerjaan, makan, kesehatan, dan transportasi. Lengkap dengan audio dan romanisasi.',
  canonical: 'dialogues', enPath: 'dialogues', enFile: 'dialogues.html'
});

buildStaticPage({
  filename: 'business-korean.html',
  title: 'Bahasa Korea Bisnis — 비즈니스 한국어 | 한국어 학교',
  desc: 'Pelajari bahasa Korea profesional untuk tempat kerja — salam formal, kosakata rapat, frasa email, dan budaya perusahaan Korea.',
  canonical: 'business-korean', enPath: 'business-korean', enFile: 'business-korean.html'
});

buildStaticPage({
  filename: 'classical-korean.html',
  title: 'Bahasa Korea Klasik — 고전 한국어 | 한국어 학교',
  desc: 'Pengantar bahasa Korea klasik — teks sejarah, partikel kuno, bentuk kata kerja lama, dan pengaruh Hanja pada bahasa Korea modern.',
  canonical: 'classical-korean', enPath: 'classical-korean', enFile: 'classical-korean.html'
});

buildStaticPage({
  filename: 'writing-essays.html',
  title: 'Menulis Esai dalam Bahasa Korea — 한국어 작문 | 한국어 학교',
  desc: 'Pelajari cara menulis esai dan teks formal dalam bahasa Korea — struktur paragraf, kata sambung, gaya formal, dan kosakata akademik.',
  canonical: 'writing-essays', enPath: 'writing-essays', enFile: 'writing-essays.html'
});

// vocabulary.html — adapt from the clean English source (already loaded as enVocab)
const idVocabOut = enVocab
  .replace(/lang="en"/g, 'lang="id"')
  .replace(/href="\.\.\/index\.html"/g, 'href="../../id/index.html"')
  .replace(/href="\.\.\/culture\/index\.html"/g, 'href="../../culture/id/index.html"')
  .replace(/href="\.\.\/travel\/index\.html"/g, 'href="../../travel/id/index.html"')
  .replace(/href="\.\.\/news\/index\.html"/g, 'href="../../news/id/index.html"')
  .replace(/href="\.\.\/quiz\.html"/g, 'href="../../id/quiz.html"')
  .replace(/href="\.\.\/about\.html"/g, 'href="../../id/about.html"')
  .replace(/href="\.\.\/contact\.html"/g, 'href="../../id/contact.html"')
  .replace(/href="\.\.\/privacy\.html"/g, 'href="../../id/privacy.html"')
  .replace(/href="\.\.\/terms\.html"/g, 'href="../../id/terms.html"')
  .replace(/href="\.\.\/css\//g, 'href="../../css/')
  .replace(/src="\.\.\/js\//g, 'src="../../js/')
  .replace(/src="\.\.\/js\/lang-core\.js"/g, 'src="../../js/lang-core.js"></script>\n<script src="../../js/langs/lang-id.js"')
  .replace(/<link rel="canonical" href="https:\/\/freekoreanschool\.com\/learn\/vocabulary">/,
           '<link rel="canonical" href="https://freekoreanschool.com/learn/id/vocabulary">')
  .replace(/Loading vocabulary…/g, 'Memuat kosakata…')
  .replace(/No words match your search\./g, 'Tidak ada kata yang cocok dengan pencarian Anda.')
  .replace(/Failed to load vocabulary\./g, 'Gagal memuat kosakata.')
  .replace(/Search Korean, English, or romanization…/g, 'Cari bahasa Korea, Inggris, atau romanisasi…');
const idVocabChrome = adaptChrome(idVocabOut);
fs.writeFileSync(path.join(LEARN_ID, 'vocabulary.html'), idVocabChrome, 'utf8');
console.log('✓ wrote vocabulary.html');

// flashcard.html — adapt from clean English source
const enFlashcard = fs.readFileSync(path.join(__dirname, '..', 'learn', 'flashcard.html'), 'utf8');
const idFlashcard = adaptChrome(enFlashcard
  .replace(/lang="en"/g, 'lang="id"')
  .replace(/href="\.\.\/index\.html"/g, 'href="../../id/index.html"')
  .replace(/href="\.\.\/culture\/index\.html"/g, 'href="../../culture/id/index.html"')
  .replace(/href="\.\.\/travel\/index\.html"/g, 'href="../../travel/id/index.html"')
  .replace(/href="\.\.\/news\/index\.html"/g, 'href="../../news/id/index.html"')
  .replace(/href="\.\.\/quiz\.html"/g, 'href="../../id/quiz.html"')
  .replace(/href="\.\.\/about\.html"/g, 'href="../../id/about.html"')
  .replace(/href="\.\.\/contact\.html"/g, 'href="../../id/contact.html"')
  .replace(/href="\.\.\/privacy\.html"/g, 'href="../../id/privacy.html"')
  .replace(/href="\.\.\/terms\.html"/g, 'href="../../id/terms.html"')
  .replace(/href="\.\.\/css\//g, 'href="../../css/')
  .replace(/src="\.\.\/js\//g, 'src="../../js/')
  .replace(/src="\.\.\/js\/lang-core\.js"/g, 'src="../../js/lang-core.js"></script>\n<script src="../../js/langs/lang-id.js"'));
fs.writeFileSync(path.join(LEARN_ID, 'flashcard.html'), idFlashcard, 'utf8');
console.log('✓ wrote flashcard.html');

// vocabulary-browser.html — adapt from clean English source
const enVocabBrowser = fs.readFileSync(path.join(__dirname, '..', 'learn', 'vocabulary-browser.html'), 'utf8');
const idVocabBrowser = adaptChrome(enVocabBrowser
  .replace(/lang="en"/g, 'lang="id"')
  .replace(/href="\.\.\/index\.html"/g, 'href="../../id/index.html"')
  .replace(/href="\.\.\/culture\/index\.html"/g, 'href="../../culture/id/index.html"')
  .replace(/href="\.\.\/travel\/index\.html"/g, 'href="../../travel/id/index.html"')
  .replace(/href="\.\.\/news\/index\.html"/g, 'href="../../news/id/index.html"')
  .replace(/href="\.\.\/quiz\.html"/g, 'href="../../id/quiz.html"')
  .replace(/href="\.\.\/about\.html"/g, 'href="../../id/about.html"')
  .replace(/href="\.\.\/contact\.html"/g, 'href="../../id/contact.html"')
  .replace(/href="\.\.\/privacy\.html"/g, 'href="../../id/privacy.html"')
  .replace(/href="\.\.\/terms\.html"/g, 'href="../../id/terms.html"')
  .replace(/href="\.\.\/css\//g, 'href="../../css/')
  .replace(/src="\.\.\/js\//g, 'src="../../js/')
  .replace(/src="\.\.\/js\/lang-core\.js"/g, 'src="../../js/lang-core.js"></script>\n<script src="../../js/langs/lang-id.js"'));
fs.writeFileSync(path.join(LEARN_ID, 'vocabulary-browser.html'), idVocabBrowser, 'utf8');
console.log('✓ wrote vocabulary-browser.html');

console.log('\nDone! All learn/id/ files generated.');
