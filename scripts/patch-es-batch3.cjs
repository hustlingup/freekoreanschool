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

// ─── vocabulary-health.json ───
patch('vocabulary-health.json',
  { 1: { name_es: 'Salud' } },
  {
    1: {
      title_es: 'Salud en Coreano',
      body_es: 'El vocabulario de salud es esencial para cualquier viajero o residente. En Corea, el sistema público de salud es excelente y asequible. Conocer estas palabras te ayudará en clínicas, farmacias y hospitales. La frase clave: 아파요 (Estoy enfermo/a / Duele).',
      tip_es: { label: 'Frases médicas', text: '아파요 = Estoy enfermo/Duele | 여기가 아파요 = Me duele aquí | 의사 선생님 = médico | 처방전 = receta | 보험 = seguro. Las farmacias coreanas (약국) están muy bien surtidas y los farmacéuticos son muy competentes.' }
    },
    2:  { meaning_es: 'Salud — 건강해요 = Estoy sano/a' },
    3:  { meaning_es: 'Estar enfermo/a / doler — en el habla: 아파요' },
    4:  { meaning_es: 'Médico / Doctor — 의사 선생님 = doctor (forma respetuosa)' },
    5:  { meaning_es: 'Enfermero/a' },
    6:  { meaning_es: 'Medicina / medicamento — 약을 먹다 = tomar medicina' },
    7:  { meaning_es: 'Receta médica — necesaria para ciertos medicamentos' },
    8:  { meaning_es: 'Fiebre — 열이 나요 = Tengo fiebre' },
    9:  { meaning_es: 'Tos — 기침이 나요 = Estoy tosiendo' },
    10: { meaning_es: 'Dolor de cabeza — 두통이 있어요 = Tengo dolor de cabeza' },
    11: { meaning_es: 'Indigestión — queja muy común' },
    12: { meaning_es: 'Alergia — del alemán Allergie' },
    13: { meaning_es: 'Seguro — 건강 보험 = seguro de salud' },
    14: { meaning_es: 'Cirugía / operación' },
    15: { meaning_es: 'Examen médico / consulta' },
    16: { meaning_es: 'Sala de urgencias — 응급 = emergencia' },
    17: { prompt_es: '아파요 significa...' },
    18: {
      prompt_es: '¿Adónde vas en una emergencia médica en Corea?',
      choices_es: ['약국 (farmacia)', '카페 (café)', '응급실 (urgencias)', '편의점 (tienda 24h)']
    },
    19: { prompt_es: '열이 나요 significa...' },
    20: {
      prompt_es: '¿Qué es la 처방전?',
      choices_es: ['Farmacia', 'Médico', 'Receta médica', 'Seguro']
    },
    21: {
      title_es: '¡Salud Completada!',
      message_es: '건강하세요! Has dominado el vocabulario de salud en coreano. Ya sea en una clínica, farmacia o en una emergencia, ahora tienes las herramientas lingüísticas para obtener ayuda en Corea. 건강이 최고예요 — ¡La salud es lo más importante!'
    }
  }
);

// ─── vocabulary-travel.json ───
patch('vocabulary-travel.json',
  { 1: { name_es: 'Viajes' } },
  {
    1: {
      title_es: 'Coreano para Viajeros',
      body_es: 'Ya sea que estés navegando por el metro de Seúl, haciendo el check-in en un hotel o pidiendo indicaciones, estas palabras de viaje te llevarán por un viaje a Corea. Corea es un país increíblemente amigable para los visitantes — un poco de coreano llega muy lejos.',
      tip_es: { label: 'Frase de viaje más útil', text: '어디예요? (¿Dónde está?) + cualquier nombre de lugar es tu frase de viaje más usada. Añade 가주세요 (llévame allí, por favor) en un taxi para navegar al instante.' }
    },
    2:  { meaning_es: 'Viaje / viajero' },
    3:  { meaning_es: 'Avión — 비행 (vuelo) + 기 (máquina)' },
    4:  { meaning_es: 'Hotel' },
    5:  { meaning_es: 'Pasaporte — 여 (viaje) + 권 (documento)' },
    6:  { meaning_es: 'Equipaje / maleta' },
    7:  { meaning_es: 'Reserva / reservación — 예약했어요 = Tengo una reserva' },
    8:  { meaning_es: 'Entrada / inmigración — 입국 심사 = control de inmigración' },
    9:  { meaning_es: 'Cambio de divisas — 환전 어디서 해요? = ¿Dónde puedo cambiar dinero?' },
    10: { meaning_es: 'Turismo / visita turística' },
    11: { meaning_es: 'Mapa' },
    12: { meaning_es: 'Camino / ruta / calle — 길을 잃었어요 = Me perdí' },
    13: { meaning_es: 'Derecha / lado derecho' },
    14: { meaning_es: 'Izquierda / lado izquierdo' },
    15: { meaning_es: 'Seguir recto / todo recto' },
    16: { meaning_es: 'Atracción turística / lugar de interés' },
    17: {
      prompt_es: '여권 significa...',
      choices_es: ['Equipaje', 'Pasaporte', 'Mapa', 'Reserva']
    },
    18: { prompt_es: 'Estás perdido/a. ¿Qué frase dices?' },
    19: {
      prompt_es: '오른쪽 significa...',
      choices_es: ['Izquierda', 'Recto', 'Derecha', 'Atrás']
    },
    20: {
      title_es: '¡Viajes Completados!',
      message_es: '¡Prepara la maleta! Con estas palabras de viaje, estás listo/a para explorar Corea. Recuerda: sonríe, usa lo que sabes, y los coreanos darán más de la mitad del camino por ti.'
    }
  }
);

