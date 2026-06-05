# Japanese Translation Guide — Korean School Site

Reference for adding/fixing Japanese translations on any learn/ page.

---

## How the translation system works

All translations live in `js/lang-ja.js` inside the `JA` object (a plain dictionary).  
The function `_applyJa()` runs at page load when the user selects Japanese. It walks every **text node** in `document.body` and replaces ones that match a JA key.

```js
const txt = node.textContent.trim().replace(/\s+/g, ' ');
if (JA[txt]) node.textContent = JA[txt];
```

**The key is always the trimmed, whitespace-normalised content of a single text node.**

---

## The #1 rule: a key = one text node, not one element

```html
<h2><span class="section-num">3</span> Four Syllable Block Patterns <span>…</span></h2>
```

This produces **three** text nodes:

| Node | Raw content | After trim | Key needed |
|---|---|---|---|
| inside `.section-num` span | `3` | `3` | (number — skip) |
| between spans | ` Four Syllable Block Patterns ` | `Four Syllable Block Patterns` | ✅ add this |
| inside second span | `…` | `…` | (Korean — skip) |

**Never use the full visible text of the heading as the key.**

---

## `<strong>` tags split a paragraph into many text nodes

```html
<p>Every block has <strong>exactly one vowel</strong> (중성 / Jungseong)</p>
```

Produces three text nodes: `Every block has` / `exactly one vowel` / `(중성 / Jungseong)`.  
You must add **each fragment as a separate JA entry**:

```js
'Every block has': 'すべてのブロックには',
'exactly one vowel': '母音がちょうど1つあります',
// (중성 / Jungseong) has Korean text — leave untranslated
```

Same applies to `<span>`, `<a>`, `<em>`, and any other inline element.

---

## What to translate vs. what to leave alone

| Content | Action |
|---|---|
| English paragraph / heading text | ✅ Translate |
| Korean characters (한글) in any element | ✅ Leave as-is |
| Romanisation (ga, han, batchim, etc.) | ✅ Leave as-is in most contexts; **add カタカナ reading in vocabulary tables** (see below) |
| Pure numbers / symbols (`3`, `›`, `←`, `🔊`) | ✅ Leave as-is |
| Mixed Korean + English (`ㅎ in 한`) | Translate the English words around the Korean |
| Emoji-prefixed strings (`🔷 How Syllable Blocks…`) | Include the emoji in the key — it is part of the text node |

---

## Katakana pronunciation in Japanese mode (vocabulary tables)

Japanese-mode learners benefit from seeing the katakana reading of each romanisation. For **vocabulary table `.rom-cell` elements**, add a hidden `<span class="ja-kana">カタカナ</span>` after the romanisation text:

```html
<td class="rom-cell">Annyeonghaseyo<span class="ja-kana"> アンニョンハセヨ</span></td>
```

### CSS to add in the page `<style>` block

```css
.ja-kana  { display: none; font-size: 0.85em; color: var(--text-secondary); }
body.lang-ja .ja-kana  { display: inline; }
.kata     { display: none; font-size: 0.82em; color: var(--text-secondary); }
body.lang-ja .kata     { display: block; }
.ja-block { display: none; }
body.lang-ja .ja-block { display: block; }
body.lang-ja .no-ja   { display: none; }
```

| Class | Display type | Purpose |
|---|---|---|
| `.ja-kana` | `inline` | Katakana inside table cells (after romanisation text) |
| `.kata` | `block` | Katakana line inside flashcard `.rom` divs |
| `.ja-block` | `block` | Full Japanese replacement block (e.g. proverb explanations) |
| `.no-ja` | hidden in JP mode | Wraps English content that should disappear in Japanese mode |

- All four classes are **hidden by default** — English users never see `.ja-kana`, `.kata`, or `.ja-block`.
- `.no-ja` is visible by default and hidden only when `body.lang-ja` is active.
- A single leading space before カタカナ text gives visual separation from the romanisation.

### When to apply

| Context | Class to use |
|---|---|
| `.rom-cell` elements inside HTML tables | `.ja-kana` (inline span after text) |
| `.rom` divs inside `.flashcard` divs | `.kata` (block div after `.rom`) |
| `.eng-line` divs inside proverb/example blocks | `.no-ja` on the English div + `.ja-block` sibling with Japanese text |
| Table cells where English source/meaning must swap | `.no-ja` span wrapping English + `.ja-kana` span with Japanese |

