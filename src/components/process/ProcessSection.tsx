import React from 'react';
import { motion } from 'framer-motion';
import { ProcessItem } from '../../types';
import { useTheme } from '../../context/ThemeContext';

export const ProcessSection: React.FC = () => {
  const { theme } = useTheme();

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
    <section
      id="process"
      className={`py-32 border-b transition-colors duration-500 relative text-left ${
        theme === 'dark'
          ? 'bg-[#000000] text-[#ffffff] border-[#181818]'
          : 'bg-[#ffffff] text-[#000000] border-[#e4e4e7]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10 space-y-20">
        
        {/* Title */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-8 ${
            theme === 'dark' ? 'border-[#181818]' : 'border-[#e4e4e7]'
          }`}
        >
          <div>
            <p
              className={`text-[10px] font-mono tracking-[0.4em] uppercase mb-2 ${
                theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
              }`}
            >
              // METHODOLOGY
            </p>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-sans">
              OUR PROCESS
            </h2>
          </div>
          <p
            className={`text-xs font-mono tracking-widest uppercase ${
              theme === 'dark' ? 'text-[#a3a3a3]' : 'text-[#525252]'
            }`}
          >
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
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b pb-12 group ${
                theme === 'dark' ? 'border-[#181818]' : 'border-[#e4e4e7]'
              }`}
            >
              {/* Huge Number */}
              <div className="lg:col-span-3">
                <span
                  className={`text-6xl sm:text-8xl font-black font-mono transition-colors duration-500 ${
                    theme === 'dark'
                      ? 'text-[#262626] group-hover:text-[#ffffff]'
                      : 'text-[#e4e4e7] group-hover:text-[#000000]'
                  }`}
                >
                  {proc.number}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="lg:col-span-5 space-y-2">
                <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-sans">
                  {proc.title}
                </h3>
                <p
                  className={`text-xs font-mono uppercase tracking-widest ${
                    theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
                  }`}
                >
                  {proc.subtitle}
                </p>
              </div>

              {/* Description */}
              <div className="lg:col-span-4">
                <p
                  className={`text-xs sm:text-sm leading-relaxed font-sans font-medium ${
                    theme === 'dark' ? 'text-[#a3a3a3]' : 'text-[#525252]'
                  }`}
                >
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
