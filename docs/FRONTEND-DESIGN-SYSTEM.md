# Frontend Design System — رهاورد تکلان

## Scope and references

This document sets the visual and component direction for future frontend tasks. It does not redesign any page or approve product content.

- Requirements: `references/Rahvard-B2B-Protocol.pdf` (13-page, version 2.0 protocol).
- Primary visual reference for all pages: `references/UI-Reference.png`.
- Both references are stored in the repository. The reference screenshot was reviewed directly. Its dominant sampled colors were approximately navy `#08131C`, gold `#F7B92C`, white, and near-white neutrals. Screenshot sampling is approximate and is not an official company brand guide.
- The PDF controls content accuracy and technical requirements; the screenshot controls visual composition. Where they differ, B2B constraints in the PDF take precedence over retail-only UI shown in the screenshot.

## Visual principles

- Build real Astro/HTML content, not a full-page screenshot background.
- Match the reference's dark multi-row header, industrial hero, gold actions, product catalog/filter layout, promotional panels, company preview, cooperation steps, and dark footer on desktop.
- Recompose these elements for mobile and tablet: stack and simplify content intentionally, preserve a clear reading order, and avoid horizontal page overflow.
- Use navy for prominent framing, white for product/content surfaces, restrained light neutrals for separators and secondary panels, and gold sparingly for high-priority actions.
- Product images use `object-contain`; use only company-approved or licensed product images. Do not create synthetic product photos or infer product compatibility from appearance.
- Do not add prices, cart, checkout, customer accounts, favorites, ratings, discount labels, or unsupported trust claims.

## Tokens

The following values are the project's sampled starting palette for future UI work. The screenshot is a raster reference, so the colors are rounded approximations.

| Token | Value | Intended use |
| --- | --- | --- |
| `--brand-navy` | `#08131C` | Main dark header/footer and hero framing |
| `--brand-navy-deep` | `#07111A` | Darkest background areas |
| `--brand-navy-soft` | `#172431` | Secondary navy panels and hover surfaces |
| `--cta-gold` | `#F7B92C` | Main CTA and small high-priority accents |
| `--cta-gold-hover` | `#E5A51B` | CTA hover/focus state |
| `--text-main` | `#17202A` | Main text on light surfaces |
| `--text-muted` | `#69737D` | Secondary text |
| `--surface-light` | `#FFFFFF` | Main content and product-card surfaces |
| `--surface-neutral` | `#F7F8F9` | Light filters, subtle panels, separators |
| `--border-subtle` | `#E5E8EB` | Quiet borders |
| `--border-strong` | `#CDD3D8` | Form and control borders |

The current semantic `--brand` token remains the existing red while existing pages still use it. It is not the future gold CTA token. Task 03 should explicitly map the new navy/gold tokens into the redesigned page and then reconcile or retire legacy color tokens without changing unrelated pages implicitly.

### Layout and shape scale

| Token | Value | Use |
| --- | --- | --- |
| `--radius-control` | `0.625rem` | Inputs and small buttons |
| `--radius-card` | `0.875rem` | Product and content cards |
| `--radius-panel` | `1.25rem` | Large hero/promo panels |
| `--shadow-soft` | `0 8px 24px rgb(8 19 28 / 8%)` | Subtle elevation only |
| `--container-content` | `75rem` / `1200px` | Main content width from PDF |
| `--spacing-gutter` | `1.5rem` | Standard desktop side spacing |
| `--spacing-section` | `4rem` | Default desktop section rhythm |

On mobile, use at least `1rem` side padding and reduce section spacing. Use Tailwind responsive utilities instead of fixed desktop dimensions.

### Typography

