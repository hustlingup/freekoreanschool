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

patch('nouns.json',
  {
    1: { name_de: 'Personen & Familie' },
    2: { name_de: 'Orte & Zeit' },
    3: { name_de: 'Objekte & Zählwörter' },
    4: { name_de: 'Possessivformen' }
  },
  {
    1: {
      title_de: 'Koreanische Nomen (명사)',
      body_de: 'Koreanische Nomen (명사) verändern sich nicht nach Geschlecht oder Zahl. Das Wort 사람 bedeutet „Person", „Personen", „eine Person" und „die Person" — der Kontext klärt die Bedeutung. Pluralität wird aus dem Kontext erschlossen oder durch 들 (Pluralsuffix, z.B. 사람들 = Personen) ausgedrückt. Es gibt keine Artikel wie „ein/eine" oder „der/die/das". Das macht koreanische Nomen sehr leicht zu lernen — du musst nur das Wort selbst kennen.',
      tip_de: {
        label: 'Pluralsuffix 들',
        text: '들 fügt sanft den Plural hinzu: 친구들 (Freunde), 학생들 (Schüler). Du kannst 들 an Personen oder Tiere anhängen, aber es ist optional und wird oft weggelassen, wenn der Kontext klar ist.'
      }
    },
    2: { meaning_de: 'Person / Mensch' },
    3: { meaning_de: 'Mann / Junge' },
    4: { meaning_de: 'Frau / Mädchen' },
    5: { meaning_de: 'Kind' },
    6: { meaning_de: 'Freund/in' },
    7: {
      prompt_de: 'Welches Wort bedeutet „Freund/in"?',
      choices_de: ['남자', '여자', '친구', '아이']
    },
    8: {
      title_de: 'Familiennomen (가족 명사)',
      body_de: 'Koreanische Familienbegriffe unterscheiden sich oft nach dem Geschlecht der sprechenden Person. 오빠 (oppa) ist, wie eine Frau ihren älteren Bruder nennt, während 형 (hyung) ist, wie ein Mann seinen älteren Bruder nennt. Ebenso: 언니 (unni) = ältere Schwester (weibliche Sprecherin) und 누나 (nuna) = ältere Schwester (männlicher Sprecher). Für Eltern sind 아버지 / 어머니 die formellen Begriffe, während 아빠 / 엄마 die umgangssprachlichen Entsprechungen sind.',
      tip_de: {
        label: 'Geschlechtsspezifische Anrede',
        text: 'Anders als im Deutschen hat Koreanisch kein einziges Wort für „Geschwister". Ob du 오빠/형 oder 언니/누나 sagst, hängt vollständig von deinem eigenen Geschlecht und dem relativen Alter des Geschwisters ab. Das ist grundlegend für den koreanischen Familienwortschatz.'
      }
    },
    9: { meaning_de: 'Vater (formell)' },
    10: { meaning_de: 'Mutter (formell)' },
    11: {
      title_de: 'Ortsnomen (장소 명사)',
      body_de: 'Koreanische Ortsnomen folgen derselben Regel ohne Artikel wie alle anderen Nomen. 학교 bedeutet „Schule", „eine Schule" oder „die Schule" — der Kontext sagt dir welches. Beim Angeben von Richtungen oder Standorten fügt das Koreanische die Partikel 에 (an/in/nach) nach dem Ortsnomen hinzu: 학교에 가요 (Ich gehe zur Schule). Ortsnomen gehören zu den praktischsten Wörtern, die man früh lernen sollte.',
      tip_de: {
        label: 'Ortspartikel 에',
        text: 'Hänge 에 an ein Ortsnomen, um „an", „in" oder „nach" auszudrücken: 집에 (zu Hause), 학교에 (zur Schule), 식당에 (im Restaurant). 에서 bedeutet „von" oder „in (beim Tun von etwas)": 학교에서 공부해요 (Ich lerne in der Schule).'
      }
    },
    12: { meaning_de: 'Haus / Zuhause' },
    13: { meaning_de: 'Schule' },
    14: { meaning_de: 'Restaurant / Kantine' },
    15: { meaning_de: 'Krankenhaus / Klinik' },
    16: {
      prompt_de: 'Welches Wort bedeutet „Schule"?',
      choices_de: ['집', '식당', '병원', '학교']
    },
    17: {
      title_de: 'Zeitnomen (시간 명사)',
      body_de: 'Zeitnomen im Koreanischen funktionieren selbständig — keine Konjugation nötig. Du stellst das Zeitwort einfach an den Anfang des Satzes: 오늘 가요 (Ich gehe heute), 내일 만나요 (Lass uns morgen treffen). Koreanische Zeitangaben verwenden sino-koreanische Zahlen für Stunden und koreanische Grundzahlen für Minuten. Die wichtigsten Zeitwörter sind 오늘 (heute), 내일 (morgen), 어제 (gestern) und 지금 (jetzt).',
      tip_de: {
        label: 'Zeitwörter als Satzeröffnung',
        text: 'Koreanisch ist sehr flexibel in der Wortstellung, aber Zeitangaben kommen üblicherweise früh im Satz — vor dem Subjekt oder direkt danach. „오늘 학교에 가요" und „학교에 오늘 가요" sind beide korrekt, aber ersteres ist natürlicher.'
      }
    },
    18: { meaning_de: 'heute' },
    19: {
      prompt_de: 'Welches Wort bedeutet „heute"?',
      choices_de: ['내일', '어제', '오늘', '지금']
    },
    20: {
      title_de: 'Objektnomen (사물 명사)',
      body_de: 'Alltagsgegenstände gehören zu den sofort nützlichsten koreanischen Wörtern. Koreanisch hat sowohl native koreanische als auch sino-koreanische (chinesischen Ursprungs) Wörter für Objekte, und in vielen Fällen wird Konglisch (Lehnwörter aus dem Englischen) verwendet: 커피 (Kaffee), 핸드폰 (Handy). Wenn das Objekt der direkte Empfänger eines Verbs ist, hänge 을/를 nach dem Nomen an: 책을 읽어요 (Ich lese ein Buch). Das ist die Objektpartikel.',
      tip_de: {
        label: 'Objektpartikel 을/를',
        text: 'Verwende 을 nach einem Nomen, das auf einen Konsonanten endet: 책을. Verwende 를 nach einem Nomen, das auf einen Vokal endet: 가방을. In der Umgangssprache wird diese Partikel oft ganz weggelassen.'
      }
    },
    21: { meaning_de: 'Buch' },
    22: { meaning_de: 'Tasche / Rucksack' },
    23: { meaning_de: 'Geld' },
    24: {
      prompt_de: 'Welches Wort bedeutet „Geld"?',
      choices_de: ['책', '가방', '돈', '핸드폰']
    },
    25: {
      title_de: 'Koreanische Zählwörter (수사)',
      body_de: 'Das Koreanische verwendet Zählwörter (수사), die beim Zählen bestimmter Dinge an Zahlen angehängt werden. Das Zählwort 개 wird für allgemeine Objekte verwendet: 한 개 (ein Ding), 세 개 (drei Dinge). 명 wird zum Zählen von Personen verwendet: 두 명 (zwei Personen). 잔 wird für Tassen/Gläser verwendet: 한 잔 (eine Tasse). Das Muster ist: Zahl + Zählwort, direkt vor oder nach dem Nomen. Koreanische Zahlen für Zählwörter verwenden die einheimische koreanische Reihe: 하나(1), 둘(2), 셋(3), 넷(4), 다섯(5).',
      tip_de: {
        label: 'Einheimische Zahlen mit Zählwörtern',
        text: 'Beim Kombinieren einheimischer koreanischer Zahlen mit Zählwörtern ändert sich die Zahl leicht: 하나 → 한, 둘 → 두, 셋 → 세, 넷 → 네. Also heißt es 한 개 (nicht 하나 개), 두 명 (nicht 둘 명).'
      }
    },
    26: { meaning_de: 'drei Personen (명 = Personenzählwort)' },
    27: {
      prompt_de: 'Welches Zählwort wird für Personen verwendet?',
      choices_de: ['개', '명', '잔', '권']
    },
    28: {
      title_de: 'Possessivmarker 의',
      body_de: 'Der Possessivmarker 의 (ui, oft „에" ausgesprochen) wird an ein Nomen angehängt, um Besitz anzuzeigen, ähnlich wie das deutsche „-s" oder „von". 저의 가방 = meine Tasche, 친구의 집 = das Haus des Freundes. Im Alltag wird 의 häufig weggelassen: 제 가방 (meine Tasche, höflich) oder 내 가방 (meine Tasche, informell). Die Pronomen 저 und 나 haben besondere Possessivformen: 제 (höflich, mein) und 내 (informell, mein).',
      tip_de: {
        label: '제 vs 내',
        text: '제 ist das höfliche/bescheidene „mein" (von 저 = ich, höflich). 내 ist das informelle „mein" (von 나 = ich, informell). Verwende 제 mit Fremden oder Älteren, 내 mit engen Freunden.'
      }
    },
    29: { meaning_de: 'meine Tasche (höflich)' },
    30: { meaning_de: 'mein Freund / meine Freundin (informell)' },
    31: {
      prompt_de: 'Wie sagst du „meine Tasche" auf höflichem Koreanisch?',
      choices_de: ['내 가방', '저의 책', '제 가방', '나의 집']
    },
    32: { meaning_de: 'das Haus des Freundes / der Freundin' },
    33: {
      prompt_de: '의 ist der koreanische Possessivmarker. Was entspricht ihm im Deutschen?',
      choices_de: [
        'Subjektmarker',
        '-s / von (Besitz)',
        'Objektmarker',
        'Pluralsuffix'
      ]
    },
    34: {
      title_de: 'Nomen abgeschlossen!',
      message_de: 'Du hast die wichtigsten koreanischen Nomen gelernt — Personen, Orte, Objekte, Zeitwörter, Zählwörter und Possessivformen. Weiter geht es mit den Pronomen!'
    }
  }
);
