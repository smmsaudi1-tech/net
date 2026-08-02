import React from 'react';
import { Shirt, Utensils, ShoppingBag, Zap, CheckCircle2, ArrowLeft, Layers, Smartphone, Sparkles } from 'lucide-react';

export const ServicesBento: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Section Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-black">
            <Layers className="w-3.5 h-3.5" />
            <span>تخصصاتنا الاستثنائية</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
            نصمم تجارب برمجية مخصصة <span className="text-cyan-400">لنمو عملك</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            سواء كنت تمتلك براند ملابس، كافيه، أو مطعم.. نقدم لك الحلول الأكثر تطوراً في السوق.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Fashion & Clothing (Span 2) */}
          <div className="md:col-span-2 nexus-card p-8 relative overflow-hidden group hover:border-cyan-500/50 transition-all">
            <div className="absolute top-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 shadow-lg shadow-pink-950/40">
                <Shirt className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-black bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  FASHION & CLOTHING BRANDS
                </span>
                <h3 className="text-2xl font-extrabold text-slate-100">
                  متاجر براندات الملابس والفاشون (Fashion E-Commerce)
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
                  تصاميم استثنائية تشبه متاجر الماركات العالمية (مثل Zara و Nike) مع أنيميشن سلس للقطع، معرض صور 3D، دليل مقاسات ذكي، وتجربة شراء من خطوة واحدة لرفع نسبة المبيعات.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-bold text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400" />
                  <span>دليل مقاسات تفاعلي لكل صنف</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400" />
                  <span>ربط فيزا وماستركارد ومحافظ إلكترونية</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400" />
                  <span>تصفح فائقة السرعة على الموبايل PWA</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400" />
                  <span>تتبع الشحنات والطلبات أوتوماتيكياً</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Cafes & Restaurants (Span 1) */}
          <div className="nexus-card p-8 relative overflow-hidden group hover:border-amber-500/50 transition-all flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-950/40">
                <Utensils className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  CAFES & RESTAURANTS
                </span>
                <h3 className="text-xl font-extrabold text-slate-100">
                  منيو كافيهات ومطاعم ذكي (QR & Delivery)
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  منيو رقمي جذاب بالصور والفيديو يعمل بالـ QR Code على الطاولة مع حجز مسبق ونظام طلبات أونلاين ربط مباشر مع الواتساب.
                </p>
              </div>

              <div className="space-y-2 text-xs font-bold text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>منيو سريع يعمل بالـ QR Code</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>حجز طاولات وتأكيد المواعيد</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>طلبات دليفري مباشرة على الواتساب</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => scrollToSection('calculator')}
              className="mt-6 w-full py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>احسب تكلفة مطعمك أو كافيهك</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Custom E-Commerce & Apps (Span 1) */}
          <div className="nexus-card p-8 relative overflow-hidden group hover:border-cyan-500/50 transition-all flex flex-col justify-between">
            <div className="space-y-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-950/40">
                <ShoppingBag className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  FULLSTACK CUSTOM WEBSITES
                </span>
                <h3 className="text-xl font-extrabold text-slate-100">
                  مواقع ومتاجر مخصصة بكل الميزات
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  تطوير كامل من الصفر بـ React و Next.js مع لوحة تحكم للتحكم بالمنتجات، الخصومات، والعملاء.
                </p>
              </div>

              <div className="space-y-2 text-xs font-bold text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>لوحة تحكم كاملة للتحكم في المتجر</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>كوبونات خصم وعروض ترويجية</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Performance & SEO (Span 2) */}
          <div className="md:col-span-2 nexus-card p-8 relative overflow-hidden group hover:border-emerald-500/50 transition-all flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950/40">
                  <Zap className="w-7 h-7" />
                </div>
                <div className="px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-black flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Lighthouse Score: 99/100</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  SPEED & SEO MASTERY
                </span>
                <h3 className="text-2xl font-extrabold text-slate-100">
                  سرعة خارقة وتصدر نتائج محركات البحث (SEO)
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
                  تفتح جميع مواقعنا في أقل من ثانية واحدة على هواتف عملائك، مع تحسين محركات البحث لتظهر في النتائج الأولى على Google ويزداد الإقبال على متجرك أو مطعمك أورجانيك!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <p className="text-emerald-400 text-lg font-black font-mono">0.6 sec</p>
                  <p className="text-[10px] text-slate-400">زمن فتح الموقع</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <p className="text-emerald-400 text-lg font-black font-mono">100%</p>
                  <p className="text-[10px] text-slate-400">متوافق مع الهواتف</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <p className="text-emerald-400 text-lg font-black font-mono">Google #1</p>
                  <p className="text-[10px] text-slate-400">تهيئة SEO كاملة</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
