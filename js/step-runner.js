/* ═══════════════════════════════════════════════════════
   StepRunner — Micro-interaction lesson engine
   Handles JSON fetch, step rendering, URL sync,
   XP tracking, ad throttling, and analytics.
═══════════════════════════════════════════════════════ */

'use strict';

const StepRunner = (() => {
  /* ── State ─────────────────────────────────────────── */
  let lessonData = null;
  let currentIndex = 0;
  let xp = 0;
  let streak = 0;
  let stepsSinceLastAdRefresh = 0;
  let lastAdRefreshTime = 0;
  let stickyAdSlot = null;
  let stageStepMap = {};

  const AD_REFRESH_STEPS = 3;
  const AD_REFRESH_SECONDS = 45;
  const XP_CORRECT = 10;
  const XP_STAGE = 50;
  const XP_STREAK_3 = 1.5;
  const XP_STREAK_5 = 2;

  /* ── Bootstrap ─────────────────────────────────────── */
  async function init(dataUrl) {
    try {
      const res = await fetch(dataUrl);
      lessonData = await res.json();
    } catch (e) {
      console.error('StepRunner: failed to load lesson data', e);
      return;
    }

    stageStepMap = loadStageMap();
    currentIndex = 0;
    buildShell();
    restoreState();

    window.addEventListener('popstate', () => {
      const stepParam = new URLSearchParams(location.search).get('step');
      const idx = stepParam ? Math.max(0, parseInt(stepParam, 10) - 1) : 0;
      goToStep(idx, { pushState: false });
    });

    lastAdRefreshTime = Date.now();
    renderStep(currentIndex);
  }

  function restoreState() {
    const stepParam = new URLSearchParams(location.search).get('step');
    if (stepParam) {
      const idx = Math.max(0, parseInt(stepParam, 10) - 1);
      currentIndex = Math.min(idx, lessonData.steps.length - 1);
    }
    const saved = loadProgress();
    xp = saved.xp || 0;
    streak = 0;
    updateXPBadge();
  }

  /* ── Shell Construction ────────────────────────────── */
  function buildShell() {
    const wrap = document.getElementById('step-shell');
    if (!wrap) return;
    const isJa = window.LangManager && window.LangManager.getLang() === 'ja';

    wrap.innerHTML = `
      <div class="hangul-progress" id="hangul-progress">
        <div class="progress-bar-track">
          <div class="progress-bar-fill" id="progress-bar-fill"></div>
        </div>
        <div class="progress-meta" id="progress-meta"></div>
      </div>

      <div class="stage-nav" id="stage-nav" role="tablist" aria-label="Lesson stages"></div>

      <div class="step-content" id="step-content" aria-live="polite"></div>

      <div class="step-nav" id="step-nav">
        <button class="step-nav-btn" id="btn-prev" aria-label="${isJa ? '前のステップ' : 'Previous step'}">← ${isJa ? '前へ' : 'Prev'}</button>
        <div class="step-counter" id="step-counter"></div>
        <button class="step-nav-btn step-nav-next" id="btn-next" aria-label="${isJa ? '次のステップ' : 'Next step'}">${isJa ? '次へ' : 'Next'} →</button>
      </div>

      <div class="ad-slot" id="ad-slot-lesson" aria-hidden="true"></div>
    `;

    buildStageNav();
    document.getElementById('btn-prev').addEventListener('click', prevStep);
    document.getElementById('btn-next').addEventListener('click', nextStep);
  }

  function buildStageNav() {
    const nav = document.getElementById('stage-nav');
    if (!nav || !lessonData) return;
    nav.innerHTML = lessonData.stages.map(s => `
      <button class="stage-tab" data-stage="${s.id}" role="tab"
        aria-label="Stage ${s.id}: ${s.name}">
        <span class="stage-num">${s.id}</span>
        <span class="stage-label">${s.name}</span>
        <span class="stage-label-kr">${s.name_kr}</span>
      </button>
    `).join('');
    nav.querySelectorAll('.stage-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const stageId = parseInt(btn.dataset.stage, 10);
        const currentStage = lessonData.steps[currentIndex]?.stage;
        if (stageId === currentStage) return;
        if (currentStage !== undefined) stageStepMap[currentStage] = currentIndex;
        saveStageMap();
        const stage = lessonData.stages.find(s => s.id === stageId);
        if (!stage) return;
        const savedStep = stageStepMap[stageId];
        goToStep(savedStep !== undefined ? savedStep : stage.first_step - 1);
      });
    });
  }

  /* ── Navigation ────────────────────────────────────── */
  function nextStep() {
    if (currentIndex < lessonData.steps.length - 1) {
      goToStep(currentIndex + 1);
    }
  }

  function prevStep() {
    if (currentIndex > 0) {
      goToStep(currentIndex - 1, { pushState: true });
    }
  }

  function goToStep(index, { pushState = true } = {}) {
    currentIndex = Math.max(0, Math.min(index, lessonData.steps.length - 1));

    if (pushState) {
      const url = new URL(location.href);
      url.searchParams.set('step', currentIndex + 1);
      history.pushState({ step: currentIndex + 1 }, '', url);

      if (window.gtag) {
        gtag('event', 'page_view', { page_path: location.pathname + location.search });
      }
      handleAdRefresh();
    }

    renderStep(currentIndex);
    prefetchNextStep(currentIndex);
  }

  /* ── Ad Refresh (AdSense-compliant) ─────────────────── */
  function handleAdRefresh() {
    const elapsed = Date.now() - lastAdRefreshTime;
    stepsSinceLastAdRefresh++;

    if (
      stepsSinceLastAdRefresh >= AD_REFRESH_STEPS &&
      elapsed >= AD_REFRESH_SECONDS * 1000
    ) {
      if (window.googletag && stickyAdSlot) {
        googletag.pubads().refresh([stickyAdSlot]);
      }
      stepsSinceLastAdRefresh = 0;
      lastAdRefreshTime = Date.now();
      const adEl = document.getElementById('ad-slot-lesson');
      if (adEl) adEl.classList.remove('loaded');
    }
  }

  /* ── Audio Prefetch ─────────────────────────────────── */
  function prefetchNextStep(index) {
    if (!lessonData) return;
    const lookahead = lessonData.steps.slice(index + 1, index + 4);
    const texts = lookahead.map(s => s.audio).filter(Boolean);
    if (window.AudioCache) AudioCache.prefetch(texts);
  }

  /* ── Rendering ─────────────────────────────────────── */
  function renderStep(index) {
    const step = lessonData.steps[index];
    const content = document.getElementById('step-content');
    if (!content || !step) return;

    content.className = 'step-content step-enter';

    const renderers = {
      reading_card: renderReadingCard,
      card_reveal: renderCardReveal,
      match_quiz: renderMatchQuiz,
      syllable_builder: renderSyllableBuilder,
      listen_repeat: renderListenRepeat,
      lesson_complete: renderLessonComplete,
    };

    const renderer = renderers[step.type];
    if (renderer) {
      content.innerHTML = renderer(step);
    } else {
      content.innerHTML = `<p>${step.type} step</p>`;
    }

    requestAnimationFrame(() => content.classList.remove('step-enter'));

    if (step.stage !== undefined) {
      stageStepMap[step.stage] = index;
      saveStageMap();
    }

    updateProgress(index);
    updateStageNav(step.stage);
    updateNavButtons(index);
    updateCounter(index);
    ScrollAnimator?.observe && content.querySelectorAll('.animate-on-scroll').forEach(el => ScrollAnimator.observe(el));
  }

  /* reading_card */
  function renderReadingCard(step) {
    const isJa = window.LangManager && window.LangManager.getLang() === 'ja';

    const patternsHtml = step.patterns ? `
      <div class="sr-pattern-grid">
        ${step.patterns.map((p, i) => `
          <div class="sr-pattern-card">
            <div class="sr-pattern-name">${esc(p.name)} Pattern</div>
            <div class="sr-pattern-char">${esc(p.char)}</div>
            <div class="sr-pattern-jamo">${esc(p.jamo)}</div>
            <div class="sr-pattern-label">${esc(isJa && step.patterns_label_ja && step.patterns_label_ja[i] ? step.patterns_label_ja[i] : p.label)}</div>
          </div>`).join('')}
      </div>` : '';

    const activeRules = isJa && step.rules_ja ? step.rules_ja : step.rules;
    const rulesHtml = activeRules ? `
      <ul class="sr-reading-rules">
        ${activeRules.map((r, i) => `<li><span class="sr-rule-num">${i + 1}</span> ${esc(r)}</li>`).join('')}
      </ul>` : '';
    const tip = step.tip;
    const tipHtml = tip ? `
      <div class="tip-box" style="margin-top:20px">
        <span class="tip-icon">${esc(tip.icon || '💡')}</span>
        <div class="tip-content">
          <div class="tip-label">${esc(isJa && step.tip_ja ? step.tip_ja.label : tip.label)}</div>
          <div class="tip-text">${esc(isJa && step.tip_ja ? step.tip_ja.text : tip.text)}</div>
        </div>
      </div>` : '';

    return `
      <div class="sr-reading-card">
        <h2 class="sr-reading-title">${esc(step.title)} <span class="sr-reading-title-kr">${esc(step.title_kr || '')}</span></h2>
        <p class="sr-reading-body">${esc(window.LangManager && window.LangManager.getLang() === 'ja' && step.body_ja ? step.body_ja : step.body)}</p>
        ${patternsHtml}
        ${rulesHtml}
        ${tipHtml}
      </div>`;
  }

  /* card_reveal */
  function renderCardReveal(step) {
    const audioFn = window.AudioCache
      ? `AudioCache.play('${esc(step.audio)}')`
      : `speakKorean('${esc(step.audio)}')`;
    return `
      <div class="sr-card-reveal">
        <div class="sr-card" id="flip-card" role="button" tabindex="0"
          aria-label="Hear ${esc(step.char)}" onclick="${audioFn}">
          <div class="sr-char">${esc(step.char)}</div>
          <div class="sr-sub-row">
            <span class="sr-jamo">${esc(step.jamo || step.char)}</span>
            <span class="sr-divider">·</span>
            <span class="sr-rom">${esc(step.romanization)}</span>
          </div>
          ${step.katakana ? `<div class="kata">${esc(step.katakana)}</div>` : ''}
          ${step.example_word ? `<div class="sr-example">${esc(step.example_word)} · ${esc(window.LangManager && window.LangManager.getLang() === 'ja' && step.example_meaning_ja ? step.example_meaning_ja : step.example_meaning)}</div>` : ''}
        </div>
        ${step.hint ? `<div class="sr-hint">💡 ${esc(window.LangManager && window.LangManager.getLang() === 'ja' && step.hint_ja ? step.hint_ja : step.hint)}</div>` : ''}
        <button class="btn btn-primary sr-audio-btn" onclick="${audioFn}">
          🔊 ${window.LangManager && window.LangManager.getLang() === 'ja' ? '聴く' : 'Hear it'}
        </button>
      </div>`;
  }

  /* match_quiz */
  function renderMatchQuiz(step) {
    const isJa = window.LangManager && window.LangManager.getLang() === 'ja';
    const indices = step.choices.map((_, i) => i).sort(() => Math.random() - 0.5);
    const opts = indices.map(i => {
      const c = step.choices[i];
      const display = isJa && step.choices_ja && step.choices_ja[i] ? step.choices_ja[i] : c;
      return `
      <button class="quiz-option sr-quiz-opt" data-value="${esc(c)}"
        onclick="StepRunner.handleQuizAnswer(this)"
        aria-label="${esc(display)}">
        ${esc(display)}
      </button>`;
    }).join('');
    return `
      <div class="sr-quiz" data-correct="${esc(step.correct)}">
        <p class="sr-quiz-prompt">${esc(isJa && step.prompt_ja ? step.prompt_ja : step.prompt)}</p>
        <div class="sr-quiz-opts">${opts}</div>
        <div class="sr-quiz-feedback" id="sr-quiz-feedback" aria-live="polite"></div>
      </div>`;
  }

  /* syllable_builder */
  function renderSyllableBuilder(step) {
    const isJa = window.LangManager && window.LangManager.getLang() === 'ja';
    return `
      <div class="sr-syllable-builder" data-consonant="${esc(step.consonant)}"
        data-vowel="${esc(step.vowel)}" data-result="${esc(step.result)}"
        data-audio="${esc(step.audio)}">
        <p class="sr-quiz-prompt">${isJa ? 'これらのピースを音節ブロックに組み合わせてください：' : 'Combine these pieces into a syllable block:'}</p>
        <div class="syl-pieces">
          <div class="syl-piece syl-consonant" data-type="consonant">${esc(step.consonant)}</div>
          <div class="syl-plus">+</div>
          <div class="syl-piece syl-vowel" data-type="vowel">${esc(step.vowel)}</div>
          <div class="syl-eq">=</div>
          <div class="syl-result" id="syl-result">?</div>
        </div>
        <button class="btn btn-primary sr-reveal-btn" id="syl-reveal-btn"
          onclick="StepRunner.revealSyllable(this)">
          ${isJa ? '音節を表示' : 'Reveal Syllable'}
        </button>
        <div class="sr-hint" id="syl-meaning" style="display:none">${esc(isJa && step.meaning_ja ? step.meaning_ja : step.meaning)}</div>
      </div>`;
  }

  /* listen_repeat */
  function renderListenRepeat(step) {
    const isJa = window.LangManager && window.LangManager.getLang() === 'ja';
    const syllableHtml = step.syllables.map(s =>
      `<span class="lr-syllable">${esc(s)}</span>`
    ).join('');
    const audioFn = window.AudioCache
      ? `AudioCache.play('${esc(step.audio)}')`
      : `speakKorean('${esc(step.audio)}')`;
    return `
      <div class="sr-listen-repeat">
        <div class="lr-word" data-count="${step.syllables.length}">${syllableHtml}</div>
        <div class="lr-rom">${esc(step.romanization)}</div>
        ${step.katakana ? `<div class="kata">${esc(step.katakana)}</div>` : ''}
        <div class="lr-meaning lr-meaning-en">${esc(step.meaning)}</div>
        ${step.meaning_ja ? `<div class="lr-meaning lr-meaning-ja">${esc(step.meaning_ja)}</div>` : ''}
        <button class="btn btn-primary sr-audio-btn" onclick="${audioFn}">
          🔊 ${isJa ? '聴く' : 'Listen'}
        </button>
        <button class="btn btn-secondary sr-said-btn" id="sr-said-btn"
          onclick="StepRunner.confirmRepeat(this)">
          🗣️ ${isJa ? '言えた — 次へ' : 'I said it — Next'}
        </button>
      </div>`;
  }

  /* lesson_complete */
  function renderLessonComplete(step) {
    const isJa = window.LangManager && window.LangManager.getLang() === 'ja';
    const totalXP = loadProgress().xp || xp;
    markLessonComplete();
    return `
      <div class="sr-complete">
        <div class="complete-confetti-anchor" id="complete-anchor"></div>
        <div class="complete-icon">🎉</div>
        <h2 class="complete-title">${esc(step.title)}</h2>
        <p class="complete-title-kr">${esc(step.title_kr)}</p>
        <p class="complete-msg">${esc(isJa && step.message_ja ? step.message_ja : step.message)}</p>
        <div class="complete-xp">⚡ ${totalXP} ${isJa ? 'XP 獲得' : 'XP earned'}</div>
        <div class="complete-ad-slot">
          <div class="ad-slot ad-complete" id="ad-slot-complete" aria-label="Advertisement"></div>
        </div>
        <div class="complete-actions">
          <button class="btn btn-primary" onclick="StepRunner.restart()">${isJa ? 'もう一度' : 'Start Again'}</button>
          ${step.next_url ? `<a href="${esc(step.next_url)}" class="btn btn-secondary">${isJa ? '次のレッスン →' : 'Next Lesson →'}</a>` : ''}
        </div>
      </div>`;
  }

  /* ── Quiz Handler ───────────────────────────────────── */
  function handleQuizAnswer(el) {
    const container = el.closest('.sr-quiz');
    if (!container) return;
    const selected = el.dataset.value;
    const correct = container.dataset.correct;
    const opts = container.querySelectorAll('.sr-quiz-opt');
    const feedback = container.querySelector('#sr-quiz-feedback');
    const isCorrect = selected === correct;

    if (isCorrect) {
      opts.forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.value === correct) btn.classList.add('correct');
      });

      streak++;
      let earned = XP_CORRECT;
      if (streak >= 5) earned = Math.round(XP_CORRECT * XP_STREAK_5);
      else if (streak >= 3) earned = Math.round(XP_CORRECT * XP_STREAK_3);

      xp += earned;
      saveProgress();
      updateXPBadge();

      el.classList.add('correct-pop');
      if (window.playDing) playDing();
      if (window.spawnConfetti) spawnConfetti(el);
      const isJa = window.LangManager && window.LangManager.getLang() === 'ja';
      if (feedback) feedback.textContent = isJa
        ? `✓ 正解！ +${earned} XP${streak >= 3 ? ' 🔥 連続 x' + streak : ''}`
        : `✓ Correct! +${earned} XP${streak >= 3 ? ' 🔥 Streak x' + streak : ''}`;

      setTimeout(() => nextStep(), 1400);
    } else {
      streak = 0;
      el.disabled = true;
      el.classList.add('wrong', 'wrong-shake');
      const isJa = window.LangManager && window.LangManager.getLang() === 'ja';
      if (feedback) feedback.textContent = isJa ? '✗ 惜しい — もう一度！' : '✗ Not quite — try again!';
      setTimeout(() => el.classList.remove('wrong-shake'), 400);
    }
  }

  /* ── Syllable Reveal ────────────────────────────────── */
  function revealSyllable(btn) {
    const builder = btn.closest('.sr-syllable-builder');
    if (!builder) return;
    const result = builder.dataset.result;
    const audio = builder.dataset.audio;
    const resultEl = document.getElementById('syl-result');
    const meaningEl = document.getElementById('syl-meaning');

    if (resultEl) {
      resultEl.textContent = result;
      resultEl.classList.add('syl-revealed');
    }
    if (meaningEl) meaningEl.style.display = '';

    if (window.AudioCache) AudioCache.play(audio);
    else if (window.speakKorean) speakKorean(audio);

    const isJa = window.LangManager && window.LangManager.getLang() === 'ja';
    btn.textContent = isJa ? '次へ →' : 'Next →';
    btn.onclick = nextStep;

    streak++;
    xp += XP_CORRECT;
    saveProgress();
    updateXPBadge();

    if (window.playDing) playDing();
    if (window.spawnConfetti && resultEl) spawnConfetti(resultEl);
  }

  /* ── Listen-Repeat Confirm ──────────────────────────── */
  function confirmRepeat(btn) {
    streak++;
    xp += XP_CORRECT;
    saveProgress();
    updateXPBadge();
    if (window.playDing) playDing();
    nextStep();
  }

  /* ── Progress & UI Updates ──────────────────────────── */
  function updateProgress(index) {
    const step = lessonData.steps[index];
    const stageId = step?.stage;
    const stage = lessonData.stages.find(s => s.id === stageId);
    const total = lessonData.steps.length;
    const pct = Math.round(((index + 1) / total) * 100);

    const fill = document.getElementById('progress-bar-fill');
    if (fill) fill.style.width = pct + '%';

    const meta = document.getElementById('progress-meta');
    if (meta && stage) {
      const completed = index + 1;
      const remaining = total - completed;
      const timeLeft = Math.round((remaining * 60) / 60);
      const isJa = window.LangManager && window.LangManager.getLang() === 'ja';
      meta.textContent = isJa
        ? `ステージ ${stageId}／${lessonData.stages.length} · 残り約${timeLeft}分`
        : `Stage ${stageId} of ${lessonData.stages.length} · ~${timeLeft} min remaining`;
    }
  }

  function updateStageNav(activeStage) {
    document.querySelectorAll('.stage-tab').forEach(btn => {
      if (btn.dataset.cat) return; // vocab category tabs manage their own active state
      const id = parseInt(btn.dataset.stage, 10);
      btn.classList.toggle('active', id === activeStage);
      btn.setAttribute('aria-selected', id === activeStage ? 'true' : 'false');
    });
  }

  function updateNavButtons(index) {
    const prev = document.getElementById('btn-prev');
    const next = document.getElementById('btn-next');
    const step = lessonData.steps[index];

    if (prev) prev.disabled = index === 0;

    if (next) {
      const hideTypes = ['match_quiz', 'lesson_complete', 'listen_repeat'];
      const shouldHide = hideTypes.includes(step?.type);
      next.style.display = shouldHide ? 'none' : '';
      next.disabled = index >= lessonData.steps.length - 1;
    }
  }

  function updateCounter(index) {
    const el = document.getElementById('step-counter');
    if (el) el.textContent = `${index + 1} / ${lessonData.steps.length}`;
  }

  function updateXPBadge() {
    const badge = document.getElementById('xp-badge');
    if (!badge) return;
    const multiplier = streak >= 5 ? '2×' : streak >= 3 ? '1.5×' : '';
    badge.innerHTML = `⚡ ${xp} XP${streak >= 3 ? ` · 🔥 ${streak} streak${multiplier ? ' ' + multiplier : ''}` : ''}`;
  }

  /* ── Persistence ───────────────────────────────────── */
  function saveProgress() {
    try {
      const key = 'ks-' + (lessonData?.lesson || 'lesson') + '-xp';
      localStorage.setItem(key, JSON.stringify({ xp, ts: Date.now() }));
    } catch (_) {}
  }

  function loadProgress() {
    try {
      const key = 'ks-' + (lessonData?.lesson || 'lesson') + '-xp';
      return JSON.parse(localStorage.getItem(key) || '{}');
    } catch (_) { return {}; }
  }

  function markLessonComplete() {
    try {
      const id = lessonData?.lesson || 'lesson';
      const lessons = JSON.parse(localStorage.getItem('ks-lessons-done') || '[]');
      if (!lessons.includes(id)) {
        lessons.push(id);
        localStorage.setItem('ks-lessons-done', JSON.stringify(lessons));
      }
    } catch (_) {}
  }

  function saveStageMap() {
    try {
      const key = 'ks-' + (lessonData?.lesson || 'lesson') + '-stagemap';
      localStorage.setItem(key, JSON.stringify(stageStepMap));
    } catch (_) {}
  }

  function loadStageMap() {
    try {
      const key = 'ks-' + (lessonData?.lesson || 'lesson') + '-stagemap';
      return JSON.parse(localStorage.getItem(key) || '{}');
    } catch (_) { return {}; }
  }

  /* ── Utilities ─────────────────────────────────────── */
  function esc(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function restart() {
    xp = 0; streak = 0;
    stageStepMap = {};
    saveProgress();
    saveStageMap();
    goToStep(0);
  }

  return {
    init,
    goToStep,
    handleQuizAnswer,
    revealSyllable,
    confirmRepeat,
    restart,
    get stepsSinceLastAdRefresh() { return stepsSinceLastAdRefresh; },
    set stepsSinceLastAdRefresh(v) { stepsSinceLastAdRefresh = v; },
    get lastAdRefreshTime() { return lastAdRefreshTime; },
    set lastAdRefreshTime(v) { lastAdRefreshTime = v; },
    get stickyAdSlot() { return stickyAdSlot; },
    set stickyAdSlot(v) { stickyAdSlot = v; },
  };
})();
