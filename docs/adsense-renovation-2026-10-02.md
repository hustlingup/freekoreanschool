# Korean School renovation — 2 October 2026

Implemented locally to address the reported “low value content” rejection. No AdSense approval, deployment, Search Console submission, audience growth, or operator review of new examples is claimed.

## Findings and changes

- Existing lesson content and translations were retained. The starting workspace already contained extensive image and translation edits; those were preserved.
- Homepages showed unsupported totals of 5,000 vocabulary items, 42 lessons, and 12,000 active learners. Removed the stat panel across ten live languages, corrected the 5,000-word claims, and replaced the first Hangul card’s mastery promise with a description of actual practice.
- Rebuilt the English entrance around an actionable learning path, quiet colours, readable contrast, and direct guide links. Localized guide entry panels, labelled English-only destinations, added semantic main landmarks and skip links, and fixed narrow-screen language buttons.
- Added eight static pages under `/guides/`: a hub, first-week plan, four study companions, editorial standards, and a content update log. Each study companion has an original model, explanation, context, common errors, practice, inspectable answer explanations, references, and links to existing lessons.
- Added optional local checklist storage, route recommendations, and exercise feedback. Content and answer panels remain usable without JavaScript; denied browser storage is handled without breaking the plan.
- Replaced inaccurate privacy content in all ten languages. It now separates local progress from hosting, analytics, advertising cookies, external fonts/images, speech services, and voluntary email. This notice does not substitute for any required consent platform.
- Removed the AdSense loader from 90 policy, contact, search, quiz, word-bank tool, flashcard, and travel-planner pages. Retained the publisher account metadata and existing content-page loaders.
- Added static editorial/learning-path links to existing public footers, guide search entries, and guide sitemap discovery. Search locale codes now come from the live registry; English-only guides retain valid English URLs. Sitemap revision dates only advance for substantial recorded content changes.
- Disclosed AI assistance for new material and removed unsupported blanket human-review claims from the English About page. No qualified-teacher review of new material is implied.

## Verification

- `node scripts/audit-i18n.cjs --check`: **16/16 invariants pass**, including 1,160 static search targets and all existing localized page mirrors.
- `node scripts/audit-learn-content.cjs`: **180 existing lesson/tool pages audited**, none under its 300-word threshold. This count does not establish content quality or eligibility.
- `node scripts/check-renovation.cjs`: headless Chromium checks **8 static guide pages, 90 ad-free pages, 12 mobile layouts**, correct/wrong/unanswered practice, reset, saved/reloaded ticks, storage-denied fallback, route recommendations, guide search, existing lesson hydration, and answers without JavaScript. No browser JavaScript errors on tested pages. External requests were blocked during these tests; ad delivery and external speech were not verified.
- Desktop/mobile screenshots inspected in `docs/renovation-qa/`. Homepage, guide typography, and narrow-screen navigation reviewed.
- `node scripts/gen-sitemap.cjs`: **408 indexable URLs**; existing noindex tools remain excluded.
- Renovation entry script re-run: no changes, demonstrating marker idempotency.

QA requires a Playwright install outside the deployed frontend. In PowerShell, point `KS_QA_MODULE_PATH` to its package directory, run `node dev.js` in another terminal, then run `node scripts/check-renovation.cjs`.

Authored guide source: `scripts/build-study-guides.cjs`. Rebuild with `node scripts/build-study-guides.cjs`. Existing-page upgrades: `scripts/renovate-entry-pages.cjs`. Do not run older mirror generators to overwrite translated source pages. When substantially changing content later, update the relevant recorded revision date and rebuild the sitemap.

## Scope and limits

New companions are currently English. Existing translated lessons, culture and travel content remain available. Automated language coverage does not certify translation accuracy. The browser tests sampled existing pages; they did not re-review every cultural claim, image right, or externally hosted resource. The live site and Google accounts were not changed.

After publishing this revision, the live deployment should be checked before requesting another AdSense review. Google evaluates the live site; repository changes alone are not a review result. Advertising configuration must still meet applicable Google consent requirements.

## References used

- [Google AdSense content and user experience](https://support.google.com/adsense/answer/10015918)
- [Google Publisher Policies](https://support.google.com/adsense/answer/10502938)
- [Google Search spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Required privacy content for AdSense](https://support.google.com/adsense/answer/1348695)
- [National Institute of Korean Language: Learners’ Dictionary](https://krdict.korean.go.kr/eng/mainAction)
