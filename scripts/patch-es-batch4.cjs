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

// ─── vocabulary-workplace.json ───
patch('vocabulary-workplace.json',
  { 1: { name_es: 'Lugar de Trabajo' } },
  {
    1: {
      title_es: 'Coreano en el Trabajo',
      body_es: 'La cultura laboral coreana (직장 문화) es notablemente jerárquica — los títulos, la antigüedad y el lenguaje formal importan enormemente. Conocer las palabras correctas para reuniones, presentaciones y entornos empresariales marcará la diferencia. Muchos términos profesionales coreanos son de origen sino-coreano (한자어).',
      tip_es: { label: 'Jerarquía laboral', text: '사장님 (director general) → 부장님 (jefe de departamento) → 과장님 (jefe de sección) → 대리님 (subdirector) → 사원 (empleado). Usar -님 (nim) después del título muestra respeto y es esencial. Nunca llames a un superior solo por su nombre.' }
    },
    2:  { meaning_es: 'Lugar de trabajo / empleo' },
    3:  { meaning_es: 'Empresa / compañía' },
    4:  { meaning_es: 'Director general / presidente — -님 es un sufijo de respeto' },
    5:  { meaning_es: 'Jefe de departamento / gerente general' },
    6:  { meaning_es: 'Colega / compañero de trabajo' },
    7:  { meaning_es: 'Reunión — 회의가 있어요 = Tengo una reunión' },
    8:  { meaning_es: 'Informe / reporte — 보고서를 쓰다 = escribir un informe' },
    9:  { meaning_es: 'Correo electrónico — del inglés "email"' },
    10: { meaning_es: 'Fecha límite / plazo — 마감이 언제예요? = ¿Cuándo es el plazo?' },
    11: { meaning_es: 'Sueldo mensual — 월 (mes) + 급 (pago)' },
    12: { meaning_es: 'Horas extra / trabajar hasta tarde — una parte conocida de la cultura laboral coreana' },
    13: { meaning_es: 'Vacaciones / permiso — 휴가를 내다 = tomarse un día libre' },
    14: { meaning_es: 'Tarjeta de visita — se intercambia en los primeros encuentros con ambas manos' },
    15: { meaning_es: 'Conseguir trabajo / empleo — 취직했어요 = Conseguí trabajo' },
    16: { meaning_es: 'Presentación / anuncio' },
    17: {
      prompt_es: '¿Qué título se refiere al director general de una empresa?',
      choices_es: ['동료 (colega)', '사장님 (director)', '사원 (empleado)', '과장님 (jefe de sección)']
    },
    18: {
      prompt_es: '마감 significa...',
      choices_es: ['Sueldo mensual', 'Tarjeta de visita', 'Fecha límite', 'Horas extra']
    },
    19: {
      prompt_es: '야근 significa trabajar hasta tarde. La forma educada de rechazarlo es...',
      choices_es: ['Hoy estoy ocupado', 'Estoy de vacaciones', 'Tengo un compromiso previo', 'Me voy a casa']
    },
    20: {
      title_es: '¡Trabajo Completado!',
      message_es: '수고하셨습니다! (¡Buen trabajo!) Has aprendido coreano para el lugar de trabajo — vocabulario esencial para entender la cultura profesional coreana. Incluso si trabajas con colegas coreanos de forma remota, estas palabras y títulos mostrarán una increíble conciencia cultural.'
    }
  }
);

