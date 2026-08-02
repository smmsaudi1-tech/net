import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSiteContent } from '../../context/SiteContentContext';

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
      className={`py-32 border-b transition-colors duration-500 relative text-left ${
        theme === 'dark'
          ? 'bg-[#000000] text-[#ffffff] border-[#181818]'
          : 'bg-[#ffffff] text-[#000000] border-[#e4e4e7]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10 space-y-16">
        
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
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-sans">
              {getText('services.title', 'WHAT WE BUILD')}
            </h2>
          </div>
          <p
            className={`text-xs font-mono tracking-widest uppercase ${
              theme === 'dark' ? 'text-[#a3a3a3]' : 'text-[#525252]'
            }`}
          >
            {getText('services.count', '[ 05 SPECIALIZED DISCIPLINES ]')}
          </p>
        </div>

        {/* Vertical Interactive List */}
        <div className={`divide-y ${theme === 'dark' ? 'divide-[#181818]' : 'divide-[#e4e4e7]'}`}>
          {services.map((srv, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={srv.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="py-10 group cursor-pointer transition-all duration-500 relative overflow-hidden"
                data-cursor="EXPLORE"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10 text-left">
                  
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono text-xs font-bold text-zinc-500">{srv.number}</span>
                    <h3 className="text-2xl sm:text-4xl font-black uppercase font-sans tracking-tight">
                      {srv.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm max-w-md text-zinc-400 font-sans leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="p-3 rounded-full border border-zinc-700 group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
