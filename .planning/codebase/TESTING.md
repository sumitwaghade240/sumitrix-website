# Testing, Quality Assurance & Verification

**Project:** SUMITRIX — Creative Developer Portfolio & Multi-Niche Showcase  
**Repository:** `sumitwaghade240/sumitrix-website`  
**Generated:** 2026-10-11  

---

## 1. Automated Verification Pipeline

The codebase relies on automated compilation, static type verification, and bundle generation:

### 1.1 Type Checking & Build Verification
```bash
# Full TypeScript validation and production Vite bundle generation
npm run build
```
- **Type Checker**: TypeScript `tsc` executes first via `tsconfig.json`. Any type mismatches, missing properties, or invalid imports fail the build immediately.
- **Vite Bundler**: Emits minified assets into `dist/`. Confirms that all CSS modules, assets, and React dependencies resolve cleanly.

### 1.2 Local Dev Server Execution
```bash
# Start Vite development server with Hot Module Replacement
npm run dev
```
Accessible at `http://localhost:5173`.

---

## 2. Interactive Testing & Demo Fallback Mode

Because client phone numbers are customizable for production delivery, the applications feature built-in interactive testing systems:

### 2.1 WhatsApp Preview Modal (Test Harness)
- **Condition**: Whenever a configured phone number contains placeholder characters (such as `"91XXXXXXXXXX"`) or is not yet configured:
  - Submitting any enquiry, trial form, or cart order does **not** fail or send messages to dummy numbers.
  - Instead, an interactive modal pops up showcasing:
    1. The exact formatted WhatsApp message payload.
    2. A **Copy Message** button (utilizing `navigator.clipboard`).
    3. A **Launch in WhatsApp ↗** button (using WhatsApp's universal contact-picker `https://wa.me/?text=...`).
- This permits end-to-end verification of customer forms without live credentials.

### 2.2 Manual Quality Checklist Across Micro-Sites

| Experience | Validation Flow | Expected Result |
| :--- | :--- | :--- |
| **SUMITRIX Portfolio** | Scroll through sections, hover interactive 3D sphere | Sphere rotates, shatters on interaction; active nav updates; contact wizard generates enquiry |
| **StyleCart** | Add items to cart, switch variant sizes/colors, trigger drawer | Cart quantity increments, subtotal updates, shipping threshold logic computes correctly |
| **FitForge** | Open free trial form, select slot & membership tier | Form validates required fields, triggers modal / WhatsApp dispatch |
| **LensCraft** | Filter by Weddings / Editorial / Portraits, click image | Masonry filter re-layouts instantly, lightbox modal opens with keyboard escape & arrow navigation |

---

## 3. Recommended Future Testing Enhancements

- **End-to-End Testing**: Introduce Playwright or Cypress to automate form filling, cart manipulation, and lightbox opening.
- **Visual Regression Testing**: Automated visual snapshots across desktop and mobile viewports for WebGL canvas and layout stability.
- **Unit Testing**: Vitest setup for pure utility functions (pricing calculations, date helpers, string encoders).
