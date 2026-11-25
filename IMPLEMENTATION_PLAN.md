# Implementation Plan: Convert `ontime-landing-page` to Plain HTML + Tailwind CSS

## Goal
Replace the ~197 MB Simply Static WordPress export in `Shafiullah717/ontime-landing-page` with a clean, lightweight **plain HTML + Tailwind CSS** static site that preserves **100% visual parity** with the current UI, improves SEO/hygiene, and resets `main` to a clean Git history without WordPress bloat.

---

## Target Repository Structure

```text
ontime-landing-page/
├── .gitignore
├── package.json                 # Minimal devDependencies: @tailwindcss/cli, tailwindcss
├── src/
│   └── input.css                # Tailwind v4 entry + @theme design tokens & base styles
├── assets/
│   ├── css/
│   │   └── styles.css           # Compiled & minified Tailwind CSS (committed for zero-build GH Pages deploy)
│   ├── js/
│   │   └── main.js              # Lightweight vanilla JS (~30 lines) for sticky header & mobile drawer
│   └── images/                  # Only the 9 actually used image sets (optimized/copied from wp-content/uploads)
│       ├── 01-attendance-*.png
│       ├── 02-for-hr-teams-*.png
│       ├── 03-leave-*.png
│       ├── 04-control-*.png
│       ├── app-icon.png
│       ├── app-store-badge.png
│       ├── google-play-badge.png
│       ├── hero-bg.png          # (sass_bg-min.png)
│       └── logo-*.png           # (cropped-android-chrome-512x512-1 variants + favicons)
├── index.html                   # Main OnTime-hr landing page
├── privacy-policy/
│   └── index.html               # Privacy Policy page
└── IMPLEMENTATION_PLAN.md       # Can be kept or removed before final commit
```

> **Path strategy:** Use **relative paths** (`./assets/...`, `./privacy-policy/`, `../assets/...`, `../`) instead of hardcoding `/ontime-landing-page/...`. This guarantees the site works identically on GitHub Pages (`/ontime-landing-page/`), local dev servers (`/`), and any future custom domain (`https://ontimehr.com/`).

---

## Extracted Design System Tokens (from Current Site)

- **Font Family:** `Plus Jakarta Sans` (`400`, `600`, `700`) via Google Fonts
- **Color Palette:**
  - Primary Accent (`--palette-1`): `#eb6440`
  - Primary Hover (`--palette-2`): `#d45331`
  - Text Secondary (`--palette-3`): `#3d465c`
  - Text Primary / Dark (`--palette-4`): `#2D3748`
  - Text Muted (`--palette-5`): `#7a8296`
  - Border / Divider (`--palette-6`): `#e5e0d8`
  - Surface Warm / Secondary Bg (`--palette-7`): `#f7f5f0`
  - Surface White (`--palette-8`): `#ffffff`
  - Surface Light (`--palette-9`): `#f8f9fa`
  - Deep Navy (`--palette-10`): `#17223b`
- **Layout Widths:**
  - Standard container max-width: `1290px` (with `1.5rem` horizontal edge padding)
  - Narrow / prose max-width (Privacy Policy): `842px`
- **Fluid Typography Scale:**
  - `sm`: `clamp(0.8rem, 0.73rem + 0.217vw, 0.9rem)`
  - `md`: `clamp(1.1rem, 0.995rem + 0.326vw, 1.25rem)`
  - `lg`: `clamp(1.75rem, 1.576rem + 0.543vw, 2rem)`
  - `xl`: `clamp(2.25rem, 1.728rem + 1.63vw, 3rem)`
  - `xxl`: `clamp(2.5rem, 1.456rem + 3.26vw, 4rem)`

---

## Execution Phases

### Phase 1 — Capture Visual Baseline & Audit Exact Layout
1. Serve the current WordPress export locally (`python3 -m http.server` or similar, mapped cleanly to `/ontime-landing-page/`).
2. Capture full-page **desktop (1440px)** and **mobile (390px)** screenshots of:
   - `/` (Landing Page)
   - `/privacy-policy/` (Privacy Policy Page)
3. Inspect exact computed styles, spacing, shadows, border radii, button styles, sticky header behavior, mobile drawer layout, SVG icons, and responsive grid breakpoints from the live baseline DOM.

### Phase 2 — Initialize Tailwind CSS & Asset Structure
1. Add `.gitignore` (ignoring `node_modules/`, `.DS_Store`, temporary screenshots/artifacts).
2. Initialize `package.json` with `@tailwindcss/cli` + `tailwindcss` and add `build` / `watch` npm scripts:
   - `"build:css": "npx @tailwindcss/cli -i ./src/input.css -o ./assets/css/styles.css --minify"`
   - `"watch:css": "npx @tailwindcss/cli -i ./src/input.css -o ./assets/css/styles.css --watch"`
