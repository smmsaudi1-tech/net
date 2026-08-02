import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ServiceItem } from '../../types';

export const ExperimentalServices: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const services: ServiceItem[] = [
    {
      id: 'srv-1',
      number: '01',
      title: 'WEBSITE DEVELOPMENT',
      description: 'High-performance bespoke websites built with React, Next.js, and Three.js 3D interactions.',
      tags: ['React', 'Next.js', 'WebGL', 'SEO']
    },
    {
      id: 'srv-2',
      number: '02',
      title: 'E-COMMERCE',
      description: 'Luxury digital storefronts, custom checkout flows, payment gateways, and automated inventory sync.',
      tags: ['Stripe', 'Paymob', 'Shopify Custom', 'Framer Motion']
    },
    {
      id: 'srv-3',
      number: '03',
      title: 'WEB APPLICATIONS',
      description: 'Fullstack cloud web platforms, digital menus with QR codes, booking portals, and custom SaaS dashboards.',
      tags: ['Node.js', 'Firebase', 'APIs', 'Cloud Platforms']
    },
    {
      id: 'srv-4',
      number: '04',
      title: 'UI / UX DESIGN',
      description: 'Human-centered minimalist luxury design systems, wireframing, motion prototypes, and interaction architecture.',
      tags: ['Figma', 'Prototyping', 'Design Systems', 'Micro-physics']
    },
    {
      id: 'srv-5',
      number: '05',
      title: 'BRAND DIGITAL EXPERIENCE',
      description: 'Complete brand positioning, 3D interactive showcases, sound design, and viral digital launch strategies.',
      tags: ['3D Branding', 'Identity', 'Kinetic Type', 'Strategy']
    }
  ];

  return (
    <section id="services" className="py-32 bg-[#000000] border-b border-[#181818] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 space-y-16">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#181818] pb-8 text-left">
          <div>
            <p className="text-[10px] font-mono tracking-[0.4em] text-[#525252] uppercase mb-2">
              // CORE CAPABILITIES
            </p>
            <h2 className="text-4xl sm:text-6xl font-black text-[#ffffff] tracking-tighter uppercase font-sans">
              WHAT WE BUILD
            </h2>
          </div>
          <p className="text-xs font-mono text-[#a3a3a3] tracking-widest uppercase">
            [ 05 SPECIALIZED DISCIPLINES ]
          </p>
        </div>

        {/* Vertical Interactive List */}
        <div className="divide-y divide-[#181818]">
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
                    <span className={`font-mono text-sm sm:text-base font-bold transition-all duration-300 ${isHovered ? 'text-[#ffffff] translate-x-2' : 'text-[#525252]'}`}>
                      {srv.number} —
                    </span>

                    <h3 className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase transition-all duration-300 font-sans ${isHovered ? 'text-[#ffffff] scale-105 tracking-normal' : 'text-[#a3a3a3]'}`}>
                      {srv.title}
                    </h3>
                  </div>

                  {/* Expand Description & Tags on Hover */}
                  <div className="flex items-center gap-6">
                    <p className="text-xs text-[#a3a3a3] max-w-sm font-sans hidden sm:block">
                      {srv.description}
                    </p>

                    <div className={`p-4 rounded-full border transition-all duration-300 ${isHovered ? 'bg-[#ffffff] text-[#000000] border-[#ffffff]' : 'bg-[#0d0d0d] text-[#525252] border-[#262626]'}`}>
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                </div>

                {/* Animated Horizontal Expand Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ffffff] origin-left shadow-[0_0_12px_#ffffff]"
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
