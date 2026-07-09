#!/usr/bin/env node
'use strict';
/**
 * gen-sitemap.cjs
 * Single source of truth for sitemap.xml. Replaces the old inject-seo.mjs
 * sitemap section plus the accumulated add-fr-sitemap.cjs / patch-sitemap-de.cjs /
 * patch-sitemap-id.cjs patch scripts, which left de/fr/vi/th with zero <url>
 * entries and a wrong hreflang on the id entries.
 *
 * Usage: node scripts/gen-sitemap.cjs
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = 'https://freekoreanschool.com';
const TODAY = new Date().toISOString().slice(0, 10);

// Languages beyond English. Each maps to its own URL segment.
const LANGS = ['ja', 'zh-tw', 'es', 'de', 'fr', 'vi', 'th', 'id'];
const ALL_LOCALES = ['en', ...LANGS];

const ROOT_PAGES = [
  { slug: '',        priority: '1.0', changefreq: 'weekly'  },
  { slug: 'about',   priority: '0.6', changefreq: 'weekly'  },
  { slug: 'contact', priority: '0.6', changefreq: 'weekly'  },
  { slug: 'privacy', priority: '0.6', changefreq: 'weekly'  },
  { slug: 'terms',   priority: '0.6', changefreq: 'weekly'  },
  { slug: 'quiz',    priority: '0.7', changefreq: 'weekly'  },
];

const LEARN_PAGES = [
  'hangul', 'syllable-blocks', 'pronunciation', 'grammar', 'vocabulary',
  'nouns', 'pronouns', 'emotions', 'shopping', 'speech-levels', 'dialogues',
  'business-korean', 'classical-korean', 'writing-essays', 'flashcard',
  'vocabulary-browser',
];

const CULTURE_PAGES = [
  '', 'kpop', 'kdrama', 'kmovie', 'kfood', 'kbeauty', 'kfashion', 'kbbq',
  'kimchi', 'ramyeon', 'kchicken', 'mandu', 'kgaming', 'ksports', 'koreanthing',
];

const TRAVEL_PAGES = ['', 'cities', 'itineraries', 'planner', 'themes'];

// news/article.html and news/board.html are dynamic templates (no content
// without a query param) — only the index is a real crawlable page.
const NEWS_PAGES = [''];

function fileExists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

function localePrefix(locale) {
  return locale === 'en' ? '' : `${locale}/`;
}

// Build the canonical URL for a page in a given locale, and the relative
// file path so we can check it actually exists before emitting it.
function rootUrl(locale, slug) {
  const prefix = localePrefix(locale);
  const url = slug ? `${BASE}/${prefix}${slug}` : `${BASE}/${prefix}`;
  const file = slug ? `${prefix}${slug}.html` : `${prefix}index.html`;
  return { url, file };
}

function sectionUrl(section, locale, slug) {
  const dir = locale === 'en' ? section : `${section}/${locale}`;
  const url = slug ? `${BASE}/${dir}/${slug}` : `${BASE}/${dir}`;
  const file = slug ? `${dir}/${slug}.html` : `${dir}/index.html`;
  return { url, file };
}

const pages = []; // { url, file, changefreq, priority, group, key, locale }

for (const locale of ALL_LOCALES) {
  for (const rp of ROOT_PAGES) {
    const { url, file } = rootUrl(locale, rp.slug);
    if (!fileExists(file)) continue;
    pages.push({ url, file, changefreq: rp.changefreq, priority: rp.priority, group: 'root', key: rp.slug, locale });
  }
  for (const slug of LEARN_PAGES) {
    const { url, file } = sectionUrl('learn', locale, slug);
    if (!fileExists(file)) continue;
    pages.push({ url, file, changefreq: 'monthly', priority: '0.8', group: 'learn', key: slug, locale });
  }
  for (const slug of CULTURE_PAGES) {
    const { url, file } = sectionUrl('culture', locale, slug);
    if (!fileExists(file)) continue;
    pages.push({ url, file, changefreq: slug === '' ? 'weekly' : 'monthly', priority: slug === '' ? '0.9' : '0.8', group: 'culture', key: slug, locale });
  }
  for (const slug of TRAVEL_PAGES) {
    const { url, file } = sectionUrl('travel', locale, slug);
    if (!fileExists(file)) continue;
    pages.push({ url, file, changefreq: slug === '' ? 'weekly' : 'monthly', priority: slug === '' ? '0.9' : '0.8', group: 'travel', key: slug, locale });
  }
  for (const slug of NEWS_PAGES) {
    const { url, file } = sectionUrl('news', locale, slug);
    if (!fileExists(file)) continue;
    pages.push({ url, file, changefreq: 'daily', priority: '0.9', group: 'news', key: slug, locale });
  }
}

// Group pages by (group, key) so each cluster gets full hreflang alternates
// across every locale that actually has that page.
const clusters = new Map();
for (const p of pages) {
  const clusterKey = `${p.group}::${p.key}`;
  if (!clusters.has(clusterKey)) clusters.set(clusterKey, []);
  clusters.get(clusterKey).push(p);
}

function renderUrlBlock(page, cluster) {
  const alternates = cluster
    .slice()
    .sort((a, b) => ALL_LOCALES.indexOf(a.locale) - ALL_LOCALES.indexOf(b.locale))
    .map(c => `    <xhtml:link rel="alternate" hreflang="${c.locale === 'zh-tw' ? 'zh-TW' : c.locale}" href="${c.url}"/>`);

  const enEntry = cluster.find(c => c.locale === 'en');
  const xDefault = enEntry
    ? `    <xhtml:link rel="alternate" hreflang="x-default" href="${enEntry.url}"/>`
    : '';

  return [
    '  <url>',
    `    <loc>${page.url}</loc>`,
    `    <lastmod>${TODAY}</lastmod>`,
    `    <changefreq>${page.changefreq}</changefreq>`,
    `    <priority>${page.priority}</priority>`,
    ...alternates,
    ...(xDefault ? [xDefault] : []),
    '  </url>',
  ].join('\n');
}

const blocks = [];
for (const p of pages) {
  const clusterKey = `${p.group}::${p.key}`;
  blocks.push(renderUrlBlock(p, clusters.get(clusterKey)));
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${blocks.join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml, 'utf8');
console.log(`sitemap.xml written — ${pages.length} URLs across ${ALL_LOCALES.length} locales`);
