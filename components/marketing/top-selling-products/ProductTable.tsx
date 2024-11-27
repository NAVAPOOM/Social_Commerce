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

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({ products }: ProductTableProps) {
  const columns = [
    { key: 'product', label: 'PRODUCT' },
    { key: 'category', label: 'CATEGORY' },
    { key: 'sales', label: 'SALES' },
    { key: 'revenue', label: 'REVENUE' },
    { key: 'stock', label: 'STOCK' },
    { key: 'rating', label: 'RATING' },
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
            description={`#${product.rank}`}
            name={product.name}
          >
            {product.name}
          </User>
        );
      case 'category':
        return (
          <div className="flex items-center gap-2">
            <span className="capitalize">{product.category}</span>
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
      case 'sales':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">
              {product.stats.totalSales.toLocaleString()}
            </p>
            <p className="text-tiny text-default-500">
              units sold
            </p>
          </div>
        );
      case 'revenue':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">
              ${product.stats.revenue.toLocaleString()}
            </p>
            <p className="text-tiny text-default-500">
              total revenue
            </p>
          </div>
        );
      case 'stock':
        return (
          <Chip
            className="capitalize"
            color={
              product.stats.stockLevel > 50
                ? 'success'
                : product.stats.stockLevel > 20
                ? 'warning'
                : 'danger'
            }
            size="sm"
            variant="flat"
          >
            {product.stats.stockLevel}% in stock
          </Chip>
        );
      case 'rating':
        return (
          <div className="flex items-center gap-2">
            <Icon
              className="text-warning"
              icon="solar:star-bold"
              width={16}
            />
            <span>{product.stats.averageRating}</span>
            <span className="text-tiny text-default-500">
              ({product.stats.reviewCount})
            </span>
          </div>
        );
      case 'actions':
        return (
          <div className="flex items-center gap-2 justify-end">
            <Tooltip content="View Details">
              <Button
                isIconOnly
                className="text-default-400"
                size="sm"
                variant="light"
              >
                <Icon icon="solar:eye-linear" width={16} />
              </Button>
            </Tooltip>
            <Tooltip content="Edit Product">
              <Button
                isIconOnly
                className="text-default-400"
                size="sm"
                variant="light"
              >
                <Icon icon="solar:pen-2-linear" width={16} />
              </Button>
            </Tooltip>
            <Tooltip content="More Actions">
              <Button
                isIconOnly
                className="text-default-400"
                size="sm"
                variant="light"
              >
                <Icon icon="solar:menu-dots-bold" width={16} />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return null;
    }
  }, []);

  return (
    <Table
      aria-label="Top selling products table"
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