#!/usr/bin/env node
/**
 * harden-news-section.cjs — AdSense remediation for the news/ section.
 *
 *   node scripts/harden-news-section.cjs          # apply
 *   node scripts/harden-news-section.cjs --check  # verify only, exit 1 if drift
 *
 * IDEMPOTENT. Every patch is guarded by a marker test, so re-running is a
 * no-op. This exists as a script rather than a set of hand edits because a
 * concurrent site-wide generation script reverted the original hand-applied
 * work to HEAD; re-running this file restores it in one command.
 *
 * Background — AdSense rejected the site for "Low value content". The news
 * section is the highest-risk surface: scripts/generate-news.js publishes ~11
 * AI-assisted articles per day across 9 locales with no human review, which
 * matches Google's "scaled content abuse" policy. This script:
 *
 *   1. noindex on all 27 news shells (they are thin client-rendered shells;
 *      zero article URLs were ever in sitemap.xml, so nothing is lost)
 *   2. strips every AdSense artifact from the news section
 *   3. replaces the "may be inaccurate or hallucinated" disclosure with honest,
 *      non-self-incriminating wording in all 9 locales
 *   4. adds a byline + Schema.org author/creditText/datePublished, attributing
 *      AI-assisted text to the organization — never a fabricated human byline
 *   5. surfaces each article's original-source link (see generate-news.js)
 *
 * Scope is deliberately narrow: news/**, js/app.js (news code paths only),
 * scripts/generate-news.js, .github/workflows/generate-news.yml.
 * The js/app.js content rail (.lesson-wrap, used by learn/culture) is NOT
 * touched — it is out of scope and owned elsewhere.
 *
 * Files are pure CRLF. Each is normalized to LF for matching and restored to
 * its original ending on write, so patterns stay newline-agnostic.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CHECK_ONLY = process.argv.includes('--check');

const OWNER = '해본놈RK (Haebonnom RK)';
const MAIL = 'hustlin.up@gmail.com';

let changed = 0;
let drift = 0;
const report = [];

/* ── CRLF-safe read/write ──────────────────────────────────────────────── */
function read(rel) {
  const raw = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  return { src: raw.replace(/\r\n/g, '\n'), crlf: /\r\n/.test(raw) };
}
function write(rel, src, crlf) {
  if (CHECK_ONLY) return;
  fs.writeFileSync(path.join(ROOT, rel), crlf ? src.replace(/\n/g, '\r\n') : src, 'utf8');
}
function note(rel, msgs) {
  if (!msgs.length) return;
  report.push(`${rel.padEnd(34)} ${msgs.join(', ')}`);
}

/* ── Locale strings ────────────────────────────────────────────────────────
   Three beats in every language: what it is / what it is NOT (not original
   reporting, no per-article human review) / go to the source. No claim of
   human editorial review, and no "inaccurate or hallucinated" phrasing. */
