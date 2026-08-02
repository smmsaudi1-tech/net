import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, Code, Cpu, Layers, Zap, Database, ShieldCheck, Flame, Box } from 'lucide-react';

export const FloatingTechStack: React.FC = () => {
  const { theme } = useTheme();

  const techNodesRow1 = [
    { name: 'REACT 19', category: 'Frontend Engine', code: '<Component />', icon: Cpu, color: 'text-cyan-400' },
    { name: 'NEXT.JS', category: 'SSR & Cloud', code: 'export default App', icon: Layers, color: 'text-white' },
    { name: 'THREE.JS', category: '3D WebGL Engine', code: 'new THREE.Scene()', icon: Box, color: 'text-[#38bdf8]' },
    { name: 'GSAP', category: 'Motion Systems', code: 'ScrollTrigger.create()', icon: Zap, color: 'text-emerald-400' },
    { name: 'TAILWIND CSS', category: 'Styling System', code: '@apply backdrop-blur', icon: Sparkles, color: 'text-sky-400' },
    { name: 'NODE.JS', category: 'Backend Systems', code: 'express.listen()', icon: Code, color: 'text-green-400' },
    { name: 'FIREBASE', category: 'Realtime Database', code: 'onSnapshot()', icon: Flame, color: 'text-amber-400' },
    { name: 'TYPESCRIPT', category: 'Type Safety', code: 'interface Props', icon: ShieldCheck, color: 'text-blue-400' }
  ];

  const techNodesRow2 = [
    { name: 'THREE.JS', category: '3D WebGL Engine', code: 'new THREE.Scene()', icon: Box, color: 'text-[#38bdf8]' },
    { name: 'GSAP', category: 'Motion Systems', code: 'ScrollTrigger.create()', icon: Zap, color: 'text-emerald-400' },
    { name: 'REACT 19', category: 'Frontend Engine', code: '<Component />', icon: Cpu, color: 'text-cyan-400' },
    { name: 'TYPESCRIPT', category: 'Type Safety', code: 'interface Props', icon: ShieldCheck, color: 'text-blue-400' },
    { name: 'NEXT.JS', category: 'SSR & Cloud', code: 'export default App', icon: Layers, color: 'text-white' },
    { name: 'FIREBASE', category: 'Realtime Database', code: 'onSnapshot()', icon: Flame, color: 'text-amber-400' },
    { name: 'TAILWIND CSS', category: 'Styling System', code: '@apply backdrop-blur', icon: Sparkles, color: 'text-sky-400' },
    { name: 'NODE.JS', category: 'Backend Systems', code: 'express.listen()', icon: Code, color: 'text-green-400' }
  ];

  // Double array for seamless 100% infinite marquee loop
  const marqueeRow1 = [...techNodesRow1, ...techNodesRow1, ...techNodesRow1];
  const marqueeRow2 = [...techNodesRow2, ...techNodesRow2, ...techNodesRow2];

  return (
    <section
      className={`py-32 border-b transition-colors duration-500 relative overflow-hidden text-left ${
        theme === 'dark'
          ? 'bg-[#000000] text-[#ffffff] border-[#181818]'
          : 'bg-[#f4f4f5] text-[#000000] border-[#e4e4e7]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10 space-y-12">
        {/* Section Header */}
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
            className={`text-xs font-mono tracking-widest uppercase flex items-center gap-2 ${
              theme === 'dark' ? 'text-[#a3a3a3]' : 'text-[#525252]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            [ HORIZONTAL INFINITE ANIMATED STREAM ]
          </p>
        </div>
      </div>

      {/* Marquee Row 1 (Moving Left) */}
      <div className="relative w-full overflow-hidden py-4 mt-8 flex">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear'
          }}
          className="flex gap-6 shrink-0"
        >
          {marqueeRow1.map((tech, idx) => {
            const IconComponent = tech.icon;
            return (
              <div
                key={idx}
                className={`w-[300px] p-6 rounded-3xl border transition-all duration-500 flex flex-col justify-between h-44 shrink-0 cursor-pointer shadow-xl backdrop-blur-md group hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-[#0c0c12]/90 border-[#222230] hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]'
                    : 'bg-[#ffffff]/90 border-[#e4e4e7] hover:border-emerald-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]'
                }`}
                data-cursor="TECH"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className={`w-5 h-5 ${tech.color} group-hover:scale-110 transition-transform`} />
                    <span
                      className={`text-[10px] font-mono tracking-widest uppercase font-bold ${
                        theme === 'dark' ? 'text-[#71717a]' : 'text-[#525252]'
                      }`}
                    >
                      {tech.category}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-mono px-2.5 py-1 rounded-full border ${
                      theme === 'dark'
                        ? 'bg-[#181818] border-[#262626] text-[#a3a3a3]'
                        : 'bg-[#f4f4f5] border-[#e4e4e7] text-[#525252]'
                    }`}
                  >
                    {tech.code}
                  </span>
                </div>

                <div className="space-y-1 text-left">
                  <h3 className="text-2xl font-black font-mono uppercase group-hover:text-emerald-400 transition-colors">
                    {tech.name}
                  </h3>
                  <p
                    className={`text-[10px] font-mono flex items-center gap-1.5 ${
                      theme === 'dark' ? 'text-emerald-500 font-bold' : 'text-emerald-600 font-bold'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    SYS.MODULE // OPERATIONAL
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Marquee Row 2 (Moving Right in Opposite Direction) */}
      <div className="relative w-full overflow-hidden py-4 flex">
        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 28,
            ease: 'linear'
          }}
          className="flex gap-6 shrink-0"
        >
          {marqueeRow2.map((tech, idx) => {
            const IconComponent = tech.icon;
            return (
              <div
                key={idx}
                className={`w-[300px] p-6 rounded-3xl border transition-all duration-500 flex flex-col justify-between h-44 shrink-0 cursor-pointer shadow-xl backdrop-blur-md group hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-[#0c0c12]/90 border-[#222230] hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]'
                    : 'bg-[#ffffff]/90 border-[#e4e4e7] hover:border-cyan-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]'
                }`}
                data-cursor="TECH"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className={`w-5 h-5 ${tech.color} group-hover:scale-110 transition-transform`} />
                    <span
                      className={`text-[10px] font-mono tracking-widest uppercase font-bold ${
                        theme === 'dark' ? 'text-[#71717a]' : 'text-[#525252]'
                      }`}
                    >
                      {tech.category}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-mono px-2.5 py-1 rounded-full border ${
                      theme === 'dark'
                        ? 'bg-[#181818] border-[#262626] text-[#a3a3a3]'
                        : 'bg-[#f4f4f5] border-[#e4e4e7] text-[#525252]'
                    }`}
                  >
                    {tech.code}
                  </span>
                </div>

                <div className="space-y-1 text-left">
                  <h3 className="text-2xl font-black font-mono uppercase group-hover:text-cyan-400 transition-colors">
                    {tech.name}
                  </h3>
                  <p
                    className={`text-[10px] font-mono flex items-center gap-1.5 ${
                      theme === 'dark' ? 'text-cyan-400 font-bold' : 'text-cyan-600 font-bold'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    SYS.MODULE // ACTIVE
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
