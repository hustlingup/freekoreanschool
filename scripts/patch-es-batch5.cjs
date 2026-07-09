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

// ─── vocabulary-verbs.json ───
patch('vocabulary-verbs.json',
  { 1: { name_es: 'Verbos' } },
  {
    1: {
      title_es: 'Verbos en Coreano',
      body_es: 'Los verbos coreanos (동사) siempre van al final de la oración. La forma de diccionario termina en -다. Para hacer el presente educado, cambia -다 por -아요 o -어요 dependiendo de la vocal de la última sílaba. Ejemplo: 먹다 (comer) → 먹어요 (como / come).',
      tip_es: { label: 'Regla de conjugación verbal', text: 'La última sílaba tiene vocal ㅏ o ㅗ → usa -아요 (ej. 가다 → 가요). Otras vocales → usa -어요 (ej. 먹다 → 먹어요). Verbos que terminan en 하다 → 해요 (ej. 공부하다 → 공부해요).' }
    },
    2:  { meaning_es: 'Ir — 가요 (presente educado)' },
    3:  { meaning_es: 'Venir — 와요 (presente educado)' },
    4:  { meaning_es: 'Comer — 먹어요 (presente educado)' },
    5:  { meaning_es: 'Beber — 마셔요 (presente educado)' },
    6:  { meaning_es: 'Ver / mirar — 봐요 (presente educado)' },
    7:  { meaning_es: 'Escuchar / oír — 들어요 (presente educado, irregular)' },
    8:  { meaning_es: 'Hablar / decir — 말해요 (presente educado)' },
    9:  { meaning_es: 'Leer — 읽어요 (presente educado)' },
    10: { meaning_es: 'Escribir / usar — 써요 (presente educado)' },
    11: { meaning_es: 'Comprar — 사요 (presente educado)' },
    12: { meaning_es: 'Vender — 팔아요 (presente educado)' },
    13: { meaning_es: 'Estudiar — 공부해요 (presente educado)' },
    14: { meaning_es: 'Trabajar — 일해요 (presente educado)' },
    15: { meaning_es: 'Dormir — 자요 (presente educado)' },
    16: { meaning_es: 'Conocer / encontrarse — 만나요 (presente educado)' },
    17: { meaning_es: 'Gustar — 좋아해요 (presente educado)' },
    18: { prompt_es: '먹다 → el presente educado es...' },
    19: {
      prompt_es: '¿Qué verbo significa "estudiar"?',
      choices_es: ['Dormir', 'Trabajar', 'Estudiar', 'Comprar']
    },
    20: {
      prompt_es: '¿Qué verbo significa "vender"?',
      choices_es: ['Conocer', 'Vender', 'Escuchar', 'Escribir']
    },
    21: {
      prompt_es: '가다 (ir) → el presente educado es...',
      choices_es: ['Conocer', 'Escuchar', 'Ir', 'Venir']
    },
    22: {
      title_es: '¡Verbos Completados!',
      message_es: '완벽해요! Has dominado los verbos esenciales del coreano y el patrón de conjugación. Los verbos son el motor de cada oración — ¡ahora que conoces la regla, cada nuevo verbo que aprendas es inmediatamente utilizable!'
    }
  }
);

