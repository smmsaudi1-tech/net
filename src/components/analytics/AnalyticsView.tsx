import React, { useState } from 'react';
import { useNetwork } from '../../store/networkContext';
import { BarChart3, Calendar, Download, Upload, PieChart, Filter } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const AnalyticsView: React.FC = () => {
  const { devices } = useNetwork();
  const [timeRange, setTimeRange] = useState<'today' | 'yesterday' | '7days' | '30days'>('today');

  const hourlyData = [
    { hour: '00:00', download: 1.2, upload: 0.2 },
    { hour: '04:00', download: 0.4, upload: 0.1 },
    { hour: '08:00', download: 2.8, upload: 0.5 },
    { hour: '12:00', download: 4.5, upload: 0.8 },
    { hour: '16:00', download: 6.2, upload: 1.1 },
    { hour: '20:00', download: 8.9, upload: 1.5 },
    { hour: '23:00', download: 5.1, upload: 0.9 },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Date Selector */}
      <div className="nexus-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            تحليلات استهلاك الشبكة — Traffic Analytics
          </h2>
          <p className="text-xs text-slate-400">
            سجل الاستهلاك التفصيلي بالساعات والأيام لجميع أجهزة الشبكة
          </p>
        </div>

        {/* Range Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
          {[
            { id: 'today', label: 'اليوم (Today)' },
            { id: 'yesterday', label: 'أمس (Yesterday)' },
            { id: '7days', label: 'آخر 7 أيام' },
            { id: '30days', label: 'آخر 30 يومًا' }
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timeRange === range.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Hourly Chart */}
      <div className="nexus-card p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-400" />
          توزيع استهلاك البيانات بالساعات (Hourly Traffic Breakdown)
        </h3>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData}>
              <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} unit=" GB" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b0f19', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="download" name="التحميل (Download GB)" fill="#00F0FF" radius={[6, 6, 0, 0]} />
              <Bar dataKey="upload" name="الرفع (Upload GB)" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Per-Device Analytics Cards */}
      <div className="nexus-card p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-100">تفاصيل استهلاك الأجهزة (Device → Traffic)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map((dev) => (
            <div key={dev.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 font-mono">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-100 text-sm font-sans">{dev.name}</span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">{dev.ip}</span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Download Today</span>
                  <span className="text-cyan-400 font-bold">{dev.todayDownloadGB} GB</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full rounded-full"
                    style={{ width: `${Math.min(100, (dev.todayDownloadGB / 10) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Upload Today</span>
                  <span className="text-purple-400 font-bold">{dev.todayUploadGB} GB</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-400 h-full rounded-full"
                    style={{ width: `${Math.min(100, (dev.todayUploadGB / 3) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
