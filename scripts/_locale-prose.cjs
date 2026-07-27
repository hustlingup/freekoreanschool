/**
 * _locale-prose.cjs — the shared rules for "what counts as translatable prose
 * on a localized page". Required by audit-content-locale-dup.cjs,
 * extract-content-untranslated.cjs and apply-content-translations.cjs.
 *
 * These three MUST agree. When the audit, the extractor and the patcher each
 * carried their own copy of the exclusion regex they immediately drifted, and
 * a rule missing from one of them is not a cosmetic problem: the audit
 * over-reports, the extractor hands translators content that is already
 * correct, and the patcher writes a translation into a node that is supposed
 * to stay identical in every locale.
 *
 * TWO CATEGORIES ARE EXCLUDED, for different reasons.
 *
 * 1. TRANSCRIPTION — Revised-Romanization of the Korean being taught, and the
 *    per-locale pronunciation aids. Latin text that is a transcription of
 *    Korean is SUPPOSED to be byte-identical in every locale. culture/ and
 *    travel/ carry ~8,300 such nodes under class names that appear nowhere in
 *    learn/: rom-text, food-card-rom, phrase-rom, rom-cell, sodam-rom-text,
 *    dialogue-rom, bap-rom, lang-mini-rom, chant-line-rom, chant-rom,
 *    skincare-rom.
 *
 * 2. LOCALE-SWAP PAIRS — the page ships more than one language's copy and CSS
 *    reveals exactly one:
 *        .ja-block { display:none }  body.lang-ja .ja-block { display:block }
 *        .ja-kana  { display:none }  body.lang-ja .ja-kana  { display:inline }
 *        .kata     { display:none }  body.lang-ja .kata     { display:block }
 *        .ja-only, .en-only, .zh-tw-only, .no-ja — same shape
 *    The hidden copy is not untranslated content; the page IS translated.
 *
 * ⚠️ THE PATTERN IS ANCHORED ON TOKEN BOUNDARIES ON PURPOSE. A naive /rom/
 * substring test also swallows travel-promo-title, travel-promo-desc and five
 * more `travel-promo-*` classes, which are real prose — silently deleting
 * seven classes of genuine content from every measurement.
 *
 * `drama-kor-ja` needs no entry: it only ever appears alongside `ja-block`.
 */
'use strict';

const EXCLUDE_CLASS =
  /(^|-)(rom|romaja|romanization)(-|$)|(^|-)(pron|reading)-(line|aid)(-|$)|(^|-)(katakana|kata|zhuyin)(-|$)|(^|-)ja-(block|kana|only)(-|$)|(^|-)(no-ja|en-only|zh-tw-only)(-|$)/;

const HANGUL = /[가-힣ᄀ-ᇿ㄰-㆏]/;
const SENTENCE_MIN = 30;

const hasExcludedClass = attrs => {
  const m = /class="([^"]*)"/.exec(attrs);
  return m ? m[1].split(/\s+/).some(tok => EXCLUDE_CLASS.test(tok)) : false;
};

const decode = s => s
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
  .replace(/&[a-z]+;/gi, ' ');

const norm = s => decode(s).replace(/\s+/g, ' ').trim();

/** Strip head/script/style/comments and blank the text of excluded elements.
 *  `blankFn` controls whether removed regions collapse (measurement) or keep
 *  their byte length (patching, where offsets must stay valid). */
function prepare(html, preserveLength) {
  const blank = preserveLength ? m => ' '.repeat(m.length) : () => '<';
  let s = html;
  s = s.replace(/<script\b[\s\S]*?<\/script>/gi, blank);
  s = s.replace(/<style\b[\s\S]*?<\/style>/gi, blank);
  s = s.replace(/<head\b[\s\S]*?<\/head>/gi, blank);
  s = s.replace(/<!--[\s\S]*?-->/g, blank);
  /* The trailing `<` is a LOOKAHEAD, not part of the match. Consuming it
     makes /g resume after it, so an excluded element sitting immediately
     after another excluded element is never tested — the regex has already
     eaten the `<` that would have started it. That is not hypothetical:
         <div class="dialogue-rom">Annyeonghaseyo…<span class="ja-kana"> アンニョン…</span>
     the div is excluded, and the CSS-hidden ja-kana span behind it then
     leaked into the prose set and was reported as untranslated content. */
  s = s.replace(/<(\w+)([^>]*\bclass="[^"]*"[^>]*)>([^<]*)(?=<)/g,
    (full, tag, attrs, txt) => hasExcludedClass(attrs)
      ? `<${tag}${attrs}>${preserveLength ? ' '.repeat(txt.length) : ''}`
      : full);
  return s;
}

/** Visible text nodes, in document order. Split on TAGS, never on whitespace. */
function textNodes(html) {
  const s = prepare(html, false);
  const out = [];
  const re = />([^<]+)</g;
  let m;
  while ((m = re.exec(s)) !== null) {
    const t = norm(m[1]);
    if (t) out.push(t);
  }
  return out;
}

/** Text nodes that are candidate PROSE: no Korean, enough letters to matter. */
const proseNodes = html => textNodes(html)
  .filter(t => !HANGUL.test(t) && t.replace(/[^\p{L}]/gu, '').length >= 3);

module.exports = {
  EXCLUDE_CLASS, HANGUL, SENTENCE_MIN,
  hasExcludedClass, decode, norm, prepare, textNodes, proseNodes,
};
