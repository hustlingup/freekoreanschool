#!/usr/bin/env node
// Generate fr/, culture/fr/, and travel/fr/ pages from es/ sources.
// Strategy: path/URL substitutions + chrome text translations; culture/travel body stays in Spanish for now.
'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT  = path.join(__dirname, '..');

function mkdir(p) { fs.mkdirSync(p, { recursive: true }); }

// ── Chrome text: Spanish → French ──────────────────────────────
// Order matters: longer strings first to avoid partial replacements.
const CHROME = [
  // metadata titles / descriptions
  ['Aprende Coreano Gratis', 'Apprenez le Coréen Gratuitement'],
  ['Aprende coreano gratis — lecciones, K-cultura, viajes y noticias para todos los niveles.',
   'Apprenez le coréen gratuitement — leçons, K-culture, voyages et actualités pour tous les niveaux.'],
  ['Sobre nosotros | 한국어 학교 — Korean School', 'À propos | 한국어 학교 — Korean School'],
  ['Sobre Korean School — plataforma gratuita de aprendizaje de coreano y cultura. Sin registro, sin login, progreso guardado localmente.',
   'À propos de Korean School — plateforme gratuite d\'apprentissage du coréen et de la culture. Sans inscription, sans connexion, progression sauvegardée localement.'],
  ['Contacto | 한국어 학교 — Korean School', 'Contact | 한국어 학교 — Korean School'],
  ['Contacta con Korean School — escríbenos para comentarios, reportar errores o consultas de colaboración.',
   'Contactez Korean School — écrivez-nous pour des commentaires, signaler des erreurs ou des demandes de collaboration.'],
  ['Política de privacidad | 한국어 학교 — Korean School', 'Politique de confidentialité | 한국어 학교 — Korean School'],
  ['Política de privacidad de Korean School. No se recopilan datos personales, no se requiere inicio de sesión. El progreso se guarda solo en tu navegador.',
   'Politique de confidentialité de Korean School. Aucune donnée personnelle collectée, aucune connexion requise. La progression est sauvegardée uniquement dans votre navigateur.'],
  ['Términos de uso | 한국어 학교 — Korean School', 'Conditions d\'utilisation | 한국어 학교 — Korean School'],
  ['Cuestionario Coreano | 한국어 학교 — Korean School', 'Quiz Coréen | 한국어 학교 — Korean School'],
  ['Busca vocabulario, lecciones y guías de cultura coreana | 한국어 학교', 'Recherche vocabulaire, leçons et guides de culture coréenne | 한국어 학교'],
  // nav links
  ['<span class="nav-icon">📚</span> Aprender', '<span class="nav-icon">📚</span> Apprendre'],
  ['<span class="nav-icon">🎵</span> K-Cultura', '<span class="nav-icon">🎵</span> K-Culture'],
  ['<span class="nav-icon">🗺️</span> Viajes', '<span class="nav-icon">🗺️</span> Voyages'],
  ['<span class="nav-icon">📰</span> Noticias', '<span class="nav-icon">📰</span> Actualités'],
  ['<span class="nav-icon">📝</span> Cuestionario', '<span class="nav-icon">📝</span> Quiz'],
  // header actions
  ['placeholder="Buscar lecciones, vocabulario…"', 'placeholder="Rechercher leçons, vocabulaire…"'],
  ['placeholder="Buscar…"', 'placeholder="Rechercher…"'],
  ['placeholder="Buscar..."', 'placeholder="Rechercher..."'],
  ['aria-label="Cambiar tema"', 'aria-label="Changer le thème"'],
  ['aria-label="Cambiar idioma"', 'aria-label="Changer de langue"'],
  ['aria-label="Abrir menú"', 'aria-label="Ouvrir le menu"'],
  ['aria-label="Menú"', 'aria-label="Menu"'],
  ['aria-label="Menú móvil"', 'aria-label="Menu mobile"'],
  ['>🇪🇸 ES<', '>🇫🇷 FR<'],
  // footer
  ['Aprender · 학습', 'Apprendre · 학습'],
  ['Alfabeto Hangul', 'Alphabet Hangul'],
  ['Gramática', 'Grammaire'],
  ['Vocabulario', 'Vocabulaire'],
  ['K-Cultura · 문화', 'K-Culture · 문화'],
  ['Empresa · 회사', 'Entreprise · 회사'],
  ['Plataforma gratuita de aprendizaje de coreano — combinando el estudio del idioma con K-cultura, guías de viaje y práctica real. Para estudiantes de todos los niveles, en todo el mundo.',
   'Plateforme gratuite d\'apprentissage du coréen — alliant étude de la langue, K-culture, guides de voyage et pratique réelle. Pour les apprenants de tous niveaux, partout dans le monde.'],
  ['Hecho con ❤️ para estudiantes de coreano en todo el mundo.', 'Fait avec ❤️ pour les apprenants de coréen du monde entier.'],
  ['¡Disfruta tu aprendizaje!', 'Profite de ton apprentissage !'],
  // sidebar (culture pages)
  ['CATEGORÍAS · 카테고리', 'CATÉGORIES · 카테고리'],
  // footer link labels
  ['Sobre nosotros', 'À propos'],
  ['Contacto', 'Contact'],
  ['Política de privacidad', 'Politique de confidentialité'],
  ['Términos de uso', 'Conditions d\'utilisation'],
  ['Aprender', 'Apprendre'],
  ['K-Cultura', 'K-Culture'],
  ['Viajes', 'Voyages'],
  ['Noticias coreanas', 'Actualités coréennes'],
  ['Explorar', 'Explorer'],
  ['Empresa', 'Entreprise'],
  ['Guía de viajes', 'Guide de voyage'],
  ['Cuestionario', 'Quiz'],
  // hero section
  ['🇰🇷 · Gratis · Para todos los niveles', '🇰🇷 · Gratuit · Pour tous les niveaux'],
  ['Descubre la belleza de Corea a través del idioma, la cultura, el K-pop, los viajes y la gastronomía — con lecciones gratuitas para estudiantes de todo el mundo.',
   'Découvrez la beauté de la Corée à travers la langue, la culture, le K-pop, les voyages et la gastronomie — avec des leçons gratuites pour les apprenants du monde entier.'],
  ['Comenzar a aprender', 'Commencer à apprendre'],
  ['Explorar K-Cultura', 'Explorer la K-Culture'],
  // hero stats
  ['Palabras de vocabulario', 'Mots de vocabulaire'],
  ['Lecciones', 'Leçons'],
  ['Estudiantes activos', 'Apprenants actifs'],
  // features section
  ['CARACTERÍSTICAS', 'CARACTÉRISTIQUES'],
  ['Todo lo que necesitas para aprender coreano', 'Tout ce qu\'il vous faut pour apprendre le coréen'],
  ['Fundamentos de Hangul · 한글 기초', 'Fondamentaux du Hangul · 한글 기초'],
  ['Comienza con 한글', 'Commencer avec 한글'],
  ['Aprende el alfabeto coreano en solo 2 horas. 한글 (Hangul) es extraordinariamente lógico — una vez que conoces las 24 letras básicas, puedes leer cualquier cosa.',
   'Apprenez l\'alphabet coréen en seulement 2 heures. 한글 (Hangul) est extraordinairement logique — une fois que vous connaissez les 24 lettres de base, vous pouvez tout lire.'],
  ['Aprende Hangul ahora →', 'Apprendre le Hangul maintenant →'],
  ['Letras de K-Pop · 가사', 'Paroles de K-Pop · 가사'],
  ['Aprende con letras de K-Pop', 'Apprendre avec les paroles de K-Pop'],
  ['Aprende coreano de forma natural con tus canciones favoritas. Desglose línea por línea con vocabulario, notas gramaticales y guías de pronunciación.',
   'Apprenez le coréen naturellement avec vos chansons préférées. Décomposition ligne par ligne avec vocabulaire, notes de grammaire et guides de prononciation.'],
  ['Leer →', 'Lire →'],
  ['K-Drama · 드라마', 'K-Drama · 드라마'],
  ['Vocabulario de K-Drama', 'Vocabulaire des K-Dramas'],
  ['Aprende el coreano cotidiano de tus dramas favoritos. Listas de vocabulario contextuales organizadas por serie, género y nivel de dominio.',
   'Apprenez le coréen quotidien à travers vos dramas préférés. Listes de vocabulaire contextuelles organisées par série, genre et niveau.'],
  ['Comida coreana · 음식', 'Cuisine coréenne · 음식'],
  ['Diccionario de comida coreana', 'Dictionnaire de la cuisine coréenne'],
  ['Del 김치 (kimchi) al 삼겹살 (samgyeopsal) — explora el rico vocabulario de la gastronomía coreana con pronunciación y contexto cultural.',
   'Du 김치 (kimchi) au 삼겹살 (samgyeopsal) — explorez le riche vocabulaire de la gastronomie coréenne avec prononciation et contexte culturel.'],
  ['Vocabulario diario · 오늘의 단어', 'Vocabulaire quotidien · 오늘의 단어'],
  ['Palabra del día', 'Mot du jour'],
  ['Hola / Buenos días', 'Bonjour / Bonne journée'],
  ['Escuchar', 'Écouter'],
  ['Más palabras', 'Plus de mots'],
  // learning paths — full button phrases BEFORE standalone words to avoid partial replacement
  ['RUTAS ESTRUCTURADAS · 학습 경로', 'PARCOURS STRUCTURÉS · 학습 경로'],
  ['Elige tu ruta de aprendizaje', 'Choisissez votre parcours d\'apprentissage'],
  ['Tanto si estás empezando como si apuntas a la fluidez, tenemos una hoja de ruta clara que te llevará paso a paso.',
   'Que vous débutiez ou visiez la fluidité, nous avons une feuille de route claire qui vous guidera étape par étape.'],
  ['Comenzar ruta Principiante →', 'Commencer le parcours Débutant →'],
  ['Comenzar ruta Intermedio →', 'Commencer le parcours Intermédiaire →'],
  ['Comenzar ruta Avanzado →', 'Commencer le parcours Avancé →'],
  ['Principiante', 'Débutant'],
  ['✓ Alfabeto Hangul', '✓ Alphabet Hangul'],
  ['✓ Vocales y consonantes básicas', '✓ Voyelles et consonnes de base'],
  ['✓ Bloques silábicos', '✓ Blocs syllabiques'],
  ['✓ Vocabulario esencial', '✓ Vocabulaire essentiel'],
  ['✓ Saludos básicos', '✓ Salutations de base'],
  ['Intermedio', 'Intermédiaire'],
  ['✓ Gramática coreana (SOV)', '✓ Grammaire coréenne (SOV)'],
  ['✓ Partículas y conjugación', '✓ Particules et conjugaison'],
  ['✓ Niveles de habla', '✓ Niveaux de discours'],
  ['✓ 300+ palabras de vocabulario', '✓ 300+ mots de vocabulaire'],
  ['✓ Diálogos reales', '✓ Dialogues réels'],
  ['Avanzado', 'Avancé'],
  ['✓ Coreano de negocios', '✓ Coréen des affaires'],
  ['✓ Coreano clásico', '✓ Coréen classique'],
  ['✓ Redacción de ensayos', '✓ Rédaction d\'essais'],
  ['✓ Preparación TOPIK', '✓ Préparation TOPIK'],
  ['✓ Expresiones idiomáticas', '✓ Expressions idiomatiques'],
  // K-culture section
  ['K-CULTURA · 한국 문화', 'K-CULTURE · 한국 문화'],
  ['Vive Corea más allá del idioma', 'Vivez la Corée au-delà de la langue'],
  ['El idioma es la puerta de entrada — sumérgete en la cultura pop coreana, la gastronomía y la belleza para acelerar tu aprendizaje.',
   'La langue est la porte d\'entrée — plongez dans la culture pop coréenne, la gastronomie et la beauté pour accélérer votre apprentissage.'],
  ['Letras de K-Pop · 가사', 'Paroles de K-Pop · 가사'],
  ['Frases coreanas de K-Pop que debes conocer', 'Phrases coréennes de K-Pop à connaître'],
  ['De BTS a BLACKPINK — las palabras y frases más comunes en coreano de tus artistas K-Pop favoritos, con guías de pronunciación.',
   'De BTS à BLACKPINK — les mots et phrases coréens les plus courants de vos artistes K-Pop préférés, avec guides de prononciation.'],
  ['K-Drama · 드라마', 'K-Drama · 드라마'],
  ['Domina las emociones en coreano con K-Drama', 'Maîtrisez les émotions en coréen avec les K-Dramas'],
  ['Los dramas coreanos están llenos de vocabulario emocional. Aprende cómo los personajes expresan alegría, tristeza, enojo y amor en coreano auténtico.',
   'Les dramas coréens sont remplis de vocabulaire émotionnel. Apprenez comment les personnages expriment la joie, la tristesse, la colère et l\'amour en coréen authentique.'],
  ['Comida coreana · 음식', 'Cuisine coréenne · 음식'],
  ['Pide como un local: coreano en restaurantes', 'Commandez comme un local : coréen au restaurant'],
  ['Frases esenciales para pedir comida, solicitar la cuenta y navegar el menú de un restaurante coreano con confianza.',
   'Phrases essentielles pour commander, demander l\'addition et naviguer dans le menu d\'un restaurant coréen avec assurance.'],
  ['K-Beauty · 뷰티', 'K-Beauty · 뷰티'],
  ['Vocabulario de belleza y cuidado de piel en coreano', 'Vocabulaire beauté et soin de la peau en coréen'],
  ['Explora el mundo del K-Beauty con vocabulario esencial para rutinas de cuidado de la piel, cosméticos y tendencias de belleza coreanas.',
   'Explorez le monde du K-Beauty avec le vocabulaire essentiel pour les routines de soin, les cosmétiques et les tendances beauté coréennes.'],
  ['Ver todo el contenido de K-Cultura →', 'Voir tout le contenu K-Culture →'],
  // travel section
  ['VIAJES · 여행', 'VOYAGES · 여행'],
  ['Explora Corea', 'Explorez la Corée'],
  ['Aprende el idioma de cada destino. Desde la bulliciosa Seúl hasta las tranquilas costas de Jeju — tu guía de viaje está lista.',
   'Apprenez la langue de chaque destination. De la trépidante Séoul aux côtes paisibles de Jeju — votre guide de voyage est prêt.'],
  ['Horizonte de Seúl río Han', 'Horizon de Séoul rivière Han'],
  ['La deslumbrante capital de Corea del Sur — desde los antiguos palacios de Gyeongbokgung hasta las calles de neón de Gangnam y Hongdae.',
   'L\'éblouissante capitale de la Corée du Sud — des anciens palais de Gyeongbokgung aux rues néon de Gangnam et Hongdae.'],
  ['Explorar →', 'Explorer →'],
  ['Playa Haeundae Busan', 'Plage Haeundae Busan'],
  ['La vibrante ciudad portuaria de Corea, con impresionantes playas, mercados de mariscos frescos y un dialecto único por descubrir.',
   'La vibrante ville portuaire de Corée, avec ses plages spectaculaires, ses marchés de fruits de mer frais et son dialecte unique à découvrir.'],
  ['Hallasan isla de Jeju', 'Hallasan île de Jeju'],
  ['La isla paraíso de Corea — paisajes volcánicos, playas vírgenes, huertos de mandarinas y la famosa cultura de buceo haenyeo.',
   'L\'île paradisiaque de Corée — paysages volcaniques, plages vierges, vergers de mandarines et la célèbre culture de plongée haenyeo.'],
  ['Ver guía de viajes completa →', 'Voir le guide de voyage complet →'],
  // quiz section
  ['PRÁCTICA · 연습', 'PRATIQUE · 연습'],
  ['Pon a prueba tu coreano', 'Testez votre coréen'],
  ['10 niveles progresivos · opción múltiple · cubre Hangul, gramática y vocabulario', '10 niveaux progressifs · choix multiple · couvre Hangul, grammaire et vocabulaire'],
  ['Elige un nivel', 'Choisir un niveau'],
  // about page specific
  ['🇰🇷 · Sobre nosotros · 소개', '🇰🇷 · À propos · 소개'],
  ['Sobre <span class="grad-text">Korean School</span>', 'À propos de <span class="grad-text">Korean School</span>'],
  ['Una plataforma gratuita de aprendizaje de coreano y cultura — abierta para todos, en todas partes, siempre.',
   'Une plateforme gratuite d\'apprentissage du coréen et de la culture — ouverte à tous, partout, toujours.'],
  ['NUESTRO LEMA · 슬로건', 'NOTRE DEVISE · 슬로건'],
  ['"Hay que conocer la cultura para aprender verdaderamente el idioma"',
   '« Pour vraiment apprendre une langue, il faut en connaître la culture »'],
  ['El coreano no se aprende de forma aislada. Está entretejido en los diálogos del K-drama, las letras del K-pop, los nombres de los platos, los tratamientos honoríficos confucianos y la vida cotidiana en la ciudad. Enseñamos el idioma junto con la cultura que le da significado.',
   'Le coréen ne s\'apprend pas en vase clos. Il est tissé dans les dialogues des K-dramas, les paroles du K-pop, les noms des plats, les honorifiques confucéens et la vie quotidienne en ville. Nous enseignons la langue en même temps que la culture qui lui donne son sens.'],
  ['QUÉ NOS HACE DIFERENTES · 특징', 'CE QUI NOUS DISTINGUE · 특징'],
  ['Gratis para siempre', 'Gratuit pour toujours'],
  ['Cada lección, cuestionario y guía es completamente gratuita — sin suscripción, sin pago.',
   'Chaque leçon, quiz et guide est entièrement gratuit — sans abonnement, sans paiement.'],
  ['Sin registro', 'Sans inscription'],
  ['Sin cuenta, sin correo electrónico, sin contraseña. Abre el sitio y empieza a aprender de inmediato.',
   'Sans compte, sans e-mail, sans mot de passe. Ouvrez le site et commencez à apprendre immédiatement.'],
  ['Progreso privado', 'Progression privée'],
  ['Tu progreso se guarda en el almacenamiento local de tu navegador — privado, sin conexión y nunca compartido.',
   'Votre progression est sauvegardée dans le stockage local de votre navigateur — privée, hors ligne et jamais partagée.'],
  ['La cultura primero', 'La culture avant tout'],
  ['El idioma en contexto cultural real — no solo frases de libro de texto, sino K-pop, comida, viajes y noticias.',
   'La langue dans un contexte culturel réel — pas seulement des phrases de manuel, mais K-pop, nourriture, voyages et actualités.'],
  ['QUÉ ENCONTRARÁS · 콘텐츠', 'CE QUE VOUS TROUVEREZ · 콘텐츠'],
  ['Hangul, gramática, vocabulario, pronunciación, niveles de habla, diálogos y más.',
   'Hangul, grammaire, vocabulaire, prononciation, niveaux de langue, dialogues et plus encore.'],
  ['K-pop, K-drama, K-comida, K-beauty, tradiciones, gaming, deportes y moda.',
   'K-pop, K-drama, cuisine coréenne, K-beauty, traditions, gaming, sports et mode.'],
  ['Guías de ciudades, frases de viaje e itinerarios para Seúl, Busan, Jeju y más.',
   'Guides de villes, phrases de voyage et itinéraires pour Séoul, Busan, Jeju et plus.'],
  ['Noticias bilingües de Corea — de Principiante a Avanzado — para aprender coreano de forma natural cada día.',
   'Actualités bilingues de Corée — du niveau Débutant à Avancé — pour apprendre le coréen naturellement chaque jour.'],
  ['Cuestionarios interactivos de Hangul, vocabulario y gramática con retroalimentación instantánea.',
   'Quiz interactifs sur le Hangul, le vocabulaire et la grammaire avec retour instantané.'],
  ['Creado con Claude Code', 'Créé avec Claude Code'],
  ['Este sitio web fue construido íntegramente con <strong style="color:var(--text);">Claude Code</strong> — el asistente de programación con IA de Anthropic.\n          Sigue mejorando constantemente.\n          <span style="color:var(--primary);font-weight:600;">계속 업그레이드 중</span> — siempre actualizando.',
   'Ce site web a été entièrement construit avec <strong style="color:var(--text);">Claude Code</strong> — l\'assistant de programmation IA d\'Anthropic.\n          Il continue de s\'améliorer constamment.\n          <span style="color:var(--primary);font-weight:600;">계속 업그레이드 중</span> — toujours en mise à jour.'],
  ['📚 Comenzar a aprender coreano →', '📚 Commencer à apprendre le coréen →'],
  // contact page
  ['🇰🇷 · Contacto · 연락', '🇰🇷 · Contact · 연락'],
  ['Contacto', 'Contact'],
  ['Escríbenos', 'Écrivez-nous'],
  ['Ponte en contacto con el equipo de Korean School.', 'Contactez l\'équipe de Korean School.'],
  ['Comentarios y sugerencias', 'Commentaires et suggestions'],
  ['Reporte de errores', 'Signalement d\'erreurs'],
  ['Consultas de colaboración', 'Demandes de collaboration'],
  ['Enviar mensaje', 'Envoyer un message'],
  ['Tu nombre', 'Votre nom'],
  ['Tu correo electrónico', 'Votre adresse e-mail'],
  ['Asunto', 'Objet'],
  ['Mensaje', 'Message'],
  ['Enviar', 'Envoyer'],
  // privacy page
  ['🇰🇷 · Privacidad · 개인정보', '🇰🇷 · Confidentialité · 개인정보'],
  ['Política de privacidad', 'Politique de confidentialité'],
  // terms page
  ['Términos de uso', 'Conditions d\'utilisation'],
  ['🇰🇷 · Términos · 이용약관', '🇰🇷 · Conditions · 이용약관'],
  // quiz page
  ['🇰🇷 · Cuestionario · 퀴즈', '🇰🇷 · Quiz · 퀴즈'],
  ['Quiz de coreano', 'Quiz de coréen'],
  ['Pon a prueba tu coreano', 'Testez votre coréen'],
  ['Selecciona un nivel', 'Sélectionnez un niveau'],
  ['Siguiente →', 'Suivant →'],
  ['← Anterior', '← Précédent'],
  ['Correcto', 'Correct'],
  ['Incorrecto', 'Incorrect'],
  // schema.org description strings
  ['Aprende coreano gratis — lecciones, K-cultura, viajes y noticias para todos los niveles.',
   'Apprenez le coréen gratuitement — leçons, K-culture, voyages et actualités pour tous les niveaux.'],
];

