import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSiteContent } from '../../context/SiteContentContext';
import { soundEngine } from '../../utils/audioEngine';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { getText } = useSiteContent();

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
            ? theme === 'dark'
              ? 'bg-[#0d0d0d]/80 backdrop-blur-2xl border border-[#262626] shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
              : 'bg-[#ffffff]/80 backdrop-blur-2xl border border-[#e5e5e5] shadow-[0_10px_30px_rgba(0,0,0,0.1)]'
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Brand Logo & Name Left */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer group flex items-center gap-3"
          data-cursor="HOME"
        >
          <img
            src="/2.png"
            alt="Next Gen Devs Logo"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-white/20 shadow-md transition-transform group-hover:scale-110"
          />
          <span
            className={`font-black text-xs sm:text-base tracking-[0.15em] sm:tracking-[0.2em] uppercase font-mono transition-colors truncate ${
              theme === 'dark' ? 'text-[#ffffff]' : 'text-[#000000]'
            }`}
          >
            {getText('brand.name', 'NEXT GEN DEVS')}
          </span>
        </div>

        {/* Links Right */}
        <nav
          className={`hidden md:flex items-center gap-7 text-[11px] font-mono font-bold tracking-[0.2em] uppercase transition-colors ${
            theme === 'dark' ? 'text-[#a3a3a3]' : 'text-[#525252]'
          }`}
        >
          <button
            onClick={() => scrollToSection('work')}
            className="hover:text-[#ffffff] dark:hover:text-[#ffffff] light:hover:text-[#000000] transition-colors cursor-pointer py-1"
            data-cursor="WORK"
          >
            {getText('nav.work', 'WORK')}
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="hover:text-[#ffffff] dark:hover:text-[#ffffff] light:hover:text-[#000000] transition-colors cursor-pointer py-1"
            data-cursor="SERVICES"
          >
            {getText('nav.services', 'SERVICES')}
          </button>
          <button
            onClick={() => scrollToSection('process')}
            className="hover:text-[#ffffff] dark:hover:text-[#ffffff] light:hover:text-[#000000] transition-colors cursor-pointer py-1"
            data-cursor="PROCESS"
          >
            {getText('nav.process', 'PROCESS')}
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-[#ffffff] dark:hover:text-[#ffffff] light:hover:text-[#000000] transition-colors cursor-pointer py-1"
            data-cursor="ABOUT"
          >
            {getText('nav.about', 'ABOUT')}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className={`transition-colors cursor-pointer py-1 font-black ${
              theme === 'dark' ? 'text-[#ffffff]' : 'text-[#000000]'
            }`}
            data-cursor="CONTACT"
          >
            {getText('nav.contact', 'CONTACT')}
          </button>

          {/* LIGHT MODE & DARK MODE TOGGLE BUTTON */}
          <button
            onClick={() => {
              soundEngine.playClick();
              toggleTheme();
            }}
            className={`p-2 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer ${
              theme === 'dark'
                ? 'bg-[#181818] text-[#ffffff] border-[#262626] hover:bg-[#262626]'
                : 'bg-[#f4f4f5] text-[#000000] border-[#e4e4e7] hover:bg-[#e4e4e7]'
            }`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            data-cursor="THEME"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#eab308]" /> : <Moon className="w-4 h-4 text-[#18181b]" />}
          </button>
        </nav>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => {
              soundEngine.playClick();
              toggleTheme();
            }}
            className={`p-2 rounded-full border transition-all ${
              theme === 'dark'
                ? 'bg-[#181818] text-[#ffffff] border-[#262626]'
                : 'bg-[#f4f4f5] text-[#000000] border-[#e4e4e7]'
            }`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#eab308]" /> : <Moon className="w-4 h-4 text-[#18181b]" />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`px-3 py-1.5 rounded-full border text-xs font-mono tracking-widest uppercase flex items-center gap-2 ${
              theme === 'dark'
                ? 'bg-[#181818] border-[#262626] text-[#ffffff]'
                : 'bg-[#f4f4f5] border-[#e4e4e7] text-[#000000]'
            }`}
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
            className={`md:hidden fixed inset-x-4 top-20 border rounded-3xl p-8 space-y-6 text-center shadow-2xl backdrop-blur-2xl z-50 font-mono ${
              theme === 'dark'
                ? 'bg-[#0d0d0d] border-[#262626] text-[#ffffff]'
                : 'bg-[#ffffff] border-[#e5e5e5] text-[#000000]'
            }`}
          >
            <div className="flex flex-col gap-5 text-sm font-bold tracking-[0.25em] uppercase">
              <button onClick={() => scrollToSection('work')} className="py-2">
                {getText('nav.work', 'WORK')}
              </button>
              <button onClick={() => scrollToSection('services')} className="py-2">
                {getText('nav.services', 'SERVICES')}
              </button>
              <button onClick={() => scrollToSection('process')} className="py-2">
                {getText('nav.process', 'PROCESS')}
              </button>
              <button onClick={() => scrollToSection('about')} className="py-2">
                {getText('nav.about', 'ABOUT')}
              </button>
              <button onClick={() => scrollToSection('contact')} className="py-2 font-black">
                {getText('nav.contact', 'CONTACT')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
