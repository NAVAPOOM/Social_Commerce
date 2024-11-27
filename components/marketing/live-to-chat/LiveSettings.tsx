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

export default function LiveSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Facebook Connection</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Icon icon="logos:facebook" width={24} />
              <div>
                <p className="font-medium">Facebook Page</p>
                <p className="text-small text-default-500">
                  Connected as Acme Store
                </p>
              </div>
            </div>
            <Button color="danger" variant="light">
              Disconnect
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Auto-Response Settings</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Default Auto-Response</p>
              <p className="text-small text-default-500">
                Enable automatic responses to comments
              </p>
            </div>
            <Switch defaultSelected />
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Include Product Images</p>
              <p className="text-small text-default-500">
                Automatically include product images in responses
              </p>
            </div>
            <Switch defaultSelected />
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Response Delay</p>
              <p className="text-small text-default-500">
                Set delay between responses (in seconds)
              </p>
            </div>
            <Input
              className="w-32"
              defaultValue="30"
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
                Receive email updates about live stream status
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
              <p className="font-medium">Performance Reports</p>
              <p className="text-small text-default-500">
                Receive weekly live stream performance reports
              </p>
            </div>
            <Switch />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}