import { Device, DeviceGroup, ScheduleRule, SmartRule, PresetProfile, ActivityLog, SecurityAlert, ProtocolActivity, WifiDetails, NetworkHealthMetrics } from '../types';

export const INITIAL_DEVICES: Device[] = [
  {
    id: 'dev-1',
    name: 'Gaming PC',
    type: 'computer',
    ip: '192.168.1.11',
    mac: '70:85:C2:A1:99:E4',
    hostname: 'Gaming-PC-Win11',
    status: 'online',
    todayDownloadGB: 6.8,
    todayUploadGB: 1.2,
    currentSpeedDownMbps: 42.5,
    currentSpeedUpMbps: 5.2,
    latencyMs: 21,
    priority: 'HIGH',
    isBlocked: false,
    isPaused: false,
    groupId: 'grp-gaming',
    maxDownloadLimitMbps: 0,
    maxUploadLimitMbps: 0,
    firstSeen: '2026-01-15 08:30',
    vendor: 'ASUSTeK Computer',
    signalStrengthDbm: -45,
    isTrusted: true
  },
  {
    id: 'dev-2',
    name: 'iPhone 15 Pro (Yusuf)',
    type: 'phone',
    ip: '192.168.1.10',
    mac: 'BC:D1:D3:44:E2:10',
    hostname: 'Yusuf-iPhone',
    status: 'online',
    todayDownloadGB: 2.4,
    todayUploadGB: 0.4,
    currentSpeedDownMbps: 12.1,
    currentSpeedUpMbps: 1.8,
    latencyMs: 26,
    priority: 'NORMAL',
    isBlocked: false,
    isPaused: false,
    groupId: 'grp-personal',
    maxDownloadLimitMbps: 50,
    maxUploadLimitMbps: 10,
    firstSeen: '2026-02-01 10:12',
    vendor: 'Apple Inc.',
    signalStrengthDbm: -52,
    isTrusted: true
  },
  {
    id: 'dev-3',
    name: 'PlayStation 5',
    type: 'console',
    ip: '192.168.1.14',
    mac: '00:D8:61:9F:88:1C',
    hostname: 'PS5-LivingRoom',
    status: 'online',
    todayDownloadGB: 4.2,
    todayUploadGB: 0.6,
    currentSpeedDownMbps: 28.4,
    currentSpeedUpMbps: 3.1,
    latencyMs: 19,
    priority: 'HIGH',
    isBlocked: false,
    isPaused: false,
    groupId: 'grp-gaming',
    maxDownloadLimitMbps: 0,
    maxUploadLimitMbps: 0,
    firstSeen: '2026-01-20 14:00',
    vendor: 'Sony Interactive Ent.',
    signalStrengthDbm: -40,
    isTrusted: true
  },
  {
    id: 'dev-4',
    name: 'Smart TV 65"',
    type: 'tv',
    ip: '192.168.1.12',
    mac: 'A4:77:33:1B:5C:88',
    hostname: 'LG-OLED-TV',
    status: 'offline',
    todayDownloadGB: 3.1,
    todayUploadGB: 0.2,
    currentSpeedDownMbps: 0,
    currentSpeedUpMbps: 0,
    latencyMs: 34,
    priority: 'LOW',
    isBlocked: false,
    isPaused: false,
    groupId: 'grp-smarthome',
    maxDownloadLimitMbps: 25,
    maxUploadLimitMbps: 5,
    firstSeen: '2026-01-10 19:45',
    vendor: 'LG Electronics',
    signalStrengthDbm: -68,
    isTrusted: true
  },
  {
    id: 'dev-5',
    name: 'Work Laptop',
    type: 'computer',
    ip: '192.168.1.13',
    mac: 'E4:A4:71:00:82:FF',
    hostname: 'Workstation-ThinkPad',
    status: 'online',
    todayDownloadGB: 1.8,
    todayUploadGB: 0.9,
    currentSpeedDownMbps: 8.5,
    currentSpeedUpMbps: 4.2,
    latencyMs: 23,
    priority: 'HIGH',
    isBlocked: false,
    isPaused: false,
    groupId: 'grp-work',
    maxDownloadLimitMbps: 0,
    maxUploadLimitMbps: 0,
    firstSeen: '2026-03-01 09:00',
    vendor: 'Lenovo',
    signalStrengthDbm: -55,
    isTrusted: true
  },
  {
    id: 'dev-6',
    name: 'Smart Thermostat & Hub',
    type: 'iot',
    ip: '192.168.1.22',
    mac: '90:FD:9B:45:11:AA',
    hostname: 'Nest-Hub-Gen2',
    status: 'online',
    todayDownloadGB: 0.12,
    todayUploadGB: 0.05,
    currentSpeedDownMbps: 0.2,
    currentSpeedUpMbps: 0.1,
    latencyMs: 45,
    priority: 'LOW',
    isBlocked: false,
    isPaused: false,
    groupId: 'grp-smarthome',
    maxDownloadLimitMbps: 5,
    maxUploadLimitMbps: 1,
    firstSeen: '2026-01-05 12:00',
    vendor: 'Google LLC',
    signalStrengthDbm: -72,
    isTrusted: true
  },
  {
    id: 'dev-7',
    name: 'Unknown Device (Suspect)',
    type: 'unknown',
    ip: '192.168.1.27',
    mac: 'DA:11:89:C4:EE:99',
    hostname: 'ESP32-Client-27',
    status: 'online',
    todayDownloadGB: 0.45,
    todayUploadGB: 0.15,
    currentSpeedDownMbps: 1.1,
    currentSpeedUpMbps: 0.4,
    latencyMs: 88,
    priority: 'LOW',
    isBlocked: false,
    isPaused: false,
    maxDownloadLimitMbps: 1,
    maxUploadLimitMbps: 1,
    firstSeen: '2026-08-01 23:14',
    vendor: 'Espressif Inc.',
    signalStrengthDbm: -81,
    isTrusted: false
  }
];