// ─── vocabulary-weather.json ───
patch('vocabulary-weather.json',
  { 1: { name_es: 'El Tiempo' } },
  {
    1: {
      title_es: 'El Tiempo en Corea',
      body_es: 'Corea tiene cuatro estaciones bien definidas: un invierno frío y seco, una primavera cálida y ventosa, un verano caluroso y húmedo con monzón, y un otoño fresco y colorido. El tiempo es uno de los temas de conversación más frecuentes en la cultura coreana.',
      tip_es: { label: 'Patrón de adjetivo útil', text: 'La mayoría de las palabras del tiempo usan -아요/-어요 para describir cómo está el tiempo ahora. Ej: 추워요 (hace frío), 더워요 (hace calor). En el habla, omite la forma -다.' }
    },
    2:  { meaning_es: 'Tiempo / clima — 날씨 어때요? = ¿Qué tiempo hace?' },
    3:  { meaning_es: 'Despejado / soleado — 날씨가 맑아요 = el tiempo está despejado' },
    4:  { meaning_es: 'Nublado / cubierto' },
    5:  { meaning_es: 'Lluvia — 비가 와요 = está lloviendo' },
    6:  { meaning_es: 'Nieve — 눈이 와요 = está nevando' },
    7:  { meaning_es: 'Viento — 바람이 불어요 = el viento está soplando' },
    8:  { meaning_es: 'Hace calor — 너무 더워요 = hace demasiado calor' },
    9:  { meaning_es: 'Hace frío — 많이 추워요 = hace mucho frío' },
    10: { meaning_es: 'Está templado / cálido — temperatura agradable y cómoda' },
    11: { meaning_es: 'Está fresco / refrescante — fresco y agradable, como el aire de otoño' },
    12: { meaning_es: 'Primavera — famosa por los cerezos en flor (벚꽃)' },
    13: { meaning_es: 'Verano — caluroso y húmedo con la temporada de monzón (장마)' },
    14: { meaning_es: 'Otoño — tiempo fresco; espectacular follaje en los templos' },
    15: { meaning_es: 'Invierno — frío y seco; las estaciones de esquí son populares' },
    16: { meaning_es: 'Temperatura — 온도가 몇 도예요? = ¿Cuántos grados hace?' },
    17: {
      prompt_es: '추워요 significa...',
      choices_es: ['Hace calor', 'Hace viento', 'Hace frío', 'Está lloviendo']
    },
    18: {
      prompt_es: '¿Qué estación coreana es famosa por los cerezos en flor?',
      choices_es: ['여름 (verano)', '봄 (primavera)', '가을 (otoño)', '겨울 (invierno)']
    },
    19: {
      prompt_es: '비가 와요 significa...',
      choices_es: ['El viento está soplando', 'Está nevando', 'Está lloviendo', 'Está soleado']
    },
    20: {
      title_es: '¡El Tiempo Completado!',
      message_es: '날씨 이야기 할 수 있어요! (¡Puedes hablar del tiempo!) El tiempo es un gran tema para romper el hielo con amigos coreanos. Pregunta 오늘 날씨 어때요? y observa cómo fluye la conversación.'
    }
  }
);

console.log('\nDone! Batch 3 complete.');
