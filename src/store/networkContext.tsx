import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Device,
  DeviceGroup,
  ScheduleRule,
  SmartRule,
  PresetProfile,
  ActivityLog,
  SecurityAlert,
  TrafficPoint,
  WifiDetails,
  NetworkHealthMetrics,
  PriorityLevel
} from '../types';
import {
  INITIAL_DEVICES,
  INITIAL_GROUPS,
  INITIAL_SCHEDULES,
  INITIAL_SMART_RULES,
  INITIAL_PROFILES,
  INITIAL_LOGS,
  INITIAL_SECURITY_ALERTS,
  PROTOCOL_ACTIVITIES,
  WIFI_DETAILS,
  NETWORK_HEALTH
} from '../mock/mockData';

interface NetworkContextType {
  // Navigation & View
  currentView: string;
  setCurrentView: (view: string) => void;

  // Security Auth
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  authenticate: (pin: string) => boolean;
  logout: () => void;

  // Devices State & Actions
  devices: Device[];
  selectedDevice: Device | null;
  setSelectedDevice: (device: Device | null) => void;
  togglePauseDevice: (id: string) => void;
  toggleBlockDevice: (id: string) => void;
  setDeviceSpeedLimit: (id: string, downMbps: number, upMbps: number) => void;
  setDevicePriority: (id: string, priority: PriorityLevel) => void;
  trustDevice: (id: string) => void;
  renameDevice: (id: string, newName: string) => void;
  deleteDevice: (id: string) => void;

  // Groups State & Actions
  groups: DeviceGroup[];
  toggleGroupPause: (id: string) => void;
  setGroupPriority: (id: string, priority: PriorityLevel) => void;

  // Schedules State & Actions
  schedules: ScheduleRule[];
  toggleSchedule: (id: string) => void;
  addSchedule: (rule: Omit<ScheduleRule, 'id'>) => void;
  deleteSchedule: (id: string) => void;

  // Rules State & Actions
  rules: SmartRule[];
  toggleRule: (id: string) => void;
  addRule: (rule: Omit<SmartRule, 'id'>) => void;
  deleteRule: (id: string) => void;

  // Profiles State & Actions
  profiles: PresetProfile[];
  activateProfile: (id: string) => void;

  // Live Metrics & Charts
  liveTrafficHistory: TrafficPoint[];
  currentTotalDownloadMbps: number;
  currentTotalUploadMbps: number;
  todayTotalTrafficGB: number;
  wifi: WifiDetails;
  health: NetworkHealthMetrics;

  // Logs & Security Alerts
  logs: ActivityLog[];
  securityAlerts: SecurityAlert[];
  resolveAlert: (id: string) => void;
  addLogMessage: (message: string, severity?: ActivityLog['severity'], type?: ActivityLog['type']) => void;

  // Local Agent Status
  agentStatus: {
    online: boolean;
    ip: string;
    version: string;
    lastPing: string;
    mode: 'Active Real-time Simulation & Router API Interface';
  };

  // Search & Filter Helper
  deviceSearchQuery: string;
  setDeviceSearchQuery: (query: string) => void;
  deviceFilterType: string;
  setDeviceFilterType: (filter: string) => void;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<string>('overview');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [groups, setGroups] = useState<DeviceGroup[]>(INITIAL_GROUPS);
  const [schedules, setSchedules] = useState<ScheduleRule[]>(INITIAL_SCHEDULES);
  const [rules, setRules] = useState<SmartRule[]>(INITIAL_SMART_RULES);
  const [profiles, setProfiles] = useState<PresetProfile[]>(INITIAL_PROFILES);
  const [logs, setLogs] = useState<ActivityLog[]>(INITIAL_LOGS);
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>(INITIAL_SECURITY_ALERTS);

  const [deviceSearchQuery, setDeviceSearchQuery] = useState<string>('');
  const [deviceFilterType, setDeviceFilterType] = useState<string>('all');

