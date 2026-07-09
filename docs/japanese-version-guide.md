# Japanese Version Guide — `culture/` HTML Files

## Context

The Korean School website has 16 HTML files in `culture/`:

| File | Topic |
|------|-------|
| `index.html` | K-Culture hub overview |
| `kpop.html` | K-Pop history, agencies, generations, genres, vocab |
| `kdrama.html` | K-Drama history, genres, must-watch list, speech levels |
| `kmovie.html` | Korean cinema history, genres, must-watch films, directors |
| `kfood.html` | K-Food overview, essential dishes, chefs, vocab |
| `kbbq.html` | Korean BBQ — all beef, pork, chicken cuts |
| `kchicken.html` | Korean fried chicken chains and styles |
| `mandu.html` | Korean dumplings — types, brands, vocabulary |
| `ramyeon.html` | Instant noodle guide (50+ products) |
| `kimchi.html` | Kimchi types guide (30+ varieties) |
| `kbeauty.html` | K-Beauty skincare, brands, trends |
| `kfashion.html` | K-Fashion, Seoul Fashion Week, vocabulary |
| `koreanthing.html` | Unique Korean cultural phenomena |
| `kgaming.html` | K-Gaming, PC방, esports |
| `ksports.html` | Korean sports heroes and cheer culture |
| `traditions.html` | Redirect → `koreanthing.html` (skip) |

Every file already loads `../js/lang-ja.js` before `app.js`.

---

## Architecture — How Translation Works

`lang-ja.js` exports a `LangManager` object with a `JA` dictionary. The language toggle button (`id="lang-toggle"`, currently labeled `🇺🇸 EN`) calls `LangManager.setLang('ja')`, which walks the DOM and replaces matched English text nodes with Japanese equivalents.

**Implementation approach: Extend the `JA` dictionary in `../js/lang-ja.js`** with all culture-page English strings. No new HTML files need to be created — every culture page picks up translations automatically via the existing toggle button.

---

## Translation Rules

| Content Type | Action |
|---|---|
| English UI text (nav, buttons, headings) | **Translate to Japanese** |
| English descriptions and captions | **Translate to Japanese** |
| Korean text (ハングル) | **Leave as-is** — it is the learning target |
| `.kr-trans` div content | **Leave as-is** — Korean explanations are the lesson |
| Bilingual labels `"English · 한국어"` | Translate English part only → `"日本語訳 · 한국어"` |
| Korean proper nouns inside English sentences | Keep Korean proper nouns; translate surrounding English |
| Section eyebrows like `"K-CULTURE · 한국 문화"` | → `"K-カルチャー · 한국 문화"` |
| Vocab table — Korean + Romanization columns | **Leave as-is** |
| Vocab table — English meaning column | **Translate to Japanese** |
| Food/cut/brand card tags (e.g. `"Premium"`, `"Classic"`) | **Translate to Japanese** |

---

## What NOT to Translate (strict rules)

1. **Korean text** (Hangul characters) — always keep as-is
2. **`.kr-trans` div content** — Korean-language explanations, kept for learners
3. **Romanizations** in vocab tables (middle column: `nore-bang`, `bu-reu-da`, etc.)
4. **Korean proper nouns** embedded in English sentences — keep as-is (BTS, BLACKPINK, 김치, etc.)
5. **Numbers and statistics** — keep as-is (e.g., `$13.62 billion`, `1,650만`)
6. **Date formats** in timelines — keep as-is (e.g., `1992`, `2003–2011`)
7. **Brand/food names in Korean** — keep (삼겹살, 비빔밥, etc.)
8. **HTML attributes** — never translate `id`, `class`, `href`, `src`, `aria-label`
9. **Emoji** — keep all emoji as-is

---

## Universal Strings — All Culture Pages

Add one entry each to the `JA` dictionary. These appear on every page.

### Header / Navigation
```js
'Korean School': 'コリアンスクール',
'Learn': '学ぶ',
'K-Culture': 'K-カルチャー',
'Travel': '旅行',
'News': 'ニュース',
'Quiz': 'クイズ',
'Search...': '検索...',
```

### Sidebar Links
```js
'CATEGORIES · 카테고리': 'カテゴリー · 카테고리',
'K-Pop History': 'K-Popの歴史',
'Agencies': '芸能事務所',
'Generations': '世代',
'Genres': 'ジャンル',
'Variety Shows': 'バラエティ番組',
'Film & Acting': '映画と演技',
'Vocabulary': '語彙',
'Idol Phrases': 'アイドルフレーズ',
'Fan Slang': 'ファンスラング',
'Fan Chants': 'ファンチャント',
'Drama History': 'ドラマの歴史',
'Drama Genres': 'ドラマジャンル',
'Must-Watch Dramas': '必見ドラマ',
'K-Drama Tropes': 'Kドラマの定番',
'Speech Levels': '敬語レベル',
'Dialogue Practice': '会話練習',
'Fan Culture & Slang': 'ファン文化とスラング',
'Movie History': '映画の歴史',
'Must-Watch Films': '必見映画',
'Directors': '監督',
'Iconic Lines': '名台詞',
'Fan Culture': 'ファン文化',
'K-Food Goes Global': 'K-フードの世界進出',
'Foods That Went Global': '世界を席巻した食べ物',
'K-Food Timeline': 'K-フード年表',
'Essential Dishes': '必須料理',
'World-Famous Chefs': '世界的シェフ',
'Ordering & Dining': '注文と食事',
'Street Food': 'ストリートフード',
'Food Culture & Drinking': '食文化と飲酒',
'Ramyeon Guide': 'ラーメンガイド',
'Mandu Guide': '餃子ガイド',
'Chicken Guide': 'チキンガイド',
'K-BBQ Guide': 'K-BBQガイド',
'Kimchi Guide': 'キムチガイド',
'K-Beauty Goes Global': 'K-ビューティーの世界進出',
'K-Beauty Timeline': 'K-ビューティー年表',
'Iconic Brands': 'アイコニックブランド',
'Beauty Vocabulary': 'ビューティー語彙',
'10-Step Skincare': '10ステップスキンケア',
'Key Ingredients': '主要成分',
'Beauty Trends': 'ビューティートレンド',
'Makeup Philosophy': 'メイク哲学',
'Shopping Phrases': 'ショッピングフレーズ',
'K-Beauty Dialogue': 'K-ビューティー会話',
'K-Fashion Global': 'K-ファッションの世界展開',
'Fashion Icons': 'ファッションアイコン',
'Fashion Timeline': 'ファッション年表',
'Style Aesthetics': 'スタイル美学',
'Idol Fashion': 'アイドルファッション',
'Seoul Fashion Week': 'ソウルファッションウィーク',
'Fashion Vocabulary': 'ファッション語彙',
'Fashion Districts': 'ファッション地区',
'Shopping Dialogue': 'ショッピング会話',
'Rice Obsession': 'お米への執念',
'Youth Protection Laws': '未成年保護法',
'Fast Delivery Culture': '超速配達文化',
'Invasive Species Crisis': '生態系攪乱種問題',
'Table Call Culture': 'テーブルコール文化',
'Public Transport': '公共交通機関',
'Plastic Surgery Culture': '整形文化',
'Outdoor Drinking': '野外飲酒',
'Jeonse Housing': '전세（チョンセ）住宅制度',
'Traditions & Holidays': '伝統と祝日',
'100 Korean Proverbs': '韓国のことわざ100選',
'K-Gaming Stats': 'K-ゲーム統計',
'Gaming Timeline': 'ゲーム年表',
'Gaming Legends': 'ゲームレジェンド',
'Iconic Games': 'アイコニックゲーム',
'Streaming Culture': 'ストリーミング文化',
'PC Bang Culture': 'PCバン文化',
'Esports Leagues': 'eスポーツリーグ',
'Gamer Slang': 'ゲーマースラング',
'Sports Overview': 'スポーツ概要',
'Football Heroes': 'サッカーの英雄たち',
'Baseball Heroes': '野球の英雄たち',
'Marathon Legends': 'マラソンの伝説たち',
'Individual Legends': '個人競技の伝説たち',
'Traditional Sports': '伝統スポーツ',
'Cheer Chants': '応援チャント',
'Overview · 전체 보기': '概要 · 전체 보기',
'DEEP DIVES · 심층 탐구': '深掘り · 심층 탐구',
```

