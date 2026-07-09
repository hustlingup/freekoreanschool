# Prompt F1 — Translate letter-writing.json into all 8 languages

Prerequisite: prompt C completed. This prompt is **data-only** — edit `learn/data/letter-writing.json` and nothing else. No code changes.

## Languages and suffixes

Add these suffixed variants for every localized field: `_ja`, `_zh_tw` (Traditional Chinese, Taiwan), `_es`, `_fr`, `_de`, `_vi`, `_th`, `_id`. All 8 are required on every step — this lesson launches fully translated (unlike the older Phase-2 lessons).

## What gets a translation

Per step type:

| type | translate | do NOT translate |
|---|---|---|
| stage objects | `name` → `name_<lang>` (all 8; `name_kr` already exists) | ids, step ranges |
| `reading_card` | `title`, `body`, each entry of `rules` (as `rules_<lang>` arrays), `tip` | — |
| `stroke_demo` | `hint`, `example_meaning` | `char`, `romanization`, `audio`, `stroke_count`, `example_word` |
| `stroke_trace` | `hint` | `char`, `romanization` |
| `match_quiz` | `prompt` → `prompt_<lang>`, `choices` → `choices_<lang>` (translate only prose choices; numeric choices like "3" stay identical but the array must still exist per language — copy it) | `correct` stays the ENGLISH choice string (step-runner compares against the base `correct` — verify how `renderMatchQuiz`/`handleQuizAnswer` match before deciding; if it compares localized text, mirror hangul.json's approach exactly) |
| `lesson_complete` | `title`, `message` | `title_kr`, `next_url` |

## Pronunciation aids (dedicated fields, not suffixes)

Every `stroke_demo` step gets:
- `katakana` — Japanese kana rendering of `example_word` (e.g. 가다 → カダ)
- `zhuyin` — for the letter's sound (copy the convention from the matching hangul.json card_reveal steps: they already carry `katakana`/`zhuyin` per letter — reuse those values verbatim where the char matches)
- `reading_vi`, `reading_th` — only if the matching hangul.json step has them; otherwise omit (fallback is `romanization`).

## Style reference — copy these tones

Open `learn/data/hangul.json` and read steps 1–2 fully (card_reveal with all 8 languages) plus one match_quiz — mirror their register: short, instructional, no literal word-by-word calques. Example of the expected result for a stroke_demo (step 3, ㄱ):

```json
"hint": "One single stroke: across, then down.",
"hint_ja": "ひと筆で書きます。横へ、そして下へ。",
"hint_zh_tw": "一筆完成：先橫、再豎。",
"hint_es": "Un solo trazo: horizontal y luego hacia abajo.",
"hint_fr": "Un seul trait : vers la droite, puis vers le bas.",
"hint_de": "Ein einziger Strich: nach rechts, dann nach unten.",
"hint_vi": "Một nét duy nhất: ngang qua rồi kéo xuống.",
"hint_th": "เส้นเดียวจบ: ลากไปทางขวาแล้วลงล่าง",
"hint_id": "Satu goresan saja: ke samping, lalu ke bawah.",
"example_meaning": "to go",
"example_meaning_ja": "行く",
"example_meaning_zh_tw": "去",
"example_meaning_es": "ir",
"example_meaning_fr": "aller",
"example_meaning_de": "gehen",
"example_meaning_vi": "đi",
"example_meaning_th": "ไป",
"example_meaning_id": "pergi"
```

Where a hangul.json step covers the same letter/word, reuse its existing `example_meaning_<lang>` values verbatim instead of re-translating.

Terminology to keep consistent across all steps: "stroke" = 획 concept → ja 画（かく）use 「画」/「筆順」, zh-tw 筆畫/筆順, es trazo, fr trait, de Strich, vi nét, th เส้น/ลำดับขีด, id goresan. "stroke order" → ja 筆順, zh-tw 筆順, es orden de trazos, fr ordre des traits, de Strichreihenfolge, vi thứ tự nét, th ลำดับการเขียน, id urutan goresan.

## Completeness check (must pass before finishing)

```bash
node -e "
const data = JSON.parse(require('fs').readFileSync('learn/data/letter-writing.json','utf8'));
const LANGS = ['ja','zh_tw','es','fr','de','vi','th','id'];
const FIELDS = { reading_card:['title','body','tip'], stroke_demo:['hint','example_meaning'], stroke_trace:['hint'], match_quiz:['prompt'], lesson_complete:['title','message'] };
let missing = [];
for (const st of data.stages) for (const l of LANGS) if (!st['name_'+l]) missing.push('stage '+st.id+' name_'+l);
for (const s of data.steps) for (const f of (FIELDS[s.type]||[])) {
  if (s[f] == null) continue;
  for (const l of LANGS) if (s[f+'_'+l] == null) missing.push('step '+s.id+' '+f+'_'+l);
}
for (const s of data.steps) if (s.type==='match_quiz') for (const l of LANGS) if (!s['choices_'+l]) missing.push('step '+s.id+' choices_'+l);
console.log(missing.length ? 'MISSING '+missing.length+'\n'+missing.slice(0,40).join('\n') : 'translation coverage OK');
process.exit(missing.length?1:0);
"
```

Also confirm the JSON still parses and `node scripts/gen-lesson-manifest.cjs` reports no change in step counts.

## Browser spot check

`node dev.js`, open `http://localhost:3000/learn/letter-writing.html?step=3`, then in DevTools console run `document.documentElement.lang = 'ja'` — reload won't help (lang comes from the HTML attribute at render time), so instead re-render by navigating steps after setting `LangManager`'s language if the API allows, OR simply edit the `<html lang>` attribute in DevTools *before* the step renders (set breakpoint) — pragmatic alternative: temporarily change `<html lang="en">` to `ja` in the file, reload, verify hints/meanings show Japanese, then revert. Check ja + th + id at minimum (th/id are the most commonly missed).
