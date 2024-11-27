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
import AddCampaignModal from './AddCampaignModal';
import EditCampaignPanel from './EditCampaignPanel';
import CampaignStats from './CampaignStats';
import CampaignGrid from './CampaignGrid';
import CampaignCalendar from './CampaignCalendar';
import { campaignData, campaignTypes, campaignStatuses } from './data';

export default function CampaignApp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCampaign, setSelectedCampaign] = React.useState<string | null>(null);
  const [activeView, setActiveView] = React.useState<'grid' | 'calendar'>('grid');
  const [activeTab, setActiveTab] = React.useState('overview');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [sortBy, setSortBy] = React.useState<string>('date');

  const handleEditCampaign = (campaignId: string) => {
    setSelectedCampaign(campaignId);
  };

  const handleCloseEdit = () => {
    setSelectedCampaign(null);
  };

  const filteredCampaigns = React.useMemo(() => {
    let filtered = campaignData;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        campaign =>
          campaign.name.toLowerCase().includes(query) ||
          campaign.description.toLowerCase().includes(query)
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(campaign => campaign.type === typeFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(campaign => campaign.status === statusFilter);
    }

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'budget':
          return b.budget - a.budget;
        case 'performance':
          return b.stats.roi - a.stats.roi;
        default:
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      }
    });
  }, [searchQuery, typeFilter, statusFilter, sortBy]);

  return (
    <div className="flex h-full flex-col">
      {/* Fixed Header */}
      <div className="border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Campaigns</h1>
            <p className="text-small text-default-500">
              Manage your marketing campaigns and track their performance
            </p>
          </div>
          <Button
            color="primary"
            endContent={<Icon icon="solar:add-circle-bold" width={20} />}
            onPress={onOpen}
          >
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Sticky Controls */}
      <div className="sticky top-0 z-10 border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex flex-col gap-4">
          <Tabs
            aria-label="Campaign sections"
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
              key="campaigns"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:flag-linear" width={20} />
                  Campaigns
                </div>
              }
            />
            <Tab
              key="calendar"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:calendar-linear" width={20} />
                  Calendar
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
          </Tabs>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 gap-2">
              <Input
                className="max-w-xs"
                placeholder="Search campaigns..."
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
                placeholder="Campaign Type"
                selectedKeys={[typeFilter]}
                size="sm"
                variant="bordered"
                onSelectionChange={(keys) => setTypeFilter(Array.from(keys)[0] as string)}
              >
                <SelectItem key="all" value="all">
                  All Types
                </SelectItem>
                {campaignTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                className="max-w-xs"
                placeholder="Status"
                selectedKeys={[statusFilter]}
                size="sm"
                variant="bordered"
                onSelectionChange={(keys) => setStatusFilter(Array.from(keys)[0] as string)}
              >
                <SelectItem key="all" value="all">
                  All Statuses
                </SelectItem>
                {campaignStatuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                isIconOnly
                aria-label="View as grid"
                className={activeView === 'grid' ? 'bg-default-100' : ''}
                radius="lg"
                variant="flat"
                onPress={() => setActiveView('grid')}
              >
                <Icon icon="solar:widget-5-linear" width={20} />
              </Button>
              <Button
                isIconOnly
                aria-label="View as calendar"
                className={activeView === 'calendar' ? 'bg-default-100' : ''}
                radius="lg"
                variant="flat"
                onPress={() => setActiveView('calendar')}
              >
                <Icon icon="solar:calendar-linear" width={20} />
              </Button>
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
                  aria-label="Sort campaigns"
                  selectedKeys={[sortBy]}
                  selectionMode="single"
                  onSelectionChange={(keys) => setSortBy(Array.from(keys)[0] as string)}
                >
                  <DropdownItem key="date">Date</DropdownItem>
                  <DropdownItem key="name">Name</DropdownItem>
                  <DropdownItem key="budget">Budget</DropdownItem>
                  <DropdownItem key="performance">Performance</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          <CampaignStats campaigns={filteredCampaigns} />
          
          {activeView === 'grid' ? (
            <CampaignGrid
              campaigns={filteredCampaigns}
              onEdit={handleEditCampaign}
            />
          ) : (
            <CampaignCalendar
              campaigns={filteredCampaigns}
              onCampaignSelect={handleEditCampaign}
            />
          )}
        </div>
      </div>

      <AddCampaignModal isOpen={isOpen} onClose={onClose} />
      <EditCampaignPanel
        campaignId={selectedCampaign}
        onClose={handleCloseEdit}
      />
    </div>
  );
}