# Phase 3 Content-Parity Guide — bring every language's culture pages up to full English content

**Read this file in full before working. It is the source of truth for Phase 3.**
The paste-in prompts in [`PROMPTS2.md`](PROMPTS2.md) each tell a fresh session to read this guide first.
Phase 2 (prose translation of already-full pages) is documented in [`GUIDE.md`](GUIDE.md) — its
translate-vs-keep rules (§3), quality bar (§7), and audit caveats (§6) all still apply here.

---

## 1. Background — why some pages are short (root cause)

Timeline of how the mismatch happened:

1. The **Spanish (`es/`) culture pages were hand-written early** as short standalone articles
   (~60–80 `<div>`s, own custom layout: `feature-card`/`hangul-card` markup, no deep-dive sections).
2. The **English source pages were later massively expanded** into full deep-dive articles
   (400–1,100 `<div>`s: timelines, drama/dish/agency cards, vocab tables, dialogue scenes,
   phrase/slang/chant sections).
3. **`ja/` and `zh-tw/` were kept in sync manually** — but missed a few of the latest English
   expansions (see §2).
4. **`de/fr/vi/th/id` were regenerated from the expanded English** by `gen-content-mirrors.cjs`
   (Phase 1) and then prose-translated (Phase 2) → they have **full structural parity**.
