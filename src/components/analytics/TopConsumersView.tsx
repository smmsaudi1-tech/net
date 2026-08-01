import React, { useState } from 'react';
import { useNetwork } from '../../store/networkContext';
import { Award, Crown, Trophy, Smartphone } from 'lucide-react';

export const TopConsumersView: React.FC = () => {
  const { devices } = useNetwork();
  const [filterPeriod, setFilterPeriod] = useState<'today' | 'week' | 'month'>('today');

  const sortedDevices = [...devices].sort((a, b) => b.todayDownloadGB - a.todayDownloadGB);

  const getRankBadge = (index: number) => {
    if (index === 0) return <span className="text-xl">🥇</span>;
    if (index === 1) return <span className="text-xl">🥈</span>;
    if (index === 2) return <span className="text-xl">🥉</span>;
    return <span className="text-xs font-mono font-bold text-slate-400 font-sans">#{index + 1}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="nexus-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            🏆 Top Consumers — ترتيب الأجهزة الأكثر استهلاكًا
          </h2>
          <p className="text-xs text-slate-400">
            لائحة المتصدرين في استهلاك بيانات الإنترنت على مستوى اليوم، الأسبوع، والشهر
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
          {[
            { id: 'today', label: 'اليوم (Today)' },
            { id: 'week', label: 'هذا الأسبوع' },
            { id: 'month', label: 'هذا الشهر' }
          ].map((period) => (
            <button
              key={period.id}
              onClick={() => setFilterPeriod(period.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterPeriod === period.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="nexus-card overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-200 flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-400" /> TODAY'S TOP CONSUMERS LEADERBOARD
          </h3>
          <span className="text-xs text-slate-400 font-mono">الإجمالي: {devices.length} أجهزة</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {sortedDevices.map((dev, idx) => (
            <div key={dev.id} className="p-4 flex items-center justify-between hover:bg-slate-800/40 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 text-center">{getRankBadge(idx)}</div>
                <div>
                  <h4 className="font-bold text-slate-100 text-sm">{dev.name}</h4>
                  <p className="text-xs text-slate-400 font-mono">{dev.ip} • {dev.hostname}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 font-mono text-xs">
                <div className="text-left">
                  <span className="text-[10px] text-slate-500 block font-sans">الاستجابة</span>
                  <span className="text-slate-300 font-bold">{dev.latencyMs} ms</span>
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-slate-500 block font-sans">إجمالي البيانات</span>
                  <span className="text-cyan-300 font-bold text-sm">{dev.todayDownloadGB} GB</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
