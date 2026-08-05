import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronLeft, ChevronRight, Terminal, Code2, Cpu, Zap, Server } from 'lucide-react';
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
  codeSnippet: string;
  icon: React.ReactNode;
}

export const HorizontalScrollSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  const steps: StepData[] = [
    {
      number: '01',
      title: 'IDEA & ALGORITHM',
      desc: 'Analyzing system requirements, data structure architecture, and neural logic workflows.',
      detail: 'PHASE 01 // SYSTEM ANALYSIS',
      tag: 'DISCOVERY',
      accent: '#8b5cf6', // Electric Purple
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920&auto=format&fit=crop',
      codeSnippet: 'const discovery = await System.analyze({ model: "GPT-4o", depth: "full" });',
      icon: <Terminal className="w-4 h-4" />
    },
    {
      number: '02',
      title: 'LUXURY UI & SHADERS',
      desc: 'Architecting WebGL Fragment Shaders, minimal typography tokens, and kinetic UI components.',
      detail: 'PHASE 02 // CREATIVE SYNTAX',
      tag: 'DESIGN SYSTEM',
      accent: '#06b6d4', // Cyan
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1920&auto=format&fit=crop',
      codeSnippet: 'uniform vec3 u_resolution; void main() { gl_FragColor = vec4(raymarching(), 1.0); }',
      icon: <Code2 className="w-4 h-4" />
    },
    {
      number: '03',
      title: 'HARDWARE COMPILER',
      desc: 'Engineering ultra-pure React 19, TypeScript strict interfaces, and low-overhead state models.',
      detail: 'PHASE 03 // FULLSTACK COMPILER',
      tag: 'ARCHITECTURE',
      accent: '#10b981', // Emerald
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1920&auto=format&fit=crop',
      codeSnippet: 'export type ReactiveState<T> = Readonly<{ [K in keyof T]: Observable<T[K]> }>;',
      icon: <Cpu className="w-4 h-4" />
    },
    {
      number: '04',
      title: 'SPEED & OPTIMIZATION',
      desc: 'Profiling 60FPS render loops, zero-layout-shift (CLS), and 99/100 Lighthouse Web Vitals.',
      detail: 'PHASE 04 // DEVTOOLS AUDIT',
      tag: 'PERFORMANCE',
      accent: '#f59e0b', // Amber
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1920&auto=format&fit=crop',
      codeSnippet: 'performance.mark("lcp-start"); window.requestIdleCallback(hydrateNextChunk);',
      icon: <Zap className="w-4 h-4" />
    },
    {
      number: '05',
      title: 'GLOBAL DEPLOYMENT',
      desc: 'Deploying edge worker nodes with multi-region CDN failover, SSL secrets, and zero downtime.',
      detail: 'PHASE 05 // EDGE CLUSTER',
      tag: 'PRODUCTION',
      accent: '#ec4899', // Pink
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1920&auto=format&fit=crop',
      codeSnippet: 'export default { async fetch(req, env) { return await edgeRouter.dispatch(req); } };',
      icon: <Server className="w-4 h-4" />
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) return;

    // Reset scroll triggers and GSAP state cleanly
    const ctx = gsap.context(() => {
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const animation = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.2, // Ultra responsive, zero lag scrub
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            setProgressPercent(Math.round(p * 100));

            const idx = Math.min(
              steps.length - 1,
              Math.floor(p * steps.length)
            );
            setActiveStep(idx);
          }
        }
      });
    }, container);

    return () => ctx.revert();
  }, [steps.length]);

  const scrollToStep = (index: number) => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const totalTranslate = track.scrollWidth - window.innerWidth;
    const stepRatio = index / (steps.length - 1);
    const targetY = container.offsetTop + stepRatio * totalTranslate;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  const currentStep = steps[activeStep] || steps[0];

  return (
    <section
      ref={containerRef}
      className={`relative overflow-hidden text-left w-full select-none ${
        theme === 'dark'
          ? 'bg-[#050505] text-[#ffffff] border-b border-[#141414]'
          : 'bg-[#f4f4f7] text-[#000000] border-b border-[#e4e4e7]'
      }`}
      style={{ willChange: 'transform' }}
    >
      {/* SCOPED PROGRAMMING CODE BACKGROUND LAYER */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      >
        {/* Code Visual Matrix Background Overlay */}
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <div
              key={step.number}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-30' : 'opacity-0'
              }`}
            >
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover filter contrast-125 saturate-150 transform scale-105"
              />
              {/* Dark Code Matrix Overlay Mask */}
              <div
                className={`absolute inset-0 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]'
                    : 'bg-gradient-to-t from-[#f4f4f7] via-[#f4f4f7]/70 to-[#f4f4f7]'
                }`}
              />
            </div>
          );
        })}

        {/* Ambient Glowing Programming Accent Aura */}
        <div
          className="absolute inset-0 transition-all duration-700 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${currentStep.accent} 0%, transparent 70%)`
          }}
        />

        {/* Code Grid Lines Overlay */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      {/* PINNED VIEWPORT CONTAINER (100vh) */}
      <div className="h-[100dvh] flex flex-col justify-between py-6 sm:py-10 px-6 sm:px-12 relative z-10 box-border overflow-hidden">
        
        {/* Top Header Controls */}
        <div
          className={`flex items-center justify-between border-b pb-4 max-w-7xl mx-auto w-full ${
            theme === 'dark' ? 'border-[#1a1a1a]' : 'border-[#e4e4e7]'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="p-1 rounded bg-black/40 border border-white/10 transition-colors duration-500"
                style={{ color: currentStep.accent }}
              >
                {currentStep.icon}
              </span>
              <p
                className={`text-[10px] font-mono tracking-[0.3em] uppercase ${
                  theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#71717a]'
                }`}
              >
                // DEV ROADMAP PIPELINE
              </p>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tighter uppercase font-mono">
              FROM IDEA TO DIGITAL
            </h2>
          </div>

          {/* Active Step Indicator & Arrow Navigation */}
          <div className="hidden sm:flex items-center gap-6">
            <div className="text-right font-mono">
              <span
                className="text-2xl font-black tracking-widest transition-colors duration-500"
                style={{ color: currentStep.accent }}
              >
                0{activeStep + 1}
              </span>
              <span className={`text-xs opacity-50 ml-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                / 0{steps.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className={`p-2 rounded-lg border transition-all ${
                  activeStep === 0
                    ? 'opacity-30 cursor-not-allowed border-transparent'
                    : theme === 'dark'
                    ? 'border-[#262626] bg-[#0f0f0f] hover:bg-[#1f1f1f] text-white'
                    : 'border-[#e4e4e7] bg-white hover:bg-gray-100 text-black shadow-sm'
                }`}
                aria-label="Previous step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToStep(Math.min(steps.length - 1, activeStep + 1))}
                disabled={activeStep === steps.length - 1}
                className={`p-2 rounded-lg border transition-all ${
                  activeStep === steps.length - 1
                    ? 'opacity-30 cursor-not-allowed border-transparent'
                    : theme === 'dark'
                    ? 'border-[#262626] bg-[#0f0f0f] hover:bg-[#1f1f1f] text-white'
                    : 'border-[#e4e4e7] bg-white hover:bg-gray-100 text-black shadow-sm'
                }`}
                aria-label="Next step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* HORIZONTAL CARDS TRACK (Smooth Translation without CSS Transitions) */}
        <div className="relative w-full my-auto overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-8 pl-2 pr-[35vw] py-4"
            style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
          >
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.number}
                  onClick={() => scrollToStep(idx)}
                  className={`w-[320px] sm:w-[480px] h-[360px] sm:h-[420px] p-6 sm:p-8 rounded-2xl border cursor-pointer transition-colors duration-300 flex flex-col justify-between flex-shrink-0 relative overflow-hidden shadow-2xl ${
                    isActive
                      ? theme === 'dark'
                        ? 'bg-[#0a0a0d] border-cyan-500/80 shadow-cyan-950/40'
                        : 'bg-white border-cyan-600/80 shadow-xl'
                      : theme === 'dark'
                      ? 'bg-[#0d0d10] border-[#222226] hover:border-[#38383e] opacity-75 hover:opacity-100'
                      : 'bg-white/90 border-[#e4e4e7] hover:border-[#a1a1aa] opacity-80 hover:opacity-100'
                  }`}
                  style={{
                    borderColor: isActive ? step.accent : undefined
                  }}
                >
                  {/* Top Glowing Edge Line */}
                  {isActive && (
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{
                        background: `linear-gradient(to right, ${step.accent}, transparent)`
                      }}
                    />
                  )}

                  {/* Header Meta */}
                  <div className="flex items-center justify-between font-mono">
                    <span
                      className="text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-1.5"
                      style={{
                        color: isActive ? step.accent : theme === 'dark' ? '#71717a' : '#9ca3af'
                      }}
                    >
                      {step.icon}
                      {step.detail}
                    </span>
                    <span
                      className="text-3xl font-mono font-black"
                      style={{
                        color: isActive ? step.accent : undefined
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="space-y-3">
                    <div
                      className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase border"
                      style={{
                        backgroundColor: `${step.accent}15`,
                        color: step.accent,
                        borderColor: `${step.accent}40`
                      }}
                    >
                      {step.tag}
                    </div>

                    <h3
                      className="text-2xl sm:text-3xl font-black tracking-tight uppercase font-mono"
                      style={{
                        color: isActive ? step.accent : undefined
                      }}
                    >
                      {step.title}
                    </h3>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed font-sans ${
                        theme === 'dark' ? 'text-[#a1a1aa]' : 'text-[#52525b]'
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>

                  {/* Code Terminal Output Block */}
                  <div
                    className={`p-3 rounded-lg border font-mono text-[11px] overflow-hidden whitespace-nowrap text-ellipsis ${
                      theme === 'dark'
                        ? 'bg-[#030305] border-[#1f1f26] text-emerald-400/90'
                        : 'bg-[#18181b] border-[#27272a] text-emerald-400'
                    }`}
                  >
                    <span className="text-pink-400 font-bold">$ </span>
                    {step.codeSnippet}
                  </div>

                  {/* Card Footer */}
                  <div
                    className={`pt-3 border-t flex items-center justify-between text-[10px] font-mono uppercase ${
                      theme === 'dark' ? 'border-[#1a1a20] text-[#71717a]' : 'border-[#f4f4f5] text-[#a1a1aa]'
                    }`}
                  >
                    <span
                      style={{
                        color: isActive ? step.accent : undefined,
                        fontWeight: isActive ? 'bold' : 'normal'
                      }}
                    >
                      {isActive ? 'CURRENT RUNTIME PHASE' : 'CLICK TO NAVIGATE'}
                    </span>
                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform ${
                        isActive ? 'translate-x-0.5 -translate-y-0.5' : ''
                      }`}
                      style={{ color: isActive ? step.accent : undefined }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Interactive Progress Bar & Steps Indicator */}
        <div className="max-w-7xl mx-auto w-full space-y-2">
          {/* Progress Line */}
          <div
            className={`w-full h-1 rounded-full overflow-hidden ${
              theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#e4e4e7]'
            }`}
          >
            <div
              className="h-full"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: currentStep.accent,
                transition: 'width 0.1s linear'
              }}
            />
          </div>

          <div
            className={`flex items-center justify-between text-[10px] font-mono uppercase ${
              theme === 'dark' ? 'text-[#71717a]' : 'text-[#a1a1aa]'
            }`}
          >
            <span className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: currentStep.accent }}
              />
              DEV PIPELINE EXECUTION ({progressPercent}%)
            </span>

            {/* Clickable Step Dots */}
            <div className="flex items-center gap-3">
              {steps.map((step, index) => (
                <button
                  key={step.number}
                  onClick={() => scrollToStep(index)}
                  className="font-mono transition-transform"
                  style={{
                    color: activeStep === index ? step.accent : undefined,
                    fontWeight: activeStep === index ? 'bold' : 'normal',
                    transform: activeStep === index ? 'scale(1.2)' : 'scale(1)'
                  }}
                >
                  {step.number}
                </button>
              ))}
            </div>

            <span className="hidden md:inline">GSAP HORIZONTAL PIPELINE</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HorizontalScrollSection;
