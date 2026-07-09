# Phase 3 Content-Parity — Copy-Paste Prompts

Each block is a self-contained prompt for a **fresh Claude Code session** opened in the project
root (`c:\Users\EFHYDRO\Desktop\개인\koreanschool`). Copy the whole block, paste it, done.

Rules of thumb:
- Run **prompt 1 first and exactly once** (it regenerates the 12 stale Spanish pages). Everything
  after is resumable in any order within a language, but run 2A → 2B → 2C in order.
- If a session ends mid-page, paste the **same prompt** into a new session —
  `node scripts/audit-content-parity.cjs <lang>` shows what is still pending.
- ja/zh-tw prompts (3, 4) are independent of the Spanish ones and of each other.

---

## 1) Spanish scaffold — REQUIRED FIRST, RUN ONCE

```
Read translation/GUIDE2.md fully and follow it. Task: Phase 3 Spanish scaffold (§5a step 1).
First run `node scripts/audit-content-parity.cjs es` and confirm the 12 stale culture pages
(kpop, kdrama, kmovie, kfood, kfashion, kbbq, kimchi, ramyeon, kgaming, ksports, koreanthing,
traditions) still show 🚨 STALE / ⚠️ — if they already show full div parity, STOP (the regen
already ran; do not run it again). Otherwise run `node scripts/regen-es-stale-culture.cjs`
once, verify the backups exist in translation/_old-es/ (12 files), re-run
`node scripts/audit-content-parity.cjs es` and confirm all 12 pages now have full div parity
with no missing anchors (prose will show as untranslated English — that is expected; it is
translated by prompts 2A–2C). NEVER run gen-content-mirrors.cjs. Do not touch culture/es/
index, kbeauty, kchicken, mandu, or anything in travel/, news/, ja/, zh-tw/. Update
GUIDE2.md §7 (mark scaffold done) and report.
```

## 2) Spanish (es) — Part A: translate small + medium pages

```
Read translation/GUIDE2.md fully and follow it (translate-vs-keep rules are GUIDE.md §3).
Task: Phase 3 Spanish translation (§5a). Precondition: prompt 1 (scaffold) must already be
done — verify with `node scripts/audit-content-parity.cjs es` (the 12 pages show full div
parity; if any show 🚨 STALE, stop and run prompt 1 first).
Scope for THIS session (in order): culture/es/traditions.html, kbbq.html, kimchi.html,
ramyeon.html, ksports.html, kgaming.html.
Per page: `node scripts/audit-content-parity.cjs es culture/<page>` lists every untranslated
English node; mine translation/_old-es/<page>.html for the old hand-written Spanish (hero
copy, <title>/meta, established terminology) and reuse what matches; translate all <main>
prose top-to-bottom with paragraph-sized Edits, plus <title> and meta/og/twitter
descriptions; natural tú-form Spanish, style of culture/es/kbeauty.html; keep Korean,
romanization, brands. Re-audit until the listed nodes are brand/romanization-only.
NEVER run any generator. Never edit ja/, zh-tw/, or the four already-complete es pages.
Report ✅ pages + the `node scripts/audit-content-parity.cjs es` summary; update GUIDE2 §7.
```

## 2) Spanish (es) — Part B: translate large pages

```
Read translation/GUIDE2.md fully and follow it (translate-vs-keep rules are GUIDE.md §3).
Task: Phase 3 Spanish translation (§5a). Precondition: prompt 1 scaffold done (verify per
Part A). Scope for THIS session (in order): culture/es/kmovie.html, kfashion.html,
kdrama.html, kfood.html — full deep-dive articles (500–700 divs each); work top-to-bottom
through <main> with paragraph-sized Edits. Per page: audit with
`node scripts/audit-content-parity.cjs es culture/<page>`; mine translation/_old-es/<page>.html
for reusable Spanish; translate prose + <title> + meta/og/twitter descriptions; natural
tú-form Spanish, style of culture/es/kbeauty.html; keep Korean/romanization/brands;
re-audit to brand-only. NEVER run any generator. Never edit ja/, zh-tw/, or the four
complete es pages. Finish as many pages as fit; report ✅ pages + es summary; update GUIDE2 §7.
```

## 2) Spanish (es) — Part C: kpop + koreanthing (finishes Spanish)

```
Read translation/GUIDE2.md fully and follow it (translate-vs-keep rules are GUIDE.md §3).
Task: Phase 3 Spanish translation (§5a) — the two largest pages. Precondition: prompt 1
scaffold done. Scope: culture/es/kpop.html then koreanthing.html (~950 and ~1100 divs).
translation/_old-es/kpop.html contains roughly HALF the page already translated (timeline,
genres, agencies, vocab) — mine it aggressively before translating fresh. koreanthing
includes the 100-proverbs list (sodams) — translate the explanations, keep Korean +
romanization. Per page: `node scripts/audit-content-parity.cjs es culture/<page>`;
translate <main> prose + <title> + meta/og/twitter descriptions; tú-form Spanish, style of
culture/es/kbeauty.html; re-audit to brand-only. NEVER run any generator. Never edit ja/,
zh-tw/, or the four complete es pages. When both pages are done and
`node scripts/audit-content-parity.cjs es` shows zero 🚨 and brand-only prose estimates for
all culture pages, update GUIDE2 §7 (mark es done) and report.
```

---

## 3) Japanese (ja) — kfood additive sync

