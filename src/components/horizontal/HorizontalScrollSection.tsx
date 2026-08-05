import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronLeft, ChevronRight, Compass, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

export interface StepData {
  number: string;
  title: string;
  desc: string;
  detail: string;
  tag: string;
  accent: string;
  image: string;
  eyebrow: string;
}

export const HorizontalScrollSection: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  const steps: StepData[] = [
    {
      number: '01',
      title: 'IDEA & DISCOVERY',
      desc: 'Analyzing brand position, architecture, business goals, and audience psychology.',
      detail: 'DISCOVERY PHASE // 2026',
      tag: 'RESEARCH',
      accent: '#8b5cf6',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop',
      eyebrow: '01 // NEURAL RESEARCH'
    },
    {
      number: '02',
      title: 'LUXURY DESIGN',
      desc: 'Architecting minimal typography, 3D WebGL scenes, and fluid motion prototypes.',
      detail: 'DESIGN SYSTEM',
      tag: 'CREATIVE',
      accent: '#06b6d4',
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1920&auto=format&fit=crop',
      eyebrow: '02 // SPATIAL WEBGL'
    },
    {
      number: '03',
      title: 'HARDWARE CODE',
      desc: 'Engineering robust React, Next.js, and WebGL code for ultra-fast performance.',
      detail: 'ENGINEERING',
      tag: 'ARCHITECTURE',
      accent: '#10b981',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop',
      eyebrow: '03 // CORE ENGINE'
    },
    {
      number: '04',
      title: 'SPEED AUDIT',
      desc: 'Optimizing render cycles, mobile touch responsiveness, and 99/100 Lighthouse score.',
      detail: 'OPTIMIZATION',
      tag: 'PERFORMANCE',
      accent: '#f59e0b',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1920&auto=format&fit=crop',
      eyebrow: '04 // WEB VITALS'
    },
    {
      number: '05',
      title: 'GLOBAL LAUNCH',
      desc: 'Deploying globally with zero downtime, instant edge CDN routing, and ongoing scaling.',
      detail: 'PRODUCTION DEPLOY',
      tag: 'DEPLOYMENT',
      accent: '#ec4899',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1920&auto=format&fit=crop',
      eyebrow: '05 // PRODUCTION CITADEL'
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;

    if (!container || !target) return;

    const ctx = gsap.context(() => {
      const totalTranslate = target.scrollWidth - window.innerWidth;
      const holdDistance = Math.min(600, window.innerHeight * 0.6);
      const totalPin = totalTranslate + holdDistance;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${totalPin}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const rawProgress = self.progress;
            const translateRatio = totalTranslate / totalPin;
            const horizProgress = Math.min(1, rawProgress / translateRatio);

            setProgressPercent(Math.round(horizProgress * 100));

            const calculatedIndex = Math.min(
              steps.length - 1,
              Math.floor(horizProgress * steps.length)
            );
            setActiveStep(calculatedIndex);
          }
        }
      });

      // Linear translation phase
      tl.to(target, {
        x: -totalTranslate,
        ease: 'none',
        duration: totalTranslate
      });

      // Smooth hold phase
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

  const currentAccent = steps[activeStep]?.accent || '#06b6d4';

  return (
    <section
      ref={containerRef}
      className={`border-b transition-colors duration-500 relative overflow-hidden text-left ${
        theme === 'dark'
          ? 'bg-[#000000] text-[#ffffff] border-[#181818]'
          : 'bg-[#f4f4f5] text-[#000000] border-[#e4e4e7]'
      }`}
    >
      {/* SCOPED 3D SCROLL WORLD BACKGROUND (Scrubbed & Isolated) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Dynamic Background Atmosphere Glow */}
        <div
          className="absolute inset-0 transition-all duration-1000 opacity-25"
          style={{
            background: `radial-gradient(circle at 60% 50%, ${currentAccent} 0%, transparent 65%)`
          }}
        />

        {/* 3D Diorama Image Layer per Step */}
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          const isPast = idx < activeStep;
          return (
            <div
              key={step.number}
              className="absolute inset-0 transition-all duration-1000 ease-out flex items-center justify-center"
              style={{
                opacity: isActive ? 0.35 : 0,
                transform: isActive
                  ? 'scale(1) translateY(0px)'
                  : isPast
                  ? 'scale(1.15) translateY(-30px)'
                  : 'scale(0.85) translateY(30px)',
                filter: isActive ? 'blur(0px)' : 'blur(8px)'
              }}
            >
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover object-center filter contrast-125 saturate-110"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    theme === 'dark'
                      ? 'linear-gradient(to right, #000000 0%, transparent 40%, transparent 60%, #000000 100%), linear-gradient(to bottom, #000000 0%, transparent 30%, transparent 70%, #000000 100%)'
                      : 'linear-gradient(to right, #f4f4f5 0%, transparent 40%, transparent 60%, #f4f4f5 100%), linear-gradient(to bottom, #f4f4f5 0%, transparent 30%, transparent 70%, #f4f4f5 100%)'
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="h-[100dvh] flex flex-col justify-between py-8 sm:py-12 px-6 sm:px-12 relative z-10">
        
        {/* Top Header & Interactive Navigator */}
        <div
          className={`flex items-center justify-between border-b pb-6 max-w-7xl mx-auto w-full backdrop-blur-md ${
            theme === 'dark' ? 'border-[#181818]' : 'border-[#e4e4e7]'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Compass
                className="w-3.5 h-3.5 animate-spin-slow transition-colors duration-500"
                style={{ color: currentAccent }}
              />
              <p
                className={`text-[10px] font-mono tracking-[0.4em] uppercase ${
                  theme === 'dark' ? 'text-[#737373]' : 'text-[#71717a]'
                }`}
              >
                // 3D SCROLL WORLD ROADMAP
              </p>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase font-sans flex items-center gap-3">
              FROM IDEA TO DIGITAL
              <Sparkles className="w-6 h-6 animate-pulse hidden sm:inline-block" style={{ color: currentAccent }} />
            </h2>
          </div>

          {/* Controls & Active Counter */}
          <div className="hidden sm:flex items-center gap-6">
            <div className="text-right font-mono">
              <span
                className="text-2xl font-black tracking-widest transition-colors duration-500"
                style={{ color: currentAccent }}
              >
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
                className={`w-[300px] sm:w-[460px] h-[350px] sm:h-[410px] p-8 sm:p-10 rounded-3xl border cursor-pointer transition-all duration-500 flex flex-col justify-between group shadow-2xl flex-shrink-0 relative overflow-hidden backdrop-blur-xl ${
                  isActive
                    ? theme === 'dark'
                      ? 'bg-[#121212]/90 border-cyan-500/60 shadow-2xl'
                      : 'bg-white/90 border-cyan-600/60 shadow-xl'
                    : theme === 'dark'
                    ? 'bg-[#0d0d0d]/80 border-[#262626] hover:border-[#404040] opacity-80 hover:opacity-100'
                    : 'bg-white/80 border-[#e4e4e7] hover:border-[#a1a1aa] opacity-85 hover:opacity-100'
                }`}
                style={{
                  borderColor: isActive ? step.accent : undefined
                }}
                data-cursor="GSAP ROADMAP"
              >
                {/* Active Indicator Top Glow */}
                {isActive && (
                  <div
                    className="absolute top-0 left-0 right-0 h-1 transition-all duration-500"
                    style={{
                      background: `linear-gradient(to right, ${step.accent}, transparent)`
                    }}
                  />
                )}

                <div className="flex items-center justify-between font-mono">
                  <span
                    className="text-xs font-mono font-bold tracking-wider transition-colors duration-500"
                    style={{
                      color: isActive ? step.accent : theme === 'dark' ? '#525252' : '#a1a1aa'
                    }}
                  >
                    {step.detail}
                  </span>
                  <span
                    className="text-3xl font-mono font-black transition-transform group-hover:scale-110"
                    style={{
                      color: isActive ? step.accent : undefined
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                <div className="space-y-3">
                  <div
                    className="inline-block px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase transition-colors duration-500"
                    style={{
                      backgroundColor: `${step.accent}15`,
                      color: step.accent,
                      borderColor: `${step.accent}30`
                    }}
                  >
                    {step.tag}
                  </div>
                  <h3
                    className="text-2xl sm:text-4xl font-black tracking-tight uppercase font-sans transition-colors duration-300"
                    style={{
                      color: isActive ? step.accent : undefined
                    }}
                  >
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
                  <span
                    style={{
                      color: isActive ? step.accent : undefined,
                      fontWeight: isActive ? 'bold' : 'normal'
                    }}
                  >
                    {isActive ? 'CURRENT PHASE' : 'CLICK TO FLY TO PHASE'}
                  </span>
                  <ArrowUpRight
                    className={`w-4 h-4 transition-all ${
                      isActive
                        ? 'opacity-100 translate-x-0.5 -translate-y-0.5'
                        : 'opacity-0 group-hover:opacity-100'
                    }`}
                    style={{ color: isActive ? step.accent : undefined }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Interactive Progress Bar & Steps Indicator */}
        <div className="max-w-7xl mx-auto w-full space-y-3 backdrop-blur-md py-2">
          {/* Smooth Progress Line */}
          <div
            className={`w-full h-1 rounded-full overflow-hidden ${
              theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#e4e4e7]'
            }`}
          >
            <div
              className="h-full transition-all duration-300 ease-out"
              style={{
                width: `${progressPercent}%`,
                background: `linear-gradient(to right, ${currentAccent}, #3b82f6)`
              }}
            />
          </div>

          <div
            className={`flex items-center justify-between text-[10px] font-mono uppercase ${
              theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
            }`}
          >
            <span className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse transition-colors duration-500"
                style={{ backgroundColor: currentAccent }}
              />
              SCROLL TO FLY THROUGH WORLD ({progressPercent}%)
            </span>

            {/* Clickable Step Dots */}
            <div className="flex items-center gap-3">
              {steps.map((step, index) => (
                <button
                  key={step.number}
                  onClick={() => scrollToStep(index)}
                  className="transition-all font-mono"
                  style={{
                    color: activeStep === index ? step.accent : undefined,
                    fontWeight: activeStep === index ? 'bold' : 'normal',
                    transform: activeStep === index ? 'scale(1.25)' : 'scale(1)'
                  }}
                >
                  {step.number}
                </button>
              ))}
            </div>

            <span className="hidden md:inline">3D ROADMAP FLIGHT STAGE</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HorizontalScrollSection;
