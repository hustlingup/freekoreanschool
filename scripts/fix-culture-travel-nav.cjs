#!/usr/bin/env node
/**
 * fix-culture-travel-nav.cjs — Wave 3 AdSense remediation for culture/ + travel/.
 *
 *   node scripts/fix-culture-travel-nav.cjs           # apply
 *   node scripts/fix-culture-travel-nav.cjs --check   # verify only, exit 1 on drift
 *
 * IDEMPOTENT BY CONSTRUCTION. The only transform is "English target -> the
 * same-locale target, when that file exists on disk". After one run no such
 * link remains, so a second run is a guaranteed no-op. No marker comment is
 * injected into the HTML: the committed <head> metadata is owned by
 * fix-culture-travel-seo.cjs and adding markers there would show as drift
 * under its --check. The guard is structural instead (see LANG SWITCHER).
 *
 * SCOPE: <a href> attributes inside culture/**.html and travel/**.html only.
 * Nothing under learn/, no root page, no sitemap.xml, no <head> metadata, and
 * no <body> prose is touched — only the value of an anchor's href.
 *
 * ── Defect ────────────────────────────────────────────────────────────────
 * AdSense rejected the site for "Low value content". Google's guidance weighs
 * clear navigation and a "clearly defined, browseable hierarchy"; the absence
 * of one is how it defines doorway abuse. Two locales had already been built
 * correctly and 6+5 had not:
 *
 *   culture/{ja,de,fr,vi,th,id}/index.html   111 links each -> /culture/<page>
 *   travel/{de,fr,vi,th,id}/index.html        28 links each -> /travel/<page>
 *
 * Those are root-absolute paths at the SECTION root, i.e. the English page.
 * These files are the section hubs, so on 6 locales every single topic link
 * off the culture hub dumped the reader into English — 806 links in total.
 * A seventh case was found while sweeping: travel/ja/*.html (5 files) point
 * their sidebar + footer "K-カルチャー" link at ../../culture/index.html,
 * the English culture hub, 2 per file.
 *
 * The two correct locales use two different-but-equivalent styles:
 *   es     relative, same directory           href="kpop.html"
 *   zh-tw  locale-qualified root-absolute     href="/culture/zh-tw/kpop.html"
 * This script preserves whichever style each link already used — an absolute
 * link stays absolute, a relative link stays relative, and an extensionless
 * link (vercel.json sets cleanUrls) stays extensionless. Only the locale
 * segment is corrected.
 *
 * ── LANG SWITCHER — deliberately preserved ────────────────────────────────
 * Anchors carrying class="lang-dropdown-item" are the static language
 * switcher. Their cross-locale hrefs are intentional and are the ONLY
 * legitimate cross-locale links in the two sections. js/lang-core.js
 * `_renderBtn()` removes this static dropdown at runtime and replaces it with
 * an hreflang-driven modal, so these anchors exist for crawlers only. They are
 * skipped, and the verifier treats them as expected rather than as drift.
 *
 * Files are mixed LF/CRLF and mixed BOM/no-BOM. Each is normalized to LF
 * without BOM for matching and restored to its original form on write.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CHECK_ONLY = process.argv.includes('--check');

const LOC_DIRS = ['ja', 'zh-tw', 'es', 'de', 'fr', 'vi', 'th', 'id'];
const SECTIONS = ['culture', 'travel'];

/* ── IO helpers that preserve line endings and BOM ─────────────────────── */
function read(rel) {
  const raw = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const bom = raw.charCodeAt(0) === 0xfeff;
  const body = bom ? raw.slice(1) : raw;
  const crlf = body.includes('\r\n');
  return { src: crlf ? body.replace(/\r\n/g, '\n') : body, crlf, bom };
}

function write(rel, src, crlf, bom) {
  const body = crlf ? src.replace(/\n/g, '\r\n') : src;
  fs.writeFileSync(path.join(ROOT, rel), (bom ? '﻿' : '') + body, 'utf8');
}

