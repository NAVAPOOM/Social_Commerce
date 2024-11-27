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
import { Product, monthlyStats } from './data';

interface HighlightStatsProps {
  products: Product[];
}

export default function HighlightStats({ products }: HighlightStatsProps) {
  const stats = React.useMemo(() => {
    const totalViews = products.reduce((sum, product) => sum + product.stats.views, 0);
    const totalClicks = products.reduce((sum, product) => sum + product.stats.clicks, 0);
    const totalConversions = products.reduce((sum, product) => sum + product.stats.conversions, 0);
    const totalRevenue = products.reduce((sum, product) => sum + product.stats.revenue, 0);
    const averageGrowth = products.reduce((sum, product) => sum + product.stats.growth, 0) / products.length;

    return {
      totalViews,
      totalClicks,
      totalConversions,
      totalRevenue,
      averageGrowth,
      ctr: (totalClicks / totalViews) * 100,
      conversionRate: (totalConversions / totalClicks) * 100,
    };
  }, [products]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="text-primary" icon="solar:eye-bold" width={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Total Views</span>
            <span className="text-xl font-semibold">
              {stats.totalViews.toLocaleString()}
            </span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
            <Icon
              className="text-success"
              icon="solar:cursor-bold"
              width={24}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">CTR</span>
            <span className="text-xl font-semibold">
              {stats.ctr.toFixed(2)}%
            </span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
            <Icon
              className="text-warning"
              icon="solar:cart-check-bold"
              width={24}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Conversion Rate</span>
            <span className="text-xl font-semibold">
              {stats.conversionRate.toFixed(2)}%
            </span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
            <Icon
              className="text-secondary"
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

      <Card className="col-span-full">
        <CardHeader>
          <h3 className="text-xl font-semibold">Performance Overview</h3>
        </CardHeader>
        <CardBody>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="views"
                  name="Views"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="conversions"
                  name="Conversions"
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