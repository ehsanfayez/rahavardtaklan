## Project identity

- Project/company name: رهاورد تکلان (use this spelling provided by the company owner).
- Product: a Persian, RTL B2B catalog introducing automotive fuel-pump and fuel-level sender assemblies, with the exact product scope subject to company verification.
- Website purpose: introduce the company, show an approved catalog, and guide business buyers to contact sales. This is not a consumer retail store.

## Project references

- Primary requirements: `docs/references/Rahvard-B2B-Protocol.pdf`.
- Main visual reference: `docs/references/UI-Reference.png`.
- Both reference files are stored in the repository. Treat the PDF as the primary source for project requirements and the PNG as the primary visual reference for every website page. Do not use the screenshot as a page background or substitute for HTML UI.
- No Task 01 audit report file was found in the project. `UI-UX-RECONCEPT-PLAN-FA.md` is a design plan, not the audit report.

## Technology and implementation

- Keep the current Astro 7 and Tailwind CSS 4 setup. Use Astro components by default; use TypeScript when useful for data contracts and validation.
- Do not migrate to React, Next.js, or another framework.
- Keep browser JavaScript minimal and preserve existing project structure and dependencies unless a necessary change is explained and approved.
- Use the existing shared `BaseLayout.astro`, global stylesheet, and reusable components where appropriate.
- Keep Persian pages `lang="fa"` and `dir="rtl"`; use the self-hosted variable Vazirmatn font with `"Vazirmatn", Tahoma, sans-serif` fallbacks. The owner's Task 04-A decision (2026-10-21) supersedes only the PDF's Tahoma requirement; all other PDF requirements remain valid. Load the font faces once through the shared global stylesheet, using the OFL-1.1 licensed `@fontsource-variable/vazirmatn` package.
- Follow the reference's desktop composition closely and create an intentionally responsive mobile/tablet layout, not a shrunken desktop. Use real HTML for text and controls, preserve accessible labels/focus states, and avoid avoidable performance costs.
- Do not redesign pages outside the currently approved Task.

## Design system direction

- Use the sampled reference palette as the target for future UI work: deep navy, gold/yellow for primary calls to action, white, and light neutral gray. Treat sampled hex values as approximations from a raster screenshot, not as official brand specifications.
- Keep ordinary body copy at 16px with approximately 1.8 line height, content width near 1200px, and mobile side padding of at least 16px, per the PDF. Hero typography may use a separately responsive scale.
- Prefer centralized design tokens over scattered hardcoded colors, radii, shadows, and spacing values.

## Content and data integrity

- Use company information only from company-provided or explicitly approved sources. Do not infer legal name, claims, address, phone, business hours, or map links.
- Treat `src/data/products.ts` and its linked images as demonstration data until each product's name, SKU, brand, compatibility, specifications, and images are approved.
- Never invent SKU, brand, vehicle compatibility, product specifications, testimonials, inventory, or performance claims.
- Do not create synthetic product photos. Preserve existing images and data unless the user approves replacement. Clearly mark demo content as unpublished.
- Preserve leading zeros in part codes. Use stable, unique slugs and do not treat display numbering as an SKU.

## Excluded features

- Do not add customer accounts, favorites, cart, retail pricing, online checkout/payment, or customer registration.
- Do not implement backend, database, API endpoints, authentication, admin panel, Node server adapter, deployment, or production hosting without an explicit request for that phase.
- A callback form may be a UI-only preview with client-side validation when approved. Never show a successful submission state unless the server has confirmed durable storage.

## Security

- Do not put secrets or credentials in client code, `public/`, URLs, or committed files. Keep customer personal data out of public assets, URLs, and logs.
- Do not execute or inject user-provided HTML. Use text-safe DOM APIs and standard form controls.
- Do not treat `localStorage` as a database for customer requests.
- Avoid unnecessary dependencies. Server-side security controls belong to an approved backend phase; do not claim server security before it exists.

## Working process

- Work in small, reviewable phases and change only what the current Task authorizes.
- Preserve existing files and data. No broad rewrites, deletions, or new dependencies without a clear reason and approval.
- Run relevant, non-destructive checks after changes when available; report skipped checks and failures honestly.
- At the end of each Task, report changed files and checks, then stop for the user's approval before beginning the next Task.

## Current project-specific notes

- Tailwind CSS 4 is configured with `@tailwindcss/vite`; the existing `src/styles/global.css` is imported by `src/layouts/BaseLayout.astro`.
- The current `company.ts` contains public contact fields that must be verified with the company before release.
- Product records now have explicit stable IDs and slugs (`product-1` through `product-11`), independent of array positions. The canonical `Product` model and repository provide Home/Catalog/Detail/Contact views; all current records remain demo data, not approved catalog entries. Experimental product/catalog pages use configurable noindex; this is not access control.
- Owner decision, Task 09-C: the current interim release is fully static HTML/assets, served without Node.js or an Astro runtime. This supersedes the PDF's infrastructure-first sequence for this release only. Backend/Database and the callback endpoint remain a separate future phase requiring explicit authorization. Preparing a static handoff does not authorize connecting to or deploying on the real server.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
