import React from 'react';
import { Check, ArrowUpRight, Zap } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  price: string;
  badge?: string;
  featured?: boolean;
  idealFor: string;
  description: string;
  deliverables: string[];
  ctaLabel: string;
}

export const Pricing: React.FC = () => {
  const tiers: PricingTier[] = [
    {
      id: 'shop-starter',
      name: 'Shop Starter',
      price: '₹999',
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
      price: '₹1,999',
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
      price: '₹4,999',
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
      price: '₹29,999',
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

  const addOns = [
    { title: 'Interactive 3D Canvas / Physics Mesh', price: '₹9,999', note: 'Bespoke GLSL shader or instanced particle scene' },
    { title: 'Realtime Web Audio DSP Synthesizer', price: '₹4,999', note: 'Interactive audio feedback and harmonic sound design' },
    { title: 'Priority 48-Hour Rapid Delivery', price: '₹2,499', note: 'Fast-track prototype delivery for urgent launches' },
    { title: 'Catalog Expansion Pack (+20 Items)', price: '₹999', note: 'Additional product listings with variant filters' }
  ];

  return (
    <section id="pricing" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neon-lime mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-lime" />
            <span>TRANSPARENT PRICING // PACKAGES</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white">
            INVESTMENT <span className="text-outline">TIERS</span>
          </h2>
        </div>
        <p className="max-w-md text-sm md:text-base text-gray-400 font-light leading-relaxed">
          Transparent, one-time rates with zero recurring subscriptions. Choose a proven baseline architecture or commission an avant-garde 3D Motion Lab experience.
        </p>
      </div>

      {/* 4-Tier Pricing Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`relative flex flex-col justify-between p-7 rounded-2xl transition-all duration-300 ${
              tier.featured
                ? 'glass-panel-glow border-neon-lime/60 shadow-[0_0_30px_rgba(204,255,0,0.1)] bg-dark-900/90'
                : 'glass-panel border-white/10 hover:border-white/30 bg-dark-950/70'
            }`}
          >
            {/* Ribbon Badge */}
            {tier.badge && (
              <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-neon-lime text-black font-mono font-bold text-[9px] uppercase tracking-widest shadow-md">
                {tier.badge}
              </div>
            )}

            <div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-display font-black text-xl uppercase tracking-tight text-white">
                  {tier.name}
                </h3>
              </div>

              <div className="flex items-baseline gap-1 my-3">
                <span className="font-display font-black text-3xl sm:text-4xl text-white">
                  {tier.price}
                </span>
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                  / one-time
                </span>
              </div>

              <span className="block font-mono text-[11px] text-neon-lime/90 mb-3">
                // {tier.idealFor}
              </span>

              <p className="text-xs text-gray-300 font-light leading-relaxed mb-6 pb-6 border-b border-white/10">
                {tier.description}
              </p>

              {/* Deliverables List */}
              <ul className="space-y-2.5 mb-8">
                {tier.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-gray-300 font-sans">
                    <Check className="w-3.5 h-3.5 text-neon-lime shrink-0 mt-0.5" />
                    <span className="leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Select CTA */}
            <a
              href={`#contact?package=${encodeURIComponent(tier.name)}`}
              className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all duration-300 ${
                tier.featured
                  ? 'bg-neon-lime text-black hover:bg-white shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                  : 'bg-white/10 text-white hover:bg-neon-lime hover:text-black border border-white/10'
              }`}
            >
              <span>{tier.ctaLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>

      {/* A-la-carte Add-ons & Custom Enhancements */}
      <div className="mt-16 p-8 rounded-2xl glass-panel border border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neon-lime mb-2">
          <Zap className="w-3.5 h-3.5" />
          <span>A-LA-CARTE MODULAR ADD-ONS</span>
        </div>
        <h3 className="font-display font-bold text-2xl uppercase tracking-tight text-white mb-6">
          PREMIUM 3D & INTERACTIVE CAPABILITIES
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {addOns.map((addon) => (
            <div
              key={addon.title}
              className="p-5 rounded-xl bg-dark-900/60 border border-white/5 flex flex-col justify-between hover:border-neon-lime/40 transition-colors"
            >
              <div>
                <span className="block font-display font-bold text-lg text-white mb-1">
                  {addon.price}
                </span>
                <span className="block font-mono text-xs text-neon-lime font-semibold mb-2">
                  {addon.title}
                </span>
                <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                  {addon.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
