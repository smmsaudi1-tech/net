import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ArrowUpRight, X, Sparkles } from 'lucide-react';
import { RealProject } from '../../types';
import { soundEngine } from '../../utils/audioEngine';
import { useTheme } from '../../context/ThemeContext';
import { useSiteContent } from '../../context/SiteContentContext';
import { subscribeProjects } from '../../services/projectService';

gsap.registerPlugin(ScrollTrigger);

export const EditorialCaseStudies: React.FC = () => {
  const [projects, setProjects] = useState<RealProject[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<RealProject | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { getText } = useSiteContent();

  const categories = ['ALL', 'E-COMMERCE', 'BRANDS', 'APPS'];

  useEffect(() => {
    const unsub = subscribeProjects((fetched) => {
      setProjects(fetched || []);
    });
    return () => unsub();
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'E-COMMERCE') {
      return (
        p.category?.toUpperCase().includes('E-COMMERCE') ||
        p.subtitle?.toUpperCase().includes('E-COMMERCE') ||
        p.category?.toUpperCase().includes('RETAIL')
      );
    }
    if (selectedFilter === 'BRANDS') {
      return (
        p.category?.toUpperCase().includes('BRAND') ||
        p.category?.toUpperCase().includes('LUXURY') ||
        p.subtitle?.toUpperCase().includes('BRAND')
      );
    }
    if (selectedFilter === 'APPS') {
      return (
        p.category?.toUpperCase().includes('APP') ||
        p.category?.toUpperCase().includes('WEB') ||
        p.category?.toUpperCase().includes('STUDIO')
      );
    }
    return true;
  });

  return (
    <section id="case-studies" className="py-24 relative border-b border-[#181818]">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 space-y-16">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#181818] pb-8 text-left">
          <div>
            <p className="text-[10px] font-mono tracking-[0.4em] text-[#525252] uppercase mb-2">
              // PORTFOLIO DIRECTORY
            </p>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase font-sans">
              {getText('work.h1', 'SELECTED WORK')}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedFilter(cat);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? theme === 'dark'
                      ? 'bg-[#ffffff] text-[#000000] font-black'
                      : 'bg-[#000000] text-[#ffffff] font-black'
                    : theme === 'dark'
                    ? 'bg-[#121212] border border-[#262626] text-[#a3a3a3] hover:text-[#ffffff]'
                    : 'bg-[#f4f4f5] border border-[#e4e4e7] text-[#525252] hover:text-[#000000]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveModalProject(project);
                }}
                className={`group relative rounded-3xl border overflow-hidden p-6 sm:p-8 flex flex-col justify-between h-[420px] sm:h-[480px] transition-all duration-500 cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-[#0d0d0d] border-[#262626] hover:border-emerald-500/50 shadow-2xl'
                    : 'bg-[#ffffff] border-[#e5e5e5] hover:border-emerald-500/50 shadow-xl'
                }`}
                data-cursor="VIEW DETAILS"
              >
                {/* Full Color Image Background without dark dimming filters */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-100"
                  />
                  {/* Subtle legibility gradient at bottom only */}
                  <div
                    className={`absolute inset-0 ${
                      theme === 'dark'
                        ? 'bg-gradient-to-t from-black/90 via-black/30 to-transparent'
                        : 'bg-gradient-to-t from-black/85 via-black/20 to-transparent'
                    }`}
                  />
                </div>

                {/* Top Info */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-[#000000]/80 border border-[#333333] text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest backdrop-blur-md">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-white shadow-sm">{project.year || '2026'}</span>
                </div>

                {/* Bottom Title & Actions */}
                <div className="relative z-10 space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-zinc-300 font-bold uppercase drop-shadow-md">{project.subtitle}</p>
                    <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white font-sans drop-shadow-lg">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase flex items-center gap-1.5 drop-shadow-md">
                      <span>CLICK TO VIEW DETAILS</span>
                    </span>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 rounded-full bg-white text-black hover:bg-emerald-400 transition-all shadow-xl"
                      >
                        <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State when no projects exist in Firebase yet */
          <div className="p-16 text-center border border-dashed border-zinc-800 rounded-3xl space-y-4 font-mono">
            <Sparkles className="w-10 h-10 text-emerald-400 mx-auto animate-pulse" />
            <h3 className="text-lg font-bold text-white uppercase font-sans">
              [ FIREBASE LIVE PORTFOLIO READY ]
            </h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
              No live projects added yet. Open the Admin CMS (URL ending with <code className="text-emerald-400">#admin</code> or press <code className="text-emerald-400">Ctrl+Shift+A</code>) to upload your projects directly!
            </p>
          </div>
        )}
      </div>

      {/* Project Detail Modal Overlay */}
      <AnimatePresence>
        {activeModalProject && (
          <div
            onClick={() => setActiveModalProject(null)}
            className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl overflow-y-auto cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border p-6 sm:p-10 space-y-6 shadow-2xl relative my-auto cursor-default ${
                theme === 'dark' ? 'bg-[#0d0d0d] border-[#262626] text-[#ffffff]' : 'bg-[#ffffff] border-[#e5e5e5] text-[#000000]'
              }`}
            >
              {/* Prominent High-Visibility Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="sticky top-0 float-right z-50 p-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5 font-mono text-xs font-bold uppercase"
                title="Close Window (X)"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
                <span className="hidden sm:inline">CLOSE</span>
              </button>

              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 clear-both">
                <img
                  src={activeModalProject.imageUrl}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-left">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
                      {activeModalProject.category}
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black uppercase font-sans tracking-tight">
                      {activeModalProject.title}
                    </h2>
                  </div>

                  {activeModalProject.liveUrl && (
                    <a
                      href={activeModalProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-emerald-400 hover:scale-105 transition-all shadow-xl"
                    >
                      <span>VISIT LIVE SITE</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <p className="text-sm leading-relaxed text-zinc-400 font-sans">
                  {activeModalProject.description}
                </p>

                <div className="pt-4 border-t border-zinc-800 flex flex-wrap gap-2">
                  {activeModalProject.techStack?.map((t, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-zinc-800 text-xs font-mono text-zinc-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
