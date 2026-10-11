# Project Specification: SUMITRIX

**Name:** SUMITRIX — Creative Developer Portfolio & Multi-Niche Showcase  
**Repository:** `sumitwaghade240/sumitrix-website`  
**Creator / Developer:** Sumit Waghade  
**Status:** Active Brownfield Codebase  
**Last Updated:** 2026-10-11  

---

## 1. Executive Summary

**SUMITRIX** is an ultra-premium, interactive 3D creative developer portfolio paired with a live multi-niche freelance sales platform. It addresses two core business objectives:
1. **Developer Agency Showcase**: Positions Sumit Waghade as an elite creative frontend engineer specializing in Three.js/WebGL interactive physics, kinetic typography, and high-performance modern web applications.
2. **Direct Client Acquisition Engine**: Delivers zero-maintenance, zero-subscription live demo websites for local business niches (Fashion Boutiques, Fitness Clubs, and Photography Studios) with an integrated WhatsApp headless ordering and enquiry pipeline.

---

## 2. Target Market & Value Proposition

### 2.1 For Enterprise & Creative Agencies
- Showcases deep WebGL/Three.js competency through dynamic mesh physics (interactive shattering glass sphere), hardware-accelerated custom cursor, and silky 60fps animations.
- Proves production-grade React 19, TypeScript, and modern bundler fluency.

### 2.2 For Local Small Businesses (Boutiques, Gyms, Photographers)
- **₹0 Monthly Software Fees**: Replaces expensive platform subscriptions (Shopify, Wix, Squarespace) and payment gateway fees.
- **Localized Conversion Workflow**: Connects directly to WhatsApp, where local clients already conduct 90%+ of their customer communication, inquiries, and UPI payments.
- **Fast, Lightweight Performance**: Static deployment with zero backend maintenance requirements.

---

## 3. Core Architectural Modules

1. **Modern Portfolio SPA (`src/`)**:
   - Single-page application built on Vite, React 19, and Tailwind CSS.
   - 3D interactive hero with real-time fragment physics (`src/components/3d/`).
   - Project showcase, service capability matrix, transparent pricing tiers, timeline process, and interactive contact wizard.
2. **StyleCart Boutique Demo (`/stylecart/`)**:
   - High-fashion apparel storefront with variant swatches (size/color), dynamic cart drawer, and WhatsApp checkout encoding.
3. **FitForge Athletic Club Demo (`/fitforge/`)**:
   - High-energy gym website featuring 1-day trial pass booking, coach profiles, membership tier comparisons, and automated lead capture.
4. **LensCraft Photography Studio Demo (`/lenscraft/`)**:
   - Editorial photography portfolio featuring categorized masonry gallery, accessible keyboard lightbox, and date availability booking.
5. **Preserved Legacy Portfolio (`/legacy_portfolio/`)**:
   - Standalone static precursor for archival reference and zero-dependency environments.

---

## 4. Key Constraints & Guiding Principles

- **Zero-Backend Dependency**: Retain pure client-side architecture so hosting costs remain ₹0 across free tiers (Netlify, Vercel, GitHub Pages).
- **Graceful Fallbacks**: Any demo mode or unconfigured contact number must gracefully display the interactive preview modal rather than failing.
- **Aesthetic Excellence**: Dark-mode primary palette (`#070709`), high-contrast neon accents (`#ccff00`), and fluid micro-animations across all touchpoints.