### Footer
```js
'A free Korean language learning platform — combining language study with K-culture, travel guides, and real-world practice. For learners of every level, worldwide.':
  '無料の韓国語学習プラットフォーム — 語学学習とK-カルチャー、旅行ガイド、実践練習を組み合わせています。世界中のあらゆるレベルの学習者のために。',
'Hangul Alphabet': 'ハングル文字',
'Grammar': '文法',
'Travel Guide': '旅行ガイド',
'Korean News': '韓国ニュース',
'About Us': '私たちについて',
'Contact': 'お問い合わせ',
'Privacy Policy': 'プライバシーポリシー',
'Terms of Use': '利用規約',
'Made with ❤️ for Korean learners worldwide.': '世界中の韓国語学習者のために ❤️ を込めて制作',
'Enjoy your learning!': '学習を楽しもう！',
```

---

## CSS Class Reference — Translation Patterns

These classes appear across culture pages and require special handling because inline elements (`<b>`, `<strong>`, `<span>`) split the parent element into multiple text nodes. Each fragment needs its own JA entry.

### `.agency-ceo`

Bio text after `<strong>Name</strong>`. The text node starts with an em-dash + space — **the key must include the leading `— ` prefix** (U+2014 em dash, not a hyphen):

```js
// HTML: <strong>이수만 (Lee Soo-man)</strong> — Dubbed the "Father of K-Pop."...
// text node (after trim): "— Dubbed the \"Father of K-Pop.\" ..."
'— Dubbed the "Father of K-Pop." A former pop singer turned music producer...': '「K-Popの父」と称される。...',
```

❌ Wrong (missing `— ` prefix): `'Dubbed the "Father of K-Pop."...'`  
✅ Correct: `'— Dubbed the "Father of K-Pop."...'`

### `.film-works`

Filmography line with `<strong>Films:</strong>` and `<strong>Dramas:</strong>` labels splitting content into 4 text nodes. Translate all 4:

```js
'Films:': '映画：',                        // inside <strong>
'Broker (브로커, Cannes 2022), Dream (드림, 2023) ·': '...',  // text after Films </strong>
'Dramas:': 'ドラマ：',                      // inside <strong>
'My Mister, Hotel Del Luna, Moon Lovers': '나의 아저씨、ホテルデルーナ、달의 연인',
```

### `.lang-box-phrase`

Practice phrase boxes with `<b>Korean</b>` splitting the div into 3 text nodes. Translate the English fragments:

```js
// HTML: 💬 Try it: <b>노래방 가고 싶어요!</b> (romanization) = "English" &nbsp;|&nbsp; <b>Korean</b> = "English"
// 3 text nodes:
'💬 Try it:': '💬 試してみよう：',
'(no-re-bang ga-go si-peo-yo!) = "I want to go to norebang!" |': '（ノレバン…）＝「ノレバンに行きたい！」 |',
'= "Let\'s sing a song!"': '＝「一緒に歌いましょう！」',
```

Pattern variants: `💬 Try it:` / `💬 Practice:` / `💬 Sentence:` / `💬 Fan phrase:` — each is a unique key.

Note on `&nbsp;|&nbsp;` between `<b>` tags: after `.trim().replace(/\s+/g,' ')`, the middle text node ends with ` |` (space pipe, no trailing space). Include the `|` in the key.

### `.grammar-meaning`

Grammar explanation divs often start with `<span class="speech-badge">` (creates one text node) or contain `<b>` examples. Multiple fragments per element:

```js
// speech-badge span content:
'Polite': '丁寧体',
'Formal': 'フォーマル',
'Casual': 'カジュアル',

// text node after </span>:
'Volitional "I will ~" — idols use this to make promises to fans. e.g.,': '意志を表す「〜します」...',
// text node after </b> (the example translation):
'= I will work hard': '= 一生懸命頑張ります',
```

### `.phrase-context`

Context notes inside `.phrase-card` divs. Many start with `💡 ` then contain a `<strong>` Korean word:

```js
// HTML: 💡 Said at concerts and fan meetings. Casual form: <strong>사랑해</strong> (same meaning, used on V-Lives)
// 2 text nodes to translate:
'💡 Said at concerts and fan meetings. Casual form:': '💡 コンサートやファンミーティングで言われます。カジュアル：',
'(same meaning, used on V-Lives)': '（同じ意味、V-Liveで使用）',

// HTML: 💡 <strong>덕분에</strong> = "thanks to / because of" — a key gratitude expression in Korean
// The first text node "💡 " trims to "💡" — just an emoji, skip it. Translate the second:
'= "thanks to / because of" — a key gratitude expression in Korean': '= 「〜のおかげで」— 韓国語の重要な感謝表現',
```

### `.phrase-breakdown`

Grammar breakdown divs use `<b>Korean</b> (English meaning)` repeatedly. Every `(meaning) +` fragment is a separate text node:

```js
// HTML: <b>사랑</b> (love) + <b>해요</b> (do, polite present) → literally "do love"
// text nodes to translate (Korean inside <b> is skipped):
'(love) +': '（愛）+',
'(do, polite present) → literally "do love"': '（します、丁寧現在形）→ 直訳：「愛します」',

// Last item has no + suffix:
'(love)': '（愛）',
'(am happy)': '（幸せです）',
'(happy)': '（幸せ）',   // ← different from (am happy)!
```

Common phrase-breakdown fragments (already in JA dict — do not re-add):

| Key | Japanese |
|---|---|
| `(love) +` | `（愛）+` |
| `(everyone) +` | `（みんな）+` |
| `(thanks to) +` | `（のおかげで）+` |
| `(am happy)` | `（幸せです）` |
| `(happy)` | `（幸せ）` |
| `(always) +` | `（いつも）+` |
| `(together) +` | `（一緒に）+` |
| `(our) +` | `（私たちの）+` |
| `(fans, plural) +` | `（ファンたち）+` |
| `(well) +` | `（よく）+` |
| `(I also) +` | `（私も）+` |
| `(love)` | `（愛）` |

### `.chant-line-rom`

Romanization lines inside fan chant cards. **Leave pure romanization as-is. Only translate lines that contain English notes in parentheses:**

```js
// Translate these (English notes):
'"…from before the universe was born…" (DNA lyrics)': '「…宇宙が生まれる前から…」（DNA 가사）',
'Bang-tan-so-nyeon-dan! (full group name)': 'Bang-tan-so-nyeon-dan!（グループ正式名）',
'(hook from the song)': '（曲のフック）',

// Leave these as-is (pure romanization):
// 'Jin! Syu-ga! Je-i-hop! Ar-em! Ji-min! Bwi! Jeong-guk!' ← do NOT add
// 'Beullaek-ping-keu!' ← do NOT add
```

### `.eng-cell` (예문 / Example column)

The third column in vocab tables has text nodes combining a Korean sentence with an English parenthetical translation. Translate the complete text node, replacing the English in parens with Japanese:

```js
// HTML: <td class="eng-cell" style="...">그 아이돌 정말 잘 춰요. (That idol dances really well.)</td>
// key = the ENTIRE text node (Korean + English in parens):
'그 아이돌 정말 잘 춰요. (That idol dances really well.)': '그 아이돌 정말 잘 춰요。（そのアイドルは本当にダンスが上手です。）',
```

Note: The translation column (`eng-cell` without style attribute) uses `<span class="kor-trans">Korean</span>English meaning` — the `kor-trans` span is Korean (skip it); the text node after it is the English meaning that needs translation.

### `.tip-text` (with `<strong>` inside)

Most `.tip-text` divs are single text nodes and translate normally. If a `<strong>` element is inside, it splits into fragments:

```js
// HTML: <div class="tip-text">...vocabulary — words like <strong>사랑 (love)</strong>, <strong>꿈 (dream)</strong>, and <strong>함께 (together)</strong> appear constantly...</div>
// Translate the <strong> fragment text nodes:
'사랑 (love)': '사랑（愛）',
'꿈 (dream)': '꿈（夢）',
'함께 (together)': '함께（一緒に）',
', and': '、そして',
```

### Note: `kr-trans-text` does not exist

There is no CSS class named `kr-trans-text` in the culture pages. Do not look for it. Related classes:
- `.kr-trans` — Korean-language explanation divs; **leave content as-is** (these are the Korean lessons, not UI text)
- `.kor-trans` — Korean spans inside `.eng-cell` vocab cells; **leave as-is** (Korean text)

---

## Per-Page Content — English Strings to Translate

### `index.html` — K-Culture Hub

