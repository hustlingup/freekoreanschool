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

// ─── emotions.json ───
patch('emotions.json',
  {
    1: { name_es: 'Emociones Básicas' },
    2: { name_es: 'Expresar Sentimientos' },
    3: { name_es: 'Emociones Complejas' },
    4: { name_es: 'Frases Emocionales' }
  },
  {
    1: {
      title_es: 'Emociones en Coreano (감정)',
      body_es: 'Las palabras de emoción coreanas son en su mayoría adjetivos en su forma base. A diferencia del español ("Soy feliz"), los adjetivos coreanos actúan como verbos y se conjugan directamente: 행복해요 (Soy feliz / Está bien) sin necesitar un "soy" separado. La forma de diccionario termina en -다: 행복하다, 슬프다, 무섭다. Quita -다 y añade -아요/-어요 para el presente educado. El vocabulario de emociones es especialmente útil para hablar sobre K-dramas, la vida cotidiana y los sentimientos personales.',
      tip_es: { label: 'Los adjetivos se conjugan como verbos', text: '행복하다 → 행복해요 (Soy feliz). 슬프다 → 슬퍼요 (Estoy triste). 피곤하다 → 피곤해요 (Estoy cansado/a). El final -아요/-어요 hace que el adjetivo sea educado y en presente simultáneamente.' }
    },
    2:  { meaning_es: 'ser feliz (forma de diccionario)' },
    3:  { meaning_es: 'estar triste (forma de diccionario)' },
    4:  { meaning_es: 'estar enojado/a (literalmente: la ira sale)' },
    5:  { meaning_es: 'tener miedo / dar miedo' },
    6: {
      prompt_es: '¿Qué palabra significa "ser feliz"?',
      choices_es: ['슬프다', '무섭다', '행복하다', '화가 나다']
    },
    7: {
      title_es: 'Conjugando Adjetivos de Emoción',
      body_es: 'Para usar adjetivos de emoción en una conversación educada, elimina -다 de la forma de diccionario y añade el final educado del presente. Para raíces terminadas en 하: 하다 → 해요 (행복하다 → 행복해요). Para raíces con vocal brillante (ㅏ, ㅗ): añade -아요. Para los demás: añade -어요, a menudo contraído — 슬프다 → 슬프 + 어요 → 슬퍼요, 무섭다 → 무서워요. El mismo patrón se aplica a la mayoría de los verbos descriptivos coreanos (adjetivos).',
      tip_es: { label: 'Tabla de conjugación rápida', text: '행복하다 → 행복해요. 슬프다 → 슬퍼요. 화나다 → 화나요. 무섭다 → 무서워요. 피곤하다 → 피곤해요. 기쁘다 → 기뻐요. Observa que 슬프다 pierde la 으 antes de -어요.' }
    },
    8:  { meaning_es: 'Soy feliz / Está feliz (presente educado)' },
    9:  { meaning_es: 'Estoy triste (presente educado)' },
    10: {
      title_es: 'Más Palabras de Sentimientos (감정 어휘)',
      body_es: 'El coreano tiene un rico conjunto de palabras de emoción más allá de lo básico. 기쁘다 (estar alegre/jubiloso) es una felicidad ligeramente más fuerte o específica que 행복하다. 걱정되다 (estar preocupado) literalmente significa "la preocupación ocurre/sucede". 신나다 (estar emocionado/animado) se usa comúnmente para situaciones enérgicas — conciertos, deportes, celebraciones. 피곤하다 (estar cansado) es esencial para la vida cotidiana, especialmente cuando explicas que no puedes hacer algo.',
      tip_es: { label: '신나다 en la cultura pop', text: '신나다 y 신나요 están en todas partes en la cultura pop coreana. Las canciones de K-pop a menudo usan 신나 para describir un ritmo o ambiente emocionante. También escucharás 신난다! como exclamación (¡Qué emocionante!) en eventos y fiestas.' }
    },
    11: { meaning_es: 'estar alegre / jubiloso' },
    12: { meaning_es: 'estar preocupado/a' },
    13: { meaning_es: 'estar cansado/a / agotado/a' },
    14: { meaning_es: 'estar emocionado/a / animado/a' },
    15: {
      prompt_es: '¿Qué palabra significa "estar cansado"?',
      choices_es: ['기쁘다', '신나다', '피곤하다', '걱정되다']
    },
    16: {
      title_es: '기분 — Estado de Ánimo y Sentimiento',
      body_es: '기분 (gibun) es la palabra clave para describir tu estado de ánimo o sentimiento general. 기분이 좋다 = sentirse bien / estar de buen humor. 기분이 나쁘다 = sentirse mal / estar de mal humor. 기분 puede describir el tono emocional de manera más amplia que palabras de emoción individuales — se trata de tu estado general. Escucharás 기분이 어때요? (¿Cómo te sientes?) en la conversación cotidiana.',
      tip_es: { label: '기분 vs 감정', text: '기분 = estado de ánimo, sentimiento general (contextual, puede cambiar). 감정 = emoción (sentimiento más específico como ira, alegría, miedo). 기분이 좋아요 = Me siento bien ahora mismo. 감정을 표현하다 = expresar emoción.' }
    },
    17: { meaning_es: 'Me siento bien / Estoy de buen humor' },
    18: {
      prompt_es: '기분이 좋아요 significa...',
      choices_es: ['Me siento mal', 'Me siento bien', 'Tengo hambre', 'Estoy cansado/a']
    },
    19: {
      title_es: 'Emociones Más Profundas (깊은 감정)',
      body_es: 'El coreano tiene varias palabras de emoción sin equivalente en una sola palabra en español. 그립다 (geuripda) describe echar de menos a alguien o algo — el anhelo por una persona o lugar amado que está ausente. 외롭다 (oeropda) es la soledad, pero con una profundidad cultural de aislamiento. 부끄럽다 (bukkeureupda) es vergüenza o timidez. 뿌듯하다 (ppudeuthada) es el cálido orgullo o satisfacción de un logro — la sensación que tienes cuando terminas algo difícil o cuando ves a alguien que te importa tener éxito.',
      tip_es: { label: '한 (Han) — tristeza coreana intraducible', text: '한 (han) es una emoción culturalmente específica: una profunda tristeza mezclada con resiliencia, enraizada en el sufrimiento histórico pero transformada en energía creativa. Se escucha en el pansori (ópera folclórica coreana), se describe en la poesía y se menciona en debates sobre la identidad coreana. No es una palabra para usar casualmente, pero es esencial para la comprensión cultural.' }
    },
    20: { meaning_es: 'echar de menos a alguien/algo (anhelo)' },
    21: { meaning_es: 'estar solo/a' },
    22: { meaning_es: 'estar avergonzado/a / ser tímido/a' },
    23: { meaning_es: 'sentirse orgulloso/a / pleno/a (cálida sensación de logro)' },
    24: {
      prompt_es: '그립다 significa...',
      choices_es: ['estar alegre', 'echar de menos a alguien (anhelo)', 'estar cansado/a', 'estar solo/a']
    },
    25: { meaning_es: 'sentir el corazón aleteando de emoción (anticipación romántica)' },
    26: {
      prompt_es: '뿌듯하다 significa...',
      choices_es: ['estar avergonzado/a', 'sentirse orgulloso/pleno', 'estar solo/a', 'echar de menos a alguien']
    },
    27: {
      title_es: 'Patrones de Frases Emocionales Comunes',
      body_es: 'Varios patrones de frases son especialmente útiles para expresar emociones en coreano. "보고 싶어요" (Te echo de menos / Quiero verte) usa 보다 (ver) + -고 싶다 (querer). "감동받았어요" (Me conmovió) usa 감동 (emoción profunda) + 받다 (recibir). "괜찮아요" (Estoy bien / No hay problema) es una de las frases más versátiles — se usa para "estoy bien", "no hay problema", "no pasa nada" y "no importa".',
      tip_es: { label: '괜찮아요 — la frase multiuso', text: '괜찮아요 literalmente significa "está bien/okay". Úsala para tranquilizar a alguien de que estás bien (tras una caída), para aceptar una oferta que antes rechazaste, para decir "no, gracias", o para expresar "eso está bien". Dominar su tono es clave — mismas palabras, mensajes muy diferentes.' }
    },
    28: { meaning_es: 'Te echo de menos / Quiero verte' },
    29: { meaning_es: 'Me conmoví / Me emocionó (emocionalmente)' },
    30: { meaning_es: 'Estoy bien / Está bien / No hay problema' },
    31: {
      prompt_es: '보고 싶어요 significa...',
      choices_es: ['Estoy bien', 'Me conmovió', 'Te echo de menos / Quiero verte', 'Estoy solo/a']
    },
    32: { meaning_es: '¡Ánimo! / ¡Aguanta! (literalmente: saca fuerza)' },
    33: {
      title_es: '¡Emociones Completadas!',
      message_es: 'Has explorado el vocabulario de emociones en coreano — desde sentimientos básicos hasta palabras culturalmente ricas como 그립다, 뿌듯하다 y 설레다. ¡Tu coreano emocional está creciendo!'
    }
  }
);

console.log('\nDone! Batch 8 complete.');
