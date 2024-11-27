'use client';

import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Switch,
  Checkbox,
  Textarea,
  Tabs,
  Tab,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';

const orderStatuses = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'refunded',
  'failed',
  'on_hold',
];

export default function WebhookSection() {
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([]);

  const selectAll = () => {
    setSelectedStatuses(orderStatuses);
  };

  const clearAll = () => {
    setSelectedStatuses([]);
  };

  const toggleStatus = (status: string) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex justify-between">
          <div>
            <h3 className="text-xl font-semibold">Webhook Configuration</h3>
            <p className="text-small text-default-500">
              Configure your webhook endpoints and notifications
            </p>
          </div>
          <Switch
            isSelected={isEnabled}
            size="lg"
            onValueChange={setIsEnabled}
          />
        </CardHeader>
        <CardBody className="space-y-6">
          <Input
            label="Webhook URL"
            labelPlacement="outside"
            placeholder="https://your-domain.com/webhook"
            variant="bordered"
            startContent={
              <Icon
                className="text-default-400"
                icon="solar:link-circle-linear"
                width={16}
              />
            }
          />

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-small font-medium">Order Status Notifications</p>
              <div className="flex gap-2">
                <Button size="sm" variant="flat" onPress={selectAll}>
                  Select All
                </Button>
                <Button size="sm" variant="flat" onPress={clearAll}>
                  Clear All
                </Button>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {orderStatuses.map((status) => (
                <Checkbox
                  key={status}
                  isSelected={selectedStatuses.includes(status)}
                  onValueChange={() => toggleStatus(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Checkbox>
              ))}
            </div>
          </div>

          <div>
            <Tabs aria-label="Webhook options">
              <Tab
                key="payload"
                title={
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:code-linear" width={20} />
                    Sample Payload
                  </div>
                }
              >
                <Card className="mt-4">
                  <CardBody>
                    <Textarea
                      isReadOnly
                      label="Example Webhook Payload"
                      labelPlacement="outside"
                      minRows={8}
                      value={JSON.stringify({
                        event: 'order.status_changed',
                        order_id: '12345',
                        status: 'processing',
                        timestamp: new Date().toISOString(),
                        data: {
                          customer: {
                            id: '67890',
                            name: 'John Doe',
                          },
                          items: [
                            {
                              id: 'item_1',
                              name: 'Product A',
                              quantity: 2,
                            },
                          ],
                        },
                      }, null, 2)}
                      variant="bordered"
                    />
                  </CardBody>
                </Card>
              </Tab>
              <Tab
                key="test"
                title={
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:test-tube-linear" width={20} />
                    Test Webhook
                  </div>
                }
              >
                <Card className="mt-4">
                  <CardBody className="space-y-4">
                    <Select
                      label="Test Event"
                      placeholder="Select an event to test"
                      variant="bordered"
                    >
                      {orderStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </Select>
                    <Button
                      color="primary"
                      endContent={
                        <Icon icon="solar:play-circle-linear" width={20} />
                      }
                    >
                      Send Test Webhook
                    </Button>
                  </CardBody>
                </Card>
              </Tab>
              <Tab
                key="logs"
                title={
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:history-linear" width={20} />
                    Delivery Logs
                  </div>
                }
              >
                <Card className="mt-4">
                  <CardBody>
                    <p className="text-center text-default-500">
                      No webhook delivery logs available
                    </p>
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}