'use client';

import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Chip,
  Button,
  Progress,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { Branch } from './data';

interface BranchGridProps {
  branches: Branch[];
  onEdit: (id: string) => void;
}

const statusColorMap = {
  active: 'success',
  inactive: 'danger',
  maintenance: 'warning',
} as const;

const typeIconMap = {
  main: 'solar:shop-2-bold',
  sub: 'solar:shop-bold',
  warehouse: 'solar:box-bold',
} as const;

export default function BranchGrid({ branches, onEdit }: BranchGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {branches.map((branch) => (
        <Card
          isPressable
          key={branch.id}
          className="border-1 border-default-200"
          onPress={() => onEdit(branch.id)}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              alt={branch.name}
              className="aspect-video w-full object-cover"
              src={branch.image}
            />
          </CardBody>
          <CardBody className="gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon
                    className="text-primary"
                    icon={typeIconMap[branch.type]}
                    width={24}
                  />
                </div>
                <div>
                  <h4 className="text-medium font-semibold">{branch.name}</h4>
                  <p className="text-small text-default-500">{branch.code}</p>
                </div>
              </div>
              <Chip
                className="capitalize"
                color={statusColorMap[branch.status]}
                size="sm"
                variant="flat"
              >
                {branch.status}
              </Chip>
            </div>

            <div className="flex items-center gap-1 text-small text-default-500">
              <Icon icon="solar:map-point-linear" width={16} />
              <span>
                {branch.address.district}, {branch.address.city}
              </span>
            </div>

            <div className="flex items-center gap-1 text-small text-default-500">
              <Icon icon="solar:user-rounded-linear" width={16} />
              <span>{branch.contact.manager}</span>
            </div>

            <Progress
              aria-label="Monthly Growth"
              classNames={{
                base: "max-w-full",
                track: "drop-shadow-md border border-default",
                indicator: branch.stats.monthlyGrowth >= 0
                  ? "bg-gradient-to-r from-success-500 to-success-200"
                  : "bg-gradient-to-r from-danger-500 to-danger-200",
                label: "tracking-wider font-medium text-default-600",
                value: "text-foreground/60",
              }}
              label="Monthly Growth"
              size="sm"
              value={Math.abs(branch.stats.monthlyGrowth)}
              showValueLabel
            />
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex flex-1 flex-col">
              <p className="text-small text-default-500">Total Orders</p>
              <p className="text-medium font-semibold">
                {branch.stats.totalOrders.toLocaleString()}
              </p>
            </div>
            <div className="flex flex-1 flex-col">
              <p className="text-small text-default-500">Revenue</p>
              <p className="text-medium font-semibold">
                ${branch.stats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="flex flex-1 flex-col">
              <p className="text-small text-default-500">Rating</p>
              <div className="flex items-center gap-1">
                <Icon
                  className="text-warning"
                  icon="solar:star-bold"
                  width={16}
                />
                <p className="text-medium font-semibold">
                  {branch.stats.averageRating}
                </p>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}