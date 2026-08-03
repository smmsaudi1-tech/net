import React, { useState } from 'react';
import { Sparkles, Sliders, Check } from 'lucide-react';

export const HdCinematicFilter: React.FC = () => {
  const [hdEnabled, setHdEnabled] = useState(true);
  const [showBadge, setShowBadge] = useState(true);

  return (
    <>
      {/* SVG Grain Noise Definition for Ultra-HD Cinematic Texture */}
      <svg className="sr-only pointer-events-none" aria-hidden="true">
        <filter id="hd-noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.80"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.035" />
          </feComponentTransfer>
        </filter>
      </svg>

      {/* HD Filter Layer Overlays (Only active when hdEnabled is true) */}
      {hdEnabled && (
        <div className="fixed inset-0 z-[9990] pointer-events-none overflow-hidden select-none">
          {/* Film Grain Texture */}
          <div
            className="absolute inset-0 opacity-[0.45] mix-blend-overlay"
            style={{
              filter: 'url(#hd-noise-filter)',
              transform: 'translateZ(0)',
              willChange: 'transform'
            }}
          />

          {/* Ultra-HD Vignette & Sharp Contrast Atmosphere */}
          <div className="absolute inset-0 bg-radial-vignette opacity-70 mix-blend-multiply" />

          {/* Micro Ambient CRT Scanline & Depth Overlay */}
          <div className="absolute inset-0 bg-hd-grid opacity-[0.12] mix-blend-screen" />
        </div>
      )}

      {/* Floating 4K HD Mode Quick Toggle Badge */}
      {showBadge && (
        <div className="fixed bottom-5 left-5 z-[9995] font-mono text-[10px] select-none flex items-center gap-2">
          <button
            onClick={() => setHdEnabled(!hdEnabled)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-xl transition-all duration-300 shadow-xl ${
              hdEnabled
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-emerald-950/40 hover:bg-emerald-500/20'
                : 'bg-white/5 border-white/15 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            title="انقر لتفعيل/إلغاء فلتر الـ HD والسرعة الفائقة"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${hdEnabled ? 'bg-emerald-400 animate-ping' : 'bg-gray-500'}`} />
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span className="font-bold tracking-widest uppercase">
              {hdEnabled ? '4K ULTRA HD FILTER: ON' : 'HD FILTER: OFF'}
            </span>
          </button>

          <button
            onClick={() => setShowBadge(false)}
            className="text-gray-500 hover:text-gray-300 px-1 text-xs"
            title="إخفاء الشارة"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};

export default HdCinematicFilter;
