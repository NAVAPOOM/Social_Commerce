'use client';

import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Switch,
  Divider,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';

export default function ProductSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Display Settings</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-refresh Data</p>
              <p className="text-small text-default-500">
                Automatically update product statistics
              </p>
            </div>
            <Switch defaultSelected />
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Show Stock Alerts</p>
              <p className="text-small text-default-500">
                Display notifications for low stock items
              </p>
            </div>
            <Switch defaultSelected />
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Performance Alerts</p>
              <p className="text-small text-default-500">
                Get notified about significant changes in product performance
              </p>
            </div>
            <Switch />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Report Settings</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weekly Reports</p>
              <p className="text-small text-default-500">
                Receive weekly performance summaries
              </p>
            </div>
            <Switch defaultSelected />
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Export Format</p>
              <p className="text-small text-default-500">
                Choose default export format
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="flat">
                PDF
              </Button>
              <Button size="sm" variant="flat">
                Excel
              </Button>
            </div>
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Data Range</p>
              <p className="text-small text-default-500">
                Set default time range for reports
              </p>
            </div>
            <Input
              className="w-32"
              defaultValue="30"
              labelPlacement="outside"
              placeholder="Days"
              type="number"
              variant="bordered"
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Notification Settings</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-small text-default-500">
                Receive updates via email
              </p>
            </div>
            <Switch defaultSelected />
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Browser Notifications</p>
              <p className="text-small text-default-500">
                Show desktop notifications
              </p>
            </div>
            <Switch defaultSelected />
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Mobile Notifications</p>
              <p className="text-small text-default-500">
                Push notifications to mobile device
              </p>
            </div>
            <Switch />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}