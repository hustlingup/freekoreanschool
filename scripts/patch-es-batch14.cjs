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

// ─── hangul.json ── 84 steps, 6 stages ───
patch('hangul.json',
  {
    1: { name_es: 'Consonantes' },
    2: { name_es: 'Vocales' },
    3: { name_es: 'Sílabas' },
    4: { name_es: 'Especiales' },
    5: { name_es: 'Vocales Compuestas' },
    6: { name_es: 'Leer Palabras' }
  },
  {
    // ─── Stage 1: Consonants — card_reveal (steps 1–14) ───
    1: { example_meaning_es: 'ir', hint_es: 'Tiene forma de la parte posterior de la garganta bloqueando el flujo de aire.' },
    2: { example_meaning_es: 'yo / mí', hint_es: 'Tiene forma de la punta de la lengua tocando el paladar.' },
    3: { example_meaning_es: 'todo / cada', hint_es: 'Como ㄴ con techo — la lengua bloquea completamente el paladar.' },
    4: { example_meaning_es: 'razón (prefijo)', hint_es: 'Un golpe de lengua — entre la r de "pero" y la l española. La lengua golpea el paladar.' },
    5: { example_meaning_es: 'corazón / mente', hint_es: 'Tiene forma de labios cerrados presionándose para hacer el sonido m.' },
    6: { example_meaning_es: 'arroz / comida', hint_es: 'Tiene forma de labios abriéndose para liberar el sonido b o p.' },
    7: { example_meaning_es: 'persona', hint_es: 'Tiene forma de dos dientes — el aire silba para producir el sonido s.' },
    8: { example_meaning_es: 'niño/a', hint_es: 'Silencioso al inicio de la sílaba. Suena como ng al final.' },
    9: { example_meaning_es: 'ahora', hint_es: 'Como la j en inglés "juice" o ch en "Chile". La lengua presiona detrás de los dientes superiores.' },
    10: { example_meaning_es: 'té / coche', hint_es: 'ch aspirada — sale un soplo de aire. Como ch al inicio de "Chile".' },
    11: { example_meaning_es: 'café', hint_es: 'k aspirada — soplo de aire fuerte. Sostén un papel y se mueve.' },
    12: { example_meaning_es: 'montar / subir', hint_es: 't aspirada — como la t inicial en inglés "ten". Soplo fuerte de aire.' },
    13: { example_meaning_es: 'cebolleta', hint_es: 'p aspirada — como la p en "pan". Los labios se abren con aire.' },
    14: { example_meaning_es: 'cielo', hint_es: 'Una h suave y aspirada — como exhalar aire caliente sobre la mano.' },
    // ─── Stage 1: Consonants — match_quiz (steps 15–21) ───
    15: { prompt_es: 'ㄱ se romaniza como…' },
    16: { prompt_es: '¿Qué consonante es SILENCIOSA al inicio de una sílaba?' },
    17: { prompt_es: 'ㄴ se romaniza como…' },
    18: { prompt_es: '¿Qué consonante suena como la j en inglés "juice"?' },
    19: { prompt_es: 'ㅁ se romaniza como…' },
    20: { prompt_es: 'ㄹ se romaniza como…' },
    21: { prompt_es: '밥 (arroz) empieza con qué consonante?' },
    // ─── Stage 2: Vowels — card_reveal (steps 22–31) ───
    22: { hint_es: 'Abre la boca bien, como decir "ah" en el médico.' },
    23: { hint_es: 'Como ya en "yarda". El trazo extra indica la adición de y.' },
    24: { hint_es: 'Similar a la e de "mesa" pero más posterior. Labios ligeramente redondeados.' },
    25: { hint_es: 'Como yeo con labios redondeados. Dos trazos = prefijo y.' },
    26: { hint_es: 'Como la o de "sol". Redondea los labios como para apagar una vela.' },
    27: { hint_es: 'Como ¡yo! — dos trazos añaden la y. Muy usado en el habla.' },
    28: { hint_es: 'Como la u de "luna". La línea apunta HACIA ABAJO — la boca baja.' },
    29: { hint_es: 'Como yu. Dos trazos hacia abajo indican el prefijo y.' },
    30: { hint_es: 'Como la e cuando no estás contento: "eugh". Labios planos, sin redondear.' },
    31: { hint_es: 'Como la i de "sí". Un simple trazo vertical — vocal frontal alta pura.' },
    // ─── Stage 2: Vowels — match_quiz (steps 32–36) ───
    32: { prompt_es: '¿Qué vocal suena como la a en "padre"?' },
    33: { prompt_es: '¿Qué vocal suena como la o en "sol"?' },
    34: { prompt_es: '¿Qué vocal suena como la i en "sí"?' },
    35: { prompt_es: 'ㅠ se romaniza como…' },
    36: { prompt_es: 'ㅡ suena como…' },
    // ─── Stage 3: Syllables — syllable_builder (steps 37–42) ───
    37: { meaning_es: 'ba — como en 바나나 (banana)' },
    38: { meaning_es: 'na — como en 나 (yo)' },
    39: { meaning_es: 'sa — como en 사랑 (amor)' },
    40: { meaning_es: 'go — como en 고마워 (gracias)' },
    41: { meaning_es: 'ha — como en 하늘 (cielo)' },
    42: { meaning_es: 'mu — como en 무엇 (qué)' },
    // ─── Stage 4: Special — tense card_reveal (steps 43–47) ───
    43: { hint_es: 'k tensa — aguanta la respiración y suéltala. Sin soplo de aire.' },
    44: { hint_es: 't tensa — la garganta se tensa antes de soltar. Distinta de ㄷ y ㅌ.' },
    45: { hint_es: 'p tensa — los labios presionan fuerte antes de abrirse. Sin escape de aire.' },
    46: { hint_es: 's tensa — un siseo agudo y tenso. Se usa en 있다 (existir / tener).' },
    47: { hint_es: 'j tensa — más aguda y brusca que ㅈ. Sin explosión de aire.' },
    // ─── Stage 4: Special — aspirated card_reveal (steps 48–52) ───
    48: { hint_es: 'Aspirada — un fuerte soplo de aire sigue a la consonante.' },
    49: { hint_es: 'Aspirada — la lengua se separa del paladar con un soplo de aire.' },
    50: { hint_es: 'Aspirada — los labios estallan abriéndose con un soplo de aire.' },
    51: { hint_es: 'ch aspirada — como al inicio de "Chile". Sale aire.' },
    52: { hint_es: 'Consonante muy aspirada. La que más aire produce en coreano.' },
    // ─── Stage 4: Special — match_quiz (steps 53–57) ───
    53: { prompt_es: 'ㄲ se romaniza como…' },
    54: { prompt_es: '¿Cuál es una consonante TENSA (쌍자음)?' },
    55: { prompt_es: 'ㅃ se romaniza como…' },
    56: { prompt_es: 'Las consonantes aspiradas se producen con…', choices_es: ['Sin aire', 'Un fuerte soplo de aire', 'Una garganta tensa', 'Un sonido nasal'] },
    57: { prompt_es: 'ㅉ se romaniza como…' },
    // ─── Stage 5: Compound Vowels — card_reveal (steps 58–68) ───
    58: { hint_es: 'ㅏ + ㅣ combinadas. Como la e de "mesa". Hoy igual que 에.' },
    59: { hint_es: 'ㅓ + ㅣ combinadas. Como la e de "mesa". Suena igual que 애 hoy.' },
    60: { hint_es: 'ㅑ + ㅣ. Rara — aparece en 얘 (este niño/a, coloquial).' },
    61: { hint_es: 'ㅕ + ㅣ. Como ye en "yema". 예쁘다 = bonito/a.' },
    62: { hint_es: 'ㅗ + ㅏ. Como wa en "agua". ¡와! = ¡Guau!' },
    63: { hint_es: 'ㅗ + ㅐ. Suena como "wae". 왜 = por qué.' },
    64: { hint_es: 'ㅗ + ㅣ. Como "we". 외국인 = extranjero.' },
    65: { hint_es: 'ㅜ + ㅓ. Como "wo". 뭐 = qué (coloquial).' },
    66: { hint_es: 'ㅜ + ㅔ. Como "we". Muy rara en coreano.' },
    67: { hint_es: 'ㅜ + ㅣ. Como "wi". 위 = arriba / estómago.' },
    68: { hint_es: 'ㅡ + ㅣ. Un diptongo único. 의사 = médico. También es la partícula posesiva 의.' },
    // ─── Stage 5: Compound Vowels — match_quiz (steps 69–73) ───
    69: { prompt_es: 'ㅘ se romaniza como…' },
    70: { prompt_es: '왜 significa…', choices_es: ['qué', 'quién', 'por qué', 'dónde'] },
    71: { prompt_es: 'ㅢ se romaniza como…' },
    72: { prompt_es: '¿Qué vocal compuesta usa ㅗ + ㅣ?' },
    73: { prompt_es: '예 se romaniza como…' },
    // ─── Stage 6: Read Words — listen_repeat (steps 74–83) ───
    74: { meaning_es: 'hola / adiós (informal)' },
    75: { meaning_es: 'colegio / escuela' },
    76: { meaning_es: 'Corea' },
    77: { meaning_es: 'amor' },
    78: { meaning_es: 'agua' },
    79: { meaning_es: 'arroz / comida' },
    80: { meaning_es: 'persona' },
    81: { meaning_es: 'amigo/a' },
    82: { meaning_es: 'cielo' },
    83: { meaning_es: 'gracias (informal)' },
    // ─── Stage 6: lesson_complete (step 84) ───
    84: {
      title_es: '¡Puedes leer coreano!',
      message_es: '¡Increíble! Has completado las 6 etapas del hangul. Ahora puedes leer y escribir todos los caracteres del alfabeto coreano. ¡화이팅!'
    }
  }
);

console.log('\nDone! Batch 14 complete.');
