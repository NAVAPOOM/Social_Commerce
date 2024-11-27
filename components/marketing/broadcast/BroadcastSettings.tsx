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

export default function BroadcastSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Platform Connections</h3>
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

          <Divider />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Icon icon="logos:line" width={24} />
              <div>
                <p className="font-medium">LINE Official Account</p>
                <p className="text-small text-default-500">
                  Connected as @acmestore
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
          <h3 className="text-xl font-semibold">Notification Settings</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-small text-default-500">
                Receive email updates about broadcast status
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
              <p className="font-medium">Scheduled Reports</p>
              <p className="text-small text-default-500">
                Receive weekly performance reports
              </p>
            </div>
            <Switch />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Default Settings</h3>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input
            label="Default Time Zone"
            placeholder="Select timezone"
            type="text"
            value="(GMT+07:00) Bangkok"
            variant="bordered"
          />
          <Input
            label="Default Language"
            placeholder="Select language"
            type="text"
            value="Thai"
            variant="bordered"
          />
        </CardBody>
      </Card>
    </div>
  );
}