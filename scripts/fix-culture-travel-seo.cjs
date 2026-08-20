#!/usr/bin/env node
/**
 * fix-culture-travel-seo.cjs — Wave 2 AdSense remediation for culture/ + travel/.
 *
 *   node scripts/fix-culture-travel-seo.cjs           # apply
 *   node scripts/fix-culture-travel-seo.cjs --check   # verify only, exit 1 on drift
 *
 * IDEMPOTENT. Every mutation is either a full regeneration of a marker-delimited
 * block or a guarded insert, so re-running is a no-op. This is a script rather
 * than hand edits because concurrent site-wide generators have twice reverted
 * hand-applied work to HEAD; re-running this file restores it in one command.
 *
 * SCOPE: the <head> region and JSON-LD of culture/**.html and travel/**.html,
 * plus ONE guarded <body> insert (the visible byline, anchored to `</h1>`).
 * Nothing under learn/, news/, the root pages, or sitemap.xml is touched.
 *
 * ── Background ────────────────────────────────────────────────────────────
 * AdSense rejected the site for "Low value content". Wave 1 fixed the content.
 * Wave 2 fixes metadata and indexability. Five defects are addressed:
 *
 *  1. STALE NOINDEX. A 2026-07-07 "translation gate" applied noindex to 96
 *     pages on the belief that de/fr/id/th/vi were untranslated. That belief was
 *     wrong (2026-07-21 trigram audit: .021-.044 overlap vs. the English source
 *     for every locale). Those pages carry a median of 4,056 words under a real
 *     h1/h2/h3/p hierarchy. The gate is lifted everywhere EXCEPT travel/planner,
 *     which is a ~100-word interactive tool in all 9 locales and is legitimately
 *     thin — so it is noindexed CONSISTENTLY across all 9 rather than 3.
 *
 *  2. HREFLANG. `th` was missing from all 189 pages; 12 tags pointed at
 *     nonexistent /ja/culture and /zh-tw/culture paths; 101 tags kept a `.html`
 *     extension that vercel.json's `cleanUrls: true` redirects away (hreflang
 *     does not follow redirects); 62 pages did not reference themselves; set
 *     sizes ranged from 1 to 9. The whole block is now regenerated from the real
 *     on-disk file inventory: 9 locales + x-default, reciprocal, self-referential.
 *
 *  3. CANONICAL. Normalized to each page's own absolute extensionless URL.
 *     og:url is realigned to match.
 *
 *  4. SCHEMA.ORG. 186 blocks declared Article/WebPage with no `author` and no
 *     `datePublished` — both required for Article, so the markup was invalid and
 *     signalled nothing. 3 zh-tw pages had no JSON-LD at all. Dates are derived
 *     from real git history (see DATES below); none are invented.
 *
 *  5. VISIBLE BYLINE. Google's helpful-content guidance asks whether it is
 *     self-evident who authored a page. A localized byline + last-updated line
 *     is inserted after the single <h1> on every article page.
 *
 * ── DATES ─────────────────────────────────────────────────────────────────
 * `datePublished` = first commit that added the file.
 * `dateModified`  = last commit that changed page CONTENT. Metadata-only
 * commits in this repo's history (the SEO layer, the AdSense/Analytics pass,
 * the PWA favicon pass, the logo-mark swap, the Supabase image-URL injection,
 * the sitemap/canonical rebuild) deliberately do NOT advance dateModified —
 * inflating it on a markup-only commit would be a false freshness signal.
 * Both values are baked into DATES below from:
 *     git log --reverse --format='COMMIT|%aI|%s' --name-status -M -- culture travel
 * They are checked into this file so the script does not depend on git being
 * present, and so a future rewrite of history cannot silently change them.
 *
 * Files are mixed LF/CRLF and mixed BOM/no-BOM. Each is normalized to LF
 * without BOM for matching and restored to its original form on write.
 */

'use strict';
const fs = require('fs');
const path = require('path');
const registry = require('./_locales.cjs');

