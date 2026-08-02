import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalScrollSection: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const steps = [
    { number: '01', title: 'IDEA & DISCOVERY', desc: 'Analyzing brand position, architecture, business goals, and audience psychology.', detail: 'DISCOVERY PHASE // 2026' },
    { number: '02', title: 'LUXURY DESIGN', desc: 'Architecting minimal typography, 3D WebGL scenes, and fluid motion prototypes.', detail: 'DESIGN SYSTEM' },
    { number: '03', title: 'HARDWARE CODE', desc: 'Engineering robust React, Next.js, and WebGL code for ultra-fast performance.', detail: 'ENGINEERING' },
    { number: '04', title: 'SPEED AUDIT', desc: 'Optimizing render cycles, mobile touch responsiveness, and 99/100 Lighthouse score.', detail: 'OPTIMIZATION' },
    { number: '05', title: 'GLOBAL LAUNCH', desc: 'Deploying globally with zero downtime, instant edge CDN routing, and ongoing scaling.', detail: 'PRODUCTION DEPLOY' }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;

    if (!container || !target) return;

    const ctx = gsap.context(() => {
      const scrollWidth = target.scrollWidth - window.innerWidth;

      gsap.to(target, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className={`border-b transition-colors duration-500 relative overflow-hidden text-left ${
        theme === 'dark'
          ? 'bg-[#000000] text-[#ffffff] border-[#181818]'
          : 'bg-[#f4f4f5] text-[#000000] border-[#e4e4e7]'
      }`}
    >
      <div className="h-[100dvh] flex flex-col justify-between py-12 px-6 sm:px-12">
        
        {/* Top Header */}
        <div
          className={`flex items-center justify-between border-b pb-6 max-w-7xl mx-auto w-full ${
            theme === 'dark' ? 'border-[#181818]' : 'border-[#e4e4e7]'
          }`}
        >
          <div>
            <p
              className={`text-[10px] font-mono tracking-[0.4em] uppercase mb-1 ${
                theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
              }`}
            >
              // GSAP PINNED HORIZONTAL ROADMAP
            </p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase font-sans">
              FROM IDEA TO DIGITAL
            </h2>
          </div>
          <span
            className={`text-xs font-mono tracking-widest uppercase ${
              theme === 'dark' ? 'text-[#a3a3a3]' : 'text-[#525252]'
            }`}
          >
            [ GSAP SCROLLTRIGGER PINNED ]
          </span>
        </div>

        {/* Horizontal Moving Track */}
        <div ref={targetRef} className="flex items-center gap-8 pl-4 pr-32">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className={`w-[320px] sm:w-[480px] h-[360px] sm:h-[420px] p-8 sm:p-10 rounded-3xl border transition-all duration-500 flex flex-col justify-between group shadow-2xl flex-shrink-0 ${
                theme === 'dark'
                  ? 'bg-[#0d0d0d] border-[#262626] hover:border-[#ffffff]'
                  : 'bg-[#ffffff] border-[#e4e4e7] hover:border-[#000000]'
              }`}
              data-cursor="GSAP PIN"
            >
              <div className="flex items-center justify-between text-mono">
                <span
                  className={`text-xs font-mono font-bold ${
                    theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
                  }`}
                >
                  {step.detail}
                </span>
                <span className="text-3xl font-mono font-black group-hover:scale-110 transition-transform">
                  {step.number}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-3xl sm:text-4xl font-black tracking-tight uppercase font-sans group-hover:text-[#a3a3a3] transition-colors">
                  {step.title}
                </h3>

                <p
                  className={`text-xs sm:text-sm leading-relaxed font-sans font-medium ${
                    theme === 'dark' ? 'text-[#a3a3a3]' : 'text-[#525252]'
                  }`}
                >
                  {step.desc}
                </p>
              </div>

              <div
                className={`pt-4 border-t flex items-center justify-between text-[10px] font-mono uppercase ${
                  theme === 'dark' ? 'border-[#1a1a1a] text-[#525252]' : 'border-[#f4f4f5] text-[#a1a1aa]'
                }`}
              >
                <span>NEXT GEN ROADMAP</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Scroll Indicator */}
        <div
          className={`max-w-7xl mx-auto w-full flex justify-between text-[10px] font-mono uppercase ${
            theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
          }`}
        >
          <span>SCROLL DOWN TO ADVANCE HORIZONTALLY</span>
          <span>GSAP PINNED STAGE</span>
        </div>

      </div>
    </section>
  );
};
