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
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { Product } from './data';

interface HighlightTableProps {
  products: Product[];
  onEdit: (id: string) => void;
}

export default function HighlightTable({ products, onEdit }: HighlightTableProps) {
  const columns = [
    { key: 'product', label: 'PRODUCT' },
    { key: 'collection', label: 'COLLECTION' },
    { key: 'stats', label: 'STATS' },
    { key: 'period', label: 'PERIOD' },
    { key: 'status', label: 'STATUS' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  const renderCell = React.useCallback((product: Product, columnKey: React.Key) => {
    switch (columnKey) {
      case 'product':
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: product.image,
            }}
            description={`$${product.price.toLocaleString()}`}
            name={product.name}
          >
            {product.name}
          </User>
        );
      case 'collection':
        return (
          <div className="flex items-center gap-2">
            <span className="capitalize">{product.collection.replace('_', ' ')}</span>
            <div className="flex gap-1">
              {product.isNew && (
                <Chip color="success" size="sm" variant="flat">
                  New
                </Chip>
              )}
              {product.isPopular && (
                <Chip color="warning" size="sm" variant="flat">
                  Popular
                </Chip>
              )}
            </div>
          </div>
        );
      case 'stats':
        return (
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Icon
                className="text-default-400"
                icon="solar:eye-linear"
                width={16}
              />
              <span>{product.stats.views.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon
                className="text-default-400"
                icon="solar:cursor-linear"
                width={16}
              />
              <span>{product.stats.clicks.toLocaleString()} clicks</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon
                className="text-default-400"
                icon="solar:cart-check-linear"
                width={16}
              />
              <span>{product.stats.conversions.toLocaleString()} conversions</span>
            </div>
          </div>
        );
      case 'period':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">
              {product.startDate && new Date(product.startDate).toLocaleDateString()}
            </p>
            <p className="text-tiny text-default-500">
              {product.endDate && new Date(product.endDate).toLocaleDateString()}
            </p>
          </div>
        );
      case 'status':
        return (
          <div className="flex items-center gap-2">
            <Chip
              className="capitalize"
              color={product.stats.growth >= 0 ? 'success' : 'danger'}
              size="sm"
              variant="flat"
            >
              {product.stats.growth >= 0 ? '+' : ''}
              {product.stats.growth}%
            </Chip>
          </div>
        );
      case 'actions':
        return (
          <div className="flex items-center gap-2 justify-end">
            <Tooltip content="Edit highlight">
              <Button
                isIconOnly
                className="text-default-400"
                size="sm"
                variant="light"
                onPress={() => onEdit(product.id)}
              >
                <Icon icon="solar:pen-2-linear" width={16} />
              </Button>
            </Tooltip>
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
            <Tooltip content="Remove highlight">
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
      aria-label="Highlight products table"
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
      <TableBody items={products}>
        {(product) => (
          <TableRow key={product.id}>
            {(columnKey) => (
              <TableCell>{renderCell(product, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}