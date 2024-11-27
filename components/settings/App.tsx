'use client';

import React from 'react';
import {
  Tabs,
  Tab,
  Button,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import ProfileSection from './sections/ProfileSection';
import NotificationsSection from './sections/NotificationsSection';
import TeamSection from './sections/TeamSection';
import SecuritySection from './sections/SecuritySection';
import ConnectionsSection from './sections/ConnectionsSection';
import APISection from './sections/APISection';
import AppearanceSection from './sections/AppearanceSection';
import BackupSection from './sections/BackupSection';

export default function SettingsApp() {
  const [activeTab, setActiveTab] = React.useState('profile');
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);

  const handleSave = () => {
    // Handle save logic here
    setHasUnsavedChanges(false);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Fixed Header */}
      <div className="border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-small text-default-500">
              Manage your account settings and preferences
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              isDisabled={!hasUnsavedChanges}
              color="danger"
              variant="light"
              onPress={() => setHasUnsavedChanges(false)}
            >
              Cancel
            </Button>
            <Button
              isDisabled={!hasUnsavedChanges}
              color="primary"
              startContent={<Icon icon="solar:diskette-bold" width={20} />}
              onPress={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Sticky Controls */}
      <div className="sticky top-0 z-10 border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <Tabs
          aria-label="Settings sections"
          color="primary"
          selectedKey={activeTab}
          variant="underlined"
          onSelectionChange={(key) => setActiveTab(key.toString())}
        >
          <Tab
            key="profile"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="solar:user-circle-linear" width={20} />
                Profile
              </div>
            }
          />
          <Tab
            key="notifications"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="solar:bell-linear" width={20} />
                Notifications
              </div>
            }
          />
          <Tab
            key="team"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="solar:users-group-rounded-linear" width={20} />
                Team
              </div>
            }
          />
          <Tab
            key="security"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="solar:shield-keyhole-linear" width={20} />
                Security
              </div>
            }
          />
          <Tab
            key="connections"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="solar:plug-circle-linear" width={20} />
                Connections
              </div>
            }
          />
          <Tab
            key="api"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="solar:code-linear" width={20} />
                API
              </div>
            }
          />
          <Tab
            key="appearance"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="solar:palette-linear" width={20} />
                Appearance
              </div>
            }
          />
          <Tab
            key="backup"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="solar:cloud-storage-linear" width={20} />
                Backup
              </div>
            }
          />
        </Tabs>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          {activeTab === 'profile' && (
            <ProfileSection onFormChange={() => setHasUnsavedChanges(true)} />
          )}
          {activeTab === 'notifications' && (
            <NotificationsSection onFormChange={() => setHasUnsavedChanges(true)} />
          )}
          {activeTab === 'team' && (
            <TeamSection onFormChange={() => setHasUnsavedChanges(true)} />
          )}
          {activeTab === 'security' && (
            <SecuritySection onFormChange={() => setHasUnsavedChanges(true)} />
          )}
          {activeTab === 'connections' && (
            <ConnectionsSection onFormChange={() => setHasUnsavedChanges(true)} />
          )}
          {activeTab === 'api' && (
            <APISection onFormChange={() => setHasUnsavedChanges(true)} />
          )}
          {activeTab === 'appearance' && (
            <AppearanceSection onFormChange={() => setHasUnsavedChanges(true)} />
          )}
          {activeTab === 'backup' && (
            <BackupSection onFormChange={() => setHasUnsavedChanges(true)} />
          )}
        </div>
      </div>
    </div>
  );
}