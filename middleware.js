/**
 * Vercel Routing Middleware — mainland-China (CN) block for the `zh-cn` locale.
 *
 * WHY THIS EXISTS
 * The Simplified-Chinese locale deliberately targets Simplified-Chinese readers
 * OUTSIDE mainland China (Singapore, Malaysia, the wider diaspora). AdSense does
 * not operate in mainland China, so mainland pageviews cannot be monetized. This
 * block matches ad-serving reality; it does not create a new constraint.
 *
 * WHAT IT DOES *NOT* DO — read before trusting it
 *   1. IP geolocation is best-effort. A VPN, a proxy, or a mis-attributed IP
 *      range bypasses it entirely. This is a signal, not a wall. Do not treat it
 *      as a compliance control.
 *   2. It blocks ACCESS, not INDEXING. Baidu, Sogou, Bing and any other crawler
 *      that fetches from a non-CN IP still receives the pages normally and may
 *      surface them in mainland search results. Nothing here prevents that. If
 *      the pages must also be kept out of a given index, that is a robots.txt /
 *      X-Robots-Tag decision, not a middleware one.
 *   3. It cannot see requests for static assets (css/, js/, learn/data/*.json),
 *      because those live outside the four matched prefixes. That is intentional
 *      — a blocked visitor never gets a page that would request them.
 *
 * IMPLEMENTATION NOTES
 * `request.geo` does NOT exist here. That property belongs to Next.js's
 * `NextRequest`; this is a framework-less ("Other" preset) project, so the
 * middleware receives a plain web `Request`, whose `.geo` is permanently
 * `undefined` — a `request.geo?.country === 'CN'` test would silently never
 * fire. The two supported options on this project shape are the
 * `geolocation(request)` helper from `@vercel/functions`, or reading the
 * `x-vercel-ip-country` request header that the helper itself parses.
 *
 * We read the header directly, on purpose: this repo has no root `package.json`
 * and no install step (`.vercelignore` excludes `scripts`, `package.json` and
 * `package-lock.json`), so there is nothing from which `@vercel/functions` could
 * be resolved at build time. A bare header read has zero dependencies and is the
 * same data source.
 *
 * ESM: `export default` with a `.js` extension is the proven pattern on this
 * project — `api/tts.js` already ships that way and runs in production without a
 * root `package.json`. If a future Vercel build ever rejects this file as CommonJS,
 * the fix is to rename it to `middleware.mjs`; do not add a root `package.json`,
 * which `.vercelignore` would strip from the deployment anyway.
 *
 * Docs verified 2026-08-12:
 *   https://vercel.com/docs/routing-middleware/api  (matcher syntax; the
 *   framework=other geolocation example uses `geolocation(request)`, and
 *   `request.geo` appears only in the Next.js variants)
 *   https://vercel.com/docs/headers/request-headers  (`x-vercel-ip-country`)
 */

// Only these four prefixes. The matcher is deliberately narrow: a broad matcher
// would route every request on the site through an edge function for no reason,
// add latency and cost to the other 14 locales, and put the English source and
// every existing locale behind code that has no business touching them.
export const config = {
  matcher: [
    // Bare locale roots. `cleanUrls: true` + `trailingSlash: false` serve
    // `zh-cn/index.html` at `/zh-cn`, so the root has no trailing segment for
    // `:path*` to absorb. Listed explicitly rather than relying on
    // path-to-regexp treating the delimiter as optional.
    '/zh-cn',
    '/culture/zh-cn',
    '/travel/zh-cn',
    '/learn/zh-cn',
    // Everything beneath them.
    '/zh-cn/:path*',
    '/culture/zh-cn/:path*',
    '/travel/zh-cn/:path*',
    '/learn/zh-cn/:path*',
  ],
};

// ISO 3166-1 alpha-2. Mainland China ONLY.
// Hong Kong (HK), Macau (MO) and Taiwan (TW) are separate codes and are NOT
// blocked — they are part of the intended audience. This must stay an exact
// equality test; any prefix or "starts with CN" logic would be wrong.
const BLOCKED_COUNTRY = 'CN';

export default function middleware(request) {
  // Populated by the Vercel Edge Network on every request. Absent when the
  // header cannot be determined (local `vercel dev`, unknown/unroutable IP).
  const country = request.headers.get('x-vercel-ip-country');

  // FAIL OPEN — this is deliberate, and it is what keeps crawling safe.
  // Googlebot crawls from US IPs (`x-vercel-ip-country: US`), so it takes this
  // branch and receives the page unmodified: indexing and AdSense crawling are
  // unaffected. Any request whose country is missing or is anything other than
  // CN also falls through untouched. Returning nothing (`undefined`) lets the
  // request continue to the static file, so the response is byte-identical to
  // one served with no middleware at all.
  if (country !== BLOCKED_COUNTRY) return;

  return new Response(BLOCKED_PAGE, {
    // 403, not 451. RFC 7725's 451 means "Unavailable For Legal Reasons"; no
    // legal demand is involved here. The refusal is commercial — the locale's
    // pageviews are unmonetizable in this market — and 403 ("the server
    // understood the request and refuses to authorize it") states that
    // accurately. A redirect to /zh-tw was rejected too: it would silently hand
    // a Simplified-Chinese reader Traditional-script content, which is a worse
    // experience than an explanation plus a link they can choose to follow.
    status: 403,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      // Never let a shared cache hold this response and replay it to a
      // non-CN visitor, or hold a 200 and replay it here.
      'cache-control': 'no-store, private',
      // NOTE: deliberately NO `X-Robots-Tag: noindex`. If this ever fired for a
      // crawler by mistake, a 403 is a transient, recoverable signal, whereas an
      // explicit noindex would actively de-index the locale. The safer failure
      // mode is the one that heals itself.
    },
  });
}

// Self-contained: no external CSS, fonts, scripts or images — the visitor being
// served this page is, by construction, on a network where much of that would
// not load anyway. Copy is in Simplified Chinese because that is the only
// audience that can receive it.
const BLOCKED_PAGE = `<!doctype html>
<html lang="zh-Hans">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>此版本暂不向您所在的地区提供</title>
<style>
  :root { color-scheme: dark; }
  body {
    margin: 0; min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0e0f13; color: #e7e9ee;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
                 "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
    line-height: 1.75; padding: 24px;
  }
  main { max-width: 34rem; }
  h1 { font-size: 1.5rem; margin: 0 0 1rem; color: #fff; }
  p { margin: 0 0 1rem; color: #b9bec9; }
  .accent { color: #E8003D; }
  ul { list-style: none; padding: 0; margin: 1.75rem 0 0; }
  li { margin-bottom: .6rem; }
  a { color: #fff; text-decoration: none; border-bottom: 1px solid #E8003D;
      padding-bottom: 2px; }
  a:hover { color: #E8003D; }
  small { display: block; margin-top: 2rem; color: #6c7280; font-size: .8rem; }
</style>
<main>
  <h1>此版本<span class="accent">暂不向</span>您所在的地区提供</h1>
  <p>本站的简体中文版面向中国大陆以外的简体中文读者。由于我们的广告服务无法在中国大陆运营，因此未在该地区提供此版本。</p>
  <p>这不是内容审查，也与您个人无关。网站的其他语言版本均可正常访问：</p>
  <ul>
    <li><a href="/zh-tw">繁體中文版 &rarr;</a></li>
    <li><a href="/">English &rarr;</a></li>
  </ul>
  <small>此判断依据访问来源 IP 的大致地理位置，可能存在误差。若您认为这是误判，请通过网站的联系页面告知我们。</small>
</main>
</html>`;