5. **`es/` was never regenerated** — GUIDE.md declared it a protected reference ("never touch
   es/"), so its stale stubs were frozen while every other language caught up. Only `kbeauty`,
   `kchicken`, `mandu`, and `index` were ever re-synced to the expanded English; `kpop` was
   partially re-synced (all sections exist but each holds roughly half the English items).

So the observed symptom — *"es kdrama/kmovie/kfood/… have far less content than kpop/kbeauty"* —
is: those pages are the original pre-expansion stubs. (`es/kpop` is itself only ~half depth;
`kbeauty` is the only big es page at true full parity.)

---

## 2. Findings inventory (verified 2026-07-08, `<main>` `<div>` counts target/en)

### es — 12 stale culture pages (the whole Phase 3 Spanish job)

| Page | divs | State |
|---|---|---|
| kdrama | 65/603 | 🚨 stub — all 10 deep-dive sections missing |
| kmovie | 61/512 | 🚨 stub — 9 sections missing |
| kfood | 60/692 | 🚨 stub — 12 sections missing |
| kfashion | 62/562 | 🚨 stub — 13 sections missing |
| kbbq | 48/360 | 🚨 stub |
| kimchi | 49/382 | 🚨 stub |
| ramyeon | 52/469 | 🚨 stub |
| kgaming | 57/491 | 🚨 stub — 9 sections missing |
| ksports | 55/457 | 🚨 stub — 8 sections missing |
| koreanthing | 69/1109 | 🚨 stub — all 12 sections missing |
| kpop | 454/951 | ⚠️ all sections present but ~half depth (agencies, generations, genres, variety, film, phrases, slang, chants all short) |
| traditions | 63/92 | ⚠️ missing traditions-holidays, traditions-rites, traditions-etiquette |

Full parity already: `index`, `kbeauty`, `kchicken`, `mandu`. **Never regenerate those four, or
anything in `travel/es/`, `news/es/`.**

### ja — 1 culture page behind

- `kfood` 661/692: short inside `kfood-dishes` (78/93 divs — missing dish cards),
  `kfood-street` (43/51), `kfood-culture` (72/80). All section anchors present.

### zh-tw — 3 culture pages behind

- `kfood` 618/692: **entire sections missing** — `kfood-manners`, `kfood-phrases`, `kfood-slang`;
  plus `kfood-dishes` short (78/93). Note: zh-tw's `kfood-ordering`/`kfood-street` have *more*
  divs than English (older extra content) — leave that extra content alone, only add what's missing.
- `kdrama` 551/603: short in `kdrama-dramas` (100/112), `kdrama-dialogue` (54/80),
  `kdrama-lines` (62/75).
- `koreanthing` 1062/1109: short in `bap` (139/167), `delivery` (46/51), `table` (43/48);
  the remaining sections are −1 div each (harmless wrapper difference, ignore).
- (`kimchi` 378/382 and the sidebar id `cat-acc-kmovie` — trivial; fix while in the file if convenient.)

### de, fr, vi, th, id — ✅ nothing to do

Culture structure is div-for-div identical to English (Phase 1 regen), prose translated (Phase 2).

### Out of culture scope (optional side jobs, see PROMPTS2 §5)

- `travel/planner`: `ja` 38/60 and `zh-tw` 38/60 — missing the `legend-emoji-toggle` block and
  surrounding content (es/en at 60/60).
- `news/es/article` 2/58 (pre-rebuild stub) and `news/es/board` missing the `board-table` ids.
  ⚠️ News pages are JS-rendered app pages and `ja`/`zh-tw` news intentionally differ from English
  (`article-col-en`, `news-summary-en` absent **by design** — bilingual EN column replaced). Only
  the **es** news gaps are real; use `news/de/` or `news/vi/` (regenerated + translated) as the
  structural reference, and don't "fix" ja/zh-tw news.

---

## 3. Tools

### `scripts/audit-content-parity.cjs` — the Phase 3 audit + resume mechanism

```
node scripts/audit-content-parity.cjs                     # all 8 languages, summary
node scripts/audit-content-parity.cjs es                  # one language
node scripts/audit-content-parity.cjs es culture/kdrama   # per-anchor detail + untranslated node list
```

- Compares each mirror's `<main>` against English: div counts, missing `id` anchors, per-anchor
  div deltas, and an **untranslated-prose estimate** (text nodes verbatim in English, ≥3 latin
  letters, not kept in the reference mirror — `ja/`, or `zh-tw/` when auditing ja).
- Verdicts: `✅` in-sync · `⚠️ partial` (patch additively) · `🚨 STALE` (regenerate, don't patch).
- **This tool audits `es/` — `audit-content-translation.cjs` cannot** (es is that tool's own
  kept-terms reference, so it always reports es as clean). Use the parity tool for all es work.
- The prose estimate has the same false positives as Phase 2 (brand names, romanization,
  ALL-CAPS labels like `MICHELIN 3 STARS`, official titles). A page is done when the remaining
  listed nodes are all verifiably brand/proper-noun/romanization — same judgment rule as GUIDE §6.

### `scripts/regen-es-stale-culture.cjs` — one-shot es scaffold

```
node scripts/regen-es-stale-culture.cjs
```

Rebuilds ONLY the 12 stale `culture/es/` pages from current English source (chrome translated via
`js/langs/lang-es.js`, paths/canonical/lang/flag fixed — same transform `gen-content-mirrors.cjs`
used for de/fr/vi/th/id). Prose lands in **English**, to be translated per §4.
Before overwriting it backs up each current file once to `translation/_old-es/<page>.html`
(never overwrites an existing backup — idempotent).

---

## 4. The rules that prevent disaster

1. **Run `regen-es-stale-culture.cjs` exactly once, BEFORE any Phase 3 Spanish translation.**
   Running it after translation starts wipes the work (same rule as every generator).
2. **NEVER run `gen-content-mirrors.cjs` — with any argument, especially `es`.** It regenerates
   whole sections (culture + travel + news) and would destroy the fully-translated `travel/es/`,
   `news/es/`, and the 4 good es culture pages, and/or the finished de/fr/vi/th/id prose.
3. **NEVER regenerate `ja/` or `zh-tw/` pages.** Their gaps are small; fix them **additively**
   (§5) — regeneration would wipe complete Japanese/Chinese translations.
4. `translation/_old-es/` is reference material — read it, never serve it, never delete it until
   Spanish Phase 3 is fully done.
5. Phase-2 audit interaction: while a regenerated es page still holds English prose,
   `audit-content-translation.cjs` under-counts for other languages on that page (it treats
   English-in-es as "kept terms"). de/fr/vi/th/id are already done, so this is harmless — but
   don't run Phase-2 audits as evidence of anything until es is retranslated. Once es is fully
   translated, the Phase-2 tool's long-standing "stale-es over-count" caveat (GUIDE §11) also
   disappears — a side benefit.

---

## 5. Workflows

### 5a. Spanish (the big job) — regenerate, then translate

1. One-time: `node scripts/regen-es-stale-culture.cjs`, then
   `node scripts/audit-content-parity.cjs es` → the 12 pages must now show full div parity
   (verdict ✅/⚠️ only because of `en-prose` counts).
2. Per page (this is Phase-2-style prose translation, GUIDE §3/§4/§7 rules apply verbatim):
   - `node scripts/audit-content-parity.cjs es culture/<page>` → lists every untranslated node.
   - **Mine the backup first**: `translation/_old-es/<page>.html` holds the old hand-written
     Spanish. For `kpop` it covers roughly half the page (timeline, genres, agencies, vocab);
     for the stubs it at least gives translated hero copy, `<title>`/meta descriptions, and
     established Spanish terminology. Reuse whatever matches the new English content.
   - Translate `<main>` prose top-to-bottom with `Edit` (paragraph-sized edits), plus `<title>`,
     `meta description`, `og:*`/`twitter:*` descriptions in `<head>` (the regen leaves those in
     English too).
   - Natural Latin-American-neutral Spanish, tú-form, tone of the existing `culture/es/kbeauty.html`
     (the one big es page at full parity — use it as the style/keep-terms reference).
   - Re-audit until the listed nodes are brand/romanization-only.
3. Order (small → large): traditions, kbbq, kimchi, ramyeon, ksports, kgaming, kmovie, kfashion,
   kdrama, kfood, kpop, koreanthing.

### 5b. ja / zh-tw — additive sync (no regeneration, no retranslation of existing text)

Per affected page (§2 lists exactly which sections):
1. `node scripts/audit-content-parity.cjs <lang> culture/<page>` → per-anchor deltas.
2. Open the **English source** section and the target page side by side. Identify the missing
   items (cards, table rows, dialogue lines, whole sections) — the repeated markup blocks make
   them easy to diff visually; count repeating classes (`phrase-card`, `drama-item`, …) if unsure.
3. Copy the missing English HTML blocks into the same position in the target page, then translate
   their prose in place — **matching the page's existing conventions**: ja pages add
   `<span class="ja-kana">`/katakana readings and `ja-block` variants where sibling items have
   them; zh-tw pages match their sibling formatting. Keep Korean, romanization, brands per GUIDE §3.
4. For zh-tw `kfood`: insert the three missing sections (`kfood-manners`, `kfood-phrases`,
   `kfood-slang`) where English has them (between `kfood-ordering`→`kfood-street` and after
   `kfood-phrases`); do **not** touch the extra zh-tw content in `kfood-ordering`/`kfood-street`.
   If a missing section duplicates content zh-tw already has elsewhere under a different id,
   prefer adding the English-structure section anyway (sidebar/anchor links point at those ids)
   unless it would visibly duplicate — use judgment and note it in the report.
5. Also add any sidebar quick-nav links for newly added sections if the English sidebar has them.
6. Re-audit: per-anchor deltas at 0 (or explained: zh-tw "extra ok" rows, the koreanthing −1
   wrapper offset), no missing anchors, prose estimate brand-only.

---

## 6. Definition of done (Phase 3)

1. `node scripts/audit-content-parity.cjs` → every **culture** page of all 8 languages shows `✅`
   (or ⚠️ rows whose only cause is a verified brand-only `en-prose` count / documented zh-tw
   extra-content rows), and `es` specifically has **zero 🚨 STALE** pages and brand-only prose
   estimates.
2. Spot-check in a browser (`node dev.js`, http://localhost:3000): `culture/es/kdrama.html`,
   `culture/es/kfood.html`, `culture/zh-tw/kfood.html`, `culture/ja/kfood.html` — full-length
   article, prose in the right language, sidebar quick-nav anchors all resolve, layout intact,
   no console errors.
3. Update §7 below and report.

---

## 7. Progress snapshot (update as you go)

- tooling (`audit-content-parity.cjs`, `regen-es-stale-culture.cjs`): ✅ created + dry-run
  verified 2026-07-08
- es scaffold regen (12 pages): ✅ done 2026-07-08 — `regen-es-stale-culture.cjs` run once,
  12 backups verified in `translation/_old-es/`, `audit-content-parity.cjs es` confirms all 12
  now ✅ full div parity (en-prose counts remain, expected — translated by prompts 2A–2C)
- es translation: ⏳ 10/12 done — traditions, kbbq, kimchi, ramyeon, ksports, kgaming (2026-07-08),
  plus kmovie, kfashion, kdrama, kfood (2026-07-08, Part B) all ✅ full div parity + brand-only
  en-prose (verified against ja/ + es/ kbeauty/kchicken/mandu reference pages). Also fixed a
  kbbq.html-only regen bug: page was missing `js/lang-core.js` and had `js/lang-ja.js` instead of
  `js/langs/lang-es.js` — chrome would not have loaded correctly; fixed both script tags.
  Part B result (post-translate `audit-content-parity.cjs es`): kmovie 512/512 en-prose 271→26,
  kfashion 562/562 297→74, kdrama 603/603 293→16, kfood 692/692 358→33 — every remaining flagged
  node verified brand / proper-noun / romanization / kept style-tag or hashtag chip (film & drama
  titles, chef & restaurant names, dish romanization spans, K-Pop idol/group names, genre-tag /
  chef-tag chips, place names, platform lists). tú-form neutral Latin-American Spanish, kbeauty
  style; Korean / kr-trans / ja-kana / ja-only / romanization all kept intact. Note: for the 4 big
  chef/food cards in kfood, translating the full restaurant+location+desc+tags block as one Edit
  `old_string` fails to match (em-dash / long multi-line blocks) — split into per-line/per-paragraph
  edits instead.
- es translation Part C (kpop + koreanthing, the two largest pages): ✅ done 2026-07-08. `kpop.html`
  (951/951 divs, en-prose 444→28): history + agencies sections mined heavily from
  `translation/_old-es/kpop.html` (near-verbatim reuse — that backup only diverged in the newer
  generations/genres/variety/film/vocab/phrases/slang/chants sections, all of which needed fresh
  translation since the old backup predates the English content expansion). Remaining 28 nodes are
  film/drama title lists, genre names (Idol Pop, Ballad, Trot, etc. — kept alongside Korean name
  per site convention), and cognate words (Debut, Fandom, Formal, Casual) identical in Spanish.
  `koreanthing.html` (1109/1109 divs, en-prose 443→8): almost entirely fresh translation — the
  `_old-es/koreanthing.html` backup was a 256-line stub with near-zero content overlap (per §1/§2,
  this page had "all 12 sections missing"), so old-es mining wasn't useful here. Covered: the bap
  (rice-phrase) almanac (23 idiom cards), minor-protection law debate, delivery culture, endangered
  species paradox, table culture, public transport, jjimjilbang, plastic surgery culture, outdoor
  drinking, jeonse housing system, traditions/holidays/rites-of-passage/etiquette, and all 72
  proverb cards (each proverb's literal translation + meaning) across the 13 sodam category
  sections. Remaining 8 nodes are romanized Korean holiday/system proper nouns (Chuseok, Seollal,
  Daeboreum, Dongji, Baek-il, Doljanchi, Jeonse) kept per convention, plus the bilingual section
  eyebrow label. `node scripts/audit-content-parity.cjs es` now shows **zero 🚨 STALE and all 16
  culture pages ✅** with brand-only en-prose counts — **Spanish is now fully done for culture**
  (`news/es/article` and `news/es/board` remain 🚨/⚠️ but are explicitly out of scope per §2 —
  optional side jobs, not part of the Phase 3 Spanish culture task).
- ja kfood additive sync: ✅ done 2026-07-08. Root cause turned out simpler than §2 implied: all
  15/8/8 "missing" items in kfood-dishes/kfood-street/kfood-culture were **not** missing dish
  cards or prose — every card's Japanese text was already fully translated. The gap was purely
  structural: ja was missing the `<div class="genre-img"><img …></div>` picture element that
  every EN `genre-card` has (image markup only, not translatable content — same
  `…supabase.co/…/culture/kfood/<slot>-N.webp` URLs as EN, matched 1:1 by card order). Inserted
  all 31 missing image divs via a small Node script keyed on section id ranges + card order
  (kfood-dishes 15, kfood-street 8, kfood-culture 8 across its two sub-grids). `audit-content-parity.cjs
  ja culture/kfood` now shows 692/692 with **zero per-anchor deltas** (verified: EN and JA both
  have exactly 31 `genre-card`/31 `genre-img`). en-prose count unchanged at 38 (same before/after,
  confirming no new gap) — spot-verified all 38 as false positives per GUIDE §6: `kr-trans` blocks
  (Korean text intentionally identical in en/ja by design), balanced `en-only`/`ja-only` span
  pairs (5/5, JA counterpart already present), `phrase-rom` romanizations (Matjip/Meokbang/
  Chimaek/Honbap/Yasik/Injeungshat/Jjapaguri — kept per GUIDE §3), chef-tag brand labels, dollar
  figures, and the 🇰🇷/🇯🇵/🇨🇳 table-header language labels (kept in English by site convention).
  No existing translated content touched. `node dev.js` spot-check: page loads 200 OK.
  `node scripts/audit-content-parity.cjs ja` now shows all 16 ja culture pages ✅ — **ja is fully
  done for culture** (travel/ja/planner and news/ja/* remain ⚠️, explicitly out of scope per §2).
- zh-tw kfood / kdrama / koreanthing additive sync: ✅ done 2026-07-08. Root causes were more varied
  than §2 implied — most gaps turned out to be missing `id` attributes or missing `genre-img`/`bap-kor`/
  `kr-trans` structural divs on already-translated content, not missing prose, so very little fresh
  translation was actually needed:
  - **kfood.html** (692/692, en-prose 1 → brand-only "MICHELIN 3 STARS"): `kfood-manners` and
    `kfood-phrases` content already existed in full, natural zh-tw translation but their
    `culture-sub-heading` divs were missing the `id="kfood-manners"`/`id="kfood-phrases"` attributes
    (the audit tool couldn't see them, and the divs between other anchors read as "extra ok" content
    that actually belonged to these two sections) — fixed by just adding the ids, no duplication.
    `kfood-slang` was genuinely absent — added the 8-card section freshly translated. `kfood-dishes`
    (15 cards), `kfood-street` (8 cards), and `kfood-culture`'s dining/mens sub-grids (5+3 cards) were
    each missing only the `<div class="genre-img">` picture element per card (same root cause as the
    ja/kfood fix in Prompt 2D) — inserted all 31 via a small Node script keyed on section + card order,
    reusing the same Supabase image URLs as EN. No sidebar quick-nav changes needed — EN's own kfood
    sidebar doesn't link the manners/phrases/slang anchors either.
  - **kdrama.html** (602/603, en-prose 2, both brand: "🎬 K-Drama" nav label / "Netflix"): all 12
    `kdrama-dramas` cards were missing their `drama-kor-ja ja-block` (Japanese title) div — present in
    EN and all other language mirrors, only absent in zh-tw; inserted all 12 with correct JP titles.
    `kdrama-dialogue` was missing an entire scene ("🏢 회사에서 첫 만남" / office first-meeting, 4
    bubbles) — added, freshly translated, matching sibling dialogue-bubble structure (no ja-kana spans,
    consistent with the other already-translated bubbles in this file). `kdrama-lines` was missing its
    intro `kr-trans` div plus the last 2 of 12 phrase-cards ("그때 그 사람이...", "나한테 왜 이래요?")
    — added, freshly translated. `kdrama-timeline` remains the documented -1 (verified: 10 timeline-items
    in both EN and zh-tw — genuine harmless wrapper offset, not content loss).
  - **koreanthing.html** (1109/1109, en-prose 1, brand: "🏠 전세 · Jeonse" heading): `bap` was missing
    the `bap-kor` (Korean-language gloss) div on all 25 cards — matched EN↔zh-tw 1:1 by identical
    `bap-phrase` Korean text via a small Node script and inserted all 25. `delivery` and `table` were
    each missing the intro `kt-topic-intro` `kr-trans` div plus a `kr-trans` on each of their
    `table-culture-card`s (5 total each) — added, reusing/adapting EN's Korean text. While investigating
    the other 9 sections' documented "-1 wrapper offset," found they were **not** harmless formatting —
    every one (`chokbeop`, `ecology`, `transport`, `jjimjilbang`, `surgery`, `outdoor-drinking`,
    `jeonse`, `traditions`, `sodams`) was missing the same single `kt-topic-intro` `kr-trans` div as
    `bap`/`delivery`/`table`, just not called out in §2's inventory. Fixed all 9 the same way (script for
    the first 8, one manual edit for `sodams`) — real content, not wrapper noise, and cheap to fix once
    identified. `kimchi.html` sidebar gap turned out to include more than the named `cat-acc-kmovie`
    anchor: that whole accordion section (8 links) was missing, **and** `cat-acc-kgaming`/
    `cat-acc-ksports` were present but empty (self-closing divs) — both filled in from `kfood.html`'s
    reference sidebar. `node scripts/audit-content-parity.cjs zh-tw` now shows **all 16 zh-tw culture
    pages ✅** (only pre-existing out-of-scope `travel/zh-tw/planner` and `news/zh-tw/*` remain
    ⚠️ partial, per §2). Div-balance check (open `<div` vs `</div>` count) and a live `node dev.js`
    200-OK check passed on all 4 edited files.
- optional: travel/planner ja+zh-tw sync: ✅ done 2026-07-08. Root cause was bigger than §2's "missing
  legend-emoji-toggle block" framing suggested: both `ja/planner.html` and `zh-tw/planner.html` were
  running an entire pre-redesign version of the planner UI (old sidebar-based layout with
  `margin-left:var(--sidebar-width)`, a flat 12-item legend with no drag/data-type support, an old
  toolbar with dead fields `trip-title`/`trip-city`/`planner-export-btn`/`planner-import-btn`/
  `planner-import-file` that current `js/app.js` never reads, and a modal missing the
  `event-edit-id`/`event-orig-time` hidden inputs and `modal-delete-btn` that `openModal()`/
  `openEditModal()` unconditionally touch). That last part is a real functional bug, not just a
  content gap: on both pages, opening the add/edit-event modal in its current state would throw
  (`document.getElementById('modal-delete-btn').style.display = …` on a null element), breaking the
  planner's core feature. Fix: replaced the sidebar + toolbar + legend + modal type-grid block in
  both files with the current EN/ES structure (verified against `travel/es/planner.html`, the
  declared-complete reference, plus `travel/planner.html`) — dropped the sidebar (EN/ES intentionally
  removed it for this page only, confirmed by checking `travel/itineraries.html` still has it), added
  the `planner-layout`/`planner-content`/`planner-body`/`planner-ad-zone` wrapper, the grouped
  22-item legend with `data-type` + drag-hint (translated: 開始・終了/食事/アクティビティ/交通 for ja,
  開始・結束/餐飲/活動/交通 for zh-tw), the `legend-emoji-toggle` button, and the matching grouped
  `event-type-grid` in the modal, plus the missing hidden inputs and delete button. Both files now
  60/60 divs (`node scripts/audit-content-parity.cjs ja|zh-tw` → ✅), div open/close tags balanced,
  and verified rendering 200 OK via `node dev.js`. New vocabulary introduced (types that didn't exist
  in the old 12-type set): ja 就寝/到着/出発/イベント/体験/タクシー/バス/電車/地下鉄/バイク/徒歩;
  zh-tw 就寢/抵達/出發/活動/體驗/計程車/公車/火車/地鐵/機車/步行. Note: `modal-save-btn`/
  `.planner-modal-title` text gets overwritten by hardcoded bilingual EN/KO strings inside
  `openModal()`/`openEditModal()` in `js/app.js` regardless of page language (true for EN/ES too) —
  pre-existing app-wide behavior, left untouched (out of scope, not a regression).
- optional: news/es/article+board sync: ✅ done 2026-07-08. Both were pre-rebuild stubs running a
  dead architecture — `article.html` had `<main id="news-article-main"><div id="article-container">`
  expecting a `NewsArticlePage.init()` that no longer exists anywhere in `js/app.js` (only
  `article-root` is referenced now); `board.html` had `board-articles-grid` + `news-level-btn`
  level-filter buttons that `js/app.js`'s board renderer never reads (current code only touches
  `board-table`/`board-tbody`/`board-th-*`/`board-topic-tabs`/`board-load-more`/`board-article-count`).
  Both were non-functional. Rebuilt from scratch using `news/de/article.html` and `news/de/board.html`
  as the structural template (depth-2 paths, `lang="es"`, `js/langs/lang-es.js` script tag added to
  match the `gen-content-mirrors.cjs` convention, canonical/og:url/hreflang set expanded to match the
  de reference's en/ja/es/id/x-default list), then translated all visible labels into neutral
  Latin-American Spanish (tú-form chrome, matching `culture/es/kbeauty.html` terminology). Kept the
  existing es-specific header conventions already established in the sibling `news/es/index.html`
  (`aria-label="Buscar en el sitio"`/`"Abrir menú"`/`"Cambiar idioma"`, `🇪🇸 ES` flag button — the
  latter matching the newer regen-pipeline style used by `culture/es/kbeauty.html`, since de's own
  reference used an untranslated `aria-label="Switch language"` that looked like a de-only oversight,
  not a convention to copy). No content invented — these are JS-rendered app shells, so only
  chrome/labels were translated (nav, breadcrumb, AI-notice, section eyebrows, table headers, filter
  tabs, footer) while the JS-populated article/table body markup was left as empty skeleton
  placeholders identical in structure to en/de. `node scripts/audit-content-parity.cjs es` confirms
  `news/es/article` 58/58 divs (1 remaining en-prose node: "Naver News", a kept brand name) and
  `news/es/board` 8/8 divs (0 remaining en-prose nodes). Div open/close balance verified, both pages
  `node dev.js` 200 OK.
- de/fr/vi/th/id culture: ✅ nothing needed (verified full parity 2026-07-08)
- **Phase 3 status: fully done.** Every culture page across all 8 languages shows ✅, and both
  optional side jobs (travel/planner ja+zh-tw, news/es article+board) are also done — nothing
  outstanding from §2/§6.
- **Final verification (2026-07-08):** `node scripts/audit-content-parity.cjs` re-run for all
  8 languages — every culture page across all 8 languages shows ✅ with zero ⚠️/🚨 rows; es has
  zero 🚨 STALE; ja `kfood` 692/692; zh-tw `kfood` 692/692, `kdrama` 602/603 (documented harmless
  wrapper offset, no missing anchors), `koreanthing` 1109/1109 — none show a `missing:[...]`
  anchor list. Browser spot-check (`node dev.js`, all 200 OK) on `culture/es/kdrama`,
  `culture/es/kfood`, `culture/es/kpop`, `culture/es/koreanthing`, `culture/ja/kfood`,
  `culture/zh-tw/kfood`: correct `lang` attribute per page, full-length div counts matching
  English structural parity, every sidebar quick-nav `href="#id"` resolves to an existing id
  (0 broken anchors on all 6 pages), `<div>`/`</div>` tag counts balanced, all local JS/CSS
  assets (`js/lang-core.js`, `js/app.js`, `js/ads.js`, `js/langs/lang-es.js`, `css/style.css`)
  return 200. No headless browser (Puppeteer not installed in this environment) was available to
  capture live console errors directly — verified via HTTP status + structural/anchor checks
  instead; no evidence of missing assets or unresolved anchors that would throw. Confirmed ja/
  zh-tw pages load no language-pack script (`js/langs/lang-<code>.js`) by design — same on
  untouched reference pages like `culture/ja/kbeauty.html` — not a Phase 3 regression.
  Scope check: since the entire 8-language localization tree is untracked in git (never
  committed — see [AdSense Readiness memory]), `git diff` has no baseline, so scope was verified
  via mtimes instead — `culture/es/{index,kbeauty,kchicken,mandu}.html` all carry an untouched
  2026-07-08 01:23 mtime (before any Phase 3 work began at 12:02+); `translation/_old-es/`
  contains exactly the 12 stale-page backups named in §2 (not the 4 protected pages);
  `travel/es/*.html` all carry the pre-Phase-3 2026-07-07 21:48 mtime. `news/es/article.html`
  and `board.html` do show fresh mtimes, but that matches the already-documented optional
  side job above (not scope creep). **Phase 3 verification: confirmed complete, nothing left.**
