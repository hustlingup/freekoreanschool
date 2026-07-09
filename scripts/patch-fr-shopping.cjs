#!/usr/bin/env node
'use strict';
const fs   = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'learn', 'data', 'shopping.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

// Stage names
const stageNames = {
  1: 'Vocabulaire des Achats',
  2: 'Dans le Magasin',
  3: 'Prix et Chiffres',
  4: 'Transactions',
};
for (const s of data.stages) {
  if (s.name_fr == null) s.name_fr = stageNames[s.id];
}

// Step patches
const patches = {
  1: {
    title_fr: 'Faire du Shopping en Corée (쇼핑)',
    body_fr:  "La Corée a une riche culture du shopping — des marchés traditionnels en plein air (시장) aux grands magasins haut de gamme (백화점), en passant par les épiceries ouvertes 24h/24 (편의점) à chaque coin de rue. Le marchandage est normal dans les marchés traditionnels mais pas dans les chaînes ou les centres commerciaux. Apprendre à demander les prix, comparer les articles et effectuer des transactions en coréen rendra votre expérience d'achat bien plus fluide et personnelle. La question clé que vous utiliserez constamment est 얼마예요 ? (Combien ça coûte ?)",
    tip_fr:   { label: 'Marché Gwangjang vs grand magasin', text: "Dans les marchés traditionnels comme 광장시장 (Marché Gwangjang) à Séoul, vous pouvez marchander — surtout si vous achetez plusieurs articles. Dans les 롯데백화점 (Grands Magasins Lotte) ou n'importe quelle chaîne, les prix sont fixes. Cherchez les panneaux 세일 (soldes) et les promotions 할인 (remise)." },
  },
  2:  { meaning_fr: 'magasin / boutique' },
  3:  { meaning_fr: 'marché (marché traditionnel en plein air)' },
  4:  { meaning_fr: 'grand magasin' },
  5:  { meaning_fr: 'épicerie de proximité' },
  6: {
    prompt_fr:  "Quel mot signifie « marché » (marché traditionnel en plein air) ?",
    choices_fr: ['가게', '백화점', '시장', '편의점'],
  },
  7: {
    title_fr: 'Articles de Shopping (쇼핑 물건)',
    body_fr:  "Le coréen utilise de nombreux mots empruntés pour les produits modernes — 핸드폰 (téléphone portable), 노트북 (ordinateur portable), 티셔츠 (t-shirt). Les mots coréens natifs et sino-coréens couvrent les articles traditionnels : 옷 (vêtements), 신발 (chaussures), 가방 (sac). Lors du shopping, vous pointez souvent quelque chose et dites 이거 (celui-ci) — une stratégie simple et efficace. Les tailles sont souvent indiquées en taille unique (프리 사이즈), petite (S), moyenne (M) et grande (L/XL).",
    tip_fr:   { label: '이거 주세요 — votre bouée de sauvetage', text: "이거 주세요 (Je prends celui-ci, s'il vous plaît) + 얼마예요 ? (Combien ça coûte ?) vous permettront de vous en sortir dans la plupart des situations d'achat coréen, même si vous ne savez pas grand-chose d'autre. Pointez, dites ces deux phrases, et c'est réglé." },
  },
  8:  { meaning_fr: 'vêtements / tenue' },
  9:  { meaning_fr: 'chaussures / chaussant' },
  10: {
    title_fr: 'Phrases Clés du Shopping (쇼핑 표현)',
    body_fr:  "Quelques phrases essentielles couvrent presque toutes les interactions d'achat. 얼마예요 ? (Combien ça coûte ?) fonctionne pour toute demande de prix. 이거 주세요 (Donnez-moi ça, s'il vous plaît) finalise un achat. 더 싸게 해 주세요 (S'il vous plaît, faites-le moins cher) est utilisé pour marchander dans les marchés traditionnels. 있어요 ? (Vous avez... ?) + le nom de l'article demande si quelque chose est disponible. 없어요 signifie qu'il est en rupture de stock ou indisponible.",
    tip_fr:   { label: 'Ton poli en magasin', text: "Dans les magasins coréens, le personnel vous accueillera souvent avec 어서 오세요 ! (Bienvenue !). Répondez avec un signe de tête ou 안녕하세요. Quand vous avez fini de faire vos achats, 감사합니다 (merci) est toujours apprécié. Crier à travers le magasin est rare — approchez-vous avant de parler." },
  },
  11: { meaning_fr: 'Combien ça coûte ?' },
  12: { meaning_fr: "Donnez-moi ça, s'il vous plaît / Je prends ça" },
  13: { meaning_fr: "S'il vous plaît, faites-le moins cher / Vous pouvez me faire un prix ?" },
  14: {
    prompt_fr:  "Comment demande-t-on « Combien ça coûte ? » en coréen ?",
    choices_fr: ['이거 주세요', '얼마예요?', '감사합니다', '있어요?'],
  },
  15: {
    title_fr: 'Demander la Disponibilité (있어요? / 없어요)',
    body_fr:  "있어요 ? (Il y a ? / Vous avez ?) et 없어요 (Il n'y en a pas / Nous n'en avons pas) sont deux des mots les plus utiles pour faire du shopping en coréen. Placez un article avant 있어요 ? : 이거 있어요 ? (Vous avez ça ?), 더 큰 사이즈 있어요 ? (Vous avez une taille plus grande ?). 없어요 est la réponse si c'est épuisé. Vous pouvez aussi dire 다 팔렸어요 (Tout est vendu) pour plus de détails.",
    tip_fr:   { label: '있다 vs 없다', text: "있다 = exister / avoir. 없다 = ne pas exister / ne pas avoir. 있어요 ? seul en fin de phrase = Vous avez... ? 없어요. = On n'en a pas. Ces deux mots apparaissent dans presque toutes les phrases coréennes qui parlent de possession, de localisation ou de disponibilité." },
  },
  16: { meaning_fr: 'Il y a / J\'ai / Nous avons (poli)' },
  17: { meaning_fr: "Il n'y en a pas / Nous n'en avons pas / Épuisé" },
  18: {
    prompt_fr:  '없어요 signifie…',
    choices_fr: ['Nous en avons', 'Combien ?', "Il n'y en a pas / Nous n'en avons pas", "Oui, s'il vous plaît"],
  },
  19: {
    title_fr: 'Monnaie et Prix Coréens (원)',
    body_fr:  "La monnaie coréenne est le 원 (won, ₩). Les prix peuvent paraître élevés car 1 000 won ≈ 0,75 USD. Un café peut coûter 4 500원, un repas 8 000~12 000원. 비싸다 (cher) et 싸다 (bon marché) sont les mots d'opinion clés. La monnaie rendue s'appelle 거스름돈. Les prix dans les marchés traditionnels sont souvent négociables — 깎아 주세요 (Faites-moi un prix, s'il vous plaît) ou 더 싸게요 ? (Vous pouvez faire moins cher ?) ouvre la négociation.",
    tip_fr:   { label: 'Lire les prix coréens', text: "Le coréen utilise des chiffres sino-coréens pour les prix : 일(1) 이(2) 삼(3) 사(4) 오(5). 만 = 10 000. Donc 삼만 오천 원 = 35 000 won. Les caissiers vous montrent souvent le montant sur une calculatrice ou un écran pour éviter toute confusion — pointer les chiffres fonctionne parfaitement." },
  },
  20: { meaning_fr: 'won — monnaie coréenne (₩)' },
  21: { meaning_fr: 'être cher' },
  22: { meaning_fr: 'être bon marché / pas cher' },
  23: { meaning_fr: 'remise / soldes' },
  24: {
    prompt_fr:  '비싸다 signifie…',
    choices_fr: ['être bon marché', 'être gratuit', 'être cher', 'être en soldes'],
  },
  25: { meaning_fr: 'monnaie (argent rendu après paiement)' },
  26: {
    prompt_fr:  "Quel mot signifie « monnaie » (argent rendu après paiement) ?",
    choices_fr: ['거스름돈', '비싸다', '할인', '원'],
  },
  27: {
    title_fr: 'Modes de Paiement (결제 방법)',
    body_fr:  "La Corée est une société très peu liquide — la plupart des endroits acceptent les cartes de crédit (신용카드) ou de débit (체크카드), et le paiement mobile via des applications comme KakaoPay et Samsung Pay est extrêmement répandu. Les espèces (현금) sont acceptées partout mais moins utilisées. Lors du paiement, on peut vous demander 카드요, 현금이요 ? (Carte ou espèces ?). Demander un reçu se dit 영수증 주세요. Les panneaux Tax Refund dans les magasins signifient que vous pouvez récupérer la TVA à l'aéroport en tant que touriste.",
    tip_fr:   { label: '카카오페이 & 삼성페이', text: "KakaoPay (카카오페이) et Samsung Pay (삼성페이) sont les applications de paiement mobile dominantes en Corée. Les touristes peuvent utiliser des cartes de crédit internationales presque partout. Cherchez le symbole de paiement sans contact — le taux d'adoption du paiement sans contact en Corée est parmi les plus élevés au monde." },
  },
  28: { meaning_fr: 'Je vais payer par carte' },
  29: { meaning_fr: 'Je vais payer en espèces (forme humble)' },
  30: { meaning_fr: "Donnez-moi un reçu, s'il vous plaît" },
  31: {
    prompt_fr:  "Comment dit-on « Je vais payer par carte » ?",
    choices_fr: ['현금으로 드릴게요', '카드로 할게요', '거스름돈 주세요', '결제해 주세요'],
  },
  32: { meaning_fr: "S'il vous plaît, faites-moi un rabais / Réduisez le prix, s'il vous plaît" },
  33: {
    title_fr:   'Shopping Terminé !',
    message_fr: 'Vous êtes prêt à faire du shopping en Corée ! Vous connaissez le vocabulaire clé, les phrases pour demander les prix, marchander, vérifier la disponibilité et effectuer des transactions de paiement.',
  },
};

let count = 0;
for (const step of data.steps) {
  const p = patches[step.id];
  if (!p) continue;
  for (const [k, v] of Object.entries(p)) {
    if (step[k] == null) { step[k] = v; count++; }
  }
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log(`✓ patched shopping.json — ${count} field(s) added`);
