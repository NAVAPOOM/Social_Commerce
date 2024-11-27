'use client';

import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { Branch } from './data';

interface BranchStatsProps {
  branches: Branch[];
}

export default function BranchStats({ branches }: BranchStatsProps) {
  const stats = React.useMemo(() => {
    const activeBranches = branches.filter((b) => b.status === 'active');
    const totalRevenue = branches.reduce((sum, b) => sum + b.stats.totalRevenue, 0);
    const totalOrders = branches.reduce((sum, b) => sum + b.stats.totalOrders, 0);
    const averageGrowth = branches.reduce((sum, b) => sum + b.stats.monthlyGrowth, 0) / branches.length;

    return {
      totalBranches: branches.length,
      activeBranches: activeBranches.length,
      totalRevenue,
      totalOrders,
      averageGrowth,
    };
  }, [branches]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="text-primary" icon="solar:shop-2-bold" width={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Total Branches</span>
            <span className="text-xl font-semibold">{stats.totalBranches}</span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
            <Icon
              className="text-success"
              icon="solar:check-circle-bold"
              width={24}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Active Branches</span>
            <span className="text-xl font-semibold">{stats.activeBranches}</span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
            <Icon
              className="text-warning"
              icon="solar:dollar-bold"
              width={24}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Total Revenue</span>
            <span className="text-xl font-semibold">
              ${stats.totalRevenue.toLocaleString()}
            </span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
            <Icon
              className="text-secondary"
              icon="solar:cart-check-bold"
              width={24}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Total Orders</span>
            <span className="text-xl font-semibold">
              {stats.totalOrders.toLocaleString()}
            </span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-danger/10">
            <Icon
              className="text-danger"
              icon="solar:chart-2-bold"
              width={24}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Average Growth</span>
            <span className="text-xl font-semibold">
              {stats.averageGrowth.toFixed(1)}%
            </span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}