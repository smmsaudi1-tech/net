import React, { useEffect, useRef } from 'react';
import { mountScrollWorld } from './scrubEngine';

export interface ScrollWorldSectionProps {
  id?: string;
}

export const ScrollWorldSection: React.FC<ScrollWorldSectionProps> = ({ id = 'scroll-world-hero' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const unmount = mountScrollWorld(containerRef.current, {
      brand: { name: 'NEXT GEN DEVS', href: '#top' },
      cta: { label: 'Explore Studio', href: '#work' },
      hint: 'SCROLL TO FLY THROUGH OUR WORLD',
      diveScroll: 1.5,
      connScroll: 1.0,
      nav: true,
      atmosphere: true,
      sections: [
        {
          id: 'ai-labs',
          label: 'AI Research',
          still: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop',
          clip: '', // Optional AI video clip URL
          accent: '#8b5cf6',
          scroll: 1.6,
          linger: 0.4,
          eyebrow: '01 // AI RESEARCH & LABS',
          title: 'Architecting Next-Gen Intelligence.',
          body: 'Where neural computing meets immersive creative direction to build autonomous digital experiences.',
          tags: ['Neural Models', 'Agentic Systems', 'Real-Time Inference'],
        },
        {
          id: 'spatial-webgl',
          label: '3D WebGL',
          still: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1920&auto=format&fit=crop',
          clip: '',
          accent: '#3b82f6',
          scroll: 1.5,
          linger: 0.35,
          eyebrow: '02 // SPATIAL & WEBGL',
          title: 'Boundless 3D Digital Worlds.',
          body: 'Crafting hardware-accelerated WebGL environments, custom shaders, and kinetic interactive kinetics.',
          tags: ['Three.js', 'Custom Shaders', '60FPS Kinetics'],
        },
        {
          id: 'cloud-edge',
          label: 'Cloud Edge',
          still: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1920&auto=format&fit=crop',
          clip: '',
          accent: '#10b981',
          scroll: 1.5,
          linger: 0.3,
          eyebrow: '03 // SCALABLE INFRASTRUCTURE',
          title: 'Sub-Millisecond Global Edge.',
          body: 'Ultra-resilient serverless microservices and distributed database layers built for massive scale.',
          tags: ['Firebase', 'Edge Functions', 'Global CDN'],
        },
        {
          id: 'studio-finale',
          label: 'The Citadel',
          still: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1920&auto=format&fit=crop',
          clip: '',
          accent: '#ec4899',
          scroll: 1.8,
          linger: 0.5,
          eyebrow: '04 // FUTURE CINEMATIC HERO',
          title: 'We Build What Is Next.',
          body: 'Partner with Next Gen Devs Studio to pioneer your industry’s next digital masterpiece.',
          tags: ['Awwwards Standard', 'Type-Safe Architecture', 'Fullstack Mastery'],
          cta: {
            primary: { label: 'Start A Project', href: '#contact' },
            secondary: { label: 'View Case Studies', href: '#work' },
          },
        },
      ],
      connectors: [],
    });

    return () => {
      unmount();
    };
  }, []);

  return (
    <section id={id} className="relative w-full overflow-hidden bg-black z-20">
      <div ref={containerRef} className="w-full relative min-h-screen" />
    </section>
  );
};
