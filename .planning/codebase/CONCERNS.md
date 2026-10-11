# Technical Debt, Risks & Areas of Concern

**Project:** SUMITRIX — Creative Developer Portfolio & Multi-Niche Showcase  
**Repository:** `sumitwaghade240/sumitrix-website`  
**Generated:** 2026-10-11  

---

## 1. Bundle Size & Code Splitting (Vite Build Warning)

- **Finding**: During `npm run build`, Rollup emits a warning that `dist/assets/index-*.js` exceeds 1.2 MB uncompressed (~356 kB gzipped).
- **Root Cause**: `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, and `gsap` are bundled together in a single main chunk.
- **Risk**: Slower initial page load on constrained 3G/4G mobile connections.
- **Remediation**:
  1. Configure `build.rollupOptions.output.manualChunks` in `vite.config.ts` to isolate `three` and 3D vendor libraries into a distinct asynchronous chunk.
  2. Implement React `lazy()` and `Suspense` for below-the-fold components or heavyweight 3D canvas rendering.

---

## 2. Dual Legacy / Modern File Redundancy

- **Finding**:
  - The repository root retains `script.js` (8.4 kB) and `style.css` (23 kB) which are identical duplicates of `legacy_portfolio/script.js` and `legacy_portfolio/style.css`.
  - The root `index.html` now points to `/src/main.tsx`, meaning the root `script.js` and `style.css` are dormant legacy artifacts.
- **Risk**: Developer confusion when trying to edit styles or scripts, inadvertently changing unused root legacy files instead of `src/` or `legacy_portfolio/`.
- **Remediation**: Clarify or safely clean up the dormant root duplicates while ensuring `legacy_portfolio/` remains the canonical home for the archived static version.

---

## 3. Micro-Site Asset Hosting & External CDN Reliance

- **Finding**: High-resolution photography across StyleCart, FitForge, and LensCraft relies on external Unsplash URLs (`https://images.unsplash.com/...`).
- **Risk**:
  - Offline local previews fail to display images without an active internet connection.
  - If external image URLs expire, change, or hit rate limits, UI cards display broken imagery.
- **Remediation**:
  - Bundle optimized WebP fallback assets directly in `public/` or each micro-site directory.

---

## 4. Production Phone Number Configuration

- **Finding**: Placeholder numbers like `"91XXXXXXXXXX"` are configured across demo scripts.
- **Risk**: Forgetting to update these values before handing over a site to a paying client leads to inquiries remaining in demo mode.
- **Remediation**: Introduce a lightweight `.env` or client configuration manifest script to centralize contact numbers, store policies, and pricing before deployment.
