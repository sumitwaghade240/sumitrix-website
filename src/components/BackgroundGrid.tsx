import React, { useEffect, useState } from 'react';

export const BackgroundGrid: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[130px] transition-transform duration-300 ease-out hidden lg:block"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          background: 'radial-gradient(circle, #ccff00 0%, rgba(79, 143, 255, 0.4) 40%, transparent 70%)',
        }}
      />

      {/* Atmospheric Ambient Glow Orbs */}
      <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-neon-lime/10 blur-[140px]" />
      <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[160px]" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-neon-lime/5 blur-[150px]" />

      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 technical-grid opacity-60" />

      {/* Radial Vignette Mask */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, #070709 90%)',
        }}
      />

      {/* Film Grain Texture */}
      <div className="grain-overlay" />
    </div>
  );
};
