import React, { useState, useEffect } from 'react';
import { CinematicLoader } from './components/loader/CinematicLoader';
import { MagneticCursor } from './components/cursor/MagneticCursor';
import { Navbar } from './components/nav/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { BrandStatement } from './components/statement/BrandStatement';
import { ExperimentalServices } from './components/services/ExperimentalServices';
import { EditorialCaseStudies } from './components/work/EditorialCaseStudies';
import { HorizontalScrollSection } from './components/horizontal/HorizontalScrollSection';
import { ProcessSection } from './components/process/ProcessSection';
import { FloatingTechStack } from './components/tech/FloatingTechStack';
import { AboutNextGen } from './components/about/AboutNextGen';
import { BoldContact } from './components/contact/BoldContact';
import { MinimalFooter } from './components/footer/MinimalFooter';
import { ParticleField } from './components/effects/ParticleField';
import { MarqueeStrip } from './components/effects/MarqueeStrip';
import { AiChatbotWidget } from './components/chat/AiChatbotWidget';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { smoothScroll } from './utils/smoothScroll';

function MainAppContent() {
  const [loaded, setLoaded] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    smoothScroll.start();
    return () => smoothScroll.stop();
  }, []);

  return (
    <div
      className={`min-h-screen font-sans selection:bg-[#ffffff] selection:text-[#000000] overflow-x-hidden relative transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#000000] text-[#ffffff]' : 'bg-[#ffffff] text-[#000000]'
      }`}
    >
      {/* 01 — Cinematic Loader */}
      {!loaded && <CinematicLoader onComplete={() => setLoaded(true)} />}

      {/* Main Experience */}
      {loaded && (
        <>
          {/* WebGL Atmosphere Particle Field Canvas */}
          <ParticleField />

          {/* Custom Magnetic Cursor */}
          <MagneticCursor />

          {/* Interactive Floating AI Chatbot Assistant */}
          <AiChatbotWidget />

          {/* Minimal Translucent Navbar */}
          <Navbar />

          {/* Core Sections */}
          <main className="relative z-10">
            {/* 02 & 03 — Architectural Hero & Futuristic 3D Robot AI Agent Sculpture */}
            <HeroSection />

            {/* Kinetic Marquee Strip */}
            <MarqueeStrip text="NEXT GEN DEVS // CREATIVE TECHNOLOGY STUDIO // WE BUILD WHAT’S NEXT // 2026 PRODUCTION //" />

            {/* 04 — GSAP ScrollTrigger Kinetic Brand Statement */}
            <BrandStatement />

            {/* 05 — Experimental Vertical Services */}
            <ExperimentalServices />

            {/* 06 & 07 — Editorial Case Studies Showcase */}
            <EditorialCaseStudies />

            {/* 08 — GSAP ScrollTrigger Pinned Horizontal Section */}
            <HorizontalScrollSection />

            {/* 09 — Process Methodology */}
            <ProcessSection />

            {/* Kinetic Marquee Strip */}
            <MarqueeStrip text="HTML5 // CSS3 // REACT // NEXT.JS // THREE.JS // GSAP // TAILWIND // FIREBASE //" />

            {/* 10 — Floating Tech Stack */}
            <FloatingTechStack />

            {/* 11 — About Next Gen Devs & Stats Counter */}
            <AboutNextGen />

            {/* 15 — Bold Contact Section */}
            <BoldContact />
          </main>

          {/* 16 — Minimal Monochrome Footer */}
          <MinimalFooter />
        </>
      )}
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <MainAppContent />
    </ThemeProvider>
  );
}

export default App;