- Official project font: self-hosted variable Vazirmatn; stack: `"Vazirmatn", Tahoma, sans-serif`.
- Owner decision, Task 04-A (2026-10-21): Vazirmatn replaces the PDF's Tahoma requirement only. All other PDF requirements remain valid.
- Source: `@fontsource-variable/vazirmatn` (OFL-1.1). The shared global stylesheet defines the package's original WOFF2 subsets once under the CSS family name `Vazirmatn`, with `font-display: swap` and the continuous weight range `100 900`. Keep the package's unicode ranges so browsers fetch only needed subsets. Do not additionally import the package CSS (which uses the different family name `Vazirmatn Variable`).
- `--font-site` is the single font-stack token; Tailwind's corporate, sans and mono font aliases share it. Native form controls inherit the font through Tailwind Preflight. All pages receive the stylesheet through `BaseLayout.astro`.
- Preserve existing heading/body weights and layout; use typography-only adjustments if a future font update causes clipping. License text is distributed at `/fonts/vazirmatn-OFL.txt`.
- Ordinary body text: `1rem` (16px), line height about `1.8`.
- Supporting copy: `0.875rem` (14px), line height about `1.75`.
- Heading scale: page title 32–48px responsive; section titles 24–32px; card titles 18–20px.
- Keep product codes, phone numbers, and other LTR values marked with `dir="ltr"` where appropriate.

## Component map (proposal only)

Existing components to retain and evolve when the relevant page task is approved:

- `SiteHeader`: brand, desktop navigation, search/contact affordances; mobile navigation.
- `SiteFooter`: approved company contact data, navigation, privacy link.
- `ProductCard`: equal-sized catalog card, approved image/title/code, detail link.
- `BaseLayout`: metadata, Persian language/direction, global styles.

Components to consider for later tasks; do not create them in this foundation task:

- `HeroSection`: homepage headline, approved product visual, CTAs.
- `ProductGrid` and `ProductFilters`: responsive catalog layout and actual data-backed filters.
- `SearchBar`: accessible search over approved product fields.
- `PromotionalBanner`: real company/product campaign only, with approved imagery and copy.
- `AboutPreview` and `CooperationSteps`: concise approved company and B2B process content.
- `CallbackForm`: UI and client-side validation only until a server endpoint is approved; no false success state.
- `ContactInfo`: shared display of verified company phone, full address, and working hours.

Keep components focused. Do not add carousel, icons, claims, or controls solely because they appear in the reference image; first confirm that they serve this catalog and have valid content.

## Data boundary proposal (no migration in this task)

Current `company.ts` and `products.ts` are retained as-is. The product list is demo data; current numbered titles/slugs and `displayNumber` are not approved SKUs.

For a future public product record, keep presentation fields explicit and sourced from approved data:

```ts
interface Product {
  sku: string; // approved code, string to preserve leading zeros
  slug: string; // stable and unique
  title: string; // approved display name
  category: string; // approved catalog category
  summary?: string; // approved short description
  images: Array<{ src: string; alt: string; role?: string }>;
  specifications: Array<{ label: string; value: string; unit?: string }>;
  compatibility: Array<{ make: string; model: string; yearRange?: string }>;
}
```

Do not publish an unknown field as an empty-looking claim or guess a value. Keep editorial approval/source tracking in a separate build-time authoring record or internal workflow; never expose internal notes or customer data through public product JSON. Do not migrate until a real product and its source records are approved.

## Accessibility and performance

- Keep heading order semantic, links descriptive, images accurately described, and form controls labelled.
- Preserve keyboard focus visibility and adequate text/action contrast, including gold actions.
- Prefer native HTML and Astro server rendering for public catalog pages; add client JavaScript only for a demonstrated interaction.
- Ensure the catalog remains readable without JavaScript. Provide image dimensions/aspect ratios and use lazy loading below the first viewport.

## Tailwind implementation note

The project uses Tailwind CSS 4 with `@tailwindcss/vite`. Design tokens are exposed through CSS custom properties and Tailwind's `@theme inline` aliases in `src/styles/global.css`. New components should use these tokens instead of adding unrelated one-off color values. The current pages are intentionally not switched to the new palette until their redesign task.