// ─── vocabulary-shopping.json ───
patch('vocabulary-shopping.json',
  { 1: { name_es: 'Compras' } },
  {
    1: {
      title_es: 'Compras en Corea',
      body_es: 'Corea es un paraíso de las compras — desde enormes mercados tradicionales hasta centros comerciales de vanguardia. Ya sea que busques cuidado de la piel, moda o electrónica, estas palabras te acompañarán en cada interacción de compra.',
      tip_es: { label: 'Frases clave de compras', text: '얼마예요? (¿Cuánto cuesta?) — la pregunta de compra más útil. 깎아 주세요 (¡Por favor, hágame descuento!) — ¡funciona en los mercados tradicionales!' }
    },
    2:  { meaning_es: 'Compras — del inglés "shopping"' },
    3:  { meaning_es: 'Precio — 가격이 얼마예요? = ¿Cuánto cuesta?' },
    4:  { meaning_es: 'Descuento — 할인 있어요? = ¿Hay descuento?' },
    5:  { meaning_es: 'Recibo / comprobante' },
    6:  { meaning_es: 'Tarjeta — crédito/débito; Corea es muy amigable con las tarjetas' },
    7:  { meaning_es: 'Efectivo — 현금으로 낼게요 = Pagaré en efectivo' },
    8:  { meaning_es: 'Devolución / reembolso — 환불 돼요? = ¿Puedo hacer una devolución?' },
    9:  { meaning_es: 'Cambio (de productos) — 교환 돼요? = ¿Puedo cambiarlo?' },
    10: { meaning_es: 'Talla / tamaño — del inglés "size"' },
    11: { meaning_es: 'Mercado tradicional — Namdaemun y Dongdaemun son ejemplos famosos' },
    12: { meaning_es: 'Grandes almacenes / tienda por departamentos — literalmente "tienda de cien productos"' },
    13: { meaning_es: 'Tienda libre de impuestos — muy común en aeropuertos y zonas turísticas de Corea' },
    14: { meaning_es: 'Artículo / producto / cosa' },
    15: { meaning_es: 'Embalaje / envoltorio de regalo — 포장해 주세요 = Por favor, envuélvalo para regalo' },
    16: { meaning_es: 'Oferta / venta — del inglés "sale"; también 할인 행사' },
    17: {
      prompt_es: '얼마예요? significa...',
      choices_es: ['¿Hay descuento?', '¿Cuánto cuesta?', '¿Puedo hacer una devolución?', '¿Dónde está el baño?']
    },
    18: {
      prompt_es: '백화점 literalmente significa...',
      choices_es: ['Tienda grande', 'Tienda de cien productos', 'Mercado', 'Centro de moda']
    },
    19: { prompt_es: 'Quieres una devolución. ¿Qué dices?' },
    20: { prompt_es: '¿Cuál de estos es un mercado tradicional coreano?' },
    21: {
      title_es: '¡Compras Completadas!',
      message_es: '쇼핑 실력이 늘었어요! (¡Tu habilidad para las compras ha mejorado!) Ahora estás listo/a para cualquier aventura de compras coreana — desde el bullicioso Mercado Namdaemun hasta el lujoso Lotte World Mall.'
    }
  }
);

// ─── vocabulary-adjectives.json ───
patch('vocabulary-adjectives.json',
  { 1: { name_es: 'Adjetivos' } },
  {
    1: {
      title_es: 'Adjetivos en Coreano',
      body_es: 'Los adjetivos coreanos (형용사) se comportan de manera diferente a los del español — se conjugan como verbos. La forma de diccionario termina en -다. Como predicados, cambia -다 por -아요/어요. Para modificar un sustantivo, cambia -다 por -(으)ㄴ. Ejemplo: 크다 (grande) → 커요 (es grande) / 큰 집 (casa grande).',
      tip_es: { label: 'Patrón de adjetivo', text: 'Forma de diccionario: 크다 (grande). Predicado: 커요 (es grande). Modificador de sustantivo: 큰 집 (casa grande). Este patrón se aplica a casi todos los adjetivos coreanos — dominar el patrón duplica el uso de cada adjetivo que aprendes.' }
    },
    2:  { meaning_es: 'Grande — 커요 en el habla' },
    3:  { meaning_es: 'Pequeño — 작아요 en el habla' },
    4:  { meaning_es: 'Largo — 길어요 en el habla' },
    5:  { meaning_es: 'Corto — 짧아요 en el habla' },
    6:  { meaning_es: 'Bonito / hermoso — 예뻐요 en el habla' },
    7:  { meaning_es: 'Guapo — literalmente "nació bien"' },
    8:  { meaning_es: 'Caro — 비싸요 en el habla' },
    9:  { meaning_es: 'Barato — 싸요 en el habla; también significa "empacar" en otros contextos' },
    10: { meaning_es: 'Nuevo — 새로워요 en el habla' },
    11: { meaning_es: 'Interesante / divertido — 재미있어요 en el habla; 재미없다 = aburrido' },
    12: { meaning_es: 'Fácil — 쉬워요 en el habla; 어렵다 = difícil' },
    13: { meaning_es: 'Rápido — 빨라요 en el habla; 느리다 = lento' },
    14: { meaning_es: 'Bueno — 좋아요 en el habla; también significa "me gusta"' },
    15: { meaning_es: 'Delicioso — 맛있어요 en el habla; literalmente "tiene sabor"' },
    16: { meaning_es: 'Mucho / muchos — 많아요 en el habla' },
    17: { prompt_es: '비싸다 significa caro. Su opuesto es...' },
    18: { prompt_es: '재미없다 significa...' },
    19: {
      prompt_es: '¿Qué adjetivo significa "bonito/hermoso"?',
      choices_es: ['Bonito/a', 'Guapo/a', 'Grande', 'Rápido/a']
    },
    20: {
      prompt_es: '좋아요 puede significar "Es bueno" y también...',
      choices_es: ['Me gusta', 'Lo quiero', 'Lo sé', 'Lo veo']
    },
    21: {
      title_es: '¡Adjetivos Completados!',
      message_es: '대단해요! Has aprendido los adjetivos coreanos y el patrón para usarlos en oraciones y como modificadores de sustantivos. ¡Estas palabras añadirán color y precisión a todo lo que digas en coreano!'
    }
  }
);

console.log('\nDone! Batch 4 complete.');
