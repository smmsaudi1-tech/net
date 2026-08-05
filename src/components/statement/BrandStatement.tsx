import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../context/ThemeContext';
import { useSiteContent } from '../../context/SiteContentContext';

gsap.registerPlugin(ScrollTrigger);

export const BrandStatement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLHeadingElement[]>([]);
  const { theme } = useTheme();
  const { getText } = useSiteContent();

  const words = [
    getText('statement.w1', 'IDEAS'),
    getText('statement.w2', 'DESERVE'),
    getText('statement.w3', 'BETTER'),
    getText('statement.w4', 'DIGITAL'),
    getText('statement.w5', 'EXPERIENCES.')
  ];

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      wordsRef.current.forEach((el, idx) => {
        if (!el) return;

        const shiftX = isMobile ? (idx % 2 === 0 ? -15 : 15) : (idx % 2 === 0 ? -80 : 80);

        gsap.fromTo(
          el,
          {
            opacity: 0,
            x: shiftX,
            filter: 'blur(8px)'
          },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'top 35%',
              scrub: 1
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [words]);

  return (
    <section
      ref={containerRef}
      className={`py-20 sm:py-32 border-y transition-colors duration-500 overflow-hidden relative text-left select-none ${
        theme === 'dark'
          ? 'bg-[#000000] text-[#ffffff] border-[#181818]'
          : 'bg-[#f4f4f5] text-[#000000] border-[#e4e4e7]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        
        <div className="space-y-6 sm:space-y-8">
          <p
            className={`text-[10px] font-mono tracking-[0.3em] sm:tracking-[0.4em] uppercase ${
              theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
            }`}
          >
            {getText('statement.tag', '// OUR PHILOSOPHY')}
          </p>

          <div className="flex flex-col gap-2 sm:gap-3">
            {words.map((word, idx) => (
              <h2
                key={idx}
                ref={(el) => {
                  if (el) wordsRef.current[idx] = el;
                }}
                className={`text-3xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase origin-left font-sans transition-colors break-words ${
                  idx === 3
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500'
                    : theme === 'dark'
                    ? 'text-[#ffffff]'
                    : 'text-[#000000]'
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
