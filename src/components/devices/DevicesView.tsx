import React, { useState } from 'react';
import { useNetwork } from '../../store/networkContext';
import { Device, PriorityLevel, DeviceType } from '../../types';
import {
  Smartphone,
  Laptop,
  Tv,
  Gamepad2,
  Printer,
  Radio,
  HelpCircle,
  PauseCircle,
  PlayCircle,
  ShieldBan,
  ShieldCheck,
  Search,
  Filter,
  Sliders,
  Flame,
  X,
  Gauge,
  Activity,
  ArrowDownCircle,
  ArrowUpCircle,
  CheckCircle2,
  Trash2,
  Edit2
} from 'lucide-react';

export const DevicesView: React.FC = () => {
  const {
    devices,
    selectedDevice,
    setSelectedDevice,
    togglePauseDevice,
    toggleBlockDevice,
    setDeviceSpeedLimit,
    setDevicePriority,
    trustDevice,
    renameDevice,
    deleteDevice,
    deviceSearchQuery,
    setDeviceSearchQuery,
    deviceFilterType,
    setDeviceFilterType
  } = useNetwork();

  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [editingNameId, setEditingNameId] = useState<string | null>(null);
  const [tempName, setTempName] = useState<string>('');

  // Filter devices
  const filteredDevices = devices.filter((dev) => {
    const matchesSearch =
      dev.name.toLowerCase().includes(deviceSearchQuery.toLowerCase()) ||
      dev.ip.includes(deviceSearchQuery) ||
      dev.mac.toLowerCase().includes(deviceSearchQuery.toLowerCase()) ||
      dev.hostname.toLowerCase().includes(deviceSearchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (deviceFilterType === 'online') return dev.status === 'online';
    if (deviceFilterType === 'offline') return dev.status === 'offline';
    if (deviceFilterType === 'blocked') return dev.isBlocked;
    if (deviceFilterType === 'unknown') return !dev.isTrusted;
    if (deviceFilterType === 'phone') return dev.type === 'phone';
    if (deviceFilterType === 'computer') return dev.type === 'computer';
    if (deviceFilterType === 'gaming') return dev.type === 'console';
    if (deviceFilterType === 'tv') return dev.type === 'tv';
    if (deviceFilterType === 'iot') return dev.type === 'iot';

    return true;
  });

  const getDeviceIcon = (type: DeviceType) => {
    switch (type) {
      case 'computer': return Laptop;
      case 'phone': return Smartphone;
      case 'tv': return Tv;
      case 'console': return Gamepad2;
      case 'printer': return Printer;
      case 'iot': return Radio;
      default: return HelpCircle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls Bar */}
      <div className="nexus-card p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
              <Smartphone className="w-6 h-6 text-cyan-400" />
              أهم صفحة — إدارة كافة الأجهزة على الشبكة ({devices.length})
            </h2>
            <p className="text-xs text-slate-400">
              تحكم كامل بالإنترنت، الـIP، الماك، السرعة القصوى، وأولوية الخدمة QoS لكل جهاز
            </p>
          </div>

          {/* Table / Cards toggle */}
          <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'table' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400'
              }`}
            >
              جدول منظم
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'cards' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400'
              }`}
            >
              بطاقات تفاعلية
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-center gap-3 pt-2">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={deviceSearchQuery}
              onChange={(e) => setDeviceSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، IP، MAC address، أو Hostname..."
              className="w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-500 rounded-xl px-4 py-2.5 pr-10 text-xs text-slate-200 focus:outline-none placeholder:text-slate-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'online', label: '🟢 متصل' },
              { id: 'offline', label: '🔴 غير متصل' },
              { id: 'blocked', label: '🛑 محظور' },
              { id: 'unknown', label: '🚨 مجهول' },
              { id: 'phone', label: '📱 هواتف' },
              { id: 'computer', label: '💻 كمبيوتر' },
              { id: 'gaming', label: '🎮 ألعاب' },
              { id: 'tv', label: '📺 شاشات' },
              { id: 'iot', label: '📡 IoT' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setDeviceFilterType(filter.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  deviceFilterType === filter.id
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'table' ? (
        <div className="nexus-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-900/90 border-b border-slate-800 text-slate-400 font-semibold">
                <tr>
                  <th className="p-4">الجهاز (DEVICE)</th>
                  <th className="p-4">عنوان الـ IP</th>
                  <th className="p-4">الحالة (STATUS)</th>
                  <th className="p-4">استهلاك اليوم</th>
                  <th className="p-4">السرعة الحالية</th>
                  <th className="p-4">الأولوية QoS</th>
                  <th className="p-4">التحكم السريع</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredDevices.map((dev) => {
                  const Icon = getDeviceIcon(dev.type);
                  return (
                    <tr
                      key={dev.id}
                      className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                      onClick={() => setSelectedDevice(dev)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3 font-sans">
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-100">{dev.name}</span>
                              {!dev.isTrusted && (
                                <span className="text-[9px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/30">
                                  🚨 غريب
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400 font-mono">{dev.mac}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-mono text-slate-300">{dev.ip}</td>

                      <td className="p-4">
                        {dev.isBlocked ? (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                            🛑 محظور
                          </span>
                        ) : dev.isPaused ? (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                            ⏸️ متوقف
                          </span>
                        ) : dev.status === 'online' ? (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            🟢 Online
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-400">
                            🔴 Offline
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-slate-200">
                        <span className="font-bold">{dev.todayDownloadGB}</span> GB
                      </td>

                      <td className="p-4 text-cyan-400 font-bold">
                        {dev.currentSpeedDownMbps} Mbps
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            dev.priority === 'HIGH'
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              : dev.priority === 'NORMAL'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {dev.priority}
                        </span>
                      </td>

                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => togglePauseDevice(dev.id)}
                            title={dev.isPaused ? 'استئناف الإنترنت' : 'إيقاف الإنترنت مؤقتًا'}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              dev.isPaused
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-amber-400'
                            }`}
                          >
                            {dev.isPaused ? <PlayCircle className="w-4 h-4" /> : <PauseCircle className="w-4 h-4" />}
                          </button>

                          <button
                            onClick={() => toggleBlockDevice(dev.id)}
                            title={dev.isBlocked ? 'إلغاء حظر الجهاز' : 'حظر الجهاز نهائيًا'}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              dev.isBlocked
                                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-rose-400'
                            }`}
                          >
                            <ShieldBan className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDevices.map((dev) => {
            const Icon = getDeviceIcon(dev.type);
            return (
              <div
                key={dev.id}
                onClick={() => setSelectedDevice(dev)}
                className="nexus-card p-5 space-y-4 hover:border-cyan-500/40 cursor-pointer transition-all hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">{dev.name}</h4>
                      <p className="text-xs text-slate-400 font-mono">{dev.ip}</p>
                    </div>
                  </div>

                  {dev.isBlocked ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      🛑 Blocked
                    </span>
                  ) : dev.status === 'online' ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      🟢 Online
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      🔴 Offline
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-800/80">
                  <div className="bg-slate-950 p-2.5 rounded-xl">
                    <span className="text-[10px] text-slate-500 block">Today Download</span>
                    <span className="text-slate-200 font-bold">{dev.todayDownloadGB} GB</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl">
                    <span className="text-[10px] text-slate-500 block">Live Speed</span>
                    <span className="text-cyan-400 font-bold">{dev.currentSpeedDownMbps} Mbps</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-400 font-mono">QoS: {dev.priority}</span>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => togglePauseDevice(dev.id)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300"
                    >
                      {dev.isPaused ? '▶️ استئناف' : '⏸️ إيقاف'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DEVICE PROFILE DETAILED MODAL */}
      {selectedDevice && (
        <div className="fixed inset-0 z-50 bg-[#04060a]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-2xl w-full nexus-card p-6 border border-cyan-500/40 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
                  {React.createElement(getDeviceIcon(selectedDevice.type), { className: 'w-6 h-6' })}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    {editingNameId === selectedDevice.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          className="bg-slate-900 border border-cyan-500 rounded px-2 py-1 text-sm font-bold text-white"
                        />
                        <button
                          onClick={() => {
                            renameDevice(selectedDevice.id, tempName);
                            setEditingNameId(null);
                          }}
                          className="text-xs bg-cyan-500 text-slate-950 px-2 py-1 rounded font-bold"
                        >
                          حفظ
                        </button>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-lg font-bold text-slate-100">{selectedDevice.name}</h3>
                        <button
                          onClick={() => {
                            setEditingNameId(selectedDevice.id);
                            setTempName(selectedDevice.name);
                          }}
                          className="text-slate-400 hover:text-cyan-400"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 font-mono">{selectedDevice.hostname}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDevice(null)}
                className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">IP Address</span>
                <span className="text-xs text-cyan-300 font-bold">{selectedDevice.ip}</span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">MAC Address</span>
                <span className="text-xs text-slate-300">{selectedDevice.mac}</span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Today Download</span>
                <span className="text-xs text-emerald-400 font-bold">{selectedDevice.todayDownloadGB} GB</span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Today Upload</span>
                <span className="text-xs text-purple-400 font-bold">{selectedDevice.todayUploadGB} GB</span>
              </div>
            </div>

            {/* Live Speed Meters */}
            <div className="nexus-card p-4 space-y-3 bg-slate-950/60">
              <h4 className="text-xs font-extrabold text-slate-300 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-cyan-400" /> السرعة الحالية والـ Latency
              </h4>
              <div className="grid grid-cols-3 gap-3 text-center font-mono">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <ArrowDownCircle className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <span className="text-lg font-extrabold text-cyan-300">{selectedDevice.currentSpeedDownMbps}</span>
                  <span className="text-[10px] text-slate-500 block">Mbps Download</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <ArrowUpCircle className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                  <span className="text-lg font-extrabold text-purple-300">{selectedDevice.currentSpeedUpMbps}</span>
                  <span className="text-[10px] text-slate-500 block">Mbps Upload</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <Activity className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <span className="text-lg font-extrabold text-amber-300">{selectedDevice.latencyMs}</span>
                  <span className="text-[10px] text-slate-500 block">Ping ms</span>
                </div>
              </div>
            </div>

            {/* Speed Control Sliders */}
            <div className="nexus-card p-4 space-y-4">
              <h4 className="text-xs font-extrabold text-slate-300 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" /> تحديد السرعة القصوى (Speed Limit)
              </h4>

              {/* Download Limit Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">حد التحميل (Download Limit):</span>
                  <span className="font-mono font-bold text-cyan-300">
                    {selectedDevice.maxDownloadLimitMbps === 0 ? 'مفتوح (Unlimited)' : `${selectedDevice.maxDownloadLimitMbps} Mbps`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={selectedDevice.maxDownloadLimitMbps}
                  onChange={(e) =>
                    setDeviceSpeedLimit(selectedDevice.id, parseInt(e.target.value), selectedDevice.maxUploadLimitMbps)
                  }
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Upload Limit Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">حد الرفع (Upload Limit):</span>
                  <span className="font-mono font-bold text-purple-300">
                    {selectedDevice.maxUploadLimitMbps === 0 ? 'مفتوح (Unlimited)' : `${selectedDevice.maxUploadLimitMbps} Mbps`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={selectedDevice.maxUploadLimitMbps}
                  onChange={(e) =>
                    setDeviceSpeedLimit(selectedDevice.id, selectedDevice.maxDownloadLimitMbps, parseInt(e.target.value))
                  }
                  className="w-full accent-purple-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Priority QoS & Control Actions */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  أولوية الخدمة (QoS Priority Level):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['HIGH', 'NORMAL', 'LOW'] as PriorityLevel[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setDevicePriority(selectedDevice.id, p)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        selectedDevice.priority === p
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {p === 'HIGH' ? '🔥 HIGH' : p === 'NORMAL' ? '🟡 NORMAL' : '🟢 LOW'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => togglePauseDevice(selectedDevice.id)}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
                    selectedDevice.isPaused
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}
                >
                  {selectedDevice.isPaused ? <PlayCircle className="w-4 h-4" /> : <PauseCircle className="w-4 h-4" />}
                  <span>{selectedDevice.isPaused ? 'استئناف الإنترنت' : 'إيقاف الإنترنت مؤقتًا'}</span>
                </button>

                <button
                  onClick={() => toggleBlockDevice(selectedDevice.id)}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
                    selectedDevice.isBlocked
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}
                >
                  <ShieldBan className="w-4 h-4" />
                  <span>{selectedDevice.isBlocked ? 'إلغاء حظر الجهاز' : 'حظر الجهاز بالكامل'}</span>
                </button>

                {!selectedDevice.isTrusted && (
                  <button
                    onClick={() => trustDevice(selectedDevice.id)}
                    className="py-2.5 px-4 rounded-xl font-bold text-xs bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>اعتماد كجهاز موثوق</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
