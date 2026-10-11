export interface CountryConfig {
  code: string;
  name: string;
  currency: string;
  symbol: string;
  flag: string;
}

export interface PricingTierMeta {
  id: string;
  name: string;
  badge?: string;
  featured?: boolean;
  idealFor: string;
  description: string;
  deliverables: string[];
  ctaLabel: string;
}

export interface AddOnMeta {
  id: string;
  title: string;
  note: string;
}

export const COUNTRIES: CountryConfig[] = [
  { code: 'IN', name: 'India', currency: 'INR', symbol: '₹', flag: '🇮🇳' },
  { code: 'US', name: 'United States', currency: 'USD', symbol: '$', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', symbol: '£', flag: '🇬🇧' },
  { code: 'EU', name: 'European Union', currency: 'EUR', symbol: '€', flag: '🇪🇺' },
  { code: 'CA', name: 'Canada', currency: 'CAD', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', currency: 'AUD', symbol: 'A$', flag: '🇦🇺' },
  { code: 'AE', name: 'United Arab Emirates', currency: 'AED', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'SG', name: 'Singapore', currency: 'SGD', symbol: 'S$', flag: '🇸🇬' },
];

export const PRICING_TIERS_META: PricingTierMeta[] = [
  {
    id: 'shop-starter',
    name: 'Shop Starter',
    idealFor: 'Boutiques, Instagram Sellers & D2C Brands',
    description: 'A streamlined catalogue storefront engineered to convert visitors directly into WhatsApp orders with zero monthly fees.',
    deliverables: [
      'Custom catalogue with up to 15 products',
      'Size, color, and variant selection pills',
      'Slide-out shopping bag & live total tally',
      'Direct WhatsApp order message generator',
      'Free lifetime static hosting (Netlify / Vercel)',
      '100% responsive on all mobile viewports'
    ],
    ctaLabel: 'Select Shop Starter'
  },
  {
    id: 'portfolio-starter',
    name: 'Portfolio Starter',
    idealFor: 'Photographers, Creators & Visual Artists',
    description: 'An editorial visual gallery designed to showcase high-resolution creative work with elegance and tactile navigation.',
    deliverables: [
      'Curated categorized masonry gallery grid',
      'Fullscreen lightbox with keyboard navigation',
      'Artist bio, story, and equipment credentials',
      'Event & commercial shoot booking forms',
      'High-DPI asset optimization & fast CDN delivery',
      'Custom domain setup & DNS configuration'
    ],
    ctaLabel: 'Select Portfolio Starter'
  },
  {
    id: 'business-starter',
    name: 'Business Starter',
    badge: 'HIGH DEMAND',
    featured: true,
    idealFor: 'Gyms, Clinics, Salons & Service Providers',
    description: 'A high-converting commercial landing hub built to capture leads, showcase facilities, and route client bookings.',
    deliverables: [
      'Comprehensive multi-section landing hub',
      'Team credentials & facility showcase carousels',
      'Interactive lead calculators & enquiry forms',
      'Direct WhatsApp appointment routing',
      'Google Maps integration & operational hours',
      'Local SEO tags & high Core Web Vitals speed'
    ],
    ctaLabel: 'Select Business Starter'
  },
  {
    id: '3d-motion-lab',
    name: '3D Motion Lab',
    badge: 'STUDIO MASTERPIECE',
    idealFor: 'Visionary Tech Brands & Luxury Flagships',
    description: 'An Awwwards-caliber spatial web experience featuring bespoke 3D physics, real-time shaders, and cinematic motion.',
    deliverables: [
      'Custom React Three Fiber & Three.js 3D scene',
      'Faceted glass PBR transmission materials',
      'Interactive pointer parallax & click-and-hold shatter',
      'GSAP ScrollTrigger kinetic typography choreography',
      'Real-time Web Audio DSP synthesizer sound effects',
      '60 FPS GPU-optimized desktop & touch performance'
    ],
    ctaLabel: 'Commission 3D Motion Lab'
  }
];

export const ADDONS_META: AddOnMeta[] = [
  { id: '3d-canvas', title: 'Interactive 3D Canvas / Physics Mesh', note: 'Bespoke GLSL shader or instanced particle scene' },
  { id: 'web-audio', title: 'Realtime Web Audio DSP Synthesizer', note: 'Interactive audio feedback and harmonic sound design' },
  { id: 'rapid-delivery', title: 'Priority 48-Hour Rapid Delivery', note: 'Fast-track prototype delivery for urgent launches' },
  { id: 'catalog-expansion', title: 'Catalog Expansion Pack (+20 Items)', note: 'Additional product listings with variant filters' }
];

export interface CountryPricingMap {
  [countryCode: string]: {
    packages: { [tierId: string]: string };
    addOns: { [addonId: string]: string };
  };
}

export const COUNTRY_PRICING: CountryPricingMap = {
  IN: {
    packages: {
      'shop-starter': '₹999',
      'portfolio-starter': '₹1,499',
      'business-starter': '₹1,999',
      '3d-motion-lab': '₹29,999'
    },
    addOns: {
      '3d-canvas': '₹9,999',
      'web-audio': '₹4,999',
      'rapid-delivery': '₹2,499',
      'catalog-expansion': '₹999'
    }
  },
  US: {
    packages: {
      'shop-starter': '$29',
      'portfolio-starter': '$45',
      'business-starter': '$59',
      '3d-motion-lab': '$799'
    },
    addOns: {
      '3d-canvas': '$249',
      'web-audio': '$129',
      'rapid-delivery': '$69',
      'catalog-expansion': '$29'
    }
  },
  GB: {
    packages: {
      'shop-starter': '£25',
      'portfolio-starter': '£39',
      'business-starter': '£49',
      '3d-motion-lab': '£699'
    },
    addOns: {
      '3d-canvas': '£219',
      'web-audio': '£109',
      'rapid-delivery': '£59',
      'catalog-expansion': '£25'
    }
  },
  EU: {
    packages: {
      'shop-starter': '€29',
      'portfolio-starter': '€45',
      'business-starter': '€59',
      '3d-motion-lab': '€799'
    },
    addOns: {
      '3d-canvas': '€249',
      'web-audio': '€129',
      'rapid-delivery': '€69',
      'catalog-expansion': '€29'
    }
  },
  CA: {
    packages: {
      'shop-starter': 'C$39',
      'portfolio-starter': 'C$59',
      'business-starter': 'C$79',
      '3d-motion-lab': 'C$1,099'
    },
    addOns: {
      '3d-canvas': 'C$349',
      'web-audio': 'C$179',
      'rapid-delivery': 'C$89',
      'catalog-expansion': 'C$39'
    }
  },
  AU: {
    packages: {
      'shop-starter': 'A$45',
      'portfolio-starter': 'A$69',
      'business-starter': 'A$89',
      '3d-motion-lab': 'A$1,199'
    },
    addOns: {
      '3d-canvas': 'A$379',
      'web-audio': 'A$199',
      'rapid-delivery': 'A$99',
      'catalog-expansion': 'A$45'
    }
  },
  AE: {
    packages: {
      'shop-starter': 'د.إ 109',
      'portfolio-starter': 'د.إ 169',
      'business-starter': 'د.إ 219',
      '3d-motion-lab': 'د.إ 2,899'
    },
    addOns: {
      '3d-canvas': 'د.إ 899',
      'web-audio': 'د.إ 479',
      'rapid-delivery': 'د.إ 249',
      'catalog-expansion': 'د.إ 109'
    }
  },
  SG: {
    packages: {
      'shop-starter': 'S$39',
      'portfolio-starter': 'S$59',
      'business-starter': 'S$79',
      '3d-motion-lab': 'S$1,099'
    },
    addOns: {
      '3d-canvas': 'S$349',
      'web-audio': 'S$179',
      'rapid-delivery': 'S$89',
      'catalog-expansion': 'S$39'
    }
  }
};

export const getCountryConfig = (code: string): CountryConfig => {
  return COUNTRIES.find((c) => c.code === code) || COUNTRIES[0];
};

export const getTierPrice = (countryCode: string, tierId: string): string => {
  const countryPricing = COUNTRY_PRICING[countryCode] || COUNTRY_PRICING.IN;
  return countryPricing.packages[tierId] || COUNTRY_PRICING.IN.packages[tierId];
};

export const getAddOnPrice = (countryCode: string, addonId: string): string => {
  const countryPricing = COUNTRY_PRICING[countryCode] || COUNTRY_PRICING.IN;
  return countryPricing.addOns[addonId] || COUNTRY_PRICING.IN.addOns[addonId];
};