```
Read translation/GUIDE2.md fully and follow it — especially §5b. Task: Phase 3 additive sync
of culture/ja/kfood.html (the ONLY ja culture page behind English).
`node scripts/audit-content-parity.cjs ja culture/kfood` shows the gaps: kfood-dishes
(78/93 divs — missing dish cards), kfood-street (43/51), kfood-culture (72/80).
For each short section: open the English culture/kfood.html section side by side, identify
the missing repeated blocks (dish/food cards etc.), copy the English HTML into the same
position in the ja page, and translate the copied prose in place into natural Japanese
matching the page's existing conventions (add ja-kana/katakana readings and ja-block
variants exactly where sibling items have them; keep Korean, romanization, brands per
GUIDE.md §3). Do NOT regenerate the page or touch already-translated content. Re-audit
until per-anchor deltas are 0 and div count is 692/692. Update GUIDE2 §7 and report.
```

## 4) Traditional Chinese (zh-tw) — kfood + kdrama + koreanthing additive sync

```
Read translation/GUIDE2.md fully and follow it — especially §5b (and its zh-tw notes).
Task: Phase 3 additive sync of the 3 zh-tw culture pages behind English.
(1) culture/zh-tw/kfood.html: add the three MISSING sections kfood-manners, kfood-phrases,
kfood-slang (copy from English culture/kfood.html into the same positions, translate prose
into natural Traditional Chinese) and the missing dish cards in kfood-dishes (78/93). Do NOT
touch kfood-ordering/kfood-street — their extra zh-tw content stays. Add sidebar quick-nav
links for the new sections if the English sidebar has them.
(2) culture/zh-tw/kdrama.html: add the missing items in kdrama-dramas (100/112),
kdrama-dialogue (54/80), kdrama-lines (62/75).
(3) culture/zh-tw/koreanthing.html: add the missing content in bap (139/167), delivery
(46/51), table (43/48); ignore the −1-div wrapper offset on other sections. While in the
files, fix the trivial kimchi sidebar id gap (cat-acc-kmovie) if straightforward.
Method per section: `node scripts/audit-content-parity.cjs zh-tw culture/<page>` for
deltas; side-by-side with English source; copy missing blocks, translate in place matching
sibling formatting; keep Korean/romanization/brands (GUIDE.md §3). NEVER regenerate; never
touch already-translated text. Re-audit until deltas are 0 or explained (extra-ok / −1
wrapper). Update GUIDE2 §7 and report.
```

---

## 5) OPTIONAL — travel/news structural gaps (outside culture scope)

```
Read translation/GUIDE2.md §2 "Out of culture scope" and follow its warnings. Task: optional
Phase 3 side sync. (1) travel/ja/planner.html and travel/zh-tw/planner.html are missing the
legend-emoji-toggle block and surrounding content (38/60 divs; travel/es/planner.html is
complete — use it plus the English travel/planner.html as references); add the missing
blocks additively and translate them (Japanese / Traditional Chinese respectively).
(2) news/es/article.html is a pre-rebuild stub (2/58 divs) and news/es/board.html is missing
the board-table structure — rebuild these two from the English news/article.html and
news/board.html the way gen-content-mirrors.cjs would (depth-2 paths, lang="es", lang-es.js
pack, canonical/og:url, chrome via js/langs/lang-es.js dict), using news/de/ or news/vi/ as
the structural reference, then translate the visible labels into Spanish (these are
JS-rendered app pages — labels only, don't invent content). ⚠️ Do NOT "fix" ja/zh-tw news
pages — their missing article-col-en / news-summary-en / board-th-* ids are BY DESIGN.
NEVER run gen-content-mirrors.cjs. Verify pages render via node dev.js. Update GUIDE2 §7
and report.
```

---

## UNIVERSAL RESUME (Phase 3, any point)

```
Read translation/GUIDE2.md fully and follow it. Task: resume Phase 3 content-parity work
wherever it left off. Run `node scripts/audit-content-parity.cjs` (all languages) and check
GUIDE2 §7. Priority: (1) if any culture/es page shows 🚨 STALE and translation/_old-es/ is
empty → run prompt 1's scaffold step first; (2) untranslated es culture prose, smallest
pages first (mine translation/_old-es/); (3) ja kfood additive sync; (4) zh-tw
kfood/kdrama/koreanthing additive sync. Follow §5a/§5b workflows exactly; NEVER run
gen-content-mirrors.cjs; never regenerate or retranslate ja/zh-tw pages; never touch the
complete es pages (index, kbeauty, kchicken, mandu) or travel/news mirrors except under
prompt 5. Re-audit each page before moving on; update GUIDE2 §7 and report ✅ pages + the
remaining summary.
```

---

## FINAL VERIFICATION (after prompts 1–4 are done)

```
Read translation/GUIDE2.md. Task: Phase 3 final verification.
Run `node scripts/audit-content-parity.cjs` for all 8 languages and confirm every culture
page is ✅ (or ⚠️ only from verified brand-only en-prose counts / documented zh-tw extra-ok
rows), es has zero 🚨 STALE, ja kfood is 692/692, zh-tw kfood/kdrama/koreanthing have no
missing anchors. Then `node dev.js` and spot-check in a browser: culture/es/kdrama,
culture/es/kfood, culture/es/kpop, culture/es/koreanthing, culture/ja/kfood,
culture/zh-tw/kfood — full-length articles, prose in the correct language, sidebar
quick-nav anchors resolve, layout intact, no console errors. Confirm the four
already-complete es pages (index, kbeauty, kchicken, mandu) and travel/es/, news/es/ are
untouched (git diff should show no changes there beyond Phase 3 scope). Report a final
per-language culture status table and update GUIDE2 §7.
```
