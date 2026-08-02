import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const FloatingTechStack: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const techNodes = [
    { name: 'REACT', category: 'Frontend Engine', depth: 1.2 },
    { name: 'NEXT.JS', category: 'SSR & Cloud', depth: 0.8 },
    { name: 'THREE.JS', category: '3D WebGL', depth: 1.5 },
    { name: 'GSAP', category: 'Motion Systems', depth: 0.6 },
    { name: 'TAILWIND CSS', category: 'Styling Architecture', depth: 1.1 },
    { name: 'NODE.JS', category: 'Backend Systems', depth: 0.9 },
    { name: 'FIREBASE', category: 'Realtime Data', depth: 1.3 },
    { name: 'TYPESCRIPT', category: 'Type Safety', depth: 0.7 }
  ];

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const halfX = window.innerWidth / 2;
      const halfY = window.innerHeight / 2;
      setMousePos({
        x: (e.clientX - halfX) / halfX,
        y: (e.clientY - halfY) / halfY
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section className="py-32 bg-[#000000] border-b border-[#181818] relative overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 space-y-16">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#181818] pb-8">
          <div>
            <p className="text-[10px] font-mono tracking-[0.4em] text-[#525252] uppercase mb-2">
              // TECH STACK & ENGINE
            </p>
            <h2 className="text-4xl sm:text-6xl font-black text-[#ffffff] tracking-tighter uppercase font-sans">
              ENGINEERING STACK
            </h2>
          </div>
          <p className="text-xs font-mono text-[#a3a3a3] tracking-widest uppercase">
            [ MONOCHROME PRECISION ]
          </p>
        </div>

        {/* Floating Nodes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 relative">
          {techNodes.map((tech, idx) => {
            const offsetX = mousePos.x * 20 * tech.depth;
            const offsetY = mousePos.y * 20 * tech.depth;

            return (
              <motion.div
                key={idx}
                animate={{
                  x: offsetX,
                  y: offsetY
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                className="p-8 rounded-3xl bg-[#0d0d0d] border border-[#262626] hover:border-[#525252] hover:bg-[#121212] transition-all flex flex-col justify-between h-44 group cursor-pointer shadow-xl"
                data-cursor="TECH"
              >
                <span className="text-[10px] font-mono text-[#525252] tracking-widest uppercase">
                  {tech.category}
                </span>

                <h3 className="text-xl sm:text-2xl font-black font-mono text-[#ffffff] group-hover:text-[#a3a3a3] transition-colors uppercase">
                  {tech.name}
                </h3>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
