'use strict';
const fs   = require('fs');
const path = require('path');
const DATA = path.join(__dirname, '..', 'learn', 'data');

function patch(filename, stagePatch, stepPatches) {
  const file = path.join(DATA, filename);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (stagePatch) data.stages.forEach(s => {
    if (stagePatch[s.id]) Object.assign(s, stagePatch[s.id]);
  });
  data.steps.forEach(step => {
    const p = stepPatches[step.id];
    if (!p) return;
    Object.entries(p).forEach(([k, v]) => { step[k] = v; });
  });
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ patched', filename);
}

patch('hangul.json',
  {
    1: { name_de: 'Konsonanten' },
    2: { name_de: 'Vokale' },
    3: { name_de: 'Silben' },
    4: { name_de: 'Sonderbuchstaben' },
    5: { name_de: 'Zusammengesetzte Vokale' },
    6: { name_de: 'Wörter lesen' }
  },
  {
    // Stage 1: Consonants — card_reveal steps need hint_de + example_meaning_de
    1: {
      hint_de: 'Form wie der Rachenraum, der den Luftstrom blockiert.',
      example_meaning_de: 'gehen'
    },
    2: {
      hint_de: 'Form wie eine Zungenspitze, die den Gaumen berührt.',
      example_meaning_de: 'ich / mich'
    },
    3: {
      hint_de: 'Wie ㄴ mit einem Dach — die Zunge blockiert vollständig den Gaumen.',
      example_meaning_de: 'alles / jedes'
    },
    4: {
      hint_de: 'Ein Zungenflap — zwischen deutschem r und l. Die Zunge tippt den Gaumen.',
      example_meaning_de: 'Vernunft (Präfix)'
    },
    5: {
      hint_de: 'Form wie geschlossene Lippen, die sich zusammenpressen, um m zu erzeugen.',
      example_meaning_de: 'Herz / Geist'
    },
    6: {
      hint_de: 'Form wie sich öffnende Lippen, die den b- oder p-Laut freigeben.',
      example_meaning_de: 'Reis / Mahlzeit'
    },
    7: {
      hint_de: 'Form wie zwei Zähne — Luft zischt hindurch für den s-Laut.',
      example_meaning_de: 'Person'
    },
    8: {
      hint_de: 'Am Silbenanfang stumm. Am Silbenende klingt er wie ng.',
      example_meaning_de: 'Kind'
    },
    9: {
      hint_de: 'Wie j in ja. Die Zunge drückt hinter die Oberzähne.',
      example_meaning_de: 'jetzt'
    },
    10: {
      hint_de: 'Aspiriertes ch — ein Luftstoß kommt heraus. Wie ch in Chemie.',
      example_meaning_de: 'Tee / Auto'
    },
    11: {
      hint_de: 'Aspiriertes k — starker Luftstoß. Halte ein Taschentuch davor, es flattert.',
      example_meaning_de: 'Kaffee'
    },
    12: {
      hint_de: 'Aspiriertes t — wie t am Wortanfang. Starker Luftstoß.',
      example_meaning_de: 'fahren / einsteigen'
    },
    13: {
      hint_de: 'Aspiriertes p — Lippen schnappen mit Luft auf.',
      example_meaning_de: 'Frühlingszwiebel'
    },
    14: {
      hint_de: 'Ein gehauchtes h — wie Wärme auf die Hand aushauchen.',
      example_meaning_de: 'Himmel'
    },
    // Stage 1: match_quiz steps — prompt_de only; choices are romanization tokens
    15: { prompt_de: 'ㄱ wird romanisiert als…' },
    16: { prompt_de: 'Welcher Konsonant ist am Silbenanfang STUMM?' },
    17: { prompt_de: 'ㄴ wird romanisiert als…' },
    18: { prompt_de: 'Welcher Konsonant klingt wie j in ja?' },
    19: { prompt_de: 'ㅁ wird romanisiert als…' },
    20: { prompt_de: 'ㄹ wird romanisiert als…' },
    21: { prompt_de: '밥 (Reis) beginnt mit welchem Konsonanten?' },
    // Stage 2: Vowels — card_reveal steps need hint_de only (no example_meaning)
    22: { hint_de: 'Öffne den Mund weit, wie ah beim Arzt.' },
    23: { hint_de: 'Wie ja in Jacht. Der extra Strich bedeutet, dass ein j hinzugefügt wird.' },
    24: { hint_de: 'Ähnlich wie ö in Höhle, aber offener. Lippen leicht gerundet.' },
    25: { hint_de: 'Wie yö mit gerundeten Lippen. Zwei Striche = j-Vorsilbe.' },
    26: { hint_de: 'Wie o in Boot. Runde die Lippen wie beim Kerzenblasen.' },
    27: { hint_de: 'Wie jo! — zwei Striche fügen das j hinzu. Im Gespräch sehr gebräuchlich.' },
    28: { hint_de: 'Wie u in Buch. Der Strich zeigt NACH UNTEN — der Mund senkt sich.' },
    29: { hint_de: 'Wie ju. Zwei Striche nach unten zeigen die j-Vorsilbe an.' },
    30: { hint_de: 'Wie ein unzufriedenes üh. Flache Lippen, nicht gerundet.' },
    31: { hint_de: 'Wie i in Biene. Ein einfacher senkrechter Strich — reiner hoher Vokal.' },
    // Stage 2: match_quiz steps — prompt_de only; choices are Korean chars or romanization tokens
    32: { prompt_de: 'Welcher Vokal klingt wie a (wie in Vater)?' },
    33: { prompt_de: 'Welcher Vokal klingt wie o (wie in Boot)?' },
    34: { prompt_de: 'Welcher Vokal klingt wie i (wie in Biene)?' },
    35: { prompt_de: 'ㅠ wird romanisiert als…' },
    36: { prompt_de: 'ㅡ klingt wie…' },
    // Stage 3: syllable_builder — meaning_de
    37: { meaning_de: 'ba — wie in 바나나 (Banane)' },
    38: { meaning_de: 'na — wie in 나 (ich)' },
    39: { meaning_de: 'sa — wie in 사랑 (Liebe)' },
    40: { meaning_de: 'go — wie in 고마워 (danke)' },
    41: { meaning_de: 'ha — wie in 하늘 (Himmel)' },
    42: { meaning_de: 'mu — wie in 무엇 (was)' },
    // Stage 4: Special consonants — card_reveal (hint_de only)
    43: { hint_de: 'Gespanntes k — Luft anhalten, dann loslassen. Kein Luftstoß.' },
    44: { hint_de: 'Gespanntes t — die Kehle zieht sich zusammen vor dem Loslassen. Anders als ㄷ und ㅌ.' },
    45: { hint_de: 'Gespanntes p — Lippen pressen sich fest zusammen, bevor sie aufschnappen. Keine Luft entweicht.' },
    46: { hint_de: 'Gespanntes s — ein scharfes, enges Zischen. Verwendet in 있다 (existieren / haben).' },
    47: { hint_de: 'Gespanntes j — schärfer und abrupter als ㅈ. Kein Luftstoß.' },
    48: { hint_de: 'Aspiriert — ein starker Luftstoß folgt dem Konsonanten.' },
    49: { hint_de: 'Aspiriert — die Zunge schnellt vom Gaumen mit einem Luftstoß ab.' },
    50: { hint_de: 'Aspiriert — Lippen schnappen mit einem Luftknall auf.' },
    51: { hint_de: 'Aspiriertes ch — wie ch am Anfang. Luft kommt heraus.' },
    52: { hint_de: 'Ein gehauchter aspirierter Konsonant. Der meiste Luftausstoß aller koreanischen Konsonanten.' },
    // Stage 4: match_quiz — prompt_de; choices_de for step 56 (English answers)
    53: { prompt_de: 'ㄲ wird romanisiert als…' },
    54: { prompt_de: 'Welcher ist ein GESPANNTER Konsonant (쌍자음)?' },
    55: { prompt_de: 'ㅃ wird romanisiert als…' },
    56: {
      prompt_de: 'Aspirierte Konsonanten werden erzeugt durch…',
      choices_de: ['Keine Luft', 'Einen starken Luftstoß', 'Eine angespannte Kehle', 'Einen Nasallaut']
    },
    57: { prompt_de: 'ㅉ wird romanisiert als…' },
    // Stage 5: Compound vowels — card_reveal (hint_de only)
    58: { hint_de: 'ㅏ + ㅣ kombiniert. Wie e in Bett. Modernes Koreanisch = identisch mit 에.' },
    59: { hint_de: 'ㅓ + ㅣ kombiniert. Wie e in Bett. Klingt heute genauso wie 애.' },
    60: { hint_de: 'ㅑ + ㅣ. Selten — erscheint in 얘 (dieses Kind, umgangssprachlich).' },
    61: { hint_de: 'ㅕ + ㅣ. Wie je in jetzt. 예쁘다 = schön / hübsch.' },
    62: { hint_de: 'ㅗ + ㅏ. Wie wa in Wahl. 와! = Wow!' },
    63: { hint_de: 'ㅗ + ㅐ. Klingt wie wä. 왜 = warum.' },
    64: { hint_de: 'ㅗ + ㅣ. Wie we. 외국인 = Ausländer/in.' },
    65: { hint_de: 'ㅜ + ㅓ. Wie wo. 뭐 = was (umgangssprachlich).' },
    66: { hint_de: 'ㅜ + ㅔ. Wie we. Sehr selten im Koreanischen.' },
    67: { hint_de: 'ㅜ + ㅣ. Wie wi. 위 = oben / Magen.' },
    68: { hint_de: 'ㅡ + ㅣ. Ein einzigartiger Gleitvokal. 의사 = Arzt/Ärztin. Auch der Possessivpartikel 의.' },
    // Stage 5: match_quiz — prompt_de; choices_de for step 70 (English answer words)
    69: { prompt_de: 'ㅘ wird romanisiert als…' },
    70: {
      prompt_de: '왜 bedeutet…',
      choices_de: ['was', 'wer', 'warum', 'wo']
    },
    71: { prompt_de: 'ㅢ wird romanisiert als…' },
    72: { prompt_de: 'Welcher zusammengesetzte Vokal besteht aus ㅗ + ㅣ?' },
    73: { prompt_de: '예 wird romanisiert als…' },
    // Stage 6: Read words — listen_repeat (meaning_de)
    74: { meaning_de: 'Hallo / Tschüss (informell)' },
    75: { meaning_de: 'Schule' },
    76: { meaning_de: 'Korea' },
    77: { meaning_de: 'Liebe' },
    78: { meaning_de: 'Wasser' },
    79: { meaning_de: 'Reis / Mahlzeit' },
    80: { meaning_de: 'Person / Mensch' },
    81: { meaning_de: 'Freund/in' },
    82: { meaning_de: 'Himmel' },
    83: { meaning_de: 'Danke (informell)' },
    84: {
      title_de: 'Du kannst Koreanisch lesen!',
      message_de: 'Unglaubliche Arbeit — du hast alle 6 Stufen des Hangul abgeschlossen. Du kannst jetzt jeden Buchstaben des koreanischen Alphabets lesen und schreiben. 화이팅!'
    }
  }
);
