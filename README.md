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

## Booking form (Formspree)

The booking form submits via [Formspree](https://formspree.io) when configured. Without it, submissions fall back to `mailto:`.

1. Create a form at [formspree.io](https://formspree.io) for `booking.djrhue@gmail.com` and copy its endpoint URL (e.g. `https://formspree.io/f/xxxxxxxx`).
2. **GitHub Pages (this repo):** In the GitHub repository, go to **Settings → Secrets and variables → Actions**, add a repository secret named `VITE_FORM_ENDPOINT` with that URL. The deploy workflow passes it into `npm run build` on every push to `main`.
3. **Local dev:** Copy `.env.example` to `.env.local` and set the same variable, then `npm run dev`.

## Brand

From the official media pack:

- Black `#0d0d0d`
- White `#f5f5f5`
- Gold `#f6c64a`

Bookings: `booking.djrhue@gmail.com` · `07305 940 902` · [@DJ_RHUE](https://instagram.com/dj_rhue)
