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
import { Member } from './data';

interface MemberTableProps {
  members: Member[];
  onEdit: (id: string) => void;
}

const statusColorMap = {
  active: 'success',
  inactive: 'danger',
  suspended: 'warning',
} as const;

const roleColorMap = {
  admin: 'danger',
  staff: 'secondary',
  customer: 'primary',
} as const;

export default function MemberTable({ members, onEdit }: MemberTableProps) {
  const columns = [
    { key: 'member', label: 'MEMBER' },
    { key: 'role', label: 'ROLE' },
    { key: 'status', label: 'STATUS' },
    { key: 'stats', label: 'STATS' },
    { key: 'joinDate', label: 'JOIN DATE' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  const renderCell = React.useCallback((member: Member, columnKey: React.Key) => {
    switch (columnKey) {
      case 'member':
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: member.avatar,
            }}
            description={member.email}
            name={`${member.firstName} ${member.lastName}`}
          >
            {member.email}
          </User>
        );
      case 'role':
        return (
          <Chip
            className="capitalize"
            color={roleColorMap[member.role]}
            size="sm"
            variant="flat"
          >
            {member.role}
          </Chip>
        );
      case 'status':
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[member.status]}
            size="sm"
            variant="flat"
          >
            {member.status}
          </Chip>
        );
      case 'stats':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">
              {member.stats.totalOrders} orders
            </p>
            <p className="text-tiny text-default-500">
              ${member.stats.totalSpent.toLocaleString()} spent
            </p>
          </div>
        );
      case 'joinDate':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">
              {new Date(member.joinDate).toLocaleDateString()}
            </p>
            <p className="text-tiny text-default-500">
              {new Date(member.stats.lastActive).toLocaleTimeString()}
            </p>
          </div>
        );
      case 'actions':
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="Edit member">
              <Button
                isIconOnly
                className="text-default-400"
                size="sm"
                variant="light"
                onPress={() => onEdit(member.id)}
              >
                <Icon icon="solar:pen-2-linear" width={16} />
              </Button>
            </Tooltip>
            <Tooltip content="Delete member">
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
      aria-label="Members table"
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
      <TableBody items={members}>
        {(member) => (
          <TableRow key={member.id}>
            {(columnKey) => (
              <TableCell>{renderCell(member, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}