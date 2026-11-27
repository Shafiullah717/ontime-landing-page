# OnTime-hr Landing Page (`ontime-landing-page`)

Static marketing website and legal pages for **OnTime-hr** — a mobile workforce attendance tracking and leave management app built and maintained by **WAM Corp LLC** (`wam-corp.com`).

This repository was migrated from a WordPress export to a zero-framework, static **HTML5 + Tailwind CSS v4 + Vanilla JS** site designed for zero-build deployment (e.g., GitHub Pages or any static host).

---

## Project Structure

```text
ontime-landing-page/
├── index.html                  # Main OnTime-hr landing page
├── privacy-policy/
│   └── index.html              # OnTime Privacy Policy page
├── terms-of-service/
│   └── index.html              # OnTime Terms of Service page
├── src/
│   └── input.css               # Tailwind CSS v4 entry, @theme tokens, and custom component styles
├── assets/
│   ├── css/
│   │   └── styles.css          # Compiled & minified Tailwind CSS (committed for zero-build deploy)
│   ├── js/
│   │   └── main.js             # Sticky header scroll behavior & <dialog> mobile navigation drawer
│   └── images/                 # App screenshots (responsive srcset widths), store badges, icons, hero bg
├── package.json                # Dev dependencies (@tailwindcss/cli, tailwindcss) and CSS build scripts
├── IMPLEMENTATION_PLAN.md      # Historical WordPress-to-static migration plan
└── .gitignore                  # Ignores node_modules/, .DS_Store, *.log
```

---

## Tech Stack

- **Markup:** Plain semantic HTML5 (`lang="en-US"`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/cli` ^4.1.0, compiled output at `assets/css/styles.css`)
- **Typography:** `Plus Jakarta Sans` (weights `400`, `600`, `700`) via Google Fonts
- **JavaScript:** 49-line vanilla JS IIFE (`assets/js/main.js`) — no runtime dependencies
- **Hosting / Deployment:** Pre-compiled `assets/css/styles.css` is committed to the repo so static hosts (such as GitHub Pages) can serve the site directly without a build step

---

## Local Development & Build

### Prerequisites
- Node.js & npm (only needed when modifying CSS or Tailwind utility classes)

### Commands

```bash
# Install devDependencies (if node_modules is not present)
npm install

# Compile & minify Tailwind CSS once
npm run build:css

# Watch for HTML/CSS changes during development
npm run watch:css
```

To preview the site locally:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

> **Important:** Always run `npm run build:css` after adding or changing Tailwind utility classes in any HTML file or editing `src/input.css`, and commit the updated `assets/css/styles.css`.

---

## Design System & Conventions

Design tokens are defined in `src/input.css` under `@theme`:

| Token | Value | Usage |
|---|---|---|
| `--color-brand` | `#eb6440` | Primary orange accent, header background (solid/stuck), legal links |
| `--color-brand-dark` | `#d45331` | Hero gradient end, dark CTA buttons |
| `--color-navy` | `#17223b` | Primary dark accent, legal banner, footer, table headers |
| `--color-navy-dark` | `#111a2e` | Bottom copyright bar |
| `--color-ink-heading` | `#3d465c` | Headings |
| `--color-ink-body` | `#2d3748` | Body copy & WAMCorp section background |
| `--color-ink-muted` | `#7a8296` | Feature card descriptions |
| `--color-surface-light` | `#f8f9fa` | Page background, feature cards, showcase background |
| `--color-surface-warm` | `#f7f5f0` | Starter pricing card border, legal heading underlines |
| `--color-border-warm` | `#e5e0d8` | Starter tier label |
| `--font-sans` | `"Plus Jakarta Sans", ...` | Base & heading font family |

### Path Strategy
- **Always use relative paths** (`./assets/...`, `./privacy-policy/`, `./terms-of-service/` from root; `../assets/...`, `../`, `../privacy-policy/`, `../terms-of-service/` from subpages).
- Do **not** hardcode `/ontime-landing-page/...` or full domain URLs for internal links so the site works identically on GitHub Pages subpaths, `localhost`, and custom domains.

---

## Pages & Shared Components

### 1. Landing Page (`index.html`)
- **Header (`#masthead`):** Uses `.site-header-transparent` (fixed over hero, transitions to `.is-stuck` orange background when `window.scrollY > 10`).
- **Sections:** Hero (`#home`), Features (`#features`), Showcase (`#showcase`), Download (`#download` with App Store & Google Play links), Pricing (`#pricing`), WAMCorp attribution (`#WAMCorp.`), and Footer (`#colophon`).

### 2. Legal Pages (`privacy-policy/index.html`, `terms-of-service/index.html`)
- **Header (`#masthead`):** Uses `.site-header-solid` (sticky orange header).
- **Layout:** Navy top banner (`bg-navy`) with `<h1>` title and effective/updated dates, followed by a `.legal-prose` container (`max-w-[860px]`) with a 2-column Table of Contents and anchored sections.
- **Active Nav State:** Set `aria-current="page"` on the current page's link in the desktop nav, footer, and mobile drawer.

### 3. Mobile Navigation Drawer (`assets/js/main.js`)
- Implemented with a native `<dialog id="mobile-drawer" class="mobile-dialog">` opened via `showModal()`.
- Automatically handles `Escape` key closing, backdrop clicks, in-drawer link clicks, and `aria-expanded` synchronization on `#mobile-toggle`.

---

## Agent & Maintainer Checklist (For Future Sessions)

When making changes in a new session:

1. **Keep navigation in sync across all 3 HTML files:**
   - `index.html`
   - `privacy-policy/index.html`
   - `terms-of-service/index.html`
   Each file has **three** navigation lists that must match:
   - Desktop header `<nav aria-label="Primary">`
   - Footer `<footer id="colophon">` (`Company & Legal` and `Footer` nav)
   - Mobile drawer `<dialog id="mobile-drawer">` (`<nav aria-label="Primary Mobile">`)
2. **Preserve relative paths:** Root `index.html` uses `./...`; subpages (`privacy-policy/`, `terms-of-service/`) use `../...` and `./` for self.
3. **Rebuild CSS after HTML/CSS edits:** Run `npm run build:css` so `assets/css/styles.css` includes any newly added Tailwind utility classes.
4. **Verify accessibility & semantics:**
   - Keep one `<main id="main">` and one `<h1>` per page.
   - Keep `aria-current="page"` on the active page's links.
   - Keep `aria-hidden="true"` on decorative SVGs and proper `alt` attributes on images.
5. **Contact & Store URLs (reference):**
   - Support Email: `mailto:info@wam-corp.com`
   - WAMCorp Website: `https://wam-corp.com/`
   - Apple App Store: `https://apps.apple.com/ca/app/ontime-hr/id6826200925`
   - Google Play Store: `https://play.google.com/store/apps/details?id=com.wamcorp.ontime`
