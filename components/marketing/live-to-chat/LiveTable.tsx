'use client';

import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Tooltip,
  Switch,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { LiveItem } from './data';

interface LiveTableProps {
  lives?: LiveItem[];
  onEdit?: (id: string) => void;
}

const statusColorMap = {
  scheduled: 'warning',
  live: 'success',
  ended: 'default',
} as const;

export default function LiveTable({ lives = [], onEdit }: LiveTableProps) {
  const columns = [
    { key: 'title', label: 'LIVE' },
    { key: 'status', label: 'STATUS' },
    { key: 'products', label: 'PRODUCTS' },
    { key: 'stats', label: 'STATS' },
    { key: 'settings', label: 'SETTINGS' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  const renderCell = React.useCallback((live: LiveItem, columnKey: React.Key) => {
    switch (columnKey) {
      case 'title':
        return (
          <div className="flex flex-col">
            <p className="text-bold">{live.title}</p>
            <p className="text-tiny text-default-500">{live.postId}</p>
          </div>
        );
      case 'status':
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[live.status]}
            size="sm"
            variant="flat"
          >
            {live.status}
          </Chip>
        );
      case 'products':
        return (
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Icon
                className="text-default-400"
                icon="solar:box-minimalistic-linear"
                width={16}
              />
              <span className="text-small">
                {live.products.total} products
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icon
                className="text-default-400"
                icon="solar:layers-minimalistic-linear"
                width={16}
              />
              <span className="text-small">
                {live.products.catalogs} catalogs
              </span>
            </div>
          </div>
        );
      case 'stats':
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Icon
                className="text-default-400"
                icon="solar:users-group-rounded-linear"
                width={16}
              />
              <span className="text-small">
                {live.stats.reach.toLocaleString()} reach
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icon
                className="text-default-400"
                icon="solar:hand-stars-linear"
                width={16}
              />
              <span className="text-small">
                {live.stats.engagement.toLocaleString()} engagement
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icon
                className="text-default-400"
                icon="solar:cart-large-2-linear"
                width={16}
              />
              <span className="text-small">
                {live.stats.orders.toLocaleString()} orders
              </span>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Switch
                defaultSelected={live.settings.autoResponse}
                size="sm"
              />
              <span className="text-small">Auto-response</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                defaultSelected={live.settings.includeProducts}
                size="sm"
              />
              <span className="text-small">Include products</span>
            </div>
          </div>
        );
      case 'actions':
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="View analytics">
              <Button
                isIconOnly
                className="text-default-400"
                size="sm"
                variant="light"
              >
                <Icon icon="solar:graph-new-linear" width={16} />
              </Button>
            </Tooltip>
            <Tooltip content="Edit live">
              <Button
                isIconOnly
                className="text-default-400"
                size="sm"
                variant="light"
                onPress={() => onEdit?.(live.id)}
              >
                <Icon icon="solar:pen-2-linear" width={16} />
              </Button>
            </Tooltip>
            <Tooltip content="Delete live">
              <Button
                isIconOnly
                className="text-danger"
                size="sm"
                variant="light"
              >
                <Icon icon="solar:trash-bin-trash-linear" width={16} />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return null;
    }
  }, [onEdit]);

  return (
    <Table
      aria-label="Live streams table"
      classNames={{
        wrapper: 'shadow-none',
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.key === 'actions' ? 'center' : 'start'}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={lives}>
        {(live) => (
          <TableRow key={live.id}>
            {(columnKey) => (
              <TableCell>{renderCell(live, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}