const L = {
  en: {
    aTitle: 'About this article — AI-assisted summary',
    aBody: 'This article is an AI-assisted summary of Korean news reported publicly by other outlets, written for Korean language-learning practice. It is not original reporting and is published without individual human review. For authoritative details, please read the original source.',
    sTitle: 'About Korean School Daily — AI-assisted summaries',
    sBodyLegacy: 'The articles in this section are AI-assisted summaries of Korean news reported publicly by other outlets, written for Korean language-learning practice. They are not original reporting and are published without individual human review. Each article links to its original source — please read there for authoritative details.',
    sBody: 'The articles in this section are AI-assisted summaries of Korean news reported publicly by other outlets, written for Korean language-learning practice. They are not original reporting and are published without individual human review. Where the original report was recorded, the article links to it; for older articles the source was not retained. Please treat these summaries as language-practice material rather than as a news source.',
    noSource: 'The original source for this article was not recorded.',
    byline: `Published by Korean School (한국어 학교) · Site owner and editor: ${OWNER} · <a href="mailto:${MAIL}" style="color:#f5c842;">${MAIL}</a> · Text drafted with AI assistance.`,
  },
  ja: {
    aTitle: 'この記事について — AIによる要約',
    aBody: 'この記事は、他の報道機関が公開している韓国のニュースをAIが要約したもので、韓国語学習のために作成されています。独自取材による報道ではなく、記事ごとの人によるチェックは行っていません。正確な内容については、元の記事をご確認ください。',
    sTitle: 'Korean School Daily について — AIによる要約',
    sBodyLegacy: 'このセクションの記事は、他の報道機関が公開している韓国のニュースをAIが要約したもので、韓国語学習のために作成されています。独自取材による報道ではなく、記事ごとの人によるチェックは行っていません。各記事には元記事へのリンクがあります。正確な内容はそちらでご確認ください。',
    sBody: 'このセクションの記事は、他の報道機関が公開している韓国のニュースをAIが要約したもので、韓国語学習のために作成されています。独自取材による報道ではなく、記事ごとの人によるチェックは行っていません。元記事の情報が記録されている場合は記事内にリンクを掲載していますが、それ以前の記事については元記事の情報が残っていません。これらの要約はニュースソースではなく、語学学習用の教材としてご利用ください。',
    noSource: 'この記事は元記事の情報を記録していません。',
    byline: `発行：Korean School（한국어 학교）· 運営者・編集者：${OWNER} · <a href="mailto:${MAIL}" style="color:#f5c842;">${MAIL}</a> · 本文はAIの支援により作成されています。`,
  },
  'zh-tw': {
    aTitle: '關於本文 — AI 協助撰寫的摘要',
    aBody: '本文是由 AI 協助整理的韓國新聞摘要，內容取自其他媒體已公開報導的新聞，專為韓語學習用途撰寫。本文並非原創報導，且未經逐篇人工審閱。如需準確詳情，請閱讀原始報導。',
    sTitle: '關於 Korean School Daily — AI 協助撰寫的摘要',
    sBodyLegacy: '本區文章是由 AI 協助整理的韓國新聞摘要，內容取自其他媒體已公開報導的新聞，專為韓語學習用途撰寫。這些文章並非原創報導，且未經逐篇人工審閱。每篇文章皆附有原始報導連結，準確詳情請以原始報導為準。',
    sBody: '本區文章是由 AI 協助整理的韓國新聞摘要，內容取自其他媒體已公開報導的新聞，專為韓語學習用途撰寫。這些文章並非原創報導，且未經逐篇人工審閱。若已記錄原始報導出處，文章內會附上連結；較早的文章則未保留出處資訊。請將這些摘要視為語言學習材料，而非新聞來源。',
    noSource: '本文未記錄原始報導出處。',
    byline: `發布：Korean School（한국어 학교）· 網站擁有者暨編輯：${OWNER} · <a href="mailto:${MAIL}" style="color:#f5c842;">${MAIL}</a> · 內文由 AI 協助撰寫。`,
  },
  es: {
    aTitle: 'Sobre este artículo — resumen asistido por IA',
    aBody: 'Este artículo es un resumen asistido por IA de noticias coreanas publicadas por otros medios, redactado para practicar el aprendizaje del coreano. No es periodismo original y se publica sin revisión humana artículo por artículo. Para obtener información autorizada, consulte la fuente original.',
    sTitle: 'Sobre Korean School Daily — resúmenes asistidos por IA',
    sBodyLegacy: 'Los artículos de esta sección son resúmenes asistidos por IA de noticias coreanas publicadas por otros medios, redactados para practicar el aprendizaje del coreano. No son periodismo original y se publican sin revisión humana artículo por artículo. Cada artículo enlaza a su fuente original: consúltela para obtener información autorizada.',
    sBody: 'Los artículos de esta sección son resúmenes asistidos por IA de noticias coreanas publicadas por otros medios, redactados para practicar el aprendizaje del coreano. No son periodismo original y se publican sin revisión humana artículo por artículo. Cuando se ha registrado el informe original, el artículo enlaza a él; en los artículos más antiguos no se conservó la fuente. Utilice estos resúmenes como material de práctica lingüística, no como fuente de noticias.',
    noSource: 'No se registró la fuente original de este artículo.',
    byline: `Publicado por Korean School (한국어 학교) · Propietario y editor del sitio: ${OWNER} · <a href="mailto:${MAIL}" style="color:#f5c842;">${MAIL}</a> · Texto redactado con asistencia de IA.`,
  },
  de: {
    aTitle: 'Über diesen Artikel — KI-gestützte Zusammenfassung',
    aBody: 'Dieser Artikel ist eine KI-gestützte Zusammenfassung koreanischer Nachrichten, die von anderen Medien öffentlich berichtet wurden, und wurde zum Koreanischlernen erstellt. Es handelt sich nicht um eigene Berichterstattung, und der Artikel wird ohne individuelle redaktionelle Prüfung veröffentlicht. Verbindliche Informationen entnehmen Sie bitte der Originalquelle.',
    sTitle: 'Über Korean School Daily — KI-gestützte Zusammenfassungen',
    sBodyLegacy: 'Die Artikel in diesem Bereich sind KI-gestützte Zusammenfassungen koreanischer Nachrichten, die von anderen Medien öffentlich berichtet wurden, und wurden zum Koreanischlernen erstellt. Sie sind keine eigene Berichterstattung und werden ohne individuelle redaktionelle Prüfung veröffentlicht. Jeder Artikel verlinkt seine Originalquelle — verbindliche Informationen finden Sie dort.',
    sBody: 'Die Artikel in diesem Bereich sind KI-gestützte Zusammenfassungen koreanischer Nachrichten, die von anderen Medien öffentlich berichtet wurden, und wurden zum Koreanischlernen erstellt. Sie sind keine eigene Berichterstattung und werden ohne individuelle redaktionelle Prüfung veröffentlicht. Sofern die Originalmeldung erfasst wurde, verlinkt der Artikel sie; bei älteren Artikeln wurde die Quelle nicht gespeichert. Bitte nutzen Sie diese Zusammenfassungen als Sprachlernmaterial und nicht als Nachrichtenquelle.',
    noSource: 'Für diesen Artikel wurde keine Originalquelle erfasst.',
    byline: `Herausgegeben von Korean School (한국어 학교) · Betreiber und Redakteur: ${OWNER} · <a href="mailto:${MAIL}" style="color:#f5c842;">${MAIL}</a> · Text mit KI-Unterstützung verfasst.`,
  },
  fr: {
    aTitle: 'À propos de cet article — résumé assisté par IA',
    aBody: "Cet article est un résumé assisté par IA d'informations coréennes publiées par d'autres médias, rédigé pour l'apprentissage du coréen. Il ne s'agit pas d'un travail journalistique original et il est publié sans relecture humaine article par article. Pour des informations faisant autorité, veuillez consulter la source d'origine.",
    sTitle: 'À propos de Korean School Daily — résumés assistés par IA',
    sBodyLegacy: "Les articles de cette rubrique sont des résumés assistés par IA d'informations coréennes publiées par d'autres médias, rédigés pour l'apprentissage du coréen. Ce ne sont pas des travaux journalistiques originaux et ils sont publiés sans relecture humaine article par article. Chaque article renvoie à sa source d'origine — veuillez la consulter pour des informations faisant autorité.",
    sBody: "Les articles de cette rubrique sont des résumés assistés par IA d'informations coréennes publiées par d'autres médias, rédigés pour l'apprentissage du coréen. Ce ne sont pas des travaux journalistiques originaux et ils sont publiés sans relecture humaine article par article. Lorsque l'article d'origine a été enregistré, un lien y renvoie ; pour les articles plus anciens, la source n'a pas été conservée. Veuillez utiliser ces résumés comme support d'apprentissage linguistique et non comme source d'information.",
    noSource: "La source d'origine de cet article n'a pas été enregistrée.",
    byline: `Publié par Korean School (한국어 학교) · Propriétaire et éditeur du site : ${OWNER} · <a href="mailto:${MAIL}" style="color:#f5c842;">${MAIL}</a> · Texte rédigé avec l'assistance d'une IA.`,
  },
  vi: {
    aTitle: 'Về bài viết này — bản tóm tắt do AI hỗ trợ',
    aBody: 'Bài viết này là bản tóm tắt do AI hỗ trợ, dựa trên tin tức Hàn Quốc đã được các hãng tin khác đăng tải công khai, và được viết nhằm phục vụ việc học tiếng Hàn. Đây không phải là bài báo gốc và được đăng mà không qua khâu biên tập thủ công cho từng bài. Để có thông tin chính xác, vui lòng đọc nguồn tin gốc.',
    sTitle: 'Về Korean School Daily — các bản tóm tắt do AI hỗ trợ',
    sBodyLegacy: 'Các bài trong mục này là bản tóm tắt do AI hỗ trợ, dựa trên tin tức Hàn Quốc đã được các hãng tin khác đăng tải công khai, và được viết nhằm phục vụ việc học tiếng Hàn. Đây không phải là bài báo gốc và được đăng mà không qua khâu biên tập thủ công cho từng bài. Mỗi bài đều có liên kết tới nguồn tin gốc — vui lòng đọc ở đó để có thông tin chính xác.',
    sBody: 'Các bài trong mục này là bản tóm tắt do AI hỗ trợ, dựa trên tin tức Hàn Quốc đã được các hãng tin khác đăng tải công khai, và được viết nhằm phục vụ việc học tiếng Hàn. Đây không phải là bài báo gốc và được đăng mà không qua khâu biên tập thủ công cho từng bài. Nếu nguồn tin gốc đã được ghi lại, bài viết sẽ có liên kết tới nguồn đó; với các bài cũ hơn, thông tin nguồn không được lưu giữ. Vui lòng xem các bản tóm tắt này là tài liệu luyện ngôn ngữ, không phải nguồn tin tức.',
    noSource: 'Bài viết này không lưu thông tin nguồn tin gốc.',
    byline: `Phát hành bởi Korean School (한국어 학교) · Chủ sở hữu và biên tập viên: ${OWNER} · <a href="mailto:${MAIL}" style="color:#f5c842;">${MAIL}</a> · Nội dung được soạn với sự hỗ trợ của AI.`,
  },
  th: {
    aTitle: 'เกี่ยวกับบทความนี้ — บทสรุปที่จัดทำโดยความช่วยเหลือของ AI',
    aBody: 'บทความนี้เป็นบทสรุปที่จัดทำขึ้นโดยความช่วยเหลือของ AI จากข่าวเกาหลีที่สำนักข่าวอื่นได้เผยแพร่ต่อสาธารณะ เขียนขึ้นเพื่อใช้ฝึกเรียนภาษาเกาหลี ไม่ใช่การรายงานข่าวต้นฉบับ และเผยแพร่โดยไม่ได้ผ่านการตรวจทานโดยมนุษย์เป็นรายบทความ หากต้องการข้อมูลที่ถูกต้องแม่นยำ โปรดอ่านจากแหล่งข่าวต้นฉบับ',
    sTitle: 'เกี่ยวกับ Korean School Daily — บทสรุปที่จัดทำโดยความช่วยเหลือของ AI',
    sBodyLegacy: 'บทความในส่วนนี้เป็นบทสรุปที่จัดทำขึ้นโดยความช่วยเหลือของ AI จากข่าวเกาหลีที่สำนักข่าวอื่นได้เผยแพร่ต่อสาธารณะ เขียนขึ้นเพื่อใช้ฝึกเรียนภาษาเกาหลี ไม่ใช่การรายงานข่าวต้นฉบับ และเผยแพร่โดยไม่ได้ผ่านการตรวจทานโดยมนุษย์เป็นรายบทความ ทุกบทความมีลิงก์ไปยังแหล่งข่าวต้นฉบับ โปรดอ่านที่นั่นเพื่อข้อมูลที่ถูกต้องแม่นยำ',
    sBody: 'บทความในส่วนนี้เป็นบทสรุปที่จัดทำขึ้นโดยความช่วยเหลือของ AI จากข่าวเกาหลีที่สำนักข่าวอื่นได้เผยแพร่ต่อสาธารณะ เขียนขึ้นเพื่อใช้ฝึกเรียนภาษาเกาหลี ไม่ใช่การรายงานข่าวต้นฉบับ และเผยแพร่โดยไม่ได้ผ่านการตรวจทานโดยมนุษย์เป็นรายบทความ หากมีการบันทึกแหล่งข่าวต้นฉบับไว้ บทความจะมีลิงก์ไปยังแหล่งข่าวนั้น ส่วนบทความเก่าจะไม่มีข้อมูลแหล่งที่มา โปรดใช้บทสรุปเหล่านี้เป็นสื่อสำหรับฝึกภาษา ไม่ใช่แหล่งข่าว',
    noSource: 'บทความนี้ไม่ได้บันทึกแหล่งข่าวต้นฉบับไว้',
    byline: `เผยแพร่โดย Korean School (한국어 학교) · เจ้าของและบรรณาธิการเว็บไซต์: ${OWNER} · <a href="mailto:${MAIL}" style="color:#f5c842;">${MAIL}</a> · เนื้อหาเรียบเรียงขึ้นโดยความช่วยเหลือของ AI`,
  },
  id: {
    aTitle: 'Tentang artikel ini — ringkasan dengan bantuan AI',
    aBody: 'Artikel ini adalah ringkasan yang disusun dengan bantuan AI dari berita Korea yang telah diberitakan secara terbuka oleh media lain, dan ditulis untuk keperluan belajar bahasa Korea. Ini bukan liputan orisinal dan diterbitkan tanpa peninjauan manusia untuk tiap artikel. Untuk informasi yang sahih, silakan baca sumber aslinya.',
    sTitle: 'Tentang Korean School Daily — ringkasan dengan bantuan AI',
    sBodyLegacy: 'Artikel di bagian ini adalah ringkasan yang disusun dengan bantuan AI dari berita Korea yang telah diberitakan secara terbuka oleh media lain, dan ditulis untuk keperluan belajar bahasa Korea. Semua ini bukan liputan orisinal dan diterbitkan tanpa peninjauan manusia untuk tiap artikel. Setiap artikel mencantumkan tautan ke sumber aslinya — silakan baca di sana untuk informasi yang sahih.',
    sBody: 'Artikel di bagian ini adalah ringkasan yang disusun dengan bantuan AI dari berita Korea yang telah diberitakan secara terbuka oleh media lain, dan ditulis untuk keperluan belajar bahasa Korea. Semua ini bukan liputan orisinal dan diterbitkan tanpa peninjauan manusia untuk tiap artikel. Jika sumber aslinya tercatat, artikel akan mencantumkan tautannya; untuk artikel lama, informasi sumber tidak tersimpan. Harap gunakan ringkasan ini sebagai bahan latihan bahasa, bukan sebagai sumber berita.',
    noSource: 'Sumber asli untuk artikel ini tidak tercatat.',
    byline: `Diterbitkan oleh Korean School (한국어 학교) · Pemilik dan editor situs: ${OWNER} · <a href="mailto:${MAIL}" style="color:#f5c842;">${MAIL}</a> · Teks disusun dengan bantuan AI.`,
  },
};

