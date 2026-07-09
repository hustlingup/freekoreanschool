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

// ─── shopping.json ───
patch('shopping.json',
  {
    1: { name_es: 'Vocabulario de Compras' },
    2: { name_es: 'En la Tienda' },
    3: { name_es: 'Precios y Números' },
    4: { name_es: 'Transacciones' }
  },
  {
    1: {
      title_es: 'De Compras en Corea (쇼핑)',
      body_es: 'Corea tiene una rica cultura de compras — desde los mercados tradicionales al aire libre (시장) hasta los grandes almacenes de lujo (백화점) y las tiendas de conveniencia abiertas 24 horas (편의점) en cada esquina. El regateo es normal en los mercados tradicionales pero no en las cadenas o centros comerciales. Aprender a preguntar precios, comparar artículos y completar transacciones en coreano hará que tu experiencia de compras sea mucho más fluida y personal. La pregunta clave que usarás constantemente es 얼마예요? (¿Cuánto cuesta?)',
      tip_es: { label: 'Mercado Gwangjang vs grandes almacenes', text: 'En mercados tradicionales como 광장시장 (Mercado Gwangjang) en Seúl, puedes regatear — especialmente si compras varios artículos. En 롯데백화점 (Lotte Department Store) o cualquier cadena, los precios son fijos. Busca señales de 세일 (rebajas) y promociones de 할인 (descuento).' }
    },
    2:  { meaning_es: 'tienda / comercio' },
    3:  { meaning_es: 'mercado (mercado tradicional al aire libre)' },
    4:  { meaning_es: 'grandes almacenes / tienda por departamentos' },
    5:  { meaning_es: 'tienda de conveniencia' },
    6: {
      prompt_es: '¿Qué palabra significa "mercado" (mercado tradicional al aire libre)?',
      choices_es: ['가게', '백화점', '시장', '편의점']
    },
    7: {
      title_es: 'Palabras de Artículos de Compra (쇼핑 물건)',
      body_es: 'El coreano usa muchos préstamos lingüísticos para productos modernos — 핸드폰 (móvil), 노트북 (portátil), 티셔츠 (camiseta). Las palabras nativas coreanas y sino-coreanas cubren los artículos tradicionales: 옷 (ropa), 신발 (zapatos), 가방 (bolso). Al comprar, a menudo señalarás algo y dirás 이거 (este) — una estrategia simple y eficaz. Las tallas suelen darse en talla única (프리 사이즈), pequeña (S), mediana (M) y grande (L/XL).',
      tip_es: { label: '이거 주세요 — tu salvavidas de compras', text: '이거 주세요 (Por favor dame esto) + 얼마예요? (¿Cuánto cuesta?) te sacarán de la mayoría de situaciones de compra coreanas incluso si sabes poco más. Señala y di estas dos frases, y ya estás.' }
    },
    8:  { meaning_es: 'ropa / atuendo' },
    9:  { meaning_es: 'zapatos / calzado' },
    10: {
      title_es: 'Frases Clave de Compras (쇼핑 표현)',
      body_es: 'Unas pocas frases esenciales cubren casi toda interacción de compras. 얼마예요? (¿Cuánto cuesta?) sirve para cualquier consulta de precio. 이거 주세요 (Por favor dame esto) completa una compra. 더 싸게 해 주세요 (Por favor ponlo más barato) se usa para regatear en los mercados tradicionales. 있어요? (¿Tienes...?) + el nombre del artículo pregunta si algo está disponible. 없어요 significa que está agotado o no disponible.',
      tip_es: { label: 'Tono educado de compras', text: 'En las tiendas coreanas, el personal suele saludarte con ¡어서 오세요! (¡Bienvenido/a!). Responde con un gesto de cabeza o 안녕하세요. Cuando termines de comprar, 감사합니다 (gracias) siempre es apreciado. Gritar a través de la tienda es poco común — acércate antes de hablar.' }
    },
    11: { meaning_es: '¿Cuánto cuesta?' },
    12: { meaning_es: 'Por favor dame esto / Me llevo esto' },
    13: { meaning_es: 'Por favor ponlo más barato / ¿Me puede hacer descuento?' },
    14: {
      prompt_es: '¿Cómo preguntas "¿Cuánto cuesta?" en coreano?',
      choices_es: ['이거 주세요', '얼마예요?', '감사합니다', '있어요?']
    },
    15: {
      title_es: 'Preguntar sobre Disponibilidad (있어요? / 없어요)',
      body_es: '있어요? (¿Hay? / ¿Tienes?) y 없어요 (No hay / No tenemos) son dos de las palabras más útiles al comprar en coreano. Coloca un artículo antes de 있어요?: 이거 있어요? (¿Tienes esto?), 더 큰 사이즈 있어요? (¿Tienes una talla más grande?). 없어요 es la respuesta si está agotado. También puedes decir 다 팔렸어요 (Todo vendido) con más detalle.',
      tip_es: { label: '있다 vs 없다', text: '있다 = existir / tener. 없다 = no existir / no tener. 있어요? solo al final de una frase = ¿Tienes...? 없어요. = No tenemos. Estas dos palabras aparecen en casi todas las frases coreanas que tratan de posesión, ubicación o disponibilidad.' }
    },
    16: { meaning_es: 'Hay / Tengo / Tenemos (educado)' },
    17: { meaning_es: 'No hay / No tenemos / Agotado' },
    18: {
      prompt_es: '없어요 significa...',
      choices_es: ['Lo tenemos', '¿Cuánto cuesta?', 'No hay / No lo tenemos', 'Sí, por favor']
    },
    19: {
      title_es: 'Dinero y Precios Coreanos (원)',
      body_es: 'La moneda coreana es el 원 (won, ₩). Los precios pueden parecer grandes porque 1.000 won ≈ 0,75 USD. Un café puede costar 4.500원, una comida 8.000~12.000원. 비싸다 (caro) y 싸다 (barato) son las palabras clave de opinión. Cuando recibes cambio, la cantidad devuelta es 거스름돈. Los precios en los mercados tradicionales a menudo son negociables — 깎아 주세요 (Por favor hazme un descuento) o 더 싸게요? (¿Puede ser más barato?) abre la negociación.',
      tip_es: { label: 'Leer precios coreanos', text: 'El coreano usa números sino-coreanos para los precios: 일(1) 이(2) 삼(3) 사(4) 오(5). 만 = 10.000. Así que 삼만 오천 원 = 35.000 won. Los cajeros suelen mostrarte el importe en una calculadora o pantalla para evitar confusiones — señalar con el dedo funciona perfectamente.' }
    },
    20: { meaning_es: 'won — moneda coreana (₩)' },
    21: { meaning_es: 'ser caro' },
    22: { meaning_es: 'ser barato / económico' },
    23: { meaning_es: 'descuento / rebaja' },
    24: {
      prompt_es: '비싸다 significa...',
      choices_es: ['ser barato', 'ser gratis', 'ser caro', 'estar en oferta']
    },
    25: { meaning_es: 'cambio (dinero devuelto al pagar)' },
    26: {
      prompt_es: '¿Qué palabra significa "cambio" (dinero devuelto al pagar)?',
      choices_es: ['거스름돈', '비싸다', '할인', '원']
    },
    27: {
      title_es: 'Métodos de Pago (결제 방법)',
      body_es: 'Corea es una sociedad muy sin efectivo — la mayoría de los lugares aceptan tarjetas de crédito (신용카드) o débito (체크카드), y el pago móvil mediante aplicaciones como KakaoPay y Samsung Pay es muy común. El efectivo (현금) se acepta en todas partes pero se usa menos. Al pagar, pueden preguntarte 카드요, 현금이요? (¿Tarjeta o efectivo?). Pedir un recibo es 영수증 주세요. Los carteles Tax Refund en las tiendas significan que como turista puedes reclamar el IVA en el aeropuerto.',
      tip_es: { label: '카카오페이 & 삼성페이', text: 'KakaoPay (카카오페이) y Samsung Pay (삼성페이) son las aplicaciones de pago móvil dominantes en Corea. Los turistas pueden usar tarjetas de crédito internacionales casi en todas partes. Busca el símbolo de pago sin contacto — la adopción de Corea del pago sin contacto está entre las más altas del mundo.' }
    },
    28: { meaning_es: 'Pagaré con tarjeta' },
    29: { meaning_es: 'Pagaré en efectivo (forma humilde)' },
    30: { meaning_es: 'Por favor dame un recibo' },
    31: {
      prompt_es: '¿Cómo dices "Pagaré con tarjeta"?',
      choices_es: ['현금으로 드릴게요', '카드로 할게요', '거스름돈 주세요', '결제해 주세요']
    },
    32: { meaning_es: 'Por favor hazme un descuento / Por favor reduce el precio' },
    33: {
      title_es: '¡Compras Completadas!',
      message_es: '¡Estás listo/a para ir de compras en Corea! Conoces el vocabulario clave, las frases para preguntar precios, regatear, comprobar la disponibilidad y completar las transacciones de pago.'
    }
  }
);

console.log('\nDone! Batch 9 complete.');
