#!/usr/bin/env node
'use strict';
const fs   = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'learn', 'data', 'pronunciation.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

// Stage names
const stageNames = {
  1: 'Batchim',
  2: 'Liaison',
  3: 'Assimilation Nasale',
  4: 'Tensification',
  5: 'Palatalisation & ㄹ',
  6: 'Erreurs Courantes',
};
for (const s of data.stages) {
  if (s.name_fr == null) s.name_fr = stageNames[s.id];
}

// Step patches
const patches = {
  // --- Stage 1: Batchim ---
  1: {
    title_fr: "Qu'est-ce que le Batchim ?",
    body_fr:  "Un batchim (받침, littéralement « soutien ») est une consonne placée en bas d'un bloc syllabique coréen. Par exemple, dans la syllabe 강, le ㅇ en bas est le batchim. Toutes les syllabes n'ont pas de batchim — beaucoup se terminent par une simple voyelle. Le batchim explique pourquoi des mots coréens comme 산, 달 et 밥 se terminent par un son consonantique distinct plutôt que par une voyelle ouverte.",
    tip_fr:   { label: "Quelles syllabes ont un batchim ?", text: "Regardez n'importe quel bloc syllabique coréen. Si un caractère se trouve sous la voyelle, c'est le batchim. 가 n'a pas de batchim. 간 a le batchim ㄴ. 닭 a un double batchim ㄺ (lu comme un seul son)." },
  },
  2: {
    title_fr: "Les 7 Groupes Sonores du Batchim",
    body_fr:  "Bien que de nombreuses consonnes différentes puissent apparaître comme batchim à l'écrit, elles se réduisent toutes à seulement 7 sons possibles à la prononciation. C'est ce qu'on appelle les 7 règles du batchim (받침 7종성). Apprendre ces 7 groupes est essentiel — cela explique pourquoi 닭 (poulet) et 국 (soupe) se terminent tous deux par le même son k.",
    rules_fr: [
      "Groupe ㄱ : ㄱ, ㄲ, ㅋ, ㄳ, ㄺ → se prononce k (non relâché) — exemple : 국 (soupe), 닭 (poulet)",
      "Groupe ㄴ : ㄴ, ㄵ, ㄶ → se prononce n — exemple : 산 (montagne), 앉다 (s'asseoir)",
      "Groupe ㄷ : ㄷ, ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ → se prononce t (non relâché) — exemple : 옷 (vêtements), 꽃 (fleur)",
      "Groupe ㄹ : ㄹ, ㄼ, ㄽ, ㄾ, ㅀ → se prononce l — exemple : 달 (lune), 말 (cheval)",
      "Groupe ㅁ : ㅁ, ㄻ → se prononce m — exemple : 밤 (nuit), 삶 (vie)",
      "Groupe ㅂ : ㅂ, ㅍ, ㄿ, ㄼ → se prononce p (non relâché) — exemple : 입 (bouche), 앞 (devant)",
      "Groupe ㅇ : ㅇ → se prononce ng — exemple : 강 (rivière), 방 (chambre)",
    ],
    tip_fr:   { label: "Occlusives non relâchées — qu'est-ce que ça signifie ?", text: "Les sons de batchim k, t et p sont non relâchés : votre bouche prend la position mais ne libère pas de souffle d'air. Pensez à tenir le p final dans « stop » — sto_p — sans laisser sortir l'air. Le batchim ㄱ/ㄷ/ㅂ coréen fonctionne de la même façon." },
  },
  3:  { meaning_fr: "soupe — batchim groupe ㄱ, se prononce k (non relâché)" },
  4:  { meaning_fr: "montagne — batchim groupe ㄴ, se prononce n" },
  5:  { meaning_fr: "vêtements — batchim groupe ㄷ (ㅅ→t), se prononce t (non relâché)" },
  6:  { meaning_fr: "lune — batchim groupe ㄹ, se prononce l" },
  7:  { meaning_fr: "nuit / châtaigne — batchim groupe ㅁ, se prononce m" },
  8:  { meaning_fr: "bouche — batchim groupe ㅂ, se prononce p (non relâché)" },
  9:  { meaning_fr: "rivière — batchim groupe ㅇ, se prononce ng" },
  10: { meaning_fr: "poulet — double batchim ㄺ (ㄹ+ㄱ) → groupe ㄱ → son k" },
  11: { meaning_fr: "fleur — batchim ㅊ appartient au groupe ㄷ → son t" },
  12: {
    prompt_fr:  "ㅋ (kh), ㄲ (kk) et ㄳ sont tous des batchim du même groupe. Dans quel groupe de sons sont-ils ?",
    choices_fr: ["Groupe ㄴ (n)", "Groupe ㄱ (k)", "Groupe ㅂ (p)", "Groupe ㄷ (t)"],
  },
  13: {
    prompt_fr:  "방 (chambre) se termine par le batchim ㅇ. Quel son cela produit-il ?",
    choices_fr: ["Aucun son — ㅇ est toujours silencieux", "ng (comme dans « ring »)", "n", "m"],
  },

  // --- Stage 2: Liaison ---
  14: {
    title_fr: "Liaison — Enchaînement Sonore",
    body_fr:  "Quand une syllabe se terminant par un batchim est immédiatement suivie d'une syllabe commençant par le ㅇ silencieux, la consonne batchim avance et devient la consonne initiale de la syllabe suivante. L'orthographe reste la même — seule la prononciation change. C'est ce qu'on appelle la liaison (연음화) et c'est l'un des phénomènes de prononciation les plus fréquents en coréen.",
    tip_fr:   { label: "Repérer le schéma", text: "Cherchez : consonne batchim + syllabe suivante commençant par ㅇ (espace réservé silencieux). Résultat : le batchim semble ouvrir la syllabe suivante. 먹어요 → 머거요. 한국어 → 한구거. La forme écrite ne change jamais — seule votre prononciation change." },
  },
  15: { meaning_fr: "je mange / je suis en train de manger — le batchim ㄱ de 먹 se lie à 어, se prononce comme 머거요" },
  16: { meaning_fr: "riz (forme objet) — le batchim ㅂ de 밥 se lie à 을, se prononce comme 바블" },
  17: { meaning_fr: "c'est bien / j'aime — le batchim ㅎ s'affaiblit et se lie (voir Étape 4 pour les règles de ㅎ)" },
  18: { meaning_fr: "langue coréenne — le batchim ㄱ de 국 se lie à 어, se prononce comme 한구거" },
  19: {
    title_fr: "Pourquoi la Liaison Se Produit-elle ?",
    body_fr:  "La structure des syllabes coréennes préfère fortement le schéma consonne + voyelle. Quand une syllabe à initiale vocalique suit un batchim, il est phonétiquement plus naturel que la consonne s'attache à l'espace ouvert de cette voyelle. Le résultat est un flux de parole plus naturel et connecté. Ce n'est pas de l'argot ou une prononciation négligée — c'est le coréen standard et s'entend dans les émissions d'information, les discours formels et les conversations quotidiennes.",
    tip_fr:   { label: "Liaison et orthographe", text: "Le coréen écrit conserve la consonne d'origine dans sa position orthographique même quand elle est prononcée dans la syllabe suivante. C'est pourquoi apprendre à lire le coréen et apprendre à le prononcer sont deux compétences distinctes au départ — l'écriture enregistre des morphèmes, pas des sons exacts." },
  },
  20: {
    prompt_fr:  "La liaison (연음화) se produit quand un batchim est suivi d'une syllabe commençant par…",
    choices_fr: ["N'importe quelle consonne", "ㅇ silencieux (syllabe commençant par une voyelle)", "Seulement ㄴ ou ㅁ", "Une consonne aspirée"],
  },
  21: {
    prompt_fr:  "Dans 한국어 (langue coréenne), le batchim ㄱ de 국 se lie en avant. Comment se prononce-t-il ?",
    choices_fr: ["한국어 → 항궈 (reste dans 국)", "한국어 → 한구거 (ㄱ ouvre 어)", "한국어 → 한국어 (sans changement)", "한국어 → 한국아 (la voyelle change)"],
  },

  // --- Stage 3: Assimilation ---
  22: {
    title_fr: "Assimilation Nasale",
    body_fr:  "Quand une consonne batchim occlusive des groupes ㄱ, ㄷ ou ㅂ est suivie des consonnes nasales ㄴ ou ㅁ, l'occlusive s'assimile et devient son nasale correspondante. C'est purement articulatoire : les consonnes nasales requièrent que le voile du palais descende, ce qui attire les occlusives adjacentes vers le territoire nasal. L'orthographe reste la même ; seule la prononciation change.",
    rules_fr: [
      "ㅂ + ㄴ/ㅁ → ㅁ : l'occlusive labiale devient une nasale labiale — 입니다 → 임니다",
      "ㄱ + ㄴ/ㅁ → ㅇ : l'occlusive vélaire devient une nasale vélaire — 국물 → 궁물",
      "ㄷ + ㄴ/ㅁ → ㄴ : l'occlusive alvéolaire devient une nasale alvéolaire — 걷는다 → 건는다",
    ],
    tip_fr:   { label: "Pourquoi le même point d'articulation ?", text: "Chaque paire (ㅂ↔ㅁ, ㄱ↔ㅇ, ㄷ↔ㄴ) partage exactement le même point d'articulation dans la bouche — lèvres, fond de la gorge et rebord alvéolaire respectivement. Seul le flux d'air nasal change. La consonne nasale « contamine » l'occlusive précédente, la nasalisant tout en maintenant la position buccale." },
  },
  23: { meaning_fr: "est / suis / es (formel) — ㅂ + ㄴ → ㅁ : s'écrit 입니다, se prononce comme 임니다" },
  24: { meaning_fr: "bouillon — ㄱ + ㅁ → ㅇ : s'écrit 국물, se prononce comme 궁물" },
  25: { meaning_fr: "année scolaire — ㄱ + ㄴ → ㅇ : s'écrit 학년, se prononce comme 항년" },
  26: { meaning_fr: "marche / marcher — ㄷ + ㄴ → ㄴ : s'écrit 걷는다, se prononce comme 건는다" },
  27: { meaning_fr: "cour avant — ㅂ + ㅁ → ㅁ : s'écrit 앞마당, se prononce comme 암마당" },
  28: {
    prompt_fr:  "Le batchim ㅂ (ou ㅍ) suivi de ㄴ ou ㅁ devient quel son ?",
    choices_fr: ["ㄴ", "ㅁ", "ㅇ", "ㄱ"],
  },
  29: {
    prompt_fr:  "Le batchim ㄱ suivi de ㄴ ou ㅁ devient quel son ?",
    choices_fr: ["ㄴ", "ㄷ", "ㅇ (ng)", "ㅁ"],
  },
  30: {
    prompt_fr:  "입니다 (est / suis / es) — comment se prononce-t-il vraiment ?",
    choices_fr: ["ip-ni-da", "im-ni-da", "ib-ni-da", "ip-mi-da"],
  },
  31: {
    title_fr: "L'Assimilation Va Toujours dans Un Seul Sens",
    body_fr:  "L'assimilation nasale va toujours dans le même sens : l'occlusive devient nasale, jamais l'inverse. La consonne nasale « contamine » le son précédent. Une fois que vous repérez le schéma ㅂ→ㅁ, ㄷ→ㄴ, ㄱ→ㅇ, vous commencez à entendre et à prédire ces changements automatiquement dans la vraie parole coréenne.",
    tip_fr:   { label: "Astuce mnémotechnique", text: "Pensez à chaque paire comme partageant un endroit dans votre bouche. Lèvres : ㅂ (occlusive) ↔ ㅁ (nasale). Gorge : ㄱ (occlusive) ↔ ㅇ (nasale). Rebord alvéolaire : ㄷ (occlusive) ↔ ㄴ (nasale). L'endroit reste ; seule la soupape nasale s'ouvre." },
  },

  // --- Stage 4: Tensification ---
  32: {
    title_fr: "Tensification",
    body_fr:  "Après certaines consonnes batchim — spécifiquement les sons de batchim occlusive non relâchée des groupes ㄱ, ㄷ et ㅂ — la consonne suivante devient tendue (doublée). La forme écrite ne change pas ; seule la prononciation change. La tensification explique pourquoi 학교 (école) ressemble à 학꾜 plutôt qu'à 학교.",
    tip_fr:   { label: "Pourquoi la tensification se produit-elle", text: "Après une occlusive non relâchée, le conduit vocal est déjà dans une position tendue et fermée. Quand vous commencez la consonne suivante depuis cet état, la tension musculaire supplémentaire se transporte naturellement, créant le son tendu automatiquement. La tensification n'est pas délibérée — c'est une conséquence articulatoire naturelle. Une fois que vous l'entendez dans la vraie parole, vous ne pouvez plus ne pas l'entendre." },
  },
  33: { meaning_fr: "école — le batchim ㄱ provoque la tensification : ㄱ→ㄲ, se prononce comme 학꾜" },
  34: { meaning_fr: "restaurant — le batchim ㄱ provoque la tensification : ㄷ→ㄸ, se prononce comme 식땅" },
  35: { meaning_fr: "fermer — le batchim ㄷ provoque la tensification : ㄷ→ㄸ, se prononce comme 닫따" },
  36: { meaning_fr: "entrée — le batchim ㅂ provoque la tensification : ㄱ→ㄲ, se prononce comme 입꾸" },
  37: {
    prompt_fr:  "La tensification (경음화) se produit le plus régulièrement après quel type de batchim ?",
    choices_fr: ["Batchim nasal (ㄴ, ㅁ, ㅇ)", "Batchim occlusive non relâchée (groupes ㄱ, ㄷ, ㅂ)", "Seulement le batchim ㄹ", "Tout batchim consonantique"],
  },
  38: {
    prompt_fr:  "학교 (école) — comment se prononce-t-il vraiment ?",
    choices_fr: ["hak-gyo", "hak-kyo (aspiré)", "hak-kkyo (tendu)", "ha-gyo"],
  },

  // --- Stage 4 continued: ㅎ ---
  39: {
    title_fr: "Affaiblissement du ㅎ",
    body_fr:  "La consonne ㅎ est l'un des sons les plus instables du coréen. Entre deux voyelles — que ㅎ soit un batchim ou une consonne initiale — il s'affaiblit considérablement et disparaît presque entièrement. C'est pourquoi 좋아요 (c'est bien) ressemble à 조아요 et non à 조하요. Le ㅎ est toujours écrit, mais le son disparaît presque.",
    tip_fr:   { label: "Erreur courante des débutants", text: "De nombreux débutants disent 조하요 pour 좋아요, conservant le son h. Dans la parole coréenne réelle, cela semble peu naturel et trop délibéré. La prononciation standard est 조아요 — le ㅎ disparaît silencieusement entre les deux voyelles. Faites confiance à la règle : le ㅎ entre des voyelles disparaît presque." },
  },
  40: { meaning_fr: "c'est bien / j'aime — le batchim ㅎ s'affaiblit : se prononce comme 조아요 (pas 조하요)" },
  41: { meaning_fr: "il y en a beaucoup — le ㅎ dans le batchim ㄶ s'affaiblit : se prononce comme 마나요" },
  42: { meaning_fr: "je le mets dedans — le batchim ㅎ s'affaiblit entre les voyelles : se prononce comme 너어요" },
  43: {
    title_fr: "ㅎ + Consonne = Aspiration",
    body_fr:  "Quand le batchim ㅎ rencontre la consonne initiale de la syllabe suivante (ou vice versa), les deux fusionnent en une seule consonne aspirée. ㅎ + ㄷ devient ㅌ. ㄱ + ㅎ devient ㅋ. ㅂ + ㅎ devient ㅍ. ㄷ + ㅎ (ou ㅎ + ㄷ) devient ㅌ. Pensez à ㅎ comme ajoutant un souffle d'air à la consonne adjacente.",
    rules_fr: [
      "ㅎ + ㄷ → ㅌ : 놓다 (poser) → 노타",
      "ㄱ + ㅎ → ㅋ : 착하다 (gentil) → 차카다",
      "ㅂ + ㅎ → ㅍ : 입학 (inscription) → 이팍",
      "ㄷ + ㅎ → ㅌ : 못해요 (ne peut pas faire) → 모태요",
    ],
  },
  44: { meaning_fr: "lâcher / poser — batchim ㅎ + ㄷ → ㅌ : s'écrit 놓다, se prononce comme 노타" },
  45: {
    prompt_fr:  "Quel son ㅎ + ㄷ (ou ㄷ + ㅎ) produit-il ?",
    choices_fr: ["ㄷ (ordinaire)", "ㅌ (t aspiré)", "ㄸ (tendu)", "ㅎ (reste h)"],
  },

  // --- Stage 5: Palatalisation & ㄹ ---
  46: {
    title_fr: "Palatalisation",
    body_fr:  "Quand les consonnes ㄷ ou ㅌ apparaissent comme batchim et sont suivies par la voyelle 이 (i), elles avancent dans la bouche et deviennent respectivement ㅈ et ㅊ. Ce changement s'appelle la palatalisation — la consonne passe du rebord alvéolaire au palais pour anticiper la voyelle antérieure 이.",
    rules_fr: [
      "ㄷ + 이 → ㅈ이 → 지 : 굳이 (délibérément) → 구지",
      "ㅌ + 이 → ㅊ이 → 치 : 같이 (ensemble) → 가치",
    ],
    tip_fr:   { label: "Interne au morphème seulement", text: "La palatalisation s'applique uniquement à l'intérieur du même mot ou quand un suffixe commençant par 이 s'attache au radical. Elle ne s'applique pas entre les frontières de mots. 같이 provoque la palatalisation parce que 이 fait partie du mot. Dans une phrase comme 옷 입어요 (mettre des vêtements), 이 commence un mot séparé — des règles différentes s'appliquent." },
  },
  47: { meaning_fr: "ensemble — ㅌ + 이 → ㅊ : s'écrit 같이, se prononce comme 가치" },
  48: { meaning_fr: "délibérément / obstinément — ㄷ + 이 → ㅈ : s'écrit 굳이, se prononce comme 구지" },
  49: {
    prompt_fr:  "Quand le batchim ㄷ est suivi de la voyelle 이, il devient…",
    choices_fr: ["ㄴ", "ㅈ", "ㅊ", "ㅅ"],
  },
  50: {
    prompt_fr:  "Quand le batchim ㅌ est suivi de la voyelle 이, il devient…",
    choices_fr: ["ㄴ", "ㅈ", "ㅊ", "ㅅ"],
  },
  51: {
    title_fr: "Le Son ㄹ",
    body_fr:  "La consonne coréenne ㄹ est souvent décrite comme étant entre r et l — et c'est précisément exact. Sa réalisation exacte dépend de sa position dans la syllabe. Entre deux voyelles, ㄹ est un battement rapide unique de la pointe de la langue contre le rebord juste derrière les dents supérieures — le même mouvement que le r battu en espagnol dans « pero » ou « caro ». En fin de syllabe ou avant une consonne, maintenez légèrement la langue sur ce même rebord pour un son l doux.",
    tip_fr:   { label: "Technique du battement de langue", text: "Ne roulez pas ㄹ (pas de r roulé) et n'utilisez pas une forme de l anglais en position vocalique. Dans 라면, le ㄹ est un battement rapide. Dans 달 (lune), le ㄹ est un l tenu. Dans 빨리 (vite), vous avez les deux : un l tenu puis un battement." },
  },
  52: { meaning_fr: "nouilles instantanées — ㄹ en position initiale (avant une voyelle) : battement r rapide" },
  53: { meaning_fr: "lune — ㄹ comme batchim final : son l tenu" },
  54: { meaning_fr: "vite, rapidement — ㄹㄹ doublé : l tenu puis battement r" },
  55: { meaning_fr: "je t'aime — ㄹ entre des voyelles (랑→해) : son du battement r" },
  56: {
    title_fr: "ㄹ + ㄴ ou ㄴ + ㄹ → ㄹㄹ (Latéralisation)",
    body_fr:  "Quand ㄹ et ㄴ apparaissent adjacents à travers des syllabes, ils deviennent tous les deux ㄹ — cela s'appelle la latéralisation (유음화). Exemple : 신라 (dynstie Silla) se prononce 실라 (silla), pas sin-ra. De même, 연락 (contact) se prononce 열락 (yeollak). Le ㄴ se convertit entièrement en ㄹ quand il est adjacent à ㄹ.",
    tip_fr:   { label: "Pourquoi la latéralisation ?", text: "ㄹ et ㄴ partagent des positions de langue très similaires — les deux sont des sons alvéolaires produits au rebord alvéolaire. Quand ils apparaissent côte à côte, le ㄹ plus fort (latéral) attire le ㄴ dans son territoire. C'est l'un des changements de son les plus frappants car l'orthographe ne donne aucun indice visuel." },
  },
  57: {
    prompt_fr:  "신라 (Silla — un royaume coréen historique) se prononce comme…",
    choices_fr: ["sin-ra", "sin-la", "sil-la", "shi-ra"],
  },

  // --- Stage 6: Erreurs Courantes ---
  58: {
    title_fr: "6 Erreurs Courantes pour les Francophones",
    body_fr:  "Le coréen et le français ont des systèmes phonologiques très différents. Les six étapes suivantes couvrent chacune une erreur de prononciation courante — avec des explications claires sur la façon de la corriger. Reconnaître ces schémas tôt permet d'éviter des mois de mauvaises habitudes.",
    tip_fr:   { label: "Pourquoi ces erreurs sont si courantes ?", text: "Les francophones appliquent automatiquement la phonologie française aux nouveaux sons. Le coréen a des voyelles, des contrastes consonantiques et des schémas d'intonation qui n'existent tout simplement pas en français. Chacune de ces erreurs vient du fait de faire correspondre un son coréen à l'équivalent français le plus proche — ce qui est presque toujours incorrect." },
  },
  59: {
    title_fr: "Erreur 1 — Prononcer ㅡ comme « ou »",
    body_fr:  "ㅡ n'a pas d'équivalent exact en français. C'est une voyelle postérieure non arrondie — votre langue est dans la position de « eu » (comme dans « deux »), mais vos lèvres sont complètement plates et non arrondies, comme si vous disiez « e » avec une bouche étalée et raidie. Les mots comme 으, 크다, 든지 utilisent tous ce son. Le moment où vos lèvres s'arrondissent, vous produisez la mauvaise voyelle.",
    tip_fr:   { label: "Comment pratiquer ㅡ", text: "Dites « eu » comme dans « deux ». Maintenant gardez votre langue exactement dans cette position, mais étalez vos lèvres à plat comme si vous souriiez légèrement. Le son qui sort — raide, non arrondi, légèrement postérieur — est ㅡ. Ne relâchez pas la langue vers un « a » ou une voyelle centrale ; gardez-la haute et postérieure." },
  },
  60: {
    title_fr: "Erreur 2 — Confondre ㅓ avec le « e » français",
    body_fr:  "ㅓ est souvent transcrit « eo » — mais il ne ressemble pas exactement au « e » de « le » en français. La ㅓ coréenne est une voyelle mi-postérieure non arrondie, légèrement plus en arrière et plus ouverte que le « e » français. Pensez au « e » de « le » de façon détendue mais ouvrez la bouche un peu plus. Tout ajout de tension ou d'arrondissement des lèvres rend immédiatement la voyelle étrangère.",
    tip_fr:   { label: "Test rapide", text: "Dites « e » comme dans « le » de façon détendue et ouvrez la bouche un peu plus. C'est ce qui se rapproche le plus de ㅓ. Ne la tendez pas, ne l'arrondissez pas. Juste une voyelle ouverte et neutre. Mots à pratiquer : 어, 어머니, 뭐." },
  },
  61: {
    title_fr: "Erreur 3 — Souffler de l'Air sur les Consonnes Doubles",
    body_fr:  "Les francophones ajoutent parfois de l'aspiration aux consonnes occlusives. Les consonnes tendues (doublées) coréennes ㄲ, ㄸ, ㅃ, ㅆ, ㅉ ne sont jamais aspirées. Elles sont produites avec des muscles tendus et sans souffle d'air vers l'extérieur. Tenez un morceau de papier devant votre bouche — il ne devrait pas bouger quand vous dites 까, 따, 빠, 싸, 짜. Le contraste est entre tendu-et-retenu versus air soufflé.",
    tip_fr:   { label: "Le test du papier", text: "Les consonnes aspirées (ㅋ, ㅌ, ㅍ, ㅊ) font trembler le papier de façon significative. Les consonnes simples (ㄱ, ㄷ, ㅂ, ㅈ) le font bouger légèrement. Les consonnes tendues (ㄲ, ㄸ, ㅃ, ㅉ) devraient à peine faire bouger le papier — haute tension musculaire, aucun relâchement d'air." },
  },
  62: {
    title_fr: "Erreur 4 — Intonation Montante sur Toutes les Questions",
    body_fr:  "En français, l'intonation montante en fin de phrase peut signaler une question. En coréen, les règles d'intonation diffèrent : les questions oui/non utilisent bien une légère montée à la fin, mais les questions en mots interrogatifs (qui, quoi, où, quand, pourquoi, comment) utilisent généralement une intonation descendante ou neutre — pas montante. Surexploiter l'intonation montante sur toutes les questions coréennes semble peu naturel et parfois incertain.",
    tip_fr:   { label: "Le schéma à retenir", text: "Question oui/non : légère montée à la fin. Exemple : 갔어요 ? (Tu es allé ?) — se termine en montant. Question avec mot interrogatif : neutre ou descendant. Exemple : 어디 갔어요 ? (Où es-tu allé ?) — se termine à plat ou en descendant. Le mot interrogatif porte suffisamment d'information ; inutile de monter." },
  },
  63: {
    title_fr: "Erreur 5 — ㅅ comme « s » Simple avant les Voyelles 이",
    body_fr:  "Avant les voyelles 이, 야, 여, 요, 유, la consonne ㅅ se prononce comme un son proche du « ch » (similaire au ch dans « chambre »). Donc 시 se dit « chi » et non « si », et 셔츠 (chemise) commence par ce son. Cela s'applique également à ㅆ tendu avant 이. Les francophones qui ont appris la romanisation en premier disent souvent « si » là où les locuteurs natifs disent « chi », ce qui se remarque immédiatement.",
    tip_fr:   { label: "Quelles voyelles déclenchent cela ?", text: "Le ㅅ palatalisé (son proche de « ch ») apparaît avant les voyelles de type i : 이 (i), 야 (ya), 여 (yeo), 요 (yo), 유 (yu). Avant toutes les autres voyelles — 아, 어, 오, 우, 으 et leurs composées — ㅅ reste un simple son s. 사 se dit « sa », mais 시 se dit « chi »." },
  },
  64: {
    title_fr: "Erreur 6 — Prononcer le ㅎ dans 좋아요",
    body_fr:  "Les débutants disent souvent « jo-ha-yo » pour 좋아요, traitant ㅎ comme un son h clairement prononcé. Mais en raison de l'affaiblissement du ㅎ entre des voyelles (que vous avez appris à l'Étape 4), la prononciation réelle est 조아요 (jo-a-yo) — le ㅎ disparaît presque. Cela s'applique largement : 많아요 → 마나요, 낳아요 → 나아요. Chaque fois que ㅎ se trouve entre des voyelles dans un contexte naturel, il s'estompe.",
    tip_fr:   { label: "Retour à l'Étape 4", text: "Vous avez déjà appris l'affaiblissement du ㅎ et l'aspiration ㅎ + consonne. L'Erreur 6 est simplement l'endroit le plus courant dans la vie réelle où les débutants rencontrent l'affaiblissement du ㅎ et se trompent. 좋아요 est sans doute la forme d'adjectif la plus utilisée en coréen — en maîtriser la prononciation compte immédiatement." },
  },
  65: {
    prompt_fr:  "Quand vous prononcez ㅡ, vos lèvres doivent être…",
    choices_fr: ["Arrondies comme « ou »", "Plates et non arrondies (étirées)", "Légèrement ouvertes comme « a »", "Pincées comme un baiser"],
  },
  66: {
    prompt_fr:  "ㅅ avant la voyelle 이 ressemble à…",
    choices_fr: ["« s » simple comme dans « si »", "« ch » comme dans « chambre »", "« z » comme dans « zèbre »", "« t » comme dans « thé »"],
  },
  67: {
    prompt_fr:  "좋아요 (c'est bien / j'aime) se prononce vraiment comme…",
    choices_fr: ["jo-ha-yo", "jo-a-yo", "joh-a-yo", "jo-ha"],
  },

  // --- lesson_complete ---
  68: {
    title_fr:   "Guide de Prononciation Terminé !",
    message_fr: "Vous avez maîtrisé les 8 règles de prononciation coréenne : réduction du batchim, liaison, assimilation nasale, tensification, affaiblissement du ㅎ, aspiration ㅎ, palatalisation et le son ㄹ. Plus les 6 erreurs les plus courantes que font les francophones — et comment les éviter. Votre prononciation du coréen sonnera désormais beaucoup plus naturelle.",
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
console.log(`✓ patched pronunciation.json — ${count} field(s) added`);
