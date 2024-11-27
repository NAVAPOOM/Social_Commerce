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
  Switch,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { Post } from './data';

interface PostTableProps {
  posts: Post[];
  onEdit: (id: string) => void;
}

const platformIconMap = {
  facebook: 'logos:facebook',
  instagram_post: 'skill-icons:instagram',
  instagram_story: 'logos:instagram-icon',
} as const;

const statusColorMap = {
  active: 'success',
  inactive: 'danger',
  paused: 'warning',
} as const;

export default function PostTable({ posts, onEdit }: PostTableProps) {
  const columns = [
    { key: 'title', label: 'POST' },
    { key: 'platform', label: 'PLATFORM' },
    { key: 'status', label: 'STATUS' },
    { key: 'stats', label: 'STATS' },
    { key: 'settings', label: 'SETTINGS' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  const renderCell = React.useCallback((post: Post, columnKey: React.Key) => {
    switch (columnKey) {
      case 'title':
        return (
          <div className="flex flex-col">
            <p className="text-bold">{post.title}</p>
            <p className="text-tiny text-default-500">{post.postId}</p>
          </div>
        );
      case 'platform':
        return (
          <div className="flex items-center gap-2">
            <Icon icon={platformIconMap[post.platform]} width={20} />
            <span className="capitalize">
              {post.platform.replace('_', ' ')}
            </span>
          </div>
        );
      case 'status':
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[post.status]}
            size="sm"
            variant="flat"
          >
            {post.status}
          </Chip>
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
                {post.stats.reach.toLocaleString()} reach
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icon
                className="text-default-400"
                icon="solar:chat-round-dots-linear"
                width={16}
              />
              <span className="text-small">
                {post.stats.engagement.toLocaleString()} engagement
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icon
                className="text-default-400"
                icon="solar:cart-large-2-linear"
                width={16}
              />
              <span className="text-small">
                {post.stats.orders.toLocaleString()} orders
              </span>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Switch
                defaultSelected={post.settings.autoResponse}
                size="sm"
              />
              <span className="text-small">Auto-response</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                defaultSelected={post.settings.includeProducts}
                size="sm"
              />
              <span className="text-small">Include products</span>
            </div>
          </div>
        );
      case 'actions':
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="Edit post">
              <Button
                isIconOnly
                className="text-default-400"
                size="sm"
                variant="light"
                onPress={() => onEdit(post.id)}
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
            <Tooltip content="Delete post">
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
      aria-label="Posts table"
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
      <TableBody items={posts}>
        {(post) => (
          <TableRow key={post.id}>
            {(columnKey) => (
              <TableCell>{renderCell(post, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}