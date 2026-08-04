import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalScrollSection: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'IDEA & DISCOVERY',
      desc: 'Analyzing brand position, architecture, business goals, and audience psychology.',
      detail: 'DISCOVERY PHASE // 2026',
      tag: 'RESEARCH'
    },
    {
      number: '02',
      title: 'LUXURY DESIGN',
      desc: 'Architecting minimal typography, 3D WebGL scenes, and fluid motion prototypes.',
      detail: 'DESIGN SYSTEM',
      tag: 'CREATIVE'
    },
    {
      number: '03',
      title: 'HARDWARE CODE',
      desc: 'Engineering robust React, Next.js, and WebGL code for ultra-fast performance.',
      detail: 'ENGINEERING',
      tag: 'ARCHITECTURE'
    },
    {
      number: '04',
      title: 'SPEED AUDIT',
      desc: 'Optimizing render cycles, mobile touch responsiveness, and 99/100 Lighthouse score.',
      detail: 'OPTIMIZATION',
      tag: 'PERFORMANCE'
    },
    {
      number: '05',
      title: 'GLOBAL LAUNCH',
      desc: 'Deploying globally with zero downtime, instant edge CDN routing, and ongoing scaling.',
      detail: 'PRODUCTION DEPLOY',
      tag: 'DEPLOYMENT'
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;

    if (!container || !target) return;

    const ctx = gsap.context(() => {
      // Calculate total translate distance including generous end padding
      const totalTranslate = target.scrollWidth - window.innerWidth;
      // Add extra hold-pin buffer distance so the last card remains pinned while being read
      const holdDistance = Math.max(700, window.innerHeight * 0.85);
      const totalPinDuration = totalTranslate + holdDistance;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${totalPinDuration}`,
          pin: true,
          scrub: 1.2, // Ultra fluid scrub physics with smooth inertia
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const rawProgress = self.progress;
            const translateRatio = totalTranslate / totalPinDuration;
            const horizProgress = Math.min(1, rawProgress / translateRatio);

            setProgressPercent(Math.round(horizProgress * 100));

            // Calculate active step index smoothly
            const calculatedIndex = Math.min(
              steps.length - 1,
              Math.floor(horizProgress * steps.length)
            );
            setActiveStep(calculatedIndex);
          }
        }
      });

      // 1. Horizontal translate across totalTranslate distance
      tl.to(target, {
        x: -totalTranslate,
        ease: 'power1.out',
        duration: totalTranslate
      });

      // 2. Hold phase: Section remains pinned stationary at the end so user can read card 05
      tl.to({}, { duration: holdDistance });
    }, container);

    return () => ctx.revert();
  }, [steps.length]);

  const scrollToStep = (index: number) => {
    const container = containerRef.current;
    const target = targetRef.current;
    if (!container || !target) return;

    const totalTranslate = target.scrollWidth - window.innerWidth;
    const stepRatio = index / (steps.length - 1);
    const targetY = container.offsetTop + stepRatio * totalTranslate;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  return (
    <section
      ref={containerRef}
      className={`border-b transition-colors duration-500 relative overflow-hidden text-left ${
        theme === 'dark'
          ? 'bg-[#000000] text-[#ffffff] border-[#181818]'
          : 'bg-[#f4f4f5] text-[#000000] border-[#e4e4e7]'
      }`}
    >
      <div className="h-[100dvh] flex flex-col justify-between py-8 sm:py-12 px-6 sm:px-12 relative z-10">
        
        {/* Top Header & Interactive Navigator */}
        <div
          className={`flex items-center justify-between border-b pb-6 max-w-7xl mx-auto w-full ${
            theme === 'dark' ? 'border-[#181818]' : 'border-[#e4e4e7]'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
              <p
                className={`text-[10px] font-mono tracking-[0.4em] uppercase ${
                  theme === 'dark' ? 'text-[#737373]' : 'text-[#71717a]'
                }`}
              >
                // GSAP PINNED HORIZONTAL ROADMAP
              </p>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase font-sans">
              FROM IDEA TO DIGITAL
            </h2>
          </div>

          {/* Controls & Active Counter */}
          <div className="hidden sm:flex items-center gap-6">
            <div className="text-right font-mono">
              <span className="text-2xl font-black tracking-widest text-cyan-400">
                0{activeStep + 1}
              </span>
              <span className={`text-xs opacity-50 ml-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                / 0{steps.length}
              </span>
            </div>

            {/* Quick Arrow Navigators */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className={`p-2 rounded-full border transition-all ${
                  activeStep === 0
                    ? 'opacity-30 cursor-not-allowed border-transparent'
                    : theme === 'dark'
                    ? 'border-[#262626] bg-[#0d0d0d] hover:bg-[#1f1f1f] text-white'
                    : 'border-[#e4e4e7] bg-white hover:bg-gray-100 text-black shadow-sm'
                }`}
                aria-label="Previous step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToStep(Math.min(steps.length - 1, activeStep + 1))}
                disabled={activeStep === steps.length - 1}
                className={`p-2 rounded-full border transition-all ${
                  activeStep === steps.length - 1
                    ? 'opacity-30 cursor-not-allowed border-transparent'
                    : theme === 'dark'
                    ? 'border-[#262626] bg-[#0d0d0d] hover:bg-[#1f1f1f] text-white'
                    : 'border-[#e4e4e7] bg-white hover:bg-gray-100 text-black shadow-sm'
                }`}
                aria-label="Next step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Moving Track */}
        <div
          ref={targetRef}
          className="flex items-center gap-6 sm:gap-8 pl-4 pr-[35vw] my-auto py-4"
        >
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.number}
                onClick={() => scrollToStep(idx)}
                className={`w-[300px] sm:w-[460px] h-[350px] sm:h-[410px] p-8 sm:p-10 rounded-3xl border cursor-pointer transition-all duration-500 flex flex-col justify-between group shadow-2xl flex-shrink-0 relative overflow-hidden ${
                  isActive
                    ? theme === 'dark'
                      ? 'bg-[#121212] border-cyan-500/60 shadow-cyan-950/20 scale-[1.02]'
                      : 'bg-white border-cyan-600/60 shadow-xl scale-[1.02]'
                    : theme === 'dark'
                    ? 'bg-[#0d0d0d] border-[#262626] hover:border-[#404040] opacity-80 hover:opacity-100'
                    : 'bg-[#ffffff] border-[#e4e4e7] hover:border-[#a1a1aa] opacity-85 hover:opacity-100'
                }`}
                data-cursor="GSAP ROADMAP"
              >
                {/* Active Indicator Top Glow */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-emerald-400" />
                )}

                <div className="flex items-center justify-between font-mono">
                  <span
                    className={`text-xs font-mono font-bold tracking-wider ${
                      isActive
                        ? 'text-cyan-400'
                        : theme === 'dark'
                        ? 'text-[#525252]'
                        : 'text-[#a1a1aa]'
                    }`}
                  >
                    {step.detail}
                  </span>
                  <span
                    className={`text-3xl font-mono font-black transition-transform group-hover:scale-110 ${
                      isActive ? 'text-cyan-400' : ''
                    }`}
                  >
                    {step.number}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="inline-block px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {step.tag}
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-black tracking-tight uppercase font-sans group-hover:text-cyan-400 transition-colors">
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
                  <span className={isActive ? 'text-cyan-400 font-bold' : ''}>
                    {isActive ? 'CURRENT PHASE' : 'CLICK TO NAVIGATE'}
                  </span>
                  <ArrowUpRight
                    className={`w-4 h-4 transition-all ${
                      isActive
                        ? 'opacity-100 text-cyan-400 translate-x-0.5 -translate-y-0.5'
                        : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Interactive Progress Bar & Steps Indicator */}
        <div className="max-w-7xl mx-auto w-full space-y-3">
          {/* Smooth Progress Line */}
          <div
            className={`w-full h-1 rounded-full overflow-hidden ${
              theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#e4e4e7]'
            }`}
          >
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div
            className={`flex items-center justify-between text-[10px] font-mono uppercase ${
              theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              SCROLL DOWN TO ADVANCE HORIZONTALLY ({progressPercent}%)
            </span>

            {/* Clickable Step Dots */}
            <div className="flex items-center gap-3">
              {steps.map((step, index) => (
                <button
                  key={step.number}
                  onClick={() => scrollToStep(index)}
                  className={`transition-all font-mono ${
                    activeStep === index
                      ? 'text-cyan-400 font-bold scale-125 underline underline-offset-4'
                      : 'hover:text-white opacity-60 hover:opacity-100'
                  }`}
                >
                  {step.number}
                </button>
              ))}
            </div>

            <span className="hidden md:inline">GSAP PINNED ROADMAP STAGE</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HorizontalScrollSection;
