import React from 'react';
import { AgencyProvider } from './store/agencyContext';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { ServicesBento } from './components/services/ServicesBento';
import { ProjectsShowcase } from './components/portfolio/ProjectsShowcase';
import { ProjectDetailsModal } from './components/portfolio/ProjectDetailsModal';
import { QuoteCalculator } from './components/calculator/QuoteCalculator';
import { TestimonialsSection } from './components/testimonials/TestimonialsSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';

export function App() {
  return (
    <AgencyProvider>
      <div dir="rtl" className="min-h-screen bg-[#06080d] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">
        
        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main>
          <HeroSection />
          <ServicesBento />
          <ProjectsShowcase />
          <QuoteCalculator />
          <TestimonialsSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Modals */}
        <ProjectDetailsModal />
        <AdminDashboardModal />

      </div>
    </AgencyProvider>
  );
}

export default App;
