import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-10 py-5 transition-all duration-500">
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-[#0d0d0d]/80 backdrop-blur-2xl border border-[#262626] shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Brand Logo Left */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer group flex items-center gap-3"
          data-cursor="HOME"
        >
          <span className="font-black text-base sm:text-lg tracking-[0.25em] text-[#ffffff] uppercase font-mono group-hover:opacity-80 transition-opacity">
            NEXT GEN DEVS
          </span>
        </div>

        {/* Links Right */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono font-bold tracking-[0.2em] text-[#a3a3a3] uppercase">
          <button
            onClick={() => scrollToSection('work')}
            className="hover:text-[#ffffff] transition-colors cursor-pointer py-1"
            data-cursor="WORK"
          >
            WORK
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="hover:text-[#ffffff] transition-colors cursor-pointer py-1"
            data-cursor="SERVICES"
          >
            SERVICES
          </button>
          <button
            onClick={() => scrollToSection('process')}
            className="hover:text-[#ffffff] transition-colors cursor-pointer py-1"
            data-cursor="PROCESS"
          >
            PROCESS
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-[#ffffff] transition-colors cursor-pointer py-1"
            data-cursor="ABOUT"
          >
            ABOUT
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="hover:text-[#ffffff] transition-colors cursor-pointer py-1 text-[#ffffff]"
            data-cursor="CONTACT"
          >
            CONTACT
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-3 py-1.5 rounded-full bg-[#181818] border border-[#262626] text-[#ffffff] text-xs font-mono tracking-widest uppercase flex items-center gap-2"
          >
            <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-x-4 top-20 bg-[#0d0d0d] border border-[#262626] rounded-3xl p-8 space-y-6 text-center shadow-2xl backdrop-blur-2xl z-50 font-mono"
          >
            <div className="flex flex-col gap-5 text-sm font-bold tracking-[0.25em] text-[#a3a3a3] uppercase">
              <button onClick={() => scrollToSection('work')} className="hover:text-[#ffffff] py-2">
                WORK
              </button>
              <button onClick={() => scrollToSection('services')} className="hover:text-[#ffffff] py-2">
                SERVICES
              </button>
              <button onClick={() => scrollToSection('process')} className="hover:text-[#ffffff] py-2">
                PROCESS
              </button>
              <button onClick={() => scrollToSection('about')} className="hover:text-[#ffffff] py-2">
                ABOUT
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-[#ffffff] py-2">
                CONTACT →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