**Hero**
```js
'Korean Culture Hub': '韓国文化ハブ',
'From K-Pop idols to spicy street food — explore the culture that\'s captivating the world and learn the Korean language through it.':
  'K-Popアイドルからスパイシーな屋台グルメまで — 世界を虜にするその文化を探り、韓国語を学びましょう。',
'Culture Topics': '文化トピック',
'Deep-dive Guides': '深掘りガイド',
'Countries Reached': '到達国数',
'Korean Wave': '韓流',
```

**Category grid**
```js
'EXPLORE · 탐색하기': '探索する · 탐색하기',
'All K-Culture Topics': 'K-カルチャーのすべてのトピック',
'Pick a topic and dive deep — each guide covers history, vocabulary, dialogues, and cultural context to help you learn real Korean.':
  'トピックを選んで深く掘り下げましょう — 各ガイドは歴史、語彙、会話、文化的背景を網羅し、本物の韓国語学習をサポートします。',
'Music · 음악': '音楽 · 음악',
'History, idols, agencies, generations, fan chants, slang, and vocabulary — learn Korean through the music the world loves.':
  '歴史、アイドル、芸能事務所、世代、ファンチャント、スラング、語彙 — 世界が愛する音楽で韓国語を学ぼう。',
'Television · 드라마': 'テレビ · 드라마',
'Drama history, genres, must-watch titles, speech levels, dialogue practice, and the fan culture behind Korea\'s biggest TV export.':
  'ドラマの歴史、ジャンル、必見作品、敬語レベル、会話練習、そして韓国最大のテレビ輸出品の裏にあるファン文化。',
'Cinema · 영화': '映画 · 영화',
'From Parasite to Train to Busan — discover Korean cinema\'s directors, iconic films, genres, and the vocabulary to talk about them.':
  '「기생충」から「부산行」まで — 韓国映画の監督、名作、ジャンル、そしてそれらを語るための語彙を学ぼう。',
'Food · 음식': '料理 · 음식',
'Essential dishes, world-famous chefs, ordering phrases, street food, and 5 deep-dive guides: 라면, 만두, 치킨, K-BBQ, 김치.':
  '必須料理、世界的シェフ、注文フレーズ、屋台グルメ、そして5つの深掘りガイド：ラーメン、餃子、チキン、K-BBQ、キムチ。',
'Beauty · 뷰티': '美容 · 뷰티',
'The 10-step skincare routine, iconic brands, key ingredients, beauty trends, 피부과 culture, and shopping phrases.':
  '10ステップのスキンケアルーティン、アイコニックブランド、主要成分、ビューティートレンド、피부과（皮膚科）文化、ショッピングフレーズ。',
'Fashion · 패션': 'ファッション · 패션',
'Idol fashion, street-style aesthetics, Seoul Fashion Week, iconic brands, fashion districts, 한복, and shopping vocabulary.':
  'アイドルファッション、ストリートスタイル美学、ソウルファッションウィーク、アイコニックブランド、ファッション地区、한복、ショッピング語彙。',
'Culture · 한국 문화': '文化 · 한국 문화',
'밥 obsession, 빠른 배달, 찜질방, MBTI fever, 군대 culture, 전세, outdoor drinking, and 100 essential Korean proverbs.':
  '밥（ご飯）へのこだわり、빠른 배달（超速配達）、찜질방（汗蒸幕）、MBTIブーム、軍隊文化、전세（チョンセ）、野外飲酒、そして韓国のことわざ100選。',
'Gaming · 게임': 'ゲーム · 게임',
'PC방 culture, esports legends, iconic games, streaming culture, esports leagues, gamer slang, and gaming vocabulary.':
  'PCバン文化、eスポーツの伝説、名作ゲーム、ストリーミング文化、eスポーツリーグ、ゲーマースラング、ゲーム語彙。',
'Sports · 스포츠': 'スポーツ · 스포츠',
'Football and baseball heroes, marathon legends, traditional sports like taekwondo and ssireum, cheer chants, and vocabulary.':
  'サッカーと野球の英雄、マラソンの伝説、テコンドーやシルムなどの伝統スポーツ、応援チャント、語彙。',
```

---

### `kpop.html` — K-Pop

**Page header**
```js
'K-CULTURE · 한국 문화': 'K-カルチャー · 한국 문화',
'From BTS to BLACKPINK — learn the language of K-Pop: fan chants, idol phrases, and the slang that unites the global fandom.':
  'BTSからBLACKPINKまで — K-Popの言語を学ぼう：ファンチャント、アイドルフレーズ、グローバルなファンダムをつなぐスラング。',
```

**History section**
```js
'📜 K-Pop History · K-팝 역사': '📜 K-Popの歴史 · K-팝 역사',
'The Korean Karaoke Room': '韓国式カラオケルーム',
'Norebang & K-Pop': 'ノレバンとK-Pop',
'How to Norebang': 'ノレバンの楽しみ方',
// photo-caption-text — translate all English paragraph text inside .photo-caption-text
// K-Pop is not just music — it is a cultural industry built over three decades...
// (full paragraph text as exact DOM text node)
```

**Norebang vocabulary box**
```js
'📚 노래방 핵심 어휘 — Norebang Vocabulary': '📚 노래방 핵심 어휘 — ノレバン語彙',
'Song room / karaoke room': '歌部屋／カラオケルーム',
'Song': '歌',
'To sing (a song)': '（歌を）歌う',
'Beat / rhythm': 'ビート／リズム',
'Score / points': 'スコア／点数',
'Song lyrics': '歌詞',
```

**Comparison table (American Pop vs J-Pop vs K-Pop)**
```js
'Category': 'カテゴリ',
'🇺🇸 American Pop': '🇺🇸 アメリカンポップ',
'Artist focus': 'アーティスト重点',
'Individual singer / solo artists': '個人歌手 / ソロアーティスト',
'Groups & solo artists': 'グループ＆ソロアーティスト',
'Highly trained idol groups': '高度に訓練されたアイドルグループ',
'Training system': 'トレーニングシステム',
'Record deal after audition': 'オーディション後のレコード契約',
'Agency training, 1–3 yrs': '事務所訓練、1〜3年',
'Trainee system, 3–7+ yrs': 'トレーニー制度、3〜7年以上',
'Dance style': 'ダンススタイル',
'Varies; less choreography emphasis': '様々；振り付けの強調は少ない',
'Synchronized, cute': 'シンクロ、かわいい',
'Precision synchronized, high energy': '精密なシンクロ、高エネルギー',
'Visual concept': 'ビジュアルコンセプト',
'Artist-driven style': 'アーティスト主導のスタイル',
'Kawaii / theatrical': 'かわいい / 演劇的',
'Agency-defined concept per album era': '事務所定義のアルバムごとのコンセプト',
'Fan engagement': 'ファンエンゲージメント',
'Concert, streaming, social': 'コンサート、ストリーミング、SNS',
'Handshake events, CDs': '握手会、CD',
'Fan signs, Weverse, lightsticks, albums with photocards': 'ファンサイン、Weverse、ペンライト、フォトカード付きアルバム',
'Language reach': '言語の到達範囲',
'Globally dominant English': 'グローバルに支配的な英語',
'Mainly Japanese market': '主に日本市場',
'Korean + English; global streaming dominance': '韓国語＋英語；グローバルストリーミング支配',
'Content engine': 'コンテンツエンジン',
'Radio, Spotify, award shows': 'ラジオ、Spotify、アワードショー',
'Oricon charts, anime tie-ins': 'オリコンチャート、アニメタイアップ',
'YouTube MVs, TikTok, Weverse, Vlive, reality shows': 'YouTube MV、TikTok、Weverse、Vlive、リアリティ番組',
'Key influence on K-Pop': 'K-Popへの主な影響',
'Song structure, R&B, hip-hop': '曲構成、R&B、ヒップホップ',
'Idol group format, fan culture': 'アイドルグループ形式、ファン文化',
```

