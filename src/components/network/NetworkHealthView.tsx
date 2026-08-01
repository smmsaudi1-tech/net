import React from 'react';
import { useNetwork } from '../../store/networkContext';
import { HeartPulse, CheckCircle2, AlertCircle, Zap, ShieldCheck, Activity } from 'lucide-react';

export const NetworkHealthView: React.FC = () => {
  const { health } = useNetwork();

  return (
    <div className="space-y-6">
      <div className="nexus-card p-5 space-y-2">
        <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <HeartPulse className="w-6 h-6 text-emerald-400" />
          🩺 Network Health — تشخيص صحة وأداء الشبكة
        </h2>
        <p className="text-xs text-slate-400">
          فحص تلقائي مستمر لاستقرار البينغ، ضياع الحزم (Packet Loss)، واستجابة سيرفرات الـ DNS
        </p>
      </div>

      {/* Score Circle Card */}
      <div className="nexus-card p-8 text-center space-y-4 border-t-4 border-t-cyan-400">
        <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">OVERALL NETWORK HEALTH SCORE</span>
        <div className="relative inline-flex items-center justify-center">
          <div className="w-36 h-36 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 flex flex-col items-center justify-center shadow-xl shadow-cyan-500/10">
            <span className="text-4xl font-extrabold font-mono text-cyan-300">{health.overallScore}</span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
        </div>
        <p className="text-xs text-emerald-400 font-bold">🟢 جودة الشبكةممتازة ومستقرة تمامًا بدون أي ضياع للحزم</p>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <div className="nexus-card p-5 space-y-2">
          <span className="text-slate-400 font-sans block text-[11px]">اتصال الإنترنت (Internet):</span>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-base font-bold text-slate-100 font-sans">{health.internetStatus}</span>
          </div>
        </div>

        <div className="nexus-card p-5 space-y-2">
          <span className="text-slate-400 font-sans block text-[11px]">حالة الراوتر (Router):</span>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-base font-bold text-slate-100 font-sans">{health.routerStatus}</span>
          </div>
        </div>

        <div className="nexus-card p-5 space-y-2">
          <span className="text-slate-400 font-sans block text-[11px]">الاستجابة (Latency):</span>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span className="text-base font-bold text-amber-300">{health.latencyMs} ms</span>
          </div>
        </div>

        <div className="nexus-card p-5 space-y-2">
          <span className="text-slate-400 font-sans block text-[11px]">ضياع الحزم (Packet Loss):</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span className="text-base font-bold text-cyan-300">{health.packetLossPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
