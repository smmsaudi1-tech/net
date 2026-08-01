import React from 'react';
import { useNetwork } from '../../store/networkContext';
import {
  Wifi,
  Radio,
  ArrowDownCircle,
  ArrowUpCircle,
  Activity,
  Smartphone,
  Flame,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  PauseCircle,
  AlertTriangle,
  ChevronLeft,
  Crown
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const OverviewView: React.FC = () => {
  const {
    devices,
    currentTotalDownloadMbps,
    currentTotalUploadMbps,
    todayTotalTrafficGB,
    health,
    liveTrafficHistory,
    setSelectedDevice,
    setCurrentView,
    activateProfile,
    profiles,
    wifi
  } = useNetwork();

  const onlineDevices = devices.filter((d) => d.status === 'online');
  const blockedDevices = devices.filter((d) => d.isBlocked);
  const unknownDevices = devices.filter((d) => !d.isTrusted);

  // Top consumer device
  const topConsumer = [...devices].sort((a, b) => b.todayDownloadGB - a.todayDownloadGB)[0];

  return (
    <div className="space-y-6">
      {/* Top Banner Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status 1: Internet & Router */}
        <div className="nexus-card p-5 border-l-4 border-l-emerald-500 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              NETWORK STATUS
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <h3 className="text-lg font-bold text-slate-100">Internet Online</h3>
            </div>
            <p className="text-xs text-slate-400">📡 {wifi.ssid} ({wifi.frequency})</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Wifi className="w-6 h-6" />
          </div>
        </div>

        {/* Status 2: Current Live Download */}
        <div className="nexus-card p-5 border-l-4 border-l-cyan-500 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              ⚡ LIVE DOWNLOAD
            </span>
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-2xl font-extrabold text-cyan-300">{currentTotalDownloadMbps}</span>
              <span className="text-xs text-slate-400">Mbps</span>
            </div>
            <p className="text-[11px] text-slate-400">الرفع الحالي: {currentTotalUploadMbps} Mbps</p>
          </div>
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <ArrowDownCircle className="w-6 h-6 animate-bounce" />
          </div>
        </div>

        {/* Status 3: Today Total Traffic */}
        <div className="nexus-card p-5 border-l-4 border-l-indigo-500 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              📊 TODAY TRAFFIC
            </span>
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-2xl font-extrabold text-indigo-300">{todayTotalTrafficGB}</span>
              <span className="text-xs text-slate-400">GB</span>
            </div>
            <p className="text-[11px] text-slate-400">{onlineDevices.length} أجهزة متصلة الآن</p>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        {/* Status 4: Ping / Latency */}
        <div className="nexus-card p-5 border-l-4 border-l-amber-500 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              🏓 LATENCY & HEALTH
            </span>
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-2xl font-extrabold text-amber-300">{health.latencyMs}</span>
              <span className="text-xs text-slate-400">ms</span>
            </div>
            <p className="text-[11px] text-slate-400">النتيجة العامة: {health.overallScore}/100</p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Zap className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Charts & Top Consumer Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Bandwidth Real-Time Area Chart */}
        <div className="lg:col-span-2 nexus-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                استهلاك الشبكة اللحظي (Live Traffic Stream)
              </h3>
              <p className="text-xs text-slate-400">مراقبة مباشرة للسرعة بالسكوند عبر وكيل NEXUS</p>
            </div>
            <button
              onClick={() => setCurrentView('bandwidth')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/20"
            >
              <span>تكبير الشاشة</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={liveTrafficHistory}>
                <defs>
                  <linearGradient id="downloadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00F0FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="uploadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} unit="M" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0b0f19', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="download" stroke="#00F0FF" strokeWidth={2.5} fillOpacity={1} fill="url(#downloadGrad)" name="Download (Mbps)" />
                <Area type="monotone" dataKey="upload" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#uploadGrad)" name="Upload (Mbps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side: Top Consumer & Quick Actions */}
        <div className="space-y-6">
          {/* Top Consumer Box */}
          <div className="nexus-card p-6 border-t-4 border-t-amber-500 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-400" /> 🔥 Top Consumer Today
              </span>
              <span className="text-xs font-mono font-bold bg-amber-500/10 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/20">
                {topConsumer?.todayDownloadGB} GB
              </span>
            </div>

            {topConsumer && (
              <div
                onClick={() => {
                  setSelectedDevice(topConsumer);
                  setCurrentView('devices');
                }}
                className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{topConsumer.name}</h4>
                    <p className="text-xs text-slate-400 font-mono">{topConsumer.ip}</p>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    🟢 Online
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div className="bg-slate-950 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-500 block">Speed Now</span>
                    <span className="text-cyan-400 font-bold">{topConsumer.currentSpeedDownMbps} Mbps</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-500 block">QoS Priority</span>
                    <span className="text-amber-400 font-bold">{topConsumer.priority}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Unknown Devices Alert Widget */}
            {unknownDevices.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-rose-400 animate-bounce" />
                  <div>
                    <h5 className="text-xs font-bold text-rose-200">جهاز غريب تم رصده!</h5>
                    <p className="text-[10px] text-rose-300/80">{unknownDevices[0].ip}</p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentView('security')}
                  className="text-xs font-bold bg-rose-500 text-slate-950 px-3 py-1 rounded-xl shadow-md shadow-rose-500/20"
                >
                  فحص الآن
                </button>
              </div>
            )}
          </div>

          {/* Preset Profiles Quick Activator */}
          <div className="nexus-card p-5 space-y-3">
            <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
              🧩 البروفايل الشبكي النشط
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {profiles.map((prof) => (
                <button
                  key={prof.id}
                  onClick={() => activateProfile(prof.id)}
                  className={`p-3 rounded-xl text-right text-xs font-bold transition-all border ${
                    prof.active
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {prof.nameAr}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Online Devices Grid */}
      <div className="nexus-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100">📱 الأجهزة المتصلة حاليًا بالشبكة ({onlineDevices.length})</h3>
            <p className="text-xs text-slate-400">انقر على أي جهاز لفتح البروفايل الكامل وتخصيص السرعة</p>
          </div>
          <button
            onClick={() => setCurrentView('devices')}
            className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1"
          >
            عرض الكل
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {onlineDevices.slice(0, 4).map((device) => (
            <div
              key={device.id}
              onClick={() => {
                setSelectedDevice(device);
                setCurrentView('devices');
              }}
              className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer space-y-3 hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                  {device.priority} QoS
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-100 truncate">{device.name}</h4>
                <p className="text-xs text-slate-400 font-mono">{device.ip}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">اليوم: {device.todayDownloadGB} GB</span>
                <span className="text-cyan-400 font-bold">{device.currentSpeedDownMbps} Mbps</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
