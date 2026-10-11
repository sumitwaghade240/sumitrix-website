# External Integrations & Services

**Project:** SUMITRIX — Creative Developer Portfolio & Multi-Niche Showcase  
**Repository:** `sumitwaghade240/sumitrix-website`  
**Generated:** 2026-10-11  

---

## 1. Overview of External Touchpoints

The project deliberately adopts a **zero-backend, serverless architecture** to keep maintenance costs at zero for local small-business clients. All transactional workflows and customer inquiries leverage client-side protocol handlers, serverless CDN hosting, and messaging integrations.

---

## 2. WhatsApp Business & Communication Bridge

WhatsApp functions as the primary "headless checkout" and lead capture CRM across all portfolio experiences:

| Component | Integration Method | Purpose | Demo Fallback |
| :--- | :--- | :--- | :--- |
| **SUMITRIX Contact Form** (`src/components/Contact.tsx`) | `https://wa.me/{number}?text={encoded}` | Direct project inquiry generation with structured budget, timeline, and scope payload | Interactive modal preview when phone number contains `X` or is unset |
| **StyleCart Checkout** (`stylecart/script.js`) | `https://wa.me/{number}?text={encoded}` | Itemized cart dispatch with customer delivery address, SKU variants, quantity, and total calculation | Preview modal with direct copy & wa.me universal picker |
| **FitForge Passes** (`fitforge/script.js`) | `https://wa.me/{number}?text={encoded}` | 1-day pass booking, slot choice, and membership tier selection | Preview modal with direct copy & wa.me universal picker |
| **LensCraft Inquiries** (`lenscraft/script.js`) | `https://wa.me/{number}?text={encoded}` | Shoot date inquiry, package selection (Weddings, Portraits, Pre-wedding), location details | Preview modal with direct copy & wa.me universal picker |

---

## 3. Font & Asset Delivery CDNs

| Provider | Endpoint | Purpose |
| :--- | :--- | :--- |
| **Google Fonts** | `https://fonts.googleapis.com` | Typography delivery: *Syne*, *Space Grotesk*, *JetBrains Mono*, *Playfair Display*, *DM Sans*, *Plus Jakarta Sans* |
| **Unsplash CDN** | `https://images.unsplash.com` | High-fidelity editorial imagery for project cards, demo storefront goods, fitness equipment, and gallery photos |

---

## 4. Hosting & Deployment Providers

The codebase is built for multi-target static deployment:

1. **Netlify Drop / Netlify CI**:
   - Production build: `npm run build` generates `dist/`.
   - Sub-directories (`stylecart/`, `fitforge/`, `lenscraft/`) are either statically served or colocated.
   - Zero-configuration static asset routing.
2. **Vercel / GitHub Pages**:
   - Vite static output compatible with single-page routing or static multi-page deployment.
3. **Local Standalone Python HTTP Server**:
   - `python -m http.server 8080` for immediate zero-dependency previews.

---

## 5. Third-Party Web APIs (Browser Native)

- **WebGL 2.0 / Canvas API**: Used by Three.js and `@react-three/fiber` for real-time mesh shattering, lighting, and camera orbit.
- **Web Audio API** (referenced in Synthetix concept): Real-time waveform and audio frequency analysis.
- **LocalStorage API**: Persistent cart state in `stylecart/script.js`.
- **Clipboard API**: Used for 1-click message copying across contact and preview modals.
- **Scroll & IntersectionObserver APIs**: Sticky navigation state tracking and section highlights.
