# Learning and discovery redesign — 2 October 2026

This pass builds on the existing uncommitted redesign, translations, image work, and study guides. It changes the local website; it does not deploy the site or submit an AdSense application.

## What changed

- Added `/learn/index.html` and nine localized versions. The library has 18 existing lessons/tools, four topic groups, search, empty states, a saved filter, and a suggested starting path. A returning reader can resume their last lesson. The shared Learn navigation and site search lead to this library.
- Added a responsive visual system in `css/experience.css`: cream backgrounds, forest-green text and controls, restrained warm accents, a Hangul composition, clearer typography, generous reading space, and visible focus/selection states. No new third-party UI dependencies or generated images are required.
- Culture topics now appear before the long introduction. Culture and travel have quick section links, searchable guide cards, and a saved-guide shelf that appears when needed. Existing paragraphs, translations, and photo references are retained.
- Reading pages offer save-for-later, an explicit studied toggle, resume links, current-section highlighting, reading position, and a next destination. Scrolling never marks a lesson as learned. Progress stays in this browser and storage denial is handled.
- Quiz visitors choose among ten sets instead of scrolling through 200 questions. Answer drafts survive reloads. Answered counts, scores, missed/unanswered review, reset, and supporting lesson links make follow-up practice easier. All sets and answer panels remain usable without JavaScript and print together.
- Found all 200 source quiz answers at choice index 0. Static choices are now ordered by a stable hash per question/choice. Their values, prompts, translations, and correct-answer mapping remain unchanged; saved answers still work.
- Alphabet answer panels reuse explanations from the corresponding translated Hangul lesson. Every quiz answer also links back to its supporting lesson.
- Language switching uses each page's existing alternate links, preserving the lesson or library instead of always returning to Hangul.
- Repaired legacy documents with titles, descriptions, canonical links, and styles incorrectly placed after the closing head tag. Metadata now belongs to the head, and base CSS loads before its enhancement layers.
- The new library has valid titles, descriptions, canonical/alternate links, and CollectionPage/ItemList metadata. The sitemap contains 418 indexable URLs across ten languages. New library and existing quiz/tool pages do not load AdSense ads.

## Maintenance

Run `node scripts/build-experience.cjs` to rebuild the additions. This is an additive, repeatable pass over existing content. Both course and hub-hero redesign scripts invoke it after their own transformations. Interface translations live in `scripts/_experience-copy.cjs`; the generated browser file is `js/experience-labels.js`.

Run `node scripts/gen-sitemap.cjs` after adding or removing pages. Frontend files are served directly; there is no build framework or new production package dependency.

## Verification

- `node scripts/audit-i18n.cjs --check`: all 16 multilingual invariants pass, including 1,170 search destinations and mirror parity.
- `node scripts/check-guide-redesign.cjs`: 390 existing pages checked in mobile Chromium, original lesson JSON hashes and image references preserved, and existing exercises/tools pass.
- `node scripts/check-experience.cjs`: 120 entrance layouts (four sections, ten languages, three widths), search/category/saved filters, persistence, language switching, quiz deep links, wrong/missing/correct answers, review/reset, no-JavaScript, print, and storage-denied behavior. It also audits five representative pages against axe WCAG A/AA rules. Reports and screenshots are under `docs/experience-qa/`.
- The final five-page axe audit reports zero violations for the selected WCAG A/AA rules. Rebuilding leaves all 400 redesigned page hashes unchanged. All 200 original answer mappings and choice texts are preserved; correct positions are distributed 51/55/48/46 rather than 200/0/0/0.
- `node scripts/check-renovation.cjs`: existing eight guides, 90 ad-free policy/tool pages, 12 mobile layouts, search, and study exercises pass. The ten new learning libraries also have no advertising loader.

For browser checks, install `playwright` and `@axe-core/playwright` in a temporary directory, point `KS_QA_MODULE_PATH` at its `node_modules/playwright` package, and run the existing `node dev.js` server on port 3000. The checks block external requests, so they do not verify live advertising delivery, external image availability, or speech service responses. Automated checks do not certify every translation or accessibility requirement.

## AdSense scope

The work improves navigation, useful learning interactions, readable content, and the separation of practice controls from advertising. It preserves the site's existing About, Contact, Privacy, Terms, and editorial policy links. These are practical improvements, not an approval guarantee or an assertion that every article and image has been independently reviewed. The live deployment, content accuracy and originality, image rights, advertising configuration, and any applicable Google consent requirements still need to satisfy Google's review.

Official references consulted:

- [Make sure your site's pages are ready for AdSense](https://support.google.com/adsense/answer/7299563)
- [Best practices for ad placement](https://support.google.com/adsense/answer/1282097)
- [Google Publisher Policies](https://support.google.com/adsense/answer/10502938)
- [Required privacy content](https://support.google.com/adsense/answer/1348695)
