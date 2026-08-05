import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useSiteContent } from '../../context/SiteContentContext';

const Counter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { theme } = useTheme();

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 1500;
    const increment = Math.ceil(end / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span
      ref={ref}
      className={`font-mono font-black text-4xl sm:text-7xl transition-colors ${
        theme === 'dark' ? 'text-[#ffffff]' : 'text-[#000000]'
      }`}
    >
      {count}
      {suffix}
    </span>
  );
};

export const AboutNextGen: React.FC = () => {
  const { theme } = useTheme();
  const { getText } = useSiteContent();

  const stats = [
    { number: 50, suffix: '+', label: getText('about.stat1_label', 'PROJECTS LAUNCHED') },
    { number: 30, suffix: '+', label: getText('about.stat2_label', 'BRANDS EMPOWERED') },
    { number: 100, suffix: '%', label: 'PASSION & PRECISION' },
    { number: 24, suffix: '/7', label: 'CREATIVE ENERGY' }
  ];

  return (
    <section
      id="about"
      className={`py-20 sm:py-36 border-b transition-colors duration-500 relative text-left ${
        theme === 'dark'
          ? 'bg-[#000000] text-[#ffffff]'
          : 'bg-[#ffffff] text-[#000000]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10 space-y-12 sm:space-y-20">
        
        {/* Editorial Text */}
        <div className="space-y-4 sm:space-y-8 max-w-5xl">
          <p
            className={`text-[10px] font-mono tracking-[0.3em] sm:tracking-[0.4em] uppercase ${
              theme === 'dark' ? 'text-[#525252]' : 'text-[#a1a1aa]'
            }`}
          >
            {getText('about.tag', '// ABOUT NEXT GEN DEVS')}
          </p>

          <h2 className="text-3xl sm:text-8xl font-black tracking-tighter uppercase font-sans leading-none">
            {getText('about.title', 'WE ARE NEXT GEN.')}
          </h2>

          <p
            className={`text-xs sm:text-2xl leading-relaxed font-sans font-medium max-w-4xl ${
              theme === 'dark' ? 'text-[#a3a3a3]' : 'text-[#525252]'
            }`}
          >
            {getText(
              'about.desc',
              'We are a young team of developers and designers focused on turning ambitious ideas into fast, modern and memorable digital experiences.'
            )}
          </p>
        </div>

        {/* Stats Grid with Animated Counter Triggers */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12 border-t ${
            theme === 'dark' ? 'border-[#181818]' : 'border-[#e4e4e7]'
          }`}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-2 group">
              <Counter value={stat.number} suffix={stat.suffix} />
              <p
                className={`text-[11px] font-mono tracking-widest uppercase transition-colors ${
                  theme === 'dark' ? 'text-[#525252] group-hover:text-[#ffffff]' : 'text-[#a1a1aa] group-hover:text-[#000000]'
                }`}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
