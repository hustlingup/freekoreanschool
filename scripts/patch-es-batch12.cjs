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

// ─── grammar.json ───
patch('grammar.json',
  {
    1:  { name_es: 'Oración' },
    2:  { name_es: 'Partículas' },
    3:  { name_es: 'Conjugación' },
    4:  { name_es: 'Negación' },
    5:  { name_es: 'Preguntas' },
    6:  { name_es: 'Patrones' },
    7:  { name_es: 'Conectores' },
    8:  { name_es: 'Y / Con' },
    9:  { name_es: 'A / De' },
    10: { name_es: 'Tiempo' },
    11: { name_es: 'Contadores' },
    12: { name_es: 'Progresivo' },
    13: { name_es: 'Presentación' },
    14: { name_es: 'Fechas' },
    15: { name_es: 'Adverbios' },
    16: { name_es: 'Nominalizador' },
    17: { name_es: 'Comparativos' },
    18: { name_es: 'Gustar' },
    19: { name_es: 'Todavía / Ya' },
    20: { name_es: 'Indefinido' },
    21: { name_es: 'Imperativo' },
    22: { name_es: 'Prohibición' },
    23: { name_es: 'Método' },
    24: { name_es: 'Bien / Mal' },
    25: { name_es: 'Todo / Más' },
    26: { name_es: '-도 Avanzado' }
  },
  {
    1: {
      title_es: 'Orden de Palabras — SOV',
      body_es: 'El coreano sigue el orden Sujeto → Objeto → Verbo (SOV). El verbo va siempre AL FINAL.',
      rules_es: [
        'Español (SVO): Yo como arroz.',
        'Coreano (SOV): 나는 밥을 먹어요. (Yo arroz como.)',
        'Consejo: ¡Escucha la última palabra — ese es el verbo, la acción!'
      ],
      tip_es: { label: 'Consejo gramatical', text: 'Una vez que sabes que el verbo va al final, todo encaja. El resto de la oración puede reorganizarse — los hablantes coreanos usan partículas para mantener la claridad.' }
    },
    2:  { meaning_es: 'Yo como arroz. (Sujeto + Objeto + Verbo)' },
    3: {
      prompt_es: 'En una oración coreana, el verbo va siempre...',
      choices_es: ['Al final', 'Al principio', 'En segundo lugar', 'En cualquier lugar']
    },
    4: {
      title_es: 'Partículas Coreanas',
      body_es: 'Las partículas se unen a los sustantivos para indicar su función: tema, sujeto, objeto, ubicación. Reemplazan el orden fijo de las palabras.',
      rules_es: [
        '은/는 → Marcador de tema (은 tras consonante, 는 tras vocal)',
        '이/가 → Marcador de sujeto (이 tras consonante, 가 tras vocal)',
        '을/를 → Marcador de objeto (을 tras consonante, 를 tras vocal)',
        '에 → Ubicación / Dirección',
        '에서 → Lugar de la acción',
        '의 → Posesivo (de)'
      ]
    },
    5:  { meaning_es: 'Soy estudiante. (는 = marcador de tema)' },
    6: {
      prompt_es: '은/는 marca el ___',
      choices_es: ['Tema', 'Sujeto', 'Objeto', 'Ubicación']
    },
    7:  { meaning_es: 'Llueve. / Está lloviendo. (가 = marcador de sujeto)' },
    8:  { prompt_es: 'Para marcar 밥 (arroz) como OBJETO: 밥___ 먹어요' },
    9:  { meaning_es: 'Tomo café en el café. (에서 = lugar de la acción)' },
    10: {
      prompt_es: '에서 marca...',
      choices_es: ['Lugar de la acción', 'Destino', 'Tema', 'Objeto']
    },
    11: {
      title_es: 'Verbos — Forma de Diccionario',
      body_es: 'Todos los verbos coreanos en forma de diccionario terminan en 다 (da). Elimina 다 para obtener la raíz verbal y luego añade una terminación.',
      rules_es: [
        '가다 (ir) → raíz: 가-',
        '먹다 (comer) → raíz: 먹-',
        '공부하다 (estudiar) → raíz: 공부하-',
        '하다 (hacer) → raíz: 하-'
      ]
    },
    12: {
      title_es: 'Presente: -아요 / -어요',
      body_es: 'Añade -아요 después de raíces con ㅏ o ㅗ. Añade -어요 para todas las demás. Los verbos con 하다 usan -해요.',
      rules_es: [
        '가다 → 가요 (ir · raíz ㅏ)',
        '오다 → 와요 (venir · raíz ㅗ)',
        '먹다 → 먹어요 (comer · otras)',
        '마시다 → 마셔요 (beber · otras)',
        '공부하다 → 공부해요 (estudiar · 하다)'
      ],
      tip_es: { label: 'Regla Vocálica', text: 'ㅏ y ㅗ son vocales "brillantes" → -아요. Todas las demás vocales son "oscuras" → -어요. Una vez que conoces la vocal de la raíz, la conjugación es automática.' }
    },
    13: { meaning_es: 'Voy / Vamos. (가다 → 가요, presente educado)' },
    14: { meaning_es: 'Como / estoy comiendo. (먹다 → 먹어요, presente educado)' },
    15: { prompt_es: '가다 (ir) → ¿forma educada del presente?' },
    16: {
      title_es: 'Pasado: -았어요 / -었어요',
      body_es: 'Añade -았어요 después de raíces con ㅏ/ㅗ y -었어요 para las demás. 하다 → 했어요.',
      rules_es: [
        '가다 → 갔어요 (fui)',
        '오다 → 왔어요 (vine)',
        '먹다 → 먹었어요 (comí)',
        '마시다 → 마셨어요 (bebí)',
        '공부하다 → 공부했어요 (estudié)'
      ]
    },
    17: { meaning_es: 'Fui a Seúl.' },
    18: { prompt_es: '¿Pasado de 먹다 (comer)?' },
    19: {
      title_es: 'Futuro: -(으)ㄹ 거예요',
      body_es: 'Añade -(으)ㄹ 거예요 a la raíz verbal para hablar de planes o predicciones futuras.',
      rules_es: [
        '가다 → 갈 거예요 (iré)',
        '먹다 → 먹을 거예요 (comeré)',
        '공부하다 → 공부할 거예요 (estudiaré)'
      ]
    },
    20: { prompt_es: '가다 (ir) → ¿futuro?' },
    21: {
      title_es: 'Hacer Oraciones Negativas',
      body_es: 'Negación corta: 안 + verbo. Negación larga: raíz verbal + 지 않아요. No poder: 못 + verbo.',
      rules_es: [
        '안 먹어요 (no como — forma corta)',
        '먹지 않아요 (no como — forma larga)',
        '못 가요 (no puedo ir — incapaz)'
      ]
    },
    22: { prompt_es: '"No como" — forma de negación corta' },
    23: {
      title_es: 'Formando Preguntas',
      body_es: 'Las preguntas coreanas usan el MISMO orden de palabras que las declaraciones — solo añade entonación ascendente (↑) o un signo de interrogación.',
      rules_es: [
        '뭐 / 무엇 — Qué',
        '누구 — Quién',
        '어디 — Dónde',
        '언제 — Cuándo',
        '왜 — Por qué',
        '어떻게 — Cómo',
        '얼마 — Cuánto',
        '몇 — Cuántos'
      ],
      tip_es: { label: 'Consejo Gramatical', text: '밥을 먹어요 = Como arroz. 밥을 먹어요? = ¿Comes arroz? Las mismas palabras — solo entonación ascendente al final. ¡Sin inversión como en español!' }
    },
    24: { meaning_es: '¿Cómo te llamas? / ¿Cuál es tu nombre?' },
    25: { prompt_es: '"Dónde" en coreano?' },
    26: {
      title_es: 'Patrones de Oraciones Esenciales',
      body_es: 'Domina estos 6 patrones para expresar las ideas más comunes en conversaciones en coreano.',
      rules_es: [
        '~이에요/예요 — es/soy/eres (sustantivo): 학생이에요 (Soy estudiante)',
        '~고 싶어요 — quiero: 한국에 가고 싶어요 (Quiero ir a Corea)',
        '~ㄹ/을 수 있어요 — puedo: 한국어를 할 수 있어요 (Puedo hablar coreano)',
        '~아/어야 해요 — debo: 공부해야 해요 (Debo estudiar)',
        '~(으)면 — si/cuando: 비가 오면 집에 있어요 (Si llueve, me quedo en casa)',
        '~때문에 — por / debido a: 비 때문에 못 가요 (No puedo ir por la lluvia)'
      ]
    },
    27: { prompt_es: 'Patrón para "Quiero ir a Corea": 한국에 ___' },
    28: {
      title_es: 'Conectores',
      body_es: 'Estas 4 conjunciones conectan oraciones. Colócalas al INICIO de la segunda oración.',
      rules_es: [
        '그리고 — Y / Y entonces (añade información o secuencia)',
        '그래서 — Entonces / Por eso (causa → resultado)',
        '그렇지만 — Pero / Sin embargo (contraste fuerte, formal)',
        '그런데 — Pero / Por cierto (contraste suave, informal — ¡el más común!)'
      ],
      tip_es: { label: 'Consejo de Uso', text: '그런데 es una de las palabras más comunes en el coreano oral — suaviza el contraste y cambia los temas de manera natural. 그렇지만 es más fuerte y formal.' }
    },
    29: { meaning_es: 'Llovió. Entonces me quedé en casa.' },
    30: { prompt_es: '¿Contraste suave o cambio de tema — más común en el coreano oral?' },
    31: {
      title_es: 'Y, Con',
      body_es: 'Usa estas partículas entre sustantivos (no entre oraciones) para significar "y" o "con".',
      rules_es: [
        '-하고 — después de cualquier sustantivo, neutral/informal: 친구하고 갔어요 (fui con un amigo)',
        '-(이)랑 — 이랑 (consonante) / 랑 (vocal), muy informal: 오빠랑 놀았어요 (jugué con mi hermano mayor)',
        '-와/과 — 와 (vocal) / 과 (consonante), formal/escrito: 선생님과 상담했어요 (consulté con el profesor)'
      ]
    },
    32: {
      title_es: 'A / De Alguien',
      body_es: 'Usa partículas de dirección personal cuando das o recibes de personas, no de lugares.',
      rules_es: [
        '-한테 — a (una persona): 친구한테 전화했어요 (llamé a mi amigo)',
        '-한테서 — de (una persona): 선생님한테서 배웠어요 (aprendí del profesor)',
        '-에게 / -에게서 — equivalentes formales',
        '-께 — a (honorífico, para mayores): 선생님께 드렸어요'
      ]
    },
    33: {
      title_es: 'Decir la Hora',
      body_es: 'Usa números COREANOS NATIVOS para las horas (시) y números SINO-COREANOS para los minutos (분). AM = 오전, PM = 오후.',
      rules_es: [
        'Horas (시): 한(1), 두(2), 세(3), 네(4), 다섯(5)... + 시',
        'Minutos (분): 일(1), 이(2), 삼(3), 사(4), 오(5)... + 분',
        'Y media: 반 — 세 시 반 = 3:30',
        'Ejemplo: 오후 두 시 삼십 분 = 2:30 PM'
      ],
      tip_es: { label: 'Patrón Clave', text: 'Las horas usan números coreanos nativos (한, 두, 세...). Los minutos usan números sino-coreanos (일, 이, 삼...). Y media = 반. AM = 오전, PM = 오후.' }
    },
    34: { meaning_es: '¿Qué hora es ahora?' },
    35: {
      prompt_es: '¿Las horas en la hora coreana usan qué sistema numérico?',
      choices_es: ['Coreano nativo (한, 두, 세...)', 'Sino-coreano (일, 이, 삼...)', 'Cualquiera de los dos', 'Números arábigos']
    },
    36: {
      title_es: 'Contadores',
      body_es: 'El coreano usa contadores específicos después de [Sustantivo] + [Número]. Se usan números coreanos nativos (한, 두, 세...) con la mayoría de los contadores.',
      rules_es: [
        '개 — objetos en general: 사과 세 개 (3 manzanas)',
        '명 — personas (neutral): 학생 두 명 (2 estudiantes)',
        '분 — personas (honorífico): 손님 두 분 (2 invitados)',
        '마리 — animales: 고양이 한 마리 (1 gato)',
        '권 — libros: 책 세 권 (3 libros)',
        '잔 — tazas/bebidas: 커피 두 잔 (2 cafés)',
        '번 — veces/turnos: 세 번 (3 veces)'
      ]
    },
    37: { meaning_es: 'Por favor dame tres manzanas.' },
    38: { prompt_es: '¿Contador para personas (neutral)?' },
    39: {
      title_es: 'Presente Progresivo',
      body_es: 'Añade -고 있어요 a la raíz verbal para decir que alguien ESTÁ HACIENDO algo ahora mismo (la forma "-ando/-iendo" del coreano).',
      rules_es: [
        '먹다 → 먹고 있어요 (está comiendo)',
        '가다 → 가고 있어요 (está yendo)',
        '공부하다 → 공부하고 있어요 (está estudiando)',
        '읽다 → 읽고 있어요 (está leyendo)'
      ],
      tip_es: { label: 'Progresivo vs Simple', text: '먹어요 = Como (general o ahora mismo, según el contexto). 먹고 있어요 = Estoy comiendo (específicamente en progreso en este momento). El progresivo añade "en acción actualmente".' }
    },
    40: { meaning_es: 'Estoy comiendo ahora mismo.' },
    41: { prompt_es: '"está estudiando" → 공부하다 + -고 있어요 =' },
    42: {
      title_es: 'Presentación Personal',
      body_es: 'Vocabulario clave: 이름 (nombre), 나이 (edad), 나라 (país), 직업 (trabajo), 취미 (pasatiempo), 고향 (ciudad natal).',
      rules_es: [
        '안녕하세요! 저는 [nombre]이에요/예요.',
        '저는 [나라]에서 왔어요. (Soy de [país].)',
        '저는 [직업]이에요. (Soy [trabajo].)',
        '제 취미는 [pasatiempo]예요. (Mi pasatiempo es [pasatiempo].)',
        '잘 부탁드려요! (¡Mucho gusto!)'
      ],
      tip_es: { label: 'Plantilla', text: 'Usa 안녕하세요 + 잘 부탁드려요 para entornos formales. Con amigos o pares: 안녕! + 잘 부탁해! Inclínate levemente cuando te presentes en persona.' }
    },
    43: {
      title_es: 'Fechas y Meses',
      body_es: 'Las fechas coreanas usan números sino-coreanos en orden Año → Mes → Día. Junio = 유월, Octubre = 시월 (excepciones).',
      rules_es: [
        '일월(1월), 이월(2월), 삼월(3월), 사월(4월), 오월(5월), 유월(6월)',
        '칠월(7월), 팔월(8월), 구월(9월), 시월(10월), 십일월(11월), 십이월(12월)',
        'Formato de fecha: 2026년 6월 16일 (16 de junio de 2026)',
        '오늘이 며칠이에요? — ¿Qué fecha es hoy?'
      ]
    },
    44: {
      title_es: 'Adverbios de Grado',
      body_es: 'Los adverbios de grado van directamente antes de la palabra que modifican: 조금 (un poco), 정말 (de verdad), 아주 (muy), 많이 (mucho).',
      rules_es: [
        '조금 / 좀 — un poco (좀 es más suave/informal)',
        '정말 — de verdad / realmente (neutro)',
        '진짜 — de verdad (informal, sensación más fuerte)',
        '아주 — muy',
        '많이 — mucho',
        '별로 + negación — no mucho (별로 안 좋아요 = No me gusta mucho)',
        '전혀 + negación — para nada (전혀 모르겠어요 = No tengo ni idea)'
      ],
      tip_es: { label: 'Adverbios Negativos', text: '별로 y 전혀 DEBEN usarse con un verbo negativo (안, 못, 없다, 모르다). Decir 별로 좋아요 (sin negación) es agramatical. Piensa en ellos como "no mucho" y "para nada".' }
    },
    45: { meaning_es: '¡Está muy rico!' },
    46: {
      prompt_es: '별로 y 전혀 deben usarse con...',
      choices_es: ['Un verbo negativo', 'Un verbo positivo', 'Solo un adjetivo', 'Solo tiempo pasado']
    },
    47: {
      title_es: 'Nominalizador: -는 것',
      body_es: 'Añadir -는 것 a la raíz verbal crea una frase nominal — "el acto de hacer ~". Hace que los verbos actúen como sustantivos.',
      rules_es: [
        '먹는 것 — el acto de comer',
        '배우는 것 — el acto de aprender',
        '한국어를 배우는 것이 재미있어요 — Aprender coreano es interesante',
        '요리하는 것을 좋아해요 — Me gusta cocinar (el acto de cocinar)'
      ],
      tip_es: { label: 'Formas de Tiempo', text: '-는 것 (presente/habitual) · -(으)ㄴ 것 (pasado/completado) · -(으)ㄹ 것 (futuro/planeado). La forma presente es la más común en el habla cotidiana.' }
    },
    48: { meaning_es: 'Aprender coreano es interesante.' },
    49: {
      prompt_es: '-는 것 convierte un verbo en...',
      choices_es: ['Una frase nominal', 'Tiempo pasado', 'Tiempo futuro', 'Una pregunta']
    },
    50: {
      title_es: 'Comparativos',
      body_es: 'Estructura: [A]이/가 [B]보다 더 [adjetivo]. 보다 significa "que" y 더 significa "más".',
      rules_es: [
        '한국어가 영어보다 더 어려워요 — El coreano es más difícil que el inglés',
        '오늘이 어제보다 더 더워요 — Hoy hace más calor que ayer',
        '더 puede omitirse en el habla informal: 한국어가 영어보다 어려워요'
      ]
    },
    51: { meaning_es: 'El coreano es más difícil que el japonés.' },
    52: { prompt_es: '¿Cómo se dice "más" en una comparación coreana?' },
    53: {
      title_es: '좋다 vs 좋아하다',
      body_es: '좋다 usa la partícula de sujeto (이/가): 한국어가 좋아요. 좋아하다 usa la partícula de objeto (을/를): 한국어를 좋아해요.',
      rules_es: [
        '좋다 — ser bueno / sentirse bien (estado): 커피가 좋아요 (Me gusta el café / El café es bueno)',
        '좋아하다 — gustar (preferencia activa): 커피를 좋아해요 (Me gusta el café)',
        'Ambas se traducen como "me gusta" pero 좋다 se centra en el sentimiento, 좋아하다 en la preferencia'
      ],
      tip_es: { label: 'Diferencia Clave', text: '좋아요 → partícula de sujeto (이/가) la precede. 좋아해요 → partícula de objeto (을/를) la precede. Ante la duda, 좋아해요 suena más natural para expresar preferencias.' }
    },
    54: {
      title_es: 'Todavía y Ya',
      body_es: '아직 + verbo negativo = todavía no. 벌써 = ya (antes de lo esperado). 이미 = ya (neutro, formal).',
      rules_es: [
        '아직 안 먹었어요 — Todavía no he comido (todavía no)',
        '아직 여기 있어요 — Todavía aquí (en curso)',
        '벌써 도착했어요? — ¿Ya llegaste? (sorpresa)',
        '이미 알아요 — Ya lo sé (neutro)'
      ]
    },
    55: {
      prompt_es: '¿Qué significa "아직"?',
      choices_es: ['Todavía / Aún no', 'Ya', 'Incluso', 'Más']
    },
    56: {
      title_es: 'Alguien, Algo',
      body_es: 'Combina palabras interrogativas con contexto para expresar ideas indefinidas como "alguien" o "nada".',
      rules_es: [
        '누군가 — alguien: 누군가 왔어요 (Alguien vino)',
        '무언가 / 뭔가 — algo: 뭔가 이상해요 (Algo es raro)',
        '어딘가 — en algún lugar: 어딘가에 있어요 (Está en algún lugar)',
        '아무도 + negación — nadie: 아무도 없어요 (No hay nadie aquí)',
        '아무것도 + negación — nada: 아무것도 몰라요 (No sé nada)'
      ]
    },
    57: { prompt_es: '"No hay nadie aquí" — 아무도 ___' },
    58: {
      title_es: 'Imperativo: -(으)세요',
      body_es: 'Añade -(으)세요 a la raíz verbal para hacer una petición o un mandato educado.',
      rules_es: [
        '가다 → 가세요 (por favor ve)',
        '앉다 → 앉으세요 (por favor siéntate)',
        '먹다 → 드세요 (por favor come — honorífico)'
      ]
    },
    59: {
      title_es: 'Prohibición: -지 마세요',
      body_es: 'Añade -지 마세요 a la raíz verbal para decirle educadamente a alguien que NO haga algo.',
      rules_es: [
        '말하다 → 말하지 마세요 (por favor no hables)',
        '가다 → 가지 마세요 (por favor no vayas)',
        '먹다 → 먹지 마세요 (por favor no comas)'
      ]
    },
    60: { meaning_es: 'Por favor habla despacio.' },
    61: { prompt_es: '"Por favor no hables" en coreano?' },
    62: {
      title_es: 'Método: -(으)로',
      body_es: '-(으)로 marca el método o medio — "en" o "con" una herramienta/manera de hacer algo.',
      rules_es: [
        '-(으)로 después de consonante, -로 después de vocal: 버스로 가요 (voy en autobús)',
        '지하철로 와요 (vengo en metro)',
        '한국어로 말해요 (hablo en coreano)'
      ]
    },
    63: {
      title_es: 'Bueno / Malo En',
      body_es: '잘하다 = ser bueno en. 못하다 = ser malo en. Ambos se unen después de la partícula de objeto 을/를.',
      rules_es: [
        '한국어를 잘해요 (soy bueno en coreano)',
        '수학을 못해요 (soy malo en matemáticas)',
        '수영을 잘 못해요 (no soy muy bueno nadando)'
      ]
    },
    64: { prompt_es: '"soy bueno en coreano" — 한국어를 ___' },
    65: {
      title_es: 'Todo, Más: 다, 더',
      body_es: '다 = todo/todo. 더 = más. Ambos son adverbios simples colocados antes del verbo.',
      rules_es: [
        '다 먹었어요 — comí todo / todo ello',
        '더 주세요 — por favor dame más',
        '다 y 더 se usan de manera muy diferente según el contexto'
      ]
    },
    66: { prompt_es: '"Por favor dame más" — ___ 주세요' },
    67: {
      title_es: 'Todo, Más y -도',
      body_es: '-도 tiene 4 usos avanzados más allá del simple "también": énfasis, negación enfática y "tanto...como".',
      rules_es: [
        '아이도 알아요 — incluso los niños saben (énfasis: inclusión inesperada)',
        '하나도 없어요 — ni uno solo (negación enfática: 하나도 + negación)',
        '먹기도 해요 — a veces come / también come (-기도 하다)',
        '좋기도 하고 나쁘기도 해요 — tanto bueno como malo'
      ]
    },
    68: { meaning_es: 'El coreano es a la vez difícil e interesante.' },
    69: { prompt_es: '"Incluso los niños saben" — ¿qué uso de -도?' },
    70: {
      title_es: '¡Gramática Completada!',
      message_es: '¡Has dominado las 26 etapas gramaticales — desde el orden SOV y las partículas hasta los patrones avanzados de -도. ¡Empieza a aplicarlos en conversaciones reales!'
    }
  }
);

console.log('\nDone! Batch 12 complete.');
