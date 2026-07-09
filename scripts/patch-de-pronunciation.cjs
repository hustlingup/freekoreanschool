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

patch('pronunciation.json',
  {
    1: { name_de: 'Batchim (받침)' },
    2: { name_de: 'Bindung (연음화)' },
    3: { name_de: 'Nasalassimilation' },
    4: { name_de: 'Verschärfung' },
    5: { name_de: 'Palatalisierung & ㄹ' },
    6: { name_de: 'Häufige Fehler' }
  },
  {
    // Stage 1: Batchim
    1: {
      title_de: 'Was ist Batchim?',
      body_de: 'Ein Batchim (받침, wörtlich „Stütze") ist ein Konsonant, der am unteren Ende eines koreanischen Silbenblocks steht. Zum Beispiel ist in der Silbe 강 das ㅇ am unteren Ende das Batchim. Nicht alle Silben haben ein Batchim — viele enden einfach mit dem Vokal. Das Batchim ist der Grund, warum koreanische Wörter wie 산, 달 und 밥 mit einem deutlichen Konsonantenlaut enden statt mit einem offenen Vokal.',
      tip_de: {
        label: 'Welche Silben haben Batchim?',
        text: 'Schaue dir jeden koreanischen Silbenblock an. Wenn sich unter dem Vokal ein Zeichen befindet, ist das das Batchim. 가 hat kein Batchim. 간 hat Batchim ㄴ. 닭 hat Doppel-Batchim ㄺ (wird als ein Laut gelesen).'
      }
    },
    2: {
      title_de: 'Die 7 Batchim-Lautgruppen',
      body_de: 'Obwohl viele verschiedene Konsonanten als Batchim in der Schreibung erscheinen können, reduzieren sich alle beim Aussprechen auf nur 7 mögliche Laute. Dies ist als die 7 Regeln des Batchim (받침 7종성) bekannt. Das Lernen dieser 7 Gruppen ist unerlässlich — es erklärt, warum 닭 (Huhn) und 국 (Suppe) beide mit dem gleichen k-Laut enden.',
      rules_de: [
        'ㄱ-Gruppe: ㄱ, ㄲ, ㅋ, ㄳ, ㄺ → ausgesprochen k (nicht freigegeben) — Beispiel: 국 (Suppe), 닭 (Huhn)',
        'ㄴ-Gruppe: ㄴ, ㄵ, ㄶ → ausgesprochen n — Beispiel: 산 (Berg), 앉다 (sitzen)',
        'ㄷ-Gruppe: ㄷ, ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ → ausgesprochen t (nicht freigegeben) — Beispiel: 옷 (Kleidung), 꽃 (Blume)',
        'ㄹ-Gruppe: ㄹ, ㄼ, ㄽ, ㄾ, ㅀ → ausgesprochen l — Beispiel: 달 (Mond), 말 (Pferd)',
        'ㅁ-Gruppe: ㅁ, ㄻ → ausgesprochen m — Beispiel: 밤 (Nacht), 삶 (Leben)',
        'ㅂ-Gruppe: ㅂ, ㅍ, ㄿ, ㄼ → ausgesprochen p (nicht freigegeben) — Beispiel: 입 (Mund), 앞 (Vorderseite)',
        'ㅇ-Gruppe: ㅇ → ausgesprochen ng — Beispiel: 강 (Fluss), 방 (Zimmer)'
      ],
      tip_de: {
        label: 'Nicht freigegebene Verschlusslaute — was bedeutet das?',
        text: 'Die k-, t- und p-Batchim-Laute sind nicht freigegeben: Der Mund nimmt die Position ein, lässt aber keinen Luftstoß heraus. Denke daran, das abschließende p in „cup" zu halten — cup_ — ohne Luft herauszulassen. Das koreanische ㄱ/ㄷ/ㅂ-Batchim funktioniert genauso.'
      }
    },
    3:  { meaning_de: 'Suppe — ㄱ-Gruppe Batchim, ausgesprochen k (nicht freigegeben)' },
    4:  { meaning_de: 'Berg — ㄴ-Gruppe Batchim, ausgesprochen n' },
    5:  { meaning_de: 'Kleidung — ㄷ-Gruppe Batchim (ㅅ→t), ausgesprochen t (nicht freigegeben)' },
    6:  { meaning_de: 'Mond — ㄹ-Gruppe Batchim, ausgesprochen l' },
    7:  { meaning_de: 'Nacht / Kastanie — ㅁ-Gruppe Batchim, ausgesprochen m' },
    8:  { meaning_de: 'Mund — ㅂ-Gruppe Batchim, ausgesprochen p (nicht freigegeben)' },
    9:  { meaning_de: 'Fluss — ㅇ-Gruppe Batchim, ausgesprochen ng' },
    10: { meaning_de: 'Huhn — Doppel-Batchim ㄺ (ㄹ+ㄱ) → ㄱ-Gruppe → k-Laut' },
    11: { meaning_de: 'Blume — Batchim ㅊ gehört zur ㄷ-Gruppe → t-Laut' },
    12: {
      prompt_de: 'ㅋ (kh), ㄲ (kk) und ㄳ sind alle Batchim derselben Gruppe. In welcher Lautgruppe sind sie?',
      choices_de: ['ㄴ-Gruppe (n)', 'ㄱ-Gruppe (k)', 'ㅂ-Gruppe (p)', 'ㄷ-Gruppe (t)']
    },
    13: {
      prompt_de: '방 (Zimmer) endet mit Batchim ㅇ. Welchen Laut macht das?',
      choices_de: ['Kein Laut — ㅇ ist immer stumm', 'ng (wie in „singen")', 'n', 'm']
    },

    // Stage 2: Liaison
    14: {
      title_de: 'Bindung — Verbindungslaut',
      body_de: 'Wenn eine Silbe mit einem Batchim endet und direkt von einer Silbe gefolgt wird, die mit dem stummen ㅇ beginnt, rückt der Batchim-Konsonant vor und wird zum Anfangskonsonanten der nächsten Silbe. Die Schreibung bleibt gleich — nur die Aussprache verändert sich. Dies wird Bindung (연음화) genannt und ist eines der häufigsten Ausspracheerscheinungen im Koreanischen.',
      tip_de: {
        label: 'Das Muster erkennen',
        text: 'Suche nach: Batchim-Konsonant + nächste Silbe beginnt mit ㅇ (stummem Platzhalter). Ergebnis: Das Batchim klingt, als würde es die nächste Silbe eröffnen. 먹어요 → 머거요. 한국어 → 한구거. Die Schreibform ändert sich nie — nur deine Aussprache ändert sich.'
      }
    },
    15: { meaning_de: 'Ich esse / esse gerade — ㄱ-Batchim von 먹 verbindet sich mit 어, klingt wie 머거요' },
    16: { meaning_de: 'Reis (Objektform) — ㅂ-Batchim von 밥 verbindet sich mit 을, klingt wie 바블' },
    17: { meaning_de: 'Es ist gut / Ich mag es — ㅎ-Batchim schwächt sich ab und verbindet sich (siehe Stufe 4 für ㅎ-Regeln)' },
    18: { meaning_de: 'Koreanische Sprache — ㄱ-Batchim von 국 verbindet sich mit 어, klingt wie 한구거' },
    19: {
      title_de: 'Warum findet Bindung statt?',
      body_de: 'Die koreanische Silbenstruktur bevorzugt stark das Muster Konsonant + Vokal. Wenn eine vokalanlautende Silbe auf ein Batchim folgt, ist es phonetisch einfacher für den Konsonanten, sich an den offenen Slot dieses Vokals zu hängen. Das Ergebnis ist ein natürlicherer, verbundener Redefluss. Dies ist kein Slang oder nachlässige Aussprache — es ist Standard-Koreanisch und wird in Nachrichtensendungen, formellen Reden und alltäglichen Gesprächen gleichermaßen gehört.',
      tip_de: {
        label: 'Bindung vs. Schreibung',
        text: 'Das geschriebene Koreanisch bewahrt den ursprünglichen Konsonanten in seiner Schreibposition, auch wenn er in der nächsten Silbe ausgesprochen wird. Das ist der Grund, warum Koreanisch lesen und Koreanisch aussprechen anfangs zwei separate Fähigkeiten sind — das Schriftsystem zeichnet Morpheme auf, nicht exakte Laute.'
      }
    },
    20: {
      prompt_de: 'Bindung (연음화) tritt auf, wenn einem Batchim eine Silbe folgt, die beginnt mit…',
      choices_de: ['Jedem Konsonanten', 'Stummes ㅇ (vokalanlautende Silbe)', 'Nur ㄴ oder ㅁ', 'Einem aspirierten Konsonanten']
    },
    21: {
      prompt_de: 'In 한국어 (Koreanische Sprache) rückt das ㄱ-Batchim von 국 vor. Wie wird es ausgesprochen?',
      choices_de: [
        '한국어 → 항궈 (bleibt in 국)',
        '한국어 → 한구거 (ㄱ eröffnet 어)',
        '한국어 → 한국어 (keine Änderung)',
        '한국어 → 한국아 (Vokal ändert sich)'
      ]
    },

    // Stage 3: Nasal Assimilation
    22: {
      title_de: 'Nasalassimilation',
      body_de: 'Wenn ein Verschlusslaut-Batchim aus den ㄱ-, ㄷ- oder ㅂ-Gruppen von den Nasalkonsonanten ㄴ oder ㅁ gefolgt wird, assimiliert sich der Verschlusslaut und wechselt zu seinem entsprechenden Nasallaut. Dies ist rein artikulatorisch: Nasalkonsonanten erfordern das Absenken des Velums, was benachbarte Verschlusslaute in den Nasalbereich zieht. Die Schreibung bleibt gleich; nur die Aussprache ändert sich.',
      rules_de: [
        'ㅂ + ㄴ/ㅁ → ㅁ: der Lippen-Verschlusslaut wird zum Lippen-Nasallaut — 입니다 → 임니다',
        'ㄱ + ㄴ/ㅁ → ㅇ: der velare Verschlusslaut wird zum velaren Nasallaut — 국물 → 궁물',
        'ㄷ + ㄴ/ㅁ → ㄴ: der alveoläre Verschlusslaut wird zum alveolären Nasallaut — 걷는다 → 건는다'
      ],
      tip_de: {
        label: 'Warum derselbe Artikulationsort?',
        text: 'Jedes Paar (ㅂ↔ㅁ, ㄱ↔ㅇ, ㄷ↔ㄴ) teilt genau denselben Artikulationsort im Mund — Lippen, Kehle hinten und Zahnleiste. Nur der nasale Luftstrom ändert sich. Der Nasalkonsonant „infiziert" den vorangehenden Verschlusslaut und zieht ihn in den Nasalbereich, während er die Mundposition beibehält.'
      }
    },
    23: { meaning_de: 'ist / bin / bist (formal) — ㅂ + ㄴ → ㅁ: geschrieben 입니다, klingt wie 임니다' },
    24: { meaning_de: 'Brühe — ㄱ + ㅁ → ㅇ: geschrieben 국물, klingt wie 궁물' },
    25: { meaning_de: 'Schuljahr / Klasse — ㄱ + ㄴ → ㅇ: geschrieben 학년, klingt wie 항년' },
    26: { meaning_de: 'geht spazieren / gehen — ㄷ + ㄴ → ㄴ: geschrieben 걷는다, klingt wie 건는다' },
    27: { meaning_de: 'Vorgarten — ㅂ + ㅁ → ㅁ: geschrieben 앞마당, klingt wie 암마당' },
    28: { prompt_de: 'ㅂ (oder ㅍ) Batchim, gefolgt von ㄴ oder ㅁ, wechselt zu welchem Laut?' },
    29: { prompt_de: 'ㄱ Batchim, gefolgt von ㄴ oder ㅁ, wechselt zu welchem Laut?' },
    30: { prompt_de: '입니다 (ist / bin / bist) — wie wird es tatsächlich ausgesprochen?' },
    31: {
      title_de: 'Das Assimilationsmuster geht immer in eine Richtung',
      body_de: 'Die Nasalassimilation geht immer in dieselbe Richtung: Der Verschlusslaut wird nasal, nie umgekehrt. Der Nasalkonsonant „infiziert" den vorangehenden Laut. Sobald du das Muster ㅂ→ㅁ, ㄷ→ㄴ, ㄱ→ㅇ erkennst, wirst du diese Veränderungen in echter koreanischer Sprache automatisch hören und vorhersagen.',
      tip_de: {
        label: 'Gedächtnistrick',
        text: 'Stell dir jedes Paar als denselben Ort in deinem Mund vor. Lippen: ㅂ (Verschlusslaut) ↔ ㅁ (Nasallaut). Kehle: ㄱ (Verschlusslaut) ↔ ㅇ (Nasallaut). Zahnleiste: ㄷ (Verschlusslaut) ↔ ㄴ (Nasallaut). Der Ort bleibt; nur das Nasenventil öffnet sich.'
      }
    },

    // Stage 4: Tensification
    32: {
      title_de: 'Verschärfung',
      body_de: 'Nach bestimmten Batchim-Konsonanten — nämlich den nicht freigegebenen Verschlusslaut-Batchim-Lauten aus den ㄱ-, ㄷ- und ㅂ-Gruppen — wird der folgende Konsonant gespannt (verdoppelt). Die Schreibform ändert sich nicht; nur die Aussprache verschiebt sich. Die Verschärfung ist der Grund, warum 학교 (Schule) wie 학꾜 klingt und nicht wie 학교.',
      tip_de: {
        label: 'Warum Verschärfung entsteht',
        text: 'Nach einem nicht freigegebenen Verschlusslaut befindet sich der Stimmtrakt bereits in einer angespannten, geschlossenen Position. Wenn du den nächsten Konsonanten aus diesem Zustand heraus beginnst, überträgt sich die zusätzliche Muskelspannung automatisch und erzeugt den gespannten Laut. Verschärfung ist nicht absichtlich — sie ist eine natürliche artikulatorische Folge. Sobald man sie in echter Sprache hört, kann man sie nicht mehr überhören.'
      }
    },
    33: { meaning_de: 'Schule — ㄱ-Batchim löst Verschärfung aus: ㄱ→ㄲ, klingt wie 학꾜' },
    34: { meaning_de: 'Restaurant — ㄱ-Batchim löst Verschärfung aus: ㄷ→ㄸ, klingt wie 식땅' },
    35: { meaning_de: 'schließen — ㄷ-Batchim löst Verschärfung aus: ㄷ→ㄸ, klingt wie 닫따' },
    36: { meaning_de: 'Eingang — ㅂ-Batchim löst Verschärfung aus: ㄱ→ㄲ, klingt wie 입꾸' },
    37: {
      prompt_de: 'Verschärfung (경음화) tritt am vorhersehbarsten nach welcher Art von Batchim auf?',
      choices_de: [
        'Nasales Batchim (ㄴ, ㅁ, ㅇ)',
        'Nicht freigegebenes Verschlusslaut-Batchim (ㄱ, ㄷ, ㅂ-Gruppen)',
        'Nur das ㄹ-Batchim',
        'Jeder Batchim-Konsonant'
      ]
    },
    38: {
      prompt_de: '학교 (Schule) — wie wird es tatsächlich ausgesprochen?',
      choices_de: ['hak-gyo', 'hak-kyo (aspiriert)', 'hak-kkyo (gespannt)', 'ha-gyo']
    },
    39: {
      title_de: 'ㅎ-Schwächung',
      body_de: 'Der Konsonant ㅎ ist einer der instabilsten Laute im Koreanischen. Zwischen Vokalen — ob ㅎ ein Batchim oder ein Anfangskonsonant ist — schwächt er sich erheblich ab und verschwindet oft fast vollständig. Das ist der Grund, warum 좋아요 (es ist gut) wie 조아요 klingt und nicht wie 조하요. Das ㅎ wird noch geschrieben, aber der Laut verschwindet fast.',
      tip_de: {
        label: 'Häufiger Anfängerfehler',
        text: 'Viele Anfänger sagen 조하요 für 좋아요 und bewahren dabei den h-Laut. In echter koreanischer Sprache klingt das unnatürlich und zu absichtlich. Die Standard-Aussprache ist 조아요 — das ㅎ verschwindet lautlos zwischen den zwei Vokalen. Vertraue der Regel: ㅎ zwischen Vokalen verschwindet fast.'
      }
    },
    40: { meaning_de: 'Es ist gut / Ich mag es — ㅎ-Batchim schwächt sich ab: klingt wie 조아요 (nicht 조하요)' },
    41: { meaning_de: 'Es gibt viel — ㅎ in ㄶ-Batchim schwächt sich ab: klingt wie 마나요' },
    42: { meaning_de: 'Ich tue es hinein — ㅎ-Batchim schwächt sich zwischen Vokalen ab: klingt wie 너어요' },
    43: {
      title_de: 'ㅎ + Konsonant = Aspiration',
      body_de: 'Wenn ㅎ-Batchim auf den Anfangskonsonanten der nächsten Silbe trifft (oder umgekehrt), verschmelzen die beiden zu einem einzigen aspirierten Konsonanten. ㅎ + ㄷ wird ㅌ. ㄱ + ㅎ wird ㅋ. ㅂ + ㅎ wird ㅍ. ㄷ + ㅎ (oder ㅎ + ㄷ) wird ㅌ. Stelle dir ㅎ vor, als füge es dem benachbarten Konsonanten einen Luftstoß hinzu.',
      rules_de: [
        'ㅎ + ㄷ → ㅌ: 놓다 (legen/loslassen) → 노타',
        'ㄱ + ㅎ → ㅋ: 착하다 (freundlich) → 차카다',
        'ㅂ + ㅎ → ㅍ: 입학 (Immatrikulation) → 이팍',
        'ㄷ + ㅎ → ㅌ: 못해요 (kann nicht) → 모태요'
      ]
    },
    44: { meaning_de: 'loslassen / legen — ㅎ-Batchim + ㄷ → ㅌ: geschrieben 놓다, klingt wie 노타' },
    45: {
      prompt_de: 'Welchen Laut erzeugt ㅎ + ㄷ (oder ㄷ + ㅎ)?',
      choices_de: ['ㄷ (einfach)', 'ㅌ (aspiriertes t)', 'ㄸ (gespannt)', 'ㅎ (bleibt h)']
    },

    // Stage 5: Palatalization & ㄹ
    46: {
      title_de: 'Palatalisierung',
      body_de: 'Wenn die Konsonanten ㄷ oder ㅌ als Batchim auftreten und von dem Vokal 이 (i) gefolgt werden, verlagern sie sich im Mund nach vorne und werden zu ㅈ bzw. ㅊ. Diese Verlagerung wird Palatalisierung genannt — der Konsonant bewegt sich von der Zahnleiste zum Gaumen, um den vorderen Vokal 이 vorzubereiten.',
      rules_de: [
        'ㄷ + 이 → ㅈ이 → 지: 굳이 (absichtlich) → 구지',
        'ㅌ + 이 → ㅊ이 → 치: 같이 (zusammen) → 가치'
      ],
      tip_de: {
        label: 'Nur morphemintern',
        text: 'Die Palatalisierung gilt nur innerhalb desselben Wortes oder wenn ein mit 이 beginnendes Suffix an den Stamm angefügt wird. Sie gilt nicht über Wortgrenzen hinweg. 같이 löst Palatalisierung aus, weil 이 Teil des Wortes ist. In einem Satz wie 옷 입어요 (Kleidung anziehen) beginnt 이 ein separates Wort — andere Regeln gelten.'
      }
    },
    47: { meaning_de: 'zusammen — ㅌ + 이 → ㅊ: geschrieben 같이, klingt wie 가치' },
    48: { meaning_de: 'absichtlich / hartnäckig — ㄷ + 이 → ㅈ: geschrieben 굳이, klingt wie 구지' },
    49: { prompt_de: 'Wenn ㄷ-Batchim von dem Vokal 이 gefolgt wird, wechselt es zu…' },
    50: { prompt_de: 'Wenn ㅌ-Batchim von dem Vokal 이 gefolgt wird, wechselt es zu…' },
    51: {
      title_de: 'Der ㄹ-Laut',
      body_de: 'Der koreanische Konsonant ㄹ wird oft als zwischen r und l liegend beschrieben — und das ist genau richtig. Seine genaue Realisierung hängt von seiner Position innerhalb der Silbe ab. Zwischen zwei Vokalen ist ㄹ ein schneller Flap der Zungenspitze gegen den Zahndamm direkt hinter den oberen Zähnen — dieselbe Bewegung wie das einfache Zungenflap-r im Deutschen (wie in „Rad" in bestimmten Dialekten) oder wie im Amerikanischen „Butter". Am Silbenende oder vor einem Konsonanten halte die Zunge leicht an diesem Zahndamm für einen sanften l-Laut.',
      tip_de: {
        label: 'Zungenflap-Technik',
        text: 'Rolle ㄹ nicht (kein Zungenr oder Rachen-r) und benutze in Vokalposition keine deutsche l-Form. In 라면 ist das ㄹ ein schneller Flap — versuche „la" zu sagen, während du an „ra" denkst. In 달 (Mond) ist das ㄹ ein gehaltenes l. In 빨리 (schnell) hast du beides: ein gehaltenes l, dann einen Flap.'
      }
    },
    52: { meaning_de: 'Instant-Nudeln — ㄹ in Anfangsposition (vor Vokal): schneller r-Flap' },
    53: { meaning_de: 'Mond — ㄹ als finales Batchim: gehaltenes l' },
    54: { meaning_de: 'schnell, rasch — verdoppeltes ㄹㄹ: gehaltenes l, dann r-Flap' },
    55: { meaning_de: 'Ich liebe dich — ㄹ zwischen Vokalen (랑→해): r-Flap-Laut' },
    56: {
      title_de: 'ㄹ + ㄴ oder ㄴ + ㄹ → ㄹㄹ (Lateralisierung)',
      body_de: 'Wenn ㄹ und ㄴ zwischen Silben benachbart auftreten, werden beide zu ㄹ — dies wird Lateralisierung (유음화) genannt. Beispiel: 신라 (Silla-Dynastie) wird 실라 (silla) ausgesprochen, nicht sin-ra. Ebenso wird 연락 (Kontakt) 열락 (yeollak) ausgesprochen. Das ㄴ verwandelt sich vollständig in ㄹ, wenn es an ㄹ angrenzt.',
      tip_de: {
        label: 'Warum Lateralisierung?',
        text: 'ㄹ und ㄴ teilen sehr ähnliche Zungenposition — beide sind alveoläre Laute, die am Zahndamm gebildet werden. Wenn sie nebeneinander erscheinen, zieht das stärkere (laterale) ㄹ das ㄴ in sein Gebiet. Dies ist eine der auffälligsten Lautveränderungen, weil die Schreibung keinerlei visuellen Hinweis darauf gibt.'
      }
    },
    57: { prompt_de: '신라 (Silla — ein historisches koreanisches Königreich) wird ausgesprochen als…' },

    // Stage 6: Common Mistakes (adapted for German speakers)
    58: {
      title_de: '6 Häufige Fehler für Deutschsprachige',
      body_de: 'Koreanisch und Deutsch haben sehr unterschiedliche Lautsysteme. Die nächsten sechs Schritte behandeln jeweils einen häufigen Aussprache-Fehler — mit klaren Erklärungen, wie man ihn korrigiert. Diese Muster frühzeitig zu erkennen spart Monate schlechter Gewohnheiten.',
      tip_de: {
        label: 'Was macht sie so häufig?',
        text: 'Deutschsprachige wenden automatisch die deutsche Phonologie auf neue Laute an. Das Koreanische hat Vokale, Konsonantengegensätze und Intonationsmuster, die es im Deutschen schlicht nicht gibt. Jeder dieser Fehler entsteht dadurch, einen koreanischen Laut auf das nächste deutsche Äquivalent zu übertragen — was fast immer falsch ist.'
      }
    },
    59: {
      title_de: 'Fehler 1 — ㅡ wie „ü" oder „u" aussprechen',
      body_de: 'ㅡ hat im Deutschen kein genaues Äquivalent. Es ist ein hinterer ungerundeter Vokal — die Zunge befindet sich in der „ü"-Position, aber die Lippen sind völlig flach und ungerundet, als würde man „ih" mit gestrecktem Mund sagen. Wörter wie 으, 크다, 든지 verwenden diesen Laut. Sobald die Lippen runden, sprichst du den falschen Vokal aus.',
      tip_de: {
        label: 'Wie man ㅡ übt',
        text: 'Sage „ü" wie in „Hütte". Halte nun die Zunge in genau dieser Position, aber strecke die Lippen flach, als würdest du leicht lächeln. Der Laut, der herauskommt — steif, ungerundet, leicht nach hinten — ist ㅡ. Entspanne die Zunge nicht zu einem offenen „a"; halte sie hoch und hinten.'
      }
    },
    60: {
      title_de: 'Fehler 2 — ㅓ wie deutsches „ö" behandeln',
      body_de: 'ㅓ wird oft als „eo" transkribiert — aber es ist nicht das deutsche „ö" aus „schön", das stark gerundet ist. Das koreanische ㅓ ist ein mittlerer hinterer ungerundeter Vokal. Denke an ein entspanntes, offenes „uh" ohne jegliche Lippenrundung und ohne Spannung. Das Hinzufügen von Lippenrundung lässt den Vokal sofort fremd klingen.',
      tip_de: {
        label: 'Schnelltest',
        text: 'Sage „Uh-oh" (englisch). Die erste Silbe „Uh" — flach, mittelhinterer Position, ohne Lippenrundung — ähnelt ㅓ sehr. Spanne sie nicht, runde sie nicht. Einfach ein offenes, neutrales Geräusch. Übungswörter: 어, 어머니, 뭐.'
      }
    },
    61: {
      title_de: 'Fehler 3 — Doppelkonsonanten aspirieren',
      body_de: 'Deutschsprachige fügen natürlich Aspiration zu Verschlusslauten hinzu. Die gespannten (doppelten) koreanischen Konsonanten ㄲ, ㄸ, ㅃ, ㅆ, ㅉ werden niemals aspiriert. Sie werden mit angespannten Muskeln und ohne Luftausstoß gebildet. Halte ein Blatt Papier vor den Mund — es sollte sich nicht bewegen, wenn du 까, 따, 빠, 싸, 짜 sagst. Der Gegensatz ist zwischen festgehalten-gespannt und Luftausstoß.',
      tip_de: {
        label: 'Der Papiertest',
        text: 'Aspirierte Konsonanten (ㅋ, ㅌ, ㅍ, ㅊ) lassen das Papier deutlich flattern. Einfache Konsonanten (ㄱ, ㄷ, ㅂ, ㅈ) lassen es leicht zittern. Gespannte Konsonanten (ㄲ, ㄸ, ㅃ, ㅉ) sollten das Papier kaum bewegen — hohe Muskelspannung, null Luftausstoß.'
      }
    },
    62: {
      title_de: 'Fehler 4 — Steigende Intonation bei allen Fragen',
      body_de: 'Im Deutschen signalisiert steigende Intonation am Satzende eine Frage. Im Koreanischen sind die Intonationsregeln anders: Ja/Nein-Fragen verwenden tatsächlich einen leichten Anstieg am Ende, aber W-Fragen (wer, was, wo, wann, warum, wie) verwenden typischerweise eine fallende oder neutrale Intonation — nicht steigende. Zu viel steigende Intonation bei allen koreanischen Fragen klingt unnatürlich und manchmal unsicher oder flehend.',
      tip_de: {
        label: 'Das Muster, das man sich merken sollte',
        text: 'Ja/Nein-Frage: leichter Anstieg am Ende. Beispiel: 갔어요? (Bist du gegangen?) — endet steigend. W-Frage: neutral oder fallend. Beispiel: 어디 갔어요? (Wo bist du gegangen?) — endet flach oder fallend. Das Fragewort trägt genug Information; kein steigendes Tonmuster nötig.'
      }
    },
    63: {
      title_de: 'Fehler 5 — ㅅ vor i-Vokalen wie einfaches „s" aussprechen',
      body_de: 'Vor den Vokalen 이, 야, 여, 요, 유 wird der Konsonant ㅅ wie „sch" ausgesprochen. Also ist 시 „schi" nicht „si", und 셔츠 (Hemd) beginnt mit „sch". Dies gilt auch für das gespannte ㅆ vor 이 → „sschi". Deutschsprachige, die zuerst die Romanisierung gelernt haben, sagen oft „si", wo Muttersprachler „schi" sagen, was sofort auffällt.',
      tip_de: {
        label: 'Welche Vokale lösen das aus?',
        text: 'Das palatalisierte ㅅ (sch-Laut) tritt vor i-Klasse-Vokalen auf: 이 (i), 야 (ya), 여 (yeo), 요 (yo), 유 (yu). Vor allen anderen Vokalen — 아, 어, 오, 우, 으 und ihren Verbindungen — bleibt ㅅ ein einfaches s. 사 ist „sa", aber 시 ist „schi".'
      }
    },
    64: {
      title_de: 'Fehler 6 — Das ㅎ in 좋아요 aussprechen',
      body_de: 'Anfänger sagen oft „jo-ha-yo" für 좋아요 und behandeln ㅎ als klar ausgesprochenen h-Laut. Aber aufgrund der ㅎ-Schwächung zwischen Vokalen (die du in Stufe 4 gelernt hast) ist die tatsächliche Aussprache 조아요 (jo-a-yo) — das ㅎ verschwindet fast. Das gilt im Wesentlichen: 많아요 → 마나요, 낳아요 → 나아요. Wann immer ㅎ in natürlicher Sprache zwischen Vokalen steht, verblasst es.',
      tip_de: {
        label: 'Rückblick auf Stufe 4',
        text: 'Du hast bereits die ㅎ-Schwächung und ㅎ + Konsonant-Aspiration gelernt. Fehler 6 ist einfach der häufigste reale Ort, wo Anfänger auf ㅎ-Schwächung stoßen und einen Fehler machen. 좋아요 ist wohl die am häufigsten verwendete Adjektivform im Koreanischen — ihre Aussprache zu beherrschen ist sofort wichtig.'
      }
    },
    65: {
      prompt_de: 'Beim Aussprechen von ㅡ sollten deine Lippen…',
      choices_de: [
        'Gerundet wie „u"',
        'Flach und ungerundet (gespreizt)',
        'Leicht geöffnet wie „a"',
        'Gespitzt wie ein Kuss'
      ]
    },
    66: {
      prompt_de: 'ㅅ vor dem Vokal 이 klingt wie…',
      choices_de: [
        'Einfaches „s" wie in „See"',
        '„sch" wie in „schön"',
        '„z" wie in „Zebra"',
        '„t" wie in „Tee"'
      ]
    },
    67: { prompt_de: '좋아요 (es ist gut / ich mag es) wird tatsächlich ausgesprochen als…' },
    68: {
      title_de: 'Ausspracheführer abgeschlossen!',
      message_de: 'Du hast alle 8 koreanischen Ausspracheregeln gemeistert: Batchim-Reduzierung, Bindung, Nasalassimilation, Verschärfung, ㅎ-Schwächung, ㅎ-Aspiration, Palatalisierung und den ㄹ-Laut. Dazu die 6 häufigsten Fehler für Deutschsprachige — und wie man sie vermeidet. Deine koreanische Aussprache wird sich jetzt viel natürlicher anhören.'
    }
  }
);