/* ── Page inventory ────────────────────────────────────────────────────── */
function walk(dir, acc = []) {
  let entries = [];
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (_) { return acc; }
  for (const e of entries) {
    const abs = path.join(dir, e.name);
    if (e.isDirectory()) walk(abs, acc);
    else if (e.name.endsWith('.html')) acc.push(path.relative(ROOT, abs).split(path.sep).join('/'));
  }
  return acc;
}

const PAGES = SECTIONS.flatMap(s => walk(path.join(ROOT, s))).sort();
const PAGE_SET = new Set(PAGES);

/** Locale directory a page lives in, or 'en' for the section root. */
function localeOf(rel) {
  const parts = rel.split('/');
  return LOC_DIRS.includes(parts[1]) ? parts[1] : 'en';
}

/** Resolve an href (absolute or relative, with or without .html) to a repo path. */
function resolveHref(fromRel, pathPart) {
  const dir = path.posix.dirname(fromRel);
  const base = pathPart.startsWith('/')
    ? path.posix.normalize(pathPart.slice(1))
    : path.posix.normalize(path.posix.join(dir, pathPart));
  if (PAGE_SET.has(base)) return base;
  if (PAGE_SET.has(base + '.html')) return base + '.html';
  if (PAGE_SET.has(base + '/index.html')) return base + '/index.html';
  return null;
}

/** The same page in locale `loc`, if it exists. */
function sameLocale(targetRel, loc) {
  const parts = targetRel.split('/');
  const section = parts[0];
  const slug = LOC_DIRS.includes(parts[1]) ? parts.slice(2).join('/') : parts.slice(1).join('/');
  const cand = loc === 'en' ? `${section}/${slug}` : `${section}/${loc}/${slug}`;
  return PAGE_SET.has(cand) ? cand : null;
}

/**
 * Re-express `targetRel` as an href from `fromRel`, matching the original
 * href's style: absolute stays absolute, relative stays relative, and a
 * cleanUrls-style extensionless link stays extensionless.
 */
function formatHref(fromRel, targetRel, originalPath) {
  const wasAbsolute = originalPath.startsWith('/');
  const wasExtensionless = !/\.html$/.test(originalPath);

  let out = targetRel;
  if (wasExtensionless) {
    out = out.replace(/\/index\.html$/, '').replace(/\.html$/, '');
  }
  if (wasAbsolute) return '/' + out;

  let relPath = path.posix.relative(path.posix.dirname(fromRel), out);
  if (!relPath.startsWith('.')) relPath = './' + relPath;
  // Same-directory links in this repo are written bare ("kpop.html"), not "./kpop.html".
  if (relPath.startsWith('./') && !relPath.slice(2).includes('/')) relPath = relPath.slice(2);
  return relPath;
}

/* ── Per-file patch ────────────────────────────────────────────────────── */
let changed = 0;
const report = [];
const fixes = [];

function patch(rel) {
  const loc = localeOf(rel);
  if (loc === 'en') return false;               // English pages link to English: correct.

  const { src: orig, crlf, bom } = read(rel);
  let count = 0;

  // Rewrite hrefs inside <a> tags only. <link rel="alternate" hreflang> and
  // <link rel="canonical"> are <link> elements and are never matched here.
  const src = orig.replace(/<a\b[^>]*>/gi, (tag) => {
    if (/class="[^"]*\blang-dropdown-item\b[^"]*"/i.test(tag)) return tag;  // language switcher
    return tag.replace(/href="([^"]+)"/i, (attr, href) => {
      if (/^(?:https?:|mailto:|tel:|#|javascript:)/i.test(href)) return attr;
      const hashAt = href.indexOf('#');
      const pathPart = hashAt === -1 ? href : href.slice(0, hashAt);
      const hash = hashAt === -1 ? '' : href.slice(hashAt);
      if (!pathPart) return attr;

      const target = resolveHref(rel, pathPart);
      if (!target) return attr;                       // not an in-scope page
      if (localeOf(target) === loc) return attr;      // already same-locale

      const want = sameLocale(target, loc);
      if (!want || want === target) return attr;      // no same-locale equivalent

      count++;
      fixes.push(`${rel}: ${href} -> ${formatHref(rel, want, pathPart) + hash}`);
      return `href="${formatHref(rel, want, pathPart) + hash}"`;
    });
  });

  if (src === orig) return false;
  if (!CHECK_ONLY) { write(rel, src, crlf, bom); changed++; }
  report.push(`${rel.padEnd(34)} ${count} link(s) relocalized`);
  return true;
}