const ROOT = path.resolve(__dirname, '..');
const CHECK_ONLY = process.argv.includes('--check');
const ORIGIN = 'https://freekoreanschool.com';

/* ── Locales, from the registry (scripts/_locales.cjs) ─────────────────────
   Only `status: 'live'` locales get an hreflang tag. A 'planned' locale may
   already have generated-but-untranslated pages on disk during its rollout;
   those pages are skipped wholesale (see listPages) so this script neither
   crashes on an unknown directory nor advertises an unfinished locale to
   Google.

   ⚠️ EMISSION ORDER. The registry orders locales en, zh-tw, ja, es, fr, de,
   vi, th, id; this script has written en, ja, zh-tw, es, de, fr, vi, th, id
   into ~380 committed pages since 2026-07. Link order inside an hreflang
   cluster carries no meaning for Google, so the legacy order is pinned here
   rather than rewriting every page for a no-op diff. New locales append after
   it in registry order. The SET comes from the registry; only the sequence is
   frozen. The reciprocity check below depends on the order being STABLE, not
   on it being any particular order. */
const LEGACY_ORDER = ['en', 'ja', 'zh-tw', 'es', 'de', 'fr', 'vi', 'th', 'id'];
const LIVE = registry.live()
  .map((l, i) => ({ l, i }))
  .sort((a, b) => {
    const ra = LEGACY_ORDER.indexOf(a.l.code), rb = LEGACY_ORDER.indexOf(b.l.code);
    return (ra < 0 ? LEGACY_ORDER.length : ra) - (rb < 0 ? LEGACY_ORDER.length : rb) || a.i - b.i;
  })
  .map(x => x.l);

/* Locale directory name -> hreflang code. `en` lives at the section root. */
const LOCALES = Object.fromEntries(LIVE.map(l => [l.code, l.hreflang]));
const LOC_DIRS = LIVE.filter(l => l.code !== 'en').map(l => l.code);
/* Emission order: en first, then the live locale dirs, then x-default. */
const HREFLANG_ORDER = LIVE.map(l => l.code);
/* Every registry directory, live or planned — used only to recognize a
   directory as a locale so an in-rollout locale is skipped rather than
   throwing "unknown locale dir". */
const KNOWN_DIRS = new Set(registry.all().filter(l => l.code !== 'en').map(l => l.code));
const LIVE_DIRS = new Set(LOC_DIRS);

/* Pages that are interactive tools, not articles. Thin in EVERY locale
   (99-336 words, h2=0, p=2), so they stay noindex and get no byline. */
const TOOL_PAGES = /^travel\/(?:[a-z-]+\/)?planner\.html$/;

const AUTHOR = {
  '@type': 'Person',
  name: '해본놈RK (Haebonnom RK)',
  url: `${ORIGIN}/about`,
  description: 'Native Korean speaker living in South Korea. The culture and travel guides on this site are written from his own experience of living there.',
};
const PUBLISHER = {
  '@type': 'Organization',
  name: 'Korean School 한국어 학교',
  url: ORIGIN,
  logo: `${ORIGIN}/assets/images/android-chrome-512x512.png`,
};

/* ── Visible byline, localized ─────────────────────────────────────────────
   `by` and `updated` are joined around a <time> element. The author name is
   left in its original Korean+romanization form in every locale — it is a
   proper noun and the about page uses exactly this rendering.

   Both the labels and the Intl.DateTimeFormat locale come from the registry's
   `byline: { by, upd, fmt }` field. Notable per-locale detail preserved there:
   `th` forces the Gregorian calendar, because ICU defaults `th` to the
   Buddhist era and would render 2026 as 2569, reading as a typo. */
const BYLINE = Object.fromEntries(LIVE.map(l => [l.code, l.byline]));
/* CJK locales use a full-width interpunct and a colon after the label. */
const CJK = new Set(LIVE.filter(l => l.cjk).map(l => l.code));
/* Right-to-left locales need dir="rtl" on <html>. Registry-driven and
   currently EMPTY — `ar` is the only rtl record and it is still 'planned', so
   the rtl step below is a proven no-op for all 9 shipped locales. */
