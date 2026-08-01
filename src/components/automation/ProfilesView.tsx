import React from 'react';
import { useNetwork } from '../../store/networkContext';
import { Zap, Gamepad2, Briefcase, Moon, CheckCircle2 } from 'lucide-react';

export const ProfilesView: React.FC = () => {
  const { profiles, activateProfile } = useNetwork();

  return (
    <div className="space-y-6">
      <div className="nexus-card p-5 space-y-2">
        <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <Zap className="w-6 h-6 text-cyan-400" />
          🧩 Profiles جاهزة — أنماط الشبكة بنقرة واحدة
        </h2>
        <p className="text-xs text-slate-400">
          تبديل البروفايل الجاهز لتطبيق قواعد السرعة والأولويات فورًا على كافة الأجهزة
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profiles.map((prof) => {
          return (
            <div
              key={prof.id}
              className={`nexus-card p-6 space-y-4 border transition-all ${
                prof.active
                  ? 'border-cyan-500/60 shadow-xl shadow-cyan-500/10 bg-gradient-to-br from-slate-900 to-cyan-950/40'
                  : 'border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-100 text-lg flex items-center gap-2">
                  <span>{prof.nameAr}</span>
                </h3>
                {prof.active ? (
                  <span className="text-xs font-bold bg-cyan-500 text-slate-950 px-3 py-1 rounded-full flex items-center gap-1 shadow-md shadow-cyan-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" /> البروفايل النشط
                  </span>
                ) : (
                  <button
                    onClick={() => activateProfile(prof.id)}
                    className="text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl transition-all border border-slate-700"
                  >
                    تفعيل البروفايل
                  </button>
                )}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">{prof.description}</p>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-3 border-t border-slate-800/80">
                <div className="bg-slate-950 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">Gaming QoS</span>
                  <span className="text-rose-400 font-bold">{prof.rules.gamingPriority}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">Work QoS</span>
                  <span className="text-cyan-400 font-bold">{prof.rules.workPriority}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">Smart TV QoS</span>
                  <span className="text-amber-400 font-bold">{prof.rules.tvPriority}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">Guest Devices</span>
                  <span className="text-purple-400 font-bold">{prof.rules.guestAccess}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
