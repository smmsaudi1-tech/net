import React from 'react';
import { useNetwork } from '../../store/networkContext';
import { Lock, PlayCircle, PauseCircle, ShieldBan, ShieldCheck } from 'lucide-react';

export const AccessControlView: React.FC = () => {
  const { devices, togglePauseDevice, toggleBlockDevice } = useNetwork();

  return (
    <div className="space-y-6">
      <div className="nexus-card p-5 space-y-2">
        <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <Lock className="w-6 h-6 text-rose-500" />
          ⏸️ Internet Access & MAC Control — إيقاف وحظر الإنترنت
        </h2>
        <p className="text-xs text-slate-400">
          تحكم فوري بحالة الاتصال (Enable / Pause / Block) لجميع الأجهزة بصلاحيات الراوتر المباشرة
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {devices.map((dev) => (
          <div key={dev.id} className="nexus-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-100 text-sm">{dev.name}</h4>
                <p className="text-xs text-slate-400 font-mono">{dev.ip} • {dev.mac}</p>
              </div>

              {dev.isBlocked ? (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40">
                  🛑 Blocked
                </span>
              ) : dev.isPaused ? (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  ⏸️ Paused
                </span>
              ) : (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  🟢 Enabled
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => togglePauseDevice(dev.id)}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border transition-all ${
                  dev.isPaused
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}
              >
                {dev.isPaused ? <PlayCircle className="w-4 h-4" /> : <PauseCircle className="w-4 h-4" />}
                <span>{dev.isPaused ? 'استئناف الاتصال' : 'Pause Internet'}</span>
              </button>

              <button
                onClick={() => toggleBlockDevice(dev.id)}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border transition-all ${
                  dev.isBlocked
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                }`}
              >
                <ShieldBan className="w-4 h-4" />
                <span>{dev.isBlocked ? 'Allow Device' : 'Block Device'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
