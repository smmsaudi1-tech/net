import React from 'react';
import { Rocket, Sparkles, TrendingUp, ShieldCheck, Shirt, UtensilsCrossed, ArrowLeft, Star } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[90dvh] pt-12 pb-20 overflow-hidden flex items-center justify-center">
      {/* Dynamic Glowing Gradients & Mesh Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
      
      <div className="max-w-6xl mx-auto px-4 text-center space-y-8 relative z-10">
        
        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-black shadow-lg shadow-cyan-950/40 backdrop-blur-xl animate-fade-in">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>NextGen Devs Studio — الاستوديو الأقوى لتطوير مواقع البراندات والمطاعم</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Main Kinetic Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-100 tracking-tight leading-[1.1] max-w-4xl mx-auto">
          نبني مواقع رقمية تحول زوار <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">براندك أو مطعمك</span> إلى عملاء دائمين 🚀
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
          نحن متفوقون في تصاميم براندات الملابس والفاشون الكبيرة، والمنيو الذكي للكافيهات والمطاعم مع ربط الدفع والدليفري وأنيميشن احترافي يجذب الأنظار.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => scrollToSection('calculator')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 border border-cyan-400/40 cursor-pointer"
          >
            <Rocket className="w-5 h-5 text-white" />
            <span>🚀 ابدأ مشروعك واطلب سعر تقديري</span>
          </button>

          <button
            onClick={() => scrollToSection('portfolio')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-extrabold text-sm border border-slate-700 hover:border-cyan-500/50 flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer shadow-lg"
          >
            <span>💼 استعرض معرض أعمالنا</span>
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

        {/* Floating Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex flex-col items-center gap-2 hover:border-cyan-500/40 transition-all">
            <Shirt className="w-6 h-6 text-pink-400" />
            <span className="text-xs font-bold text-slate-200">براندات الفاشون والملابس</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex flex-col items-center gap-2 hover:border-cyan-500/40 transition-all">
            <UtensilsCrossed className="w-6 h-6 text-amber-400" />
            <span className="text-xs font-bold text-slate-200">الكافيهات والمنيو الذكي</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex flex-col items-center gap-2 hover:border-cyan-500/40 transition-all">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            <span className="text-xs font-bold text-slate-200">+350% زيادة مبيعات متوسطة</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex flex-col items-center gap-2 hover:border-cyan-500/40 transition-all">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            <span className="text-xs font-bold text-slate-200">سرعة 99/100 على Google</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="pt-10 border-t border-slate-800/80 grid grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono">
              50+
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-bold">براند ومطعم تم إطلاقهم</p>
          </div>

          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 font-mono flex items-center justify-center gap-1">
              <span>99.8%</span>
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-bold">نسبة رضا العملاء</p>
          </div>

          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 font-mono">
              $2.5M+
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-bold">مبيعات أونلاين محققة</p>
          </div>
        </div>

      </div>
    </section>
  );
};
