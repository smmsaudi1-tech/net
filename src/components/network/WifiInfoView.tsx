import React from 'react';
import { useNetwork } from '../../store/networkContext';
import { Wifi, Signal, Radio, Server, Globe, Cpu } from 'lucide-react';

export const WifiInfoView: React.FC = () => {
  const { wifi } = useNetwork();

  return (
    <div className="space-y-6">
      <div className="nexus-card p-5 space-y-2">
        <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <Wifi className="w-6 h-6 text-cyan-400" />
          📡 Wi-Fi & LAN Information — معلومات اللاسلكي والراوتر
        </h2>
        <p className="text-xs text-slate-400">
          معلومات إشارة الـ Wi-Fi، القنوات اللاسلكية (Channel)، وعناوين الشبكة المحلية والشبكة الخارجية WAN
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Wi-Fi Details */}
        <div className="nexus-card p-6 space-y-4">
          <h3 className="font-extrabold text-slate-100 text-sm flex items-center gap-2 border-b border-slate-800 pb-3">
            <Radio className="w-5 h-5 text-cyan-400" /> إعدادات الإشارة اللاسلكية (Wi-Fi Config)
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 font-sans">اسم الشبكة (SSID):</span>
              <span className="text-cyan-300 font-bold">{wifi.ssid}</span>
            </div>

            <div className="flex justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 font-sans">التردد الفعلي:</span>
              <span className="text-emerald-400 font-bold">{wifi.frequency}</span>
            </div>

            <div className="flex justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 font-sans">القناة (Channel):</span>
              <span className="text-amber-300 font-bold">Ch {wifi.channel} (Auto Selection)</span>
            </div>

            <div className="flex justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 font-sans">جودة الإشارة العامة:</span>
              <span className="text-cyan-400 font-bold">{wifi.signalQuality}% (-45 dBm Excellent)</span>
            </div>
          </div>
        </div>

        {/* LAN & WAN Details */}
        <div className="nexus-card p-6 space-y-4">
          <h3 className="font-extrabold text-slate-100 text-sm flex items-center gap-2 border-b border-slate-800 pb-3">
            <Server className="w-5 h-5 text-indigo-400" /> شبكة LAN و gateway البوابة
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 font-sans">عنوان البوابة (Gateway IP):</span>
              <span className="text-slate-200 font-bold">{wifi.gatewayIp}</span>
            </div>

            <div className="flex justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 font-sans">نطاق الشبكة المحلية LAN:</span>
              <span className="text-indigo-300 font-bold">{wifi.lanIp} / 24</span>
            </div>

            <div className="flex justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 font-sans">عنوان الـ WAN IP العام:</span>
              <span className="text-purple-300 font-bold">{wifi.wanIp}</span>
            </div>

            <div className="flex justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 font-sans">مدة عمل الراوتر (Uptime):</span>
              <span className="text-emerald-400 font-bold">{wifi.uptime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
