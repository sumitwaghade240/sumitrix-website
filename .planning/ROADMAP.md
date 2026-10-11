# Development Roadmap

**Project:** SUMITRIX — Creative Developer Portfolio & Multi-Niche Showcase  
**Repository:** `sumitwaghade240/sumitrix-website`  
**Current Milestone:** M1 — Brownfield Onboarding & Baseline Stabilization  
**Generated:** 2026-10-11  

---

## Milestone 1: Baseline Stabilization & Codebase Consolidation (Current)

- [x] **Phase 1: Codebase Mapping & Architecture Onboarding**
  - Map full repository architecture, runtime dependencies, integrations, and conventions.
  - Establish `.planning/` directory structure with evidence-backed documentation.
  - Verify baseline production build (`tsc && vite build`).

- [x] **Phase 2: Bundle Optimization & Asset Resilience**
  - Configure Rollup chunk splitting in `vite.config.ts` (`three`, `lucide`, `framer-motion`).
  - Eliminate the 500kB+ bundle size warning.
  - Establish local asset fallbacks for critical external demo photography.

- [x] **Phase 3: Repository Hygiene & Legacy Alignment**
  - Deprecate or document root duplicate legacy files (`script.js`, `style.css`) in favor of canonical `legacy_portfolio/`.
  - Validate all internal routing links (`/stylecart/index.html`, `/fitforge/index.html`, `/lenscraft/index.html`).

---

## Milestone 1 Complete (100% - 3/3 Phases Verified)

## Milestone 2: Client Customization & Production Deployment Tooling (Planned)

- [ ] **Phase 4: Client Configuration Engine**
  - Create a streamlined configuration manifest or interactive wizard for zero-touch client branding (business name, WhatsApp numbers, currency, pricing).
  - Add single-command client build and export tooling.

- [ ] **Phase 5: Automated Testing & Visual Regression**
  - Integrate Playwright end-to-end tests for the WhatsApp order generator and cart drawer.
  - Add automated Lighthouse CI performance auditing.
