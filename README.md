# SUMITRIX — Creative Developer Portfolio & Three-Niche Freelance Showcase

A dual-purpose creative engineering platform designed for a frontend developer:
1. **Ultra-Premium 3D Agency Portfolio (`/`)**: Built with **React 19, TypeScript, Tailwind CSS, Vite, and Three.js (WebGL physics & interactive kinetic typography)** to pitch high-end creative web development to agencies and brands.
2. **Three Niche Local Business Websites**: Built with **pure HTML5, CSS3, and JavaScript** with **zero monthly platform fees** and an automated WhatsApp headless checkout bridge.
3. **Preserved Static Portfolio (`/legacy_portfolio/`)**: Archived vanilla single-page portfolio for zero-dependency environments.

---

## 🌟 Portfolio Overview & Live Demos

This project contains **three complete, distinct niche experiences** plus the **creative developer portfolio**:

| Experience | Directory | Target Client Type | Core Workflow |
| :--- | :--- | :--- | :--- |
| **SUMITRIX Modern 3D Portfolio** | `/` (`src/`) | Agencies, startups & creative brands | Interactive 3D WebGL sphere, package pricing & multi-step WhatsApp inquiry wizard |
| **StyleCart** | `/stylecart/` | Clothing shops & fashion boutiques | Variant selectors (Size/Colour), cart drawer & automated WhatsApp order dispatch |
| **FitForge** | `/fitforge/` | Gyms, fitness studios & athletic clubs | Facility showcase, trial pass booking & membership enquiry via WhatsApp |
| **LensCraft** | `/lenscraft/` | Wedding & portrait photographers | Categorized photo stories, accessible lightbox & booking availability enquiry |
| **Static Legacy Portfolio** | `/legacy_portfolio/` | Reference & lightweight hosting | Standalone vanilla HTML5/CSS3/JS predecessor with enquiry modal |

---

## 💡 The Value Proposition for Local Clients

When pitching to local retail shop and gym owners, explain why pure standard code outperforms expensive platforms:

1. **₹0 Monthly Software Costs**: Avoids ₹2,500–₹3,500/month Shopify or Wix subscription fees, plus payment gateway commission cuts.
2. **Built for Local Buying Behavior**: Many local shoppers prefer confirming stock and paying via UPI (GPay / PhonePe / Paytm) or Cash on Delivery over entering credit card details on unfamiliar checkout portals.
3. **Fast, Lightweight Loading**: Pure standard HTML, CSS, and JavaScript with zero heavy framework, database, or plugin overhead.
4. **100% Code Ownership**: Clients own their source code forever, hosted on ultra-fast global content delivery networks at zero hosting cost.

---

## 📁 Project Directory Structure

```text
lenscraft-photography-website/
├── index.html                  # Modern Vite SPA Entry Point
├── vite.config.ts              # Vite 6 config with vendor chunk code-splitting
├── tailwind.config.js          # Custom dark tokens & neon lime palette
├── tsconfig.json               # Strict TypeScript configuration
├── package.json                # Dependencies (React 19, Three.js, Lucide, GSAP, etc.)
│
├── src/                        # Modern Creative 3D Web Application
│   ├── components/             # UI Sections & 3D WebGL Canvas
│   │   ├── 3d/                 # SceneCanvas & ShatteredSphere (React Three Fiber)
│   │   ├── Hero.tsx            # Kinetic typography & lazy-loaded 3D WebGL canvas
│   │   ├── Projects.tsx        # Project showcase linking to niche demo sites
│   │   ├── Pricing.tsx         # Tiered client service packages
│   │   ├── Contact.tsx         # Interactive inquiry generator & WhatsApp bridge
│   │   └── ...                 # Navbar, CustomCursor, Services, About, Footer
│   ├── data/                   # Data models (projectsData.ts, servicesData.ts)
│   ├── App.tsx                 # Root coordinator component
│   └── main.tsx                # React DOM mount point
│
├── public/                     # Static assets automatically served & bundled to dist/
│   ├── fitforge/               # Niche Demo 2: Gym Website (Static)
│   ├── lenscraft/              # Niche Demo 3: Photography Portfolio (Static)
│   ├── stylecart/              # Niche Demo 1: Boutique Store (Static)
│   └── legacy_portfolio/       # Archived Static Freelance Portfolio (Static)
│
├── stylecart/                  # Niche 1: Boutique Clothing Store Catalogue
├── fitforge/                   # Niche 2: Gym & Fitness Athletic Club
├── lenscraft/                  # Niche 3: Photography Portfolio
├── legacy_portfolio/           # Canonical Static Legacy Single-Page Portfolio
│
└── README.md                   # Client launch configuration guide & documentation
```

