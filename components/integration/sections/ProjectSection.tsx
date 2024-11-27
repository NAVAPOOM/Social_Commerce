'use client';

import React from 'react';
import { Card, CardBody, Button, Input } from '@nextui-org/react';
import { Icon } from '@iconify/react';

export default function ProjectSection() {
  const [copied, setCopied] = React.useState(false);
  const projectId = 'proj_1234567890abcdef';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(projectId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Card>
      <CardBody className="gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Project Information</h3>
            <p className="text-small text-default-500">
              Your unique project identifier and settings
            </p>
          </div>
          <Button
            color="primary"
            variant="flat"
            startContent={<Icon icon="solar:settings-linear" width={20} />}
          >
            Project Settings
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Input
              isReadOnly
              label="Project ID"
              labelPlacement="outside"
              value={projectId}
              variant="bordered"
              endContent={
                <Button
                  isIconOnly
                  className="min-w-unit-8 h-unit-8"
                  size="sm"
                  variant="light"
                  onPress={copyToClipboard}
                >
                  {copied ? (
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
              }
            />
            <p className="mt-1 text-tiny text-default-400">
              Use this ID to identify your project in API requests
            </p>
          </div>

          <div>
            <Input
              isReadOnly
              label="Environment"
              labelPlacement="outside"
              value="Production"
              variant="bordered"
              startContent={
                <Icon
                  className="text-success"
                  icon="solar:server-bold"
                  width={16}
                />
              }
            />
            <p className="mt-1 text-tiny text-default-400">
              Your current working environment
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}