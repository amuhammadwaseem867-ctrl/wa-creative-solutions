# WA Creative Solution — website

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Three.js / React Three Fiber · Framer Motion. Typography: Montserrat (headings) + Poppins (body).

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Cinematic 3D hero, services, selected work, process, pricing preview, CTA |
| `/services` | Expandable service catalogue with per-service quote links (`/services#ai` deep-links) |
| `/work`, `/work/[slug]` | Filterable portfolio and statically generated case studies |
| `/pricing` | Packages, comparison, estimator → quote request, FAQ |
| `/about`, `/contact` | Philosophy, capabilities, brand mark; project brief form |
| `/privacy`, `/terms` | **Templates**: review and adapt before relying on them |
| `/admin` | Existing AI-chat admin dashboard (unchanged) |

## Where to edit content

Everything editable lives in `lib/`. Change it there and the UI updates, with no redesign needed.

- `lib/site.ts`: brand name, tagline, **contact details, social links**, navigation. `contact.whatsapp` is `null` until a number is confirmed.
- `lib/pricing.ts`: **package prices**, inclusions, comparison table, exclusions and revision policy, plus all **estimator rules** (base prices, per-unit rates, complexity multipliers, add-ons, maintenance, range factor).
- `lib/estimate.ts`: the pure calculation used by the estimator.
- `lib/services.ts`, `lib/process.ts`, `lib/faq.ts`: service catalogue, process stages, FAQ.
- `lib/projects.ts`: portfolio. All current entries are **concept projects** (`concept: true`). For real client work, set `concept: false` and fill `client`.
- `lib/testimonials.ts`: verified testimonials only. While it is empty, the site shows process-based trust signals instead.
- `lib/brand.ts`: monogram geometry shared by the SVG logo, favicon, OG image and the 3D sculpture.

## Brand assets

`public/brand/`: horizontal logo and monogram in accent / white / black / red, square icon, social profile image (SVG + PNG). The horizontal SVG wordmark uses live text (Montserrat / Poppins); convert it to outlines for print. Favicon: `app/favicon.ico` + `app/icon.svg`; Apple icon and Open Graph image are generated at build time.

## Environment variables

See `.env.example`. All secrets are read only on the server.

- **Inquiry form** (`/api/contact`): `RESEND_API_KEY`, `CONTACT_EMAIL`, `FROM_EMAIL` (a sender on a domain verified in Resend). Until these are set, the form shows an honest "not connected" error with the email fallback; it never reports a fake success. Spam protection: honeypot field, minimum fill time and per-IP rate limit (in-memory; use a shared store for multi-instance hosting).
- **AI chat / admin** (existing): `DATABASE_URL`, `OLLAMA_API_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`.
- `NEXT_PUBLIC_SITE_URL`: canonical domain for metadata and the sitemap.

## 3D & performance notes

The hero sculpture (`components/three/`) loads only after the page is idle, through `next/dynamic` with `ssr: false`. It renders a static SVG fallback first, and keeps that fallback when WebGL is missing, on low-memory or low-core devices, or with Save-Data. Rendering pauses off-screen and in hidden tabs. Quality drops on mobile and weaker devices, and `prefers-reduced-motion` shows a still pose. The canvas never captures pointer events.