### Romanisation column width

When adding katakana, the romanisation column needs more width to avoid wrapping. Recommended widths:

| Table type | Romanisation column width |
|---|---|
| 3-column number/date tables | remaining (no fixed %) |
| 4-column vocab tables (Korean/Rom/English/Audio) | 24–25% |
| 5-column vocab tables | 18–22% |

---

## Katakana in flashcard grids (`.kata` div)

Flashcard grids use `.flashcard` divs with a `.kr` / `.rom` / `.en` structure. Add a `<div class="kata">` **between `.rom` and `.en`** for every card.

```html
<!-- Before -->
<div class="flashcard">
  <button class="speak" onclick="speakKorean('밥')">🔊</button>
  <div class="kr">밥</div>
  <div class="rom">Bap</div>
  <div class="en">Rice / Meal</div>
</div>

<!-- After -->
<div class="flashcard">
  <button class="speak" onclick="speakKorean('밥')">🔊</button>
  <div class="kr">밥</div>
  <div class="rom">Bap</div>
  <div class="kata">バプ</div>
  <div class="en">Rice / Meal</div>
</div>
```

Cards without an audio button follow the same pattern (just no `<button>`):

```html
<div class="flashcard">
  <div class="kr">빨간색</div>
  <div class="rom">Ppalgansaek</div>
  <div class="kata">パルガンセク</div>
  <div class="en">Red</div>
</div>
```

Requires `.kata` CSS (see above). Do **not** use `.ja-kana` here — it is `display: inline` and will run into the `.en` text without a line break.

---

## Japanese replacement for proverb / example `eng-line` divs

Proverb and Korean-example blocks use a `.korean-example` structure:

```html
<div class="korean-example">
  <div class="kor-line">가는 말이 고와야 오는 말이 곱다</div>
  <div class="rom-line">Ganeun mari gowaya oneun mari gopda</div>
  <div class="eng-line">Literal: "Outgoing words must be beautiful…" → What goes around, comes around.</div>
</div>
```

In Japanese mode the English explanation should be replaced by a Japanese one. Pattern:

1. Add class `no-ja` to the existing `.eng-line` so it hides in Japanese mode.
2. Add a new sibling `.eng-line.ja-block` immediately after with the Japanese text.

```html
<div class="eng-line no-ja">Literal: "Outgoing words must be beautiful for incoming words to be beautiful" → What goes around, comes around.</div>
<div class="eng-line ja-block">直訳：「出る言葉が美しければ、返る言葉も美しい」→ 情けは人のためならず。</div>
```

- **`.no-ja`** hides the English line when `body.lang-ja` is active.
- **`.ja-block`** (`display: block` in JP mode) shows the Japanese line only in JP mode.
- Keep the original `.eng-line` class on both divs so they inherit the same spacing/colour styles.

---

## Japanese swap for "source / meaning" table columns

Some tables have a column combining an English source word and a Korean/English meaning. In Japanese mode both should appear in Japanese. Use a **span-swap** inside the `<td>`:

```html
<!-- Before -->
<td>
  <span style="color:var(--text-muted);font-style:italic">"Consent"</span><br>
  <span class="eng-cell">Electrical outlet / Socket</span>
</td>

<!-- After -->
<td>
  <span class="no-ja">
    <span style="color:var(--text-muted);font-style:italic">"Consent"</span><br>
    <span class="eng-cell">Electrical outlet / Socket</span>
  </span>
  <span class="ja-kana">
    <span style="color:var(--text-muted);font-style:italic">英語 "consent" より</span><br>
    <span>電気のコンセント・ソケット</span>
  </span>
</td>
```

- Wrap **all** existing English content in `<span class="no-ja">` so it disappears in JP mode.
- Add `<span class="ja-kana">` with the Japanese equivalents. This uses `.ja-kana` because those spans are `display: inline` and the `<br>` handles the line break.
- The Japanese source label pattern is: 英語 "X" より (from English "X").

---

## Step-by-step workflow for a new page

### 1. Read the HTML

Open the page and scan every English text node that a user will see.  
Group by element type:
- `<h1>`, `<h2>` — watch for `<span class="section-num">` that precede the text
- `<p>` — check if any `<strong>` or `<span>` children split the text
- `<th>`, `<td>` — often single words, usually safe full-node keys
- `<div class="tip-label">`, `.lesson-tag`, `.lesson-meta span` — single short strings
- `<div class="eng-line">` — the English gloss below Korean examples
- `<div class="example-header"><span>` — the heading of example boxes
- `<a class="lesson-nav-btn">` contains nested `<span>` — translate each span separately
- `input[placeholder]` — handled separately via `el.placeholder = JA[el.placeholder]`

