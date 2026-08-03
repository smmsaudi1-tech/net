import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSiteContent } from '../../context/SiteContentContext';
import { soundEngine } from '../../utils/audioEngine';

export const ExperimentalServices: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { theme } = useTheme();
  const { getText } = useSiteContent();

  const services = [
    {
      id: 'srv-1',
      number: '01',
      title: getText('srv1.title', 'WEBSITE DEVELOPMENT'),
      description: getText('srv1.desc', 'Bespoke websites built with React, Next.js, and Three.js 3D WebGL scenes.')
    },
    {
      id: 'srv-2',
      number: '02',
      title: getText('srv2.title', 'E-COMMERCE STORES'),
      description: getText('srv2.desc', 'Luxury digital storefronts, custom checkout flows, payment gateways, and inventory sync.')
    },
    {
      id: 'srv-3',
      number: '03',
      title: getText('srv3.title', 'WEB APPLICATIONS & AI CHATBOTS'),
      description: getText('srv3.desc', 'Fullstack cloud web platforms, custom AI chatbots, digital menus with QR codes, and SaaS portals.')
    },
    {
      id: 'srv-4',
      number: '04',
      title: getText('srv4.title', 'UI / UX DESIGN SYSTEMS'),
      description: getText('srv4.desc', 'Human-centered minimalist luxury design systems, wireframing, and motion prototypes.')
    },
    {
      id: 'srv-5',
      number: '05',
      title: getText('srv5.title', 'BRAND DIGITAL EXPERIENCE'),
      description: getText('srv5.desc', 'Complete brand positioning, 3D interactive showcases, sound design, and launch strategies.')
    }
  ];

  return (
    <section
      id="services"
      className={`py-24 sm:py-32 border-b transition-colors duration-500 relative text-left ${
        theme === 'dark'
          ? 'bg-[#000000] text-[#ffffff] border-[#181818]'
          : 'bg-[#ffffff] text-[#000000] border-[#e4e4e7]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10 space-y-12 sm:space-y-16">
        
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
              {getText('services.tag', '// CORE CAPABILITIES')}
            </p>
            <h2 className="text-3xl sm:text-6xl font-black tracking-tighter uppercase font-sans">
              {getText('services.title', 'WHAT WE BUILD')}
            </h2>
          </div>
          <p
            className={`text-xs font-mono tracking-widest uppercase flex items-center gap-2 ${
              theme === 'dark' ? 'text-[#a3a3a3]' : 'text-[#525252]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            {getText('services.count', '[ 05 SPECIALIZED DISCIPLINES ]')}
          </p>
        </div>

        {/* Vertical Animated Interactive List with Scroll Reveal */}
        <div className="space-y-4">
          {services.map((srv, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ margin: '-40px', once: false }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
                onMouseEnter={() => {
                  soundEngine.playHover();
                  setHoveredIdx(idx);
                }}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`p-6 sm:p-8 rounded-3xl border transition-all duration-500 relative overflow-hidden group cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-[#0a0a10]/80 border-[#1f1f2e] hover:border-emerald-500/60 hover:bg-[#10101c]'
                    : 'bg-[#fafafa] border-[#e4e4e7] hover:border-emerald-500/60 hover:bg-[#ffffff] shadow-md'
                }`}
                data-cursor="EXPLORE"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10 text-left">
                  
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span className="font-mono text-xs font-bold text-emerald-400">{srv.number}</span>
                    <h3 className="text-xl sm:text-3xl lg:text-4xl font-black uppercase font-sans tracking-tight group-hover:text-emerald-400 transition-colors">
                      {srv.title}
                    </h3>
                  </div>

                  <p
                    className={`text-xs sm:text-sm max-w-md font-sans leading-relaxed transition-colors ${
                      theme === 'dark' ? 'text-zinc-400 group-hover:text-zinc-200' : 'text-zinc-600 group-hover:text-zinc-900'
                    }`}
                  >
                    {srv.description}
                  </p>

                  <div
                    className={`p-3 rounded-full border transition-all self-start lg:self-auto ${
                      theme === 'dark'
                        ? 'border-zinc-800 group-hover:bg-emerald-400 group-hover:text-black group-hover:border-emerald-400'
                        : 'border-zinc-300 group-hover:bg-emerald-500 group-hover:text-black group-hover:border-emerald-500'
                    }`}
                  >
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
