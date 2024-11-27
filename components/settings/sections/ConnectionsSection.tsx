'use client';

import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';

interface ConnectionsSectionProps {
  onFormChange: () => void;
}

interface Connection {
  id: string;
  name: string;
  icon: string;
  status: 'connected' | 'disconnected';
  lastSync?: string;
  permissions: string[];
}

const connections: Connection[] = [
  {
    id: '1',
    name: 'Google',
    icon: 'logos:google-icon',
    status: 'connected',
    lastSync: '2024-03-15T10:00:00',
    permissions: ['email', 'profile', 'calendar'],
  },
  {
    id: '2',
    name: 'Facebook',
    icon: 'logos:facebook',
    status: 'connected',
    lastSync: '2024-03-14T15:30:00',
    permissions: ['email', 'profile', 'pages'],
  },
  {
    id: '3',
    name: 'Twitter',
    icon: 'logos:twitter',
    status: 'disconnected',
    permissions: ['profile', 'tweets'],
  },
  {
    id: '4',
    name: 'Line',
    icon: 'logos:line',
    status: 'connected',
    lastSync: '2024-03-15T09:00:00',
    permissions: ['profile', 'messaging'],
  },
];

export default function ConnectionsSection({ onFormChange }: ConnectionsSectionProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Connected Accounts</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {connections.map((connection) => (
              <div
                key={connection.id}
                className="flex items-center justify-between rounded-lg border border-default-200 p-4"
              >
                <div className="flex items-center gap-4">
                  <Icon icon={connection.icon} width={24} />
                  <div>
                    <p className="font-medium">{connection.name}</p>
                    <p className="text-small text-default-500">
                      {connection.status === 'connected'
                        ? `Last synced: ${new Date(
                            connection.lastSync!
                          ).toLocaleString()}`
                        : 'Not connected'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden flex-col items-end gap-2 sm:flex">
                    <Chip
                      className="capitalize"
                      color={
                        connection.status === 'connected'
                          ? 'success'
                          : 'default'
                      }
                      size="sm"
                      variant="flat"
                    >
                      {connection.status}
                    </Chip>
                    <div className="flex gap-1">
                      {connection.permissions.map((permission) => (
                        <Chip
                          key={permission}
                          className="capitalize"
                          size="sm"
                          variant="flat"
                        >
                          {permission}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  {connection.status === 'connected' ? (
                    <Button
                      color="danger"
                      size="sm"
                      variant="flat"
                      onPress={onFormChange}
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      size="sm"
                      variant="flat"
                      onPress={onFormChange}
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Available Connections</h3>
        </CardHeader>
        <CardBody>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card
              isPressable
              className="border-1 border-dashed border-default-200"
            >
              <CardBody className="flex flex-row items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-default-100">
                  <Icon
                    className="text-default-500"
                    icon="solar:add-circle-linear"
                    width={24}
                  />
                </div>
                <div>
                  <p className="font-medium">Add New Connection</p>
                  <p className="text-small text-default-500">
                    Connect with other services
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}