# Learn Pages — Major Update Guide

## Context

The current learn pages are long-form, single-scroll lessons (`learn/hangul.html` is 652 lines delivered all at once). The goal is to redesign them as bite-sized micro-interaction pages that maximize pageviews per session, provide instant positive reinforcement, pre-load audio to eliminate latency, and make the Hangul tool genuinely compelling enough to be a viral entry point.

---

## 1. Bite-Sized Paged Lessons

### Goal
Split each lesson into micro-interactions (~30–90 seconds each). Every "Next" advances to a new panel and updates the URL, giving analytics a fresh event and ad networks a throttled refresh opportunity.

### Current State
- All lesson content lives in one HTML file per topic
- "Next" buttons are `<a href>` links to the *next lesson file* — no intra-lesson pagination
- No `?step=N` routing exists

### Approach

**Step-based routing via query param**

Each lesson file becomes a step-runner shell. On each "Next" click, `js/step-runner.js`:
1. Increments the step counter
2. Updates the URL via `history.pushState` → triggers a new pageview in Google Analytics
3. Hides the current panel and renders the next one from JSON data

**Lesson data format**

Create `/learn/data/hangul.json`, `/learn/data/vocabulary.json`, etc.:

```json
{
  "lesson": "hangul",
  "steps": [
    {
      "id": 1,
      "type": "intro",
      "title": "What is Hangul?",
      "body": "...",
      "duration_seconds": 45
    },
    {
      "id": 2,
      "type": "card_reveal",
      "char": "ㄱ",
      "romanization": "g/k",
      "audio": "ㄱ",
      "example_word": "가다",
      "example_meaning": "to go"
    },
    {
      "id": 3,
      "type": "match_quiz",
      "prompt": "Which character makes the 'n' sound?",
      "choices": ["ㄱ", "ㄴ", "ㄷ", "ㄹ"],
      "correct": "ㄴ"
    }
  ]
}
```

**Step types to implement**

| Type | Description |
|---|---|
| `intro` | Text + illustration panel, read-only |
| `card_reveal` | Single character card showing all info at once (char, jamo · romanization, example) — no flip |
| `listen_repeat` | Audio plays, user taps "I said it" to advance |
| `match_quiz` | Multiple choice — 4 options, one correct |
| `fill_blank` | Tap the missing character from a word |
| `lesson_complete` | Celebration screen with XP summary |

**Browser back-button (popstate)**

Without a handler, the URL changes on Back but the rendered step doesn't. Add to `step-runner.js`:

```javascript
window.addEventListener('popstate', () => {
  const stepParam = new URLSearchParams(location.search).get('step');
  const targetIndex = stepParam ? parseInt(stepParam, 10) - 1 : 0;
  StepRunner.goToStep(targetIndex, { pushState: false });
});
```

`goToStep(index, { pushState })` must accept the flag to skip `pushState` when navigating via history, preventing duplicate history entries.

**Key files to create/modify**

| File | Action |
|---|---|
| `/learn/hangul.html` | Refactor to step-runner shell (keep sidebar, swap content div) |
| `/js/step-runner.js` | **New** — pagination logic, JSON fetch, URL sync, `popstate` |
| `/learn/data/hangul.json` | **New** — Hangul step data |
| `/learn/data/vocabulary.json` | **New** — Vocabulary step data |
| All other `/learn/*.html` | Apply same pattern incrementally |

**Ad inventory hook — AdSense-compliant**

```javascript
// After history.pushState — always safe for analytics
if (window.gtag) gtag('event', 'page_view', { page_path: location.pathname + location.search });

// Ad refresh — NEVER on every step. Google flags "Unnatural Impression Generation"
// if the same slot refreshes faster than ~45 seconds.
// Use a step-count + time-gate hybrid:
const AD_REFRESH_STEPS = 3;
const AD_REFRESH_SECONDS = 45;
if (
  StepRunner.stepsSinceLastAdRefresh >= AD_REFRESH_STEPS &&
  Date.now() - StepRunner.lastAdRefreshTime >= AD_REFRESH_SECONDS * 1000
) {
  if (window.googletag) googletag.pubads().refresh([StepRunner.stickyAdSlot]);
  StepRunner.stepsSinceLastAdRefresh = 0;
  StepRunner.lastAdRefreshTime = Date.now();
} else {
  StepRunner.stepsSinceLastAdRefresh++;
}
```

