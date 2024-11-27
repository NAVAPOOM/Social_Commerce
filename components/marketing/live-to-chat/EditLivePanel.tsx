'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Button,
  Input,
  Textarea,
  Switch,
  Card,
  CardBody,
  Tabs,
  Tab,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { liveData } from './data';

interface EditLivePanelProps {
  liveId: string | null;
  onClose: () => void;
}

export default function EditLivePanel({
  liveId,
  onClose,
}: EditLivePanelProps) {
  const live = React.useMemo(
    () => liveData.find((l) => l.id === liveId),
    [liveId]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  if (!live) return null;

  return (
    <Sheet isOpen={!!liveId} onOpenChange={onClose}>
      <SheetContent size="xl">
        <form className="flex h-full flex-col gap-4" onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Edit Live Stream</SheetTitle>
          </SheetHeader>

          <Tabs aria-label="Live settings">
            <Tab
              key="basic"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:play-stream-linear" width={20} />
                  Basic Info
                </div>
              }
            >
              <div className="mt-4 grid gap-4">
                <Input
                  isRequired
                  label="Live Title"
                  placeholder="Enter live stream title"
                  value={live.title}
                  variant="bordered"
                />
                <Input
                  isRequired
                  label="Facebook Post ID"
                  placeholder="Enter Facebook post ID"
                  value={live.postId}
                  variant="bordered"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    isRequired
                    label="Schedule Date"
                    placeholder="Select date"
                    type="date"
                    value={new Date(live.scheduledFor).toISOString().split('T')[0]}
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="Schedule Time"
                    placeholder="Select time"
                    type="time"
                    value={new Date(live.scheduledFor).toISOString().split('T')[1].slice(0, 5)}
                    variant="bordered"
                  />
                </div>
              </div>
            </Tab>
            <Tab
              key="products"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:box-minimalistic-linear" width={20} />
                  Products
                </div>
              }
            >
              <div className="mt-4 space-y-4">
                <Card>
                  <CardBody className="gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon
                          className="text-default-500"
                          icon="solar:box-minimalistic-linear"
                          width={20}
                        />
                        <span>Selected Products</span>
                      </div>
                      <Button
                        color="primary"
                        size="sm"
                        variant="flat"
                      >
                        Manage Products
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-small text-default-500">
                      <div>{live.products.total} Products</div>
                      <div>{live.products.catalogs} Catalogs</div>
                      <div>{live.products.skus} SKUs</div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Tab>
            <Tab
              key="response"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:chat-round-dots-linear" width={20} />
                  Response
                </div>
              }
            >
              <div className="mt-4 space-y-4">
                <Card>
                  <CardBody className="gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-small">Auto-Response</span>
                      <Switch
                        defaultSelected={live.settings.autoResponse}
                        size="sm"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-small">Include Product Images</span>
                      <Switch
                        defaultSelected={live.settings.includeImages}
                        size="sm"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-small">Response Delay</span>
                      <Input
                        className="w-24"
                        size="sm"
                        type="number"
                        value={live.settings.responseDelay.toString()}
                        variant="bordered"
                      />
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Tab>
            <Tab
              key="analytics"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:graph-new-linear" width={20} />
                  Analytics
                </div>
              }
            >
              <div className="mt-4 space-y-4">
                <Card>
                  <CardBody className="gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-small text-default-500">Total Reach</p>
                        <p className="text-xl font-semibold">
                          {live.stats.reach.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-small text-default-500">Engagement</p>
                        <p className="text-xl font-semibold">
                          {live.stats.engagement.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-small text-default-500">Orders</p>
                        <p className="text-xl font-semibold">
                          {live.stats.orders.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-small text-default-500">Revenue</p>
                        <p className="text-xl font-semibold">
                          ${live.stats.revenue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody className="gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-small text-default-500">Comments</p>
                        <p className="text-xl font-semibold">
                          {live.stats.commentsCount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-small text-default-500">Response Rate</p>
                        <p className="text-xl font-semibold">
                          {live.stats.responseRate.toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-small text-default-500">Avg. Response Time</p>
                        <p className="text-xl font-semibold">
                          {live.stats.averageResponseTime}s
                        </p>
                      </div>
                      <div>
                        <p className="text-small text-default-500">Conversion Rate</p>
                        <p className="text-xl font-semibold">
                          {live.stats.conversionRate.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Tab>
          </Tabs>

          <div className="mt-auto flex justify-end gap-3">
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}