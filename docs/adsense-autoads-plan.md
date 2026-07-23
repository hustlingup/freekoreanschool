# AdSense Phase 2 — Auto Ads migration + hub content + QA

**Orchestration brief for a new session (Opus orchestrates; fan out to agents/subagents).**
Self-contained — read this top to bottom, then read `CLAUDE.md`, then execute. Do not re-derive
what is already stated here.

---

## 0. Context (what came before)

The site `freekoreanschool.com` (repo at `c:\Users\EFHYDRO\Desktop\개인\koreanschool`) was rejected
by Google AdSense for "Low value content." A large remediation already shipped (13 commits on
`main`, pushed): lessons pre-rendered to real HTML, culture/travel prose re-tagged with semantic
headings, the AI news section removed, all 8 locales fully translated, every quiz rebuilt to test
Korean, sitemap/hreflang/schema fixed, the legacy `culture/traditions` stubs deleted, and dead
`News` translation keys purged.

This phase is a follow-up decided by the owner. **The owner will enable Google Auto Ads in the
AdSense dashboard after approval.** With Auto Ads, Google places ads automatically from a single
code snippet — individual manual ad units per page are unnecessary and the empty, unfilled manual
slots may hurt the review. So this phase removes all the manual ad plumbing, and raises the two
lightest hub pages to a genuine content bar.

---

## 1. The three goals

**A. Remove every manual ad zone site-wide** (the owner will use Auto Ads instead).
**B. Raise `index.html` (home) and `culture/index.html` to substantial, valuable pages** (~2,000 words each, all 9 locales).
**C. Site-wide QA + thin-page audit** — confirm every element still works after the surgery, and inventory pages under 2,000 words.

