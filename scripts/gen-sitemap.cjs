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
const { live } = require('./_locales.cjs');

const ROOT = path.join(__dirname, '..');
const BASE = 'https://freekoreanschool.com';
const TODAY = new Date().toISOString().slice(0, 10);

/* ── Per-file <lastmod>, from real git history ────────────────────────────
   Every URL used to be stamped with TODAY, so all 378 entries carried an
   identical date that advanced on every regeneration. A sitemap whose every
   lastmod moves in lockstep tells Google nothing, and Google stops reading
   the field for the whole site once it notices.

   One `git log` pass, newest commit first, listing the files each commit
   touched: the first date a path appears under is its true last-modified
   date. Files git has never seen (untracked, or a checkout with no history)
   fall back to TODAY, which is the honest answer for a brand-new page.      */
const gitDates = (() => {
  const map = new Map();
  try {
    const raw = require('child_process').execSync(
      'git log --pretty=format:%x00%cs --name-only --no-renames',
      { cwd: ROOT, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] }
    );
    let date = null;
    for (const line of raw.split('\n')) {
      if (line.startsWith('\0')) { date = line.slice(1).trim(); continue; }
      const p = line.trim();
      // First sighting wins — the log is newest-first.
      if (p && date && !map.has(p)) map.set(p, date);
    }
  } catch {
    // No git, or not a repo. Everything falls back to TODAY below.
  }
  return map;
})();

function lastmodFor(file) {
  return gitDates.get(file.split(path.sep).join('/')) || TODAY;
}

/* ── Locales, from the registry (scripts/_locales.cjs) ─────────────────────
   Only `status: 'live'` locales are emitted: a 'planned' locale has no pages
   on disk, and listing one would put 404s in the sitemap.

   ⚠️ EMISSION ORDER. The registry's own order is en, zh-tw, ja, es, fr, de,
   vi, th, id. This script has emitted en, ja, zh-tw, es, de, fr, vi, th, id
   into the committed sitemap.xml since it was written. hreflang order and
   <url> order are both semantically irrelevant to Google, but reordering
   would rewrite all 378 <url> blocks for no benefit and bury any real future
   change in the noise. So the legacy order is preserved explicitly here and
   NEW locales append after it in registry order. The SET is the registry's;
   only the sequence is pinned. */
const LEGACY_ORDER = ['en', 'ja', 'zh-tw', 'es', 'de', 'fr', 'vi', 'th', 'id'];
const LOCALES = live()
  .map((l, i) => ({ l, i }))
  .sort((a, b) => {
    const ra = LEGACY_ORDER.indexOf(a.l.code), rb = LEGACY_ORDER.indexOf(b.l.code);
    return (ra < 0 ? LEGACY_ORDER.length : ra) - (rb < 0 ? LEGACY_ORDER.length : rb) || a.i - b.i;
  })
  .map(x => x.l);
const ALL_LOCALES = LOCALES.map(l => l.code);
/* directory segment -> BCP-47 hreflang code (`zh-tw` ships as `zh-TW`) */
const HREFLANG = Object.fromEntries(LOCALES.map(l => [l.code, l.hreflang]));

// Root-level pages are enumerated explicitly because the root directory also
// holds non-page HTML. Everything else is discovered from the filesystem so a
// new lesson/culture/travel page is picked up without editing this script.
const ROOT_PAGES = [
  { slug: '',        priority: '1.0', changefreq: 'weekly'  },
  { slug: 'about',   priority: '0.6', changefreq: 'weekly'  },
  { slug: 'contact', priority: '0.6', changefreq: 'weekly'  },
  { slug: 'privacy', priority: '0.6', changefreq: 'weekly'  },
  { slug: 'terms',   priority: '0.6', changefreq: 'weekly'  },
  { slug: 'quiz',    priority: '0.7', changefreq: 'weekly'  },
  { slug: 'search',  priority: '0.4', changefreq: 'weekly'  },
];

// Sections whose slugs are discovered by scanning the English directory.
// The union across every locale is used, so a page that exists only in a
// translated locale is still emitted.
const SECTIONS = ['learn', 'culture', 'travel'];

// Never emit these regardless of what is on disk: admin tooling.
const SLUG_DENYLIST = new Set(['admin']);

function fileExists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

// A page carrying <meta name="robots" content="...noindex..."> must never be
// listed. Search Console reports every such URL as "Submitted URL marked
// noindex", which is what sank the previous submission.
const NOINDEX_RE = /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i;
const noindexCache = new Map();
function isNoindex(rel) {
  if (noindexCache.has(rel)) return noindexCache.get(rel);
  let flagged = false;
  try {
    flagged = NOINDEX_RE.test(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
  } catch (_) { /* missing file is handled by fileExists */ }
  noindexCache.set(rel, flagged);
  return flagged;
}

// Discover the slug set for a section as the union over all locales.
function discoverSlugs(section) {
  const slugs = new Set();
  for (const locale of ALL_LOCALES) {
    const dir = path.join(ROOT, locale === 'en' ? section : `${section}/${locale}`);
    let entries = [];
    try { entries = fs.readdirSync(dir); } catch (_) { continue; }
    for (const e of entries) {
      if (!e.endsWith('.html')) continue;
      const slug = e === 'index.html' ? '' : e.slice(0, -5);
      if (SLUG_DENYLIST.has(slug)) continue;
      slugs.add(slug);
    }
  }
  return [...slugs].sort();
}

function sectionMeta(section, slug) {
  if (section === 'learn')   return { changefreq: 'monthly', priority: '0.8' };
  return slug === ''
    ? { changefreq: 'weekly',  priority: '0.9' }
    : { changefreq: 'monthly', priority: '0.8' };
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
const skipped = { missing: 0, noindex: [] };

function consider(page) {
  if (!fileExists(page.file)) { skipped.missing++; return; }
  if (isNoindex(page.file)) { skipped.noindex.push(page.file); return; }
  pages.push(page);
}

const sectionSlugs = new Map(SECTIONS.map(s => [s, discoverSlugs(s)]));

for (const locale of ALL_LOCALES) {
  for (const rp of ROOT_PAGES) {
    const { url, file } = rootUrl(locale, rp.slug);
    consider({ url, file, changefreq: rp.changefreq, priority: rp.priority, group: 'root', key: rp.slug, locale });
  }
  for (const section of SECTIONS) {
    for (const slug of sectionSlugs.get(section)) {
      const { url, file } = sectionUrl(section, locale, slug);
      const { changefreq, priority } = sectionMeta(section, slug);
      consider({ url, file, changefreq, priority, group: section, key: slug, locale });
    }
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
    .map(c => `    <xhtml:link rel="alternate" hreflang="${HREFLANG[c.locale]}" href="${c.url}"/>`);

  const enEntry = cluster.find(c => c.locale === 'en');
  const xDefault = enEntry
    ? `    <xhtml:link rel="alternate" hreflang="x-default" href="${enEntry.url}"/>`
    : '';

  return [
    '  <url>',
    `    <loc>${page.url}</loc>`,
    `    <lastmod>${lastmodFor(page.file)}</lastmod>`,
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

const byGroup = {};
for (const p of pages) byGroup[p.group] = (byGroup[p.group] || 0) + 1;
for (const [g, n] of Object.entries(byGroup).sort()) console.log(`  ${g}: ${n}`);
console.log(`excluded: ${skipped.noindex.length} noindex, ${skipped.missing} not-on-disk`);
