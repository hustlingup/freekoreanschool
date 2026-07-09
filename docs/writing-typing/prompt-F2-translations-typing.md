# Prompt F2 — Translate typing.json + widget UI labels into all 8 languages

Prerequisites: prompts D, E completed (and F1 for style precedent). Two deliverables: (1) full translation of `learn/data/typing.json`, (2) localized UI labels inside `js/typing-game.js` and `js/stroke-writer.js` (the free-play widgets).

Languages/suffixes identical to F1: `_ja`, `_zh_tw`, `_es`, `_fr`, `_de`, `_vi`, `_th`, `_id` — all 8 required.

## 1. `learn/data/typing.json`

| type | translate | do NOT translate |
|---|---|---|
| stage objects | `name` (all 8) | — |
| `reading_card` | `title`, `body`, `rules` arrays, `tip` | — |
| `key_intro` | `tip` | `jamo`, `reps` |
| `typing_drill` | `tip`, each item's `meaning` → `meaning_<lang>` per item object | `mode`, `items[].ko`, `items[].romanization`, `target` |
| `lesson_complete` | `title`, `message` | `title_kr`, `next_url` |

Item-level meanings: each word item becomes e.g.
```json
{ "ko": "물", "romanization": "mul", "meaning": "water",
  "meaning_ja": "水", "meaning_zh_tw": "水", "meaning_es": "agua", "meaning_fr": "eau",
  "meaning_de": "Wasser", "meaning_vi": "nước", "meaning_th": "น้ำ", "meaning_id": "air" }
```
Reuse existing translations: 물/밥/집/코/한국/사랑/친구/김치/안녕하세요/감사합니다 all appear in `learn/data/hangul.json` or `learn/data/vocabulary-*.json` — grep those files and copy the `meaning_<lang>` values verbatim instead of re-translating.

Keyboard terminology to keep consistent: "keyboard" ja キーボード, zh-tw 鍵盤, es teclado, fr clavier, de Tastatur, vi bàn phím, th แป้นพิมพ์, id papan ketik (keyboard acceptable). "2-set / Dubeolsik (두벌식)" — keep 두벌식 in Korean with a transliteration on first mention per language. CPM/타/분: render as "타/분 (keystrokes per minute)" localized, e.g. ja「打/分」, zh-tw「打/分鐘」.

## 2. Widget UI labels

Both free-play widgets currently ship EN-only strings. Localize them using the **syllable-builder pattern**: an inline lang detection at init + per-language label lookup. Extend detection to all 8 languages exactly like step-runner's `_detectLang()` (js/step-runner.js:68–81) — LangManager first, `<html lang>` fallback.

Implementation shape (put a `LABELS` object at the top of each widget module):

```js
const LABELS = {
  en: { write:'Write any character', watch:'Watch', trace:'Trace', speed:'Speed', numbers:'Stroke numbers', strokes:'{n} strokes', placeholder:'가' },
  ja: { write:'好きな文字を書いてみよう', watch:'見る', trace:'なぞる', … },
  'zh-tw': { … }, es: { … }, fr: { … }, de: { … }, vi: { … }, th: { … }, id: { … },
};
const L = LABELS[_detectLangLocal()] || LABELS.en;
```

Strings to cover —
`js/stroke-writer.js` (StrokeFreePlay): input label/placeholder, Watch, Trace, Speed, Stroke numbers, "{n} strokes", invalid-input message, replay.
`js/typing-game.js` (TypingGame + free-play): start/restart, clear, CPM label (타/분), accuracy, time, streak, "press the highlighted key", "type this syllable/word", round-summary strings (score, best), focus prompt ("tap here to type"), shift hint, mode chip labels (Jamo / Syllables / Words).

Keep `{n}`-style placeholder substitution (simple `.replace('{n}', v)`), matching step-runner's `t()` usage style.

## Completeness checks

```bash
node -e "
const data = JSON.parse(require('fs').readFileSync('learn/data/typing.json','utf8'));
const LANGS = ['ja','zh_tw','es','fr','de','vi','th','id'];
const FIELDS = { reading_card:['title','body','tip'], key_intro:['tip'], typing_drill:['tip'], lesson_complete:['title','message'] };
let missing = [];
for (const st of data.stages) for (const l of LANGS) if (!st['name_'+l]) missing.push('stage '+st.id+' name_'+l);
for (const s of data.steps) {
  for (const f of (FIELDS[s.type]||[])) { if (s[f]==null) continue; for (const l of LANGS) if (s[f+'_'+l]==null) missing.push('step '+s.id+' '+f+'_'+l); }
  for (const it of (s.items||[])) { if (it.meaning==null) continue; for (const l of LANGS) if (it['meaning_'+l]==null) missing.push('step '+s.id+' item '+it.ko+' meaning_'+l); }
}
console.log(missing.length ? 'MISSING '+missing.length+'\n'+missing.slice(0,40).join('\n') : 'translation coverage OK');
process.exit(missing.length?1:0);
"

# every LABELS locale has every key of LABELS.en (write an equivalent inline check per file,
# or eyeball — the object is small; a missing key falls back visibly to undefined, so grep for it)
node -e "global.window={HangulUtil:require('./js/hangul-util.js')}; require('./js/hangul-ime.js'); console.log('ime loads OK')"
```

## Browser spot check

Same technique as F1 (temporarily set `<html lang>` on the two pages, revert after): verify ja and th on both `letter-writing.html` (free-play labels) and `typing.html` (lesson tips + widget labels). Confirm no `undefined` appears anywhere in the UI.
