'use client';

import React from 'react';
import {
  Tabs,
  Tab,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import ConsignmentStats from './ConsignmentStats';
import ConsignmentTable from './ConsignmentTable';
import ConsignorSummary from './ConsignorSummary';
import { consignmentData } from './data';

const dateRanges = [
  { label: 'Today', value: 'today' },
  { label: 'Last 7 Days', value: 'week' },
  { label: 'Last 30 Days', value: 'month' },
  { label: 'Last 90 Days', value: 'quarter' },
  { label: 'Last Year', value: 'year' },
  { label: 'Custom Range', value: 'custom' },
];

export default function ConsignmentReportApp() {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [dateRange, setDateRange] = React.useState('month');
  const [sortBy, setSortBy] = React.useState<string>('date');

  const handleExport = (format: 'pdf' | 'excel') => {
    // Handle export functionality
    console.log(`Exporting as ${format}`);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Fixed Header */}
      <div className="border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Consignment Report</h1>
            <p className="text-small text-default-500">
              Track and analyze your consignment inventory
            </p>
          </div>
          <div className="flex gap-2">
            <Select
              className="max-w-xs"
              defaultSelectedKeys={[dateRange]}
              labelPlacement="outside"
              placeholder="Select date range"
              size="sm"
              variant="bordered"
              onSelectionChange={(keys) => setDateRange(Array.from(keys)[0] as string)}
            >
              {dateRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </Select>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  endContent={<Icon icon="solar:alt-arrow-down-linear" width={16} />}
                  size="sm"
                  variant="flat"
                >
                  Export
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  startContent={<Icon icon="solar:file-pdf-linear" width={20} />}
                  onPress={() => handleExport('pdf')}
                >
                  Export as PDF
                </DropdownItem>
                <DropdownItem
                  startContent={<Icon icon="solar:file-excel-linear" width={20} />}
                  onPress={() => handleExport('excel')}
                >
                  Export as Excel
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Sticky Controls */}
      <div className="sticky top-0 z-10 border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs
            aria-label="Report sections"
            color="primary"
            selectedKey={activeTab}
            variant="underlined"
            onSelectionChange={(key) => setActiveTab(key.toString())}
          >
            <Tab key="overview" title="Overview" />
            <Tab key="inventory" title="Inventory" />
            <Tab key="consignors" title="Consignors" />
            <Tab key="analytics" title="Analytics" />
          </Tabs>

          <div className="flex gap-2">
            <Input
              className="w-full sm:w-64"
              placeholder="Search..."
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
                aria-label="Sort options"
                selectedKeys={[sortBy]}
                selectionMode="single"
                onSelectionChange={(keys) => setSortBy(Array.from(keys)[0] as string)}
              >
                <DropdownItem key="date">Date</DropdownItem>
                <DropdownItem key="value">Value</DropdownItem>
                <DropdownItem key="quantity">Quantity</DropdownItem>
                <DropdownItem key="turnover">Turnover Rate</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          <ConsignmentStats />
          
          {activeTab === 'overview' && (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ConsignmentTable data={consignmentData} />
              </div>
              <div>
                <ConsignorSummary data={consignmentData} />
              </div>
            </div>
          )}
          
          {activeTab === 'inventory' && <ConsignmentTable data={consignmentData} />}
          
          {activeTab === 'consignors' && <ConsignorSummary data={consignmentData} fullWidth />}
          
          {activeTab === 'analytics' && (
            <div className="grid gap-6">
              {/* Add analytics components here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}