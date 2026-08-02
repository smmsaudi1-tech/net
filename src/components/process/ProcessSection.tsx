import React from 'react';
import { motion } from 'framer-motion';
import { ProcessItem } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, ArrowDownRight } from 'lucide-react';

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
      className={`py-20 sm:py-32 border-b transition-colors duration-500 relative text-left ${
        theme === 'dark'
          ? 'bg-[#000000] text-[#ffffff] border-[#181818]'
          : 'bg-[#ffffff] text-[#000000] border-[#e4e4e7]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10 space-y-12 sm:space-y-20">
        
        {/* Title */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6 sm:pb-8 ${
            theme === 'dark' ? 'border-[#181818]' : 'border-[#e4e4e7]'
          }`}
        >
          <div>
            <p
              className={`text-[10px] font-mono tracking-[0.4em] uppercase mb-2 ${
                theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
              }`}
            >
              // METHODOLOGY & WORKFLOW
            </p>
            <h2 className="text-3xl sm:text-6xl font-black tracking-tighter uppercase font-sans">
              OUR PROCESS
            </h2>
          </div>
          <p
            className={`text-xs font-mono tracking-widest uppercase flex items-center gap-2 ${
              theme === 'dark' ? 'text-[#a3a3a3]' : 'text-[#525252]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            [ PRECISION WORKFLOW // 5 STEPS ]
          </p>
        </div>

        {/* Vertical Animated Process Steps with Scroll Reveal */}
        <div className="space-y-10 sm:space-y-16">
          {processes.map((proc, idx) => (
            <motion.div
              key={proc.number}
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ margin: '-40px', once: false }}
              transition={{
                duration: 0.7,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-start border-b pb-8 sm:pb-12 group p-4 sm:p-6 rounded-3xl transition-all duration-500 ${
                theme === 'dark'
                  ? 'border-[#181818] hover:bg-[#0a0a10] hover:border-emerald-500/30'
                  : 'border-[#e4e4e7] hover:bg-[#f8f9fa] hover:border-emerald-500/40'
              }`}
            >
              {/* Step Number with Animated Neon Glow Accent */}
              <div className="lg:col-span-3 flex items-center justify-between lg:justify-start gap-4">
                <span
                  className={`text-4xl sm:text-8xl font-black font-mono transition-colors duration-500 ${
                    theme === 'dark'
                      ? 'text-[#262626] group-hover:text-emerald-400'
                      : 'text-[#d4d4d8] group-hover:text-emerald-600'
                  }`}
                >
                  {proc.number}
                </span>

                <ArrowDownRight className="w-5 h-5 lg:hidden text-emerald-400 group-hover:rotate-45 transition-transform" />
              </div>

              {/* Title & Subtitle */}
              <div className="lg:col-span-5 space-y-1 sm:space-y-2">
                <h3 className="text-xl sm:text-4xl font-black uppercase tracking-tight font-sans group-hover:text-emerald-400 transition-colors">
                  {proc.title}
                </h3>
                <p
                  className={`text-[10px] sm:text-xs font-mono uppercase tracking-widest font-bold ${
                    theme === 'dark' ? 'text-emerald-500/90' : 'text-emerald-600'
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
