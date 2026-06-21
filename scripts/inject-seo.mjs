/**
 * inject-seo.mjs
 * Injects canonical, Open Graph, hreflang, and Schema.org tags into every
 * public HTML page, then writes sitemap.xml.
 *
 * Usage:  node scripts/inject-seo.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BASE = 'https://freekoreanschool.com';
const OG_IMG = `${BASE}/assets/images/og-image.webp`;
const LOGO = `${BASE}/assets/images/android-chrome-512x512.png`;

// ─── Page manifest ────────────────────────────────────────────────────────────
// schema: 'home' | 'course' | 'article' | 'newsarticle' | 'webpage'
// lang:   'en' (default) | 'ja'
// ja:     canonical path of the Japanese counterpart (EN pages only)
// en:     canonical path of the English counterpart (JA pages only)
// desc:   fallback description (used when the page has no <meta name="description">)
// noSitemap: true → exclude from sitemap.xml
const PAGES = [
  // ── Root EN ──────────────────────────────────────────────────────────────
  { file: 'index.html',   canonical: '/',       schema: 'home' },
  { file: 'about.html',   canonical: '/about',   schema: 'webpage', ja: '/ja/about' },
  { file: 'contact.html', canonical: '/contact', schema: 'webpage', ja: '/ja/contact' },
  { file: 'privacy.html', canonical: '/privacy', schema: 'webpage', ja: '/ja/privacy' },
  { file: 'terms.html',   canonical: '/terms',   schema: 'webpage', ja: '/ja/terms' },
  { file: 'quiz.html',    canonical: '/quiz',    schema: 'webpage' },
  {
    file: 'search.html',  canonical: '/search',  schema: 'webpage',
    desc: 'Search Korean School — find lessons, vocabulary, culture guides, and Korean news.',
    noSitemap: true,
  },

  // ── Root JA ──────────────────────────────────────────────────────────────
  { file: 'ja/about.html',   canonical: '/ja/about',   schema: 'webpage', lang: 'ja', en: '/about' },
  { file: 'ja/contact.html', canonical: '/ja/contact', schema: 'webpage', lang: 'ja', en: '/contact' },
  { file: 'ja/privacy.html', canonical: '/ja/privacy', schema: 'webpage', lang: 'ja', en: '/privacy' },
  { file: 'ja/terms.html',   canonical: '/ja/terms',   schema: 'webpage', lang: 'ja', en: '/terms' },

  // ── Learn ─────────────────────────────────────────────────────────────────
  { file: 'learn/hangul.html',          canonical: '/learn/hangul',          schema: 'course' },
  { file: 'learn/syllable-blocks.html', canonical: '/learn/syllable-blocks', schema: 'course' },
  { file: 'learn/pronunciation.html',   canonical: '/learn/pronunciation',   schema: 'course' },
  { file: 'learn/grammar.html',         canonical: '/learn/grammar',         schema: 'course' },
  { file: 'learn/vocabulary.html',      canonical: '/learn/vocabulary',      schema: 'course' },
  { file: 'learn/nouns.html',           canonical: '/learn/nouns',           schema: 'course' },
  { file: 'learn/pronouns.html',        canonical: '/learn/pronouns',        schema: 'course' },
  { file: 'learn/emotions.html',        canonical: '/learn/emotions',        schema: 'course' },
  { file: 'learn/shopping.html',        canonical: '/learn/shopping',        schema: 'course' },
  { file: 'learn/speech-levels.html',   canonical: '/learn/speech-levels',   schema: 'course' },
  { file: 'learn/dialogues.html',       canonical: '/learn/dialogues',       schema: 'course' },
  { file: 'learn/business-korean.html', canonical: '/learn/business-korean', schema: 'course' },
  { file: 'learn/classical-korean.html',canonical: '/learn/classical-korean',schema: 'course' },
  {
    file: 'learn/writing-essays.html',  canonical: '/learn/writing-essays',  schema: 'course',
    desc: 'Learn to write Korean essays — structure, connectives, formal style, and essay vocabulary.',
  },
  {
    file: 'learn/flashcard.html',       canonical: '/learn/flashcard',       schema: 'webpage',
    desc: 'Korean flashcard practice — review vocabulary and grammar with spaced-repetition flashcards.',
  },

  // ── Culture ───────────────────────────────────────────────────────────────
  { file: 'culture/index.html',      canonical: '/culture',           schema: 'webpage' },
  { file: 'culture/kpop.html',       canonical: '/culture/kpop',      schema: 'article' },
  { file: 'culture/kdrama.html',     canonical: '/culture/kdrama',    schema: 'article' },
  { file: 'culture/kmovie.html',     canonical: '/culture/kmovie',    schema: 'article' },
  { file: 'culture/kfood.html',      canonical: '/culture/kfood',     schema: 'article' },
  { file: 'culture/kbeauty.html',    canonical: '/culture/kbeauty',   schema: 'article' },
  { file: 'culture/kfashion.html',   canonical: '/culture/kfashion',  schema: 'article' },
  { file: 'culture/kbbq.html',       canonical: '/culture/kbbq',      schema: 'article' },
  { file: 'culture/kimchi.html',     canonical: '/culture/kimchi',    schema: 'article' },
  { file: 'culture/ramyeon.html',    canonical: '/culture/ramyeon',   schema: 'article' },
  { file: 'culture/kchicken.html',   canonical: '/culture/kchicken',  schema: 'article' },
  { file: 'culture/mandu.html',      canonical: '/culture/mandu',     schema: 'article' },
  { file: 'culture/kgaming.html',    canonical: '/culture/kgaming',   schema: 'article' },
  { file: 'culture/ksports.html',    canonical: '/culture/ksports',   schema: 'article' },
  { file: 'culture/koreanthing.html',canonical: '/culture/koreanthing',schema: 'article' },
  // traditions.html moved — canonical points to koreanthing; excluded from sitemap
  {
    file: 'culture/traditions.html', canonical: '/culture/koreanthing', schema: 'webpage',
    noSitemap: true,
  },

  // ── Travel EN ─────────────────────────────────────────────────────────────
  { file: 'travel/index.html',       canonical: '/travel',              schema: 'webpage', ja: '/travel/ja' },
  { file: 'travel/cities.html',      canonical: '/travel/cities',       schema: 'article', ja: '/travel/ja/cities' },
  { file: 'travel/itineraries.html', canonical: '/travel/itineraries',  schema: 'article', ja: '/travel/ja/itineraries' },
  { file: 'travel/planner.html',     canonical: '/travel/planner',      schema: 'webpage', ja: '/travel/ja/planner' },
  { file: 'travel/themes.html',      canonical: '/travel/themes',       schema: 'article', ja: '/travel/ja/themes' },

  // ── Travel JA ─────────────────────────────────────────────────────────────
  { file: 'travel/ja/index.html',       canonical: '/travel/ja',              schema: 'webpage', lang: 'ja', en: '/travel' },
  { file: 'travel/ja/cities.html',      canonical: '/travel/ja/cities',       schema: 'article', lang: 'ja', en: '/travel/cities' },
  { file: 'travel/ja/itineraries.html', canonical: '/travel/ja/itineraries',  schema: 'article', lang: 'ja', en: '/travel/itineraries' },
  { file: 'travel/ja/planner.html',     canonical: '/travel/ja/planner',      schema: 'webpage', lang: 'ja', en: '/travel/planner' },
  { file: 'travel/ja/themes.html',      canonical: '/travel/ja/themes',       schema: 'article', lang: 'ja', en: '/travel/themes' },

  // ── News EN ───────────────────────────────────────────────────────────────
  { file: 'news/index.html', canonical: '/news',       schema: 'webpage',    ja: '/news/ja' },
  { file: 'news/board.html', canonical: '/news/board', schema: 'webpage',    ja: '/news/ja/board' },
  // article.html already has full OG/canonical set up dynamically — skip via canonical check
  { file: 'news/article.html', canonical: '/news/article', schema: 'newsarticle', ja: '/news/ja/article' },

  // ── News JA ───────────────────────────────────────────────────────────────
  { file: 'news/ja/index.html', canonical: '/news/ja',       schema: 'webpage',    lang: 'ja', en: '/news' },
  { file: 'news/ja/board.html', canonical: '/news/ja/board', schema: 'webpage',    lang: 'ja', en: '/news/board' },
  { file: 'news/ja/article.html', canonical: '/news/ja/article', schema: 'newsarticle', lang: 'ja', en: '/news/article' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function getTitle(html) {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m ? m[1].trim() : 'Korean School 한국어 학교';
}

function getDescription(html) {
  const m = html.match(/<meta\s+(?:id="[^"]*"\s+)?name="description"\s+content="([^"]+)"/i)
            || html.match(/<meta\s+name="description"\s+(?:id="[^"]*"\s+)?content="([^"]+)"/i);
  return m ? m[1].trim() : '';
}

function schemaJson(opts) {
  const { schema, title, desc, url } = opts;
  const publisher = {
    '@type': 'Organization',
    name: 'Korean School 한국어 학교',
    url: BASE,
    logo: LOGO,
  };

  switch (schema) {
    case 'home':
      return {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            name: 'Korean School 한국어 학교',
            url: BASE,
            logo: LOGO,
            description: desc,
            sameAs: [],
          },
          {
            '@type': 'WebSite',
            name: 'Korean School 한국어 학교',
            url: BASE,
            potentialAction: {
              '@type': 'SearchAction',
              target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/search?q={search_term_string}` },
              'query-input': 'required name=search_term_string',
            },
          },
        ],
      };

    case 'course':
      return {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: title,
        description: desc,
        url,
        isAccessibleForFree: true,
        inLanguage: 'ko',
        provider: publisher,
        educationalLevel: 'Beginner to Advanced',
      };

    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: desc,
        url,
        image: OG_IMG,
        inLanguage: 'en',
        isAccessibleForFree: true,
        publisher,
      };

    case 'newsarticle':
      return {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: title,
        description: desc,
        url,
        image: OG_IMG,
        isAccessibleForFree: true,
        publisher,
      };

    default: // webpage
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description: desc,
        url,
        isPartOf: { '@type': 'WebSite', name: 'Korean School 한국어 학교', url: BASE },
      };
  }
}

function buildBlock(page, title, desc) {
  const { canonical, schema, lang = 'en', ja, en } = page;
  const canonicalUrl = `${BASE}${canonical}`;
  const ogType = (schema === 'article' || schema === 'newsarticle' || schema === 'course')
    ? 'article' : 'website';

  const hreflangLines = [];
  if (lang === 'en' && ja) {
    hreflangLines.push(`  <link rel="alternate" hreflang="en" href="${BASE}${canonical}">`);
    hreflangLines.push(`  <link rel="alternate" hreflang="ja" href="${BASE}${ja}">`);
    hreflangLines.push(`  <link rel="alternate" hreflang="x-default" href="${BASE}${canonical}">`);
  } else if (lang === 'ja' && en) {
    hreflangLines.push(`  <link rel="alternate" hreflang="ja" href="${BASE}${canonical}">`);
    hreflangLines.push(`  <link rel="alternate" hreflang="en" href="${BASE}${en}">`);
    hreflangLines.push(`  <link rel="alternate" hreflang="x-default" href="${BASE}${en}">`);
  }

  const schema_json = JSON.stringify(schemaJson({ schema, title, desc, url: canonicalUrl }), null, 2);

  return [
    `  <link rel="canonical" href="${canonicalUrl}">`,
    `  <meta property="og:type" content="${ogType}">`,
    `  <meta property="og:title" content="${esc(title)}">`,
    `  <meta property="og:description" content="${esc(desc)}">`,
    `  <meta property="og:url" content="${canonicalUrl}">`,
    `  <meta property="og:image" content="${OG_IMG}">`,
    `  <meta property="og:site_name" content="Korean School 한국어 학교">`,
    `  <meta name="twitter:card" content="summary_large_image">`,
    `  <meta name="twitter:title" content="${esc(title)}">`,
    `  <meta name="twitter:description" content="${esc(desc)}">`,
    `  <meta name="twitter:image" content="${OG_IMG}">`,
    ...hreflangLines,
    `  <script type="application/ld+json">`,
    schema_json,
    `  </script>`,
  ].join('\n');
}

// ─── Process files ─────────────────────────────────────────────────────────────

let updated = 0, skipped = 0, missing = 0;

for (const page of PAGES) {
  const filePath = path.join(ROOT, page.file);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  NOT FOUND: ${page.file}`);
    missing++;
    continue;
  }

  let html = fs.readFileSync(filePath, 'utf-8');

  // Skip if a static canonical is already present (dynamic empty-href ones are fine to re-inject)
  // news/article.html has <link id="canonical" rel="canonical" href=""> — skip it
  if (/rel="canonical"\s+href="[^"]+"/.test(html)) {
    console.log(`⏭  SKIP (canonical exists): ${page.file}`);
    skipped++;
    continue;
  }

  const title = getTitle(html);
  const desc  = getDescription(html) || page.desc || title;
  const block = buildBlock(page, title, desc);

  // Insert SEO block right before </head>
  const patched = html.replace(/(\s*)<\/head>/, `\n${block}\n$1</head>`);

  if (patched === html) {
    console.warn(`⚠️  Could not find </head> in: ${page.file}`);
    continue;
  }

  fs.writeFileSync(filePath, patched, 'utf-8');
  console.log(`✅  ${page.file}`);
  updated++;
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped, ${missing} not found.\n`);

// ─── Generate sitemap.xml ─────────────────────────────────────────────────────

const NOW = new Date().toISOString().slice(0, 10);

function priority(page) {
  if (page.canonical === '/') return '1.0';
  if (['/culture', '/travel', '/news'].includes(page.canonical)) return '0.9';
  if ((page.lang || 'en') === 'ja') return '0.6';
  if (['/privacy', '/terms', '/contact', '/about', '/quiz'].includes(page.canonical)) return '0.6';
  return '0.8';
}

function changefreq(page) {
  if (page.schema === 'newsarticle' || page.canonical === '/news') return 'daily';
  if (page.schema === 'article' || page.schema === 'course') return 'monthly';
  return 'weekly';
}

const sitemapPages = PAGES.filter(p => !p.noSitemap);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapPages.map(p => {
  const url = `${BASE}${p.canonical}`;
  const lang = p.lang || 'en';
  const altEn = p.en ? `${BASE}${p.en}` : null;
  const altJa = p.ja ? `${BASE}${p.ja}` : null;

  const alts = [];
  if (altEn) {
    alts.push(`    <xhtml:link rel="alternate" hreflang="en" href="${altEn}"/>`);
    alts.push(`    <xhtml:link rel="alternate" hreflang="ja" href="${url}"/>`);
    alts.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${altEn}"/>`);
  } else if (altJa) {
    alts.push(`    <xhtml:link rel="alternate" hreflang="en" href="${url}"/>`);
    alts.push(`    <xhtml:link rel="alternate" hreflang="ja" href="${altJa}"/>`);
    alts.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${url}"/>`);
  }

  return [
    `  <url>`,
    `    <loc>${url}</loc>`,
    `    <lastmod>${NOW}</lastmod>`,
    `    <changefreq>${changefreq(p)}</changefreq>`,
    `    <priority>${priority(p)}</priority>`,
    ...alts,
    `  </url>`,
  ].join('\n');
}).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf-8');
console.log(`✅  sitemap.xml  (${sitemapPages.length} URLs)`);
