# SEO setup — Google Search Console

The site is prerendered at build time so crawlers receive full page HTML (Hero, About, Rates, FAQ, etc.) without executing JavaScript. Meta tags and sitemap alone are not enough — you must verify the domain and submit the sitemap in Search Console.

## 1. Verify domain ownership (~2 min)

1. Open [Google Search Console](https://search.google.com/search-console).
2. Click **Add property** → choose **Domain** → enter `djrhue.com`.
3. Google shows a DNS TXT record. Add it at your domain registrar (where you bought djrhue.com).
4. Wait for verification (often minutes; DNS can take up to 24h).

**Alternative (HTML tag):** If you prefer the meta-tag method instead of DNS:

1. In Search Console, choose **URL prefix** → `https://djrhue.com/`.
2. Copy the verification meta tag Google gives you.
3. Uncomment and paste it in `index.html` (search for `google-site-verification`).
4. Deploy, then click **Verify** in Search Console.

> Search Console cannot be completed from the CLI — use a browser. The `gh` CLI does not support this step.

## 2. Submit sitemap (~1 min)

1. In Search Console, open your property.
2. Go to **Sitemaps** (left sidebar).
3. Enter: `https://djrhue.com/sitemap.xml`
4. Click **Submit**.

Having `sitemap.xml` on the server does **not** auto-register it with Google. Submission here is required.

## 3. Request indexing for homepage (~1 min)

1. In Search Console, use **URL inspection** (top search bar).
2. Enter: `https://djrhue.com/`
3. Click **Test live URL** (optional — confirms Google sees prerendered content).
4. Click **Request indexing**.

Repeat for `/book/` and `/rates/` if you want those URLs indexed separately (they redirect to hash sections but have their own canonical URLs).

## 4. Confirm no blockers

| Check | Status |
| --- | --- |
| `robots.txt` allows all | `Allow: /` at [djrhue.com/robots.txt](https://djrhue.com/robots.txt) |
| No `noindex` meta | None in source |
| Canonical homepage | `https://djrhue.com/` in `<link rel="canonical">` |
| Crawlable body text | Build runs `scripts/prerender.mjs` — view source on live site should show "DJ RHUE", "Bristol", "Afrobeats" inside `#root` |

## 5. Optional: sitemap ping on deploy

The deploy workflow pings Google's sitemap endpoint after each production deploy. This is a supplementary nudge — **Search Console submission (step 2) remains required.**

## Verify prerender locally

```bash
npm run build
# Windows PowerShell:
Select-String -Path dist/index.html -Pattern "DJ RHUE","Bristol","Afrobeats"
# Or open dist/index.html in an editor and search inside <div id="root">
```

You should see full section markup, not an empty `<div id="root"></div>`.