export const INITIAL_GROUPS: DeviceGroup[] = [
  {
    id: 'grp-gaming',
    name: '🎮 Gaming & Consoles',
    icon: 'Gamepad2',
    deviceIds: ['dev-1', 'dev-3'],
    description: 'الأجهزة المخصصة للألعاب والـLatency المنخفض',
    isPaused: false,
    priority: 'HIGH'
  },
  {
    id: 'grp-work',
    name: '💻 Work & Productivity',
    icon: 'Briefcase',
    deviceIds: ['dev-5'],
    description: 'أجهزة العمل واجتماعات الفيديو والرفع',
    isPaused: false,
    priority: 'HIGH'
  },
  {
    id: 'grp-personal',
    name: '📱 Personal Devices',
    icon: 'Smartphone',
    deviceIds: ['dev-2'],
    description: 'الهواتف والأجهزة اللوحية الشخصية',
    isPaused: false,
    priority: 'NORMAL'
  },
  {
    id: 'grp-smarthome',
    name: '🏠 Smart Home & IoT',
    icon: 'Home',
    deviceIds: ['dev-4', 'dev-6'],
    description: 'التلفزيونات الذكية والحساسات والكاميرات',
    isPaused: false,
    priority: 'LOW'
  }
];

export const INITIAL_SCHEDULES: ScheduleRule[] = [
  {
    id: 'sch-1',
    title: 'PlayStation Weekend & Evening',
    targetType: 'device',
    targetId: 'dev-3',
    targetName: 'PlayStation 5',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    startTime: '18:00',
    endTime: '22:00',
    action: 'ALLOW',
    active: true
  },
  {
    id: 'sch-2',
    title: 'Night Mode Block (Guest & TV)',
    targetType: 'group',
    targetId: 'grp-smarthome',
    targetName: 'Smart Home & TV',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    startTime: '23:00',
    endTime: '07:00',
    action: 'BLOCK',
    active: true
  }
];

export const INITIAL_SMART_RULES: SmartRule[] = [
  {
    id: 'rule-1',
    name: 'Gaming PC High Priority Evening',
    condition: {
      deviceId: 'dev-1',
      deviceName: 'Gaming PC',
      timeStart: '18:00',
      timeEnd: '23:00'
    },
    action: {
      priority: 'HIGH',
      speedLimitMbps: 100,
      internetAccess: 'ALLOW',
      notification: true
    },
    enabled: true
  },
  {
    id: 'rule-2',
    name: 'Auto-Block New Unknown Devices',
    condition: {
      triggerOnNewDevice: true
    },
    action: {
      internetAccess: 'BLOCK',
      notification: true
    },
    enabled: true
  },
  {
    id: 'rule-3',
    name: 'Heavy Data Cap Throttle (10 GB)',
    condition: {
      trafficThresholdGB: 10
    },
    action: {
      speedLimitMbps: 5,
      notification: true
    },
    enabled: true
  }
];