**History Timeline**
```js
'🏆 K-Pop History Timeline · 역사 타임라인': '🏆 K-Pop歴史年表 · 역사 타임라인',
'노래방 arrives in Korea': 'ノレバンが韓国に登場',
'The first 노래방 (song room / karaoke room) opens in Busan, adapted from Japan\'s karaoke concept. Within a decade, norebang becomes one of Korea\'s most popular social activities, nurturing a nation of music enthusiasts.':
  '初の노래방（ノレバン/歌部屋）が日本のカラオケ文化を取り入れ、釜山でオープンしました。10年のうちに、ノレバンは韓国で最も人気の社交活動の一つとなり、音楽を愛する国の土台を作りました。',
// Continue for all timeline items...
'1992 ⭐ Milestone': '1992 ⭐ マイルストーン',
'Birth of Modern K-Pop': '現代K-Popの誕生',
'1st Generation Idols': '第1世代アイドル',
'2nd Generation Global Push': '第2世代グローバル展開',
'PSY — 강남스타일 · Global Viral Phenomenon': 'PSY — 강남스타일 · グローバルバイラル現象',
'BTS at the United Nations · 유엔 연설': 'BTSの国連演説 · 유엔 연설',
'BTS "Dynamite" #1 on Billboard Hot 100': 'BTS「Dynamite」ビルボードホット100首位',
'BTS Grammy Nomination + BLACKPINK\'s Record': 'BTSグラミーノミネート＋BLACKPINKの記録',
'4th Generation — New Generation Dominates': '第4世代 — 新世代が席巻',
```

**Entertainment Agencies**
```js
'🏢 Entertainment Agencies · 연예기획사': '🏢 芸能事務所 · 연예기획사',
'Behind every K-Pop group is an entertainment company that trains, produces, and manages them. These agencies define each group\'s concept, sound, and visual identity — and their CEOs are powerful cultural figures in their own right.':
  'すべてのK-Popグループの背後には、彼らをトレーニングし、プロデュースし、マネジメントする芸能事務所があります。これらの事務所が各グループのコンセプト、サウンド、ビジュアルアイデンティティを決定します。',
'Representative Artists': '代表アーティスト',
'Founded 1995 by Lee Soo-man · "The Big 3"': '1995年 イ・スマン設立 · 「ビッグ3」',
'Founded 1996 by Yang Hyun-suk · "The Big 3"': '1996年 ヤン・ヒョンソク設立 · 「ビッグ3」',
'Founded 1997 by Park Jin-young · "The Big 3"': '1997年 パク・ジニョン設立 · 「ビッグ3」',
'Founded 2005 by Bang Si-hyuk · "The Big 4"': '2005年 パン・シヒョク設立 · 「ビッグ4」',
'Founded 2009 (relaunched) · Mid-tier powerhouse': '2009年（再スタート） · 中堅有力事務所',
'Founded 2008 by Hong Seung-sung · Former VP of JYP': '2008年 ホン・スンソン設立 · 元JYP副社長',
// All agency-desc, agency-ceo text paragraphs
'빅3 → 빅4 — The Big 3 Became the Big 4': '빅3 → 빅4 — ビッグ3がビッグ4に',
'SM, YG, and JYP were long known as the "빅3" (Big 3) of K-Pop...':
  'SM、YG、JYPは長らくK-Popの「빅3（ビッグ3）」として知られていました...',
```

**Agency Vocabulary Box**
```js
'📚 연예기획사 핵심 어휘 — Agency Vocabulary': '📚 연예기획사 핵심 어휘 — 事務所語彙',
'Entertainment agency / company': '芸能事務所 / 会社',
'Trainee': 'トレーニー',
'Contract': '契約',
'Affiliated with / belonging to': '所属する',
'Representative / CEO': '代表 / CEO',
'Training': 'トレーニング',
```

**Generations**
```js
'⭐ K-Pop Idol Generations · 세대별 아이돌': '⭐ K-Popアイドルの世代 · 세대별 아이돌',
'K-Pop fans and historians divide idol groups into generations based on debut year, musical style, and cultural impact. Each generation built on the last — and the 4th generation is currently rewriting the rulebook again.':
  'K-Popファンや研究者は、デビュー年、音楽スタイル、文化的影響力によってアイドルグループを世代に分けています。各世代はその前の世代の上に構築され、現在4世代がふたたびルールブックを書き換えています。',
'1st Generation · 1세대': '第1世代 · 1세대',
'The Pioneers': '先駆者たち',
'Defined by the shift from trot/ballad to Western-influenced pop and hip-hop...':
  'トロット/バラードから西洋的なポップとヒップホップへのシフトを特徴とします...',
'2nd Generation · 2세대': '第2世代 · 2세대',
'The Hallyu Wave': '韓流の波',
'3rd Generation · 3세대': '第3世代 · 3세대',
'The Global Breakthrough': 'グローバルブレイクスルー',
'4th Generation · 4세대': '第4世代 · 4세대',
'The New Wave': 'ニューウェーブ',
// All gen-desc text paragraphs per generation card
```

> **Note on kpop.html remaining sections** (Genres, Variety Shows, Film & Acting, Vocabulary, Idol Phrases, Fan Slang, Fan Chants): follow the same pattern — translate every English `culture-sub-heading`, paragraph text, tip/lang-box content, vocab table English column, and dialogue practice lines.

---

### `kdrama.html` — K-Drama

**Page header**
```js
'🎬 K-Drama 한국 드라마': '🎬 K-ドラマ 한국 드라마',
'From Squid Game to Crash Landing on You — K-Dramas have captivated global streaming audiences and built one of the most passionate fandoms on Earth. Learn the language, history, genres, and fan culture behind Korean television\'s remarkable global rise.':
  '「イカゲーム」から「愛の不時着」まで — K-ドラマは世界中のストリーミング視聴者を魅了し、地球上で最も熱狂的なファンダムの一つを生み出しました。韓国テレビの驚くべきグローバルな台頭の裏にある言語、歴史、ジャンル、ファン文化を学びましょう。',
```

**History**
```js
'📺 K-Drama History · 드라마 역사': '📺 K-ドラマの歴史 · 드라마 역사',
'The Golden Age of Korean Broadcast': '韓国放送の黄金期',
'Winter Sonata & the Hallyu Wave': '冬のソナタと韓流ブーム',
'Squid Game Goes Global': 'イカゲームが世界へ',
'🏆 K-Drama History Timeline · 역사 타임라인': '🏆 K-ドラマ歴史年表 · 역사 타임라인',
// All timeline-title and timeline-desc text
'KBS Founded — Korean TV Begins': 'KBS設立 — 韓国テレビの始まり',
'Daily Dramas & Family Serials Dominate': '日常ドラマと家族連続劇の時代',
'질투 — The First Modern Romance Drama': '질투 — 最初の現代ロマンスドラマ',
'Hallyu Drama Wave Begins in Asia': 'アジアで韓流ドラマブームが始まる',
'겨울연가 — Korea Wins Hearts in Japan': '겨울연가 — 日本の心を掴んだ韓国ドラマ',
'Historical Dramas Dominate — Daejanggeum Era': '時代劇全盛期 — 대장금の時代',
'별에서 온 그대 — China Boom': '별에서 온 그대 — 中国ブーム',
'Netflix Era — 사랑의 불시착 & 이태원 클라쓰': 'ネットフリックス時代 — 사랑의 불시착 & 이태원 클라쓰',
'오징어 게임 — History Is Made': 'オカゲーム — 歴史が刻まれた',
'The Global K-Drama Era': 'グローバルK-ドラマ時代',
```

**Production section**
```js
'🎬 How K-Dramas Are Made · 드라마 제작 방식': '🎬 K-ドラマはどう作られるか · 드라마 제작 방식',
'The Live-Shoot System 생방송 제작': 'リアルタイム撮影システム 생방송 제작',
'Drama OSTs — Music That Sells Emotion': 'ドラマOST — 感情を売る音楽',
'Webtoon Adaptations — Comics to Screen': 'ウェブトゥーン原作 — 漫画から映像へ',
'🌍 K-Drama vs American TV vs J-Drama': '🌍 K-ドラマ vs アメリカドラマ vs 日ドラ',
'Episodes per season': '1シーズンのエピソード数',
'Production style': '制作スタイル',
'Seasons / Continuity': 'シーズン数 / 継続性',
'Romance pacing': 'ロマンスの展開ペース',
'OST / Music role': 'OST / 音楽の役割',
'Platform': '放映プラットフォーム',
'Fan influence on plot': 'ファンのストーリーへの影響',
```

**Genres**
```js
'🎭 Drama Genres · 드라마 장르': '🎭 ドラマジャンル · 드라마 장르',
'Romance': 'ロマンス',
'Historical / Sageuk': '時代劇 / 사극',
'Thriller / Mystery': 'スリラー / ミステリー',
'Fantasy': 'ファンタジー',
'Medical Drama': '医療ドラマ',
'Legal / Crime Drama': '法廷 / 犯罪ドラマ',
'Family Drama': '家族ドラマ',
'Youth / Coming-of-Age': '青春 / 成長ドラマ',
// All genre-desc paragraphs
'The backbone of K-Drama. Slow-burn attraction, misunderstandings, and an emotionally satisfying confession are the formula.':
  'K-ドラマの根幹。じわじわと燃え上がる引き合い、すれ違い、そして感動的な告白がお決まりの公式です。',
// Continue for each genre...
```

