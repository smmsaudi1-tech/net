import React from 'react';
import { motion } from 'framer-motion';

export const AboutNextGen: React.FC = () => {
  const stats = [
    { number: '20+', label: 'PROJECTS LAUNCHED' },
    { number: '10+', label: 'BRANDS EMPOWERED' },
    { number: '100%', label: 'PASSION & PRECISION' },
    { number: '24/7', label: 'CREATIVE ENERGY' }
  ];

  return (
    <section id="about" className="py-32 bg-[#000000] border-b border-[#181818] relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 space-y-20">
        
        {/* Editorial Text */}
        <div className="space-y-8 max-w-5xl">
          <p className="text-[10px] font-mono tracking-[0.4em] text-[#525252] uppercase">
            // ABOUT NEXT GEN DEVS
          </p>

          <h2 className="text-5xl sm:text-8xl font-black text-[#ffffff] tracking-tighter uppercase font-sans leading-none">
            WE ARE NEXT GEN.
          </h2>

          <p className="text-lg sm:text-2xl text-[#a3a3a3] leading-relaxed font-sans font-medium max-w-4xl">
            We are a young team of developers and designers focused on turning ambitious ideas into fast, modern and memorable digital experiences.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-10 border-t border-[#181818]">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="space-y-2"
            >
              <h3 className="text-4xl sm:text-6xl font-black font-mono text-[#ffffff]">
                {stat.number}
              </h3>
              <p className="text-[11px] font-mono text-[#525252] tracking-widest uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
