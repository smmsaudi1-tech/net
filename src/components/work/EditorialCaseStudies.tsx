import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ArrowUpRight, Eye, Plus } from 'lucide-react';
import { REAL_PROJECTS } from '../../data/projectsData';
import { RealProject } from '../../types';
import { soundEngine } from '../../utils/audioEngine';
import { useTheme } from '../../context/ThemeContext';
import { useSiteContent } from '../../context/SiteContentContext';
import { subscribeProjects } from '../../services/projectService';

gsap.registerPlugin(ScrollTrigger);

export const EditorialCaseStudies: React.FC = () => {
  const [projects, setProjects] = useState<RealProject[]>(REAL_PROJECTS);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<RealProject | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { getText, setAdminOpen } = useSiteContent();

  const categories = ['ALL', 'E-COMMERCE', 'BRANDS', 'APPS'];

  useEffect(() => {
    // Subscribe to live Firebase Firestore projects
    const unsub = subscribeProjects((fetchedProjects) => {
      if (fetchedProjects && fetchedProjects.length > 0) {
        setProjects(fetchedProjects);
      }
    });

    return () => unsub();
  }, []);

  const filteredProjects = projects.filter((proj) => {
    if (selectedFilter === 'ALL') return true;
    const cat = proj.category?.toLowerCase() || '';
    const sub = proj.subtitle?.toLowerCase() || '';
    if (selectedFilter === 'E-COMMERCE') return cat.includes('e-commerce') || sub.includes('fashion') || cat.includes('store');
    if (selectedFilter === 'BRANDS') return cat.includes('brand') || cat.includes('studio');
    if (selectedFilter === 'APPS') return cat.includes('app') || cat.includes('platform');
    return true;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.product-card-anim');

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.94, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, [selectedFilter, projects]);

  return (
    <section
      id="work"
      className={`py-28 border-b transition-colors duration-500 relative text-left ${
        theme === 'dark'
          ? 'bg-[#000000] text-[#ffffff] border-[#181818]'
          : 'bg-[#ffffff] text-[#000000] border-[#e4e4e7]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10 space-y-12">
        
        {/* Section Header & Filter Tabs */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8 ${
            theme === 'dark' ? 'border-[#181818]' : 'border-[#e4e4e7]'
          }`}
        >
          <div>
            <p
              className={`text-[10px] font-mono tracking-[0.4em] uppercase mb-2 ${
                theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
              }`}
            >
              {getText('work.tag', '// GSAP SCROLL-ANIMATED PRODUCTIONS')}
            </p>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-sans">
              {getText('work.title', 'SELECTED WORK')}
            </h2>
          </div>

          {/* Category Filter Tabs & Add Project Button */}
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
                    ? theme === 'dark'
                      ? 'bg-[#ffffff] text-[#000000] border-[#ffffff]'
                      : 'bg-[#000000] text-[#ffffff] border-[#000000]'
                    : theme === 'dark'
                    ? 'bg-[#0d0d0d] text-[#a3a3a3] border-[#262626] hover:border-[#525252]'
                    : 'bg-[#f4f4f5] text-[#525252] border-[#e4e4e7] hover:border-[#a1a1aa]'
                }`}
              >
                {cat}
              </button>
            ))}

            <button
              onClick={() => setAdminOpen(true)}
              className="px-4 py-2.5 rounded-full border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-bold uppercase tracking-widest cursor-pointer hover:bg-emerald-500 hover:text-black transition-all flex items-center gap-1.5"
              title="Add or Manage Projects in Firebase"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>MANAGE FIREBASE</span>
            </button>
          </div>
        </div>

        {/* Dynamic Project Showcase Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="product-card-anim group relative rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
              style={{
                backgroundColor: theme === 'dark' ? '#0d0d0d' : '#f9f9fb',
                borderColor: theme === 'dark' ? '#1c1c1e' : '#e4e4e7'
              }}
              onClick={() => setActiveModalProject(project)}
            >
              {/* Project Card Header & Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Live Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{project.category}</span>
                </div>

                <div className="absolute bottom-4 right-4 p-3 rounded-full bg-white text-black opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-2xl">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Project Card Info */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span>{project.subtitle}</span>
                    <span>{project.year || '2026'}</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight font-sans">
                    {project.title}
                  </h3>
                  <p className="text-xs line-clamp-2 text-zinc-400 leading-relaxed font-sans">
                    {project.description}
                  </p>
                </div>

                {/* Card Footer: Tech Stack Tags & Action Button */}
                <div className="pt-4 border-t border-zinc-800/40 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack?.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-zinc-800/60 text-[10px] font-mono text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full border border-zinc-700 hover:border-white hover:bg-white hover:text-black transition-all"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal Overlay */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border p-6 sm:p-10 space-y-6 shadow-2xl relative ${
                theme === 'dark' ? 'bg-[#0d0d0d] border-[#262626] text-[#ffffff]' : 'bg-[#ffffff] border-[#e5e5e5] text-[#000000]'
              }`}
            >
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white transition-colors cursor-pointer"
              >
                <Eye className="w-5 h-5" />
              </button>

              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
                <img
                  src={activeModalProject.imageUrl}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
                      {activeModalProject.category}
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black uppercase font-sans tracking-tight">
                      {activeModalProject.title}
                    </h2>
                  </div>

                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:scale-105 transition-all shadow-xl"
                  >
                    <span>VISIT LIVE SITE</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
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
