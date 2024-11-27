'use client';

import React from 'react';
import {
  Button,
  useDisclosure,
  Tabs,
  Tab,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import BroadcastStats from './BroadcastStats';
import BroadcastCalendar from './BroadcastCalendar';
import BroadcastTable from './BroadcastTable';
import CreateBroadcastModal from './CreateBroadcastModal';
import BroadcastAnalytics from './BroadcastAnalytics';
import BroadcastSettings from './BroadcastSettings';

export default function BroadcastApp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <div className="flex h-full flex-col">
      {/* Fixed Header */}
      <div className="border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Broadcast Management</h1>
            <p className="text-small text-default-500">
              Manage and schedule your broadcasts across platforms
            </p>
          </div>
          <Button
            color="primary"
            endContent={<Icon icon="solar:add-circle-bold" width={20} />}
            onPress={onOpen}
          >
            Create Broadcast
          </Button>
        </div>
      </div>

      {/* Sticky Controls */}
      <div className="sticky top-0 z-10 border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <Tabs
          aria-label="Broadcast sections"
          color="primary"
          selectedKey={activeTab}
          variant="underlined"
          onSelectionChange={(key) => setActiveTab(key.toString())}
        >
          <Tab
            key="overview"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="solar:chart-2-linear" width={20} />
                Overview
              </div>
            }
          />
          <Tab
            key="schedule"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="solar:calendar-linear" width={20} />
                Schedule
              </div>
            }
          />
          <Tab
            key="analytics"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="solar:graph-new-linear" width={20} />
                Analytics
              </div>
            }
          />
          <Tab
            key="settings"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="solar:settings-linear" width={20} />
                Settings
              </div>
            }
          />
        </Tabs>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          {activeTab === 'overview' && (
            <>
              <BroadcastStats />
              <BroadcastTable />
            </>
          )}
          
          {activeTab === 'schedule' && (
            <BroadcastCalendar />
          )}
          
          {activeTab === 'analytics' && (
            <BroadcastAnalytics />
          )}
          
          {activeTab === 'settings' && (
            <BroadcastSettings />
          )}
        </div>
      </div>

      <CreateBroadcastModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}