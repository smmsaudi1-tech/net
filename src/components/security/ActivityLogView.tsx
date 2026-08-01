import React, { useState } from 'react';
import { useNetwork } from '../../store/networkContext';
import { FileText, Search, Filter, ShieldAlert, Zap, Lock, Info, CheckCircle2 } from 'lucide-react';

export const ActivityLogView: React.FC = () => {
  const { logs } = useNetwork();
  const [filterType, setFilterType] = useState<string>('all');

  const filteredLogs = logs.filter((l) => {
    if (filterType === 'all') return true;
    return l.severity === filterType;
  });

  return (
    <div className="space-y-6">
      <div className="nexus-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
            <FileText className="w-6 h-6 text-cyan-400" />
            📜 Activity Log — سجل الأنشطة والعمليات الكامل
          </h2>
          <p className="text-xs text-slate-400">
            تتبع زمني لكافة الأوامر، الحظر، الأخطاء، القواعد المفعلة، والأجهزة الجديدة
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'info', label: 'معلومات' },
            { id: 'warning', label: 'تنبيهات' },
            { id: 'critical', label: 'حظر خطير' },
            { id: 'success', label: 'نجاح' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterType === f.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="nexus-card overflow-hidden">
        <div className="divide-y divide-slate-800/80 font-mono text-xs">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-slate-500 text-[11px] font-bold">{log.timestamp}</span>
                <span className="text-slate-200 font-sans font-medium">{log.message}</span>
              </div>

              <span
                className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase font-sans ${
                  log.severity === 'critical'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : log.severity === 'warning'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : log.severity === 'success'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {log.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
