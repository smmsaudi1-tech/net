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
    const purgeSplineBadge = () => {
      const viewer = containerRef.current?.querySelector('spline-viewer');
      if (viewer && viewer.shadowRoot) {
        // Inject shadow DOM style tag
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
              transform: scale(0) !important;
            }
          `;
          viewer.shadowRoot.appendChild(style);
        }

        const logoElements = viewer.shadowRoot.querySelectorAll('#logo, a[href*="spline"], .logo, a');
        logoElements.forEach((el) => {
          (el as HTMLElement).style.setProperty('display', 'none', 'important');
          (el as HTMLElement).style.setProperty('opacity', '0', 'important');
          (el as HTMLElement).style.setProperty('visibility', 'hidden', 'important');
          el.remove();
        });
      }
    };

    const interval = setInterval(purgeSplineBadge, 30);
    const timeout = setTimeout(() => clearInterval(interval), 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [splineUrl]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450px] sm:h-[550px] flex items-center justify-center overflow-hidden rounded-3xl"
    >
      {/* Scaled & Clipped Viewer wrapper so bottom-right badge is physically cut off */}
      <div className="w-[110%] h-[110%] -translate-x-[2%] -translate-y-[2%] relative overflow-hidden pointer-events-auto">
        <spline-viewer
          url={splineUrl || 'https://prod.spline.design/r60kLlhxPc0YkOJC/scene.splinecode'}
          loading-anim
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Bottom right overlay patch matching active Theme background (Dark / Light mode) */}
      <div
        className={`absolute bottom-0 right-0 w-48 h-20 pointer-events-none z-30 transition-colors duration-500 ${
          theme === 'dark' ? 'bg-[#000000]' : 'bg-[#ffffff]'
        }`}
      />
    </div>
  );
};
