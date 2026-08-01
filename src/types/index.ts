export type DeviceType = 'computer' | 'phone' | 'tv' | 'console' | 'printer' | 'iot' | 'unknown';
export type DeviceStatus = 'online' | 'offline' | 'blocked';
export type PriorityLevel = 'HIGH' | 'NORMAL' | 'LOW';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  ip: string;
  mac: string;
  hostname: string;
  status: DeviceStatus;
  todayDownloadGB: number;
  todayUploadGB: number;
  currentSpeedDownMbps: number;
  currentSpeedUpMbps: number;
  latencyMs: number;
  priority: PriorityLevel;
  isBlocked: boolean;
  isPaused: boolean;
  groupId?: string;
  maxDownloadLimitMbps: number; // 0 means Unlimited
  maxUploadLimitMbps: number;   // 0 means Unlimited
  firstSeen: string;
  vendor?: string;
  signalStrengthDbm?: number;
  isTrusted?: boolean;
}

export interface TrafficPoint {
  time: string;
  download: number; // Mbps
  upload: number;   // Mbps
}

export interface HourlyTrafficPoint {
  hour: string;
  downloadGB: number;
  uploadGB: number;
}

export interface ProtocolActivity {
  id: string;
  name: string;
  category: 'Streaming' | 'Gaming' | 'Social' | 'Web/Services' | 'Encrypted/Other';
  bytesGB: number;
  percentage: number;
  color: string;
}

export interface DeviceGroup {
  id: string;
  name: string;
  icon: string;
  deviceIds: string[];
  description: string;
  isPaused: boolean;
  priority: PriorityLevel;
}

export interface ScheduleRule {
  id: string;
  title: string;
  targetType: 'device' | 'group' | 'all';
  targetId: string;
  targetName: string;
  days: string[]; // ['Mon', 'Tue', ...]
  startTime: string; // '18:00'
  endTime: string;   // '22:00'
  action: 'BLOCK' | 'PAUSE' | 'LIMIT' | 'ALLOW';
  limitSpeedMbps?: number;
  active: boolean;
}

export interface SmartRule {
  id: string;
  name: string;
  condition: {
    deviceId?: string;
    deviceName?: string;
    timeStart?: string;
    timeEnd?: string;
    trafficThresholdGB?: number;
    triggerOnNewDevice?: boolean;
  };
  action: {
    priority?: PriorityLevel;
    speedLimitMbps?: number;
    internetAccess?: 'BLOCK' | 'ALLOW' | 'PAUSE';
    notification?: boolean;
  };
  enabled: boolean;
}

export interface PresetProfile {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  description: string;
  active: boolean;
  rules: {
    gamingPriority: PriorityLevel;
    workPriority: PriorityLevel;
    tvPriority: PriorityLevel;
    guestAccess: 'ALLOW' | 'BLOCK' | 'LIMIT';
  };
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  type: 'device_detected' | 'speed_changed' | 'paused' | 'blocked' | 'rule_triggered' | 'profile_activated' | 'security_alert' | 'health_issue';
  message: string;
  severity: 'info' | 'warning' | 'critical' | 'success';
}

export interface SecurityAlert {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved';
}

export interface NetworkHealthMetrics {
  overallScore: number;
  internetStatus: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  routerStatus: 'Healthy' | 'Warning' | 'Offline';
  latencyMs: number;
  packetLossPercent: number;
  dnsStatus: 'Healthy' | 'Degraded';
}

export interface WifiDetails {
  ssid: string;
  channel: number;
  frequency: '2.4 GHz' | '5 GHz' | '6 GHz';
  signalQuality: number; // 0 - 100%
  connectedClients: number;
  lanIp: string;
  lanSubnet: string;
  wanIp: string;
  gatewayIp: string;
  uptime: string;
}
