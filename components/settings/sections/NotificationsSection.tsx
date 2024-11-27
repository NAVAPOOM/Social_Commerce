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

interface NotificationsSectionProps {
  onFormChange: () => void;
}

export default function NotificationsSection({ onFormChange }: NotificationsSectionProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Email Notifications</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Customer Inquiries</p>
              <p className="text-small text-default-500">
                Get notified when a customer sends a message
              </p>
            </div>
            <Switch defaultSelected onValueChange={onFormChange} />
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Order Updates</p>
              <p className="text-small text-default-500">
                Receive notifications about order status changes
              </p>
            </div>
            <Switch defaultSelected onValueChange={onFormChange} />
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Product Reviews</p>
              <p className="text-small text-default-500">
                Get notified when products receive new reviews
              </p>
            </div>
            <Switch onValueChange={onFormChange} />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Push Notifications</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Browser Notifications</p>
              <p className="text-small text-default-500">
                Show desktop notifications
              </p>
            </div>
            <Switch defaultSelected onValueChange={onFormChange} />
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Mobile Push Notifications</p>
              <p className="text-small text-default-500">
                Send notifications to mobile devices
              </p>
            </div>
            <Switch defaultSelected onValueChange={onFormChange} />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Notification Preferences</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Email Frequency"
              placeholder="Select frequency"
              variant="bordered"
              onChange={onFormChange}
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
              onChange={onFormChange}
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
            onChange={onFormChange}
          />
        </CardBody>
      </Card>
    </div>
  );
}