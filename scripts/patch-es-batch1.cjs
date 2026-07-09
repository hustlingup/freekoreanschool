/**
 * Manually adds _es (Spanish) fields to vocabulary JSON lesson files.
 * Run: node scripts/patch-es-batch1.cjs
 */
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'learn', 'data');

function patch(filename, stagePatch, stepPatches) {
  const file = path.join(DATA, filename);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  // Patch stages
  if (stagePatch) {
    data.stages.forEach((s, i) => {
      if (stagePatch[s.id]) Object.assign(s, stagePatch[s.id]);
    });
  }

  // Patch steps by id
  data.steps.forEach(step => {
    const p = stepPatches[step.id];
    if (!p) return;
    // insert each _es field after its base key
    Object.entries(p).forEach(([k, v]) => {
      step[k] = v;
    });
  });

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ patched', filename);
}

// ─────────────────────────────────────────────
// vocabulary-greetings.json
// ─────────────────────────────────────────────
patch('vocabulary-greetings.json',
  { 1: { name_es: 'Saludos' } },
  {
    1: {
      title_es: 'Saludos en Coreano',
      body_es: 'Los saludos coreanos cambian según con quién hablas y la situación. La distinción más importante es el habla formal vs. informal. Usa formas formales con desconocidos, personas mayores y en entornos profesionales. Las formas informales son para amigos y personas menores que tú.',
      tip_es: { label: 'Regla clave: ante la duda, sé formal', text: 'Los coreanos aprecian el esfuerzo. Usar el final formal 하세요 siempre es seguro con personas que acabas de conocer. Cambiar al informal 안녕 con un amigo cercano muestra calidez.' }
    },
    2:  { meaning_es: 'Hola — formal, el saludo más común' },
    3:  { meaning_es: 'Hola / Adiós (informal) — se usa con amigos' },
    4:  { meaning_es: 'Gracias — formal, muy cortés' },
    5:  { meaning_es: 'Gracias — cortés pero menos formal' },
    6:  { meaning_es: 'Lo siento — disculpa formal' },
    7:  { meaning_es: 'Está bien / ¿Estás bien? — frase muy versátil' },
    8:  { meaning_es: 'Mucho gusto — primer encuentro formal' },
    9:  { meaning_es: 'Adiós — dicho a la persona que se va' },
    10: { meaning_es: 'Adiós — dicho por la persona que se va' },
    11: { meaning_es: '¡Ánimo! / ¡Tú puedes! — grito de aliento' },
    12: { meaning_es: 'Encantado de conocerle — presentación muy formal' },
    13: { meaning_es: 'Por favor, cuídame — dicho al comenzar una nueva relación' },
    14: { prompt_es: '¿Qué frase dice "Hola" de la forma más formal?' },
    15: { prompt_es: '¿Cómo se dice "Gracias" en coreano de la forma más formal?' },
    16: {
      title_es: '¡Saludos Completados!',
      message_es: 'Has aprendido 12 saludos esenciales en coreano — desde holas formales hasta adioses alegres. Con solo estas frases causarás una gran impresión en los hablantes de coreano que conozcas.'
    }
  }
);