  const [wifi] = useState<WifiDetails>(WIFI_DETAILS);
  const [health] = useState<NetworkHealthMetrics>(NETWORK_HEALTH);

  // Live traffic history array
  const [liveTrafficHistory, setLiveTrafficHistory] = useState<TrafficPoint[]>(() => {
    const initial: TrafficPoint[] = [];
    const now = new Date();
    for (let i = 15; i >= 0; i--) {
      const t = new Date(now.getTime() - i * 3000);
      const timeStr = t.toTimeString().split(' ')[0];
      initial.push({
        time: timeStr,
        download: parseFloat((35 + Math.sin(i) * 12).toFixed(1)),
        upload: parseFloat((6 + Math.cos(i) * 2).toFixed(1))
      });
    }
    return initial;
  });

  const [currentTotalDownloadMbps, setCurrentTotalDownloadMbps] = useState<number>(47.2);
  const [currentTotalUploadMbps, setCurrentTotalUploadMbps] = useState<number>(8.4);
  const [todayTotalTrafficGB, setTodayTotalTrafficGB] = useState<number>(18.7);

  // Local Agent Mock State
  const agentStatus = {
    online: true,
    ip: '192.168.1.2',
    version: 'NEXUS-Agent v2.4.0',
    lastPing: 'منذ ثانية واحدة',
    mode: 'Active Real-time Simulation & Router API Interface' as const
  };

