import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const FloatingTechStack: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const techNodes = [
    { name: 'REACT 19', category: 'Frontend Engine', code: '<Component />', depth: 1.4 },
    { name: 'NEXT.JS', category: 'SSR & Cloud', code: 'export default App', depth: 0.9 },
    { name: 'THREE.JS', category: '3D WebGL Engine', code: 'new THREE.Scene()', depth: 1.6 },
    { name: 'GSAP', category: 'Motion Systems', code: 'ScrollTrigger.create()', depth: 0.7 },
    { name: 'TAILWIND CSS', category: 'Styling System', code: '@apply backdrop-blur', depth: 1.2 },
    { name: 'NODE.JS', category: 'Backend Systems', code: 'express.listen()', depth: 1.0 },
    { name: 'FIREBASE', category: 'Realtime Database', code: 'onSnapshot()', depth: 1.3 },
    { name: 'TYPESCRIPT', category: 'Type Safety', code: 'interface Props', depth: 0.8 }
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
    <section className="py-36 bg-[#000000] border-b border-[#181818] relative overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 space-y-16">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#181818] pb-8">
          <div>
            <p className="text-[10px] font-mono tracking-[0.4em] text-[#525252] uppercase mb-2">
              // PROGRAMMING ENGINE & TECH STACK
            </p>
            <h2 className="text-4xl sm:text-7xl font-black text-[#ffffff] tracking-tighter uppercase font-sans">
              CODE & TECH MATRIX
            </h2>
          </div>
          <p className="text-xs font-mono text-[#a3a3a3] tracking-widest uppercase">
            [ 3D PARALLAX CODE NODES ]
          </p>
        </div>

        {/* Floating Code Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {techNodes.map((tech, idx) => {
            const offsetX = mousePos.x * 25 * tech.depth;
            const offsetY = mousePos.y * 25 * tech.depth;

            return (
              <motion.div
                key={idx}
                animate={{
                  x: offsetX,
                  y: offsetY
                }}
                transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                className="p-8 rounded-3xl bg-[#0d0d0d] border border-[#262626] hover:border-[#ffffff] hover:bg-[#121212] transition-all duration-300 flex flex-col justify-between h-52 group cursor-pointer shadow-2xl relative overflow-hidden"
                data-cursor="CODE"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#525252] tracking-widest uppercase">
                    {tech.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#a3a3a3] bg-[#181818] px-2.5 py-1 rounded-full">
                    {tech.code}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-black font-mono text-[#ffffff] group-hover:text-[#a3a3a3] transition-colors uppercase">
                    {tech.name}
                  </h3>
                  <p className="text-[10px] font-mono text-[#525252] group-hover:text-[#ffffff] transition-colors">
                    SYS.MODULE // OK
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
