'use client';

import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Link,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';

interface SystemUpdate {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'update' | 'maintenance' | 'announcement';
}

const updates: SystemUpdate[] = [
  {
    id: '1',
    title: 'API Version 2.5.0 Released',
    description: 'New features and improvements to the API endpoints',
    date: '2024-03-15',
    type: 'update',
  },
  {
    id: '2',
    title: 'Scheduled Maintenance',
    description: 'System maintenance scheduled for March 20, 2024',
    date: '2024-03-20',
    type: 'maintenance',
  },
  {
    id: '3',
    title: 'New Webhook Events',
    description: 'Additional webhook events for order tracking',
    date: '2024-03-10',
    type: 'announcement',
  },
];

const typeColorMap = {
  update: 'success',
  maintenance: 'warning',
  announcement: 'primary',
} as const;

const typeIconMap = {
  update: 'solar:upload-square-bold',
  maintenance: 'solar:wrench-bold',
  announcement: 'solar:bell-bold',
} as const;

export default function SystemSection() {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <h3 className="text-xl font-semibold">System Updates</h3>
          <p className="text-small text-default-500">
            Latest system updates and announcements
          </p>
        </div>
        <Link
          className="text-primary"
          href="#"
          size="sm"
          underline="always"
        >
          View all updates
        </Link>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {updates.map((update) => (
            <div
              key={update.id}
              className="flex items-start gap-4 rounded-lg border border-default-200 p-4"
            >
              <div
                className={`flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-${typeColorMap[update.type]}/10`}
              >
                <Icon
                  className={`text-${typeColorMap[update.type]}`}
                  icon={typeIconMap[update.type]}
                  width={20}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{update.title}</h4>
                  <Chip
                    className="capitalize"
                    color={typeColorMap[update.type]}
                    size="sm"
                    variant="flat"
                  >
                    {update.type}
                  </Chip>
                </div>
                <p className="mt-1 text-small text-default-500">
                  {update.description}
                </p>
                <p className="mt-2 text-tiny text-default-400">
                  {new Date(update.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}