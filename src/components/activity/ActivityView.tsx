import React from 'react';
import { PROTOCOL_ACTIVITIES } from '../../mock/mockData';
import { Activity, ShieldCheck, Lock, Globe, Tv, Gamepad2, Share2, Server } from 'lucide-react';

export const ActivityView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="nexus-card p-5 space-y-2">
        <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <Globe className="w-6 h-6 text-cyan-400" />
          🌐 Network Activity — تصنيف نشاطات الخدمات
        </h2>
        <p className="text-xs text-slate-400">
          تحليل حركة البيانات بحسب أنواع الخدمات المستهلكة (فيديو، ألعاب، وسائل تواصل، نطاقات مشفرة)
        </p>
      </div>

      {/* Privacy Notice Alert Box */}
      <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-3">
        <ShieldCheck className="w-6 h-6 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <h4 className="font-bold text-cyan-200">ملاحظة الخصوصية والتشفير (Privacy & SSL/TLS Encryption):</h4>
          <p className="text-slate-300 leading-relaxed">
            الاتصالات الحديثة في شبكتك مشفرة بالكامل (HTTPS/TLS). لا يتجسس نظام NEXUS على محتوى الرسائل أو الصفحات الخاصة بك إطلاقًا.
            يتم تحديد الفئات بناءً على عناوين Server Name Indication (SNI) وإحصائيات بروتوكولات الشبكة المفتوحة لضمان الأمان والسرعة.
          </p>
        </div>
      </div>

      {/* Protocol Progress Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROTOCOL_ACTIVITIES.map((act) => (
          <div key={act.id} className="nexus-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: act.color }}
                ></div>
                <h4 className="font-bold text-sm text-slate-100">{act.name}</h4>
              </div>
              <span className="font-mono text-xs font-bold text-slate-300">
                {act.bytesGB} GB ({act.percentage}%)
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${act.percentage}%`,
                  backgroundColor: act.color
                }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>الفئة: {act.category}</span>
              <span className="font-mono">{parseFloat((act.bytesGB * 1024).toFixed(0))} MB</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