> **Honest note on "2,000 words."** Google publishes **no** minimum word count (confirmed from
> Google's own AdSense policy pages during Phase 1). 2,000 is the **owner's self-imposed quality
> bar** — a proxy for "this is a substantial, valuable page," not a Google threshold. Write
> genuinely useful content that happens to reach ~2,000 words. **Do not pad to hit the number.**
> A page is judged by whether it reads as real content vs. a bare navigation/utility screen.

**Recommended execution order: A → B → C.** Do the ad removal first (biggest structural change, and
it affects layout/spacing), then the content, then a full QA that covers both.

---

## 2. CRITICAL project knowledge & hazards (MUST READ before touching anything)

These were learned expensively in Phase 1. Ignoring them corrupts the repo or destroys agent work.

1. **No build step.** Vanilla HTML/CSS/JS served directly. 9 locales: `en` (root) + `ja`, `zh-tw`,
   `es`, `de`, `fr`, `vi`, `th`, `id`. ~440 shipped pages.
2. **Preserve line endings.** Most files are **CRLF**. Any script that rewrites a file MUST read it,
   edit in memory, and write back with the *same* EOL. If you flip CRLF→LF, git reports thousands of
   spurious "changed" lines (every line re-counted). Copy the read/write pattern from
   `scripts/harden-news-section.cjs` or `scripts/vocab-i18n.cjs`.
3. **Never `git add -A`.** Stage explicit paths only. `git add -A` sweeps in unrelated untracked
   files. (Phase 1 accidentally committed unrelated image scripts this way.)
4. **Never run these — they overwrite translations with English:** `gen-content-mirrors.cjs`,
   `gen-root-mirrors.cjs`, any `gen-*-site.cjs`, `regen-*-culture.cjs`. **Safe to run:**
   `gen-sitemap.cjs`, `gen-lesson-static.cjs`, `gen-lesson-manifest.cjs`, `gen-search-words.cjs`.
5. **Guard scripts have a `--check` mode. Run them after changes to prove no regression:**
   `fix-culture-travel-seo.cjs --check`, `fix-culture-travel-nav.cjs --check`,
   `harden-page-metadata.cjs --check`, plus audits `audit-vocab-quizzes.cjs`,
   `audit-learn-content.cjs`, `audit-learn-locale-dup.cjs`.
6. **Multi-agent collision rule.** In Phase 1, an agent running a site-wide `gen-*` script mid-run
   silently reverted two other agents' work, and a `git stash` collided with a concurrent git
   process and lost 102 files. Therefore: **one agent = one file (or a disjoint file set); no
   `git stash`; never run a site-wide generator while agents are active; commit between waves.**
   Symptom of a clobber: `git status` shows a file modified but `git diff` is empty (CRLF churn only).
7. **Prefer a single idempotent, marker-guarded script for mechanical site-wide edits** (like ad
   removal) over a swarm — it is deterministic and re-runnable. Reserve agents for content writing,
   translation, and QA where per-file judgment is needed.
8. **Commits:** stage explicit paths, one logical commit per wave, end the message with
   `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`. **Do not push** — the owner pushes.
9. **Smoke-test with the dev server:** `node dev.js` serves on `http://localhost:3000`. Use `curl`
   for status codes; the server resolves extensionless clean URLs like Vercel.
10. **Known open issue (not this phase, but don't be surprised):** `js/lang-core.js` omits `th` from
    the language switcher, so Thai pages are translated but unreachable via the picker.

---

## 3. TASK A — Remove every manual ad zone (Auto Ads migration)

### 3.1 Current ad footprint (measured — trust these numbers)

- **~333 shipped HTML pages** carry manual `<ins class="adsbygoogle">` slots, each wrapped in a
  `.ad-zone` div. Breakdown: `culture` 135, `learn` 144, `travel` 36, plus `index.html`,
  `about.html`, and their locale copies (~18 root-locale files). Culture guide pages have up to
  **3** slots (top/mid/bottom); most pages have 1.
  *(Ignore `translation/_old-es/` — it is `.vercelignore`d and not shipped.)*
- **399 pages** have the AdSense **loader script** in `<head>`:
  `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6791974364232767" crossorigin="anonymous"></script>`
- `js/ads.js` — the `window.KSAds.push()` machinery that fills `.ad-zone .adsbygoogle` slots.
- `js/app.js` — the `ContentRail` module (~line 1941). It renders a right rail with **Word-of-the-Day
  + Keep-Exploring links AND an ad** (`railAdHTML`, gated by `const KS_ADS_LIVE = false`).
- `css/style.css` — 17 lines of `.ad-zone*` rules.
- `scripts/` — existing ad tooling: `inject-ad-zones.cjs`, `strip-ad-zones.cjs`, `audit-ad-zones.cjs`.
- `ads.txt` — `google.com, pub-6791974364232767, DIRECT, f08c47fec0942fa0`.

### 3.2 What to REMOVE vs KEEP

| Item | Action | Why |
|---|---|---|
| `<ins class="adsbygoogle">` slots + their `.ad-zone` / `.planner-ad-zone` wrapper divs (all ~333 pages, all locales) | **REMOVE** | Empty manual units; Auto Ads doesn't use them |
| `railAdHTML` + the ad `push` inside `ContentRail` in `js/app.js` | **REMOVE** | Only the ad part — see 3.4 |
| `js/ads.js` + every `<script ... src="js/ads.js">` include | **REMOVE** | Dead once slots are gone |
| `.ad-zone*` rules in `css/style.css` | **REMOVE** | Dead selectors |
| `KSAds.push()` calls anywhere | **REMOVE** | Dead |
| `scripts/inject-ad-zones.cjs`, `strip-ad-zones.cjs`, `audit-ad-zones.cjs` | **REMOVE (retire)** | Obsolete tooling |
| **The `adsbygoogle.js` loader in `<head>`** | **KEEP** | This *is* the Auto Ads snippet + the review hook. Same code Auto Ads uses. |
| **`ads.txt`** | **KEEP** | Required for Auto Ads |
| `ContentRail` Word-of-the-Day + Keep-Exploring (non-ad parts) | **KEEP** | Real UX, not ads |

> **Loader decision:** keep the loader. Auto Ads runs from exactly this snippet, and AdSense needs
> the code present to review the site. Removing the empty `<ins>` units is what cleans up the review;
> the bare loader serves nothing until the account is approved.

### 3.3 Approach for the HTML removal

1. **First inspect `scripts/strip-ad-zones.cjs`** — it was written in Phase 1's density rollback and
   may already remove `.ad-zone` blocks cleanly. Either reuse it or write a fresh idempotent,
   line-ending-preserving script (`scripts/remove-all-ad-zones.cjs`) that deletes each
   `.ad-zone` / `.planner-ad-zone` block (the wrapper div and the `<ins>` inside) from every shipped
   HTML file across all 9 locales. Match the exact block boundaries; do not touch surrounding content.
2. Run it, then verify: `grep -rl '<ins class="adsbygoogle"' --include=*.html . | grep -v '^./news' | grep -v translation` must return **0**; `.ad-zone` divs must be **0**; the loader count must stay **399**.
3. Check div-balance on a sample of touched pages (opens == closes) and that no lesson `<details id="lesson-static">` block was disturbed.

### 3.4 `js/app.js` — surgical, not wholesale

`ContentRail` renders **both** the rail's real content (Word-of-the-Day, Keep-Exploring) **and** the
ad. Remove **only** the ad: delete `railAdHTML` and the block that pushes it (around lines 2031-2053,
`KS_ADS_LIVE`, the `.adsbygoogle` push loop). **Keep** the rail module and its non-ad content.
Also remove the now-unused `const KS_ADS_LIVE`. Run `node --check js/app.js` after.

### 3.5 Verification for Task A

- `node dev.js`; load home, a culture guide, a learn lesson, a travel page, the planner, in EN and 2
  locales — all 200, layout intact, no empty gaps where ads were, rail still shows Word-of-the-Day.
- `grep` confirms 0 `<ins>`/`.ad-zone` in shipped HTML; loader still on all 399; `ads.txt` unchanged.
- Guard `--check`s (§2.5) all pass.
- Commit: `chore(ads): remove all manual ad units for Auto Ads migration`.

---

## 4. TASK B — Raise home + culture hub to substantial content

### 4.1 Current state

| Page | EN main words now | Target |
|---|---|---|
| `index.html` (home) | ~618 | ~2,000 |
| `culture/index.html` | ~817 | ~2,000 |

Each has 8 locale copies (`de/`, `es/`, `fr/`, `id/`, `ja/`, `th/`, `vi/`, `zh-tw/` for home;
`culture/<loc>/index.html` for the hub). So the deliverable is **2 pages × 9 locales = 18 files**.
Both already have a small intro section (added in Phase 1) — build on it, don't duplicate it.

### 4.2 Content plan (write genuinely useful prose — no filler, no keyword-stuffing)

**Home (`index.html`)** — add sections such as:
- **Your learning path** — the real sequence the site teaches: Hangul → syllable blocks →
  pronunciation → grammar → vocabulary → speaking through culture. One honest paragraph each.
- **Why learn Korean** — culture (Hallyu), travel, work/study, the writing system's logic.
- **What's inside** — substantive descriptions of the Learn / K-Culture / Travel sections and what a
  learner actually gets from each.
- **Getting started / FAQ** — real questions with real answers: *How long to learn Hangul? Is Korean
  hard for English speakers? Do I need Hanja? Is it really free? How is this different from an app?*

**Culture hub (`culture/index.html`)** — build past the existing intro:
- **How each guide teaches you Korean** — the culture→language method, concretely.
- **A paragraph of real substance per major area** — K-Pop, K-Drama, film, food, beauty & fashion,
  gaming & esports, traditions — what the guide covers and the Korean it teaches.
- **Where to start** — guidance for a newcomer by interest.
- Optional short **FAQ** (What is Hallyu? Which guide first? Do I need to know Korean already?).

Match each page's existing design system and classes (`travel-section`, `container`,
`section-title`, `section-eyebrow`, tip boxes, etc.). Wrap all Korean in `<span lang="ko">`. Use real
`<h2>`/`<h3>` structure. Add proper FAQ markup if you add an FAQ (consider `FAQPage` JSON-LD, but only
if the Q&A is genuinely on-page).

### 4.3 Orchestration for Task B

1. **Author the English content first** (orchestrator or one writer-agent) for both pages, inserted
   into `index.html` and `culture/index.html`. Get the structure and prose right in EN before
   translating.
2. **Then fan out translation:** one agent per locale (8 agents), each translating **both** new
   English sections into its locale and inserting them into `<loc>/index.html` and
   `culture/<loc>/index.html` at the matching anchors. One agent owns its 2 files only — no overlap.
   Rules for each: translate text nodes only; keep every tag/class/inline style; keep Korean verbatim
   in `lang="ko"`; match that locale's existing house style; genuine prose, not filler.
3. After all land: re-measure word counts; run `gen-sitemap.cjs` if structure changed;
   `harden-page-metadata.cjs --check` (schema/hreflang intact); dev-server smoke a few locales.
4. Commit: `content: expand home and culture hub into full landing pages`.

> If a locale can't credibly reach ~2,000 words without padding, prefer **slightly shorter but
> genuinely good** over inflated. Report any page left materially under target.

---

## 5. TASK C — Site-wide QA + thin-page audit

Runs last, after A and B, as the final verification the whole site still works and to inventory
remaining thin pages.

### 5.1 Thin-page inventory

Write a measurement script (reuse the `audit-learn-content.cjs` approach) that reports **every shipped
page's main-content word count**, flags those **< 2,000 words**, grouped by section and locale.
Deliver it as a table. This is an inventory for the owner's decisions (bulk up / leave / noindex) —
**not** a mandate to rewrite every page. Many legitimately short pages (utility, tools) are fine.
Note which flagged pages are already `noindex` (search, quiz, planner).

### 5.2 Functional QA — confirm every element still works

Fan out agents by area; each loads pages via `node dev.js` and verifies. Cover:
- **Header/nav**, **left sidebar + accordion**, **mobile menu**, **theme toggle**, **search bar**.
- **Language switcher** (note: `th` is knowingly not wired in — flag, don't "fix" unless asked).
- **Learn lessons**: the interactive `step-runner.js` renders steps AND the static
  `<details id="lesson-static">` block is present; **syllable builder**; **quiz**; **flashcard**;
  **vocabulary browser**; **progress grid**.
- **Images** (Supabase-hosted) load; **internal links** resolve (no 404); **hreflang** targets exist.
- **Layout after ad removal** — no empty gaps, no broken grid where `.ad-zone` used to sit.
- Confirm **no residual ad markup** and the loader + `ads.txt` are intact (Auto-Ads-ready).

Deliver a severity-ranked findings report. Fix clearly-mechanical breakage; **report** anything
judgment-heavy rather than guessing.

### 5.3 Final commit(s)

Commit the audit scripts and any QA fixes separately from the content/ad work.

---

## 6. Orchestration model (how to run this)

- **Opus orchestrates.** Do Task A yourself (or via one focused engineer-agent) because it is a
  deterministic script + surgical JS/CSS edits — a swarm adds risk, not value.
- **Task B translation** and **Task C QA** are where you fan out: 8 translation agents (one locale
  each, disjoint files) for B; several QA agents (one section each) for C.
- Between each task: verify, then **commit explicit paths** (never `git add -A`), then proceed.
- Respect the collision rule (§2.6): don't run site-wide generators while agents are active.

## 7. Definition of done

- [ ] 0 `<ins class="adsbygoogle">` / `.ad-zone` in shipped HTML; loader on all 399 pages; `ads.txt` kept.
- [ ] `js/ads.js` gone; `ContentRail` ad removed but rail content kept; `.ad-zone` CSS gone; `node --check js/app.js` clean.
- [ ] `index.html` and `culture/index.html` (+ 8 locales each) are substantial, genuinely useful pages (~2,000 words, no padding), correctly translated, Korean in `lang="ko"`.
- [ ] Thin-page inventory delivered; functional QA report delivered; mechanical breakage fixed.
- [ ] All guard `--check`s pass; sitemap regenerated; dev-server smoke across locales is clean.
- [ ] Work committed in logical waves with explicit paths. **Not pushed** — the owner pushes.

---

*Written 2026-07-23 as the hand-off brief for Phase 2. If anything here conflicts with `CLAUDE.md`,
`CLAUDE.md` wins on architecture; this file wins on the Phase-2 plan.*