// ─── vocabulary-numbers.json ───
patch('vocabulary-numbers.json',
  { 1: { name_es: 'Números' } },
  {
    1: {
      title_es: 'Dos Sistemas de Números',
      body_es: 'El coreano usa dos sistemas numéricos separados: números nativos coreanos (고유어) y números sino-coreanos (한자어). Debes conocer ambos — se usan en situaciones diferentes.',
      rules_es: [
        'Coreano nativo: se usa para contar objetos (개), edad (살) y horas (시) — ej. 하나, 둘, 셋',
        'Sino-coreano: se usa para dinero (원), minutos (분), fechas, números de teléfono y direcciones — ej. 일, 이, 삼',
        'Los números grandes siempre usan sino-coreano — 백 (100), 천 (1.000), 만 (10.000)'
      ],
      tip_es: { label: 'Truco de memoria rápido', text: 'Recuerda: Nativo = ritmos corporales naturales (latido, edad, contar con los dedos). Sino-coreano = contextos sistemáticos/oficiales (relojes, dinero, calendarios).' }
    },
    2:  { meaning_es: 'Uno (coreano nativo) — se usa para la edad y contar objetos' },
    3:  { meaning_es: 'Dos (coreano nativo) — se convierte en 두 antes de un contador' },
    4:  { meaning_es: 'Tres (coreano nativo) — se convierte en 세 antes de un contador' },
    5:  { meaning_es: 'Cuatro (coreano nativo) — se convierte en 네 antes de un contador' },
    6:  { meaning_es: 'Cinco (coreano nativo)' },
    7:  { meaning_es: 'Seis (coreano nativo)' },
    8:  { meaning_es: 'Siete (coreano nativo)' },
    9:  { meaning_es: 'Ocho (coreano nativo)' },
    10: { meaning_es: 'Diez (coreano nativo) — se usa para las 10 en punto (열 시)' },
    11: {
      prompt_es: 'Estás diciendo tu edad en coreano. ¿Qué sistema numérico usas?',
      choices_es: ['Sino-coreano (일, 이, 삼)', 'Coreano nativo (하나, 둘, 셋)', 'Cualquiera sirve', 'Ninguno — usa números en inglés']
    },
    12: {
      title_es: 'Números Sino-coreanos',
      body_es: 'Los números sino-coreanos provienen del chino (한자, hanja). Se usan para dinero, minutos, fechas, números de teléfono, pisos de edificios y grandes cantidades.',
      rules_es: [
        '일(1), 이(2), 삼(3), 사(4), 오(5), 육(6), 칠(7), 팔(8), 구(9), 십(10)',
        '백 (100), 천 (1.000), 만 (10.000)',
        'Precio: 오천 원 (5.000 won), 이만 원 (20.000 won)'
      ]
    },
    13: { meaning_es: 'Uno (sino-coreano) — fechas, números de teléfono, dinero' },
    14: { meaning_es: 'Cinco (sino-coreano) — 오 분 = cinco minutos' },
    15: { meaning_es: 'Diez (sino-coreano) — 십 분 = diez minutos' },
    16: { meaning_es: 'Cien (sino-coreano) — 백 원 = 100 won' },
    17: { meaning_es: 'Mil (sino-coreano) — 천 원 = 1.000 won' },
    18: { meaning_es: 'Diez mil (sino-coreano) — unidad clave en los precios coreanos' },
    19: {
      title_es: 'Contadores Coreanos',
      body_es: 'Los números coreanos deben combinarse con contadores (단위명사) — palabras especiales que indican qué tipo de cosa se está contando. El contador va después del número.',
      rules_es: [
        '개 (gae) — objetos generales: 사과 두 개 (dos manzanas)',
        '명 (myeong) — personas (formal): 학생 세 명 (tres estudiantes)',
        '살 (sal) — edad: 스물다섯 살 (25 años)',
        '권 (gwon) — libros: 책 한 권 (un libro)',
        '잔 (jan) — tazas/vasos: 커피 한 잔 (una taza de café)',
        '번 (beon) — número de orden/veces: 두 번 (dos veces)'
      ]
    },
    20: { meaning_es: 'Contador para objetos generales — 사탕 세 개 (tres caramelos)' },
    21: { meaning_es: 'Contador para personas (formal) — 친구 두 명 (dos amigos)' },
    22: { meaning_es: 'Contador para veces/orden — 한 번 더 (una vez más)' },
    23: {
      prompt_es: '¿Qué contador usas para los libros (책)?',
      choices_es: ['개 (objetos)', '명 (personas)', '권 (libros)', '잔 (vasos)']
    },
    24: {
      title_es: '¡Números Completados!',
      message_es: 'Has dominado los dos sistemas numéricos coreanos y los contadores clave. Los números abren una gran parte de la vida cotidiana — decir la hora, comprar, dar tu edad y mucho más.'
    }
  }
);

