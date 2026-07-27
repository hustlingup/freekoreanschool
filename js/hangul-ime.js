/* ═══════════════════════════════════════════════════════
   HangulIME — pure 2-set (두벌식 / Dubeolsik) input automaton
   (Spec: docs/writing-typing/prompt-D-ime-typing-engine.md §1)

   NO DOM ACCESS, EVER. This file must run under plain
   `node -e "require('./js/hangul-ime.js')"` with no `window`
   defined at all. The only reference to `window` is the
   `typeof`-guarded global assignment in the tail. Keep it
   that way — js/typing-game.js owns all the UI.

   Depends on js/hangul-util.js (CHO/JUNG/JONG tables,
   compose(), JUNG_COMBINE, JONG_COMBINE, JONG_SPLIT).

   ── Public API ─────────────────────────────────────────
     HangulIME.KEYMAP                 KeyboardEvent.code → [unshifted, shifted?]
     HangulIME.jamoForCode(code, shifted) → jamo char | null
     HangulIME.codeForJamo(jamo)      → { code, shifted } | null   (reverse
                                        lookup; the games need it to highlight
                                        the key a learner should press)
     HangulIME.create()               → instance:
        input(jamo)   feed ONE of the 33 KEYMAP jamo; returns value()
        backspace()   peel ONE component; returns value()
        flush()       commit the in-progress block; returns value()
        value()       committed text + rendered in-progress block
        current()     rendered in-progress block only ('' if none)
        reset()       clear everything

   Instances share no state — `create()` twice gives two
   independent composers.

   ── State model ────────────────────────────────────────
   `committed` (string) + at most one in-progress block
   `{ cho, jung, jong, jungComposed }` held as CHARS ('' when
   empty). A block with only `cho` renders as the bare
   compatibility jamo; likewise a block with only `jung`. A
   block never has a `jong` without a `cho` — rule C4 only
   attaches a batchim to a {cho,jung} block.

   `jungComposed` is true ONLY when the current `jung` was
   built by combining two keystrokes through JUNG_COMBINE
   (rules V3/V4). It is what makes backspace correct: ㅐㅔㅒㅖ
   typed directly from their own keys (O/P + shift) must be
   removed WHOLE, while the same characters reached via
   ㅏ+ㅣ / ㅓ+ㅣ / ㅑ+ㅣ / ㅕ+ㅣ peel back to their first
   component. Without the flag, `dho<` and `dhk<` would both
   have to guess.

   ── Golden tests (spec §1.3) ───────────────────────────
   QWERTY letters; UPPERCASE = shifted, `<` = backspace.
   All 18 rows are executed by scripts/test-hangul-ime.cjs.
   (The spec's inline Verification snippet omits the `dk<`
   row that this table lists — test 18, not 17.)

     | input      | value() | why                                        |
     |------------|---------|--------------------------------------------|
     | rk         | 가      | ㄱ+ㅏ                                       |
     | rkr        | 각      | jong attach                                 |
     | rkrt       | 갃      | jong ㄱ+ㅅ→ㄳ compound                      |
     | rkrtk      | 각사    | vowel steals batchim; ㄳ splits, ㅅ new cho |
     | rkk        | 가ㅏ    | ㅏ+ㅏ not combinable → commit 가            |
     | gksrnrdj   | 한국어  | 한 / 국 (jong kept, next is a consonant) / 어 |
     | dhk        | 와      | ㅇ + (ㅗ+ㅏ→ㅘ)                             |
     | dnjs       | 원      | ㅇ + (ㅜ+ㅓ→ㅝ) + ㄴ                        |
     | Rkc        | 깣      | shifted ㄲ cho, jong ㅊ                     |
     | anfR       | 물ㄲ    | ㄹ+ㄲ is no compound jong → commit 물       |
     | ekfr       | 닭      | ㄷㅏㄹ + ㄱ → jong ㄺ                        |
     | dml        | 의      | ㅇ + (ㅡ+ㅣ→ㅢ)                             |
     | dk<        | ㅇ      | backspace removes jung, cho remains         |
     | ekfr<      | 달      | compound jong ㄺ peels to ㄹ                |
     | ekfr<<     | 다      | then jong removed                           |
     | ekfr<<<    | ㄷ      | then jung removed                           |
     | ekfr<<<<   | (empty) | then cho removed                            |
     | rkrtk<     | 각ㅅ    | block {ㅅ,ㅏ} loses ㅏ; committed 각 intact  |

   ── Two behaviours people "fix" by mistake ─────────────
   1. Backspace with NO in-progress block deletes the last
      committed character WHOLE — committed text is never
      decomposed back into jamo. Real IMEs genuinely differ
      here (some keep a per-character undo history); the spec
      picks whole-char delete as the simple, acceptable
      choice. Do not "improve" it into decomposition without
      changing the golden tests first.
   2. JUNG_COMBINE (in hangul-util.js) contains 'ㅏㅣ'→ㅐ,
      'ㅓㅣ'→ㅔ, 'ㅑㅣ'→ㅒ, 'ㅕㅣ'→ㅖ, so `dkl` composes 애
      rather than leaving 아ㅣ. That is libhangul's behaviour
      and it is what the spec mandates (§1.2 V3/V4 say to
      consult the table). It is only reachable when a learner
      types the long way round — ㅐㅔㅒㅖ have their own keys.
      The jungComposed flag keeps backspace sane in both
      cases.
═══════════════════════════════════════════════════════ */

