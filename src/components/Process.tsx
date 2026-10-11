import React from 'react';
import { PROCESS_STEPS } from '../data/servicesData';

export const Process: React.FC = () => {
  return (
    <section id="process" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neon-lime mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-lime" />
            <span>METHODOLOGY // 04</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white">
            THE <span className="text-outline">PROCESS</span>
          </h2>
        </div>
        <p className="max-w-md text-sm md:text-base text-gray-400 font-light leading-relaxed">
          From abstract concept to deployed production masterpiece: a structured five-stage engineering and design lifecycle.
        </p>
      </div>

      {/* Visual Timeline Cards */}
      <div className="relative mt-12">
        {/* Continuous Timeline Line (Vertical on desktop) */}
        <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-neon-lime via-white/20 to-transparent -translate-x-1/2" />

        <div className="flex flex-col gap-12 lg:gap-20">
          {PROCESS_STEPS.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={step.step}
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content Box */}
                <div className="w-full lg:w-1/2">
                  <div
                    className={`p-8 rounded-2xl glass-panel border border-white/10 hover:border-neon-lime/40 transition-all duration-300 relative group ${
                      isEven ? 'lg:mr-10' : 'lg:ml-10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-black text-neon-lime">
                        {step.step}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 border border-white/10 px-2 py-0.5 rounded">
                        PHASE {step.step}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mb-1 group-hover:text-neon-lime transition-colors">
                      {step.title}
                    </h3>

                    <p className="font-mono text-xs text-neon-lime/80 mb-4">
                      {step.tagline}
                    </p>

                    <p className="text-sm text-gray-300 font-light leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Step Focus Items */}
                    <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                      {step.focus.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded text-[11px] font-mono text-gray-300 bg-white/5 border border-white/5"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Central Milestone Node (Desktop) */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-dark-950 border-2 border-neon-lime items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.4)] z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-neon-lime" />
                </div>

                {/* Empty opposite spacer for alternating timeline on desktop */}
                <div className="hidden lg:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
