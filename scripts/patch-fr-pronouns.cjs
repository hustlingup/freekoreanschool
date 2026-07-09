#!/usr/bin/env node
'use strict';
const fs   = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'learn', 'data', 'pronouns.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

// Stage names
const stageNames = {
  1: 'Première et Deuxième Personne',
  2: 'Troisième Personne et Nous',
  3: 'Démonstratifs',
  4: 'Pronoms Interrogatifs',
};
for (const s of data.stages) {
  if (s.name_fr == null) s.name_fr = stageNames[s.id];
}

// Step patches
const patches = {
  1: {
    title_fr: 'Aperçu des Pronoms Coréens',
    body_fr:  "Le coréen a deux registres pour les pronoms de première personne : poli et informel. 저 (jeo) est le « je » poli, utilisé avec des étrangers, des aînés et dans des contextes formels. 나 (na) est le « je » informel, utilisé avec des amis proches et des personnes plus jeunes. Surtout, le coréen omet très souvent le pronom sujet complètement quand le contexte est clair — 어디 가요 ? peut signifier « Où allez-vous ? » sans aucun pronom. Maîtriser quand NE PAS utiliser un pronom est aussi important que de connaître les pronoms eux-mêmes.",
    tip_fr:   { label: 'Langue à sujet nul (pro-drop)', text: "Le coréen est une langue à sujet nul — quand le sujet est évident par le contexte ou a été mentionné récemment, on supprime le pronom. Le laisser peut sembler peu naturel voire légèrement impoli (trop direct). 저 괜찮아요 et 괜찮아요 signifient tous les deux « Je vais bien », mais la forme courte est plus naturelle." },
  },
  2:  { meaning_fr: 'je / moi (poli)' },
  3:  { meaning_fr: 'je / moi (informel)' },
  4:  { meaning_fr: 'je (sujet, poli) — 저 + marqueur de sujet 가 → 제가' },
  5:  { meaning_fr: 'tu (informel) — rarement dit aux adultes' },
  6: {
    prompt_fr:  "Quel pronom est la forme polie de « je » ?",
    choices_fr: ['나', '너', '저', '당신'],
  },
  7: {
    title_fr: '« Tu » en Coréen',
    body_fr:  "Le coréen évite le pronom direct « tu » (당신) dans la plupart des discours quotidiens — cela peut sembler froid, conflictuel ou trop formel selon le contexte. À la place, les Coréens utilisent le nom de la personne, son titre ou son terme de relation. Un professeur s'appellerait 선생님 (professeur), pas 당신. Un ami s'appellerait par son prénom. Le pronom 당신 apparaît dans les chansons, la poésie et l'écriture formelle mais est peu courant dans la conversation quotidienne.",
    tip_fr:   { label: 'Comment s\'adresser aux gens sans 당신', text: "Utilisez le prénom de la personne + 씨 pour les adultes que vous ne connaissez pas bien : 김민준씨. Utilisez leur titre de poste : 사장님 (patron), 과장님 (chef de département). Utilisez des termes de relation : 언니, 오빠, 아저씨. Ceux-ci sont bien plus naturels que 당신." },
  },
  8:  { meaning_fr: 'je (thème, poli) — 저 + marqueur de thème 는 → 저는' },
  9: {
    prompt_fr:  'Pourquoi les Coréens disent-ils rarement 당신 en conversation ?',
    choices_fr: ["Cela signifie « ennemi »", 'Cela peut sembler froid ou conflictuel', "Cela ne fonctionne qu'à l'écrit", "C'est trop informel"],
  },
  10: {
    title_fr: 'Troisième Personne et Nous (그·그녀·우리)',
    body_fr:  "Le coréen utilise rarement les pronoms il/elle dans la parole. À la place, les Coréens disent le nom de la personne ou utilisent des démonstratifs : 그 사람 (cette personne-là), 이 사람 (cette personne-ci). 그 (geu) et 그녀 (geunyeo) existent — il/elle — mais ils apparaissent surtout à l'écrit et dans les traductions. 우리 (uri) signifie « nous » ou « notre ». Curieusement, les Coréens utilisent 우리 là où le français utilise « mon » : 우리 엄마 (ma maman, littéralement « notre maman ») — cela reflète un sens culturel collectiviste de la famille partagée.",
    tip_fr:   { label: '우리 = mon (pour la famille et le pays)', text: "우리 나라 (notre pays), 우리 집 (ma/notre maison), 우리 엄마 (ma maman) — ces expressions sont naturelles et courantes. Utiliser 나의 나라 ou 나의 집 à la place semble peu naturel, presque froid." },
  },
  11: { meaning_fr: "nous / notre (souvent utilisé comme « mon » pour les choses partagées)" },
  12: { meaning_fr: 'nous / notre (humble, forme polie de 우리)' },
  13: { meaning_fr: 'cette personne (= il / elle, manière informelle)' },
  14: { meaning_fr: 'ils / elles (forme écrite)' },
  15: {
    prompt_fr:  "우리 엄마 signifie littéralement « notre maman » mais s'utilise pour dire…",
    choices_fr: ["la maman de quelqu'un d'autre", 'ma maman', 'le/la professeur(e)', 'un(e) étranger/étrangère'],
  },
  16: { meaning_fr: "mon/notre pays (Corée) — littéralement « notre pays »" },
  17: {
    prompt_fr:  "Quelle forme de « nous » est plus humble et polie, utilisée envers les aînés ?",
    choices_fr: ['우리', '저희', '그들', '너희'],
  },
  18: {
    title_fr: 'Pronoms Démonstratifs (이·그·저)',
    body_fr:  "Le coréen a trois niveaux de démonstratifs selon la distance spatiale. 이 (i) = près du locuteur. 그 (geu) = près de l'auditeur ou mentionné précédemment. 저 (jeo) = loin des deux. Ces mots s'attachent à 것 (geot, « chose ») pour former des pronoms : 이것 (ceci), 그것 (cela), 저것 (cela là-bas). Dans la parole informelle, ils sont abrégés : 이거, 그거, 저거. Les mêmes racines 이/그/저 fonctionnent aussi avec les mots de lieu : 여기 (ici), 거기 (là), 저기 (là-bas).",
    tip_fr:   { label: '이/그/저 vs 여기/거기/저기', text: "이/그/저 + 것 = ceci/cela/cela là-bas (chose). 이/그/저 + -(e)gi = ici/là/là-bas. Donc 여기 (yeo-gi) = ici (près du locuteur), 거기 (geo-gi) = là (près de l'auditeur), 저기 (jeo-gi) = là-bas (loin des deux)." },
  },
  19: { meaning_fr: 'ceci (chose) — près du locuteur' },
  20: { meaning_fr: "cela (chose) — près de l'auditeur ou déjà mentionné" },
  21: { meaning_fr: 'cela là-bas (chose) — loin des deux' },
  22: { meaning_fr: 'celui-ci (forme informelle de 이것)' },
  23: {
    prompt_fr:  'Quel démonstratif désigne quelque chose de loin des DEUX — du locuteur ET de l\'auditeur ?',
    choices_fr: ['이것', '그것', '저것', '어떤 것'],
  },
  24: { meaning_fr: 'ici (près du locuteur)' },
  25: {
    prompt_fr:  '저것 est la version formelle. Quelle est la version informelle ?',
    choices_fr: ['이거', '그거', '저거', '뭐'],
  },
  26: {
    title_fr: 'Pronoms Interrogatifs (의문대명사)',
    body_fr:  "Les mots interrogatifs coréens sont placés dans la même position de la phrase que le mot qu'ils remplacent — contrairement au français qui déplace « quoi » et « où » au début. Comparez : 영화 봐요 ? (Tu regardes un film ?) contre 뭐 봐요 ? (Qu'est-ce que tu regardes ?). Le mot interrogatif s'insère simplement à la place d'origine. Les principaux pronoms interrogatifs sont : 누구 (qui), 무엇/뭐 (quoi/que), 어디 (où), 언제 (quand), 왜 (pourquoi), 어떻게 (comment), 얼마 (combien).",
    tip_fr:   { label: 'Pas d\'inversion interrogative', text: "Le français déplace le mot interrogatif au début et inverse parfois le sujet-verbe : « Que fais-tu ? ». Le coréen conserve le même ordre des mots qu'une déclaration et remplace simplement par le mot interrogatif : 뭐 해요 ? (Que fais-tu ?) — littéralement « quoi fait ? »." },
  },
  27: { meaning_fr: 'qui' },
  28: { meaning_fr: 'quoi / que (formel)' },
  29: { meaning_fr: 'quoi / que (informel, très courant)' },
  30: { meaning_fr: 'où' },
  31: {
    prompt_fr:  "Quel pronom interrogatif signifie « qui » ?",
    choices_fr: ['뭐', '어디', '누구', '왜'],
  },
  32: {
    title_fr:   'Pronoms Terminés !',
    message_fr: 'Vous avez maîtrisé les pronoms coréens — du poli 저 à l\'informel 나, du 우리 (notre/mon), aux démonstratifs et aux mots interrogatifs. Excellent progrès !',
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
console.log(`✓ patched pronouns.json — ${count} field(s) added`);
