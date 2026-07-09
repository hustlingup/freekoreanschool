#!/usr/bin/env node
'use strict';
const fs   = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'learn', 'data', 'emotions.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

// Stage names
const stageNames = {
  1: 'Émotions Fondamentales',
  2: 'Exprimer ses Sentiments',
  3: 'Émotions Complexes',
  4: 'Phrases Émotionnelles',
};
for (const s of data.stages) {
  if (s.name_fr == null) s.name_fr = stageNames[s.id];
}

// Step patches
const patches = {
  1: {
    title_fr: 'Les Émotions en Coréen (감정)',
    body_fr:  "En coréen, les mots exprimant les émotions sont principalement des adjectifs sous leur forme de base. Contrairement au français (« Je suis heureux »), les adjectifs coréens fonctionnent comme des verbes et se conjuguent directement : 행복해요 (Je suis heureux / C'est bien), sans avoir besoin d'un verbe séparé. La forme du dictionnaire se termine par -다 : 행복하다, 슬프다, 무섭다. Retirez -다 et ajoutez -아요/-어요 pour le présent poli. Le vocabulaire des émotions est particulièrement utile pour parler des K-dramas, de la vie quotidienne et des sentiments personnels.",
    tip_fr:   { label: 'Les adjectifs se conjuguent comme des verbes', text: '행복하다 → 행복해요 (Je suis heureux). 슬프다 → 슬퍼요 (Je suis triste). 피곤하다 → 피곤해요 (Je suis fatigué). La terminaison -아요/-어요 rend l\'adjectif poli et au présent simultanément.' },
  },
  2:  { meaning_fr: 'être heureux (forme du dictionnaire)' },
  3:  { meaning_fr: 'être triste (forme du dictionnaire)' },
  4:  { meaning_fr: 'être en colère (litt. : la colère sort)' },
  5:  { meaning_fr: 'avoir peur / faire peur' },
  6: {
    prompt_fr:  "Quel mot signifie « être heureux » ?",
    choices_fr: ['슬프다', '무섭다', '행복하다', '화가 나다'],
  },
  7: {
    title_fr: "Conjuguer les Adjectifs d'Émotion",
    body_fr:  "Pour utiliser les adjectifs d'émotion dans une conversation polie, retirez -다 de la forme du dictionnaire et ajoutez la terminaison polie du présent. Pour les radicaux se terminant par 하 : 하다 → 해요 (행복하다 → 행복해요). Pour les radicaux dont la dernière voyelle est une voyelle claire (ㅏ, ㅗ) : ajoutez -아요. Pour tous les autres : ajoutez -어요, souvent contracté — 슬프다 → 슬프 + 어요 → 슬퍼요, 무섭다 → 무서워요. Le même modèle s'applique à la plupart des verbes descriptifs coréens (adjectifs).",
    tip_fr:   { label: 'Tableau de conjugaison rapide', text: '행복하다 → 행복해요. 슬프다 → 슬퍼요. 화나다 → 화나요. 무섭다 → 무서워요. 피곤하다 → 피곤해요. 기쁘다 → 기뻐요. Notez que 슬프다 perd le 으 avant -어요.' },
  },
  8:  { meaning_fr: 'Je suis heureux / C\'est heureux (présent poli)' },
  9:  { meaning_fr: 'Je suis triste (présent poli)' },
  10: {
    title_fr: "D'Autres Mots pour les Sentiments (감정 어휘)",
    body_fr:  "Le coréen possède un riche vocabulaire émotionnel au-delà des bases. 기쁘다 (être content/joyeux) exprime un bonheur légèrement plus fort ou plus spécifique que 행복하다. 걱정되다 (être inquiet) signifie littéralement « l'inquiétude arrive ». 신나다 (être excité/enthousiaste) est couramment utilisé pour les situations énergiques — concerts, sports, fêtes. 피곤하다 (être fatigué) est essentiel pour la vie quotidienne, surtout quand on explique qu'on ne peut pas faire quelque chose.",
    tip_fr:   { label: '신나다 dans la culture pop', text: '신나다 et 신나요 sont omniprésents dans la culture pop coréenne. Les chansons de K-pop utilisent souvent 신나 pour décrire un rythme ou une ambiance excitante. Vous entendrez aussi 신난다 ! comme exclamation (Comme c\'est excitant !) lors d\'événements et de fêtes.' },
  },
  11: { meaning_fr: 'être content / joyeux' },
  12: { meaning_fr: 'être inquiet' },
  13: { meaning_fr: 'être fatigué / épuisé' },
  14: { meaning_fr: 'être excité / enthousiaste' },
  15: {
    prompt_fr:  "Quel mot signifie « être fatigué » ?",
    choices_fr: ['기쁘다', '신나다', '피곤하다', '걱정되다'],
  },
  16: {
    title_fr: '기분 — Humeur et Sentiment',
    body_fr:  "기분 (gibun) est le mot clé pour décrire votre humeur ou votre état émotionnel général. 기분이 좋다 = se sentir bien / être de bonne humeur. 기분이 나쁘다 = se sentir mal / être de mauvaise humeur. 기분 peut décrire le ton émotionnel de manière plus générale que les mots d'émotion individuels — il s'agit de votre état d'ensemble. Vous entendrez 기분이 어때요 ? (Comment vous sentez-vous ?) dans la conversation quotidienne.",
    tip_fr:   { label: '기분 vs 감정', text: '기분 = humeur, état émotionnel général (contextuel, peut changer). 감정 = émotion (sentiment plus spécifique comme la colère, la joie, la peur). 기분이 좋아요 = Je me sens bien en ce moment. 감정을 표현하다 = exprimer une émotion.' },
  },
  17: { meaning_fr: 'Je me sens bien / Je suis de bonne humeur' },
  18: {
    prompt_fr:  '기분이 좋아요 signifie…',
    choices_fr: ['Je me sens mal', 'Je me sens bien', "J'ai faim", 'Je suis fatigué'],
  },
  19: {
    title_fr: 'Émotions Plus Profondes (깊은 감정)',
    body_fr:  "Le coréen possède plusieurs mots d'émotion qui n'ont pas d'équivalent en un seul mot en français. 그립다 (geuripda) décrit le fait de manquer quelqu'un ou quelque chose — la nostalgie d'une personne ou d'un lieu aimé. 외롭다 (oeropda) est la solitude, avec une profondeur culturelle d'isolement. 부끄럽다 (bukkeureupda) signifie la gêne ou la timidité. 뿌듯하다 (ppudeuthada) est la chaude fierté ou satisfaction de l'accomplissement — ce que vous ressentez quand vous terminez quelque chose de difficile ou regardez quelqu'un qui vous tient à cœur réussir.",
    tip_fr:   { label: '한 (Han) — tristesse coréenne intraduisible', text: "한 (han) est une émotion culturellement spécifique : une profonde tristesse mêlée de résilience, enracinée dans la souffrance historique mais transformée en énergie créatrice. On l'entend dans le pansori (opéra folklorique coréen), on la décrit dans la poésie, et elle est évoquée dans les discussions sur l'identité coréenne. Ce n'est pas un mot à utiliser à la légère, mais il est essentiel pour la compréhension culturelle." },
  },
  20: { meaning_fr: 'manquer à quelqu\'un/quelque chose (nostalgie)' },
  21: { meaning_fr: 'se sentir seul' },
  22: { meaning_fr: 'être gêné / timide' },
  23: { meaning_fr: 'se sentir fier / accompli (chaleureux sentiment d\'accomplissement)' },
  24: {
    prompt_fr:  '그립다 signifie…',
    choices_fr: ['être content', 'manquer à quelqu\'un (nostalgie)', 'être fatigué', 'se sentir seul'],
  },
  25: { meaning_fr: 'ressentir un frémissement d\'excitation / le cœur qui palpite (anticipation romantique)' },
  26: {
    prompt_fr:  '뿌듯하다 signifie…',
    choices_fr: ['être gêné', 'se sentir fier/accompli', 'se sentir seul', 'manquer à quelqu\'un'],
  },
  27: {
    title_fr: 'Structures de Phrases Émotionnelles Courantes',
    body_fr:  '« 보고 싶어요 » (Tu me manques / Je veux te voir) utilise 보다 (voir) + -고 싶다 (vouloir). « 감동받았어요 » (J\'ai été touché/ému) utilise 감동 (émotion profonde) + 받다 (recevoir). « 괜찮아요 » (Je vais bien / C\'est bon) est l\'une des phrases les plus polyvalentes — utilisée pour « je vais bien », « c\'est bon », « pas de problème » et « ça ne fait rien ».',
    tip_fr:   { label: '괜찮아요 — la phrase à tout faire', text: '괜찮아요 signifie littéralement « c\'est bien/correct ». Utilisez-le pour rassurer quelqu\'un que vous allez bien (après une chute), pour accepter une offre que vous aviez refusée, pour dire « non merci », ou pour exprimer « c\'est acceptable ». Maîtriser son ton est essentiel — mêmes mots, messages très différents.' },
  },
  28: { meaning_fr: 'Tu me manques / Je veux te voir' },
  29: { meaning_fr: 'J\'ai été touché / ému (émotionnellement)' },
  30: { meaning_fr: 'Je vais bien / C\'est bon / Pas de problème' },
  31: {
    prompt_fr:  '보고 싶어요 signifie…',
    choices_fr: ['Je vais bien', 'J\'ai été ému', 'Tu me manques / Je veux te voir', 'Je me sens seul'],
  },
  32: { meaning_fr: 'Courage ! / Tiens bon ! (litt. : mets de la force)' },
  33: {
    title_fr:   'Émotions Terminées !',
    message_fr: 'Vous avez exploré le vocabulaire des émotions en coréen — des sentiments basiques aux mots culturellement riches comme 그립다, 뿌듯하다 et 설레다. Votre coréen émotionnel progresse !',
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
console.log(`✓ patched emotions.json — ${count} field(s) added`);
