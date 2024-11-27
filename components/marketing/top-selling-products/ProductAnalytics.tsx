'use client';

import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Tabs,
  Tab,
  Progress,
  Chip,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Product, monthlyStats } from './data';

interface ProductAnalyticsProps {
  products: Product[];
}

export default function ProductAnalytics({ products }: ProductAnalyticsProps) {
  const [timeRange, setTimeRange] = React.useState('30d');

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <Card className="col-span-full">
        <CardHeader className="flex justify-between">
          <h3 className="text-xl font-semibold">Performance Overview</h3>
          <Tabs
            aria-label="Time range"
            color="primary"
            radius="full"
            size="sm"
            variant="solid"
          >
            <Tab key="7d" title="7 Days" />
            <Tab key="30d" title="30 Days" />
            <Tab key="90d" title="90 Days" />
          </Tabs>
        </CardHeader>
        <CardBody>
          <div className="h-[400px] w-full">
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
                  dataKey="sales"
                  name="Sales"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue ($)"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales by Category */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Sales by Category</h3>
          </CardHeader>
          <CardBody>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" name="Sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        {/* Revenue Distribution */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Revenue Distribution</h3>
          </CardHeader>
          <CardBody>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue ($)" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Stock Status */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Stock Status</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-small">{product.name}</span>
                    <span className="text-small font-semibold">
                      {product.stats.stockLevel}%
                    </span>
                  </div>
                  <Progress
                    aria-label="Stock level"
                    classNames={{
                      base: "max-w-full",
                      track: "drop-shadow-md border border-default",
                      indicator:
                        product.stats.stockLevel > 50
                          ? "bg-success"
                          : product.stats.stockLevel > 20
                          ? "bg-warning"
                          : "bg-danger",
                    }}
                    size="sm"
                    value={product.stats.stockLevel}
                  />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Customer Ratings */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Customer Ratings</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between"
                >
                  <span className="text-small">{product.name}</span>
                  <div className="flex items-center gap-2">
                    <Icon
                      className="text-warning"
                      icon="solar:star-bold"
                      width={16}
                    />
                    <span className="text-small font-semibold">
                      {product.stats.averageRating}
                    </span>
                    <span className="text-tiny text-default-500">
                      ({product.stats.reviewCount})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Growth Trends */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Growth Trends</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between"
                >
                  <span className="text-small">{product.name}</span>
                  <Chip
                    className="capitalize"
                    color={
                      product.stats.growth >= 0 ? 'success' : 'danger'
                    }
                    size="sm"
                    variant="flat"
                  >
                    {product.stats.growth >= 0 ? '+' : ''}
                    {product.stats.growth}%
                  </Chip>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
