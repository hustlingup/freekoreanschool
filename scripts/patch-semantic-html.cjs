#!/usr/bin/env node
/**
 * patch-semantic-html.cjs
 *
 * Structural (NOT editorial) SEO pass over culture/** and travel/** in all 9 locales.
 *
 * WHAT IT DOES — re-tagging only, never touches prose:
 *   1. Promotes styled section/sub-section/card-title <div>s to real <h2>/<h3>/<h4>,
 *      keeping every original class + attribute so css/style.css renders identically.
 *   2. Converts prose-bearing <div>s to <p> (or wraps their leading inline run in a
 *      <p> when they contain block children, so we never nest a block inside <p>).
 *   3. Guarantees exactly one <h1> inside <main>.
 *   4. Adds lang="ko" to Hangul-dominant blocks (AC00–D7A3 / 1100–11FF / 3130–318F).
 *   5. Repairs heading hierarchy: never skips a level, never emits h3 before an h2.
 *
 * Visual parity is preserved by the `.as-heading` / `.as-para` reset block in
 * css/style.css (inserted just after the global h1–h6 typography rule so that all
 * the later, more specific component class rules still win).
 *
 * IDEMPOTENT: elements already carrying `as-heading`/`as-para` are left alone.
 *
 *   node scripts/patch-semantic-html.cjs            # apply
 *   node scripts/patch-semantic-html.cjs --dry-run  # report only
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DRY = process.argv.includes('--dry-run');

/* ── Configuration ─────────────────────────────────────────────────── */

// class -> desired heading level (before hierarchy repair)
// `culture-sub-heading` is resolved dynamically: it is a top-level section
// heading when it carries the id the sidebar anchors to, otherwise a sub-heading.
const HEADING_CLASSES = {
  'food-cat-header': 2,
  'kt-topic-title': 2,
  'kt-topic-title-en': 3,
  'city-section-label': 3,
  'lang-box-title': 3,
  'tip-label': 3,
  'itinerary-title': 3,
  'day-block-title': 3,
  'sodam-category-header': 3,
  'photo-caption-title': 4,
  'food-card-name': 4,
  'genre-name': 4,
  'chef-name': 4,
  'city-attraction-name': 4,
  'etiquette-title': 4,
  'drama-title': 4,
  'timeline-title': 4,
  'festival-name': 4,
  'month-name': 4,
  'food-item-name': 4,
  'holiday-name': 4,
  'place-name': 4,
  'route-stop-name': 4,
  'gen-name': 4,
  'app-name': 4,
};

// prose blocks -> <p> (converted whatever their length)
const PARA_CLASSES = new Set([
  'kr-trans',
  'tip-text',
  'photo-caption-text',
  'kt-topic-desc',
  'genre-desc',
  'chef-desc',
  'drama-desc',
  'etiquette-desc',
  'timeline-desc',
  'schedule-detail',
  'festival-desc',
  'city-tagline',
  'phrase-context',
]);

// Long tail: any *-desc / *-text / *-body / *-detail / *-note div that actually
// holds a paragraph of running text also becomes a <p>. Keeps the config from
// having to enumerate every one-off class across 189 pages.
const PARA_SUFFIX = /-(desc|text|body|detail|note|tagline|summary)$/;
const PARA_SUFFIX_MIN_CHARS = 120;

// blocks that are Korean-only by design -> lang="ko" (guarded by Hangul check)
const KO_CLASSES = new Set([
  'kr-trans', 'kor-cell', 'kor-trans', 'phrase-kor', 'lang-mini-kor',
  'sodam-kor-text', 'dialogue-kor', 'photo-caption-kr', 'etiquette-kor',
  'bap-kor', 'chef-name-kr', 'genre-name-kr', 'timeline-title-kr',
  'drama-kor', 'food-card-name', 'kt-topic-title',
  'city-attraction-name', 'festival-name', 'food-item-name', 'place-name',
  'holiday-name', 'route-stop-name', 'month-name', 'sodam-kor', 'grammar-pattern',
]);

const HANGUL = /[가-힣ᄀ-ᇿ㄰-㆏]/;
const HANGUL_G = /[가-힣ᄀ-ᇿ㄰-㆏]/g;
const BLOCK_TAG = /<(div|p|ul|ol|table|section|article|figure|h[1-6])\b/i;

/* ── Small HTML helpers (no parser dep — files are machine-generated & regular) ── */

function attrsOf(openTag) {
  const out = {};
  const re = /([a-zA-Z-]+)\s*=\s*"([^"]*)"/g;
  let m;
  while ((m = re.exec(openTag))) out[m[1]] = m[2];
  return out;
}

