/* ═══════════════════════════════════════════════════════
   HangulUtil — shared hangul compose/decompose helpers
   (Pure data + math; no DOM access at load time, so this
   file is safe to require() from node. Shared by the
   letter-writing and typing features. js/syllable-builder.js
   deliberately keeps its own copy — do not refactor it.)

   NOTE: compose() is INDEX-ONLY — it takes the Unicode
   jamo indices, not characters. Callers holding chars
   convert first:
     compose(CHO.indexOf(c), JUNG.indexOf(v), JONG.indexOf(b))
   JONG.indexOf('') === 0, so an absent batchim works too.
═══════════════════════════════════════════════════════ */

'use strict';

const HangulUtil = (() => {
  // Index → char. Order is the Unicode standard order — do not reorder.
  const CHO  = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];                     // 19
  const JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];             // 21
  const JONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ']; // 28, [0] = ''

  const JUNG_COMBINE = { 'ㅗㅏ':'ㅘ','ㅗㅐ':'ㅙ','ㅗㅣ':'ㅚ','ㅜㅓ':'ㅝ','ㅜㅔ':'ㅞ','ㅜㅣ':'ㅟ','ㅡㅣ':'ㅢ','ㅏㅣ':'ㅐ','ㅑㅣ':'ㅒ','ㅓㅣ':'ㅔ','ㅕㅣ':'ㅖ' };
  const JONG_COMBINE = { 'ㄱㅅ':'ㄳ','ㄴㅈ':'ㄵ','ㄴㅎ':'ㄶ','ㄹㄱ':'ㄺ','ㄹㅁ':'ㄻ','ㄹㅂ':'ㄼ','ㄹㅅ':'ㄽ','ㄹㅌ':'ㄾ','ㄹㅍ':'ㄿ','ㄹㅎ':'ㅀ','ㅂㅅ':'ㅄ' };
  const JONG_SPLIT   = {}; // built by inverting JONG_COMBINE: JONG_SPLIT['ㄳ'] = ['ㄱ','ㅅ']

  Object.keys(JONG_COMBINE).forEach(pair => {
    JONG_SPLIT[JONG_COMBINE[pair]] = [pair[0], pair[1]];
  });

  const V_VERT  = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅣ';
  const V_HORIZ = 'ㅗㅛㅜㅠㅡ';
  const V_MIXED = 'ㅘㅙㅚㅝㅞㅟㅢ';

  const S_BASE = 0xAC00;
  const S_LAST = 0xD7A3;

  // Indices only — see the header comment.
  function compose(choIdx, jungIdx, jongIdx) {
    return String.fromCodePoint(S_BASE + (choIdx * 21 + jungIdx) * 28 + (jongIdx || 0));
  }

  // Returns { cho, jung, jong } as CHARS (jong '' when absent), or null if not a composed syllable.
  function decompose(char) {
    if (!char) return null;
    const cp = char.codePointAt(0);
    if (cp < S_BASE || cp > S_LAST) return null;
    const n = cp - S_BASE;
    return {
      cho:  CHO[Math.floor(n / 28 / 21)],
      jung: JUNG[Math.floor(n / 28) % 21],
      jong: JONG[n % 28],
    };
  }

  function isSyllable(char) {
    if (!char) return false;
    const cp = char.codePointAt(0);
    return cp >= S_BASE && cp <= S_LAST;
  }

  // Compatibility jamo block only (ㄱ … ㅣ), not the conjoining jamo block.
  function isJamo(char) {
    if (!char) return false;
    const cp = char.codePointAt(0);
    return cp >= 0x3131 && cp <= 0x3163;
  }

  // 'v' vertical | 'h' horizontal | 'm' mixed; null if not a vowel.
  function vowelClass(jungChar) {
    if (!jungChar) return null;
    if (V_VERT.indexOf(jungChar)  !== -1) return 'v';
    if (V_HORIZ.indexOf(jungChar) !== -1) return 'h';
    if (V_MIXED.indexOf(jungChar) !== -1) return 'm';
    return null;
  }

  return { CHO, JUNG, JONG, JUNG_COMBINE, JONG_COMBINE, JONG_SPLIT,
           V_VERT, V_HORIZ, V_MIXED,
           compose, decompose, isSyllable, isJamo, vowelClass };
})();

if (typeof window !== 'undefined') window.HangulUtil = HangulUtil;
if (typeof module !== 'undefined') module.exports = HangulUtil;
