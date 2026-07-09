#!/usr/bin/env node
// Generate de/, culture/de/, travel/de/, news/de/ pages from fr/ sources.
// Strategy: path/URL substitutions + chrome text translations.
'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function mkdir(p) { fs.mkdirSync(p, { recursive: true }); }

// ── Chrome text: French → German ──────────────────────────────
// Order matters: longer strings first to avoid partial replacements.
const CHROME = [
  // metadata titles / descriptions
  ['Apprenez le Coréen Gratuitement', 'Koreanisch kostenlos lernen'],
  ['Apprenez le coréen gratuitement — leçons, K-culture, voyages et actualités pour tous les niveaux.',
   'Koreanisch kostenlos lernen — Lektionen, K-Culture, Reisen und Nachrichten für alle Niveaus.'],
  ['À propos | 한국어 학교 — Korean School', 'Über uns | 한국어 학교 — Korean School'],
  ['À propos de Korean School — plateforme gratuite d\'apprentissage du coréen et de la culture. Sans inscription, sans connexion, progression sauvegardée localement.',
   'Über Korean School — kostenlose Plattform zum Koreanisch- und Kulturlernen. Ohne Registrierung, ohne Login, Fortschritt lokal gespeichert.'],
  ['Contact | 한국어 학교 — Korean School', 'Kontakt | 한국어 학교 — Korean School'],
  ['Contactez Korean School — écrivez-nous pour des commentaires, signaler des erreurs ou des demandes de collaboration.',
   'Kontaktiere Korean School — schreib uns für Feedback, Fehlermeldungen oder Kooperationsanfragen.'],
  ['Politique de confidentialité | 한국어 학교 — Korean School', 'Datenschutzrichtlinie | 한국어 학교 — Korean School'],
  ['Politique de confidentialité de Korean School. Aucune donnée personnelle collectée, aucune connexion requise. La progression est sauvegardée uniquement dans votre navigateur.',
   'Datenschutzrichtlinie von Korean School. Keine personenbezogenen Daten werden gesammelt, keine Anmeldung erforderlich. Der Fortschritt wird nur in deinem Browser gespeichert.'],
  ['Conditions d\'utilisation | 한국어 학교 — Korean School', 'Nutzungsbedingungen | 한국어 학교 — Korean School'],
  ['Quiz Coréen | 한국어 학교 — Korean School', 'Koreanisches Quiz | 한국어 학교 — Korean School'],
  ['Recherche vocabulaire, leçons et guides de culture coréenne | 한국어 학교', 'Vokabular, Lektionen und koreanische Kulturführer suchen | 한국어 학교'],
  // nav links
  ['<span class="nav-icon">📚</span> Apprendre', '<span class="nav-icon">📚</span> Lernen'],
  ['<span class="nav-icon">🎵</span> K-Culture', '<span class="nav-icon">🎵</span> K-Culture'],
  ['<span class="nav-icon">🗺️</span> Voyages', '<span class="nav-icon">🗺️</span> Reisen'],
  ['<span class="nav-icon">📰</span> Actualités', '<span class="nav-icon">📰</span> Nachrichten'],
  ['<span class="nav-icon">📝</span> Quiz', '<span class="nav-icon">📝</span> Quiz'],
  // header actions
  ['placeholder="Rechercher leçons, vocabulaire…"', 'placeholder="Lektionen, Vokabular suchen…"'],
  ['placeholder="Rechercher…"', 'placeholder="Suchen…"'],
  ['placeholder="Rechercher..."', 'placeholder="Suchen..."'],
  ['aria-label="Changer le thème"', 'aria-label="Design wechseln"'],
  ['aria-label="Changer de langue"', 'aria-label="Sprache wechseln"'],
  ['aria-label="Ouvrir le menu"', 'aria-label="Menü öffnen"'],
  ['aria-label="Menu"', 'aria-label="Menü"'],
  ['aria-label="Menu mobile"', 'aria-label="Mobiles Menü"'],
  ['>🇫🇷 FR<', '>🇩🇪 DE<'],
  // footer
  ['Apprendre · 학습', 'Lernen · 학습'],
  ['Alphabet Hangul', 'Hangul-Alphabet'],
  ['Grammaire', 'Grammatik'],
  ['Vocabulaire', 'Vokabular'],
  ['K-Culture · 문화', 'K-Culture · 문화'],
  ['Entreprise · 회사', 'Unternehmen · 회사'],
  ['Plateforme gratuite d\'apprentissage du coréen — alliant étude de la langue, K-culture, guides de voyage et pratique réelle. Pour les apprenants de tous niveaux, partout dans le monde.',
   'Kostenlose Plattform zum Koreanischlernen — Sprachunterricht verbunden mit K-Culture, Reiseführern und realer Praxis. Für Lernende jedes Niveaus weltweit.'],
  ['Fait avec ❤️ pour les apprenants de coréen du monde entier.', 'Mit ❤️ für Koreanischlernende weltweit gemacht.'],
  ['Profite de ton apprentissage !', 'Viel Spaß beim Lernen!'],
  // sidebar (culture pages)
  ['CATÉGORIES · 카테고리', 'KATEGORIEN · 카테고리'],
  // footer link labels
  ['À propos', 'Über uns'],
  ['Contact', 'Kontakt'],
  ['Politique de confidentialité', 'Datenschutzrichtlinie'],
  ["Conditions d'utilisation", 'Nutzungsbedingungen'],
  ['Apprendre', 'Lernen'],
  ['K-Culture', 'K-Culture'],
  ['Voyages', 'Reisen'],
  ['Actualités coréennes', 'Koreanische Nachrichten'],
  ['Explorer', 'Entdecken'],
  ['Entreprise', 'Unternehmen'],
  ['Guide de voyage', 'Reiseführer'],
  ['Quiz', 'Quiz'],
  // hero section
  ['🇰🇷 · Gratuit · Pour tous les niveaux', '🇰🇷 · Kostenlos · Für jedes Niveau'],
  ['Découvrez la beauté de la Corée à travers la langue, la culture, le K-pop, les voyages et la gastronomie — avec des leçons gratuites pour les apprenants du monde entier.',
   'Entdecke die Schönheit Koreas durch Sprache, Kultur, K-Pop, Reisen und Küche — mit kostenlosen Lektionen für Lernende weltweit.'],
  ['Commencer à apprendre', 'Lernen starten'],
  ['Explorer la K-Culture', 'K-Culture entdecken'],
  // hero stats
  ['Mots de vocabulaire', 'Vokabeln'],
  ['Leçons', 'Lektionen'],
  ['Apprenants actifs', 'Aktive Lernende'],
  // features section
  ['CARACTÉRISTIQUES', 'FUNKTIONEN'],
  ["Tout ce qu'il vous faut pour apprendre le coréen", 'Alles, was du brauchst, um Koreanisch zu lernen'],
  ['Fondamentaux du Hangul · 한글 기초', 'Hangul-Grundlagen · 한글 기초'],
  ['Commencer avec 한글', 'Mit 한글 beginnen'],
  ["Apprenez l'alphabet coréen en seulement 2 heures. 한글 (Hangul) est extraordinairement logique — une fois que vous connaissez les 24 lettres de base, vous pouvez tout lire.",
   'Lerne das koreanische Alphabet in nur 2 Stunden. 한글 (Hangul) ist bemerkenswert logisch — wenn du die 24 Grundbuchstaben kennst, kannst du alles lesen.'],
  ['Apprendre le Hangul maintenant →', 'Hangul jetzt lernen →'],
  ['Paroles de K-Pop · 가사', 'K-Pop-Liedtexte · 가사'],
  ['Apprendre avec les paroles de K-Pop', 'Mit K-Pop-Liedtexten lernen'],
  ["Apprenez le coréen naturellement avec vos chansons préférées. Décomposition ligne par ligne avec vocabulaire, notes de grammaire et guides de prononciation.",
   'Lerne Koreanisch natürlich durch deine Lieblingslieder. Zeilenweise Erklärungen mit Vokabular, Grammatiknotizen und Ausspracheführern.'],
  ['Lire →', 'Lesen →'],
  ['K-Drama · 드라마', 'K-Drama · 드라마'],
  ['Vocabulaire des K-Dramas', 'K-Drama-Vokabular'],
  ["Apprenez le coréen quotidien à travers vos dramas préférés. Listes de vocabulaire contextuelles organisées par série, genre et niveau.",
   'Lerne Alltagskoreanisch aus deinen Lieblingsdramas. Kontextuelle Vokabellisten nach Sendung, Genre und Niveau geordnet.'],
  ['Cuisine coréenne · 음식', 'Koreanisches Essen · 음식'],
  ['Dictionnaire de la cuisine coréenne', 'Koreanisches Lebensmittelwörterbuch'],
  ['Du 김치 (kimchi) au 삼겹살 (samgyeopsal) — explorez le riche vocabulaire de la gastronomie coréenne avec prononciation et contexte culturel.',
   'Von 김치 (Kimchi) bis 삼겹살 (Samgyeopsal) — erkunde das reiche Vokabular der koreanischen Küche mit Aussprache und Kulturkontext.'],
  ['Vocabulaire quotidien · 오늘의 단어', 'Tägliches Vokabular · 오늘의 단어'],
  ['Mot du jour', 'Wort des Tages'],
  ['Bonjour / Bonne journée', 'Hallo / Guten Tag'],
  ['Écouter', 'Anhören'],
  ['Plus de mots', 'Mehr Wörter'],
  // learning paths
  ['PARCOURS STRUCTURÉS · 학습 경로', 'Strukturierte Lernpfade · 학습 경로'],
  ["Choisissez votre parcours d'apprentissage", 'Wähle deinen Lernpfad'],
  ["Que vous débutiez ou visiez la fluidité, nous avons une feuille de route claire qui vous guidera étape par étape.",
   'Ob du gerade anfängst oder Fließendheit anstrebst, wir haben einen klaren Fahrplan, der dich Schritt für Schritt dorthin führt.'],
  ['Commencer le parcours Débutant →', 'Anfängerpfad starten →'],
  ['Commencer le parcours Intermédiaire →', 'Mittelstufenpfad starten →'],
  ['Commencer le parcours Avancé →', 'Fortgeschrittenpfad starten →'],
  ['Débutant', 'Anfänger'],
  ['✓ Alphabet Hangul', '✓ Hangul-Alphabet'],
  ['✓ Voyelles et consonnes de base', '✓ Grundlegende Vokale & Konsonanten'],
  ['✓ Blocs syllabiques', '✓ Silbenblöcke'],
  ['✓ Vocabulaire essentiel', '✓ Grundvokabular'],
  ['✓ Salutations de base', '✓ Grundlegende Begrüßungen'],
  ['Intermédiaire', 'Mittelstufe'],
  ['✓ Grammaire coréenne (SOV)', '✓ Koreanische Grammatik (SOV)'],
  ['✓ Particules et conjugaison', '✓ Partikel & Konjugation'],
  ['✓ Niveaux de discours', '✓ Sprachebenen'],
  ['✓ 300+ mots de vocabulaire', '✓ 300+ Vokabeln'],
  ['✓ Dialogues réels', '✓ Echte Dialoge'],
  ['Avancé', 'Fortgeschritten'],
  ["✓ Coréen des affaires", '✓ Koreanisch im Geschäftsleben'],
  ['✓ Coréen classique', '✓ Klassisches Koreanisch'],
  ["✓ Rédaction d'essais", '✓ Aufsätze schreiben'],
  ['✓ Préparation TOPIK', '✓ TOPIK-Vorbereitung'],
  ['✓ Expressions idiomatiques', '✓ Idiomatische Ausdrücke'],
  // K-culture section
  ['K-CULTURE · 한국 문화', 'K-CULTURE · 한국 문화'],
  ['Vivez la Corée au-delà de la langue', 'Korea jenseits der Sprache erleben'],
  ["La langue est la porte d'entrée — plongez dans la culture pop coréenne, la gastronomie et la beauté pour accélérer votre apprentissage.",
   'Sprache ist das Tor — tauche in koreanische Popkultur, Essen und Beauty ein, um dein Lernen zu beschleunigen.'],
  ['Phrases coréennes de K-Pop à connaître', 'Koreanische K-Pop-Phrasen, die du kennen musst'],
  ['De BTS à BLACKPINK — les mots et phrases coréens les plus courants de vos artistes K-Pop préférés, avec guides de prononciation.',
   'Von BTS bis BLACKPINK — die häufigsten koreanischen Wörter und Phrasen deiner K-Pop-Lieblingskünstler, mit Ausspracheführern.'],
  ['Maîtrisez les émotions en coréen avec les K-Dramas', 'Koreanische Gefühle durch K-Drama meistern'],
  ["Les dramas coréens sont remplis de vocabulaire émotionnel. Apprenez comment les personnages expriment la joie, la tristesse, la colère et l'amour en coréen authentique.",
   'K-Dramas sind vollgepackt mit emotionalem Vokabular. Lerne, wie Charaktere Freude, Trauer, Ärger und Liebe in authentischem Koreanisch ausdrücken.'],
  ['Commandez comme un local : coréen au restaurant', 'Wie ein Einheimischer bestellen: Koreanisch im Restaurant'],
  ["Phrases essentielles pour commander, demander l'addition et naviguer dans le menu d'un restaurant coréen avec assurance.",
   'Wichtige Phrasen zum Essen bestellen, die Rechnung verlangen und sicher durch eine koreanische Speisekarte navigieren.'],
  ['Vocabulaire beauté et soin de la peau en coréen', 'Beauty- & Pflege-Vokabular auf Koreanisch'],
  ["Explorez le monde du K-Beauty avec le vocabulaire essentiel pour les routines de soin, les cosmétiques et les tendances beauté coréennes.",
   'Erkunde die Welt der K-Beauty mit wichtigem Vokabular für Pflegeroutinen, Kosmetik und koreanische Schönheitstrends.'],
  ['Voir tout le contenu K-Culture →', 'Alle K-Culture-Inhalte ansehen →'],
  // travel section
  ['VOYAGES · 여행', 'REISEN · 여행'],
  ['Explorez la Corée', 'Korea erkunden'],
  ['Apprenez la langue de chaque destination. De la trépidante Séoul aux côtes paisibles de Jeju — votre guide de voyage est prêt.',
   'Lerne die Sprache jedes Reiseziels. Vom belebten Seoul bis zu den ruhigen Ufern von Jeju — dein Reiseführer ist bereit.'],
  ['Horizon de Séoul rivière Han', 'Seoul Skyline Han-Fluss'],
  ["L'éblouissante capitale de la Corée du Sud — des anciens palais de Gyeongbokgung aux rues néon de Gangnam et Hongdae.",
   'Südkoreas glanzvolle Hauptstadt — von den alten Palästen des Gyeongbokgung bis zu den Neon-Straßen von Gangnam und Hongdae.'],
  ['Explorer →', 'Entdecken →'],
  ['Plage Haeundae Busan', 'Haeundae Strand Busan'],
  ['La vibrante ville portuaire de Corée, avec ses plages spectaculaires, ses marchés de fruits de mer frais et son dialecte unique à découvrir.',
   'Koreas lebhafte Hafenstadt mit atemberaubenden Stränden, frischen Meeresfrüchtemärkten und einem einzigartigen Dialekt.'],
  ['Hallasan île de Jeju', 'Hallasan Insel Jeju'],
  ["L'île paradisiaque de Corée — paysages volcaniques, plages vierges, vergers de mandarines et la célèbre culture de plongée haenyeo.",
   'Koreas Paradiesinsel — vulkanische Landschaften, unberührte Strände, Mandarinenplantagen und die berühmte Haenyeo-Tauchkultur.'],
  ['Voir le guide de voyage complet →', 'Vollständigen Reiseführer ansehen →'],
  // quiz section
  ['PRATIQUE · 연습', 'ÜBEN · 연습'],
  ['Testez votre coréen', 'Teste dein Koreanisch'],
  ['10 niveaux progressifs · choix multiple · couvre Hangul, grammaire et vocabulaire', '10 progressive Stufen · Multiple Choice · Hangul, Grammatik & Vokabular'],
  ['Choisir un niveau', 'Stufe wählen'],
  // about page
  ['🇰🇷 · À propos · 소개', '🇰🇷 · Über uns · 소개'],
  ['À propos de <span class="grad-text">Korean School</span>', 'Über <span class="grad-text">Korean School</span>'],
  ["Une plateforme gratuite d'apprentissage du coréen et de la culture — ouverte à tous, partout, toujours.",
   'Eine kostenlose Plattform zum Koreanisch- und Kulturlernen — offen für alle, überall, immer.'],
  ['NOTRE DEVISE · 슬로건', 'UNSER MOTTO · 슬로건'],
  ['« Pour vraiment apprendre une langue, il faut en connaître la culture »',
   '„Um eine Sprache wirklich zu lernen, muss man die Kultur kennen"'],
  ["Le coréen ne s'apprend pas en vase clos. Il est tissé dans les dialogues des K-dramas, les paroles du K-pop, les noms des plats, les honorifiques confucéens et la vie quotidienne en ville. Nous enseignons la langue en même temps que la culture qui lui donne son sens.",
   'Koreanisch lernt man nicht isoliert. Es ist eingebettet in K-Drama-Dialoge, K-Pop-Texte, Gerichtsnamen, konfuzianische Höflichkeitsformen und den städtischen Alltag. Wir unterrichten die Sprache zusammen mit der Kultur, die ihr Bedeutung verleiht.'],
  ['CE QUI NOUS DISTINGUE · 특징', 'WAS UNS AUSZEICHNET · 특징'],
  ['Gratuit pour toujours', 'Für immer kostenlos'],
  ['Chaque leçon, quiz et guide est entièrement gratuit — sans abonnement, sans paiement.',
   'Jede Lektion, jedes Quiz und jeder Leitfaden ist völlig kostenlos — kein Abo, keine Zahlung.'],
  ['Sans inscription', 'Ohne Registrierung'],
  ['Sans compte, sans e-mail, sans mot de passe. Ouvrez le site et commencez à apprendre immédiatement.',
   'Kein Konto, keine E-Mail, kein Passwort. Öffne die Seite und fang sofort an zu lernen.'],
  ['Progression privée', 'Privater Fortschritt'],
  ['Votre progression est sauvegardée dans le stockage local de votre navigateur — privée, hors ligne et jamais partagée.',
   'Dein Fortschritt wird im lokalen Speicher deines Browsers gespeichert — privat, offline und nie geteilt.'],
  ['La culture avant tout', 'Kultur zuerst'],
  ["La langue dans un contexte culturel réel — pas seulement des phrases de manuel, mais K-pop, nourriture, voyages et actualités.",
   'Die Sprache im echten Kulturkontext — nicht nur Lehrbuchphrasen, sondern K-Pop, Essen, Reisen und Nachrichten.'],
  ['CE QUE VOUS TROUVEREZ · 콘텐츠', 'WAS DU FINDEST · 콘텐츠'],
  ['Hangul, grammaire, vocabulaire, prononciation, niveaux de langue, dialogues et plus encore.',
   'Hangul, Grammatik, Vokabular, Aussprache, Sprachebenen, Dialoge und mehr.'],
  ['K-pop, K-drama, cuisine coréenne, K-beauty, traditions, gaming, sports et mode.',
   'K-Pop, K-Drama, koreanisches Essen, K-Beauty, Traditionen, Gaming, Sport und Mode.'],
  ['Guides de villes, phrases de voyage et itinéraires pour Séoul, Busan, Jeju et plus.',
   'Stadtführer, Reisephrasen und Reisepläne für Seoul, Busan, Jeju und mehr.'],
  ["Actualités bilingues de Corée — du niveau Débutant à Avancé — pour apprendre le coréen naturellement chaque jour.",
   'Zweisprachige Nachrichten aus Korea — von Anfänger bis Fortgeschritten — um täglich natürlich Koreanisch zu lernen.'],
  ['Quiz interactifs sur le Hangul, le vocabulaire et la grammaire avec retour instantané.',
   'Interaktive Quiz zu Hangul, Vokabular und Grammatik mit sofortigem Feedback.'],
  ['Créé avec Claude Code', 'Erstellt mit Claude Code'],
  ["Ce site web a été entièrement construit avec <strong style=\"color:var(--text);\">Claude Code</strong> — l'assistant de programmation IA d'Anthropic.\n          Il continue de s'améliorer constamment.\n          <span style=\"color:var(--primary);font-weight:600;\">계속 업그레이드 중</span> — toujours en mise à jour.",
   'Diese Website wurde vollständig mit <strong style="color:var(--text);">Claude Code</strong> — dem KI-Programmierassistenten von Anthropic — erstellt.\n          Sie wird ständig verbessert.\n          <span style="color:var(--primary);font-weight:600;">계속 업그레이드 중</span> — immer aktuell.'],
  ['📚 Commencer à apprendre le coréen →', '📚 Koreanisch lernen starten →'],
  // contact page
  ['🇰🇷 · Contact · 연락', '🇰🇷 · Kontakt · 연락'],
  ['Écrivez-nous', 'Schreib uns'],
  ["Contactez l'équipe de Korean School.", 'Kontaktiere das Korean School-Team.'],
  ['Commentaires et suggestions', 'Feedback & Vorschläge'],
  ["Signalement d'erreurs", 'Fehler melden'],
  ['Demandes de collaboration', 'Kooperationsanfragen'],
  ['Envoyer un message', 'Nachricht senden'],
  ['Votre nom', 'Dein Name'],
  ['Votre adresse e-mail', 'Deine E-Mail-Adresse'],
  ['Objet', 'Betreff'],
  ['Message', 'Nachricht'],
  ['Envoyer', 'Senden'],
  // privacy page
  ['🇰🇷 · Confidentialité · 개인정보', '🇰🇷 · Datenschutz · 개인정보'],
  // terms page
  ["Conditions d'utilisation", 'Nutzungsbedingungen'],
  ['🇰🇷 · Conditions · 이용약관', '🇰🇷 · Nutzungsbedingungen · 이용약관'],
  // quiz page
  ['🇰🇷 · Quiz · 퀴즈', '🇰🇷 · Quiz · 퀴즈'],
  ['Quiz de coréen', 'Koreanisches Quiz'],
  ['Sélectionnez un niveau', 'Stufe auswählen'],
  ['Suivant →', 'Weiter →'],
  ['← Précédent', '← Zurück'],
  ['Correct', 'Richtig'],
  ['Incorrect', 'Falsch'],
  // schema.org
  ["Apprenez le coréen gratuitement — leçons, K-culture, voyages et actualités pour tous les niveaux.",
   'Koreanisch kostenlos lernen — Lektionen, K-Culture, Reisen und Nachrichten für alle Niveaus.'],
];