/* ── Verification ──────────────────────────────────────────────────────── */
function verify() {
  const problems = [];
  let deadCount = 0, crossCount = 0, switcherCount = 0;
  const inbound = new Map(PAGES.map(p => [p, new Set()]));

  for (const rel of PAGES) {
    const s = read(rel).src;
    const loc = localeOf(rel);

    for (const tag of s.match(/<a\b[^>]*>/gi) || []) {
      const m = tag.match(/href="([^"]+)"/i);
      if (!m) continue;
      const href = m[1];
      if (/^(?:https?:|mailto:|tel:|#|javascript:)/i.test(href)) continue;
      const pathPart = href.split('#')[0];
      if (!pathPart) continue;

      const target = resolveHref(rel, pathPart);

      // 1. Dead internal links.
      if (!target) {
        // Only flag links that were aimed into culture/ or travel/.
        const guess = pathPart.startsWith('/')
          ? pathPart.slice(1)
          : path.posix.normalize(path.posix.join(path.posix.dirname(rel), pathPart));
        if (SECTIONS.some(sec => guess.startsWith(sec + '/'))) {
          problems.push(`DEAD ${rel} -> ${href}`);
          deadCount++;
        }
        continue;
      }

      inbound.get(target).add(rel);

      // 2. Cross-locale links out of a localized page.
      if (loc !== 'en' && localeOf(target) !== loc) {
        if (/class="[^"]*\blang-dropdown-item\b[^"]*"/i.test(tag)) { switcherCount++; continue; }
        problems.push(`CROSS-LOCALE ${rel} -> ${href}`);
        crossCount++;
      }
    }
  }

  // 3. Orphans: a page whose only inbound link is its own self-link.
  //    A noindexed page is excluded from the index and from sitemap.xml
  //    (gen-sitemap.cjs skips it), so it cannot be a sitemap-listed orphan and
  //    is not a doorway signal — those are reported separately, not as failures.
  const orphans = [], noindexOrphans = [];
  for (const p of PAGES) {
    const ext = [...inbound.get(p)].filter(x => x !== p);
    if (ext.length) continue;
    if (/<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(read(p).src)) {
      noindexOrphans.push(p);
    } else {
      orphans.push(p);
    }
  }

  console.log(`\n  dead internal links (culture/travel targets) : ${deadCount}`);
  console.log(`  unintended cross-locale links               : ${crossCount}`);
  console.log(`  language-switcher links (expected, skipped) : ${switcherCount}`);
  console.log(`  indexable orphan pages                      : ${orphans.length}`);
  for (const o of orphans) console.log(`      ORPHAN ${o}`);
  console.log(`  noindexed orphans (expected, superseded)    : ${noindexOrphans.length}`);
  for (const o of noindexOrphans) console.log(`      noindex ${o}`);

  if (problems.length) {
    console.log('');
    for (const p of problems.slice(0, 40)) console.log('  ' + p);
    if (problems.length > 40) console.log(`  … and ${problems.length - 40} more`);
  }
  return { problems, orphans };
}

/* ── Main ──────────────────────────────────────────────────────────────── */
let touched = 0;
for (const rel of PAGES) if (patch(rel)) touched++;

if (CHECK_ONLY) {
  if (touched) {
    console.log(`DRIFT: ${touched} file(s) have cross-locale links that need relocalizing:`);
    for (const r of report) console.log('  ' + r);
  } else {
    console.log(`CHECK: all ${PAGES.length} culture/travel pages link within their own locale.`);
  }
  const { problems, orphans } = verify();
  process.exit(touched || problems.length || orphans.length ? 1 : 0);
}

console.log(`Relocalized ${fixes.length} link(s) across ${changed} file(s):`);
for (const r of report) console.log('  ' + r);
verify();
