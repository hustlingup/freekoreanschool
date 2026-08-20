#!/usr/bin/env node
/**
 * fix-sidebar-korean-labels.cjs — replace sidebar nav labels that are pure
 * Korean with the localized label the same locale already uses elsewhere.
 *
 *   node scripts/fix-sidebar-korean-labels.cjs [--check] [--locale de]
 *
 * REPORTED BY A HUMAN, not by any audit: the right-rail "explore" widget
 * showed 라면 가이드 / 만두 가이드 on non-Korean pages. The widget is innocent —
 * js/app.js::relatedWidgetHTML clones `.sidebar-nav .sidebar-link` innerHTML,
 * so it inherits whatever the sidebar says. The defect is in the sidebars.
 *
 * Scope, measured: 17 distinct pure-Korean labels across 981 sidebar links, in
 * every locale INCLUDING English (`culture/kpop.html` shows 🍜 라면 가이드).
 *
 * ⚠️ WHY EVERY EXISTING AUDIT MISSED IT. The prose audits drop any text node
 * containing Hangul, on the correct principle that Korean is the subject being
 * taught and is supposed to be identical in every locale. That principle does
 * not hold for NAVIGATION LABELS, where Korean is not content — it is an
 * untranslated UI string. "Korean = intentional" is true of lesson text and
 * false of chrome, and nothing encoded that distinction.
 *
 * THE FIX IS A COPY, NOT A TRANSLATION. The same locale already renders these
 * links correctly on other pages — `culture/es/kfood.html` says "Guía del
 * ramyeon" where `culture/es/kpop.html` says 라면 가이드. So the canonical label
 * is taken from the locale's own most common non-Korean rendering of the same
 * link. Nothing is invented, and no page is given a label another locale wrote.
 *
 * Links are keyed by BASENAME + HASH, because the same target appears both as
 * `ramyeon.html` and as `/culture/de/ramyeon.html`; keying on the raw href
 * treats those as different links and leaves the absolute ones unfixable.
 *
 * Idempotent. --check writes nothing and exits 1 if any label still needs it.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIRS = ['culture', 'travel', 'learn'];
const HANGUL = /[가-힣]/;
/* any script that is not Korean — if present, the label is localized */
const OTHER = /[A-Za-zÀ-ÿ฀-๿぀-ヿ一-鿿]/;

const CHECK = process.argv.includes('--check');
const onlyLocale = (() => { const i = process.argv.indexOf('--locale'); return i > -1 ? process.argv[i + 1] : null; })();

const LINK = /<a([^>]*?)href="([^"]+)"([^>]*?)class="([^"]*\bsidebar-link\b[^"]*)"([^>]*)>([\s\S]*?)<\/a>/g;

/* Locale directories, from the registry (scripts/_locales.cjs). 'planned'
   locales are included on purpose: this list only RECOGNIZES a directory as a
   locale, and an in-rollout locale should get its own labels rather than
   silently be treated as English. The old regex hardcoded the shape
   `[a-z]{2}(-tw)?`, which would have mis-parsed pt-br/zh-hk/zh-cn as 'en'.
   A membership test also cannot mistake a non-locale subdirectory (learn/data)
   for a locale. */
const LOC_DIRS = new Set(require('./_locales.cjs').all()
  .filter(l => l.code !== 'en').map(l => l.code));
const localeOf = rel => {
  const m = /^(?:culture|travel|learn)\/([^/]+)\//.exec(rel);
  return m && LOC_DIRS.has(m[1]) ? m[1] : 'en';
};
/* `ramyeon.html` and `/culture/de/ramyeon.html` are the same link */
const keyOf = href => {
  const [p, hash] = href.split('#');
  return path.posix.basename(p || '') + (hash ? '#' + hash : '');
};
/* Emoji live well outside U+1F300–1FAFF: ♨ is U+2668, ☕ U+2615, ⭐ U+2B50,
   ✓ U+2713. Stripping only the high plane leaves those in the harvested
   label, which then gets written back BESIDE the existing <span
   class="link-icon">, rendering "♨️ ♨️ Jjimjilbang". Cover the symbol blocks
   and the variation selector / ZWJ that trail them. */
