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
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';

interface SecuritySectionProps {
  onFormChange: () => void;
}

interface LoginSession {
  id: string;
  device: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  status: 'active' | 'expired';
}

const loginSessions: LoginSession[] = [
  {
    id: '1',
    device: 'Chrome on Windows',
    location: 'Bangkok, Thailand',
    ipAddress: '192.168.1.1',
    lastActive: '2024-03-15T10:00:00',
    status: 'active',
  },
  {
    id: '2',
    device: 'Safari on iPhone',
    location: 'Singapore',
    ipAddress: '10.0.0.1',
    lastActive: '2024-03-14T15:30:00',
    status: 'active',
  },
  {
    id: '3',
    device: 'Firefox on MacOS',
    location: 'Unknown',
    ipAddress: '172.16.0.1',
    lastActive: '2024-03-10T09:00:00',
    status: 'expired',
  },
];

export default function SecuritySection({ onFormChange }: SecuritySectionProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Change Password</h3>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input
            label="Current Password"
            placeholder="Enter your current password"
            type="password"
            variant="bordered"
            onChange={onFormChange}
          />
          <Input
            label="New Password"
            placeholder="Enter new password"
            type="password"
            variant="bordered"
            onChange={onFormChange}
          />
          <Input
            label="Confirm New Password"
            placeholder="Confirm new password"
            type="password"
            variant="bordered"
            onChange={onFormChange}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Two-Factor Authentication</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable 2FA</p>
              <p className="text-small text-default-500">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch onValueChange={onFormChange} />
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Backup Codes</p>
              <p className="text-small text-default-500">
                Generate backup codes for account recovery
              </p>
            </div>
            <Button
              color="primary"
              variant="flat"
              startContent={<Icon icon="solar:key-linear" width={20} />}
            >
              Generate Codes
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Active Sessions</h3>
        </CardHeader>
        <CardBody>
          <Table aria-label="Active sessions">
            <TableHeader>
              <TableColumn>DEVICE</TableColumn>
              <TableColumn>LOCATION</TableColumn>
              <TableColumn>IP ADDRESS</TableColumn>
              <TableColumn>LAST ACTIVE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {loginSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Icon
                        className="text-default-500"
                        icon="solar:devices-linear"
                        width={20}
                      />
                      <span>{session.device}</span>
                    </div>
                  </TableCell>
                  <TableCell>{session.location}</TableCell>
                  <TableCell>
                    <code className="rounded bg-default-100 px-2 py-1">
                      {session.ipAddress}
                    </code>
                  </TableCell>
                  <TableCell>
                    {new Date(session.lastActive).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      className="capitalize"
                      color={session.status === 'active' ? 'success' : 'default'}
                      size="sm"
                      variant="flat"
                    >
                      {session.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Button
                      isDisabled={session.status === 'expired'}
                      color="danger"
                      size="sm"
                      variant="light"
                    >
                      Revoke
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Account Security</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Login Notifications</p>
              <p className="text-small text-default-500">
                Get notified of new sign-ins to your account
              </p>
            </div>
            <Switch defaultSelected onValueChange={onFormChange} />
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Secure Boot</p>
              <p className="text-small text-default-500">
                Require PIN when accessing sensitive information
              </p>
            </div>
            <Switch onValueChange={onFormChange} />
          </div>

          <Divider />

          <div>
            <Button
              color="danger"
              variant="flat"
              startContent={<Icon icon="solar:trash-bin-trash-linear" width={20} />}
            >
              Delete Account
            </Button>
            <p className="mt-2 text-tiny text-danger">
              Warning: This action is irreversible and will permanently delete all your data.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}