**Must-Watch list**
```js
'🎭 Must-Watch K-Dramas · 필수 드라마': '🎭 必見K-ドラマ · 필수 드라마',
'These dramas defined K-Drama history, broke viewership records, or represent the best entry points for Korean learners. Each one teaches different vocabulary, speech styles, and cultural context.':
  'これらのドラマはK-ドラマの歴史を定義し、視聴率記録を塗り替え、または韓国語学習者にとって最良の入り口を提供します。それぞれ異なる語彙、話し方、文化的背景を教えてくれます。',
// All drama-desc text for each of the 12 dramas
// drama tag labels:
'Romance': 'ロマンス',
'Netflix': 'ネットフリックス',
'Best for Learners': '学習者におすすめ',
'Thriller': 'スリラー',
'Colloquial Korean': '口語韓国語',
'Classic': 'クラシック',
'Family': '家族',
'Melodrama': 'メロドラマ',
'Crime': '犯罪',
'Legal': '法廷',
'Medical': '医療',
'Historical': '時代劇',
```

**Tropes**
```js
'🎯 K-Drama Tropes & Clichés · 드라마 클리셰': '🎯 K-ドラマの定番とクリシェ · 드라마 클리셰',
'Chaebol Male Lead': '재벌（チェボル）男主人公',
'Birth Secret': '出生の秘密',
'Amnesia': '記憶喪失',
'Umbrella Scene': '傘のシーン',
// Plus more tropes — translate gen-name English and gen-desc paragraphs
```

> Continue this pattern for Speech Levels, Vocabulary, Dialogue Practice, Fan Culture & Slang sections.

---

### `kmovie.html` — K-Movie

**Page header**
```js
'🎬 K-Movie 한국 영화': '🎬 K-映画 한국 영화',
'From intimate art-house dramas to genre-bending thrillers, Korean cinema has earned a cherished place in world film culture. Bong Joon Ho\'s historic victories at Cannes and the Academy Awards with Parasite showed that Korean stories resonate deeply with audiences everywhere. Explore the history, genres, directors, and language behind one of the world\'s most celebrated film traditions.':
  '親密な芸術映画からジャンルを超えたスリラーまで、韓国映画は世界映画文化に大切な地位を確立しました。봉준호監督の「기생충」によるカンヌとアカデミー賞での歴史的勝利は、韓国の物語が世界中の観客に深く響くことを示しました。',
```

**History + Timeline**
```js
'📽️ Korean Cinema History · 한국 영화 역사': '📽️ 韓国映画の歴史 · 한국 영화 역사',
'The Birth of Korean Cinema': '韓国映画の誕生',
'Korean New Wave — Genre Breakthrough': '韓国ニューウェーブ — ジャンルの突破口',
'Parasite — Historic Night at the Oscars': '「기생충」— アカデミー賞の歴史的な夜',
'🏆 K-Movie History Timeline · 역사 타임라인': '🏆 韓国映画歴史年表 · 역사 타임라인',
// All timeline entries for 1919 through 2024
'의리적 구투 — Korea\'s First Film': '의리적 구투 — 韓国初の映画',
'The Golden Age of Melodrama': 'メロドラマの黄金期',
'씨받이 — First International Recognition': '씨받이 — 初の国際的認知',
'서편제 — Korea\'s First Million-Audience Film': '서편제 — 韓国初の百万観客映画',
'쉬리 — Korea\'s First Blockbuster': '쉬리 — 韓国初のブロックバスター',
'살인의 추억 & 올드보이 — Korean New Wave Peak': '살인의 추억 & 올드보이 — 韓国ニューウェーブの頂点',
'괴물 — Genre Milestone': '괴물 — ジャンルのマイルストーン',
'부산행 & 곡성 — Horror Finds a Global Audience': '부산행 & 곡성 — ホラーが世界的観客を獲得',
'기생충 — Palme d\'Or & Best Picture Oscar': '기생충 — カンヌ最高賞とアカデミー作品賞',
'파묘 — Cultural Phenomenon': '파묘 — 文化的現象',
```

**Production + Comparison**
```js
'🎬 How K-Movies Are Made · 제작 방식': '🎬 K-映画はどう作られるか · 제작 방식',
'Director-Driven Cinema · 감독 중심 영화': '監督主導の映画 · 감독 중심 영화',
'Investment & Distribution System · 투자·배급': '投資・配給システム · 투자·배급',
'Film Culture & Shooting Locations · 촬영 문화': '映画文化と撮影地 · 촬영 문화',
'🌍 K-Movie vs Hollywood vs French Cinema': '🌍 K-映画 vs ハリウッド vs フランス映画',
'Creative control': 'クリエイティブコントロール',
'Dominant genres': '主要ジャンル',
'Endings': 'エンディング',
'Social commentary': '社会批評',
'Average runtime': '平均上映時間',
'Box office driver': '興行を牽引する要素',
'Festival presence': '映画祭への参加',
'Director-driven': '監督主導',
'Studio / producer-driven': 'スタジオ / プロデューサー主導',
'Director-driven (auteur)': '監督主導（作家主義）',
'Thriller, melodrama, horror': 'スリラー、メロドラマ、ホラー',
'Action, superhero, comedy': 'アクション、スーパーヒーロー、コメディ',
'Drama, romance, art-house': 'ドラマ、ロマンス、アート系',
'Often bittersweet or tragic': '多くの場合、苦くも甘い、または悲劇的',
'Often happy / resolved': '多くの場合、ハッピーエンド / 解決',
'Often ambiguous': '多くの場合、曖昧',
'Very prominent': '非常に目立つ',
'Moderate (wrapped in genre)': '適度（ジャンルに包まれて）',
'Prominent (often political)': '目立つ（しばしば政治的）',
'Word-of-mouth': '口コミ',
'Marketing budget': 'マーケティング予算',
'Critical acclaim': '批評家の絶賛',
'Cannes, Venice, Berlin, BIFF': 'カンヌ、ヴェネチア、ベルリン、BIFF',
'Sundance, TIFF': 'サンダンス、TIFF',
'Cannes (home territory)': 'カンヌ（ホームフィールド）',
```

**Genres + Films + Directors + Iconic Lines + Fan Culture**

Follow the same pattern: translate every section heading, genre card description, film description, director bio, and vocab table English column.

---

### `kfood.html` — K-Food

**Global section**
```js
'🌍 K-Food Goes Global · 한국 음식의 세계화': '🌍 K-フードの世界進出 · 한국 음식의 세계화',
'Ramyeon: $1.52B Exported in 2025': 'ラーメン：2025年輸出額15億2千万ドル',
'Bibigo Mandu: 50+ Countries': 'ビビゴ餃子：50カ国以上',
'Korean Fried Chicken: 56 Countries': '韓国フライドチキン：56カ国',
```

**Foods That Conquered the World**
```js
'🔥 Foods That Conquered the World · 세계를 정복한 한국 음식': '🔥 世界を征服した韓国料理 · 세계를 정복한 한국 음식',
'Ramyeon / Korean Instant Noodles': 'ラーメン / 韓国インスタント麺',
'Mandu / Korean Dumplings': '餃子 / 韓国餃子',
'Korean Fried Chicken': '韓国フライドチキン',
'Sesame Oil · Perilla Oil': 'ごま油・エゴマ油',
'Premium Cold-Pressed Artisan Export — Global Gourmet Discovery': 'プレミアム低温圧搾職人輸出品 — 世界的グルメの発見',
'Korean Seasoned Chicken Breast': '韓国風味付けサラダチキン',
// All food-spotlight-desc paragraphs for each of the 5 foods
```

**Timeline**
```js
'📅 K-Food History Timeline · 한국 음식 역사': '📅 K-フード歴史年表 · 한국 음식 역사',
'삼양라면 · Korea\'s First Instant Ramen': '삼양라면 · 韓国初のインスタントラーメン',
'LA Koreatown BBQ · 미국 내 한국 음식 문화': 'LAコリアタウンBBQ · 미국 내 한국 음식 문화',
'Seoul Olympics · 서울 올림픽 — 한국 음식 첫 세계 무대': 'ソウル五輪 · 서울 올림픽 — 韓国料理の初の世界舞台',
'대장금 — Jewel in the Palace': '대장금 — 宮廷女官チャングムの誓い',
'Danji NYC — World\'s First Michelin Korean Restaurant': 'ダンジNYC — 世界初のミシュラン韓国レストラン',
'불닭볶음면 Fire Noodle Challenge': '불닭볶음면 ファイアーヌードルチャレンジ',
'Parasite\'s 짜파구리 (Ram-Don)': '「기생충」の짜파구리（ラムドン）',
'달고나 Candy Challenge · 오징어 게임 음식 현상': '달고나 キャンディチャレンジ · 오징어 게임 음식 현상',
'K-Food Export Record: $13.62 Billion': 'K-フード輸出記録：136億2千万ドル',
```

