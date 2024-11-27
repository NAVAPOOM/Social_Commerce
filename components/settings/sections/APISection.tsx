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
  Tooltip,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';

interface APISectionProps {
  onFormChange: () => void;
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
  status: 'active' | 'expired' | 'revoked';
}

const apiKeys: APIKey[] = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'sk_live_1234567890abcdef',
    createdAt: '2024-03-15T10:00:00',
    lastUsed: '2024-03-15T15:30:00',
    status: 'active',
  },
  {
    id: '2',
    name: 'Development API Key',
    key: 'sk_test_1234567890abcdef',
    createdAt: '2024-03-10T09:00:00',
    lastUsed: '2024-03-14T16:45:00',
    status: 'active',
  },
  {
    id: '3',
    name: 'Old API Key',
    key: 'sk_old_1234567890abcdef',
    createdAt: '2024-02-01T08:00:00',
    lastUsed: '2024-03-01T12:00:00',
    status: 'revoked',
  },
];

const statusColorMap = {
  active: 'success',
  expired: 'warning',
  revoked: 'danger',
} as const;

export default function APISection({ onFormChange }: APISectionProps) {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const copyToClipboard = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex justify-between">
          <div>
            <h3 className="text-xl font-semibold">API Keys</h3>
            <p className="text-small text-default-500">
              Manage your API keys for authentication
            </p>
          </div>
          <Button
            color="primary"
            endContent={<Icon icon="solar:key-linear" width={20} />}
            onPress={onFormChange}
          >
            Generate New Key
          </Button>
        </CardHeader>
        <CardBody>
          <Table aria-label="API keys table">
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>API KEY</TableColumn>
              <TableColumn>CREATED</TableColumn>
              <TableColumn>LAST USED</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {apiKeys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-small font-medium">
                        {key.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="rounded bg-default-100 px-2 py-1 text-small">
                        {key.key.slice(0, 8)}...
                      </code>
                      <Button
                        isIconOnly
                        className="min-w-unit-8 h-unit-8"
                        size="sm"
                        variant="light"
                        onPress={() => copyToClipboard(key.key)}
                      >
                        {copiedKey === key.key ? (
                          <Icon
                            className="text-success"
                            icon="solar:check-read-linear"
                            width={16}
                          />
                        ) : (
                          <Icon
                            className="text-default-400"
                            icon="solar:copy-linear"
                            width={16}
                          />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-small text-default-500">
                      {new Date(key.createdAt).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-small text-default-500">
                      {new Date(key.lastUsed).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Chip
                      className="capitalize"
                      color={statusColorMap[key.status]}
                      size="sm"
                      variant="flat"
                    >
                      {key.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Tooltip content="View usage">
                        <Button
                          isIconOnly
                          className="text-default-400"
                          size="sm"
                          variant="light"
                        >
                          <Icon icon="solar:graph-new-linear" width={16} />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Revoke key">
                        <Button
                          isIconOnly
                          className="text-danger"
                          size="sm"
                          variant="light"
                        >
                          <Icon icon="solar:shield-cross-linear" width={16} />
                        </Button>
                      </Tooltip>
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
          <h3 className="text-xl font-semibold">API Usage</h3>
        </CardHeader>
        <CardBody>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardBody>
                <div className="flex items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon
                      className="text-primary"
                      icon="solar:graph-new-up-linear"
                      width={24}
                    />
                  </div>
                  <div>
                    <p className="text-small text-default-500">
                      Total Requests
                    </p>
                    <p className="text-xl font-semibold">1,234,567</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="flex items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                    <Icon
                      className="text-success"
                      icon="solar:chart-2-linear"
                      width={24}
                    />
                  </div>
                  <div>
                    <p className="text-small text-default-500">
                      Success Rate
                    </p>
                    <p className="text-xl font-semibold">99.9%</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="flex items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                    <Icon
                      className="text-warning"
                      icon="solar:timer-linear"
                      width={24}
                    />
                  </div>
                  <div>
                    <p className="text-small text-default-500">
                      Avg. Response Time
                    </p>
                    <p className="text-xl font-semibold">245ms</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Webhook Settings</h3>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input
            label="Webhook URL"
            placeholder="https://your-domain.com/webhook"
            startContent={
              <Icon
                className="text-default-400"
                icon="solar:link-circle-linear"
                width={16}
              />
            }
            type="url"
            variant="bordered"
            onChange={onFormChange}
          />
          <Button
            color="primary"
            variant="flat"
            onPress={onFormChange}
          >
            Test Webhook
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}