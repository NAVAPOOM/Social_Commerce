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
  Tooltip,
  User,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { ConsignmentItem } from './data';

interface ConsignmentTableProps {
  data: ConsignmentItem[];
}

const statusColorMap = {
  active: 'success',
  low_stock: 'warning',
  expired: 'danger',
  sold_out: 'default',
} as const;

export default function ConsignmentTable({ data }: ConsignmentTableProps) {
  const columns = [
    {
      key: 'product',
      label: 'PRODUCT',
    },
    {
      key: 'consignor',
      label: 'CONSIGNOR',
    },
    {
      key: 'quantity',
      label: 'QUANTITY',
    },
    {
      key: 'value',
      label: 'VALUE',
    },
    {
      key: 'status',
      label: 'STATUS',
    },
    {
      key: 'turnover',
      label: 'TURNOVER',
    },
  ];

  const renderCell = React.useCallback((item: ConsignmentItem, columnKey: React.Key) => {
    switch (columnKey) {
      case 'product':
        return (
          <div className="flex flex-col">
            <p className="text-bold">{item.productName}</p>
            <p className="text-tiny text-default-500">{item.productCode}</p>
          </div>
        );
      case 'consignor':
        return (
          <User
            avatarProps={{ radius: "lg", src: `https://i.pravatar.cc/150?u=${item.consignorId}` }}
            description={item.consignorId}
            name={item.consignorName}
          />
        );
      case 'quantity':
        return (
          <div className="flex flex-col">
            <p className="text-bold">{item.remainingQuantity}/{item.quantity}</p>
            <p className="text-tiny text-default-500">
              {item.soldQuantity} sold
            </p>
          </div>
        );
      case 'value':
        return (
          <div className="flex flex-col">
            <p className="text-bold">${item.totalValue.toLocaleString()}</p>
            <p className="text-tiny text-default-500">
              ${item.unitPrice} per unit
            </p>
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
      case 'turnover':
        return (
          <div className="flex items-center gap-2">
            <span className="text-bold">
              {(item.turnoverRate * 100).toFixed(1)}%
            </span>
            <Icon
              className={item.turnoverRate >= 0.7 ? 'text-success' : 'text-warning'}
              icon={item.turnoverRate >= 0.7 ? 'solar:arrow-up-bold' : 'solar:arrow-down-bold'}
              width={16}
            />
          </div>
        );
      default:
        return null;
    }
  }, []);

  return (
    <Table
      aria-label="Consignment inventory table"
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
      <TableBody items={data}>
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