/** Find index just past the </div> matching the <div> whose open tag starts at `start`. */
function matchingClose(html, start) {
  const openEnd = html.indexOf('>', start);
  if (openEnd === -1) return null;
  let depth = 1;
  let i = openEnd + 1;
  const re = /<(\/?)div\b/gi;
  re.lastIndex = i;
  let m;
  while ((m = re.exec(html))) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) {
      return { openEnd, innerStart: openEnd + 1, innerEnd: m.index, closeEnd: html.indexOf('>', m.index) + 1 };
    }
  }
  return null;
}

function stripTags(s) {
  return s.replace(/<[^>]*>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
}

function isHangulDominant(inner) {
  const text = stripTags(inner);
  const hangul = (text.match(HANGUL_G) || []).length;
  if (!hangul) return false;
  const letters = (text.match(/[\p{L}]/gu) || []).length;
  return letters > 0 && hangul / letters >= 0.6;
}

function hasWords(s, min) {
  return stripTags(s).replace(/\s+/g, ' ').trim().length >= min;
}

/* ── Pass 1: collect every convertible element inside <main> ────────── */

function collectTargets(main) {
  const targets = [];
  const re = /<div\b([^>]*)>/gi;
  let m;
  while ((m = re.exec(main))) {
    const openTag = m[0];
    const a = attrsOf(openTag);
    const cls = (a.class || '').split(/\s+/).filter(Boolean);
    if (cls.includes('as-heading') || cls.includes('as-para')) continue; // idempotency

    const span = matchingClose(main, m.index);
    if (!span) continue;
    const inner = main.slice(span.innerStart, span.innerEnd);

    let kind = null;
    let level = null;
    const hasBlockChild = BLOCK_TAG.test(inner);

    // A heading may only contain phrasing content, so a div that wraps other
    // block elements is a container, not a title — never promote it.
    if (!hasBlockChild) {
      if (cls.includes('culture-sub-heading')) {
        kind = 'heading';
        level = a.id ? 2 : 3;
      } else {
        for (const c of cls) {
          if (c in HEADING_CLASSES) { kind = 'heading'; level = HEADING_CLASSES[c]; break; }
        }
      }
    }

    if (!kind) {
      for (const c of cls) {
        if (PARA_CLASSES.has(c)) { kind = 'para'; break; }
      }
    }
    if (!kind) {
      for (const c of cls) {
        if (PARA_SUFFIX.test(c) && hasWords(inner, PARA_SUFFIX_MIN_CHARS)) { kind = 'para'; break; }
      }
    }

    const wantsKo = cls.some((c) => KO_CLASSES.has(c)) && isHangulDominant(inner) && !/\blang=/.test(openTag);
    if (!kind && !wantsKo) continue;

    targets.push({ start: m.index, openTag, span, inner, cls, kind, level, wantsKo });
  }
  return targets;
}

/* ── Pass 2: hierarchy repair ────────────────────────────────────────
   Maps the desired (semantic) levels onto actual h-levels with a depth
   stack, so that no level is ever skipped, nothing outranks the page <h1>,
   AND siblings at the same desired level always get the same actual level
   (a plain running clamp would emit h3 for the first card then h4 for its
   siblings). Actual level = stack depth + 2, since <h1> owns level 1. */

function repairHierarchy(targets) {
  const stack = []; // desired levels of the currently open ancestors
  for (const t of targets) {
    if (t.kind !== 'heading') continue;
    while (stack.length && stack[stack.length - 1] >= t.level) stack.pop();
    t.finalLevel = Math.min(stack.length + 2, 6);
    stack.push(t.level);
  }
}

/* ── Pass 3: rewrite via non-overlapping point edits ─────────────────
   Elements nest (e.g. .kr-trans lives inside .tip-text), so we must never
   splice whole element spans — an outer splice would clobber an already
   rewritten inner one and use stale offsets. Instead every change is a
   {at, len, text} edit against the open tag, the close tag, or an insertion
   point, and those regions are disjoint even for nested elements. Applying
   them in descending position order keeps all offsets valid. */

function rewrite(main, targets) {
  const stats = { h2: 0, h3: 0, h4: 0, p: 0, ko: 0, wrapped: 0 };
  const edits = [];

  for (const t of targets) {
    const openLen = t.span.openEnd + 1 - t.start;
    let openTag = t.openTag;
    let closeTag = null;
    let addClass = null;

    if (t.kind === 'heading') {
      const tag = 'h' + t.finalLevel;
      openTag = openTag.replace(/^<div\b/, '<' + tag);
      closeTag = '</' + tag + '>';
      addClass = 'as-heading';
      stats[tag] = (stats[tag] || 0) + 1;
    } else if (t.kind === 'para') {
      const bm = t.inner.match(BLOCK_TAG);
      if (bm) {
        // A block child cannot live inside <p>. Wrap the leading inline run
        // instead: same tree shape, same text, same order.
        const head = t.inner.slice(0, bm.index);
        const trimmed = head.replace(/\s+$/, '');
        if (hasWords(head, 40) && trimmed.length < head.length) {
          edits.push({ at: t.span.innerStart, len: 0, text: '<p class="as-para">' });
          edits.push({ at: t.span.innerStart + trimmed.length, len: 0, text: '</p>' });
          stats.p++;
          stats.wrapped++;
        }
      } else if (hasWords(t.inner, 1)) {
        openTag = openTag.replace(/^<div\b/, '<p');
        closeTag = '</p>';
        addClass = 'as-para';
        stats.p++;
      }
    }

    if (addClass) {
      openTag = /\bclass="/.test(openTag)
        ? openTag.replace(/\bclass="([^"]*)"/, (s, c) => `class="${c} ${addClass}"`)
        : openTag.replace(/^(<\w+)/, `$1 class="${addClass}"`);
    }
    if (t.wantsKo) {
      openTag = openTag.replace(/>$/, ' lang="ko">');
      stats.ko++;
    }

    if (openTag !== t.openTag) edits.push({ at: t.start, len: openLen, text: openTag });
    if (closeTag) edits.push({ at: t.span.innerEnd, len: t.span.closeEnd - t.span.innerEnd, text: closeTag });
  }

  // descending; for ties the later-registered (inner) edit is applied first
  edits.sort((a, b) => b.at - a.at || b.len - a.len);
  let prev = Infinity;
  for (const e of edits) {
    if (e.at + e.len > prev) throw new Error(`overlapping edit at ${e.at}`);
    prev = e.at;
    main = main.slice(0, e.at) + e.text + main.slice(e.at + e.len);
  }
  return { main, stats };
}

