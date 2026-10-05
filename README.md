# SNP site

React 18 + Vite + Tailwind CSS + SCSS. Static prerender (SSG) for en / ru / hy.

## Commands

    npm install
    cp .env.example .env
    npm run dev
    npm run build
    npm run lint

`npm run build` writes `dist/` with prerendered HTML for every route and language, plus `sitemap.xml` and `robots.txt`.

## Environment

- `VITE_SITE_URL` — public origin, used for canonical, hreflang, sitemap and robots
- `VITE_API_URL` — backend base URL for forms (`/requests`, `/subscriptions`, `/orders`, `/auth/login`, `/auth/register`)
- `VITE_CONTACT_PHONE`, `VITE_CONTACT_EMAIL` — contact details

## Structure

- `src/i18n/locales` — translations (en main, ru, hy)
- `src/data/products.js` — product catalog
- `src/config/routes.js` — indexable routes that feed prerender and sitemap
- `src/styles` — SCSS partials on top of Tailwind
- `scripts/prerender.mjs` — HTML, sitemap and robots generation
- `nginx.conf` — ready-made server config for `dist/`
