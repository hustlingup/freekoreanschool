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

// ─── nouns.json ───
patch('nouns.json',
  {
    1: { name_es: 'Personas y Familia' },
    2: { name_es: 'Lugares y Tiempo' },
    3: { name_es: 'Objetos y Contadores' },
    4: { name_es: 'Posesivos' }
  },
  {
    1: {
      title_es: 'Sustantivos Coreanos (명사)',
      body_es: 'Los sustantivos coreanos (명사) no cambian según el género ni el número. La misma palabra 사람 significa "persona", "personas", "una persona" y "la persona". El plural se entiende por el contexto o se añade por separado con palabras como 들 (sufijo de plural, p.ej. 사람들 = personas). No hay artículos como "un/una" o "el/la/los/las". Esto hace que los sustantivos coreanos sean muy fáciles de aprender — solo tienes que saber la palabra en sí.',
      tip_es: { label: 'Sufijo de plural 들', text: '들 añade suavemente el plural: 친구들 (amigos), 학생들 (estudiantes). Puedes añadir 들 a personas o animales, pero es opcional y suele omitirse cuando el contexto es claro.' }
    },
    2:  { meaning_es: 'persona / ser humano' },
    3:  { meaning_es: 'hombre / chico' },
    4:  { meaning_es: 'mujer / chica' },
    5:  { meaning_es: 'niño/a' },
    6:  { meaning_es: 'amigo/a' },
    7:  { prompt_es: "¿Qué palabra significa 'amigo/a'?" },
    8: {
      title_es: 'Sustantivos de Familia (가족 명사)',
      body_es: 'Los términos familiares coreanos a menudo difieren según el género del hablante. 오빠 (oppa) es como una hablante femenina llama a su hermano mayor, mientras que 형 (hyung) es como un hablante masculino llama a su hermano mayor. Del mismo modo, 언니 (unni) = hermana mayor (hablante femenina) y 누나 (nuna) = hermana mayor (hablante masculino). Para los padres, 아버지 / 어머니 son los términos formales, mientras que 아빠 / 엄마 son los equivalentes informales.',
      tip_es: { label: 'Tratamiento específico por género', text: 'A diferencia del español, el coreano no tiene una sola palabra para "hermano/a". Si dices 오빠/형 o 언니/누나 depende completamente de tu propio género y la edad relativa del hermano/a. Esto es fundamental en el vocabulario familiar coreano.' }
    },
    9:  { meaning_es: 'padre (formal)' },
    10: { meaning_es: 'madre (formal)' },
    11: {
      title_es: 'Sustantivos de Lugar (장소 명사)',
      body_es: 'Los sustantivos de lugar coreanos siguen la misma regla sin artículo que todos los demás sustantivos. 학교 significa "escuela", "una escuela" o "la escuela" — el contexto te dice cuál. Al dar indicaciones o expresar ubicación, el coreano añade la partícula 에 (en/a) después del sustantivo de lugar: 학교에 가요 (Voy a la escuela). Los sustantivos de lugar están entre las palabras más prácticas para aprender pronto.',
      tip_es: { label: 'Partícula de lugar 에', text: 'Añade 에 a un sustantivo de lugar para significar "en", "a" o "hacia": 집에 (en casa), 학교에 (a la escuela), 식당에 (en el restaurante). 에서 significa "desde" o "en (haciendo algo)": 학교에서 공부해요 (Estudio en la escuela).' }
    },
    12: { meaning_es: 'casa / hogar' },
    13: { meaning_es: 'escuela' },
    14: { meaning_es: 'restaurante / comedor' },
    15: { meaning_es: 'hospital / clínica' },
    16: { prompt_es: "¿Qué palabra significa 'escuela'?" },
    17: {
      title_es: 'Sustantivos de Tiempo (시간 명사)',
      body_es: 'Los sustantivos de tiempo en coreano funcionan de forma independiente — no se necesita conjugación. Simplemente dices la palabra de tiempo al principio de la oración: 오늘 가요 (Voy hoy), 내일 만나요 (Quedamos mañana). Las expresiones de tiempo coreanas usan números sino-coreanos para las horas y números coreanos nativos para los minutos. Las palabras de tiempo más esenciales son 오늘 (hoy), 내일 (mañana), 어제 (ayer) y 지금 (ahora).',
      tip_es: { label: 'Palabras de tiempo al inicio de la oración', text: 'El coreano es muy flexible con el orden de las palabras, pero las expresiones de tiempo suelen aparecer al principio de la oración — antes del sujeto o justo después. "오늘 학교에 가요" y "학교에 오늘 가요" son ambas correctas, aunque la primera es más natural.' }
    },
    18: { meaning_es: 'hoy' },
    19: { prompt_es: "¿Qué palabra significa 'hoy'?" },
    20: {
      title_es: 'Sustantivos de Objetos (사물 명사)',
      body_es: 'Los objetos cotidianos están entre las palabras coreanas más inmediatamente útiles. El coreano tiene tanto palabras coreanas nativas como sino-coreanas (de origen chino) para los objetos, y en muchos casos se usa el Konglish (préstamos del inglés): 커피 (café), 핸드폰 (teléfono móvil). Cuando el objeto es el receptor directo de un verbo, añade 을/를 después del sustantivo: 책을 읽어요 (Leo un libro). Esta es la partícula de objeto.',
      tip_es: { label: 'Partícula de objeto 을/를', text: 'Usa 을 después de un sustantivo que termina en consonante: 책을. Usa 를 después de un sustantivo que termina en vocal: 가방을. En el habla informal, esta partícula se omite con frecuencia.' }
    },
    21: { meaning_es: 'libro' },
    22: { meaning_es: 'bolso / mochila' },
    23: { meaning_es: 'dinero' },
    24: { prompt_es: "¿Qué palabra significa 'dinero'?" },
    25: {
      title_es: 'Contadores Coreanos (수사)',
      body_es: 'El coreano usa palabras de conteo llamadas contadores (수사) que se unen a los números al contar cosas específicas. El contador 개 se usa para objetos generales: 한 개 (una cosa), 세 개 (tres cosas). 명 se usa para contar personas: 두 명 (dos personas). 잔 se usa para tazas/vasos: 한 잔 (una taza). El patrón es: número + contador, colocado justo antes o después del sustantivo. Los números coreanos para contadores usan el conjunto nativo: 하나(1), 둘(2), 셋(3), 넷(4), 다섯(5).',
      tip_es: { label: 'Números nativos con contadores', text: 'Al combinar números coreanos nativos con contadores, el número cambia ligeramente: 하나 → 한, 둘 → 두, 셋 → 세, 넷 → 네. Por eso es 한 개 (no 하나 개), 두 명 (no 둘 명).' }
    },
    26: { meaning_es: 'tres personas (명 = contador de personas)' },
    27: { prompt_es: '¿Qué contador se usa para personas (contar individuos)?' },
    28: {
      title_es: 'Marcador Posesivo 의',
      body_es: 'El marcador posesivo 의 (ui, a menudo pronunciado "에") se une a un sustantivo para indicar posesión, como el genitivo del español. 저의 가방 = mi bolso, 친구의 집 = la casa del amigo. En el habla cotidiana, 의 se omite comúnmente: 제 가방 (mi bolso, educado) o 내 가방 (mi bolso, informal). Los pronombres 저 y 나 tienen formas posesivas especiales: 제 (educado, "mi") y 내 (informal, "mi").',
      tip_es: { label: '제 vs 내', text: '제 es el "mi" posesivo educado/humilde (de 저 = yo, educado). 내 es el "mi" posesivo informal (de 나 = yo, informal). Usa 제 con desconocidos o mayores, 내 con amigos cercanos.' }
    },
    29: { meaning_es: 'mi bolso (educado)' },
    30: { meaning_es: 'mi amigo/a (informal)' },
    31: { prompt_es: "¿Cómo dices 'mi bolso' en coreano educado?" },
    32: { meaning_es: 'la casa del amigo/a' },
    33: {
      prompt_es: '의 es el marcador posesivo coreano. ¿A qué corresponde en español?',
      choices_es: ['marcador de sujeto', 'genitivo / posesivo (\'s)', 'marcador de objeto', 'sufijo de plural']
    },
    34: {
      title_es: '¡Sustantivos Completados!',
      message_es: 'Has aprendido los sustantivos coreanos esenciales — personas, lugares, objetos, palabras de tiempo, contadores y posesivos. ¡Continúa con los Pronombres a continuación!'
    }
  }
);

