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

// ─── vocabulary-food-drink.json ───
patch('vocabulary-food-drink.json',
  { 1: { name_es: 'Comida y Bebida' } },
  {
    1: {
      title_es: 'Comida y Bebida Coreana',
      body_es: 'La cocina coreana se basa en el arroz, las verduras fermentadas y los platos compartidos. El vocabulario de comida es indispensable en restaurantes, mercados y al pedir a domicilio — una parte profundamente arraigada de la vida cotidiana coreana.',
      tip_es: { label: '맛있어요 (mashisseoyo)', text: 'La frase de comida más importante: 맛있어요 = ¡Está delicioso! Úsala libremente y seguido — los anfitriones coreanos adoran escucharla.' }
    },
    2:  { meaning_es: 'Arroz / comida — 밥 먹었어요? = ¿Has comido? (saludo común)' },
    3:  { meaning_es: 'Agua — 물 주세요 = Por favor, dame agua' },
    4:  { meaning_es: 'Kimchi — col fermentada picante; un alimento básico que se sirve en cada comida' },
    5:  { meaning_es: 'Bibimbap — bol de arroz mezclado con verduras, carne y huevo' },
    6:  { meaning_es: 'Bulgogi — carne de res marinada y asada; literalmente "carne de fuego"' },
    7:  { meaning_es: 'Fideos instantáneos coreanos — más picantes que el ramen japonés' },
    8:  { meaning_es: 'Panceta de cerdo a la parrilla — el protagonista del K-BBQ' },
    9:  { meaning_es: 'Estofado de pasta de soja fermentada — el plato coreano más reconfortante' },
    10: { meaning_es: 'Café — Corea tiene una de las densidades de cafeterías más altas del mundo' },
    11: { meaning_es: 'Té verde — famoso en la región de Boseong' },
    12: { meaning_es: 'Soju — el licor destilado de arroz icónico de Corea; el más vendido del mundo' },
    13: { meaning_es: 'Pollo frito coreano — frito dos veces para mayor crujiente, a menudo comido con cerveza' },
    14: { meaning_es: 'Pasteles de arroz picantes — el street food coreano más popular' },
    15: { meaning_es: 'Estofado de tofu suave — caldo picante y sedoso con huevo y mariscos' },
    16: { meaning_es: 'Fruta — la fruta coreana es famosa por su alta calidad y precio elevado' },
    17: { meaning_es: 'Verduras — 야채 (yaechae) también se usa con frecuencia' },
    18: { meaning_es: 'Picante / Caliente (de comida) — 너무 매워요! = ¡Demasiado picante!' },
    19: {
      prompt_es: '떡볶이 se describe mejor como...',
      choices_es: ['Panceta de cerdo a la parrilla', 'Pasteles de arroz picantes', 'Estofado de soja fermentada', 'Bol de arroz mezclado']
    },
    20: {
      prompt_es: '¿Qué significa 물 주세요?',
      choices_es: ['Estoy lleno/a', 'La comida está picante', 'Por favor, dame agua', 'Está delicioso']
    },
    21: {
      prompt_es: '불고기 literalmente significa...',
      choices_es: ['Carne hervida', 'Carne de fuego', 'Fideos fríos', 'Pollo dulce']
    },
    22: {
      title_es: '¡Comida y Bebida Completadas!',
      message_es: '맛있겠다! (¡Suena delicioso!) Has aprendido el vocabulario de los alimentos más icónicos de Corea. La próxima vez que comas comida coreana, intenta nombrar cada plato — ¡sorprenderás a tus amigos coreanos!'
    }
  }
);