  // Helper to add logs easily
  const addLogMessage = (
    message: string,
    severity: ActivityLog['severity'] = 'info',
    type: ActivityLog['type'] = 'speed_changed'
  ) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const newLog: ActivityLog = {
      id: 'log-' + Date.now(),
      timestamp: timeStr,
      type,
      message,
      severity
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  // Fetch Real Devices from NEXUS Local Network Agent if available
  useEffect(() => {
    const fetchRealDevices = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/devices');
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.devices) && data.devices.length > 0) {
            setDevices(data.devices);
            addLogMessage(`تم الربط بالوكيل المحلي بنجاح واكتشاف ${data.devices.length} أجهزة حقيقية على الشبكة`, 'success', 'device_detected');
          }
        }
      } catch (err) {
        // Agent server not running yet, using initial/simulated devices list
      }
    };

    fetchRealDevices();
    const agentInterval = setInterval(fetchRealDevices, 10000);
    return () => clearInterval(agentInterval);
  }, []);

  // Real-time Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate total speed across all online, non-paused, non-blocked devices
      let totalDown = 0;
      let totalUp = 0;

      setDevices((prevDevices) =>
        prevDevices.map((dev) => {
          if (dev.status !== 'online' || dev.isBlocked || dev.isPaused) {
            return { ...dev, currentSpeedDownMbps: 0, currentSpeedUpMbps: 0 };
          }

          // Random speed variance based on device priority & limits
          let baseDown = dev.priority === 'HIGH' ? 25 : dev.priority === 'NORMAL' ? 10 : 2;
          let baseUp = dev.priority === 'HIGH' ? 4 : dev.priority === 'NORMAL' ? 2 : 0.5;

          // Apply jitter
          let randomDown = Math.max(0.1, baseDown + (Math.random() * 8 - 4));
          let randomUp = Math.max(0.1, baseUp + (Math.random() * 2 - 1));

          // Enforce max limits if set
          if (dev.maxDownloadLimitMbps > 0) {
            randomDown = Math.min(randomDown, dev.maxDownloadLimitMbps);
          }
          if (dev.maxUploadLimitMbps > 0) {
            randomUp = Math.min(randomUp, dev.maxUploadLimitMbps);
          }

          randomDown = parseFloat(randomDown.toFixed(1));
          randomUp = parseFloat(randomUp.toFixed(1));

          totalDown += randomDown;
          totalUp += randomUp;

          return {
            ...dev,
            currentSpeedDownMbps: randomDown,
            currentSpeedUpMbps: randomUp
          };
        })
      );

      const roundedDown = parseFloat(totalDown.toFixed(1));
      const roundedUp = parseFloat(totalUp.toFixed(1));
      setCurrentTotalDownloadMbps(roundedDown);
      setCurrentTotalUploadMbps(roundedUp);

      // Increment today total data slowly
      setTodayTotalTrafficGB((prev) => parseFloat((prev + (roundedDown / 8000)).toFixed(3)));

      // Push to chart
      const nowStr = new Date().toTimeString().split(' ')[0];
      setLiveTrafficHistory((prev) => [
        ...prev.slice(1),
        { time: nowStr, download: roundedDown, upload: roundedUp }
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Device Action Methods
  const togglePauseDevice = (id: string) => {
    setDevices((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const nextState = !d.isPaused;
          addLogMessage(
            `${d.name} → تم ${nextState ? 'إيقاف (Pause)' : 'استئناف'} اتصال الإنترنت`,
            nextState ? 'warning' : 'info',
            'paused'
          );
          return { ...d, isPaused: nextState };
        }
        return d;
      })
    );
  };

  const toggleBlockDevice = (id: string) => {
    setDevices((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const nextState = !d.isBlocked;
          addLogMessage(
            `${d.name} → تم ${nextState ? 'حظر (Block)' : 'إلغاء حظر'} الجهاز من الراوتر`,
            nextState ? 'critical' : 'success',
            'blocked'
          );
          return { ...d, isBlocked: nextState, status: nextState ? 'blocked' : 'online' };
        }
        return d;
      })
    );
  };

  const setDeviceSpeedLimit = (id: string, downMbps: number, upMbps: number) => {
    setDevices((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          addLogMessage(
            `${d.name} → تم تعديل حدود السرعة (التحميل: ${downMbps || 'مفتوح'} Mbps, الرفع: ${upMbps || 'مفتوح'} Mbps)`,
            'info',
            'speed_changed'
          );
          return {
            ...d,
            maxDownloadLimitMbps: downMbps,
            maxUploadLimitMbps: upMbps
          };
        }
        return d;
      })
    );
  };

  const setDevicePriority = (id: string, priority: PriorityLevel) => {
    setDevices((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          addLogMessage(`${d.name} → تم تغيير أولوية QoS إلى ${priority}`, 'info', 'speed_changed');
          return { ...d, priority };
        }
        return d;
      })
    );
  };

  const trustDevice = (id: string) => {
    setDevices((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          addLogMessage(`تم اعتماد جهاز جديد وتوثيقه: ${d.name} (${d.ip})`, 'success', 'device_detected');
          return { ...d, isTrusted: true };
        }
        return d;
      })
    );
    // Resolve alert if matched
    setSecurityAlerts((prev) => prev.map((a) => (a.id === 'sec-1' ? { ...a, status: 'resolved' } : a)));
  };

  const renameDevice = (id: string, newName: string) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, name: newName } : d))
    );
  };

  const deleteDevice = (id: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
    addLogMessage(`تم حذف الجهاز من قائمة المراقبة`, 'warning');
  };

  // Group Actions
  const toggleGroupPause = (groupId: string) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          const nextState = !g.isPaused;
          // Apply to all devices in group
          setDevices((dList) =>
            dList.map((d) => (d.groupId === groupId ? { ...d, isPaused: nextState } : d))
          );
          addLogMessage(`المجموعة ${g.name} → تم ${nextState ? 'إيقاف' : 'تشغيل'} جميع أجهزتها`, 'warning', 'paused');
          return { ...g, isPaused: nextState };
        }
        return g;
      })
    );
  };

  const setGroupPriority = (groupId: string, priority: PriorityLevel) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          setDevices((dList) =>
            dList.map((d) => (d.groupId === groupId ? { ...d, priority } : d))
          );
          addLogMessage(`المجموعة ${g.name} → تم تطبيق أولوية ${priority} على كافة الأجهزة`, 'info');
          return { ...g, priority };
        }
        return g;
      })
    );
  };

  // Schedule Actions
  const toggleSchedule = (id: string) => {
    setSchedules((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextState = !s.active;
          addLogMessage(`الجدول الزمني "${s.title}" → تم ${nextState ? 'تفعيل' : 'تعطيل'} Rule`, 'info');
          return { ...s, active: nextState };
        }
        return s;
      })
    );
  };

  const addSchedule = (rule: Omit<ScheduleRule, 'id'>) => {
    const newSch: ScheduleRule = {
      ...rule,
      id: 'sch-' + Date.now()
    };
    setSchedules((prev) => [...prev, newSch]);
    addLogMessage(`تم إضافة جدول زمني جديد: ${newSch.title}`, 'success');
  };

  const deleteSchedule = (id: string) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  // Smart Rules Actions
  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextState = !r.enabled;
          addLogMessage(`القاعدة الذكية "${r.name}" → تم ${nextState ? 'تمكين' : 'إيقاف'}`, 'info', 'rule_triggered');
          return { ...r, enabled: nextState };
        }
        return r;
      })
    );
  };

  const addRule = (rule: Omit<SmartRule, 'id'>) => {
    const newRule: SmartRule = {
      ...rule,
      id: 'rule-' + Date.now()
    };
    setRules((prev) => [...prev, newRule]);
    addLogMessage(`تم إنشاء قاعدة ذكية جديدة: ${newRule.name}`, 'success', 'rule_triggered');
  };

  const deleteRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  // Preset Profiles Actions
  const activateProfile = (profileId: string) => {
    setProfiles((prev) =>
      prev.map((p) => {
        const isTarget = p.id === profileId;
        if (isTarget) {
          addLogMessage(`تم تفعيل البروفايل: "${p.nameAr}"`, 'success', 'profile_activated');
        }
        return { ...p, active: isTarget };
      })
    );

    const targetProf = profiles.find((p) => p.id === profileId);
    if (targetProf) {
      setDevices((prevDevices) =>
        prevDevices.map((d) => {
          if (d.groupId === 'grp-gaming') {
            return { ...d, priority: targetProf.rules.gamingPriority };
          }
          if (d.groupId === 'grp-work') {
            return { ...d, priority: targetProf.rules.workPriority };
          }
          if (d.groupId === 'grp-smarthome') {
            return { ...d, priority: targetProf.rules.tvPriority };
          }
          if (d.id === 'dev-7') {
            return {
              ...d,
              isBlocked: targetProf.rules.guestAccess === 'BLOCK',
              status: targetProf.rules.guestAccess === 'BLOCK' ? 'blocked' : d.status
            };
          }
          return d;
        })
      );
    }
  };

  // Security alert action
  const resolveAlert = (id: string) => {
    setSecurityAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'resolved' } : a))
    );
    addLogMessage(`تم حل التنبيه الأمني وتوثيقه`, 'info');
  };

  // Auth lock simulation
  const authenticate = (pin: string) => {
    if (pin === '1234' || pin === 'admin') {
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAuthModalOpen(true);
  };

  return (
    <NetworkContext.Provider
      value={{
        currentView,
        setCurrentView,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAuthenticated,
        authenticate,
        logout,
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
        groups,
        toggleGroupPause,
        setGroupPriority,
        schedules,
        toggleSchedule,
        addSchedule,
        deleteSchedule,
        rules,
        toggleRule,
        addRule,
        deleteRule,
        profiles,
        activateProfile,
        liveTrafficHistory,
        currentTotalDownloadMbps,
        currentTotalUploadMbps,
        todayTotalTrafficGB,
        wifi,
        health,
        logs,
        securityAlerts,
        resolveAlert,
        addLogMessage,
        agentStatus,
        deviceSearchQuery,
        setDeviceSearchQuery,
        deviceFilterType,
        setDeviceFilterType
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};
