/* ═══════════════════════════════════════════════════════
   StrokeWriter — hangul stroke-order engine
   StrokeFreePlay — free-practice widget

   Consumes the pure data in js/hangul-util.js + js/stroke-data.js
   and turns it into ABSOLUTE-coordinate SVG paths in a single
   `0 0 100 100` syllable space.

   ── Why transforms are baked numerically ───────────────
   Every primitive is mapped into its slot box by arithmetic;
   the engine NEVER emits an SVG `transform` attribute. A
   transform would scale stroke-width non-uniformly and make
   getTotalLength() report pre-transform lengths, which would
   break both the animation timing and the trace tolerances.

   ── Layering ───────────────────────────────────────────
   getStrokes() and everything it calls are DOM-FREE (pure
   geometry, node-testable). Only render()/trace touch the
   DOM. Keep it that way.

   This file is DOM-dependent overall, so it deliberately has
   NO `module.exports` tail — unlike hangul-util.js /
   stroke-data.js. Node harnesses stub `global.window` and
   read `window.StrokeWriter`.
═══════════════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════════════════
   SWLabels — UI strings + 8-language detection ladder,
   shared by BOTH modules in this file.

   It lives at file scope (rather than inside StrokeFreePlay) because the
   engine itself now renders learner-facing copy: the trace-mode instruction
   line and the per-stroke status line. One table = one place for prompt F2
   to drop translations into.

   EN is the baseline and the fallback. To localise, add a sibling object
   keyed by the code the ladder returns ('ja', 'zh-tw', 'es', 'de', 'fr',
   'vi', 'th', 'id'); `labels()` merges it over EN, so a missing key degrades
   to English instead of `undefined`.
═══════════════════════════════════════════════════════ */
const SWLabels = (() => {

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
      title:       'Write any character',
      placeholder: '가',
      go:          'Go',
      watch:       'Watch',
      // NOT "Trace" — user testing showed beginners did not realise the mode
      // expects them to draw. The label now states the task.
      trace:       'Write it yourself',
      traceTip:    'Draw each stroke yourself, on top of the gray guide',
      traceIntro:  'Draw over the gray guide with your mouse or finger. Follow the numbers in order.',
      traceHint:   'Now draw stroke {n} of {t} — the flashing gray one.',
      traceDone:   'All strokes done!',
      speed:       'Speed',
      numbers:     'Stroke numbers',
      strokes:     '{n} strokes',
      strokeOne:   '1 stroke',
      quick:       'Quick picks',
      invalid:     'Type a Korean letter or syllable',
    },

    ja: {
      title:       '好きな文字を書いてみよう',
      placeholder: '가',
      go:          '表示',
      watch:       '見る',
      trace:       '自分で書く',
      traceTip:    'グレーのガイドの上を自分でなぞって書きます',
      traceIntro:  'マウスや指でグレーのガイドをなぞりましょう。番号の順に書いてください。',
      traceHint:   '{t}画のうち{n}画目を書きましょう — 点滅しているグレーの線です。',
      traceDone:   'すべての画が書けました！',
      speed:       '速さ',
      numbers:     '筆順の番号',
      strokes:     '{n}画',
      strokeOne:   '1画',
      quick:       'かんたん選択',
      invalid:     'ハングルの文字を入力してください',
    },

    'zh-tw': {
      title:       '書寫任何字',
      placeholder: '가',
      go:          '顯示',
      watch:       '觀看',
      trace:       '自己寫',
      traceTip:    '在灰色筆畫上自己描寫每一筆',
      traceIntro:  '用滑鼠或手指沿著灰色筆畫描寫，並依照號碼順序書寫。',
      traceHint:   '請寫第 {n} 筆（共 {t} 筆）— 閃爍的灰色筆畫。',
      traceDone:   '所有筆畫完成！',
      speed:       '速度',
      numbers:     '筆順號碼',
      strokes:     '{n} 筆',
      strokeOne:   '1 筆',
      quick:       '快速選擇',
      invalid:     '請輸入韓文字母或音節',
    },

    es: {
      title:       'Escribe cualquier carácter',
      placeholder: '가',
      go:          'Mostrar',
      watch:       'Ver',
      trace:       'Escríbelo tú',
      traceTip:    'Traza cada trazo tú mismo, sobre la guía gris',
      traceIntro:  'Traza sobre la guía gris con el ratón o el dedo. Sigue los números en orden.',
      traceHint:   'Ahora traza el trazo {n} de {t}: el gris que parpadea.',
      traceDone:   '¡Todos los trazos hechos!',
      speed:       'Velocidad',
      numbers:     'Números de trazo',
      strokes:     '{n} trazos',
      strokeOne:   '1 trazo',
      quick:       'Selección rápida',
      invalid:     'Escribe una letra o sílaba coreana',
    },

    fr: {
      title:       'Écris n\'importe quel caractère',
      placeholder: '가',
      go:          'Afficher',
      watch:       'Regarder',
      trace:       'À toi d\'écrire',
      traceTip:    'Trace chaque trait toi-même, par-dessus le guide gris',
      traceIntro:  'Trace par-dessus le guide gris avec la souris ou le doigt. Suis les numéros dans l\'ordre.',
      traceHint:   'Trace maintenant le trait {n} sur {t} — celui en gris qui clignote.',
      traceDone:   'Tous les traits sont faits !',
      speed:       'Vitesse',
      numbers:     'Numéros de trait',
      strokes:     '{n} traits',
      strokeOne:   '1 trait',
      quick:       'Sélection rapide',
      invalid:     'Saisis une lettre ou une syllabe coréenne',
    },

    de: {
      title:       'Schreibe ein beliebiges Zeichen',
      placeholder: '가',
      go:          'Anzeigen',
      watch:       'Ansehen',
      trace:       'Selbst schreiben',
      traceTip:    'Zeichne jeden Strich selbst, über der grauen Vorlage',
      traceIntro:  'Zeichne mit Maus oder Finger über die graue Vorlage. Folge den Zahlen der Reihe nach.',
      traceHint:   'Zeichne jetzt Strich {n} von {t} — den blinkenden grauen.',
      traceDone:   'Alle Striche fertig!',
      speed:       'Geschwindigkeit',
      numbers:     'Strichnummern',
      strokes:     '{n} Striche',
      strokeOne:   '1 Strich',
      quick:       'Schnellauswahl',
      invalid:     'Gib einen koreanischen Buchstaben oder eine Silbe ein',
    },

    vi: {
      title:       'Viết bất kỳ ký tự nào',
      placeholder: '가',
      go:          'Hiển thị',
      watch:       'Xem',
      trace:       'Tự viết',
      traceTip:    'Tự viết từng nét, trên nét dẫn màu xám',
      traceIntro:  'Viết theo nét dẫn màu xám bằng chuột hoặc ngón tay. Làm theo thứ tự các con số.',
      traceHint:   'Bây giờ viết nét {n} trên {t} — nét màu xám đang nhấp nháy.',
      traceDone:   'Đã viết xong tất cả các nét!',
      speed:       'Tốc độ',
      numbers:     'Số thứ tự nét',
      strokes:     '{n} nét',
      strokeOne:   '1 nét',
      quick:       'Chọn nhanh',
      invalid:     'Nhập một chữ cái hoặc âm tiết tiếng Hàn',
    },

    th: {
      title:       'เขียนตัวอักษรใดก็ได้',
      placeholder: '가',
      go:          'แสดง',
      watch:       'ดู',
      trace:       'เขียนเอง',
      traceTip:    'ลากเส้นแต่ละเส้นด้วยตัวเอง ทับบนเส้นนำสีเทา',
      traceIntro:  'ลากทับเส้นนำสีเทาด้วยเมาส์หรือนิ้ว ทำตามลำดับตัวเลข',
      traceHint:   'ตอนนี้ลากเส้นที่ {n} จาก {t} — เส้นสีเทาที่กะพริบ',
      traceDone:   'ครบทุกเส้นแล้ว!',
      speed:       'ความเร็ว',
      numbers:     'หมายเลขเส้น',
      strokes:     '{n} เส้น',
      strokeOne:   '1 เส้น',
      quick:       'เลือกด่วน',
      invalid:     'พิมพ์ตัวอักษรหรือพยางค์ภาษาเกาหลี',
    },

    id: {
      title:       'Tulis karakter apa saja',
      placeholder: '가',
      go:          'Tampilkan',
      watch:       'Tonton',
      trace:       'Tulis sendiri',
      traceTip:    'Tarik setiap goresan sendiri, di atas panduan abu-abu',
      traceIntro:  'Tarik di atas panduan abu-abu dengan mouse atau jari. Ikuti nomor secara berurutan.',
      traceHint:   'Sekarang tarik goresan {n} dari {t} — goresan abu-abu yang berkedip.',
      traceDone:   'Semua goresan selesai!',
      speed:       'Kecepatan',
      numbers:     'Nomor goresan',
      strokes:     '{n} goresan',
      strokeOne:   '1 goresan',
      quick:       'Pilihan cepat',
      invalid:     'Ketik huruf atau suku kata Korea',
    },
  };

  function labels() {
    const lang = detectLang();
    return Object.assign({}, LABELS.en, LABELS[lang] || {});
  }

  return { detectLang: detectLang, labels: labels, LABELS: LABELS };
})();

