export default function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const cloudDevices = [
    {
      id: 'cloud-dev-1',
      name: 'Gaming PC (Main)',
      type: 'computer',
      ip: '192.168.1.11',
      mac: '70:85:C2:A1:99:E4',
      hostname: 'Gaming-PC-Win11',
      status: 'online',
      todayDownloadGB: parseFloat((Math.random() * 2 + 5.5).toFixed(2)),
      todayUploadGB: parseFloat((Math.random() * 0.5 + 1.0).toFixed(2)),
      currentSpeedDownMbps: parseFloat((Math.random() * 20 + 25.0).toFixed(1)),
      currentSpeedUpMbps: parseFloat((Math.random() * 3 + 4.0).toFixed(1)),
      latencyMs: Math.floor(Math.random() * 5 + 18),
      priority: 'HIGH',
      isBlocked: false,
      isPaused: false,
      maxDownloadLimitMbps: 0,
      maxUploadLimitMbps: 0,
      firstSeen: '2026-01-15 08:30',
      vendor: 'ASUSTeK Computer',
      isTrusted: true
    },
    {
      id: 'cloud-dev-2',
      name: 'iPhone 15 Pro (Yusuf)',
      type: 'phone',
      ip: '192.168.1.10',
      mac: 'BC:D1:D3:44:E2:10',
      hostname: 'Yusuf-iPhone',
      status: 'online',
      todayDownloadGB: parseFloat((Math.random() * 1 + 2.0).toFixed(2)),
      todayUploadGB: parseFloat((Math.random() * 0.2 + 0.3).toFixed(2)),
      currentSpeedDownMbps: parseFloat((Math.random() * 10 + 5.0).toFixed(1)),
      currentSpeedUpMbps: parseFloat((Math.random() * 1.5 + 1.0).toFixed(1)),
      latencyMs: Math.floor(Math.random() * 6 + 22),
      priority: 'NORMAL',
      isBlocked: false,
      isPaused: false,
      maxDownloadLimitMbps: 50,
      maxUploadLimitMbps: 10,
      firstSeen: '2026-02-01 10:12',
      vendor: 'Apple Inc.',
      isTrusted: true
    },
    {
      id: 'cloud-dev-3',
      name: 'PlayStation 5',
      type: 'console',
      ip: '192.168.1.14',
      mac: '00:D8:61:9F:88:1C',
      hostname: 'PS5-LivingRoom',
      status: 'online',
      todayDownloadGB: parseFloat((Math.random() * 2 + 3.5).toFixed(2)),
      todayUploadGB: parseFloat((Math.random() * 0.4 + 0.5).toFixed(2)),
      currentSpeedDownMbps: parseFloat((Math.random() * 15 + 15.0).toFixed(1)),
      currentSpeedUpMbps: parseFloat((Math.random() * 2 + 2.0).toFixed(1)),
      latencyMs: Math.floor(Math.random() * 4 + 17),
      priority: 'HIGH',
      isBlocked: false,
      isPaused: false,
      maxDownloadLimitMbps: 0,
      maxUploadLimitMbps: 0,
      firstSeen: '2026-01-20 14:00',
      vendor: 'Sony Interactive Ent.',
      isTrusted: true
    },
    {
      id: 'cloud-dev-4',
      name: 'Smart TV 65"',
      type: 'tv',
      ip: '192.168.1.12',
      mac: 'A4:77:33:1B:5C:88',
      hostname: 'LG-OLED-TV',
      status: 'online',
      todayDownloadGB: parseFloat((Math.random() * 1 + 3.0).toFixed(2)),
      todayUploadGB: 0.2,
      currentSpeedDownMbps: parseFloat((Math.random() * 8 + 8.0).toFixed(1)),
      currentSpeedUpMbps: 0.4,
      latencyMs: 32,
      priority: 'LOW',
      isBlocked: false,
      isPaused: false,
      maxDownloadLimitMbps: 25,
      maxUploadLimitMbps: 5,
      firstSeen: '2026-01-10 19:45',
      vendor: 'LG Electronics',
      isTrusted: true
    },
    {
      id: 'cloud-dev-5',
      name: 'Work Laptop',
      type: 'computer',
      ip: '192.168.1.13',
      mac: 'E4:A4:71:00:82:FF',
      hostname: 'Workstation-ThinkPad',
      status: 'online',
      todayDownloadGB: 1.8,
      todayUploadGB: 0.9,
      currentSpeedDownMbps: parseFloat((Math.random() * 6 + 4.0).toFixed(1)),
      currentSpeedUpMbps: 3.2,
      latencyMs: 22,
      priority: 'HIGH',
      isBlocked: false,
      isPaused: false,
      maxDownloadLimitMbps: 0,
      maxUploadLimitMbps: 0,
      firstSeen: '2026-03-01 09:00',
      vendor: 'Lenovo',
      isTrusted: true
    }
  ];

  return res.status(200).json({
    success: true,
    cloudMode: true,
    count: cloudDevices.length,
    devices: cloudDevices
  });
}
