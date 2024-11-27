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
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import AddBranchModal from './AddBranchModal';
import EditBranchPanel from './EditBranchPanel';
import BranchStats from './BranchStats';
import BranchGrid from './BranchGrid';
import BranchMap from './BranchMap';
import { branchData } from './data';

const branchTypes = [
  { label: 'All Types', value: 'all' },
  { label: 'Main Branch', value: 'main' },
  { label: 'Sub Branch', value: 'sub' },
  { label: 'Warehouse', value: 'warehouse' },
];

const branchStatuses = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Maintenance', value: 'maintenance' },
];

export default function BranchManagementApp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBranch, setSelectedBranch] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [viewMode, setViewMode] = React.useState<'grid' | 'map'>('grid');

  const handleEditBranch = (branchId: string) => {
    setSelectedBranch(branchId);
  };

  const handleCloseEdit = () => {
    setSelectedBranch(null);
  };

  const filteredBranches = React.useMemo(() => {
    let filtered = branchData;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        branch =>
          branch.name.toLowerCase().includes(query) ||
          branch.code.toLowerCase().includes(query)
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(branch => branch.type === typeFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(branch => branch.status === statusFilter);
    }

    return filtered;
  }, [searchQuery, typeFilter, statusFilter]);

  return (
    <div className="flex h-full flex-col">
      {/* Fixed Header */}
      <div className="border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Branch Management</h1>
            <p className="text-small text-default-500">
              Manage your store branches and warehouses
            </p>
          </div>
          <Button
            color="primary"
            endContent={<Icon icon="solar:add-circle-bold" width={20} />}
            onPress={onOpen}
          >
            Add Branch
          </Button>
        </div>
      </div>

      {/* Sticky Controls */}
      <div className="sticky top-0 z-10 border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-2">
            <Input
              className="max-w-xs"
              placeholder="Search branches..."
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
              placeholder="Branch Type"
              selectedKeys={[typeFilter]}
              size="sm"
              variant="bordered"
              onSelectionChange={(keys) => setTypeFilter(Array.from(keys)[0] as string)}
            >
              {branchTypes.map((type) => (
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
              {branchStatuses.map((status) => (
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
              className={viewMode === 'grid' ? 'bg-default-100' : ''}
              radius="lg"
              variant="flat"
              onPress={() => setViewMode('grid')}
            >
              <Icon icon="solar:widget-5-linear" width={20} />
            </Button>
            <Button
              isIconOnly
              aria-label="View on map"
              className={viewMode === 'map' ? 'bg-default-100' : ''}
              radius="lg"
              variant="flat"
              onPress={() => setViewMode('map')}
            >
              <Icon icon="solar:map-point-linear" width={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          <BranchStats branches={filteredBranches} />
          
          {viewMode === 'grid' ? (
            <BranchGrid
              branches={filteredBranches}
              onEdit={handleEditBranch}
            />
          ) : (
            <BranchMap
              branches={filteredBranches}
              onBranchSelect={handleEditBranch}
            />
          )}
        </div>
      </div>

      <AddBranchModal isOpen={isOpen} onClose={onClose} />
      <EditBranchPanel
        branchId={selectedBranch}
        onClose={handleCloseEdit}
      />
    </div>
  );
}