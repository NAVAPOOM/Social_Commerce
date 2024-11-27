'use client';

import React from 'react';
import { Card, CardBody, Switch, Tooltip, Chip, Image } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { ShippingMethod } from './data';

interface ShippingMethodCardProps {
  method: ShippingMethod;
  onEdit: (id: string) => void;
}

export default function ShippingMethodCard({
  method,
  onEdit,
}: ShippingMethodCardProps) {
  return (
    <Card
      isPressable
      className="border-1 border-default-200 transition-transform hover:scale-[1.02]"
      onPress={() => onEdit(method.id)}
    >
      <CardBody className="gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="text-primary" icon={method.icon} width={24} />
            </div>
            <div>
              <h3 className="font-semibold">{method.name}</h3>
              <p className="text-small text-default-500">
                {method.description}
              </p>
            </div>
          </div>
          <Tooltip content={method.isActive ? 'Active' : 'Inactive'}>
            <Switch
              isSelected={method.isActive}
              size="sm"
              onClick={(e) => e.stopPropagation()}
            />
          </Tooltip>
        </div>

        {method.infographic && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              alt={`${method.name} infographic`}
              className="object-cover"
              src={method.infographic}
            />
          </div>
        )}

        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-2">
            <Icon
              className="text-default-500"
              icon="solar:clock-circle-linear"
              width={16}
            />
            <span className="text-small text-default-500">
              {method.deliveryTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Chip
              className="capitalize"
              color={method.isActive ? 'success' : 'default'}
              size="sm"
              variant="flat"
            >
              ${method.price}
            </Chip>
            {method.stats && method.stats.growth > 0 && (
              <Chip
                className="capitalize"
                color="success"
                size="sm"
                variant="dot"
              >
                +{method.stats.growth}%
              </Chip>
            )}
          </div>
        </div>

        {method.stats && (
          <div className="mt-2 flex items-center justify-between border-t pt-3">
            <div className="flex items-center gap-2">
              <Icon
                className="text-default-500"
                icon="solar:box-minimalistic-linear"
                width={16}
              />
              <span className="text-small text-default-500">
                {method.stats.ordersCount.toLocaleString()} orders
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icon
                className="text-default-500"
                icon="solar:dollar-minimalistic-linear"
                width={16}
              />
              <span className="text-small text-default-500">
                ${method.stats.revenue.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}