'use strict';

const HangulIME = (() => {
  const HangulUtil =
    (typeof window !== 'undefined' && window.HangulUtil) ||
    (typeof require !== 'undefined' ? require('./hangul-util.js') : null);

  if (!HangulUtil) {
    throw new Error('HangulIME: js/hangul-util.js must be loaded first.');
  }

  const { CHO, JUNG, JONG, JUNG_COMBINE, JONG_COMBINE, JONG_SPLIT, compose } = HangulUtil;

  // ── Key map — copied EXACTLY from spec §1.1. Do not reorder or "correct".
  // Keyed by KeyboardEvent.code so the user's OS layout and IME state are
  // irrelevant. Value = [unshifted, shifted]; single-element = same for both.
  // Treat as read-only.
  const KEYMAP = {
    KeyQ:['ㅂ','ㅃ'], KeyW:['ㅈ','ㅉ'], KeyE:['ㄷ','ㄸ'], KeyR:['ㄱ','ㄲ'], KeyT:['ㅅ','ㅆ'],
    KeyY:['ㅛ'], KeyU:['ㅕ'], KeyI:['ㅑ'], KeyO:['ㅐ','ㅒ'], KeyP:['ㅔ','ㅖ'],
    KeyA:['ㅁ'], KeyS:['ㄴ'], KeyD:['ㅇ'], KeyF:['ㄹ'], KeyG:['ㅎ'],
    KeyH:['ㅗ'], KeyJ:['ㅓ'], KeyK:['ㅏ'], KeyL:['ㅣ'],
    KeyZ:['ㅋ'], KeyX:['ㅌ'], KeyC:['ㅊ'], KeyV:['ㅍ'], KeyB:['ㅠ'], KeyN:['ㅜ'], KeyM:['ㅡ'],
  };

  // jamo → { code, shifted } (33 entries: 26 unshifted + 7 shifted).
  const REVERSE = {};
  Object.keys(KEYMAP).forEach(code => {
    const pair = KEYMAP[code];
    if (!(pair[0] in REVERSE)) REVERSE[pair[0]] = { code, shifted: false };
    if (pair.length > 1 && !(pair[1] in REVERSE)) REVERSE[pair[1]] = { code, shifted: true };
  });

  // Inverse of JUNG_COMBINE, built locally (hangul-util ships JONG_SPLIT but
  // not this one): JUNG_SPLIT['ㅘ'] = ['ㅗ','ㅏ'].
  const JUNG_SPLIT = {};
  Object.keys(JUNG_COMBINE).forEach(pair => {
    JUNG_SPLIT[JUNG_COMBINE[pair]] = [pair[0], pair[1]];
  });

  // Valid batchim = every KEYMAP consonant EXCEPT ㄸ ㅃ ㅉ (16 of them).
  // Derived, not hand-listed, so it cannot drift from KEYMAP.
  const NOT_JONG = 'ㄸㅃㅉ';
  const VALID_JONG = {};
  Object.keys(KEYMAP).forEach(code => {
    KEYMAP[code].forEach(j => {
      if (CHO.indexOf(j) !== -1 && NOT_JONG.indexOf(j) === -1 && JONG.indexOf(j) !== -1) {
        VALID_JONG[j] = true;
      }
    });
  });

  function jamoForCode(code, shifted) {
    const pair = KEYMAP[code];
    if (!pair) return null;
    return (shifted && pair.length > 1) ? pair[1] : pair[0];
  }

  function codeForJamo(jamo) {
    const hit = REVERSE[jamo];
    return hit ? { code: hit.code, shifted: hit.shifted } : null;
  }

  // A consonant: any choseong, plus the compound-batchim chars (which can be
  // held in a block's jong slot but never typed directly).
  function isC(j) {
    return !!j && (CHO.indexOf(j) !== -1 || !!JONG_SPLIT[j]);
  }
  function isV(j) {
    return !!j && JUNG.indexOf(j) !== -1;
  }

  function newBlock(cho, jung, jong) {
    return { cho: cho || '', jung: jung || '', jong: jong || '', jungComposed: false };
  }

  // A block with only cho, or only jung, is the bare compatibility jamo —
  // NOT a composed syllable.
  function render(block) {
    if (!block) return '';
    const { cho, jung, jong } = block;
    if (!cho && !jung) return '';
    if (cho && !jung) return cho;
    if (!cho && jung) return jung;
    const ci = CHO.indexOf(cho);
    const vi = JUNG.indexOf(jung);
    const ji = JONG.indexOf(jong || '');
    // Defensive: an unmappable combination degrades to the raw jamo run
    // instead of producing a garbage code point.
    if (ci < 0 || vi < 0 || ji < 0) return cho + jung + (jong || '');
    return compose(ci, vi, ji);
  }

  function create() {
    let committed = '';
    let block = null;

    function commit() {
      committed += render(block);
      block = null;
    }

    function value() { return committed + render(block); }
    function current() { return render(block); }

    function reset() {
      committed = '';
      block = null;
    }

    function flush() {
      if (block) commit();
      return value();
    }

    // ── Consonant rules C1–C5 (spec §1.2).
    function inputConsonant(c) {
      if (!block) {                                   // C1
        block = newBlock(c);
        return;
      }
      if (block.cho && !block.jung) {                 // C2 — {cho} only
        commit();
        block = newBlock(c);
        return;
      }
      if (!block.cho && block.jung) {                 // C3 — standalone vowel
        commit();
        block = newBlock(c);
        return;
      }
      if (!block.jong) {                              // C4 — {cho,jung}
        if (VALID_JONG[c]) block.jong = c;
        else { commit(); block = newBlock(c); }
        return;
      }
      const merged = JONG_COMBINE[block.jong + c];    // C5 — {cho,jung,jong}
      if (merged) block.jong = merged;
      else { commit(); block = newBlock(c); }
    }

    // ── Vowel rules V1–V5 (spec §1.2).
    function inputVowel(v) {
      if (!block) {                                   // V1
        block = newBlock('', v);
        return;
      }
      if (block.jong) {                               // V5 — batchim stealing
        // A COMPOUND jong splits: the block keeps the FIRST component, the
        // SECOND becomes the cho of the new block. A SIMPLE jong moves wholesale.
        const parts = JONG_SPLIT[block.jong];
        let stolen;
        if (parts) { block.jong = parts[0]; stolen = parts[1]; }
        else { stolen = block.jong; block.jong = ''; }
        commit();
        block = newBlock(stolen, v);
        return;
      }
      if (block.cho && !block.jung) {                 // V2 — {cho} only
        block.jung = v;
        block.jungComposed = false;
        return;
      }
      if (block.jung) {                               // V3 / V4
        const merged = JUNG_COMBINE[block.jung + v];
        if (merged) {
          block.jung = merged;
          block.jungComposed = true;                  // only path that sets it
        } else {
          commit();
          block = newBlock('', v);
        }
        return;
      }
      // Empty husk (shouldn't be reachable) — treat as a fresh vowel block.
      block.jung = v;
      block.jungComposed = false;
    }

    // Accepts the 33 KEYMAP jamo. Pre-composed jamo (ㅘ, ㄳ …) are tolerated
    // and land whole in their slot. Anything else — null, '', a latin letter,
    // a space — is a deliberate no-op so callers can pass jamoForCode() output
    // straight through without null-checking.
    function input(jamo) {
      if (isV(jamo)) inputVowel(jamo);
      else if (isC(jamo)) inputConsonant(jamo);
      return value();
    }

    // Peel exactly ONE component.
    function backspace() {
      if (!block) {
        // No in-progress block → delete the last COMMITTED character whole.
        // Committed text is never decomposed back into jamo — see the header
        // note (2). Code-point aware, so this stays correct if a caller ever
        // seeds committed text containing astral characters.
        if (committed) {
          const chars = Array.from(committed);
          chars.pop();
          committed = chars.join('');
        }
        return value();
      }
      if (block.jong) {
        const parts = JONG_SPLIT[block.jong];
        block.jong = parts ? parts[0] : '';           // compound → first part
        return value();
      }
      if (block.jung) {
        const parts = block.jungComposed ? JUNG_SPLIT[block.jung] : null;
        if (parts) {
          block.jung = parts[0];
          block.jungComposed = false;
        } else {
          block.jung = '';                            // typed whole → removed whole
        }
        if (!block.cho && !block.jung) block = null;
        return value();
      }
      block = null;                                   // {cho} only → cleared
      return value();
    }

    return { input, backspace, flush, value, current, reset };
  }

  return { KEYMAP, jamoForCode, codeForJamo, create };
})();

if (typeof window !== 'undefined') window.HangulIME = HangulIME;
if (typeof module !== 'undefined') module.exports = HangulIME;
