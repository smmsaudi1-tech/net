import React, { useState } from 'react';
import { useAgency } from '../../store/agencyContext';
import { Sparkles, Shield, Menu, X, Rocket, ExternalLink, Code2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { setIsAdminOpen, isAdminAuthenticated } = useAgency();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#06080d]/80 backdrop-blur-2xl border-b border-slate-800/80 px-4 lg:px-12 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-all duration-300 border border-cyan-400/30">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-mono">
                NextGen <span className="text-cyan-400">Devs</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                STUDIO OS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-sans tracking-wide">
              تصميم وتطوير المواقع والمتاجر الاحترافية
            </p>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-extrabold text-slate-300">
          <button 
            onClick={() => scrollToSection('hero')} 
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            الرئيسية
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            تخصصاتنا
          </button>
          <button 
            onClick={() => scrollToSection('portfolio')} 
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            معرض الأعمال
          </button>
          <button 
            onClick={() => scrollToSection('calculator')} 
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            حاسبة الأسعار والعائد
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            تواصل معنا
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => setIsAdminOpen(true)}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all border shadow-lg ${
              isAdminAuthenticated 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-950/40' 
                : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:border-cyan-500/50 hover:text-cyan-300'
            }`}
          >
            <Shield className="w-4 h-4 text-cyan-400" />
            {isAdminAuthenticated ? 'لوحة الأدمن (مفعلة)' : 'لوحة الأدمن (Admin)'}
          </button>

          <button
            onClick={() => scrollToSection('calculator')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
          >
            <Rocket className="w-4 h-4" />
            ابدأ مشروعك
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-slate-900 text-slate-200 border border-slate-800"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6 text-cyan-400" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 p-4 rounded-2xl bg-slate-950/95 border border-slate-800 space-y-3 animate-fade-in text-right">
          <button 
            onClick={() => scrollToSection('hero')} 
            className="block w-full text-right py-2 text-sm font-bold text-slate-200 hover:text-cyan-400"
          >
            الرئيسية
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="block w-full text-right py-2 text-sm font-bold text-slate-200 hover:text-cyan-400"
          >
            تخصصاتنا والخدمات
          </button>
          <button 
            onClick={() => scrollToSection('portfolio')} 
            className="block w-full text-right py-2 text-sm font-bold text-slate-200 hover:text-cyan-400"
          >
            معرض الأعمال والمشاريع
          </button>
          <button 
            onClick={() => scrollToSection('calculator')} 
            className="block w-full text-right py-2 text-sm font-bold text-amber-300 hover:text-amber-400"
          >
            ✨ حاسبة الأسعار والعائد التفاعلية
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="block w-full text-right py-2 text-sm font-bold text-slate-200 hover:text-cyan-400"
          >
            تواصل معنا
          </button>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); setIsAdminOpen(true); }}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-slate-200 text-xs font-bold border border-slate-700 flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-cyan-400" />
              لوحة تحكم الأدمن (CMS)
            </button>
            <button
              onClick={() => scrollToSection('calculator')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-extrabold shadow-lg flex items-center justify-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              ابدأ مشروعك الآن
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
