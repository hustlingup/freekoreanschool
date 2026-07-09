# AdSense Readiness — Copy-Paste Prompts

Each block is a self-contained prompt for a **fresh Claude Code session** opened in the project
root (`c:\Users\EFHYDRO\Desktop\개인\koreanschool`). Copy the whole block, paste it, done.

Rules of thumb:
- Run **one prompt per session**, in order (1 → 5). Prompt 6 is post-approval only.
- Prompt 0 is a **manual owner step** (AdSense dashboard) — not a Claude session. Prompts 1–3
  are blocked until it's done.
- If a session ends mid-work, paste the **same prompt** into a new session — the injector is
  idempotent and `node scripts/audit-ad-zones.cjs` shows exactly what's left.
- The UNIVERSAL RESUME prompt at the bottom continues whatever is unfinished.

---

## 0) Owner manual step — create ad units (do this first, no Claude needed)

In https://adsense.google.com → **Ads → By ad unit → Display ads**, create four responsive
display units: `ks-top`, `ks-mid`, `ks-bottom`, `ks-rail`. Copy each numeric `data-ad-slot`
ID into `scripts/ad-slots.json` (Prompt 1 creates the file; you can also create it yourself
per GUIDE §6). The injector refuses to run with empty slot IDs.

---

## 1) Foundation — CSS, ads.js, injector + audit scripts, English culture pilot

```
Read adsense/GUIDE.md fully and follow it exactly. Task: AdSense ad-zone foundation.
Scope for THIS session:
(1) Create scripts/ad-slots.json per GUIDE §6 (empty slot strings if the owner hasn't filled
them yet). (2) Append the .ad-zone / .ad-rail CSS from GUIDE §5 to css/style.css. (3) Create
js/ads.js per GUIDE §7.3. (4) Create scripts/inject-ad-zones.cjs per GUIDE §7.1 (pure string
insertion, idempotent, exclusion list, --dry-run, --rail flag OFF by default) and
scripts/audit-ad-zones.cjs per GUIDE §7.2. (5) Run the injector with --dry-run on scope
culture (English only) and sanity-check the plan; if scripts/ad-slots.json has real slot IDs,
run it for real, then run the audit. (6) Verify with npx serve -l 5060 . : open
culture/kpop.html and culture/kimchi.html — layout unchanged (zones collapse per GUIDE §5),
no console errors, dark + light themes OK. NEVER run gen-content-mirrors.cjs /
gen-root-mirrors.cjs. Do not add zones to excluded pages (GUIDE §4). Do not enable --rail.
When done, update adsense/GUIDE.md §10 progress snapshot and report: files created, audit
summary, anything blocked on slot IDs.
```

---

## 2) English remainder — learn, travel, news, root pages

```
Read adsense/GUIDE.md fully and follow it exactly. Task: extend ad zones to the remaining
English pages. Precondition: Prompt 1 done (scripts exist) and scripts/ad-slots.json has real
slot IDs — if not, stop and report. Scope for THIS session: run
node scripts/inject-ad-zones.cjs for scopes learn, travel, news, root (English pages only,
not the language mirrors). Respect the GUIDE §4 matrix: learn lessons bottom-only (never
inside/above the step-runner), travel bottom (+top only where an anchor exists), news/index
bottom-only, index.html and about.html bottom-only; privacy/terms/contact/search/quiz and
news article/board/admin get NOTHING. Then node scripts/audit-ad-zones.cjs — zero ⛔/⚠️ flags
for English pages. Spot-check with npx serve -l 5060 . : learn/hangul.html (step-runner still
works end to end), travel/index.html, index.html. NEVER run the gen-* generators. Do not
enable --rail. Update adsense/GUIDE.md §10 and report the audit rollup.
```

---

## 3) Language mirrors — all 8 languages

```
Read adsense/GUIDE.md fully and follow it exactly. Task: roll ad zones out to the language
mirrors. Precondition: Prompts 1–2 done. Scope for THIS session: run
node scripts/inject-ad-zones.cjs across the mirrors of es, ja, zh-tw, de, fr, vi, th, id —
sections <lang>/ root pages, culture/<lang>/, travel/<lang>/, news/<lang>/, learn/<lang>/ —
same GUIDE §4 matrix and exclusion list (privacy/terms/contact/search/quiz/article/board/admin
in EVERY language get nothing). Inserting ad zones into es/ ja/ zh-tw/ is allowed
(insertion-only); do NOT edit any prose anywhere, and NEVER run gen-content-mirrors.cjs /
gen-root-mirrors.cjs. Verify js/ads.js script tags use the correct ../ depth for depth-2
pages. Then node scripts/audit-ad-zones.cjs — full-site rollup, zero flags. Spot-check with
npx serve -l 5060 . : culture/ja/kpop.html, culture/vi/kfood.html, learn/es/hangul.html —
layout unchanged, chrome still translated, no console errors. Also confirm
node scripts/audit-content-translation.cjs vi output is UNCHANGED by the injection (ad zones
add no text nodes). Update adsense/GUIDE.md §10 and report.
```

