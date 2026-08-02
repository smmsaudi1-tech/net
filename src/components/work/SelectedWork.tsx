import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { REAL_PROJECTS } from '../../data/projectsData';

export const SelectedWork: React.FC = () => {
  return (
    <section id="work" className="py-32 bg-[#000000] relative border-b border-[#181818]">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 space-y-20">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#181818] pb-8 text-left">
          <div>
            <p className="text-[10px] font-mono tracking-[0.4em] text-[#525252] uppercase mb-2">
              // PORTFOLIO SHOWCASE
            </p>
            <h2 className="text-4xl sm:text-6xl font-black text-[#ffffff] tracking-tighter uppercase font-sans">
              SELECTED WORK
            </h2>
          </div>
          <p className="text-xs font-mono text-[#a3a3a3] tracking-widest uppercase">
            [ {REAL_PROJECTS.length} LIVE PRODUCTIONS ]
          </p>
        </div>

        {/* Projects Stack */}
        <div className="space-y-24">
          {REAL_PROJECTS.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#181818] pb-16 text-left"
              data-cursor="VIEW PROJECT"
            >
              {/* Project Image Box */}
              <a
                href={proj.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="lg:col-span-7 relative h-[320px] sm:h-[480px] rounded-3xl overflow-hidden bg-[#0d0d0d] border border-[#262626] group-hover:border-[#525252] transition-all duration-500 block"
              >
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-80" />

                {/* Floating Category Pill */}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 rounded-full bg-[#000000]/80 border border-[#333333] text-[#ffffff] text-[10px] font-mono tracking-widest uppercase backdrop-blur-md">
                    {proj.category}
                  </span>
                </div>

                {/* View Button Overlay */}
                <div className="absolute bottom-6 right-6 p-4 rounded-full bg-[#ffffff] text-[#000000] opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                  <ArrowUpRight className="w-5 h-5 stroke-[3]" />
                </div>
              </a>

              {/* Project Details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#525252] uppercase">
                    <span>{proj.subtitle}</span>
                    <span>{proj.year}</span>
                  </div>

                  <h3 className="text-3xl sm:text-5xl font-black text-[#ffffff] tracking-tight uppercase group-hover:text-[#a3a3a3] transition-colors font-sans">
                    {proj.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#a3a3a3] font-sans leading-relaxed">
                  {proj.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.techStack.map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded-md bg-[#121212] border border-[#262626] text-[10px] font-mono text-[#d4d4d4]">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4">
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#ffffff] tracking-widest uppercase hover:underline"
                  >
                    <span>VISIT PRODUCTION SITE</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
