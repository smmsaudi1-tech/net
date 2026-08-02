import React, { useState } from 'react';
import { useAgency } from '../../store/agencyContext';
import { MessageSquare, Phone, Mail, Send, CheckCircle2, Rocket, MapPin } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { agencyInfo } = useAgency();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);

    const text = `مرحباً فريق NextGen Devs! 👋%0Aأنا: ${name}%0Aرقمي: ${phone}%0Aالرسالة: ${message}`;
    const waUrl = `https://wa.me/${agencyInfo.whatsapp.replace(/\+/g, '')}?text=${text}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 600);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-black">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>تواصل معنا فوراً</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
            دعنا نحول فكرة براندك إلى <span className="text-cyan-400">واقع رقمي مذهل</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            تواصل مع المهندس المسؤول وسنرد عليك في أقل من 15 دقيقة لبدء بناء موقعك.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="nexus-card p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-cyan-500/30">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6 text-right">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-100">استوديو NextGen Devs</h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                نحن فريق متخصص في تصميم وتطوير المتاجر والمواقع التفاعلية عالية السرعة للمطاعم والكافيهات وبراندات الفاشون.
              </p>
            </div>

            <div className="space-y-4 pt-2 text-xs font-bold">
              <a
                href={`https://wa.me/${agencyInfo.whatsapp.replace(/\+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-slate-200 hover:border-emerald-500/40 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">الواتساب المباشر:</p>
                  <p className="font-mono text-emerald-400">{agencyInfo.whatsapp}</p>
                </div>
              </a>

              <a
                href={`mailto:${agencyInfo.email}`}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-slate-200 hover:border-cyan-500/40 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">البريد الإلكتروني الرسمي:</p>
                  <p className="font-mono text-cyan-400">{agencyInfo.email}</p>
                </div>
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-950 border border-slate-800 text-right space-y-4">
            <h4 className="text-sm font-extrabold text-slate-200">أرسل استفسارك وسنتواصل معك فوراً:</h4>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">الاسم الكريم:</label>
                <input
                  type="text"
                  placeholder="مثال: أستاذ أسامة"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">رقم الهاتف / الواتساب:</label>
                <input
                  type="tel"
                  placeholder="مثال: +201099887766"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">تفاصيل مشروعك والطلب:</label>
                <textarea
                  placeholder="اكتب نوع براندك أو مطعمك والميزات التي تحتاجها..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:border-cyan-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>إرسال الطلب وفتح الواتساب</span>
              </button>

              {sent && (
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold text-center border border-emerald-500/30 animate-fade-in">
                  ✅ تم إرسال طلبك وجاري فتح محادثة الواتساب المباشرة!
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
