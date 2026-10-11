# Implementation Plan: Phase 3 — Repository Hygiene & Legacy Alignment

**Phase:** Phase 3 — Repository Hygiene & Legacy Alignment  
**Milestone:** M1 — Baseline Stabilization & Codebase Consolidation  
**Status:** Planned  
**Generated:** 2026-10-11  

---

## 1. Objectives & Success Criteria

1. **Eliminate Legacy File Ambiguity**:
   - Clean up root duplicate files (`script.js`, `style.css`) by replacing them with clear deprecation notices pointing developers to `legacy_portfolio/` and `src/`.
   - Ensure `legacy_portfolio/` is preserved as the single canonical home for the static single-page portfolio.
2. **Synchronize Static Deployment Assets**:
   - Replicate `legacy_portfolio/` into `public/legacy_portfolio/` so production builds automatically make the legacy version browseable at `/legacy_portfolio/index.html`.
3. **Harmonize Cross-Experience Navigation**:
   - Verify that all demo bars, back buttons, and project links resolve seamlessly in both local Vite dev mode and production `dist/`.
   - Add a subtle modern upgrade notice banner to `legacy_portfolio/index.html` linking back to the modern 3D portfolio (`/index.html`).
4. **Update Repository Documentation**:
   - Align `README.md` directory trees and architectural overviews with the actual modern React 19 + Three.js codebase structure.

---

## 2. Wave Execution Plan

### Wave 1: Legacy Deprecation & Public Asset Synchronization
- **Files Modified/Created**:
  - `script.js` (Root): Add explicit deprecation note pointing to `legacy_portfolio/script.js` and `src/components/Contact.tsx`.
  - `style.css` (Root): Add explicit deprecation note pointing to `legacy_portfolio/style.css` and `src/index.css`.
  - Copy `legacy_portfolio/` to `public/legacy_portfolio/`.
- **Verification**: `npm run build` succeeds, and `dist/legacy_portfolio/` is generated.

### Wave 2: Legacy Navigation Bridge
- **Files Modified**:
  - `legacy_portfolio/index.html` and `public/legacy_portfolio/index.html`:
    - Add top demo banner: `⚡ Viewing Legacy Static Portfolio · [Experience New 3D Modern Portfolio →](/index.html)`.
- **Verification**: Open in browser or inspect HTML structure.

### Wave 3: README & Documentation Alignment
- **Files Modified**:
  - `README.md`: Update directory structure diagram, explain the hybrid React 19 + Three.js SPA architecture and the three zero-fee static demo sites.
- **Verification**: Markdown preview inspection.

---

## 3. Verification Gates

1. **Gate 1 (Build Integrity)**: `npm run build` passes with exit code 0 and emits `dist/legacy_portfolio/` alongside `dist/fitforge/`, `dist/lenscraft/`, and `dist/stylecart/`.
2. **Gate 2 (Zero Dead Links)**: All internal links (`/stylecart/index.html`, `/fitforge/index.html`, `/lenscraft/index.html`, `/legacy_portfolio/index.html`) resolve to live pages.
3. **Gate 3 (Git Cleanliness)**: All changes cleanly tracked and committed.
