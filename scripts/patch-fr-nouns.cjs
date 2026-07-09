#!/usr/bin/env node
'use strict';
const fs   = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'learn', 'data', 'nouns.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

// Stage names
const stageNames = {
  1: 'Personnes et Famille',
  2: 'Lieux et Temps',
  3: 'Objets et Compteurs',
  4: 'Possessifs',
};
for (const s of data.stages) {
  if (s.name_fr == null) s.name_fr = stageNames[s.id];
}

// Step patches
const patches = {
  1: {
    title_fr: 'Les Noms Coréens (명사)',
    body_fr:  "Les noms coréens (명사) ne changent pas selon le genre ou le nombre. Le même mot 사람 signifie « personne », « personnes », « une personne » et « la personne ». Le pluriel est compris par le contexte ou ajouté séparément avec des mots comme 들 (suffixe pluriel, ex. 사람들 = personnes). Il n'y a pas d'articles comme « un » ou « le ». Cela rend les noms coréens très faciles à apprendre — il suffit de connaître le mot lui-même.",
    tip_fr:   { label: 'Suffixe pluriel 들', text: "들 ajoute doucement le pluriel : 친구들 (amis), 학생들 (étudiants). Vous pouvez ajouter 들 aux personnes ou aux animaux, mais c'est optionnel et souvent omis quand le contexte est clair." },
  },
  2:  { meaning_fr: 'personne / être humain' },
  3:  { meaning_fr: 'homme / garçon' },
  4:  { meaning_fr: 'femme / fille' },
  5:  { meaning_fr: 'enfant' },
  6:  { meaning_fr: 'ami(e)' },
  7: {
    prompt_fr:  "Quel mot signifie « ami(e) » ?",
    choices_fr: ['남자', '여자', '친구', '아이'],
  },
  8: {
    title_fr: 'Noms de Famille (가족 명사)',
    body_fr:  "Les termes familiaux coréens diffèrent souvent selon le genre du locuteur. 오빠 (oppa) est ce qu'une locutrice appelle son frère aîné, tandis que 형 (hyung) est ce qu'un locuteur masculin appelle son frère aîné. De même, 언니 (unni) = sœur aînée (locutrice féminine) et 누나 (nuna) = sœur aînée (locuteur masculin). Pour les parents, 아버지 / 어머니 sont les termes formels, tandis que 아빠 / 엄마 sont les équivalents informels.",
    tip_fr:   { label: 'Appellation selon le genre', text: "Contrairement au français, le coréen n'a pas un seul mot pour « frère » ou « sœur ». Le choix entre 오빠/형 ou 언니/누나 dépend entièrement de votre propre genre et de l'âge relatif du frère ou de la sœur. C'est fondamental dans le vocabulaire familial coréen." },
  },
  9:  { meaning_fr: 'père (formel)' },
  10: { meaning_fr: 'mère (formelle)' },
  11: {
    title_fr: 'Noms de Lieu (장소 명사)',
    body_fr:  "Les noms de lieu coréens suivent la même règle sans article que tous les autres noms. 학교 signifie « école », « une école » ou « l'école » — le contexte vous le dit. Pour indiquer une direction ou une localisation, le coréen ajoute la particule 에 (à/dans) après le nom de lieu : 학교에 가요 (Je vais à l'école). Les noms de lieu comptent parmi les mots les plus pratiques à apprendre tôt.",
    tip_fr:   { label: 'Particule de lieu 에', text: "Ajoutez 에 à un nom de lieu pour signifier « à », « dans » ou « vers » : 집에 (à la maison), 학교에 (à l'école), 식당에 (au restaurant). 에서 signifie « de » ou « à (en train de faire quelque chose) » : 학교에서 공부해요 (J'étudie à l'école)." },
  },
  12: { meaning_fr: 'maison / chez soi' },
  13: { meaning_fr: 'école' },
  14: { meaning_fr: 'restaurant / cantine' },
  15: { meaning_fr: 'hôpital / clinique' },
  16: {
    prompt_fr:  "Quel mot signifie « école » ?",
    choices_fr: ['집', '식당', '병원', '학교'],
  },
  17: {
    title_fr: 'Noms de Temps (시간 명사)',
    body_fr:  "Les noms de temps en coréen fonctionnent de manière indépendante — aucune conjugaison n'est nécessaire. Vous placez simplement le mot de temps au début de la phrase : 오늘 가요 (Je pars aujourd'hui), 내일 만나요 (On se retrouve demain). Les expressions de temps coréennes utilisent les chiffres sino-coréens pour les heures et les chiffres coréens natifs pour les minutes. Les mots de temps essentiels sont 오늘 (aujourd'hui), 내일 (demain), 어제 (hier) et 지금 (maintenant).",
    tip_fr:   { label: 'Les mots de temps en début de phrase', text: "Le coréen est très flexible sur l'ordre des mots, mais les expressions de temps viennent généralement tôt dans la phrase — avant le sujet ou juste après. « 오늘 학교에 가요 » et « 학교에 오늘 가요 » sont toutes les deux correctes, mais la première est plus naturelle." },
  },
  18: { meaning_fr: "aujourd'hui" },
  19: {
    prompt_fr:  "Quel mot signifie « aujourd'hui » ?",
    choices_fr: ['내일', '어제', '오늘', '지금'],
  },
  20: {
    title_fr: "Noms d'Objets (사물 명사)",
    body_fr:  "Les objets du quotidien comptent parmi les mots coréens les plus immédiatement utiles. Le coréen possède des mots coréens natifs et des mots sino-coréens (d'origine chinoise) pour les objets, et dans de nombreux cas le konglish (mots empruntés à l'anglais) est utilisé : 커피 (café), 핸드폰 (téléphone portable). Quand l'objet est le receveur direct d'un verbe, ajoutez 을/를 après le nom : 책을 읽어요 (Je lis un livre). C'est la particule d'objet.",
    tip_fr:   { label: "Particule d'objet 을/를", text: "Utilisez 을 après un nom se terminant par une consonne : 책을. Utilisez 를 après un nom se terminant par une voyelle : 가방을. Dans la conversation informelle, cette particule est souvent complètement omise." },
  },
  21: { meaning_fr: 'livre' },
  22: { meaning_fr: 'sac / sac à dos' },
  23: { meaning_fr: 'argent' },
  24: {
    prompt_fr:  "Quel mot signifie « argent » ?",
    choices_fr: ['책', '가방', '돈', '핸드폰'],
  },
  25: {
    title_fr: 'Les Classificateurs Coréens (수사)',
    body_fr:  "Le coréen utilise des mots de comptage appelés classificateurs (수사) qui s'attachent aux nombres pour compter des choses spécifiques. Le classificateur 개 est utilisé pour les objets généraux : 한 개 (une chose), 세 개 (trois choses). 명 est utilisé pour compter les personnes : 두 명 (deux personnes). 잔 est utilisé pour les tasses/verres : 한 잔 (une tasse). Le modèle est : nombre + classificateur, placé juste avant ou après le nom. Les nombres coréens pour les classificateurs utilisent la série native : 하나(1), 둘(2), 셋(3), 넷(4), 다섯(5).",
    tip_fr:   { label: 'Nombres natifs avec classificateurs', text: "Quand on combine les nombres natifs coréens avec des classificateurs, le nombre change légèrement : 하나 → 한, 둘 → 두, 셋 → 세, 넷 → 네. Donc c'est 한 개 (pas 하나 개), 두 명 (pas 둘 명)." },
  },
  26: { meaning_fr: 'trois personnes (명 = classificateur de personnes)' },
  27: {
    prompt_fr:  'Quel classificateur est utilisé pour les personnes (compter des individus) ?',
    choices_fr: ['개', '명', '잔', '권'],
  },
  28: {
    title_fr: 'Le Marqueur Possessif 의',
    body_fr:  "Le marqueur possessif 의 (ui, souvent prononcé « 에 ») s'attache à un nom pour indiquer la possession. 저의 가방 = mon sac, 친구의 집 = la maison de l'ami. Dans le discours quotidien, 의 est souvent omis : 제 가방 (mon sac, poli) ou 내 가방 (mon sac, informel). Les pronoms 저 et 나 ont des formes possessives spéciales : 제 (poli, mon/ma) et 내 (informel, mon/ma).",
    tip_fr:   { label: '제 vs 내', text: "제 est le « mon/ma » possessif poli/humble (de 저 = je, poli). 내 est le « mon/ma » possessif informel (de 나 = je, informel). Utilisez 제 avec des étrangers ou des aînés, 내 avec des amis proches." },
  },
  29: { meaning_fr: 'mon sac (poli)' },
  30: { meaning_fr: 'mon ami(e) (informel)' },
  31: {
    prompt_fr:  "Comment dit-on « mon sac » en coréen poli ?",
    choices_fr: ['내 가방', '저의 책', '제 가방', '나의 집'],
  },
  32: { meaning_fr: "la maison de l'ami(e)" },
  33: {
    prompt_fr:  "의 est le marqueur possessif coréen. À quoi correspond-il en français ?",
    choices_fr: ['marqueur de sujet', "de / du / des (possession)", "marqueur d'objet", 'suffixe pluriel'],
  },
  34: {
    title_fr:   'Noms Terminés !',
    message_fr: "Vous avez abordé les noms coréens essentiels — personnes, lieux, objets, mots de temps, classificateurs et possessifs. Continuez avec les Pronoms !",
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
console.log(`✓ patched nouns.json — ${count} field(s) added`);
