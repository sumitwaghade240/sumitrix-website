import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'hero' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-dark-950/85 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo & Studio Mark with SW initials */}
          <a
            href="#hero"
            className="group flex items-center gap-3 outline-none"
            aria-label="SUMITRIX Creative Studio Home"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-dark-850 border border-white/15 group-hover:border-neon-lime transition-all duration-300 overflow-hidden shadow-[0_0_15px_rgba(204,255,0,0.1)]">
              <span className="absolute inset-0 bg-neon-lime/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              {/* SW Geometric Monogram */}
              <span className="font-display font-black text-xs tracking-tighter text-neon-lime group-hover:scale-110 transition-transform">
                SW
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-display font-black text-sm md:text-base tracking-wider text-white group-hover:text-neon-lime transition-colors">
                SUMITRIX<span className="text-neon-lime">.</span>
              </span>
              <span className="font-mono text-[9px] tracking-widest text-gray-400 uppercase">
                Sumit Waghade // Creative Dev
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 glass-panel px-5 py-2 rounded-full border border-white/10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors rounded-full ${
                    isActive
                      ? 'text-neon-lime bg-white/5 font-semibold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon-lime" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="relative group px-5 py-2.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase overflow-hidden border border-neon-lime/50 bg-neon-lime/10 text-neon-lime hover:bg-neon-lime hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(204,255,0,0.15)] hover:shadow-[0_0_25px_rgba(204,255,0,0.4)]"
            >
              <span className="flex items-center gap-1.5">
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg glass-panel border border-white/10 text-white hover:text-neon-lime transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-dark-950/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:hidden pt-28">
          <div className="flex flex-col gap-6">
            <span className="font-mono text-xs uppercase tracking-widest text-neon-lime flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Navigation Index
            </span>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-baseline justify-between py-2 text-2xl font-display font-bold text-white hover:text-neon-lime border-b border-white/10 transition-colors"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-gray-500">0{idx + 1}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 text-center rounded-xl bg-neon-lime text-black font-mono font-bold text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(204,255,0,0.3)]"
            >
              Start a Project
            </a>
            <div className="flex items-center justify-between text-xs font-mono text-gray-500">
              <span>SUMITRIX STUDIO // SUMIT WAGHADE</span>
              <span>EST. 2026</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
