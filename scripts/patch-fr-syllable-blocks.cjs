#!/usr/bin/env node
'use strict';
const fs   = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'learn', 'data', 'syllable-blocks.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

// Stage names
const stageNames = {
  1: 'Bases du Bloc',
  2: 'Formes des Voyelles',
  3: 'Construire',
  4: 'Batchim',
  5: 'Lire des Mots',
};
for (const s of data.stages) {
  if (s.name_fr == null) s.name_fr = stageNames[s.id];
}

// Step patches
const patches = {
  // --- Stage 1: Block Basics ---
  1: {
    title_fr: "Qu'est-ce qu'un Bloc Syllabique ?",
    body_fr:  "Chaque syllabe coréenne s'écrit dans un bloc carré invisible. Contrairement au français où les lettres se lisent de gauche à droite en ligne, le coréen empile les consonnes et les voyelles ensemble dans des blocs compacts et visuellement équilibrés. Chaque bloc représente exactement une syllabe — une unité sonore.",
    tip_fr:   { label: "Le saviez-vous ?", text: "Chaque bloc syllabique contient exactement une voyelle. Il peut avoir 0, 1 ou 2 consonnes — mais jamais plus d'une voyelle." },
  },
  2: {
    title_fr: "Les Trois Positions",
    body_fr:  "Chaque bloc syllabique coréen comporte trois positions nommées. Deux sont obligatoires (la consonne initiale 초성 et la voyelle médiale 중성) et une est optionnelle (la consonne finale 받침). Apprendre ces positions par leur nom est essentiel — la grammaire coréenne y fait constamment référence.",
    tip_fr:   { label: "Conseil", text: "Pour les voyelles verticales comme ㅏ, ㅓ et ㅣ : la consonne initiale est à gauche, la voyelle à droite. Pour les voyelles horizontales comme ㅗ, ㅜ et ㅡ : la consonne initiale est en haut, la voyelle en bas." },
  },
  3: {
    title_fr:          "Quatre Patterns de Blocs Syllabiques",
    body_fr:           "Les syllabes coréennes suivent quatre patterns structurels de base selon la présence ou non d'une consonne finale (받침) et si la syllabe commence par une voyelle ou une consonne.",
    patterns_label_fr: ["initiale + voyelle", "ㅇ silencieux + voyelle", "initiale + voyelle + 받침", "ㅇ silencieux + voyelle + 받침"],
    tip_fr:            { label: "La Règle du ㅇ Espace Réservé", text: "Quand une syllabe commence par un son de voyelle, vous devez écrire ㅇ comme espace réservé dans la position initiale. ㅇ est complètement silencieux au début d'une syllabe — il indique simplement que le bloc commence par une voyelle. Exemples : 아 = ㅇ+ㅏ   이 = ㅇ+ㅣ   우 = ㅇ+ㅜ" },
  },
  4: {
    hint_fr:            "Chaque syllabe est un bloc carré — consonne initiale, voyelle et consonne finale optionnelle.",
    example_meaning_fr: "Corée",
  },
  5: {
    hint_fr:            "Ce bloc a les trois positions : 초성 (ㄱ) + 중성 (ㅜ) + 받침 (ㄱ).",
    example_meaning_fr: "Corée",
  },
  6: {
    hint_fr:            "Les syllabes commençant par une voyelle utilisent ㅇ silencieux comme espace réservé. Le ㅇ ici ne fait aucun son.",
    example_meaning_fr: "langue coréenne",
  },
  7: {
    prompt_fr:  "Chaque bloc syllabique coréen contient exactement combien de voyelles ?",
    choices_fr: ["Zéro", "Exactement une", "Une ou deux", "Autant que nécessaire"],
  },
  8: {
    prompt_fr:  "La position de la consonne INITIALE (première consonne) s'appelle…",
    choices_fr: ["받침", "중성", "초성", "모음"],
  },
  9: {
    prompt_fr:  "Quand une syllabe commence par un son de VOYELLE, vous écrivez __ comme consonne initiale de remplacement.",
    choices_fr: ["ㄱ", "ㄴ", "ㄹ", "ㅇ"],
  },
  10: {
    hint_fr:            "Pattern CV — le type de bloc le plus simple. Juste une consonne initiale et une voyelle.",
    example_meaning_fr: "aller",
  },
  11: {
    hint_fr:            "Pattern voyelle seule — ㅇ silencieux en position initiale, seule la voyelle se prononce.",
    example_meaning_fr: "bébé",
  },
  12: {
    hint_fr:            "Pattern CVC — consonne initiale + voyelle + consonne finale (받침). Trois parties.",
    example_meaning_fr: "foie / est allé",
  },
  13: {
    prompt_fr:  "안 (à l'intérieur / non) — quel pattern structurel est-ce ?",
    choices_fr: ["CV", "CVC", "VC (ㅇ silencieux + voyelle + finale)", "V seule"],
  },

  // --- Stage 2: Vowel Shapes ---
  14: {
    title_fr: "Voyelles Verticales vs Horizontales",
    body_fr:  "La forme de la voyelle détermine où va la consonne initiale dans le bloc. Les voyelles hautes et verticales poussent la consonne vers la gauche ; les voyelles larges et horizontales la poussent vers le haut. C'est ce qui donne au coréen son apparence carrée distinctive.",
    tip_fr:   { label: "Astuce Visuelle Rapide", text: "Quand vous voyez une voyelle haute (ㅏ, ㅓ, ㅣ et leurs variantes), la consonne initiale est à sa gauche. Quand vous voyez une voyelle large (ㅗ, ㅜ, ㅡ et leurs variantes), la consonne initiale est au-dessus. Les voyelles composées comme ㅘ, ㅝ, ㅚ se comportent comme des voyelles verticales — la consonne va à gauche." },
  },
  15: {
    hint_fr: "ㅏ est une voyelle HAUTE verticale. La consonne initiale est à sa GAUCHE.",
  },
  16: {
    hint_fr:            "ㅓ est aussi une voyelle haute verticale — consonne à GAUCHE, voyelle à DROITE.",
    example_meaning_fr: "tu (informel)",
  },
  17: {
    hint_fr:            "ㅣ est la voyelle la plus haute. La consonne va toujours à sa gauche.",
    example_meaning_fr: "temps / heure",
  },
  18: {
    hint_fr:            "ㅗ est une voyelle LARGE horizontale. La consonne initiale est AU-DESSUS de la voyelle.",
    example_meaning_fr: "merci",
  },
  19: {
    hint_fr:            "ㅜ est une voyelle large horizontale — consonne en haut, voyelle en bas. La ligne pointe vers le BAS.",
    example_meaning_fr: "qui",
  },
  20: {
    hint_fr:            "ㅡ est une voyelle plate et horizontale — la consonne est au-dessus.",
    example_meaning_fr: "et / et aussi",
  },
  21: {
    prompt_fr:  "Avec une voyelle HAUTE comme ㅏ, ㅓ ou ㅣ — où va la consonne initiale ?",
    choices_fr: ["Au-dessus", "À gauche", "À droite", "En bas"],
  },
  22: {
    prompt_fr:  "Avec une voyelle LARGE comme ㅗ, ㅜ ou ㅡ — où va la consonne initiale ?",
    choices_fr: ["À gauche", "À droite", "Au-dessus", "En bas"],
  },
  23: {
    prompt_fr:  "배 (estomac / bateau) contient ㅐ — de quel type de voyelle s'agit-il ?",
    choices_fr: ["Large horizontale", "Haute verticale", "Composée large", "Silencieuse"],
  },
  24: {
    prompt_fr:  "Laquelle de ces voyelles est LARGE (horizontale) ?",
    choices_fr: ["ㅏ", "ㅓ", "ㅣ", "ㅜ"],
  },

  // --- Stage 3: Build It ---
  25: {
    title_fr: "Construire vos Premières Syllabes",
    body_fr:  "Maintenant, pratiquons la construction de syllabes CV simples — consonne + voyelle, sans batchim. Ce sont les blocs les plus faciles à lire et à écrire. Écoutez chacun et essayez de produire le son vous-même.",
  },
  26: { meaning_fr: "ba — 바나나 (banane)" },
  27: { meaning_fr: "na — 나 (je / moi)" },
  28: { meaning_fr: "sa — 사랑 (amour)" },
  29: { meaning_fr: "ha — 하늘 (ciel)" },
  30: { meaning_fr: "go — 고마워 (merci, informel)" },
  31: { meaning_fr: "nu — 누구 (qui)" },
  32: { meaning_fr: "mi — 미래 (futur)" },
  33: { meaning_fr: "gi — 기다리다 (attendre)" },

  // --- Stage 4: Batchim ---
  34: {
    title_fr: "Ajouter le Batchim — La Consonne Finale",
    body_fr:  "Quand vous ajoutez une consonne en bas d'un bloc, cette consonne devient le 받침 (batchim) — la consonne finale. Le batchim est ce qui donne à de nombreux mots coréens leurs terminaisons riches et résonantes. Observez comment l'ajout du batchim transforme des syllabes simples en vrais mots.",
    tip_fr:   { label: "Conseil", text: "Les blocs syllabiques avec batchim sont légèrement comprimés verticalement pour laisser de la place en bas. La consonne batchim se place sous la consonne initiale et la voyelle, complétant la forme carrée du bloc." },
  },
  35: {
    hint_fr:            "ㄴ est le 받침 ici — il se trouve en bas du bloc sous ㅅ et ㅏ.",
    example_meaning_fr: "montagne",
  },
  36: {
    hint_fr:            "ㄹ 받침 — la langue touche légèrement le palais pour produire la terminaison.",
    example_meaning_fr: "lune / mois",
  },
  37: {
    hint_fr:            "ㅂ받침 — les lèvres se ferment à la fin sans s'ouvrir. Le p n'est pas relâché.",
    example_meaning_fr: "riz / repas",
  },
  38: {
    hint_fr:            "ㅁ 받침 — les lèvres se ferment doucement à la fin. Une terminaison nasale résonante.",
    example_meaning_fr: "printemps (saison)",
  },
  39: {
    hint_fr:            "ㄹ 받침 encore — la langue s'attarde contre le palais. Ressemble à un l doux.",
    example_meaning_fr: "route / chemin",
  },
  40: {
    prompt_fr:  "밥 (riz) — quel est son 받침 (batchim) ?",
    choices_fr: ["ㅏ", "ㅂ", "ㄴ", "ㄱ"],
  },
  41: {
    prompt_fr:  "달 (lune) se termine par quel son consonantique ?",
    choices_fr: ["n", "m", "l/r", "k"],
  },
  42: {
    prompt_fr:  "Dans un bloc syllabique CVC, où se place le 받침 (batchim) ?",
    choices_fr: ["Au-dessus de la voyelle", "À droite de la voyelle", "En bas, sous tout", "À côté de la consonne initiale"],
  },
  43: {
    prompt_fr:  "Lequel de ces mots n'a PAS de 받침 ?",
    choices_fr: ["산", "달", "가", "봄"],
  },
  44: {
    prompt_fr:  "봄 (printemps) = ㅂ + ㅗ + ? — quel est le batchim ?",
    choices_fr: ["ㄴ", "ㄱ", "ㅁ", "ㄹ"],
  },

  // --- Stage 5: Read Words ---
  45: {
    title_fr: "Lire des Mots Coréens Réels",
    body_fr:  "Vous avez maintenant tout ce qu'il vous faut pour déchiffrer de vrais mots coréens. Décomposons 10 mots essentiels syllabe par syllabe, en identifiant chaque composant. Appuyez sur les boutons de haut-parleur pour entendre les mots prononcés à voix haute.",
  },
  46: { meaning_fr: "Corée" },
  47: { meaning_fr: "personne" },
  48: { meaning_fr: "école" },
  49: { meaning_fr: "bonjour / paix" },
  50: { meaning_fr: "gratitude" },
  51: { meaning_fr: "amour" },
  52: { meaning_fr: "musique" },
  53: { meaning_fr: "ami(e)" },
  54: { meaning_fr: "famille" },
  55: { meaning_fr: "mer / océan" },
  56: { meaning_fr: "rêve" },
  57: {
    title_fr: "Pratique et Résumé",
    body_fr:  "Félicitations — vous avez appris la structure centrale des blocs syllabiques coréens ! Voici un résumé rapide des cinq règles qui régissent chaque syllabe du système d'écriture coréen.",
    rules_fr: [
      "Chaque bloc a exactement une voyelle (중성 / Jungseong)",
      "Les syllabes commençant par une voyelle utilisent ㅇ silencieux comme consonne initiale de remplacement",
      "Voyelles hautes (ㅏ, ㅓ, ㅣ) — la consonne initiale est à gauche, la voyelle à droite",
      "Voyelles larges (ㅗ, ㅜ, ㅡ) — la consonne initiale est en haut, la voyelle en bas",
      "Le 받침 (batchim) optionnel se place en bas du bloc, sous tout le reste",
    ],
    tip_fr:   { label: "L'Autotest arrive !", text: "Trois questions rapides ci-dessous pour confirmer que vous avez bien compris. Identifiez les composants de chaque syllabe." },
  },
  58: {
    prompt_fr:  "남 (sud) — quel est son 초성 (consonne initiale) ?",
    choices_fr: ["ㄴ", "ㅏ", "ㅁ", "ㄱ"],
  },
  59: {
    prompt_fr:  "달 (lune) — identifiez le 받침 (batchim / consonne finale).",
    choices_fr: ["ㄷ", "ㅏ", "ㄹ", "ㄴ"],
  },
  60: {
    prompt_fr:  "봄 (printemps) — quels sont les trois composants dans l'ordre ?",
    choices_fr: ["ㅂ + ㅗ + ㅁ", "ㅂ + ㅜ + ㄴ", "ㅍ + ㅗ + ㄴ", "ㅂ + ㅗ + ㄴ"],
  },

  // --- lesson_complete ---
  61: {
    title_fr:   "Vous pouvez lire les blocs syllabiques coréens !",
    message_fr: "Vous avez maîtrisé les éléments fondamentaux de toute l'écriture coréenne — 5 étapes, 61 pas. Chaque mot coréen est fait exactement de ces blocs. 화이팅 !",
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
console.log(`✓ patched syllable-blocks.json — ${count} field(s) added`);
