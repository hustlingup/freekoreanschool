/* ═══════════════════════════════════════════════════════
   StepRunner — Micro-interaction lesson engine
   Handles JSON fetch, step rendering, URL sync,
   progress tracking (via KSProgress), and analytics.
═══════════════════════════════════════════════════════ */

'use strict';

const StepRunner = (() => {
  /* ── Locale UI strings ─────────────────────────────────────────────────
     Every learner-facing string this engine builds itself (i.e. not read out
     of learn/data/*.json via loc()) lives here, keyed by locale then by key.
     Replaced 92 inline `lang === 'ja' ? … : lang === 'zh-tw' ? …` chains on
     2026-08-12 (docs/i18n-expansion/00-plan.md §0.2): adding a locale used to
     mean ~92 hand edits scattered through the renderers, each one able to
     silently fall through to English. Now it is one object literal.

     English is the fallback for any key a locale has not filled — which is
     exactly what the old chains did, since every chain ended in the English
     value.

     Values containing {placeholders} are format strings expanded by fmt().
     Do NOT put layout/behaviour decisions in here; those go in SR_CAP.      */
  const SR_UI = {
    en: {
      stageNav:   'Lesson stages',
      prev:       'Prev',
      next:       'Next',
      prevAria:   'Previous step',
      nextAria:   'Next step',
      stageAria:  'Stage {id}: {name}',
      pattern:    'Pattern',
      hear:       'Hear it',
      listen:     'Listen',
      saidIt:     'I said it — Next',
      replay:     'Replay',
      continue:   'Continue',
      sylPrompt:  'Combine these pieces into a syllable block:',
      sylReveal:  'Reveal Syllable',
      tracePrompt: 'Write it yourself — draw each stroke in the numbered order.',
      keysTitle:  'New keys',
      /* Fullwidth in CJK, ASCII + a space everywhere else. */
      keysColon:  ': ',
      keysInstruction: 'Press each highlighted key until it feels automatic — your keyboard or the on-screen keys both work.',
      drillJamo:     'Jamo drill',
      drillSyllable: 'Syllable drill',
      drillWord:     'Word drill',
      drillInstruction: 'Type what you see. Accuracy first — speed follows.',
      progressMeta:  'Stage {stage} of {total} · ~{min} min remaining',
    },
    ja: {
      stageNav:   'レッスンステージ',
      prev:       '前へ',
      next:       '次へ',
      prevAria:   '前のステップ',
      nextAria:   '次のステップ',
      stageAria:  'ステージ {id}: {name}',
      pattern:    'パターン',
      hear:       '聴く',
      listen:     '聴く',
      saidIt:     '言えた — 次へ',
      replay:     'もう一度',
      continue:   '次へ',
      sylPrompt:  'これらのピースを音節ブロックに組み合わせてください：',
      sylReveal:  '音節を表示',
      tracePrompt: '自分で書いてみましょう — 番号の順に一画ずつ書いてください。',
      keysTitle:  '新しいキー',
      keysColon:  '：',
      keysInstruction: 'ハイライトされたキーを、指が覚えるまで押してみましょう。物理キーボードでも画面のキーでも構いません。',
      drillJamo:     '字母ドリル',
      drillSyllable: '音節ドリル',
      drillWord:     '単語ドリル',
      drillInstruction: '表示されたものを入力しましょう。まずは正確さ、スピードは後からついてきます。',
      progressMeta:  'ステージ {stage}／{total} · 残り約{min}分',
    },
    'zh-tw': {
      stageNav:   '課程階段',
      prev:       '上一步',
      next:       '下一步',
      prevAria:   '上一步',
      nextAria:   '下一步',
      stageAria:  '第 {id} 階段: {name}',
      pattern:    '結構',
      hear:       '聽',
      listen:     '聽',
      saidIt:     '我說了 — 下一個',
      replay:     '重播',
      continue:   '下一步',
      sylPrompt:  '將這些積木組合成音節：',
      sylReveal:  '顯示音節',
      tracePrompt: '親手寫寫看 — 依照編號順序逐筆書寫。',
      keysTitle:  '新按鍵',
      keysColon:  '：',
      keysInstruction: '按下每個highlight的按鍵，直到手指記住為止。實體鍵盤或螢幕鍵盤都可以。',
      drillJamo:     '字母練習',
      drillSyllable: '音節練習',
      drillWord:     '單字練習',
      drillInstruction: '照著畫面上的內容輸入。先求正確，速度自然會跟上。',
      progressMeta:  '第 {stage} 階段（共 {total} 個）· 約剩 {min} 分鐘',
    },
    'pt-br': {
      stageNav:   'Estágios da lição',
      prev:       'Anterior',
      next:       'Próximo',
      prevAria:   'Etapa anterior',
      nextAria:   'Próxima etapa',
      stageAria:  'Estágio {id}: {name}',
      pattern:    'Padrão',
      hear:       'Ouvir',
      listen:     'Ouvir',
      saidIt:     'Eu falei — Próximo',
      replay:     'Repetir',
      continue:   'Continuar',
      sylPrompt:  'Combine estas peças em um bloco silábico:',
      sylReveal:  'Mostrar sílaba',
      tracePrompt: 'Escreva você mesmo: desenhe cada traço na ordem numerada.',
      keysTitle:  'Teclas novas',
      keysInstruction: 'Pressione cada tecla destacada até o dedo memorizar. Vale o teclado físico ou o da tela.',
      drillJamo:     'Prática de jamo',
      drillSyllable: 'Prática de sílabas',
      drillWord:     'Prática de palavras',
      drillInstruction: 'Digite o que você vê. Primeiro a precisão; a velocidade vem sozinha.',
      progressMeta:  'Estágio {stage} de {total} · ~{min} min restantes',
    },
    es: {
      stageNav:   'Etapas de la lección',
      prev:       'Anterior',
      next:       'Siguiente',
      prevAria:   'Paso anterior',
      nextAria:   'Siguiente paso',
      stageAria:  'Etapa {id}: {name}',
      pattern:    'Patrón',
      hear:       'Escuchar',
      listen:     'Escuchar',
      saidIt:     'Lo dije — Siguiente',
      replay:     'Repetir',
      continue:   'Continuar',
      sylPrompt:  'Combina estas piezas en un bloque de sílaba:',
      sylReveal:  'Mostrar sílaba',
      tracePrompt: 'Escríbelo tú mismo: dibuja cada trazo en el orden numerado.',
      keysTitle:  'Teclas nuevas',
      keysInstruction: 'Pulsa cada tecla resaltada hasta que te salga sola: sirve tu teclado o las teclas en pantalla.',
      drillJamo:     'Práctica de jamo',
      drillSyllable: 'Práctica de sílabas',
      drillWord:     'Práctica de palabras',
      drillInstruction: 'Escribe lo que ves. Primero la precisión; la velocidad llega sola.',
      progressMeta:  'Etapa {stage} de {total} · ~{min} min restantes',
    },
    fr: {
      stageNav:   'Étapes de la leçon',
      prev:       'Précédent',
      next:       'Suivant',
      prevAria:   'Étape précédente',
      nextAria:   'Étape suivante',
      /* French spaces before the colon — deliberate, not a typo. */
      stageAria:  'Étape {id} : {name}',
      pattern:    'Modèle',
      hear:       'Écouter',
      listen:     'Écouter',
      saidIt:     'Je l\'ai dit — Suivant',
      replay:     'Rejouer',
      continue:   'Continuer',
      sylPrompt:  'Assemblez ces pièces en un bloc syllabique :',
      sylReveal:  'Révéler la syllabe',
      tracePrompt: 'Écrivez-le vous-même : dessinez chaque trait dans l\'ordre numéroté.',
      keysTitle:  'Nouvelles touches',
      keysInstruction: 'Appuyez sur chaque touche mise en évidence jusqu\'à ce que le geste devienne automatique : clavier physique ou touches à l\'écran.',
      drillJamo:     'Exercice de jamo',
      drillSyllable: 'Exercice de syllabes',
      drillWord:     'Exercice de mots',
      drillInstruction: 'Tapez ce que vous voyez. La précision d\'abord, la vitesse suivra.',
      progressMeta:  'Étape {stage} sur {total} · ~{min} min restantes',
    },
    de: {
      stageNav:   'Lektionsphasen',
      prev:       'Zurück',
      next:       'Weiter',
      prevAria:   'Vorheriger Schritt',
      nextAria:   'Nächster Schritt',
      stageAria:  'Phase {id}: {name}',
      pattern:    'Muster',
      hear:       'Anhören',
      listen:     'Anhören',
      saidIt:     'Gesagt — Weiter',
      replay:     'Nochmal',
      continue:   'Weiter',
      sylPrompt:  'Kombiniere diese Teile zu einem Silbenblock:',
      sylReveal:  'Silbe anzeigen',
      tracePrompt: 'Schreibe es selbst — zeichne jeden Strich in der nummerierten Reihenfolge.',
      keysTitle:  'Neue Tasten',
      keysInstruction: 'Drücke jede hervorgehobene Taste, bis sie sitzt — Tastatur oder Bildschirmtasten funktionieren beide.',
      drillJamo:     'Jamo-Übung',
      drillSyllable: 'Silben-Übung',
      drillWord:     'Wort-Übung',
      drillInstruction: 'Tippe, was du siehst. Erst die Genauigkeit — das Tempo kommt von selbst.',
      progressMeta:  'Phase {stage} von {total} · ~{min} Min. verbleibend',
    },
    vi: {
      stageNav:   'Các giai đoạn bài học',
      prev:       'Trước',
      next:       'Tiếp',
      prevAria:   'Bước trước',
      nextAria:   'Bước tiếp theo',
      stageAria:  'Giai đoạn {id}: {name}',
      pattern:    'Mẫu',
      hear:       'Nghe',
      listen:     'Nghe',
      saidIt:     'Đã nói — Tiếp',
      replay:     'Xem lại',
      continue:   'Tiếp tục',
      sylPrompt:  'Kết hợp các mảnh này thành một khối âm tiết:',
      sylReveal:  'Hiện âm tiết',
      tracePrompt: 'Tự viết nhé — vẽ từng nét theo đúng thứ tự đánh số.',
      keysTitle:  'Phím mới',
      keysInstruction: 'Nhấn từng phím được làm nổi bật cho đến khi thành phản xạ — bàn phím thật hoặc bàn phím trên màn hình đều được.',
      drillJamo:     'Luyện jamo',
      drillSyllable: 'Luyện âm tiết',
      drillWord:     'Luyện từ',
      drillInstruction: 'Gõ đúng những gì bạn thấy. Chính xác trước, tốc độ theo sau.',
      progressMeta:  'Giai đoạn {stage} / {total} · ~{min} phút còn lại',
    },
    th: {
      stageNav:   'ขั้นตอนบทเรียน',
      prev:       'ก่อนหน้า',
      next:       'ถัดไป',
      prevAria:   'ขั้นตอนก่อนหน้า',
      nextAria:   'ขั้นตอนถัดไป',
      stageAria:  'ขั้นตอนที่ {id}: {name}',
      pattern:    'รูปแบบ',
      hear:       'ฟัง',
      listen:     'ฟัง',
      saidIt:     'พูดแล้ว — ถัดไป',
      replay:     'เล่นซ้ำ',
      continue:   'ต่อไป',
      sylPrompt:  'รวมชิ้นส่วนเหล่านี้เป็นบล็อกพยางค์:',
      sylReveal:  'แสดงพยางค์',
      tracePrompt: 'เขียนด้วยตัวเอง — ลากทีละเส้นตามลำดับหมายเลข',
      keysTitle:  'ปุ่มใหม่',
      keysInstruction: 'กดปุ่มที่ไฮไลต์แต่ละปุ่มจนคุ้นมือ ใช้คีย์บอร์ดจริงหรือแป้นบนหน้าจอก็ได้',
      drillJamo:     'ฝึกพยัญชนะและสระ',
      drillSyllable: 'ฝึกพยางค์',
      drillWord:     'ฝึกคำศัพท์',
      drillInstruction: 'พิมพ์ตามที่เห็น เน้นความแม่นยำก่อน แล้วความเร็วจะตามมาเอง',
      progressMeta:  'ขั้นตอนที่ {stage} จาก {total} · ~{min} นาทีที่เหลือ',
    },
    id: {
      stageNav:   'Tahapan pelajaran',
      prev:       'Sebelumnya',
      next:       'Selanjutnya',
      prevAria:   'Langkah sebelumnya',
      nextAria:   'Langkah selanjutnya',
      stageAria:  'Tahap {id}: {name}',
      pattern:    'Pola',
      hear:       'Dengarkan',
      listen:     'Dengarkan',
      saidIt:     'Sudah saya ucapkan — Lanjut',
      replay:     'Putar ulang',
      continue:   'Lanjutkan',
      sylPrompt:  'Gabungkan bagian-bagian ini menjadi blok suku kata:',
      sylReveal:  'Tampilkan Suku Kata',
      tracePrompt: 'Tulis sendiri — gambar setiap goresan sesuai urutan nomor.',
      keysTitle:  'Tombol baru',
      keysInstruction: 'Tekan setiap tombol yang disorot sampai terasa otomatis — keyboard fisik maupun tombol di layar sama-sama bisa.',
      drillJamo:     'Latihan jamo',
      drillSyllable: 'Latihan suku kata',
      drillWord:     'Latihan kata',
      drillInstruction: 'Ketik apa yang kamu lihat. Utamakan akurasi — kecepatan menyusul.',
      progressMeta:  'Tahap {stage} dari {total} · ~{min} menit tersisa',
    },
  };

  /* ── Locale capabilities ───────────────────────────────────────────────
     LAYOUT and FIELD decisions, not UI copy — deliberately a separate table
     so nobody is tempted to answer "does this locale replace the
     romanization line?" with a translated string.

       pronField      which step field carries this locale's pronunciation aid,
                      falling back to `reading_<lang>` then `romanization`.
       pronInRomSlot  the aid REPLACES the Revised-Romanization line rather
                      than sitting beside it (Zhuyin does; zh-cn will want the
                      same for pinyin — add `{ pronField: 'pinyin',
                      pronInRomSlot: true }` when that locale lands).
       pronAidRow     the aid gets its own row under the character (ja only —
                      the row keeps the historical `.kata` class name).

     A locale absent from this table gets every flag falsy, which is the
     behaviour of all six non-CJK locales today.                            */
  const SR_CAP = {
    ja:      { pronField: 'katakana', pronAidRow: true },
    'zh-tw': { pronField: 'zhuyin',   pronInRomSlot: true },
  };

  /* Locale string lookup. English backfills any key a locale omits. */
  function ui(key) {
    const d = SR_UI[_detectLang()] || SR_UI.en;
    return d[key] !== undefined ? d[key] : SR_UI.en[key];
  }

  /* Capability lookup; undefined (falsy) for locales with no record. */
  function cap(key) {
    const c = SR_CAP[_detectLang()];
    return c ? c[key] : undefined;
  }

  /* Minimal {name} interpolator for the format-string entries in SR_UI.
     An unknown placeholder is left verbatim so a typo is visible, not silent. */
  function fmt(str, vars) {
    return String(str).replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m));
  }

  /* ── State ─────────────────────────────────────────── */
  let lessonData = null;
  let currentIndex = 0;
  let stageStepMap = {};
  /* Live StrokeWriter instance for a stroke_demo / stroke_trace step.
     Stays null on every lesson page that does not load js/stroke-writer.js,
     which makes every code path that touches it a no-op there. */
  let strokeInstance = null;
  /* Live TypingGame instance for a key_intro / typing_drill step. Same
     contract as strokeInstance: stays null on every lesson page that does not
     load js/typing-game.js, so every code path that touches it is a no-op
     there. The engine binds keydown/keyup listeners and an interval timer, so
     an instance MUST be destroyed before another mounts and when the learner
     leaves the step. */
  let typingInstance = null;
  /* Pending auto-advance timer for a completed key_intro step. key_intro steps
     (typing stages 2–4) advance themselves after the widget's "Done!" reward so
     the learner never has to scroll down and click Continue. Stored module-level
     so it can be cancelled the instant the step changes — a queued advance must
     never fire after manual navigation and double-jump. typing_drill never sets
     it. */
  let typingAdvanceTimer = null;
  /* ~750ms: long enough for the widget's "Done!" reward to register, short
     enough not to feel stuck. */
  const KEY_INTRO_ADVANCE_MS = 750;

  function clearTypingAdvance() {
    if (typingAdvanceTimer !== null) {
      clearTimeout(typingAdvanceTimer);
      typingAdvanceTimer = null;
    }
  }

  function t(key) { return window.LangManager ? LangManager.t(key) : key; }

  function lessonId() { return lessonData?.lesson || 'lesson'; }

  /* Record step completion; returns true on first completion. */
  function markDone(index, type) {
    if (!window.KSProgress) return false;
    const first = KSProgress.markStepDone(lessonId(), index, type);
    updateStreakBadge();
    return first;
  }

  /* ── Bootstrap ─────────────────────────────────────── */
  async function init(dataUrl) {
    try {
      const res = await fetch(dataUrl);
      lessonData = await res.json();
    } catch (e) {
      console.error('StepRunner: failed to load lesson data', e);
      return;
    }

    stageStepMap = window.KSProgress ? KSProgress.getStageMap(lessonId()) : {};
    currentIndex = 0;
    buildShell();
    restoreState();

    window.addEventListener('popstate', () => {
      const stepParam = new URLSearchParams(location.search).get('step');
      const idx = stepParam ? Math.max(0, parseInt(stepParam, 10) - 1) : 0;
      goToStep(idx, { pushState: false });
    });

    renderStep(currentIndex);
  }

  /* ── Static lesson reference — deliberately NOT collapsed ──────────────
     learn/*.html ship a <details id="lesson-static" open> block holding the
     ENTIRE lesson as semantic HTML (generated by scripts/gen-lesson-static.cjs).

     This runner used to strip the `open` attribute after a successful
     renderStep(), on the theory that the step UI should be the primary
     experience and the prose stayed "one click away". Do not restore that.

     A crawler reads the DOM and saw ~2,500 words either way, which is why
     every word-count audit passed. A HUMAN reviewer sees the rendered default
     state, and that state was: a breadcrumb, four stat badges, "Loading
     lesson…", one interactive step, and a closed accordion — roughly 55 words
     of prose across 162 pages, 40% of the site. That is the shape an AdSense
     reviewer judges, and it is the most likely cause of the third
     "Low value content" rejection (2026-08-12).

     The block now stays open. The visitor can still collapse it themselves;
     nothing collapses it for them.                                          */

  function restoreState() {
    const stepParam = new URLSearchParams(location.search).get('step');
    if (stepParam) {
      const idx = Math.max(0, parseInt(stepParam, 10) - 1);
      currentIndex = Math.min(idx, lessonData.steps.length - 1);
    }
    updateStreakBadge();
  }

  /* ── Language Detection ─────────────────────────── */
  function _detectLang() {
    const lmLang = window.LangManager?.getLang();
    if (lmLang && lmLang !== 'en') return lmLang;
    const htmlLang = document.documentElement.lang?.toLowerCase();
    if (htmlLang === 'zh-tw') return 'zh-tw';
    if (htmlLang === 'ja') return 'ja';
    if (htmlLang === 'es') return 'es';
    if (htmlLang === 'fr') return 'fr';
    if (htmlLang === 'de') return 'de';
    if (htmlLang === 'vi') return 'vi';
    if (htmlLang === 'th') return 'th';
    if (htmlLang === 'id') return 'id';
    return lmLang || 'en';
  }

  function _locSuffix() {
    const lang = _detectLang();
    const map = { ja: '_ja', 'zh-tw': '_zh_tw', es: '_es', fr: '_fr', de: '_de', vi: '_vi', th: '_th', id: '_id' };
    return map[lang] || '';
  }

  /* Which JSON field carries this locale's pronunciation aid. ja → katakana,
     zh-tw → zhuyin (SR_CAP.pronField); everything else uses the generic
     `reading_<lang>` field. Revised Romanization is the universal fallback. */
  function getPronunciationAid(step) {
    const lang = _detectLang();
    const field = cap('pronField') || ('reading_' + lang.replace('-', '_'));
    return step[field] || step.romanization;
  }

  function loc(obj, base) {
    const s = _locSuffix();
    return s && obj[base + s] != null ? obj[base + s] : obj[base];
  }

  /* ── Shell Construction ────────────────────────────── */
  function buildShell() {
    const wrap = document.getElementById('step-shell');
    if (!wrap) return;

    const stageLabel = ui('stageNav');
    const prevLabel  = ui('prev');
    const nextLabel  = ui('next');
    const prevAria   = ui('prevAria');
    const nextAria   = ui('nextAria');

    wrap.innerHTML = `
      <div class="hangul-progress" id="hangul-progress">
        <div class="progress-bar-track">
          <div class="progress-bar-fill" id="progress-bar-fill"></div>
        </div>
        <div class="progress-meta" id="progress-meta"></div>
      </div>

      <div class="stage-nav" id="stage-nav" role="tablist" aria-label="${stageLabel}"></div>

      <div class="step-content" id="step-content" aria-live="polite"></div>

      <div class="step-nav" id="step-nav">
        <button class="step-nav-btn" id="btn-prev" aria-label="${prevAria}">← ${prevLabel}</button>
        <div class="step-counter" id="step-counter"></div>
        <button class="step-nav-btn step-nav-next" id="btn-next" aria-label="${nextAria}">${nextLabel} →</button>
      </div>
    `;

    buildStageNav();
    document.getElementById('btn-prev').addEventListener('click', prevStep);
    document.getElementById('btn-next').addEventListener('click', nextStep);
  }

  function buildStageNav() {
    const nav = document.getElementById('stage-nav');
    if (!nav || !lessonData) return;
    nav.innerHTML = lessonData.stages.map(s => {
      /* Stage names are JSON content, not chrome — resolved through the same
         `_<suffix>` mechanism as every other localized field. `||` (not loc()'s
         `!= null`) is deliberate: an empty localized name falls back to
         English, which is what the eight ternaries here always did.          */
      const suffix = _locSuffix();
      const stageName = (suffix && s['name' + suffix]) || s.name;
      const ariaLabel = fmt(ui('stageAria'), { id: s.id, name: stageName });
      return `
      <button class="stage-tab" data-stage="${s.id}" role="tab"
        aria-label="${ariaLabel}">
        <span class="stage-num">${s.id}</span>
        <span class="stage-label">${stageName}</span>
        <span class="stage-label-kr">${s.name_kr}</span>
      </button>`;
    }).join('');
    nav.querySelectorAll('.stage-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const stageId = parseInt(btn.dataset.stage, 10);
        const currentStage = lessonData.steps[currentIndex]?.stage;
        if (stageId === currentStage) return;
        if (currentStage !== undefined) stageStepMap[currentStage] = currentIndex;
        if (window.KSProgress) KSProgress.saveStageMap(lessonId(), stageStepMap);
        const stage = lessonData.stages.find(s => s.id === stageId);
        if (!stage) return;
        const savedStep = stageStepMap[stageId];
        goToStep(savedStep !== undefined ? savedStep : stage.first_step - 1);
      });
    });
  }

  /* ── Navigation ────────────────────────────────────── */
  function nextStep() {
    const step = lessonData.steps[currentIndex];
    if (step && (step.type === 'reading_card' || step.type === 'card_reveal' || step.type === 'stroke_demo')) {
      markDone(currentIndex, step.type);
    }
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
    // Any navigation cancels a queued key_intro auto-advance so it can never
    // fire against a step the learner already left (which would double-jump).
    clearTypingAdvance();
    currentIndex = Math.max(0, Math.min(index, lessonData.steps.length - 1));

    if (pushState) {
      const url = new URL(location.href);
      url.searchParams.set('step', currentIndex + 1);
      history.pushState({ step: currentIndex + 1 }, '', url);

      if (window.gtag) {
        gtag('event', 'page_view', { page_path: location.pathname + location.search });
      }
    }

    renderStep(currentIndex);
    prefetchNextStep(currentIndex);
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
      stroke_demo: renderStrokeDemo,
      stroke_trace: renderStrokeTrace,
      key_intro: renderKeyIntro,
      typing_drill: renderTypingDrill,
    };

    const renderer = renderers[step.type];
    if (renderer) {
      content.innerHTML = renderer(step);
    } else {
      content.innerHTML = `<p>${step.type} step</p>`;
    }

    /* Stroke widget mount. `window.StrokeWriter` is only present on
       learn/letter-writing.html; everywhere else this is dead weight and the
       renderer output degrades to a static card with an empty mount div.
       The else-branch only fires when an instance exists, i.e. never on a page
       without the engine. */
    if ((step.type === 'stroke_demo' || step.type === 'stroke_trace') && window.StrokeWriter) {
      mountStrokeStep(step, index);
    } else if (strokeInstance) {
      destroyStrokeStep();
    }

    /* Typing widget mount — exact mirror of the stroke block above.
       `window.TypingGame` is only present on learn/typing.html; everywhere else
       this is dead weight and the renderer output degrades to a static card
       with an empty mount div. The else-branch only fires when an instance
       exists, i.e. never on a page without the engine — and it is what tears
       down the previous game's keydown listeners when the learner navigates
       away from a typing step. */
    if ((step.type === 'key_intro' || step.type === 'typing_drill') && window.TypingGame) {
      mountTypingStep(step, index);
    } else if (typingInstance) {
      destroyTypingStep();
    }

    requestAnimationFrame(() => content.classList.remove('step-enter'));

    if (step.stage !== undefined) {
      stageStepMap[step.stage] = index;
      if (window.KSProgress) KSProgress.saveStageMap(lessonId(), stageStepMap);
    }
    if (step.type !== 'lesson_complete' && window.KSProgress) {
      KSProgress.setLastPosition(lessonId(), index);
    }

    updateProgress(index);
    updateStageNav(step.stage);
    updateNavButtons(index);
    updateCounter(index);
    ScrollAnimator?.observe && content.querySelectorAll('.animate-on-scroll').forEach(el => ScrollAnimator.observe(el));
  }

  /* reading_card */
  function renderReadingCard(step) {
    const patternWord = ui('pattern');
    const patternsHtml = step.patterns ? `
      <div class="sr-pattern-grid">
        ${step.patterns.map((p, i) => `
          <div class="sr-pattern-card">
            <div class="sr-pattern-name">${esc(p.name)} ${patternWord}</div>
            <div class="sr-pattern-char">${esc(p.char)}</div>
            <div class="sr-pattern-jamo">${esc(p.jamo)}</div>
            <div class="sr-pattern-label">${esc((loc(step, 'patterns_label') || [])[i] || p.label)}</div>
          </div>`).join('')}
      </div>` : '';

    const activeRules = loc(step, 'rules') || step.rules;
    const rulesHtml = activeRules ? `
      <ul class="sr-reading-rules">
        ${activeRules.map((r, i) => `<li><span class="sr-rule-num">${i + 1}</span> ${esc(r)}</li>`).join('')}
      </ul>` : '';
    const tip = step.tip;
    const tipL = loc(step, 'tip') || tip;
    const tipHtml = tip ? `
      <div class="tip-box" style="margin-top:20px">
        <span class="tip-icon">${esc(tip.icon || '💡')}</span>
        <div class="tip-content">
          <div class="tip-label">${esc(tipL.label)}</div>
          <div class="tip-text">${esc(tipL.text)}</div>
        </div>
      </div>` : '';

    // The Korean subtitle is shown only when the resolved title does not
    // already carry it. Two ways it can: the base title IS Korean (proverb and
    // grammar cards), or the Korean sits in parentheses inside it —
    // "Emotions in Korean (감정)" + title_kr "감정" rendered 감정 twice on 23
    // steps. Containment, not equality, because the parenthetical form is not
    // an exact match. Tested per-locale: a locale whose title drops the
    // parenthetical still gets the subtitle.
    const _title = loc(step, 'title');
    const _krSub = step.title_kr && !String(_title || '').includes(step.title_kr)
      ? ` <span class="sr-reading-title-kr">${esc(step.title_kr)}</span>` : '';
    return `
      <div class="sr-reading-card">
        <h2 class="sr-reading-title">${esc(_title)}${_krSub}</h2>
        <p class="sr-reading-body">${esc(loc(step, 'body'))}</p>
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
    const audioFnBtn = window.AudioCache
      ? `AudioCache.play('${esc(step.audio)}', this)`
      : `speakKorean('${esc(step.audio)}', this)`;
    const pronAid = getPronunciationAid(step);
    const showPronInRomSlot = !!cap('pronInRomSlot'); // Zhuyin replaces romanization slot
    const exMeaning = loc(step, 'example_meaning');
    const hint      = loc(step, 'hint');
    const hearBtn   = ui('hear');
    return `
      <div class="sr-card-reveal">
        <div class="sr-card" id="flip-card" role="button" tabindex="0"
          aria-label="Hear ${esc(step.char)}" onclick="${audioFn}">
          <div class="sr-char">${esc(step.char)}</div>
          <div class="sr-sub-row">
            <span class="sr-jamo">${esc(step.jamo || step.char)}</span>
            <span class="sr-divider">·</span>
            <span class="sr-rom">${esc(showPronInRomSlot && pronAid ? pronAid : step.romanization)}</span>
          </div>
          ${pronAid && !showPronInRomSlot && cap('pronAidRow') ? `<div class="kata">${esc(pronAid)}</div>` : ''}
          ${step.example_word ? `<div class="sr-example">${esc(step.example_word)} · ${esc(exMeaning)}</div>` : ''}
        </div>
        ${hint ? `<div class="sr-hint">💡 ${esc(hint)}</div>` : ''}
        <button class="btn btn-primary sr-audio-btn" onclick="${audioFnBtn}">
          🔊 ${hearBtn}
        </button>
      </div>`;
  }

  /* match_quiz */
  function renderMatchQuiz(step) {
    const indices = step.choices.map((_, i) => i).sort(() => Math.random() - 0.5);
    const chs = loc(step, 'choices');
    const opts = indices.map(i => {
      const c = step.choices[i];
      const display = chs && chs[i] != null ? chs[i] : c;
      return `
      <button class="quiz-option sr-quiz-opt" data-value="${esc(c)}"
        onclick="StepRunner.handleQuizAnswer(this)"
        aria-label="${esc(display)}">
        ${esc(display)}
      </button>`;
    }).join('');
    return `
      <div class="sr-quiz" data-correct="${esc(step.correct)}">
        <p class="sr-quiz-prompt">${esc(loc(step, 'prompt'))}</p>
        <div class="sr-quiz-opts">${opts}</div>
        <div class="sr-quiz-feedback" id="sr-quiz-feedback" aria-live="polite"></div>
      </div>`;
  }

  /* syllable_builder */
  function renderSyllableBuilder(step) {
    const prompt = ui('sylPrompt');
    const revealLabel = ui('sylReveal');
    const meaning = loc(step, 'meaning');
    return `
      <div class="sr-syllable-builder" data-consonant="${esc(step.consonant)}"
        data-vowel="${esc(step.vowel)}" data-result="${esc(step.result)}"
        data-audio="${esc(step.audio)}">
        <p class="sr-quiz-prompt">${prompt}</p>
        <div class="syl-pieces">
          <div class="syl-piece syl-consonant" data-type="consonant">${esc(step.consonant)}</div>
          <div class="syl-plus">+</div>
          <div class="syl-piece syl-vowel" data-type="vowel">${esc(step.vowel)}</div>
          <div class="syl-eq">=</div>
          <div class="syl-result" id="syl-result">?</div>
        </div>
        <button class="btn btn-primary sr-reveal-btn" id="syl-reveal-btn"
          onclick="StepRunner.revealSyllable(this)">
          ${revealLabel}
        </button>
        <div class="sr-hint" id="syl-meaning" style="display:none">${esc(meaning)}</div>
      </div>`;
  }

  /* ── Vocab Bookmark (inline in lessons) ────────────── */
  function buildBookmarkBtn(step) {
    if (!step.audio || !window.FlashcardManager) return '';
    const saved = FlashcardManager.hasCard(step.audio);
    const label = saved ? 'Remove from flashcards' : 'Save to flashcards';
    const text  = saved ? '★ Saved' : '☆ Save';
    return `<button class="sr-bookmark-btn${saved ? ' saved' : ''}"
      data-korean="${esc(step.syllables ? step.syllables.join('') : step.audio)}"
      data-rom="${esc(step.romanization || '')}"
      data-kana="${esc(step.katakana || '')}"
      data-zhuyin="${esc(step.zhuyin || '')}"
      data-eng="${esc(step.meaning || '')}"
      data-id="${esc(step.audio)}"
      aria-label="${label}"
      onclick="StepRunner.toggleVocabBookmark(this)">${text}</button>`;
  }

  function toggleVocabBookmark(btn) {
    if (!window.FlashcardManager) return;
    const id = btn.dataset.id;
    if (FlashcardManager.hasCard(id)) {
      FlashcardManager.removeCard(id);
      btn.textContent = '☆ Save';
      btn.classList.remove('saved');
      btn.setAttribute('aria-label', 'Save to flashcards');
    } else {
      const cat = new URLSearchParams(location.search).get('cat') || 'vocabulary';
      FlashcardManager.addCard({
        id,
        korean: btn.dataset.korean,
        romanization: btn.dataset.rom,
        kana: btn.dataset.kana,
        zhuyin: btn.dataset.zhuyin,
        english: btn.dataset.eng,
        theme: cat,
      });
      btn.textContent = '★ Saved';
      btn.classList.add('saved');
      btn.setAttribute('aria-label', 'Remove from flashcards');
    }
  }

  /* listen_repeat */
  function renderListenRepeat(step) {
    const syllableHtml = step.syllables.map(s =>
      `<span class="lr-syllable">${esc(s)}</span>`
    ).join('');
    const audioFnBtn = window.AudioCache
      ? `AudioCache.play('${esc(step.audio)}', this)`
      : `speakKorean('${esc(step.audio)}', this)`;
    const pronAid = getPronunciationAid(step);
    const showPronInRomSlot = !!cap('pronInRomSlot');
    const listenBtn = ui('listen');
    const saidBtn   = ui('saidIt');
    const meaningEs = step.meaning_es;
    const meaningVi = step.meaning_vi;
    const meaningId = step.meaning_id;
    return `
      <div class="sr-listen-repeat">
        <div class="lr-word" data-count="${step.syllables.length}">${syllableHtml}</div>
        <div class="lr-rom">${esc(showPronInRomSlot && pronAid ? pronAid : step.romanization)}</div>
        ${pronAid && cap('pronAidRow') ? `<div class="kata">${esc(pronAid)}</div>` : ''}
        <div class="lr-meaning lr-meaning-en">${esc(step.meaning)}</div>
        ${step.meaning_ja ? `<div class="lr-meaning lr-meaning-ja">${esc(step.meaning_ja)}</div>` : ''}
        ${step.meaning_zh_tw ? `<div class="lr-meaning lr-meaning-zh-tw">${esc(step.meaning_zh_tw)}</div>` : ''}
        ${meaningEs ? `<div class="lr-meaning lr-meaning-es">${esc(meaningEs)}</div>` : ''}
        ${step.meaning_fr ? `<div class="lr-meaning lr-meaning-fr">${esc(step.meaning_fr)}</div>` : ''}
        ${step.meaning_de ? `<div class="lr-meaning lr-meaning-de">${esc(step.meaning_de)}</div>` : ''}
        ${meaningVi ? `<div class="lr-meaning lr-meaning-vi">${esc(meaningVi)}</div>` : ''}
        ${meaningId ? `<div class="lr-meaning lr-meaning-id">${esc(meaningId)}</div>` : ''}
        <button class="btn btn-primary sr-audio-btn" onclick="${audioFnBtn}">
          🔊 ${listenBtn}
        </button>
        <button class="btn btn-secondary sr-said-btn" id="sr-said-btn"
          onclick="StepRunner.confirmRepeat(this)">
          🗣️ ${saidBtn}
        </button>
        ${buildBookmarkBtn(step)}
      </div>`;
  }

  /* lesson_complete */
  function renderLessonComplete(step) {
    if (window.KSProgress) KSProgress.markLessonComplete(lessonId());
    const msg = loc(step, 'message');

    let statsHtml = '';
    if (window.KSProgress) {
      const done = Math.min(KSProgress.getLesson(lessonId()).done.length, lessonData.steps.length - 1);
      const countable = lessonData.steps.length - 1;
      const c = KSProgress.getCounters();
      const streakDays = KSProgress.getStreak();
      statsHtml = `
        <div class="complete-stats">
          <div class="complete-stat"><span class="complete-stat-icon">🔥</span> ${esc(t('{n}-day streak').replace('{n}', streakDays))}</div>
          <div class="complete-stat"><span class="complete-stat-icon">📚</span> ${esc(t('Steps completed'))}: ${done} / ${countable}</div>
          <div class="complete-stat"><span class="complete-stat-icon">🗣️</span> ${esc(t('Words & phrases learned'))}: ${c.words}</div>
          <div class="complete-stat"><span class="complete-stat-icon">✍️</span> ${esc(t('Letters & syllables learned'))}: ${c.letters}</div>
        </div>`;
    }

    return `
      <div class="sr-complete">
        <div class="complete-confetti-anchor" id="complete-anchor"></div>
        <div class="complete-icon">🎉</div>
        <h2 class="complete-title">${esc(step.title)}</h2>
        <p class="complete-title-kr">${esc(step.title_kr)}</p>
        <p class="complete-msg">${esc(msg)}</p>
        ${statsHtml}
        <div class="complete-actions">
          <button class="btn btn-primary" onclick="StepRunner.restart()">${esc(t('Start Again'))}</button>
          ${step.next_url ? `<a href="${esc(step.next_url)}" class="btn btn-secondary">${esc(t('Next Lesson →'))}</a>` : ''}
        </div>
      </div>`;
  }

  /* ── Stroke-order steps (learn/letter-writing) ───────────────────────
     stroke_demo  — watch the strokes animate, then Next.
     stroke_trace — draw each stroke yourself; Next is hidden until the
                    widget reports completion.

     The renderers are pure string builders like every other renderer here and
     are safe on any page. The WIDGET is mounted separately in renderStep, gated
     on `window.StrokeWriter`, which only learn/letter-writing.html loads.       */

  function renderStrokeDemo(step) {
    const pronAid = getPronunciationAid(step);
    const showPronInRomSlot = !!cap('pronInRomSlot'); // Zhuyin replaces romanization slot
    const hint = loc(step, 'hint');
    const exMeaning = loc(step, 'example_meaning');
    // Same markup + handler pattern as the card_reveal audio button.
    const audioFnBtn = window.AudioCache
      ? `AudioCache.play('${esc(step.audio)}', this)`
      : `speakKorean('${esc(step.audio)}', this)`;
    const hearBtn   = ui('hear');
    const replayBtn = ui('replay');
    return `
      <div class="sr-stroke-step">
        <div class="sr-char">${esc(step.char)}</div>
        <div class="sr-rom">${esc(showPronInRomSlot && pronAid ? pronAid : step.romanization)}</div>
        ${pronAid && !showPronInRomSlot && cap('pronAidRow') ? `<div class="kata">${esc(pronAid)}</div>` : ''}
        <div class="sr-stroke-mount" id="sw-step-mount"></div>
        <div class="sr-stroke-actions">
          <button class="btn btn-secondary" onclick="StepRunner.strokeReplay()">↻ ${replayBtn}</button>
          ${step.audio ? `<button class="btn btn-primary sr-audio-btn" onclick="${audioFnBtn}">🔊 ${hearBtn}</button>` : ''}
        </div>
        ${hint ? `<div class="sr-hint">💡 ${esc(hint)}</div>` : ''}
        ${step.example_word ? `<div class="sr-example">${esc(step.example_word)} · ${esc(exMeaning)}</div>` : ''}
      </div>`;
  }

  function renderStrokeTrace(step) {
    const hint = loc(step, 'hint');
    // Wording tracks the widget's own "Write it yourself" mode label — the
    // engine tells the learner to DRAW, so this line must not say "trace".
    const instruction = ui('tracePrompt');
    return `
      <div class="sr-stroke-step">
        <p class="sr-quiz-prompt">${instruction}</p>
        <div class="sr-stroke-mount" id="sw-step-mount"></div>
        ${hint ? `<div class="sr-hint">💡 ${esc(hint)}</div>` : ''}
        <div class="sr-stroke-actions">
          <button class="btn btn-primary" id="sw-continue" style="display:none"
            onclick="StepRunner.stepContinue()">${continueLabel()} →</button>
        </div>
      </div>`;
  }

  function destroyStrokeStep() {
    if (!strokeInstance) return;
    try { strokeInstance.destroy(); } catch (e) {}
    strokeInstance = null;
  }

  /* Called from renderStep ONLY when window.StrokeWriter exists. */
  function mountStrokeStep(step, index) {
    destroyStrokeStep();
    const mount = document.getElementById('sw-step-mount');
    if (!mount) return;
    const isTrace = step.type === 'stroke_trace';
    try {
      strokeInstance = window.StrokeWriter.render(mount, step.char, {
        mode: isTrace ? 'trace' : 'watch',
        numbers: true,
        size: 260,
        // The step supplies its own labelled replay button in .sr-stroke-actions;
        // the engine's own control row would duplicate it.
        controls: false,
        onComplete: () => {
          markDone(index, step.type);
          if (isTrace) {
            const b = document.getElementById('sw-continue');
            if (b) b.style.display = '';
          }
        },
      });
    } catch (e) {
      console.error('StepRunner: stroke widget failed to mount', e);
      strokeInstance = null;
    }
  }

  /* Public hook used by the stroke_demo markup above. No-op without a live
     instance, so it cannot break a page that never renders a stroke step. */
  function strokeReplay() {
    if (strokeInstance && typeof strokeInstance.replay === 'function') strokeInstance.replay();
  }

  /* Shared "the widget says you're done, move on" hook. Emitted by
     stroke_trace (#sw-continue) AND by both typing steps (#kb-continue), which
     is why it is no longer called strokeContinue. No-op without lessonData, so
     it cannot break a page that never renders either step type. */
  function stepContinue() {
    if (!lessonData) return;
    goToStep(currentIndex + 1);
  }

  /* ── Typing steps (learn/typing) ─────────────────────────────────────
     key_intro    — press the highlighted key(s) N times each.
     typing_drill — type jamo / syllables / words against a count or a clock.

     Both renderers are pure string builders like every other renderer here and
     are safe on any page: they emit a header, an empty mount div and a hidden
     continue button, nothing more. The WIDGET is mounted separately in
     renderStep, gated on `window.TypingGame`, which only learn/typing.html
     loads. All game chrome — keyboard, prompt, stats, summary — is built by
     TypingGame.mountStep; keep these renderers thin.                         */

  /* The Continue label is identical for stroke_trace and both typing steps. */
  function continueLabel() {
    return ui('continue');
  }

  /* key_intro / typing_drill author `tip` as a plain STRING, unlike
     reading_card's { icon, label, text } object. Accept either shape so a
     copy-pasted reading_card tip renders its text instead of the string
     "[object Object]". */
  function typingTipHtml(step) {
    const tip = loc(step, 'tip');
    const text = typeof tip === 'string' ? tip : (tip && tip.text) || '';
    return text ? `<div class="sr-hint">💡 ${esc(text)}</div>` : '';
  }

  /* Mount + hidden continue button, shared by both typing renderers. */
  function typingMountHtml() {
    return `
        <div class="sr-typing-mount" id="kb-step-mount"></div>
        <div class="sr-stroke-actions">
          <button class="btn btn-primary" id="kb-continue" style="display:none"
            onclick="StepRunner.stepContinue()">${continueLabel()} →</button>
        </div>`;
  }

  function renderKeyIntro(step) {
    // step.jamo is an array of 1–3 chars in the JSON, but tolerate a bare
    // string so a malformed step degrades to a bare title instead of "undefined".
    const jamo = Array.isArray(step.jamo) ? step.jamo.join(' ') : (step.jamo || '');
    const titleWord = ui('keysTitle');
    // A JSON-authored title always wins; the generated one is the fallback so
    // stage 2–4 steps need no title field at all.
    // CJK copy takes the fullwidth colon; every other locale the ASCII one —
    // hence `keysColon` is a per-locale SR_UI value, not a hardcoded branch.
    const colon = ui('keysColon');
    const title = loc(step, 'title') || (jamo ? `${titleWord}${colon}${jamo}` : titleWord);
    const instruction = ui('keysInstruction');
    // The --intro modifier is the shared contract with css/style.css: it lets
    // the stylesheet widen the key_intro step and kill its stranded height
    // WITHOUT touching typing_drill, which keeps the bare .sr-typing-step.
    return `
      <div class="sr-typing-step sr-typing-step--intro">
        <h2 class="sr-reading-title">${esc(title)}</h2>
        <p class="sr-quiz-prompt">${esc(loc(step, 'instruction') || instruction)}</p>
        ${typingMountHtml()}
        ${typingTipHtml(step)}
      </div>`;
  }

  function renderTypingDrill(step) {
    // step.mode is content, not locale — it stays a conditional.
    const mode = step.mode === 'syllable' ? 'syllable' : step.mode === 'word' ? 'word' : 'jamo';
    const titleKeys = { jamo: 'drillJamo', syllable: 'drillSyllable', word: 'drillWord' };
    const title = loc(step, 'title') || ui(titleKeys[mode]);
    const instruction = ui('drillInstruction');
    return `
      <div class="sr-typing-step">
        <h2 class="sr-reading-title">${esc(title)}</h2>
        <p class="sr-quiz-prompt">${esc(loc(step, 'instruction') || instruction)}</p>
        ${typingMountHtml()}
        ${typingTipHtml(step)}
      </div>`;
  }

  function destroyTypingStep() {
    // Tearing down the widget also kills any auto-advance it queued.
    clearTypingAdvance();
    if (!typingInstance) return;
    try { typingInstance.destroy(); } catch (e) {}
    typingInstance = null;
  }

  /* Called from renderStep ONLY when window.TypingGame exists.
     TypingGame.mountStep(step, mountEl, onComplete) — the signature documented
     in the js/typing-game.js header (§2.4); there is no ctx object. It returns
     the game instance ({ destroy(), … }) and clears the mount itself, but we
     still destroy the previous instance first: the engine's own _mounted map
     only tracks per-ELEMENT reuse, and each renderStep() builds a brand-new
     #kb-step-mount, so nothing else would ever unbind the old listeners. */
  function mountTypingStep(step, index) {
    destroyTypingStep();
    const mount = document.getElementById('kb-step-mount');
    if (!mount) return;
    try {
      typingInstance = window.TypingGame.mountStep(step, mount, (result) => {
        /* key_intro completes with NO argument; typing_drill passes
           { cpm, accuracy, misses, correct, total, elapsedMs } with accuracy as
           an integer PERCENT (0–100, never a 0–1 fraction). The widget renders
           its own .kb-summary from those numbers, so the step-level handler
           deliberately displays none of them — it only has to tolerate both
           shapes, which it does by never reading `result` without a guard. */
        markDone(index, step.type);
        const b = document.getElementById('kb-continue');
        if (b) b.style.display = '';
        if (result && typeof result.cpm === 'number' && window.gtag) {
          gtag('event', 'typing_drill_complete', {
            lesson: lessonId(), step: index + 1,
            cpm: result.cpm, accuracy: result.accuracy,
          });
        }
        /* key_intro only: after the widget's "Done!" reward has had a moment to
           register, advance automatically so the learner never has to scroll
           down and click Continue between typing stages. The Continue button
           above stays revealed as a fallback. typing_drill is deliberately
           excluded — it ends on a summary card the learner should read.
           Guards: replace any prior pending timer; fire only if still on THIS
           step (currentIndex === index — any navigation or Continue click will
           have moved it and cancelled the timer); never run past the last
           step. */
        if (step.type === 'key_intro' && index + 1 < lessonData.steps.length) {
          clearTypingAdvance();
          typingAdvanceTimer = setTimeout(() => {
            typingAdvanceTimer = null;
            if (currentIndex === index) goToStep(index + 1);
          }, KEY_INTRO_ADVANCE_MS);
        }
      });
    } catch (e) {
      console.error('StepRunner: typing widget failed to mount', e);
      typingInstance = null;
    }
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

      markDone(currentIndex, 'match_quiz');

      el.classList.add('correct-pop');
      if (window.playDing) playDing();
      if (window.spawnConfetti) spawnConfetti(el);
      if (feedback) feedback.textContent = t('✓ Correct!');

      setTimeout(() => nextStep(), 1400);
    } else {
      el.disabled = true;
      el.classList.add('wrong', 'wrong-shake');
      if (feedback) feedback.textContent = t('✗ Not quite — try again!');
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

    btn.textContent = t('Next →');
    btn.onclick = nextStep;

    markDone(currentIndex, 'syllable_builder');

    if (window.playDing) playDing();
    if (window.spawnConfetti && resultEl) spawnConfetti(resultEl);
  }

  /* ── Listen-Repeat Confirm ──────────────────────────── */
  function confirmRepeat(btn) {
    markDone(currentIndex, 'listen_repeat');
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
      meta.textContent = fmt(ui('progressMeta'), {
        stage: stageId,
        total: lessonData.stages.length,
        min: timeLeft,
      });
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
      // stroke_trace gates on the widget's own completion (#sw-continue);
      // stroke_demo keeps a visible Next. key_intro / typing_drill gate the
      // same way on the TypingGame widget's #kb-continue.
      const hideTypes = ['match_quiz', 'lesson_complete', 'listen_repeat', 'stroke_trace',
        'key_intro', 'typing_drill'];
      const shouldHide = hideTypes.includes(step?.type);
      next.style.display = shouldHide ? 'none' : '';
      next.disabled = index >= lessonData.steps.length - 1;
    }
  }

  function updateCounter(index) {
    const el = document.getElementById('step-counter');
    if (el) el.textContent = `${index + 1} / ${lessonData.steps.length}`;
  }

  function updateStreakBadge() {
    const badge = document.getElementById('xp-badge');
    if (!badge || !window.KSProgress) return;
    const days = KSProgress.getStreak();
    const today = KSProgress.getTodaySteps();
    badge.textContent = '🔥 ' + t('{n}-day streak').replace('{n}', days) +
      ' · ' + t('{n} steps today').replace('{n}', today);
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
    stageStepMap = {};
    if (window.KSProgress) KSProgress.resetLessonPosition(lessonId());
    goToStep(0);
  }

  return {
    init,
    goToStep,
    handleQuizAnswer,
    revealSyllable,
    confirmRepeat,
    toggleVocabBookmark,
    stepContinue,
    /* Deprecated alias for stepContinue(), kept for one release: prompt C's
       markup called StepRunner.strokeContinue() and a cached page or an
       out-of-tree caller may still do so. Nothing in this repo references it —
       new markup must use stepContinue(). */
    strokeContinue: stepContinue,
    strokeReplay,
    restart,
  };
})();
