# DJ RHUE

Booking site for [djrhue.com](https://djrhue.com) — Caribbean & Urban DJ based in Bristol, UK & Malta.

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

## Booking form (Formspree)

The booking form submits via [Formspree](https://formspree.io) when configured. Without it, submissions fall back to `mailto:`.

1. Create a form at [formspree.io](https://formspree.io) for `booking.djrhue@gmail.com`
2. Copy `.env.example` to `.env.local` and set your endpoint:

```bash
VITE_FORM_ENDPOINT=https://formspree.io/f/fxxxxxxx
```

3. Rebuild and deploy. On Vite hosts (Netlify, Vercel, etc.), set `VITE_FORM_ENDPOINT` in the project environment variables.

## Brand

From the official media pack:

- Black `#0d0d0d`
- White `#f5f5f5`
- Gold `#f6c64a`

Bookings: `booking.djrhue@gmail.com` · `07305 940 902` · [@DJ_RHUE](https://instagram.com/dj_rhue)