/* ── H1 guarantee ──────────────────────────────────────────────────── */

function ensureH1(main) {
  if (/<h1[\s>]/i.test(main)) return { main, changed: false, ok: true };

  // Standard idiom: the page title lives as <h2> inside .culture-section-header
  const hdr = main.search(/<div class="culture-section-header"[^>]*>/i);
  if (hdr !== -1) {
    const slice = main.slice(hdr, hdr + 4000);
    const rel = slice.search(/<h2(\s[^>]*)?>/i);
    if (rel !== -1) {
      const abs = hdr + rel;
      const end = main.indexOf('</h2>', abs);
      if (end !== -1) {
        const open = main.slice(abs, main.indexOf('>', abs) + 1);
        const newOpen = open.replace(/^<h2/i, '<h1');
        main = main.slice(0, abs) + newOpen + main.slice(main.indexOf('>', abs) + 1, end) + '</h1>' + main.slice(end + 5);
        return { main, changed: true, ok: true };
      }
    }
  }
  return { main, changed: false, ok: false };
}

/* ── Per-file driver ───────────────────────────────────────────────── */

function countTags(html) {
  const c = (re) => (html.match(re) || []).length;
  return {
    h1: c(/<h1[\s>]/gi), h2: c(/<h2[\s>]/gi), h3: c(/<h3[\s>]/gi),
    h4: c(/<h4[\s>]/gi), p: c(/<p[\s>]/gi), ko: c(/lang="ko"/g),
  };
}

function processFile(file) {
  const orig = fs.readFileSync(file, 'utf8');
  const ms = orig.search(/<main\b/i);
  const me = orig.lastIndexOf('</main>');
  if (ms === -1 || me === -1) return { file, skipped: 'no <main>' };

  const head = orig.slice(0, ms);
  const tail = orig.slice(me);
  let main = orig.slice(ms, me);

  const before = countTags(main);

  const h1res = ensureH1(main);
  main = h1res.main;


  const targets = collectTargets(main);
  repairHierarchy(targets);
  const { main: out, stats } = rewrite(main, targets);
  main = out;

  const after = countTags(main);
  const result = {
    file: path.relative(ROOT, file).replace(/\\/g, '/'),
    before, after, stats,
    noH1: !h1res.ok && before.h1 === 0,
    changed: main !== orig.slice(ms, me),
  };

  if (result.changed && !DRY) fs.writeFileSync(file, head + main + tail, 'utf8');
  return result;
}

/* ── CSS: parity reset + widen .culture-section-header selector ─────── */