// ─── vocabulary-days-time.json ───
patch('vocabulary-days-time.json',
  { 1: { name_es: 'Días y Hora' } },
  {
    1: {
      title_es: 'Días y Hora en Coreano',
      body_es: 'Los días de la semana coreanos provienen del sistema chino de cinco elementos más el sol y la luna. Las horas usan números nativos coreanos (하나~열), mientras que los minutos usan números sino-coreanos (일~오십구). Domina esta división y podrás decir cualquier hora en coreano.',
      rules_es: [
        'Días: 월(lun), 화(mar), 수(mié), 목(jue), 금(vie), 토(sáb), 일(dom) + 요일',
        'Horas: usa números coreanos nativos → 한 시 (la 1 en punto), 두 시 (las 2 en punto)',
        'Minutos: usa números sino-coreanos → 오 분 (5 min), 삼십 분 (30 min)',
        'AM/PM: 오전 (mañana/AM), 오후 (tarde/PM)'
      ],
      tip_es: { label: 'Truco de memoria para los días', text: '월 = Luna (月), 화 = Fuego (火), 수 = Agua (水), 목 = Madera (木), 금 = Oro (金), 토 = Tierra (土), 일 = Sol (日) — ¡igual que los días en japonés!' }
    },
    2:  { meaning_es: 'Lunes — 월 (Luna/Mes)' },
    3:  { meaning_es: 'Martes — 화 (Fuego)' },
    4:  { meaning_es: 'Miércoles — 수 (Agua)' },
    5:  { meaning_es: 'Jueves — 목 (Madera/Árbol)' },
    6:  { meaning_es: 'Viernes — 금 (Oro/Metal)' },
    7:  { meaning_es: 'Sábado — 토 (Tierra)' },
    8:  { meaning_es: 'Domingo — 일 (Sol)' },
    9: {
      prompt_es: '수요일 significa...',
      choices_es: ['Lunes', 'Miércoles', 'Viernes', 'Domingo']
    },
    10: {
      title_es: 'Cómo Decir la Hora en Coreano',
      body_es: 'Para decir la hora: di AM/PM + hora (número nativo + 시) + minutos (número sino-coreano + 분). Ejemplo: 오전 두 시 삼십 분 = 2:30 AM. 오후 다섯 시 = 5:00 PM.'
    },
    11: { meaning_es: 'En punto / hora — 두 시 = las 2 en punto (usa número nativo coreano)' },
    12: { meaning_es: 'Minuto — 삼십 분 = 30 minutos (usa número sino-coreano)' },
    13: { meaning_es: 'Media hora / mitad — 두 시 반 = las 2 y media' },
    14: { meaning_es: 'AM / por la mañana — 오전 열 시 = las 10:00 AM' },
    15: { meaning_es: 'PM / por la tarde — 오후 세 시 = las 3:00 PM' },
    16: { meaning_es: 'Hoy' },
    17: { meaning_es: 'Mañana' },
    18: { meaning_es: 'Ayer' },
    19: { meaning_es: 'Ahora / en este momento' },
    20: { meaning_es: 'Fin de semana — 주말에 뭐 해요? = ¿Qué harás el fin de semana?' },
    21: {
      prompt_es: '¿Qué sistema numérico usas con 시 (en punto)?',
      choices_es: ['Sino-coreano (일, 이, 삼...)', 'Coreano nativo (하나, 둘, 셋...)', 'Cualquiera sirve', 'Números romanos']
    },
    22: {
      prompt_es: '오후 두 시 반 significa...',
      choices_es: ['2:00 AM', '2:30 AM', '2:00 PM', '2:30 PM']
    },
    23: {
      title_es: '¡Días y Hora Completados!',
      message_es: '¡Excelente! Ahora conoces la semana completa en coreano y puedes decir la hora. ¡La próxima vez que alguien pregunte 지금 몇 시예요? (¿Qué hora es?), podrás responder con confianza!'
    }
  }
);

console.log('\nDone! Batch 5 complete.');