---

## ⚙️ Pre-Launch Client Configuration Checklist

Before deploying any of these websites for a paying client or production launch, replace all placeholder configurations and demo content detailed below:

### 1. Developer Portfolio

| Experience | File | Configuration / Content | Current Default | Client / Production Replacement |
| :--- | :--- | :--- | :--- | :--- |
| **Modern React SPA** | `src/components/Contact.tsx` | `DEVELOPER_WHATSAPP_NUMBER` | `"91XXXXXXXXXX"` | Developer's real WhatsApp number (10–15 digits without `+` or spaces). |
| **Modern React SPA** | `src/components/Contact.tsx` | Developer Name | `"Sumit Waghade"` | Freelancer's real display name used in automated messages. |
| **Legacy Static** | `legacy_portfolio/script.js` | `DEVELOPER_WHATSAPP_NUMBER` | `"91XXXXXXXXXX"` | Developer's real WhatsApp number in static archive. |
| **Global Meta** | `index.html` | Meta title & description | SUMITRIX — Sumit Waghade | Your localized SEO keywords. |

### 2. StyleCart Boutique (`/stylecart/`)

| File | Configuration / Content | Current Default | Client / Production Replacement |
| :--- | :--- | :--- | :--- |
| `stylecart/script.js` | `SHOP_WHATSAPP_NUMBER` | `"91XXXXXXXXXX"` | Boutique owner's WhatsApp number. |
| `stylecart/script.js` | `FREE_SHIPPING_THRESHOLD` | `999` | Store's actual free shipping order value in INR. |
| `stylecart/script.js` | `STANDARD_SHIPPING_FEE` | `99` | Store's standard courier delivery fee in INR. |
| `stylecart/script.js` | `PRODUCTS` array | 8 demo garments | Real store inventory: product names, prices, MRPs, sizes, colors (hex + name), and licensed product photography. |
| `stylecart/index.html` | Store name & logo | `STYLECART`, `SC` | Client's boutique name, logo mark, and banner. |
| `stylecart/index.html` | Store policies | Sample policies (24h dispatch, 48h exchange) | Client's actual delivery turnaround and return/exchange policy. |

### 3. FitForge Gym Website (`/fitforge/`)

| File | Configuration / Content | Current Default | Client / Production Replacement |
| :--- | :--- | :--- | :--- |
| `fitforge/script.js` | `GYM_WHATSAPP_NUMBER` | `"91XXXXXXXXXX"` | Gym manager's or front-desk WhatsApp number. |
| `fitforge/index.html` | Gym brand & logo | `FITFORGE`, `FF` | Client's gym name and brand logo. |
| `fitforge/index.html` | Address & Location | Fictional Civil Lines address | Real gym street address, landmark, city, and pincode. |
| `fitforge/index.html` | Reception Phone | `+91 98765 43210` | Real front-desk telephone / mobile number. |
| `fitforge/index.html` | Operating hours | 5:30 AM – 10:30 PM sample | Real gym operating hours, weekend schedules, and women-only slots. |
| `fitforge/index.html` | Coaches & Certifications | Vikram Rathi, Ananya, Arjun | Real gym trainers, verified credentials (CSCS, ACE, K11, etc.), and photos. |
| `fitforge/index.html` | Membership tiers & rates | ₹1,499, ₹3,799, ₹11,999 | Actual membership rates, billing intervals, and included amenities. |
| `fitforge/index.html` | Facility zones & equipment | 8,000 sq.ft sample floor plan | Real gym equipment inventory (plates, machines, turf, sauna). |

### 4. LensCraft Photography Studio (`/lenscraft/`)

| File | Configuration / Content | Current Default | Client / Production Replacement |
| :--- | :--- | :--- | :--- |
| `lenscraft/script.js` | `WHATSAPP_NUMBER` | `"91XXXXXXXXXX"` | Photographer's WhatsApp number. |
| `lenscraft/index.html` | Studio name & monogram | `LENSCRAFT`, `L·C` | Photographer or studio name. |
| `lenscraft/index.html` | Studio location | Sample: Yavatmal, Maharashtra | Actual studio city and travel availability radius. |
| `lenscraft/index.html` | Portfolio Gallery | Sample Unsplash photographs | Client's licensed, high-resolution original photography work. |
| `lenscraft/index.html` | Services & Packages | Weddings, Pre-wedding, Portraits | Studio's actual packages, shoot deliverables, and booking terms. |

