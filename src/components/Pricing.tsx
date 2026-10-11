import React from 'react';
import { Check, ArrowUpRight, Zap, Globe2 } from 'lucide-react';
import {
  COUNTRIES,
  PRICING_TIERS_META,
  ADDONS_META,
  getCountryConfig,
  getTierPrice,
  getAddOnPrice
} from '../data/pricingData';

interface PricingProps {
  selectedCountryCode: string;
  onSelectCountry: (countryCode: string) => void;
  onSelectPackage?: (packageId: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({
  selectedCountryCode,
  onSelectCountry,
  onSelectPackage
}) => {
  const currentCountry = getCountryConfig(selectedCountryCode);

  const handleSelectPackage = (tierId: string) => {
    onSelectPackage?.(tierId);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
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

      {/* Country & Currency Switcher Bar */}
      <div className="mb-10 p-5 rounded-2xl glass-panel border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 bg-dark-950/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-center text-lg shadow-inner">
            {currentCountry.flag}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-3.5 h-3.5 text-neon-lime" />
              <span className="font-mono text-xs uppercase tracking-wider text-neon-lime font-semibold">
                Regional Currency Selector
              </span>
            </div>
            <span className="text-xs text-gray-300 font-sans block mt-0.5">
              Active currency: <strong className="text-white font-semibold">{currentCountry.name}</strong> ({currentCountry.currency} · {currentCountry.symbol})
            </span>
          </div>
        </div>

        {/* Responsive Country Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          {COUNTRIES.map((country) => {
            const isSelected = country.code === selectedCountryCode;
            return (
              <button
                key={country.code}
                type="button"
                onClick={() => onSelectCountry(country.code)}
                className={`px-3 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-neon-lime text-black font-bold shadow-[0_0_15px_rgba(204,255,0,0.3)] scale-[1.02]'
                    : 'bg-dark-900/90 border border-white/10 text-gray-300 hover:border-white/30 hover:text-white'
                }`}
              >
                <span className="text-sm">{country.flag}</span>
                <span>{country.code}</span>
                <span className={isSelected ? 'text-black/80' : 'text-gray-400'}>
                  ({country.symbol})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4-Tier Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {PRICING_TIERS_META.map((tier) => {
          const price = getTierPrice(selectedCountryCode, tier.id);
          return (
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
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-display font-black text-xl uppercase tracking-tight text-white">
                    {tier.name}
                  </h3>
                </div>

                {/* Starting At Label & Price */}
                <div className="my-3">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">
                    Starting at
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-black text-3xl sm:text-4xl text-white">
                      {price}
                    </span>
                    <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                      / {currentCountry.currency}
                    </span>
                  </div>
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
              <button
                type="button"
                onClick={() => handleSelectPackage(tier.id)}
                className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all duration-300 ${
                  tier.featured
                    ? 'bg-neon-lime text-black hover:bg-white shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                    : 'bg-white/10 text-white hover:bg-neon-lime hover:text-black border border-white/10'
                }`}
              >
                <span>{tier.ctaLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Indicative Starting Rates Note */}
      <div className="mt-8 text-center px-4">
        <p className="font-mono text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
          * Prices are indicative starting rates. Final quotes depend on project scope, features, content, and requirements.
        </p>
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
          {ADDONS_META.map((addon) => {
            const addOnPrice = getAddOnPrice(selectedCountryCode, addon.id);
            return (
              <div
                key={addon.id}
                className="p-5 rounded-xl bg-dark-900/60 border border-white/5 flex flex-col justify-between hover:border-neon-lime/40 transition-colors"
              >
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">
                    Starting at
                  </span>
                  <span className="block font-display font-bold text-lg text-white mb-1">
                    {addOnPrice}
                  </span>
                  <span className="block font-mono text-xs text-neon-lime font-semibold mb-2">
                    {addon.title}
                  </span>
                  <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                    {addon.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
