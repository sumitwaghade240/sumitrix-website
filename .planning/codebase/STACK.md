# Technology Stack & Tooling

**Project:** SUMITRIX — Creative Developer Portfolio & Multi-Niche Showcase  
**Repository:** `sumitwaghade240/sumitrix-website`  
**Generated:** 2026-10-11  

---

## 1. Core Runtime & Language

| Layer | Technology | Version | Notes |
| :--- | :--- | :--- | :--- |
| **Language** | TypeScript | `^5.7.3` | Strict type checking enabled via `tsconfig.json` |
| **Markup / Structure** | HTML5 | Living Standard | Modern semantic HTML, accessible elements, meta tags |
| **CSS Engine** | Tailwind CSS / Vanilla CSS | Tailwind `^3.4.17` | Dual styling approach: modern UI uses Tailwind; niche sub-sites use handcrafted vanilla CSS |
| **Runtime Target** | Browser (ES Modules) | ES2020+ | Modern evergreen browsers (Chrome, Edge, Firefox, Safari) |

---

## 2. Frameworks & UI Architecture

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `react` | `^19.0.0` | React 19 component runtime for main portfolio app |
| `react-dom` | `^19.0.0` | React DOM bindings |
| `@vitejs/plugin-react` | `^4.3.4` | Vite React fast refresh and compilation plugin |

---

## 3. 3D Graphics & Creative WebGL

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `three` | `^0.174.0` | Low-level WebGL 3D rendering library |
| `@react-three/fiber` | `^9.1.2` | Declarative Three.js scene graph in React |
| `@react-three/drei` | `^10.0.7` | Helper utilities, cameras, controls, shaders for R3F |
| `framer-motion` | `^12.4.7` | UI transitions, layout animations, spring physics |
| `gsap` | `^3.12.7` | Precision timeline animations and scroll sequences |
| `canvas-confetti` | `^1.9.4` | Particle celebratory effects for form submissions and interactive triggers |

---

## 4. UI Utilities & Design System

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `lucide-react` | `^1.16.0` | Modern, consistent vector icons |
| `clsx` | `^2.1.1` | Conditional className construction utility |
| `tailwind-merge` | `^3.0.2` | Tailwind class deduplication and conflict resolver |
| `autoprefixer` | `^10.4.20` | CSS vendor prefixing |
| `postcss` | `^8.5.3` | PostCSS processing pipeline for Tailwind |

---

## 5. Build, Bundling & Dev Tooling

| Tool | Version | Configuration / Usage |
| :--- | :--- | :--- |
| **Vite** | `^6.2.0` | Dev server on port `5173` (`host: true`), production bundler via Rollup |
| **TypeScript Compiler** | `^5.7.3` | Configured with `tsconfig.json` (`target: ES2020`, `moduleResolution: bundler`, `strict: true`) |
| **Package Manager** | npm | `package.json` with locked dependencies in `package-lock.json` |

---

## 6. Sub-App Independent Stacks (Niche Micro-Sites)

The repository also hosts three standalone demo sites designed to require zero build steps for local clients:

1. **StyleCart (`/stylecart/`)**: Pure HTML5, Vanilla CSS3 (luxury boutique styling, drawer transitions), Modern ES6 JavaScript (reactive cart state, localStorage persistence).
2. **FitForge (`/fitforge/`)**: Pure HTML5, Vanilla CSS3 (dark gym athletic theme, glass cards), Modern ES6 JavaScript (trial pass validation, WhatsApp order encoding).
3. **LensCraft (`/lenscraft/`)**: Pure HTML5, Vanilla CSS3 (editorial masonry gallery, responsive lightbox modal), Modern ES6 JavaScript (category filtering, touch lightbox gestures).
4. **Legacy Portfolio (`/legacy_portfolio/`)**: Archived single-page static portfolio predecessor.