// ─── pronouns.json ───
patch('pronouns.json',
  {
    1: { name_es: 'Primera y Segunda Persona' },
    2: { name_es: 'Tercera Persona y Nosotros' },
    3: { name_es: 'Demostrativos' },
    4: { name_es: 'Pronombres Interrogativos' }
  },
  {
    1: {
      title_es: 'Resumen de los Pronombres Coreanos',
      body_es: 'El coreano tiene dos registros para los pronombres de primera persona: educado e informal. 저 (jeo) es el "yo" educado, usado con desconocidos, mayores y en entornos formales. 나 (na) es el "yo" informal, usado con amigos cercanos y personas más jóvenes. Es fundamental que el coreano a menudo omite el pronombre de sujeto por completo cuando el contexto es claro — 어디 가요? puede significar "¿Adónde vas?" sin ningún pronombre. Dominar cuándo NO usar un pronombre es tan importante como saber los pronombres.',
      tip_es: { label: 'Lengua de omisión de sujeto (pro-drop)', text: 'El coreano es una lengua de omisión del sujeto (pro-drop) — cuando el sujeto es obvio por el contexto o fue mencionado recientemente, omite el pronombre. Dejarlo puede sonar antinatural o incluso ligeramente grosero (demasiado directo). 저 괜찮아요 y 괜찮아요 ambos significan "Estoy bien", pero la forma más corta es más natural.' }
    },
    2:  { meaning_es: 'yo / me (educado)' },
    3:  { meaning_es: 'yo / me (informal)' },
    4:  { meaning_es: 'yo (sujeto, educado) — 저 + marcador de sujeto 가 → 제가' },
    5:  { meaning_es: 'tú (informal) — raro con adultos' },
    6:  { prompt_es: "¿Qué pronombre es la forma educada de 'yo'?" },
    7: {
      title_es: "Cómo decir 'tú' en coreano",
      body_es: 'El coreano evita el pronombre directo "tú" (당신) en la mayoría del habla cotidiana — puede sonar frío, confrontacional o excesivamente formal según el contexto. En cambio, los coreanos usan el nombre de la persona, el título o el término de relación. A un profesor se le llama 선생님 (profesor/a), no 당신. A un amigo se le llama por su nombre. El pronombre 당신 aparece en canciones, poesía y escritura formal, pero no es habitual en la conversación diaria.',
      tip_es: { label: 'Cómo dirigirse a las personas sin 당신', text: 'Usa el nombre de la persona + 씨 para adultos que no conoces bien: 김민준씨. Usa su título laboral: 사장님 (jefe), 과장님 (gerente). Usa términos de relación: 언니, 오빠, 아저씨. Estos son mucho más naturales que 당신.' }
    },
    8:  { meaning_es: 'yo (tema, educado) — 저 + marcador de tema 는 → 저는' },
    9: {
      prompt_es: '¿Por qué los coreanos rara vez dicen 당신 en la conversación?',
      choices_es: ["Significa 'enemigo'", 'Puede sonar frío o confrontacional', 'Solo funciona en la escritura', 'Es demasiado informal']
    },
    10: {
      title_es: 'Tercera Persona y Nosotros (그·그녀·우리)',
      body_es: 'El coreano rara vez usa pronombres de tercera persona (él/ella) en el habla. En cambio, los coreanos dicen el nombre de la persona o usan demostrativos: 그 사람 (esa persona), 이 사람 (esta persona). 그 (geu) y 그녀 (geunyeo) existen — él/ella — pero aparecen principalmente en la escritura y la traducción. 우리 (uri) significa "nosotros" o "nuestro". Curiosamente, los coreanos usan 우리 donde el español usa "mi": 우리 엄마 (mi mamá, literalmente "nuestra mamá") — esto refleja un sentido cultural colectivista de familia compartida.',
      tip_es: { label: '우리 = "mi" (para familia y país)', text: '우리 나라 (nuestro país), 우리 집 (mi/nuestra casa), 우리 엄마 (mi mamá) — estos son naturales y comunes. Usar 나의 나라 o 나의 집 en su lugar suena antinatural, casi frío.' }
    },
    11: { meaning_es: 'nosotros / nuestro (a menudo se usa como "mi" para cosas compartidas)' },
    12: { meaning_es: 'nosotros / nuestro (humilde, forma educada de 우리)' },
    13: { meaning_es: 'esa persona (= él / ella, forma informal)' },
    14: { meaning_es: 'ellos / ellas (forma escrita)' },
    15: {
      prompt_es: '우리 엄마 literalmente significa "nuestra mamá" pero se usa para decir…',
      choices_es: ['la mamá de otra persona', 'mi mamá', 'el/la profesor/a', 'un/a desconocido/a']
    },
    16: { meaning_es: 'mi/nuestro país (Corea) — literalmente "nuestro país"' },
    17: { prompt_es: '¿Qué forma de "nosotros" es más humilde y educada, usada con mayores?' },
    18: {
      title_es: 'Pronombres Demostrativos (이·그·저)',
      body_es: 'El coreano tiene tres niveles de demostrativos según la distancia espacial. 이 (i) = cerca del hablante. 그 (geu) = cerca del oyente o mencionado previamente. 저 (jeo) = lejos de ambos, hablante y oyente. Estos se unen a 것 (geot, "cosa") para formar pronombres: 이것 (esto), 그것 (eso), 저것 (aquello). En el habla informal se acortan: 이거, 그거, 저거. Las mismas raíces 이/그/저 también funcionan con palabras de lugar: 여기 (aquí), 거기 (ahí), 저기 (allá).',
      tip_es: { label: '이/그/저 vs 여기/거기/저기', text: '이/그/저 + 것 = esto/eso/aquello (cosa). 이/그/저 + -(e)gi = aquí/ahí/allá. Así que 여기 (yeo-gi) = aquí (cerca del hablante), 거기 (geo-gi) = ahí (cerca del oyente), 저기 (jeo-gi) = allá (lejos de ambos).' }
    },
    19: { meaning_es: 'esto (cosa) — cerca del hablante' },
    20: { meaning_es: 'eso (cosa) — cerca del oyente o ya mencionado' },
    21: { meaning_es: 'aquello (cosa) — lejos de ambos' },
    22: { meaning_es: 'esto (forma informal de 이것)' },
    23: { prompt_es: '¿Qué demostrativo se refiere a algo lejos TANTO del hablante COMO del oyente?' },
    24: { meaning_es: 'aquí (cerca del hablante)' },
    25: { prompt_es: '저것 es la versión formal. ¿Cuál es la versión informal?' },
    26: {
      title_es: 'Pronombres Interrogativos (의문대명사)',
      body_es: 'Las palabras interrogativas coreanas se colocan en la misma posición de la oración que la palabra que reemplazan — a diferencia del español, que mueve "qué" y "dónde" al principio. Compara: 영화 봐요? (¿Ves una película?) vs 뭐 봐요? (¿Qué ves?). La palabra interrogativa simplemente ocupa el lugar original. Los principales pronombres interrogativos son: 누구 (quién), 무엇/뭐 (qué), 어디 (dónde), 언제 (cuándo), 왜 (por qué), 어떻게 (cómo), 얼마 (cuánto).',
      tip_es: { label: 'Sin inversión de pregunta', text: 'El español mueve la palabra interrogativa al principio y a menudo la invierte: "¿Qué estás haciendo?". El coreano mantiene el mismo orden de palabras que una declaración y simplemente intercambia la palabra interrogativa: 뭐 해요? (¿Qué haces?) — literalmente "¿qué hace?".' }
    },
    27: { meaning_es: 'quién' },
    28: { meaning_es: 'qué (formal)' },
    29: { meaning_es: 'qué (informal, muy común)' },
    30: { meaning_es: 'dónde' },
    31: { prompt_es: "¿Qué pronombre interrogativo significa 'quién'?" },
    32: {
      title_es: '¡Pronombres Completados!',
      message_es: 'Has dominado los pronombres coreanos — desde el educado 저 hasta el informal 나, desde 우리 (nuestro/mi), hasta los demostrativos y las palabras interrogativas. ¡Excelente progreso!'
    }
  }
);

console.log('\nDone! Batch 11 complete.');
