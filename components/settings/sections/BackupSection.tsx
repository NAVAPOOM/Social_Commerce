'use client';

import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Progress,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';

interface BackupSectionProps {
  onFormChange: () => void;
}

interface BackupHistory {
  id: string;
  date: string;
  size: string;
  type: 'automatic' | 'manual';
  status: 'completed' | 'failed';
}

const backupHistory: BackupHistory[] = [
  {
    id: '1',
    date: '2024-03-15T10:00:00',
    size: '2.5 GB',
    type: 'automatic',
    status: 'completed',
  },
  {
    id: '2',
    date: '2024-03-14T10:00:00',
    size: '2.3 GB',
    type: 'automatic',
    status: 'completed',
  },
  {
    id: '3',
    date: '2024-03-13T15:30:00',
    size: '2.4 GB',
    type: 'manual',
    status: 'failed',
  },
];

export default function BackupSection({ onFormChange }: BackupSectionProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Backup Status</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Last Backup</p>
              <p className="text-small text-default-500">
                March 15, 2024 10:00 AM
              </p>
            </div>
            <Button
              color="primary"
              startContent={<Icon icon="solar:cloud-upload-linear" width={20} />}
              onPress={onFormChange}
            >
              Backup Now
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-small">
              <span>Storage Used</span>
              <span>75.5 GB / 100 GB</span>
            </div>
            <Progress
              aria-label="Storage"
              classNames={{
                base: "max-w-full",
                track: "drop-shadow-md border border-default",
                indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                label: "tracking-wider font-medium text-default-600",
                value: "text-foreground/60",
              }}
              value={75.5}
              showValueLabel
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Backup History</h3>
        </CardHeader>
        <CardBody>
          <Table aria-label="Backup history">
            <TableHeader>
              <TableColumn>DATE</TableColumn>
              <TableColumn>SIZE</TableColumn>
              <TableColumn>TYPE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {backupHistory.map((backup) => (
                <TableRow key={backup.id}>
                  <TableCell>
                    {new Date(backup.date).toLocaleString()}
                  </TableCell>
                  <TableCell>{backup.size}</TableCell>
                  <TableCell>
                    <Chip
                      className="capitalize"
                      color={backup.type === 'automatic' ? 'primary' : 'secondary'}
                      size="sm"
                      variant="flat"
                    >
                      {backup.type}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      className="capitalize"
                      color={backup.status === 'completed' ? 'success' : 'danger'}
                      size="sm"
                      variant="flat"
                    >
                      {backup.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        className="text-default-400"
                        size="sm"
                        variant="light"
                      >
                        <Icon icon="solar:download-linear" width={16} />
                      </Button>
                      <Button
                        isIconOnly
                        className="text-danger"
                        size="sm"
                        variant="light"
                      >
                        <Icon icon="solar:trash-bin-trash-linear" width={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Backup Settings</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Automatic Backups</p>
              <p className="text-small text-default-500">
                Create backups automatically
              </p>
            </div>
            <Switch defaultSelected onValueChange={onFormChange} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Include Media Files</p>
              <p className="text-small text-default-500">
                Backup images and videos
              </p>
            </div>
            <Switch defaultSelected onValueChange={onFormChange} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Backup Retention</p>
              <p className="text-small text-default-500">
                Keep backups for 30 days
              </p>
            </div>
            <Switch defaultSelected onValueChange={onFormChange} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}