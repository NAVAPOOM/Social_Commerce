'use client';

import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Member } from './data';

interface MemberStatsProps {
  members: Member[];
}

const monthlyData = [
  { month: 'Jan', newMembers: 12, activeMembers: 45 },
  { month: 'Feb', newMembers: 19, activeMembers: 52 },
  { month: 'Mar', newMembers: 15, activeMembers: 58 },
  { month: 'Apr', newMembers: 22, activeMembers: 65 },
  { month: 'May', newMembers: 18, activeMembers: 72 },
  { month: 'Jun', newMembers: 25, activeMembers: 85 },
];

export default function MemberStats({ members }: MemberStatsProps) {
  const stats = React.useMemo(() => {
    const activeMembers = members.filter((m) => m.status === 'active');
    const totalSpent = members.reduce((sum, m) => sum + m.stats.totalSpent, 0);
    const totalOrders = members.reduce((sum, m) => sum + m.stats.totalOrders, 0);
    const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

    return {
      totalMembers: members.length,
      activeMembers: activeMembers.length,
      totalSpent,
      avgOrderValue,
    };
  }, [members]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="text-primary" icon="solar:users-group-rounded-bold" width={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Total Members</span>
            <span className="text-xl font-semibold">{stats.totalMembers}</span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
            <Icon
              className="text-success"
              icon="solar:user-check-rounded-bold"
              width={24}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Active Members</span>
            <span className="text-xl font-semibold">{stats.activeMembers}</span>
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
            <span className="text-small text-default-500">Total Spent</span>
            <span className="text-xl font-semibold">
              ${stats.totalSpent.toLocaleString()}
            </span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
            <Icon
              className="text-secondary"
              icon="solar:cart-large-minimalistic-bold"
              width={24}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Avg. Order Value</span>
            <span className="text-xl font-semibold">
              ${stats.avgOrderValue.toFixed(2)}
            </span>
          </div>
        </CardBody>
      </Card>

      <Card className="col-span-full">
        <CardBody>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="newMembers"
                  name="New Members"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="activeMembers"
                  name="Active Members"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}