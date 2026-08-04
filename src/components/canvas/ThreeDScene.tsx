import React, { useEffect, useRef } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { useTheme } from '../../context/ThemeContext';

export const ThreeDScene: React.FC = () => {
  const { getText } = useSiteContent();
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const splineUrl = getText(
    'hero.spline_url',
    'https://prod.spline.design/r60kLlhxPc0YkOJC/scene.splinecode'
  );

  useEffect(() => {
    const applyBadgeHideStyle = () => {
      const viewer = containerRef.current?.querySelector('spline-viewer');
      if (viewer && viewer.shadowRoot) {
        if (!viewer.shadowRoot.querySelector('#hide-spline-badge-style')) {
          const style = document.createElement('style');
          style.id = 'hide-spline-badge-style';
          style.textContent = `
            #logo, a[href*="spline"], .logo, [class*="logo"], a#logo, #spline-logo, iframe, a {
              display: none !important;
              opacity: 0 !important;
              visibility: hidden !important;
              pointer-events: none !important;
              width: 0 !important;
              height: 0 !important;
              position: absolute !important;
              clip: rect(0,0,0,0) !important;
            }
          `;
          viewer.shadowRoot.appendChild(style);
        }
      }
    };

    // Run styling safely without removing DOM nodes to preserve Spline timeline integrity
    const timer1 = setTimeout(applyBadgeHideStyle, 100);
    const timer2 = setTimeout(applyBadgeHideStyle, 1000);
    const timer3 = setTimeout(applyBadgeHideStyle, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [splineUrl]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] sm:h-[450px] md:h-[550px] flex items-center justify-center overflow-hidden rounded-3xl touch-pan-y"
    >
      {/* Scaled & Clipped Viewer wrapper (pointer-events disabled on touch/mobile to guarantee smooth page scroll) */}
      <div className="w-[110%] h-[110%] -translate-x-[2%] -translate-y-[2%] relative overflow-hidden pointer-events-none md:pointer-events-auto">
        <spline-viewer
          url={splineUrl || 'https://prod.spline.design/r60kLlhxPc0YkOJC/scene.splinecode'}
          loading-anim
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Transparent overlay on mobile to guarantee smooth touch scrolling */}
      <div className="absolute inset-0 z-20 md:hidden pointer-events-none" />

      {/* Bottom right overlay patch matching active Theme background */}
      <div
        className={`absolute bottom-0 right-0 w-48 h-20 pointer-events-none z-30 transition-colors duration-500 ${
          theme === 'dark' ? 'bg-[#000000]' : 'bg-[#ffffff]'
        }`}
      />
    </div>
  );
};

export default ThreeDScene;
