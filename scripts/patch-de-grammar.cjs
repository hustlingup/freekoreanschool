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

patch('grammar.json',
  {
    1:  { name_de: 'Satz' },
    2:  { name_de: 'Partikeln' },
    3:  { name_de: 'Konjugation' },
    4:  { name_de: 'Verneinung' },
    5:  { name_de: 'Fragen' },
    6:  { name_de: 'Kernsätze' },
    7:  { name_de: 'Konnektoren' },
    8:  { name_de: 'Und/Mit' },
    9:  { name_de: 'An/Von' },
    10: { name_de: 'Uhrzeit' },
    11: { name_de: 'Zählwörter' },
    12: { name_de: 'Verlaufsform' },
    13: { name_de: 'Vorstellung' },
    14: { name_de: 'Datumsangaben' },
    15: { name_de: 'Adverbien' },
    16: { name_de: 'Nominalisierung' },
    17: { name_de: 'Komparativ' },
    18: { name_de: 'Mögen' },
    19: { name_de: 'Noch/Schon' },
    20: { name_de: 'Unbestimmt' },
    21: { name_de: 'Imperativ' },
    22: { name_de: 'Verbotssatz' },
    23: { name_de: 'Methode' },
    24: { name_de: 'Gut/Schlecht' },
    25: { name_de: 'Alles/Mehr' },
    26: { name_de: '-도 Erweitert' }
  },
  {
    // Stage 1: Sentence / Word Order
    1: {
      title_de: 'Wortstellung — SOV',
      body_de: 'Das Koreanische folgt der Reihenfolge Subjekt → Objekt → Verb (SOV). Das Verb kommt IMMER ZULETZT.',
      rules_de: [
        'Deutsch (SVO): Ich esse Reis.',
        'Koreanisch (SOV): 나는 밥을 먹어요. (Ich Reis esse.)',
        'Tipp: Höre auf das letzte Wort — das ist das Verb, die Handlung!'
      ],
      tip_de: {
        label: 'Grammatik-Tipp',
        text: 'Sobald du weißt, dass das Verb zuletzt kommt, ergibt alles Sinn. Der Rest des Satzes kann sich umordnen — koreanische Muttersprachler verwenden Partikel, um die Klarheit zu erhalten.'
      }
    },
    2: { meaning_de: 'Ich esse Reis. (Subjekt + Objekt + Verb)' },
    3: {
      prompt_de: 'In einem koreanischen Satz kommt das Verb immer...',
      choices_de: ['Zuletzt', 'Zuerst', 'Als Zweites', 'Irgendwo']
    },

    // Stage 2: Particles
    4: {
      title_de: 'Koreanische Partikel',
      body_de: 'Partikel werden an Nomen angehängt und zeigen ihre Rolle: Thema, Subjekt, Objekt, Ort. Sie ersetzen die feste Wortstellung.',
      rules_de: [
        '은/는 → Thema-Partikel (은 nach Konsonant, 는 nach Vokal)',
        '이/가 → Subjekt-Partikel (이 nach Konsonant, 가 nach Vokal)',
        '을/를 → Objekt-Partikel (을 nach Konsonant, 를 nach Vokal)',
        '에 → Ort / Richtung',
        '에서 → Ort der Handlung',
        '의 → Possessiv (von / -s)'
      ]
    },
    5: { meaning_de: 'Ich bin Student/in. (는 = Thema-Partikel)' },
    6: {
      prompt_de: '은/는 markiert das ___',
      choices_de: ['Thema', 'Subjekt', 'Objekt', 'Ort']
    },
    7: { meaning_de: 'Es regnet. (가 = Subjekt-Partikel)' },
    8: { prompt_de: 'Um 밥 (Reis) als OBJEKT zu markieren: 밥___ 먹어요' },
    9: { meaning_de: 'Ich trinke Kaffee im Café. (에서 = Ort der Handlung)' },
    10: {
      prompt_de: '에서 markiert...',
      choices_de: ['Den Ort der Handlung', 'Das Ziel', 'Das Thema', 'Das Objekt']
    },

    // Stage 3: Conjugation
    11: {
      title_de: 'Verben — Wörterbuchform',
      body_de: 'Alle koreanischen Verben in der Wörterbuchform enden auf 다 (da). Entferne 다, um den Verbstamm zu erhalten, und füge dann eine Endung hinzu.',
      rules_de: [
        '가다 (gehen) → Stamm: 가-',
        '먹다 (essen) → Stamm: 먹-',
        '공부하다 (lernen) → Stamm: 공부하-',
        '하다 (machen) → Stamm: 하-'
      ]
    },
    12: {
      title_de: 'Präsens: -아요 / -어요',
      body_de: 'Füge -아요 nach ㅏ- oder ㅗ-Stämmen hinzu. Füge -어요 für alle anderen hinzu. 하다-Verben verwenden -해요.',
      rules_de: [
        '가다 → 가요 (gehen · ㅏ-Stamm)',
        '오다 → 와요 (kommen · ㅗ-Stamm)',
        '먹다 → 먹어요 (essen · andere)',
        '마시다 → 마셔요 (trinken · andere)',
        '공부하다 → 공부해요 (lernen · 하다)'
      ],
      tip_de: {
        label: 'Vokal-Regel',
        text: 'ㅏ und ㅗ sind „helle" Vokale → -아요. Alle anderen Vokale sind „dunkle" Vokale → -어요. Sobald du den Stammvokal kennst, erfolgt die Konjugation automatisch.'
      }
    },
    13: { meaning_de: 'Ich gehe / Lass uns gehen. (가다 → 가요, höfliche Gegenwartsform)' },
    14: { meaning_de: 'Ich esse. (먹다 → 먹어요, höfliche Gegenwartsform)' },
    15: { prompt_de: '가다 (gehen) → höfliche Gegenwartsform?' },
    16: {
      title_de: 'Vergangenheit: -았어요 / -었어요',
      body_de: 'Füge -았어요 nach ㅏ/ㅗ-Stämmen und -었어요 für alle anderen hinzu. 하다 → 했어요.',
      rules_de: [
        '가다 → 갔어요 (gegangen)',
        '오다 → 왔어요 (gekommen)',
        '먹다 → 먹었어요 (gegessen)',
        '마시다 → 마셨어요 (getrunken)',
        '공부하다 → 공부했어요 (gelernt)'
      ]
    },
    17: { meaning_de: 'Ich bin nach Seoul gefahren.' },
    18: { prompt_de: 'Vergangenheitsform von 먹다 (essen)?' },
    19: {
      title_de: 'Zukunft: -(으)ㄹ 거예요',
      body_de: 'Füge -(으)ㄹ 거예요 an den Verbstamm an, um über Zukunftspläne oder Vorhersagen zu sprechen.',
      rules_de: [
        '가다 → 갈 거예요 (werde gehen)',
        '먹다 → 먹을 거예요 (werde essen)',
        '공부하다 → 공부할 거예요 (werde lernen)'
      ]
    },
    20: { prompt_de: '가다 (gehen) → Zukunftsform?' },

    // Stage 4: Negation
    21: {
      title_de: 'Sätze verneinen',
      body_de: 'Kurze Verneinung: 안 + Verb. Lange Verneinung: Verbstamm + 지 않아요. Nicht können: 못 + Verb.',
      rules_de: [
        '안 먹어요 (esse nicht — Kurzform)',
        '먹지 않아요 (esse nicht — Langform)',
        '못 가요 (kann nicht gehen — Unfähigkeit)'
      ]
    },
    22: { prompt_de: '„Ich esse nicht" — kurze Verneinungsform' },

    // Stage 5: Questions
    23: {
      title_de: 'Fragen bilden',
      body_de: 'Koreanische Fragen verwenden DIESELBE Wortstellung wie Aussagen — füge einfach eine steigende Intonation (↑) oder ein Fragezeichen hinzu.',
      rules_de: [
        '뭐 / 무엇 — Was',
        '누구 — Wer',
        '어디 — Wo',
        '언제 — Wann',
        '왜 — Warum',
        '어떻게 — Wie',
        '얼마 — Wie viel',
        '몇 — Wie viele'
      ],
      tip_de: {
        label: 'Grammatik-Tipp',
        text: '밥을 먹어요 = Ich esse Reis. 밥을 먹어요? = Isst du Reis? Dieselben Wörter — nur eine steigende Intonation am Ende. Keine Inversion wie im Deutschen!'
      }
    },
    24: { meaning_de: 'Wie heißt du? / Was ist dein Name?' },
    25: { prompt_de: '„Wo" auf Koreanisch?' },

    // Stage 6: Patterns
    26: {
      title_de: 'Wesentliche Satzmuster',
      body_de: 'Beherrsche diese 6 Muster, um die häufigsten Ideen in koreanischen Gesprächen auszudrücken.',
      rules_de: [
        '~이에요/예요 — ist/bin/bist (Nomen): 학생이에요 (Ich bin Student)',
        '~고 싶어요 — möchte: 한국에 가고 싶어요 (Ich möchte nach Korea gehen)',
        '~ㄹ/을 수 있어요 — kann: 한국어를 할 수 있어요 (Ich kann Koreanisch sprechen)',
        '~아/어야 해요 — muss: 공부해야 해요 (Ich muss lernen)',
        '~(으)면 — wenn/falls: 비가 오면 집에 있어요 (Wenn es regnet, bleibe ich zu Hause)',
        '~때문에 — wegen / aufgrund von: 비 때문에 못 가요 (Kann nicht gehen wegen des Regens)'
      ]
    },
    27: { prompt_de: 'Muster für „Ich möchte nach Korea gehen": 한국에 ___' },

    // Stage 7: Connectors
    28: {
      title_de: 'Konnektoren',
      body_de: 'Diese 4 Konjunktionen verbinden Sätze. Platziere sie am ANFANG des zweiten Satzes.',
      rules_de: [
        '그리고 — Und / Und dann (fügt Information oder Abfolge hinzu)',
        '그래서 — Also / Deshalb (Ursache → Folge)',
        '그렇지만 — Aber / Jedoch (starker Kontrast, formell)',
        '그런데 — Aber / Übrigens (weicher Kontrast, umgangssprachlich — der häufigste!)'
      ],
      tip_de: {
        label: 'Verwendungstipp',
        text: '그런데 ist eines der häufigsten Wörter im gesprochenen Koreanisch — es mildert Kontraste und leitet Themenwechsel fließend ein. 그렇지만 ist stärker und formeller.'
      }
    },
    29: { meaning_de: 'Es hat geregnet. Also bin ich zu Hause geblieben.' },
    30: { prompt_de: 'Weicher Kontrast oder Themenwechsel — am häufigsten im gesprochenen Koreanisch?' },

    // Stage 8: And/With
    31: {
      title_de: 'Und, Mit',
      body_de: 'Verwende diese Partikel zwischen Nomen (nicht Sätzen), um „und" oder „mit" auszudrücken.',
      rules_de: [
        '-하고 — nach jedem Nomen, neutral/umgangssprachlich: 친구하고 갔어요 (mit einem Freund gegangen)',
        '-(이)랑 — 이랑 (nach Konsonant) / 랑 (nach Vokal), sehr umgangssprachlich: 오빠랑 놀았어요 (mit dem älteren Bruder gespielt)',
        '-와/과 — 와 (nach Vokal) / 과 (nach Konsonant), formell/schriftlich: 선생님과 상담했어요 (mit dem Lehrer beraten)'
      ]
    },

    // Stage 9: To/From
    32: {
      title_de: 'An jemanden / Von jemandem',
      body_de: 'Verwende Personen-Richtungspartikel, wenn du jemandem etwas gibst oder von jemandem empfängst, nicht von Orten.',
      rules_de: [
        '-한테 — an (eine Person): 친구한테 전화했어요 (meinen Freund angerufen)',
        '-한테서 — von (eine Person): 선생님한테서 배웠어요 (vom Lehrer gelernt)',
        '-에게 / -에게서 — formelle Entsprechungen',
        '-께 — an (Ehrenform, für Ältere): 선생님께 드렸어요'
      ]
    },

    // Stage 10: Time
    33: {
      title_de: 'Uhrzeit angeben',
      body_de: 'Verwende NATIVE koreanische Zahlen für Stunden (시) und SINO-KOREANISCHE Zahlen für Minuten (분). AM = 오전, PM = 오후.',
      rules_de: [
        'Stunden (시): 한(1), 두(2), 세(3), 네(4), 다섯(5)... + 시',
        'Minuten (분): 일(1), 이(2), 삼(3), 사(4), 오(5)... + 분',
        'Halb: 반 — 세 시 반 = 3:30',
        'Beispiel: 오후 두 시 삼십 분 = 14:30 Uhr'
      ],
      tip_de: {
        label: 'Schlüsselmuster',
        text: 'Stunden verwenden native koreanische Zahlen (한, 두, 세...). Minuten verwenden sino-koreanische Zahlen (일, 이, 삼...). Halb = 반. AM = 오전, PM = 오후.'
      }
    },
    34: { meaning_de: 'Wie spät ist es jetzt?' },
    35: {
      prompt_de: 'Stunden in der koreanischen Uhrzeit verwenden welches Zahlensystem?',
      choices_de: [
        'Natives Koreanisch (한, 두, 세...)',
        'Sino-Koreanisch (일, 이, 삼...)',
        'Beide',
        'Arabische Ziffern'
      ]
    },

    // Stage 11: Counters
    36: {
      title_de: 'Zählwörter',
      body_de: 'Das Koreanische verwendet spezifische Zählwörter nach [Nomen] + [Zahl]. Native koreanische Zahlen (한, 두, 세...) werden mit den meisten Zählwörtern verwendet.',
      rules_de: [
        '개 — allgemeine Objekte: 사과 세 개 (3 Äpfel)',
        '명 — Personen (neutral): 학생 두 명 (2 Studenten)',
        '분 — Personen (Ehrenform): 손님 두 분 (2 Gäste)',
        '마리 — Tiere: 고양이 한 마리 (1 Katze)',
        '권 — Bücher: 책 세 권 (3 Bücher)',
        '잔 — Tassen/Getränke: 커피 두 잔 (2 Kaffee)',
        '번 — Mal/Runde: 세 번 (3 Mal)'
      ]
    },
    37: { meaning_de: 'Bitte gib mir drei Äpfel.' },
    38: { prompt_de: 'Zählwort für Personen (neutral)?' },

    // Stage 12: Progressive
    39: {
      title_de: 'Verlaufsform: -고 있어요',
      body_de: 'Füge -고 있어요 an den Verbstamm an, um zu sagen, dass jemand gerade etwas TUT (die koreanische „-ing"-Form).',
      rules_de: [
        '먹다 → 먹고 있어요 (isst gerade)',
        '가다 → 가고 있어요 (geht gerade)',
        '공부하다 → 공부하고 있어요 (lernt gerade)',
        '읽다 → 읽고 있어요 (liest gerade)'
      ],
      tip_de: {
        label: 'Verlaufsform vs. Einfache Form',
        text: '먹어요 = Ich esse (allgemein oder gerade jetzt, kontextabhängig). 먹고 있어요 = Ich esse gerade (speziell im aktuellen Moment in Aktion). Die Verlaufsform fügt „momentan in Aktion" hinzu.'
      }
    },
    40: { meaning_de: 'Ich esse gerade.' },
    41: { prompt_de: '„Lernt gerade" → 공부하다 + -고 있어요 =' },

    // Stage 13: Self-Intro
    42: {
      title_de: 'Vorstellung',
      body_de: 'Schlüsselwortschatz: 이름 (Name), 나이 (Alter), 나라 (Land), 직업 (Beruf), 취미 (Hobby), 고향 (Heimatstadt).',
      rules_de: [
        '안녕하세요! 저는 [Name]이에요/예요.',
        '저는 [나라]에서 왔어요. (Ich komme aus [Land].)',
        '저는 [직업]이에요. (Ich bin [Beruf].)',
        '제 취미는 [Hobby]예요. (Mein Hobby ist [Hobby].)',
        '잘 부탁드려요! (Freut mich, dich kennenzulernen!)'
      ],
      tip_de: {
        label: 'Vorlage',
        text: 'Verwende 안녕하세요 + 잘 부탁드려요 in formellen Situationen. Mit Freunden oder Gleichaltrigen: 안녕! + 잘 부탁해! Verbeuge dich leicht, wenn du dich persönlich vorstellst.'
      }
    },

    // Stage 14: Dates
    43: {
      title_de: 'Daten und Monate',
      body_de: 'Koreanische Datumsangaben verwenden sino-koreanische Zahlen in der Reihenfolge Jahr → Monat → Tag. Juni = 유월, Oktober = 시월 (Ausnahmen).',
      rules_de: [
        '일월(1월), 이월(2월), 삼월(3월), 사월(4월), 오월(5월), 유월(6월)',
        '칠월(7월), 팔월(8월), 구월(9월), 시월(10월), 십일월(11월), 십이월(12월)',
        'Datumsformat: 2026년 6월 16일 (16. Juni 2026)',
        '오늘이 며칠이에요? — Welches Datum ist heute?'
      ]
    },

    // Stage 15: Adverbs
    44: {
      title_de: 'Gradationsadverbien',
      body_de: 'Gradationsadverbien stehen direkt vor dem Wort, das sie modifizieren: 조금 (ein wenig), 정말 (wirklich), 아주 (sehr), 많이 (viel).',
      rules_de: [
        '조금 / 좀 — ein wenig (좀 ist weicher/umgangssprachlich)',
        '정말 — wirklich / wahrhaftig (neutral)',
        '진짜 — wirklich (umgangssprachlich, stärkeres Gefühl)',
        '아주 — sehr',
        '많이 — viel / sehr viel',
        '별로 + Verneinung — nicht wirklich (별로 안 좋아요 = Ich mag es nicht wirklich)',
        '전혀 + Verneinung — überhaupt nicht (전혀 모르겠어요 = Ich habe keine Ahnung)'
      ],
      tip_de: {
        label: 'Negative Adverbien',
        text: '별로 und 전혀 MÜSSEN mit einem negativen Verb (안, 못, 없다, 모르다) verwendet werden. 별로 좋아요 (ohne Verneinung) zu sagen ist ungrammatisch. Denke an sie als „nicht wirklich" und „überhaupt nicht".'
      }
    },
    45: { meaning_de: 'Es ist wirklich lecker!' },
    46: {
      prompt_de: '별로 und 전혀 müssen verwendet werden mit...',
      choices_de: [
        'Einem negativen Verb',
        'Einem positiven Verb',
        'Nur einem Adjektiv',
        'Nur Vergangenheitsform'
      ]
    },

    // Stage 16: Nominalizer
    47: {
      title_de: 'Nominalisierung: -는 것',
      body_de: 'Das Anhängen von -는 것 an einen Verbstamm erzeugt eine Nominalphrase — „die Handlung, etwas zu tun". Es lässt Verben wie Nomen funktionieren.',
      rules_de: [
        '먹는 것 — das Essen / der Akt des Essens',
        '배우는 것 — das Lernen / der Akt des Lernens',
        '한국어를 배우는 것이 재미있어요 — Koreanisch zu lernen ist interessant',
        '요리하는 것을 좋아해요 — Ich mag Kochen (den Akt des Kochens)'
      ],
      tip_de: {
        label: 'Zeitformen',
        text: '-는 것 (Gegenwart/Gewohnheit) · -(으)ㄴ 것 (Vergangenheit/abgeschlossen) · -(으)ㄹ 것 (Zukunft/geplant). Die Gegenwartsform ist im Alltag am häufigsten.'
      }
    },
    48: { meaning_de: 'Koreanisch zu lernen ist interessant.' },
    49: {
      prompt_de: '-는 것 verwandelt ein Verb in...',
      choices_de: [
        'Eine Nominalphrase',
        'Vergangenheitsform',
        'Zukunftsform',
        'Eine Frage'
      ]
    },

    // Stage 17: Comparatives
    50: {
      title_de: 'Komparativ',
      body_de: 'Struktur: [A]이/가 [B]보다 더 [Adjektiv]. 보다 bedeutet „als" und 더 bedeutet „mehr".',
      rules_de: [
        '한국어가 영어보다 더 어려워요 — Koreanisch ist schwerer als Englisch',
        '오늘이 어제보다 더 더워요 — Heute ist heißer als gestern',
        '더 kann in der Umgangssprache weggelassen werden: 한국어가 영어보다 어려워요'
      ]
    },
    51: { meaning_de: 'Koreanisch ist schwerer als Japanisch.' },
    52: { prompt_de: 'Wie sagt man „mehr" in einem koreanischen Vergleich?' },

    // Stage 18: Like
    53: {
      title_de: '좋다 vs 좋아하다',
      body_de: '좋다 verwendet die Subjekt-Partikel (이/가): 한국어가 좋아요. 좋아하다 verwendet die Objekt-Partikel (을/를): 한국어를 좋아해요.',
      rules_de: [
        '좋다 — gut sein / sich gut anfühlen (Zustand): 커피가 좋아요 (Ich mag Kaffee / Kaffee ist gut)',
        '좋아하다 — mögen (aktive Vorliebe): 커피를 좋아해요 (Ich mag Kaffee)',
        'Beide werden als „Ich mag" übersetzt, aber 좋다 fokussiert auf das Gefühl, 좋아하다 auf die Vorliebe'
      ],
      tip_de: {
        label: 'Wesentlicher Unterschied',
        text: '좋아요 → davor steht die Subjekt-Partikel (이/가). 좋아해요 → davor steht die Objekt-Partikel (을/를). Im Zweifelsfall klingt 좋아해요 natürlicher zum Ausdrücken von Vorlieben.'
      }
    },

    // Stage 19: Still/Already
    54: {
      title_de: 'Noch nicht & Schon',
      body_de: '아직 + negativem Verb = noch nicht. 벌써 = schon (früher als erwartet). 이미 = schon (neutral, formell).',
      rules_de: [
        '아직 안 먹었어요 — Habe noch nicht gegessen (immer noch nicht)',
        '아직 여기 있어요 — Bin noch hier (andauernd)',
        '벌써 도착했어요? — Schon angekommen? (überrascht)',
        '이미 알아요 — Ich weiß es schon (neutral)'
      ]
    },
    55: {
      prompt_de: '아직 bedeutet?',
      choices_de: ['Noch / Noch nicht', 'Schon', 'Sogar', 'Mehr']
    },

    // Stage 20: Indefinite
    56: {
      title_de: 'Jemand, Etwas',
      body_de: 'Kombiniere Fragewörter mit Kontext, um unbestimmte Ideen wie „jemand" oder „nichts" auszudrücken.',
      rules_de: [
        '누군가 — jemand: 누군가 왔어요 (Jemand ist gekommen)',
        '무언가 / 뭔가 — etwas: 뭔가 이상해요 (Etwas ist seltsam)',
        '어딘가 — irgendwo: 어딘가에 있어요 (Es ist irgendwo)',
        '아무도 + Verneinung — niemand: 아무도 없어요 (Niemand ist hier)',
        '아무것도 + Verneinung — nichts: 아무것도 몰라요 (Ich weiß nichts)'
      ]
    },
    57: { prompt_de: '„Niemand ist hier" — 아무도 ___' },

    // Stage 21: Imperative
    58: {
      title_de: 'Befehlsform: -(으)세요',
      body_de: 'Füge -(으)세요 an einen Verbstamm an, um eine höfliche Aufforderung oder einen Befehl zu machen.',
      rules_de: [
        '가다 → 가세요 (bitte geh / gehen Sie)',
        '앉다 → 앉으세요 (bitte setz dich / setzen Sie sich)',
        '먹다 → 드세요 (bitte iss / essen Sie — Ehrenform)'
      ]
    },

    // Stage 22: Don't
    59: {
      title_de: 'Nicht: -지 마세요',
      body_de: 'Füge -지 마세요 an einen Verbstamm an, um jemandem höflich zu sagen, etwas NICHT zu tun.',
      rules_de: [
        '말하다 → 말하지 마세요 (bitte nicht reden)',
        '가다 → 가지 마세요 (bitte nicht gehen)',
        '먹다 → 먹지 마세요 (bitte nicht essen)'
      ]
    },
    60: { meaning_de: 'Bitte sprechen Sie langsam.' },
    61: { prompt_de: '„Bitte nicht reden" auf Koreanisch?' },

    // Stage 23: Method
    62: {
      title_de: 'Methode: -(으)로',
      body_de: '-(으)로 markiert die Methode oder das Mittel — „mit" oder „per" einem Werkzeug/einer Art, etwas zu tun.',
      rules_de: [
        '-(으)로 nach Konsonant, -로 nach Vokal: 버스로 가요 (mit dem Bus fahren)',
        '지하철로 와요 (mit der U-Bahn kommen)',
        '한국어로 말해요 (auf Koreanisch reden)'
      ]
    },

    // Stage 24: Good/Poor
    63: {
      title_de: 'Gut / Schlecht bei',
      body_de: '잘하다 = gut in etwas sein. 못하다 = schlecht in etwas sein. Beide werden nach der Objekt-Partikel 을/를 angehängt.',
      rules_de: [
        '한국어를 잘해요 (gut in Koreanisch)',
        '수학을 못해요 (schlecht in Mathe)',
        '수영을 잘 못해요 (nicht sehr gut im Schwimmen)'
      ]
    },
    64: { prompt_de: '„Gut in Koreanisch" — 한국어를 ___' },

    // Stage 25: All/More
    65: {
      title_de: 'Alles, Mehr: 다, 더',
      body_de: '다 = alles / alles zusammen. 더 = mehr. Beide sind einfache Adverbien, die vor dem Verb stehen.',
      rules_de: [
        '다 먹었어요 — alles gegessen / alles aufgegessen',
        '더 주세요 — gib mir bitte mehr',
        '다 und 더 werden im Kontext sehr unterschiedlich verwendet'
      ]
    },
    66: { prompt_de: '„Bitte gib mir mehr" — ___ 주세요' },

    // Stage 26: -도 Advanced
    67: {
      title_de: 'Alles, Mehr & -도',
      body_de: '-도 hat 4 fortgeschrittene Verwendungen über das einfache „auch" hinaus: Betonung, emphatische Verneinung und „sowohl...als auch".',
      rules_de: [
        '아이도 알아요 — Sogar Kinder wissen es (Betonung: unerwartete Einbeziehung)',
        '하나도 없어요 — Nicht einmal eines (emphatische Verneinung: 하나도 + Verneinung)',
        '먹기도 해요 — Isst manchmal / isst auch (-기도 하다)',
        '좋기도 하고 나쁘기도 해요 — Sowohl gut als auch schlecht'
      ]
    },
    68: { meaning_de: 'Koreanisch ist sowohl schwierig als auch interessant.' },
    69: { prompt_de: '„Sogar Kinder wissen es" — welcher -도-Gebrauch?' },
    70: {
      title_de: 'Grammatik abgeschlossen!',
      message_de: 'Du hast alle 26 Grammatikstufen gemeistert — von der SOV-Wortstellung und den Partikeln bis zu den fortgeschrittenen -도-Mustern. Fang an, diese in echten Gesprächen anzuwenden!'
    }
  }
);
