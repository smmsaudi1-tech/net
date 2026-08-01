import React from 'react';
import { useNetwork } from '../../store/networkContext';
import {
  LayoutDashboard,
  Smartphone,
  BarChart3,
  Sliders,
  Bot,
  Wifi,
  ShieldAlert,
  Settings,
  Activity,
  Zap,
  Clock,
  Gauge,
  Layers,
  Award,
  Flame,
  HeartPulse,
  FileText,
  Lock,
  Cpu,
  AlertTriangle,
  Radio
} from 'lucide-react';

interface NavItem {
  id: string;
  title: string;
  icon: React.ElementType;
  badge?: number | string;
  badgeColor?: string;
}

interface NavCategory {
  category: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, devices, securityAlerts, agentStatus, logout } = useNetwork();

  const onlineCount = devices.filter((d) => d.status === 'online').length;
  const activeAlerts = securityAlerts.filter((a) => a.status === 'active').length;
  const unknownCount = devices.filter((d) => !d.isTrusted).length;

  const navCategories: NavCategory[] = [
    {
      category: 'النظام والتحكم الرئيسية',
      items: [
        { id: 'overview', title: '🏠 الصفحة الرئيسية', icon: LayoutDashboard },
        { id: 'devices', title: '📱 الأجهزة والبروفايلات', icon: Smartphone, badge: onlineCount, badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' }
      ]
    },
    {
      category: 'التحليلات وحركة البيانات',
      items: [
        { id: 'analytics', title: '📊 تحليلات Traffic', icon: BarChart3 },
        { id: 'activity', title: '🌐 نشاط الخدمات', icon: Activity },
        { id: 'bandwidth', title: '📈 Bandwidth Live', icon: Gauge },
        { id: 'top-consumers', title: '🏆 أعلى الاستهلاكات', icon: Award }
      ]
    },
    {
      category: 'إدارة السرعة والوصول',
      items: [
        { id: 'speed-control', title: '⚡ التحكم بالسرعة', icon: Sliders },
        { id: 'priority-qos', title: '🎯 نظام الأولوية (QoS)', icon: Flame },
        { id: 'access-control', title: '⏸️ إدارة الاتصال والحظر', icon: Lock },
        { id: 'schedules', title: '⏰ الجداول الزمنية', icon: Clock }
      ]
    },
    {
      category: 'الأتمتة والقواعد الذكية',
      items: [
        { id: 'rules', title: '🤖 المحرك الذكي (Rules)', icon: Bot },
        { id: 'profiles', title: '🧩 الأوضاع الجاهزة', icon: Zap },
        { id: 'groups', title: '👥 مجموعات الأجهزة', icon: Layers }
      ]
    },
    {
      category: 'حالة الشبكة والواي فاي',
      items: [
        { id: 'wifi-info', title: '📡 معلومات الـ Wi-Fi', icon: Wifi },
        { id: 'network-health', title: '🩺 صحة الشبكة', icon: HeartPulse, badge: '94%', badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' }
      ]
    },
    {
      category: 'الأمان والحماية',
      items: [
        { id: 'security', title: '🛡️ مركز الأمان', icon: ShieldAlert, badge: activeAlerts > 0 ? activeAlerts : undefined, badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30 font-bold' },
        { id: 'activity-log', title: '📜 سجل الأنشطة (Logs)', icon: FileText }
      ]
    },
    {
      category: 'الإعدادات والوكيل',
      items: [
        { id: 'settings', title: '⚙️ الإعدادات والوكيل', icon: Settings }
      ]
    }
  ];

  return (
    <aside className="w-72 bg-[#0b0f19]/90 backdrop-blur-xl border-l border-slate-800/80 h-screen sticky top-0 flex flex-col justify-between z-30 select-none overflow-y-auto hidden lg:flex">
      {/* Top Header Logo */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-[#00F0FF] p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
            <Radio className="w-6 h-6 text-cyan-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 font-mono">
              NEXUS
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">Personal Control Center</p>
          </div>
        </div>

        {unknownCount > 0 && (
          <span
            title="أجهزة جديدة غير موثقة"
            className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse"
          >
            <AlertTriangle className="w-3 h-3" />
            {unknownCount}
          </span>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 py-4 px-3 space-y-6 overflow-y-auto">
        {navCategories.map((cat, idx) => (
          <div key={idx} className="space-y-1.5">
            <h3 className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {cat.category}
            </h3>
            {cat.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-500/5 backdrop-blur-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.title}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Network Agent Status Card */}
      <div className="p-4 border-t border-slate-800/80 bg-[#070a12]/60">
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-200">NEXUS Agent</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
              <p className="text-[10px] text-slate-400">{agentStatus.ip} • {agentStatus.version}</p>
            </div>
          </div>
          <button
            onClick={logout}
            title="قفل لوحة التحكم"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
