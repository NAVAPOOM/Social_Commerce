'use client';

import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { BroadcastItem, broadcastData } from './data';

const statusColorMap = {
  draft: 'default',
  scheduled: 'warning',
  sent: 'success',
  failed: 'danger',
} as const;

const platformIconMap = {
  facebook: 'logos:facebook',
  line: 'logos:line',
} as const;

export default function BroadcastTable() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [platformFilter, setPlatformFilter] = React.useState('all');

  const filteredData = React.useMemo(() => {
    let filtered = broadcastData;

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    if (platformFilter !== 'all') {
      filtered = filtered.filter(item => item.platform === platformFilter);
    }

    return filtered;
  }, [searchQuery, statusFilter, platformFilter]);

  const renderCell = React.useCallback((item: BroadcastItem, key: string) => {
    switch (key) {
      case 'title':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{item.title}</p>
            <p className="text-tiny text-default-500">
              {new Date(item.scheduledFor).toLocaleString()}
            </p>
          </div>
        );
      case 'platform':
        return (
          <div className="flex items-center gap-2">
            <Icon icon={platformIconMap[item.platform]} width={20} />
            <span className="capitalize">{item.platform}</span>
          </div>
        );
      case 'status':
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[item.status]}
            size="sm"
            variant="flat"
          >
            {item.status}
          </Chip>
        );
      case 'audience':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{item.audience.type}</p>
            <p className="text-tiny text-default-500">
              {item.audience.count.toLocaleString()} recipients
            </p>
          </div>
        );
      case 'stats':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">
              {item.stats.reach.toLocaleString()} reached
            </p>
            <p className="text-tiny text-default-500">
              {item.stats.engagement.toLocaleString()} engaged
            </p>
          </div>
        );
      case 'actions':
        return (
          <div className="flex items-center gap-2 justify-end">
            <Button
              isIconOnly
              className="text-default-400"
              size="sm"
              variant="light"
            >
              <Icon icon="solar:eye-linear" width={16} />
            </Button>
            <Button
              isIconOnly
              className="text-default-400"
              size="sm"
              variant="light"
            >
              <Icon icon="solar:pen-2-linear" width={16} />
            </Button>
            <Button
              isIconOnly
              className="text-danger"
              size="sm"
              variant="light"
            >
              <Icon icon="solar:trash-bin-trash-linear" width={16} />
            </Button>
          </div>
        );
      default:
        return null;
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Input
          className="w-full sm:max-w-[44%]"
          placeholder="Search broadcasts..."
          startContent={<Icon className="text-default-400" icon="solar:magnifer-linear" width={16} />}
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <Dropdown>
          <DropdownTrigger>
            <Button
              endContent={<Icon icon="solar:alt-arrow-down-linear" width={16} />}
              variant="flat"
            >
              Platform
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            selectedKeys={[platformFilter]}
            selectionMode="single"
            onSelectionChange={(keys) => setPlatformFilter(Array.from(keys)[0] as string)}
          >
            <DropdownItem key="all">All Platforms</DropdownItem>
            <DropdownItem key="facebook">Facebook</DropdownItem>
            <DropdownItem key="line">LINE</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger>
            <Button
              endContent={<Icon icon="solar:alt-arrow-down-linear" width={16} />}
              variant="flat"
            >
              Status
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            selectedKeys={[statusFilter]}
            selectionMode="single"
            onSelectionChange={(keys) => setStatusFilter(Array.from(keys)[0] as string)}
          >
            <DropdownItem key="all">All Status</DropdownItem>
            <DropdownItem key="draft">Draft</DropdownItem>
            <DropdownItem key="scheduled">Scheduled</DropdownItem>
            <DropdownItem key="sent">Sent</DropdownItem>
            <DropdownItem key="failed">Failed</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <Table
        aria-label="Broadcast table"
        classNames={{
          wrapper: 'shadow-none',
        }}
      >
        <TableHeader>
          <TableColumn>BROADCAST</TableColumn>
          <TableColumn>PLATFORM</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>AUDIENCE</TableColumn>
          <TableColumn>STATS</TableColumn>
          <TableColumn align="center">ACTIONS</TableColumn>
        </TableHeader>
        <TableBody items={filteredData}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as string)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}