export const INITIAL_PROFILES: PresetProfile[] = [
  {
    id: 'prof-gaming',
    name: 'Gaming Mode',
    nameAr: '🎮 وضع الألعاب الاحترافي',
    icon: 'Gamepad2',
    description: 'أولوية قصوى لأجهزة Gaming PC و PS5 وتقليل الـPing إلى الأدنى',
    active: false,
    rules: {
      gamingPriority: 'HIGH',
      workPriority: 'NORMAL',
      tvPriority: 'LOW',
      guestAccess: 'LIMIT'
    }
  },
  {
    id: 'prof-work',
    name: 'Work Mode',
    nameAr: '💻 وضع العمل المكثف',
    icon: 'Briefcase',
    description: 'تخصيص أفضل سرعة وأولوية لأجهزة العمل وتحديد سرعة الترفيه',
    active: false,
    rules: {
      gamingPriority: 'NORMAL',
      workPriority: 'HIGH',
      tvPriority: 'LOW',
      guestAccess: 'LIMIT'
    }
  },
  {
    id: 'prof-night',
    name: 'Night Mode',
    nameAr: '🌙 وضع الهدوء الليلي',
    icon: 'Moon',
    description: 'حظر أجهزة الضيوف والشاشات وتطبيق وضع استهلاك الطاقة المنخفض',
    active: false,
    rules: {
      gamingPriority: 'LOW',
      workPriority: 'LOW',
      tvPriority: 'LOW',
      guestAccess: 'BLOCK'
    }
  },
  {
    id: 'prof-default',
    name: 'Balanced Mode',
    nameAr: '⚡ الوضع المتوازن القياسي',
    icon: 'Zap',
    description: 'توزيع النطاق العريض بشكل عادل وحسابي بين كافة الأجهزة',
    active: true,
    rules: {
      gamingPriority: 'HIGH',
      workPriority: 'HIGH',
      tvPriority: 'LOW',
      guestAccess: 'ALLOW'
    }
  }
];

export const INITIAL_LOGS: ActivityLog[] = [
  {
    id: 'log-1',
    timestamp: '23:14:02',
    type: 'device_detected',
    message: '🚨 جهاز جديد غريب ظهر على الشبكة (192.168.1.27 - MAC: DA:11:89:C4:EE:99)',
    severity: 'warning'
  },
  {
    id: 'log-2',
    timestamp: '22:51:10',
    type: 'speed_changed',
    message: 'Gaming PC → تم رفع حد السرعة من 20 Mbps إلى 50 Mbps',
    severity: 'info'
  },
  {
    id: 'log-3',
    timestamp: '21:32:00',
    type: 'paused',
    message: 'PlayStation 5 → تم إيقاف الإنترنت مؤقتًا وفق الجدول الزمني',
    severity: 'info'
  },
  {
    id: 'log-4',
    timestamp: '20:10:45',
    type: 'profile_activated',
    message: 'تم تفعيل "الوضع المتوازن القياسي" بنجاح',
    severity: 'success'
  }
];

export const INITIAL_SECURITY_ALERTS: SecurityAlert[] = [
  {
    id: 'sec-1',
    timestamp: '23:14:02',
    title: 'جهاز غير معروف متصل بالشبكة',
    description: 'تم رصد جهاز بعنون IP 192.168.1.27 لم يتم التحقق منه سابـقًا.',
    level: 'high',
    status: 'active'
  },
  {
    id: 'sec-2',
    timestamp: '19:40:12',
    title: 'استهلاك شبكي مكثف مفاجئ',
    description: 'Gaming PC تجاوز معدل الرفع الطبيعي بمقدار 450MB/min.',
    level: 'medium',
    status: 'resolved'
  }
];

export const PROTOCOL_ACTIVITIES: ProtocolActivity[] = [
  { id: 'p1', name: 'YouTube & Video', category: 'Streaming', bytesGB: 3.2, percentage: 23, color: '#EF4444' },
  { id: 'p2', name: 'Steam / Xbox / Gaming', category: 'Gaming', bytesGB: 2.7, percentage: 20, color: '#8B5CF6' },
  { id: 'p3', name: 'Google Services & Cloud', category: 'Web/Services', bytesGB: 1.1, percentage: 8, color: '#3B82F6' },
  { id: 'p4', name: 'Instagram & TikTok', category: 'Social', bytesGB: 0.82, percentage: 6, color: '#EC4899' },
  { id: 'p5', name: 'Discord Voice & Video', category: 'Social', bytesGB: 0.41, percentage: 3, color: '#6366F1' },
  { id: 'p6', name: 'Encrypted Traffic (HTTPS/SSL/TLS)', category: 'Encrypted/Other', bytesGB: 5.47, percentage: 40, color: '#00F0FF' },
];

export const WIFI_DETAILS: WifiDetails = {
  ssid: 'NEXUS_5G_ULTRA',
  channel: 36,
  frequency: '5 GHz',
  signalQuality: 96,
  connectedClients: 7,
  lanIp: '192.168.1.1',
  lanSubnet: '255.255.255.0',
  wanIp: '156.204.88.192',
  gatewayIp: '192.168.1.1',
  uptime: '14 أيام ، 08 ساعات ، 22 دقيقة'
};

export const NETWORK_HEALTH: NetworkHealthMetrics = {
  overallScore: 94,
  internetStatus: 'Excellent',
  routerStatus: 'Healthy',
  latencyMs: 21,
  packetLossPercent: 0,
  dnsStatus: 'Healthy'
};