**Comparison table (Korean vs Japanese vs Chinese Food Culture)**
```js
'🌏 Korean vs Japanese vs Chinese Food Culture': '🌏 韓国・日本・中国の食文化比較',
'Spice Level': '辛さレベル',
'High — gochujang, kimchi, buldak': '高い — コチュジャン、キムチ、불닭',
'Low — umami-focused, subtle': '低い — うま味重視、繊細',
'Varies widely — mild to very spicy by region': '地域により様々 — 温和から激辛まで',
'Fermentation': '発酵',
'Central — kimchi, doenjang, ganjang are daily staples': '中心的 — キムチ、된장、간장が毎日の主食',
'Present — miso, soy, pickles': '存在する — 味噌、醤油、漬物',
'Present but less prominent in everyday eating': '存在するが日常食では目立たない',
'Dining Style': '食事スタイル',
'Communal — all dishes shared simultaneously; 반찬 always free-refillable': '共同 — 全料理を同時にシェア；반찬は常に無料おかわり可',
'Individual — each person gets their own set of dishes': '個人 — 各自に料理セット',
'Communal — lazy Susan, shared dishes at table': '共同 — 回転テーブル、テーブルでのシェア',
'BBQ Culture': 'BBQ文化',
'Central social event — cook together at the table': '中心的な社交イベント — テーブルで一緒に調理',
'Yakitori / yakiniku — specialty experience': '焼き鳥 / 焼き肉 — 専門的な体験',
'Regional (Xinjiang, Sichuan) — less universal': '地域的（新疆、四川） — より普遍的でない',
'Global Export 2025': '2025年グローバル輸出',
'Fastest growing — $13.62B record, 10th consecutive year': '最速成長 — 136億2千万ドル記録、10年連続',
'Mature — ramen, sushi globally established': '成熟 — ラーメン、寿司はグローバルに確立',
'Most widespread — oldest global presence': '最も普及 — 最古のグローバルプレゼンス',
'Trending Now': '現在のトレンド',
'Signature Oils': '代表的なオイル',
```

**Essential Dishes — genre-card descriptions**

For each of the ~15 dishes (김치, 비빔밥, 삼겹살, 떡볶이, 삼계탕, 냉면, 김치찌개, 파전, 돼지국밥, 짜장면, 짬뽕, 마라탕, 홍어, 산낙지, 선지), translate:
- `genre-name` English subtitle (e.g., `Kimchi` → `キムチ`)
- `genre-desc` paragraph

Example:
```js
'Korea\'s most iconic food — fermented napa cabbage seasoned with gochugaru, garlic, ginger, and jeotgal. 김치 is on every Korean table at every meal. UNESCO recognized kimchi-making (김장 문화) as Intangible Cultural Heritage in 2013. Over 200 types of kimchi exist across Korea\'s regions.':
  '韓国最も象徴的な食べ物 — コチュカル、ニンニク、ショウガ、ジョッカルで味付けした発酵ナバカ白菜。김치は韓国のすべての食卓に毎食のぼります。ユネスコは2013年にキムチ作り（김장 문화）を無形文化遺産に登録しました。',
```

> Continue same pattern for World-Famous Chefs, Food Vocabulary, Ordering & Dining, Street Food, Food Culture & Drinking.

---

### `kbbq.html` — Korean BBQ

**Hero + Tip boxes**
```js
'Korean BBQ (고기구이) is one of Korea\'s greatest cultural exports — a communal, interactive meal cooked at the table over charcoal (숯불) or gas (가스). Every animal offers multiple distinct cuts, each with its own name, flavor, fat content, and preferred cooking technique. This is your complete guide.':
  '韓国バーベキュー（고기구이）は韓国最大の文化輸出品の一つ — 炭火（숯불）またはガス（가스）の上でテーブルで調理する、共同でインタラクティブな食事です。',
'Charcoal grill (best)': '炭火グリル（最高）',
'Side dishes (free refill)': 'おかず（無料おかわり）',
'Lettuce wrap style': '野菜巻きスタイル',
'Traditional pairing': '伝統的なペアリング',
'쌈 (Ssam) — The Korean BBQ Wrap': '쌈（サム）— 韓国BBQの包み方',
// tip-text full paragraph
```

**Section headers**
```js
'소고기 Beef Cuts': '소고기 牛肉の部位',
'돼지고기 Pork Cuts': '돼지고기 豚肉の部位',
'닭고기 Chicken Cuts': '닭고기 鶏肉の部位',
'오리고기 Duck Cuts': '오리고기 鴨肉の部位',
```

**For each of the 30+ food cards**, translate:
- `food-card-meta` (e.g., `'Beef · Chuck Flap Tail · Premium'` → `'牛肉 · チャックフラップテール · プレミアム'`)
- `food-card-desc` paragraph
- `food-tag` labels

Common tags across all BBQ cards:
```js
'Top Premium': 'トッププレミアム',
'Heavy Marbling': '濃厚マーブリング',
'Intense Flavor': '強烈な風味',
'Coarse Grain': '粗い繊維',
'Premium': 'プレミアム',
'Flower Marbling': '花マーブリング',
'BBQ Classic': 'BBQクラシック',
'Rib Flavor': 'リブ風味',
'Leaner Cut': '赤身カット',
'Tender': '柔らか',
'Brisket': 'ブリスケット',
'Thin-Sliced': '薄切り',
'Fat-Rich': '脂肪豊富',
'Charcoal Best': '炭火最適',
'Flank': 'フランク',
'Marinate Well': '漬け込み推奨',
'Hidden Gem': '隠れた逸品',
'Value Cut': 'お値打ちカット',
'Flat Iron': 'フラットアイアン',
'Well-Marbled': 'マーブリング良好',
'Budget-Friendly': '手ごろな価格',
'Layered Fat': '層状脂肪',
'Celebration Food': '祝いの食べ物',
'Sweet-Savory': '甘辛',
'Top Grade': '最高等級',
'Korea\'s #1 BBQ': '韓国BBQ第1位',
'Pork King #2': '豚肉2位',
'Complex Flavor': '複雑な風味',
'Jowl': 'ほほ肉',
'Shoulder Cap': '肩キャップ',
'Super Juicy': '超ジューシー',
'Diaphragm': '横隔膜',
'Special Cut': '特殊部位',
'Jeju Specialty': '済州島特産',
'With Skin': '皮付き',
'Crispy': 'カリカリ',
'Back Ribs': 'バックリブ',
'Grill or Smoke': 'グリルまたはスモーク',
'Crowd Pleaser': '皆の人気',
'Daejeon': '大田',
'Pork Skin': '豚皮',
'All Crunch': '全部カリカリ',
'Black Pig': '黒豚',
'Acquired Taste': '慣れが必要な味',
'Offal': '内臓',
'Neck Meat': 'ネック肉',
'Bar Food': 'バーフード',
'Beer Food': 'ビールの肴',
'Charcoal': '炭火',
'Spicy': '辛い',
'Regional Specialty': '地域特産',
```

> Apply same translation pattern for all duck cuts.

---

### `kchicken.html` — Korean Fried Chicken

**Hero + Background boxes**
```js
'Korea\'s fried chicken (치킨) is not American fried chicken. It\'s double-fried for maximum crunch, coated in sweet-spicy glazes, and delivered within 30 minutes to your door at 11 PM. With 87,000+ chicken restaurants in Korea (more than McDonald\'s worldwide), this is a national religion.':
  '韓国のフライドチキン（치킨）はアメリカンフライドチキンとは異なります。最大のサクサク感のために二度揚げし、甘辛グレーズをまとい、夜11時でも30分以内に届けられます。',
'Chicken shops in Korea': '韓国のチキン店数',
'Double-fried for crunch': '二度揚げでサクサク',
'Average delivery time': '平均配達時間',
'How Korean Fried Chicken Was Born': '韓国フライドチキンの誕生',
// All history info-box text
'치맥 (Chimaek) Culture': '치맥（チメク）文化',
// tip-box text
```

