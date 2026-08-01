import React from 'react';
import { useNetwork } from '../../store/networkContext';
import { ShieldAlert, ShieldCheck, AlertTriangle, CheckCircle2, Lock, Smartphone } from 'lucide-react';

export const SecurityView: React.FC = () => {
  const { securityAlerts, resolveAlert, devices, trustDevice, toggleBlockDevice } = useNetwork();

  const activeAlerts = securityAlerts.filter((a) => a.status === 'active');
  const unknownDevices = devices.filter((d) => !d.isTrusted);

  return (
    <div className="space-y-6">
      <div className="nexus-card p-5 space-y-2">
        <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-rose-500" />
          🛡️ Security Center — مركز الأمان وحماية الشبكة
        </h2>
        <p className="text-xs text-slate-400">
          مراقبة الأجهزة غير الموثوقة، الاتصالات المشبوهة، وجدار حماية الراوتر
        </p>
      </div>

      {/* Unknown Devices Warning Box */}
      {unknownDevices.length > 0 && (
        <div className="nexus-card p-6 border-2 border-rose-500/50 bg-rose-950/20 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-rose-400 animate-bounce" />
            <div>
              <h3 className="text-base font-extrabold text-rose-200">
                🚨 رصد جهاز جديد غير معروف (New Device Detected)!
              </h3>
              <p className="text-xs text-rose-300/80">
                يتصل بالشبكة جهاز جديد لم يتم توثيقه أو اعتماده من قبل الأدمن
              </p>
            </div>
          </div>

          {unknownDevices.map((dev) => (
            <div key={dev.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 font-mono text-xs">
              <div>
                <h4 className="font-bold text-slate-100 font-sans text-sm">{dev.name}</h4>
                <p className="text-slate-400">IP: {dev.ip} • MAC: {dev.mac} • First Seen: {dev.firstSeen}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => trustDevice(dev.id)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20"
                >
                  [ TRUST — اعتماد كجهاز موثوق ]
                </button>
                <button
                  onClick={() => toggleBlockDevice(dev.id)}
                  className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs shadow-md shadow-rose-500/20"
                >
                  [ BLOCK — حظر فوري ]
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Security Alerts List */}
      <div className="nexus-card p-6 space-y-4">
        <h3 className="font-extrabold text-slate-100 text-base">سجل التنبيهات الأمنية النشطة</h3>
        <div className="space-y-3">
          {securityAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                alert.status === 'active'
                  ? 'bg-rose-500/10 border-rose-500/30'
                  : 'bg-slate-900/60 border-slate-800 opacity-60'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-100 text-sm">{alert.title}</h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {alert.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{alert.description}</p>
              </div>

              {alert.status === 'active' ? (
                <button
                  onClick={() => resolveAlert(alert.id)}
                  className="text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700"
                >
                  تحديد كـ تم الحل
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> تم الحل
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
