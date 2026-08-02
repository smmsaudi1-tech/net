import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export const FloatingTechStack: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();

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
    <section
      className={`py-36 border-b transition-colors duration-500 relative overflow-hidden text-left ${
        theme === 'dark'
          ? 'bg-[#000000] text-[#ffffff] border-[#181818]'
          : 'bg-[#f4f4f5] text-[#000000] border-[#e4e4e7]'
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
              // PROGRAMMING ENGINE & TECH STACK
            </p>
            <h2 className="text-4xl sm:text-7xl font-black tracking-tighter uppercase font-sans">
              CODE & TECH MATRIX
            </h2>
          </div>
          <p
            className={`text-xs font-mono tracking-widest uppercase ${
              theme === 'dark' ? 'text-[#a3a3a3]' : 'text-[#525252]'
            }`}
          >
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
                className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between h-52 group cursor-pointer shadow-2xl relative overflow-hidden ${
                  theme === 'dark'
                    ? 'bg-[#0d0d0d] border-[#262626] hover:border-[#ffffff] hover:bg-[#121212]'
                    : 'bg-[#ffffff] border-[#e4e4e7] hover:border-[#000000] hover:bg-[#fafafa]'
                }`}
                data-cursor="CODE"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-mono tracking-widest uppercase ${
                      theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
                    }`}
                  >
                    {tech.category}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2.5 py-1 rounded-full ${
                      theme === 'dark'
                        ? 'bg-[#181818] text-[#a3a3a3]'
                        : 'bg-[#f4f4f5] text-[#525252]'
                    }`}
                  >
                    {tech.code}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-black font-mono uppercase group-hover:text-[#a3a3a3] transition-colors">
                    {tech.name}
                  </h3>
                  <p
                    className={`text-[10px] font-mono transition-colors ${
                      theme === 'dark' ? 'text-[#525252] group-hover:text-[#ffffff]' : 'text-[#a1a1aa] group-hover:text-[#000000]'
                    }`}
                  >
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
