'use client';

import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Switch,
  Input,
  Select,
  SelectItem,
  Divider,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';

export default function NotificationsSection() {
  return (
    <Card>
      <CardHeader>
        <div>
          <h3 className="text-xl font-semibold">Notification Settings</h3>
          <p className="text-small text-default-500">
            Configure how you receive integration notifications
          </p>
        </div>
      </CardHeader>
      <CardBody className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Email Notifications</p>
            <p className="text-small text-default-500">
              Receive notifications via email
            </p>
          </div>
          <Switch defaultSelected />
        </div>

        <Divider />

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">SMS Notifications</p>
            <p className="text-small text-default-500">
              Get important alerts via SMS
            </p>
          </div>
          <Switch />
        </div>

        <Divider />

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Line Notifications</p>
            <p className="text-small text-default-500">
              Receive notifications via Line
            </p>
          </div>
          <Switch defaultSelected />
        </div>

        <Divider />

        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Notification Frequency"
            placeholder="Select frequency"
            variant="bordered"
          >
            <SelectItem key="realtime">Real-time</SelectItem>
            <SelectItem key="hourly">Hourly Digest</SelectItem>
            <SelectItem key="daily">Daily Digest</SelectItem>
            <SelectItem key="weekly">Weekly Digest</SelectItem>
          </Select>

          <Select
            label="Notification Priority"
            placeholder="Select priority"
            variant="bordered"
          >
            <SelectItem key="all">All Notifications</SelectItem>
            <SelectItem key="high">High Priority Only</SelectItem>
            <SelectItem key="medium">Medium & High Priority</SelectItem>
          </Select>
        </div>

        <Input
          label="Additional Email Recipients"
          labelPlacement="outside"
          placeholder="Enter email addresses (comma-separated)"
          variant="bordered"
          startContent={
            <Icon
              className="text-default-400"
              icon="solar:letter-linear"
              width={16}
            />
          }
        />
      </CardBody>
    </Card>
  );
}