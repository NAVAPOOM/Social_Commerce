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
import { Post, monthlyStats } from './data';

interface PostStatsProps {
  posts: Post[];
}

export default function PostStats({ posts }: PostStatsProps) {
  const stats = React.useMemo(() => {
    const activePosts = posts.filter((p) => p.status === 'active');
    const totalReach = posts.reduce((sum, post) => sum + post.stats.reach, 0);
    const totalEngagement = posts.reduce(
      (sum, post) => sum + post.stats.engagement,
      0
    );
    const totalOrders = posts.reduce(
      (sum, post) => sum + post.stats.orders,
      0
    );
    const averageResponseRate =
      posts.reduce((sum, post) => sum + post.stats.responseRate, 0) /
      posts.length;

    return {
      activePosts: activePosts.length,
      totalReach,
      totalEngagement,
      totalOrders,
      averageResponseRate,
    };
  }, [posts]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="text-primary" icon="solar:posts-carousel-vertical-bold" width={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Active Posts</span>
            <span className="text-xl font-semibold">{stats.activePosts}</span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
            <Icon
              className="text-success"
              icon="solar:users-group-rounded-bold"
              width={24}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Total Reach</span>
            <span className="text-xl font-semibold">
              {stats.totalReach.toLocaleString()}
            </span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
            <Icon
              className="text-warning"
              icon="solar:chat-round-dots-bold"
              width={24}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-small text-default-500">Engagement</span>
            <span className="text-xl font-semibold">
              {stats.totalEngagement.toLocaleString()}
            </span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
            <Icon
              className="text-secondary"
              icon="solar:cart-large-2-bold"
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
            <span className="text-small text-default-500">Response Rate</span>
            <span className="text-xl font-semibold">
              {stats.averageResponseRate.toFixed(1)}%
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
                  dataKey="reach"
                  name="Reach"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  name="Orders"
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