import React from 'react';
import { Terminal, Compass } from 'lucide-react';

export const About: React.FC = () => {
  const techStack = [
    { category: '3D & Graphics', items: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'Drei', 'Blender'] },
    { category: 'Frontend Core', items: ['React 19', 'TypeScript', 'Vite', 'Next.js', 'Tailwind CSS'] },
    { category: 'Animation & Motion', items: ['GSAP 3', 'ScrollTrigger', 'Framer Motion', 'Web Audio API'] },
    { category: 'Engineering & DevOps', items: ['Clean Architecture', 'Git Workflows', 'Lighthouse 98+', 'Responsive UX'] },
  ];

  return (
    <section id="about" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Editorial Philosophy */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neon-lime mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-lime" />
            <span>STUDIO MANIFESTO // 03</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-white mb-6">
            BEYOND THE <span className="text-outline">ORDINARY</span>
          </h2>

          <div className="space-y-5 text-gray-300 font-light leading-relaxed text-base">
            <p>
              I am <span className="text-white font-medium">Sumit Waghade</span>, a Creative Developer running <span className="text-neon-lime font-semibold">SUMITRIX</span>. I believe the web shouldn't feel like a sea of flat, repetitive rectangles. In an era dominated by generic templates, memorable creative direction and tactile spatial interaction are what separate forgettable websites from enduring digital artifacts.
            </p>
            <p>
              Operating at the intersection of creative coding, Three.js 3D graphics, and strict software craftsmanship, I build digital flagships that respect user performance while delivering cinematic visual delight.
            </p>
          </div>

          {/* Quick Technical Credo Pills */}
          <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl glass-panel border border-white/10">
              <span className="block font-mono text-2xl font-bold text-neon-lime">0.08s</span>
              <span className="block font-mono text-[11px] text-gray-400 uppercase mt-1">Zero-Bloat Execution</span>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-white/10">
              <span className="block font-mono text-2xl font-bold text-white">100%</span>
              <span className="block font-mono text-[11px] text-gray-400 uppercase mt-1">Authentic Showcase</span>
            </div>
          </div>
        </div>

        {/* Right Interactive Tech Matrix */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="p-8 rounded-2xl glass-panel-glow border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-neon-lime" />
                <span className="font-mono text-xs uppercase tracking-widest text-white font-semibold">
                  TECHNICAL ARSENAL & TOOLING
                </span>
              </div>
              <span className="font-mono text-[10px] text-neon-lime bg-neon-lime/10 px-2 py-0.5 rounded border border-neon-lime/30">
                ACTIVE STACK
              </span>
            </div>

            {/* Matrix categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {techStack.map((stack) => (
                <div key={stack.category} className="flex flex-col">
                  <span className="font-mono text-xs uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-neon-lime" />
                    {stack.category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono bg-dark-900 border border-white/10 text-gray-200 hover:border-neon-lime/60 hover:text-neon-lime transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Philosophy quote callout */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-start gap-4">
              <Compass className="w-5 h-5 text-neon-lime shrink-0 mt-0.5" />
              <p className="font-mono text-xs text-gray-300 italic">
                “Every interaction must have a purpose. Every animation must feel intentional. Performance is the foundation of elegance.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