3. Create `src/input.css` with `@import "tailwindcss";`, `@theme` tokens matching the exact extracted palette, `Plus Jakarta Sans` font family, and fluid typography/container utilities.
4. Copy only the **used images** from `wp-content/uploads/2026/11/` into `assets/images/` (preserving responsive `srcset` widths where beneficial, dropping all ~109 unused files).

### Phase 3 — Rebuild Pages & Vanilla JS Interaction
1. **Header & Mobile Drawer (`assets/js/main.js` + shared markup):**
   - Exact logo + brand title, navigation links (`Features`, `Showcase`, `Pricing`, `Privacy Policy`, `Download`), sticky scroll styling, and accessible mobile slide-out/toggle drawer (`aria-expanded`, Escape key close, backdrop/link click close).
2. **Landing Page (`index.html`):**
   - **Hero Section:** Background texture (`hero-bg.png`), headline (`Request leave and see your team’s attendance live.`), subcopy, App Store & Google Play CTA buttons/badges, and hero mockup (`01-attendance`).
   - **Built for Employees & HR Teams (6-card feature grid):** Live Team Attendance, One-Tap Location Check-In, iOS & Android Apps, One-Click Leave & Approvals, Shifts, Rules & Alerts, Excel Export & Audit Logs (preserving exact inline SVG icons & card styling).
   - **Product Showcase (`#showcase`):** Alternating image + copy blocks:
     1. Live Team Visibility & Instant Approvals (`02-for-hr-teams-1`)
     2. Effortless Leave & Balance Tracking (`03-leave-1`)
     3. Shifts, Locations & Multi-Org Control (`04-control`)
   - **Download CTA (`#download`):** Get OnTime on iOS & Android (`https://apps.apple.com/ca/app/ontime-hr/id6826200925` & `https://play.google.com/store/apps/details?id=com.wamcorp.ontime`).
   - **Pricing (`#pricing`):** Fair Pricing — `Starter $0/mo` and `Pro $12/mo` cards with exact feature lists and CTAs.
   - **Company & Legal (`#WAMCorp.`) + Footer:** `Built & maintained by WAMCorp.` (`https://wam-corp.com/`, `mailto:info@wam-corp.com`, Privacy Policy link).
3. **Privacy Policy Page (`privacy-policy/index.html`):**
   - Matching header & footer.
   - Narrow readable layout (`max-width: 842px`) with sections 1–11 (including subsections 1.1–1.6, anchor links `#information-we-collect` through `#contact-us`, and `mailto:info@wam-corp.com?subject=Account%20deletion%20request`).
4. **SEO, Metadata & Hygiene Cleanup:**
   - Add `<meta name="description">`, Open Graph (`og:title`, `og:description`, `og:type`, `og:image`), and clean favicons (`32x32`, `180x180`, `192x192`).
   - Remove all WordPress leftovers (`xmlrpc.php`, `?p=12` shortlinks, `generator` meta, `author/` archive, `wp-sitemap*.xsl`, `speculationrules`).

### Phase 4 — Build & Visual Verification
1. Run `npm run build:css` to generate minified `assets/css/styles.css`.
2. Serve the rebuilt site locally and capture desktop (1440px) & mobile (390px) screenshots of both `index.html` and `privacy-policy/index.html`.
3. Compare before/after screenshots side-by-side and verify:
   - Typography, colors, spacing, shadows, gradients, and alignment match the WordPress baseline.
   - Mobile menu drawer opens/closes cleanly and sticky header behaves identically.
   - Zero console errors, zero 404 assets, and all internal/external links resolve properly.

### Phase 5 — Cleanup WordPress Files & Reset `main`
1. Create a temporary local safety backup tag/branch (`git branch backup-wp-export`) before rewriting history (to be deleted once verified).
2. Remove all WordPress directories and leftovers (`wp-content/`, `wp-includes/`, `author/`, `wp-sitemap.xsl`, `wp-sitemap-index.xsl`, `.DS_Store`).
3. Create a clean orphan `main` branch containing only the new lightweight codebase (`git checkout --orphan main-clean`, commit clean files, rename to `main`).
4. Verify repo size (`du -sh . .git`) drops from ~197 MB down to a few MB.
5. Push the reset `main` to `origin` (`git push --force-with-lease origin main`) after final confirmation, and verify the live GitHub Pages deployment.
