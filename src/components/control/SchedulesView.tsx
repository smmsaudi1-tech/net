import React, { useState } from 'react';
import { useNetwork } from '../../store/networkContext';
import { Clock, Plus, Trash2, Calendar, Check, AlertCircle } from 'lucide-react';

export const SchedulesView: React.FC = () => {
  const { schedules, toggleSchedule, addSchedule, deleteSchedule, devices } = useNetwork();

  const [title, setTitle] = useState('');
  const [targetId, setTargetId] = useState(devices[0]?.id || '');
  const [startTime, setStartTime] = useState('18:00');
  const [endTime, setEndTime] = useState('22:00');

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const targetDev = devices.find((d) => d.id === targetId);

    addSchedule({
      title,
      targetType: 'device',
      targetId,
      targetName: targetDev ? targetDev.name : 'Device',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      startTime,
      endTime,
      action: 'BLOCK',
      active: true
    });

    setTitle('');
  };

  return (
    <div className="space-y-6">
      <div className="nexus-card p-5 space-y-2">
        <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <Clock className="w-6 h-6 text-cyan-400" />
          ⏰ Schedules Manager — إدارة الجداول الزمنية والـ Night Mode
        </h2>
        <p className="text-xs text-slate-400">
          جدولة أوقات الاتصال والحظر تلقائيًا لأجهزة الأطفال، البلايستيشن، أو الضيوف خلال ساعات محددة
        </p>
      </div>

      {/* Create Schedule Form */}
      <form onSubmit={handleCreateSchedule} className="nexus-card p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Plus className="w-4 h-4 text-cyan-400" /> إضافة جدول زمني جديد
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">اسم الجدول:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: PlayStation Evening Limit..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">الجهاز المستهدف:</label>
            <select
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-400"
            >
              {devices.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.ip})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">وقت البدء:</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">وقت الانتهاء:</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" /> حفظ الجدول
        </button>
      </form>

      {/* Active Schedules List */}
      <div className="space-y-4">
        {schedules.map((sch) => (
          <div key={sch.id} className="nexus-card p-5 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-slate-100 text-sm">{sch.title}</h4>
                <span className="text-[10px] bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/20">
                  {sch.targetName}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {sch.startTime} → {sch.endTime} ({sch.days.join(', ')})
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleSchedule(sch.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  sch.active
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                {sch.active ? '🟢 نشط' : '⚪ معطل'}
              </button>

              <button
                onClick={() => deleteSchedule(sch.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
