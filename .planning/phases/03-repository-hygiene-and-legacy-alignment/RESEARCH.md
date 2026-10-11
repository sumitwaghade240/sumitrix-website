# Phase 3 Technical Research: Repository Hygiene & Legacy Alignment

**Phase:** Phase 3 — Repository Hygiene & Legacy Alignment  
**Milestone:** M1 — Baseline Stabilization & Codebase Consolidation  
**Target:** Eliminate root legacy duplicates, harmonize public static routing, validate all internal links.  
**Generated:** 2026-10-11  

---

## 1. Audit Findings: Redundant Files & Sync Status

### 1.1 Root `script.js` & `style.css`
- **Current State**:
  - `script.js` (8,446 bytes) and `style.css` (22,961 bytes) at repository root are bit-for-bit identical to `legacy_portfolio/script.js` and `legacy_portfolio/style.css`.
  - The root `index.html` bootstraps `<script type="module" src="/src/main.tsx"></script>` and relies on Tailwind via `src/index.css`.
  - Neither root `script.js` nor root `style.css` is referenced anywhere in the modern application build.
- **Decision**:
  - Canonical home for these files is `legacy_portfolio/`.
  - To prevent developer confusion while preserving backward compatibility, replace root `script.js` and `style.css` with explicit redirect/deprecation notices, or remove them and ensure `legacy_portfolio/` is documented in `README.md`.

### 1.2 Multi-Niche Demo Colocation (`root` vs `public/`)
- **Current State**:
  - `fitforge/`, `lenscraft/`, and `stylecart/` exist at root and in `public/`.
  - `git diff --no-index` confirms zero differences across all HTML, CSS, and JS files between root and `public/`.
  - Vite automatically copies `public/*` into `dist/*` at build time.
  - Root copies exist so that local non-Vite servers (`python -m http.server`) work directly out of the box.
- **Legacy Portfolio Sync**:
  - `legacy_portfolio/` currently exists at root but is **missing from `public/`**.
  - Copying `legacy_portfolio/` to `public/legacy_portfolio/` will allow production deployments (`dist/`) to also serve the legacy portfolio at `/legacy_portfolio/index.html`.

---

## 2. Navigation Link Validation Matrix

| Source Experience | Target | Link Format | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **SUMITRIX Modern SPA** (`src/data/projectsData.ts`) | StyleCart | `/stylecart/index.html` | Valid | Serves from `public/stylecart/index.html` in dev & dist |
| **SUMITRIX Modern SPA** (`src/data/projectsData.ts`) | FitForge | `/fitforge/index.html` | Valid | Serves from `public/fitforge/index.html` in dev & dist |
| **SUMITRIX Modern SPA** (`src/data/projectsData.ts`) | LensCraft | `/lenscraft/index.html` | Valid | Serves from `public/lenscraft/index.html` in dev & dist |
| **StyleCart Demo Bar** | Portfolio Home | `../index.html` | Valid | Navigates back to SPA root |
| **FitForge Demo Bar** | Portfolio Home | `../index.html` | Valid | Navigates back to SPA root |
| **LensCraft Demo Bar** | Portfolio Home | `../index.html` | Valid | Navigates back to SPA root |
| **Legacy Portfolio** (`legacy_portfolio/index.html`) | Modern SPA | Needs Link | Opportunity | Add top banner linking visitors to new 3D modern portfolio |

---

## 3. Documentation Alignment (`README.md`)

- `README.md` was drafted before the modern React 19 + Three.js app was introduced.
- It currently claims the root portfolio is pure HTML/CSS/JS with ₹0 monthly software fees.
- It should be updated to clearly present both:
  1. The modern React 19 + Three.js creative portfolio as the primary application.
  2. The standalone zero-dependency micro-sites (`/stylecart/`, `/fitforge/`, `/lenscraft/`) and legacy archive (`/legacy_portfolio/`).
