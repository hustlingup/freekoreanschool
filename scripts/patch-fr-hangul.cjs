#!/usr/bin/env node
'use strict';
const fs   = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'learn', 'data', 'hangul.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

// Stage names
const stageNames = {
  1: 'Consonnes',
  2: 'Voyelles',
  3: 'Syllabes',
  4: 'Spéciaux',
  5: 'Voyelles Composées',
  6: 'Lire des Mots',
};
for (const s of data.stages) {
  if (s.name_fr == null) s.name_fr = stageNames[s.id];
}

// Step patches
const patches = {
  // --- Stage 1: Consonants (card_reveal) ---
  1:  { hint_fr: "En forme de l'arrière de la gorge qui bloque le flux d'air.", example_meaning_fr: "aller" },
  2:  { hint_fr: "En forme de la pointe de la langue touchant le palais.", example_meaning_fr: "je / moi" },
  3:  { hint_fr: "Comme ㄴ avec un toit — la langue bloque entièrement le palais.", example_meaning_fr: "tout / chaque" },
  4:  { hint_fr: "Un battement — entre le r et le l. La langue frappe légèrement le palais.", example_meaning_fr: "raison (préfixe)" },
  5:  { hint_fr: "En forme de lèvres fermées qui se pressent pour faire le son m.", example_meaning_fr: "cœur / esprit" },
  6:  { hint_fr: "En forme de lèvres qui s'ouvrent pour libérer le son b ou p.", example_meaning_fr: "riz / repas" },
  7:  { hint_fr: "En forme de deux dents — l'air siffle pour faire le son s.", example_meaning_fr: "personne" },
  8:  { hint_fr: "Silencieux au début d'une syllabe. Se prononce ng à la fin.", example_meaning_fr: "enfant" },
  9:  { hint_fr: "Comme le j dans « juge ». La langue appuie derrière les dents supérieures.", example_meaning_fr: "maintenant" },
  10: { hint_fr: "ch aspiré — un souffle d'air sort. Comme le ch en français.", example_meaning_fr: "thé / voiture" },
  11: { hint_fr: "k aspiré — fort souffle d'air. Tenez un mouchoir et il s'agite.", example_meaning_fr: "café" },
  12: { hint_fr: "t aspiré — comme le t au début d'un mot. Fort souffle d'air.", example_meaning_fr: "monter / prendre" },
  13: { hint_fr: "p aspiré — les lèvres s'ouvrent avec de l'air. Comme le p en français.", example_meaning_fr: "oignon vert" },
  14: { hint_fr: "Un h soufflé — comme expirer de la chaleur sur votre main.", example_meaning_fr: "ciel" },

  // --- Stage 1: match_quiz (romanization tokens verbatim) ---
  15: {
    prompt_fr:  "ㄱ se romanise en…",
    choices_fr: ["n", "g/k", "d/t", "m"],
  },
  16: {
    prompt_fr:  "Quelle consonne est SILENCIEUSE au début d'une syllabe ?",
    choices_fr: ["ㄱ", "ㄴ", "ㅇ", "ㅅ"],
  },
  17: {
    prompt_fr:  "ㄴ se romanise en…",
    choices_fr: ["r/l", "m", "n", "b/p"],
  },
  18: {
    prompt_fr:  "Quelle consonne ressemble au j dans « juge » ?",
    choices_fr: ["ㅂ", "ㅈ", "ㅅ", "ㄷ"],
  },
  19: {
    prompt_fr:  "ㅁ se romanise en…",
    choices_fr: ["b", "n", "m", "h"],
  },
  20: {
    prompt_fr:  "ㄹ se romanise en…",
    choices_fr: ["n", "d/t", "r/l", "s"],
  },
  21: {
    prompt_fr:  "밥 (riz) commence par quelle consonne ?",
    choices_fr: ["ㅂ", "ㅍ", "ㅁ", "ㅂ"],
  },

  // --- Stage 2: Vowels (card_reveal, hint_fr only) ---
  22: { hint_fr: "Ouvrez la bouche grand, comme dire « ah » chez le médecin." },
  23: { hint_fr: "Comme ya en français. Le trait supplémentaire signifie qu'un y est ajouté." },
  24: { hint_fr: "Similaire au eu de « peur ». Lèvres légèrement arrondies." },
  25: { hint_fr: "Comme yeo avec des lèvres arrondies. Deux traits = préfixe y." },
  26: { hint_fr: "Comme le o en français. Arrondissez les lèvres comme pour souffler une bougie." },
  27: { hint_fr: "Comme « yo ! » — deux traits ajoutent le y. Très utilisé dans la parole." },
  28: { hint_fr: "Comme ou en français. La ligne pointe vers le BAS — la bouche descend." },
  29: { hint_fr: "Comme yu. Deux traits vers le bas indiquent le préfixe y." },
  30: { hint_fr: "Comme le eu quand on est insatisfait. Lèvres plates, sans arrondir." },
  31: { hint_fr: "Comme i en français. Un simple trait vertical — voyelle haute et antérieure pure." },

  // --- Stage 2: match_quiz (Korean chars verbatim) ---
  32: {
    prompt_fr:  "Quelle voyelle se prononce comme le a (comme dans « pas ») ?",
    choices_fr: ["ㅏ", "ㅗ", "ㅜ", "ㅣ"],
  },
  33: {
    prompt_fr:  "Quelle voyelle se prononce comme le o (comme dans « beau ») ?",
    choices_fr: ["ㅓ", "ㅗ", "ㅡ", "ㅑ"],
  },
  34: {
    prompt_fr:  "Quelle voyelle se prononce comme le i (comme dans « vie ») ?",
    choices_fr: ["ㅓ", "ㅛ", "ㅣ", "ㅠ"],
  },
  35: {
    prompt_fr:  "ㅠ se romanise en…",
    choices_fr: ["u", "eu", "yo", "yu"],
  },
  36: {
    prompt_fr:  "ㅡ se prononce comme…",
    choices_fr: ["ya", "i", "eu", "yo"],
  },

  // --- Stage 3: syllable_builder (meaning_fr only) ---
  37: { meaning_fr: "ba — comme dans 바나나 (banane)" },
  38: { meaning_fr: "na — comme dans 나 (moi)" },
  39: { meaning_fr: "sa — comme dans 사랑 (amour)" },
  40: { meaning_fr: "go — comme dans 고마워 (merci)" },
  41: { meaning_fr: "ha — comme dans 하늘 (ciel)" },
  42: { meaning_fr: "mu — comme dans 무엇 (quoi)" },

  // --- Stage 4: Tense/aspirated consonants (card_reveal, hint_fr only) ---
  43: { hint_fr: "k tendu — retenez votre souffle puis relâchez. Pas de souffle d'air." },
  44: { hint_fr: "t tendu — la gorge se resserre avant de relâcher. Distinct de ㄷ et ㅌ." },
  45: { hint_fr: "p tendu — les lèvres pressent fort avant de s'ouvrir. Pas d'air qui s'échappe." },
  46: { hint_fr: "s tendu — un sifflement aigu et serré. Utilisé dans 있다 (exister / avoir)." },
  47: { hint_fr: "j tendu — plus aigu et abrupt que ㅈ. Pas d'explosion d'air." },
  48: { hint_fr: "Aspiré — un fort souffle d'air suit la consonne." },
  49: { hint_fr: "Aspiré — la langue se détache du palais avec un souffle d'air." },
  50: { hint_fr: "Aspiré — les lèvres s'ouvrent brusquement avec un souffle d'air." },
  51: { hint_fr: "ch aspiré — comme au début d'un mot ch. L'air sort." },
  52: { hint_fr: "Une consonne très aspirée. Le plus d'air de toutes les consonnes coréennes." },

  // --- Stage 4: match_quiz ---
  53: {
    prompt_fr:  "ㄲ se romanise en…",
    choices_fr: ["k", "kk", "g/k", "ng"],
  },
  54: {
    prompt_fr:  "Laquelle est une consonne TENDUE (쌍자음) ?",
    choices_fr: ["ㅋ", "ㅌ", "ㅆ", "ㅊ"],
  },
  55: {
    prompt_fr:  "ㅃ se romanise en…",
    choices_fr: ["b", "p", "pp", "bb"],
  },
  56: {
    prompt_fr:  "Les consonnes aspirées sont produites avec…",
    choices_fr: ["Pas d'air", "Un fort souffle d'air", "Une gorge tendue", "Un son nasal"],
  },
  57: {
    prompt_fr:  "ㅉ se romanise en…",
    choices_fr: ["ss", "ch", "jj", "tt"],
  },

  // --- Stage 5: Compound vowels (card_reveal, hint_fr only) ---
  58: { hint_fr: "ㅏ + ㅣ combinés. Comme le é en français. Coréen moderne = même que 에." },
  59: { hint_fr: "ㅓ + ㅣ combinés. Comme le é en français. Se prononce pareil que 애 aujourd'hui." },
  60: { hint_fr: "ㅑ + ㅣ. Rare — apparaît dans 얘 (cet enfant, familier)." },
  61: { hint_fr: "ㅕ + ㅣ. Comme ye. 예쁘다 = beau/belle." },
  62: { hint_fr: "ㅗ + ㅏ. Comme wa en français. 와 ! = Ouah !" },
  63: { hint_fr: "ㅗ + ㅐ. Se prononce wae. 왜 = pourquoi." },
  64: { hint_fr: "ㅗ + ㅣ. Comme we. 외국인 = étranger." },
  65: { hint_fr: "ㅜ + ㅓ. Comme wo. 뭐 = quoi (familier)." },
  66: { hint_fr: "ㅜ + ㅔ. Comme we. Très rare en coréen." },
  67: { hint_fr: "ㅜ + ㅣ. Comme wi. 위 = au-dessus / estomac." },
  68: { hint_fr: "ㅡ + ㅣ. Une diphtongue unique. 의사 = médecin. Utilisé comme particule possessive 의." },

  // --- Stage 5: match_quiz ---
  69: {
    prompt_fr:  "ㅘ se romanise en…",
    choices_fr: ["wo", "wa", "wae", "oe"],
  },
  70: {
    prompt_fr:  "왜 signifie…",
    choices_fr: ["quoi", "qui", "pourquoi", "où"],
  },
  71: {
    prompt_fr:  "ㅢ se romanise en…",
    choices_fr: ["wi", "ui", "we", "eu"],
  },
  72: {
    prompt_fr:  "Quelle voyelle composée utilise ㅗ + ㅣ ?",
    choices_fr: ["ㅘ", "ㅙ", "ㅚ", "ㅝ"],
  },
  73: {
    prompt_fr:  "예 se romanise en…",
    choices_fr: ["yae", "ye", "ae", "e"],
  },

  // --- Stage 6: listen_repeat (meaning_fr only) ---
  74: { meaning_fr: "bonjour / au revoir (informel)" },
  75: { meaning_fr: "école" },
  76: { meaning_fr: "Corée" },
  77: { meaning_fr: "amour" },
  78: { meaning_fr: "eau" },
  79: { meaning_fr: "riz / repas" },
  80: { meaning_fr: "personne" },
  81: { meaning_fr: "ami(e)" },
  82: { meaning_fr: "ciel" },
  83: { meaning_fr: "merci (informel)" },

  // --- lesson_complete ---
  84: {
    title_fr:   "Vous pouvez lire le coréen !",
    message_fr: "Travail incroyable — vous avez complété les 6 étapes du Hangul. Vous pouvez maintenant lire et écrire tous les caractères de l'alphabet coréen. 화이팅 !",
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
console.log(`✓ patched hangul.json — ${count} field(s) added`);
