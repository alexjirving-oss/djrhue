# SEO — DJ RHUE (djrhue.com)

On-page and technical SEO is implemented in the site. This checklist covers what **Rhue must do externally** to rank for Bristol DJ hire, Afrobeats/Dancehall bookings and Malta enquiries.

## Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console) → **Add property** → `https://djrhue.com`
2. Choose **HTML tag** verification
3. Paste the meta tag Google gives you into `index.html` `<head>` — replace the placeholder comment:
   ```html
   <!-- GSC: paste verification meta tag from Search Console here -->
   ```
4. Deploy, then click **Verify** in Search Console
5. Submit sitemap: `https://djrhue.com/sitemap.xml`
6. Request indexing for `/`, `/book/`, and `/rates/`

## Google Business Profile (Bristol)

Create or claim a profile for **DJ RHUE** as a service-area business:

- [ ] Business name: **DJ RHUE** (no keyword stuffing)
- [ ] Category: **DJ** (secondary: **Entertainment Agency** if needed)
- [ ] Service area: Bristol + South West + UK-wide travel
- [ ] Phone: 07305 940 902
- [ ] Website: https://djrhue.com
- [ ] Hours: By appointment
- [ ] Description: Afrobeats, Dancehall, Amapiano & Caribbean DJ — clubs, weddings, corporate & Malta bookings
- [ ] Photos: upload 5–10 from `public/photos/` (carnival, club, press)
- [ ] Services: Club DJ, Wedding DJ, Corporate events, Festival DJ, Equipment hire
- [ ] Posts: monthly — new mix, carnival season, Malta dates
- [ ] Ask happy clients for **real** Google reviews (never fake)

## Directory submissions (Bristol & UK music/DJ)

Submit consistent NAP (name, address, phone) and link to https://djrhue.com:

| Directory | URL | Notes |
|-----------|-----|-------|
| Yelp UK | https://www.yelp.co.uk | Bristol DJ / entertainment |
| Thomson Local | https://www.thomsonlocal.com | Bristol area |
| FreeIndex | https://www.freeindex.co.uk | DJ services |
| Bark | https://www.bark.com | DJ hire enquiries |
| Hitched | https://www.hitched.co.uk | Wedding DJ Bristol |
| Guides for Brides | https://www.guidesforbrides.co.uk | Caribbean/wedding angle |
| GigSalad UK | https://www.gigsalad.com | Event DJ profile |
| Last Minute Musicians | https://www.lastminutemusicians.com | Bristol DJ |
| FixTheMusic | https://www.fixthemusic.com | Wedding & private events |
| Ents24 | https://www.ents24.com | Live entertainment listing |
| Mixcloud (profile) | https://www.mixcloud.com/DJRHUE/ | Already live — keep bio updated with Bristol + link |
| Instagram bio | https://www.instagram.com/dj_rhue/ | Link to djrhue.com, location Bristol |

## Social & off-page (ongoing)

- Tag venues and events in Instagram posts (St Paul's Carnival, Malta clubs, Bristol venues)
- Share YouTube mixes with Bristol/Malta in titles and descriptions
- Get listed on event pages where you perform (carnival programmes, venue websites)
- Pitch local Bristol blogs and event listings for carnival/festival season

## What the site already ships

- Visible H1, FAQ section, local keyword prose (About)
- JSON-LD: Person, MusicGroup, ProfessionalService, FAQPage, BreadcrumbList, VideoObject, ImageGallery
- `robots.txt`, image sitemap, `/book/` and `/rates/` crawlable redirect pages
- Compressed gallery photos, lazy-loaded below-fold images, font/YouTube preconnect
- `public/_headers` for CDN hosts (GitHub Pages does not apply custom cache headers natively)

## Maintenance

- Update `sitemap.xml` `<lastmod>` when making meaningful content changes
- Re-run `python scripts/compress_photos.py` after adding new photos to `public/photos/`
- Keep rates and EPK PDFs in sync with live pricing on site