// ─────────────────────────────────────────────
// vocabulary-colors.json
// ─────────────────────────────────────────────
patch('vocabulary-colors.json',
  { 1: { name_es: 'Colores' } },
  {
    1: {
      title_es: 'Colores en Coreano',
      body_es: 'El coreano tiene dos formas de expresar colores. Los adjetivos descriptivos terminan en -다 (ej. 빨갛다 = ser rojo) y se usan en oraciones. Los sustantivos de color terminan en -색 (color) y se usan para nombrar el color en sí. Ambas formas son ampliamente usadas.',
      tip_es: { label: '-색 vs. forma adjetiva', text: '빨간색 (el color rojo) vs. 빨개요 (es rojo). Para nombrar un color directamente, usa la forma -색. Para describir algo, usa la forma adjetiva: 이 셔츠는 빨개요 (Esta camisa es roja).' }
    },
    2:  { meaning_es: 'Rojo — 빨강 es la forma abreviada' },
    3:  { meaning_es: 'Azul — en el habla cotidiana también se usa para los semáforos en "verde"' },
    4:  { meaning_es: 'Amarillo' },
    5:  { meaning_es: 'Verde — de 초록 (verde intenso)' },
    6:  { meaning_es: 'Blanco — 하얀색 es una alternativa igualmente común' },
    7:  { meaning_es: 'Negro — 까만색 también es ampliamente usado' },
    8:  { meaning_es: 'Morado / violeta' },
    9:  { meaning_es: 'Naranja' },
    10: { meaning_es: 'Rosa — 핑크색 (pinkeu saek) es la alternativa en konglish' },
    11: { meaning_es: 'Marrón / café' },
    12: { meaning_es: 'Azul cielo — literalmente "color del cielo" (하늘 = cielo)' },
    13: { meaning_es: 'Gris' },
    14: { meaning_es: 'Dorado — 금 (geum) significa "oro" o "dinero"' },
    15: { meaning_es: 'Plateado — 은 (eun) significa "plata"' },
    16: { meaning_es: 'Color — la palabra general para color' },
    17: {
      prompt_es: '¿De qué color es 파란색?',
      choices_es: ['Rojo', 'Amarillo', 'Azul', 'Verde']
    },
    18: {
      prompt_es: '하늘색 literalmente significa "color del cielo". ¿Qué color es?',
      choices_es: ['Azul oscuro', 'Azul cielo', 'Morado', 'Turquesa']
    },
    19: { prompt_es: 'Rosa en coreano es...' },
    20: {
      title_es: '¡Colores Completados!',
      message_es: '훌륭해요! Ya conoces la paleta de colores en coreano. Los colores aparecen en las compras, al describir objetos y en conversaciones de moda de K-drama. Prueba usando uno hoy: 무슨 색 좋아해요? (¿Qué color te gusta?)'
    }
  }
);

// ─────────────────────────────────────────────
// vocabulary-family.json
// ─────────────────────────────────────────────
patch('vocabulary-family.json',
  { 1: { name_es: 'Familia' } },
  {
    1: {
      title_es: 'La Familia en Coreano',
      body_es: 'El vocabulario familiar en coreano es más detallado que en español — distingue no solo la relación, sino también si eres mayor o menor, y si eres hombre o mujer. Por ejemplo, "hermano mayor" tiene palabras diferentes según si quien habla es hombre (형) o mujer (오빠).',
      tip_es: { label: 'El género importa aquí', text: 'Los hablantes masculinos usan 형 (hermano mayor) y 누나 (hermana mayor). Las hablantes femeninas usan 오빠 (hermano mayor) y 언니 (hermana mayor). Esta es una de las características más distintivas del coreano.' }
    },
    2:  { meaning_es: 'Padre — término formal / respetuoso' },
    3:  { meaning_es: 'Madre — término formal / respetuoso' },
    4:  { meaning_es: 'Papá — informal, usado por niños y jóvenes' },
    5:  { meaning_es: 'Mamá — informal, usado por niños y jóvenes' },
    6:  { meaning_es: 'Hermano mayor — dicho por un hablante masculino' },
    7:  { meaning_es: 'Hermano mayor — dicho por una hablante femenina' },
    8:  { meaning_es: 'Hermana mayor — dicha por un hablante masculino' },
    9:  { meaning_es: 'Hermana mayor — dicha por una hablante femenina' },
    10: { meaning_es: 'Hermano menor — nam (남) = masculino' },
    11: { meaning_es: 'Hermana menor — yeo (여) = femenino' },
    12: { meaning_es: 'Abuelo' },
    13: { meaning_es: 'Abuela' },
    14: { meaning_es: 'Esposo / Marido' },
    15: { meaning_es: 'Esposa / Mujer' },
    16: { meaning_es: 'Hijo' },
    17: { meaning_es: 'Hija' },
    18: {
      prompt_es: 'Una hablante femenina llama a su hermano mayor...',
      choices_es: ['형 (hyeong)', '오빠 (oppa)', '누나 (nuna)', '언니 (eonni)']
    },
    19: { prompt_es: '¿Cómo se dice "abuela" en coreano?' },
    20: {
      title_es: '¡Familia Completada!',
      message_es: 'Has aprendido el vocabulario familiar en coreano — uno de los aspectos más únicos del idioma. ¡Las distinciones de género para los hermanos incluso se usan entre amigos cercanos en la cultura coreana!'
    }
  }
);

