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

// ─── vocabulary-news.json ───
patch('vocabulary-news.json',
  { 1: { name_es: 'Noticias y Actualidad' } },
  {
    1: {
      title_es: 'Vocabulario de Noticias en Coreano',
      body_es: 'Leer o ver las noticias en coreano es una excelente forma de desarrollar vocabulario avanzado y mantenerse conectado con la sociedad coreana. Las noticias coreanas usan niveles formales del habla (합쇼체) y muchos términos sino-coreanos. Entender estas palabras te ayudará a seguir programas de noticias, podcasts y periódicos coreanos.',
      tip_es: { label: 'Estrategia para el vocabulario de noticias', text: 'Empieza con canales de noticias en YouTube — las imágenes ayudan a la comprensión. Los programas de 뉴스 (noticias) suelen tener subtítulos en coreano. Frases comunes de apertura: 오늘 뉴스입니다 (Estas son las noticias de hoy) y 보도에 따르면 (Según informes).' }
    },
    2:  { meaning_es: 'Noticias — del inglés "news"' },
    3:  { meaning_es: 'Periodista / reportero' },
    4:  { meaning_es: 'Periódico / diario' },
    5:  { meaning_es: 'Transmisión / emisión' },
    6:  { meaning_es: 'Incidente / suceso / caso' },
    7:  { meaning_es: 'Política — 정치인 = político' },
    8:  { meaning_es: 'Economía' },
    9:  { meaning_es: 'Sociedad / asuntos sociales' },
    10: { meaning_es: 'Internacional — 국제 뉴스 = noticias internacionales' },
    11: { meaning_es: 'Medio ambiente — 환경 문제 = problemas medioambientales' },
    12: { meaning_es: 'Elección' },
    13: { meaning_es: 'Entrevista — del inglés "interview"' },
    14: { meaning_es: 'Estadísticas / datos' },
    15: { meaning_es: 'Noticias de última hora — 속보입니다 = Esto es una noticia de última hora' },
    16: { meaning_es: 'Opinión pública' },
    17: { meaning_es: 'Informe / cobertura noticiosa — 보도에 따르면 = según los informes' },
    18: {
      prompt_es: '속보입니다 se dice al comienzo de...',
      choices_es: ['Un programa de variedades', 'Noticias de última hora', 'Un documental', 'Una entrevista']
    },
    19: {
      prompt_es: '¿Qué sección del noticiero cubre noticias internacionales?',
      choices_es: ['사회 (sociedad)', '경제 (economía)', '국제 (internacional)', '연예 (entretenimiento)']
    },
    20: {
      prompt_es: '기자 es la palabra coreana para...',
      choices_es: ['Político', 'Periodista', 'Locutor', 'Editor']
    },
    21: {
      title_es: '¡Noticias Completadas!',
      message_es: '이제 한국 뉴스를 이해할 수 있어요! Ahora tienes el vocabulario para seguir las noticias coreanas. La actualidad en coreano profundizará tu dominio del idioma y tu comprensión cultural al mismo tiempo — ¡dos por uno!'
    }
  }
);

