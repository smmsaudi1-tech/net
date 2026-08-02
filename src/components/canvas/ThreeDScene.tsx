import React from 'react';
import { useSiteContent } from '../../context/SiteContentContext';

export const ThreeDScene: React.FC = () => {
  const { getText } = useSiteContent();

  const splineUrl = getText(
    'hero.spline_url',
    'https://prod.spline.design/r60kLlhxPc0YkOJC/scene.splinecode'
  );

  return (
    <div className="relative w-full h-[450px] sm:h-[550px] flex items-center justify-center overflow-hidden rounded-3xl">
      <spline-viewer
        url={splineUrl || 'https://prod.spline.design/r60kLlhxPc0YkOJC/scene.splinecode'}
        loading-anim
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