const CSS_BLOCK = `
/* ── Semantic-HTML parity reset (scripts/patch-semantic-html.cjs) ─────
   These elements used to be <div>s and are now real <h2>/<h3>/<h4>/<p>.
   Reset only the UA + global element-level typography so they render
   exactly as the divs did; the component class rules further down the
   sheet are more specific in source order and still win. */
.as-heading { font-size: inherit; font-weight: inherit; line-height: inherit;
              letter-spacing: inherit; color: inherit; margin: 0; display: block; }
.as-para    { font-size: inherit; color: inherit; line-height: inherit; margin: 0; }
`;

/**
 * Existing rules like `.lesson-section p` / `.lesson-section h2` are (0,1,1) —
 * more specific than a component class like `.kr-trans` (0,1,0). They never used
 * to match these elements (they were <div>s), but they do now, which silently
 * restyles them. Exclude the promoted elements explicitly so the rendering is
 * exactly what it was before. `h1` selectors are deliberately left alone: the
 * page-title h1 is never marked `.as-heading` and must keep its styling.
 */
function guardDescendantRules(css) {
  return css.replace(/([^{}();]+)\{/g, (whole, selector) => {
    if (/^\s*(@|\/\*)/.test(selector) || !selector.includes(':')) { /* fallthrough */ }
    if (/^\s*@/.test(selector)) return whole;
    const parts = selector.split(',');
    let touched = false;
    const next = parts.map((raw) => {
      const part = raw.trim();
      if (!part || part.includes(':not(.as-')) return raw;
      const m = part.match(/(^|[\s>+~])(p|h[2-6])$/);
      if (!m || !/[\s>+~]/.test(part)) return raw;
      touched = true;
      const guard = m[2] === 'p' ? ':not(.as-para)' : ':not(.as-heading)';
      return raw.replace(/(p|h[2-6])(\s*)$/, `$1${guard}$2`);
    });
    return touched ? next.join(',') + '{' : whole;
  });
}

function patchCss() {
  const cssPath = path.join(ROOT, 'css', 'style.css');
  let css = fs.readFileSync(cssPath, 'utf8');
  let changed = false;

  // Widen the page-title selector BEFORE guarding, otherwise the guard rewrites
  // `.culture-section-header h2 {` and this match no longer fires.
  if (css.includes('.culture-section-header h2 {') && !css.includes('.culture-section-header h1,')) {
    css = css.replace('.culture-section-header h2 {', '.culture-section-header h1,\n    .culture-section-header h2 {');
    changed = true;
  }

  const guarded = guardDescendantRules(css);
  if (guarded !== css) { css = guarded; changed = true; }

  if (!css.includes('.as-heading {')) {
    const anchor = 'h6 { font-size: 1rem; }';
    const at = css.indexOf(anchor);
    if (at === -1) throw new Error('css anchor "h6 { font-size: 1rem; }" not found');
    css = css.slice(0, at + anchor.length) + '\n' + CSS_BLOCK + css.slice(at + anchor.length);
    changed = true;
  }


  if (changed && !DRY) fs.writeFileSync(cssPath, css, 'utf8');
  return changed;
}

/* ── main ──────────────────────────────────────────────────────────── */

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.isFile() && e.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

const files = [...walk(path.join(ROOT, 'culture')), ...walk(path.join(ROOT, 'travel'))].sort();
const results = files.map(processFile);

const cssChanged = patchCss();

const agg = { h1: [0, 0], h2: [0, 0], h3: [0, 0], h4: [0, 0], p: [0, 0], ko: [0, 0] };
let changedCount = 0;
const noH1 = [];
for (const r of results) {
  if (r.skipped) { noH1.push(r.file + ' (' + r.skipped + ')'); continue; }
  if (r.changed) changedCount++;
  if (r.noH1) noH1.push(r.file);
  for (const k of Object.keys(agg)) { agg[k][0] += r.before[k]; agg[k][1] += r.after[k]; }
}

console.log(JSON.stringify({ mode: DRY ? 'dry-run' : 'apply', files: files.length, changed: changedCount, cssChanged, totals: agg, noH1 }, null, 2));

// per-file table for the report
const rows = results.filter((r) => !r.skipped).map((r) =>
  [r.file, `h1 ${r.before.h1}->${r.after.h1}`, `h2 ${r.before.h2}->${r.after.h2}`,
   `h3 ${r.before.h3}->${r.after.h3}`, `h4 ${r.before.h4}->${r.after.h4}`,
   `p ${r.before.p}->${r.after.p}`, `ko ${r.before.ko}->${r.after.ko}`].join('  '));
fs.writeFileSync(path.join(__dirname, '_semantic-html-report.txt'), rows.join('\n'), 'utf8');
