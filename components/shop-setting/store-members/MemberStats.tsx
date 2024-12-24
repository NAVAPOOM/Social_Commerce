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
  Legend,
} from 'recharts';

const monthlyData = [
  { month: 'Jan', newMembers: 12, activeMembers: 45 },
  { month: 'Feb', newMembers: 19, activeMembers: 52 },
  { month: 'Mar', newMembers: 15, activeMembers: 58 },
  { month: 'Apr', newMembers: 22, activeMembers: 65 },
  { month: 'May', newMembers: 18, activeMembers: 72 },
  { month: 'Jun', newMembers: 25, activeMembers: 85 },
];

export default function MemberStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="text-primary" icon="solar:users-group-rounded-bold" width={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Total Members</span>
            <span className="text-xl font-semibold">100</span>
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
            <span className="text-xl font-semibold">43</span>
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
            <span className="text-xl font-semibold">$123,456</span>
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
            <span className="text-xl font-semibold">+12.5%</span>
          </div>
        </CardBody>
      </Card>

      <Card className="col-span-full h-[300px]">
        <CardBody>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis/>
              
              <Tooltip />
              <Legend />
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
        </CardBody>
      </Card>
    </div>
  );
}