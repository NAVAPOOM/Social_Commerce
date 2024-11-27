'use client';

import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Switch,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';

interface AccessLog {
  id: string;
  ipAddress: string;
  timestamp: string;
  action: string;
  status: 'success' | 'failed';
  location: string;
}

const accessLogs: AccessLog[] = [
  {
    id: '1',
    ipAddress: '192.168.1.1',
    timestamp: '2024-03-15T10:00:00',
    action: 'API Key Generated',
    status: 'success',
    location: 'Bangkok, Thailand',
  },
  {
    id: '2',
    ipAddress: '10.0.0.1',
    timestamp: '2024-03-15T09:45:00',
    action: 'Webhook Configuration Updated',
    status: 'success',
    location: 'Singapore',
  },
  {
    id: '3',
    ipAddress: '172.16.0.1',
    timestamp: '2024-03-15T09:30:00',
    action: 'Invalid API Request',
    status: 'failed',
    location: 'Unknown',
  },
];

const statusColorMap = {
  success: 'success',
  failed: 'danger',
} as const;

export default function SecuritySection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div>
            <h3 className="text-xl font-semibold">IP Whitelist</h3>
            <p className="text-small text-default-500">
              Control which IP addresses can access your API
            </p>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">IP Whitelist Protection</p>
              <p className="text-small text-default-500">
                Only allow requests from whitelisted IPs
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex gap-2">
            <Input
              className="flex-1"
              placeholder="Enter IP address"
              startContent={
                <Icon
                  className="text-default-400"
                  icon="solar:shield-keyhole-linear"
                  width={16}
                />
              }
              variant="bordered"
            />
            <Button color="primary">Add IP</Button>
          </div>

          <div className="rounded-lg border border-default-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon
                  className="text-default-500"
                  icon="solar:info-circle-linear"
                  width={20}
                />
                <span className="text-small">Current IP:</span>
                <code className="rounded bg-default-100 px-2 py-1 text-small">
                  127.0.0.1
                </code>
              </div>
              <Button size="sm" variant="flat">
                Add Current IP
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <h3 className="text-xl font-semibold">Access Logs</h3>
            <p className="text-small text-default-500">
              Recent security-related activities
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <Table aria-label="Access logs">
            <TableHeader>
              <TableColumn>TIMESTAMP</TableColumn>
              <TableColumn>IP ADDRESS</TableColumn>
              <TableColumn>ACTION</TableColumn>
              <TableColumn>LOCATION</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody>
              {accessLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <span className="text-small text-default-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <code className="rounded bg-default-100 px-2 py-1 text-small">
                      {log.ipAddress}
                    </code>
                  </TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.location}</TableCell>
                  <TableCell>
                    <Chip
                      className="capitalize"
                      color={statusColorMap[log.status]}
                      size="sm"
                      variant="flat"
                    >
                      {log.status}
                    </Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}