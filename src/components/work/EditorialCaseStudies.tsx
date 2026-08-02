import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { REAL_PROJECTS } from '../../data/projectsData';

gsap.registerPlugin(ScrollTrigger);

export const EditorialCaseStudies: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const caseElements = gsap.utils.toArray<HTMLElement>('.case-study-item');

      caseElements.forEach((el) => {
        const image = el.querySelector('.case-image');
        const text = el.querySelector('.case-text');

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.15, filter: 'grayscale(100%) blur(5px)' },
            {
              scale: 1,
              filter: 'grayscale(0%) blur(0px)',
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1
              }
            }
          );
        }

        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 75%'
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={containerRef} className="py-32 bg-[#000000] relative border-b border-[#181818] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 space-y-28">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#181818] pb-8">
          <div>
            <p className="text-[10px] font-mono tracking-[0.4em] text-[#525252] uppercase mb-2">
              // EDITORIAL CASE STUDIES
            </p>
            <h2 className="text-4xl sm:text-7xl font-black text-[#ffffff] tracking-tighter uppercase font-sans">
              SELECTED WORK
            </h2>
          </div>
          <p className="text-xs font-mono text-[#a3a3a3] tracking-widest uppercase">
            [ {REAL_PROJECTS.length} EDITORIAL CASE STUDIES ]
          </p>
        </div>

        {/* Editorial Case Studies Stack */}
        <div className="space-y-36">
          {REAL_PROJECTS.map((proj, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={proj.id}
                className="case-study-item grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-[#181818] pb-24 group"
                data-cursor="CASE STUDY"
              >
                {/* Visual Image Side (Alternating Order) */}
                <div className={`lg:col-span-7 relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative h-[360px] sm:h-[540px] rounded-3xl overflow-hidden bg-[#0d0d0d] border border-[#262626] group-hover:border-[#ffffff] transition-all duration-700 shadow-2xl"
                  >
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="case-image w-full h-full object-cover transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-75" />

                    {/* Category Tag */}
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 rounded-full bg-[#000000]/80 border border-[#333333] text-[#ffffff] text-[10px] font-mono tracking-widest uppercase backdrop-blur-md">
                        {proj.category}
                      </span>
                    </div>

                    {/* Corner Expand Button */}
                    <div className="absolute bottom-6 right-6 p-4 rounded-full bg-[#ffffff] text-[#000000] opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                      <ArrowUpRight className="w-6 h-6 stroke-[3]" />
                    </div>
                  </a>
                </div>

                {/* Case Study Details Side */}
                <div className={`case-text lg:col-span-5 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#525252] uppercase">
                    <span>CASE STUDY // 0{idx + 1}</span>
                    <span>{proj.year}</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-3xl sm:text-5xl font-black text-[#ffffff] tracking-tight uppercase group-hover:text-[#a3a3a3] transition-colors font-sans">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-mono text-[#525252] uppercase tracking-widest">
                      {proj.subtitle}
                    </p>
                  </div>

                  {/* Editorial Overview & Challenge */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] font-mono tracking-widest text-[#ffffff] uppercase border-l-2 border-[#ffffff] pl-3">
                      OVERVIEW & ARCHITECTURE
                    </h4>
                    <p className="text-xs sm:text-sm text-[#a3a3a3] leading-relaxed font-sans font-medium">
                      {proj.description}
                    </p>
                  </div>

                  {/* Impact Metrics */}
                  <div className="p-4 rounded-2xl bg-[#0d0d0d] border border-[#262626] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#525252] uppercase">IMPACT & METRIC</span>
                    <span className="text-xs font-mono font-bold text-[#ffffff] flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#ffffff]" />
                      <span>PRODUCTION READY</span>
                    </span>
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.techStack.map((tech, i) => (
                      <span key={i} className="px-3 py-1 rounded-md bg-[#121212] border border-[#262626] text-[10px] font-mono text-[#d4d4d4]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Production CTA */}
                  <div className="pt-4">
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 rounded-full bg-[#ffffff] text-[#000000] font-mono text-xs font-black tracking-[0.2em] uppercase inline-flex items-center gap-2 hover:bg-[#e5e5e5] transition-all hover:scale-105"
                    >
                      <span>VISIT LIVE CASE STUDY</span>
                      <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                    </a>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
