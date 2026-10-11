# Requirements & Capability Matrix

**Project:** SUMITRIX — Creative Developer Portfolio & Multi-Niche Showcase  
**Repository:** `sumitwaghade240/sumitrix-website`  
**Generated:** 2026-10-11  

---

## 1. Verified Functional Capabilities (Current State)

### 1.1 Core SPA Portfolio (`/`)
- [x] **REQ-CORE-01**: React 19 + TypeScript single-page app structure with smooth section anchor scrolling.
- [x] **REQ-CORE-02**: WebGL 3D Hero scene featuring an interactive sphere that fractures on pointer interaction.
- [x] **REQ-CORE-03**: Custom hardware-accelerated cursor with hover scaling and magnet state.
- [x] **REQ-CORE-04**: Active navigation tracking highlighting current section in viewport.
- [x] **REQ-CORE-05**: Interactive project showcase card grid linking to live niche demo applications.
- [x] **REQ-CORE-06**: Tiered freelance service pricing calculator (Shop, Portfolio, Business, 3D Lab).
- [x] **REQ-CORE-07**: Multi-step project inquiry wizard generating structured WhatsApp messages with modal preview fallback.

### 1.2 StyleCart Boutique (`/stylecart/`)
- [x] **REQ-STYLE-01**: High-fashion catalogue grid with pricing, discount badges, and stock indicators.
- [x] **REQ-STYLE-02**: Interactive variant selection (size swatches, color options) per product.
- [x] **REQ-STYLE-03**: Slide-out cart drawer with item quantity adjustments and dynamic subtotal.
- [x] **REQ-STYLE-04**: Free shipping progress indicator calculating gap to ₹999 threshold.
- [x] **REQ-STYLE-05**: Direct-to-WhatsApp order dispatch encoding cart items, delivery address, and payment method.

### 1.3 FitForge Athletic Club (`/fitforge/`)
- [x] **REQ-FIT-01**: High-impact athletic facility showcase and trainer roster with credentials.
- [x] **REQ-FIT-02**: Interactive 1-Day trial pass booking modal with preferred time slot selector.
- [x] **REQ-FIT-03**: Membership tier comparison (Monthly, Quarterly, Annual) with direct WhatsApp enrollment.

### 1.4 LensCraft Photography Studio (`/lenscraft/`)
- [x] **REQ-LENS-01**: Editorial photography showcase with real-time category filtering (All, Weddings, Portraits, Stories).
- [x] **REQ-LENS-02**: Keyboard-navigable full-screen lightbox modal with touch swipe gestures.
- [x] **REQ-LENS-03**: Shoot availability booking form dispatching package type and event dates to WhatsApp.

---

## 2. Technical & Non-Functional Requirements

- [x] **REQ-NFR-01**: Clean build pipeline (`npm run build` passing with 0 TypeScript/Rollup errors).
- [x] **REQ-NFR-02**: Fully client-side execution requiring zero backend server setup.
- [x] **REQ-NFR-03**: Fallback preview modal active when WhatsApp numbers are set to placeholder values.
- [ ] **REQ-NFR-04**: Rollup chunk splitting to eliminate the 500kB+ vendor bundle warning for 3D dependencies.
- [ ] **REQ-NFR-05**: Local offline asset caching for external Unsplash images.
- [ ] **REQ-NFR-06**: Automated client handover configuration script or UI customizer.