**Chain section — 15 chains**

For each chain card, translate:
- `food-card-meta` line
- `food-card-desc` paragraph
- `food-tag` labels

Common chain tags:
```js
'Premium': 'プレミアム',
'Soy Garlic': 'ソイガーリック',
'Honey Combo': 'ハニーコンボ',
'Golden Olive': 'ゴールデンオリーブ',
'57+ Countries': '57カ国以上',
'Delivery King': '配達王',
'Oven-Baked Pioneer': 'オーブン焼きの先駆者',
'양념 Pioneer': '양념の先駆者',
'Nostalgic': '懐かしい',
'Since 1982': '1982年創業',
'Stir-Fried · Not Fried': '炒め · 揚げでなく',
'Fun Brand': '楽しいブランド',
'60-Day Bird': '60日鶏',
'Quality-Focused': '品質重視',
'Whole Chicken': '丸鶏',
'Retro Style': 'レトロスタイル',
'Curry-Spiced': 'カレー風味',
'2 Chickens': 'チキン2羽',
'Best Value': '最高コスパ',
'Budget King': '格安王',
'Healthier': 'よりヘルシー',
'Air-Fried Option': 'エアフライオプション',
'Bold Flavors': '大胆な風味',
```

**Chicken Styles — 10 styles**
```js
// Translate food-card-meta and food-card-desc for each style
'Classic Fried · No Sauce': 'クラシック揚げ · ソースなし',
'Sweet-Spicy Glazed · Korean Iconic': '甘辛グレーズ · 韓国の代名詞',
'Soy Sauce Glazed · Savory-Sweet': '醤油グレーズ · 甘辛うま味',
'Cheese Fondue Dip or Powder': 'チーズフォンデュディップまたはパウダー',
'Honey-Glazed · Kyochon Signature': 'ハニーグレーズ · 교촌の看板',
'Garlic Cream Sauce · Savory': 'ガーリッククリームソース · 旨味',
'Spicy Stir-Fried Chicken Ribs · Chuncheon': '辛炒め鶏リブ · 춘천',
'Half 후라이드 + Half 양념 · Best Combo': '후라이드半分 + 양념半分 · 最高の組み合わせ',
'Tomato Cream + Spicy · 2020s Trend': 'トマトクリーム + 辛 · 2020年代トレンド',
'Extra Spicy · Challenge Level': '超激辛 · チャレンジレベル',
'Double-Fried': '二度揚げ',
'No Sauce': 'ソースなし',
'Korean Icon': '韓国の代名詞',
'No Heat': '辛さなし',
'Sweet': '甘い',
'Honey Glaze': 'ハニーグレーズ',
'No Heat': '辛さなし',
'Garlic Cream': 'ガーリッククリーム',
'Stir-Fry': '炒め',
'Most Ordered Style': '最も注文されるスタイル',
'Best of Both': '両方の良いとこどり',
'Mild': 'マイルド',
'2020s Trend': '2020年代トレンド',
'Very Hot': '超激辛',
'Bragging Rights': '自慢の的',
```

**Vocabulary table**
```js
'Korean fried chicken': '韓国フライドチキン',
'chicken + beer (치킨 + 맥주)': 'チキン + ビール (치킨 + 맥주)',
'plain fried (from "fried")': '素揚げ（「fried」から）',
'sweet-spicy glazed chicken': '甘辛グレーズチキン',
'soy sauce glazed chicken': '醤油グレーズチキン',
'half-and-half (two styles)': '半々（2スタイル）',
'whole chicken': '丸鶏',
'spicy stir-fried chicken ribs': '辛炒め鶏リブ',
'pickled radish served with chicken': 'チキンに添える酢漬け大根',
'delivery': '配達',
'Baemin (Korea\'s #1 delivery app)': 'Baemin（韓国の配達アプリ1位）',
'to double-fry': '二度揚げする',
'crispy, crunchy (texture sound word)': 'サクサク、カリカリ（食感を表す擬音語）',
'chicken restaurant/shop': 'チキン屋',
'one can of beer': 'ビール1缶',
```

---

### `mandu.html` — Korean Dumplings

**Hero**
```js
'만두 (mandu) is Korea\'s dumpling — steamed, fried, boiled, or simmered in broth. From the ceremonial 만두국 served at Lunar New Year to the addictive frozen 비비고 왕교자 cooked at midnight, mandu sits at the heart of Korean comfort food culture.':
  '만두（マンドゥ）は韓国の餃子です — 蒸す、焼く、茹でる、または出汁で煮込む。旧正月に食べる儀礼的な만두국から、真夜中に作る中毒性のある냉동 비비고 왕교자まで、만두は韓国のコンフォートフード文化の中心にあります。',
'History in Korea': '韓国の歴史',
'Regional varieties': '地域の品種',
'Eaten at New Year': '新年に食べる',
'Bibigo: global K-food brand': 'ビビゴ：グローバルK-フードブランド',
'만두의 역사 · History of Korean 만두': '만두의 역사 · 韓国만두の歴史',
// info-box history text
'The 공갈만두 Legend': '공갈만두（ゴンガルマンドゥ）の伝説',
// tip-box text
```

**Cooking methods — 6 cards**
```js
'조리법별 종류 By Cooking Method': '조리법별 종류 調理法別',
'Pan-Fried Dumpling · 굽다 = to grill/fry': 'フライパン焼き餃子 · 굽다 = 焼く',
'Steamed Dumpling · 찌다 = to steam': '蒸し餃子 · 찌다 = 蒸す',
'Boiled Dumpling · 물 = water': '茹で餃子 · 물 = 水',
'Deep-Fried Dumpling · 튀기다 = to deep-fry': '揚げ餃子 · 튀기다 = 揚げる',
'Dumpling Soup · 국 = soup': '餃子スープ · 국 = スープ',
'Hot Pot Mandu · 전골 = table-top hot pot': 'ホットポット餃子 · 전골 = テーブルホットポット',
// All food-card-desc paragraphs for each cooking method
'Most Popular': '最も人気',
'Crispy Bottom': 'カリカリの底',
'Soft': '柔らか',
'Healthy': 'ヘルシー',
'Light': '軽い',
'Transparent Skin': '透明な皮',
'Street Food': 'ストリートフード',
'All Crispy': '全部カリカリ',
'New Year Ritual': '新年の儀式',
'Warm Soup': '温かいスープ',
'Group Dining': 'グループ食事',
```

**Fillings — 12 types**
```js
'소에 따른 종류 By Filling': '소に따른 종류 具材別',
'Meat Dumpling · 고기 = meat (pork)': '肉餃子 · 고기 = 肉（豚肉）',
'Kimchi Dumpling · 김치 filling': 'キムチ餃子 · 김치の具',
'Short Rib Dumpling · 갈비 = short rib': 'カルビ餃子 · 갈비 = 短リブ',
'Shrimp Dumpling · 새우 = shrimp': 'エビ餃子 · 새우 = エビ',
'Seafood Dumpling · 해물 = seafood': '海鮮餃子 · 해물 = 海鮮',
'Vegetable Dumpling · 채소 = vegetable': '野菜餃子 · 채소 = 野菜',
'Tofu Dumpling · 두부 = tofu': '豆腐餃子 · 두부 = 豆腐',
'Glass Noodle Dumpling · 당면 = glass noodles': '春雨餃子 · 당면 = 春雨',
'Crab Meat Dumpling · 게살 = crab meat': 'カニ肉餃子 · 게살 = カニ肉',
'Pork Belly Dumpling · 삼겹살 = pork belly': 'サムギョプサル餃子 · 삼겹살 = 豚バラ',
'Rice Dumpling · 밥 = rice': 'ご飯餃子 · 밥 = ご飯',
'Open-Face Mandu': '開き面만두',
// All food-card-desc paragraphs
```

**Brands — 10 brands**

Translate each brand's `food-card-meta` (origin description) and `food-card-desc` paragraph.

**Special & Seasonal — 4 types**
```js
'특별한 만두 Special & Seasonal': '특별한 만두 特別・季節限定',
'Lunar New Year Soup · 설날 Ritual': '旧正月スープ · 설날の儀式',
'Spring Seasonal · Wild Spring Greens': '春の季節限定 · 野生の春野草',
'Buddhist Temple Food · No 오신채': '仏教寺院料理 · 오신채なし',
'North Korean Style · Historical Capital': '北朝鮮スタイル · 歴史的な首都',
```

