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

// ─── vocabulary-academic.json ───
patch('vocabulary-academic.json',
  { 1: { name_es: 'Académico' } },
  {
    1: {
      title_es: 'Coreano Académico',
      body_es: 'Corea concede una enorme importancia a la educación — la 교육열 (fiebre educativa) impulsa a los estudiantes a estudiar intensamente. Los exámenes de ingreso universitario (수능) son un acontecimiento nacional. Tanto si eres estudiante, profesor o aprendiz de por vida, este vocabulario te ayudará en entornos académicos coreanos.',
      tip_es: { label: 'Cultura educativa', text: 'El 수능 (Suneung) es el examen de acceso universitario de Corea, celebrado cada noviembre — todo el país adapta su horario a él. Las aerolíneas retrasan vuelos para no perturbar las salas de examen. Es el evento académico culturalmente más significativo de Corea.' }
    },
    2:  { meaning_es: 'Escuela' },
    3:  { meaning_es: 'Universidad — 대학 es la forma abreviada' },
    4:  { meaning_es: 'Profesor/a — -님 es el sufijo de respeto; nunca se omite' },
    5:  { meaning_es: 'Estudiante' },
    6:  { meaning_es: 'Aula / Salón de clases' },
    7:  { meaning_es: 'Libro' },
    8:  { meaning_es: 'Biblioteca' },
    9:  { meaning_es: 'Examen / prueba — 시험을 보다 = hacer un examen' },
    10: { meaning_es: 'Tarea / deberes' },
    11: { meaning_es: 'Calificación / expediente académico' },
    12: { meaning_es: 'Especialidad / carrera — 전공이 뭐예요? = ¿Cuál es tu especialidad?' },
    13: { meaning_es: 'Clase / conferencia' },
    14: { meaning_es: 'Graduación — 졸업했어요 = Me gradué' },
    15: { meaning_es: 'Beca' },
    16: { meaning_es: 'Academia / clases particulares — rasgo definitorio de la educación coreana' },
    17: { meaning_es: 'CSAT — examen nacional de ingreso universitario de Corea' },
    18: {
      prompt_es: '¿Qué es un 학원?',
      choices_es: ['Biblioteca', 'Universidad', 'Academia de refuerzo', 'Aula']
    },
    19: {
      prompt_es: '전공이 뭐예요? significa...',
      choices_es: ['¿Cuál es tu nota?', '¿Cuál es tu especialidad?', '¿A qué escuela vas?', '¿Cuándo te gradúas?']
    },
    20: {
      prompt_es: '¿Qué palabra significa "beca"?',
      choices_es: ['성적', '수능', '졸업', '장학금']
    },
    21: {
      title_es: '¡Académico Completado!',
      message_es: '공부 잘했어요! Has aprendido el coreano académico — un vocabulario que revela la seriedad con la que Corea toma la educación. Desde el 학원 hasta el 수능, ahora entiendes las palabras que dan forma a la vida de millones de estudiantes coreanos.'
    }
  }
);

// ─── vocabulary-media.json ───
patch('vocabulary-media.json',
  { 1: { name_es: 'Medios y Entretenimiento' } },
  {
    1: {
      title_es: 'Medios y Entretenimiento Coreano',
      body_es: 'La Ola Coreana (한류, Hallyu) ha convertido los medios coreanos en un fenómeno mundial. El K-pop, los K-dramas y las películas coreanas se disfrutan en todos los países. Entender el vocabulario de medios te ayudará a conectar más profundamente con el contenido que amas y a comentarlo con fans coreanos.',
      tip_es: { label: 'Hablar sobre contenido K', text: '드라마 봤어요? = ¿Viste el drama? 요즘 뭐 봐요? = ¿Qué estás viendo últimamente? 재미있어요 = Es interesante. 감동받았어요 = Me conmovió. 다음 편이 기대돼요 = Tengo ganas de ver el próximo episodio.' }
    },
    2:  { meaning_es: 'Drama / serie de TV — del inglés "drama"' },
    3:  { meaning_es: 'Película / film' },
    4:  { meaning_es: 'Música' },
    5:  { meaning_es: 'Cantante — 가수 se usa tanto para artistas solistas como para miembros de grupos de ídolos' },
    6:  { meaning_es: 'Actor / actriz' },
    7:  { meaning_es: 'Ídolo — los grupos de ídolos de K-pop son un rasgo definitorio de la cultura pop coreana' },
    8:  { meaning_es: 'Fan — del inglés; 팬클럽 = club de fans' },
    9:  { meaning_es: 'Concierto — del inglés "concert"' },
    10: { meaning_es: 'Ola Coreana (Hallyu) — la difusión mundial de la cultura pop coreana' },
    11: { meaning_es: 'YouTube — del inglés; 유튜버 = youtuber' },
    12: { meaning_es: 'Streaming — del inglés "streaming"' },
    13: { meaning_es: 'Redes sociales — del inglés "social media"' },
    14: { meaning_es: 'Videoclip musical — MV es la abreviatura común' },
    15: { meaning_es: 'Programa de variedades — género enormemente popular en Corea' },
    16: { meaning_es: 'Audición — del inglés; 오디션 프로그램 = programa de selección de talentos' },
    17: {
      prompt_es: '한류 se refiere a...',
      choices_es: ['Comida coreana', 'El idioma coreano', 'La Ola Coreana (difusión mundial del K-culture)', 'Historia de Corea']
    },
    18: {
      prompt_es: '예능 es qué tipo de programa de TV?',
      choices_es: ['Programa de noticias', 'Serie dramática', 'Programa de variedades / entretenimiento', 'Documental']
    },
    19: {
      prompt_es: '¿Qué palabra significa "película" en coreano?',
      choices_es: ['Drama', 'Película', 'Música', 'Streaming']
    },
    20: {
      prompt_es: '¿Qué significa 팬 en coreano?',
      choices_es: ['Ídolo', 'Cantante', 'Fan', 'Actor']
    },
    21: {
      title_es: '¡Medios Completados!',
      message_es: '문화 고수! Has dominado el vocabulario de medios coreanos. Como fan del contenido coreano, ahora tienes las palabras para disfrutar de los K-dramas, el K-pop y las películas coreanas a un nivel completamente nuevo — en el idioma en el que fueron creados.'
    }
  }
);

