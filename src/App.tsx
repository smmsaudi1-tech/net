import React, { useState } from 'react';
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

export function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff] font-sans selection:bg-[#ffffff] selection:text-[#000000] overflow-x-hidden relative">
      
      {/* 01 — Cinematic Loader */}
      {!loaded && <CinematicLoader onComplete={() => setLoaded(true)} />}

      {/* Main Experience */}
      {loaded && (
        <>
          {/* 12 — Custom Magnetic Cursor */}
          <MagneticCursor />

          {/* 14 — Minimal Translucent Navbar */}
          <Navbar />

          {/* Core Sections */}
          <main>
            {/* 02 & 03 — Architectural Hero & 3D WebGL Signature */}
            <HeroSection />

            {/* 04 — Kinetic Brand Statement */}
            <BrandStatement />

            {/* 05 — Experimental Vertical Services */}
            <ExperimentalServices />

            {/* 06 & 07 — Editorial Case Studies Showcase */}
            <EditorialCaseStudies />

            {/* 08 — GSAP ScrollTrigger Pinned Horizontal Section */}
            <HorizontalScrollSection />

            {/* 09 — Process Methodology */}
            <ProcessSection />

            {/* 10 — Floating Tech Stack */}
            <FloatingTechStack />

            {/* 11 — About Next Gen Devs & Stats */}
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

export default App;