**Ad placement rules**

| Placement | Unit | Rule |
|---|---|---|
| During micro-steps | Bottom-sticky anchor (mobile) / sidebar (desktop) | Never in-content — single-character panels are "thin content." |
| `lesson_complete` step | 300×250 medium rectangle or interstitial | Prime placement — user cognitive load drops here; highest CTR; fully compliant. |
| Never | Adjacent to quiz buttons | Maintain ≥40px of unclickable whitespace. Accidental clicks spike CTR → Two-Click Penalty or account suspension. |

**Skeleton ad slot (CLS prevention)**

Ad containers need a fixed height so layout never shifts when the ad loads. A pulsing skeleton signals loading and prevents the blank-space confusion:

```css
.ad-slot {
  min-height: 90px;
  background: linear-gradient(90deg, var(--surface-2) 25%, var(--surface-3) 50%, var(--surface-2) 75%);
  background-size: 200% 100%;
  animation: skeleton-pulse 1.4s ease infinite;
  border-radius: var(--radius-sm);
}
@keyframes skeleton-pulse {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.ad-slot.loaded { animation: none; background: none; }
```

Add `.loaded` via the ad network's `onload` callback or an `IntersectionObserver`.

---

## 2. Immediate Dopamine (Animations + Sound)

### Goal
Correct answer → ding sound + confetti burst + card pop animation. Wrong answer → shake. These fire within 100ms of the user's tap.

### Current State
- Correct quiz answers turn green for 1.2s — no sound, no animation
- No celebration on lesson complete beyond button text change

### Approach

**Ding (Web Audio API — zero asset files)**

```javascript
function playDing() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = 880; // A5 — bright, pleasant
  osc.type = 'sine';
  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.4);
}
```

Add to `js/app.js` (or `js/step-runner.js`).

**Confetti micro-burst**

Spawn 20–30 `.confetti-piece` divs at randomized X positions anchored near the correct answer element. Use the existing palette: `#E8003D`, `#0055CC`, `#FFD700`. Remove them after animation ends via `animationend` event.

```css
@keyframes confetti-fall {
  0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(80px) rotate(360deg); opacity: 0; }
}
.confetti-piece {
  position: fixed;
  width: 8px; height: 8px;
  border-radius: 2px;
  pointer-events: none;
  animation: confetti-fall 0.7s ease-out forwards;
}
```

**Correct-answer card pop**

```css
@keyframes correct-pop {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.12); box-shadow: 0 0 24px #E8003D88; }
  100% { transform: scale(1); }
}
.correct-pop { animation: correct-pop 0.35s ease; }
```

**Wrong-answer shake**

```css
@keyframes wrong-shake {
  0%, 100% { transform: translateX(0); }
  20%, 60%  { transform: translateX(-6px); }
  40%, 80%  { transform: translateX(6px); }
}
.wrong-shake { animation: wrong-shake 0.35s ease; }
```

**Integration point**

In the quiz answer handler (currently `HangulQuiz` module in `js/app.js`):

```javascript
if (isCorrect) {
  playDing();
  spawnConfetti(answerEl);
  answerEl.classList.add('correct-pop');
} else {
  answerEl.classList.add('wrong-shake');
}
```

---

## 3. Audio Pre-loading

### Goal
Zero-latency audio on every tap — even on slow 3G connections. Pre-fetch upcoming step audio while the user interacts with the current step.