---

## 📱 Phone Number Format Rules

When configuring phone numbers in any `script.js` file:

- **Format**: International digits-only format **without** `+`, spaces, dashes, or parentheses.
- **India**: `91` followed by the 10-digit mobile number (e.g., `"919876543210"`).
- **US/Canada**: `1` followed by the 10-digit number (e.g., `"12025550123"`).
- **UK**: `44` followed by the mobile number without the leading `0` (e.g., `"447911123456"`).

### 🧪 Interactive Demo Mode (Safe Testing Mode)

If any phone number constant contains `X` or has not been configured (such as `"91XXXXXXXXXX"`):
1. Clicking any WhatsApp enquiry or order button displays an interactive **WhatsApp Message Preview Modal**.
2. You can inspect the exact formatted message generated by the system.
3. The modal provides a **Copy Message Text** button and a **Launch in WhatsApp ↗** button (using WhatsApp's universal contact-picker endpoint `https://wa.me/?text=...`).
4. This ensures clients or examiners can test the complete form workflow on mobile or desktop without needing a live client phone number!

---

## 🖥️ How to Preview Locally

### Option A: Python Local Server (Recommended)
Open PowerShell or Terminal in the project root directory and run:
```bash
python -m http.server 8080
```
Then open `http://localhost:8080` in your web browser.

### Option B: Node.js / npx
```bash
npx serve .
```

### Option C: Direct Browser Opening
Open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari).

---

## 🚀 100% Free Deployment (Zero Software Budget)

### Method 1: Netlify Drop (Easiest — No Git required)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Sign in or create a free account.
3. Drag and drop the repository folder directly into the upload area.
4. Netlify will provision an HTTPS live URL immediately.
5. In Site Settings, customize the site subdomain (e.g., `https://sumitrix-portfolio.netlify.app`).

### Method 2: Vercel CLI / Git
1. Install the Vercel CLI: `npm i -g vercel`.
2. Run `vercel` in the project root and follow default prompts.
3. Your multi-site portfolio is deployed with free SSL and edge CDN.

### Method 3: GitHub Pages
1. Push this folder to a GitHub repository.
2. In the repository, go to **Settings** → **Pages**.
3. Under **Build and deployment**, choose `Deploy from a branch` and select `main` / `/ (root)`.
4. Click **Save** to publish at `https://your-username.github.io/your-repo/`.

---

## 🎯 Freelance Client Pitch Scripts

### Pitch 1: Clothing Boutiques & Instagram Shops
> *"Hi [Shop Name]! Loved your new collection drop. I noticed you handle orders through Instagram DMs, which often requires answering repetitive questions about available sizes, colors, and prices. I built a mobile-friendly WhatsApp catalogue demo (**StyleCart**) where customers pick their size and colour, and the order arrives in your WhatsApp fully calculated with their delivery address—with ₹0 monthly software fees. Would you like me to send you the 30-second live demo link?"*

### Pitch 2: Gyms & Athletic Studios
> *"Hello [Gym Name]! I noticed that many people find your gym through Instagram or Google Maps but don't know the exact membership pricing or how to book a trial. I created a high-energy gym website demo (**FitForge**) with a 1-Day Free Trial pass form that sends leads straight to your WhatsApp coordinator. No complex software needed. Can I share the demo link with you to take a look?"*

### Pitch 3: Wedding & Portrait Photographers
> *"Hi [Photographer Name]! Your photography work is stunning. Right now, sending slow PDF price guides to prospective wedding clients often leads to dropped conversations. I designed an editorial portfolio website (**LensCraft**) that showcases your stories in high resolution with category filters and an instant WhatsApp date check. Happy to share the live demo link with you!"*

---

## 📝 Demo Notice & Disclaimers

- **StyleCart**, **FitForge**, and **LensCraft** are conceptual demonstration brands built to illustrate real business workflows.
- All product listings, gym coach bios, certifications (CSCS/ACE/ISSA), statistics, pricing packages, and physical locations are sample demonstration content.
- No monetary transactions are processed through online credit card payment gateways; all workflows generate structured WhatsApp messages directly between the customer and the business coordinator.