### 2. Identify exact key strings

For every text node, the key is: `node.textContent.trim().replace(/\s+/g, ' ')`.

Quick mental model:
- Strip leading/trailing whitespace (including NBSP ` `)
- Collapse all internal runs of whitespace to a single space

### 3. Check for duplicates

Before adding, grep lang-ja.js for the key. Adding a duplicate is safe (JS last-write wins) but wastes lines.

```
Grep for key in js/lang-ja.js before adding
```

### 4. Add entries to `js/lang-ja.js`

Append a labelled block at the end of the JA object, just before the closing `};`:

```js
// ── PageName page ────────────────────────────────────────
'English text node': '日本語訳',
```

### 5. Verify syntax

```
node --check js/lang-ja.js
```

---

## Common fragment keys (already in JA — do not add again)

These short words appear inside `<strong>` tags on multiple pages and are already translated:

| Key | Japanese |
|---|---|
| `left` | 左 |
| `right` | 右 |
| `on top` | 上 |
| `below` | 下 |
| `above` | 上 |
| `must` | 必ず |
| `Optional` | 任意の |
| `bottom` | 底 |
| `Tip` | ポイント |
| `Did you know?` | ご存じでしたか？ |
| `Vowel Harmony` | 母音調和 |

---

## Table width adjustment

All tables should use `table-layout:fixed` so column widths are respected:

```html
<table class="vocab-table" style="width:100%;table-layout:fixed">
  <thead>
    <tr>
      <th style="width:12%">Korean</th>
      <th style="width:20%">Romanization</th>
      <th style="width:32%">Meaning</th>
      <th style="width:12%">Batchim</th>
      <th>Listen</th>   <!-- last column takes remaining width -->
    </tr>
  </thead>
```

**Column width guidelines:**
- Korean character columns: 10–15%
- Romanisation columns: 12–20%
- English meaning columns: 25–35%
- Listen/audio button columns: 15–25%
- Last column: leave without `width` — browser fills the rest

---

## Files reference

| File | Role |
|---|---|
| `js/lang-ja.js` | All JA translations + `LangManager` IIFE + `window.QUIZ_JA` |
| `js/app.js` | Core app logic; reads `LangManager` and `QUIZ_JA` as globals |
| `learn/*.html` | Must have `<script src="../js/lang-ja.js"></script>` before `app.js` |
| `index.html`, `quiz.html` | Must have `<script src="js/lang-ja.js"></script>` before `app.js` |

---

## Checklist for each new learn/ page

- [ ] Lesson tag (`🔷 Beginner · Lesson N`) translated
- [ ] Breadcrumb items translated (h1 text nodes)
- [ ] All `<span>` meta items (`⏱ X min read`, `📊 Level`, `🔖 Topic`) translated
- [ ] Lesson intro `<p>` translated
- [ ] All section `<h2>` text nodes (after section-num span) translated
- [ ] All body `<p>` translated (check for `<strong>` splits!)
- [ ] All `<div class="tip-label">` translated
- [ ] All `<div class="tip-text">` translated (check for `<strong>` splits!)
- [ ] All `<div class="example-header"><span>` translated
- [ ] All `<div class="eng-line">` translated
- [ ] All `<th>` translated
- [ ] Relevant `<td>` translated (meanings, roles, notes)
- [ ] Lesson-nav labels (`Previous`, `Next`, page title) translated
- [ ] `input[placeholder]` translated
- [ ] Tables have `table-layout:fixed` with explicit `th` widths
- [ ] All four JP-mode CSS classes added to page `<style>` block: `.ja-kana`, `.kata`, `.ja-block`, `.no-ja`
- [ ] Katakana `<span class="ja-kana">` spans added to all `.rom-cell` elements in vocab tables
- [ ] `<div class="kata">` added after every `.rom` div inside `.flashcard` grids
- [ ] `.eng-line` divs in proverb/example blocks split into `.eng-line.no-ja` (English) + `.eng-line.ja-block` (Japanese)
- [ ] Table cells with English source/meaning columns wrapped with `.no-ja` span + `.ja-kana` span swap
- [ ] `node --check js/lang-ja.js` passes