// ─── vocabulary-konglish.json ───
patch('vocabulary-konglish.json',
  { 1: { name_es: 'Konglish' } },
  {
    1: {
      title_es: 'Konglish — Coreano + Inglés',
      body_es: 'El Konglish (콩글리시) se refiere a palabras del inglés adaptadas al coreano. Estas palabras se pronuncian de forma diferente y a veces tienen significados distintos del inglés original. Aprender Konglish es una vía rápida para adquirir un gran vocabulario, ya que muchas palabras coreanas modernas derivan del inglés.',
      tip_es: { label: 'Reglas fonéticas', text: 'Los grupos consonánticos del inglés se separan con vocales: "stress" → 스트레스 (seuteureseu). Las consonantes finales reciben una vocal: "cake" → 케이크 (keikeu). "r" y "l" ambas se convierten en ㄹ: "rice" → 라이스, "lemon" → 레몬.' }
    },
    2:  { meaning_es: 'Teléfono inteligente — del inglés "smart phone"' },
    3:  { meaning_es: 'Computadora / Ordenador — del inglés "computer"' },
    4:  { meaning_es: 'Internet — del inglés "internet"' },
    5:  { meaning_es: 'Helado — del inglés "ice cream"' },
    6:  { meaning_es: 'Apartamento — del inglés "apartment"; se refiere específicamente a edificios de altura' },
    7:  { meaning_es: 'Teléfono móvil — Konglish "hand phone"; también se dice 휴대폰' },
    8:  { meaning_es: 'Firma / autógrafo — del inglés "sign"; se usa donde en inglés se diría "signature"' },
    9:  { meaning_es: 'Vestido — Konglish "one piece"; se refiere a un vestido entero' },
    10: { meaning_es: 'Pantalones — palabra nativa coreana' },
    11: { meaning_es: 'Selfie — abreviatura Konglish de 셀프 카메라 (self camera)' },
    12: { meaning_es: 'Portátil / Laptop — Konglish "notebook"' },
    13: { meaning_es: 'Aire acondicionado — Konglish abreviado de "air conditioner"' },
    14: { meaning_es: 'Mando a distancia — de "remote control", abreviado' },
    15: { meaning_es: 'Servicio / regalo / extra — en coreano, 서비스 suele significar algo dado gratis por una tienda' },
    16: { meaning_es: '¡Ánimo! / ¡Tú puedes! — grito de aliento coreano, diferente del significado en inglés' },
    17: { meaning_es: 'Perrito frito / Corn dog — en Corea, 핫도그 se refiere al corn dog, no al hot dog en pan' },
    18: {
      prompt_es: '셀카 es una palabra Konglish que significa...',
      choices_es: ['Una selfie', 'Un móvil', 'Una marca de cámara', 'Un programa de TV']
    },
    19: {
      prompt_es: '서비스 en coreano a menudo significa...',
      choices_es: ['Un cargo de servicio', 'Un regalo / extra de la tienda', 'Un servicio en línea', 'Un costo de entrega']
    },
    20: {
      prompt_es: '¿Qué significa 에어컨?',
      choices_es: ['Ambientador', 'Aire acondicionado', 'Purificador de aire', 'Colchón hinchable']
    },
    21: {
      prompt_es: '¿Qué significa 파이팅 en coreano?',
      choices_es: ['Estoy peleando', 'Un término de boxeo', '¡Vamos! / ¡Tú puedes!', 'Estoy enojado/a']
    },
    22: {
      title_es: '¡Konglish Completado!',
      message_es: '짱이에요! (¡Genial!) El Konglish es tu atajo secreto hacia la fluidez en coreano. Si ya hablas inglés, ya conoces cientos de palabras coreanas — solo necesitas "coreano-izar" la pronunciación. ¡화이팅!'
    }
  }
);

console.log('\nDone! Batch 6 complete.');
