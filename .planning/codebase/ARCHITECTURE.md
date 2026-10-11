# System Architecture & Technical Design

**Project:** SUMITRIX — Creative Developer Portfolio & Multi-Niche Showcase  
**Repository:** `sumitwaghade240/sumitrix-website`  
**Generated:** 2026-10-11  

---

## 1. High-Level Architecture Overview

The repository features a **hybrid creative architecture**:
1. **Core Experience (Root Single-Page Application)**: A state-of-the-art interactive 3D portfolio powered by React 19, TypeScript, Tailwind CSS, and Three.js/React Three Fiber.
2. **Satellite Demo Sites (Micro-Websites)**: Three independent, lightweight static websites (`stylecart/`, `fitforge/`, `lenscraft/`) demonstrating practical business software built without framework bloat.
3. **Legacy Archive (`legacy_portfolio/`)**: The historical vanilla HTML/CSS version preserved for backward compatibility and reference.

```
                          ┌────────────────────────────────┐
                          │     Client Browser Access      │
                          └───────────────┬────────────────┘
                                          │
                   ┌──────────────────────┴──────────────────────┐
                   │                                             │
      ┌────────────▼────────────┐                  ┌─────────────▼─────────────┐
      │  SUMITRIX Portfolio SPA │                  │ Micro-Sites (Zero-Build)  │
      │  (React 19 + Three.js)  │                  │  (HTML5 + Vanilla CSS/JS) │
      └────────────┬────────────┘                  └─────────────┬─────────────┘
                   │                                             │
         ┌─────────┴─────────┐                     ┌─────────────┼─────────────┐
         │                   │                     │             │             │
  ┌──────▼──────┐     ┌──────▼──────┐        ┌─────▼─────┐ ┌─────▼─────┐ ┌─────▼─────┐
  │  WebGL 3D   │     │ UI Sections │        │ StyleCart │ │ FitForge  │ │ LensCraft │
  │ Glass Physics│    │(Hero, Work, │        │(Boutique) │ │  (Gym)    │ │ (Studio)  │
  │   Canvas    │     │Pricing, etc)│        └─────┬─────┘ └─────┬─────┘ └─────┬─────┘
  └─────────────┘     └──────┬──────┘              │             │             │
                             │                     └─────────────┼─────────────┘
                             │                                   │
                             └─────────────────┬─────────────────┘
                                               │
                                 ┌─────────────▼─────────────┐
                                 │  WhatsApp Dispatch Bridge │
                                 │    (Headless Checkout)    │
                                 └───────────────────────────┘
```

---

## 2. Core SPA Architecture (`src/`)

### 2.1 Component Tree & Lifecycle
- `src/main.tsx`: React root initialization into `#root`.
- `src/App.tsx`: Central coordinator managing active section state (`hero`, `work`, `services`, `pricing`, `about`, `process`, `contact`), window scroll listeners, and global overlays (`CustomCursor`, `BackgroundGrid`, `Navbar`, `Footer`).
- `src/components/Hero.tsx`: First-fold presentation that embeds the WebGL canvas, dynamic typography, live status badges, and action triggers.
- `src/components/3d/SceneCanvas.tsx` & `ShatteredSphere.tsx`:
  - Implements an interactive 3D sphere that shatters dynamically based on pointer interaction / click.
  - Utilizes `@react-three/fiber` Canvas, procedural geometry fragments, custom materials, and smooth frame-rate loops (`useFrame`).
- `src/components/Projects.tsx`: Showcase grid rendering data from `src/data/projectsData.ts`, linking visitors to the micro-demos or live previews.
- `src/components/Contact.tsx`: Interactive inquiry generator with step-by-step service selectors, budget slider, timeline estimates, and instant WhatsApp payload constructor.

### 2.2 Styling System
- Global style entry in `src/index.css`.
- Tailwind utility classes combined with custom CSS extensions (`dark-950`, `neon-lime`, `surface-glass`, `surface-border`).
- Class merging and conditional styling via `clsx` and `tailwind-merge`.

---

## 3. Micro-Site Architecture (`stylecart/`, `fitforge/`, `lenscraft/`)

Each micro-site is architected to operate with 100% self-reliance:
1. **Zero Runtime Dependencies**: No npm installation or compilation needed. Runs straight from disk or standard HTTP server.
2. **State Management**:
   - `stylecart/script.js`: Self-contained reactive cart model (`cartItems`, `subtotal`, `shippingCalculation`) with LocalStorage syncing.
   - `fitforge/script.js`: Membership selection drawer, day-pass validation, and WhatsApp parameter formatter.
   - `lenscraft/script.js`: Client-side gallery filtering with DOM manipulation, keyboard-navigable modal lightbox with touch swipe handling.
3. **Demo Fallback Mechanism**:
   - Each site inspects configured phone numbers for placeholder tokens (`X` or unconfigured strings).
   - If unconfigured, a rich preview modal surfaces the structured inquiry without breaking or triggering 404s.

---

## 4. Data Flow & Communication

1. **Static Data Layer**:
   - Portfolio metadata resides in `src/data/projectsData.ts` and `src/data/servicesData.ts`.
   - Micro-site inventory and tier models reside in their respective inline scripts (`PRODUCTS`, `MEMBERSHIP_PLANS`).
2. **User Input to Action**:
   - User inputs form fields / selects cart items.
   - JavaScript formats strings into URI-encoded WhatsApp queries: `https://wa.me/{number}?text={encoded}`.
   - The user seamlessly completes the transaction through their native WhatsApp client.
