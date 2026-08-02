import React from 'react';
import { motion } from 'framer-motion';
import { ProcessItem } from '../../types';

export const ProcessSection: React.FC = () => {
  const processes: ProcessItem[] = [
    {
      number: '01',
      title: 'DISCOVER',
      subtitle: 'Research & Strategy',
      description: 'We dive deep into your brand identity, business model, target audience, and competitors to define a winning digital roadmap.'
    },
    {
      number: '02',
      title: 'DESIGN',
      subtitle: 'Minimal Luxury Architecture',
      description: 'Designing high-impact typography layouts, 3D interactive elements, and fluid motion prototypes that command immediate authority.'
    },
    {
      number: '03',
      title: 'DEVELOP',
      subtitle: 'Engineered Precision',
      description: 'Writing ultra-clean, high-performance React, Next.js, and WebGL code optimized for lightning speed and search engine dominance.'
    },
    {
      number: '04',
      title: 'REFINE',
      subtitle: 'Micro-Interaction Polish',
      description: 'Fine-tuning scroll physics, magnetic interactions, mobile responsiveness, and 99/100 Google Lighthouse performance audits.'
    },
    {
      number: '05',
      title: 'LAUNCH',
      subtitle: 'Global Production Deployment',
      description: 'Deploying your digital experience seamlessly to global CDN networks with continuous monitoring and zero downtime.'
    }
  ];

  return (
    <section id="process" className="py-32 bg-[#000000] border-b border-[#181818] relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 space-y-20">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#181818] pb-8">
          <div>
            <p className="text-[10px] font-mono tracking-[0.4em] text-[#525252] uppercase mb-2">
              // METHODOLOGY
            </p>
            <h2 className="text-4xl sm:text-6xl font-black text-[#ffffff] tracking-tighter uppercase font-sans">
              OUR PROCESS
            </h2>
          </div>
          <p className="text-xs font-mono text-[#a3a3a3] tracking-widest uppercase">
            [ PRECISION WORKFLOW ]
          </p>
        </div>

        {/* Vertical Process Steps */}
        <div className="space-y-16">
          {processes.map((proc, idx) => (
            <motion.div
              key={proc.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-[#181818] pb-12 group"
            >
              {/* Huge Number */}
              <div className="lg:col-span-3">
                <span className="text-6xl sm:text-8xl font-black font-mono text-[#262626] group-hover:text-[#ffffff] transition-colors duration-500">
                  {proc.number}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="lg:col-span-5 space-y-2">
                <h3 className="text-3xl sm:text-4xl font-black text-[#ffffff] uppercase tracking-tight font-sans">
                  {proc.title}
                </h3>
                <p className="text-xs font-mono text-[#525252] uppercase tracking-widest">
                  {proc.subtitle}
                </p>
              </div>

              {/* Description */}
              <div className="lg:col-span-4">
                <p className="text-xs sm:text-sm text-[#a3a3a3] leading-relaxed font-sans font-medium">
                  {proc.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
