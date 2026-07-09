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

patch('syllable-blocks.json',
  {
    1: { name_de: 'Blockgrundlagen' },
    2: { name_de: 'Vokalformen' },
    3: { name_de: 'Bauen' },
    4: { name_de: 'Batchim' },
    5: { name_de: 'Wörter lesen' }
  },
  {
    1: {
      title_de: 'Was ist ein Silbenblock?',
      body_de: 'Jede koreanische Silbe wird in einem unsichtbaren quadratischen Block geschrieben. Anders als im Deutschen, wo Buchstaben von links nach rechts in einer Reihe stehen, stapelt das Koreanische Konsonanten und Vokale zusammen in kompakte, visuell ausgewogene Blöcke. Jeder Block stellt genau eine Silbe dar — eine Klangeinheit.',
      tip_de: {
        label: 'Wusstest du das?',
        text: 'Jeder Silbenblock hat immer genau einen Vokal. Er kann 0, 1 oder 2 Konsonanten haben — aber niemals mehr als einen Vokal.'
      }
    },
    2: {
      title_de: 'Die drei Positionen',
      body_de: 'Jeder koreanische Silbenblock hat drei benannte Positionen. Zwei sind erforderlich (초성 Anfangskonsonant und 중성 Vokal) und eine ist optional (der 받침 Endkonsonant). Diese Positionen beim Namen zu kennen ist unerlässlich — die koreanische Grammatik bezieht sich ständig auf sie.',
      tip_de: {
        label: 'Tipp',
        text: 'Bei senkrechten Vokalen wie ㅏ, ㅓ und ㅣ: Der Anfangskonsonant steht links, der Vokal rechts. Bei waagerechten Vokalen wie ㅗ, ㅜ und ㅡ: Der Anfangskonsonant steht oben, der Vokal unten.'
      }
    },
    3: {
      title_de: 'Vier Silbenblock-Muster',
      body_de: 'Koreanische Silben folgen vier grundlegenden Strukturmustern, je nachdem ob ein Endkonsonant (받침) vorhanden ist und ob die Silbe mit einem Vokal oder Konsonanten beginnt.',
      patterns_label_de: [
        'Anfangskonsonant + Vokal',
        'Stummes ㅇ + Vokal',
        'Anfangskonsonant + Vokal + 받침',
        'Stummes ㅇ + Vokal + 받침'
      ],
      tip_de: {
        label: 'Die ㅇ-Platzhalter-Regel',
        text: 'Wenn eine Silbe mit einem Vokalklang beginnt, muss ㅇ als Platzhalter in der Anfangsposition geschrieben werden. ㅇ ist am Silbenanfang völlig stumm — es zeigt einfach an, dass der Block mit einem Vokal beginnt. Beispiele: 아 = ㅇ+ㅏ   이 = ㅇ+ㅣ   우 = ㅇ+ㅜ'
      }
    },
    4: {
      hint_de: 'Jede Silbe ist ein quadratischer Block — Anfangskonsonant, Vokal und optionaler Endkonsonant.',
      example_meaning_de: 'Korea'
    },
    5: {
      hint_de: 'Dieser Block hat alle drei Positionen: 초성 (ㄱ) + 중성 (ㅜ) + 받침 (ㄱ).',
      example_meaning_de: 'Korea'
    },
    6: {
      hint_de: 'Vokalanlautende Silben verwenden das stumme ㅇ als Platzhalter. Das ㅇ hier macht keinen Laut.',
      example_meaning_de: 'Koreanische Sprache'
    },
    7: {
      prompt_de: 'Wie viele Vokale enthält jeder koreanische Silbenblock?',
      choices_de: ['Null', 'Genau einen', 'Einen oder zwei', 'So viele wie nötig']
    },
    8: { prompt_de: 'Die ANFANGS-Konsonantenposition (erster Konsonant) heißt…' },
    9: { prompt_de: 'Wenn eine Silbe mit einem VOKAL beginnt, schreibst du __ als Platzhalter-Anfangskonsonant.' },
    10: {
      hint_de: 'CV-Muster — der einfachste Blocktyp. Nur ein Anfangskonsonant und ein Vokal.',
      example_meaning_de: 'gehen'
    },
    11: {
      hint_de: 'Reines V-Muster — stummes ㅇ in der Anfangsposition, nur der Vokal klingt.',
      example_meaning_de: 'Baby'
    },
    12: {
      hint_de: 'CVC-Muster — Anfangskonsonant + Vokal + Endkonsonant (받침). Drei Teile.',
      example_meaning_de: 'Leber / ging'
    },
    13: {
      prompt_de: '안 (innen / nein) — was für ein Strukturmuster ist das?',
      choices_de: ['CV', 'CVC', 'VC (stummes ㅇ + Vokal + Final)', 'Nur V']
    },
    14: {
      title_de: 'Senkrechte vs. waagerechte Vokale',
      body_de: 'Die Form des Vokals bestimmt, wohin der Anfangskonsonant im Block geht. Hohe, senkrechte Vokale schieben den Konsonanten nach links; breite, waagerechte Vokale schieben ihn nach oben. Das ist es, was dem Koreanischen sein charakteristisches quadratisches Aussehen verleiht.',
      tip_de: {
        label: 'Schneller visueller Trick',
        text: 'Wenn du einen hohen Vokal siehst (ㅏ, ㅓ, ㅣ und ihre Varianten), steht der Anfangskonsonant links davon. Wenn du einen breiten Vokal siehst (ㅗ, ㅜ, ㅡ und ihre Varianten), steht der Anfangskonsonant darüber. Zusammengesetzte Vokale wie ㅘ, ㅝ, ㅚ verhalten sich wie senkrechte Vokale — der Konsonant geht nach links.'
      }
    },
    15: { hint_de: 'ㅏ ist ein HOHER senkrechter Vokal. Der Anfangskonsonant steht zu seiner LINKEN.' },
    16: {
      hint_de: 'ㅓ ist ebenfalls ein hoher senkrechter Vokal — Konsonant LINKS, Vokal RECHTS.',
      example_meaning_de: 'du (informell)'
    },
    17: {
      hint_de: 'ㅣ ist der höchste Vokal. Der Konsonant steht immer zu seiner Linken.',
      example_meaning_de: 'Zeit'
    },
    18: {
      hint_de: 'ㅗ ist ein BREITER waagerechter Vokal. Der Anfangskonsonant steht OBEN auf dem Vokal.',
      example_meaning_de: 'danke'
    },
    19: {
      hint_de: 'ㅜ ist ein breiter waagerechter Vokal — Konsonant oben, Vokal unten. Der Strich zeigt NACH UNTEN.',
      example_meaning_de: 'wer'
    },
    20: {
      hint_de: 'ㅡ ist ein flacher waagerechter Vokal — der Konsonant steht darüber.',
      example_meaning_de: 'und / außerdem'
    },
    21: {
      prompt_de: 'Bei einem HOHEN Vokal wie ㅏ, ㅓ oder ㅣ — wohin geht der Anfangskonsonant?',
      choices_de: ['Oben', 'Nach links', 'Nach rechts', 'Unten']
    },
    22: {
      prompt_de: 'Bei einem BREITEN Vokal wie ㅗ, ㅜ oder ㅡ — wohin geht der Anfangskonsonant?',
      choices_de: ['Nach links', 'Nach rechts', 'Oben', 'Unten']
    },
    23: {
      prompt_de: '배 (Bauch / Schiff) enthält ㅐ — welcher Vokaltyp ist ㅐ?',
      choices_de: ['Breiter waagerechter', 'Hoher senkrechter', 'Zusammengesetzt breit', 'Stumm']
    },
    24: { prompt_de: 'Welcher dieser Vokale ist ein BREITER (waagerechter) Vokal?' },
    25: {
      title_de: 'Deine ersten Silben bauen',
      body_de: 'Jetzt üben wir das Bauen einfacher CV-Silben — Konsonant + Vokal, kein Batchim. Das sind die einfachsten Blöcke zum Lesen und Schreiben. Höre jedem zu und versuche, den Laut selbst zu produzieren.'
    },
    26: { meaning_de: 'ba — 바나나 (Banane)' },
    27: { meaning_de: 'na — 나 (ich)' },
    28: { meaning_de: 'sa — 사랑 (Liebe)' },
    29: { meaning_de: 'ha — 하늘 (Himmel)' },
    30: { meaning_de: 'go — 고마워 (danke, informell)' },
    31: { meaning_de: 'nu — 누구 (wer)' },
    32: { meaning_de: 'mi — 미래 (Zukunft)' },
    33: { meaning_de: 'gi — 기다리다 (warten)' },
    34: {
      title_de: 'Batchim hinzufügen — Der Endkonsonant',
      body_de: 'Wenn du einen Konsonanten am unteren Ende eines Blocks hinzufügst, wird dieser Konsonant zum 받침 (Batchim) — dem Endkonsonanten. Das Batchim verleiht vielen koreanischen Wörtern ihre reichen, klangvollen Endungen. Schau, wie das Hinzufügen von Batchim einfache Silben in echte Wörter verwandelt.',
      tip_de: {
        label: 'Tipp',
        text: 'Silbenblöcke mit Batchim sind vertikal leicht komprimiert, um unten Platz zu schaffen. Der Batchim-Konsonant sitzt unter dem Anfangskonsonanten und dem Vokal und vervollständigt die quadratische Form des Blocks.'
      }
    },
    35: {
      hint_de: 'ㄴ ist hier das 받침 — es sitzt am unteren Ende des Blocks unter ㅅ und ㅏ.',
      example_meaning_de: 'Berg'
    },
    36: {
      hint_de: 'ㄹ 받침 — die Zunge tippt leicht den Gaumen, um die Endung zu erzeugen.',
      example_meaning_de: 'Mond / Monat'
    },
    37: {
      hint_de: 'ㅂ 받침 — Lippen schließen sich am Ende ohne Loslassen. Das p wird nicht freigegeben.',
      example_meaning_de: 'Reis / Mahlzeit'
    },
    38: {
      hint_de: 'ㅁ 받침 — Lippen schließen sich sanft am Ende. Ein nasaler resonanter Abschluss.',
      example_meaning_de: 'Frühling (Jahreszeit)'
    },
    39: {
      hint_de: 'ㄹ 받침 wieder — die Zunge verweilt am Gaumen. Klingt wie ein weiches l.',
      example_meaning_de: 'Straße / Weg'
    },
    40: { prompt_de: '밥 (Reis) — was ist sein 받침 (Batchim)?' },
    41: { prompt_de: '달 (Mond) endet mit welchem Konsonantenklang?' },
    42: {
      prompt_de: 'In einem CVC-Silbenblock, wo sitzt das 받침 (Batchim)?',
      choices_de: ['Über dem Vokal', 'Rechts vom Vokal', 'Unten, unter allem', 'Neben dem Anfangskonsonanten']
    },
    43: { prompt_de: 'Welches dieser Wörter hat KEIN 받침?' },
    44: { prompt_de: '봄 (Frühling) = ㅂ + ㅗ + ? — was ist das Batchim?' },
    45: {
      title_de: 'Echte koreanische Wörter lesen',
      body_de: 'Du hast jetzt alles, was du brauchst, um echte koreanische Wörter zu entschlüsseln. Lass uns 10 wesentliche Wörter Silbe für Silbe aufschlüsseln und jeden Bestandteil identifizieren. Tippe auf die Lautsprecher-Schaltflächen, um die Wörter laut gesprochen zu hören.'
    },
    46: { meaning_de: 'Korea' },
    47: { meaning_de: 'Person' },
    48: { meaning_de: 'Schule' },
    49: { meaning_de: 'Hallo / Frieden' },
    50: { meaning_de: 'Dankbarkeit' },
    51: { meaning_de: 'Liebe' },
    52: { meaning_de: 'Musik' },
    53: { meaning_de: 'Freund/in' },
    54: { meaning_de: 'Familie' },
    55: { meaning_de: 'Meer / Ozean' },
    56: { meaning_de: 'Traum' },
    57: {
      title_de: 'Übung & Zusammenfassung',
      body_de: 'Glückwunsch — du hast die Kernstruktur koreanischer Silbenblöcke gelernt! Hier ist eine kurze Zusammenfassung der fünf Regeln, die jede Silbe im koreanischen Schriftsystem bestimmen.',
      rules_de: [
        'Jeder Block hat genau einen Vokal (중성 / Jungseong)',
        'Silben, die mit einem Vokal beginnen, verwenden das stumme ㅇ als Platzhalter-Anfangskonsonant',
        'Hohe Vokale (ㅏ, ㅓ, ㅣ) — Anfangskonsonant links, Vokal rechts',
        'Breite Vokale (ㅗ, ㅜ, ㅡ) — Anfangskonsonant oben, Vokal unten',
        'Das optionale 받침 (Batchim) sitzt am unteren Ende des Blocks, unter allem anderen'
      ],
      tip_de: {
        label: 'Selbsttest kommt!',
        text: 'Drei schnelle Fragen unten zur Bestätigung. Identifiziere die Bestandteile jeder Silbe.'
      }
    },
    58: { prompt_de: '남 (Süden) — was ist sein 초성 (Anfangskonsonant)?' },
    59: { prompt_de: '달 (Mond) — identifiziere das 받침 (Batchim / Endkonsonant).' },
    60: { prompt_de: '봄 (Frühling) — was sind die drei Bestandteile in der richtigen Reihenfolge?' },
    61: {
      title_de: 'Du kannst koreanische Silbenblöcke lesen!',
      message_de: 'Du hast die Bausteine der gesamten koreanischen Schrift gemeistert — 5 Stufen, 61 Schritte. Jedes koreanische Wort besteht aus genau diesen Blöcken. 화이팅!'
    }
  }
);