**Vocabulary table — 15 entries**
```js
'Korean dumpling': '韓国餃子',
'dumpling wrapper/skin': '餃子の皮',
'dumpling filling': '餃子の具',
'pan-fried dumpling': 'フライパン焼き餃子',
'steamed dumpling': '蒸し餃子',
'boiled dumpling': '茹で餃子',
'deep-fried dumpling': '揚げ餃子',
'king-size dumpling': '特大餃子',
'dumpling soup': '餃子スープ',
'rice cake & dumpling soup (New Year)': '餅と餃子のスープ（新年）',
'hollow mandu (slang: all show, no substance)': 'ハリボテ만두（スラング：見かけ倒し）',
'to fold (as in fold a dumpling)': '折る（餃子を包む）',
'pleats/folds on the wrapper': '皮のひだ',
'to dip and eat': 'つけて食べる',
'soy dipping sauce': '醤油たれ',
```

---

### `ramyeon.html` — Ramyeon Guide

The ramyeon guide has 50+ product cards following the same structure as kbbq.html and kchicken.html.

**Hero + history boxes**
```js
// Page hero description — full paragraph
// History section paragraphs (Samyang 1963, etc.)
```

**Brand section headers**
```js
'농심 Nongshim Products': '農心 Nongshim 製品',
'삼양 Samyang Products': '三養 Samyang 製品',
'오뚜기 Ottogi Products': 'Ottogi 製品',
'팔도 Paldo Products': 'Paldo 製品',
```

**For each of the 50+ product cards**: translate
- `food-card-meta` (brand · origin · description)
- `food-card-desc` paragraph

**Common tags**
```js
'Very Hot': '超激辛',
'Hot': '辛い',
'Medium': '中辛',
'Mild': 'マイルド',
'Best Pot Style': '鍋スタイル最適',
'Cup Version': 'カップバージョン',
'Stir-Fry': '炒め',
'Instant Classic': 'インスタントクラシック',
'Global Hit': 'グローバルヒット',
'Viral': 'バイラル',
'Premium Ingredients': 'プレミアム食材',
'Late Night Snack': '夜食',
'Comfort Food': 'コンフォートフード',
'Fire Level': '火力レベル',
'Broth Style': 'スープスタイル',
'Dry Style': 'ドライスタイル',
```

**Vocabulary table** — translate English column entries.

---

### `kimchi.html` — Kimchi Guide

**Hero + history boxes**
```js
// Hero description paragraph
// History info-box paragraph
// Kimjang (UNESCO) section paragraphs
// Fermentation science section
```

**Kimchi varieties — 30+ cards**

For each variety card, translate:
- English subtitle in `genre-name` (e.g., `'(Napa Cabbage)'` → `'（白菜）'`)
- `genre-desc` paragraph

Example entries:
```js
'Napa Cabbage': '白菜',
'Radish Cubed Kimchi': '大根のさいの目切りキムチ',
'Young Radish Kimchi': '총각（小カブ）キムチ',
'White Kimchi (No Chili)': '白キムチ（唐辛子なし）',
'Water Kimchi': '水キムチ',
'Radish Water Kimchi': '大根水キムチ',
// Continue for all 30+ varieties
```

**Tags**
```js
'Most Common': '最も一般的',
'Everyday': '毎日食べる',
'No Heat': '辛さなし',
'Mild': 'マイルド',
'Spicy': '辛い',
'Very Hot': '超激辛',
'Fermented': '発酵',
'Regional': '地域の',
'Seasonal': '季節限定',
'UNESCO Heritage': 'ユネスコ遺産',
'Beginner Friendly': '初心者向け',
```

**Vocabulary table** — translate English column.

---

### `kbeauty.html` — K-Beauty

**Hero**
```js
// 'Discover K-Beauty trends, skincare routines...' — full paragraph translation
```

**Sections to translate**
- K-Beauty Goes Global: photo captions and description text
- K-Beauty Timeline: all timeline-title and timeline-desc
- Iconic Brands: all brand descriptions
- Beauty Vocabulary: vocab table English column
- 10-Step Skincare: each step name and description
- Key Ingredients: each ingredient name (English part) and description
- Beauty Trends: trend names and descriptions
- Makeup Philosophy: all paragraph text
- 피부과 Culture: all paragraph text
- Shopping Phrases: English translations of phrases
- K-Beauty Dialogue: dialogue line English text (leave Korean lines as-is)

---

### `kfashion.html` — K-Fashion

**Sections to translate**
- K-Fashion Global: description paragraphs and photo captions
- Fashion Icons: all icon descriptions
- Fashion Timeline: all timeline entries
- Style Aesthetics: aesthetic name translations and descriptions
- Idol Fashion: descriptions
- Seoul Fashion Week: descriptions
- Fashion Vocabulary: vocab table English column
- Fashion Districts: district names (English) and descriptions
- Shopping Phrases: English translations of Korean phrases
- Hanbok & Traditional Fashion: descriptions
- Shopping Dialogue: English dialogue lines (leave Korean lines as-is)

---

### `koreanthing.html` — Korean Thing

**Hero**
```js
'The things only Koreans do — rice obsession, fast delivery, jjimjilbang culture, outdoor drinking, jeonse housing, and 100 proverbs.':
  '韓国人だけがすること — お米への執念、超速配達、찜질방文化、野外飲酒、전세住宅制度、そしてことわざ100選。',
```

**Section headings + descriptions** for each section (bap, chokbeop, delivery, ecology, table, transport, jjimjilbang, surgery, outdoor-drinking, jeonse, traditions, sodams, mbti, military):
- Translate the English part of each bilingual heading
- Translate all description paragraphs
- Translate tip/info box content

**속담 (Proverbs) section**: for each of the 100 proverbs, translate the English meaning column entry.

Example:
```js
'Even monkeys fall from trees.': '猿も木から落ちる。',
'The sky does not have two suns.': '空に太陽は二つない。',
// Continue for all 100 proverbs
```

---

### `kgaming.html` — K-Gaming

**Hero + Stats**
```js
// Hero description paragraph
// All stat labels (stat-val and stat-label elements)
```

**Timeline, Legends, Iconic Games, Streaming Culture, PC Bang Culture, Esports Leagues, Gamer Slang, Gaming Vocabulary**: translate all section headings, photo captions, description text, and vocab table English column.

---

### `ksports.html` — K-Sports

**Hero + Stats + Sections**: translate all section headings, photo captions, athlete bio descriptions, chant explanations (English parts), and vocab table English column.

---

## Implementation Steps

### Step 1 — Open `js/lang-ja.js`
Find the `JA = {` object inside `LangManager`. It's a flat key-value dictionary. Add all new entries inside this object.

### Step 2 — Add strings in batches by category
Work file by file. For each page, read the HTML source, copy exact English text node contents, and add to the JA dictionary as `'English text': '日本語訳',` entries.

**Key rule for matching**: The LangManager matches trimmed text node content. The key must be the exact visible text inside the DOM element, without any HTML tags. Do not include surrounding whitespace.

### Step 3 — Handle long descriptions
For long paragraph strings, wrap in template literals is not needed — just use a regular string with `\n` if the DOM text spans multiple rendered lines, but in most cases the text is a single logical sentence block.

### Step 4 — Handle bilingual section labels
For labels like `"K-CULTURE · 한국 문화"`, the Korean half stays. The key is the entire string including the Korean part:
```js
'K-CULTURE · 한국 문화': 'K-カルチャー · 한국 문화',
```

### Step 5 — Test each page
1. Open a culture page in the browser
2. Click `🇺🇸 EN` to toggle to `🇯🇵 JA`
3. Verify all UI elements switch to Japanese
4. Verify Korean text in content remains untouched
5. Verify `.kr-trans` div content stays in Korean

---

## Verification Checklist (per page)

- [ ] Page `<title>` tag translates
- [ ] All nav links translate
- [ ] Sidebar all links translate  
- [ ] Hero section title + description translate
- [ ] Section eyebrows translate
- [ ] All `culture-sub-heading` elements translate
- [ ] Photo caption titles + body text translate
- [ ] Timeline titles + descriptions translate
- [ ] All food/brand/genre/drama card descriptions translate
- [ ] Vocab table English column translates
- [ ] Tip boxes translate
- [ ] Info boxes translate
- [ ] Comparison table headers + cells translate
- [ ] Footer text translates
- [ ] Korean Hangul text is unchanged
- [ ] `.kr-trans` div content unchanged
- [ ] Korean words inside English sentences unchanged
- [ ] Romanization column in vocab tables unchanged
