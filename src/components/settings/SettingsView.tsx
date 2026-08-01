import React, { useState } from 'react';
import { useNetwork } from '../../store/networkContext';
import { Settings, Cpu, Save, Download, Upload, ShieldCheck, RefreshCw, Key } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { agentStatus, wifi, addLogMessage } = useNetwork();
  const [routerIp, setRouterIp] = useState('192.168.1.1');
  const [sshPort, setSshPort] = useState('22');
  const [adminPin, setAdminPin] = useState('1234');
  const [saved, setSaved] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    addLogMessage('تم حفظ إعدادات الـ Agent والتراسل مع الراوتر بنجاح', 'success');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="nexus-card p-5 space-y-2">
        <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <Settings className="w-6 h-6 text-cyan-400" />
          ⚙️ Settings — إعدادات النظام ووكيل NEXUS
        </h2>
        <p className="text-xs text-slate-400">
          تخصيص اتصال الراوتر المحلي، منافذ التراسل، تصدير واستيراد النسخ الاحتياطية
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Agent Config Form */}
        <form onSubmit={handleSaveSettings} className="nexus-card p-6 space-y-4">
          <h3 className="font-extrabold text-slate-100 text-base border-b border-slate-800 pb-3 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" /> إعدادات اتصال الوكيل المحلي (NEXUS Agent)
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">عنوان IP الخاص بالراوتر:</label>
              <input
                type="text"
                value={routerIp}
                onChange={(e) => setRouterIp(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">منفذ SSH / API Port:</label>
              <input
                type="text"
                value={sshPort}
                onChange={(e) => setSshPort(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">رمز الأمان السري (PIN):</label>
              <input
                type="password"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saved ? 'تم الحفظ بنجاح ✓' : 'حفظ الإعدادات'}</span>
          </button>
        </form>

        {/* Backup & Agent Status */}
        <div className="space-y-6">
          <div className="nexus-card p-6 space-y-4">
            <h3 className="font-extrabold text-slate-100 text-base border-b border-slate-800 pb-3 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400 animate-pulse" /> حالة الوكيل المحمي
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-900">
                <span className="text-slate-400 font-sans">Status:</span>
                <span className="text-emerald-400 font-bold">🟢 Online (Active Scanning)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-900">
                <span className="text-slate-400 font-sans">Agent Version:</span>
                <span className="text-cyan-300">{agentStatus.version}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-900">
                <span className="text-slate-400 font-sans">IP Address:</span>
                <span className="text-slate-200">{agentStatus.ip}</span>
              </div>
            </div>
          </div>

          <div className="nexus-card p-6 space-y-4">
            <h3 className="font-extrabold text-slate-100 text-base border-b border-slate-800 pb-3">
              💾 النسخ الاحتياطي واستعادة التكينات
            </h3>

            <div className="flex items-center gap-3">
              <button className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> تصدير الإعدادات JSON
              </button>
              <button className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" /> استيراد نسخة احتياطية
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
