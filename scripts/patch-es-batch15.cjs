const fs = require('fs');
const path = require('path');
const DATA = path.join(__dirname, '..', 'learn', 'data');

function patch(filename, stagePatch, stepPatches) {
  const file = path.join(DATA, filename);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (stagePatch) data.stages.forEach(s => { if (stagePatch[s.id]) Object.assign(s, stagePatch[s.id]); });
  data.steps.forEach(step => { const p = stepPatches[step.id]; if (!p) return; Object.entries(p).forEach(([k, v]) => { step[k] = v; }); });
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ patched', filename);
}

// ─── syllable-blocks.json ── 61 steps, 5 stages ───
patch('syllable-blocks.json',
  {
    1: { name_es: 'Fundamentos del Bloque' },
    2: { name_es: 'Formas de Vocales' },
    3: { name_es: 'Construirlo' },
    4: { name_es: 'Batchim' },
    5: { name_es: 'Leer Palabras' }
  },
  {
    // ─── Stage 1: Block Basics — reading_card (step 1) ───
    1: {
      title_es: '¿Qué es un Bloque de Sílaba?',
      body_es: 'Cada sílaba coreana se escribe dentro de un bloque cuadrado invisible. A diferencia del español donde las letras van de izquierda a derecha en fila, el coreano apila consonantes y vocales juntos en bloques compactos y visualmente equilibrados. Cada bloque representa exactamente una sílaba — una unidad de sonido.',
      tip_es: { label: '¿Sabías que?', text: 'Cada bloque de sílaba siempre tiene exactamente una vocal. Puede tener 0, 1 o 2 consonantes — pero nunca más de una vocal.' }
    },
    // ─── Stage 1: Block Basics — reading_card (step 2) ───
    2: {
      title_es: 'Las Tres Posiciones',
      body_es: 'Cada bloque de sílaba coreano tiene tres posiciones con nombre. Dos son obligatorias (consonante inicial y vocal medial) y una es opcional (la consonante final). Aprender estas posiciones por nombre es esencial — la gramática coreana las menciona constantemente.',
      tip_es: { label: 'Consejo', text: 'Para vocales verticales como ㅏ, ㅓ, y ㅣ: la consonante inicial va a la izquierda, la vocal a la derecha. Para vocales horizontales como ㅗ, ㅜ, y ㅡ: la consonante inicial va arriba, la vocal abajo.' }
    },
    // ─── Stage 1: Block Basics — reading_card (step 3) ───
    3: {
      title_es: 'Cuatro Patrones de Bloques de Sílaba',
      body_es: 'Las sílabas coreanas siguen cuatro patrones estructurales básicos dependiendo de si hay una consonante final (받침) y si la sílaba comienza con vocal o consonante.',
      patterns_label_es: [
        'inicial + vocal',
        'ㅇ silencioso + vocal',
        'inicial + vocal + 받침',
        'ㅇ silencioso + vocal + 받침'
      ],
      tip_es: { label: 'La Regla del ㅇ Marcador de Posición', text: 'Cuando una sílaba comienza con sonido de vocal, debes escribir ㅇ como marcador de posición en la posición inicial. ㅇ es completamente silencioso al inicio de una sílaba — simplemente indica que el bloque comienza con una vocal. Ejemplos: 아 = ㅇ+ㅏ   이 = ㅇ+ㅣ   우 = ㅇ+ㅜ' }
    },
    // ─── Stage 1: Block Basics — card_reveal (steps 4–6) ───
    4: { example_meaning_es: 'Corea', hint_es: 'Cada sílaba es un bloque cuadrado — consonante inicial, vocal y consonante final opcional.' },
    5: { example_meaning_es: 'Corea', hint_es: 'Este bloque tiene las tres posiciones: 초성 (ㄱ) + 중성 (ㅜ) + 받침 (ㄱ).' },
    6: { example_meaning_es: 'idioma coreano', hint_es: 'Las sílabas que comienzan con vocal usan ㅇ silencioso como marcador de posición. El ㅇ aquí no suena.' },
    // ─── Stage 1: Block Basics — match_quiz (steps 7–9) ───
    7: {
      prompt_es: '¿Exactamente cuántas vocales contiene cada bloque de sílaba coreano?',
      choices_es: ['Cero', 'Exactamente una', 'Una o dos', 'Las que se necesiten']
    },
    8: { prompt_es: 'La posición de la consonante INICIAL (primera consonante) se llama…' },
    9: { prompt_es: 'Cuando una sílaba empieza con sonido de VOCAL, escribes __ como consonante inicial de marcador de posición.' },
    // ─── Stage 1: Block Basics — card_reveal (steps 10–12) ───
    10: { example_meaning_es: 'ir', hint_es: 'Patrón CV — el tipo de bloque más simple. Solo una consonante inicial y una vocal.' },
    11: { example_meaning_es: 'bebé', hint_es: 'Patrón solo-V — ㅇ silencioso en posición inicial, solo suena la vocal.' },
    12: { example_meaning_es: 'hígado / fue', hint_es: 'Patrón CVC — consonante inicial + vocal + consonante final (받침). Tres partes.' },
    // ─── Stage 1: Block Basics — match_quiz (step 13) ───
    13: {
      prompt_es: '안 (dentro / no) — ¿qué patrón estructural es este?',
      choices_es: ['CV', 'CVC', 'VC (ㅇ silencioso + vocal + final)', 'Solo V']
    },
    // ─── Stage 2: Vowel Shapes — reading_card (step 14) ───
    14: {
      title_es: 'Vocales Verticales vs Horizontales',
      body_es: 'La forma de la vocal determina dónde va la consonante inicial dentro del bloque. Las vocales altas y verticales empujan la consonante hacia la izquierda; las vocales anchas y horizontales la empujan hacia arriba. Esto es lo que le da al coreano su distintiva apariencia cuadrada.',
      tip_es: { label: 'Truco Visual Rápido', text: 'Cuando ves una vocal alta (ㅏ, ㅓ, ㅣ y sus variantes), la consonante inicial está a su izquierda. Cuando ves una vocal ancha (ㅗ, ㅜ, ㅡ y sus variantes), la consonante inicial está encima. Las vocales compuestas como ㅘ, ㅝ, ㅚ se comportan como vocales verticales — la consonante va a la izquierda.' }
    },
    // ─── Stage 2: Vowel Shapes — card_reveal (steps 15–20) ───
    15: { hint_es: 'ㅏ es una vocal ALTA y vertical. La consonante inicial va a su IZQUIERDA.' },
    16: { example_meaning_es: 'tú (informal)', hint_es: 'ㅓ también es una vocal alta y vertical — consonante a la IZQUIERDA, vocal a la DERECHA.' },
    17: { example_meaning_es: 'tiempo / hora', hint_es: 'ㅣ es la vocal más alta. La consonante siempre va a su izquierda.' },
    18: { example_meaning_es: 'gracias', hint_es: 'ㅗ es una vocal ANCHA y horizontal. La consonante inicial va ENCIMA de la vocal.' },
    19: { example_meaning_es: 'quién', hint_es: 'ㅜ es una vocal ancha y horizontal — consonante arriba, vocal abajo. La línea apunta HACIA ABAJO.' },
    20: { example_meaning_es: 'y / y además', hint_es: 'ㅡ es una vocal plana y horizontal — la consonante va encima.' },
    // ─── Stage 2: Vowel Shapes — match_quiz (steps 21–24) ───
    21: {
      prompt_es: 'Con una vocal ALTA como ㅏ, ㅓ, o ㅣ — ¿dónde va la consonante inicial?',
      choices_es: ['Arriba', 'A la izquierda', 'A la derecha', 'Abajo']
    },
    22: {
      prompt_es: 'Con una vocal ANCHA como ㅗ, ㅜ, o ㅡ — ¿dónde va la consonante inicial?',
      choices_es: ['A la izquierda', 'A la derecha', 'Arriba', 'Abajo']
    },
    23: {
      prompt_es: '배 (estómago / barco) contiene ㅐ — ¿qué tipo de vocal es ㅐ?',
      choices_es: ['Ancha horizontal', 'Alta vertical', 'Compuesta ancha', 'Silenciosa']
    },
    24: { prompt_es: '¿Cuál de estas es una vocal ANCHA (horizontal)?' },
    // ─── Stage 3: Build It — reading_card (step 25) ───
    25: {
      title_es: 'Construyendo Tus Primeras Sílabas',
      body_es: 'Ahora practiquemos construyendo sílabas simples CV — consonante + vocal, sin batchim. Estos son los bloques más fáciles de leer y escribir. Escucha cada uno e intenta producir el sonido tú mismo.'
    },
    // ─── Stage 3: Build It — syllable_builder (steps 26–33) ───
    26: { meaning_es: 'ba — 바나나 (banana)' },
    27: { meaning_es: 'na — 나 (yo)' },
    28: { meaning_es: 'sa — 사랑 (amor)' },
    29: { meaning_es: 'ha — 하늘 (cielo)' },
    30: { meaning_es: 'go — 고마워 (gracias, informal)' },
    31: { meaning_es: 'nu — 누구 (quién)' },
    32: { meaning_es: 'mi — 미래 (futuro)' },
    33: { meaning_es: 'gi — 기다리다 (esperar)' },
    // ─── Stage 4: Batchim — reading_card (step 34) ───
    34: {
      title_es: 'Añadir Batchim — La Consonante Final',
      body_es: 'Cuando añades una consonante en la parte inferior de un bloque, esa consonante se convierte en el 받침 (batchim) — la consonante final. El batchim es lo que le da a muchas palabras coreanas sus finales ricos y resonantes. Observa cómo añadir batchim transforma sílabas simples en palabras reales.',
      tip_es: { label: 'Consejo', text: 'Los bloques de sílaba con batchim están ligeramente comprimidos verticalmente para dejar espacio en la parte inferior. La consonante batchim se sienta debajo de la consonante inicial y la vocal, completando la forma cuadrada del bloque.' }
    },
    // ─── Stage 4: Batchim — card_reveal (steps 35–39) ───
    35: { example_meaning_es: 'montaña', hint_es: 'ㄴ es el 받침 aquí — está en la parte inferior del bloque, debajo de ㅅ y ㅏ.' },
    36: { example_meaning_es: 'luna / mes', hint_es: '받침 ㄹ — la lengua toca suavemente el paladar para producir el final.' },
    37: { example_meaning_es: 'arroz / comida', hint_es: '받침 ㅂ — los labios se cierran al final sin abrirse. La p no se libera.' },
    38: { example_meaning_es: 'primavera (estación)', hint_es: '받침 ㅁ — los labios se cierran suavemente al final. Un final nasal resonante.' },
    39: { example_meaning_es: 'camino / calle', hint_es: '받침 ㄹ otra vez — la lengua permanece contra el paladar. Suena como una l suave.' },
    // ─── Stage 4: Batchim — match_quiz (steps 40–44) ───
    40: { prompt_es: '밥 (arroz) — ¿cuál es su 받침 (batchim)?' },
    41: { prompt_es: '달 (luna) termina con qué sonido consonántico?' },
    42: {
      prompt_es: 'En un bloque de sílaba CVC, ¿dónde se sienta el 받침 (batchim)?',
      choices_es: ['Encima de la vocal', 'A la derecha de la vocal', 'En la parte inferior, debajo de todo', 'Al lado de la consonante inicial']
    },
    43: { prompt_es: '¿Cuál de estas palabras NO tiene 받침?' },
    44: { prompt_es: '봄 (primavera) = ㅂ + ㅗ + ? — ¿cuál es el batchim?' },
    // ─── Stage 5: Read Words — reading_card (step 45) ───
    45: {
      title_es: 'Leyendo Palabras Coreanas Reales',
      body_es: 'Ahora tienes todo lo que necesitas para descifrar palabras coreanas reales. Desglosemos 10 palabras esenciales sílaba por sílaba, identificando cada componente. Toca los botones de altavoz para escuchar las palabras en voz alta.'
    },
    // ─── Stage 5: Read Words — listen_repeat (steps 46–56) ───
    46: { meaning_es: 'Corea' },
    47: { meaning_es: 'persona' },
    48: { meaning_es: 'colegio / escuela' },
    49: { meaning_es: 'hola / paz' },
    50: { meaning_es: 'gratitud' },
    51: { meaning_es: 'amor' },
    52: { meaning_es: 'música' },
    53: { meaning_es: 'amigo/a' },
    54: { meaning_es: 'familia' },
    55: { meaning_es: 'mar / océano' },
    56: { meaning_es: 'sueño' },
    // ─── Stage 5: Read Words — reading_card (step 57) ───
    57: {
      title_es: 'Práctica y Resumen',
      body_es: '¡Felicitaciones — has aprendido la estructura central de los bloques de sílaba coreanos! Aquí tienes un resumen rápido de las cinco reglas que rigen cada sílaba en el sistema de escritura coreano.',
      rules_es: [
        'Cada bloque tiene exactamente una vocal (중성 / Jungseong)',
        'Las sílabas que comienzan con vocal usan ㅇ silencioso como consonante inicial de marcador de posición',
        'Vocales altas (ㅏ, ㅓ, ㅣ) — la consonante inicial va a la izquierda, la vocal a la derecha',
        'Vocales anchas (ㅗ, ㅜ, ㅡ) — la consonante inicial va arriba, la vocal abajo',
        'El 받침 (batchim) opcional va en la parte inferior del bloque, debajo de todo'
      ],
      tip_es: { label: '¡Viene el Autotest!', text: 'Tres preguntas rápidas a continuación para confirmar que lo has entendido. Identifica los componentes de cada sílaba.' }
    },
    // ─── Stage 5: Read Words — match_quiz (steps 58–60) ───
    58: { prompt_es: '남 (sur) — ¿cuál es su 초성 (consonante inicial)?' },
    59: { prompt_es: '달 (luna) — identifica el 받침 (batchim / consonante final).' },
    60: { prompt_es: '봄 (primavera) — ¿cuáles son los tres componentes en orden?' },
    // ─── Stage 5: lesson_complete (step 61) ───
    61: {
      title_es: '¡Puedes leer bloques de sílabas coreanos!',
      message_es: 'Has dominado los elementos fundamentales de toda la escritura coreana — 5 etapas, 61 pasos. Cada palabra coreana está hecha exactamente de estos bloques. ¡화이팅!'
    }
  }
);

console.log('\nDone! Batch 15 complete.');
