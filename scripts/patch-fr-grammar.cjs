#!/usr/bin/env node
'use strict';
const fs   = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'learn', 'data', 'grammar.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

// Stage names
const stageNames = {
  1:  'Phrase',
  2:  'Particules',
  3:  'Conjugaison',
  4:  'Négation',
  5:  'Questions',
  6:  'Phrases Clés',
  7:  'Connecteurs',
  8:  'Et / Avec',
  9:  'À / De',
  10: 'Heure',
  11: 'Classificateurs',
  12: 'Progressif',
  13: 'Présentation',
  14: 'Dates',
  15: 'Adverbes',
  16: 'Nominalisateur',
  17: 'Comparatifs',
  18: 'Aimer',
  19: 'Encore / Déjà',
  20: 'Indéfini',
  21: 'Impératif',
  22: 'Interdiction',
  23: 'Méthode',
  24: 'Bon / Mauvais',
  25: 'Tout / Plus',
  26: '-도 Avancé',
};
for (const s of data.stages) {
  if (s.name_fr == null) s.name_fr = stageNames[s.id];
}

// Step patches
const patches = {
  // --- Stage 1: Phrase ---
  1: {
    title_fr: "Ordre des Mots — SOV",
    body_fr:  "Le coréen suit l'ordre Sujet → Objet → Verbe (SOV). Le verbe vient toujours EN DERNIER.",
    rules_fr: [
      "Français (SVO) : Je mange du riz.",
      "Coréen (SOV) : 나는 밥을 먹어요. (Je riz mange.)",
      "Conseil : Écoutez le dernier mot — c'est le verbe, l'action !",
    ],
    tip_fr:   { label: "Conseil Grammatical", text: "Une fois que vous savez que le verbe vient en dernier, tout s'enchaîne. Le reste de la phrase peut se réarranger — les Coréens utilisent des particules pour garder les choses claires." },
  },
  2:  { meaning_fr: "Je mange du riz. (Sujet + Objet + Verbe)" },
  3: {
    prompt_fr:  "Dans une phrase coréenne, le verbe vient toujours…",
    choices_fr: ["En dernier", "En premier", "En deuxième position", "N'importe où"],
  },

  // --- Stage 2: Particules ---
  4: {
    title_fr: "Les Particules Coréennes",
    body_fr:  "Les particules s'attachent aux noms pour indiquer leur rôle : thème, sujet, objet, lieu. Elles remplacent l'ordre fixe des mots.",
    rules_fr: [
      "은/는 → Marqueur de thème (은 après consonne, 는 après voyelle)",
      "이/가 → Marqueur de sujet (이 après consonne, 가 après voyelle)",
      "을/를 → Marqueur d'objet (을 après consonne, 를 après voyelle)",
      "에 → Lieu / Direction",
      "에서 → Lieu de l'action",
      "의 → Possessif (de)",
    ],
  },
  5:  { meaning_fr: "Je suis étudiant(e). (는 = marqueur de thème)" },
  6: {
    prompt_fr:  "은/는 marque le/la ___",
    choices_fr: ["Thème", "Sujet", "Objet", "Lieu"],
  },
  7:  { meaning_fr: "La pluie vient. / Il pleut. (가 = marqueur de sujet)" },
  8: {
    prompt_fr:  "Pour marquer 밥 (riz) comme l'OBJET : 밥___ 먹어요",
    choices_fr: ["을", "는", "가", "에"],
  },
  9:  { meaning_fr: "Je bois du café au café. (에서 = lieu de l'action)" },
  10: {
    prompt_fr:  "에서 marque…",
    choices_fr: ["Lieu de l'action", "Destination", "Thème", "Objet"],
  },

  // --- Stage 3: Conjugaison ---
  11: {
    title_fr: "Verbes — Forme du Dictionnaire",
    body_fr:  "Tous les verbes coréens en forme de dictionnaire se terminent par 다 (da). Retirez 다 pour obtenir le radical du verbe, puis ajoutez une terminaison.",
    rules_fr: [
      "가다 (aller) → radical : 가-",
      "먹다 (manger) → radical : 먹-",
      "공부하다 (étudier) → radical : 공부하-",
      "하다 (faire) → radical : 하-",
    ],
  },
  12: {
    title_fr: "Présent : -아요 / -어요",
    body_fr:  "Ajoutez -아요 après les radicaux en ㅏ ou ㅗ. Ajoutez -어요 pour tous les autres. Les verbes en 하다 utilisent -해요.",
    rules_fr: [
      "가다 → 가요 (aller · radical ㅏ)",
      "오다 → 와요 (venir · radical ㅗ)",
      "먹다 → 먹어요 (manger · autres)",
      "마시다 → 마셔요 (boire · autres)",
      "공부하다 → 공부해요 (étudier · 하다)",
    ],
    tip_fr:   { label: "Règle des Voyelles", text: "ㅏ et ㅗ sont des voyelles « claires » → -아요. Toutes les autres voyelles sont « sombres » → -어요. Une fois que vous connaissez la voyelle du radical, la conjugaison est automatique." },
  },
  13: { meaning_fr: "Je vais / Allons-y. (가다 → 가요, présent poli)" },
  14: { meaning_fr: "Je mange. (먹다 → 먹어요, présent poli)" },
  15: {
    prompt_fr:  "가다 (aller) → forme polie du présent ?",
    choices_fr: ["가요", "가아요", "가어요", "갔어요"],
  },
  16: {
    title_fr: "Passé : -았어요 / -었어요",
    body_fr:  "Ajoutez -았어요 après les radicaux en ㅏ/ㅗ et -었어요 pour les autres. 하다 → 했어요.",
    rules_fr: [
      "가다 → 갔어요 (suis allé)",
      "오다 → 왔어요 (suis venu)",
      "먹다 → 먹었어요 (ai mangé)",
      "마시다 → 마셨어요 (ai bu)",
      "공부하다 → 공부했어요 (ai étudié)",
    ],
  },
  17: { meaning_fr: "Je suis allé(e) à Séoul." },
  18: {
    prompt_fr:  "Passé de 먹다 (manger) ?",
    choices_fr: ["먹었어요", "먹아요", "먹어요", "먹을 거예요"],
  },
  19: {
    title_fr: "Futur : -(으)ㄹ 거예요",
    body_fr:  "Ajoutez -(으)ㄹ 거예요 au radical du verbe pour parler de plans ou de prédictions futurs.",
    rules_fr: [
      "가다 → 갈 거예요 (irai)",
      "먹다 → 먹을 거예요 (mangerai)",
      "공부하다 → 공부할 거예요 (étudierai)",
    ],
  },
  20: {
    prompt_fr:  "가다 (aller) → futur ?",
    choices_fr: ["갈 거예요", "갔어요", "가요", "가지 마세요"],
  },

  // --- Stage 4: Négation ---
  21: {
    title_fr: "Construire des Phrases Négatives",
    body_fr:  "Négation courte : 안 + verbe. Négation longue : radical du verbe + 지 않아요. Ne pas pouvoir : 못 + verbe.",
    rules_fr: [
      "안 먹어요 (je ne mange pas — forme courte)",
      "먹지 않아요 (je ne mange pas — forme longue)",
      "못 가요 (je ne peux pas aller — incapable)",
    ],
  },
  22: {
    prompt_fr:  "« Je ne mange pas » — forme de négation courte",
    choices_fr: ["안 먹어요", "먹지 않아요", "못 먹어요", "안 가요"],
  },

  // --- Stage 5: Questions ---
  23: {
    title_fr: "Former des Questions",
    body_fr:  "Les questions coréennes utilisent le MÊME ordre des mots que les déclarations — ajoutez simplement une intonation montante (↑) ou un point d'interrogation.",
    rules_fr: [
      "뭐 / 무엇 — Quoi / Que",
      "누구 — Qui",
      "어디 — Où",
      "언제 — Quand",
      "왜 — Pourquoi",
      "어떻게 — Comment",
      "얼마 — Combien",
      "몇 — Combien (nombre)",
    ],
    tip_fr:   { label: "Conseil Grammatical", text: "밥을 먹어요 = Je mange du riz. 밥을 먹어요 ? = Tu manges du riz ? Les mêmes mots — juste une intonation montante à la fin. Pas d'inversion comme en français !" },
  },
  24: { meaning_fr: "Comment vous appelez-vous ? / Quel est votre prénom ?" },
  25: {
    prompt_fr:  "« Où » en coréen ?",
    choices_fr: ["어디", "뭐", "왜", "언제"],
  },

  // --- Stage 6: Phrases Clés ---
  26: {
    title_fr: "Phrases Grammaticales Essentielles",
    body_fr:  "Maîtrisez ces 6 structures pour exprimer les idées les plus courantes dans les conversations en coréen.",
    rules_fr: [
      "~이에요/예요 — est/suis/es (nom) : 학생이에요 (Je suis étudiant)",
      "~고 싶어요 — vouloir : 한국에 가고 싶어요 (Je veux aller en Corée)",
      "~ㄹ/을 수 있어요 — pouvoir : 한국어를 할 수 있어요 (Je peux parler coréen)",
      "~아/어야 해요 — devoir : 공부해야 해요 (Je dois étudier)",
      "~(으)면 — si/quand : 비가 오면 집에 있어요 (S'il pleut, je reste à la maison)",
      "~때문에 — à cause de : 비 때문에 못 가요 (Je ne peux pas y aller à cause de la pluie)",
    ],
  },
  27: {
    prompt_fr:  "Structure pour « Je veux aller en Corée » : 한국에 ___",
    choices_fr: ["가고 싶어요", "가야 해요", "갈 거예요", "갈 수 있어요"],
  },

  // --- Stage 7: Connecteurs ---
  28: {
    title_fr: "Conjonctions de Coordination",
    body_fr:  "Ces 4 conjonctions connectent des phrases. Placez-les au DÉBUT de la deuxième phrase.",
    rules_fr: [
      "그리고 — Et / Et ensuite (ajoute de l'information ou une séquence)",
      "그래서 — Alors / Donc (cause → résultat)",
      "그렇지만 — Mais / Cependant (contraste fort, formel)",
      "그런데 — Mais / Au fait (contraste doux, familier — le plus courant !)",
    ],
    tip_fr:   { label: "Conseil d'Utilisation", text: "그런데 est l'un des mots les plus courants du coréen oral — il adoucit le contraste et change les sujets naturellement. 그렇지만 est plus fort et plus formel." },
  },
  29: { meaning_fr: "Il a plu. Alors je suis resté(e) à la maison." },
  30: {
    prompt_fr:  "Contraste doux ou changement de sujet — le plus courant en coréen oral ?",
    choices_fr: ["그런데", "그렇지만", "그래서", "그리고"],
  },

  // --- Stage 8: Et/Avec ---
  31: {
    title_fr: "Et, Avec",
    body_fr:  "Utilisez ces particules entre les noms (pas entre les phrases) pour signifier « et » ou « avec ».",
    rules_fr: [
      "-하고 — après n'importe quel nom, neutre/familier : 친구하고 갔어요 (suis allé avec un ami)",
      "-(이)랑 — 이랑 (consonne) / 랑 (voyelle), très familier : 오빠랑 놀았어요 (ai joué avec mon grand frère)",
      "-와/과 — 와 (voyelle) / 과 (consonne), formel/écrit : 선생님과 상담했어요 (ai consulté avec le professeur)",
    ],
  },

  // --- Stage 9: À/De ---
  32: {
    title_fr: "À / De Quelqu'un",
    body_fr:  "Utilisez des particules directionnelles de personne quand vous donnez à ou recevez de quelqu'un, pas d'un lieu.",
    rules_fr: [
      "-한테 — à (une personne) : 친구한테 전화했어요 (ai appelé mon ami)",
      "-한테서 — de (une personne) : 선생님한테서 배웠어요 (ai appris du professeur)",
      "-에게 / -에게서 — équivalents formels",
      "-께 — à (honorifique, pour les aînés) : 선생님께 드렸어요",
    ],
  },

  // --- Stage 10: Heure ---
  33: {
    title_fr: "Dire l'Heure",
    body_fr:  "Utilisez les nombres coréens NATIFS pour les heures (시) et les nombres SINO-CORÉENS pour les minutes (분). AM = 오전, PM = 오후.",
    rules_fr: [
      "Heures (시) : 한(1), 두(2), 세(3), 네(4), 다섯(5)... + 시",
      "Minutes (분) : 일(1), 이(2), 삼(3), 사(4), 오(5)... + 분",
      "Et demie : 반 — 세 시 반 = 3h30",
      "Exemple : 오후 두 시 삼십 분 = 14h30",
    ],
    tip_fr:   { label: "Schéma Clé", text: "Les heures utilisent les nombres coréens natifs (한, 두, 세...). Les minutes utilisent les nombres sino-coréens (일, 이, 삼...). Et demie = 반. AM = 오전, PM = 오후." },
  },
  34: { meaning_fr: "Quelle heure est-il maintenant ?" },
  35: {
    prompt_fr:  "Les heures en coréen utilisent quel système de numérotation ?",
    choices_fr: ["Coréen natif (한, 두, 세...)", "Sino-coréen (일, 이, 삼...)", "L'un ou l'autre", "Chiffres arabes"],
  },

  // --- Stage 11: Classificateurs ---
  36: {
    title_fr: "Classificateurs",
    body_fr:  "Le coréen utilise des classificateurs spécifiques après [Nom] + [Nombre]. Les nombres coréens natifs (한, 두, 세...) sont utilisés avec la plupart des classificateurs.",
    rules_fr: [
      "개 — objets en général : 사과 세 개 (3 pommes)",
      "명 — personnes (neutre) : 학생 두 명 (2 étudiants)",
      "분 — personnes (honorifique) : 손님 두 분 (2 invités)",
      "마리 — animaux : 고양이 한 마리 (1 chat)",
      "권 — livres : 책 세 권 (3 livres)",
      "잔 — tasses/boissons : 커피 두 잔 (2 cafés)",
      "번 — fois/tours : 세 번 (3 fois)",
    ],
  },
  37: { meaning_fr: "S'il vous plaît, donnez-moi trois pommes." },
  38: {
    prompt_fr:  "Classificateur pour les personnes (neutre) ?",
    choices_fr: ["명", "개", "마리", "잔"],
  },

  // --- Stage 12: Progressif ---
  39: {
    title_fr: "Présent Progressif",
    body_fr:  "Ajoutez -고 있어요 au radical du verbe pour dire que quelqu'un EST EN TRAIN DE faire quelque chose (la forme « -ant » du coréen).",
    rules_fr: [
      "먹다 → 먹고 있어요 (est en train de manger)",
      "가다 → 가고 있어요 (est en train d'aller)",
      "공부하다 → 공부하고 있어요 (est en train d'étudier)",
      "읽다 → 읽고 있어요 (est en train de lire)",
    ],
    tip_fr:   { label: "Progressif vs Simple", text: "먹어요 = je mange (général ou maintenant, selon le contexte). 먹고 있어요 = je suis en train de manger (spécifiquement en cours en ce moment). Le progressif ajoute « en cours d'action »." },
  },
  40: { meaning_fr: "Je suis en train de manger en ce moment." },
  41: {
    prompt_fr:  "« est en train d'étudier » → 공부하다 + -고 있어요 =",
    choices_fr: ["공부하고 있어요", "공부고 있어요", "공부하고 있다", "공부해요"],
  },

  // --- Stage 13: Présentation ---
  42: {
    title_fr: "Présentation Personnelle",
    body_fr:  "Vocabulaire clé : 이름 (prénom), 나이 (âge), 나라 (pays), 직업 (métier), 취미 (passe-temps), 고향 (ville natale).",
    rules_fr: [
      "안녕하세요 ! 저는 [prénom]이에요/예요.",
      "저는 [나라]에서 왔어요. (Je viens de [pays].)",
      "저는 [직업]이에요. (Je suis [métier].)",
      "제 취미는 [passe-temps]예요. (Mon passe-temps est [passe-temps].)",
      "잘 부탁드려요 ! (Enchanté(e) !)",
    ],
    tip_fr:   { label: "Modèle", text: "Utilisez 안녕하세요 + 잘 부탁드려요 pour les contextes formels. Avec des amis ou des pairs : 안녕 ! + 잘 부탁해 ! Inclinez-vous légèrement quand vous vous présentez en personne." },
  },

  // --- Stage 14: Dates ---
  43: {
    title_fr: "Dates et Mois",
    body_fr:  "Les dates coréennes utilisent les nombres sino-coréens dans l'ordre Année → Mois → Jour. Juin = 유월, Octobre = 시월 (exceptions).",
    rules_fr: [
      "일월(1월), 이월(2월), 삼월(3월), 사월(4월), 오월(5월), 유월(6월)",
      "칠월(7월), 팔월(8월), 구월(9월), 시월(10월), 십일월(11월), 십이월(12월)",
      "Format de date : 2026년 6월 16일 (16 juin 2026)",
      "오늘이 며칠이에요 ? — Quel jour sommes-nous ?",
    ],
  },

  // --- Stage 15: Adverbes ---
  44: {
    title_fr: "Adverbes de Degré",
    body_fr:  "Les adverbes de degré se placent directement avant le mot qu'ils modifient : 조금 (un peu), 정말 (vraiment), 아주 (très), 많이 (beaucoup).",
    rules_fr: [
      "조금 / 좀 — un peu (좀 est plus doux/familier)",
      "정말 — vraiment / réellement (neutre)",
      "진짜 — vraiment (familier, sens plus fort)",
      "아주 — très",
      "많이 — beaucoup",
      "별로 + négatif — pas vraiment (별로 안 좋아요 = Je n'aime pas vraiment)",
      "전혀 + négatif — pas du tout (전혀 모르겠어요 = Je n'ai aucune idée)",
    ],
    tip_fr:   { label: "Adverbes Négatifs", text: "별로 et 전혀 DOIVENT être utilisés avec un verbe négatif (안, 못, 없다, 모르다). Dire 별로 좋아요 (sans négation) est agrammatical. Pensez-y comme « pas vraiment » et « pas du tout »." },
  },
  45: { meaning_fr: "C'est vraiment délicieux !" },
  46: {
    prompt_fr:  "별로 et 전혀 doivent être utilisés avec…",
    choices_fr: ["Un verbe négatif", "Un verbe positif", "Seulement un adjectif", "Seulement le passé"],
  },

  // --- Stage 16: Nominalisateur ---
  47: {
    title_fr: "Nominalisateur : -는 것",
    body_fr:  "Ajouter -는 것 à un radical verbal crée un groupe nominal — « l'acte de faire ~ ». Cela transforme les verbes en noms.",
    rules_fr: [
      "먹는 것 — l'acte de manger",
      "배우는 것 — l'acte d'apprendre",
      "한국어를 배우는 것이 재미있어요 — Apprendre le coréen est intéressant",
      "요리하는 것을 좋아해요 — J'aime cuisiner (l'acte de cuisiner)",
    ],
    tip_fr:   { label: "Formes de Temps", text: "-는 것 (présent/habituel) · -(으)ㄴ 것 (passé/accompli) · -(으)ㄹ 것 (futur/prévu). La forme présente est la plus courante dans le discours quotidien." },
  },
  48: { meaning_fr: "Apprendre le coréen est intéressant." },
  49: {
    prompt_fr:  "-는 것 transforme un verbe en…",
    choices_fr: ["Un groupe nominal", "Passé", "Futur", "Une question"],
  },

  // --- Stage 17: Comparatifs ---
  50: {
    title_fr: "Comparatifs",
    body_fr:  "Structure : [A]이/가 [B]보다 더 [adjectif]. 보다 signifie « que » et 더 signifie « plus ».",
    rules_fr: [
      "한국어가 영어보다 더 어려워요 — Le coréen est plus difficile que l'anglais",
      "오늘이 어제보다 더 더워요 — Aujourd'hui il fait plus chaud qu'hier",
      "더 peut être omis en discours informel : 한국어가 영어보다 어려워요",
    ],
  },
  51: { meaning_fr: "Le coréen est plus difficile que le japonais." },
  52: {
    prompt_fr:  "Comment dire « plus » dans une comparaison coréenne ?",
    choices_fr: ["더", "많이", "아주", "보다"],
  },

  // --- Stage 18: Aimer ---
  53: {
    title_fr: "좋다 vs 좋아하다",
    body_fr:  "좋다 utilise la particule de sujet (이/가) : 한국어가 좋아요. 좋아하다 utilise la particule d'objet (을/를) : 한국어를 좋아해요.",
    rules_fr: [
      "좋다 — être bien / se sentir bien (état) : 커피가 좋아요 (J'aime le café / Le café est bon)",
      "좋아하다 — aimer (préférence active) : 커피를 좋아해요 (J'aime le café)",
      "Les deux se traduisent par « j'aime » mais 좋다 porte sur le sentiment, 좋아하다 sur la préférence",
    ],
    tip_fr:   { label: "Différence Clé", text: "좋아요 → la particule de sujet (이/가) le précède. 좋아해요 → la particule d'objet (을/를) le précède. En cas de doute, 좋아해요 semble plus naturel pour exprimer des préférences." },
  },

  // --- Stage 19: Encore/Déjà ---
  54: {
    title_fr: "Encore / Déjà",
    body_fr:  "아직 + verbe négatif = pas encore. 벌써 = déjà (plus tôt que prévu). 이미 = déjà (neutre, formel).",
    rules_fr: [
      "아직 안 먹었어요 — Je n'ai pas encore mangé (pas encore)",
      "아직 여기 있어요 — Je suis encore ici (en cours)",
      "벌써 도착했어요 ? — Déjà arrivé ? (surpris)",
      "이미 알아요 — Je sais déjà (neutre)",
    ],
  },
  55: {
    prompt_fr:  "Que signifie « 아직 » ?",
    choices_fr: ["Encore / Pas encore", "Déjà", "Même", "Plus"],
  },

  // --- Stage 20: Indéfini ---
  56: {
    title_fr: "Quelqu'un, Quelque Chose",
    body_fr:  "Combinez des mots interrogatifs avec le contexte pour exprimer des idées indéfinies comme « quelqu'un » ou « rien ».",
    rules_fr: [
      "누군가 — quelqu'un : 누군가 왔어요 (Quelqu'un est venu)",
      "무언가 / 뭔가 — quelque chose : 뭔가 이상해요 (Quelque chose est bizarre)",
      "어딘가 — quelque part : 어딘가에 있어요 (C'est quelque part)",
      "아무도 + négatif — personne : 아무도 없어요 (Il n'y a personne ici)",
      "아무것도 + négatif — rien : 아무것도 몰라요 (Je ne sais rien)",
    ],
  },
  57: {
    prompt_fr:  "« Il n'y a personne ici » — 아무도 ___",
    choices_fr: ["없어요", "있어요", "알아요", "와요"],
  },

  // --- Stage 21: Impératif ---
  58: {
    title_fr: "Impératif : -(으)세요",
    body_fr:  "Ajoutez -(으)세요 à un radical verbal pour formuler une requête ou un ordre poli.",
    rules_fr: [
      "가다 → 가세요 (allez s'il vous plaît)",
      "앉다 → 앉으세요 (asseyez-vous s'il vous plaît)",
      "먹다 → 드세요 (mangez s'il vous plaît — honorifique)",
    ],
  },

  // --- Stage 22: Interdiction ---
  59: {
    title_fr: "Ne pas : -지 마세요",
    body_fr:  "Ajoutez -지 마세요 à un radical verbal pour dire poliment à quelqu'un de NE PAS faire quelque chose.",
    rules_fr: [
      "말하다 → 말하지 마세요 (ne parlez pas s'il vous plaît)",
      "가다 → 가지 마세요 (ne partez pas s'il vous plaît)",
      "먹다 → 먹지 마세요 (ne mangez pas s'il vous plaît)",
    ],
  },
  60: { meaning_fr: "S'il vous plaît, parlez lentement." },
  61: {
    prompt_fr:  "« Veuillez ne pas parler » en coréen ?",
    choices_fr: ["말하지 마세요", "말해 주세요", "말하세요", "말 안 해요"],
  },

  // --- Stage 23: Méthode ---
  62: {
    title_fr: "Méthode : -(으)로",
    body_fr:  "-(으)로 marque la méthode ou le moyen — « en » ou « avec » un outil/une façon de faire quelque chose.",
    rules_fr: [
      "-(으)로 après consonne, -로 après voyelle : 버스로 가요 (je vais en bus)",
      "지하철로 와요 (je viens en métro)",
      "한국어로 말해요 (je parle en coréen)",
    ],
  },

  // --- Stage 24: Bon/Mauvais ---
  63: {
    title_fr: "Bon(ne) / Mauvais(e) En",
    body_fr:  "잘하다 = être bon en. 못하다 = être mauvais en. Les deux s'attachent après la particule d'objet 을/를.",
    rules_fr: [
      "한국어를 잘해요 (je suis bon(ne) en coréen)",
      "수학을 못해요 (je suis mauvais(e) en maths)",
      "수영을 잘 못해요 (je ne suis pas très bon(ne) en natation)",
    ],
  },
  64: {
    prompt_fr:  "« être bon en coréen » — 한국어를 ___",
    choices_fr: ["잘해요", "못해요", "좋아해요", "잘 못해요"],
  },

  // --- Stage 25: Tout/Plus ---
  65: {
    title_fr: "Tout, Plus : 다, 더",
    body_fr:  "다 = tout/toute. 더 = plus. Les deux sont de simples adverbes placés avant le verbe.",
    rules_fr: [
      "다 먹었어요 — j'ai tout mangé / tout ça",
      "더 주세요 — donnez-m'en plus s'il vous plaît",
      "다 et 더 s'utilisent de façon très différente selon le contexte",
    ],
  },
  66: {
    prompt_fr:  "« S'il vous plaît, donnez-m'en plus » — ___ 주세요",
    choices_fr: ["더", "다", "좀", "잘"],
  },

  // --- Stage 26: -도 Avancé ---
  67: {
    title_fr: "Tout, Plus & -도",
    body_fr:  "-도 a 4 utilisations avancées au-delà du simple « aussi » : emphase, négation emphatique et « à la fois... et ».",
    rules_fr: [
      "아이도 알아요 — même les enfants savent (emphase : inclusion inattendue)",
      "하나도 없어요 — pas même un seul (négation emphatique : 하나도 + négatif)",
      "먹기도 해요 — parfois mange / mange aussi (-기도 하다)",
      "좋기도 하고 나쁘기도 해요 — à la fois bon et mauvais",
    ],
  },
  68: { meaning_fr: "Le coréen est à la fois difficile et intéressant." },
  69: {
    prompt_fr:  "« Même les enfants savent » — quelle utilisation de -도 ?",
    choices_fr: ["아이도 알아요", "아이가 알아요", "아이를 알아요", "아이는 알아요"],
  },

  // --- lesson_complete ---
  70: {
    title_fr:   "Grammaire Terminée !",
    message_fr: "Vous avez maîtrisé les 26 étapes grammaticales — de l'ordre SOV et les particules jusqu'aux structures avancées de -도. Commencez à les appliquer dans de vraies conversations !",
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
console.log(`✓ patched grammar.json — ${count} field(s) added`);
