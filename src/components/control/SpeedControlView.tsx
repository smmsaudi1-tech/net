import React from 'react';
import { useNetwork } from '../../store/networkContext';
import { Sliders, ArrowDownCircle, ArrowUpCircle, Zap } from 'lucide-react';

export const SpeedControlView: React.FC = () => {
  const { devices, setDeviceSpeedLimit } = useNetwork();

  const presets = [0, 1, 5, 10, 20, 50, 100];

  return (
    <div className="space-y-6">
      <div className="nexus-card p-5 space-y-2">
        <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <Sliders className="w-6 h-6 text-cyan-400" />
          ⚡ Speed Control — تحديد سرعة الإنترنت لكل جهاز
        </h2>
        <p className="text-xs text-slate-400">
          تخصيص حد أقصى لسرعة التحميل (Download) والرفع (Upload) لكل جهاز لحماية جودة الاتصال
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {devices.map((dev) => (
          <div key={dev.id} className="nexus-card p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">{dev.name}</h3>
                <p className="text-xs text-slate-400 font-mono">{dev.ip} • {dev.hostname}</p>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                السرعة الحالية: {dev.currentSpeedDownMbps} Mbps
              </span>
            </div>

            {/* Download Limit Sliders & Quick Presets */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <ArrowDownCircle className="w-4 h-4 text-cyan-400" /> Download Limit
                </span>
                <span className="font-mono font-bold text-cyan-300">
                  {dev.maxDownloadLimitMbps === 0 ? 'Unlimited' : `${dev.maxDownloadLimitMbps} Mbps`}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={dev.maxDownloadLimitMbps}
                onChange={(e) => setDeviceSpeedLimit(dev.id, parseInt(e.target.value), dev.maxUploadLimitMbps)}
                className="w-full accent-cyan-400 cursor-pointer"
              />

              <div className="flex items-center gap-1 overflow-x-auto pt-1">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setDeviceSpeedLimit(dev.id, preset, dev.maxUploadLimitMbps)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all border ${
                      dev.maxDownloadLimitMbps === preset
                        ? 'bg-cyan-500/30 text-cyan-200 border-cyan-500/50'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {preset === 0 ? 'Unlimited' : `${preset}M`}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Limit Sliders */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <ArrowUpCircle className="w-4 h-4 text-purple-400" /> Upload Limit
                </span>
                <span className="font-mono font-bold text-purple-300">
                  {dev.maxUploadLimitMbps === 0 ? 'Unlimited' : `${dev.maxUploadLimitMbps} Mbps`}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={dev.maxUploadLimitMbps}
                onChange={(e) => setDeviceSpeedLimit(dev.id, dev.maxDownloadLimitMbps, parseInt(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
