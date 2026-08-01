import React, { useState } from 'react';
import { useNetwork } from '../../store/networkContext';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Activity,
  ShieldAlert,
  Lock,
  Menu,
  X,
  Radio
} from 'lucide-react';

export const Topbar: React.FC = () => {
  const {
    currentTotalDownloadMbps,
    currentTotalUploadMbps,
    health,
    securityAlerts,
    profiles,
    activateProfile,
    logout,
    currentView,
    setCurrentView
  } = useNetwork();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeProfile = profiles.find((p) => p.active) || profiles[3];
  const activeAlertsCount = securityAlerts.filter((a) => a.status === 'active').length;

  return (
    <header className="sticky top-0 z-20 bg-[#0b0f19]/80 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-3 flex items-center justify-between">
      {/* Mobile Title & Menu Toggle */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-slate-800/80 text-slate-200 hover:bg-slate-700 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono">
            NEXUS
          </span>
        </div>
      </div>

      {/* Quick Mode Profile Switcher Pills */}
      <div className="hidden md:flex items-center gap-2 bg-slate-900/90 p-1 rounded-2xl border border-slate-800/80">
        {profiles.map((p) => {
          const isActive = p.active;
          return (
            <button
              key={p.id}
              onClick={() => activateProfile(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              <span>{p.nameAr.split(' ')[0]}</span>
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>}
            </button>
          );
        })}
      </div>

      {/* Live Speed Ticker & Network Metrics */}
      <div className="flex items-center gap-3 lg:gap-6">
        <div className="flex items-center gap-4 bg-slate-900/80 px-3.5 py-1.5 rounded-2xl border border-slate-800/80 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ArrowDownCircle className="w-4 h-4" />
            <span className="font-bold text-slate-100">{currentTotalDownloadMbps}</span>
            <span className="text-[10px] text-slate-400">Mbps</span>
          </div>

          <div className="h-4 w-px bg-slate-800"></div>

          <div className="flex items-center gap-1.5 text-cyan-400">
            <ArrowUpCircle className="w-4 h-4" />
            <span className="font-bold text-slate-100">{currentTotalUploadMbps}</span>
            <span className="text-[10px] text-slate-400">Mbps</span>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>

          <div className="hidden sm:flex items-center gap-1 text-slate-300">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>{health.latencyMs}</span>
            <span className="text-[10px] text-slate-400">ms</span>
          </div>
        </div>

        {/* Security Alerts Button */}
        <button
          onClick={() => setCurrentView('security')}
          className={`relative p-2 rounded-xl border transition-all ${
            activeAlertsCount > 0
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/40 hover:bg-rose-500/20'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
          title="مركز الأمان والتنبيهات"
        >
          <ShieldAlert className="w-5 h-5" />
          {activeAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
              {activeAlertsCount}
            </span>
          )}
        </button>

        {/* Admin Lock Button */}
        <button
          onClick={logout}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
          title="قفل الشاشة"
        >
          <Lock className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 bg-[#0b0f19]/95 backdrop-blur-2xl border-b border-slate-800 p-4 z-50 lg:hidden space-y-4 shadow-2xl">
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'overview', name: '🏠 الرئيسية' },
              { id: 'devices', name: '📱 الأجهزة' },
              { id: 'analytics', name: '📊 التحليلات' },
              { id: 'speed-control', name: '⚡ السرعة' },
              { id: 'priority-qos', name: '🎯 الأولوية' },
              { id: 'access-control', name: '⏸️ الحظر' },
              { id: 'schedules', name: '⏰ الجداول' },
              { id: 'rules', name: '🤖 القواعد' },
              { id: 'wifi-info', name: '📡 الواي فاي' },
              { id: 'security', name: '🛡️ الأمان' }
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => {
                  setCurrentView(nav.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-right text-xs font-bold transition-all ${
                  currentView === nav.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900/60 text-slate-300 border border-slate-800'
                }`}
              >
                {nav.name}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>الوضع النشط: {activeProfile.nameAr}</span>
            <button onClick={logout} className="text-rose-400 flex items-center gap-1 font-bold">
              <Lock className="w-3.5 h-3.5" /> تسجيل خروج
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
