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

patch('pronouns.json',
  {
    1: { name_de: 'Erste & Zweite Person' },
    2: { name_de: 'Dritte Person & Wir' },
    3: { name_de: 'Demonstrativpronomen' },
    4: { name_de: 'Fragepronomen' }
  },
  {
    1: {
      title_de: 'Überblick über koreanische Pronomen',
      body_de: 'Das Koreanische hat zwei Register für Pronomen der ersten Person: höflich und informell. 저 (jeo) ist das höfliche „Ich", verwendet gegenüber Fremden, Älteren und in formellen Situationen. 나 (na) ist das informelle „Ich", verwendet mit engen Freunden und jüngeren Personen. Wichtig: Das Koreanische lässt das Subjektpronomen sehr häufig ganz weg, wenn der Kontext klar ist — 어디 가요? kann „Wo gehst du hin?" bedeuten, ganz ohne Pronomen. Zu wissen, wann man ein Pronomen NICHT verwendet, ist genauso wichtig wie die Pronomen selbst zu kennen.',
      tip_de: {
        label: 'Pro-Drop-Sprache',
        text: 'Koreanisch ist eine Pro-Drop-Sprache — wenn das Subjekt aus dem Kontext offensichtlich ist oder kürzlich erwähnt wurde, lässt man das Pronomen weg. Es drin zu lassen kann unnatürlich oder sogar leicht unhöflich wirken (zu direkt). 저 괜찮아요 und 괜찮아요 bedeuten beide „Mir geht\'s gut", aber die kürzere Form ist natürlicher.'
      }
    },
    2: { meaning_de: 'ich / mich (höflich)' },
    3: { meaning_de: 'ich / mich (informell)' },
    4: { meaning_de: 'ich (Subjekt, höflich) — 저 + Subjektmarker 가 → 제가' },
    5: { meaning_de: 'du (informell) — kaum gegenüber Erwachsenen verwendet' },
    6: {
      prompt_de: 'Welches Pronomen ist die höfliche Form von „ich"?',
      choices_de: ['나', '너', '저', '당신']
    },
    7: {
      title_de: '„Du" auf Koreanisch sagen',
      body_de: 'Das Koreanische vermeidet das direkte Pronomen „du" (당신) in den meisten Alltagsgesprächen — je nach Kontext kann es kalt, konfrontativ oder übermäßig förmlich wirken. Stattdessen verwenden Koreaner den Namen, den Titel oder den Beziehungsbegriff der Person. Ein Lehrer wird 선생님 (Lehrer/in) genannt, nicht 당신. Freunde ruft man beim Namen. Das Pronomen 당신 erscheint in Liedern, Gedichten und formellen Texten, ist aber im Alltag unüblich.',
      tip_de: {
        label: 'Wie man ohne 당신 anredet',
        text: 'Verwende den Namen + 씨 für Erwachsene, die du nicht gut kennst: 김민준씨. Verwende Berufsbezeichnungen: 사장님 (Chef), 과장님 (Abteilungsleiter). Verwende Beziehungsbegriffe: 언니, 오빠, 아저씨. Diese sind alle viel natürlicher als 당신.'
      }
    },
    8: { meaning_de: 'ich (Thema, höflich) — 저 + Themamarker 는 → 저는' },
    9: {
      prompt_de: 'Warum sagen Koreaner im Gespräch selten 당신?',
      choices_de: [
        'Es bedeutet „Feind"',
        'Es kann kalt oder konfrontativ wirken',
        'Es funktioniert nur schriftlich',
        'Es ist zu informell'
      ]
    },
    10: {
      title_de: 'Dritte Person & Wir (그·그녀·우리)',
      body_de: 'Das Koreanische verwendet im Gespräch selten Er/Sie-Pronomen. Stattdessen nennen Koreaner den Namen der Person oder verwenden Demonstrativwörter: 그 사람 (diese Person dort), 이 사람 (diese Person hier). 그 (geu) und 그녀 (geunyeo) — er/sie — existieren, erscheinen aber hauptsächlich in Texten und Übersetzungen. 우리 (uri) bedeutet „wir" oder „unser". Interessanterweise verwenden Koreaner 우리 dort, wo das Deutsche „mein" sagt: 우리 엄마 (meine Mama, wörtlich „unsere Mama") — das spiegelt ein kollektivistisches Verständnis der gemeinsamen Familie wider.',
      tip_de: {
        label: '우리 = mein (für Familie & Land)',
        text: '우리 나라 (unser Land), 우리 집 (mein/unser Haus), 우리 엄마 (meine Mama) — das sind natürliche und gängige Ausdrücke. Stattdessen 나의 나라 oder 나의 집 zu sagen klingt unnatürlich, fast kalt.'
      }
    },
    11: { meaning_de: 'wir / unser (oft als „mein" für gemeinsame Dinge verwendet)' },
    12: { meaning_de: 'wir / unser (bescheiden, höfliche Form von 우리)' },
    13: { meaning_de: 'diese Person (= er / sie, informelle Weise)' },
    14: { meaning_de: 'sie / ihnen (schriftliche Form)' },
    15: {
      prompt_de: '우리 엄마 bedeutet wörtlich „unsere Mama", wird aber verwendet für…',
      choices_de: [
        'die Mama von jemand anderem',
        'meine Mama',
        'den/die Lehrer/in',
        'eine fremde Person'
      ]
    },
    16: { meaning_de: 'mein/unser Land (Korea) — wörtlich „unser Land"' },
    17: {
      prompt_de: 'Welche Form von „wir" ist bescheidener und höflicher, gegenüber Älteren verwendet?',
      choices_de: ['우리', '저희', '그들', '너희']
    },
    18: {
      title_de: 'Demonstrativpronomen (이·그·저)',
      body_de: 'Das Koreanische hat drei Stufen von Demonstrativa basierend auf der räumlichen Distanz. 이 (i) = in der Nähe des Sprechers. 그 (geu) = in der Nähe des Hörers oder bereits erwähnt. 저 (jeo) = weit von beiden entfernt. Diese werden an 것 (geot, „Ding") angehängt, um Pronomen zu bilden: 이것 (dies), 그것 (das), 저것 (das dort drüben). Im Umgangssprachlichen werden sie verkürzt: 이거, 그거, 저거. Die gleichen Wurzeln 이/그/저 funktionieren auch mit Ortswörtern: 여기 (hier), 거기 (da), 저기 (dort drüben).',
      tip_de: {
        label: '이/그/저 vs 여기/거기/저기',
        text: '이/그/저 + 것 = dies/das/das dort (Ding). 이/그/저 + -(e)gi = hier/da/dort. Also: 여기 (yeo-gi) = hier (beim Sprecher), 거기 (geo-gi) = da (beim Hörer), 저기 (jeo-gi) = dort drüben (weit von beiden).'
      }
    },
    19: { meaning_de: 'dies (Ding) — beim Sprecher' },
    20: { meaning_de: 'das (Ding) — beim Hörer oder bereits erwähnt' },
    21: { meaning_de: 'das dort drüben (Ding) — weit von beiden entfernt' },
    22: { meaning_de: 'dies hier (informelle Form von 이것)' },
    23: {
      prompt_de: 'Welches Demonstrativum bezeichnet etwas, das SOWOHL vom Sprecher ALS AUCH vom Hörer weit entfernt ist?',
      choices_de: ['이것', '그것', '저것', '어떤 것']
    },
    24: { meaning_de: 'hier (beim Sprecher)' },
    25: {
      prompt_de: '저것 ist die formelle Form. Was ist die informelle Form?',
      choices_de: ['이거', '그거', '저거', '뭐']
    },
    26: {
      title_de: 'Fragepronomen (의문대명사)',
      body_de: 'Koreanische Fragewörter stehen an derselben Stelle im Satz wie das Wort, das sie ersetzen — anders als im Deutschen, wo „was" und „wo" an den Satzanfang rücken. Vergleiche: 영화 봐요? (Schaust du einen Film?) vs 뭐 봐요? (Was schaust du?). Das Fragewort tauscht einfach die ursprüngliche Stelle aus. Die wichtigsten Fragepronomen sind: 누구 (wer), 무엇/뭐 (was), 어디 (wo), 언제 (wann), 왜 (warum), 어떻게 (wie), 얼마 (wie viel).',
      tip_de: {
        label: 'Keine Frageumstellung nötig',
        text: 'Im Deutschen stellt man das Fragewort nach vorne und verändert oft die Satzstellung: „Was machst du?". Das Koreanische behält dieselbe Wortstellung wie ein Aussagesatz und tauscht einfach das Fragewort ein: 뭐 해요? (Was machst du?) — wörtlich „was macht?".'
      }
    },
    27: { meaning_de: 'wer' },
    28: { meaning_de: 'was (formell)' },
    29: { meaning_de: 'was (informell, sehr gebräuchlich)' },
    30: { meaning_de: 'wo' },
    31: {
      prompt_de: 'Welches Fragepronomen bedeutet „wer"?',
      choices_de: ['뭐', '어디', '누구', '왜']
    },
    32: {
      title_de: 'Pronomen abgeschlossen!',
      message_de: 'Du hast die koreanischen Pronomen gemeistert — vom höflichen 저 bis zum informellen 나, von 우리 (unser/mein) bis zu den Demonstrativ- und Fragewörtern. Super Fortschritt!'
    }
  }
);
