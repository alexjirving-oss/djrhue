# DJ RHUE

Booking site for [djrhue.com](https://djrhue.com) - Caribbean & Urban DJ based in Bristol, UK & Malta.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Booking form

The booking form sends enquiries via [Formspree](https://formspree.io) to `booking.djrhue@gmail.com`.

- **Endpoint:** `https://formspree.io/f/mzepjnra` (override with `VITE_FORM_ENDPOINT` if needed)
- **Format:** `FormData` POST — Formspree expects form fields, not JSON
- **Fallback:** If the form is not yet activated, the visitor’s email app opens with the enquiry pre-filled

## Brand

From the official media pack:

- Black `#0d0d0d`
- White `#f5f5f5`
- Gold `#f6c64a`

Bookings: `booking.djrhue@gmail.com` · `07305 940 902` · [@DJ_RHUE](https://instagram.com/dj_rhue)

## SEO & performance

- `public/robots.txt` and `public/sitemap.xml` are served at deploy — submit `https://djrhue.com/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).
- Gallery and hero photos are high-resolution JPEGs (often 1–3 MB each). For faster LCP and better Core Web Vitals, compress with [Squoosh](https://squoosh.app/) or `npx @squoosh/cli --mozjpeg auto` before replacing files in `public/photos/`. Target ~150–300 KB per image without visible quality loss.
