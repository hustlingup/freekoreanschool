/* ═══════════════════════════════════════════════════════
   TypingGame — 두벌식 (Dubeolsik) on-screen keyboard,
   typing games, and free-play pad.

   Consumes the pure automaton in js/hangul-ime.js
   (window.HangulIME) plus js/hangul-util.js
   (window.HangulUtil). Load order:

     hangul-util.js → hangul-ime.js → typing-game.js

   ── PUBLIC API ─────────────────────────────────────────

     TypingGame.initFreePlay(containerId)

       Mounts the open typing pad into document.getElementById(
       containerId). Re-callable: the previous instance in that
       container is destroyed first.

     TypingGame.mountStep(step, mountEl, onComplete)   ← THE signature

       Prompt D §2.4 offered two possible signatures. THIS is the
       one that ships, and prompt E must call exactly this:

         mountStep(step, mountEl, onComplete)

         step      plain object from learn/data/typing.json
         mountEl   an Element (or an element id string). TypingGame
                   OWNS everything inside it and clears it first.
         onComplete function, called ONCE when the step is finished.

       There is no `ctx` argument. `ctx.onComplete` from the draft
       spec is the third positional parameter instead.

       step.type === 'key_intro'
         step.jamo  array of 1–3 jamo chars
         step.reps  presses required per jamo (default 3)
         → onComplete()                       // no argument

       step.type === 'typing_drill'
         step.mode   'jamo' | 'syllable' | 'word'
         step.items  [{ ko, meaning?, romanization? }]
         step.target { count } or { seconds }
         → onComplete({ cpm, accuracy, misses, elapsedMs, correct, total })
           cpm      integer 타/분
           accuracy integer PERCENT, 0–100 (not a 0–1 fraction)

       Returns the game instance ({ destroy() , … }) so a caller can
       tear it down early; ignoring the return value is fine.

   ── IME-PROOFING (prompt D §2.2 — non-negotiable) ──────

   The play surface is a <div class="kb-capture" tabindex="0">.
   There is NO text-INPUT element, NO TEXTAREA and NO editable
   attribute anywhere in this widget, at any point, in any mode —
   deliberately phrased without the literal tag names so that a
   grep for them over this file returns exactly zero. That is the
   whole reason the feature works for a learner who has a Korean
   IME installed in the OS: with no editable element, the OS IME
   can never begin a composition, so it can never double the
   characters our own automaton produces.

   Everything keys off `KeyboardEvent.code`, never `.key`, which is
   what makes the user's physical layout and IME state irrelevant —
   `KeyR` is `KeyR` on QWERTY, AZERTY, and with 한/영 toggled on.

   On-screen key clicks and physical keydowns funnel into ONE
   function (`press`). There is deliberately no second code path.

   Because none of that is visible, the widget now SAYS it: a single
   .kb-subtitle line in every mode tells the learner no Korean keyboard
   is needed, worded for the input modality (see isTouchPrimary()). A
   tester having to ask the question was the bug. Instructions for
   actually installing an OS Korean keyboard belong in the lesson JSON,
   not here — they would contradict this design.

   ── LAYERING ───────────────────────────────────────────

   Everything above the "DOM layer" banner is pure: no document,
   no window (beyond the dependency getters), injectable clock and
   RNG. That is the part with the scoring maths and the drill
   sequencing, and it is testable under plain node by stubbing
   global.window.

   Browser-only overall, so — like js/stroke-writer.js — this file
   deliberately has NO `module.exports` tail.
═══════════════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════════════════
   TGLabels — UI strings + the 8-language detection ladder.

   Mirrors SWLabels in js/stroke-writer.js exactly. EN is the
   baseline AND the fallback. Prompt F2 localises by adding a
   sibling object keyed by the code the ladder returns ('ja',
   'zh-tw', 'es', 'de', 'fr', 'vi', 'th', 'id'); labels() merges
   it over EN, so a missing key degrades to English rather than
   `undefined`.

   Do NOT translate: the 타/분 unit label (it is the Korean
   convention being taught) and the ⇧ ⌫ ␣ key glyphs.
═══════════════════════════════════════════════════════ */
const TGLabels = (() => {

  /* 8-language detection ladder (copied from js/step-runner.js _detectLang) */
  function detectLang() {
    const lmLang = (typeof window !== 'undefined' && window.LangManager) ? window.LangManager.getLang() : null;
    if (lmLang && lmLang !== 'en') return lmLang;
    const htmlLang = (typeof document !== 'undefined' && document.documentElement.lang)
      ? document.documentElement.lang.toLowerCase() : '';
    if (htmlLang === 'zh-tw' || htmlLang.indexOf('zh') === 0) return 'zh-tw';
    if (htmlLang === 'ja') return 'ja';
    if (htmlLang === 'es') return 'es';
    if (htmlLang === 'fr') return 'fr';
    if (htmlLang === 'de') return 'de';
    if (htmlLang === 'vi') return 'vi';
    if (htmlLang === 'th') return 'th';
    if (htmlLang === 'id') return 'id';
    return lmLang || 'en';
  }

  const LABELS = {
    en: {
      title:        'Korean typing pad',
      /* The one-line answer to "do I need to install a Korean keyboard?".
         The answer is NO in both modalities — this widget never uses an
         editable element and reads KeyboardEvent.code, so the OS IME is
         irrelevant. Only the WORDING differs; see isTouchPrimary(). */
      hintTouch:    'Tap the keys below — no Korean keyboard needed.',
      hintKeyboard: 'Type on your own keyboard — no Korean keyboard needed.',
      focusHint:    'Click here, then type',
      clear:        'Clear',
      restart:      'Restart',
      shiftKey:     'Shift',
      backspaceKey: 'Backspace',
      spaceKey:     'Space',
      /* Reference-key names — spoken by screen readers only; the visible legends
         (Tab, Ctrl, 한/영 …) are keyboard prints, not translatable UI copy. */
      enterKey:     'Enter',
      tabKey:       'Tab',
      capsKey:      'Caps Lock',
      ctrlKey:      'Control',
      altKey:       'Alt',
      winKey:       'Windows key',
      hanyeongKey:  'Han/Eng key (한/영) — toggles the OS Korean IME',
      hanjaKey:     'Hanja key (한자) — Chinese-character conversion',
      modeFree:     'Free typing',
      modeJamo:     '10 letters',
      modeSyllable: '5 syllables',
      modeWord:     '5 words',
      statTime:     'Time',
      statCpm:      'CPM (타/분)',
      statAcc:      'Accuracy',
      statStreak:   'Streak',
      promptJamo:   'Press this key',
      promptSyll:   'Type this syllable',
      promptWord:   'Type this word, then press Space',
      promptIntro:  'Press this key {n} more time(s)',
      progress:     '{n} / {t}',
      /* key_intro (find-the-key) only. {k} is the physical QWERTY key glyph,
         e.g. "R" or "⇧ R" — rendered as a keycap chip, so the label is just the
         verb around the {k} slot. introReps is the aria label on the rep dots. */
      introKey:     'Press {k}',
      introTimes:   ' × {n} times',
      introReps:    '{n} of {t} presses',
      ready:        'Press any key to start',
      correct:      'Correct!',
      wrongKey:     'Not that key — try again',
      wrongWord:    'You typed {got} — the answer was {want}',
      summaryTitle: 'Round complete',
      summaryAgain: 'Play again',
      misses:       'Misses',
      done:         'Done!',
      keyboardName: 'Korean keyboard',
      captureName:  'Typing area — click, then type',
      /* Touch variant of captureName: focusing a tabindex div does NOT raise
         the OS keyboard on a phone (deliberate), so "click, then type" would
         send a screen-reader user hunting for a keyboard that never appears. */
      captureNameTouch: 'Typing area — tap the keys below to type',
    },

    ja: {
      title:        'ハングル入力パッド',
      hintTouch:    '下のキーをタップ — 韓国語キーボードは不要です。',
      hintKeyboard: 'お使いのキーボードで入力 — 韓国語キーボードは不要です。',
      focusHint:    'ここをクリックして入力',
      clear:        'クリア',
      restart:      'やり直す',
      shiftKey:     'シフト',
      backspaceKey: 'バックスペース',
      spaceKey:     'スペース',
      enterKey:     'エンター',
      tabKey:       'タブ',
      capsKey:      'キャップスロック',
      ctrlKey:      'コントロール',
      altKey:       'オルト',
      winKey:       'Windowsキー',
      hanyeongKey:  '한/영キー（ハングル/英字）— OSの韓国語IMEを切り替え',
      hanjaKey:     '한자キー（漢字）— 漢字変換',
      modeFree:     'フリー入力',
      modeJamo:     '10文字',
      modeSyllable: '5音節',
      modeWord:     '5単語',
      statTime:     '時間',
      statCpm:      '打/分（타/분）',
      statAcc:      '正確率',
      statStreak:   '連続',
      promptJamo:   'このキーを押す',
      promptSyll:   'この文字を入力',
      promptWord:   'この単語を入力してスペースを押す',
      promptIntro:  'あと{n}回押す',
      progress:     '{n} / {t}',
      introKey:     '{k} を押す',
      introTimes:   ' × {n}回',
      introReps:    '{t}回中{n}回',
      ready:        'キーを押して開始',
      correct:      '正解！',
      wrongKey:     'そのキーではありません — もう一度',
      wrongWord:    '入力: {got} — 正解は {want}',
      summaryTitle: 'ラウンド完了',
      summaryAgain: 'もう一度',
      misses:       'ミス',
      done:         '完了！',
      keyboardName: '韓国語キーボード',
      captureName:  '入力エリア — クリックして入力',
      captureNameTouch: '入力エリア — 下のキーをタップして入力',
    },

    'zh-tw': {
      title:        '韓文打字板',
      hintTouch:    '點擊下方按鍵 — 不需要韓文鍵盤。',
      hintKeyboard: '用你自己的鍵盤輸入 — 不需要韓文鍵盤。',
      focusHint:    '點此後開始打字',
      clear:        '清除',
      restart:      '重新開始',
      shiftKey:     'Shift 鍵',
      backspaceKey: '退格鍵',
      spaceKey:     '空白鍵',
      enterKey:     'Enter 鍵',
      tabKey:       'Tab 鍵',
      capsKey:      '大寫鎖定鍵',
      ctrlKey:      'Control 鍵',
      altKey:       'Alt 鍵',
      winKey:       'Windows 鍵',
      hanyeongKey:  '한/영 鍵（韓/英）— 切換作業系統的韓文輸入法',
      hanjaKey:     '한자 鍵（漢字）— 漢字轉換',
      modeFree:     '自由輸入',
      modeJamo:     '10 個字母',
      modeSyllable: '5 個音節',
      modeWord:     '5 個單字',
      statTime:     '時間',
      statCpm:      '打/分鐘（타/분）',
      statAcc:      '準確率',
      statStreak:   '連續',
      promptJamo:   '按下這個鍵',
      promptSyll:   '輸入這個音節',
      promptWord:   '輸入這個單字，然後按空白鍵',
      promptIntro:  '再按這個鍵 {n} 次',
      progress:     '{n} / {t}',
      introKey:     '按 {k}',
      introTimes:   ' × {n} 次',
      introReps:    '{t} 次中 {n} 次',
      ready:        '按任意鍵開始',
      correct:      '正確！',
      wrongKey:     '不是這個鍵 — 再試一次',
      wrongWord:    '你輸入了 {got} — 正確答案是 {want}',
      summaryTitle: '回合完成',
      summaryAgain: '再玩一次',
      misses:       '錯誤',
      done:         '完成！',
      keyboardName: '韓文鍵盤',
      captureName:  '輸入區 — 點擊後開始打字',
      captureNameTouch: '輸入區 — 點擊下方按鍵來輸入',
    },

    es: {
      title:        'Teclado de escritura coreana',
      hintTouch:    'Toca las teclas de abajo: no necesitas un teclado coreano.',
      hintKeyboard: 'Escribe con tu propio teclado: no necesitas un teclado coreano.',
      focusHint:    'Haz clic aquí y escribe',
      clear:        'Borrar',
      restart:      'Reiniciar',
      shiftKey:     'Mayús',
      backspaceKey: 'Retroceso',
      spaceKey:     'Espacio',
      enterKey:     'Intro',
      tabKey:       'Tabulador',
      capsKey:      'Bloq Mayús',
      ctrlKey:      'Control',
      altKey:       'Alt',
      winKey:       'Tecla Windows',
      hanyeongKey:  'Tecla Han/Ing (한/영): cambia el IME coreano del sistema',
      hanjaKey:     'Tecla Hanja (한자): conversión a caracteres chinos',
      modeFree:     'Escritura libre',
      modeJamo:     '10 letras',
      modeSyllable: '5 sílabas',
      modeWord:     '5 palabras',
      statTime:     'Tiempo',
      statCpm:      'PPM (타/분)',
      statAcc:      'Precisión',
      statStreak:   'Racha',
      promptJamo:   'Pulsa esta tecla',
      promptSyll:   'Escribe esta sílaba',
      promptWord:   'Escribe esta palabra y pulsa Espacio',
      promptIntro:  'Pulsa esta tecla {n} vez(ces) más',
      progress:     '{n} / {t}',
      introKey:     'Pulsa {k}',
      introTimes:   ' × {n} veces',
      introReps:    '{n} de {t} pulsaciones',
      ready:        'Pulsa cualquier tecla para empezar',
      correct:      '¡Correcto!',
      wrongKey:     'Esa tecla no: inténtalo de nuevo',
      wrongWord:    'Escribiste {got}: la respuesta era {want}',
      summaryTitle: 'Ronda completada',
      summaryAgain: 'Jugar de nuevo',
      misses:       'Fallos',
      done:         '¡Listo!',
      keyboardName: 'Teclado coreano',
      captureName:  'Área de escritura: haz clic y escribe',
      captureNameTouch: 'Área de escritura: toca las teclas de abajo para escribir',
    },

    fr: {
      title:        'Clavier de saisie coréenne',
      hintTouch:    'Touchez les touches ci-dessous — aucun clavier coréen requis.',
      hintKeyboard: 'Tapez avec votre propre clavier — aucun clavier coréen requis.',
      focusHint:    'Cliquez ici, puis tapez',
      clear:        'Effacer',
      restart:      'Recommencer',
      shiftKey:     'Maj',
      backspaceKey: 'Retour arrière',
      spaceKey:     'Espace',
      enterKey:     'Entrée',
      tabKey:       'Tabulation',
      capsKey:      'Verr. Maj',
      ctrlKey:      'Contrôle',
      altKey:       'Alt',
      winKey:       'Touche Windows',
      hanyeongKey:  'Touche Han/Ang (한/영) — bascule l\'IME coréen du système',
      hanjaKey:     'Touche Hanja (한자) — conversion en caractères chinois',
      modeFree:     'Saisie libre',
      modeJamo:     '10 lettres',
      modeSyllable: '5 syllabes',
      modeWord:     '5 mots',
      statTime:     'Temps',
      statCpm:      'FPM (타/분)',
      statAcc:      'Précision',
      statStreak:   'Série',
      promptJamo:   'Appuyez sur cette touche',
      promptSyll:   'Tapez cette syllabe',
      promptWord:   'Tapez ce mot, puis appuyez sur Espace',
      promptIntro:  'Appuyez encore {n} fois sur cette touche',
      progress:     '{n} / {t}',
      introKey:     'Appuyez sur {k}',
      introTimes:   ' × {n} fois',
      introReps:    '{n} sur {t} frappes',
      ready:        'Appuyez sur une touche pour commencer',
      correct:      'Correct !',
      wrongKey:     'Pas cette touche — réessayez',
      wrongWord:    'Vous avez tapé {got} — la réponse était {want}',
      summaryTitle: 'Manche terminée',
      summaryAgain: 'Rejouer',
      misses:       'Erreurs',
      done:         'Terminé !',
      keyboardName: 'Clavier coréen',
      captureName:  'Zone de saisie — cliquez, puis tapez',
      captureNameTouch: 'Zone de saisie — touchez les touches ci-dessous pour taper',
    },

    de: {
      title:        'Koreanisches Tippfeld',
      hintTouch:    'Tippe auf die Tasten unten — keine koreanische Tastatur nötig.',
      hintKeyboard: 'Tippe auf deiner eigenen Tastatur — keine koreanische Tastatur nötig.',
      focusHint:    'Hier klicken, dann tippen',
      clear:        'Löschen',
      restart:      'Neu starten',
      shiftKey:     'Umschalt',
      backspaceKey: 'Rücktaste',
      spaceKey:     'Leertaste',
      enterKey:     'Eingabe',
      tabKey:       'Tabulator',
      capsKey:      'Feststelltaste',
      ctrlKey:      'Strg',
      altKey:       'Alt',
      winKey:       'Windows-Taste',
      hanyeongKey:  'Han/Eng-Taste (한/영) — schaltet das koreanische IME des Systems um',
      hanjaKey:     'Hanja-Taste (한자) — Umwandlung in chinesische Schriftzeichen',
      modeFree:     'Freies Tippen',
      modeJamo:     '10 Buchstaben',
      modeSyllable: '5 Silben',
      modeWord:     '5 Wörter',
      statTime:     'Zeit',
      statCpm:      'ApM (타/분)',
      statAcc:      'Genauigkeit',
      statStreak:   'Serie',
      promptJamo:   'Drücke diese Taste',
      promptSyll:   'Tippe diese Silbe',
      promptWord:   'Tippe dieses Wort, dann drücke die Leertaste',
      promptIntro:  'Drücke diese Taste noch {n}-mal',
      progress:     '{n} / {t}',
      introKey:     'Drücke {k}',
      introTimes:   ' × {n}-mal',
      introReps:    '{n} von {t} Anschlägen',
      ready:        'Drücke eine Taste zum Starten',
      correct:      'Richtig!',
      wrongKey:     'Nicht diese Taste — versuch es nochmal',
      wrongWord:    'Du hast {got} getippt — die Antwort war {want}',
      summaryTitle: 'Runde abgeschlossen',
      summaryAgain: 'Nochmal spielen',
      misses:       'Fehler',
      done:         'Fertig!',
      keyboardName: 'Koreanische Tastatur',
      captureName:  'Schreibbereich — klicken, dann tippen',
      captureNameTouch: 'Schreibbereich — tippe auf die Tasten unten zum Schreiben',
    },

    vi: {
      title:        'Bảng gõ tiếng Hàn',
      hintTouch:    'Chạm vào các phím bên dưới — không cần bàn phím tiếng Hàn.',
      hintKeyboard: 'Gõ bằng bàn phím của bạn — không cần bàn phím tiếng Hàn.',
      focusHint:    'Nhấp vào đây rồi gõ',
      clear:        'Xóa',
      restart:      'Bắt đầu lại',
      shiftKey:     'Phím Shift',
      backspaceKey: 'Phím xóa lùi',
      spaceKey:     'Phím cách',
      enterKey:     'Phím Enter',
      tabKey:       'Phím Tab',
      capsKey:      'Phím Caps Lock',
      ctrlKey:      'Phím Control',
      altKey:       'Phím Alt',
      winKey:       'Phím Windows',
      hanyeongKey:  'Phím Han/Anh (한/영) — chuyển đổi IME tiếng Hàn của hệ điều hành',
      hanjaKey:     'Phím Hanja (한자) — chuyển đổi chữ Hán',
      modeFree:     'Gõ tự do',
      modeJamo:     '10 chữ cái',
      modeSyllable: '5 âm tiết',
      modeWord:     '5 từ',
      statTime:     'Thời gian',
      statCpm:      'Ký tự/phút (타/분)',
      statAcc:      'Độ chính xác',
      statStreak:   'Chuỗi',
      promptJamo:   'Nhấn phím này',
      promptSyll:   'Gõ âm tiết này',
      promptWord:   'Gõ từ này, rồi nhấn phím cách',
      promptIntro:  'Nhấn phím này thêm {n} lần nữa',
      progress:     '{n} / {t}',
      introKey:     'Nhấn {k}',
      introTimes:   ' × {n} lần',
      introReps:    '{n} trên {t} lần nhấn',
      ready:        'Nhấn phím bất kỳ để bắt đầu',
      correct:      'Chính xác!',
      wrongKey:     'Không phải phím đó — thử lại',
      wrongWord:    'Bạn đã gõ {got} — đáp án là {want}',
      summaryTitle: 'Hoàn thành vòng',
      summaryAgain: 'Chơi lại',
      misses:       'Lỗi',
      done:         'Xong!',
      keyboardName: 'Bàn phím tiếng Hàn',
      captureName:  'Khu vực gõ — nhấp rồi gõ',
      captureNameTouch: 'Khu vực gõ — chạm các phím bên dưới để gõ',
    },

    th: {
      title:        'แป้นพิมพ์ภาษาเกาหลี',
      hintTouch:    'แตะปุ่มด้านล่าง — ไม่ต้องใช้แป้นพิมพ์เกาหลี',
      hintKeyboard: 'พิมพ์ด้วยแป้นพิมพ์ของคุณ — ไม่ต้องใช้แป้นพิมพ์เกาหลี',
      focusHint:    'คลิกที่นี่แล้วพิมพ์',
      clear:        'ล้าง',
      restart:      'เริ่มใหม่',
      shiftKey:     'ปุ่ม Shift',
      backspaceKey: 'ปุ่ม Backspace',
      spaceKey:     'ปุ่มเว้นวรรค',
      enterKey:     'ปุ่ม Enter',
      tabKey:       'ปุ่ม Tab',
      capsKey:      'ปุ่ม Caps Lock',
      ctrlKey:      'ปุ่ม Control',
      altKey:       'ปุ่ม Alt',
      winKey:       'ปุ่ม Windows',
      hanyeongKey:  'ปุ่ม Han/Eng (한/영) — สลับ IME ภาษาเกาหลีของระบบ',
      hanjaKey:     'ปุ่ม Hanja (한자) — แปลงเป็นอักษรจีน',
      modeFree:     'พิมพ์อิสระ',
      modeJamo:     '10 ตัวอักษร',
      modeSyllable: '5 พยางค์',
      modeWord:     '5 คำ',
      statTime:     'เวลา',
      statCpm:      'ตัว/นาที (타/분)',
      statAcc:      'ความแม่นยำ',
      statStreak:   'ต่อเนื่อง',
      promptJamo:   'กดปุ่มนี้',
      promptSyll:   'พิมพ์พยางค์นี้',
      promptWord:   'พิมพ์คำนี้ แล้วกดเว้นวรรค',
      promptIntro:  'กดปุ่มนี้อีก {n} ครั้ง',
      progress:     '{n} / {t}',
      introKey:     'กด {k}',
      introTimes:   ' × {n} ครั้ง',
      introReps:    '{n} จาก {t} ครั้ง',
      ready:        'กดปุ่มใดก็ได้เพื่อเริ่ม',
      correct:      'ถูกต้อง!',
      wrongKey:     'ไม่ใช่ปุ่มนั้น — ลองอีกครั้ง',
      wrongWord:    'คุณพิมพ์ {got} — คำตอบคือ {want}',
      summaryTitle: 'จบรอบ',
      summaryAgain: 'เล่นอีกครั้ง',
      misses:       'พลาด',
      done:         'เสร็จ!',
      keyboardName: 'แป้นพิมพ์ภาษาเกาหลี',
      captureName:  'พื้นที่พิมพ์ — คลิกแล้วพิมพ์',
      captureNameTouch: 'พื้นที่พิมพ์ — แตะปุ่มด้านล่างเพื่อพิมพ์',
    },

    id: {
      title:        'Papan ketik Korea',
      hintTouch:    'Ketuk tombol di bawah — tidak perlu papan ketik Korea.',
      hintKeyboard: 'Ketik dengan papan ketik Anda sendiri — tidak perlu papan ketik Korea.',
      focusHint:    'Klik di sini, lalu ketik',
      clear:        'Hapus',
      restart:      'Mulai ulang',
      shiftKey:     'Shift',
      backspaceKey: 'Backspace',
      spaceKey:     'Spasi',
      enterKey:     'Enter',
      tabKey:       'Tab',
      capsKey:      'Caps Lock',
      ctrlKey:      'Control',
      altKey:       'Alt',
      winKey:       'Tombol Windows',
      hanyeongKey:  'Tombol Han/Ing (한/영) — mengalihkan IME Korea sistem',
      hanjaKey:     'Tombol Hanja (한자) — konversi karakter Tionghoa',
      modeFree:     'Ketik bebas',
      modeJamo:     '10 huruf',
      modeSyllable: '5 suku kata',
      modeWord:     '5 kata',
      statTime:     'Waktu',
      statCpm:      'KPM (타/분)',
      statAcc:      'Akurasi',
      statStreak:   'Rentetan',
      promptJamo:   'Tekan tombol ini',
      promptSyll:   'Ketik suku kata ini',
      promptWord:   'Ketik kata ini, lalu tekan Spasi',
      promptIntro:  'Tekan tombol ini {n} kali lagi',
      progress:     '{n} / {t}',
      introKey:     'Tekan {k}',
      introTimes:   ' × {n} kali',
      introReps:    '{n} dari {t} ketukan',
      ready:        'Tekan tombol apa saja untuk mulai',
      correct:      'Benar!',
      wrongKey:     'Bukan tombol itu — coba lagi',
      wrongWord:    'Anda mengetik {got} — jawabannya {want}',
      summaryTitle: 'Ronde selesai',
      summaryAgain: 'Main lagi',
      misses:       'Salah',
      done:         'Selesai!',
      keyboardName: 'Papan ketik Korea',
      captureName:  'Area ketik — klik, lalu ketik',
      captureNameTouch: 'Area ketik — ketuk tombol di bawah untuk mengetik',
    },
  };

  function labels() {
    const lang = detectLang();
    return Object.assign({}, LABELS.en, LABELS[lang] || {});
  }

  return { detectLang: detectLang, labels: labels, LABELS: LABELS };
})();