function applyChrome(html) {
  let out = html;
  for (const [fr, de] of CHROME) {
    out = out.split(fr).join(de);
  }
  return out;
}

function applyPaths(html, depth) {
  let out = html;

  out = out.replace(/lang="fr"/g, 'lang="de"');
  out = out.replace(/lang-fr\.js/g, 'lang-de.js');

  if (depth === 1) {
    out = out
      .replace(/https:\/\/freekoreanschool\.com\/fr\//g, 'https://freekoreanschool.com/de/')
      .replace(/https:\/\/freekoreanschool\.com\/fr\b/g, 'https://freekoreanschool.com/de')
      .replace(/hreflang="fr"/g, 'hreflang="de"')
      .replace(/\.\.\/learn\/fr\//g, '../learn/de/')
      .replace(/\.\.\/culture\/fr\//g, '../culture/de/')
      .replace(/\.\.\/travel\/fr\//g, '../travel/de/')
      .replace(/\.\.\/news\/fr\//g, '../news/de/');
  } else if (depth === 2) {
    out = out
      .replace(/https:\/\/freekoreanschool\.com\/culture\/fr\//g, 'https://freekoreanschool.com/culture/de/')
      .replace(/https:\/\/freekoreanschool\.com\/culture\/fr\b/g, 'https://freekoreanschool.com/culture/de')
      .replace(/https:\/\/freekoreanschool\.com\/travel\/fr\//g, 'https://freekoreanschool.com/travel/de/')
      .replace(/https:\/\/freekoreanschool\.com\/travel\/fr\b/g, 'https://freekoreanschool.com/travel/de')
      .replace(/hreflang="fr"/g, 'hreflang="de"')
      .replace(/\.\.\/\.\.\/fr\//g, '../../de/')
      .replace(/\.\.\/\.\.\/learn\/fr\//g, '../../learn/de/')
      .replace(/\.\.\/\.\.\/culture\/fr\//g, '../../culture/de/')
      .replace(/\.\.\/\.\.\/travel\/fr\//g, '../../travel/de/')
      .replace(/\.\.\/\.\.\/news\/fr\//g, '../../news/de/');
  }

  return out;
}

// ── Generate de/ root pages ─────────────────────────────────────
const DE_ROOT = path.join(ROOT, 'de');
mkdir(DE_ROOT);

const rootPages = ['index.html', 'about.html', 'contact.html', 'privacy.html', 'quiz.html', 'search.html', 'terms.html'];

for (const page of rootPages) {
  const src = path.join(ROOT, 'fr', page);
  if (!fs.existsSync(src)) { console.log(`⚠ skipped missing fr/${page}`); continue; }

  let html = fs.readFileSync(src, 'utf8');
  html = applyChrome(html);
  html = applyPaths(html, 1);

  const dest = path.join(DE_ROOT, page);
  fs.writeFileSync(dest, html, 'utf8');
  console.log(`✓ de/${page}`);
}

// ── Generate culture/de/ pages ──────────────────────────────────
const CULTURE_FR = path.join(ROOT, 'culture', 'fr');
const CULTURE_DE = path.join(ROOT, 'culture', 'de');
mkdir(CULTURE_DE);

if (fs.existsSync(CULTURE_FR)) {
  const culturePages = fs.readdirSync(CULTURE_FR).filter(f => f.endsWith('.html'));
  for (const page of culturePages) {
    let html = fs.readFileSync(path.join(CULTURE_FR, page), 'utf8');
    html = applyChrome(html);
    html = applyPaths(html, 2);

    fs.writeFileSync(path.join(CULTURE_DE, page), html, 'utf8');
    console.log(`✓ culture/de/${page}`);
  }
} else {
  console.log('⚠ culture/fr/ not found, skipping culture/de/');
}

// ── Generate travel/de/ pages ───────────────────────────────────
const TRAVEL_FR = path.join(ROOT, 'travel', 'fr');
const TRAVEL_DE = path.join(ROOT, 'travel', 'de');
mkdir(TRAVEL_DE);

if (fs.existsSync(TRAVEL_FR)) {
  const travelPages = fs.readdirSync(TRAVEL_FR).filter(f => f.endsWith('.html'));
  for (const page of travelPages) {
    let html = fs.readFileSync(path.join(TRAVEL_FR, page), 'utf8');
    html = applyChrome(html);
    html = applyPaths(html, 2);

    fs.writeFileSync(path.join(TRAVEL_DE, page), html, 'utf8');
    console.log(`✓ travel/de/${page}`);
  }
} else {
  console.log('⚠ travel/fr/ not found, skipping travel/de/');
}

// ── Generate news/de/ pages ──────────────────────────────────────
const NEWS_FR = path.join(ROOT, 'news', 'fr');
const NEWS_DE = path.join(ROOT, 'news', 'de');

if (fs.existsSync(NEWS_FR)) {
  mkdir(NEWS_DE);
  const newsPages = fs.readdirSync(NEWS_FR).filter(f => f.endsWith('.html'));
  for (const page of newsPages) {
    let html = fs.readFileSync(path.join(NEWS_FR, page), 'utf8');
    html = applyChrome(html);
    html = applyPaths(html, 2);
    fs.writeFileSync(path.join(NEWS_DE, page), html, 'utf8');
    console.log(`✓ news/de/${page}`);
  }
} else {
  console.log('⚠ news/fr/ not found, skipping news/de/');
}

console.log('\nAll de/ pages generated.');
