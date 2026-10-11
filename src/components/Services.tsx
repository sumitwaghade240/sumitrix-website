import React, { useState } from 'react';
import { SERVICES } from '../data/servicesData';
import { Plus, Minus, Check } from 'lucide-react';

export const Services: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="services" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neon-lime mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-lime" />
            <span>CORE CAPABILITIES // 02</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white">
            SERVICES & <span className="text-outline">CRAFT</span>
          </h2>
        </div>
        <p className="max-w-md text-sm md:text-base text-gray-400 font-light leading-relaxed">
          Comprehensive digital execution spanning experimental WebGL spatial canvases to enterprise-grade type-safe web applications.
        </p>
      </div>

      {/* Editorial Accordion & Interactive List */}
      <div className="mt-8 flex flex-col divide-y divide-white/10 border-y border-white/10">
        {SERVICES.map((service, index) => {
          const isOpen = expandedIndex === index;
          return (
            <div
              key={service.number}
              className={`group transition-colors duration-300 ${
                isOpen ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'
              }`}
            >
              <button
                type="button"
                onClick={() => setExpandedIndex(isOpen ? null : index)}
                className="w-full py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between text-left gap-4 md:gap-8 outline-none"
                aria-expanded={isOpen}
              >
                {/* Number & Service Name */}
                <div className="flex items-baseline gap-6 md:gap-12 flex-1">
                  <span className="font-mono text-xs md:text-sm text-neon-lime font-bold">
                    {service.number}
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                    <h3 className="font-display font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white group-hover:text-neon-lime transition-colors">
                      {service.title}
                    </h3>
                    <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">
                      // {service.subtitle}
                    </span>
                  </div>
                </div>

                {/* Toggle Icon */}
                <div className="flex items-center gap-4 self-end md:self-center">
                  <div className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white group-hover:border-neon-lime group-hover:text-neon-lime transition-colors">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Collapsible Content */}
              {isOpen && (
                <div className="pb-10 pt-2 grid grid-cols-1 md:grid-cols-12 gap-8 items-start pl-10 md:pl-20 pr-4 animate-in fade-in duration-300">
                  <div className="md:col-span-6">
                    <p className="text-base text-gray-300 font-light leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2">
                      {service.techPillars.map((pillar) => (
                        <span
                          key={pillar}
                          className="px-2.5 py-1 rounded text-[11px] font-mono uppercase bg-neon-lime/10 text-neon-lime border border-neon-lime/30"
                        >
                          {pillar}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-6 bg-dark-900/50 p-6 rounded-xl border border-white/5">
                    <span className="block font-mono text-xs uppercase tracking-wider text-gray-400 mb-3">
                      Deliverables & Outcomes
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-gray-300 font-mono">
                          <Check className="w-3.5 h-3.5 text-neon-lime shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