function applyChrome(html) {
  let out = html;
  for (const [es, fr] of CHROME) {
    out = out.split(es).join(fr);
  }
  return out;
}

// ── Path/URL substitutions ──────────────────────────────────────
// Applied AFTER chrome text replacements to avoid double-touching.
function applyPaths(html, depth) {
  // depth=1 → fr/ pages  (paths like ../css/, ../learn/es/, ../culture/es/)
  // depth=2 → culture/fr/ or travel/fr/ pages  (paths like ../../es/, ../../culture/es/)

  let out = html;

  // Replace lang attribute
  out = out.replace(/lang="es"/g, 'lang="fr"');

  if (depth === 1) {
    // Canonical / OG / hreflang URLs
    out = out
      .replace(/https:\/\/freekoreanschool\.com\/es\//g, 'https://freekoreanschool.com/fr/')
      .replace(/https:\/\/freekoreanschool\.com\/es\b/g, 'https://freekoreanschool.com/fr')
      .replace(/hreflang="es"/g, 'hreflang="fr"')
      // Add fr hreflang if missing (es hreflang → fr hreflang already done)
      .replace(/hreflang="ja"\s+href="(https:\/\/freekoreanschool\.com\/ja\/[^"]*)"/g,
               'hreflang="ja" href="$1"')
      // Internal nav/footer links: ../learn/es/ → ../learn/fr/
      .replace(/\.\.\/learn\/es\//g, '../learn/fr/')
      .replace(/\.\.\/culture\/es\//g, '../culture/fr/')
      .replace(/\.\.\/travel\/es\//g, '../travel/fr/')
      .replace(/\.\.\/news\/es\//g, '../news/fr/')
      // Self-referencing links inside fr/ pages (e.g. quiz.html, about.html unchanged)
      // Add fr hreflang alternate link (after existing hreflang block)
      ;
  } else if (depth === 2) {
    // Canonical / OG / hreflang URLs
    out = out
      .replace(/https:\/\/freekoreanschool\.com\/culture\/es\//g, 'https://freekoreanschool.com/culture/fr/')
      .replace(/https:\/\/freekoreanschool\.com\/culture\/es\b/g, 'https://freekoreanschool.com/culture/fr')
      .replace(/https:\/\/freekoreanschool\.com\/travel\/es\//g, 'https://freekoreanschool.com/travel/fr/')
      .replace(/https:\/\/freekoreanschool\.com\/travel\/es\b/g, 'https://freekoreanschool.com/travel/fr')
      .replace(/hreflang="es"/g, 'hreflang="fr"')
      // Internal nav links: ../../es/ → ../../fr/  and  ../../learn/es/ → ../../learn/fr/
      .replace(/\.\.\/\.\.\/es\//g, '../../fr/')
      .replace(/\.\.\/\.\.\/learn\/es\//g, '../../learn/fr/')
      .replace(/\.\.\/\.\.\/culture\/es\//g, '../../culture/fr/')
      .replace(/\.\.\/\.\.\/travel\/es\//g, '../../travel/fr/')
      .replace(/\.\.\/\.\.\/news\/es\//g, '../../news/fr/')
      ;
  }

  return out;
}

function insertFrHreflang(html, canonical) {
  // After the existing hreflang block, insert a fr alternate if not present
  if (html.includes('hreflang="fr"')) return html; // already has it (swapped from es)
  // Insert before x-default
  return html.replace(
    /(<link rel="alternate" hreflang="x-default")/,
    `<link rel="alternate" hreflang="fr" href="https://freekoreanschool.com/${canonical}">\n  $1`
  );
}

// ── Generate fr/ root pages ─────────────────────────────────────
const FR_ROOT = path.join(ROOT, 'fr');
mkdir(FR_ROOT);

const rootPages = ['index.html', 'about.html', 'contact.html', 'privacy.html', 'quiz.html', 'search.html', 'terms.html'];

for (const page of rootPages) {
  const src = path.join(ROOT, 'es', page);
  if (!fs.existsSync(src)) { console.log(`⚠ skipped missing es/${page}`); continue; }

  let html = fs.readFileSync(src, 'utf8');
  html = applyChrome(html);
  html = applyPaths(html, 1);

  const dest = path.join(FR_ROOT, page);
  fs.writeFileSync(dest, html, 'utf8');
  console.log(`✓ fr/${page}`);
}

// ── Generate culture/fr/ pages ──────────────────────────────────
const CULTURE_ES = path.join(ROOT, 'culture', 'es');
const CULTURE_FR = path.join(ROOT, 'culture', 'fr');
mkdir(CULTURE_FR);

const culturePages = fs.readdirSync(CULTURE_ES).filter(f => f.endsWith('.html'));
for (const page of culturePages) {
  let html = fs.readFileSync(path.join(CULTURE_ES, page), 'utf8');
  html = applyChrome(html);
  html = applyPaths(html, 2);

  fs.writeFileSync(path.join(CULTURE_FR, page), html, 'utf8');
  console.log(`✓ culture/fr/${page}`);
}

// ── Generate travel/fr/ pages ───────────────────────────────────
const TRAVEL_ES = path.join(ROOT, 'travel', 'es');
const TRAVEL_FR = path.join(ROOT, 'travel', 'fr');
mkdir(TRAVEL_FR);

if (fs.existsSync(TRAVEL_ES)) {
  const travelPages = fs.readdirSync(TRAVEL_ES).filter(f => f.endsWith('.html'));
  for (const page of travelPages) {
    let html = fs.readFileSync(path.join(TRAVEL_ES, page), 'utf8');
    html = applyChrome(html);
    html = applyPaths(html, 2);

    fs.writeFileSync(path.join(TRAVEL_FR, page), html, 'utf8');
    console.log(`✓ travel/fr/${page}`);
  }
} else {
  console.log('⚠ travel/es/ not found, skipping travel/fr/');
}

// ── Generate news/fr/ pages ──────────────────────────────────────
const NEWS_ES = path.join(ROOT, 'es');
const NEWS_FR = path.join(ROOT, 'fr');
if (fs.existsSync(NEWS_ES)) {
  mkdir(NEWS_FR);
  const newsPages = fs.readdirSync(NEWS_ES).filter(f => f.endsWith('.html'));
  for (const page of newsPages) {
    let html = fs.readFileSync(path.join(NEWS_ES, page), 'utf8');
    html = applyChrome(html);
    html = applyPaths(html, 2);
    fs.writeFileSync(path.join(NEWS_FR, page), html, 'utf8');
    console.log(`✓ news/fr/${page}`);
  }
}

console.log('\nAll fr/ pages generated.');
