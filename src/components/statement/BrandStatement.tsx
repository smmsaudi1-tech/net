import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export const BrandStatement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLHeadingElement[]>([]);
  const { theme } = useTheme();
  const { t, lang } = useLanguage();

  const words = [
    t('statement.w1', 'IDEAS', 'الأفكار'),
    t('statement.w2', 'DESERVE', 'تستحق'),
    t('statement.w3', 'BETTER', 'أفضل'),
    t('statement.w4', 'DIGITAL', 'تجارب'),
    t('statement.w5', 'EXPERIENCES.', 'رقمية.')
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      wordsRef.current.forEach((el, idx) => {
        if (!el) return;

        gsap.fromTo(
          el,
          {
            opacity: 0,
            x: idx % 2 === 0 ? -100 : 100,
            filter: 'blur(10px)'
          },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
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
  }, [lang]);

  return (
    <section
      ref={containerRef}
      className={`py-32 border-y transition-colors duration-500 overflow-hidden relative text-left ${
        theme === 'dark'
          ? 'bg-[#000000] text-[#ffffff] border-[#181818]'
          : 'bg-[#f4f4f5] text-[#000000] border-[#e4e4e7]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        
        <div className="space-y-8">
          <p
            className={`text-[10px] font-mono tracking-[0.4em] uppercase ${
              theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
            }`}
          >
            {t('statement.tag', '// OUR PHILOSOPHY', '// فلسفتنا وتوجهنا الإبداعي')}
          </p>

          <div className="flex flex-col gap-3">
            {words.map((word, idx) => (
              <h2
                key={idx}
                ref={(el) => {
                  if (el) wordsRef.current[idx] = el;
                }}
                className={`text-5xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase origin-left transition-colors ${
                  lang === 'AR' ? 'font-arabic' : 'font-sans'
                } ${
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
