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
import InventoryStats from './InventoryStats';
import InventoryTable from './InventoryTable';
import AddInventoryModal from './AddInventoryModal';
import EditInventoryPanel from './EditInventoryPanel';
import ImportInventoryModal from './ImportInventoryModal';
import { inventoryData } from './data';

export default function InventoryApp() {
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isImportOpen, onOpen: onImportOpen, onClose: onImportClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState('overview');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [stockFilter, setStockFilter] = React.useState('all');
  const [sortBy, setSortBy] = React.useState<string>('name');

  const handleEditItem = (itemId: string) => {
    setSelectedItem(itemId);
  };

  const handleCloseEdit = () => {
    setSelectedItem(null);
  };

  const handleExport = (format: 'csv' | 'excel') => {
    // Handle export functionality
    console.log(`Exporting as ${format}`);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Fixed Header */}
      <div className="border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Inventory Management</h1>
            <p className="text-small text-default-500">
              Manage and track your inventory across all locations
            </p>
          </div>
          <div className="flex gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<Icon icon="solar:file-download-linear" width={20} />}
                >
                  Export
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  startContent={<Icon icon="solar:file-csv-linear" width={20} />}
                  onPress={() => handleExport('csv')}
                >
                  Export as CSV
                </DropdownItem>
                <DropdownItem
                  startContent={<Icon icon="solar:file-excel-linear" width={20} />}
                  onPress={() => handleExport('excel')}
                >
                  Export as Excel
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              variant="flat"
              startContent={<Icon icon="solar:import-linear" width={20} />}
              onPress={onImportOpen}
            >
              Import
            </Button>
            <Button
              color="primary"
              endContent={<Icon icon="solar:add-circle-bold" width={20} />}
              onPress={onAddOpen}
            >
              Add Item
            </Button>
          </div>
        </div>
      </div>

      {/* Sticky Controls */}
      <div className="sticky top-0 z-10 border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex flex-col gap-4">
          <Tabs
            aria-label="Inventory sections"
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
              key="stock"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:box-minimalistic-linear" width={20} />
                  Stock
                </div>
              }
            />
            <Tab
              key="locations"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:map-point-linear" width={20} />
                  Locations
                </div>
              }
            />
            <Tab
              key="history"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:history-linear" width={20} />
                  History
                </div>
              }
            />
          </Tabs>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 gap-2">
              <Input
                className="max-w-xs"
                placeholder="Search items..."
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
                placeholder="Category"
                selectedKeys={[categoryFilter]}
                size="sm"
                variant="bordered"
                onSelectionChange={(keys) => setCategoryFilter(Array.from(keys)[0] as string)}
              >
                <SelectItem key="all">All Categories</SelectItem>
                <SelectItem key="electronics">Electronics</SelectItem>
                <SelectItem key="fashion">Fashion</SelectItem>
                <SelectItem key="home">Home & Living</SelectItem>
              </Select>
              <Select
                className="max-w-xs"
                placeholder="Stock Status"
                selectedKeys={[stockFilter]}
                size="sm"
                variant="bordered"
                onSelectionChange={(keys) => setStockFilter(Array.from(keys)[0] as string)}
              >
                <SelectItem key="all">All Status</SelectItem>
                <SelectItem key="in_stock">In Stock</SelectItem>
                <SelectItem key="low_stock">Low Stock</SelectItem>
                <SelectItem key="out_of_stock">Out of Stock</SelectItem>
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
                aria-label="Sort items"
                selectedKeys={[sortBy]}
                selectionMode="single"
                onSelectionChange={(keys) => setSortBy(Array.from(keys)[0] as string)}
              >
                <DropdownItem key="name">Name</DropdownItem>
                <DropdownItem key="sku">SKU</DropdownItem>
                <DropdownItem key="stock">Stock Level</DropdownItem>
                <DropdownItem key="value">Stock Value</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          <InventoryStats />
          <InventoryTable onEdit={handleEditItem} />
        </div>
      </div>

      <AddInventoryModal isOpen={isAddOpen} onClose={onAddClose} />
      <ImportInventoryModal isOpen={isImportOpen} onClose={onImportClose} />
      <EditInventoryPanel
        itemId={selectedItem}
        onClose={handleCloseEdit}
      />
    </div>
  );
}