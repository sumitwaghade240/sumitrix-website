import React, { useEffect, useRef, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ArrowDown, Terminal } from 'lucide-react';

const SceneCanvas = lazy(() =>
  import('./3d/SceneCanvas').then((m) => ({ default: m.SceneCanvas }))
);

interface HeroProps {
  onShatterStateChange?: (shattered: boolean) => void;
}

export const Hero: React.FC<HeroProps> = ({ onShatterStateChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const titleLine3Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Badge entrance
      tl.fromTo(
        badgeRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
      );

      // Kinetic Headline Reveal with clipping mask translateY
      tl.fromTo(
        [titleLine1Ref.current, titleLine2Ref.current, titleLine3Ref.current],
        { y: 120, opacity: 0, rotateX: 20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
        },
        '-=0.4'
      );

      // Subtitle & technical stats
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        '-=0.6'
      );

      tl.fromTo(
        statsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 overflow-hidden select-none"
    >
      {/* 3D Interactive Canvas Layer (Center/Background) */}
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative w-64 h-64 rounded-full border border-neon-lime/20 bg-dark-900/40 backdrop-blur-md flex items-center justify-center animate-pulse-slow">
                <div className="w-48 h-48 rounded-full border border-neon-lime/40 animate-ping opacity-25" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-neon-lime/60">
                  Initializing 3D Shaders...
                </span>
              </div>
            </div>
          }
        >
          <SceneCanvas onShatterChange={onShatterStateChange} />
        </Suspense>
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center pointer-events-none">
        {/* Top Status & Technical Badge */}
        <div ref={badgeRef} className="flex items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-[11px] font-mono tracking-wider uppercase text-gray-300">
            <span className="w-2 h-2 rounded-full bg-neon-lime animate-pulse" />
            <span>AVAILABLE FOR Q2/Q3 EXPERIMENTAL COMMISSIONS</span>
          </div>

          <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 font-mono text-[10px] text-gray-500">
            <Terminal className="w-3 h-3 text-neon-lime" />
            <span>SYS.VER :: 2026.04</span>
          </div>
        </div>

        {/* Kinetic Hero Headline */}
        <div className="max-w-4xl">
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.88] tracking-tighter uppercase text-white drop-shadow-2xl">
            {/* Line 1: "WE MAKE" */}
            <div className="overflow-hidden">
              <div ref={titleLine1Ref} className="transform will-change-transform">
                <span className="inline-block text-white">WE MAKE</span>
              </div>
            </div>

            {/* Line 2: "DIGITAL" (Outlined & Neon accented) */}
            <div className="overflow-hidden my-1 md:my-2">
              <div ref={titleLine2Ref} className="transform will-change-transform flex items-baseline gap-3 md:gap-6 flex-wrap">
                <span className="text-outline-neon text-neon-lime hover:text-neon-lime transition-all duration-300">
                  DIGITAL
                </span>
                <span className="text-xs md:text-sm font-mono tracking-widest text-gray-400 font-normal normal-case border border-white/10 px-2 py-1 rounded bg-dark-900/60 hidden sm:inline-block">
                  [3D // WEBGL // MOTION]
                </span>
              </div>
            </div>

            {/* Line 3: "FEEL DIFFERENT." */}
            <div className="overflow-hidden">
              <div ref={titleLine3Ref} className="transform will-change-transform">
                <span className="italic font-light text-gray-200">FEEL </span>
                <span className="text-white underline decoration-neon-lime decoration-4 underline-offset-8">
                  DIFFERENT.
                </span>
              </div>
            </div>
          </h1>

          {/* Editorial Lead Paragraph */}
          <p
            ref={subtitleRef}
            className="mt-8 max-w-xl text-base md:text-lg text-gray-300 font-light leading-relaxed backdrop-blur-sm bg-dark-950/20 rounded-xl p-2 border-l-2 border-neon-lime pl-4"
          >
            Award-winning creative developer crafting high-octane 3D websites, spatial interactions, and bespoke digital platforms for visionary brands and luxury creators.
          </p>
        </div>

        {/* Hero Bottom Bar & Telemetry */}
        <div
          ref={statsRef}
          className="mt-12 flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-white/10"
        >
          {/* Quick Metrics */}
          <div className="flex items-center gap-8 md:gap-12 font-mono">
            <div>
              <span className="block text-2xl md:text-3xl font-display font-bold text-white">03+</span>
              <span className="block text-[10px] tracking-wider uppercase text-gray-400">Live Client Systems</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="block text-2xl md:text-3xl font-display font-bold text-neon-lime">60 FPS</span>
              <span className="block text-[10px] tracking-wider uppercase text-gray-400">Three.js Engine</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
            <div className="hidden sm:block">
              <span className="block text-2xl md:text-3xl font-display font-bold text-white">100%</span>
              <span className="block text-[10px] tracking-wider uppercase text-gray-400">Type-Safe React</span>
            </div>
          </div>

          {/* Scroll Down Prompt */}
          <a
            href="#work"
            className="pointer-events-auto group inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-white/10 hover:border-neon-lime/40 text-xs font-mono text-gray-300 hover:text-white transition-all"
          >
            <span>EXPLORE WORK</span>
            <ArrowDown className="w-3.5 h-3.5 text-neon-lime group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