---

## 4) "Low value content" cleanup (GUIDE §3)

```
Read adsense/GUIDE.md fully — especially §3 — and follow it exactly. Task: remove low-value /
thin / duplicate-content signals before the AdSense re-review. Steps for THIS session:
(1) Translation gate: run node scripts/audit-content-translation.cjs <lang> for vi, de, fr,
th, id. For any language not fully ✅, list its unfinished culture/travel/news pages, add
<meta name="robots" content="noindex,follow"> to those files, and confirm none of them are in
sitemap.xml (report which languages this hit — finishing them via translation/PROMPTS.md and
removing the noindex later is the preferred end state). Never edit es/, ja/, zh-tw/ prose.
(2) Dev files: delete lesson-header-mobile-options.html, culture_travel_news_extract.txt,
learn_extract.txt from the deploy root; list remaining root-level .md working files and move
them into docs/ (do NOT touch robots.txt, ads.txt, sitemap.xml, site.webmanifest); update any
references. (3) Thin shells: verify search.html, news/article.html, news/board.html are
noindex or have crawlable content; fix with noindex if not. (4) Sitemap sanity: every <loc>
in sitemap.xml resolves to a real, indexable, content-bearing page; no noindexed or excluded
page is listed. (5) Placeholder images: grep the sitemap-listed English pages for obvious
placeholder images/boxes and report the list (owner is filling these — report only, don't
fabricate images). NEVER run the gen-* generators. Update adsense/GUIDE.md §10 and report a
§3-numbered checklist of what was done vs what remains for the owner.
```

---

## 5) Final verification + pre-review report

```
Read adsense/GUIDE.md fully and follow it exactly. Task: final pre-review verification
(GUIDE §9). (1) node scripts/audit-ad-zones.cjs — every includable page matches the §4
matrix, zero ⛔/⚠️ flags, excluded pages clean in all 9 language variants. (2) Confirm
scripts/ad-slots.json has 4 real numeric slot IDs and every injected ins uses them, ads.txt
is intact, and the AdSense loader + google-adsense-account meta are in <head> of every page
that has zones. (3) npx serve -l 5060 . and check with Playwright or curl: index.html,
culture/kpop.html, culture/ja/kpop.html, learn/hangul.html, travel/index.html, quiz.html
(must have NO ad zones), privacy.html (none) — layout identical to pre-ad state (zones
collapsed), no console errors, dark/light themes, mobile viewport. (4) Re-verify GUIDE §3:
no dev/scratch files reachable, unfinished languages noindexed or finished, sitemap clean.
(5) Produce a final report: per-section zone rollup, §3 checklist status, and the exact
remaining OWNER actions (fill any missing images, check Search Console coverage, then request
the AdSense review at adsense.google.com — and do not resubmit while a review is pending).
Update adsense/GUIDE.md §10. Do NOT enable --rail. NEVER run the gen-* generators.
```

---

## 6) POST-APPROVAL ONLY — enable the right ad rail (w3schools style)

```
Read adsense/GUIDE.md fully and follow it exactly. Precondition: the site has been APPROVED
by AdSense and ads are serving — if you cannot confirm this from the user, stop and ask.
Task: enable the desktop right ad rail (GUIDE §4 zone D, §5 rail CSS). Run
node scripts/inject-ad-zones.cjs all --rail (idempotent — only adds the <aside class="ad-rail">
after </main> on sidebar-layout pages that lack one; ks-rail slot from scripts/ad-slots.json).
Then node scripts/audit-ad-zones.cjs — no page over 4 total zones with the rail counted.
Verify at ≥1500px viewport (Playwright): rail is sticky under the header on
culture/kpop.html and learn/hangul.html, hidden below 1500px, js/ads.js does not push the
hidden rail slot on narrow viewports, no horizontal scroll, no layout shift. Optionally also
evaluate adding ad-zone--top to learn lessons now that approval is secured (report a
recommendation; only apply if the user asked). Update adsense/GUIDE.md §10 and report.
```

---

## UNIVERSAL RESUME (any point)

```
Read adsense/GUIDE.md fully and follow it exactly. Task: resume the AdSense readiness work
wherever it left off. Run node scripts/audit-ad-zones.cjs (create the scripts per GUIDE §7
first if they don't exist yet) and read adsense/GUIDE.md §10 to see what's done. Continue in
rollout order (GUIDE §8): foundation → English culture → English learn/travel/news/root →
language mirrors → §3 cleanup → final verification. The injector is idempotent — re-running
a scope is always safe. NEVER run gen-content-mirrors.cjs / gen-root-mirrors.cjs, never add
zones to excluded pages, never edit es/ ja/ zh-tw/ prose, do not enable --rail pre-approval.
When the current stage is done, update adsense/GUIDE.md §10 and report status + what's next.
```
