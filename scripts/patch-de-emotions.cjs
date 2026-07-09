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

patch('emotions.json',
  {
    1: { name_de: 'Grundlegende Emotionen' },
    2: { name_de: 'Gefühle ausdrücken' },
    3: { name_de: 'Komplexe Emotionen' },
    4: { name_de: 'Emotionale Phrasen' }
  },
  {
    1: {
      title_de: 'Emotionen auf Koreanisch (감정)',
      body_de: 'Koreanische Emotionswörter sind in ihrer Grundform meist Adjektive. Anders als im Deutschen („Ich bin glücklich") funktionieren koreanische Adjektive wie Verben und konjugieren direkt: 행복해요 (Ich bin glücklich) ohne ein separates „bin". Die Wörterbuchform endet auf -다: 행복하다, 슬프다, 무섭다. Entferne -다 und füge -아요/-어요 für die höfliche Gegenwartsform an. Emotions-Vokabular ist besonders nützlich für Gespräche über K-Dramas, den Alltag und persönliche Gefühle.',
      tip_de: {
        label: 'Adjektive konjugieren wie Verben',
        text: '행복하다 → 행복해요 (Ich bin glücklich). 슬프다 → 슬퍼요 (Ich bin traurig). 피곤하다 → 피곤해요 (Ich bin müde). Die Endung -아요/-어요 macht das Adjektiv gleichzeitig höflich und im Präsens.'
      }
    },
    2: { meaning_de: 'glücklich sein (Wörterbuchform)' },
    3: { meaning_de: 'traurig sein (Wörterbuchform)' },
    4: { meaning_de: 'wütend sein (wörtlich: Wut kommt heraus)' },
    5: { meaning_de: 'Angst haben / gruselig sein' },
    6: {
      prompt_de: 'Welches Wort bedeutet „glücklich sein"?',
      choices_de: ['슬프다', '무섭다', '행복하다', '화가 나다']
    },
    7: {
      title_de: 'Emotions-Adjektive konjugieren',
      body_de: 'Um Emotions-Adjektive in höflicher Konversation zu verwenden, entferne -다 von der Wörterbuchform und füge die höfliche Gegenwartsendung hinzu. Für Stämme, die auf 하 enden: 하다 → 해요 (행복하다 → 행복해요). Für Stämme, die auf einem hellen Vokal (ㅏ, ㅗ) enden: füge -아요 an. Für alle anderen: füge -어요 an, oft kontrahiert — 슬프다 → 슬프 + 어요 → 슬퍼요, 무섭다 → 무서워요. Dasselbe Muster gilt für die meisten koreanischen Beschreibungsverben (Adjektive).',
      tip_de: {
        label: 'Schnelle Konjugationstabelle',
        text: '행복하다 → 행복해요. 슬프다 → 슬퍼요. 화나다 → 화나요. 무섭다 → 무서워요. 피곤하다 → 피곤해요. 기쁘다 → 기뻐요. Beachte: 슬프다 lässt das 으 vor -어요 weg.'
      }
    },
    8: { meaning_de: 'Ich bin glücklich (höfliche Gegenwartsform)' },
    9: { meaning_de: 'Ich bin traurig (höfliche Gegenwartsform)' },
    10: {
      title_de: 'Weitere Gefühlswörter (감정 어휘)',
      body_de: 'Das Koreanische hat ein reiches Set an Emotionswörtern jenseits des Grundwortschatzes. 기쁘다 (froh/fröhlich sein) ist ein etwas stärkeres oder spezifischeres Glücksgefühl als 행복하다. 걱정되다 (sich sorgen) bedeutet wörtlich „Sorge entsteht". 신나다 (aufgeregt/begeistert sein) wird häufig für energiegeladene Situationen verwendet — Konzerte, Sport, Feiern. 피곤하다 (müde sein) ist essenziell für den Alltag, besonders wenn man erklärt, warum man etwas nicht kann.',
      tip_de: {
        label: '신나다 in der Popkultur',
        text: '신나다 und 신나요 sind allgegenwärtig in der koreanischen Popkultur. K-Pop-Songs verwenden oft 신나, um einen aufregenden Beat oder eine Stimmung zu beschreiben. Du wirst auch 신난다! als Ausruf hören (Das macht so viel Spaß!) bei Veranstaltungen und Partys.'
      }
    },
    11: { meaning_de: 'froh / fröhlich sein' },
    12: { meaning_de: 'sich sorgen / besorgt sein' },
    13: { meaning_de: 'müde / erschöpft sein' },
    14: { meaning_de: 'aufgeregt / begeistert sein' },
    15: {
      prompt_de: 'Welches Wort bedeutet „müde sein"?',
      choices_de: ['기쁘다', '신나다', '피곤하다', '걱정되다']
    },
    16: {
      title_de: '기분 — Stimmung & Gefühl',
      body_de: '기분 (gibun) ist das Schlüsselwort, um deine Stimmung oder deinen allgemeinen Gefühlszustand zu beschreiben. 기분이 좋다 = sich gut fühlen / guter Stimmung sein. 기분이 나쁘다 = sich schlecht fühlen / schlechter Stimmung sein. 기분 beschreibt den emotionalen Ton breiter als einzelne Emotionswörter — es geht um deinen Gesamtzustand. Du wirst 기분이 어때요? (Wie fühlst du dich?) in alltäglichen Gesprächen hören.',
      tip_de: {
        label: '기분 vs 감정',
        text: '기분 = Stimmung, allgemeiner Gefühlszustand (kontextuell, kann sich ändern). 감정 = Emotion (spezifischeres Gefühl wie Wut, Freude, Angst). 기분이 좋아요 = Ich fühle mich gerade gut. 감정을 표현하다 = Emotionen ausdrücken.'
      }
    },
    17: { meaning_de: 'Ich fühle mich gut / Ich bin gut gelaunt' },
    18: {
      prompt_de: '기분이 좋아요 bedeutet…',
      choices_de: [
        'Ich fühle mich schlecht',
        'Ich fühle mich gut',
        'Ich bin hungrig',
        'Ich bin müde'
      ]
    },
    19: {
      title_de: 'Tiefere Emotionen (깊은 감정)',
      body_de: 'Das Koreanische hat einige Emotionswörter ohne direktes deutsches Äquivalent. 그립다 (geuripda) beschreibt das Vermissen von jemandem oder etwas — die Sehnsucht nach einer geliebten Person oder einem Ort, die/der abwesend ist. 외롭다 (oeropda) ist Einsamkeit, aber mit einer kulturellen Tiefe der Isolation. 부끄럽다 (bukkeureupda) ist Verlegenheit oder Schüchternheit. 뿌듯하다 (ppudeuthada) ist der warme Stolz oder die Befriedigung einer Leistung — das Gefühl, wenn du etwas Schwieriges abschließt oder jemanden, dem du wichtig bist, erfolgreich siehst.',
      tip_de: {
        label: '한 (Han) — unübersetzbare koreanische Trauer',
        text: '한 (han) ist eine kulturell spezifische Emotion: ein tiefer Kummer gemischt mit Stärke, verwurzelt in historischem Leid, aber in kreative Energie verwandelt. Man hört es im Pansori (koreanische Volksoper), es wird in Gedichten beschrieben und in Diskussionen über koreanische Identität erwähnt. Kein Wort für den Alltag, aber wesentlich für das kulturelle Verständnis.'
      }
    },
    20: { meaning_de: 'jemanden/etwas vermissen (Sehnsucht)' },
    21: { meaning_de: 'einsam sein' },
    22: { meaning_de: 'verlegen / schüchtern sein' },
    23: { meaning_de: 'stolz / erfüllt sein (warmes Gefühl der Leistung)' },
    24: {
      prompt_de: '그립다 bedeutet…',
      choices_de: [
        'froh sein',
        'jemanden vermissen (Sehnsucht)',
        'müde sein',
        'einsam sein'
      ]
    },
    25: { meaning_de: 'aufgeregte Schmetterlinge im Bauch spüren / Herzklopfen (romantische Vorfreude)' },
    26: {
      prompt_de: '뿌듯하다 bedeutet…',
      choices_de: [
        'verlegen sein',
        'stolz / erfüllt sein',
        'einsam sein',
        'jemanden vermissen'
      ]
    },
    27: {
      title_de: 'Häufige emotionale Satzmuster',
      body_de: 'Einige Satzmuster sind besonders nützlich, um Emotionen auf Koreanisch auszudrücken. „보고 싶어요" (Ich vermisse dich / Ich möchte dich sehen) verwendet 보다 (sehen) + -고 싶다 (wollen). „감동받았어요" (Ich war bewegt/berührt) verwendet 감동 (tiefe Emotion) + 받다 (empfangen). „괜찮아요" (Mir geht\'s gut / Das ist in Ordnung) ist eine der vielseitigsten Phrasen — verwendet für „Mir geht\'s gut", „Das ist okay", „Kein Problem" und „Macht nichts".',
      tip_de: {
        label: '괜찮아요 — die Mehrzweck-Phrase',
        text: '괜찮아요 bedeutet wörtlich „es ist in Ordnung/okay". Verwende es, um jemanden zu beruhigen, dass es dir gut geht (nach einem Sturz), um ein Angebot anzunehmen, das du vorher abgelehnt hast, um „Nein danke" zu sagen, oder um „das geht schon" auszudrücken. Den Ton zu beherrschen ist entscheidend — gleiche Wörter, sehr unterschiedliche Botschaften.'
      }
    },
    28: { meaning_de: 'Ich vermisse dich / Ich möchte dich sehen' },
    29: { meaning_de: 'Ich war bewegt / berührt (emotional)' },
    30: { meaning_de: 'Mir geht\'s gut / Das ist in Ordnung / Kein Problem' },
    31: {
      prompt_de: '보고 싶어요 bedeutet…',
      choices_de: [
        'Mir geht\'s gut',
        'Ich war bewegt',
        'Ich vermisse dich / Ich möchte dich sehen',
        'Ich bin einsam'
      ]
    },
    32: { meaning_de: 'Kopf hoch! / Halt durch! (wörtlich: Kraft aufbringen)' },
    33: {
      title_de: 'Emotionen abgeschlossen!',
      message_de: 'Du hast den koreanischen Emotionswortschatz erkundet — von Grundgefühlen bis zu kulturell reichen Wörtern wie 그립다, 뿌듯하다 und 설레다. Dein emotionales Koreanisch wächst!'
    }
  }
);
