# Guide-style redesign — 2 October 2026

The requested renovation applies to 390 pages: 180 learn, 150 culture, 50 travel, and 10 quiz pages. All ten live languages retain their content and existing photo references. The first-run baseline records 35 lesson/data JSON hashes and photo references per page in `guide-ui-baseline.json`.

The pages share the guide's paper background, forest-green palette, restrained header, readable main column, section TOC, and compact policy footer. Mobile TOCs can be expanded; no-JavaScript reading and answer panels remain available. Wide tables and the trip planner scroll inside their own containers. Culture and travel photos remain in their original sections.

Removed 120 bite-size player mounts/loaders and their stage/progress chrome. Full localized explanations, examples, audio controls and practice questions now appear together. Preserved the standalone syllable builder, handwriting and typing exercises. Removed 20 copied word-bank references from flashcard/browser pages; the vocabulary lesson is the single full reading list, while saving, search and flashcard tools remain available. Identical paragraphs are removed only within one page/language; translated prose and repeated Korean learning examples are retained.

The original 200 quiz questions are rendered in ten complete sets with answer checking, reset, missing-answer feedback and inspectable answers. Existing translated prompts/choices are retained; original English fallback prompts carry `lang="en"`. Vocabulary browsing now uses each page's existing localized meanings. Legacy `?cat=`/`?step=` links resolve to reading sections.

The new open-book logo is applied to 458 public pages, plus favicon, Apple icon and web manifest. Built-in ImageGen produced the symbol; final prompt, mode, original output and derivatives are recorded in `../assets/brand/README.md`. The header asset is 13.4 KB. Homepage descriptions and FAQ metadata in ten languages now describe full-page learning rather than the removed short-step player.

## Verification and maintenance

- `node scripts/audit-i18n.cjs --check`: 16/16 invariants pass.
- `node scripts/check-guide-redesign.cjs`: source-data hashes, photo references, page/TOC structure, browser functionality, mobile layouts and no-JavaScript content. Screenshots and the final machine-readable result are in `guide-ui-qa/`.
- Final navigation refinement: all 390 static pages have distinct TOC targets; 40 travel reading pages were rechecked in a mobile browser after wrapping their older directory menus. Both navigation panels start collapsed on mobile; desktop and no-JavaScript readers can open the full index.
- `node scripts/check-renovation.cjs`: existing eight guides, storage fallback, search, static lessons and 12 entrance/guide mobile layouts pass.
- `node scripts/audit-learn-content.cjs --summary`: 180 pages inspected. The 20 noindex tools have fewer than 300 static words after removing copied banks; their functionality is tested separately. The other 160 learn pages exceed that audit threshold. Word count alone does not establish quality or approval.
- `node scripts/gen-sitemap.cjs`: 408 discoverable URLs; noindex tools remain excluded.

After rebuilding guides, lesson HTML or translated mirrors, run `node scripts/redesign-course-pages.cjs` last, then the preservation and browser checks. It rebuilds localized full lessons from existing JSON and is safe to rerun. The migration's `thisRun` counts report removals during that invocation; structural totals remain in the report.

Changes are local workspace files. No deployment or AdSense review submission was performed during this redesign.

## Emoji and navigation follow-up

Removed decorative emojis from sidebar, navigation and content text across all 458 public pages. `scripts/_editorial-cleanup.cjs` handles generated HTML and `js/editorial-cleanup.js` handles translated and dynamically added content, including word browsing, flashcards, search and planner events. Source translations and lesson JSON remain unchanged. Pure emoji controls use SVG icons with accessible names; audio play/stop, language, theme and mobile-menu controls retain their behavior. Empty decorative icon containers are hidden, and the planner's obsolete emoji toggle is removed.

The section index now nests subheadings under their parent sections rather than counting them as additional primary sections. City-guide navigation therefore numbers Seoul 1, Incheon 2, Busan 3, and so on, matching the headings in the article. Real numbers in lessons and durations remain intact, including digits formerly decorated as keycap emojis.

Verified all 390 course pages in a mobile browser for emoji-free content, overflow and script errors; checked section numbering, distinct targets, image references and all 35 source-data hashes. Multilingual invariants remain 16/16. The 200-question quiz and the existing study tools pass; no practice options became blank.

## Culture and travel hub heroes

Redesigned both index-page heroes across all ten languages with solid sage and white surfaces, dark editorial headlines, green calls to action, and a compact panel linking to four existing guides. The localized headline and description, author/date credit, guide destinations and existing image references are preserved. The previous decorative stat strip is replaced by useful navigation. The hero has no gradient backgrounds or decorative gradient pseudo-elements.

`css/hubs.css` provides the responsive design. `scripts/_hub-hero.cjs` reuses each page's existing translated content; it is integrated into the main course redesign. For a targeted rebuild run `node scripts/redesign-hub-heroes.cjs`. Rebuilding the heroes is idempotent. Verified 20 pages at four widths (80 browser cases), with no gradients, overflow, emojis, broken guide links or browser errors; results and desktop/mobile screenshots are in `guide-ui-qa/`.