### Current State
- `speakKorean(text)` in `js/app.js` calls `/api/tts.js` on demand
- The TTS proxy caches 24 hours server-side but the browser still makes an HTTP round-trip
- On slow connections: 1–3 second delay after tap before audio plays

### Approach

**`AudioCache` module (add to `js/app.js`)**

```javascript
const AudioCache = {
  _cache: {},
  async prefetch(textArray) {
    for (const text of textArray) {
      if (this._cache[text]) continue;
      fetch(`/api/tts?text=${encodeURIComponent(text)}&speed=1`)
        .then(r => r.arrayBuffer())
        .then(buf => { this._cache[text] = buf; });
    }
  },
  async play(text) {
    const buf = this._cache[text];
    if (!buf) { speakKorean(text); return; } // on-demand fallback
    const ctx = new AudioContext();
    const decoded = await ctx.decodeAudioData(buf.slice(0)); // .slice() = copy; buffer is consumed once
    const src = ctx.createBufferSource();
    src.buffer = decoded;
    src.connect(ctx.destination);
    src.start();
  }
};
```

**N+1 prefetch in step-runner**

Call this at the end of every `renderStep(N)`:

```javascript
function prefetchNextStep(index) {
  const lookahead = lessonData.steps.slice(index + 1, index + 4);
  AudioCache.prefetch(lookahead.map(s => s.audio).filter(Boolean));
}
prefetchNextStep(currentIndex);
```

The download runs while the user reads — by the time they tap "Next" and the character appears, the audio buffer is already in memory.

**Replace existing audio calls**

Swap all `onclick="speakKorean('...')"` in lesson HTML to `onclick="AudioCache.play('...')"` — same API surface, cache-first behavior.

---

## 4. Hangul "Learn in 1 Hour" Tool

### Goal
Transform the static `learn/hangul.html` into a guided, stage-based trainer compelling enough to be shared as a standalone tool and rank for "learn Korean alphabet."

### Current State
- 652 lines of static content: character tables, sound buttons, a 5-question quiz at the bottom
- No guided flow, no progress sense, no time estimate

### Redesign: 6 Stages (~68 steps total)

| Stage | Name | Content | Steps |
|---|---|---|---|
| 1 | Vowels (기본 모음) | 10 basic vowels | 10 card-reveals + 5 quizzes |
| 2 | Basic Consonants (기본 자음) | 14 consonants | 14 card-reveals + 7 quizzes |
| 3 | Your First Syllable | Syllable block builder: ㅂ + ㅏ = 바 | 6 build exercises |
| 4 | Special Consonants | 5 tense + 5 aspirated | 10 card-reveals + 5 quizzes |
| 5 | Compound Vowels | 11 compound vowels | 11 card-reveals + 5 quizzes |
| 6 | Read Korean Words | Decode 10 real words end-to-end | 10 read-aloud + check |

**Stage 3: Syllable block builder**

Interactive tap interface — no external library needed:
- Display a row of consonants and a row of vowels
- User taps one consonant + one vowel → they animate together into a block
- Audio plays the resulting syllable
- CSS grid or `canvas` layout

**Progress bar with time estimate**

```html
<div class="hangul-progress">
  <div class="progress-bar" style="width: var(--pct)"></div>
  <span>Stage 2 of 6 · ~38 min remaining</span>
</div>
```

`timeRemaining = (totalSteps - completedSteps) * 60` seconds (60s/step default).

**XP + streak badge**

| Event | XP |
|---|---|
| Correct answer | +10 |
| Stage complete | +50 |
| 3-in-a-row streak | 1.5× multiplier |
| 5-in-a-row streak | 2× multiplier |

Fixed top-right badge: `⚡ 320 XP · 🔥 5 streak`

**Key files to create/modify**

| File | Action |
|---|---|
| `/learn/hangul.html` | Full redesign as step-runner shell with stage nav |
| `/learn/data/hangul.json` | **New** — all 68 steps |
| `/js/syllable-builder.js` | **New** — Stage 3 interactive syllable UI |
| `/css/style.css` | Add `.hangul-progress`, `.xp-badge`, `.syllable-builder` |

