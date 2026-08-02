import React from 'react';
import { motion } from 'framer-motion';

export const BrandStatement: React.FC = () => {
  const words = ['IDEAS', 'DESERVE', 'BETTER', 'DIGITAL', 'EXPERIENCES.'];

  return (
    <section className="py-28 bg-[#000000] border-y border-[#181818] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        
        <div className="text-left space-y-6">
          <p className="text-[10px] font-mono tracking-[0.4em] text-[#525252] uppercase">
            // OUR PHILOSOPHY
          </p>

          <div className="flex flex-col gap-2">
            {words.map((word, idx) => (
              <motion.h2
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`text-5xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase font-sans ${
                  idx === 3 ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#a3a3a3] to-[#525252]' : 'text-[#ffffff]'
                }`}
              >
                {word}
              </motion.h2>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
