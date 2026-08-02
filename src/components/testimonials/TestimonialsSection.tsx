import React from 'react';
import { Star, Quote, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      id: 'rev-1',
      name: 'أحمد الفاروق',
      role: 'مؤسس براند Vogue Luxe الفاشون',
      quote: 'فريق NextGen Devs نقل براند الملابس بتاعنا لمستوى عالمي! مبيعاتنا تضاعفت 3 مرات في أول شهرين بعد إطلاق الموقع والتصميم السلس.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      metric: '+340% مبيعات أونلاين'
    },
    {
      id: 'rev-2',
      name: 'م. خالد السلمي',
      role: 'مالك El Gato Coffee House & Lounge',
      quote: 'المنيو الذكي وحجز الطاولات بالـ QR Code غير تجربة الكافيه تماماً وسرّع من استلام الطلبات. أفضل استثمار عملناه!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      metric: '15,000+ طلب من المنيو'
    },
    {
      id: 'rev-3',
      name: 'سارة عبدالمجيد',
      role: 'مديرة التسويق لـ Urban Wear',
      quote: 'الموقع سريع جداً على الموبايل والتصميم يجذب الشباب من أول ثانية. الدعم الفني مستمر معنا ولم يحدث أي عطل.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      metric: '99/100 سرعة Google'
    }
  ];

  return (
    <section className="py-20 relative border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-black">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>آراء أصحاب البراندات والمطاعم</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
            ماذا يقول عملاؤنا عن <span className="text-emerald-400">NextGen Devs</span>؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            نفخر بشراكتنا مع أفضل البراندات والمطاعم وصناع النجاح في المنطقة.
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="nexus-card p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-all flex flex-col justify-between"
            >
              <Quote className="absolute top-4 left-4 w-12 h-12 text-slate-800/40 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans italic text-right">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between gap-3 text-right">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-100">{rev.name}</h4>
                    <p className="text-[10px] text-slate-400">{rev.role}</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  {rev.metric}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
