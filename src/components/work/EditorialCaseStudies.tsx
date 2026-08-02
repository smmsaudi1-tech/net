import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Eye, Sparkles } from 'lucide-react';
import { REAL_PROJECTS } from '../../data/projectsData';
import { RealProject } from '../../types';
import { soundEngine } from '../../utils/audioEngine';

export const EditorialCaseStudies: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<RealProject | null>(null);

  const categories = ['ALL', 'E-COMMERCE', 'BRANDS', 'APPS'];

  const filteredProjects = REAL_PROJECTS.filter((proj) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'E-COMMERCE')
      return proj.category.toLowerCase().includes('e-commerce') || proj.subtitle.toLowerCase().includes('fashion');
    if (selectedFilter === 'BRANDS')
      return proj.category.toLowerCase().includes('brand') || proj.category.toLowerCase().includes('studio');
    if (selectedFilter === 'APPS')
      return proj.category.toLowerCase().includes('app') || proj.category.toLowerCase().includes('platform');
    return true;
  });

  return (
    <section id="work" className="py-24 bg-[#000000] relative border-b border-[#181818] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 space-y-12">
        
        {/* Section Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#181818] pb-8">
          <div>
            <p className="text-[10px] font-mono tracking-[0.4em] text-[#525252] uppercase mb-2">
              // PORTFOLIO PRODUCTIONS
            </p>
            <h2 className="text-4xl sm:text-6xl font-black text-[#ffffff] tracking-tighter uppercase font-sans">
              SELECTED WORK
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedFilter(cat);
                }}
                className={`px-5 py-2.5 rounded-full border transition-all duration-300 font-bold uppercase tracking-widest cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-[#ffffff] text-[#000000] border-[#ffffff]'
                    : 'bg-[#0d0d0d] text-[#a3a3a3] border-[#262626] hover:border-[#525252]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Compact & Sleek 2-Column Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((proj, idx) => (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group p-6 rounded-3xl bg-[#0d0d0d] border border-[#262626] hover:border-[#ffffff] transition-all duration-500 flex flex-col justify-between space-y-6 shadow-2xl relative"
                data-cursor="VIEW"
              >
                {/* Visual Image Banner (Compact height) */}
                <div
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveModalProject(proj);
                  }}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="relative h-[240px] sm:h-[280px] rounded-2xl overflow-hidden bg-[#000000] cursor-pointer"
                >
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-80" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1 rounded-full bg-[#000000]/80 border border-[#333333] text-[#ffffff] text-[9px] font-mono tracking-widest uppercase backdrop-blur-md">
                      {proj.category}
                    </span>
                  </div>

                  {/* Quick Preview Badge */}
                  <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-[#ffffff] text-[#000000] font-mono text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                    <Eye className="w-3.5 h-3.5" />
                    <span>PREVIEW</span>
                  </div>
                </div>

                {/* Compact Details Info */}
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#525252] uppercase">
                    <span>{proj.subtitle}</span>
                    <span>{proj.year}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-[#ffffff] uppercase tracking-tight font-sans group-hover:text-[#a3a3a3] transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-[#a3a3a3] font-sans leading-relaxed line-clamp-2 font-medium">
                    {proj.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.techStack.map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-[#181818] border border-[#262626] text-[9px] font-mono text-[#d4d4d4]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center justify-between border-t border-[#181818]">
                    <button
                      onClick={() => {
                        soundEngine.playClick();
                        setActiveModalProject(proj);
                      }}
                      className="text-[11px] font-mono font-bold text-[#ffffff] tracking-widest uppercase flex items-center gap-1.5 hover:underline cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>LIVE PREVIEW</span>
                    </button>

                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono font-bold text-[#a3a3a3] hover:text-[#ffffff] tracking-widest uppercase flex items-center gap-1 transition-colors"
                    >
                      <span>VISIT SITE</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Live Interactive Iframe Modal Overlay */}
      {activeModalProject && (
        <div className="fixed inset-0 z-[100000] bg-[#000000]/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-10 font-mono">
          <div className="w-full max-w-5xl h-[85vh] bg-[#0d0d0d] border border-[#262626] rounded-3xl overflow-hidden flex flex-col shadow-2xl relative">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#181818] flex items-center justify-between bg-[#000000]">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffffff] animate-ping" />
                <span className="text-xs font-bold text-[#ffffff] uppercase tracking-widest">
                  LIVE PREVIEW // {activeModalProject.title}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#a3a3a3] hover:text-[#ffffff] flex items-center gap-1 uppercase tracking-widest"
                >
                  <span>OPEN NEW TAB</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-2 rounded-full bg-[#181818] text-[#ffffff] hover:bg-[#262626] transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Iframe */}
            <iframe
              src={activeModalProject.liveUrl}
              title={activeModalProject.title}
              className="w-full h-full border-none bg-[#ffffff]"
            />
          </div>
        </div>
      )}
    </section>
  );
};
