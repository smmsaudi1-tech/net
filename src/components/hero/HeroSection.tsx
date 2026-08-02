import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Rocket, Sparkles, TrendingUp, ShieldCheck, Shirt, UtensilsCrossed, ArrowLeft, Star, Code2 } from 'lucide-react';
import { ParticleCanvas } from '../effects/ParticleCanvas';

export const HeroSection: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    scrollToSection('calculator');
  };

  return (
    <section id="hero" className="relative min-h-[95dvh] pt-16 pb-24 overflow-hidden flex items-center justify-center">
      {/* Interactive Particle Canvas */}
      <ParticleCanvas />

      {/* Dynamic Glowing Radial Lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 text-center space-y-8 relative z-10">
        
        {/* Top Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-black shadow-xl shadow-cyan-950/50 backdrop-blur-xl"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>NextGen Devs Studio — استوديو تطوير مواقع براندات الملابس والمطاعم</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </motion.div>

        {/* Main Kinetic Animated Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-100 tracking-tight leading-[1.15] max-w-4xl mx-auto"
        >
          نبني مواقع رقمية تحول زوار <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 underline decoration-cyan-500/30">
            براندك أو مطعمك
          </span>{' '}
          إلى عملاء دائمين 🚀
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed"
        >
          تصاميم سينمائية مبتكرة تشبه ماركات الفاشون العالمية، والمنيو الذكي بالـ QR Code للكافيهات والمطاعم مع ربط الدفع وسرعة فائقة تجذب انتباه كل عميل.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerConfetti}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-sm shadow-2xl shadow-cyan-500/30 flex items-center justify-center gap-3 border border-cyan-400/40 cursor-pointer"
          >
            <Rocket className="w-5 h-5 text-white" />
            <span>🚀 ابدأ مشروعك واطلب سعر تقديري</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('portfolio')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-extrabold text-sm border border-slate-700 hover:border-cyan-500/50 flex items-center justify-center gap-2 cursor-pointer shadow-lg backdrop-blur-xl"
          >
            <span>💼 استعرض معرض أعمالنا</span>
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
          </motion.button>
        </motion.div>

        {/* Animated Floating Feature Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ y: -5 }}
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex flex-col items-center gap-2 hover:border-pink-500/50 transition-all shadow-lg"
          >
            <Shirt className="w-6 h-6 text-pink-400" />
            <span className="text-xs font-bold text-slate-200">براندات الفاشون والملابس</span>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex flex-col items-center gap-2 hover:border-amber-500/50 transition-all shadow-lg"
          >
            <UtensilsCrossed className="w-6 h-6 text-amber-400" />
            <span className="text-xs font-bold text-slate-200">الكافيهات والمنيو الذكي</span>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex flex-col items-center gap-2 hover:border-emerald-500/50 transition-all shadow-lg"
          >
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            <span className="text-xs font-bold text-slate-200">+350% زيادة مبيعات متوسطة</span>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex flex-col items-center gap-2 hover:border-cyan-500/50 transition-all shadow-lg"
          >
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            <span className="text-xs font-bold text-slate-200">سرعة 99/100 على Google</span>
          </motion.div>
        </motion.div>

        {/* Animated Stats Counter Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-10 border-t border-slate-800/80 grid grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono">
              50+
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-bold">براند ومطعم تم إطلاقهم</p>
          </div>

          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 font-mono flex items-center justify-center gap-1">
              <span>99.8%</span>
              <Star className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-bold">نسبة رضا العملاء</p>
          </div>

          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 font-mono">
              $2.5M+
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-bold">مبيعات أونلاين محققة</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
