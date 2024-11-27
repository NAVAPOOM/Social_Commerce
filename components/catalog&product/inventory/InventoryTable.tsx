'use client';

import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
  Progress,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { InventoryItem, inventoryData } from './data';

interface InventoryTableProps {
  onEdit: (id: string) => void;
}

const statusColorMap = {
  in_stock: 'success',
  low_stock: 'warning',
  out_of_stock: 'danger',
} as const;

export default function InventoryTable({ onEdit }: InventoryTableProps) {
  const columns = [
    { key: 'item', label: 'ITEM' },
    { key: 'sku', label: 'SKU' },
    { key: 'stock', label: 'STOCK' },
    { key: 'location', label: 'LOCATION' },
    { key: 'status', label: 'STATUS' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  const renderCell = React.useCallback((item: InventoryItem, columnKey: React.Key) => {
    switch (columnKey) {
      case 'item':
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: item.image || `https://api.dicebear.com/7.x/shapes/svg?seed=${item.id}`,
            }}
            description={item.category}
            name={item.name}
          >
            {item.name}
          </User>
        );
      case 'sku':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{item.sku}</p>
            <p className="text-tiny text-default-500">
              ${item.price.toLocaleString()}
            </p>
          </div>
        );
      case 'stock':
        return (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-small">
              <span>{item.stockLevel}</span>
              <span className="text-default-500">/ {item.reorderPoint}</span>
            </div>
            <Progress
              aria-label="Stock level"
              classNames={{
                base: "max-w-full",
                track: "drop-shadow-md border border-default",
                indicator: item.stockLevel > item.reorderPoint
                  ? "bg-success"
                  : item.stockLevel > 0
                  ? "bg-warning"
                  : "bg-danger",
              }}
              size="sm"
              value={(item.stockLevel / item.reorderPoint) * 100}
            />
          </div>
        );
      case 'location':
        return (
          <div className="flex items-center gap-2">
            <Icon
              className="text-default-500"
              icon="solar:map-point-linear"
              width={16}
            />
            <span>{item.location}</span>
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
            {item.status.replace('_', ' ')}
          </Chip>
        );
      case 'actions':
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="Edit item">
              <Button
                isIconOnly
                className="text-default-400"
                size="sm"
                variant="light"
                onPress={() => onEdit(item.id)}
              >
                <Icon icon="solar:pen-2-linear" width={16} />
              </Button>
            </Tooltip>
            <Tooltip content="View history">
              <Button
                isIconOnly
                className="text-default-400"
                size="sm"
                variant="light"
              >
                <Icon icon="solar:clock-circle-linear" width={16} />
              </Button>
            </Tooltip>
            <Tooltip content="Generate QR">
              <Button
                isIconOnly
                className="text-default-400"
                size="sm"
                variant="light"
              >
                <Icon icon="solar:qr-code-linear" width={16} />
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
      aria-label="Inventory items table"
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
      <TableBody items={inventoryData}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}