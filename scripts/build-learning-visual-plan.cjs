'use strict';
const fs=require('fs'),path=require('path'),cheerio=require('cheerio');
const root=path.resolve(__dirname,'..');
const read=p=>cheerio.load(fs.readFileSync(path.join(root,p),'utf8'));
const dir=path.join(root,'docs/learning-visuals');fs.mkdirSync(dir,{recursive:true});
const dest=path.join(dir,'manifest.json');
const previous=fs.existsSync(dest)?JSON.parse(fs.readFileSync(dest)).assets:[];
const assets=[];
const style='Use case: scientific-educational. Asset type: detailed Korean language textbook illustration, landscape 4:3. Professional realistic editorial illustration with clear forms, natural materials, soft daylight and restrained colors. One coherent composition; enough detail to recognize the subject at a small card size. No typography, letters, numbers, labels, logos, watermarks or decorative border. No invented cultural symbols. Keep the whole teaching subject inside the frame with comfortable margins. Labels will be supplied separately as accessible HTML.';
function add(id,subject,detail,placement,reason){assets.push({id,subject,prompt:style+' Primary teaching subject: '+subject+'. '+detail,reason,placements:[placement],path:'assets/images/learning-visuals/'+id+'.webp',storagePath:'learning-visuals/'+id+'.webp',status:'planned',...previous.find(a=>a.id===id)});}
const include={
 'food-drink':null,'places':null,'emotions':['행복해요','슬퍼요','화나요','무서워요','기뻐요','걱정돼요','부끄러워요','놀랐어요','외로워요','피곤해요'],
 'body-parts':['머리','얼굴','눈','코','입','귀','목','어깨','팔','손','손가락','배','등','다리','발','이'],
 'travel':['여행','비행기','여권','짐','예약','입국','환전','관광','지도','길'],
 'shopping':['쇼핑','영수증','카드','시장','백화점','면세점','포장'],
 'weather':['맑다','흐리다','비','눈','바람','더워요','추워요','따뜻해요','시원해요','봄','여름','가을','겨울'],
 'verbs':['먹다','마시다','보다','듣다','말하다','읽다','쓰다','사다','팔다','공부하다','일하다','자다','만나다'],
 'workplace':['직장','회사','동료','회의','보고서','이메일','야근','휴가','명함','발표'],
 'academic':['학교','대학교','선생님','학생','교실','책','도서관','시험','숙제','강의','졸업'],
 'konglish':['스마트폰','컴퓨터','아이스크림','아파트','핸드폰','원피스','바지','셀카','노트북','에어컨','리모컨','핫도그'],
 'media':['영화','음악','가수','배우','콘서트','뮤직비디오','오디션']
};
const specific={
 '밥':'A small white ceramic bowl heaped with cooked short-grain white rice; distinct soft glossy grains, simple tabletop.',
 '김치':'Napa cabbage kimchi on a small white side-dish plate: layered pale ribs with orange-red pepper seasoning, cut bite-size.',
 '비빔밥':'Top-down view of a Korean rice bowl, separate arranged vegetable strips, beef, a fried egg and red gochujang; rice visible beneath.',
 '불고기':'Thin marinated beef slices with onion and scallion, browned and juicy; no thick steak.',
 '삼겹살':'Grilled boneless pork belly strips with alternating meat and fat layers, lettuce, sliced garlic and ssamjang alongside.',
 '된장찌개':'Korean soybean-paste stew in a black earthenware pot: brown broth, tofu cubes, zucchini and onion.',
 '순두부':'A black earthenware pot of red Korean soft-tofu stew, with unmistakably soft irregular tofu curds and an egg. Illustrate the stew sense used in this lesson.',
 '떡볶이':'Smooth short cylindrical rice cakes in thick glossy red sauce, with folded fish-cake slices. No pasta.',
 '라면':'Curly instant noodles in reddish Korean broth with scallion and egg in a simple bowl; no Japanese-style pork topping.',
 '핫도그':'A Korean street-food corn dog on a wooden stick: crisp golden battered sausage, one cut section showing sausage. No bread bun.',
 '녹차':'Pale green tea in a small ceramic cup, with a few dry green tea leaves beside it.',
 '소주':'An unbranded plain green soju bottle with two small clear shot glasses. No people drinking.',
 '눈':'Use the meaning for this category only: a natural human eye for body-parts, falling snow outdoors for weather. Never combine the two senses.',
 '배':'Body-part sense only: an adult torso in a plain shirt, one hand indicating the abdomen. No boat or pear.',
 '다리':'Body-part sense only: one anatomically natural leg from hip to ankle, clothed shorts; no bridge.',
 '이':'One clean anatomically plausible human molar tooth, simplified educational surface view, no roots cutaway or medical claims.',
 '명함':'Two adult professionals exchanging one business card respectfully using both hands at chest level; card face blank, clear hand positions.',
 '여권':'An unbranded closed dark passport booklet and a suitcase handle; no legible personal information, seal or fabricated official document.',
 '카드':'A generic plain contactless payment card held near a checkout terminal; no numbers, bank brand or personal information.',
 '입국':'A traveler showing a closed passport to an immigration officer across an airport counter; schematic fictional setting, no official seal.',
 '지도':'An unfolded paper street map with simple unlabeled road lines, river and blocks. Clearly illustrative; no real navigation instructions.',
 '환전':'A traveler at a currency exchange counter exchanging generic simplified banknotes with a clerk; no realistic currency reproduction.',
 '영수증':'A hand receiving a narrow receipt from a shop receipt printer; blank pale gray lines only, no text.',
 '보고서':'A neatly bound report on an office desk with abstract chart shapes and blank text rules; no readable text.',
 '이메일':'An adult drafting a message on a laptop, screen shows a generic envelope and blank composition area, no readable words.'
};
const q=read('learn/vocabulary.html');
q('#lesson-static .ls-stage').each((_,s)=>{const section=q(s).attr('id'),cat=section.replace(/^vocab-/,'').replace(/-section-\d+$/,'');if(!(cat in include))return;
 q(s).find('.ls-table tbody tr').each((i,tr)=>{const cells=q(tr).children('td'),ko=cells.eq(0).find('[lang="ko"]').text().trim(),meaning=cells.eq(2).text().trim(),rom=cells.eq(1).text().trim();if(include[cat]&&!include[cat].includes(ko))return;
 let detail=specific[ko]||'Illustrate exactly this sense: '+meaning.split(' — ')[0]+'.';
 if(cat==='body-parts')detail+=' Human external body-part study: focus on '+meaning.split(' / ')[0]+', natural adult anatomy, neutral nonsexual framing, no internal anatomy. Surrounding body muted so the target is clear.';
 if(cat==='emotions')detail+=' One adult in an everyday context clearly expressing this emotion through face and posture, nuanced and respectful, not an emoji.';
 if(['verbs','workplace','academic','media'].includes(cat))detail+=' Show the action or object clearly in a plausible contemporary Korean everyday setting, with minimal background clutter and natural anatomy.';
 if(cat==='weather')detail+=' Outdoor Korean neighborhood or park in the stated season/weather, physically consistent light and clothing.';
 if(cat==='food-drink')detail+=' Authentic Korean serving style, appetizing natural food textures, no unrelated dishes.';
 const id='vocab-'+cat+'-'+String(i+1).padStart(2,'0');add(id,ko+' — '+meaning,detail,{page:'learn/vocabulary.html',section,korean:ko,romanization:rom,meaning,kind:'word'},'Makes the concrete word or situation recognizable without relying only on translation.');
 });
});
const nouns=read('learn/nouns.html');nouns('.ls-table tbody tr').each((_,tr)=>{const cells=nouns(tr).children('td'),ko=cells.eq(0).find('[lang="ko"]').text().trim();if(ko!=='가방')return;add('noun-backpack','가방 — bag / backpack','One navy fabric school backpack standing upright, two shoulder straps, carry loop, main zipped compartment and front zipped pocket, stitching, warm white studio background.',{page:'learn/nouns.html',section:nouns(tr).closest('.ls-stage').attr('id'),korean:ko,meaning:cells.eq(2).text(),kind:'word'},'Identifies an everyday object used in the noun and particle examples.');});
const cities=read('travel/cities.html');cities('.city-attraction-card').each((i,el)=>{const title=cities(el).find('.city-attraction-name').text().trim(),english=cities(el).find('.city-attraction-eng').text().trim(),city=cities(el).closest('.lesson-section').attr('id');add('travel-'+city+'-'+String(i+1).padStart(2,'0'),title+' — '+english+' in '+city+', South Korea','Recognizable educational illustration of this real place or cultural activity. Respect the actual architecture, terrain, materials and Korean context. Ground-level or landscape viewpoint appropriate to recognition, no composite skyline, no invented buildings. This will be labelled as an illustration, not a documentary photograph. No operating hours, access status, routes or travel advice in image.',{page:'travel/cities.html',selector:'.city-attraction-card',index:i,korean:title,meaning:english,kind:'attraction'},'Shows what the named attraction looks like so travelers can distinguish destinations.');});
const scenes={introductions:'Two adults meeting for the first time at a language class, making small polite bows, friendly eye contact.',friends:'Two adult friends chatting casually on a park bench.',invitations:'One adult inviting a friend to join a small cafe table, open hand indicating the empty chair.',family:'An adult describing a framed family photograph to a friend; the photo clearly contains several generations.',shopping:'A customer politely asking a shop assistant about a plain shirt on a clothing rack.',date:'Two adults on a cafe date talking across a small table with two drinks.',work:'Two adult colleagues discussing a document together at an office desk.',school:'A teacher and adult language learner talking in a classroom with a blank whiteboard.',food:'A seated diner politely ordering a Korean meal from a restaurant server, menu closed on table.',health:'An adult patient describing a sore throat to a clinician in an ordinary consultation room; no treatment or procedure.',transportation:'A traveler asking a station employee for directions on a subway concourse, open palm pointing toward platform stairs.'};
for(const [section,scene] of Object.entries(scenes))add('dialogue-'+section,section+' conversation',scene+' Clear roles, natural body language, contemporary South Korea. No speech bubbles.',{page:'learn/dialogues.html',section,kind:'scene'},'Gives the dialogue a visible setting and clarifies the speakers’ roles.');
const transport=read('travel/index.html');transport('.transport-card').each((i,e)=>{const ko=transport(e).find('.transport-name-kor').text().trim(),en=transport(e).find('.transport-name-eng').text().trim();add('transport-'+(i+1),ko+' — '+en,'Show this mode of public transport in contemporary South Korea, recognizable vehicle and boarding environment. No route numbers, ticket prices, invented logos or geographic directions.',{page:'travel/index.html',selector:'.transport-card',index:i,korean:ko,meaning:en,kind:'transport'},'Helps travelers distinguish transport modes.');});
for(const [id,subject,detail] of [['transit-tap','Tap a transit card','Close view of one hand holding a generic transit card flat just above a subway gate reader in a Korean station. Clear reader and gate, no branding or balance numbers.'],['shoes-off','Remove shoes before entering','Korean home entryway with outdoor shoes neatly placed on the lower tiled entrance floor and socked feet stepping up onto the raised clean interior floor. Make the floor-level distinction clear.']])add(id,subject,detail,{page:'travel/itineraries.html',section:id==='transit-tap'?'1day':'1month',kind:'scene'},'Explains an unfamiliar practical action with a concrete visual example.');
const inventory=[];for(const area of ['learn','travel'])for(const file of fs.readdirSync(path.join(root,area)).filter(f=>f.endsWith('.html'))){const page=area+'/'+file,h=read(page);inventory.push({page,existingImages:h('main img').length,sections:h('main h2').map((_,e)=>h(e).text().trim()).get(),plannedAssets:assets.filter(a=>a.placements.some(p=>p.page===page)).length,note:/hangul|syllable|letter-writing|pronunciation|typing|grammar|pronouns|writing-essays/.test(file)?'Use precise HTML/SVG teaching diagrams for letter shape, stroke order, sound and grammar; avoid generated lettering. Add raster illustrations only where a concrete example aids comprehension.':file==='planner.html'?'Keep the interactive planner compact; do not add decorative images to every time block.':'Illustrate concrete words, situations and destinations alongside the corresponding content.'});}
fs.writeFileSync(dest,JSON.stringify({version:1,generationMode:'built-in image_gen',created:'2026-10-02',assets},null,2)+'\n');
fs.writeFileSync(path.join(dir,'page-audit.json'),JSON.stringify(inventory,null,2)+'\n');
console.log(JSON.stringify({assets:assets.length,learn:assets.filter(a=>a.id!=='x'&&a.placements[0].page.startsWith('learn')).length,travel:assets.filter(a=>a.placements[0].page.startsWith('travel')).length,pages:inventory.length}));
