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

// ─── vocabulary.json ── 80 steps, 6 stages ───
patch('vocabulary.json',
  {
    1: { name_es: 'Saludos' },
    2: { name_es: 'Números' },
    3: { name_es: 'Familia y Cuerpo' },
    4: { name_es: 'Comida y Colores' },
    5: { name_es: 'Lugares y Viajes' },
    6: { name_es: 'Verbos y Adj.' }
  },
  {
    // ─── Stage 1: Greetings ───
    1: {
      title_es: 'Saludos en Coreano',
      body_es: 'Los saludos coreanos cambian dependiendo de con quién hablas y la situación. La distinción más importante es habla formal vs. informal. Usa formas formales con desconocidos, personas mayores y en entornos profesionales. Las formas informales son para amigos y personas menores que tú.',
      tip_es: { label: 'Regla clave: en caso de duda, sé formal', text: 'Los coreanos aprecian el esfuerzo. Usar la terminación formal 하세요 siempre es seguro con personas que acabas de conocer. Cambiar a 안녕 informal con un amigo cercano muestra calidez.' }
    },
    2:  { meaning_es: 'Hola — formal, el saludo más común' },
    3:  { meaning_es: 'Hola / Adiós (informal) — usado con amigos' },
    4:  { meaning_es: 'Gracias — formal, muy educado' },
    5:  { meaning_es: 'Gracias — educado pero menos formal que 감사합니다' },
    6:  { meaning_es: 'Lo siento — disculpa formal' },
    7:  { meaning_es: 'Está bien / ¿Estás bien? — frase muy versátil' },
    8:  { meaning_es: 'Encantado/a de conocerte — usado al conocer a alguien por primera vez' },
    9:  { prompt_es: '¿Qué frase significa "Hola" de la forma más formal?' },
    10: { prompt_es: '¿Cómo se dice "Gracias" de la forma más formal en coreano?' },
    11: { meaning_es: 'Adiós — dicho a la persona que se va' },
    12: { meaning_es: '¡Fighting! / ¡Tú puedes! — expresión coreana de aliento' },
    // ─── Stage 2: Numbers ───
    13: {
      title_es: 'Dos Sistemas Numéricos',
      body_es: 'El coreano usa dos sistemas numéricos separados: números coreanos nativos (고유어) y números sino-coreanos (한자어). Debes conocer ambos — se usan en situaciones diferentes.',
      rules_es: [
        'Coreano nativo: usar para contar objetos (개), edad (살) y horas del reloj (시) — ej. 하나, 둘, 셋',
        'Sino-coreano: usar para dinero (원), minutos (분), fechas, números de teléfono y direcciones — ej. 일, 이, 삼',
        'Los números grandes siempre usan sino-coreano — 백 (100), 천 (1.000), 만 (10.000)'
      ],
      tip_es: { label: 'Truco de memoria rápido', text: 'Piensa: Nativo = ritmos corporales naturales (latidos, edad, contar con los dedos). Sino = contextos sistemáticos/oficiales (relojes, dinero, calendarios).' }
    },
    14: { example_meaning_es: 'Por favor dame una manzana · Coreano nativo 1' },
    15: { example_meaning_es: 'Dos amigos · Coreano nativo 2' },
    16: { example_meaning_es: 'Cuenta hasta tres · Coreano nativo 3' },
    17: { example_meaning_es: 'Las 10 en punto · Coreano nativo 10 (usado para las horas)' },
    18: { example_meaning_es: '1 de enero · Sino-coreano 1' },
    19: { example_meaning_es: 'Diez minutos · Sino-coreano 10 (usado para los minutos)' },
    20: { example_meaning_es: '100 won · Sino-coreano 100' },
    21: { example_meaning_es: '1.000 won · Sino-coreano 1.000' },
    22: {
      prompt_es: 'Estás diciendo tu edad en coreano. ¿Qué sistema numérico usas?',
      choices_es: ['Sino-coreano (일, 이, 삼)', 'Coreano nativo (하나, 둘, 셋)', 'Cualquiera de los dos es válido', 'Ninguno — usar números en inglés']
    },
    23: {
      title_es: 'Clasificadores Coreanos',
      body_es: 'Los números coreanos deben ir acompañados de clasificadores (단위명사) — palabras especiales que indican qué tipo de cosa estás contando. El clasificador va después del número.',
      rules_es: [
        '개 (gae) — objetos en general: 사과 두 개 (dos manzanas)',
        '명 (myeong) — personas (formal): 학생 세 명 (tres estudiantes)',
        '분 (bun) — personas (honorífico): 선생님 두 분 (dos profesores)',
        '살 (sal) — edad: 스물다섯 살 (25 años)',
        '권 (gwon) — libros: 책 한 권 (un libro)',
        '잔 (jan) — tazas / vasos: 커피 한 잔 (una taza de café)'
      ]
    },
    24: { example_meaning_es: 'Tres caramelos · clasificador de objetos en general' },
    25: { example_meaning_es: 'Dos amigos · clasificador de personas (formal)' },
    26: {
      prompt_es: '¿Qué clasificador usas para libros (책)?',
      choices_es: ['개 (gae)', '명 (myeong)', '권 (gwon)', '잔 (jan)']
    },
    // ─── Stage 3: Family & Body ───
    27: {
      title_es: 'La Familia en Coreano',
      body_es: 'El coreano tiene palabras diferentes para los miembros de la familia dependiendo de tu género y el de ellos. Por ejemplo, un hermano mayor es 형 si quien habla es hombre, pero 오빠 si quien habla es mujer. Esto refleja el énfasis de la cultura coreana en la jerarquía relativa.',
      tip_es: { label: 'Títulos familiares honoríficos', text: 'Los coreanos a menudo llaman a personas que no son familiares con títulos familiares como señal de respeto: 언니 (hermana mayor) a una mujer conocida, 아저씨 (hombre de mediana edad) a un desconocido. Es más cálido que usar nombres.' }
    },
    28: { example_meaning_es: 'Padre · 아빠 es la forma informal (Papá)' },
    29: { example_meaning_es: 'Madre · 엄마 es la forma informal (Mamá)' },
    30: { example_meaning_es: 'Hermano mayor · 형 para hablantes masculinos, 오빠 para hablantes femeninas' },
    31: { example_meaning_es: 'Hermana mayor · 누나 para hablantes masculinos, 언니 para hablantes femeninas' },
    32: { example_meaning_es: 'Abuelo (paterno) · ¿Está usted bien, abuelo?' },
    33: { example_meaning_es: 'Abuela · Voy a casa de la abuela' },
    34: {
      prompt_es: 'Una hablante femenina llama a su hermano mayor ___.',
      choices_es: ['형 (hyeong)', '오빠 (oppa)', '언니 (eonni)', '남동생 (namdongsaeng)']
    },
    35: {
      title_es: 'Partes del Cuerpo',
      body_es: 'Conocer las partes del cuerpo es esencial para describir dolores en una clínica, entender indicaciones o describir la apariencia de alguien. Muchas palabras coreanas de partes del cuerpo también se usan idiomáticamente — por ejemplo, 눈이 높다 (literalmente "ojos altos") significa "tener estándares altos".'
    },
    36: { example_meaning_es: 'Cabeza / Cabello · Me duele la cabeza' },
    37: { example_meaning_es: 'Ojos · Sus ojos son grandes — ¡눈 también significa "nieve"!' },
    38: { example_meaning_es: 'Mano(s) · Lávate las manos' },
    39: { example_meaning_es: 'Pie(s) · Me duelen los pies' },
    40: {
      prompt_es: '¿Qué palabra coreana significa "oído"?',
      choices_es: ['코 (ko)', '귀 (gwi)', '입 (ip)', '목 (mok)']
    },
    // ─── Stage 4: Food & Colors ───
    41: {
      title_es: 'Comida Coreana',
      body_es: 'La comida es central en la cultura coreana. Una comida casi siempre viene con 반찬 (banchan) — pequeños platos de acompañamiento servidos junto al plato principal. La frase de mesa 잘 먹겠습니다 se dice antes de comer; 잘 먹었습니다 se dice después.',
      tip_es: { label: 'Vocabulario esencial de comida coreana', text: '밥 (bap) significa tanto "arroz" como "comida" — así que 밥 먹었어요? (¿ya comiste?) es un saludo común entre coreanos, similar a preguntar "¿cómo estás?"' }
    },
    42: { meaning_es: 'Arroz / Comida — la piedra angular de la cocina coreana' },
    43: { meaning_es: 'Kimchi — verduras fermentadas, el acompañamiento más icónico de Corea' },
    44: { meaning_es: 'Bibimbap — bol de arroz mixto con verduras, huevo y gochujang' },
    45: { meaning_es: 'Samgyeopsal — panceta de cerdo a la parrilla, un corte clásico del BBQ coreano' },
    46: { meaning_es: 'Tteokbokki — pastelitos de arroz picantes, amada comida callejera coreana' },
    47: {
      prompt_es: '¿Qué es 불고기 (bulgogi)?',
      choices_es: ['Estofado de tofu picante', 'Carne de res BBQ coreana', 'Fideos fríos', 'Panceta de cerdo a la parrilla']
    },
    48: {
      title_es: 'Los Colores',
      body_es: 'Las palabras de color en coreano terminan en 색 (saek), que significa "color". Por ejemplo: 빨간색 (ppalgansaek) = color rojo. En el habla cotidiana, 색 a menudo se omite — 빨간 (ppalgan) también se usa como adjetivo. Algunos colores tienen formas poéticas coreanas nativas junto a los compuestos sino-coreanos con -색.',
      tip_es: { label: 'Forma adjetiva', text: 'Para decir "un bolso rojo", omite 색: 빨간 가방 (bolso rojo). Añade el sustantivo directamente después del adjetivo de color — no se necesita partícula extra.' }
    },
    49: { example_meaning_es: 'Rojo · una manzana roja' },
    50: { example_meaning_es: 'Azul · un cielo azul' },
    51: { example_meaning_es: 'Amarillo · un plátano amarillo' },
    52: { example_meaning_es: 'Verde · un árbol verde' },
    53: {
      prompt_es: '흰색 (huinsaek) es qué color?',
      choices_es: ['Negro', 'Gris', 'Blanco', 'Plateado']
    },
    // ─── Stage 5: Places & Travel ───
    54: {
      title_es: 'Lugares en Corea',
      body_es: 'Corea es famosa por su comodidad — las 편의점 (tiendas de conveniencia) están abiertas las 24 horas en prácticamente cada esquina. Aprender los nombres de los lugares comunes te ayuda a navegar las ciudades, pedir indicaciones y entender los carteles públicos.',
      tip_es: { label: 'Lugares esenciales de la ciudad', text: 'Dos lugares únicamente coreanos: 노래방 (noraebang) — salas de karaoke privadas donde cantas con amigos, no con desconocidos. 찜질방 (jjimjilbang) — sauna coreana y espacio de descanso comunitario, abierto 24h.' }
    },
    55: { example_meaning_es: 'Colegio / Escuela · Voy al colegio' },
    56: { example_meaning_es: 'Hospital · Tengo que ir al hospital' },
    57: { example_meaning_es: 'Tienda de conveniencia · Lo compré en la tienda de conveniencia' },
    58: { example_meaning_es: 'Estación de metro · ¿Dónde está la estación de metro?' },
    59: {
      prompt_es: '¿Adónde vas en Corea para comprar medicamentos?',
      choices_es: ['은행 (eunhaeng)', '약국 (yakguk)', '백화점 (baekhwajeom)', '노래방 (noraebang)']
    },
    60: {
      title_es: 'Vocabulario de Viaje',
      body_es: 'Ya sea que estés reservando un viaje o navegando un aeropuerto, estas palabras de viaje son esenciales. Los aeropuertos y sistemas de tránsito coreanos muestran carteles en coreano e inglés, pero conocer los términos coreanos te ayuda a hacer preguntas con confianza.',
      rules_es: [
        '여권 (yeogwon) — pasaporte',
        '예약 (yeyak) — reserva',
        '환전 (hwanjeon) — cambio de moneda',
        '도착 (dochak) — llegada',
        '출발 (chulbal) — salida',
        '수하물 (suhamul) — equipaje'
      ]
    },
    61: { meaning_es: 'Pasaporte — llévalo siempre contigo cuando viajes' },
    62: { meaning_es: 'Reserva — usado para hoteles, restaurantes, vuelos' },
    63: { meaning_es: 'Llegada — mostrado en los paneles de llegadas del aeropuerto' },
    64: { meaning_es: 'Salida — mostrado en los paneles de salidas del aeropuerto' },
    65: {
      prompt_es: '¿Cómo se dice "aeropuerto" en coreano?',
      choices_es: ['기차역 (gicha yeok)', '공항 (gonghang)', '버스터미널 (beosu terminal)', '항구 (hanggu)']
    },
    66: { meaning_es: '¿Cuánto cuesta? — frase esencial de compras' },
    // ─── Stage 6: Verbs & Adj. ───
    67: {
      title_es: 'Verbos Coreanos',
      body_es: 'Todos los verbos coreanos terminan en 다 (da) en su forma de diccionario — esto se llama el infinitivo. Al hablar, los verbos se conjugan reemplazando 다 con terminaciones que muestran tiempo, formalidad y modo. El presente educado usa terminaciones 아요 / 어요.',
      rules_es: [
        '가다 → 가요 (ir → voy/va/vamos)',
        '먹다 → 먹어요 (comer → como/come/comemos)',
        '공부하다 → 공부해요 (estudiar → estudio/estudia/estudiamos)'
      ],
      tip_es: { label: 'Empieza con estos 5 verbos esenciales', text: '가다 (ir) · 오다 (venir) · 먹다 (comer) · 보다 (ver) · 하다 (hacer). 하다 es el más versátil — se une a sustantivos para hacer verbos: 공부하다 (estudiar), 일하다 (trabajar), 사랑하다 (amar).' }
    },
    68: { example_meaning_es: 'Ir · (Yo) voy al colegio' },
    69: { example_meaning_es: 'Comer · (Yo) como arroz' },
    70: { example_meaning_es: 'Hablar / decir · (Yo) hablo en coreano' },
    71: { example_meaning_es: 'Estudiar · (Yo) estudio coreano' },
    72: { example_meaning_es: 'Gustar · (A mí) me gusta la música' },
    73: {
      prompt_es: '¿Qué verbo significa "beber"?',
      choices_es: ['먹다 (meokda)', '마시다 (masida)', '보다 (boda)', '듣다 (deutda)']
    },
    74: {
      title_es: 'Adjetivos Coreanos',
      body_es: 'En coreano, los adjetivos funcionan como verbos — se conjugan para tiempo y formalidad. La forma de diccionario termina en 다, igual que los verbos. En el presente educado: 좋다 → 좋아요 (está bien/me gusta), 크다 → 커요 (es grande). Esto es muy diferente del español donde los adjetivos no se conjugan.',
      tip_es: { label: 'Pares para aprender juntos', text: 'Aprende opuestos en pares: 크다 / 작다 (grande/pequeño), 빠르다 / 느리다 (rápido/lento), 쉽다 / 어렵다 (fácil/difícil), 좋다 / 나쁘다 (bueno/malo). Aprender pares reduce el esfuerzo de memorización a la mitad.' }
    },
    75: { example_meaning_es: 'Bueno / Bonito · El tiempo está bueno' },
    76: { example_meaning_es: 'Delicioso · El kimchi está delicioso' },
    77: { example_meaning_es: 'Interesante / Divertido · El coreano es divertido' },
    78: { example_meaning_es: 'Grande · Seúl es una ciudad grande' },
    79: {
      prompt_es: '¿Qué adjetivo significa "difícil"?',
      choices_es: ['쉽다 (swipda)', '어렵다 (eobyeopda)', '느리다 (neurida)', '나쁘다 (nappeuda)']
    },
    80: {
      title_es: '¡Vocabulario Completado!',
      message_es: 'Has cubierto 6 categorías de vocabulario — saludos, números, familia, comida, lugares y verbos. Sigue ampliando tu banco de palabras y pronto tendrás conversaciones en coreano.'
    }
  }
);

console.log('\nDone! Batch 16 complete.');
