#!/usr/bin/env node
'use strict';
const fs   = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'learn', 'data', 'speech-levels.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

// Stage names
const stageNames = {
  1: '합쇼체 (Formel)',
  2: '해요체 (Poli)',
  3: '반말 (Informel)',
  4: 'Choisir un Niveau',
};
for (const s of data.stages) {
  if (s.name_fr == null) s.name_fr = stageNames[s.id];
}

// Step patches
const patches = {
  1: {
    title_fr: 'Aperçu des Niveaux de Langage Coréen',
    body_fr:  "Le coréen possède un système de niveaux de langage (높임말) qui détermine le degré de formalité ou de politesse de votre expression. Le niveau que vous choisissez dépend de la relation sociale, de l'âge, du rang et du contexte de la conversation. Les trois niveaux que vous rencontrerez le plus sont : 합쇼체 (formel poli, utilisé dans les présentations, l'armée et le service client), 해요체 (poli quotidien, le niveau par défaut pour les adultes parlant à des connaissances non proches) et 반말 (langage informel, utilisé avec les amis proches et les personnes plus jeunes). Choisir le mauvais niveau peut paraître impoli, froid ou trop familier.",
    tip_fr:   { label: 'Pourquoi les niveaux de langage importent en Corée', text: 'La Corée est une société hiérarchique façonnée par les valeurs confucéennes — l\'âge, le rang et la relation déterminent tous la façon dont on parle. Utiliser 반말 (langage informel) avec un étranger ou un supérieur est impoli. Utiliser 합쇼체 trop formel avec un ami peut sembler guindé et distant. Choisir le bon niveau est une compétence sociale essentielle.' },
  },
  2: {
    title_fr: '합쇼체 — Le Registre Formel',
    body_fr:  '합쇼체 est le niveau de langage formel le plus élevé en coréen. Il est utilisé dans les journaux télévisés, les ordres militaires, les présentations formelles, le discours du personnel hôtelier/aérien et le service client. Les terminaisons verbales changent en -ㅂ니다/-습니다 pour les déclarations et en -ㅂ니까?/-습니까? pour les questions. Le vocabulaire change aussi — 밥 (nourriture) devient 식사, 있어요 devient 있습니다. Ce niveau signale un respect et un professionnalisme maximum.',
    tip_fr:   { label: 'Où entendre le 합쇼체', text: 'Allumez les informations coréennes (KBS, MBC, SBS) et vous entendrez 합쇼체 partout. Le personnel hôtelier, les annonces des compagnies aériennes, les cérémonies officielles et les contextes militaires utilisent tous ce niveau. C\'est aussi le niveau utilisé dans les documents formels écrits, bien que le style purement écrit (문어체) diffère légèrement.' },
  },
  3:  { meaning_fr: 'est / suis / êtes — terminaison formelle de déclaration' },
  4:  { meaning_fr: 'Merci (formel)' },
  5:  { meaning_fr: 'Bonjour / Comment allez-vous ? (salutation formelle, forme interrogative)' },
  6: {
    prompt_fr:  '합쇼체 se décrit le mieux comme…',
    choices_fr: ['langage informel', 'le niveau de langage le plus formel', 'poli informel', 'argot'],
  },
  7: {
    title_fr: 'Terminaisons Verbales du 합쇼체 (-ㅂ니다/-습니다)',
    body_fr:  'La marque distinctive du 합쇼체 est la terminaison -ㅂ니다/-습니다. Utilisez -ㅂ니다 après les radicaux verbaux se terminant par une voyelle : 가다 → 갑니다 (Je vais). Utilisez -습니다 après les radicaux se terminant par une consonne : 먹다 → 먹습니다 (Je mange). Pour les questions, la terminaison change en -ㅂ니까?/-습니까? : 가다 → 갑니까? (Allez-vous ?). Note de prononciation : 갑니다 se prononce [감니다] par assimilation nasale.',
    tip_fr:   { label: 'Changement de prononciation dans -ㅂ니다', text: '갑니다 (Je vais) s\'écrit 갑니다 mais se prononce 감니다. C\'est parce que ㅂ devant ㄴ change en ㅁ par assimilation nasale (même position de la bouche, flux d\'air nasal). Ce modèle apparaît dans toutes les formes du 합쇼체.' },
  },
  8:  { meaning_fr: 'Je mange / suis en train de manger (formel)' },
  9:  { meaning_fr: 'Je vais / suis en train d\'aller (formel) — prononcé 감니다' },
  10: {
    title_fr: '해요체 — Langage Poli du Quotidien',
    body_fr:  "해요체 est le niveau de langage que vous utiliserez le plus dans la vie coréenne quotidienne. Il est suffisamment poli pour les étrangers et les connaissances, mais assez chaleureux pour sembler naturel. La terminaison -아요/-어요/-해요 est ajoutée au radical verbal. 해요체 est utilisé dans les magasins, avec des collègues avec qui vous n'êtes pas très proches, avec des adultes que vous rencontrez pour la première fois, et dans la plupart des interactions apprenant-locuteur natif. C'est le « poli par défaut » du coréen.",
    tip_fr:   { label: '해요체 est votre réglage par défaut', text: 'En cas de doute, utilisez 해요체. C\'est le niveau le plus sûr et universellement approprié en Corée. Être poliment respectueux ne vous causera jamais de tort. Ne passez à 합쇼체 ou 반말 que lorsque la situation le demande clairement.' },
  },
  11: { meaning_fr: 'Bonjour / Bonne journée (poli, salutation quotidienne)' },
  12: { meaning_fr: 'Merci (poli, moins formel que 감사합니다)' },
  13: { meaning_fr: 'Je mange / suis en train de manger (poli)' },
  14: { meaning_fr: 'Je vais / suis en train d\'aller (poli)' },
  15: {
    prompt_fr:  '해요체 se décrit le mieux comme…',
    choices_fr: ['très formel / coréen de radiodiffusion', 'la forme la plus informelle', 'poli quotidien / langue adulte par défaut', 'honorifique archaïque'],
  },
  16: {
    title_fr: 'Modèle -아요 / -어요',
    body_fr:  "La règle de terminaison du 해요체 : ajoutez -아요 si la dernière voyelle du radical est ㅏ ou ㅗ (voyelles claires), et ajoutez -어요 pour toutes les autres voyelles. Les verbes en 하다 utilisent -해요 à la place. Exemples : 가다 → 가 + 아요 = 가요 (contracté). 먹다 → 먹 + 어요 = 먹어요. 공부하다 → 공부해요. En pratique, 아/어 se contracte souvent avec la voyelle finale du radical : 가 + 아요 → 가요, 오 + 아요 → 와요.",
    tip_fr:   { label: 'Tableau rapide', text: '가다 → 가요. 오다 → 와요. 먹다 → 먹어요. 마시다 → 마셔요. 하다 → 해요. 보다 → 봐요. 자다 → 자요. Les terminaisons suivent un modèle d\'harmonie vocalique — essayez de reconnaître la distinction voyelle claire/sombre dans le radical.' },
  },
  17: { meaning_fr: "C'est bien / J'aime ça (présent poli)" },
  18: {
    prompt_fr:  "Quelle forme de « Je vais » est du 해요체 (poli quotidien) ?",
    choices_fr: ['가', '갑니다', '가요', '가라'],
  },
  19: {
    title_fr: '반말 — Langage Informel',
    body_fr:  "반말 (ban-mal, littéralement « demi-mot ») est le registre informel utilisé entre amis proches du même âge, avec les personnes plus jeunes et au sein de la famille. Il supprime le -요 des terminaisons du 해요체 : 가요 → 가, 먹어요 → 먹어, 좋아요 → 좋아. Le 반말 peut paraître impoli si utilisé avec quelqu'un de plus âgé ou avec un étranger — commencez toujours par 해요체 et passez au 반말 uniquement si l'autre personne l'initie ou le suggère explicitement. Dans les K-dramas, les personnages qui passent du 해요체 au 반말 signalent un grand changement dans leur niveau de proximité.",
    tip_fr:   { label: "Obtenir la permission d'utiliser le 반말", text: "Une façon naturelle de demander la permission : « 말 놓아도 돼요 ? » (Puis-je parler de manière informelle ?) ou « 반말해도 돼요 ? » (C'est bon d'utiliser le 반말 ?). Vous pouvez aussi attendre que l'autre personne passe naturellement en premier — c'est votre invitation." },
  },
  20: { meaning_fr: 'Salut / Au revoir (salutation et au revoir informels)' },
  21: { meaning_fr: 'Merci (informel)' },
  22: { meaning_fr: 'manger / je mange (informel)' },
  23: { meaning_fr: 'aller / je vais (informel)' },
  24: {
    prompt_fr:  'Quelle salutation est du 반말 (informel) ?',
    choices_fr: ['안녕하세요', '안녕하십니까', '안녕', '반갑습니다'],
  },
  25: {
    title_fr: 'Quand Utiliser le 반말 (et Quand NE PAS l\'Utiliser)',
    body_fr:  "Utilisez le 반말 avec : les amis proches du même âge, les frères et sœurs plus jeunes, les élèves plus jeunes, ou les enfants. N'utilisez PAS le 반말 avec : des étrangers, toute personne plus âgée que vous, votre patron ou professeur, le personnel de service, ou les personnes que vous venez de rencontrer (même si elles semblent du même âge). L'erreur que font beaucoup d'apprenants du coréen est de supposer que parce que quelqu'un est amical, le 반말 est approprié. La familiarité et la permission d'utiliser le 반말 sont deux choses séparées — attendez toujours un signal.",
    tip_fr:   { label: 'Une exception : le monologue intérieur', text: 'Quand les Coréens se parlent à eux-mêmes, murmurent, ou écrivent des entrées de journal intime, ils utilisent le 반말 ou même un style neutre sans terminaisons. C\'est naturel et ne s\'adresse à personne — donc aucune politesse n\'est nécessaire. C\'est aussi pourquoi les monologues des dramas et les pensées intérieures sont en 반말.' },
  },
  26: {
    prompt_fr:  'Vous parlez à un inconnu de votre âge dans la rue. Quel niveau devriez-vous utiliser ?',
    choices_fr: ['반말', '해요체', 'Les deux conviennent', 'Seulement 합쇼체'],
  },
  27: {
    title_fr: '문어체 — Style Écrit/Formel',
    body_fr:  "문어체 (mun-eo-che, « style de langue écrite ») est utilisé dans l'écriture formelle — articles académiques, articles de presse, documents juridiques et littérature. La terminaison verbale est -다 (la forme du dictionnaire brute) : 가다, 먹는다, 했다. Cela semble peu naturel dans la conversation orale mais apparaît partout dans le coréen écrit. Les apprenants le rencontrent en lisant des textes coréens et peuvent se demander pourquoi cela diffère de ce qu'on leur a appris — c'est parce que les manuels enseignent les registres parlés, tandis que la lecture nécessite de reconnaître le 문어체.",
    tip_fr:   { label: '문어체 vs 합쇼체', text: 'Les deux sont formels, mais 합쇼체 est pour la parole (locuteur à auditeur) et 문어체 est pour l\'écriture (sans auditeur spécifique). Un présentateur de nouvelles parle en 합쇼체. Un article de journal est en 문어체. Dans les K-dramas, vous entendrez 문어체 quand les personnages lisent à voix haute des livres ou des lettres.' },
  },
  28: { meaning_fr: 'être (copule, forme écrite/dictionnaire)' },
  29: {
    title_fr: 'Tableau Comparatif des Niveaux de Langage',
    body_fr:  "Voici comment la même idée apparaît selon les différents niveaux de langage. « Je mange » : 먹습니다 (formel 합쇼체) → 먹어요 (poli 해요체) → 먹어 (informel 반말) → 먹는다 (écrit 문어체). « Merci » : 감사합니다 (formel) → 감사해요 (poli) → 고마워 (informel). « Je vais » : 갑니다 (formel) → 가요 (poli) → 가 (informel) → 간다 (écrit). Remarquer ces modèles vous aidera à identifier le niveau utilisé par un locuteur lorsque vous regardez des dramas coréens ou écoutez des locuteurs natifs.",
    tip_fr:   { label: 'Utilisez les K-dramas pour entraîner votre oreille', text: 'Les K-dramas sont une mine d\'or pour la pratique des niveaux de langage. Les chefs parlent à leur équipe en 합쇼체. Les amis passent au 반말 entre eux. Les scènes dans les hôpitaux ou les bureaux utilisent 해요체. Si vous remarquez un changement soudain de niveau de langage entre les personnages — c\'est un moment dramatique important.' },
  },
  30: {
    prompt_fr:  "감사합니다 est la forme ___ de « merci »",
    choices_fr: ['반말', '해요체', '합쇼체', '문어체'],
  },
  31: {
    prompt_fr:  "Dans un entretien d'embauche en Corée, quel niveau de langage devriez-vous utiliser ?",
    choices_fr: ['반말', '해요체', '합쇼체', '문어체'],
  },
  32: {
    title_fr: 'Mélanger les Niveaux de Langage — Une Erreur Courante',
    body_fr:  "L'une des erreurs les plus courantes des apprenants est de mélanger les niveaux de langage — en utilisant 먹어요 (해요체) dans une phrase et 먹습니다 (합쇼체) dans la suivante. Les locuteurs natifs le remarquent immédiatement. Cela ressemble à un mélange de formel et d'informel dans le même souffle. Choisissez un niveau pour la conversation et restez-y. La seule exception est le changement intentionnel pour un effet rhétorique (comme un email professionnel qui s'ouvre formellement et se termine chaleureusement), mais même cela suit des modèles clairs.",
    tip_fr:   { label: 'Ne mélangez pas les terminaisons en milieu de phrase', text: 'Incorrect : 저는 학생이에요. 공부합니다. (Mélange de 해요체 et 합쇼체). Correct : 저는 학생이에요. 공부해요. (Tout en 해요체). Ou : 저는 학생입니다. 공부합니다. (Tout en 합쇼체). La cohérence dans une conversation signale la fluidité et la conscience sociale.' },
  },
  33: {
    title_fr:   'Niveaux de Langage Terminés !',
    message_fr: 'Vous avez maîtrisé le système de niveaux de langage coréen — le 합쇼체 formel, le 해요체 quotidien poli, le 반말 informel et le 문어체 écrit. Vous êtes maintenant prêt à lire les situations sociales et à parler au bon niveau.',
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
console.log(`✓ patched speech-levels.json — ${count} field(s) added`);