if (typeof window !== 'undefined') window.SWLabels = SWLabels;


const StrokeWriter = (() => {

  /* ── Dependencies (fail soft) ─────────────────────── */
  function U()  { return (typeof window !== 'undefined') ? window.HangulUtil    : null; }
  function HS() { return (typeof window !== 'undefined') ? window.HangulStrokes : null; }

  let _warned = false;
  function deps() {
    const u = U(), h = HS();
    if (!u || !h) {
      if (!_warned) {
        _warned = true;
        console.error('StrokeWriter: missing dependency — ' +
          (!u ? 'window.HangulUtil ' : '') + (!h ? 'window.HangulStrokes ' : '') +
          '(load js/hangul-util.js and js/stroke-data.js before js/stroke-writer.js)');
      }
      return null;
    }
    return { u, h };
  }
  deps(); // surface the problem at load time, not on first click

  /* ═══════════════════════════════════════════════════
     1.1  Stroke resolution — pure geometry, no DOM
     ═══════════════════════════════════════════════════ */

  function r1(v) { return Math.round(v * 10) / 10; }

  // Map a point from a 0..100 local space into an absolute [x,y,w,h] box.
  function bakePt(p, box) {
    return [box[0] + (p[0] / 100) * box[2],
            box[1] + (p[1] / 100) * box[3]];
  }

  // Nested affine: `inner` is [x,y,w,h] expressed in `outer`'s own 0..100
  // space; returns the equivalent absolute box. Depth is capped at 2 by the
  // composite recursion, matching the data contract in stroke-data.js.
  function nestBox(outer, inner) {
    return [outer[0] + (inner[0] / 100) * outer[2],
            outer[1] + (inner[1] / 100) * outer[3],
            (inner[2] / 100) * outer[2],
            (inner[3] / 100) * outer[3]];
  }

  // Variant lookup: shapes[ch].variants?.[slotKey] with fallback to base.
  // slotKey is 'cho_v' | 'cho_h' | 'cho_m' | 'jong' | null.
  // Accepts either `{ strokes:[…] }` or a bare array, for tolerance.
  function pickStrokes(shape, slotKey) {
    const v = (slotKey && shape.variants) ? shape.variants[slotKey] : null;
    if (Array.isArray(v)) return v;
    if (v && Array.isArray(v.strokes)) return v.strokes;
    return Array.isArray(shape.strokes) ? shape.strokes : [];
  }

  // Recursively flatten a jamo into baked primitives.
  // acc entries: { st (raw primitive), box (absolute), base (leaf jamo char) }
  function collect(ch, box, slotKey, depth, acc) {
    const d = deps();
    if (!d) return false;
    const shape = Object.prototype.hasOwnProperty.call(d.h.shapes, ch) ? d.h.shapes[ch] : null;
    if (shape) {
      pickStrokes(shape, slotKey).forEach(st => acc.push({ st: st, box: box, base: ch }));
      return true;
    }
    const comp = Object.prototype.hasOwnProperty.call(d.h.composites, ch) ? d.h.composites[ch] : null;
    if (comp && Array.isArray(comp.parts)) {
      if (depth >= 2) {
        console.error("StrokeWriter: composite '" + ch + "' nested deeper than 2 levels");
        return false;
      }
      let ok = true;
      comp.parts.forEach(part => {
        if (!part || !part.ref || !Array.isArray(part.box)) { ok = false; return; }
        if (!collect(part.ref, nestBox(box, part.box), slotKey, depth + 1, acc)) ok = false;
      });
      return ok;
    }
    console.error("StrokeWriter: no shape or composite for '" + ch + "'");
    return false;
  }

  // Primitive → absolute `d` string, coordinates rounded to 1 decimal.
  function toPath(st, box) {
    if (st.type === 'line' || st.type === 'poly') {
      const pts = (st.pts || []).map(p => bakePt(p, box));
      if (!pts.length) return null;
      return 'M ' + r1(pts[0][0]) + ' ' + r1(pts[0][1]) +
        pts.slice(1).map(p => ' L ' + r1(p[0]) + ' ' + r1(p[1])).join('');
    }
    if (st.type === 'circle') {
      // After baking, a circle is an ellipse: non-uniform slot scaling.
      // Start at the TOP point and travel counterclockwise — in SVG's
      // y-down space that is sweep-flag 0, two half-arcs, large-arc 1.
      const c  = bakePt(st.c, box);
      const rx = (st.r / 100) * box[2];
      const ry = (st.r / 100) * box[3];
      if (!(rx > 0) || !(ry > 0)) return null;
      const cx = r1(c[0]), cy = r1(c[1]), RX = r1(rx), RY = r1(ry);
      const top = r1(c[1] - ry), bot = r1(c[1] + ry);
      return 'M ' + cx + ' ' + top +
             ' A ' + RX + ' ' + RY + ' 0 1 0 ' + cx + ' ' + bot +
             ' A ' + RX + ' ' + RY + ' 0 1 0 ' + cx + ' ' + top;
    }
    console.error("StrokeWriter: unknown primitive type '" + st.type + "'");
    return null;
  }

  // DOM-free length estimate. render() overwrites `len` with the real
  // getTotalLength() once the path is in the document; this keeps the
  // geometry layer usable (and testable) without a browser.
  function estimateLen(st, box) {
    if (st.type === 'line' || st.type === 'poly') {
      const pts = (st.pts || []).map(p => bakePt(p, box));
      let L = 0;
      for (let i = 1; i < pts.length; i++) {
        L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      }
      return L;
    }
    if (st.type === 'circle') {
      const a = (st.r / 100) * box[2], b = (st.r / 100) * box[3];
      const h = Math.pow(a - b, 2) / Math.pow(a + b, 2); // Ramanujan II
      return Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
    }
    return 0;
  }

  /**
   * getStrokes(char) → [{ d, len, jamoChar, baseChar, jamoSlot, strokeIndex }] | null
   * Absolute coordinates in the final 0 0 100 100 syllable space.
   * `strokeIndex` is the 0-based index WITHIN that slot's jamo; the array
   * index is the global order. Pure — safe to call without a DOM.
   */
  function getStrokes(char) {
    const d = deps();
    if (!d) return null;
    if (!char) return null;
    const ch = String(char).charAt(0) && Array.from(String(char))[0];
    if (!ch) return null;

    const layouts = d.h.layouts;
    const slots = [];

    if (d.u.isSyllable(ch)) {
      const parts = d.u.decompose(ch);
      if (!parts) return null;
      const vc  = d.u.vowelClass(parts.jung);
      const key = vc + (parts.jong ? 'f' : '');
      const L   = layouts[key];
      if (!L) { console.error("StrokeWriter: no layout archetype '" + key + "'"); return null; }
      slots.push({ jamo: parts.cho,  box: L.cho,  slot: 'cho',  slotKey: 'cho_' + vc });
      slots.push({ jamo: parts.jung, box: L.jung, slot: 'jung', slotKey: null });
      if (parts.jong) slots.push({ jamo: parts.jong, box: L.jong, slot: 'jong', slotKey: 'jong' });
    } else if (d.u.isJamo(ch)) {
      // Per-class solo boxes. Measured against the real font, a bare consonant's
      // ink fills only ~43% of the legacy [15,15,70,70] box, a vertical vowel
      // overflows it top and bottom (height ratio 1.09–1.10), and a horizontal
      // vowel is effectively full-width (width ratio ~1.01). One box cannot
      // serve all three, so `layouts.jamo` carries solo / solo_v / solo_h /
      // solo_m and the vowel class picks one.
      //   'v' → solo_v | 'h' → solo_h | 'm' → solo_m | null (consonant) → solo
      // Any missing key falls back to `solo`, so the engine keeps resolving
      // against older stroke-data.js revisions. Syllables are unaffected.
      const J   = layouts.jamo || {};
      const vc  = d.u.vowelClass(ch);
      const key = vc ? ('solo_' + vc) : 'solo';
      slots.push({ jamo: ch, box: J[key] || J.solo, slot: 'solo', slotKey: null });
    } else {
      return null;
    }

    const out = [];
    for (const s of slots) {
      if (!s.box) { console.error('StrokeWriter: layout slot box missing for ' + s.slot); return null; }
      const acc = [];
      if (!collect(s.jamo, s.box.slice(), s.slotKey, 0, acc)) return null;
      acc.forEach((item, i) => {
        const dStr = toPath(item.st, item.box);
        if (dStr == null) return;
        out.push({
          d: dStr,
          len: estimateLen(item.st, item.box),
          jamoChar: s.jamo,
          baseChar: item.base,
          jamoSlot: s.slot,
          strokeIndex: i,
        });
      });
    }
    return out.length ? out : null;
  }

  /* ═══════════════════════════════════════════════════
     Utilities
     ═══════════════════════════════════════════════════ */

  function esc(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function startPoint(dStr) {
    const m = /^M\s*(-?[\d.]+)\s+(-?[\d.]+)/.exec(dStr);
    return m ? [parseFloat(m[1]), parseFloat(m[2])] : [50, 50];
  }

  function dist(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1]); }

  /* ── Stroke-number badge placement (pure, no DOM) ────
     A badge sits on its stroke's first point. Several jamo start two strokes
     at the SAME point — 닭's ㄺ and 흙's ㄺ both do, which is exactly the glyph
     the tester reported — so the two circles land on top of each other and the
     lower number vanishes entirely. Paint order cannot fix coincident circles;
     only separation can.

     So each badge picks from a FIXED list of 7 offsets (stay put, ±perpendicular
     to the stroke, backwards along the stroke, then the same at double step)
     and takes the first one that clears BADGE_SEP from every badge already
     placed — falling back to whichever offset gets furthest away. Perpendicular
     is preferred over backwards because it keeps the badge level with the point
     it marks.

     This is a fixed candidate set scored greedily, NOT a layout solver, and it
     is deliberately capped: strokes that begin at the same point can still end
     up closer than BADGE_SEP. The paint-order rule below is what guarantees the
     number you currently need is the readable one. */
  const BADGE_SEP  = 9;    // circle r=5 ⇒ two badges only stop touching at 10
  const BADGE_STEP = 5.5;

  function badgeClamp(v) { return Math.min(97, Math.max(3, v)); }

  // Unit vector of a `d` string's first move (M → first L, or M → first arc
  // endpoint). Falls back to "up" for degenerate input.
  function firstDir(dStr) {
    const m = /^M\s*(-?[\d.]+)\s+(-?[\d.]+)\s+(?:L\s*(-?[\d.]+)\s+(-?[\d.]+)|A\s*[\d.]+\s+[\d.]+\s+0\s+1\s+0\s+(-?[\d.]+)\s+(-?[\d.]+))/
      .exec(String(dStr || ''));
    if (!m) return [0, -1];
    const x0 = parseFloat(m[1]), y0 = parseFloat(m[2]);
    const x1 = parseFloat(m[3] != null ? m[3] : m[5]);
    const y1 = parseFloat(m[4] != null ? m[4] : m[6]);
    const dx = x1 - x0, dy = y1 - y0;
    const L = Math.hypot(dx, dy);
    if (!(L > 0)) return [0, -1];
    return [dx / L, dy / L];
  }

  // [[x,y], …] badge centres for a getStrokes() list, collisions nudged apart.
  function badgePositions(list) {
    const placed = [];
    (list || []).forEach(s => {
      const p = startPoint(s.d), d = firstDir(s.d);
      const q = [-d[1], d[0]];                  // perpendicular
      const S = BADGE_STEP;
      const cand = [
        [0, 0],
        [ q[0] * S,      q[1] * S],
        [-q[0] * S,     -q[1] * S],
        [-d[0] * S,     -d[1] * S],
        [ q[0] * S * 2,  q[1] * S * 2],
        [-q[0] * S * 2, -q[1] * S * 2],
        [-d[0] * S * 2, -d[1] * S * 2],
      ];
      let best = null, bestScore = -1;
      for (const c of cand) {
        const pt = [badgeClamp(p[0] + c[0]), badgeClamp(p[1] + c[1])];
        let score = Infinity;
        for (const o of placed) score = Math.min(score, Math.hypot(pt[0] - o[0], pt[1] - o[1]));
        if (score > bestScore) { bestScore = score; best = pt; }
        if (score >= BADGE_SEP) { best = pt; break; }
      }
      placed.push([r1(best[0]), r1(best[1])]);
    });
    return placed;
  }

  /* ── Badge paint priority (pure, no DOM) ─────────────
     SVG has no z-index: paint order IS document order, later = on top. The
     rule from user testing is that the EARLIEST not-yet-drawn number must be
     the one you can see, and each stroke yields the top slot once it is done.

     `a` is the active stroke — being animated (watch) or awaited (trace).
       • i >= a  (active + upcoming): rank grows with distance ahead, so `a`
         is top-most and, before anything is drawn (a = 0), badge 1 sits above
         badge 2 sits above badge 3 …
       • i <  a  (already drawn): ranked below EVERY pending badge, most
         recently finished highest. */
  function badgeRank(i, a, n) { return (i >= a) ? (i - a) : (n - a) + (a - i); }

  // Document order (bottom → top) of the n badge nodes for active stroke `a`.
  // Rank 0 lands last, i.e. painted on top.
  function badgeOrder(a, n) {
    const idx = [];
    for (let i = 0; i < n; i++) idx.push(i);
    idx.sort((x, y) => badgeRank(y, a, n) - badgeRank(x, a, n));
    return idx;
  }

  /* ═══════════════════════════════════════════════════
     1.2 / 1.3  Rendering, animation, trace
     ═══════════════════════════════════════════════════ */

  const DEFAULTS = {
    mode: 'watch',
    speed: 1,
    numbers: true,
    debug: false,
    size: 280,
    controls: true,          // engine-drawn replay/speed row (free-play supplies its own)
    autoplay: true,
    onStrokeComplete: null,
    onComplete: null,
  };

  /* ── Debug-overlay glyph placement ──────────────────
     The debug underlay renders the REAL font glyph behind the authored
     strokes as a calibration reference, so its INK has to sit centred in the
     0 0 100 100 box. `dominant-baseline:central` does not achieve that for
     Hangul, and the naive `y="50"` is wrong by a measurable amount.

     `central` is resolved against the font's ascent/descent box. Noto Sans KR
     has unitsPerEm 1000 and OS/2.fsSelection bit 7 (USE_TYPO_METRICS) CLEAR,
     so the win/hhea pair is authoritative: ascent 1160, descent 288. The
     midpoint of that box is (1160 − 288) / 2 = 436 font units above the
     baseline, and `central` pins THAT point to the `y` attribute — which is
     also why the glyph's baseline lands at y = 50 + 436 × s = 87.496.

     But Noto designs its Hangul (and CJK) glyphs about the *ideographic*
     centre, 380 font units above the baseline — not 436. So the glyph is
     drawn (436 − 380) = 56 fu lower than `central` assumes, i.e.
     56 × 86/1000 = 4.82 user units too low at our 86px size.

     Verified in headless Chrome: with y="50" the mean ink centre of the
     rendered jamo/syllables measured (50.27, 55.02) instead of (50, 50).
     Subtracting the 4.82 brings it back to ≈(50.3, 50.2).

     ⚠ Do NOT "simplify" this back to y="50". 50 is the centre of the BOX;
     the glyph's ink centre is what has to land there, and the two differ by
     the ideographic-vs-hhea-centre gap derived above. This affects the debug
     overlay only — no stroke geometry is shifted by it.
  */
  const DBG_FONT_PX        = 86;
  const DBG_UNITS_PER_EM   = 1000;
  const DBG_HHEA_CENTER_FU = (1160 - 288) / 2; // 436 — where `central` puts y
  const DBG_IDEO_CENTER_FU = 380;              // where Noto centres Hangul ink
  // 4.816 user units — the empirically confirmed 4.82 overshoot.
  const DBG_GLYPH_DY = ((DBG_HHEA_CENTER_FU - DBG_IDEO_CENTER_FU) * DBG_FONT_PX) / DBG_UNITS_PER_EM;
  const DBG_GLYPH_Y  = r1(50 - DBG_GLYPH_DY);  // 45.2

  const REF_SAMPLES = 24;
  const TOL_BASE    = 14;   // start/end tolerance
  const TOL_TOUCH   = 5;    // added for pointerType === 'touch'
  const MEAN_MAX    = 10;   // mean nearest-sample distance
  const COVER_MAX   = 18;   // every reference sample needs a user point this close
  const MIN_LEN_RAT = 0.4;  // reject if user path is shorter than this × reference
  const HINT_MUL    = 1.25; // tolerance multiplier after 3 consecutive fails
  const FAILS_HINT  = 3;

  function render(containerEl, char, opts) {
    const el = (typeof containerEl === 'string')
      ? (typeof document !== 'undefined' ? document.getElementById(containerEl) : null)
      : containerEl;
    if (!el) { console.error('StrokeWriter.render: container not found'); return null; }

    const o = Object.assign({}, DEFAULTS, opts || {});
    const L = SWLabels.labels();
    let mode    = (o.mode === 'trace') ? 'trace' : 'watch';
    let speed   = Number(o.speed) > 0 ? Number(o.speed) : 1;
    let numbers = !!o.numbers;
    let current = char;

    // live DOM refs, rebuilt by build()
    let svg = null, widget = null, strokes = [], guideEls = [], strokeEls = [], numEls = [];
    let numLayer = null, statusEl = null, badgeFocus = -1;
    let userPoly = null;

    // watch-mode animation state
    const anim = { raf: 0, i: 0, phase: 'idle', t: 0, last: 0, running: false };

    // trace state
    let target = 0, fails = 0, hinting = false;
    let ptrId = null, userPts = [], refCache = null;
    let shakeTimer = 0;

    /* ── build ──────────────────────────────────────── */
    function build() {
      stop();
      strokes = getStrokes(current) || [];

      // y is DBG_GLYPH_Y, not 50 — see the derivation above the constant.
      const debugGlyph = o.debug && current
        ? '<text class="sw-debug-glyph" x="50" y="' + DBG_GLYPH_Y + '" style="text-anchor:middle;dominant-baseline:central;' +
          "font-family:'Noto Sans KR',sans-serif;font-size:" + DBG_FONT_PX + "px;opacity:.10;fill:currentColor\">" +
          esc(current) + '</text>'
        : '';

      // cross-hair guide grid through the 50,50 centre — this one marks the
      // BOX centre and is correct at 50; only the font glyph above needed the
      // ideographic-centre compensation.
      const grid =
        '<line class="sw-grid" x1="50" y1="0" x2="50" y2="100" stroke="currentColor" stroke-width="0.4" opacity="0.12" stroke-dasharray="3 3"/>' +
        '<line class="sw-grid" x1="0" y1="50" x2="100" y2="50" stroke="currentColor" stroke-width="0.4" opacity="0.12" stroke-dasharray="3 3"/>';

      // Per stroke, in order: guide → stroke (spec §1.2). `stroke-width` here
      // is a CSS-less fallback only — css/style.css wins — and must stay in
      // step with the .sw-guide/.sw-stroke rules there (6.5, matching the
      // 6–7.5 stem weight of the reference font).
      // The guide's own faintness is `stroke-opacity`, NOT `opacity`: the CSS
      // rule sets stroke-opacity: .18, so a duplicate opacity="0.18" attribute
      // multiplied with it (≈0.03 effective) and flattened the
      // .sw-guide--target pulse to almost nothing.
      const body = strokes.map((s, i) =>
        '<path class="sw-guide" data-i="' + i + '" d="' + esc(s.d) + '" fill="none" ' +
          'stroke="currentColor" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.18"/>' +
        '<path class="sw-stroke" data-i="' + i + '" d="' + esc(s.d) + '" fill="none" ' +
          'stroke="#E8003D" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>').join('');

      // Number badges are NOT interleaved with the paths any more. They live in
      // one `<g class="sw-nums">` layer emitted after every stroke, so (a) a
      // badge is never buried under a later stroke's ink, and (b) their paint
      // order can be permuted independently — see setBadgeFocus().
      const bpos = badgePositions(strokes);
      const numLayerHtml = '<g class="sw-nums">' + strokes.map((s, i) =>
        '<g class="sw-num" data-i="' + i + '"' + (numbers ? '' : ' style="display:none"') + '>' +
          '<circle cx="' + bpos[i][0] + '" cy="' + bpos[i][1] + '" r="5" fill="#E8003D"/>' +
          '<text x="' + bpos[i][0] + '" y="' + bpos[i][1] + '" font-size="6" fill="#fff" ' +
            'style="text-anchor:middle;dominant-baseline:central">' + (i + 1) + '</text>' +
        '</g>').join('') + '</g>';

      const size = Math.max(120, Number(o.size) || 280);
      const empty = strokes.length ? '' :
        '<div class="sw-empty" style="opacity:.6;font-size:.85rem;padding:8px 0">—</div>';

      // Trace mode is a DO mode, not a WATCH mode, and testers did not work
      // that out on their own. The standing instruction sits above the canvas;
      // the live "which stroke now" line sits under it, where the eye already is.
      const traceIntro = (mode === 'trace' && strokes.length)
        ? '<p class="sw-instruct">' + esc(L.traceIntro) + '</p>' : '';
      const traceStatus = (mode === 'trace' && strokes.length)
        ? '<p class="sw-status" aria-live="polite"></p>' : '';

      widget = document.createElement('div');
      widget.className = 'sw-widget' + (mode === 'trace' ? ' sw-widget--trace' : '');
      widget.innerHTML =
        traceIntro +
        '<svg class="sw-svg' + (mode === 'trace' ? ' sw-svg--trace' : '') + '" viewBox="0 0 100 100" ' +
          'style="width:' + size + 'px;max-width:100%' + (mode === 'trace' ? ';touch-action:none' : '') + '">' +
          debugGlyph + grid + body + numLayerHtml +
          '<rect class="sw-trace-surface" x="0" y="0" width="100" height="100" fill="transparent"/>' +
        '</svg>' + empty + traceStatus +
        '<div class="sw-controls"></div>';

      el.innerHTML = '';
      el.appendChild(widget);

      svg       = widget.querySelector('.sw-svg');
      guideEls  = Array.prototype.slice.call(widget.querySelectorAll('.sw-guide'));
      strokeEls = Array.prototype.slice.call(widget.querySelectorAll('.sw-stroke'));
      numLayer  = widget.querySelector('.sw-nums');
      statusEl  = widget.querySelector('.sw-status');
      // Indexed by data-i, NOT by document order — the badge nodes get
      // reordered, so a querySelectorAll snapshot would desync from `strokes`.
      numEls    = strokes.map((s, i) => widget.querySelector('.sw-num[data-i="' + i + '"]'));

      // getTotalLength() is only meaningful once the path is IN the document.
      strokeEls.forEach((p, i) => {
        let L = 0;
        try { L = p.getTotalLength(); } catch (e) { L = 0; }
        if (!L || !isFinite(L)) L = strokes[i].len || 1;
        strokes[i].len = L;
        p.style.strokeDasharray  = L + ' ' + L;
        p.style.strokeDashoffset = String(L);
      });

      refCache = null;
      badgeFocus = -1;
      setBadgeFocus(0);   // stroke 1's badge on top before anything is drawn
      buildControls();

      if (mode === 'trace') setupTrace();
      else if (o.autoplay) play();
      else strokeEls.forEach((p, i) => { p.style.strokeDashoffset = String(strokes[i].len); });
    }

    function buildControls() {
      const bar = widget.querySelector('.sw-controls');
      if (!bar) return;
      if (!o.controls || mode === 'trace' || !strokes.length) { bar.innerHTML = ''; return; }
      bar.innerHTML =
        '<button type="button" class="btn btn-sm btn-outline sw-replay">↻</button>' +
        [0.5, 1, 1.5].map(s =>
          '<button type="button" class="btn btn-sm ' + (s === speed ? 'btn-primary' : 'btn-outline') +
          ' sw-speed" data-speed="' + s + '">' + s + '×</button>').join('');
      const rp = bar.querySelector('.sw-replay');
      if (rp) rp.addEventListener('click', replay);
      Array.prototype.forEach.call(bar.querySelectorAll('.sw-speed'), b => {
        b.addEventListener('click', () => { setSpeed(parseFloat(b.dataset.speed)); replay(); });
      });
    }

    /* ── stroke-number badge z-order ────────────────── */

    /* SVG has no z-index, so the ONLY way to decide which of two overlapping
       badges is visible is document order. Permute the nodes inside `.sw-nums`
       to match badgeOrder(active) — and touch only the nodes that actually
       moved: a normal one-stroke advance moves exactly one node, because
       order(a+1) is order(a) with the head of the pending run rotated to the
       front. Cheap enough to run on every stroke transition in all three
       drivers (watch tick, replay, trace setTarget). */
    function setBadgeFocus(a) {
      if (!numLayer || !strokes.length) return;
      const n = strokes.length;
      const next = Math.max(0, Math.min(n - 1, Math.floor(a) || 0));
      if (next === badgeFocus) return;
      badgeFocus = next;
      const order = badgeOrder(next, n);
      let node = numLayer.firstChild;
      for (let k = 0; k < order.length; k++) {
        const g = numEls[order[k]];
        if (!g) continue;
        if (node === g) { node = node.nextSibling; continue; }
        numLayer.insertBefore(g, node);   // moves g; `node` stays the cursor
      }
      paintBadgeFocus();
    }

    // Trace mode only: the badge you owe next stays fully opaque and the rest
    // step back, so "which stroke now" needs no explanation. Watch mode keeps
    // its own reveal-as-you-go opacity (showNum).
    function paintBadgeFocus() {
      if (mode !== 'trace') return;
      numEls.forEach((g, i) => {
        if (!g) return;
        if (!numbers) { g.style.display = 'none'; return; }
        g.style.display = '';
        g.style.opacity = (i === badgeFocus) ? '1' : '0.45';
      });
    }

    /* ── watch-mode animation ───────────────────────── */
    function showNum(i, on) {
      const g = numEls[i];
      if (!g) return;
      if (!numbers) { g.style.display = 'none'; return; }
      g.style.display = '';
      g.style.opacity = on ? '1' : '0';
    }

    function tick(ts) {
      if (!anim.running) return;
      const dt = anim.last ? (ts - anim.last) : 0;
      anim.last = ts;
      anim.t += dt;

      if (anim.phase === 'draw') {
        const s = strokes[anim.i], p = strokeEls[anim.i];
        if (!s || !p) { anim.phase = 'done'; }
        else {
          const dur = Math.max(300, (350 + s.len * 6) / speed);
          const k = Math.min(1, anim.t / dur);
          p.style.strokeDashoffset = String(s.len * (1 - k));
          if (k >= 1) {
            if (typeof o.onStrokeComplete === 'function') { try { o.onStrokeComplete(anim.i); } catch (e) {} }
            anim.i++; anim.t = 0;
            setBadgeFocus(anim.i);   // finished badge yields the top slot (clamped at the last)
            if (anim.i >= strokes.length) anim.phase = 'done';
            else anim.phase = 'gap';
          }
        }
      } else if (anim.phase === 'gap') {
        if (anim.t >= 250) { anim.t = 0; anim.phase = 'draw'; showNum(anim.i, true); }
      }

      if (anim.phase === 'done') {
        anim.running = false; anim.raf = 0; anim.last = 0;
        if (typeof o.onComplete === 'function') { try { o.onComplete(); } catch (e) {} }
        return;
      }
      anim.raf = requestAnimationFrame(tick);
    }

    function play() {
      if (mode !== 'watch' || !strokes.length) return;
      if (anim.running) return;
      if (anim.phase === 'idle' || anim.phase === 'done') {
        anim.i = 0; anim.t = 0; anim.phase = 'draw';
        strokeEls.forEach((p, i) => { p.style.strokeDashoffset = String(strokes[i].len); });
        numEls.forEach((g, i) => showNum(i, false));
        showNum(0, true);
        setBadgeFocus(0);
      }
      anim.running = true; anim.last = 0;
      anim.raf = requestAnimationFrame(tick);
    }

    function pause() {
      anim.running = false;
      anim.last = 0;
      if (anim.raf) { cancelAnimationFrame(anim.raf); anim.raf = 0; }
    }

    function replay() {
      pause();
      anim.phase = 'idle';
      play();
    }

    function stop() {
      if (anim.raf) { cancelAnimationFrame(anim.raf); anim.raf = 0; }
      anim.running = false; anim.phase = 'idle'; anim.i = 0; anim.t = 0; anim.last = 0;
      if (shakeTimer) { clearTimeout(shakeTimer); shakeTimer = 0; }
    }

    /* ── trace mode ─────────────────────────────────── */
    function refSamples(i) {
      if (!refCache) refCache = [];
      if (refCache[i]) return refCache[i];
      const g = guideEls[i];
      if (!g) return null;
      let total = 0;
      try { total = g.getTotalLength(); } catch (e) { total = 0; }
      if (!total) total = strokes[i].len || 1;
      const pts = [];
      for (let k = 0; k < REF_SAMPLES; k++) {
        const at = (total * k) / (REF_SAMPLES - 1);
        let p;
        try { p = g.getPointAtLength(at); } catch (e) { p = { x: 50, y: 50 }; }
        pts.push([p.x, p.y]);
      }
      refCache[i] = { pts: pts, len: total };
      return refCache[i];
    }

    function setStatus(txt) { if (statusEl) statusEl.textContent = txt; }

    function setTarget(i) {
      target = i;
      guideEls.forEach((g, k) => {
        g.classList.toggle('sw-guide--target', k === i);
        g.style.display = '';
        // The target keeps NO inline stroke-opacity, so the CSS
        // .sw-guide--target pulse (.18 ↔ .45) owns it; every other guide is
        // pushed well below the pulse's floor. Result: exactly one guide reads
        // as "this one", which is what the mode was missing.
        g.style.strokeOpacity = (k === i) ? '' : '0.08';
      });
      // already-passed strokes stay solid, upcoming ones stay hidden
      strokeEls.forEach((p, k) => {
        p.style.strokeDashoffset = (k < i) ? '0' : String(strokes[k].len);
      });
      if (i < strokes.length) {
        const g = guideEls[i];
        if (g) g.style.display = '';
      }
      setBadgeFocus(i);
      paintBadgeFocus();
      setStatus(String(L.traceHint).replace('{n}', i + 1).replace('{t}', strokes.length));
    }

    function setupTrace() {
      stop();
      target = 0; fails = 0; hinting = false; ptrId = null; userPts = [];
      numEls.forEach((g, i) => showNum(i, true));
      setTarget(0);
      const surf = widget.querySelector('.sw-trace-surface');
      if (!surf) return;
      surf.addEventListener('pointerdown', onDown);
      surf.addEventListener('pointermove', onMove);
      surf.addEventListener('pointerup', onUp);
      surf.addEventListener('pointercancel', onCancel);
    }

    function toViewBox(e) {
      if (!svg || !svg.getScreenCTM) return null;
      const ctm = svg.getScreenCTM();
      if (!ctm) return null;
      const inv = ctm.inverse();
      if (typeof DOMPoint !== 'undefined') {
        const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(inv);
        return [p.x, p.y];
      }
      const sp = svg.createSVGPoint();
      sp.x = e.clientX; sp.y = e.clientY;
      const q = sp.matrixTransform(inv);
      return [q.x, q.y];
    }

    function ensurePoly() {
      if (userPoly && userPoly.parentNode) return userPoly;
      userPoly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      userPoly.setAttribute('class', 'sw-user-stroke');
      userPoly.setAttribute('fill', 'none');
      userPoly.setAttribute('stroke', '#E8003D');
      userPoly.setAttribute('stroke-opacity', '0.6');
      userPoly.setAttribute('stroke-width', '6.5');   // fallback; must match .sw-user-stroke in css/style.css
      userPoly.setAttribute('stroke-linecap', 'round');
      userPoly.setAttribute('stroke-linejoin', 'round');
      const surf = widget.querySelector('.sw-trace-surface');
      svg.insertBefore(userPoly, surf); // below the capture rect, above the guides
      return userPoly;
    }

    function clearTrail() {
      userPts = [];
      if (userPoly && userPoly.parentNode) userPoly.parentNode.removeChild(userPoly);
      userPoly = null;
    }

    function paintTrail() {
      ensurePoly().setAttribute('points', userPts.map(p => r1(p[0]) + ',' + r1(p[1])).join(' '));
    }

    function onDown(e) {
      if (mode !== 'trace' || target >= strokes.length) return;
      if (ptrId !== null) return;              // single pointer only — ignore multi-touch
      ptrId = e.pointerId;
      try { e.target.setPointerCapture(e.pointerId); } catch (err) {}
      e.preventDefault();
      clearTrail();
      const p = toViewBox(e);
      if (p) { userPts.push(p); paintTrail(); }
    }

    function onMove(e) {
      if (ptrId === null || e.pointerId !== ptrId) return;
      e.preventDefault();
      const p = toViewBox(e);
      if (!p) return;
      const last = userPts[userPts.length - 1];
      if (last && dist(last, p) < 0.6) return;  // decimate jitter
      userPts.push(p);
      paintTrail();
    }

    function onUp(e) {
      if (ptrId === null || e.pointerId !== ptrId) return;
      e.preventDefault();
      try { e.target.releasePointerCapture(e.pointerId); } catch (err) {}
      ptrId = null;
      evaluate(e.pointerType === 'touch');
    }

    function onCancel(e) {
      if (ptrId === null || e.pointerId !== ptrId) return;
      ptrId = null;
      clearTrail();
    }

    function userLength(pts) {
      let L = 0;
      for (let i = 1; i < pts.length; i++) L += dist(pts[i - 1], pts[i]);
      return L;
    }

    function evaluate(isTouch) {
      const ref = refSamples(target);
      if (!ref || userPts.length < 2) { clearTrail(); return; }

      const mul  = hinting ? HINT_MUL : 1;
      const tol  = (TOL_BASE + (isTouch ? TOL_TOUCH : 0)) * mul;
      const mMax = MEAN_MAX * mul;
      const cMax = COVER_MAX * mul;

      const first = userPts[0], last = userPts[userPts.length - 1];

      // reject too-short scribbles before the shape checks
      const lenOk = userLength(userPts) >= MIN_LEN_RAT * ref.len;

      const startOk = dist(first, ref.pts[0]) <= tol;                       // 1. direction (start)
      const endOk   = dist(last,  ref.pts[ref.pts.length - 1]) <= tol;      // 2. direction (end)

      let sum = 0;                                                          // 3. mean nearest distance
      for (const up of userPts) {
        let best = Infinity;
        for (const rp of ref.pts) { const dd = dist(up, rp); if (dd < best) best = dd; }
        sum += best;
      }
      const meanOk = (sum / userPts.length) < mMax;

      let coverOk = true;                                                   // 4. coverage
      for (const rp of ref.pts) {
        let best = Infinity;
        for (const up of userPts) { const dd = dist(rp, up); if (dd < best) best = dd; }
        if (best > cMax) { coverOk = false; break; }
      }

      if (lenOk && startOk && endOk && meanOk && coverOk) onPass();
      else onFail();
    }

    function onPass() {
      clearTrail();
      const p = strokeEls[target];
      if (p) p.style.strokeDashoffset = '0';
      const g = guideEls[target];
      if (g) g.classList.remove('sw-guide--target');
      if (typeof window !== 'undefined' && typeof window.playDing === 'function') {
        try { window.playDing(); } catch (e) {}
      }
      if (typeof o.onStrokeComplete === 'function') { try { o.onStrokeComplete(target); } catch (e) {} }

      fails = 0; hinting = false;
      const next = target + 1;
      if (next >= strokes.length) {
        target = next;
        guideEls.forEach(gg => gg.classList.remove('sw-guide--target'));
        setBadgeFocus(strokes.length - 1);
        setStatus(L.traceDone);
        if (typeof window !== 'undefined' && typeof window.spawnConfetti === 'function') {
          try { window.spawnConfetti(svg); } catch (e) {}
        }
        if (typeof o.onComplete === 'function') { try { o.onComplete(); } catch (e) {} }
      } else {
        setTarget(next);
      }
    }

    function onFail() {
      clearTrail();
      if (svg) {
        svg.classList.remove('wrong-shake');
        void svg.getBoundingClientRect();
        svg.classList.add('wrong-shake');
        if (shakeTimer) clearTimeout(shakeTimer);
        shakeTimer = setTimeout(() => { if (svg) svg.classList.remove('wrong-shake'); shakeTimer = 0; }, 400);
      }
      fails++;
      if (fails >= FAILS_HINT && !hinting) {
        hinting = true;               // loosen tolerances by 1.25× for this stroke
        hintReplay(target);
      }
    }

    // Auto-play the target stroke once as a hint, then restore the guide.
    function hintReplay(i) {
      const p = strokeEls[i], s = strokes[i];
      if (!p || !s) return;
      const dur = Math.max(300, (350 + s.len * 6) / speed);
      const t0 = (typeof performance !== 'undefined' ? performance.now() : Date.now());
      p.style.strokeDashoffset = String(s.len);
      const frame = (ts) => {
        if (mode !== 'trace' || target !== i) { p.style.strokeDashoffset = String(s.len); return; }
        const k = Math.min(1, (ts - t0) / dur);
        p.style.strokeDashoffset = String(s.len * (1 - k));
        if (k < 1) requestAnimationFrame(frame);
        else setTimeout(() => {
          if (mode === 'trace' && target === i) p.style.strokeDashoffset = String(s.len);
        }, 450);
      };
      requestAnimationFrame(frame);
    }

    /* ── public instance API ────────────────────────── */
    function setSpeed(x) {
      const v = parseFloat(x);
      if (v > 0) speed = v;
      if (widget) {
        Array.prototype.forEach.call(widget.querySelectorAll('.sw-speed'), b => {
          const on = parseFloat(b.dataset.speed) === speed;
          b.classList.toggle('btn-primary', on);
          b.classList.toggle('btn-outline', !on);
        });
      }
      return speed;
    }

    function setNumbers(on) {
      numbers = !!on;
      numEls.forEach((g, i) => { if (!g) return; g.style.display = numbers ? '' : 'none'; if (numbers) g.style.opacity = '1'; });
      paintBadgeFocus();
    }

    function setMode(m) {
      const next = (m === 'trace') ? 'trace' : 'watch';
      if (next === mode) return;
      mode = next;
      build();
    }

    function setChar(ch) {
      current = ch;
      build();
    }

    function destroy() {
      stop();
      clearTrail();
      if (el) el.innerHTML = '';
      svg = widget = null;
      numLayer = statusEl = null; badgeFocus = -1;
      strokes = []; guideEls = []; strokeEls = []; numEls = [];
    }

    build();

    return {
      play: play,
      pause: pause,
      replay: replay,
      setSpeed: setSpeed,
      setNumbers: setNumbers,
      setMode: setMode,
      setChar: setChar,
      destroy: destroy,
      get el() { return widget; },
      get strokes() { return strokes; },
      get mode() { return mode; },
    };
  }

  return {
    getStrokes: getStrokes,
    render: render,
    esc: esc,
    labels: SWLabels.labels,
    // exposed for calibration / tests
    _bakePt: bakePt,
    _nestBox: nestBox,
    _firstDir: firstDir,
    _badgePositions: badgePositions,
    _badgeRank: badgeRank,
    _badgeOrder: badgeOrder,
  };
})();

