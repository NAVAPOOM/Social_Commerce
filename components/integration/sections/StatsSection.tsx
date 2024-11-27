'use client';

import React from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
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

const data = [
  { name: 'Jan', requests: 4000, webhooks: 2400, errors: 400 },
  { name: 'Feb', requests: 3000, webhooks: 1398, errors: 210 },
  { name: 'Mar', requests: 2000, webhooks: 9800, errors: 290 },
  { name: 'Apr', requests: 2780, webhooks: 3908, errors: 150 },
  { name: 'May', requests: 1890, webhooks: 4800, errors: 181 },
  { name: 'Jun', requests: 2390, webhooks: 3800, errors: 250 },
];

export default function StatsSection() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="text-primary" icon="solar:graph-new-up-bold" width={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Total Requests</span>
            <span className="text-xl font-semibold">1,234,567</span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
            <Icon
              className="text-success"
              icon="solar:shield-check-bold"
              width={24}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Success Rate</span>
            <span className="text-xl font-semibold">99.9%</span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
            <Icon
              className="text-warning"
              icon="solar:bell-bold"
              width={24}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Webhook Events</span>
            <span className="text-xl font-semibold">45,678</span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-danger/10">
            <Icon
              className="text-danger"
              icon="solar:danger-triangle-bold"
              width={24}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Error Rate</span>
            <span className="text-xl font-semibold">0.1%</span>
          </div>
        </CardBody>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <h3 className="text-xl font-semibold">Usage Trends</h3>
        </CardHeader>
        <CardBody>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="requests"
                  name="API Requests"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="webhooks"
                  name="Webhook Events"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="errors"
                  name="Errors"
                  stroke="#ff7300"
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