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

patch('shopping.json',
  {
    1: { name_de: 'Einkaufsvokabular' },
    2: { name_de: 'Im Geschäft' },
    3: { name_de: 'Preise & Zahlen' },
    4: { name_de: 'Transaktionen' }
  },
  {
    1: {
      title_de: 'Einkaufen in Korea (쇼핑)',
      body_de: 'Korea hat eine reiche Einkaufskultur — von traditionellen Märkten im Freien (시장) über hochwertige Kaufhäuser (백화점) bis hin zu 24-Stunden-Supermärkten (편의점) an jeder Ecke. Auf traditionellen Märkten ist Feilschen normal, in Kettenshops oder Einkaufszentren jedoch nicht. Wenn du lernst, Preise zu erfragen, Artikel zu vergleichen und Einkäufe auf Koreanisch abzuwickeln, wird dein Einkaufserlebnis viel flüssiger und persönlicher. Die wichtigste Frage, die du ständig brauchen wirst, ist 얼마예요? (Wie viel kostet es?)',
      tip_de: {
        label: 'Gwangjang-Markt vs. Kaufhaus',
        text: 'Auf traditionellen Märkten wie dem 광장시장 (Gwangjang-Markt) in Seoul kannst du handeln — besonders wenn du mehrere Artikel kaufst. Im 롯데백화점 (Lotte-Kaufhaus) oder in jeder Kette sind die Preise fest. Achte auf 세일 (Sale)-Schilder und 할인 (Rabatt)-Aktionen.'
      }
    },
    2: { meaning_de: 'Geschäft / Laden' },
    3: { meaning_de: 'Markt (traditioneller Freiluftmarkt)' },
    4: { meaning_de: 'Kaufhaus / Warenhaus' },
    5: { meaning_de: 'Supermarkt / Convenience-Store' },
    6: {
      prompt_de: 'Welches Wort bedeutet „Markt" (traditioneller Freiluftmarkt)?',
      choices_de: ['가게', '백화점', '시장', '편의점']
    },
    7: {
      title_de: 'Einkaufsartikel (쇼핑 물건)',
      body_de: 'Das Koreanische verwendet viele Lehnwörter für moderne Produkte — 핸드폰 (Handy), 노트북 (Laptop), 티셔츠 (T-Shirt). Native koreanische und sino-koreanische Wörter decken traditionelle Artikel ab: 옷 (Kleidung), 신발 (Schuhe), 가방 (Tasche). Beim Einkaufen zeigst du oft auf etwas und sagst 이거 (das hier) — eine einfache und wirkungsvolle Strategie. Größen werden häufig als Free-Size (프리 사이즈), Small (S), Medium (M) und Large (L/XL) angegeben.',
      tip_de: {
        label: '이거 주세요 — dein Einkaufs-Lebensretter',
        text: '이거 주세요 (Ich nehme das bitte) + 얼마예요? (Wie viel kostet es?) bringt dich durch die meisten koreanischen Einkaufssituationen, auch wenn du sonst wenig Koreanisch kannst. Zeig hin, sag diese zwei Sätze — fertig.'
      }
    },
    8: { meaning_de: 'Kleidung / Outfit' },
    9: { meaning_de: 'Schuhe / Schuhwerk' },
    10: {
      title_de: 'Wichtige Einkaufsphrasen (쇼핑 표현)',
      body_de: 'Ein paar grundlegende Phrasen decken fast jede Einkaufssituation ab. 얼마예요? (Wie viel kostet es?) funktioniert für jede Preisanfrage. 이거 주세요 (Gib mir bitte das hier) schließt einen Kauf ab. 더 싸게 해 주세요 (Mach es bitte billiger) wird zum Feilschen auf traditionellen Märkten verwendet. 있어요? (Haben Sie...?) + Artikelname fragt, ob etwas vorrätig ist. 없어요 bedeutet, dass es ausverkauft oder nicht verfügbar ist.',
      tip_de: {
        label: 'Höflicher Ton im Laden',
        text: 'In koreanischen Geschäften wirst du oft mit 어서 오세요! (Willkommen!) begrüßt. Antworte mit einem Nicken oder 안녕하세요. Nach dem Einkauf ist 감사합니다 (danke) immer willkommen. Im Laden zu rufen ist selten — tritt näher heran, bevor du sprichst.'
      }
    },
    11: { meaning_de: 'Wie viel kostet es?' },
    12: { meaning_de: 'Gib mir bitte das hier / Ich nehme das' },
    13: { meaning_de: 'Mach es bitte billiger / Kannst du mir einen Rabatt geben?' },
    14: {
      prompt_de: 'Wie fragt man auf Koreanisch „Wie viel kostet es?"?',
      choices_de: ['이거 주세요', '얼마예요?', '감사합니다', '있어요?']
    },
    15: {
      title_de: 'Nach Verfügbarkeit fragen (있어요? / 없어요)',
      body_de: '있어요? (Ist da? / Haben Sie?) und 없어요 (Nein / Wir haben es nicht) sind zwei der nützlichsten Wörter beim koreanischen Einkaufen. Stelle einen Artikel vor 있어요?: 이거 있어요? (Haben Sie das?), 더 큰 사이즈 있어요? (Haben Sie eine größere Größe?). 없어요 ist die Antwort, wenn etwas ausverkauft ist. Du kannst auch 다 팔렸어요 (Alles ausverkauft) ausführlicher sagen.',
      tip_de: {
        label: '있다 vs 없다',
        text: '있다 = existieren / haben. 없다 = nicht existieren / nicht haben. 있어요? allein am Satzende = Haben Sie...? 없어요. = Wir haben es nicht. Diese beiden Wörter erscheinen in fast jedem koreanischen Satz, der Besitz, Ort oder Verfügbarkeit thematisiert.'
      }
    },
    16: { meaning_de: 'Es gibt / Ich habe / Wir haben (höflich)' },
    17: { meaning_de: 'Es gibt nicht / Wir haben es nicht / Ausverkauft' },
    18: {
      prompt_de: '없어요 bedeutet…',
      choices_de: [
        'Wir haben es',
        'Wie viel?',
        'Es gibt keins / Wir haben es nicht',
        'Ja bitte'
      ]
    },
    19: {
      title_de: 'Koreanisches Geld & Preise (원)',
      body_de: 'Die koreanische Währung ist der 원 (Won, ₩). Preise können groß aussehen, da 1.000 Won ≈ 0,75 USD. Ein Kaffee kostet etwa 4.500원, ein Essen 8.000–12.000원. 비싸다 (teuer) und 싸다 (billig) sind die wichtigsten Meinungswörter. Das Wechselgeld heißt 거스름돈. Preise auf traditionellen Märkten sind oft verhandelbar — 깎아 주세요 (Gib mir bitte einen Rabatt) oder 더 싸게요? (Geht es billiger?) eröffnet das Feilschen.',
      tip_de: {
        label: 'Koreanische Preise lesen',
        text: 'Das Koreanische verwendet sino-koreanische Zahlen für Preise: 일(1) 이(2) 삼(3) 사(4) 오(5). 만 = 10.000. Also: 삼만 오천 원 = 35.000 Won. Kassierer zeigen dir den Betrag oft auf einem Taschenrechner oder Bildschirm, um Missverständnisse zu vermeiden — Zahlen zeigen funktioniert bestens.'
      }
    },
    20: { meaning_de: 'Won — koreanische Währung (₩)' },
    21: { meaning_de: 'teuer sein' },
    22: { meaning_de: 'billig / günstig sein' },
    23: { meaning_de: 'Rabatt / Sonderangebot' },
    24: {
      prompt_de: '비싸다 bedeutet…',
      choices_de: [
        'billig sein',
        'kostenlos sein',
        'teuer sein',
        'im Angebot sein'
      ]
    },
    25: { meaning_de: 'Wechselgeld (Geld, das nach dem Bezahlen zurückgegeben wird)' },
    26: {
      prompt_de: 'Welches Wort bedeutet „Wechselgeld" (Geld, das man nach dem Bezahlen zurückbekommt)?',
      choices_de: ['거스름돈', '비싸다', '할인', '원']
    },
    27: {
      title_de: 'Zahlungsmethoden (결제 방법)',
      body_de: 'Korea ist eine äußerst bargeldlose Gesellschaft — die meisten Orte akzeptieren Kreditkarten (신용카드) oder Debitkarten (체크카드), und mobiles Bezahlen via Apps wie KakaoPay und Samsung Pay ist extrem verbreitet. Bargeld (현금) wird zwar überall akzeptiert, aber seltener verwendet. Beim Bezahlen kann man gefragt werden: 카드요, 현금이요? (Karte oder Bargeld?). Eine Quittung anfordern heißt 영수증 주세요. Tax-Refund-Schilder in Geschäften bedeuten, dass Touristen die Mehrwertsteuer am Flughafen zurückfordern können.',
      tip_de: {
        label: 'KakaoPay & Samsung Pay',
        text: 'KakaoPay (카카오페이) und Samsung Pay (삼성페이) sind die führenden mobilen Zahlungs-Apps in Korea. Touristen können internationale Kreditkarten fast überall verwenden. Achte auf das Kontaktlos-Zahlungssymbol — Koreas Akzeptanz von kontaktlosem Bezahlen gehört zu den höchsten weltweit.'
      }
    },
    28: { meaning_de: 'Ich zahle mit Karte' },
    29: { meaning_de: 'Ich zahle bar (bescheidene Form)' },
    30: { meaning_de: 'Bitte gib mir eine Quittung' },
    31: {
      prompt_de: 'Wie sagt man „Ich zahle mit Karte"?',
      choices_de: [
        '현금으로 드릴게요',
        '카드로 할게요',
        '거스름돈 주세요',
        '결제해 주세요'
      ]
    },
    32: { meaning_de: 'Gib mir bitte einen Rabatt / Senke bitte den Preis' },
    33: {
      title_de: 'Einkaufen abgeschlossen!',
      message_de: 'Du bist bereit, in Korea einzukaufen! Du kennst das wichtigste Vokabular, Phrasen zum Preiserfragen, Feilschen, Verfügbarkeit prüfen und Zahlungstransaktionen abschließen.'
    }
  }
);
