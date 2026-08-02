import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { ThreeDScene } from '../canvas/ThreeDScene';

export const HeroSection: React.FC = () => {
  const headline = 'WE BUILD WHAT’S NEXT.';
  const letters = headline.split('');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] pt-24 pb-16 flex items-center justify-center overflow-hidden bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Column: Huge Letter-by-Letter Animated Headline */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#262626] bg-[#0d0d0d] text-[10px] font-mono tracking-[0.3em] text-[#a3a3a3] uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-[#ffffff] animate-ping" />
            <span>CREATIVE TECHNOLOGY STUDIO / 2026</span>
          </motion.div>

          {/* Letter by Letter Headline Reveal */}
          <div className="overflow-hidden">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-[#ffffff] tracking-tighter leading-[0.95] font-sans uppercase">
              {letters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.03,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-lg text-[#a3a3a3] max-w-xl leading-relaxed font-sans font-medium"
          >
            Next Gen Devs is a creative technology team building modern websites, e-commerce experiences and digital products.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
          >
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 rounded-full bg-[#ffffff] text-[#000000] font-mono text-xs font-black tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-[#e5e5e5] transition-all hover:scale-105 cursor-pointer shadow-2xl"
              data-cursor="CONTACT"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </button>

            <button
              onClick={() => scrollToSection('work')}
              className="px-8 py-4 rounded-full border border-[#262626] bg-[#0d0d0d] text-[#ffffff] font-mono text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:border-[#525252] transition-all cursor-pointer"
              data-cursor="EXPLORE"
            >
              <span>EXPLORE OUR WORK</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </motion.div>

        </div>

        {/* Right Column: Interactive 3D Canvas Object */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <ThreeDScene />
        </div>

      </div>
    </section>
  );
};