---

## 5. UI/UX Refinements

### lesson-header spacing

Tightened the visual hierarchy in `.lesson-breadcrumb → .lesson-tag → .lesson-title → .lesson-meta → .lesson-intro`:

| Selector | Before | After |
|---|---|---|
| `.lesson-breadcrumb` margin-bottom | 28px | 10px |
| `.lesson-tag` margin-bottom | 14px | 10px |
| `.lesson-title` margin-bottom | 10px | 12px |
| `.lesson-meta` margin-bottom | 0 | 18px |
| `.lesson-intro` padding | 20px 24px | 16px 20px |
| `.lesson-intro` margin-bottom | 36px | 28px |
| `.lesson-header` margin-bottom | 36px | 28px |

### lesson-intro as bullet list

Replace the `<p class="lesson-intro">` paragraph with a `<ul class="lesson-intro-bullets">`. Four items:
- Created in 1443 by King Sejong the Great
- Phonetic alphabet — each symbol = one sound
- 6 stages to cover every character
- Most learners finish in under 90 minutes

Display as a **2×2 CSS grid** on desktop, single column on mobile (≤600px):

```css
.lesson-intro-bullets {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 24px;
}
.lesson-intro-bullets li::before { content: '✓'; color: var(--primary); font-weight: 700; }
@media (max-width: 600px) {
  .lesson-intro-bullets { grid-template-columns: 1fr; }
}
```

### stage-nav — minimal step indicator

Replace the box-tab design with numbered circles connected by a thin line. Key rules:

```css
.stage-nav { display: flex; align-items: flex-start; overflow-x: auto; scrollbar-width: none; }
.stage-tab { flex: 1; display: flex; flex-direction: column; align-items: center; border: none; background: none; }
/* connector line */
.stage-tab:not(:last-child)::after {
  content: ''; position: absolute; top: 10px; left: 50%; width: 100%; height: 1px;
  background: var(--border); z-index: 0;
}
.stage-num { width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--border); z-index: 1; }
.stage-label { font-size: 0.62rem; color: transparent; } /* hidden unless active */
.stage-label-kr { display: none; }
.stage-tab.active .stage-num { background: var(--primary); border-color: var(--primary); color: #fff; }
.stage-tab.active .stage-label { color: var(--primary-light); }
```

### sr-card — flat single-face design

Remove `.sr-card-front` / `.sr-card-back` wrappers. Render all content in one layer:

```html
<div class="sr-card">
  <div class="sr-char">아</div>
  <div class="sr-sub-row">
    <span class="sr-jamo">ㅏ</span>
    <span class="sr-divider">·</span>
    <span class="sr-rom">a</span>
  </div>
  <div class="sr-example">아기 · baby</div>  <!-- optional -->
</div>
```

Card is `width: 100%; max-width: 360px; height: auto; padding: 36px 24px 28px` — no fixed square.  
Jamo and romanization are inline (`sr-sub-row`), separated by a muted `·` divider.  
Hint box appears above the audio button; "Tap to flip" hint removed entirely.

### Audio TTS fallback

Replace the Google TTS direct URL fallback in `_googleTTS` with `_speakFallback` (Web Speech API). The Google `translate.google.com/translate_tts` endpoint is CORS-blocked in browsers, causing silent failure. `_speakFallback` uses `SpeechSynthesisUtterance` with `lang: 'ko-KR'` and works without a server:

```javascript
audio.addEventListener('error', () => {
  if (_currentAudio !== audio) return;
  _currentAudio = null;
  _speakFallback(text, speed < 1 ? 0.7 : 0.9);
}, { once: true });
```

On production where `/api/tts` proxy is available, the proxy is used first and this fallback is never reached.

---

## Design Rule: Reading Materials Must Be Bite-Sized Paged Lessons

