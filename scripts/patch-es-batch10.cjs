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

// ─── speech-levels.json ───
patch('speech-levels.json',
  {
    1: { name_es: '합쇼체 (Formal)' },
    2: { name_es: '해요체 (Educado)' },
    3: { name_es: '반말 (Informal)' },
    4: { name_es: 'Elegir un Nivel' }
  },
  {
    1: {
      title_es: 'Resumen de los Niveles de Habla del Coreano',
      body_es: 'El coreano tiene un sistema de niveles de habla (높임말) que determina cuán formal o educado es tu lenguaje. El nivel que eliges depende de la relación social, la edad, el rango y el contexto de la conversación. Los tres niveles que más encontrarás son: 합쇼체 (formal educado, utilizado en presentaciones, el ejército y el servicio al cliente), 해요체 (educado cotidiano, el predeterminado para adultos que hablan con conocidos no cercanos) y 반말 (habla informal, utilizado con amigos cercanos y personas más jóvenes). Usar el nivel incorrecto puede sonar grosero, frío o excesivamente familiar.',
      tip_es: { label: 'Por qué importan los niveles de habla en Corea', text: 'Corea es una sociedad jerárquica moldeada por los valores confucianos — la edad, el rango y la relación determinan cómo hablas. Usar 반말 (habla informal) con un extraño o un superior es una falta de respeto. Usar 합쇼체 excesivamente formal con un amigo puede parecer rígido y distante. Elegir el nivel correcto es una habilidad social clave.' }
    },
    2: {
      title_es: '합쇼체 — El Registro Formal',
      body_es: '합쇼체 es el nivel de habla formal más alto en coreano. Se usa en informativos de televisión, órdenes militares, presentaciones formales, el habla del personal de hoteles/aerolíneas y el servicio al cliente. Las terminaciones verbales cambian a -ㅂ니다/-습니다 para declaraciones y a -ㅂ니까?/-습니까? para preguntas. El vocabulario también cambia — 밥 (comida) se convierte en 식사, 있어요 se convierte en 있습니다. Este nivel señala el máximo respeto y profesionalismo.',
      tip_es: { label: 'Dónde escuchar 합쇼체', text: 'Enciende las noticias coreanas (KBS, MBC, SBS) y escucharás 합쇼체 en todo momento. El personal de los hoteles, los anuncios de las aerolíneas, las ceremonias formales y los entornos militares utilizan este nivel. También es el nivel que se utiliza en documentos formales escritos, aunque el estilo puramente escrito (문어체) difiere ligeramente.' }
    },
    3:  { meaning_es: 'es / soy / son — terminación de declaración formal' },
    4:  { meaning_es: 'Gracias (formal)' },
    5:  { meaning_es: 'Hola / ¿Cómo está usted? (saludo formal, forma interrogativa)' },
    6: {
      prompt_es: '합쇼체 se describe mejor como...',
      choices_es: ['habla informal', 'el nivel de habla más formal', 'educado informal', 'argot']
    },
    7: {
      title_es: 'Terminaciones Verbales del 합쇼체 (-ㅂ니다/-습니다)',
      body_es: 'El sello distintivo del 합쇼체 es la terminación -ㅂ니다/-습니다. Usa -ㅂ니다 después de raíces verbales que terminan en vocal: 가다 → 갑니다 (Voy). Usa -습니다 después de raíces que terminan en consonante: 먹다 → 먹습니다 (Como). Para preguntas, la terminación cambia a -ㅂ니까?/-습니까?: 가다 → 갑니까? (¿Vas?). Nota de pronunciación: 갑니다 se pronuncia [감니다] por asimilación nasal.',
      tip_es: { label: 'Cambio de pronunciación en -ㅂ니다', text: '갑니다 (Voy) se escribe 갑니다 pero se pronuncia 감니다. Esto se debe a que ㅂ antes de ㄴ cambia a ㅁ por asimilación nasal (misma posición de la boca, flujo de aire nasal). Este patrón aparece en todas las formas del 합쇼체.' }
    },
    8:  { meaning_es: 'Como / estoy comiendo (formal)' },
    9:  { meaning_es: 'Voy / estoy yendo (formal) — se pronuncia 감니다' },
    10: {
      title_es: '해요체 — Habla Educada Cotidiana',
      body_es: '해요체 es el nivel de habla que usarás más en la vida cotidiana coreana. Es suficientemente educado para extraños y conocidos pero cálido para sentirse natural. La terminación -아요/-어요/-해요 se añade a la raíz verbal. El 해요체 se usa en las tiendas, con compañeros de trabajo con los que no tienes mucha confianza, con adultos que conoces por primera vez y en la mayoría de las interacciones de aprendiz con nativo. Es el "educado predeterminado" del coreano.',
      tip_es: { label: '해요체 es tu configuración predeterminada', text: 'Cuando tengas dudas, usa 해요체. Es el nivel más seguro y universalmente apropiado en Corea. Nunca te equivocas siendo educado y respetuoso. Cambiar a 합쇼체 o 반말 solo debería ocurrir cuando la situación lo requiera claramente.' }
    },
    11: { meaning_es: 'Hola / Buenos días (educado, saludo cotidiano)' },
    12: { meaning_es: 'Gracias (educado, menos formal que 감사합니다)' },
    13: { meaning_es: 'Como / estoy comiendo (educado)' },
    14: { meaning_es: 'Voy / estoy yendo (educado)' },
    15: {
      prompt_es: '해요체 se describe mejor como...',
      choices_es: ['muy formal / coreano de emisora', 'la forma más informal', 'educado cotidiano / habla adulta predeterminada', 'honorífico arcaico']
    },
    16: {
      title_es: 'Patrón -아요 / -어요',
      body_es: 'La regla de terminación del 해요체: añade -아요 si la última vocal de la raíz es ㅏ o ㅗ (vocales brillantes), y añade -어요 para todas las demás vocales. Los verbos con 하다 usan -해요 en su lugar. Ejemplos: 가다 → 가 + 아요 = 가요 (contraído). 먹다 → 먹 + 어요 = 먹어요. 공부하다 → 공부해요. En la práctica, 아/어 a menudo se contrae con la vocal final de la raíz: 가 + 아요 → 가요, 오 + 아요 → 와요.',
      tip_es: { label: 'Tabla rápida', text: '가다 → 가요. 오다 → 와요. 먹다 → 먹어요. 마시다 → 마셔요. 하다 → 해요. 보다 → 봐요. 자다 → 자요. Las terminaciones siguen un patrón de armonía vocálica — intenta reconocer la distinción entre vocal brillante/oscura en la raíz.' }
    },
    17: { meaning_es: 'Está bien / Me gusta (presente educado)' },
    18: {
      prompt_es: '¿Qué forma de "Voy" es 해요체 (educado cotidiano)?',
      choices_es: ['가', '갑니다', '가요', '가라']
    },
    19: {
      title_es: '반말 — Habla Informal',
      body_es: '반말 (ban-mal, literalmente "media palabra") es el registro informal que se usa entre amigos cercanos de edad similar, con personas más jóvenes y dentro de la familia. Elimina el -요 de las terminaciones del 해요체: 가요 → 가, 먹어요 → 먹어, 좋아요 → 좋아. El 반말 puede sonar grosero si se usa con alguien mayor o con un extraño — siempre empieza con 해요체 y cambia a 반말 solo si la otra persona lo inicia o lo sugiere explícitamente. En los K-dramas, los personajes que cambian de 해요체 a 반말 señalan un gran cambio en la cercanía.',
      tip_es: { label: 'Pedir permiso para usar 반말', text: 'Una forma natural de pedir permiso: "말 놓아도 돼요?" (¿Puedo hablar informalmente?) o "반말해도 돼요?" (¿Está bien usar 반말?). También puedes esperar a que la otra persona cambie naturalmente primero — esa es tu invitación.' }
    },
    20: { meaning_es: 'Hola / Adiós (saludo y despedida informal)' },
    21: { meaning_es: 'Gracias (informal)' },
    22: { meaning_es: 'como / Voy a comer (informal)' },
    23: { meaning_es: 'voy / Me voy (informal)' },
    24: {
      prompt_es: '¿Qué saludo es 반말 (informal)?',
      choices_es: ['안녕하세요', '안녕하십니까', '안녕', '반갑습니다']
    },
    25: {
      title_es: 'Cuándo usar 반말 (y cuándo NO)',
      body_es: 'Usa 반말 con: amigos cercanos de edad similar, hermanos menores, estudiantes más jóvenes o niños. NO uses 반말 con: extraños, alguien mayor que tú, tu jefe o profesor, el personal de servicio o personas que acabas de conocer (aunque parezcan de edad similar). El error que cometen muchos estudiantes de coreano es suponer que porque alguien es amigable, el 반말 es apropiado. La amabilidad y el permiso para el nivel de habla son cosas separadas — siempre espera una señal.',
      tip_es: { label: 'Una excepción: el monólogo interior', text: 'Cuando los coreanos hablan solos, murmuran o escriben entradas de diario, usan 반말 o incluso un estilo neutro sin terminaciones. Esto es natural y no está dirigido a nadie — por lo tanto no se necesita cortesía. También es por eso que los monólogos de los dramas y los pensamientos internos están en 반말.' }
    },
    26: {
      prompt_es: 'Estás hablando con un extraño de tu misma edad en la calle. ¿Qué nivel debes usar?',
      choices_es: ['반말', '해요체', 'Los dos están bien', 'Solo 합쇼체']
    },
    27: {
      title_es: '문어체 — Estilo Escrito/Formal',
      body_es: '문어체 (mun-eo-che, "estilo de lengua escrita") se usa en la escritura formal — trabajos académicos, artículos de noticias, documentos legales y literatura. La terminación verbal es -다 (la forma de diccionario simple): 가다, 먹는다, 했다. Suena antinatural en la conversación oral pero aparece en todas partes en el coreano escrito. Los estudiantes lo encuentran al leer textos coreanos y pueden preguntarse por qué difiere de lo que les han enseñado — eso es porque los libros de texto enseñan registros orales, mientras que la lectura requiere reconocer el 문어체.',
      tip_es: { label: '문어체 vs 합쇼체', text: 'Ambos son formales, pero 합쇼체 es para el habla (hablante a oyente) y 문어체 es para la escritura (sin oyente específico). Un presentador de noticias habla en 합쇼체. Un artículo de periódico está en 문어체. En los K-dramas, escucharás 문어체 cuando los personajes leen en voz alta libros o cartas.' }
    },
    28: { meaning_es: 'ser (cópula, forma escrita/diccionario)' },
    29: {
      title_es: 'Tabla Comparativa de Niveles de Habla',
      body_es: 'Así se ve la misma idea en todos los niveles de habla. "Como": 먹습니다 (formal 합쇼체) → 먹어요 (educado 해요체) → 먹어 (informal 반말) → 먹는다 (escrito 문어체). "Gracias": 감사합니다 (formal) → 감사해요 (educado) → 고마워 (informal). "Voy": 갑니다 (formal) → 가요 (educado) → 가 (informal) → 간다 (escrito). Notar estos patrones te ayudará a identificar qué nivel usa un hablante cuando ves dramas coreanos o escuchas habla nativa.',
      tip_es: { label: 'Usa los K-dramas para entrenar tu oído', text: 'Los K-dramas son una mina de oro para practicar los niveles de habla. Los jefes hablan en 합쇼체 a su equipo. Los amigos cambian a 반말 entre sí. Las escenas en hospitales u oficinas usan 해요체. Si notas un cambio repentino en el nivel de habla entre los personajes — ese es un momento dramático.' }
    },
    30: {
      prompt_es: '감사합니다 es la forma ___ de "gracias"',
      choices_es: ['반말', '해요체', '합쇼체', '문어체']
    },
    31: {
      prompt_es: 'En una entrevista de trabajo en Corea, ¿qué nivel de habla deberías usar?',
      choices_es: ['반말', '해요체', '합쇼체', '문어체']
    },
    32: {
      title_es: 'Mezclar Niveles de Habla — Un Error Común',
      body_es: 'Uno de los errores más comunes de los estudiantes es mezclar niveles de habla — usando 먹어요 (해요체) en una oración y 먹습니다 (합쇼체) en la siguiente. Los hablantes nativos lo notan de inmediato. Suena como mezclar formal e informal en el mismo aliento. Elige un nivel para la conversación y mantenlo. La única excepción es el cambio intencional por efecto retórico (como un correo electrónico de negocios que abre formalmente y termina cálidamente), pero incluso esto sigue patrones claros.',
      tip_es: { label: 'No mezcles terminaciones a mitad de oración', text: 'Incorrecto: 저는 학생이에요. 공부합니다. (Mezcla 해요체 y 합쇼체). Correcto: 저는 학생이에요. 공부해요. (Todo 해요체). O: 저는 학생입니다. 공부합니다. (Todo 합쇼체). La consistencia dentro de una conversación señala fluidez y conciencia social.' }
    },
    33: {
      title_es: '¡Niveles de Habla Completados!',
      message_es: 'Has dominado el sistema de niveles de habla coreano — el formal 합쇼체, el cotidiano 해요체, el informal 반말 y el escrito 문어체. Ahora estás equipado para leer situaciones sociales y hablar al nivel correcto.'
    }
  }
);

console.log('\nDone! Batch 10 complete.');
