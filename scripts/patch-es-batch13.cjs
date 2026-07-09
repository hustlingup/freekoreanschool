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

// ─── pronunciation.json ───
patch('pronunciation.json',
  {
    1: { name_es: 'Batchim (받침)' },
    2: { name_es: 'Enlace (연음화)' },
    3: { name_es: 'Asimilación Nasal' },
    4: { name_es: 'Tensificación' },
    5: { name_es: 'Palatalización y ㄹ' },
    6: { name_es: 'Errores Comunes' }
  },
  {
    1: {
      title_es: '¿Qué es el Batchim?',
      body_es: 'Un batchim (받침, literalmente "soporte") es una consonante colocada en la parte inferior de un bloque de sílaba coreano. Por ejemplo, en la sílaba 강, el ㅇ en la parte inferior es el batchim. No todas las sílabas tienen batchim — muchas terminan solo con la vocal. El batchim explica por qué palabras coreanas como 산, 달 y 밥 terminan con un sonido consonántico distintivo en lugar de una vocal abierta.',
      tip_es: { label: '¿Qué sílabas tienen batchim?', text: 'Mira cualquier bloque de sílaba coreano. Si hay un carácter debajo de la vocal, ese es el batchim. 가 no tiene batchim. 간 tiene batchim ㄴ. 닭 tiene doble batchim ㄺ (se lee como un solo sonido).' }
    },
    2: {
      title_es: 'Los 7 Grupos de Sonidos del Batchim',
      body_es: 'Aunque muchas consonantes diferentes pueden aparecer como batchim en la escritura, todas se reducen a solo 7 posibles sonidos al pronunciarlas. Esto se conoce como las 7 reglas del batchim (받침 7종성). Aprender estos 7 grupos es esencial — explica por qué 닭 (pollo) y 국 (sopa) terminan con el mismo sonido k.',
      rules_es: [
        'Grupo ㄱ: ㄱ, ㄲ, ㅋ, ㄳ, ㄺ → se pronuncia k (sin explosión) — ejemplo: 국 (sopa), 닭 (pollo)',
        'Grupo ㄴ: ㄴ, ㄵ, ㄶ → se pronuncia n — ejemplo: 산 (montaña), 앉다 (sentarse)',
        'Grupo ㄷ: ㄷ, ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ → se pronuncia t (sin explosión) — ejemplo: 옷 (ropa), 꽃 (flor)',
        'Grupo ㄹ: ㄹ, ㄼ, ㄽ, ㄾ, ㅀ → se pronuncia l — ejemplo: 달 (luna), 말 (caballo)',
        'Grupo ㅁ: ㅁ, ㄻ → se pronuncia m — ejemplo: 밤 (noche), 삶 (vida)',
        'Grupo ㅂ: ㅂ, ㅍ, ㄿ, ㄼ → se pronuncia p (sin explosión) — ejemplo: 입 (boca), 앞 (frente)',
        'Grupo ㅇ: ㅇ → se pronuncia ng — ejemplo: 강 (río), 방 (habitación)'
      ],
      tip_es: { label: 'Oclusivas sin explosión — ¿qué significa?', text: 'Los sonidos de batchim k, t y p son sin explosión: tu boca toma la posición pero no libera una ráfaga de aire. Piensa en sostener la p final en "cup" — cup_ — sin dejar salir el aire. El batchim ㄱ/ㄷ/ㅂ coreano funciona igual.' }
    },
    3:  { meaning_es: 'sopa — batchim del grupo ㄱ, se pronuncia k (sin explosión)' },
    4:  { meaning_es: 'montaña — batchim del grupo ㄴ, se pronuncia n' },
    5:  { meaning_es: 'ropa — batchim del grupo ㄷ (ㅅ→t), se pronuncia t (sin explosión)' },
    6:  { meaning_es: 'luna — batchim del grupo ㄹ, se pronuncia l' },
    7:  { meaning_es: 'noche / castaña — batchim del grupo ㅁ, se pronuncia m' },
    8:  { meaning_es: 'boca — batchim del grupo ㅂ, se pronuncia p (sin explosión)' },
    9:  { meaning_es: 'río — batchim del grupo ㅇ, se pronuncia ng' },
    10: { meaning_es: 'pollo — doble batchim ㄺ (ㄹ+ㄱ) → grupo ㄱ → sonido k' },
    11: { meaning_es: 'flor — batchim ㅊ pertenece al grupo ㄷ → sonido t' },
    12: {
      prompt_es: 'ㅋ (kh), ㄲ (kk) y ㄳ son todos batchim del mismo grupo. ¿A qué grupo de sonido pertenecen?',
      choices_es: ['Grupo ㄴ (n)', 'Grupo ㄱ (k)', 'Grupo ㅂ (p)', 'Grupo ㄷ (t)']
    },
    13: {
      prompt_es: '방 (habitación) termina con batchim ㅇ. ¿Qué sonido produce?',
      choices_es: ['Sin sonido — ㅇ siempre es silencioso', 'ng (como en "sing")', 'n', 'm']
    },
    14: {
      title_es: 'Enlace — Sonido de Enlace',
      body_es: 'Cuando una sílaba que termina en batchim va seguida inmediatamente de una sílaba que comienza con la ㅇ silenciosa, la consonante batchim avanza y se convierte en la consonante inicial de la siguiente sílaba. La escritura permanece igual — solo la pronunciación cambia. Esto se llama enlace (연음화) y es uno de los fenómenos de pronunciación más frecuentes en coreano.',
      tip_es: { label: 'Identifica el patrón', text: 'Busca: consonante batchim + sílaba siguiente que comienza con ㅇ (marcador silencioso). Resultado: el batchim suena como si abriera la sílaba siguiente. 먹어요 → 머거요. 한국어 → 한구거. La forma escrita nunca cambia — solo cambia tu pronunciación.' }
    },
    15: { meaning_es: 'Como / estoy comiendo — el batchim ㄱ de 먹 se enlaza con 어, suena como 머거요' },
    16: { meaning_es: 'arroz (forma de objeto) — el batchim ㅂ de 밥 se enlaza con 을, suena como 바블' },
    17: { meaning_es: 'Está bien / Me gusta — el batchim ㅎ se debilita y se enlaza (ver Etapa 4 para reglas de ㅎ)' },
    18: { meaning_es: 'Idioma coreano — el batchim ㄱ de 국 se enlaza con 어, suena como 한구거' },
    19: {
      title_es: '¿Por qué ocurre el Enlace?',
      body_es: 'La estructura de las sílabas coreanas prefiere fuertemente el patrón consonante + vocal. Cuando una sílaba con vocal inicial sigue a un batchim, es fonéticamente más fácil para la consonante unirse a ese espacio abierto de la vocal. El resultado es un flujo de habla más natural y conectado. Esto no es jerga ni pronunciación descuidada — es el coreano estándar y se puede escuchar en transmisiones de noticias, discursos formales y conversaciones cotidianas.',
      tip_es: { label: 'Enlace vs ortografía', text: 'El coreano escrito conserva la consonante original en su posición ortográfica incluso cuando se pronuncia en la sílaba siguiente. Por eso aprender a leer coreano y aprender a pronunciarlo son al principio dos habilidades separadas — la escritura registra morfemas, no sonidos exactos.' }
    },
    20: {
      prompt_es: 'El enlace (연음화) ocurre cuando un batchim es seguido por una sílaba que comienza con…',
      choices_es: ['Cualquier consonante', 'La ㅇ silenciosa (sílaba de vocal inicial)', 'Solo ㄴ o ㅁ', 'Una consonante aspirada']
    },
    21: {
      prompt_es: 'En 한국어 (idioma coreano), el batchim ㄱ de 국 se enlaza hacia adelante. ¿Cómo se pronuncia?',
      choices_es: ['한국어 → 항궈 (se queda en 국)', '한국어 → 한구거 (ㄱ abre 어)', '한국어 → 한국어 (sin cambio)', '한국어 → 한국아 (la vocal cambia)']
    },
    22: {
      title_es: 'Asimilación Nasal',
      body_es: 'Cuando una consonante oclusiva batchim de los grupos ㄱ, ㄷ o ㅂ va seguida de las consonantes nasales ㄴ o ㅁ, la oclusiva se asimila y cambia a su sonido nasal correspondiente. Esto es puramente articulatorio: las consonantes nasales requieren que el velo baje, lo cual arrastra las oclusivas adyacentes al territorio nasal. La escritura permanece igual; solo la pronunciación cambia.',
      rules_es: [
        'ㅂ + ㄴ/ㅁ → ㅁ: la oclusiva labial se convierte en nasal labial — 입니다 → 임니다',
        'ㄱ + ㄴ/ㅁ → ㅇ: la oclusiva velar se convierte en nasal velar — 국물 → 궁물',
        'ㄷ + ㄴ/ㅁ → ㄴ: la oclusiva alveolar se convierte en nasal alveolar — 걷는다 → 건는다'
      ],
      tip_es: { label: '¿Por qué el mismo punto de articulación?', text: 'Cada par (ㅂ↔ㅁ, ㄱ↔ㅇ, ㄷ↔ㄴ) comparte exactamente el mismo punto de articulación en la boca — labios, parte posterior de la garganta y reborde dental respectivamente. Solo el flujo de aire nasal cambia. La consonante nasal "infecta" a la oclusiva anterior, convirtiéndola en nasal mientras mantiene la posición de la boca.' }
    },
    23: { meaning_es: 'es / soy / eres (formal) — ㅂ + ㄴ → ㅁ: se escribe 입니다, suena como 임니다' },
    24: { meaning_es: 'caldo — ㄱ + ㅁ → ㅇ: se escribe 국물, suena como 궁물' },
    25: { meaning_es: 'año escolar / curso — ㄱ + ㄴ → ㅇ: se escribe 학년, suena como 항년' },
    26: { meaning_es: 'camina / caminar — ㄷ + ㄴ → ㄴ: se escribe 걷는다, suena como 건는다' },
    27: { meaning_es: 'patio delantero — ㅂ + ㅁ → ㅁ: se escribe 앞마당, suena como 암마당' },
    28: { prompt_es: 'El batchim ㅂ (o ㅍ) seguido de ㄴ o ㅁ cambia a ¿qué sonido?' },
    29: { prompt_es: 'El batchim ㄱ seguido de ㄴ o ㅁ cambia a ¿qué sonido?' },
    30: {
      prompt_es: '입니다 (es / soy / eres) — ¿cómo se pronuncia realmente?'
    },
    31: {
      title_es: 'El Patrón de Asimilación Siempre Va en Una Sola Dirección',
      body_es: 'La asimilación nasal siempre va en la misma dirección: la oclusiva se convierte en nasal, nunca al revés. La consonante nasal "infecta" al sonido anterior. Una vez que identifies el patrón ㅂ→ㅁ, ㄷ→ㄴ, ㄱ→ㅇ, empezarás a escuchar y predecir estos cambios automáticamente en el habla coreana real.',
      tip_es: { label: 'Truco para memorizar', text: 'Piensa en cada par como compartiendo un lugar en tu boca. Labios: ㅂ (oclusiva) ↔ ㅁ (nasal). Garganta: ㄱ (oclusiva) ↔ ㅇ (nasal). Reborde dental: ㄷ (oclusiva) ↔ ㄴ (nasal). El lugar permanece; solo la válvula nasal se abre.' }
    },
    32: {
      title_es: 'Tensificación',
      body_es: 'Después de ciertas consonantes batchim — específicamente los sonidos batchim de oclusiva sin explosión de los grupos ㄱ, ㄷ y ㅂ — la consonante siguiente se tensa (se dobla). La forma escrita no cambia; solo la pronunciación varía. La tensificación explica por qué 학교 (escuela) suena como 학꾜 en lugar de 학교.',
      tip_es: { label: 'Por qué ocurre la tensificación', text: 'Después de una oclusiva sin explosión, el tracto vocal ya está en una posición tensa y cerrada. Cuando comienzas la siguiente consonante desde este estado, la tensión muscular adicional se transfiere, creando el sonido tenso automáticamente. La tensificación no es deliberada — es una consecuencia articulatoria natural. Una vez que la escuchas en el habla real, no puedes dejar de oírla.' }
    },
    33: { meaning_es: 'escuela — el batchim ㄱ provoca tensificación: ㄱ→ㄲ, suena como 학꾜' },
    34: { meaning_es: 'restaurante — el batchim ㄱ provoca tensificación: ㄷ→ㄸ, suena como 식땅' },
    35: { meaning_es: 'cerrar — el batchim ㄷ provoca tensificación: ㄷ→ㄸ, suena como 닫따' },
    36: { meaning_es: 'entrada — el batchim ㅂ provoca tensificación: ㄱ→ㄲ, suena como 입꾸' },
    37: {
      prompt_es: 'La tensificación (경음화) ocurre de forma más predecible después de ¿qué tipo de batchim?',
      choices_es: ['Batchim nasal (ㄴ, ㅁ, ㅇ)', 'Batchim de oclusiva sin explosión (grupos ㄱ, ㄷ, ㅂ)', 'Solo el batchim ㄹ', 'Cualquier consonante batchim']
    },
    38: {
      prompt_es: '학교 (escuela) — ¿cómo se pronuncia realmente?',
      choices_es: ['hak-gyo', 'hak-kyo (aspirada)', 'hak-kkyo (tensa)', 'ha-gyo']
    },
    39: {
      title_es: 'Debilitamiento de ㅎ',
      body_es: 'La consonante ㅎ es uno de los sonidos más inestables del coreano. Entre vocales — ya sea que ㅎ sea batchim o consonante inicial — se debilita significativamente y a menudo desaparece casi por completo. Por eso 좋아요 (está bien) suena como 조아요 y no como 조하요. El ㅎ sigue escrito, pero el sonido casi desaparece.',
      tip_es: { label: 'Error común de principiantes', text: 'Muchos principiantes dicen 조하요 para 좋아요, manteniendo el sonido h. En el habla coreana real esto suena antinatural y demasiado deliberado. La pronunciación estándar es 조아요 — el ㅎ desaparece silenciosamente entre las dos vocales. Confía en la regla: el ㅎ entre vocales casi desaparece.' }
    },
    40: { meaning_es: 'Está bien / Me gusta — el batchim ㅎ se debilita: suena como 조아요 (no 조하요)' },
    41: { meaning_es: 'Hay mucho — el ㅎ en el batchim ㄶ se debilita: suena como 마나요' },
    42: { meaning_es: 'Lo pongo dentro — el batchim ㅎ se debilita entre vocales: suena como 너어요' },
    43: {
      title_es: 'ㅎ + Consonante = Aspiración',
      body_es: 'Cuando el batchim ㅎ encuentra la consonante inicial de la sílaba siguiente (o viceversa), los dos se fusionan en una sola consonante aspirada. ㅎ + ㄷ se convierte en ㅌ. ㄱ + ㅎ se convierte en ㅋ. ㅂ + ㅎ se convierte en ㅍ. ㄷ + ㅎ (o ㅎ + ㄷ) se convierte en ㅌ. Piensa en ㅎ como añadiendo una ráfaga de aire a la consonante adyacente.',
      rules_es: [
        'ㅎ + ㄷ → ㅌ: 놓다 (colocar) → 노타',
        'ㄱ + ㅎ → ㅋ: 착하다 (amable) → 차카다',
        'ㅂ + ㅎ → ㅍ: 입학 (inscripción) → 이팍',
        'ㄷ + ㅎ → ㅌ: 못해요 (no puedo) → 모태요'
      ]
    },
    44: { meaning_es: 'soltar / colocar — batchim ㅎ + ㄷ → ㅌ: se escribe 놓다, suena como 노타' },
    45: {
      prompt_es: '¿Qué sonido produce ㅎ + ㄷ (o ㄷ + ㅎ)?',
      choices_es: ['ㄷ (regular)', 'ㅌ (t aspirada)', 'ㄸ (tensa)', 'ㅎ (se queda como h)']
    },
    46: {
      title_es: 'Palatalización',
      body_es: 'Cuando las consonantes ㄷ o ㅌ aparecen como batchim y van seguidas de la vocal 이 (i), avanzan en la boca y cambian a ㅈ y ㅊ respectivamente. Este cambio se llama palatalización — la consonante se mueve del reborde dental al paladar para anticipar la vocal frontal 이.',
      rules_es: [
        'ㄷ + 이 → ㅈ이 → 지: 굳이 (deliberadamente) → 구지',
        'ㅌ + 이 → ㅊ이 → 치: 같이 (juntos) → 가치'
      ],
      tip_es: { label: 'Solo dentro del morfema', text: 'La palatalización solo aplica dentro de la misma palabra o cuando un sufijo que comienza con 이 se une al radical. No aplica entre límites de palabras. 같이 provoca palatalización porque 이 es parte de la palabra. En una frase como 옷 입어요 (poniéndose ropa), 이 comienza una palabra separada — se aplican reglas diferentes.' }
    },
    47: { meaning_es: 'juntos — ㅌ + 이 → ㅊ: se escribe 같이, suena como 가치' },
    48: { meaning_es: 'deliberadamente / tercamente — ㄷ + 이 → ㅈ: se escribe 굳이, suena como 구지' },
    49: { prompt_es: 'Cuando el batchim ㄷ es seguido por la vocal 이, cambia a…' },
    50: { prompt_es: 'Cuando el batchim ㅌ es seguido por la vocal 이, cambia a…' },
    51: {
      title_es: 'El Sonido ㄹ',
      body_es: 'La consonante coreana ㄹ a menudo se describe como entre r y l — y eso es precisamente correcto. Su realización exacta depende de su posición dentro de la sílaba. Entre dos vocales, ㄹ es un rápido golpe del extremo de la lengua contra el reborde justo detrás de los dientes superiores — el mismo movimiento que la r percusiva (vibrante simple) en español como en "pero" o "caro". Al final de una sílaba o antes de una consonante, mantén la lengua ligeramente en ese mismo reborde para un sonido l suave.',
      tip_es: { label: 'Técnica del golpe de lengua', text: 'No hagas vibrar ㄹ como la rr española (sin vibración múltiple) y no uses una l inglesa en posición vocálica. En 라면 el ㄹ es un golpe rápido — como la r de "pero" en español. En 달 (luna) el ㄹ es una l sostenida. En 빨리 (rápidamente) obtienes ambas: una l sostenida y luego un golpe.' }
    },
    52: { meaning_es: 'fideos instantáneos — ㄹ en posición inicial (antes de vocal): golpe rápido de r' },
    53: { meaning_es: 'luna — ㄹ como batchim final: sonido l sostenido' },
    54: { meaning_es: 'rápido, veloz — ㄹㄹ doble: l sostenida seguida de golpe de r' },
    55: { meaning_es: 'Te amo — ㄹ entre vocales (랑→해): sonido de golpe de r' },
    56: {
      title_es: 'ㄹ + ㄴ o ㄴ + ㄹ → ㄹㄹ (Lateralización)',
      body_es: 'Cuando ㄹ y ㄴ aparecen adyacentes entre sílabas, ambos se convierten en ㄹ — esto se llama lateralización (유음화). Ejemplo: 신라 (dinastía Silla) se pronuncia 실라 (silla), no sin-ra. Similarmente, 연락 (contacto) se pronuncia 열락 (yeollak). El ㄴ se convierte completamente en ㄹ cuando es adyacente a ㄹ.',
      tip_es: { label: '¿Por qué lateralización?', text: 'ㄹ y ㄴ comparten posiciones de lengua muy similares — ambos son sonidos alveolares producidos en el reborde dental. Cuando aparecen uno al lado del otro, el ㄹ más fuerte (lateral) arrastra al ㄴ a su territorio. Este es uno de los cambios de sonido más llamativos porque la escritura no da ninguna pista visual de que está ocurriendo.' }
    },
    57: {
      prompt_es: '신라 (Silla — un reino coreano histórico) se pronuncia como…'
    },
    58: {
      title_es: '6 Errores Comunes para Hispanohablantes',
      body_es: 'El coreano y el español tienen sistemas fonológicos muy diferentes. Los siguientes seis pasos cubren cada uno un error de pronunciación común — con explicaciones claras sobre cómo corregirlo. Reconocer estos patrones desde el principio ahorra meses de malos hábitos.',
      tip_es: { label: '¿Qué los hace tan comunes?', text: 'Los hispanohablantes aplican automáticamente la fonología española a los nuevos sonidos. El coreano tiene vocales, contrastes de consonantes y patrones de entonación que simplemente no existen en español. Cada uno de estos errores proviene de mapear un sonido coreano al equivalente español más cercano — lo cual casi siempre es incorrecto.' }
    },
    59: {
      title_es: 'Error 1 — Pronunciar ㅡ como "u"',
      body_es: 'ㅡ no tiene equivalente en español. Es una vocal posterior no redondeada — tu lengua está en la posición de "u" pero tus labios están completamente planos y no redondeados, como si dijeras "i" con la boca extendida horizontalmente. Palabras como 으, 크다, 든지 usan este sonido. En el momento en que tus labios se redondean, estás produciendo la vocal incorrecta.',
      tip_es: { label: 'Cómo practicar ㅡ', text: 'Di "u" como en "luna". Ahora mantén tu lengua exactamente en esa posición pero extiende tus labios planos como si sonrieras. El sonido que sale — rígido, no redondeado, ligeramente posterior — es ㅡ. No relajes la lengua hasta convertirla en "a"; mantenla alta y posterior.' }
    },
    60: {
      title_es: 'Error 2 — Confundir ㅓ con la "e" española',
      body_es: 'ㅓ a menudo se transcribe como "eo" o "uh" en inglés, pero tampoco es exactamente la "e" española. La ㅓ coreana es una vocal media posterior no redondeada, ligeramente más atrás y abierta que la "e" española. Piensa en una "e" relajada con la boca más abierta, sin tensión. Añadir tensión o redondear los labios hace que la vocal suene extranjera.',
      tip_es: { label: 'Prueba rápida', text: 'Di "e" de "pero" de forma relajada y abre la boca un poco más. Eso es lo más cercano a ㅓ en español. No la tenses, no la redondees. Solo una vocal abierta y neutra. Palabras para practicar: 어, 어머니, 뭐.' }
    },
    61: {
      title_es: 'Error 3 — Aspirar Consonantes Dobles',
      body_es: 'Los hispanohablantes a veces añaden aspiración a las consonantes oclusivas. Las consonantes tensas (dobles) coreanas ㄲ, ㄸ, ㅃ, ㅆ, ㅉ nunca se aspiran. Se producen con músculos tensos y sin ráfaga de aire hacia afuera. Pon un papel delante de tu boca — no debe moverse cuando dices 까, 따, 빠, 싸, 짜. El contraste es entre tenso-y-sostenido versus aire expulsado.',
      tip_es: { label: 'La prueba del papel', text: 'Las consonantes aspiradas (ㅋ, ㅌ, ㅍ, ㅊ) hacen que el papel se mueva mucho. Las consonantes simples (ㄱ, ㄷ, ㅂ, ㅈ) lo mueven un poco. Las consonantes tensas (ㄲ, ㄸ, ㅃ, ㅉ) apenas deben mover el papel — máxima tensión muscular, cero liberación de aire.' }
    },
    62: {
      title_es: 'Error 4 — Entonación Ascendente en Todas las Preguntas',
      body_es: 'En español, la entonación ascendente al final de una oración señala una pregunta. En coreano, las reglas de entonación difieren: las preguntas de sí/no usan una ligera subida al final, pero las preguntas con pronombres interrogativos (quién, qué, dónde, cuándo, por qué, cómo) típicamente usan una entonación descendente o neutra — no ascendente. Usar en exceso la entonación ascendente en todas las preguntas coreanas suena antinatural y a veces incierto.',
      tip_es: { label: 'El patrón a recordar', text: 'Pregunta sí/no: ligera subida al final. Ejemplo: 갔어요? (¿Fuiste?) — termina subiendo. Pregunta con interrogativo: neutra o descendente. Ejemplo: 어디 갔어요? (¿Dónde fuiste?) — termina plano o descendente. La palabra interrogativa lleva suficiente información; no se necesita melodía ascendente.' }
    },
    63: {
      title_es: 'Error 5 — ㅅ como "s" Simple Antes de Vocales 이',
      body_es: 'Antes de las vocales 이, 야, 여, 요, 유, la consonante ㅅ se pronuncia similar a "sh" (como la "ch" en "Chile" o "cheque"). Así que 시 es "shi" no "si", y 셔츠 (camisa) comienza con ese sonido. Esto también aplica a la ㅆ tensa antes de 이. Los hispanohablantes que aprendieron la romanización primero a menudo dicen "si" cuando los hablantes nativos dicen "shi", lo cual se nota inmediatamente.',
      tip_es: { label: '¿Qué vocales lo provocan?', text: 'El ㅅ palatalizado (sonido "sh") ocurre antes de vocales de tipo 이: 이 (i), 야 (ya), 여 (yeo), 요 (yo), 유 (yu). Antes de todas las demás vocales — 아, 어, 오, 우, 으 y sus compuestos — ㅅ se mantiene como un sonido s simple. 사 es "sa", pero 시 es "shi".' }
    },
    64: {
      title_es: 'Error 6 — Pronunciar la ㅎ en 좋아요',
      body_es: 'Los principiantes a menudo dicen "jo-ha-yo" para 좋아요, tratando ㅎ como un sonido h claramente pronunciado. Pero debido al debilitamiento de ㅎ entre vocales (que aprendiste en la Etapa 4), la pronunciación real es 조아요 (jo-a-yo) — la ㅎ casi desaparece. Esto aplica ampliamente: 많아요 → 마나요, 낳아요 → 나아요. Siempre que ㅎ esté entre vocales en contexto de habla natural, se desvanece.',
      tip_es: { label: 'Conectando con la Etapa 4', text: 'Ya aprendiste el debilitamiento de ㅎ y la aspiración de ㅎ + consonante. El Error 6 es simplemente el lugar más común del mundo real donde los principiantes encuentran el debilitamiento de ㅎ y se equivocan. 좋아요 es posiblemente la forma de adjetivo más usada en coreano — acertar su pronunciación importa inmediatamente.' }
    },
    65: {
      prompt_es: 'Al pronunciar ㅡ, tus labios deben estar…',
      choices_es: ['Redondeados como "u"', 'Planos y no redondeados (extendidos)', 'Ligeramente abiertos como "a"', 'Fruncidos como un beso']
    },
    66: {
      prompt_es: 'ㅅ antes de la vocal 이 suena como…',
      choices_es: ['"s" simple como en "sala"', '"sh" como en "she" (inglés)', '"z" como en "zero"', '"t" como en "tea"']
    },
    67: {
      prompt_es: '좋아요 (está bien / me gusta) se pronuncia realmente como…'
    },
    68: {
      title_es: '¡Guía de Pronunciación Completada!',
      message_es: 'Has dominado las 8 reglas de pronunciación coreana: reducción de batchim, enlace, asimilación nasal, tensificación, debilitamiento de ㅎ, aspiración de ㅎ, palatalización y el sonido ㄹ. Más los 6 errores más comunes que cometen los hispanohablantes — y cómo evitarlos. Tu pronunciación del coreano ahora sonará mucho más natural.'
    }
  }
);

console.log('\nDone! Batch 13 complete.');
