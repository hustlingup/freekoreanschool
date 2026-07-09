# Phase 2 Translation — Copy-Paste Prompts

Each block below is a self-contained prompt for a **fresh Claude Code session** opened in the
project root (`c:\Users\EFHYDRO\Desktop\개인\koreanschool`). Copy the whole block, paste it, done.

Rules of thumb:
- Run **one prompt per session**. Each language is split into parts (A/B/C — and **D for
  Vietnamese only**, which has a learn-lesson-JSON gap the other languages don't have) so a
  session doesn't run out of room; run the parts in order, but each part is independently
  resumable.
- If a session ends mid-page, just paste the **same prompt** into a new session — the audit tool
  skips finished work automatically.
- The **UNIVERSAL RESUME** prompt at the bottom continues whatever is unfinished for a language.

---

## 0) One-time side fix — th + id root pages (run before Thai/Indonesian work)

```
Read translation/GUIDE.md fully and follow it. Task: §9 side task only.
Run `node scripts/gen-root-mirrors.cjs th id` to regenerate the th/ and id/ root pages
(index, about, contact, quiz, privacy, terms, search) from clean English via the dictionaries.
Then verify: no German words (Entdecke, Lerne, Stufen, kostenlosen) and no Spanish words
(Elige, aprender, Descubre) remain in any th/*.html or id/*.html; <html lang> is correct;
each page loads js/langs/lang-th.js or lang-id.js. Do NOT touch culture/travel/news/learn
files and do NOT edit es/, ja/, zh-tw/. Report results when done.
```

---

## 1) Vietnamese (vi) — Part A: culture (small + medium pages)

```
Read translation/GUIDE.md fully and follow it exactly. Task: Phase 2 Vietnamese translation.
Scope for THIS session (in order): culture/vi/index.html, traditions.html, kchicken.html,
mandu.html, kbbq.html, ksports.html, kimchi.html, kbeauty.html, ramyeon.html.
For each page: run `node scripts/audit-content-translation.cjs vi culture/<page>` to list the
untranslated English prose, use culture/es/<page>.html as the reference for what to translate
vs keep, translate the prose into natural Vietnamese with Edit (also <title> and meta
descriptions), and re-audit until the page shows 0 (or only brand-line false positives per
GUIDE §6). NEVER run gen-content-mirrors.cjs or gen-root-mirrors.cjs. Never edit es/, ja/,
zh-tw/ files. When done (or out of room), report which pages reached ✅ and the remaining
node counts from `node scripts/audit-content-translation.cjs vi`.
```

## 1) Vietnamese (vi) — Part B: culture (large pages)

```
Read translation/GUIDE.md fully and follow it exactly. Task: Phase 2 Vietnamese translation.
Scope for THIS session (in order): culture/vi/kgaming.html, kmovie.html, kfashion.html,
kdrama.html, kfood.html, kpop.html, koreanthing.html. These are the largest articles
(260–570 prose nodes each) — work top-to-bottom through <main>, paragraph-sized Edits.
For each page: `node scripts/audit-content-translation.cjs vi culture/<page>` lists what is
untranslated; culture/es/<page>.html is the reference for translate-vs-keep decisions;
translate into natural Vietnamese (also <title> + meta descriptions); re-audit until 0 or
brand-only. NEVER run gen-content-mirrors.cjs / gen-root-mirrors.cjs. Never edit es/, ja/,
zh-tw/. Finish as many pages as fit; report ✅ pages and the summary from
`node scripts/audit-content-translation.cjs vi` at the end.
```

## 1) Vietnamese (vi) — Part C: travel + news (finishes vi culture/travel/news)

```
Read translation/GUIDE.md fully and follow it exactly. Task: Phase 2 Vietnamese translation.
Scope for THIS session: ALL remaining vi culture/travel/news pages. First run
`node scripts/audit-content-translation.cjs vi` — if any culture pages still show ⏳, finish
those first, then translate travel/vi/ (index, cities, itineraries, planner, themes) and
news/vi/ (index, article, board, admin — utility pages, translate only the labels the audit
reports). Use the es/ mirrors as reference; translate prose + <title> + meta descriptions
into natural Vietnamese with Edit; re-audit each page to 0 or brand-only. NEVER run
gen-content-mirrors.cjs / gen-root-mirrors.cjs. Never edit es/, ja/, zh-tw/.
Definition of done: `node scripts/audit-content-translation.cjs vi` shows every page ✅
(or verified brand-only leftovers). Then update translation/GUIDE.md §11 progress snapshot
and report. NOTE: Vietnamese is NOT fully finished until Part D (learn lesson JSON) is
also done — mention this in your report.
```

## 1) Vietnamese (vi) — Part D: learn lesson JSON (finishes Vietnamese)

```
Read translation/GUIDE.md fully — especially §10 — and follow it exactly. Task: fill the
~543 missing _vi fields in the 9 lesson JSONs in learn/data/ (hangul, syllable-blocks,
pronunciation, grammar, nouns, pronouns, shopping, emotions, speech-levels).
Audit: `node scripts/translate-lessons.mjs --lang vi` (per file: add --file <name>.json).
NEVER use --save (API auto-fill is forbidden — translate manually). For each file: list its
missing fields, read one existing scripts/patch-id-*.cjs to copy the patch(filename,
stagePatch, stepPatches) pattern, write scripts/patch-vi-<name>.cjs with hand-written
natural Vietnamese ("bạn" register; keep Korean, romanization, {placeholders}, emoji, \n
exactly; brands like K-Pop/TOPIK stay; escape apostrophes in JS strings), run it, and
re-audit until that file shows 0. Only ADD _vi fields — never modify base English or other
languages' fields, and never edit learn/<lang>/*.html. Done when the vi audit reports zero
gaps across all 9 files; then update translation/GUIDE.md §11 (mark vi learn JSON complete;
if culture/travel/news are also ✅, mark Vietnamese fully complete) and report.
```

---

## 2) German (de) — Part A: culture (small + medium)

```
Read translation/GUIDE.md fully and follow it exactly. Task: Phase 2 German translation.
Scope for THIS session (in order): culture/de/index.html, traditions.html, kchicken.html,
mandu.html, kbbq.html, ksports.html, kimchi.html, kbeauty.html, ramyeon.html.
For each page: `node scripts/audit-content-translation.cjs de culture/<page>` lists the
untranslated English prose; culture/es/<page>.html shows what to translate vs keep;
translate into natural German (du-form, matching the tone of js/langs/lang-de.js; also
<title> + meta descriptions); re-audit until 0 or brand-only (GUIDE §6).
NEVER run gen-content-mirrors.cjs / gen-root-mirrors.cjs. Never edit es/, ja/, zh-tw/.
Report ✅ pages + `node scripts/audit-content-translation.cjs de` summary at the end.
```

## 2) German (de) — Part B: culture (large pages)

```
Read translation/GUIDE.md fully and follow it exactly. Task: Phase 2 German translation.
Scope for THIS session (in order): culture/de/kgaming.html, kmovie.html, kfashion.html,
kdrama.html, kfood.html, kpop.html, koreanthing.html — the largest articles; work
top-to-bottom with paragraph-sized Edits. Audit per page with
`node scripts/audit-content-translation.cjs de culture/<page>`; reference culture/es/;
natural German (du-form), also <title> + meta descriptions; re-audit to 0 or brand-only.
NEVER run the generators. Never edit es/, ja/, zh-tw/. Report ✅ pages + de summary.
```

## 2) German (de) — Part C: travel + news (finishes German)

```
Read translation/GUIDE.md fully and follow it exactly. Task: Phase 2 German translation.
Scope: ALL remaining de pages. Run `node scripts/audit-content-translation.cjs de`; finish
any ⏳ culture pages first, then travel/de/ (index, cities, itineraries, planner, themes)
and news/de/ (index, article, board, admin — labels only). Natural German (du-form),
<title> + meta descriptions included; re-audit each page to 0 or brand-only. NEVER run the
generators. Never edit es/, ja/, zh-tw/. When every de page is ✅, update
translation/GUIDE.md §11 (mark de complete) and report.
```

---

## 3) French (fr) — Part A: culture (small + medium)

```
Read translation/GUIDE.md fully and follow it exactly. Task: Phase 2 French translation.
Scope for THIS session (in order): culture/fr/index.html, traditions.html, kchicken.html,
mandu.html, kbbq.html, ksports.html, kimchi.html, kbeauty.html, ramyeon.html.
Per page: `node scripts/audit-content-translation.cjs fr culture/<page>` lists what's left;
culture/es/<page>.html is the translate-vs-keep reference; translate into natural French
(vous-form, tone of js/langs/lang-fr.js; also <title> + meta descriptions); re-audit until
0 or brand-only (GUIDE §6). NEVER run gen-content-mirrors.cjs / gen-root-mirrors.cjs.
Never edit es/, ja/, zh-tw/. Report ✅ pages + fr summary at the end.
```

## 3) French (fr) — Part B: culture (large pages)

```
Read translation/GUIDE.md fully and follow it exactly. Task: Phase 2 French translation.
Scope for THIS session (in order): culture/fr/kgaming.html, kmovie.html, kfashion.html,
kdrama.html, kfood.html, kpop.html, koreanthing.html — largest articles, top-to-bottom,
paragraph-sized Edits. Audit per page, reference culture/es/, natural French (vous-form),
<title> + meta descriptions, re-audit to 0 or brand-only. NEVER run the generators.
Never edit es/, ja/, zh-tw/. Report ✅ pages + fr summary.
```

## 3) French (fr) — Part C: travel + news (finishes French)

```
Read translation/GUIDE.md fully and follow it exactly. Task: Phase 2 French translation.
Scope: ALL remaining fr pages. Run `node scripts/audit-content-translation.cjs fr`; finish
any ⏳ culture pages, then travel/fr/ (index, cities, itineraries, planner, themes) and
news/fr/ (index, article, board, admin — labels only). Natural French (vous-form), include
<title> + meta descriptions; re-audit each page to 0 or brand-only. NEVER run the
generators. Never edit es/, ja/, zh-tw/. When every fr page is ✅, update
translation/GUIDE.md §11 (mark fr complete) and report.
```

---

## 4) Thai (th) — Part A: culture (small + medium)

```
Read translation/GUIDE.md fully and follow it exactly. Task: Phase 2 Thai translation.
Precondition: if prompt 0 (root-page fix) has not been run yet, first run
`node scripts/gen-root-mirrors.cjs th id` per GUIDE §9.
Scope for THIS session (in order): culture/th/index.html, traditions.html, kchicken.html,
mandu.html, kbbq.html, ksports.html, kimchi.html, kbeauty.html, ramyeon.html.
Per page: `node scripts/audit-content-translation.cjs th culture/<page>`; reference
culture/es/<page>.html for translate-vs-keep; translate into natural polite Thai (also
<title> + meta descriptions); re-audit until 0 or brand-only (GUIDE §6). NEVER run
gen-content-mirrors.cjs; gen-root-mirrors.cjs only for the precondition above and only
BEFORE any manual edits to th root files. Never edit es/, ja/, zh-tw/.
Report ✅ pages + th summary at the end.
```

## 4) Thai (th) — Part B: culture (large pages)

```
Read translation/GUIDE.md fully and follow it exactly. Task: Phase 2 Thai translation.
Scope for THIS session (in order): culture/th/kgaming.html, kmovie.html, kfashion.html,
kdrama.html, kfood.html, kpop.html, koreanthing.html — largest articles, top-to-bottom,
paragraph-sized Edits. Audit per page, reference culture/es/, natural polite Thai,
<title> + meta descriptions, re-audit to 0 or brand-only. NEVER run the generators.
Never edit es/, ja/, zh-tw/. Report ✅ pages + th summary.
```

## 4) Thai (th) — Part C: travel + news (finishes Thai)

```
Read translation/GUIDE.md fully and follow it exactly. Task: Phase 2 Thai translation.
Scope: ALL remaining th pages. Run `node scripts/audit-content-translation.cjs th`; finish
any ⏳ culture pages, then travel/th/ (index, cities, itineraries, planner, themes) and
news/th/ (index, article, board, admin — labels only). Natural polite Thai, include
<title> + meta descriptions; re-audit each page to 0 or brand-only. NEVER run the
generators. Never edit es/, ja/, zh-tw/. When every th page is ✅, update
translation/GUIDE.md §11 (mark th complete) and report.
```

---

## 5) Indonesian (id) — Part A: culture (small + medium)

```
Read translation/GUIDE.md fully and follow it exactly. Task: Phase 2 Indonesian translation.
Precondition: if prompt 0 (root-page fix) has not been run yet, first run
`node scripts/gen-root-mirrors.cjs th id` per GUIDE §9.
Scope for THIS session (in order): culture/id/index.html, traditions.html, kchicken.html,
mandu.html, kbbq.html, ksports.html, kimchi.html, kbeauty.html, ramyeon.html.
Per page: `node scripts/audit-content-translation.cjs id culture/<page>`; reference
culture/es/<page>.html for translate-vs-keep; translate into natural Indonesian (tone of
js/langs/lang-id.js; also <title> + meta descriptions); re-audit until 0 or brand-only
(GUIDE §6). NEVER run gen-content-mirrors.cjs; gen-root-mirrors.cjs only for the
precondition above and only BEFORE any manual edits to id root files. Never edit es/,
ja/, zh-tw/. Report ✅ pages + id summary at the end.
```

## 5) Indonesian (id) — Part B: culture (large pages)

```
Read translation/GUIDE.md fully and follow it exactly. Task: Phase 2 Indonesian translation.
Scope for THIS session (in order): culture/id/kgaming.html, kmovie.html, kfashion.html,
kdrama.html, kfood.html, kpop.html, koreanthing.html — largest articles, top-to-bottom,
paragraph-sized Edits. Audit per page, reference culture/es/, natural Indonesian,
<title> + meta descriptions, re-audit to 0 or brand-only. NEVER run the generators.
Never edit es/, ja/, zh-tw/. Report ✅ pages + id summary.
```

## 5) Indonesian (id) — Part C: travel + news (finishes Indonesian)

```
Read translation/GUIDE.md fully and follow it exactly. Task: Phase 2 Indonesian translation.
Scope: ALL remaining id pages. Run `node scripts/audit-content-translation.cjs id`; finish
any ⏳ culture pages, then travel/id/ (index, cities, itineraries, planner, themes) and
news/id/ (index, article, board, admin — labels only). Natural Indonesian, include
<title> + meta descriptions; re-audit each page to 0 or brand-only. NEVER run the
generators. Never edit es/, ja/, zh-tw/. When every id page is ✅, update
translation/GUIDE.md §11 (mark id complete) and report.
```

---

## UNIVERSAL RESUME (any language, any point)

Use this when a session ended mid-work and you just want to continue. Replace `<lang>` with
one of: vi, de, fr, th, id.

```
Read translation/GUIDE.md fully and follow it exactly. Task: resume Phase 2 <lang>
translation wherever it left off. Run `node scripts/audit-content-translation.cjs <lang>`
to see per-page status; pick the first ⏳ page (prefer culture → travel → news, smaller
pages first) and translate its remaining English prose into natural <lang>, using the es/
mirror of the same page as the translate-vs-keep reference; include <title> + meta
descriptions; re-audit each page to 0 or brand-only (GUIDE §6) before moving on.
NEVER run gen-content-mirrors.cjs / gen-root-mirrors.cjs. Never edit es/, ja/, zh-tw/.
When the whole language shows ✅, update translation/GUIDE.md §11 and report; otherwise
report ✅ pages and the remaining summary.
```

---

## FINAL VERIFICATION (after all five languages are done)

```
Read translation/GUIDE.md. Task: final verification of Phase 2.
Run `node scripts/audit-content-translation.cjs <lang>` for each of vi, de, fr, th, id and
confirm every page is ✅ (or verified brand-only leftovers). Run
`node scripts/translate-lessons.mjs --lang vi` and confirm zero missing _vi fields (audit
only — never --save). Then start a local server (`npx serve -l 5060 .`) and spot-check with
Playwright or curl: culture/<lang>/kpop.html and travel/<lang>/index.html for each language
— confirm the prose is in the target language, chrome is translated, no
Spanish/German/English prose leaks, no console errors, layout intact. Also verify
th/index.html and id/index.html root pages are clean (no German: Entdecke, Lerne, Stufen),
and open learn/vi/hangul.html + learn/vi/grammar.html to confirm lesson content renders in
Vietnamese (not mixed English). Report a final per-language status table.
```