const RTL = new Set(LIVE.filter(l => l.writing === 'rtl').map(l => l.code));

/* ── Real git-derived dates (see header). ─────────────────────────────────── */
const DATES = require('./culture-travel-dates.json');

/* Pre-existing, PRE-DATING this script: all nine ksports pages carry one stray
   </div> in the body prose. Verified byte-identical to HEAD by diffing the
   open/close counts of `git show HEAD:<file>` against the working tree.
   That is a <body> defect owned by the semantic re-tagging pass, not by this
   script, and fixing it here would mean editing prose this script is explicitly
   scoped out of. It is pinned per-file so the structural check still catches any
   NEW imbalance this script might introduce.
   TODO(body-owner): remove the extra </div> in these nine files. */
const DIV_BASELINE = {
  'culture/ksports.html': '374/375',
  'culture/de/ksports.html': '374/375',
  'culture/es/ksports.html': '374/375',
  'culture/fr/ksports.html': '374/375',
  'culture/id/ksports.html': '374/375',
  'culture/ja/ksports.html': '374/375',
  'culture/th/ksports.html': '374/375',
  'culture/vi/ksports.html': '374/375',
  'culture/zh-tw/ksports.html': '377/378',
};

let changed = 0;
const report = [];

/* ── BOM/CRLF-safe read/write ─────────────────────────────────────────────── */
function read(rel) {
  const raw = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const bom = raw.charCodeAt(0) === 0xfeff;
  return {
    src: (bom ? raw.slice(1) : raw).replace(/\r\n/g, '\n'),
    crlf: /\r\n/.test(raw),
    bom,
  };
}
function write(rel, src, crlf, bom) {
  if (CHECK_ONLY) return;
  const out = (bom ? '﻿' : '') + (crlf ? src.replace(/\n/g, '\r\n') : src);
  fs.writeFileSync(path.join(ROOT, rel), out, 'utf8');
}

/* ── Inventory ────────────────────────────────────────────────────────────── */
function listPages() {
  const out = [];
  for (const section of ['culture', 'travel']) {
    (function walk(d) {
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const p = path.join(d, e.name);
        if (e.isDirectory()) walk(p);
        else if (e.name.endsWith('.html')) out.push(path.relative(ROOT, p).split(path.sep).join('/'));
      }
    })(path.join(ROOT, section));
  }
  /* Skip pages that belong to a registry locale that is not live yet. During
     a rollout the generators create that locale's shells before its prose
     exists; giving them canonical/hreflang/JSON-LD here would invite Google
     to index untranslated pages. They are picked up automatically when the
     locale flips to 'live'. */
  return out.filter(rel => {
    const dir = rel.split('/')[1];
    return !(KNOWN_DIRS.has(dir) && !LIVE_DIRS.has(dir));
  }).sort();
}
const PAGES = listPages();
const PAGE_SET = new Set(PAGES);

/** culture/th/kimchi.html -> { section:'culture', loc:'th', slug:'kimchi' } */
function parse(rel) {
  const m = rel.match(/^(culture|travel)\/(?:([a-z-]+)\/)?([a-z-]+)\.html$/);
  if (!m) throw new Error('unparseable page path: ' + rel);
  const [, section, dir, slug] = m;
  const loc = dir && LOC_DIRS.includes(dir) ? dir : 'en';
  if (dir && loc === 'en') throw new Error('unknown locale dir: ' + rel);
  return { section, loc, slug };
}
/** repo path for one (section, loc, slug) triple, or null if it does not exist */
function pathFor(section, loc, slug) {
  const rel = loc === 'en' ? `${section}/${slug}.html` : `${section}/${loc}/${slug}.html`;
  return PAGE_SET.has(rel) ? rel : null;
}
/** absolute, extensionless, index-collapsed public URL */
function urlFor(rel) {
  return ORIGIN + '/' + rel.replace(/\.html$/, '').replace(/\/index$/, '');
}

