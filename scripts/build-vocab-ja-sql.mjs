/**
 * Builds article-vocabulary-ja.md — SQL UPDATE statements adding
 * definition_ja + example_ja + reading_ja to every vocabulary item for all articles.
 *
 * Usage:  node scripts/build-vocab-ja-sql.mjs
 * Output: article-vocabulary-ja.md  (paste entire SQL block into Supabase SQL editor)
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

const __dir = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dir, '.env') });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

// ── Japanese translation dictionary (218 unique words) ─────────────────────
// Keys: Korean 'word' field. Values: { definition_ja, example_ja, reading_ja }
const JA = {
  '직항':          { definition_ja: '直行便（乗り換えなし）',             example_ja: 'ソウルから済州まで直行便で1時間もかかりません。',           reading_ja: 'ジカン' },
  '과잉 관광':     { definition_ja: 'オーバーツーリズム',                  example_ja: 'オーバーツーリズムで済州島の住民の生活が不便になった。',    reading_ja: 'クァイン グァングァン' },
  '재개':          { definition_ja: '再開（再び始まること）',              example_ja: '航空便再開のニュースに地元の小規模事業者が喜んだ。',       reading_ja: 'チェゲ' },
  '원주민':        { definition_ja: '地元住民・先住民',                   example_ja: '済州島の地元住民は急激な開発への懸念を示した。',          reading_ja: 'ウォンジュミン' },
  '갈등':          { definition_ja: '対立・葛藤',                         example_ja: '観光開発をめぐる住民間の対立が深まっている。',            reading_ja: 'カルドゥン' },
  '반도체':        { definition_ja: '半導体',                             example_ja: '韓国は世界の半導体市場で重要な役割を果たしている。',       reading_ja: 'パンドチェ' },
  '의존도':        { definition_ja: '依存度',                             example_ja: '韓国経済の半導体への依存度は非常に高い。',               reading_ja: 'ウィジョンド' },
  '취약성':        { definition_ja: '脆弱性',                             example_ja: '経済的脆弱性を減らすには多様な産業が必要だ。',           reading_ja: 'チュィヤクソン' },
  '세제 혜택':     { definition_ja: '税制優遇',                           example_ja: '政府は半導体企業に税制優遇を提供している。',             reading_ja: 'セジェ ヘテク' },
  '다각화':        { definition_ja: '多角化・多様化',                     example_ja: '経済の多角化は危機に備える重要な戦略だ。',              reading_ja: 'タガクァ' },
  '서포터즈':      { definition_ja: 'サポーター団体',                     example_ja: 'そのサポーター団体は毎試合応援歌を準備する。',           reading_ja: 'ソポトジュ' },
  '태극전사':      { definition_ja: 'テグク戦士（韓国代表チームの愛称）', example_ja: 'テグク戦士は今夜重要な試合に臨む。',                    reading_ja: 'テグクチョンサ' },
  '응원':          { definition_ja: '応援・声援',                         example_ja: 'ファンの声援のおかげで選手たちはより力を出せた。',        reading_ja: 'ウンウォン' },
  '본선 진출':     { definition_ja: '本戦進出',                           example_ja: '韓国はワールドカップ本戦進出に10回連続で成功した。',     reading_ja: 'ポンソン ジンチュル' },
  '격차':          { definition_ja: '格差・差',                           example_ja: '男女代表チームの支援格差が論争になっている。',           reading_ja: 'キョクチャ' },
  '관세':          { definition_ja: '関税',                               example_ja: '米国が韓国製品に高い関税を課した。',                   reading_ja: 'クァンセ' },
  '동맹':          { definition_ja: '同盟',                               example_ja: '韓米同盟は韓国の安全保障政策の要だ。',                 reading_ja: 'トンメン' },
  '주권':          { definition_ja: '主権',                               example_ja: '一部の議員はこの協定が国家主権を侵害すると主張した。',   reading_ja: 'チュクォン' },
  '교착 상태':     { definition_ja: '膠着状態・行き詰まり',               example_ja: '交渉が膠着状態に陥り、合意点が見つからない。',          reading_ja: 'キョチャク サンテ' },
  '한류':          { definition_ja: '韓流（韓国文化の世界的ブーム）',     example_ja: '韓流のおかげで外国人が韓国語を学ぶようになった。',       reading_ja: 'ハルリュ' },
  '연습생':        { definition_ja: '練習生・トレーニー',                  example_ja: '彼女は12歳で練習生になった。',                        reading_ja: 'ヨンスプセン' },
  '자부심':        { definition_ja: '誇り・自負心',                       example_ja: '多くの韓国人はK-POPの成功を誇りに思っている。',        reading_ja: 'チャブシム' },
  '피로감':        { definition_ja: '疲労感・倦怠感',                     example_ja: '一部の人々はK-POPブームに疲れを感じている。',          reading_ja: 'ピログァム' },
  '밀려나다':      { definition_ja: '追い出される・押し出される',          example_ja: '家賃の上昇で小規模事業者が追い出されている。',          reading_ja: 'ミルリョナダ' },
  '존댓말':        { definition_ja: '敬語（丁寧な言葉遣い）',             example_ja: '初めて会う人には敬語を使うのが礼儀だ。',               reading_ja: 'ジョンデンマル' },
  '반말':          { definition_ja: 'タメ口・友達言葉',                   example_ja: '親しい友人同士は気楽にタメ口で話す。',                 reading_ja: 'パンマル' },
  '열풍':          { definition_ja: '旋風・ブーム',                       example_ja: '韓国ドラマのブームが全世界に広がっている。',            reading_ja: 'ヨルプン' },
  '사로잡다':      { definition_ja: '魅了する・とりこにする',              example_ja: 'そのドラマは世界中の視聴者の心を魅了した。',            reading_ja: 'サロジャプタ' },
  '반찬':          { definition_ja: 'おかず（副菜）',                     example_ja: '韓国料理店では、ご飯と一緒に様々なおかずが出てくる。', reading_ja: 'パンチャン' },
  '세계화':        { definition_ja: 'グローバル化・世界化',               example_ja: '韓国料理のグローバル化は急速に進んでいる。',           reading_ja: 'セゲファ' },
  '진정성':        { definition_ja: '真正性・本物らしさ',                 example_ja: '料理の真正性を守ることが大切という意見もある。',        reading_ja: 'ジンジョンソン' },
  '식문화':        { definition_ja: '食文化',                             example_ja: '韓国の食文化は一緒に食事をすることを大切にする。',      reading_ja: 'シンムンファ' },
  '현지화':        { definition_ja: 'ローカライズ・現地化',               example_ja: '海外の韓国料理店の中には現地化のためにレシピを変えるところもある。', reading_ja: 'ヒョンジファ' },
  '패션 수도':     { definition_ja: 'ファッションの都',                   example_ja: 'ソウルは世界5番目のファッションの都と呼ばれている。',   reading_ja: 'ペション スド' },
  '영향력':        { definition_ja: '影響力',                             example_ja: 'K-POPは世界的に大きな影響力を持っている。',           reading_ja: 'ヨンヒャンニョク' },
  '미학':          { definition_ja: '美学・美意識',                       example_ja: 'ミュージックビデオの美学がファッションのトレンドに影響を与える。', reading_ja: 'ミハク' },
  '부상':          { definition_ja: '台頭・浮上',                         example_ja: 'ソウルがグローバルなファッション都市として台頭している。', reading_ja: 'プサン' },
  '모방하다':      { definition_ja: '模倣する・真似る',                   example_ja: '韓国ファッションが世界各地で模倣されている。',          reading_ja: 'モバンハダ' },
  '수능':          { definition_ja: '大学修学能力試験（センター試験）',    example_ja: '大学修学能力試験は毎年11月に全国で実施される。',       reading_ja: 'スヌン' },
  '학원':          { definition_ja: '塾・学習塾',                         example_ja: '多くの生徒が放課後に数学の塾に通う。',                 reading_ja: 'ハグォン' },
  '교육열':        { definition_ja: '教育熱（学力向上への熱心さ）',        example_ja: '韓国の高い教育熱は世界的にも有名だ。',                 reading_ja: 'キョユンニョル' },
  '사교육':        { definition_ja: '私教育・民間の学習塾',               example_ja: '塾の費用が多くの家庭の大きな負担になっている。',        reading_ja: 'サギョユク' },
  '학업 스트레스': { definition_ja: '学業ストレス',                       example_ja: '青少年の学業ストレスを減らす政策が必要だ。',           reading_ja: 'ハゴプ ストゥレス' },
  '금리':          { definition_ja: '金利・利率',                         example_ja: '韓国銀行は物価安定のために金利を調整できる。',          reading_ja: 'クムニ' },
  '수출':          { definition_ja: '輸出',                               example_ja: '輸出が増えると経済成長に役立つ。',                   reading_ja: 'スチュル' },
  '환율':          { definition_ja: '為替レート',                         example_ja: 'ドルに対してウォンの為替レートが上がると輸入物価が高くなる。', reading_ja: 'ファニュル' },
  '저비용 항공사': { definition_ja: '格安航空会社（LCC）',                example_ja: '多くの旅行者が格安航空会社を使って済州島に行く。',      reading_ja: 'チョビヨン ハンゴンサ' },
  '직항 노선':     { definition_ja: '直行便路線',                         example_ja: 'ソウルから済州まで直行便を使えば1時間もかからない。',   reading_ja: 'ジカン ノソン' },
  '탄소 배출':     { definition_ja: '炭素排出・CO₂排出',                  example_ja: '航空旅行は炭素排出量が多く環境に負荷をかける。',        reading_ja: 'タンソ ベチュル' },
  '접근성':        { definition_ja: 'アクセス性・利便性',                 example_ja: '公共交通機関のアクセス性を高めることが重要な政策目標だ。', reading_ja: 'チョプクンソン' },
  '재개하다':      { definition_ja: '再開する',                           example_ja: '長い交渉の末、両国は貿易を再開することにした。',        reading_ja: 'チェゲハダ' },
  '노동조합':      { definition_ja: '労働組合',                           example_ja: '労働組合は賃上げを要求してストライキを起こした。',      reading_ja: 'ノドンジョハプ' },
  '갑질':          { definition_ja: '権力の乱用・パワハラ',               example_ja: '職場でのパワハラは深刻な社会問題として認識されている。', reading_ja: 'カプチル' },
  '시가총액':      { definition_ja: '時価総額',                           example_ja: 'その企業の時価総額が初めて1兆ドルを超えた。',          reading_ja: 'シガチョンエク' },
  '형평성':        { definition_ja: '公平性・衡平性',                     example_ja: '経済成長と公平性を同時に達成するのは難しい。',         reading_ja: 'ヒョンピョンソン' },
  '패배':          { definition_ja: '敗北・敗け',                         example_ja: '昨日の試合での敗北にファンは大きく失望した。',         reading_ja: 'ペベ' },
  '극복':          { definition_ja: '克服',                               example_ja: '多くのファンは韓国サッカーがこの危機を克服できると信じている。', reading_ja: 'ククポク' },
  '예선':          { definition_ja: '予選',                               example_ja: '韓国はアジアのワールドカップ予選で好成績を収める必要がある。', reading_ja: 'イェソン' },
  '쇄신':          { definition_ja: '刷新・抜本的改革',                   example_ja: 'ファンは大韓サッカー協会の全面的な刷新を求めている。', reading_ja: 'スェシン' },
  '아보하':        { definition_ja: '아보하（普通の一日を愛でる生き方）', example_ja: '最近若者の間で아보하というライフスタイルが人気だ。',  reading_ja: 'アボハ' },
  '귀촌':          { definition_ja: '田舎への移住',                       example_ja: 'ストレスを避けて田舎に移住する若者が増えている。',      reading_ja: 'クィチョン' },
  '소소한':        { definition_ja: '小さく素朴な・些細な',               example_ja: '日常の小さな瞬間に幸福を見出すことができる。',         reading_ja: 'ソソハン' },
  '공동체':        { definition_ja: 'コミュニティ・共同体',               example_ja: '彼らは農村で小さなコミュニティを作って暮らしている。', reading_ja: 'コンドンチェ' },
  '대사증후군':    { definition_ja: 'メタボリックシンドローム',            example_ja: '健康的な生活習慣はメタボリックシンドロームの予防に役立つ。', reading_ja: 'テサジュンフグン' },
  '국회':          { definition_ja: '国会（韓国議会）',                   example_ja: '国会で新しい法案が議論されている。',                  reading_ja: 'クコェ' },
  '분담금':        { definition_ja: '分担金・負担金',                     example_ja: '防衛費分担金の交渉がまだ終わっていない。',             reading_ja: 'プンダムグム' },
  '협상':          { definition_ja: '交渉',                               example_ja: '両国は貿易交渉を続けている。',                       reading_ja: 'ヒョプサン' },
  '갈림길':        { definition_ja: '岐路・分かれ道',                     example_ja: 'K-POP産業は重要な岐路に立っている。',               reading_ja: 'カルリムキル' },
  '전환점':        { definition_ja: '転換点',                             example_ja: 'これはK-POP歴史の重要な転換点だ。',                  reading_ja: 'チョンファンジョム' },
  '팬덤':          { definition_ja: 'ファンダム（ファンコミュニティ）',    example_ja: 'BTSのファンダムは世界中に広がっている。',             reading_ja: 'ペンドム' },
  '외환위기':      { definition_ja: '外貨危機（1997年アジア通貨危機）',   example_ja: '1997年の外貨危機は韓国経済に大きな打撃を与えた。',   reading_ja: 'ウェファン ウィギ' },
  '콘텐츠 산업':   { definition_ja: 'コンテンツ産業',                     example_ja: '政府はコンテンツ産業を将来の成長エンジンとして育成している。', reading_ja: 'コンテンチュ サノプ' },
  '성장 동력':     { definition_ja: '成長エンジン・成長の原動力',         example_ja: '文化コンテンツは韓国の新たな成長エンジンになった。',   reading_ja: 'ソンジャン トンニョク' },
  '발효':          { definition_ja: '発酵',                               example_ja: 'キムチは発酵過程を通じて独特の味と栄養を得る。',      reading_ja: 'パリョ' },
  '정통성':        { definition_ja: '正統性・本物らしさ',                 example_ja: '食べ物が現地の味に合わせて変わると正統性の問題が生じる。', reading_ja: 'チョントンソン' },
  '솜씨':          { definition_ja: '腕前・技巧',                         example_ja: 'その仕立て師の腕前は本当に素晴らしい。',              reading_ja: 'ソムッシ' },
  '하청':          { definition_ja: '下請け',                             example_ja: '多くの小工場が大企業の下請けで服を作っている。',       reading_ja: 'ハチョン' },
  '독립 디자이너': { definition_ja: '独立系デザイナー',                   example_ja: '独立系デザイナーは自分独自のスタイルを披露する。',    reading_ja: 'トンニプ ディジャイノ' },
  '입시':          { definition_ja: '入試・大学受験',                     example_ja: '受験準備で最近よく眠れていない。',                   reading_ja: 'イプシ' },
  '성적':          { definition_ja: '成績・学業成果',                     example_ja: '成績が下がると両親が心配するかもしれない。',           reading_ja: 'ソンジョク' },
  '무역수지':      { definition_ja: '貿易収支',                           example_ja: '半導体価格が下がると貿易収支が赤字に転じた。',         reading_ja: 'ムヨクスジ' },
  '경쟁 우위':     { definition_ja: '競争優位（性）',                     example_ja: '長年の技術投資のおかげで韓国は半導体で競争優位を持っている。', reading_ja: 'キョンジェン ウウィ' },
  '과잉관광':      { definition_ja: 'オーバーツーリズム',                  example_ja: '済州島はオーバーツーリズムで環境問題が深刻化している。', reading_ja: 'クァイングァングァン' },
  '해녀':          { definition_ja: '海女（済州島の伝統的な女性海士）',    example_ja: '海女文化はユネスコ無形文化遺産に登録されている。',     reading_ja: 'ヘニョ' },
  '성수기':        { definition_ja: 'ハイシーズン・繁忙期',               example_ja: '夏のハイシーズンには済州島の宿泊施設を事前予約する必要がある。', reading_ja: 'ソンスギ' },
  '탐방로':        { definition_ja: '探訪路・トレッキングコース',          example_ja: '漢拿山では指定されたトレッキングコースを外れてはいけない。', reading_ja: 'タムバンノ' },
  '배려':          { definition_ja: '思いやり・配慮',                     example_ja: '他人への思いやりが良い旅行者の基本だ。',              reading_ja: 'ペリョ' },
  '성과급':        { definition_ja: '業績連動給・成果給',                 example_ja: '今年の会社の業績が良かったので社員は高い成果給をもらった。', reading_ja: 'ソングァグプ' },
  '재벌':          { definition_ja: '財閥（韓国の大企業グループ）',       example_ja: 'サムスンと現代は韓国を代表する財閥企業だ。',           reading_ja: 'チェボル' },
  '복리후생':      { definition_ja: '福利厚生',                           example_ja: 'この会社は給与以外にも様々な福利厚生を提供している。', reading_ja: 'ポンニフセン' },
  '불평등':        { definition_ja: '不平等',                             example_ja: '賃金格差の問題は多くの国で重要な社会的課題だ。',       reading_ja: 'プルピョンドゥン' },
  '분단':          { definition_ja: '分断（国の分割）',                   example_ja: '朝鮮半島の分断は1945年以降続いている。',              reading_ja: 'プンダン' },
  '정전협정':      { definition_ja: '停戦協定',                           example_ja: '南北韓はまだ平和条約でなく停戦協定の状態にある。',    reading_ja: 'チョンジョン ヒョプジョン' },
  '단일팀':        { definition_ja: '合同チーム・統一チーム',             example_ja: '2018年の五輪で南北韓はアイスホッケーの合同チームを結成した。', reading_ja: 'タニルティム' },
  '화해':          { definition_ja: '和解',                               example_ja: '多くの人々がスポーツ交流を和解への第一歩と見ている。', reading_ja: 'ファへ' },
  '탈북':          { definition_ja: '脱北（北朝鮮からの脱出）',           example_ja: '国際大会中に脱北する北朝鮮選手は非常に稀だ。',        reading_ja: 'タルブク' },
  '소확행':        { definition_ja: '小さな確かな幸せ',                   example_ja: '温かいコーヒー一杯が私の小さな確かな幸せだ。',        reading_ja: 'ソファクヘン' },
  '피부 관리':     { definition_ja: 'スキンケア・肌の手入れ',             example_ja: '彼女は毎晩丁寧にスキンケアをする。',                  reading_ja: 'ピブ クァルリ' },
  '외모지상주의':  { definition_ja: 'ルッキズム・外見至上主義',           example_ja: 'ルッキズムは韓国社会でよく議論される問題だ。',        reading_ja: 'ウェモジサンジュウィ' },
  '일상':          { definition_ja: '日常・毎日の生活',                   example_ja: '彼のYouTubeチャンネルは平凡な日常を映している。',     reading_ja: 'イルサン' },
  '에너지 전환':   { definition_ja: 'エネルギー転換',                     example_ja: 'エネルギー転換には莫大な投資が必要だ。',               reading_ja: 'エノジ チョンファン' },
  '안보':          { definition_ja: '安全保障・安保',                     example_ja: '韓国の安全保障は米国との同盟に大きく依存している。',   reading_ja: 'アンボ' },
  '다변화':        { definition_ja: '多様化',                             example_ja: '政府は貿易の多様化を通じて経済リスクを減らそうとしている。', reading_ja: 'タビョンファ' },
  '컴백':          { definition_ja: 'カムバック（新曲・活動再開）',       example_ja: 'グループは6ヶ月ぶりにカムバックを発表した。',         reading_ja: 'コムベク' },
  '데뷔':          { definition_ja: 'デビュー（初舞台・初披露）',         example_ja: '彼は16歳でデビューした。',                          reading_ja: 'テビュ' },
  '가사':          { definition_ja: '歌詞',                               example_ja: 'この歌の歌詞を覚えると韓国語の勉強に役立つ。',         reading_ja: 'カサ' },
  '임대료':        { definition_ja: '家賃・賃料',                         example_ja: '観光客が増えてこの地区の家賃が大幅に上がった。',       reading_ja: 'イムデリョ' },
  '괴리감':        { definition_ja: '乖離感・ギャップ感',                 example_ja: 'テレビの映像と現実の間にギャップを感じた。',           reading_ja: 'クェリガム' },
  '창작 산업':     { definition_ja: 'クリエイティブ産業・創作業界',       example_ja: 'クリエイティブ産業で働く若者が増えている。',           reading_ja: 'チャンジャク サノプ' },
  '변질':          { definition_ja: '変質・歪曲',                         example_ja: '現地化が食べ物の変質につながると心配する人もいる。',   reading_ja: 'ピョンジル' },
  '신진 디자이너': { definition_ja: '新進デザイナー・若手デザイナー',     example_ja: 'ソウルファッションウィークは新進デザイナーに機会を提供する。', reading_ja: 'シンジン ディジャイノ' },
  '녹록지 않다':   { definition_ja: '容易ではない・一筋縄ではいかない',   example_ja: 'ファッション業界で成功するのは容易ではない。',         reading_ja: 'ノクロクチ アンタ' },
  '한복':          { definition_ja: 'ハンボク（韓国の伝統衣装）',         example_ja: '一部のデザイナーはハンボクの美学を現代ファッションに取り入れる。', reading_ja: 'ハンボク' },
  '풀뿌리':        { definition_ja: '草の根（市民主導）',                 example_ja: 'ポップアップショップが若いデザイナーの草の根の販売スペースになっている。', reading_ja: 'プルプリ' },
  '차별화':        { definition_ja: '差別化',                             example_ja: '激しい競争市場では差別化が非常に重要だ。',            reading_ja: 'チャビョルファ' },
  '학벌':          { definition_ja: '学歴・出身大学（の社会的序列）',     example_ja: '韓国社会では学歴が就職に大きく影響する。',            reading_ja: 'ハクポル' },
  '자율 학습':     { definition_ja: '自習・自律学習',                     example_ja: '高校生は放課後も自習をする。',                       reading_ja: 'チャユル ハクスプ' },
  '번아웃':        { definition_ja: 'バーンアウト・燃え尽き症候群',       example_ja: '激しい受験ストレスでバーンアウトを経験する学生が増えている。', reading_ja: 'ポナウッ' },
  '내수':          { definition_ja: '内需・国内需要',                     example_ja: '輸出は増えたが内需はまだ不振だ。',                   reading_ja: 'ネス' },
  '가계부채':      { definition_ja: '家計債務',                           example_ja: '高い家計債務は消費を制限する要因の一つだ。',           reading_ja: 'カゲブチェ' },
  '경기 부양':     { definition_ja: '景気刺激・景気浮揚',                 example_ja: '政府は景気刺激のために様々な政策を検討している。',     reading_ja: 'キョンギ プヤン' },
  '분산':          { definition_ja: '分散',                               example_ja: '政府は観光客を地方に分散させる政策を推進している。',   reading_ja: 'プンサン' },
  '사생활 침해':   { definition_ja: 'プライバシー侵害',                   example_ja: '北村の住民は観光客によるプライバシー侵害を訴えている。', reading_ja: 'サセンファル チムヘ' },
  '지속 가능한':   { definition_ja: '持続可能な',                         example_ja: '持続可能な観光のために地域社会の意見を反映する必要がある。', reading_ja: 'チソク カヌンハン' },
  '수익':          { definition_ja: '収益・利益',                         example_ja: '観光収益は増えたが恩恵が均等に分配されていないという批判がある。', reading_ja: 'スイク' },
  '눈치':          { definition_ja: '空気を読む能力・察知する力',         example_ja: '彼は空気を読むのが得意で上司が望むことを事前に察知する。', reading_ja: 'ヌンチ' },
  '워라밸':        { definition_ja: 'ワークライフバランス',               example_ja: '最近若い社会人はワークライフバランスをとても重視する。', reading_ja: 'ウォラベル' },
  '위계질서':      { definition_ja: '上下関係・ヒエラルキー',             example_ja: '韓国の職場では上下関係を尊重することが重要だ。',       reading_ja: 'ウィゲジルソ' },
  '야근':          { definition_ja: '残業・深夜勤務',                     example_ja: '彼女は締め切りに間に合わせるために毎日残業している。', reading_ja: 'ヤグン' },
  '이산가족':      { definition_ja: '離散家族（南北分断で引き離された家族）', example_ja: 'その祖母は70年以上北朝鮮にいる離散家族を恋しく思い続けた。', reading_ja: 'イサンガジョク' },
  '통일':          { definition_ja: '統一（南北朝鮮の再統一）',           example_ja: '多くの韓国人は統一がいつ実現するか気になっている。',   reading_ja: 'トンイル' },
  '교류':          { definition_ja: '交流・交換',                         example_ja: '南北間の文化交流は相互理解を深めるのに役立つ。',       reading_ja: 'キョリュ' },
  '엇갈리다':      { definition_ja: '意見が割れる・すれ違う',             example_ja: 'この出来事に対する市民の反応は割れた。',              reading_ja: 'オッカルリダ' },
  '경쟁 사회':     { definition_ja: '競争社会',                           example_ja: '多くの若者が競争社会の中で燃え尽きている。',           reading_ja: 'キョンジェン サフェ' },
  '대기업':        { definition_ja: '大企業・大手企業',                   example_ja: '彼は大企業への就職を目標に毎晩遅くまで勉強した。',    reading_ja: 'テギオプ' },
  '포기하다':      { definition_ja: '諦める・放棄する',                   example_ja: '住宅価格が高すぎて家を持つことを諦める若者が増えている。', reading_ja: 'ポギハダ' },
  '민주화':        { definition_ja: '民主化',                             example_ja: '1987年の民主化後、韓国では直接選挙が実施された。',     reading_ja: 'ミンジュファ' },
  '지방자치':      { definition_ja: '地方自治',                           example_ja: '地方自治が確立されて市民が地域代表を直接選べるようになった。', reading_ja: 'チバンジャチ' },
  '탈원전':        { definition_ja: '脱原発・原発ゼロ政策',               example_ja: '脱原発政策を支持する人と反対する人の間で議論が続いている。', reading_ja: 'タルウォンジョン' },
  '충돌':          { definition_ja: '衝突・対立',                         example_ja: '国会では与野党間の衝突がよく起きる。',                 reading_ja: 'チュンドル' },
  '중앙집권':      { definition_ja: '中央集権',                           example_ja: '過去、韓国は強い中央集権体制を維持していた。',         reading_ja: 'チュンアンジプクォン' },
  '기획사':        { definition_ja: '芸能事務所・プロダクション',         example_ja: '大手芸能事務所がK-POP市場を長く支配してきた。',       reading_ja: 'キフェクサ' },
  '호감도':        { definition_ja: '好感度',                             example_ja: '韓国文化への好感度が世界的に高まっている。',           reading_ja: 'ホガムド' },
  '소프트 파워':   { definition_ja: 'ソフトパワー',                       example_ja: '韓国は文化を通じてソフトパワーを育てている。',         reading_ja: 'ソプトゥ パウォ' },
  '허브':          { definition_ja: 'ハブ（中心拠点）',                   example_ja: 'ソウルがグローバルなメディア制作のハブとして台頭している。', reading_ja: 'ホブ' },
  '인정받다':      { definition_ja: '認められる・評価される',             example_ja: '韓流は世界的に重要な文化として認められている。',       reading_ja: 'インジョンバッタ' },
  '같이 먹다':     { definition_ja: '一緒に食べる（共食）',               example_ja: '韓国では家族や友人と一緒に食べることが大切だ。',       reading_ja: 'カチ モクタ' },
  '음식 문화':     { definition_ja: '食文化',                             example_ja: '韓国の食文化は他の人と食べ物を分かち合うことを重視する。', reading_ja: 'ウムシン ムンファ' },
  '유행':          { definition_ja: '流行・トレンド',                     example_ja: '最近はどんなスタイルが流行っているの？',              reading_ja: 'ユヘン' },
  '하위문화':      { definition_ja: 'サブカルチャー',                     example_ja: '弘大はかつて若者のサブカルチャーの中心地だった。',     reading_ja: 'ハウィムンファ' },
  '비판적':        { definition_ja: '批判的',                             example_ja: 'メディアを批判的に見る必要がある。',                  reading_ja: 'ピパンジョク' },
  '자생적':        { definition_ja: '自発的・自然発生的',                 example_ja: 'その運動は自然発生した草の根の市民運動だった。',       reading_ja: 'チャセンジョク' },
  '교육 격차':     { definition_ja: '教育格差・教育の不平等',             example_ja: '政府は教育格差を減らすために様々な政策を実施している。', reading_ja: 'キョユク キョクチャ' },
  '물가':          { definition_ja: '物価・価格水準',                     example_ja: '最近物価が上がりすぎて食料品の買い物が大変だ。',       reading_ja: 'ムルガ' },
  '호황':          { definition_ja: '好況・ブーム',                       example_ja: '半導体ブームのおかげで関連企業の業績が大幅に改善した。', reading_ja: 'ホファン' },
  '취업난':        { definition_ja: '就職難',                             example_ja: '深刻な就職難で多くの若者がアルバイトで生計を立てている。', reading_ja: 'チュィオムナン' },
  '관광객':        { definition_ja: '観光客',                             example_ja: '最近ソウルには外国人観光客が本当に多い。',             reading_ja: 'クァングァンゲク' },
  '주민':          { definition_ja: '住民・居住者',                       example_ja: '北村の住民たちは騒音で困っている。',                  reading_ja: 'チュミン' },
  '불편':          { definition_ja: '不便・不快感',                       example_ja: '観光客が多すぎて住民は不便を感じている。',             reading_ja: 'プルピョン' },
  '규정':          { definition_ja: '規定・規則・ルール',                 example_ja: '政府は短期賃貸に関する新しい規定を設けた。',           reading_ja: 'キュジョン' },
  '임금':          { definition_ja: '賃金・給与',                         example_ja: '従業員は賃上げを要求した。',                         reading_ja: 'イムグム' },
  '헌신':          { definition_ja: '献身・奉仕・尽力',                   example_ja: '彼は会社への献身で高く評価された。',                  reading_ja: 'ホンシン' },
  '선전':          { definition_ja: '宣伝・プロパガンダ',                 example_ja: '一部の専門家はこのイベントが宣伝ツールとして使われたと主張する。', reading_ja: 'ソンジョン' },
  '저출산':        { definition_ja: '少子化・低出生率',                   example_ja: '少子化問題は韓国社会が直面する最も深刻な課題の一つだ。', reading_ja: 'チョチュルサン' },
  '어민':          { definition_ja: '漁民・漁業者',                       example_ja: '漁民たちは沖合風力発電所の建設に強く反対した。',       reading_ja: 'オミン' },
  '생계':          { definition_ja: '生計・暮らし',                       example_ja: '多くの沿海住民は海に依存して生計を立てている。',       reading_ja: 'センゲ' },
  '정책':          { definition_ja: '政策',                               example_ja: '新政府はエネルギー政策を大幅に変えた。',               reading_ja: 'チョンチェク' },
  '전환기':        { definition_ja: '転換期・過渡期',                     example_ja: 'BTSは現在重要な転換期を迎えている。',                 reading_ja: 'チョンファンギ' },
  '병역 의무':     { definition_ja: '兵役義務',                           example_ja: '韓国の男性は兵役義務を果たさなければならない。',       reading_ja: 'ピョンニョク ウィム' },
  '공백':          { definition_ja: '空白・空き期間・ブランク',           example_ja: 'グループの活動休止でファンは失望感を感じた。',         reading_ja: 'コンベク' },
  '지속 가능성':   { definition_ja: '持続可能性',                         example_ja: 'K-POPシステムの持続可能性についての議論が高まっている。', reading_ja: 'チソク カヌンソン' },
  '확산':          { definition_ja: '拡散・普及',                         example_ja: '韓流の拡散が世界中で続いている。',                   reading_ja: 'ファクサン' },
  '문화 수출국':   { definition_ja: '文化輸出国',                         example_ja: '韓国は世界屈指の文化輸出国だ。',                     reading_ja: 'ムンファ スチュルグク' },
  '역동적':        { definition_ja: 'ダイナミックな・活気ある',           example_ja: '韓国文化は非常にダイナミックだ。',                   reading_ja: 'ヨクトンジョク' },
  '진입점':        { definition_ja: '入り口・エントリーポイント',         example_ja: 'ドラマは韓国文化への良い入り口だ。',                  reading_ja: 'チニプチョム' },
  '중심지':        { definition_ja: '中心地',                             example_ja: 'ソウルはグローバルメディアの中心地になった。',          reading_ja: 'チュンシムジ' },
  '삼겹살':        { definition_ja: 'サムギョプサル（豚バラ肉）',         example_ja: 'サムギョプサルは韓国人に最も愛されている肉の一つだ。', reading_ja: 'サムギョプサル' },
  '불고기':        { definition_ja: 'プルコギ（甘口の焼き肉）',           example_ja: 'プルコギは甘い醤油タレで作られ外国人にも人気が高い。', reading_ja: 'プルゴギ' },
  '재외 한인':     { definition_ja: '在外韓国人',                         example_ja: '在外韓国人は海外で韓国文化を広める重要な役割を担っている。', reading_ja: 'チェウェ ハニン' },
  '외모 관리':     { definition_ja: '外見管理・美容管理',                 example_ja: '韓国では外見管理が就職活動の準備の一環と見なされることもある。', reading_ja: 'ウェモ クァルリ' },
  '과소비':        { definition_ja: '過消費・消費しすぎ',                 example_ja: 'ファストファッションは過消費を助長すると批判されている。', reading_ja: 'クァソビ' },
  '수험생':        { definition_ja: '受験生',                             example_ja: '受験生は試験前夜にしっかり睡眠をとることが大切だ。',   reading_ja: 'スホムセン' },
  '둔화':          { definition_ja: '鈍化・減速',                         example_ja: '経済成長の鈍化が懸念されている。',                   reading_ja: 'トゥンファ' },
  '성장률':        { definition_ja: '成長率',                             example_ja: '今年の韓国の経済成長率は約1%だ。',                   reading_ja: 'ソンジャンニュル' },
  '연차':          { definition_ja: '年次有給休暇',                       example_ja: '多くの韓国のオフィスワーカーは有給休暇を全部使えないことが多い。', reading_ja: 'ヨンチャ' },
  '저비용항공사':  { definition_ja: '格安航空会社（LCC）',                example_ja: '格安航空会社のおかげでより多くの人が海外旅行を楽しめるようになった。', reading_ja: 'チョビヨン ハンゴンサ' },
  '안전 규제':     { definition_ja: '安全規制',                           example_ja: '事故後、航空会社の安全規制がさらに強化された。',       reading_ja: 'アンジョン キュジェ' },
  '여론':          { definition_ja: '世論',                               example_ja: '事故のニュースが広まると航空会社への世論は急速に否定的になった。', reading_ja: 'ヨロン' },
  '인공지능':      { definition_ja: '人工知能（AI）',                     example_ja: '最近多くの企業が製品に人工知能技術を取り入れている。', reading_ja: 'インゴンジヌン' },
  '개인정보':      { definition_ja: '個人情報・プライバシーデータ',       example_ja: 'アプリをインストールする際は個人情報ポリシーをよく確認しよう。', reading_ja: 'ケインジョンボ' },
  '편의':          { definition_ja: '便利・利便性',                       example_ja: 'この機能はユーザーの利便性のために開発された。',       reading_ja: 'ピョニ' },
  '기술':          { definition_ja: '技術・テクノロジー',                 example_ja: '韓国は半導体技術の分野で世界をリードしている。',       reading_ja: 'キスル' },
  '취재진':        { definition_ja: '取材陣・報道チーム',                 example_ja: '韓国の取材陣は北朝鮮での試合の取材への立ち入りを拒否された。', reading_ja: 'チュィジェジン' },
  '경색':          { definition_ja: '硬直化・行き詰まり',                 example_ja: '南北関係は現在深刻な行き詰まり状態にある。',           reading_ja: 'キョンセク' },
  '회식':          { definition_ja: '会食（職場の飲み会）',               example_ja: 'チームリーダーが今日会食を提案し、断りにくかった。',   reading_ja: 'フェシク' },
  '배달':          { definition_ja: 'デリバリー・配達',                   example_ja: '最近はデリバリーアプリを通じて料理を注文する人が多い。', reading_ja: 'ペダル' },
  '저도수':        { definition_ja: '低アルコール（飲料）',               example_ja: '健康上の理由から低アルコール飲料に切り替える人が増えている。', reading_ja: 'チョドス' },
  '지방선거':      { definition_ja: '地方選挙',                           example_ja: '地方選挙は全国で4年ごとに同時に実施される。',          reading_ja: 'チバンソンゴ' },
  '유권자':        { definition_ja: '有権者',                             example_ja: 'この選挙で有権者は多様な選択をした。',                 reading_ja: 'ユクォンジャ' },
  '에너지 안보':   { definition_ja: 'エネルギー安全保障',                 example_ja: 'エネルギー安全保障は現代国家が直面する重要な課題の一つだ。', reading_ja: 'エノジ アンボ' },
  '정권 교체':     { definition_ja: '政権交代',                           example_ja: '政権交代後、エネルギー政策の方向性が大きく変わった。', reading_ja: 'チョンクォン キョチェ' },
  '군 복무':       { definition_ja: '兵役・軍務',                         example_ja: 'BTSのメンバーは一人ずつ兵役を完了している。',          reading_ja: 'クン ポンム' },
  '활동 공백':     { definition_ja: '活動休止期間・ブランク',             example_ja: '長い休止期間の後、グループは新しいアルバムをリリースした。', reading_ja: 'ファルトン コンベク' },
  '독립 음악':     { definition_ja: 'インディーズ音楽',                   example_ja: '最近インディーズのアーティストたちがSNSを通じてファンを集めている。', reading_ja: 'トンニプ ウマク' },
  '소프트파워':    { definition_ja: 'ソフトパワー',                       example_ja: '政府は韓流を重要なソフトパワーの資源と見ている。',     reading_ja: 'ソプトゥパウォ' },
  '신조어':        { definition_ja: '新造語・ネオロジズム',               example_ja: 'ネットから生まれた新造語が日常言語に急速に普及している。', reading_ja: 'シンジョオ' },
  '압박감':        { definition_ja: 'プレッシャー・重圧感',               example_ja: '多くの若者が就職や外見についてプレッシャーを感じている。', reading_ja: 'アプパクカム' },
  '높임말':        { definition_ja: '敬語・尊敬表現',                     example_ja: '敬語の使い方は若い世代の間で徐々に変わっている。',     reading_ja: 'ノピムマル' },
  '물가 상승':     { definition_ja: '物価上昇・インフレ',                 example_ja: '最近の物価上昇で外食費が大幅に上がった。',            reading_ja: 'ムルガ サンスン' },
  '정체성':        { definition_ja: 'アイデンティティ・独自性',           example_ja: '食べ物は国の文化的アイデンティティを反映する重要な要素だ。', reading_ja: 'チョンチェソン' },
  '자영업자':      { definition_ja: '自営業者・小規模事業主',             example_ja: '多くの自営業者は原材料費の上昇で苦しんでいる。',       reading_ja: 'チャヨンオプチャ' },
  '독창성':        { definition_ja: '独創性・オリジナリティ',             example_ja: 'このブランドは独創性で有名だ。',                     reading_ja: 'トクチャンソン' },
  '강세':          { definition_ja: '強い勢い・好調',                     example_ja: 'K-BEAUTYの市場は好調を維持し続けている。',           reading_ja: 'カンセ' },
  '광채':          { definition_ja: '輝き・ツヤ・ラジアンス',             example_ja: 'K-BEAUTYは肌の輝きを非常に重視する。',              reading_ja: 'クァンチェ' },
  '주목하다':      { definition_ja: '注目する・注視する',                 example_ja: '海外メディアが韓国ブランドに注目している。',           reading_ja: 'チュモカダ' },
  '문화적 뿌리':   { definition_ja: '文化的ルーツ・文化的な根',           example_ja: 'このデザインは韓国の文化的ルーツからインスピレーションを得た。', reading_ja: 'ムンファジョク プリ' },
  '암기':          { definition_ja: '暗記・丸暗記',                       example_ja: '試験対策だけの暗記中心の勉強法では創造性を育みにくい。', reading_ja: 'アムギ' },
  '체감 경기':     { definition_ja: '体感景気（実感する景気）',           example_ja: '輸出が増えても市民の体感景気はまだ悪い。',            reading_ja: 'チェガム キョンギ' },
};

function escapeSQL(str) {
  return str.replace(/'/g, "''");
}

function buildVocabWithJa(vocab) {
  return vocab.map(v => {
    const ja = JA[v.word];
    if (!ja) {
      console.warn(`  [WARN] No JA translation for word: "${v.word}"`);
      return { ...v, definition_ja: '（要確認）', example_ja: '（要確認）', reading_ja: '' };
    }
    return { ...v, definition_ja: ja.definition_ja, example_ja: ja.example_ja, reading_ja: ja.reading_ja };
  });
}

async function fetchArticles() {
  let all = [];
  let from = 0;
  const pageSize = 100;
  while (true) {
    const { data, error } = await supabase
      .from('articles')
      .select('id, title_en, vocabulary')
      .range(from, from + pageSize - 1);
    if (error) throw new Error(`Supabase fetch error: ${error.message}`);
    if (!data || data.length === 0) break;
    all = all.concat(data);
    if (data.length < pageSize) break;
    from += pageSize;
  }
  return all;
}

async function main() {
  console.log('Fetching articles from Supabase…');
  const data = await fetchArticles();
  const eligible = data.filter(a => {
    let v = a.vocabulary;
    if (typeof v === 'string') { try { v = JSON.parse(v); } catch (_) { v = []; } }
    return Array.isArray(v) && v.length > 0;
  }).map(a => {
    let v = a.vocabulary;
    if (typeof v === 'string') v = JSON.parse(v);
    return { ...a, vocabulary: v };
  });

  const lines = [
    '# Article Vocabulary — Japanese Fields (definition_ja + example_ja + reading_ja)',
    '',
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    '',
    'Adds `definition_ja`, `example_ja`, and `reading_ja` to every vocabulary item for all articles.',
    'Copy the entire SQL block and paste it into the Supabase SQL editor, then click Run.',
    '',
    '---',
    '',
    '```sql',
  ];

  let missing = 0;
  for (const a of eligible) {
    const updated = buildVocabWithJa(a.vocabulary);
    missing += updated.filter(v => v.definition_ja === '（要確認）').length;
    const jsonStr = escapeSQL(JSON.stringify(updated));
    lines.push(
      `-- ${a.title_en}`,
      `UPDATE articles SET vocabulary = '${jsonStr}'::jsonb WHERE id = '${a.id}';`,
      '',
    );
  }

  lines.push('```');

  const out = join(__dir, '..', 'docs', 'article-vocabulary-ja.md');
  writeFileSync(out, lines.join('\n'), 'utf8');
  console.log(`Done! SQL written to: ${out}`);
  console.log(`Articles: ${eligible.length} | Words needing review: ${missing}`);
}

main().catch(e => { console.error(e); process.exit(1); });
