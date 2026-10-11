# Code Conventions & Engineering Standards

**Project:** SUMITRIX — Creative Developer Portfolio & Multi-Niche Showcase  
**Repository:** `sumitwaghade240/sumitrix-website`  
**Generated:** 2026-10-11  

---

## 1. Naming Conventions

### 1.1 Files & Directories
- **React Components**: PascalCase (`Hero.tsx`, `Projects.tsx`, `CustomCursor.tsx`).
- **Data & Config Files**: camelCase (`projectsData.ts`, `servicesData.ts`, `vite.config.ts`).
- **Directories**: lowercase or kebab-case (`components`, `3d`, `data`, `fitforge`, `stylecart`, `lenscraft`).

### 1.2 TypeScript & Code Symbols
- **Interfaces & Types**: PascalCase (`Project`, `ServiceItem`, `ContactFormData`).
- **React Functional Components**: PascalCase with explicit return types (`export const Hero: React.FC<HeroProps> = ...`).
- **Constants & Configuration**: UPPER_SNAKE_CASE for global constants (`PROJECTS`, `DEVELOPER_WHATSAPP_NUMBER`, `FREE_SHIPPING_THRESHOLD`).
- **Variables & Functions**: camelCase (`activeSection`, `handleScroll`, `formatPrice`, `generateWhatsAppLink`).

---

## 2. TypeScript & Modern JavaScript Standards

- **Strict Type Checking**: `strict: true` in `tsconfig.json`. Explicit interfaces for props and exported data structures.
- **ES Modules**: Standard `import` and `export` statements (`"type": "module"` in `package.json`).
- **Zero Heavy External State Libraries**: State is managed cleanly using React's native hooks (`useState`, `useEffect`, `useRef`, `useCallback`) without Redux or Zustand overhead.
- **Safe Browser API Access**: Guard window/document access with appropriate checks (`window.scrollY`, `passive: true` on scroll listeners).

---

## 3. Styling & Design Standards

### 3.1 Tailwind CSS System (Main App)
- **Design Tokens**: Standardized in `tailwind.config.js`:
  - `dark-950` (`#070709`), `dark-900` (`#0c0d10`), `dark-850` (`#111217`)
  - `neon-lime` (`#ccff00`), `neon-glow` (`#d9ff33`)
  - `surface-glass`, `surface-border`, `surface-border-highlight`
- **Class Utilities**: Clean composition using utility classes, leveraging `clsx` and `tailwind-merge` when combining dynamic class lists.
- **Typography Scale**:
  - `font-display`: *Syne* for punchy, editorial headlines.
  - `font-sans`: *Space Grotesk* for technical body and navigation.
  - `font-mono`: *JetBrains Mono* for metrics, numbers, and code tags.

### 3.2 Vanilla CSS Architecture (Micro-Sites)
- CSS Custom Properties (`--bg-primary`, `--accent-color`, `--text-muted`, `--border-radius`) declared in `:root`.
- BEM-inspired semantic class naming (`.gym-header`, `.store-cart-drawer`, `.lightbox-modal`).
- Zero framework dependencies in `fitforge/`, `stylecart/`, and `lenscraft/`.

---

## 4. Accessibility & SEO Conventions

- **Semantic Landmark Elements**: `<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`.
- **Headings**: Clear hierarchical heading levels (`<h1>` through `<h3>`).
- **Interactive Elements**: Visible focus states, explicit `aria-label` attributes on icon buttons, `aria-expanded` on accordion toggles and mobile nav triggers.
- **SEO & Social Sharing**: OpenGraph (`og:title`, `og:description`, `og:image`) and Twitter Card tags defined in `index.html`.
