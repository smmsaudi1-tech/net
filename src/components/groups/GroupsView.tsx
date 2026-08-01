import React from 'react';
import { useNetwork } from '../../store/networkContext';
import { Layers, Gamepad2, Briefcase, Smartphone, Home, PauseCircle, PlayCircle, Flame } from 'lucide-react';
import { PriorityLevel } from '../../types';

export const GroupsView: React.FC = () => {
  const { groups, devices, toggleGroupPause, setGroupPriority } = useNetwork();

  return (
    <div className="space-y-6">
      <div className="nexus-card p-5 space-y-2">
        <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <Layers className="w-6 h-6 text-cyan-400" />
          👥 Groups — مجموعات الأجهزة الجماعية
        </h2>
        <p className="text-xs text-slate-400">
          تنسيق الأجهزة في مجموعات (Gaming, Work, Personal, Smart Home) وتطبيق الأوامر عليها جملة واحدة
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((group) => {
          const groupDevices = devices.filter((d) => group.deviceIds.includes(d.id));

          return (
            <div key={group.id} className="nexus-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-100 text-base">{group.name}</h3>
                  <p className="text-xs text-slate-400">{group.description}</p>
                </div>

                <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700 font-bold">
                  {groupDevices.length} أجهزة
                </span>
              </div>

              {/* Group Devices List */}
              <div className="space-y-2 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                {groupDevices.map((dev) => (
                  <div key={dev.id} className="flex items-center justify-between text-xs font-mono">
                    <span className="font-sans font-bold text-slate-200">{dev.name}</span>
                    <span className="text-slate-400">{dev.ip}</span>
                  </div>
                ))}
              </div>

              {/* Group Action Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-slate-400">الأولوية:</span>
                  <select
                    value={group.priority}
                    onChange={(e) => setGroupPriority(group.id, e.target.value as PriorityLevel)}
                    className="bg-slate-900 border border-slate-700 text-cyan-300 font-bold rounded-lg px-2 py-1 text-xs focus:outline-none"
                  >
                    <option value="HIGH">HIGH 🔥</option>
                    <option value="NORMAL">NORMAL 🟡</option>
                    <option value="LOW">LOW 🟢</option>
                  </select>
                </div>

                <button
                  onClick={() => toggleGroupPause(group.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 border transition-all ${
                    group.isPaused
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}
                >
                  {group.isPaused ? <PlayCircle className="w-4 h-4" /> : <PauseCircle className="w-4 h-4" />}
                  <span>{group.isPaused ? 'تشغيل المجموعة' : 'إيقاف المجموعة'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