if (typeof window !== 'undefined') window.StrokeWriter = StrokeWriter;


/* ═══════════════════════════════════════════════════════
   StrokeFreePlay — bottom-of-page free practice widget
   (mirrors HangulFreeBuilder.init structure)
═══════════════════════════════════════════════════════ */

const StrokeFreePlay = (() => {

  /* Strings and the 8-language ladder live in SWLabels at the top of this
     file — the engine renders learner-facing copy too, so one table serves
     both modules and prompt F2 has a single drop-in point. */
  const detectLang = SWLabels.detectLang;
  const labels     = SWLabels.labels;

  function esc(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  const CHIPS = ['ㄱ', 'ㅅ', 'ㅈ', 'ㅎ', 'ㅏ', 'ㅘ', '가', '한', '빛', '닭', '햟'];

  /* The prompt-B §4 calibration set: 24 base jamo + 14 syllables. Rendered as
     a second chip strip ONLY under ?swdebug=1, so the whole set can be clicked
     through instead of typed. Dev tool — never shipped to a real visitor, so
     its heading is deliberately an untranslated literal. */
  const CALIBRATION_CHIPS = Array.from('ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ')
    .concat(['가', '고', '과', '간', '곤', '관', '빛', '닭', '값', '흙', '원', '한', '곰', '햟']);

  let instance = null;

  function lastHangul(value) {
    const U = (typeof window !== 'undefined') ? window.HangulUtil : null;
    if (!U || !value) return null;
    const chars = Array.from(String(value));
    for (let i = chars.length - 1; i >= 0; i--) {
      const c = chars[i];
      if (U.isSyllable(c) || U.isJamo(c)) return c;
    }
    return null;
  }

  function init(containerId) {
    if (typeof document === 'undefined') return;
    const root = document.getElementById(containerId);
    if (!root) return;
    if (!window.StrokeWriter || !window.HangulUtil || !window.HangulStrokes) {
      console.error('StrokeFreePlay: StrokeWriter / HangulUtil / HangulStrokes not loaded');
      return;
    }

    const L = labels();
    const debug = (typeof location !== 'undefined') &&
      new URLSearchParams(location.search).get('swdebug') === '1';

    let mode    = 'watch';
    let speed   = 1;
    let numbers = true;
    let char    = '가';

    root.innerHTML =
      '<div class="sw-freeplay">' +
        '<p class="syl-builder-label">' + esc(L.title) + '</p>' +
        '<div class="sw-fp-row">' +
          '<input type="text" class="sw-input" maxlength="12" ' +
            'placeholder="' + esc(L.placeholder) + '" value="' + esc(char) + '" ' +
            'aria-label="' + esc(L.title) + '">' +
          '<button type="button" class="btn btn-sm btn-primary sw-go">' + esc(L.go) + '</button>' +
        '</div>' +
        '<div class="sw-fp-row sw-fp-opts">' +
          '<button type="button" class="btn btn-sm btn-primary sw-tab" data-mode="watch">' + esc(L.watch) + '</button>' +
          '<button type="button" class="btn btn-sm btn-outline sw-tab" data-mode="trace" ' +
            'title="' + esc(L.traceTip) + '">' + esc(L.trace) + '</button>' +
          '<label class="sw-fp-label">' + esc(L.speed) +
            ' <select class="sw-speed-select">' +
              '<option value="0.5">0.5×</option>' +
              '<option value="1" selected>1×</option>' +
              '<option value="1.5">1.5×</option>' +
            '</select>' +
          '</label>' +
          '<label class="sw-fp-label">' +
            '<input type="checkbox" class="sw-num-toggle" checked> ' + esc(L.numbers) +
          '</label>' +
        '</div>' +
        '<div class="sw-canvas"></div>' +
        '<p class="sw-count" aria-live="polite"></p>' +
        '<div class="sw-chip-row">' +
          CHIPS.map(c => '<button type="button" class="syl-picker-btn sw-chip" data-char="' + esc(c) + '">' + esc(c) + '</button>').join('') +
        '</div>' +
        (debug
          ? '<div class="sw-chip-row sw-chip-row--debug">' +
              '<span style="width:100%;text-align:center;font-size:.75rem;opacity:.6">' +
                'calibration set — ' + CALIBRATION_CHIPS.length + ' chars (?swdebug=1 only)</span>' +
              CALIBRATION_CHIPS.map(c =>
                '<button type="button" class="syl-picker-btn sw-chip" data-char="' + esc(c) + '">' + esc(c) + '</button>').join('') +
            '</div>'
          : '') +
      '</div>';

    const input   = root.querySelector('.sw-input');
    const canvas  = root.querySelector('.sw-canvas');
    const countEl = root.querySelector('.sw-count');

    function setCount(n) {
      if (!countEl) return;
      countEl.textContent = (n == null) ? L.invalid
        : (n === 1 ? L.strokeOne : L.strokes.replace('{n}', n));
    }

    function draw() {
      if (instance) { instance.destroy(); instance = null; }
      const list = window.StrokeWriter.getStrokes(char);
      if (!list) { canvas.innerHTML = ''; setCount(null); return; }
      instance = window.StrokeWriter.render(canvas, char, {
        mode: mode,
        speed: speed,
        numbers: numbers,
        debug: debug,
        size: 280,
        controls: false,          // this widget supplies its own speed/mode controls
      });
      setCount(list.length);
      Array.prototype.forEach.call(root.querySelectorAll('.sw-chip'), b => {
        b.classList.toggle('active', b.dataset.char === char);
      });
    }

    function apply(value) {
      const c = lastHangul(value);
      if (!c) { setCount(null); return; }
      char = c;
      if (input) input.value = c;
      draw();
    }

    root.querySelector('.sw-go').addEventListener('click', () => apply(input.value));
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); apply(input.value); } });

    Array.prototype.forEach.call(root.querySelectorAll('.sw-tab'), b => {
      b.addEventListener('click', () => {
        mode = b.dataset.mode === 'trace' ? 'trace' : 'watch';
        Array.prototype.forEach.call(root.querySelectorAll('.sw-tab'), x => {
          const on = x.dataset.mode === mode;
          x.classList.toggle('btn-primary', on);
          x.classList.toggle('btn-outline', !on);
        });
        draw();
      });
    });

    const sel = root.querySelector('.sw-speed-select');
    sel.addEventListener('change', () => {
      speed = parseFloat(sel.value) || 1;
      if (instance) { instance.setSpeed(speed); instance.replay(); }
    });

    const numToggle = root.querySelector('.sw-num-toggle');
    numToggle.addEventListener('change', () => {
      numbers = !!numToggle.checked;
      if (instance) instance.setNumbers(numbers);
    });

    Array.prototype.forEach.call(root.querySelectorAll('.sw-chip'), b => {
      b.addEventListener('click', () => apply(b.dataset.char));
    });

    draw();
  }

  return { init: init, detectLang: detectLang, labels: labels };
})();

if (typeof window !== 'undefined') window.StrokeFreePlay = StrokeFreePlay;
