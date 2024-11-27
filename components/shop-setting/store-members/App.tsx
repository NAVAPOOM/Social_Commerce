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
import AddMemberModal from './AddMemberModal';
import EditMemberPanel from './EditMemberPanel';
import MemberStats from './MemberStats';
import MemberTable from './MemberTable';
import { memberData } from './data';

const memberRoles = [
  { label: 'All Roles', value: 'all' },
  { label: 'Admin', value: 'admin' },
  { label: 'Staff', value: 'staff' },
  { label: 'Customer', value: 'customer' },
];

const memberStatuses = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Suspended', value: 'suspended' },
];

export default function StoreMembersApp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMember, setSelectedMember] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [sortBy, setSortBy] = React.useState<string>('name');

  const handleEditMember = (memberId: string) => {
    setSelectedMember(memberId);
  };

  const handleCloseEdit = () => {
    setSelectedMember(null);
  };

  const filteredMembers = React.useMemo(() => {
    let filtered = memberData;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        member =>
          member.firstName.toLowerCase().includes(query) ||
          member.lastName.toLowerCase().includes(query) ||
          member.email.toLowerCase().includes(query) ||
          member.phone.includes(query)
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(member => member.role === roleFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(member => member.status === statusFilter);
    }

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        case 'joinDate':
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
        case 'orders':
          return b.stats.totalOrders - a.stats.totalOrders;
        case 'spent':
          return b.stats.totalSpent - a.stats.totalSpent;
        default:
          return 0;
      }
    });
  }, [searchQuery, roleFilter, statusFilter, sortBy]);

  return (
    <div className="flex h-full flex-col">
      {/* Fixed Header */}
      <div className="border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Store Members</h1>
            <p className="text-small text-default-500">
              Manage your store members and their permissions
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              color="primary"
              variant="flat"
              startContent={<Icon icon="solar:file-download-linear" width={20} />}
            >
              Export
            </Button>
            <Button
              color="primary"
              endContent={<Icon icon="solar:user-plus-rounded-linear" width={20} />}
              onPress={onOpen}
            >
              Add Member
            </Button>
          </div>
        </div>
      </div>

      {/* Sticky Controls */}
      <div className="sticky top-0 z-10 border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-2">
            <Input
              className="max-w-xs"
              placeholder="Search members..."
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
              placeholder="Role"
              selectedKeys={[roleFilter]}
              size="sm"
              variant="bordered"
              onSelectionChange={(keys) => setRoleFilter(Array.from(keys)[0] as string)}
            >
              {memberRoles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
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
              {memberStatuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
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
              aria-label="Sort members"
              selectedKeys={[sortBy]}
              selectionMode="single"
              onSelectionChange={(keys) => setSortBy(Array.from(keys)[0] as string)}
            >
              <DropdownItem key="name">Name</DropdownItem>
              <DropdownItem key="joinDate">Join Date</DropdownItem>
              <DropdownItem key="orders">Total Orders</DropdownItem>
              <DropdownItem key="spent">Total Spent</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          <MemberStats members={filteredMembers} />
          <MemberTable
            members={filteredMembers}
            onEdit={handleEditMember}
          />
        </div>
      </div>

      <AddMemberModal isOpen={isOpen} onClose={onClose} />
      <EditMemberPanel
        memberId={selectedMember}
        onClose={handleCloseEdit}
      />
    </div>
  );
}