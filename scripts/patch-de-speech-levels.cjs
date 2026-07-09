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

patch('speech-levels.json',
  {
    1: { name_de: '합쇼체 (Formell)' },
    2: { name_de: '해요체 (Höflich)' },
    3: { name_de: '반말 (Informell)' },
    4: { name_de: 'Einen Stil wählen' }
  },
  {
    1: {
      title_de: 'Überblick über koreanische Sprachebenen',
      body_de: 'Das Koreanische hat ein System von Sprachebenen (높임말), das bestimmt, wie formell oder höflich deine Sprache ist. Die gewählte Ebene hängt von der sozialen Beziehung, dem Alter, dem Rang und dem Kontext des Gesprächs ab. Die drei Ebenen, denen du am häufigsten begegnen wirst, sind: 합쇼체 (formell höflich, in Präsentationen, Militär und Kundenservice), 해요체 (alltäglich höflich, Standard für Erwachsene im Gespräch mit nicht engen Bekannten) und 반말 (Umgangssprache, mit engen Freunden und jüngeren Personen). Die falsche Ebene zu wählen kann unhöflich, kalt oder zu vertraut wirken.',
      tip_de: {
        label: 'Warum Sprachebenen in Korea wichtig sind',
        text: 'Korea ist eine hierarchische Gesellschaft, geprägt von konfuzianischen Werten — Alter, Rang und Beziehung bestimmen, wie man spricht. 반말 (Umgangssprache) mit einem Fremden oder einer älteren Person zu verwenden ist unhöflich. Übertriebenes 합쇼체 mit einem Freund kann steif und distanziert wirken. Die richtige Ebene zu wählen ist eine wichtige soziale Fähigkeit.'
      }
    },
    2: {
      title_de: '합쇼체 — Der Formelle Stil',
      body_de: '합쇼체 ist die höchste formelle Sprachebene im Koreanischen. Sie wird in TV-Nachrichten, Militärbefehlen, formellen Präsentationen, Hotel- und Flughafenpersonal sowie im Kundenservice verwendet. Verbendungen wechseln zu -ㅂ니다/-습니다 für Aussagen und -ㅂ니까?/-습니까? für Fragen. Auch das Vokabular ändert sich — 밥 (Essen) wird 식사, 있어요 wird 있습니다. Diese Ebene signalisiert maximalen Respekt und Professionalität.',
      tip_de: {
        label: 'Wo man 합쇼체 hört',
        text: 'Schalte koreanische Nachrichten ein (KBS, MBC, SBS) und du wirst überall 합쇼체 hören. Hotelpersonal, Flughafen-Durchsagen, formelle Zeremonien und militärische Umgebungen nutzen alle diese Ebene. Sie wird auch in formellen Schriftstücken verwendet, obwohl der reine Schreibstil (문어체) leicht abweicht.'
      }
    },
    3: { meaning_de: 'ist / bin / sind — formelle Aussage-Endung' },
    4: { meaning_de: 'Danke (formell)' },
    5: { meaning_de: 'Guten Tag? / Wie geht es Ihnen? (formeller Gruß, Frageform)' },
    6: {
      prompt_de: '합쇼체 lässt sich am besten beschreiben als…',
      choices_de: [
        'Umgangssprache',
        'die formellste Sprachebene',
        'informell höflich',
        'Slang'
      ]
    },
    7: {
      title_de: '합쇼체 Verbendungen (-ㅂ니다/-습니다)',
      body_de: 'Das Erkennungszeichen von 합쇼체 ist die Endung -ㅂ니다/-습니다. Verwende -ㅂ니다 nach Verbstämmen, die auf einen Vokal enden: 가다 → 갑니다 (Ich gehe). Verwende -습니다 nach Stämmen, die auf einen Konsonanten enden: 먹다 → 먹습니다 (Ich esse). Für Fragen wechselt die Endung zu -ㅂ니까?/-습니까?: 가다 → 갑니까? (Gehen Sie?). Aussprache-Hinweis: 갑니다 wird [감니다] ausgesprochen aufgrund nasaler Assimilation.',
      tip_de: {
        label: 'Ausspracheänderung in -ㅂ니다',
        text: '갑니다 (Ich gehe) wird 갑니다 geschrieben, aber 감니다 ausgesprochen. Das liegt daran, dass ㅂ vor ㄴ durch nasale Assimilation zu ㅁ wird (gleiche Mundstellung, nasaler Luftstrom). Dieses Muster erscheint in allen 합쇼체-Formen.'
      }
    },
    8: { meaning_de: 'Ich esse / esse gerade (formell)' },
    9: { meaning_de: 'Ich gehe / gehe gerade (formell) — ausgesprochen 감니다' },
    10: {
      title_de: '해요체 — Alltäglich Höfliche Sprache',
      body_de: '해요체 ist die Sprachebene, die du im koreanischen Alltag am häufigsten verwenden wirst. Sie ist höflich genug für Fremde und Bekannte, aber warm genug, um natürlich zu wirken. Die Endung -아요/-어요/-해요 wird an den Verbstamm angehängt. 해요체 wird in Geschäften, mit Kollegen, zu denen du nicht sehr nah bist, mit Erwachsenen, die du zum ersten Mal triffst, und in den meisten Lerner-Muttersprachler-Interaktionen verwendet. Es ist das „Standard-Höflich" des Koreanischen.',
      tip_de: {
        label: '해요체 ist deine Standardeinstellung',
        text: 'Im Zweifelsfall: 해요체 verwenden. Es ist die sicherste und universell geeignetste Ebene in Korea. Höflich-respektvoll zu sein macht man nie falsch. Zu 합쇼체 oder 반말 wechseln sollte nur geschehen, wenn die Situation es eindeutig erfordert.'
      }
    },
    11: { meaning_de: 'Hallo / Guten Tag (höflicher Alltagsgruß)' },
    12: { meaning_de: 'Danke (höflich, weniger formell als 감사합니다)' },
    13: { meaning_de: 'Ich esse / esse gerade (höflich)' },
    14: { meaning_de: 'Ich gehe / gehe gerade (höflich)' },
    15: {
      prompt_de: '해요체 lässt sich am besten beschreiben als…',
      choices_de: [
        'sehr formell / Nachrichten-Koreanisch',
        'die informellste Form',
        'alltäglich höflich / Standard-Erwachsenensprache',
        'archaisches Honorativ'
      ]
    },
    16: {
      title_de: 'Das -아요 / -어요 Muster',
      body_de: 'Die 해요체-Endungsregel: Füge -아요 hinzu, wenn der letzte Vokal des Stammes ㅏ oder ㅗ ist (helle Vokale), und -어요 für alle anderen Vokale. 하다-Verben verwenden stattdessen -해요. Beispiele: 가다 → 가 + 아요 = 가요 (kontrahiert). 먹다 → 먹 + 어요 = 먹어요. 공부하다 → 공부해요. In der Praxis kontrahieren 아/어 häufig mit dem Endvokal des Stammes: 가 + 아요 → 가요, 오 + 아요 → 와요.',
      tip_de: {
        label: 'Schnelle Übersicht',
        text: '가다 → 가요. 오다 → 와요. 먹다 → 먹어요. 마시다 → 마셔요. 하다 → 해요. 보다 → 봐요. 자다 → 자요. Die Endungen folgen einem Vokalharmonie-Muster — versuche, den Unterschied zwischen hellen/dunklen Vokalen im Stamm zu erkennen.'
      }
    },
    17: { meaning_de: 'Es ist gut / Ich mag es (höfliche Gegenwartsform)' },
    18: {
      prompt_de: 'Welche Form von „Ich gehe" ist 해요체 (alltäglich höflich)?',
      choices_de: ['가', '갑니다', '가요', '가라']
    },
    19: {
      title_de: '반말 — Umgangssprache',
      body_de: '반말 (ban-mal, wörtlich „halbe Sprache") ist die umgangssprachliche Ebene, die unter engen Freunden ähnlichen Alters, gegenüber jüngeren Personen und in der Familie verwendet wird. Sie lässt das -요 von 해요체-Endungen weg: 가요 → 가, 먹어요 → 먹어, 좋아요 → 좋아. 반말 kann unhöflich klingen, wenn es gegenüber älteren oder fremden Personen verwendet wird — beginne immer mit 해요체 und wechsle nur zu 반말, wenn die andere Person es initiiert oder ausdrücklich vorschlägt. In K-Dramas signalisiert der Wechsel von 해요체 zu 반말 eine bedeutende Veränderung der Vertrautheit.',
      tip_de: {
        label: 'Erlaubnis für 반말 einholen',
        text: 'Eine natürliche Möglichkeit, um Erlaubnis zu bitten: „말 놓아도 돼요?" (Darf ich locker sprechen?) oder „반말해도 돼요?" (Ist es okay, 반말 zu verwenden?). Du kannst auch warten, bis die andere Person von sich aus wechselt — das ist deine Einladung.'
      }
    },
    20: { meaning_de: 'Hi / Tschüss (informeller Gruß und Abschied)' },
    21: { meaning_de: 'Danke (informell)' },
    22: { meaning_de: 'essen / ich esse (informell)' },
    23: { meaning_de: 'gehen / ich gehe (informell)' },
    24: {
      prompt_de: 'Welcher Gruß ist 반말 (informell)?',
      choices_de: ['안녕하세요', '안녕하십니까', '안녕', '반갑습니다']
    },
    25: {
      title_de: 'Wann man 반말 verwendet (und wann NICHT)',
      body_de: 'Verwende 반말 mit: engen Freunden ähnlichen Alters, jüngeren Geschwistern, jüngeren Schülern oder Kindern. Verwende 반말 NICHT mit: Fremden, jemandem, der älter ist als du, deinem Chef oder Lehrer, dem Servicepersonal oder Personen, die du gerade erst kennengelernt hast (auch wenn sie gleich alt erscheinen). Der häufigste Fehler von Koreanisch-Lernenden ist die Annahme, dass 반말 angemessen ist, weil jemand freundlich ist. Freundlichkeit und die Erlaubnis für 반말 sind getrennt — warte immer auf ein Signal.',
      tip_de: {
        label: 'Eine Ausnahme: Selbstgespräch',
        text: 'Wenn Koreaner mit sich selbst reden, murmeln oder Tagebuch schreiben, verwenden sie 반말 oder sogar einen neutralen Stil ohne Endungen. Das ist natürlich und richtet sich an niemanden — daher ist keine Höflichkeit nötig. Deshalb sind Drama-Monologe und innere Gedanken in 반말.'
      }
    },
    26: {
      prompt_de: 'Du redest auf der Straße mit einem gleichaltrigen Fremden. Welche Ebene solltest du verwenden?',
      choices_de: [
        '반말',
        '해요체',
        'Beide gehen',
        'Nur 합쇼체'
      ]
    },
    27: {
      title_de: '문어체 — Schriftlicher/Formeller Stil',
      body_de: '문어체 (mun-eo-che, „Schriftsprachstil") wird in formellen Schriftstücken verwendet — wissenschaftliche Arbeiten, Zeitungsartikel, Rechtsdokumente und Literatur. Die Verbendung ist -다 (die reine Wörterbuchform): 가다, 먹는다, 했다. Im gesprochenen Gespräch klingt es unnatürlich, erscheint aber überall im geschriebenen Koreanisch. Lernende begegnen diesem Stil beim Lesen koreanischer Texte und fragen sich, warum er sich von dem Gelernten unterscheidet — das liegt daran, dass Lehrbücher gesprochene Register lehren, während das Lesen das Erkennen von 문어체 erfordert.',
      tip_de: {
        label: '문어체 vs 합쇼체',
        text: 'Beide sind formell, aber 합쇼체 ist für die Sprache (Sprecher zu Hörer) und 문어체 ist für das Schreiben (kein spezifischer Hörer). Ein Nachrichtensprecher spricht in 합쇼체. Ein Zeitungsartikel ist in 문어체. In K-Dramas hörst du 문어체, wenn Figuren aus Büchern oder Briefen vorlesen.'
      }
    },
    28: { meaning_de: 'sein (Kopula, Schrift-/Wörterbuchform)' },
    29: {
      title_de: 'Vergleichstabelle der Sprachebenen',
      body_de: 'So sieht dieselbe Aussage auf allen Sprachebenen aus. „Ich esse": 먹습니다 (formell 합쇼체) → 먹어요 (höflich 해요체) → 먹어 (informell 반말) → 먹는다 (schriftlich 문어체). „Danke": 감사합니다 (formell) → 감사해요 (höflich) → 고마워 (informell). „Ich gehe": 갑니다 (formell) → 가요 (höflich) → 가 (informell) → 간다 (schriftlich). Das Erkennen dieser Muster hilft dir, beim Ansehen koreanischer Dramas oder beim Zuhören von Muttersprachlern zu erkennen, welche Ebene verwendet wird.',
      tip_de: {
        label: 'K-Dramas zum Trainingshören nutzen',
        text: 'K-Dramas sind eine Goldgrube für das Üben von Sprachebenen. Chefs sprechen mit ihrem Team in 합쇼체. Freunde wechseln untereinander zu 반말. Szenen in Krankenhäusern oder Büros verwenden 해요체. Wenn du einen plötzlichen Wechsel der Sprachebene zwischen Figuren bemerkst — das ist ein dramatischer Moment.'
      }
    },
    30: {
      prompt_de: '감사합니다 ist die ___ Form von „Danke"',
      choices_de: ['반말', '해요체', '합쇼체', '문어체']
    },
    31: {
      prompt_de: 'Bei einem Vorstellungsgespräch in Korea: Welche Sprachebene solltest du verwenden?',
      choices_de: ['반말', '해요체', '합쇼체', '문어체']
    },
    32: {
      title_de: 'Sprachebenen mischen — Ein häufiger Fehler',
      body_de: 'Einer der häufigsten Lernfehler ist das Mischen von Sprachebenen — in einem Satz 먹어요 (해요체) und im nächsten 먹습니다 (합쇼체) zu verwenden. Muttersprachler bemerken das sofort. Es klingt, als würde man Formelles und Informelles in einem Atemzug mischen. Wähle eine Ebene für das Gespräch und bleibe dabei. Die einzige Ausnahme ist ein bewusster Wechsel zu rhetorischen Zwecken (wie eine Geschäfts-E-Mail, die formell beginnt und warm endet), aber selbst das folgt klaren Mustern.',
      tip_de: {
        label: 'Endungen nicht mitten im Satz mischen',
        text: 'Falsch: 저는 학생이에요. 공부합니다. (Mischung aus 해요체 und 합쇼체). Richtig: 저는 학생이에요. 공부해요. (Alles 해요체). Oder: 저는 학생입니다. 공부합니다. (Alles 합쇼체). Konsequenz in einem Gespräch signalisiert Flüssigkeit und soziales Bewusstsein.'
      }
    },
    33: {
      title_de: 'Sprachebenen abgeschlossen!',
      message_de: 'Du hast das koreanische Sprachebenen-System gemeistert — das formelle 합쇼체, das alltägliche 해요체, das informelle 반말 und das schriftliche 문어체. Du bist jetzt ausgerüstet, soziale Situationen zu lesen und auf der richtigen Ebene zu sprechen.'
    }
  }
);