// ─── vocabulary-body-parts.json ───
patch('vocabulary-body-parts.json',
  { 1: { name_es: 'Partes del Cuerpo' } },
  {
    1: {
      title_es: 'Partes del Cuerpo en Coreano',
      body_es: 'Conocer el vocabulario de partes del cuerpo es esencial para visitas al médico, describir síntomas y la conversación diaria. Los nombres coreanos son en su mayoría palabras nativas, aunque la terminología médica suele usar el coreano sino-coreano.',
      tip_es: { label: 'Útil en la clínica', text: 'Si sientes dolor, di: [parte del cuerpo] 아파요 (duele). Ej: 머리 아파요 = Me duele la cabeza. 배 아파요 = Me duele el estómago.' }
    },
    2:  { meaning_es: 'Cabeza / cabello — 머리카락 es específicamente "hebra de cabello"' },
    3:  { meaning_es: 'Cara' },
    4:  { meaning_es: 'Ojo / nieve — ¡la misma palabra! El contexto determina el significado' },
    5:  { meaning_es: 'Nariz' },
    6:  { meaning_es: 'Boca' },
    7:  { meaning_es: 'Oreja' },
    8:  { meaning_es: 'Cuello / garganta — 목이 아파요 = dolor de garganta' },
    9:  { meaning_es: 'Hombro' },
    10: { meaning_es: 'Brazo' },
    11: { meaning_es: 'Mano' },
    12: { meaning_es: 'Dedo — literalmente "rama de la mano"' },
    13: { meaning_es: 'Estómago / barriga / barco / pera — muy polisémico' },
    14: { meaning_es: 'Espalda (del cuerpo)' },
    15: { meaning_es: 'Pierna / puente — 다리 아파요 = me duele la pierna' },
    16: { meaning_es: 'Pie' },
    17: { meaning_es: 'Corazón (el órgano) — 마음 es el "corazón" de las emociones' },
    18: { meaning_es: 'Diente — 치아 es el término más formal/médico' },
    19: { prompt_es: '¿Qué palabra significa "pierna" Y "puente" en coreano?' },
    20: {
      prompt_es: '머리 아파요 significa...',
      choices_es: ['Me duele el estómago', 'Me duele la cabeza', 'Me duele la pierna', 'Me duele la garganta']
    },
    21: {
      prompt_es: '눈 puede significar "ojo" y también...',
      choices_es: ['Lluvia', 'Nieve', 'Viento', 'Nube']
    },
    22: {
      title_es: '¡Partes del Cuerpo Completadas!',
      message_es: '¡Buen trabajo! Ahora puedes señalar partes del cuerpo y describir dolores en coreano. Recuerda: [parte del cuerpo] + 아파요 es tu atajo para cualquier visita al médico.'
    }
  }
);

// ─── vocabulary-places.json ───
patch('vocabulary-places.json',
  { 1: { name_es: 'Lugares' } },
  {
    1: {
      title_es: 'Lugares en Coreano',
      body_es: 'Conocer nombres de lugares te permite moverte por ciudades, pedir indicaciones y decirle a la gente adónde vas. Estas palabras también son bloques de construcción clave en las oraciones coreanas — muchos verbos se construyen alrededor de ubicaciones.',
      tip_es: { label: 'Preguntar dónde está algo', text: '[Lugar] 어디예요? = ¿Dónde está [el lugar]? Ej: 화장실 어디예요? = ¿Dónde está el baño? Patrón simple, enorme utilidad diaria.' }
    },
    2:  { meaning_es: 'Escuela / colegio' },
    3:  { meaning_es: 'Hospital / clínica' },
    4:  { meaning_es: 'Farmacia — 약 (medicina) + 국 (lugar)' },
    5:  { meaning_es: 'Banco — 은 (plata) + 행 (fluir) = donde fluye la plata' },
    6:  { meaning_es: 'Supermercado — del inglés "mart"' },
    7:  { meaning_es: 'Tienda de conveniencia — abierta 24/7 y en todas partes de Corea' },
    8:  { meaning_es: 'Metro / subterráneo — 지하 (subterráneo) + 철 (hierro/vía)' },
    9:  { meaning_es: 'Autobús — del inglés "bus"' },
    10: { meaning_es: 'Taxi — del inglés "taxi"' },
    11: { meaning_es: 'Aeropuerto — 공 (público) + 항 (puerto)' },
    12: { meaning_es: 'Estación de tren — 기차 (tren) + 역 (estación)' },
    13: { meaning_es: 'Restaurante — 식 (comer/comida) + 당 (sala/lugar)' },
    14: { meaning_es: 'Café — Corea tiene una cultura de cafeterías sin igual' },
    15: { meaning_es: 'Hotel' },
    16: { meaning_es: 'Baño / aseo — literalmente "sala de maquillaje"' },
    17: { meaning_es: 'Parque — los parques coreanos están bien mantenidos y son muy populares' },
    18: {
      prompt_es: '화장실 어디예요? significa...',
      choices_es: ['¿Dónde está el banco?', '¿Dónde está el metro?', '¿Dónde está el baño?', '¿Dónde está la cafetería?']
    },
    19: {
      prompt_es: '지하철 literalmente significa...',
      choices_es: ['Tren aéreo', 'Hierro subterráneo (metro)', 'Autobús público', 'Tren de alta velocidad']
    },
    20: { prompt_es: '¿Qué lugar está abierto 24 horas y es famoso por estar en todas partes de Corea?' },
    21: {
      title_es: '¡Lugares Completados!',
      message_es: 'Ahora puedes moverte por las ciudades coreanas con confianza. Recuerda: [Lugar] + 어디예요? es tu pregunta estrella para cualquier desafío de navegación en Corea.'
    }
  }
);

console.log('\nDone! Batch 2 complete.');
