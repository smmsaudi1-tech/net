import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BrandStatement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLHeadingElement[]>([]);

  const words = ['IDEAS', 'DESERVE', 'BETTER', 'DIGITAL', 'EXPERIENCES.'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      wordsRef.current.forEach((el, idx) => {
        if (!el) return;

        // GSAP ScrollTrigger Word Displacement & Perspective Tilt
        gsap.fromTo(
          el,
          {
            opacity: 0,
            x: idx % 2 === 0 ? -120 : 120,
            rotateX: 45,
            filter: 'blur(15px)'
          },
          {
            opacity: 1,
            x: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 35%',
              scrub: 1
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-36 bg-[#000000] border-y border-[#181818] overflow-hidden relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        
        <div className="space-y-8">
          <p className="text-[10px] font-mono tracking-[0.4em] text-[#525252] uppercase">
            // GSAP SCROLLTRIGGER KINETIC STATEMENT
          </p>

          <div className="flex flex-col gap-3">
            {words.map((word, idx) => (
              <h2
                key={idx}
                ref={(el) => {
                  if (el) wordsRef.current[idx] = el;
                }}
                className={`text-5xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase font-sans origin-left transition-transform ${
                  idx === 3
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#a3a3a3] to-[#525252]'
                    : 'text-[#ffffff]'
                }`}
              >
                {word}
              </h2>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