/* ── Block builders ───────────────────────────────────────────────────────── */
function hreflangBlock(rel) {
  const { section, slug } = parse(rel);
  const lines = ['  <!-- ks:hreflang -->'];
  for (const loc of HREFLANG_ORDER) {
    const target = pathFor(section, loc, slug);
    if (!target) continue;                     // never emit a URL with no file
    lines.push(`  <link rel="alternate" hreflang="${loc === 'en' ? 'en' : LOCALES[loc]}" href="${urlFor(target)}">`);
  }
  const enPath = pathFor(section, 'en', slug);
  if (enPath) lines.push(`  <link rel="alternate" hreflang="x-default" href="${urlFor(enPath)}">`);
  lines.push('  <!-- /ks:hreflang -->');
  return lines.join('\n');
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function jsonLd(rel, title, desc) {
  const { section, loc, slug } = parse(rel);
  const isTool = TOOL_PAGES.test(rel);
  const isIndex = slug === 'index';
  const type = isTool ? 'WebPage' : isIndex ? 'CollectionPage' : 'Article';

  const o = {
    '@context': 'https://schema.org',
    '@type': type,
    headline: title,
    name: title,
    description: desc,
    url: urlFor(rel),
    image: `${ORIGIN}/assets/images/og-image.webp`,
    inLanguage: loc === 'en' ? 'en' : LOCALES[loc],
    datePublished: DATES.created[rel],
    dateModified: DATES.modified[rel],
    author: AUTHOR,
    publisher: PUBLISHER,
    isAccessibleForFree: true,
  };
  if (type !== 'Article') delete o.headline;   // headline is an Article property
  else delete o.name;

  /* Non-English pages are translations of the English source, not independent
     works. Declaring that keeps them from reading as duplicated content and
     matches what about.html already discloses publicly. */
  const enPath = pathFor(section, 'en', slug);
  if (loc !== 'en' && enPath) {
    o.translationOfWork = { '@type': type === 'Article' ? 'Article' : 'WebPage', url: urlFor(enPath) };
  }
  if (!o.datePublished || !o.dateModified) throw new Error('missing git date for ' + rel);

  return '  <script type="application/ld+json">\n' +
    JSON.stringify(o, null, 2).split('\n').map(l => '  ' + l).join('\n') +
    '\n  </script>';
}

function bylineHtml(rel) {
  const { loc } = parse(rel);
  const s = BYLINE[loc];
  const iso = DATES.modified[rel].slice(0, 10);
  let human;
  try {
    human = new Intl.DateTimeFormat(s.fmt, { year: 'numeric', month: 'long', day: 'numeric' })
      .format(new Date(iso + 'T00:00:00Z'));
  } catch { human = iso; }
  const sep = CJK.has(loc) ? '：' : ' ';
  const mid = CJK.has(loc) ? '・' : ' · ';
  return `      <p class="page-byline" style="margin:10px 0 0;font-size:0.82rem;color:var(--text-secondary);">` +
    `<span>${esc(s.by)}${sep}<a href="${ORIGIN}/about" rel="author" style="color:inherit;text-decoration:underline;">${esc(AUTHOR.name)}</a></span>` +
    `${mid}<span>${esc(s.upd)}${sep}<time datetime="${iso}">${esc(human)}</time></span></p>`;
}

/* ── Per-file patch ───────────────────────────────────────────────────────── */
function patch(rel) {
  const { src: orig, crlf, bom } = read(rel);
  let src = orig;
  const msgs = [];
  const isTool = TOOL_PAGES.test(rel);
  const canon = urlFor(rel);

  /* 0 ── writing direction. Registry `writing: 'rtl'` locales get dir="rtl"
         on <html>; every other locale must NOT carry one. RTL is empty for
         all 9 live locales (only the planned `ar` is rtl), so this is a
         verified no-op today and the correct behaviour the day `ar` ships.
         Only the dir attribute is touched — lang= is left to the generators. */
  {
    const { loc } = parse(rel);
    const wantRtl = RTL.has(loc);
    src = src.replace(/<html\b([^>]*)>/i, (m, attrs) => {
      const stripped = attrs.replace(/\s+dir="[^"]*"/gi, '');
      return wantRtl ? `<html${stripped} dir="rtl">` : `<html${stripped}>`;
    });
    if (src !== orig) msgs.push(wantRtl ? 'dir-rtl' : 'dir-removed');
  }

  /* 1 ── robots. Lift the stale translation gate; keep/apply noindex only on
         the interactive tool pages, which are thin in every locale. */
  const robotsRe = /^[ \t]*<meta\s+name="robots"[^>]*>[ \t]*\n/gim;
  const hadRobots = robotsRe.test(src);
  robotsRe.lastIndex = 0;
  src = src.replace(robotsRe, '');
  if (isTool) {
    src = src.replace(/(^[ \t]*<meta name="viewport"[^>]*>[ \t]*\n)/im,
      '$1  <meta name="robots" content="noindex, follow">\n');
    if (!hadRobots) msgs.push('noindex-added(tool)');
  } else if (hadRobots) {
    msgs.push('stale-noindex-lifted');
  }

  /* 2 ── canonical (exactly one, self-referential) */
  const canonTag = `  <link rel="canonical" href="${canon}">`;
  const canonAll = /^[ \t]*<link rel="canonical"[^>]*>[ \t]*\n/gim;
  const canonCount = (src.match(canonAll) || []).length;
  if (canonCount === 0) {
    src = src.replace(/(^[ \t]*<link rel="stylesheet"[^>]*>[ \t]*\n)/im, `$1${canonTag}\n`);
    msgs.push('canonical-added');
  } else {
    let first = true;
    src = src.replace(canonAll, () => (first ? (first = false, canonTag + '\n') : ''));
    if (canonCount > 1) msgs.push(`canonical-deduped(${canonCount})`);
  }
  if (!orig.includes(canonTag.trim())) msgs.push('canonical-corrected');

  /* 3 ── hreflang. Drop every existing alternate (they appear both one-per-line
         and doubled-up on a single line) plus any previous marker block, then
         emit one regenerated, marker-wrapped set after the canonical. */
  src = src.replace(/^[ \t]*<!-- ks:hreflang -->\n[\s\S]*?<!-- \/ks:hreflang -->[ \t]*\n/gim, '');
  /* Take out WHOLE lines whose only content is alternate links — they occur
     both one-per-line and doubled-up on a single line. Deleting just the tags
     would leave an empty line behind, and a residue that is cleaned one line
     per run makes the script non-idempotent. */
  src = src.replace(/^[ \t]*(?:<link rel="alternate" hreflang="[^"]*"[^>]*>[ \t]*)+\n/gim, '');
  /* …then any straggler that shares a line with other markup. */
  src = src.replace(/[ \t]*<link rel="alternate" hreflang="[^"]*"[^>]*>/gi, '');
  /* Collapse EVERY blank line left in front of the OG block in one pass (the
     `+` is what makes this converge on the first run rather than the Nth). */
  src = src.replace(/(?:^[ \t]*\n)+(?=[ \t]*<meta property="og:type")/gim, '');
  src = src.replace(new RegExp('(' + canonTag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\n)'),
    `$1${hreflangBlock(rel)}\n`);
  msgs.push('hreflang-rebuilt');

  /* 4 ── og:url must agree with the canonical */
  const ogRe = /(<meta property="og:url" content=")[^"]*(">)/i;
  if (ogRe.test(src)) {
    const before = src;
    src = src.replace(ogRe, `$1${canon}$2`);
    if (src !== before) msgs.push('og-url-corrected');
  }

  /* 5 ── JSON-LD: regenerate wholesale from title + description */
  const title = (src.match(/<title>([\s\S]*?)<\/title>/i) || [, ''])[1].trim();
  const desc = (src.match(/<meta name="description" content="([^"]*)"/i) || [, ''])[1].trim();
  const ld = jsonLd(rel, title, desc);
  const ldRe = /^[ \t]*<script type="application\/ld\+json">[\s\S]*?<\/script>[ \t]*\n/im;
  if (ldRe.test(src)) {
    src = src.replace(ldRe, ld + '\n');
    msgs.push('jsonld-regenerated');
  } else {
    /* the 3 zh-tw pages that never had a block at all */
    const anchor = /^([ \t]*<meta name="google-adsense-account"[^>]*>[ \t]*\n)/im;
    if (anchor.test(src)) src = src.replace(anchor, ld + '\n$1');
    else src = src.replace(/^([ \t]*<\/head>)/im, ld + '\n$1');
    msgs.push('jsonld-created');
  }

  /* 6 ── visible byline, inserted once directly after the single <h1>.
         Anchoring to `</h1>` adds a sibling node and rewrites nothing, so the
         committed semantic re-tagging of the prose below is left untouched. */
  if (!isTool) {
    src = src.replace(/^[ \t]*<p class="page-byline"[\s\S]*?<\/p>[ \t]*\n/gim, '');
    const h1Close = src.indexOf('</h1>');
    if (h1Close === -1) throw new Error('no </h1> in ' + rel);
    const cut = h1Close + '</h1>'.length;
    src = src.slice(0, cut) + '\n' + bylineHtml(rel) + src.slice(cut);
    msgs.push('byline');
  }

  if (src !== orig) {
    if (!CHECK_ONLY) { write(rel, src, crlf, bom); changed++; }
    report.push(`${rel.padEnd(34)} ${msgs.join(', ')}`);
    return true;
  }
  return false;
}

/* ── Verification ─────────────────────────────────────────────────────────── */
function verify() {
  const problems = [];
  const altsOf = {}, canonOf = {};

  for (const rel of PAGES) {
    const s = read(rel).src;
    const p = [];
    const isTool = TOOL_PAGES.test(rel);
    const want = urlFor(rel);

    /* writing direction — rtl locales only (none are live today) */
    const htmlTag = (s.match(/<html\b[^>]*>/i) || [''])[0];
    const hasDir = /\sdir="rtl"/i.test(htmlTag);
    if (RTL.has(parse(rel).loc) !== hasDir) p.push(hasDir ? 'UNEXPECTED-RTL' : 'MISSING-RTL');

    /* robots */
    const noindex = /<meta[^>]+name="robots"[^>]*noindex/i.test(s);
    if (isTool && !noindex) p.push('TOOL-NOT-NOINDEX');
    if (!isTool && noindex) p.push('STALE-NOINDEX');

    /* canonical */
    const canons = [...s.matchAll(/<link rel="canonical" href="([^"]+)">/g)].map(m => m[1]);
    if (canons.length !== 1) p.push(`CANON-COUNT-${canons.length}`);
    else if (canons[0] !== want) p.push('CANON-WRONG');
    canonOf[rel] = canons[0];

    /* og:url agreement */
    const og = (s.match(/<meta property="og:url" content="([^"]*)"/) || [])[1];
    if (og && og !== want) p.push('OG-URL-MISMATCH');

    /* hreflang */
    const alts = [...s.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)]
      .map(m => ({ lang: m[1], href: m[2] }));
    altsOf[rel] = alts;
    if (!alts.some(a => a.lang === 'x-default')) p.push('NO-XDEFAULT');
    if (!alts.some(a => a.href === want)) p.push('NO-SELF-REF');
    if (!alts.some(a => a.lang === 'th')) p.push('NO-TH');
    if (alts.some(a => a.href.endsWith('.html'))) p.push('DOT-HTML-ALT');
    const langs = alts.map(a => a.lang);
    if (new Set(langs).size !== langs.length) p.push('DUP-HREFLANG');
    for (const a of alts) {
      const relTarget = a.href.replace(ORIGIN + '/', '');
      const cands = [relTarget + '.html', relTarget + '/index.html'];
      if (!cands.some(c => PAGE_SET.has(c))) p.push(`DANGLING:${a.href}`);
    }

    /* JSON-LD */
    const blocks = [...s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    if (blocks.length !== 1) p.push(`LD-COUNT-${blocks.length}`);
    for (const b of blocks) {
      let o;
      try { o = JSON.parse(b[1]); } catch { p.push('LD-UNPARSEABLE'); continue; }
      if (!o.author || o.author['@type'] !== 'Person') p.push('LD-NO-AUTHOR');
      if (!o.datePublished) p.push('LD-NO-DATEPUB');
      if (!o.dateModified) p.push('LD-NO-DATEMOD');
      if (!o.publisher) p.push('LD-NO-PUBLISHER');
      if (o.url !== want) p.push('LD-URL-WRONG');
      const { loc } = parse(rel);
      if (o.inLanguage !== (loc === 'en' ? 'en' : LOCALES[loc])) p.push('LD-INLANG-WRONG');
      if (o.dateModified < o.datePublished) p.push('LD-DATE-INVERTED');
    }

    /* byline */
    const bylines = (s.match(/class="page-byline"/g) || []).length;
    if (!isTool && bylines !== 1) p.push(`BYLINE-${bylines}`);
    if (isTool && bylines !== 0) p.push('TOOL-HAS-BYLINE');

    /* structural sanity — the body must not have been disturbed */
    if ((s.match(/<h1[\s>]/g) || []).length !== 1) p.push('H1-COUNT');
    const o = (s.match(/<div\b/g) || []).length, c = (s.match(/<\/div>/g) || []).length;
    if (o !== c && !(DIV_BASELINE[rel] && DIV_BASELINE[rel] === `${o}/${c}`)) p.push(`DIV-${o}/${c}`);
    const po = (s.match(/<p[\s>]/g) || []).length, pc = (s.match(/<\/p>/g) || []).length;
    if (po !== pc) p.push(`P-${po}/${pc}`);

    if (p.length) problems.push(`${rel.padEnd(34)} ${[...new Set(p)].join(' ')}`);
  }

  /* ── reciprocity: if A points at B, B must point back at A, and both must
        advertise the identical URL set. This is the property Google actually
        enforces — a one-way hreflang is silently discarded. */
  const urlToPage = {};
  for (const rel of PAGES) urlToPage[urlFor(rel)] = rel;
  for (const rel of PAGES) {
    const mine = new Set(altsOf[rel].filter(a => a.lang !== 'x-default').map(a => a.href));
    for (const a of altsOf[rel]) {
      if (a.lang === 'x-default') continue;
      const other = urlToPage[a.href];
      if (!other) { problems.push(`${rel}  RECIP: ${a.href} maps to no page`); continue; }
      const theirs = new Set(altsOf[other].filter(x => x.lang !== 'x-default').map(x => x.href));
      if (!theirs.has(urlFor(rel)))
        problems.push(`${rel}  RECIP: ${other} does not point back`);
      const missing = [...mine].filter(u => !theirs.has(u));
      const extra = [...theirs].filter(u => !mine.has(u));
      if (missing.length || extra.length)
        problems.push(`${rel}  RECIP-SET vs ${other}: -${missing.length} +${extra.length}`);
    }
  }
  return problems;
}

/* ── Main ─────────────────────────────────────────────────────────────────── */
if (!CHECK_ONLY) for (const rel of PAGES) patch(rel);

if (report.length) {
  console.log(report.join('\n'));
  console.log('');
}
const problems = verify();
if (problems.length) {
  console.error(`VERIFICATION FAILED (${problems.length}):\n` + problems.slice(0, 60).map(p => '  ' + p).join('\n'));
  if (problems.length > 60) console.error(`  … and ${problems.length - 60} more`);
  process.exit(1);
}
console.log(CHECK_ONLY
  ? `CHECK: all ${PAGES.length} culture/travel pages are correct — no drift.`
  : `Applied. ${changed} of ${PAGES.length} file(s) written. Verification passed: ` +
    `robots, canonical, og:url, hreflang reciprocity, JSON-LD, byline, structure.`);
