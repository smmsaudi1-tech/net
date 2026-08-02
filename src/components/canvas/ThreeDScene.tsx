import React from 'react';
import { useSiteContent } from '../../context/SiteContentContext';

export const ThreeDScene: React.FC = () => {
  const { getText } = useSiteContent();

  // Get Spline 3D URL from Firebase CMS or fallback to custom scene URL
  const splineUrl = getText('hero.spline_url', 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode');

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] flex items-center justify-center overflow-hidden rounded-3xl">
      <spline-viewer
        url={splineUrl && splineUrl !== 'undefined' ? splineUrl : "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"}
        loading-anim
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
