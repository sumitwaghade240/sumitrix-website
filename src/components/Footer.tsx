import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 text-xs font-mono text-gray-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Studio Identification */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-neon-lime" />
          <span className="text-white font-bold tracking-wider">SUMITRIX</span>
          <span>// SUMIT WAGHADE • CREATIVE DEVELOPER</span>
        </div>

        {/* Center Technical Details */}
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline">REACT 19 • THREE.JS • GSAP • TAILWIND</span>
          <span>© 2026 SUMITRIX. ALL RIGHTS RESERVED.</span>
        </div>

        {/* Right Back to Top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="group flex items-center gap-2 text-gray-400 hover:text-neon-lime transition-colors outline-none"
        >
          <span>BACK TO APEX</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
};
