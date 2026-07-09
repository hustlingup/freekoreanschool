require('dotenv').config({ path: __dirname + '/.env' });
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

const LANGS = ['zh_tw', 'es', 'de', 'fr', 'vi', 'th', 'id'];

(async () => {
  const { data, error } = await sb
    .from('articles')
    .select('*')
    .order('published_at', { ascending: true });
  if (error) throw error;

  const rows = data
    .map((a) => {
      const missing = LANGS.filter(
        (l) => !a['content_' + l] || !a['title_' + l] || !a['summary_' + l]
      );
      return { a, missing };
    })
    .filter((r) => r.missing.length > 0)
    .map(({ a, missing }) => ({
      slug: a.slug,
      missing_langs: missing,
      title_en: a.title_en,
      summary_en: a.summary_en,
      content_en: a.content_en,
      title_ko: a.title_ko,
      content_ko: a.content_ko,
      title_ja: a.title_ja,
      content_ja: a.content_ja,
      vocabulary: a.vocabulary,
    }));

  fs.writeFileSync(
    'docs/articles-to-translate.json',
    JSON.stringify(rows, null, 2)
  );
  console.log('dumped', rows.length, 'articles needing translation');
})();
