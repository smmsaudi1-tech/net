import React from 'react';
import { NetworkProvider, useNetwork } from './store/networkContext';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { AuthModal } from './components/layout/AuthModal';

import { OverviewView } from './components/overview/OverviewView';
import { DevicesView } from './components/devices/DevicesView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { ActivityView } from './components/activity/ActivityView';
import { BandwidthMonitorView } from './components/network/BandwidthMonitorView';
import { TopConsumersView } from './components/analytics/TopConsumersView';
import { SpeedControlView } from './components/control/SpeedControlView';
import { PriorityQoSView } from './components/control/PriorityQoSView';
import { AccessControlView } from './components/control/AccessControlView';
import { SchedulesView } from './components/control/SchedulesView';
import { RulesEngineView } from './components/automation/RulesEngineView';
import { ProfilesView } from './components/automation/ProfilesView';
import { GroupsView } from './components/groups/GroupsView';
import { WifiInfoView } from './components/network/WifiInfoView';
import { NetworkHealthView } from './components/network/NetworkHealthView';
import { SecurityView } from './components/security/SecurityView';
import { ActivityLogView } from './components/security/ActivityLogView';
import { SettingsView } from './components/settings/SettingsView';

const MainContent: React.FC = () => {
  const { currentView } = useNetwork();

  const renderView = () => {
    switch (currentView) {
      case 'overview': return <OverviewView />;
      case 'devices': return <DevicesView />;
      case 'analytics': return <AnalyticsView />;
      case 'activity': return <ActivityView />;
      case 'bandwidth': return <BandwidthMonitorView />;
      case 'top-consumers': return <TopConsumersView />;
      case 'speed-control': return <SpeedControlView />;
      case 'priority-qos': return <PriorityQoSView />;
      case 'access-control': return <AccessControlView />;
      case 'schedules': return <SchedulesView />;
      case 'rules': return <RulesEngineView />;
      case 'profiles': return <ProfilesView />;
      case 'groups': return <GroupsView />;
      case 'wifi-info': return <WifiInfoView />;
      case 'network-health': return <NetworkHealthView />;
      case 'security': return <SecurityView />;
      case 'activity-log': return <ActivityLogView />;
      case 'settings': return <SettingsView />;
      default: return <OverviewView />;
    }
  };

  return (
    <div className="flex-1 min-w-0 flex flex-col min-h-screen bg-[#06080d]">
      <Topbar />
      <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6">
        {renderView()}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <NetworkProvider>
      <div className="flex min-h-screen bg-[#06080d] text-slate-100 font-sans">
        <Sidebar />
        <MainContent />
        <AuthModal />
      </div>
    </NetworkProvider>
  );
}
