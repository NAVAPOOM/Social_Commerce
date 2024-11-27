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
  Legend,
} from 'recharts';
import { Campaign, monthlyStats } from './data';

interface CampaignStatsProps {
  campaigns: Campaign[];
}

export default function CampaignStats({ campaigns }: CampaignStatsProps) {
  const stats = React.useMemo(() => {
    const activeCampaigns = campaigns.filter((c) => c.status === 'active');
    const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
    const totalRevenue = campaigns.reduce((sum, c) => sum + c.stats.revenue, 0);
    const averageROI = campaigns.reduce((sum, c) => sum + c.stats.roi, 0) / campaigns.length;

    return {
      activeCampaigns: activeCampaigns.length,
      totalBudget,
      totalRevenue,
      averageROI,
    };
  }, [campaigns]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="text-primary" icon="solar:flag-bold" width={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Active Campaigns</span>
            <span className="text-xl font-semibold">{stats.activeCampaigns}</span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
            <Icon
              className="text-success"
              icon="solar:dollar-bold"
              width={24}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Total Budget</span>
            <span className="text-xl font-semibold">
              ${stats.totalBudget.toLocaleString()}
            </span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
            <Icon
              className="text-warning"
              icon="solar:chart-2-bold"
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
              icon="solar:chart-path-bold"
              width={24}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Average ROI</span>
            <span className="text-xl font-semibold">
              {stats.averageROI.toFixed(1)}x
            </span>
          </div>
        </CardBody>
      </Card>

      <Card className="col-span-full">
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
                  dataKey="revenue"
                  name="Revenue ($)"
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