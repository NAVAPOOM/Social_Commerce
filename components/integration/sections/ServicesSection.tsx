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

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'connected' | 'disconnected' | 'pending';
  lastSync?: string;
}

const services: Service[] = [
  {
    id: '1',
    name: 'Kerry Express',
    description: 'Shipping service integration',
    icon: 'solar:truck-bold',
    status: 'connected',
    lastSync: '2024-03-15T10:00:00',
  },
  {
    id: '2',
    name: 'Flash Express',
    description: 'Shipping service integration',
    icon: 'solar:delivery-bold',
    status: 'disconnected',
  },
  {
    id: '3',
    name: 'SCB Payment',
    description: 'Payment gateway integration',
    icon: 'solar:card-bold',
    status: 'connected',
    lastSync: '2024-03-15T09:30:00',
  },
  {
    id: '4',
    name: 'Line Messaging',
    description: 'Messaging service integration',
    icon: 'logos:line',
    status: 'connected',
    lastSync: '2024-03-15T11:00:00',
  },
];

const statusColorMap = {
  connected: 'success',
  disconnected: 'danger',
  pending: 'warning',
} as const;

export default function ServicesSection() {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <h3 className="text-xl font-semibold">External Services</h3>
          <p className="text-small text-default-500">
            Manage your external service integrations
          </p>
        </div>
        <Button
          color="primary"
          endContent={<Icon icon="solar:add-circle-linear" width={20} />}
        >
          Add Service
        </Button>
      </CardHeader>
      <CardBody>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className="border-1 border-default-200"
              isPressable
            >
              <CardBody className="gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon
                      className="text-primary"
                      icon={service.icon}
                      width={24}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-medium font-semibold">
                      {service.name}
                    </h4>
                    <p className="text-small text-default-500">
                      {service.description}
                    </p>
                  </div>
                  <Chip
                    className="capitalize"
                    color={statusColorMap[service.status]}
                    size="sm"
                    variant="flat"
                  >
                    {service.status}
                  </Chip>
                </div>

                {service.lastSync && (
                  <div className="flex items-center gap-2 text-small text-default-500">
                    <Icon icon="solar:clock-circle-linear" width={16} />
                    <span>
                      Last synced:{' '}
                      {new Date(service.lastSync).toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  {service.status === 'connected' ? (
                    <>
                      <Button
                        size="sm"
                        variant="flat"
                        startContent={
                          <Icon icon="solar:refresh-circle-linear" width={18} />
                        }
                      >
                        Sync
                      </Button>
                      <Button
                        color="danger"
                        size="sm"
                        variant="flat"
                        startContent={
                          <Icon icon="solar:plug-circle-linear" width={18} />
                        }
                      >
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button
                      color="success"
                      size="sm"
                      variant="flat"
                      startContent={
                        <Icon icon="solar:plug-circle-linear" width={18} />
                      }
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}