// ─────────────────────────────────────────────
// vocabulary-emotions.json
// ─────────────────────────────────────────────
patch('vocabulary-emotions.json',
  { 1: { name_es: 'Emociones' } },
  {
    1: {
      title_es: 'Emociones en Coreano',
      body_es: 'Las emociones en coreano se expresan frecuentemente con verbos en forma 해요 en lugar de adjetivos. Muchos estados emocionales terminan en -워요 (de adjetivos en -웁다). Los coreanos también usan el concepto de 눈치 (nunchi) — leer las emociones del otro sin que tenga que expresarlo.',
      tip_es: { label: '왜 그래요? (¿Qué pasa?)', text: 'Si alguien pregunta 왜 그래요? (¿Por qué/Qué pasa?), puedes responder con cualquier palabra de emoción + 아요/어요. Ej: 슬퍼요 (Estoy triste), 피곤해요 (Estoy cansado/a).' }
    },
    2:  { meaning_es: 'Soy feliz / Estoy feliz — 행복 (felicidad) es el sustantivo raíz' },
    3:  { meaning_es: 'Estoy triste — de 슬프다 (estar triste)' },
    4:  { meaning_es: 'Estoy enojado/a — 화 significa "ira/fuego"; 화가 나다 = surge la ira' },
    5:  { meaning_es: 'Tengo miedo / Da miedo' },
    6:  { meaning_es: 'Estoy contento/a / encantado — más fuerte que 행복해요' },
    7:  { meaning_es: 'Estoy preocupado/a — 걱정 (preocupación) es un sustantivo muy común en coreano' },
    8:  { meaning_es: 'Estoy avergonzado/a' },
    9:  { meaning_es: 'Me sorprendí — ¡깜짝이야! (¡Qué susto!) te hace decir esto' },
    10: { meaning_es: 'Estoy solo/a — tema recurrente en las letras de K-drama' },
    11: { meaning_es: 'Estoy cansado/a / agotado/a' },
    12: { meaning_es: 'Estoy emocionado/a / el corazón me late fuerte — se usa para la emoción romántica' },
    13: { meaning_es: 'Echo de menos (a alguien/algo) — 보고 싶어요 también es muy usado' },
    14: { meaning_es: 'Me emocioné / Me conmovió — 감동 es "impacto emocional profundo"' },
    15: { meaning_es: 'Estrés — 스트레스 받아요 = Estoy estresado/a' },
    16: { meaning_es: 'Sentimiento / Ánimo — 기분이 어때요? = ¿Cómo te sientes?' },
    17: {
      prompt_es: '설레요 se describe mejor como...',
      choices_es: [
        'Estoy cansado/a',
        'Mi corazón late con emoción',
        'Estoy avergonzado/a',
        'Estoy enojado/a'
      ]
    },
    18: {
      prompt_es: '기분이 어때요? significa...',
      choices_es: [
        '¿Qué estás haciendo?',
        '¿Cómo te sientes?',
        '¿Adónde vas?',
        '¿Qué comiste?'
      ]
    },
    19: { prompt_es: '¿Qué palabra de emoción contiene literalmente "화" que significa fuego/ira?' },
    20: {
      title_es: '¡Emociones Completadas!',
      message_es: '감동이에요! (¡Me emociona!) Ahora tienes el vocabulario para expresar tu mundo interior en coreano. La música, los dramas y las conversaciones coreanas están llenas de estas emociones — las notarás en todas partes.'
    }
  }
);

console.log('\nDone! Batch 1 complete.');