const EMOJI = /[\u{1F000}-\u{1FAFF}\u{2190}-\u{21FF}\u{2300}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu;
const stripEmoji = s => s.replace(EMOJI, '').replace(/\s+/g, ' ').trim();
const visibleText = inner => stripEmoji(inner.replace(/<[^>]+>/g, ''));

function pages() {
  const out = [];
  const walk = d => {
    if (!fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.html')) out.push(path.relative(ROOT, p).replace(/\\/g, '/'));
    }
  };
  DIRS.forEach(d => walk(path.join(ROOT, d)));
  return out;
}

/* ── pass 1: learn each locale's canonical label per link ─────────────── */
const canon = {};                 // locale -> key -> Map(label -> count)
const all = pages();
all.forEach(rel => {
  const loc = localeOf(rel);
  const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  let m;
  LINK.lastIndex = 0;
  while ((m = LINK.exec(src)) !== null) {
    const txt = visibleText(m[6]);
    if (!txt || (HANGUL.test(txt) && !OTHER.test(txt))) continue;
    const k = keyOf(m[2]);
    canon[loc] = canon[loc] || {};
    canon[loc][k] = canon[loc][k] || new Map();
    canon[loc][k].set(txt, (canon[loc][k].get(txt) || 0) + 1);
  }
});
const bestLabel = (loc, k) => {
  const m = canon[loc] && canon[loc][k];
  if (!m || !m.size) return null;
  return [...m.entries()].sort((a, b) => b[1] - a[1])[0][0];
};

/* ── pass 2: rewrite the Korean-only labels ──────────────────────────── */
let changed = 0, files = 0, unresolved = 0;
const unresolvedKeys = new Set();

all.forEach(rel => {
  const loc = localeOf(rel);
  if (onlyLocale && loc !== onlyLocale) return;
  const abs = path.join(ROOT, rel);
  const src = fs.readFileSync(abs, 'utf8');
  let hits = 0;
  LINK.lastIndex = 0;
  const out = src.replace(LINK, (full, a1, href, a2, cls, a3, inner) => {
    const txt = visibleText(inner);
    if (!txt || !HANGUL.test(txt) || OTHER.test(txt)) return full;
    const label = bestLabel(loc, keyOf(href));
    if (!label) { unresolved++; unresolvedKeys.add(`${loc} ${keyOf(href)} (${txt})`); return full; }
    /* keep the icon span and any other markup; swap only the text run */
    let replaced = false;
    const nextInner = inner.replace(/>([^<>]*[가-힣][^<>]*)</g, (mm, t) => {
      if (replaced || OTHER.test(t)) return mm;
      replaced = true;
      return '>' + t.replace(/[가-힣][가-힣\s·]*/, stripEmoji(label)) + '<';
    });
    const finalInner = replaced ? nextInner
      : inner.replace(/([가-힣][가-힣\s·]*)/, stripEmoji(label));
    if (finalInner === inner) return full;
    hits++;
    return `<a${a1}href="${href}"${a2}class="${cls}"${a3}>${finalInner}</a>`;
  });
  if (!hits) return;
  changed += hits; files++;
  if (CHECK) { console.log(`  DRIFT ${rel} (${hits})`); return; }
  fs.writeFileSync(abs, out, 'utf8');
  console.log(`  ${rel}: ${hits} label(s)`);
});

if (unresolvedKeys.size) {
  console.log(`\n${unresolvedKeys.size} link(s) have no localized label anywhere in their locale — left as Korean:`);
  [...unresolvedKeys].slice(0, 10).forEach(k => console.log('   ' + k));
}
if (CHECK) {
  console.log(changed ? `\n${changed} label(s) in ${files} file(s) still Korean` : '\nno Korean-only sidebar labels');
  process.exit(changed ? 1 : 0);
}
console.log(`\n${changed} label(s) rewritten across ${files} file(s).`);
