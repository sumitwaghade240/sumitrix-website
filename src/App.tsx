import React, { useState, useEffect } from 'react';
import { BackgroundGrid } from './components/BackgroundGrid';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Pricing } from './components/Pricing';
import { About } from './components/About';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [, setIsShatteredState] = useState(false);

  // Active section tracking on scroll
  useEffect(() => {
    const sectionIds = ['hero', 'work', 'services', 'pricing', 'about', 'process', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-dark-950 text-white selection:bg-neon-lime selection:text-black">
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Atmospheric Background & Technical Grid */}
      <BackgroundGrid />

      {/* Sticky Navigation Bar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Assembly */}
      <main className="relative z-10 flex flex-col">
        <Hero onShatterStateChange={setIsShatteredState} />
        <Projects />
        <Services />
        <Pricing />
        <About />
        <Process />
        <Contact />
      </main>

      {/* Studio Footer */}
      <Footer />
    </div>
  );
};

export default App;