const BOX = 'margin:1.5rem 0;padding:1rem 1.125rem;background:rgba(255,200,0,0.06);border:1px solid rgba(255,200,0,0.25);border-radius:10px;font-size:0.83rem;color:var(--text-secondary,#aaa);line-height:1.7;text-align:left;';
const BYLINE_STYLE = 'margin-top:0.65rem;padding-top:0.6rem;border-top:1px solid rgba(255,200,0,0.18);font-size:0.8rem;';

function articleDisclosure(lang, i) {
  const s = L[lang];
  return `${i}<!-- AI-assistance disclosure + attribution -->
${i}<div class="news-ai-disclosure" style="${BOX}">
${i}  <strong style="color:#f5c842;">${s.aTitle}</strong><br>
${i}  ${s.aBody}
${i}  <div id="article-source-link" style="margin-top:0.6rem;"></div>
${i}  <div class="news-ai-byline" style="${BYLINE_STYLE}">
${i}    <span rel="author">${s.byline}</span>
${i}  </div>
${i}</div>`;
}

function sectionDisclosure(lang, i) {
  const s = L[lang];
  return `${i}<div class="news-ai-disclosure animate-fade-up" style="${BOX}">
${i}  <strong style="color:#f5c842;">${s.sTitle}</strong><br>
${i}  ${s.sBody}
${i}  <div class="news-ai-byline" style="${BYLINE_STYLE}">
${i}    <span rel="author">${s.byline}</span>
${i}  </div>
${i}</div>`;
}

