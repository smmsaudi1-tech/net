import React, { useState } from 'react';
import { useNetwork } from '../../store/networkContext';
import { Bot, Plus, Trash2, CheckCircle2, Zap, ArrowRight } from 'lucide-react';

export const RulesEngineView: React.FC = () => {
  const { rules, toggleRule, addRule, deleteRule, devices } = useNetwork();

  const [ruleName, setRuleName] = useState('');
  const [selectedDevId, setSelectedDevId] = useState(devices[0]?.id || '');
  const [targetPriority, setTargetPriority] = useState<'HIGH' | 'NORMAL' | 'LOW'>('HIGH');
  const [targetSpeedMbps, setTargetSpeedMbps] = useState<number>(100);

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleName) return;

    const dev = devices.find((d) => d.id === selectedDevId);

    addRule({
      name: ruleName,
      condition: {
        deviceId: selectedDevId,
        deviceName: dev ? dev.name : 'Selected Device',
        timeStart: '18:00',
        timeEnd: '23:00'
      },
      action: {
        priority: targetPriority,
        speedLimitMbps: targetSpeedMbps,
        internetAccess: 'ALLOW',
        notification: true
      },
      enabled: true
    });

    setRuleName('');
  };

  return (
    <div className="space-y-6">
      <div className="nexus-card p-5 space-y-2">
        <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <Bot className="w-6 h-6 text-cyan-400" />
          🤖 Smart Rules Engine — المحرك الذكي للقواعد التلقائية
        </h2>
        <p className="text-xs text-slate-400">
          إنشاء قواعد مشروطة (WHEN ... AND ... THEN ...) لتشغيل الأوامر تلقائيًا بحسب الأوقات، الأجهزة، واستهلاك البيانات
        </p>
      </div>

      {/* Rule Creator */}
      <form onSubmit={handleAddRule} className="nexus-card p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Plus className="w-4 h-4 text-cyan-400" /> بناء قاعدة أتمتة جديدة (Rule Builder)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">اسم القاعدة:</label>
            <input
              type="text"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              placeholder="مثال: Auto Gaming Priority Rule..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">WHEN Device Equals:</label>
            <select
              value={selectedDevId}
              onChange={(e) => setSelectedDevId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none"
            >
              {devices.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.ip})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">THEN Set Speed (Mbps):</label>
            <input
              type="number"
              value={targetSpeedMbps}
              onChange={(e) => setTargetSpeedMbps(parseInt(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" /> حفظ وإضافة القاعدة
        </button>
      </form>

      {/* Rules Cards */}
      <div className="space-y-4">
        {rules.map((r) => (
          <div key={r.id} className="nexus-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-cyan-400" />
                <h4 className="font-bold text-slate-100 text-sm">{r.name}</h4>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleRule(r.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    r.enabled
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  {r.enabled ? '🟢 مفعلة' : '⚪ معطلة'}
                </button>

                <button
                  onClick={() => deleteRule(r.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* WHEN / AND / THEN Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 font-mono text-xs pt-1">
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-cyan-400 font-extrabold block">WHEN</span>
                <span className="text-slate-200">
                  {r.condition.triggerOnNewDevice
                    ? 'New Device Detected'
                    : r.condition.trafficThresholdGB
                    ? `Traffic > ${r.condition.trafficThresholdGB} GB`
                    : `Device = ${r.condition.deviceName || 'Selected Device'}`}
                </span>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-amber-400 font-extrabold block">AND</span>
                <span className="text-slate-200">
                  {r.condition.timeStart ? `Time = ${r.condition.timeStart} → ${r.condition.timeEnd}` : 'Always Active'}
                </span>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-emerald-400 font-extrabold block">THEN</span>
                <span className="text-slate-200">
                  {r.action.internetAccess
                    ? `Internet = ${r.action.internetAccess}`
                    : `Speed = ${r.action.speedLimitMbps} Mbps (Priority = ${r.action.priority})`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