All reading content (explanations, theory sections, tips, summaries) in every `/learn/*.html` lesson **must be implemented as `reading_card` steps inside the step-runner JSON**, not as static HTML on the page.

**Do not:**
- Add static `<section>` or `<div>` blocks above or below `#step-shell`
- Embed reading text directly in the HTML file

**Do:**
- Add a `reading_card` step to the lesson's `/learn/data/*.json` file for each reading block
- Use the `body`, `tip`, `rules`, and `patterns` fields on `reading_card` to structure content
- Keep all interactive steps (card_reveal, match_quiz, syllable_builder, listen_repeat) interleaved with reading_card steps in the JSON, in logical teaching order

**Why:** Static sections break the paged flow — users see all reading at once before any interaction. Paged reading_card steps keep the 30–90 second micro-interaction cadence consistent and let the step-runner drive progress, XP, and URL tracking uniformly across all content types.

This rule applies to every lesson page, including any new lessons added in the future.

---

## Japanese Version (日本語対応)

The site supports a Japanese UI via `js/lang-ja.js` (LangManager). When the user selects 日本語, a `JA` dictionary replaces English text nodes with Japanese translations.

### Current status

**Completed:**
- Static page content (index, flashcards, vocabulary, proverbs, about) — translated via one-shot TreeWalker on `DOMContentLoaded`
- All three Bite-Sized Paged Lessons (`hangul.html`, `pronunciation.html`, `syllable-blocks.html`) — step-runner dynamic content now translated via `MutationObserver` added to `_applyJa()` in June 2026

**How the step-runner fix works:**
`LangManager._applyJa()` now registers a `MutationObserver` on `document.body` after the initial TreeWalker pass. When `StepRunner.renderStep()` injects new HTML into `#step-content`, the observer fires and runs `_translateNode()` on every added element. This catches all step types: reading cards, card reveals, quizzes, syllable builder, listen-repeat, and lesson complete screens.

**Pending (not yet translated):**
- Any future `/learn/*.html` pages added as step-runner lessons — add new JA dict entries to the `// Bite-Sized Paged Lessons — step-runner dynamic content` section in `lang-ja.js` before the closing `};`

**Completed in June 2026:**
- `learn/vocabulary.html` — converted to step-runner shell; full JA dict entries added to `lang-ja.js` (lesson-meta, lesson-intro-bullets, all 6 stage names, all reading card titles/bodies/tips/rules, all listen_repeat meanings, all match_quiz prompts and English choices, lesson_complete screen)

### Adding translations for new lesson content

All new step-runner string entries go in the `// ── Bite-Sized Paged Lessons` block near the bottom of `js/lang-ja.js`, inside the `JA` object. The MutationObserver will pick them up automatically — no changes to `step-runner.js` needed.

---

## Verification Checklist

- [ ] **Pageview** — DevTools Network tab: click "Next" 5× times, confirm `pushState` fires each time and gtag `page_view` event appears
- [ ] **Ad throttle** — Confirm ad refresh does NOT fire on steps 1 and 2; fires on step 3 (first time ≥3 steps AND ≥45s elapsed)
- [ ] **Back button** — Navigate to step 4, press browser Back, confirm step 3 renders correctly without a broken blank screen
- [ ] **Ding + confetti** — Answer correctly; audio plays within 100ms, confetti appears and self-removes within 1s
- [ ] **Wrong shake** — Answer incorrectly; card shakes, no ding, no confetti
- [ ] **Audio pre-load** — DevTools throttle to Slow 3G; advance to step N+1 and tap the character — audio plays instantly (already buffered)
- [ ] **Hangul Stage 1** — Complete all 15 steps; XP badge increments, progress bar fills to Stage 1 complete, Stage 2 unlocks
- [ ] **Skeleton ad slot** — Resize to 375px; confirm ad placeholder shows pulse animation before ad loads, then switches to static when loaded
- [ ] **Mobile tap targets** — All interactive elements ≥44px, confetti does not overflow viewport width
