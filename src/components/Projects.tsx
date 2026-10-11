import React, { useState } from 'react';
import { PROJECTS } from '../data/projectsData';
import { ArrowUpRight, Play, Sparkles, CheckCircle2 } from 'lucide-react';

export const Projects: React.FC = () => {
  const [synthetixAudioPlaying, setSynthetixAudioPlaying] = useState(false);

  // Synthesizer demo for Synthetix Aether
  const toggleSynthetixDemo = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      if (!synthetixAudioPlaying) {
        // Play harmonic chords
        const notes = [220, 277.18, 329.63, 440];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(600 + idx * 200, ctx.currentTime);

          gain.gain.setValueAtTime(0.04, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 2.5);
        });
        setSynthetixAudioPlaying(true);
        setTimeout(() => setSynthetixAudioPlaying(false), 2500);
      }
    } catch {
      // Ignore
    }
  };

  return (
    <section id="work" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header with Editorial Framing */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neon-lime mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-lime" />
            <span>PORTFOLIO SHOWCASE // 01</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white">
            SELECTED <span className="text-outline">WORKS</span>
          </h2>
        </div>
        <p className="max-w-md text-sm md:text-base text-gray-400 font-light leading-relaxed">
          Curated digital flagships and bespoke interactive platforms engineered with precision, high visual fidelity, and purposeful interaction design.
        </p>
      </div>

      {/* Projects Grid Showcase */}
      <div className="mt-16 flex flex-col gap-24">
        {PROJECTS.map((project, index) => {
          const isEven = index % 2 === 0;
          return (
            <article
              key={project.id}
              className={`group relative flex flex-col ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-10 lg:gap-16 items-center`}
            >
              {/* Media Preview Box */}
              <div className="w-full lg:w-7/12 relative rounded-2xl overflow-hidden glass-panel border border-white/10 group-hover:border-neon-lime/40 transition-all duration-500 shadow-2xl">
                {/* Visual Aspect Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-dark-900">
                  {/* Atmospheric fallback grid pattern */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-850 to-dark-950">
                    <div className="w-full h-full opacity-25 bg-[radial-gradient(#ccff00_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="absolute font-mono text-[11px] tracking-wider uppercase text-neon-lime/40">
                      // {project.title} PREVIEW
                    </div>
                  </div>

                  <img
                    src={project.featuredImage}
                    alt={`${project.title} Preview Mockup`}
                    className="relative z-10 w-full h-full object-cover object-center filter grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.style.opacity = '0';
                    }}
                  />
                  {/* Subtle Gradient & Glass Overlay */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent pointer-events-none" />

                  {/* Corner Index Tag */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-md glass-panel border border-white/10 font-mono text-[11px] text-white">
                    PROJECT // 0{index + 1}
                  </div>

                  {/* Dynamic Metric Badge */}
                  <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-lg glass-panel-glow border border-white/15 flex items-center gap-2">
                    <span className="font-mono text-[10px] text-gray-400 uppercase">{project.statLabel}:</span>
                    <span className="font-mono text-xs font-bold text-neon-lime">{project.statValue}</span>
                  </div>

                  {/* Synthetix Audio Live Trigger Button */}
                  {project.id === 'synthetix' && (
                    <button
                      type="button"
                      onClick={toggleSynthetixDemo}
                      className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-lg bg-neon-lime text-black font-mono text-xs font-semibold flex items-center gap-1.5 hover:bg-white transition-colors shadow-lg"
                    >
                      <Play className={`w-3 h-3 ${synthetixAudioPlaying ? 'animate-spin' : ''}`} />
                      <span>{synthetixAudioPlaying ? 'PLAYING DSP...' : 'AUDITION DSP'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Project Editorial Metadata */}
              <div className="w-full lg:w-5/12 flex flex-col justify-center">
                <div className="flex items-center gap-3 font-mono text-xs text-neon-lime mb-2">
                  <span>{project.category}</span>
                  <span>•</span>
                  <span>{project.year}</span>
                </div>

                <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white group-hover:text-neon-lime transition-colors">
                  {project.title}
                </h3>

                <p className="font-mono text-sm text-gray-400 mt-1 mb-4">
                  {project.subtitle}
                </p>

                <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded text-[11px] font-mono tracking-wider text-gray-300 bg-white/5 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Live Launch Link */}
                <div className="flex items-center gap-4">
                  {project.demoUrl.startsWith('/') ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-neon-lime transition-all duration-300 shadow-xl group/btn"
                    >
                      <span>LAUNCH LIVE DEMO</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={toggleSynthetixDemo}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neon-lime text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-xl group/btn"
                    >
                      <span>{synthetixAudioPlaying ? 'HARMONICS ACTIVE' : 'TEST INTERACTIVE DSP'}</span>
                      <Sparkles className="w-4 h-4" />
                    </button>
                  )}

                  <div className="font-mono text-[11px] text-gray-500 uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neon-lime" />
                    <span>VERIFIED DEMO</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