// ─── vocabulary-proverbs.json ───
patch('vocabulary-proverbs.json',
  { 1: { name_es: 'Proverbios' } },
  {
    1: {
      title_es: 'Proverbios Coreanos (속담)',
      body_es: 'Los proverbios coreanos (속담) ofrecen una ventana a los valores, la sabiduría y el humor de la cultura coreana. Estos dichos se han transmitido durante siglos y aún se usan en la conversación cotidiana. Entenderlos hará que suenes como un nativo — y revelará el alma del idioma.',
      tip_es: { label: 'Cómo usan los coreanos los proverbios', text: 'Los coreanos insertan proverbios en la conversación para expresar un punto de forma concisa. Cuando alguien trabaja increíblemente duro, puedes escuchar: 낮말은 새가 듣고 밤말은 쥐가 들어 (Las palabras del día las escuchan los pájaros; las de la noche, los ratones — ten cuidado con lo que dices). Dominar aunque sea 5 proverbios impresionará a cualquier hablante de coreano.' }
    },
    2: {
      title_es: 'Las palabras amables generan palabras amables',
      body_es: 'Significado: Si tus palabras son amables, las que recibirás también lo serán. Equivalente en español: "Siembra vientos y recogerás tempestades" (versión positiva) / "Trata a los demás como quieres que te traten".',
      rules_es: [
        'ganeun mal = las palabras que salen / lo que dices',
        'oneun mal = las palabras que vuelven / lo que recibes',
        'gopda = ser hermoso / amable (en el habla)',
        'Lección: trata a los demás como quieres que te traten'
      ]
    },
    3: {
      title_es: 'Hablando del rey de Roma...',
      body_es: 'Significado: Incluso un tigre aparecerá si hablas de él. Equivalente en español: "Hablando del rey de Roma, por la puerta asoma."',
      rules_es: [
        'horangi = tigre (animal temido en el folclore coreano)',
        'je mal hamyeon = si hablas de él',
        'onda = viene / aparece',
        'Se usa cuando alguien aparece justo después de que mencionas su nombre'
      ]
    },
    4: {
      title_es: 'Dos cabezas piensan mejor que una',
      body_es: 'Significado: Incluso una hoja de papel blanco es mejor levantarla entre dos. Equivalente en español: "Dos cabezas piensan mejor que una" / "El trabajo en equipo hace el trabajo más liviano".',
      rules_es: [
        'baekjijang = hoja de papel blanco',
        'matdeulmyeon = si la levantan juntos',
        'natda = ser mejor',
        'Enfatiza la colaboración sobre el esfuerzo individual'
      ]
    },
    5: {
      title_es: 'El camino de mil li comienza con un paso',
      body_es: 'Significado: Incluso un viaje de mil li (millas coreanas) comienza con un solo paso. El equivalente coreano del famoso dicho de Lao Tzu.',
      rules_es: [
        'cheon li = mil li (unidad de distancia coreana, ~400 km)',
        'han georeum = un paso',
        'buteo = comenzando desde',
        'Se usa para animar a alguien que comienza un gran objetivo'
      ]
    },
    6: {
      title_es: 'Las paredes oyen',
      body_es: 'Significado: Los pájaros escuchan tus palabras de día; los ratones, las de noche. Habla siempre con cuidado — no hay conversaciones verdaderamente secretas.',
      rules_es: [
        'nanmal = palabras del día / lo que se dice durante el día',
        'bammal = palabras de la noche / lo que se dice de noche',
        'sae = pájaro | jwi = ratón',
        'Recordatorio: ten cuidado con lo que dices de los demás'
      ]
    },
    7: {
      title_es: 'Tras el sufrimiento viene la alegría',
      body_es: 'Significado: Después de las dificultades viene la alegría. Equivalente en español: "No hay mal que por bien no venga" / "A mal tiempo, buena cara".',
      rules_es: [
        'goesaeng = dificultades / sufrimiento',
        'kkute = al final de',
        'nak = alegría / placer / recompensa',
        'Expresión de aliento muy común en coreano'
      ]
    },
    8: {
      title_es: 'Perro que ladra no muerde',
      body_es: 'Significado: El carro vacío hace más ruido. Equivalente en español: "Perro que ladra no muerde" / "Mucho ruido y pocas nueces".',
      rules_es: [
        'bin = vacío',
        'sure = carro / carreta',
        'yoranhada = ser ruidoso / escandaloso',
        'Se dice de personas fanfarronas o ruidosas que carecen de sustancia'
      ]
    },
    9: {
      title_es: 'Genio y figura hasta la sepultura',
      body_es: 'Significado: Los hábitos aprendidos a los tres años duran hasta los ochenta. Equivalente en español: "Genio y figura hasta la sepultura" / "Árbol que crece torcido, nunca su tronco endereza".',
      rules_es: [
        'se sal = tres años',
        'beoreut = hábito',
        'yeodeun = ochenta',
        'kkaji = hasta; ganda = continúa',
        'Se suele decir para explicar por qué la crianza importa'
      ]
    },
    10: {
      title_es: 'Nadie es perfecto',
      body_es: 'Significado: Incluso un mono se cae de un árbol. Equivalente en español: "Nadie es perfecto" / "El mejor escribano echa un borrón".',
      rules_es: [
        'wonsungi = mono',
        'namueeseo = desde un árbol',
        'tteoreojinda = cae',
        'Se dice para consolar a alguien que cometió un error en algo en lo que es bueno'
      ]
    },
    11: {
      title_es: 'Vísteme despacio que tengo prisa',
      body_es: 'Significado: Cuanto más urgente es, más debes tomar el camino largo. Equivalente en español: "Vísteme despacio que tengo prisa" / "Las prisas no son buenas".',
      rules_es: [
        'geupalsurok = cuanto más urgente',
        'doragara = da la vuelta / toma el camino largo',
        'La sabiduría: frena cuando estás bajo presión',
        'Se usa cuando alguien se apresura y comete errores'
      ]
    },
    12: {
      title_es: 'Más vale prevenir que lamentar',
      body_es: 'Significado: Incluso en un camino que conoces, pregunta las indicaciones. Equivalente en español: "Más vale prevenir que lamentar" / "Nunca está de más preguntar".',
      rules_es: [
        'aneun gil = un camino que conoces',
        'mureogara = pregunta (el camino)',
        'Anima a verificar incluso cuando tienes confianza',
        'Valora la humildad y la doble comprobación'
      ]
    },
    13: {
      title_es: 'No hay mal que por bien no venga',
      body_es: 'Significado: Aunque el cielo se derrumbe, habrá un agujero por donde escapar. Equivalente en español: "No hay mal que por bien no venga" / "Donde hay voluntad, hay un camino".',
      rules_es: [
        'haneuri muneojyeodo = aunque el cielo se derrumbe',
        'sosananal = por el que puedes escapar',
        'gumeong = agujero / apertura',
        'Fuerte expresión de esperanza en las peores circunstancias'
      ]
    },
    14: {
      prompt_es: '고생 끝에 낙이 온다 se acerca más a...',
      choices_es: ['Sin dolor no hay recompensa', 'El que mucho habla poco hace', 'Hablando del rey de Roma...', 'Cada paso cuenta']
    },
    15: {
      prompt_es: '원숭이도 나무에서 떨어진다 significa...',
      choices_es: ['Los monos son peligrosos', 'Incluso los expertos cometen errores', 'La práctica hace al maestro', 'Evita los árboles altos']
    },
    16: {
      prompt_es: '천 리 길도 한 걸음부터 te alienta a...',
      choices_es: ['Caminar más rápido', 'Comenzar con el primer paso', 'Planificarlo todo cuidadosamente', 'Pedir ayuda']
    },
    17: {
      title_es: '¡Proverbios Completados!',
      message_es: '정말 대단해요! Has completado la lección de proverbios — la inmersión más profunda en la cultura coreana de este curso. Estos 속담 llevan siglos de sabiduría coreana. ¡Lánzalo en una conversación y observa la reacción — será inolvidable!'
    }
  }
);

console.log('\nDone! Batch 7 complete.');
