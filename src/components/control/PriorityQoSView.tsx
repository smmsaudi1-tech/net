import React from 'react';
import { useNetwork } from '../../store/networkContext';
import { Flame, ShieldAlert, Award, Layers } from 'lucide-react';
import { PriorityLevel } from '../../types';

export const PriorityQoSView: React.FC = () => {
  const { devices, setDevicePriority } = useNetwork();

  const highPriorityDevs = devices.filter((d) => d.priority === 'HIGH');
  const normalPriorityDevs = devices.filter((d) => d.priority === 'NORMAL');
  const lowPriorityDevs = devices.filter((d) => d.priority === 'LOW');

  return (
    <div className="space-y-6">
      <div className="nexus-card p-5 space-y-2">
        <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <Flame className="w-6 h-6 text-rose-500" />
          🎯 QoS Priority System — نظام أولوية جودة الخدمة
        </h2>
        <p className="text-xs text-slate-400">
          تخصيص أولوية مرورية فائقة للأجهزة المهمة (مثل كمبيوتر الألعاب أو لاب توب العمل) لمنع التأخير أثناء الضغط
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* High Priority Queue */}
        <div className="nexus-card p-5 border-t-4 border-t-rose-500 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-rose-400 flex items-center gap-1.5">
              <Flame className="w-4 h-4" /> 🔥 High Priority Queue
            </h3>
            <span className="text-xs font-mono bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold">
              {highPriorityDevs.length} أجهزة
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            أعلى أولوية معالجة بالحزم. لا يتأثر بتصفح بقية الأجهزة.
          </p>

          <div className="space-y-2">
            {highPriorityDevs.map((dev) => (
              <div key={dev.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-100">{dev.name}</h4>
                  <p className="text-[10px] text-slate-400 font-mono">{dev.ip}</p>
                </div>
                <button
                  onClick={() => setDevicePriority(dev.id, 'NORMAL')}
                  className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded hover:bg-slate-700"
                >
                  تخفيض لـ Normal
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Normal Priority Queue */}
        <div className="nexus-card p-5 border-t-4 border-t-amber-500 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-amber-400 flex items-center gap-1.5">
              🟡 Normal Priority Queue
            </h3>
            <span className="text-xs font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
              {normalPriorityDevs.length} أجهزة
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            أولوية قياسية متوازنة للهواتف الذكية والأجهزة الشخصية.
          </p>

          <div className="space-y-2">
            {normalPriorityDevs.map((dev) => (
              <div key={dev.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-100">{dev.name}</h4>
                  <p className="text-[10px] text-slate-400 font-mono">{dev.ip}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setDevicePriority(dev.id, 'HIGH')}
                    className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-1 rounded hover:bg-rose-500/30"
                  >
                    رفع لـ High
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Priority Queue */}
        <div className="nexus-card p-5 border-t-4 border-t-emerald-500 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-emerald-400 flex items-center gap-1.5">
              🟢 Low Priority Queue
            </h3>
            <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
              {lowPriorityDevs.length} أجهزة
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            أولوية منخفضة للشاشات الذكية والحساسات وأجهزة الضيوف.
          </p>

          <div className="space-y-2">
            {lowPriorityDevs.map((dev) => (
              <div key={dev.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-100">{dev.name}</h4>
                  <p className="text-[10px] text-slate-400 font-mono">{dev.ip}</p>
                </div>
                <button
                  onClick={() => setDevicePriority(dev.id, 'NORMAL')}
                  className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded hover:bg-slate-700"
                >
                  رفع لـ Normal
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
