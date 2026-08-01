import React from 'react';
import { useNetwork } from '../../store/networkContext';
import { Gauge, Radio, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const BandwidthMonitorView: React.FC = () => {
  const { liveTrafficHistory, currentTotalDownloadMbps, currentTotalUploadMbps } = useNetwork();

  const maxDown = Math.max(...liveTrafficHistory.map((h) => h.download), 50);
  const avgDown = (liveTrafficHistory.reduce((sum, h) => sum + h.download, 0) / liveTrafficHistory.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="nexus-card p-5 space-y-2">
        <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <Gauge className="w-6 h-6 text-cyan-400" />
          📈 Bandwidth Monitor — المراقبة المباشرة للنطاق العريض
        </h2>
        <p className="text-xs text-slate-400">
          رسم بياني حي عالي الدقة لعرض معدل نقل السرعة، الذروة (Peak)، والمتوسط (Average)
        </p>
      </div>

      {/* Speed Metrics Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="nexus-card p-4 bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-sans block">السرعة الحالية (Current)</span>
          <span className="text-2xl font-extrabold text-cyan-300">{currentTotalDownloadMbps} Mbps</span>
        </div>
        <div className="nexus-card p-4 bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-sans block">متوسط السرعة (Average)</span>
          <span className="text-2xl font-extrabold text-emerald-300">{avgDown} Mbps</span>
        </div>
        <div className="nexus-card p-4 bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-sans block">أعلى ذروة (Peak)</span>
          <span className="text-2xl font-extrabold text-amber-300">{maxDown.toFixed(1)} Mbps</span>
        </div>
        <div className="nexus-card p-4 bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 font-sans block">معدل الرفع اللحظي</span>
          <span className="text-2xl font-extrabold text-purple-300">{currentTotalUploadMbps} Mbps</span>
        </div>
      </div>

      {/* Fullscreen Line Graph */}
      <div className="nexus-card p-6 space-y-4">
        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={liveTrafficHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} unit=" M" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b0f19', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="download" stroke="#00F0FF" strokeWidth={3} dot={false} name="Download (Mbps)" />
              <Line type="monotone" dataKey="upload" stroke="#8B5CF6" strokeWidth={2.5} dot={false} name="Upload (Mbps)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