/* ══ PART 1 — the 27 news shells ═════════════════════════════════════════ */
const LANGS = ['en', 'ja', 'zh-tw', 'es', 'de', 'fr', 'vi', 'th', 'id'];
const KINDS = ['index', 'article', 'board'];

function patchShells() {
  for (const lang of LANGS) {
    for (const kind of KINDS) {
      const rel = lang === 'en' ? `news/${kind}.html` : `news/${lang}/${kind}.html`;
      if (!fs.existsSync(path.join(ROOT, rel))) continue;

      const { src: orig, crlf } = read(rel);
      let src = orig;
      const msgs = [];

      // 1 ── robots: noindex, follow on every news shell.
      // The article/board shells are ~24-word client-rendered husks; the index
      // pages have only ~50 words of unique static prose wrapped around a feed
      // of unreviewed AI content. An unindexable thin shell cannot drag down
      // the site's quality average. Reversible one line at a time.
      const robotsRe = /<meta\s+name="robots"[^>]*>/i;
      if (robotsRe.test(src)) {
        if (!/content="noindex,\s*follow"/i.test(src.match(robotsRe)[0])) msgs.push('robots-normalized');
        src = src.replace(robotsRe, '<meta name="robots" content="noindex, follow">');
      } else {
        src = src.replace(/(<meta name="viewport"[^>]*>[ \t]*\n)/i,
          '$1  <meta name="robots" content="noindex, follow">\n');
        msgs.push('robots-added');
      }

      // 2 ── strip every AdSense artifact.
      // Serving ads against unreviewed AI content is the highest-risk surface
      // on the site. Restorable after approval if desired.
      const adBefore = src;
      src = src.replace(/^[ \t]*<meta name="google-adsense-account"[^>]*>[ \t]*\n/gim, '');
      src = src.replace(/^[ \t]*<script async src="https:\/\/pagead2\.googlesyndication\.com\/[^"]*"[^>]*><\/script>[ \t]*\n/gim, '');
      src = src.replace(/^[ \t]*<script[^>]*src="[^"]*\/js\/ads\.js"[^>]*><\/script>[ \t]*\n?/gim, '');
      src = src.replace(/^[ \t]*<div class="ad-zone[^"]*">[\s\S]*?<\/div>[ \t]*\n/gim, '');
      if (src !== adBefore) msgs.push('ads-stripped');

      // 3 ── replace the disclosure. Three source layouts exist across the
      // locales; all of them are matched, and the guard makes a re-run a no-op.
      if (!/news-ai-disclosure/.test(src)) {
        let done = false;
        if (kind === 'article') {
          const re = /^([ \t]*)<!-- AI Notice -->[ \t]*\n[ \t]*<div style="margin:1\.5rem 0;[\s\S]*?<\/div>/m;
          const m = src.match(re);
          if (m) { src = src.replace(re, articleDisclosure(lang, m[1])); done = true; }
        } else {
          // en/es/de/fr/vi/th/id use a <p>; ja/zh-tw use a wider <div>.
          for (const re of [
            /^([ \t]*)<p class="animate-fade-up" style="margin-top:0\.75rem;[\s\S]*?<\/p>/m,
            /^([ \t]*)<div class="animate-fade-up" style="margin-top:1\.25rem;[\s\S]*?<\/div>/m,
          ]) {
            const m = src.match(re);
            if (m) { src = src.replace(re, sectionDisclosure(lang, m[1])); done = true; break; }
          }
        }
        msgs.push(done ? 'disclosure-replaced' : '!! DISCLOSURE ANCHOR NOT FOUND');
        if (!done) drift++;
      }

      // 4 ── article shells need a JS-writable JSON-LD slot. ja/zh-tw ship
      // only a static head block and have no #json-ld element of their own.
      if (kind === 'article' && !/id="json-ld"/.test(src)) {
        src = src.replace(/(<script type="application\/ld\+json">)/,
          '<script id="json-ld" type="application/ld+json"></script>\n  $1');
        msgs.push('json-ld-slot-added');
      }

      // 5 ── static head JSON-LD gets an honest organizational author.
      if (kind === 'article' && !/"creditText"/.test(src)) {
        src = src.replace(/("isAccessibleForFree": true,)/,
          '$1\n  "author": {\n    "@type": "Organization",\n    "name": "Korean School 한국어 학교",\n    "url": "https://freekoreanschool.com/about"\n  },\n  "creditText": "AI-assisted summary published by Korean School (한국어 학교)",');
        if (/"creditText"/.test(src)) msgs.push('schema-author-added');
      }

      // 6 ── the ja/zh-tw article shells bypass js/app.js entirely: they carry
      // their own inline renderer. Patch source-link + JSON-LD into those too.
      if (kind === 'article' && (lang === 'ja' || lang === 'zh-tw')) {
        if (!/article-source-link'\)/.test(src) && /sb\.rpc\('increment_view'/.test(src)) {
          src = src.replace(/([ \t]*)(sb\.rpc\('increment_view')/, (mm, ind, tail) =>
            inlineRendererPatch(lang, ind) + '\n\n' + ind + tail);
          msgs.push('inline-renderer-patched');
        }

        // 6b ── upgrade an inline renderer patched by the first pass, which
        // rendered nothing at all when source_url was absent. Every existing
        // article is in exactly that state, so the slot sat empty under a
        // disclosure that implied a source link. Make the absence explicit.
        if (/article-source-link'\)/.test(src) && !/article-no-source/.test(src)) {
          const re = /(if \(article\.source_url\) \{[\s\S]*?\n([ \t]*)\}\n)(\2if \(article\.published_at\) \{)/;
          if (re.test(src)) {
            src = src.replace(re, (mm, head, ind2, tail) =>
              head +
              `${ind2}else {\n` +
              `${ind2}  bits.push('<span class="article-no-source" style="opacity:0.8;">${L[lang].noSource}</span>');\n` +
              `${ind2}}\n` +
              tail);
            msgs.push('inline-no-source-branch');
          } else {
            msgs.push('!! INLINE NO-SOURCE ANCHOR NOT FOUND');
            drift++;
          }
        }
      }

      if (src !== orig) {
        if (CHECK_ONLY) { drift++; }
        else { write(rel, src, crlf); changed++; }
      }
      note(rel, msgs);
    }
  }
}

/* ══ PART 1b — retire the "every article links to its source" claim ═══════
   The first hardening pass shipped a section-level disclosure promising that
   "Each article links to its original source". That was written against the
   *future* behaviour of generate-news.js. It is false for the existing
   catalogue: all 95 articles in Supabase predate source capture, none has a
   source_url, and nothing recoverable was ever stored (verified 2026-07-21 —
   no column holds a URL, and the AI-rewritten headlines cannot be matched
   back to a publisher reliably; a wrong attribution is worse than none).

   So the section wording is narrowed to something true of the whole catalogue,
   and the per-article slot states plainly when no source was recorded.
   Guarded by the legacy string itself, so a re-run is a no-op. */
function patchDisclosureWording() {
  for (const lang of LANGS) {
    for (const kind of ['index', 'board']) {
      const rel = lang === 'en' ? `news/${kind}.html` : `news/${lang}/${kind}.html`;
      if (!fs.existsSync(path.join(ROOT, rel))) continue;

      const { src: orig, crlf } = read(rel);
      const s = L[lang];
      if (!orig.includes(s.sBodyLegacy)) { note(rel, []); continue; }

      const src = orig.split(s.sBodyLegacy).join(s.sBody);
      if (CHECK_ONLY) drift++;
      else { write(rel, src, crlf); changed++; }
      note(rel, ['section-wording-narrowed']);
    }
  }
}

/* Source-link + JSON-LD block injected into the standalone ja / zh-tw
   renderers. Mirrors renderSourceLink()/renderMeta() in js/app.js. */
function inlineRendererPatch(lang, ind) {
  const ja = lang === 'ja';
  const header = ja
    ? `${ind}// ── 元記事へのリンク + 機械可読メタデータ ──────────────────\n${ind}// AI支援で作成した要約は必ず元の報道へリンクし、著者は個人名では\n${ind}// なくサイト（組織）として表示する。`
    : `${ind}// ── 原始報導連結 + 機器可讀中繼資料 ─────────────────────────\n${ind}// AI 協助撰寫的摘要必須連回原始報導，作者標示為網站（組織），\n${ind}// 不使用虛構的個人署名。`;
  const srcLabel = ja ? '元記事：' : '原始報導：';
  const title = ja ? 'titleJa' : 'titleZh';
  const summary = ja ? 'article.summary_ja' : 'article.summary_zh_tw';
  const inLang = ja ? "['ja', 'ko']" : "['zh-TW', 'ko']";

  return `${header}
${ind}const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
${ind}  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

${ind}const srcSlot = document.getElementById('article-source-link');
${ind}if (srcSlot) {
${ind}  const bits = [];
${ind}  if (article.source_url) {
${ind}    const label = article.source_title || article.source_name || article.source_url;
${ind}    bits.push(\`<strong>${srcLabel}</strong><a href="\${esc(article.source_url)}" target="_blank" rel="noopener nofollow" style="color:#f5c842;text-decoration:underline;">\${esc(label)}</a>\`
${ind}      + (article.source_name && article.source_title ? \` <span style="opacity:0.75;">— \${esc(article.source_name)}</span>\` : ''));
${ind}  } else {
${ind}    // No source recorded for this article — say so rather than leaving the
${ind}    // disclosure implying a link that is not there.
${ind}    bits.push('<span class="article-no-source" style="opacity:0.8;">${L[lang].noSource}</span>');
${ind}  }
${ind}  if (article.published_at) {
${ind}    bits.push(\`<time datetime="\${esc(article.published_at)}" style="opacity:0.8;">\${esc(fmtDate(article.published_at))}</time>\`);
${ind}  }
${ind}  srcSlot.innerHTML = bits.join('<br>');
${ind}}

${ind}const ldSlot = document.getElementById('json-ld');
${ind}if (ldSlot) ldSlot.textContent = JSON.stringify({
${ind}  '@context': 'https://schema.org',
${ind}  '@type': 'NewsArticle',
${ind}  headline: ${title},
${ind}  description: article.seo_description || ${summary} || '',
${ind}  image: article.thumbnail_url || undefined,
${ind}  datePublished: article.published_at,
${ind}  dateModified: article.updated_at || article.published_at,
${ind}  inLanguage: ${inLang},
${ind}  url: location.href,
${ind}  author: { '@type': 'Organization', name: 'Korean School 한국어 학교', url: 'https://freekoreanschool.com/about' },
${ind}  creditText: article.ai_generated
${ind}    ? 'AI-assisted summary published by Korean School (한국어 학교)'
${ind}    : 'Published by Korean School (한국어 학교)',
${ind}  publisher: {
${ind}    '@type': 'Organization',
${ind}    name: 'Korean School 한국어 학교',
${ind}    url: 'https://freekoreanschool.com',
${ind}    logo: 'https://freekoreanschool.com/assets/images/android-chrome-512x512.png'
${ind}  },
${ind}  isBasedOn: article.source_url || undefined,
${ind}  citation: article.source_url
${ind}    ? { '@type': 'CreativeWork', name: article.source_title || article.source_name || article.source_url, url: article.source_url }
${ind}    : undefined
${ind}});`;
}

/* The renderSourceLink block in js/app.js, built from the same locale table
   as the HTML disclosures so the two can never drift apart. Emitted both on a
   fresh install and as an in-place upgrade of the first pass's version, which
   rendered nothing when source_url was absent. */
function sourceLinkBlock() {
  const key = l => (/^[a-z]+$/.test(l) ? l : `'${l}'`);
  const noSrc = LANGS.map(l => `    ${key(l)}: ${JSON.stringify(L[l].noSource)},`).join('\n');

  return `  const SOURCE_LABEL = {
    en: 'Original source', ja: '元記事', 'zh-tw': '原始報導', es: 'Fuente original',
    de: 'Originalquelle', fr: "Source d'origine", vi: 'Nguồn tin gốc',
    th: 'แหล่งข่าวต้นฉบับ', id: 'Sumber asli'
  };

  /* Shown when an article has no recorded source. Every article published
     before source capture went in is in exactly this state, so the slot must
     state the absence rather than render empty under a disclosure that would
     otherwise read as a promise of a link. */
  const NO_SOURCE_LABEL = {
${noSrc}
  };

  function renderSourceLink(a) {
    const slot = document.getElementById('article-source-link');
    if (!slot) return;
    const lang = window.LangManager?.getLang() || 'en';
    const parts = [];
    if (a.source_url) {
      const label = SOURCE_LABEL[lang] || SOURCE_LABEL.en;
      const text = a.source_title || a.source_name || a.source_url;
      parts.push(
        \`<strong>\${newsEscape(label)}:</strong> \` +
        \`<a href="\${newsEscape(a.source_url)}" target="_blank" rel="noopener nofollow" \` +
        \`style="color:#f5c842;text-decoration:underline;">\${newsEscape(text)}</a>\` +
        (a.source_name && a.source_title ? \` <span style="opacity:0.75;">— \${newsEscape(a.source_name)}</span>\` : '')
      );
    } else {
      const label = NO_SOURCE_LABEL[lang] || NO_SOURCE_LABEL.en;
      parts.push(\`<span class="article-no-source" style="opacity:0.8;">\${newsEscape(label)}</span>\`);
    }
    if (a.published_at) {
      parts.push(\`<time itemprop="datePublished" datetime="\${newsEscape(a.published_at)}" style="opacity:0.8;">\${newsEscape(newsFormatDate(a.published_at))}</time>\`);
    }
    slot.innerHTML = parts.join('<br>');
  }`;
}

/* ══ PART 2 — js/app.js (news code paths only) ═══════════════════════════ */
function patchAppJs() {
  const rel = 'js/app.js';
  const { src: orig, crlf } = read(rel);
  let src = orig;
  const msgs = [];

  // 2a ── drop the in-feed ad generator
  if (/function newsInfeedAdHTML/.test(src)) {
    src = src.replace(/function newsInfeedAdHTML\(\)\s*\{[\s\S]*?\n\}\n/,
      `/* In-feed / in-article ads were removed from the news section entirely.
   The news feed is AI-assisted summary content published without individual
   human review — it must not carry ad units. Do not reintroduce ad slots here
   without a policy review of the section itself. */\n`);
    msgs.push('infeed-ad-fn-removed');
  }

  // 2b ── in-feed insertion inside the grid loader
  if (/newsInfeedAdHTML\(\)/.test(src)) {
    src = src.replace(
      /data\.forEach\(\(a, i\) => \{\s*\n\s*parts\.push\(newsRenderCard\(a\)\);\s*\n\s*if \(KS_ADS_LIVE && \(i \+ 1\) % 4 === 0\) parts\.push\(newsInfeedAdHTML\(\)\);[^\n]*\n\s*\}\);/,
      'data.forEach(a => { parts.push(newsRenderCard(a)); }); // no in-feed ads in the news section');
    msgs.push('infeed-ad-call-removed');
  }

  // 2c ── in-article ad block in renderBody
  if (/ad-zone ad-zone--inarticle/.test(src)) {
    src = src.replace(
      /\n\s*if \(KS_ADS_LIVE\) \{\s*\n\s*const adZone = document\.createElement\('div'\);[\s\S]*?body\.insertAdjacentElement\('afterend', adZone\);\s*\n\s*\}/,
      '\n      // No in-article ad unit here — see the news ad policy note above.');
    msgs.push('inarticle-ad-removed');
  }

  // 2d ── the KSAds push on the article path
  if (/window\.KSAds\?\.push\(\); \/\/ JS-inserted zones/.test(src)) {
    src = src.replace(/\n\s*window\.KSAds\?\.push\(\); \/\/ JS-inserted zones[^\n]*/, '');
    msgs.push('article-ksads-push-removed');
  }
  // 2e ── the KSAds push on the news grid path (guarded so the content rail's
  // own pushes, used by learn/culture, are left untouched)
  const gridPush = /(el\.innerHTML = '<div style="grid-column:1\/-1[^\n]*\n)\s*window\.KSAds\?\.push\(\);\n/;
  if (gridPush.test(src)) {
    src = src.replace(gridPush, '$1');
    msgs.push('grid-ksads-push-removed');
  }

  // 2f ── honest machine-readable authorship in renderMeta
  if (!/creditText/.test(src)) {
    src = src.replace(
      /(\s*)author: \{ '@type': 'Organization', name: 'Korean School' \},\s*\n\s*publisher: \{ '@type': 'Organization', name: 'Korean School' \}/,
      `$1// Machine-readable authorship. AI-assisted text is attributed to the
$1// site as an organization — never to a fabricated human byline.
$1author: {
$1  '@type': 'Organization',
$1  name: 'Korean School 한국어 학교',
$1  url: 'https://freekoreanschool.com/about'
$1},
$1creditText: a.ai_generated
$1  ? 'AI-assisted summary published by Korean School (한국어 학교)'
$1  : 'Published by Korean School (한국어 학교)',
$1publisher: {
$1  '@type': 'Organization',
$1  name: 'Korean School 한국어 학교',
$1  url: 'https://freekoreanschool.com',
$1  logo: 'https://freekoreanschool.com/assets/images/android-chrome-512x512.png'
$1},
$1isBasedOn: a.source_url || undefined,
$1citation: a.source_url
$1  ? { '@type': 'CreativeWork', name: a.source_title || a.source_name || a.source_url, url: a.source_url }
$1  : undefined`);
    if (/creditText/.test(src)) msgs.push('schema-author-added');
  }

  // 2g ── renderSourceLink + its call site
  if (!/function renderSourceLink/.test(src)) {
    src = src.replace(/(\n  function renderThumbnail\(a\) \{)/,
      `
  /* Outbound link to the original report this summary is based on, plus a
     machine-readable publication date. Rendered into the #article-source-link
     slot inside the AI-assistance disclosure box on every news article shell. */
${sourceLinkBlock()}
$1`);
    msgs.push('renderSourceLink-added');
  }

  // 2g-bis ── upgrade a first-pass renderSourceLink (no else branch, so the
  // slot rendered empty for every sourceless article) to the current version.
  if (/function renderSourceLink/.test(src) && !/NO_SOURCE_LABEL/.test(src)) {
    const re = /  const SOURCE_LABEL = \{[\s\S]*?slot\.innerHTML = parts\.join\('<br>'\);\n  \}/;
    if (re.test(src)) {
      src = src.replace(re, () => sourceLinkBlock());
      msgs.push('renderSourceLink-no-source-branch');
    } else {
      msgs.push('!! renderSourceLink UPGRADE ANCHOR NOT FOUND');
      drift++;
    }
  }
  if (!/renderSourceLink\(article\)/.test(src)) {
    src = src.replace(/(\n(\s*)renderVocabulary\(article\);)/, '$1\n$2renderSourceLink(article);');
    msgs.push('renderSourceLink-wired');
  }

  if (src !== orig) {
    if (CHECK_ONLY) drift++;
    else { write(rel, src, crlf); changed++; }
  }
  note(rel, msgs);
}

/* ══ PART 3 — scripts/generate-news.js (source-URL capture chain) ════════ */
function patchGenerator() {
  const rel = 'scripts/generate-news.js';
  const { src: orig, crlf } = read(rel);
  let src = orig;
  const msgs = [];

  // 3a ── parseRSS: capture <link> and the <source url=""> attribute.
  // Neither was being read, so no article could ever link to its source.
  if (!/sourceUrl/.test(src)) {
    src = src.replace(
      /(    if \(title\) items\.push\(\{ title, desc, source, pubDate)( \}\);)/,
      `    // Original-source URL. Google News RSS wraps publisher links in a
    // news.google.com redirect; it still resolves to the publisher's page and
    // is what we surface to readers as "original source".
    const link = (
      raw.match(/<link><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/link>/)?.[1] ??
      raw.match(/<link>([\\s\\S]*?)<\\/link>/)?.[1] ?? ''
    ).replace(/&amp;/g, '&').trim();

    const sourceUrl = (raw.match(/<source[^>]*url="([^"]*)"/)?.[1] ?? '').replace(/&amp;/g, '&').trim();

$1, link, sourceUrl$2`);
    msgs.push('parseRSS-link-capture');
  }

  // 3b ── model contract: which headline did it summarize?
  if (!/"source_index"/.test(src)) {
    src = src.replace(/(\n  "seo_description": "Meta description under 155 chars",)/,
      '\n  "source_index": 1,$1');
    msgs.push('source_index-field');
  }
  if (!/- "source_index":/.test(src)) {
    src = src.replace(/(\nGuidelines:\n)/,
      '$1- "source_index": the number (from the headline list above) of the ONE headline this article is based on. This is required — readers are shown a link to that original report. If no headlines were supplied, use 0.\n');
    msgs.push('source_index-guideline');
  }

  // 3c ── map the model's pick back to the RSS item
  if (!/const picked =/.test(src)) {
    src = src.replace(
      /(    return generateArticle\(topic, \{ attempt: 1 \}\);\n  \}\n)(  return article;)/,
      `$1
  // Attach the original report this summary was based on, so every published
  // article can link out to it. Falls back to the first headline if the model
  // returned an out-of-range index.
  const idx = Number(article.source_index);
  const picked = (Number.isInteger(idx) && idx >= 1 && idx <= newsItems.length)
    ? newsItems[idx - 1]
    : newsItems[0];
  if (picked) {
    article.source_url   = picked.link || picked.sourceUrl || null;
    article.source_name  = picked.source || null;
    article.source_title = picked.title || null;
    if (!article.source_url) console.warn(\`  [source] no URL captured for "\${topic.slug}"\`);
  } else {
    article.source_url = article.source_name = article.source_title = null;
    console.warn(\`  [source] no headlines for "\${topic.slug}" — publishing without a source link\`);
  }
  delete article.source_index;

$2`);
    msgs.push('source-mapping');
  }

  // 3d ── persist on insert and on rewrite (requires migration 004)
  if (!/source_url:      article\.source_url/.test(src)) {
    src = src.replace(
      /(    vocabulary:      article\.vocabulary \|\| \[\],\n)(    status:          'published',)/,
      `$1    source_url:      article.source_url   || null,
    source_name:     article.source_name  || null,
    source_title:    article.source_title || null,
$2`);
    src = src.replace(
      /(    vocabulary:      article\.vocabulary \|\| \[\],\n)(    updated_at:      new Date\(\)\.toISOString\(\),\n  \}\)\.eq\('id', articleId\);)/,
      `$1    source_url:      article.source_url   || null,
    source_name:     article.source_name  || null,
    source_title:    article.source_title || null,
$2`);
    msgs.push('source-persistence');
  }

  if (src !== orig) {
    if (CHECK_ONLY) drift++;
    else { write(rel, src, crlf); changed++; }
  }
  note(rel, msgs);
}

/* ══ PART 4 — pause the daily cron ═══════════════════════════════════════ */
function patchWorkflow() {
  const rel = '.github/workflows/generate-news.yml';
  const { src: orig, crlf } = read(rel);
  let src = orig;
  const msgs = [];

  if (/^on:\n  schedule:/m.test(src)) {
    src = src.replace(
      /^on:\n  schedule:\n    # 23:00 UTC = 08:00 AM KST \(UTC\+9\)\n    - cron: '0 23 \* \* \*'\n  # Allow manual trigger from GitHub Actions UI\n  workflow_dispatch:/m,
      `# ─────────────────────────────────────────────────────────────────────────────
# PAUSED — daily schedule intentionally disabled.
#
# Two reasons:
#   1. AdSense rejected the site for "Low value content". Publishing ~11 new
#      unreviewed AI-assisted articles per day across 9 locales while an appeal
#      is pending strengthens exactly the "scaled content abuse" pattern the
#      reviewer is looking for. Nothing in news/ is indexed (all shells are
#      noindex, zero article URLs in sitemap.xml), so pausing costs no SEO.
#   2. generate-news.js now writes source_url / source_name / source_title.
#      supabase/migrations/004_article_sources.sql MUST be applied first or
#      every insert fails on unknown columns.
#
# TO RESUME: apply migration 004, decide on a human review step, then
# uncomment the \`schedule:\` block below.
# ─────────────────────────────────────────────────────────────────────────────
on:
  # schedule:
  #   # 23:00 UTC = 08:00 AM KST (UTC+9)
  #   - cron: '0 23 * * *'

  # Manual trigger stays enabled so the generator can still be run on demand
  # (use dry_run first to verify the source-capture changes).
  workflow_dispatch:`);
    msgs.push('cron-paused');
  }

  if (src !== orig) {
    if (CHECK_ONLY) drift++;
    else { write(rel, src, crlf); changed++; }
  }
  note(rel, msgs);
}

/* ══ Verification ════════════════════════════════════════════════════════ */
function verify() {
  const problems = [];
  for (const lang of LANGS) {
    for (const kind of KINDS) {
      const rel = lang === 'en' ? `news/${kind}.html` : `news/${lang}/${kind}.html`;
      if (!fs.existsSync(path.join(ROOT, rel))) continue;
      const h = read(rel).src;
      const p = [];
      if (!/name="robots" content="noindex, follow"/.test(h)) p.push('ROBOTS');
      if (/ad-zone|adsbygoogle|googlesyndication|google-adsense|ads\.js/i.test(h)) p.push('ADS');
      if (!/news-ai-disclosure/.test(h)) p.push('NO-DISCLOSURE');
      if (!/news-ai-byline/.test(h)) p.push('NO-BYLINE');
      if (/hallucinat|ハルシネーション|幻覺|halluzin|ảo giác|ข้อมูลหลอน/i.test(h)) p.push('OLD-WORDING');
      if (kind === 'article') {
        if (!/id="article-source-link"/.test(h)) p.push('NO-SRC-SLOT');
        if (!/id="json-ld"/.test(h)) p.push('NO-LD-SLOT');
        if (!/"creditText"/.test(h)) p.push('NO-CREDIT');
        // The two standalone renderers must also state a missing source.
        if ((lang === 'ja' || lang === 'zh-tw') && !/article-no-source/.test(h)) p.push('NO-NOSRC-BRANCH');
      } else {
        // No page may promise a source link the back catalogue does not have.
        if (h.includes(L[lang].sBodyLegacy)) p.push('OVERCLAIMS-SOURCE-LINK');
        if (!h.includes(L[lang].sBody)) p.push('SECTION-WORDING-STALE');
      }
      for (const m of h.matchAll(/<script[^>]*ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
        if (m[1].trim()) { try { JSON.parse(m[1]); } catch { p.push('BAD-LD'); } }
      }
      const o = (h.match(/<div\b/g) || []).length, c = (h.match(/<\/div>/g) || []).length;
      if (o !== c) p.push(`DIV ${o}/${c}`);
      if (p.length) problems.push(`${rel.padEnd(30)} ${p.join(' ')}`);
    }
  }

  const app = read('js/app.js').src;
  if (/newsInfeedAdHTML\(\)/.test(app)) problems.push('js/app.js still calls newsInfeedAdHTML');
  if (/ad-zone ad-zone--inarticle/.test(app)) problems.push('js/app.js still builds an in-article ad zone');
  if (!/function renderSourceLink/.test(app)) problems.push('js/app.js missing renderSourceLink');
  if (!/renderSourceLink\(article\)/.test(app)) problems.push('js/app.js never calls renderSourceLink');
  if (!/creditText/.test(app)) problems.push('js/app.js missing creditText in renderMeta');
  if (!/NO_SOURCE_LABEL/.test(app)) problems.push('js/app.js renderSourceLink has no missing-source branch');
  if (!/ad-zone ad-zone--rail/.test(app)) problems.push('js/app.js content rail was clobbered (should be untouched)');

  const gen = read('scripts/generate-news.js').src;
  for (const needle of ['sourceUrl', 'source_index', 'const picked =', 'source_url:      article.source_url'])
    if (!gen.includes(needle)) problems.push(`generate-news.js missing: ${needle}`);

  const wf = read('.github/workflows/generate-news.yml').src;
  const active = wf.split('\n').filter(l => !l.trim().startsWith('#')).join('\n');
  if (/-\s*cron:/.test(active)) problems.push('workflow cron is still active');
  if (!/workflow_dispatch:/.test(wf)) problems.push('workflow_dispatch was lost');

  return problems;
}

/* ══ Main ════════════════════════════════════════════════════════════════ */
if (!CHECK_ONLY) {
  patchShells();
  patchDisclosureWording();
  patchAppJs();
  patchGenerator();
  patchWorkflow();
}

if (report.length) console.log(report.join('\n') + '\n');
const problems = verify();
if (problems.length) {
  console.error('VERIFICATION FAILED:\n' + problems.map(p => '  ' + p).join('\n'));
  process.exit(1);
}
console.log(CHECK_ONLY
  ? 'CHECK: news section is fully hardened — no drift.'
  : `Applied. ${changed} file(s) written. Verification passed: 27 shells + app.js + generator + workflow.`);