if (typeof window !== 'undefined') window.TGLabels = TGLabels;


const TypingGame = (() => {

  /* ── Dependencies (fail soft) ─────────────────────── */
  function IME() { return (typeof window !== 'undefined') ? window.HangulIME  : null; }
  function U()   { return (typeof window !== 'undefined') ? window.HangulUtil : null; }

  let _warned = false;
  function deps() {
    const i = IME(), u = U();
    if (!i || !u) {
      if (!_warned) {
        _warned = true;
        console.error('TypingGame: missing dependency — ' +
          (!u ? 'window.HangulUtil ' : '') + (!i ? 'window.HangulIME ' : '') +
          '(load js/hangul-util.js and js/hangul-ime.js before js/typing-game.js)');
      }
      return null;
    }
    return { i: i, u: u };
  }
  deps(); // surface the problem at load time, not on first keystroke

  function keymap() {
    const d = deps();
    return (d && d.i.KEYMAP) ? d.i.KEYMAP : {};
  }

  function esc(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function fill(tpl, vars) {
    let s = String(tpl == null ? '' : tpl);
    Object.keys(vars || {}).forEach(k => { s = s.split('{' + k + '}').join(String(vars[k])); });
    return s;
  }


  /* ═══════════════════════════════════════════════════
     PURE LAYER — scoring, sequencing, drill maths.
     No DOM. Injectable clock + RNG. Node-testable.
     ═══════════════════════════════════════════════════ */

  /* Korean convention: 타/분 — characters (jamo keystrokes) per
     minute. NOT English WPM: there is no ÷5 anywhere in this file,
     and there must never be one. A Korean learner comparing their
     number against any Korean typing site expects 타수.
     Only CORRECT keystrokes count toward speed; the wrong ones are
     already punished by the accuracy figure. */
  function computeCPM(correctKeystrokes, elapsedMs) {
    const c = Number(correctKeystrokes) || 0;
    const e = Number(elapsedMs) || 0;
    if (!(e > 0) || !(c > 0)) return 0;
    return Math.round(c / (e / 60000));
  }

  /* Integer PERCENT, 0–100. An empty round reads 100%, not 0% or
     NaN — nothing has gone wrong yet. */
  function computeAccuracy(correct, total) {
    const t = Number(total) || 0;
    if (!(t > 0)) return 100;
    const c = Number(correct) || 0;
    return Math.round((c / t) * 100);
  }

  /* Scoreboard for one round. `now` is injectable so the maths can
     be driven by a fake clock in tests. The clock starts on the
     FIRST keystroke, not when the round is mounted — otherwise the
     time a learner spends reading the prompt destroys their CPM. */
  function createSession(opts) {
    const o = opts || {};
    const now = (typeof o.now === 'function') ? o.now : function () { return Date.now(); };
    let startedAt = 0, stoppedAt = 0;
    let total = 0, correct = 0, misses = 0, streak = 0, best = 0;

    function start()  { if (!startedAt) startedAt = now(); }
    function stop()   { if (startedAt && !stoppedAt) stoppedAt = now(); }
    function elapsedMs() { return startedAt ? ((stoppedAt || now()) - startedAt) : 0; }

    function record(ok) {
      start();
      total++;
      if (ok) { correct++; streak++; if (streak > best) best = streak; }
      else    { misses++; streak = 0; }
    }

    function stats() {
      const e = elapsedMs();
      return {
        elapsedMs: e,
        cpm: computeCPM(correct, e),
        accuracy: computeAccuracy(correct, total),
        correct: correct, total: total, misses: misses,
        streak: streak, bestStreak: best,
      };
    }

    function reset() {
      startedAt = 0; stoppedAt = 0;
      total = 0; correct = 0; misses = 0; streak = 0; best = 0;
    }

    return {
      start: start, stop: stop, record: record, stats: stats, reset: reset,
      get started() { return !!startedAt; },
      get stopped() { return !!stoppedAt; },
    };
  }

  /* Weighted sampling WITH replacement. Pure given `rnd`. */
  function weightedPick(list, weights, rnd) {
    if (!list || !list.length) return null;
    const r = (typeof rnd === 'function') ? rnd : Math.random;
    let sum = 0;
    for (let i = 0; i < list.length; i++) sum += (weights && weights[i] > 0) ? weights[i] : 0;
    if (!(sum > 0)) return list[Math.floor(r() * list.length) % list.length];
    let t = r() * sum;
    for (let i = 0; i < list.length; i++) {
      const w = (weights && weights[i] > 0) ? weights[i] : 0;
      t -= w;
      if (t <= 0) return list[i];
    }
    return list[list.length - 1];
  }

  /* Prompt D §2.3: "weight recently-missed keys 2×".
     `recent` is a Set (or array) of jamo the learner has fumbled in
     this session; membership doubles the draw weight. The
     no-immediate-repeat retry is cosmetic (a drill that shows ㄱ
     four times in a row reads as broken) and is skipped for pools
     smaller than 3, where it would flatten the weighting into a
     forced alternation. */
  const MISS_WEIGHT = 2;
  const RECENT_MISS_CAP = 8;

  function buildJamoQueue(pool, count, recent, rnd) {
    const list = (pool || []).filter(Boolean);
    const n = Math.max(0, Math.floor(Number(count) || 0));
    if (!list.length || !n) return [];
    const r = (typeof rnd === 'function') ? rnd : Math.random;
    const seen = (recent && typeof recent.has === 'function') ? recent : new Set(recent || []);
    const weights = list.map(j => (seen.has(j) ? MISS_WEIGHT : 1));
    const out = [];
    for (let i = 0; i < n; i++) {
      let pick = weightedPick(list, weights, r);
      if (list.length >= 3) {
        for (let t = 0; t < 3 && pick === out[out.length - 1]; t++) pick = weightedPick(list, weights, r);
      }
      out.push(pick);
    }
    return out;
  }

  /* Syllable drill auto-advance test (§2.3): EXACT match on the
     in-progress block only. A prefix must NOT pass — while typing
     간, ime.current() passes through 'ㄱ' and '가', and advancing on
     either would let the learner skip the batchim entirely. */
  function matchesSyllable(current, target) {
    return !!target && current === target;
  }

  /* Is this jamo reachable with ONE Dubeolsik keystroke?
     True for all 33 KEYMAP values — including the doubles
     ㄲㄸㅃㅆㅉ and ㅐㅔㅒㅖ, which have their own keys and must never
     be decomposed into two keystrokes. */
  let _typeable = null;
  function typeableJamo() {
    if (_typeable) return _typeable;
    const set = new Set();
    const KM = keymap();
    Object.keys(KM).forEach(code => (KM[code] || []).forEach(j => { if (j) set.add(j); }));
    if (set.size) _typeable = set;
    return set;
  }

  /* Inverse of HangulUtil.JUNG_COMBINE, built lazily. Note this
     contains ㅐㅒㅔㅖ too ('ㅏㅣ'→'ㅐ'), which is why expandJamo()
     checks typeability FIRST — those are one key, not two. */
  let _jungSplit = null;
  function jungSplit() {
    if (_jungSplit) return _jungSplit;
    const d = deps();
    const map = {};
    if (d) Object.keys(d.u.JUNG_COMBINE).forEach(pair => { map[d.u.JUNG_COMBINE[pair]] = [pair[0], pair[1]]; });
    _jungSplit = map;
    return map;
  }

  /* One jamo → the keystrokes it costs. Recursive: ㅙ → ㅗ + ㅐ
     (ㅐ is typeable, so it stops there). */
  function expandJamo(j) {
    if (!j) return [];
    if (typeableJamo().has(j)) return [j];
    const d = deps();
    const js = jungSplit()[j];
    if (js) return expandJamo(js[0]).concat(expandJamo(js[1]));
    const cs = d ? d.u.JONG_SPLIT[j] : null;
    if (cs) return expandJamo(cs[0]).concat(expandJamo(cs[1]));
    return [j];
  }

  /* Text → the exact jamo keystroke sequence a Dubeolsik typist
     produces for it. This is the yardstick every keystroke in the
     syllable and word drills is scored against, so accuracy is a
     real per-key measurement rather than a per-word one.
     Non-hangul (spaces, punctuation) is skipped — the drills never
     ask for it. */
  function jamoSequence(text) {
    const d = deps();
    if (!d || !text) return [];
    const out = [];
    Array.from(String(text)).forEach(ch => {
      if (d.u.isSyllable(ch)) {
        const p = d.u.decompose(ch);
        if (!p) return;
        expandJamo(p.cho).forEach(x => out.push(x));
        expandJamo(p.jung).forEach(x => out.push(x));
        if (p.jong) expandJamo(p.jong).forEach(x => out.push(x));
      } else if (d.u.isJamo(ch)) {
        expandJamo(ch).forEach(x => out.push(x));
      }
    });
    return out;
  }

  /* Prompt D §2.5 default word list, verbatim, plus the meaning and
     romanization the word drill displays. */
  const DEFAULT_WORDS = [
    { ko: '한국', meaning: 'Korea',        romanization: 'hanguk' },
    { ko: '사랑', meaning: 'love',         romanization: 'sarang' },
    { ko: '감사', meaning: 'thanks',       romanization: 'gamsa' },
    { ko: '안녕', meaning: 'hello',        romanization: 'annyeong' },
    { ko: '김치', meaning: 'kimchi',       romanization: 'gimchi' },
    { ko: '학교', meaning: 'school',       romanization: 'hakgyo' },
    { ko: '친구', meaning: 'friend',       romanization: 'chingu' },
    { ko: '물',   meaning: 'water',        romanization: 'mul' },
    { ko: '밥',   meaning: 'rice, a meal', romanization: 'bap' },
    { ko: '집',   meaning: 'house',        romanization: 'jip' },
  ];

  const DEFAULT_SYLLABLES = [
    { ko: '가', romanization: 'ga' }, { ko: '나', romanization: 'na' },
    { ko: '다', romanization: 'da' }, { ko: '마', romanization: 'ma' },
    { ko: '바', romanization: 'ba' }, { ko: '사', romanization: 'sa' },
    { ko: '자', romanization: 'ja' }, { ko: '하', romanization: 'ha' },
    { ko: '한', romanization: 'han' }, { ko: '국', romanization: 'guk' },
    { ko: '밥', romanization: 'bap' }, { ko: '물', romanization: 'mul' },
    { ko: '집', romanization: 'jip' }, { ko: '김', romanization: 'gim' },
    { ko: '와', romanization: 'wa' }, { ko: '의', romanization: 'ui' },
  ];

  /* Shifted-only jamo: excluded from jamo drills unless
     opts.includeShift (§2.3). */
  const SHIFT_ONLY = ['ㅃ', 'ㅉ', 'ㄸ', 'ㄲ', 'ㅆ', 'ㅒ', 'ㅖ'];

  function jamoPool(includeShift) {
    const KM = keymap();
    const out = [];
    Object.keys(KM).forEach(code => {
      const pair = KM[code] || [];
      if (pair[0] && out.indexOf(pair[0]) === -1) out.push(pair[0]);
      if (includeShift && pair[1] && out.indexOf(pair[1]) === -1) out.push(pair[1]);
    });
    return out;
  }

  function sample(list, n, rnd) {
    const r = (typeof rnd === 'function') ? rnd : Math.random;
    const pool = (list || []).slice();
    const out = [];
    while (pool.length && out.length < n) out.push(pool.splice(Math.floor(r() * pool.length), 1)[0]);
    return out;
  }


  /* ═══════════════════════════════════════════════════
     DOM LAYER
     ═══════════════════════════════════════════════════ */

  /* ── Realistic full ANSI board (Dubeolsik 2-set legends) ──────────────
     Five rows. Three kinds of key:

       'jamo' — one of the 26 KEYMAP letter positions. DUAL legend: the hangul
                jamo big (via .kb-jamo) + the QWERTY letter small in the corner
                (.kb-latin). These are FUNCTIONAL — they route to the IME.
       'sym'  — a number / punctuation key. Two English/symbol legends only
                (shifted on top, base below); NO Korean. REFERENCE-ONLY: shown
                so the learner sees a real keyboard, but INERT.
       'mod'  — a modifier / function key (Tab, Enter, Shift, …). Text/glyph
                label. Shift ×2, Backspace, Enter, Space are FUNCTIONAL; the
                rest (Tab, Caps, Ctrl ×2, Alt ×2, Win) are REFERENCE-ONLY.

     Authenticity detail a real Korean keyboard prints: RIGHT Alt is 한/영 (IME
     toggle) and RIGHT Ctrl is 한자 (Hanja conversion).

     Two functional keys need to sit in different rows on desktop vs. a compact
     phone board, so they are declared twice — a desktop instance (only:'desk')
     and a mobile instance (only:'mob') sharing the SAME data-code. keyEls maps
     each code to an ARRAY precisely so both instances light/flash together. */

  const SPECIAL_GLYPH = { ShiftLeft: '⇧', ShiftRight: '⇧', Backspace: '⌫', Enter: '⏎', Space: '␣' };
  const FLASH_MS = 140;

  /* Module-level: set true the first time ANY .kb-capture receives focus. Once
     the learner has clicked in, every subsequently-mounted widget (e.g. the next
     lesson step, which re-renders the whole widget) auto-focuses so the "Click
     here, then type" veil never reappears — they engage once, not per step. */
  let keyboardEngaged = false;

  /* Reference symbol keys → [shifted (top), base (bottom)]. All inert. */
  const SYM_KEYS = {
    Backquote:['~','`'], Digit1:['!','1'], Digit2:['@','2'], Digit3:['#','3'],
    Digit4:['$','4'], Digit5:['%','5'], Digit6:['^','6'], Digit7:['&','7'],
    Digit8:['*','8'], Digit9:['(','9'], Digit0:[')','0'], Minus:['_','-'], Equal:['+','='],
    BracketLeft:['{','['], BracketRight:['}',']'], Backslash:['|','\\'],
    Semicolon:[':',';'], Quote:['"',"'"], Comma:['<',','], Period:['>','.'], Slash:['?','/'],
  };

  /* Modifier / function keys. `w` = width in "u" (1u = one letter key).
     ref:true → inert reference key. only:'desk'|'mob' → shown on that form
     factor only (the two duplicated functional keys). cls → extra hook. */
  const MOD_KEYS = {
    Tab:          { code:'Tab',          glyph:'⇥', label:'Tab',       w:1.5,  ref:true, aria:'tabKey' },
    CapsLock:     { code:'CapsLock',     glyph:'⇪', label:'Caps',      w:1.75, ref:true, aria:'capsKey' },
    Backspace:    { code:'Backspace',    label:'Backspace', w:2,    aria:'backspaceKey', only:'desk' },
    BackspaceMob: { code:'Backspace',    label:'Backspace', w:1.5,  aria:'backspaceKey', only:'mob' },
    Enter:        { code:'Enter',        glyph:'⏎', label:'Enter',     w:2.25, aria:'enterKey', only:'desk' },
    EnterMob:     { code:'Enter',        glyph:'⏎', label:'Enter',     w:1.75, aria:'enterKey', only:'mob' },
    ShiftLeft:    { code:'ShiftLeft',    glyph:'⇧', label:'Shift',     w:2.25, aria:'shiftKey', cls:'kb-key--shift-l' },
    ShiftRight:   { code:'ShiftRight',   glyph:'⇧', label:'Shift',     w:2.75, aria:'shiftKey', only:'desk' },
    ControlLeft:  { code:'ControlLeft',  label:'Ctrl',  w:1.25, ref:true, aria:'ctrlKey' },
    MetaLeft:     { code:'MetaLeft',     glyph:'⊞', label:'Win', w:1.25, ref:true, aria:'winKey' },
    AltLeft:      { code:'AltLeft',      label:'Alt',   w:1.25, ref:true, aria:'altKey' },
    Space:        { code:'Space',        label:'Space', w:6.25, aria:'spaceKey', cls:'kb-key--space' },
    AltRight:     { code:'AltRight',     label:'한/영', w:1.25, ref:true, aria:'hanyeongKey' },
    ControlRight: { code:'ControlRight', label:'한자',  w:1.25, ref:true, aria:'hanjaKey' },
  };

  /* Row layout: each entry is [kind, id]. */
  const KB_LAYOUT = [
    /* row 0 — numbers (all reference) + Backspace */
    [['sym','Backquote'],['sym','Digit1'],['sym','Digit2'],['sym','Digit3'],['sym','Digit4'],
     ['sym','Digit5'],['sym','Digit6'],['sym','Digit7'],['sym','Digit8'],['sym','Digit9'],
     ['sym','Digit0'],['sym','Minus'],['sym','Equal'],['mod','Backspace']],
    /* row 1 — Tab QWERTYUIOP [ ] \ */
    [['mod','Tab'],['jamo','KeyQ'],['jamo','KeyW'],['jamo','KeyE'],['jamo','KeyR'],['jamo','KeyT'],
     ['jamo','KeyY'],['jamo','KeyU'],['jamo','KeyI'],['jamo','KeyO'],['jamo','KeyP'],
     ['sym','BracketLeft'],['sym','BracketRight'],['sym','Backslash']],
    /* row 2 — Caps ASDFGHJKL ; ' Enter */
    [['mod','CapsLock'],['jamo','KeyA'],['jamo','KeyS'],['jamo','KeyD'],['jamo','KeyF'],['jamo','KeyG'],
     ['jamo','KeyH'],['jamo','KeyJ'],['jamo','KeyK'],['jamo','KeyL'],
     ['sym','Semicolon'],['sym','Quote'],['mod','Enter']],
    /* row 3 — Shift ZXCVBNM , . / Shift (+ mobile Backspace) */
    [['mod','ShiftLeft'],['jamo','KeyZ'],['jamo','KeyX'],['jamo','KeyC'],['jamo','KeyV'],['jamo','KeyB'],
     ['jamo','KeyN'],['jamo','KeyM'],['sym','Comma'],['sym','Period'],['sym','Slash'],
     ['mod','ShiftRight'],['mod','BackspaceMob']],
    /* row 4 — Ctrl Win Alt (mobile Enter) Space 한/영 한자 */
    [['mod','ControlLeft'],['mod','MetaLeft'],['mod','AltLeft'],['mod','EnterMob'],
     ['mod','Space'],['mod','AltRight'],['mod','ControlRight']],
  ];

  /* Inert reference codes — a click gives a subtle flash, nothing more, and a
     physical press is never captured (Tab must still move focus). */
  const REF_CODES = (() => {
    const s = new Set(Object.keys(SYM_KEYS));
    Object.keys(MOD_KEYS).forEach(id => { const m = MOD_KEYS[id]; if (m && m.ref) s.add(m.code); });
    return s;
  })();

  const W_CLASS = { 1.25:'kb-w-125', 1.5:'kb-w-15', 1.75:'kb-w-175', 2:'kb-w-2', 2.25:'kb-w-225', 2.75:'kb-w-275', 6.25:'kb-w-625' };

  /* ── input modality — WORDING ONLY ─────────────────
     A capability query, never a user-agent sniff. `(pointer: coarse)`
     describes the PRIMARY pointer, which is what makes it right on a
     hybrid: a touchscreen laptop drives the mouse as its primary
     pointer, reports `fine`, and gets the physical-keyboard wording
     even though the screen is also tappable. A phone or tablet with no
     mouse reports `coarse` and gets the tap wording. Unknown or
     matchMedia-less environments fall back to the keyboard wording,
     which is still true on touch — just less direct.

     NOTHING about the widget's behaviour may branch on this. The input
     path, the `e.code` handling, the on-screen keys and the absence of
     any editable element are identical in both modes; the only reason
     this function exists is that "click here" reads as nonsense on a
     phone, where focusing the tabindex div deliberately does not raise
     the OS keyboard. */
  function isTouchPrimary() {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    try { return !!window.matchMedia('(pointer: coarse)').matches; } catch (e) { return false; }
  }

  /* The QWERTY legend a code carries, e.g. 'KeyR' → 'R'. Specials keep their
     glyph. Used by the key_intro callout ("Press R"). */
  function latinForCode(code) {
    if (!code) return '';
    if (SPECIAL_GLYPH[code]) return SPECIAL_GLYPH[code];
    return code.indexOf('Key') === 0 ? code.slice(3) : code;
  }

  /* tabindex="-1" on EVERY key: the .kb-capture div is the ONE tab stop. A
     focusable key would steal focus and let the browser's own Space/Enter
     activation fire alongside our handler — double input, the exact bug this
     widget exists to avoid. */
  /* A jamo key carries the QWERTY letter in the top-left corner (.kb-latin) and,
     right-aligned, a .kb-jamo-stack. Single keys stack one green base jamo; the
     seven shift-pair keys (Q W E R T O P) stack the orange shifted jamo ABOVE
     the green base and show BOTH at all times — matching the KSX 5002 reference
     chart. Shift only EMPHASISES the pair via .kb-key--shifted; it never swaps
     which characters are visible. */
  function jamoKeyHTML(code) {
    const pair = keymap()[code] || [];
    const latin = code.indexOf('Key') === 0 ? code.slice(3) : code;
    const base = pair[0] || '';
    const shift = (pair.length > 1 && pair[1]) ? pair[1] : '';
    const aria = shift ? (base + ', ' + shift) : (base || code);
    return '<button type="button" tabindex="-1" class="kb-key" data-code="' + code + '" ' +
           'aria-label="' + esc(aria) + '">' +
             '<span class="kb-latin">' + esc(latin) + '</span>' +
             '<span class="kb-jamo-stack">' +
               (shift ? '<span class="kb-jamo-shift">' + esc(shift) + '</span>' : '') +
               '<span class="kb-jamo">' + esc(base) + '</span>' +
             '</span>' +
           '</button>';
  }

  function symKeyHTML(code) {
    const leg = SYM_KEYS[code] || ['', ''];
    return '<button type="button" tabindex="-1" class="kb-key kb-key--sym kb-key--ref" data-code="' + code + '" ' +
           'aria-label="' + esc(leg[1] || leg[0]) + '">' +
             '<span class="kb-sym-top">' + esc(leg[0]) + '</span>' +
             '<span class="kb-sym-bottom">' + esc(leg[1]) + '</span>' +
           '</button>';
  }

  function modKeyHTML(id, L) {
    const m = MOD_KEYS[id];
    if (!m) return '';
    const cls = ['kb-key', 'kb-key--mod', W_CLASS[m.w] || ''];
    if (m.ref) cls.push('kb-key--ref');
    if (m.only === 'desk') cls.push('kb-key--desk');
    if (m.only === 'mob')  cls.push('kb-key--mob');
    if (m.cls) cls.push(m.cls);
    const aria = (m.aria && L[m.aria]) ? L[m.aria] : m.label;
    const inner = (m.glyph ? '<span class="kb-mod-glyph">' + esc(m.glyph) + '</span>' : '') +
                  (m.label ? '<span class="kb-mod-label">' + esc(m.label) + '</span>' : '');
    return '<button type="button" tabindex="-1" class="' + cls.filter(Boolean).join(' ') + '" ' +
           'data-code="' + esc(m.code) + '" aria-label="' + esc(aria) + '">' +
             '<span class="kb-mod">' + inner + '</span>' +
           '</button>';
  }

  function keyboardHTML(L) {
    const rows = KB_LAYOUT.map((row, ri) => {
      const rowCls = 'kb-row' + (ri === 0 ? ' kb-row--nums' : '');
      const keys = row.map(entry => {
        const kind = entry[0], id = entry[1];
        if (kind === 'jamo') return jamoKeyHTML(id);
        if (kind === 'sym')  return symKeyHTML(id);
        return modKeyHTML(id, L);
      }).join('');
      return '<div class="' + rowCls + '">' + keys + '</div>';
    }).join('');
    return '<div class="kb-board" role="group" aria-label="' + esc(L.keyboardName) + '">' + rows + '</div>';
  }

  /* ── the widget ───────────────────────────────────── */

  const _mounted = new WeakMap(); // container element → live instance

  /**
   * createGame(mountEl, cfg) → instance
   * cfg: {
   *   mode:        'free' | 'jamo' | 'syllable' | 'word' | 'key_intro'
   *   items:       [{ ko, meaning?, romanization? }]   (syllable/word)
   *   jamo:        [char]        (key_intro)
   *   reps:        number        (key_intro, default 3)
   *   count:       number        (jamo drill length)
   *   seconds:     number        (time-boxed drill; overrides count)
   *   includeShift:boolean
   *   showChips:   boolean       (free-play mode strip)
   *   showClear:   boolean
   *   onComplete:  function(resultOrUndefined)
   * }
   */
  function createGame(mountEl, cfg) {
    const el = (typeof mountEl === 'string')
      ? (typeof document !== 'undefined' ? document.getElementById(mountEl) : null)
      : mountEl;
    if (!el) { console.error('TypingGame: mount element not found'); return null; }

    const d = deps();
    if (!d) { el.innerHTML = ''; return null; }

    const prev = _mounted.get(el);
    if (prev) { try { prev.destroy(); } catch (e) {} }

    const L = TGLabels.labels();
    const o = Object.assign({
      mode: 'free', items: null, jamo: null, reps: 3, count: 0, seconds: 0,
      includeShift: false, showChips: false, showClear: true, onComplete: null,
    }, cfg || {});

    /* Wording only — see isTouchPrimary(). Read once per mount. */
    const touchPrimary = isTouchPrimary();

    /* key_intro is the "find this key" exercise (lesson stages 2–4): a single
       jamo pressed `reps` times, NOT a scored speed drill. It gets a purpose-
       built, compact, single-column stacked layout with NO stats bar, NO composed
       display (the target IS the display — echoing it below was the "shown
       twice" bug) and NO summary card. Every OTHER mode keeps the original
       template byte-for-byte. */
    const keyIntro = (o.mode === 'key_intro');

    /* ── DOM ──────────────────────────────────────── */
    if (keyIntro) {
      el.innerHTML =
        '<div class="kb-widget kb-widget--intro">' +
          /* Always shown — a tester should never have to ASK whether a Korean
             keyboard is required. */
          '<p class="kb-subtitle">' + esc(touchPrimary ? L.hintTouch : L.hintKeyboard) + '</p>' +
          '<div class="kb-capture" tabindex="0" aria-label="' +
              esc(touchPrimary ? L.captureNameTouch : L.captureName) + '">' +
            (touchPrimary ? '' : '<div class="kb-focus-hint">' + esc(L.focusHint) + '</div>') +
            /* The "screen" band — the big target + its Press-key callout and the
               rep dots — sits FULL WIDTH ABOVE the full-width keyboard, mirroring
               free-play's .kb-screen. .kb-capture is a centred flex column, so the
               band and the board simply stack. */
            '<div class="kb-intro-stage">' +
              '<div class="kb-prompt"></div>' +
              '<div class="kb-intro-progress" aria-live="polite"></div>' +
            '</div>' +
            keyboardHTML(L) +
          '</div>' +
          '<div class="kb-feedback" aria-live="polite"></div>' +
        '</div>';
    } else {
      el.innerHTML =
        '<div class="kb-widget">' +
          (o.showChips ? '<p class="syl-builder-label">' + esc(L.title) + '</p>' : '') +
          /* Always shown, in every mode, including the drill steps mounted by
             mountStep() — a tester should never have to ASK whether a Korean
             keyboard is required. Reuses .kb-subtitle; note it is now the
             widget's FIRST child when there is no title. */
          '<p class="kb-subtitle">' + esc(touchPrimary ? L.hintTouch : L.hintKeyboard) + '</p>' +
          (o.showChips
            ? '<div class="kb-controls kb-controls--modes">' +
                ['free', 'jamo', 'syllable', 'word'].map(m =>
                  '<button type="button" class="btn btn-sm ' + (m === 'free' ? 'btn-primary' : 'btn-outline') +
                  ' kb-chip" data-chip="' + m + '">' +
                  esc(m === 'free' ? L.modeFree : m === 'jamo' ? L.modeJamo : m === 'syllable' ? L.modeSyllable : L.modeWord) +
                  '</button>').join('') +
              '</div>'
            : '') +
          '<div class="kb-capture" tabindex="0" aria-label="' +
              esc(touchPrimary ? L.captureNameTouch : L.captureName) + '">' +
            /* The focus hint is a full-surface veil telling the user to click to
               focus. On a touch primary that instruction is dead weight — the
               keys are tapped directly and focus is incidental — so the veil is
               not emitted at all and the subtitle above carries the guidance.
               setFocused() already tolerates a null hintEl. */
            (touchPrimary ? '' : '<div class="kb-focus-hint">' + esc(L.focusHint) + '</div>') +
            /* The "screen": the drill target (.kb-prompt, left) and the learner's
               composed output (.kb-display, right) share one row on a wide widget
               and stack when narrow. In free typing .kb-prompt is empty and
               collapses, so the display fills the whole screen. */
            '<div class="kb-screen">' +
              '<div class="kb-prompt"></div>' +
              '<div class="kb-display" aria-live="polite"></div>' +
            '</div>' +
            keyboardHTML(L) +
          '</div>' +
          '<div class="kb-stats"></div>' +
          '<div class="kb-feedback" aria-live="polite"></div>' +
          '<div class="kb-summary" style="display:none"></div>' +
          '<div class="kb-controls kb-controls--actions"></div>' +
        '</div>';
    }

    const widget    = el.querySelector('.kb-widget');
    const capture   = el.querySelector('.kb-capture');
    const board     = el.querySelector('.kb-board');
    const promptEl  = el.querySelector('.kb-prompt');
    const displayEl = el.querySelector('.kb-display');       // null in key_intro
    const statsEl   = el.querySelector('.kb-stats');         // null in key_intro
    const feedEl    = el.querySelector('.kb-feedback');
    const summaryEl = el.querySelector('.kb-summary');       // null in key_intro
    const actionsEl = el.querySelector('.kb-controls--actions'); // null in key_intro
    const introProgressEl = el.querySelector('.kb-intro-progress'); // key_intro only
    const hintEl    = el.querySelector('.kb-focus-hint');

    /* code → ARRAY of key elements. Backspace and Enter each appear twice (a
       desktop instance and a compact-mobile instance sharing the code), so a
       single-element map would leave one of them un-lit. Every consumer below
       iterates the array; the second element is display:none in the current
       form factor, so lighting both is harmless and keeps the code path uniform. */
    const keyEls = {};
    Array.prototype.forEach.call(board.querySelectorAll('.kb-key'), b => {
      const c = b.dataset.code; if (!c) return;
      (keyEls[c] = keyEls[c] || []).push(b);
    });
    function eachKeyEl(fn) { Object.keys(keyEls).forEach(c => keyEls[c].forEach(fn)); }

    /* ── state ────────────────────────────────────── */
    const ime = d.i.create();
    let mode = o.mode;
    let queue = [];            // [{ ko, meaning, romanization, expected:[jamo] }]
    let qi = 0;                // index into queue
    let repsLeft = 0;          // key_intro
    let ptr = 0;               // index into current item's expected keystrokes
    let session = createSession();
    let recentMisses = [];     // jamo, most recent last, capped at RECENT_MISS_CAP
    let freeText = '';         // free pad only — the IME owns no space character
    let finished = false;
    let shiftSticky = false, shiftPhysical = false;
    let statsTimer = 0;
    const flashTimers = {};
    let feedTimer = 0, shakeTimer = 0;
    let destroyed = false;

    function shifted() { return shiftSticky || shiftPhysical; }

    /* ── keyboard chrome ──────────────────────────── */
    function applyShiftLegends() {
      const on = shifted();
      const KM = keymap();
      /* Both jamo stay printed on the seven dual keys (see jamoKeyHTML); Shift
         only toggles .kb-key--shifted, which the CSS uses to emphasise the
         orange shifted jamo and dim the green base. No text is rewritten. */
      Object.keys(keyEls).forEach(code => {
        const pair = KM[code];
        if (!pair || pair.length < 2 || !pair[1]) return;
        keyEls[code].forEach(b => b.classList.toggle('kb-key--shifted', on));
      });
      (keyEls.ShiftLeft || []).concat(keyEls.ShiftRight || [])
        .forEach(b => b.classList.toggle('kb-key--shifted', on));
      /* Polish: emphasise the shifted symbol legends on the number row too. */
      if (board) board.classList.toggle('kb-shifted', on);
    }

    /* Pressed flash — `cls` is 'kb-key--active' for a live key or 'kb-key--tap'
       for the subtle reference-key acknowledgement. Lights every element that
       shares the code (both Backspace/Enter instances). */
    function flashKey(code, cls) {
      const list = keyEls[code];
      if (!list || !list.length) return;
      list.forEach(b => { b.classList.remove(cls); void b.offsetWidth; b.classList.add(cls); });
      if (flashTimers[code]) clearTimeout(flashTimers[code]);
      flashTimers[code] = setTimeout(() => {
        if (!destroyed) list.forEach(b => b.classList.remove(cls));
        flashTimers[code] = 0;
      }, FLASH_MS);
    }
    function flash(code)    { flashKey(code, 'kb-key--active'); }
    function flashRef(code) { flashKey(code, 'kb-key--tap'); }

    function clearHints() {
      eachKeyEl(b => b.classList.remove('kb-key--hint'));
    }

    /* Highlight where a target jamo lives. A shifted target also lights up
       Shift, otherwise the learner hunts for a legend that is not on screen.
       Which Shift: the correct touch-typing convention is the hand OPPOSITE the
       jamo key — a left-hand jamo (ㅃㅉㄸㄲㅆ on QWERT) uses the RIGHT shift, a
       right-hand jamo (ㅒㅖ on OP) uses the LEFT. Fall back to whichever shift is
       actually visible, since the mobile compact board hides the right one. */
    function hintJamo(jamo) {
      clearHints();
      if (!jamo || typeof d.i.codeForJamo !== 'function') return;
      const spot = d.i.codeForJamo(jamo);
      if (!spot || !spot.code) return;
      (keyEls[spot.code] || []).forEach(b => b.classList.add('kb-key--hint'));
      if (spot.shifted) {
        const leftHand = /^Key[QWERTASDFGZXCVB]$/.test(spot.code);
        const want = leftHand ? 'ShiftRight' : 'ShiftLeft';
        const other = leftHand ? 'ShiftLeft' : 'ShiftRight';
        const vis = code => (keyEls[code] || []).filter(b => b.offsetParent !== null);
        let els = vis(want);
        if (!els.length) els = vis(other);
        if (!els.length) els = keyEls[want] || keyEls[other] || [];   // no layout (tests) → desktop-correct
        els.forEach(b => b.classList.add('kb-key--hint'));
      }
    }

    /* ── display ──────────────────────────────────── */
    function renderDisplay() {
      if (!displayEl) return;                 // key_intro has no composed display
      const cur = ime.current() || '';
      const val = ime.value() || '';
      const head = (cur && val.slice(-cur.length) === cur) ? val.slice(0, val.length - cur.length) : val;
      displayEl.innerHTML = esc(freeText + head) +
        (cur ? '<span class="kb-display-current">' + esc(cur) + '</span>' : '');
    }

    function setFeedback(txt, kind) {
      if (feedTimer) { clearTimeout(feedTimer); feedTimer = 0; }
      feedEl.textContent = txt || '';
      feedEl.classList.remove('correct-pop', 'wrong-shake');
      if (txt) {
        void feedEl.offsetWidth;
        feedEl.classList.add(kind === 'bad' ? 'wrong-shake' : 'correct-pop');
        feedTimer = setTimeout(() => { if (!destroyed) feedEl.textContent = ''; feedTimer = 0; }, 1800);
      }
    }

    function shakeDisplay() {
      if (!displayEl) return;
      displayEl.classList.remove('wrong-shake');
      void displayEl.offsetWidth;
      displayEl.classList.add('wrong-shake');
      if (shakeTimer) clearTimeout(shakeTimer);
      shakeTimer = setTimeout(() => { if (!destroyed) displayEl.classList.remove('wrong-shake'); shakeTimer = 0; }, 400);
    }

    /* key_intro reward/shake: the prompt target IS the feedback surface here
       (there is no .kb-display), so a correct press pops it and a wrong press
       shakes it. Reuses the two global animation classes. */
    function popTarget(cls) {
      const t = promptEl.querySelector('.kb-prompt-target');
      if (!t) return;
      t.classList.remove('correct-pop', 'wrong-shake');
      void t.offsetWidth;
      t.classList.add(cls);
      setTimeout(() => { if (!destroyed) t.classList.remove(cls); }, cls === 'wrong-shake' ? 400 : 350);
    }

    function fmtTime(ms) {
      const s = Math.max(0, Math.floor(ms / 1000));
      return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
    }

    function stat(label, value) {
      return '<span class="kb-stat"><span class="kb-stat-label">' + esc(label) +
             '</span><span class="kb-stat-value">' + esc(value) + '</span></span>';
    }

    function renderStats() {
      if (!statsEl) return;                   // key_intro has no scored-stats bar
      const s = session.stats();
      statsEl.innerHTML =
        stat(L.statTime, fmtTime(s.elapsedMs)) +
        stat(L.statCpm, s.cpm) +
        stat(L.statAcc, s.accuracy + '%') +
        stat(L.statStreak, s.streak);
      if (o.seconds > 0 && session.started && !finished && s.elapsedMs >= o.seconds * 1000) finish();
    }

    /* ── prompts ──────────────────────────────────── */
    function currentItem() { return queue[qi] || null; }

    /* The "Press {k}" callout, with {k} rendered as a keycap chip so it can be
       translated (F2 only moves the verb around the {k} slot). */
    function introKeyHTML(cap) {
      const parts = String(L.introKey).split('{k}');
      const chip = '<span class="kb-intro-keycap">' + esc(cap) + '</span>';
      const total = Math.max(1, Number(o.reps) || 3);
      const times = String(L.introTimes || '').replace('{n}', total);
      return '<span class="kb-intro-key">' + esc(parts[0]) + chip +
             (parts.length > 1 ? esc(parts[1]) : '') + esc(times) + '</span>';
    }

    /* Rep dots for the CURRENT key: filled = presses done, hollow = remaining.
       `done` fills them all and appends the Done! reward pill. */
    function renderIntroProgress(done) {
      if (!introProgressEl) return;
      const total = Math.max(1, Number(o.reps) || 3);
      const doneCount = done ? total : Math.max(0, total - repsLeft);
      let dots = '';
      for (let i = 0; i < total; i++) {
        dots += '<span class="kb-intro-dot' + (i < doneCount ? ' kb-intro-dot--done' : '') + '"></span>';
      }
      introProgressEl.classList.toggle('kb-intro-progress--done', !!done);
      introProgressEl.innerHTML = dots +
        (done ? '<span class="kb-intro-done">' + esc(L.done) + '</span>' : '');
      introProgressEl.setAttribute('aria-label', fill(L.introReps, { n: doneCount, t: total }));
    }

    function renderPrompt() {
      if (mode === 'key_intro') {
        const it = currentItem();
        if (!it) { promptEl.innerHTML = ''; return; }
        const total = queue.length;
        const spot = (typeof d.i.codeForJamo === 'function') ? d.i.codeForJamo(it.ko) : null;
        let callout = '';
        if (spot && spot.code) {
          const cap = (spot.shifted ? SPECIAL_GLYPH.ShiftLeft + ' ' : '') + latinForCode(spot.code);
          callout = introKeyHTML(cap);
        }
        promptEl.innerHTML =
          '<span class="kb-progress">' + esc(fill(L.progress, { n: Math.min(qi + 1, total), t: total })) + '</span>' +
          '<span class="kb-prompt-target">' + esc(it.ko) + '</span>' +
          callout;
        hintJamo(it.ko);
        renderIntroProgress(false);
        return;
      }
      if (mode === 'free') { promptEl.innerHTML = ''; clearHints(); return; }
      const it = currentItem();
      if (!it) { promptEl.innerHTML = ''; return; }

      const total = queue.length;
      const head = (mode === 'key_intro')
        ? fill(L.promptIntro, { n: repsLeft })
        : (mode === 'jamo' ? L.promptJamo : mode === 'syllable' ? L.promptSyll : L.promptWord);

      const sub = [];
      if (it.romanization) sub.push(esc(it.romanization));
      if (it.meaning) sub.push(esc(it.meaning));

      promptEl.innerHTML =
        '<span class="kb-progress">' + esc(fill(L.progress, { n: Math.min(qi + 1, total), t: total })) + '</span>' +
        '<span class="kb-prompt-target">' + esc(it.ko) + '</span>' +
        '<span class="kb-prompt-sub">' + esc(head) + (sub.length ? ' · ' + sub.join(' · ') : '') + '</span>';

      if (mode === 'jamo' || mode === 'key_intro') hintJamo(it.ko);
      else if (mode === 'syllable' || mode === 'word') hintJamo(it.expected[ptr]);
    }

    /* ── round lifecycle ──────────────────────────── */
    function buildQueue() {
      const items = Array.isArray(o.items) ? o.items.filter(Boolean) : null;

      if (mode === 'key_intro') {
        const list = (Array.isArray(o.jamo) ? o.jamo : []).filter(Boolean);
        return list.map(j => ({ ko: j, expected: [j] }));
      }
      if (mode === 'jamo') {
        const pool = (items && items.length) ? items.map(x => x.ko).filter(Boolean) : jamoPool(o.includeShift);
        const filtered = o.includeShift ? pool : pool.filter(j => SHIFT_ONLY.indexOf(j) === -1);
        const n = o.count > 0 ? o.count : 30;
        return buildJamoQueue(filtered, n, new Set(recentMisses)).map(j => ({ ko: j, expected: [j] }));
      }
      const src = (items && items.length)
        ? items
        : (mode === 'word' ? sample(DEFAULT_WORDS, o.count || 5) : sample(DEFAULT_SYLLABLES, o.count || 5));
      const capped = (o.count > 0) ? src.slice(0, o.count) : src;
      return capped.map(x => ({
        ko: x.ko, meaning: x.meaning, romanization: x.romanization,
        expected: jamoSequence(x.ko),
      }));
    }

    function startRound() {
      finished = false;
      qi = 0; ptr = 0;
      session = createSession();
      ime.reset();
      freeText = '';
      if (summaryEl) { summaryEl.style.display = 'none'; summaryEl.innerHTML = ''; }
      setFeedback('');
      queue = (mode === 'free') ? [] : buildQueue();
      repsLeft = (mode === 'key_intro') ? Math.max(1, Number(o.reps) || 3) : 0;
      renderDisplay();
      renderPrompt();
      renderStats();
      if (mode !== 'free' && !queue.length) finish();
    }

    function result() {
      const s = session.stats();
      return {
        cpm: s.cpm, accuracy: s.accuracy, misses: s.misses,
        correct: s.correct, total: s.total, elapsedMs: s.elapsedMs,
      };
    }

    function finish() {
      if (finished) return;
      finished = true;
      session.stop();
      clearHints();
      const r = result();

      if (mode === 'key_intro') {
        // No summary card — just fill every rep dot and reveal the Done! pill.
        // step-runner reveals #kb-continue off the onComplete() below.
        renderIntroProgress(true);
      } else if (mode !== 'free' && summaryEl) {
        summaryEl.style.display = '';
        summaryEl.innerHTML =
          '<strong class="kb-summary-title">' + esc(L.summaryTitle) + '</strong>' +
          stat(L.statCpm, r.cpm) +
          stat(L.statAcc, r.accuracy + '%') +
          stat(L.misses, r.misses) +
          stat(L.statTime, fmtTime(r.elapsedMs)) +
          '<button type="button" class="btn btn-sm btn-outline kb-again">' + esc(L.summaryAgain) + '</button>';
        const again = summaryEl.querySelector('.kb-again');
        if (again) again.addEventListener('click', () => { startRound(); capture.focus(); });
      }

      if (r.accuracy >= 90 && typeof window !== 'undefined' && typeof window.spawnConfetti === 'function') {
        try { window.spawnConfetti(widget); } catch (e) {}
      }
      if (typeof o.onComplete === 'function') {
        try { o.onComplete(mode === 'key_intro' ? undefined : r); } catch (e) {}
      }
    }

    function noteMiss(jamo) {
      if (!jamo) return;
      recentMisses.push(jamo);
      while (recentMisses.length > RECENT_MISS_CAP) recentMisses.shift();
    }

    function advanceItem() {
      ptr = 0;
      ime.reset();
      qi++;
      if (qi >= queue.length) { renderDisplay(); renderStats(); finish(); return; }
      renderDisplay();
      renderPrompt();
      renderStats();
    }

    /* ── the ONE input path ───────────────────────── */

    function onJamo(jamo) {
      if (finished) return;

      if (mode === 'free') {
        ime.input(jamo);
        session.record(true);        // no target in free typing: every key counts
        renderDisplay();
        renderStats();
        return;
      }

      const it = currentItem();
      if (!it) return;

      if (mode === 'key_intro') {
        // Find-the-key exercise: press the target `reps` times. Scored silently
        // (session only gates the completion confetti); there is no stats bar,
        // and — deliberately — no .kb-display echo. The big target IS the
        // display; echoing it below was the "shown twice" bug.
        const ok = (jamo === it.ko);
        session.record(ok);
        if (!ok) {
          noteMiss(it.ko);
          setFeedback(L.wrongKey, 'bad');
          popTarget('wrong-shake');   // the hint pulse stays put, pointing the way
          return;
        }
        if (typeof window !== 'undefined' && typeof window.playDing === 'function') { try { window.playDing(); } catch (e) {} }
        repsLeft--;
        renderIntroProgress(false);   // fill one dot immediately
        if (repsLeft > 0) return;     // same key, next rep — no reflow, no ceremony
        popTarget('correct-pop');     // key mastered — quick visual reward
        repsLeft = Math.max(1, Number(o.reps) || 3);
        advanceItem();
        return;
      }

      if (mode === 'jamo') {
        const ok = (jamo === it.ko);
        session.record(ok);
        // The jamo drill scores the KEY, not a composition, so the automaton is
        // used purely to echo the press into the display and then cleared.
        ime.reset();
        ime.input(jamo);
        renderDisplay();
        renderStats();
        if (!ok) {
          noteMiss(it.ko);
          shakeDisplay();
          setFeedback(L.wrongKey, 'bad');
          return;
        }
        if (typeof window !== 'undefined' && typeof window.playDing === 'function') { try { window.playDing(); } catch (e) {} }
        advanceItem();
        return;
      }

      // syllable / word: score each keystroke against the expected sequence
      const want = it.expected[ptr];
      const ok = (jamo === want);
      session.record(ok);
      if (!ok) { noteMiss(want); shakeDisplay(); }
      ptr = Math.min(ptr + 1, it.expected.length);
      ime.input(jamo);
      renderDisplay();
      renderStats();

      if (mode === 'syllable' && matchesSyllable(ime.current(), it.ko)) {
        if (typeof window !== 'undefined' && typeof window.playDing === 'function') { try { window.playDing(); } catch (e) {} }
        displayEl.classList.add('correct-pop');
        setTimeout(() => { if (!destroyed) displayEl.classList.remove('correct-pop'); }, 350);
        advanceItem();
        return;
      }
      if (mode === 'word') hintJamo(it.expected[ptr]);
    }

    function onBackspace() {
      if (finished) return;
      if (mode === 'free' && !(ime.value() || '')) {
        freeText = freeText.slice(0, -1);
      } else {
        ime.backspace();
        if (ptr > 0) ptr--;
        if (mode === 'word') { const it = currentItem(); if (it) hintJamo(it.expected[ptr]); }
      }
      renderDisplay();
    }

    /* Space is a SUBMIT in the word drill and a literal space in the pad.
       It is never fed to the automaton, which has no concept of one. */
    function onSpace() {
      if (finished) return;
      if (mode === 'word') { submitWord(); return; }
      if (mode === 'free') {
        // flush() returns committed + the block it just committed — i.e. exactly
        // what is on screen after `freeText`. Append, never assign: the IME is
        // reset immediately afterwards, so freeText is the ONLY memory of the
        // words already typed.
        const v = ime.flush() || '';
        ime.reset();
        freeText = freeText + v + ' ';
        renderDisplay();
      }
    }

    function submitWord() {
      const it = currentItem();
      if (!it) return;
      const typed = ime.flush() || '';
      ime.reset();
      if (typed === it.ko) {
        setFeedback(L.correct, 'good');
        if (typeof window !== 'undefined' && typeof window.playDing === 'function') { try { window.playDing(); } catch (e) {} }
        if (typeof window !== 'undefined' && window.AudioCache && typeof window.AudioCache.play === 'function') {
          try { window.AudioCache.play(it.ko); } catch (e) {}
        }
      } else {
        setFeedback(fill(L.wrongWord, { got: typed || '—', want: it.ko }), 'bad');
        shakeDisplay();
        // A whole wrong word is one extra miss on top of the per-key scoring,
        // so a learner who submits early is not rewarded with 100% accuracy.
        session.record(false);
      }
      advanceItem();
    }

    /* Every press — physical OR on-screen — arrives here. Only the FUNCTIONAL
       codes act: the 26 jamo, Space, Backspace, Enter (submit, word mode only)
       and the two Shifts. Every reference-only key (numbers, punctuation, Tab,
       Caps, Ctrl, Alt, Win) is inert — it gets a subtle flash and returns,
       touching neither the IME nor the score. */
    function press(code, isShifted) {
      if (finished && code !== 'Backspace') return;
      if (REF_CODES.has(code)) { flashRef(code); return; }
      flash(code);
      if (code === 'Backspace') { onBackspace(); return; }
      if (code === 'Space')     { onSpace();     return; }
      if (code === 'Enter')     { if (mode === 'word') submitWord(); return; }
      if (code === 'ShiftLeft' || code === 'ShiftRight') {
        shiftSticky = !shiftSticky;
        applyShiftLegends();
        return;
      }
      const jamo = d.i.jamoForCode(code, !!isShifted);
      if (!jamo) return;
      onJamo(jamo);
    }

    /* ── listeners ────────────────────────────────── */
    function onKeyDown(e) {
      // isComposing: belt-and-braces. There is no editable element here, so an
      // OS IME should never be composing over us — but if a browser ever routes
      // one through anyway, we drop the event rather than double the input.
      if (e.isComposing || e.ctrlKey || e.metaKey || e.altKey) return;
      const code = e.code;
      if (!code) return;

      if (code === 'ShiftLeft' || code === 'ShiftRight') {
        flash(code);
        if (!shiftPhysical) { shiftPhysical = true; applyShiftLegends(); }
        return;
      }
      if (code === 'Enter' || code === 'NumpadEnter') {
        // Enter submits in the word drill (same as Space). preventDefault ONLY
        // there — the capture set stays {KEYMAP, Backspace, Space, Enter-in-word}.
        if (mode === 'word') { e.preventDefault(); flash('Enter'); submitWord(); }
        return;
      }
      const KM = keymap();
      if (Object.prototype.hasOwnProperty.call(KM, code) || code === 'Backspace' || code === 'Space') {
        e.preventDefault();     // Backspace must not navigate back; Space must not scroll
        press(code, e.shiftKey || shiftSticky);
      }
      // Everything else — Tab, Ctrl, Alt, numbers, punctuation — falls through
      // WITHOUT preventDefault, so Tab still moves focus and the OS keeps its keys.
    }

    function onKeyUp(e) {
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        shiftPhysical = false;
        applyShiftLegends();
      }
    }

    function setFocused(on) {
      if (hintEl) hintEl.style.display = on ? 'none' : '';
      widget.classList.toggle('kb-widget--focused', !!on);
      if (!on && shiftPhysical) { shiftPhysical = false; applyShiftLegends(); }
    }

    capture.addEventListener('keydown', onKeyDown);
    capture.addEventListener('keyup', onKeyUp);
    capture.addEventListener('focus', () => { keyboardEngaged = true; setFocused(true); });
    capture.addEventListener('blur', () => setFocused(false));
    capture.addEventListener('click', () => capture.focus());

    // mousedown default = move focus to the button. Suppressing it keeps focus
    // on .kb-capture so physical typing still works right after a screen tap.
    board.addEventListener('mousedown', e => { e.preventDefault(); });
    board.addEventListener('click', e => {
      const b = e.target && e.target.closest ? e.target.closest('.kb-key') : null;
      if (!b || !b.dataset.code) return;
      e.preventDefault();
      capture.focus();
      press(b.dataset.code, shifted());   // same function as the physical path
    });

    /* ── controls ─────────────────────────────────── */
    // actionsEl is absent in key_intro (no Clear/Restart chrome — the exercise
    // is 3 presses and step-runner owns the Continue button).
    if (actionsEl) {
      const actions = [];
      if (o.showClear) actions.push('<button type="button" class="btn btn-sm btn-outline kb-clear">' + esc(L.clear) + '</button>');
      if (o.mode !== 'free' || o.showChips) actions.push('<button type="button" class="btn btn-sm btn-outline kb-restart">' + esc(L.restart) + '</button>');
      actionsEl.innerHTML = actions.join('');

      const clearBtn = actionsEl.querySelector('.kb-clear');
      if (clearBtn) clearBtn.addEventListener('click', () => {
        ime.reset(); freeText = ''; ptr = 0;
        if (mode === 'free') session.reset();
        renderDisplay(); renderStats(); setFeedback(''); capture.focus();
      });
      const restartBtn = actionsEl.querySelector('.kb-restart');
      if (restartBtn) restartBtn.addEventListener('click', () => { startRound(); capture.focus(); });
    }

    Array.prototype.forEach.call(el.querySelectorAll('.kb-chip'), b => {
      b.addEventListener('click', () => {
        Array.prototype.forEach.call(el.querySelectorAll('.kb-chip'), x => {
          const on = x === b;
          x.classList.toggle('btn-primary', on);
          x.classList.toggle('btn-outline', !on);
        });
        const m = b.dataset.chip;
        mode = m;
        o.count = (m === 'jamo') ? 10 : (m === 'free' ? 0 : 5);
        o.items = null;
        startRound();
        capture.focus();
      });
    });

    /* ── go ───────────────────────────────────────── */
    startRound();
    // Once the learner has engaged the keyboard once, keep focus across step
    // re-mounts so they never re-click the "Click here, then type" veil.
    if (keyboardEngaged && typeof document !== 'undefined' && document.activeElement !== capture) {
      try { capture.focus({ preventScroll: true }); } catch (e) { capture.focus(); }
    }
    setFocused(typeof document !== 'undefined' && document.activeElement === capture);
    applyShiftLegends();
    statsTimer = setInterval(() => { if (!destroyed && session.started && !finished) renderStats(); }, 250);

    function destroy() {
      if (destroyed) return;
      destroyed = true;
      if (statsTimer) { clearInterval(statsTimer); statsTimer = 0; }
      if (feedTimer) { clearTimeout(feedTimer); feedTimer = 0; }
      if (shakeTimer) { clearTimeout(shakeTimer); shakeTimer = 0; }
      Object.keys(flashTimers).forEach(k => { if (flashTimers[k]) clearTimeout(flashTimers[k]); });
      capture.removeEventListener('keydown', onKeyDown);
      capture.removeEventListener('keyup', onKeyUp);
      _mounted.delete(el);
      el.innerHTML = '';
    }

    const instance = {
      destroy: destroy,
      focus: function () { capture.focus(); },
      restart: startRound,
      stats: function () { return session.stats(); },
      get el() { return widget; },
      get mode() { return mode; },
    };
    _mounted.set(el, instance);
    return instance;
  }


  /* ═══════════════════════════════════════════════════
     §2.4  mountStep — SEE THE HEADER COMMENT.
     Signature: mountStep(step, mountEl, onComplete)
     ═══════════════════════════════════════════════════ */
  function mountStep(step, mountEl, onComplete) {
    const s = step || {};
    const done = (typeof onComplete === 'function') ? onComplete : null;

    if (s.type === 'key_intro') {
      return createGame(mountEl, {
        mode: 'key_intro',
        jamo: Array.isArray(s.jamo) ? s.jamo : (s.jamo ? [s.jamo] : []),
        reps: Number(s.reps) > 0 ? Number(s.reps) : 3,
        includeShift: !!s.includeShift,
        showClear: false,
        onComplete: function () { if (done) done(); },
      });
    }

    if (s.type === 'typing_drill') {
      const target = s.target || {};
      const mode = (s.mode === 'syllable' || s.mode === 'word') ? s.mode : 'jamo';
      return createGame(mountEl, {
        mode: mode,
        items: Array.isArray(s.items) ? s.items : null,
        count: Number(target.count) > 0 ? Number(target.count) : 0,
        seconds: Number(target.seconds) > 0 ? Number(target.seconds) : 0,
        includeShift: !!s.includeShift,
        showClear: false,
        onComplete: function (r) { if (done) done(r); },
      });
    }

    console.error("TypingGame.mountStep: unsupported step type '" + s.type + "'");
    return null;
  }

  /* §2.5 — the open pad at the bottom of learn/typing.html. */
  function initFreePlay(containerId) {
    if (typeof document === 'undefined') return null;
    const root = document.getElementById(containerId);
    if (!root) return null;
    if (!deps()) return null;
    return createGame(root, { mode: 'free', showChips: true, showClear: true });
  }

  return {
    initFreePlay: initFreePlay,
    mountStep: mountStep,
    createGame: createGame,
    labels: TGLabels.labels,
    esc: esc,
    DEFAULT_WORDS: DEFAULT_WORDS,
    DEFAULT_SYLLABLES: DEFAULT_SYLLABLES,
    // exposed for the node harness — pure layer only
    _computeCPM: computeCPM,
    _computeAccuracy: computeAccuracy,
    _createSession: createSession,
    _weightedPick: weightedPick,
    _buildJamoQueue: buildJamoQueue,
    _matchesSyllable: matchesSyllable,
    _jamoSequence: jamoSequence,
    _expandJamo: expandJamo,
    _jamoPool: jamoPool,
    _MISS_WEIGHT: MISS_WEIGHT,
    // board layout hooks (markup layer, DOM-free) — for the node harness
    _keyboardHTML: keyboardHTML,
    _REF_CODES: REF_CODES,
    _KB_LAYOUT: KB_LAYOUT,
    _MOD_KEYS: MOD_KEYS,
    _SYM_KEYS: SYM_KEYS,
  };
})();

if (typeof window !== 'undefined') window.TypingGame = TypingGame;
