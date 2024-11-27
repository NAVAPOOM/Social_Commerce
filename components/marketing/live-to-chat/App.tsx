'use client';

import React from 'react';
import {
  Button,
  useDisclosure,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Select,
  SelectItem,
  Tabs,
  Tab,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import AddLiveModal from './AddLiveModal';
import EditLivePanel from './EditLivePanel';
import LiveStats from './LiveStats';
import LiveTable from './LiveTable';
import LiveAnalytics from './LiveAnalytics';
import LiveSettings from './LiveSettings';

export default function LiveToChatApp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLive, setSelectedLive] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState('overview');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [sortBy, setSortBy] = React.useState<string>('date');

  const handleEditLive = (liveId: string) => {
    setSelectedLive(liveId);
  };

  const handleCloseEdit = () => {
    setSelectedLive(null);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Fixed Header */}
      <div className="border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Live to Chat</h1>
            <p className="text-small text-default-500">
              Manage your Facebook Live streams and chat interactions
            </p>
          </div>
          <Button
            color="primary"
            endContent={<Icon icon="solar:play-stream-bold" width={20} />}
            onPress={onOpen}
          >
            Create Live
          </Button>
        </div>
      </div>

      {/* Sticky Controls */}
      <div className="sticky top-0 z-10 border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex flex-col gap-4">
          <Tabs
            aria-label="Live sections"
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
              key="lives"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:play-stream-linear" width={20} />
                  Lives
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

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 gap-2">
              <Input
                className="max-w-xs"
                placeholder="Search lives..."
                startContent={
                  <Icon
                    className="text-default-400"
                    icon="solar:magnifer-linear"
                    width={16}
                  />
                }
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <Select
                className="max-w-xs"
                placeholder="Status"
                selectedKeys={[statusFilter]}
                size="sm"
                variant="bordered"
                onSelectionChange={(keys) => setStatusFilter(Array.from(keys)[0] as string)}
              >
                <SelectItem key="all">All Status</SelectItem>
                <SelectItem key="scheduled">Scheduled</SelectItem>
                <SelectItem key="live">Live</SelectItem>
                <SelectItem key="ended">Ended</SelectItem>
              </Select>
            </div>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  endContent={<Icon icon="solar:alt-arrow-down-linear" width={16} />}
                  variant="flat"
                >
                  Sort
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Sort lives"
                selectedKeys={[sortBy]}
                selectionMode="single"
                onSelectionChange={(keys) => setSortBy(Array.from(keys)[0] as string)}
              >
                <DropdownItem key="date">Date</DropdownItem>
                <DropdownItem key="reach">Reach</DropdownItem>
                <DropdownItem key="engagement">Engagement</DropdownItem>
                <DropdownItem key="orders">Orders</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          <LiveStats />
          
          {activeTab === 'overview' && (
            <LiveTable />
          )}
          
          {activeTab === 'analytics' && (
            <LiveAnalytics />
          )}
          
          {activeTab === 'settings' && (
            <LiveSettings />
          )}
        </div>
      </div>

      <AddLiveModal isOpen={isOpen} onClose={onClose} />
      <EditLivePanel
        liveId={selectedLive}
        onClose={handleCloseEdit}
      />
    </div>
  );
}