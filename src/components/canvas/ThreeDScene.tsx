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
    // Poll and remove "Built with Spline" logo element from shadow DOM
    const removeSplineLogo = () => {
      const viewer = containerRef.current?.querySelector('spline-viewer');
      if (viewer && viewer.shadowRoot) {
        const logo =
          viewer.shadowRoot.querySelector('#logo') ||
          viewer.shadowRoot.querySelector('a[href*="spline"]') ||
          viewer.shadowRoot.querySelector('.logo');
        if (logo) {
          (logo as HTMLElement).style.display = 'none';
          (logo as HTMLElement).style.opacity = '0';
          (logo as HTMLElement).style.pointerEvents = 'none';
          (logo as HTMLElement).style.visibility = 'hidden';
          (logo as HTMLElement).remove();
        }
      }
    };

    const interval = setInterval(removeSplineLogo, 100);
    const timeout = setTimeout(() => clearInterval(interval), 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [splineUrl]);

  return (
    <div ref={containerRef} className="relative w-full h-[450px] sm:h-[550px] flex items-center justify-center overflow-hidden rounded-3xl">
      <spline-viewer
        url={splineUrl || 'https://prod.spline.design/r60kLlhxPc0YkOJC/scene.splinecode'}
        loading-anim
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
