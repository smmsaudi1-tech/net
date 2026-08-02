import React, { useEffect, useRef } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';

export const ThreeDScene: React.FC = () => {
  const { getText } = useSiteContent();
  const containerRef = useRef<HTMLDivElement>(null);

  const splineUrl = getText(
    'hero.spline_url',
    'https://prod.spline.design/r60kLlhxPc0YkOJC/scene.splinecode'
  );

  useEffect(() => {
    const purgeSplineBadge = () => {
      const viewer = containerRef.current?.querySelector('spline-viewer');
      if (viewer && viewer.shadowRoot) {
        // 1. Inject internal shadow DOM style tag
        if (!viewer.shadowRoot.querySelector('#hide-spline-badge-style')) {
          const style = document.createElement('style');
          style.id = 'hide-spline-badge-style';
          style.textContent = `
            #logo, a[href*="spline"], .logo, [class*="logo"], a#logo {
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

        // 2. Direct DOM removal inside Shadow Root
        const logoElements = viewer.shadowRoot.querySelectorAll('#logo, a[href*="spline"], .logo, a');
        logoElements.forEach((el) => {
          (el as HTMLElement).style.setProperty('display', 'none', 'important');
          (el as HTMLElement).style.setProperty('opacity', '0', 'important');
          (el as HTMLElement).style.setProperty('visibility', 'hidden', 'important');
          el.remove();
        });
      }
    };

    const interval = setInterval(purgeSplineBadge, 50);
    const timeout = setTimeout(() => clearInterval(interval), 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [splineUrl]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450px] sm:h-[550px] flex items-center justify-center overflow-hidden rounded-3xl group"
    >
      <div className="w-full h-full scale-[1.04] origin-center relative overflow-hidden">
        <spline-viewer
          url={splineUrl || 'https://prod.spline.design/r60kLlhxPc0YkOJC/scene.splinecode'}
          loading-anim
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Masking overlay at bottom right corner to guarantee badge is 100% hidden */}
      <div className="absolute bottom-0 right-0 w-44 h-16 bg-black/90 backdrop-blur-md pointer-events-none z-20 opacity-0 group-hover:opacity-0 hidden sm:block" />
    </div>
  );
};
