import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ServiceItem } from '../../types';
import { useTheme } from '../../context/ThemeContext';

export const ExperimentalServices: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { theme } = useTheme();

  const services: ServiceItem[] = [
    {
      id: 'srv-1',
      number: '01',
      title: 'WEBSITE DEVELOPMENT',
      description: 'Bespoke websites built with React 19, Next.js, and Three.js 3D WebGL scenes.',
      tags: ['React', 'Next.js', 'WebGL', 'SEO']
    },
    {
      id: 'srv-2',
      number: '02',
      title: 'E-COMMERCE STORES',
      description: 'Luxury digital storefronts, custom checkout flows, payment gateways, and inventory sync.',
      tags: ['Stripe', 'Paymob', 'Shopify Custom', 'Framer Motion']
    },
    {
      id: 'srv-3',
      number: '03',
      title: 'WEB APPLICATIONS & AI CHATBOTS',
      description: 'Fullstack cloud web platforms, custom AI chatbots, digital menus with QR codes, and SaaS portals.',
      tags: ['Node.js', 'Firebase', 'AI SDK', 'APIs']
    },
    {
      id: 'srv-4',
      number: '04',
      title: 'UI / UX DESIGN SYSTEMS',
      description: 'Human-centered minimalist luxury design systems, wireframing, and motion prototypes.',
      tags: ['Figma', 'Prototyping', 'Design Systems', 'Micro-physics']
    },
    {
      id: 'srv-5',
      number: '05',
      title: 'BRAND DIGITAL EXPERIENCE',
      description: 'Complete brand positioning, 3D interactive showcases, sound design, and launch strategies.',
      tags: ['3D Branding', 'Identity', 'Kinetic Type', 'Strategy']
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
              // CORE CAPABILITIES
            </p>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-sans">
              WHAT WE BUILD
            </h2>
          </div>
          <p
            className={`text-xs font-mono tracking-widest uppercase ${
              theme === 'dark' ? 'text-[#a3a3a3]' : 'text-[#525252]'
            }`}
          >
            [ 05 SPECIALIZED DISCIPLINES ]
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
                  
                  {/* Number & Title */}
                  <div className="flex items-baseline gap-6">
                    <span
                      className={`font-mono text-sm sm:text-base font-bold transition-all duration-300 ${
                        isHovered
                          ? theme === 'dark'
                            ? 'text-[#ffffff] translate-x-2'
                            : 'text-[#000000] translate-x-2'
                          : 'text-[#525252]'
                      }`}
                    >
                      {srv.number} —
                    </span>

                    <h3
                      className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase transition-all duration-300 font-sans ${
                        isHovered
                          ? theme === 'dark'
                            ? 'text-[#ffffff] scale-105'
                            : 'text-[#000000] scale-105'
                          : 'text-[#a3a3a3]'
                      }`}
                    >
                      {srv.title}
                    </h3>
                  </div>

                  {/* Expand Description & Arrow */}
                  <div className="flex items-center gap-6">
                    <p
                      className={`text-xs max-w-sm font-sans hidden sm:block ${
                        theme === 'dark' ? 'text-[#a3a3a3]' : 'text-[#525252]'
                      }`}
                    >
                      {srv.description}
                    </p>

                    <div
                      className={`p-4 rounded-full border transition-all duration-300 ${
                        isHovered
                          ? theme === 'dark'
                            ? 'bg-[#ffffff] text-[#000000] border-[#ffffff]'
                            : 'bg-[#000000] text-[#ffffff] border-[#000000]'
                          : theme === 'dark'
                          ? 'bg-[#0d0d0d] text-[#525252] border-[#262626]'
                          : 'bg-[#f4f4f5] text-[#525252] border-[#e4e4e7]'
                      }`}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                </div>

                {/* Animated Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  className={`absolute bottom-0 left-0 right-0 h-[2px] origin-left ${
                    theme === 'dark' ? 'bg-[#ffffff]' : 'bg-[#000000]'
                  }`}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
