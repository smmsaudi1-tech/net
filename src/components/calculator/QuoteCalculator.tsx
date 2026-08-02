import React, { useState } from 'react';
import { useAgency } from '../../store/agencyContext';
import { Sparkles, Calculator, CheckCircle2, Send, Rocket, DollarSign, Smartphone, MessageSquare } from 'lucide-react';

export const QuoteCalculator: React.FC = () => {
  const { submitQuoteInquiry, agencyInfo } = useAgency();

  const [businessType, setBusinessType] = useState<string>('fashion');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'متجر إلكتروني فخور',
    'ربط دفع إلكتروني (فيزا / ماستركارد / فوري)',
    'تصفح فائق السرعة PWA'
  ]);
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);

  const availableFeatures = [
    { id: 'f1', name: 'متجر إلكتروني فخور ومعارض صور 3D', price: 400 },
    { id: 'f2', name: 'ربط دفع إلكتروني (فيزا / ماستركارد / فوري)', price: 200 },
    { id: 'f3', name: 'منيو رقمي QR وحجز طاولات للكافيه والمطعم', price: 300 },
    { id: 'f4', name: 'دليل مقاسات تفاعلي لبراندات الملابس', price: 150 },
    { id: 'f5', name: 'لوحة تحكم أدمن مخصصة إدارة الأجهزة والطلبات', price: 350 },
    { id: 'f6', name: 'سرعة 99/100 على Google وتهيئة SEO كاملة', price: 150 },
    { id: 'f7', name: 'دعم لغات متعددة (عربي + إنجليزي)', price: 200 }
  ];

  const basePrice = businessType === 'fashion' ? 600 : businessType === 'cafe_restaurant' ? 500 : 800;
  
  const featuresTotalPrice = selectedFeatures.reduce((acc, featName) => {
    const found = availableFeatures.find((f) => f.name === featName);
    return acc + (found ? found.price : 0);
  }, 0);

  const estimatedTotalPrice = basePrice + featuresTotalPrice;

  const toggleFeature = (name: string) => {
    if (selectedFeatures.includes(name)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== name));
    } else {
      setSelectedFeatures([...selectedFeatures, name]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuoteInquiry({
      clientName: clientName || 'عميل محتمل',
      businessType: businessType === 'fashion' ? 'براند ملابس وفاشون' : businessType === 'cafe_restaurant' ? 'كافيه أو مطعم' : 'متجر إلكتروني مخصص',
      phone: clientPhone || 'غير محدد',
      budgetRange: `$${estimatedTotalPrice - 200} - $${estimatedTotalPrice + 300}`,
      featuresSelected: selectedFeatures,
      estimatedPrice: estimatedTotalPrice
    });

    setSubmittedSuccess(true);

    // Generate WhatsApp direct link
    const msg = `مرحباً فريق NextGen Devs! 👋%0Aأنا: ${clientName || 'عميل'}%0Aنوع نشاطي: ${businessType}%0Aرقمي: ${clientPhone}%0Aالتكلفة التقديرية: $${estimatedTotalPrice}%0Aالميزات المطلوبة: ${selectedFeatures.join(', ')}`;
    const waUrl = `https://wa.me/${agencyInfo.whatsapp.replace(/\+/g, '')}?text=${msg}`;
    
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 800);
  };

  return (
    <section id="calculator" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        
        {/* Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black">
            <Calculator className="w-3.5 h-3.5" />
            <span>حاسبة التكلفة والعائد التفاعلية</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
            احسب تكلفة موقعك <span className="text-amber-400">واطلب استشارتك</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            اختر نوع مشروعك والميزات المطلوبة ليصلك السعر التقديري ورابط التفعيل فوراً!
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="nexus-card p-6 sm:p-10 border border-amber-500/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (Left on desktop) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Step 1: Business Type */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold text-slate-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px]">1</span>
                ما هو مجال مشروعك ونشاطك؟
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setBusinessType('fashion')}
                  className={`p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                    businessType === 'fashion'
                      ? 'bg-amber-500/20 border-amber-500/50 text-slate-100 shadow-lg shadow-amber-950/40'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-100">👗 براند ملابس وفاشون</p>
                  <p className="text-[10px] text-slate-400 mt-1">متجر استثنائي بمواصفات عالمية</p>
                </button>

                <button
                  type="button"
                  onClick={() => setBusinessType('cafe_restaurant')}
                  className={`p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                    businessType === 'cafe_restaurant'
                      ? 'bg-amber-500/20 border-amber-500/50 text-slate-100 shadow-lg shadow-amber-950/40'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-100">☕ كافيه أو مطعم</p>
                  <p className="text-[10px] text-slate-400 mt-1">منيو QR وتأكيد حجوزات طاولات</p>
                </button>

                <button
                  type="button"
                  onClick={() => setBusinessType('ecommerce')}
                  className={`p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                    businessType === 'ecommerce'
                      ? 'bg-amber-500/20 border-amber-500/50 text-slate-100 shadow-lg shadow-amber-950/40'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-100">🛒 متجر إلكتروني مخصص</p>
                  <p className="text-[10px] text-slate-400 mt-1">تطوير كامل مخصص من الصفر</p>
                </button>
              </div>
            </div>

            {/* Step 2: Features Selection */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold text-slate-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px]">2</span>
                اختر الميزات المتطورة التي تريد إضافتها:
              </label>

              <div className="space-y-2">
                {availableFeatures.map((feat) => {
                  const selected = selectedFeatures.includes(feat.name);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.name)}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        selected
                          ? 'bg-amber-500/10 border-amber-500/40 text-slate-100'
                          : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${selected ? 'bg-amber-500 border-amber-400 text-slate-950' : 'border-slate-700'}`}>
                          {selected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-bold text-slate-200">{feat.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-400">+${feat.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Result & Submit Card (Right on desktop) */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 text-right relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <span className="text-[10px] font-black text-amber-400 font-mono tracking-widest uppercase">
                ESTIMATED INVESTMENT
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 font-mono">
                  ${estimatedTotalPrice}
                </span>
                <span className="text-xs text-slate-400 font-bold">تقريباً (شامل كل الخدمات)</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <p className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Rocket className="w-4 h-4 text-emerald-400" />
                العائد المتوقع على الاستثمار (ROI):
              </p>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                يتوقع زيادة مبيعاتك وأرباحك بمعدل <span className="text-emerald-400 font-bold">+250% إلى +350%</span> في أول 90 يوماً من إطلاق الموقع.
              </p>
            </div>

            {/* Submit Form */}
            <form onSubmit={handleFormSubmit} className="space-y-3 pt-2">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">اسمك أو اسم براندك:</label>
                <input
                  type="text"
                  placeholder="مثال: براند الفاشون / مطعم الملك"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">رقم الواتساب للتواصل:</label>
                <input
                  type="tel"
                  placeholder="مثال: +201099887766"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>إرسال العرض وحجز الموقع عبر الواتساب</span>
              </button>

              {submittedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center animate-fade-in">
                  ✅ تم تسعير طلبك وجاري فتح الواتساب للتواصل المباشر مع المهندس الفني!
                </div>
              )}
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
