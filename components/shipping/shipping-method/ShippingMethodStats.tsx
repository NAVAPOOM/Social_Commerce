'use client';

import React from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { shippingMethods } from './data';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const chartData = [
  { name: 'Jan', orders: 400 },
  { name: 'Feb', orders: 300 },
  { name: 'Mar', orders: 600 },
  { name: 'Apr', orders: 800 },
  { name: 'May', orders: 500 },
  { name: 'Jun', orders: 700 },
];

export default function ShippingMethodStats() {
  const stats = React.useMemo(() => {
    const activeMethods = shippingMethods.filter((m) => m.isActive);
    const totalOrders = shippingMethods.reduce(
      (sum, method) => sum + (method.stats?.ordersCount || 0),
      0
    );
    const totalRevenue = shippingMethods.reduce(
      (sum, method) => sum + (method.stats?.revenue || 0),
      0
    );
    const averageGrowth =
      shippingMethods.reduce(
        (sum, method) => sum + (method.stats?.growth || 0),
        0
      ) / shippingMethods.length;

    return {
      activeMethods: activeMethods.length,
      totalOrders,
      totalRevenue,
      averageGrowth,
    };
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="text-primary" icon="solar:box-bold" width={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Active Methods</span>
            <span className="text-xl font-semibold">{stats.activeMethods}</span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
            <Icon
              className="text-success"
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

      <Card className="col-span-full">
        <CardHeader>
          <h3 className="text-xl font-semibold">Orders Trend</h3>
        </CardHeader>
        <CardBody>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#8884d8"
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