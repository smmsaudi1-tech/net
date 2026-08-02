import React from 'react';
import { motion } from 'framer-motion';

export const HorizontalScrollSection: React.FC = () => {
  const steps = [
    { number: '01', title: 'IDEA', desc: 'Understanding your vision, business model & digital goals.' },
    { number: '02', title: 'DESIGN', desc: 'Architecting minimal luxury UX/UI & motion prototypes.' },
    { number: '03', title: 'CODE', desc: 'Engineering robust React, Next.js, and Three.js systems.' },
    { number: '04', title: 'TEST', desc: 'Performance optimization, accessibility & 99/100 speed audit.' },
    { number: '05', title: 'LAUNCH', desc: 'Deploying globally with zero downtime and continuous support.' }
  ];

  return (
    <section className="py-32 bg-[#000000] border-b border-[#181818] overflow-hidden relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#181818] pb-8">
          <div>
            <p className="text-[10px] font-mono tracking-[0.4em] text-[#525252] uppercase mb-2">
              // PRODUCTION ROADMAP
            </p>
            <h2 className="text-4xl sm:text-7xl font-black text-[#ffffff] tracking-tighter uppercase font-sans">
              FROM IDEA TO DIGITAL.
            </h2>
          </div>
          <p className="text-xs font-mono text-[#a3a3a3] tracking-widest uppercase">
            [ 05 STAGES OF CREATION ]
          </p>
        </div>

        {/* Horizontal Process Track */}
        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-none snap-x">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex-shrink-0 w-80 sm:w-96 p-8 rounded-3xl bg-[#0d0d0d] border border-[#262626] hover:border-[#525252] transition-all space-y-6 snap-center group shadow-2xl"
              data-cursor="PROCESS"
            >
              <div className="flex items-center justify-between text-mono">
                <span className="text-xs font-mono text-[#525252] font-bold">STAGE //</span>
                <span className="text-2xl font-mono font-black text-[#ffffff] group-hover:text-[#a3a3a3] transition-colors">
                  {step.number}
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-[#ffffff] tracking-tight uppercase font-sans">
                {step.title}
              </h3>

              <p className="text-xs text-[#a3a3a3] leading-relaxed font-sans font-medium">
                {step.desc}
              </p>

              <div className="pt-4 border-t border-[#1a1a1a] flex items-center justify-between text-[10px] font-mono text-[#525252] uppercase">
                <span>NEXT GEN STAGE</span>
                <span>STEP {idx + 1} OF 5</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
