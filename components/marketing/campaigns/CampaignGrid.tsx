'use client';

import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Chip,
  Progress,
  Button,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { Campaign } from './data';

interface CampaignGridProps {
  campaigns: Campaign[];
  onEdit: (id: string) => void;
}

const statusColorMap = {
  draft: 'default',
  scheduled: 'secondary',
  active: 'success',
  paused: 'warning',
  completed: 'primary',
} as const;

const typeIconMap = {
  email: 'solar:letter-bold',
  social: 'solar:share-circle-bold',
  display: 'solar:gallery-wide-bold',
  search: 'solar:magnifer-bold',
  push: 'solar:bell-bold',
} as const;

export default function CampaignGrid({ campaigns, onEdit }: CampaignGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((campaign) => (
        <Card
          isPressable
          key={campaign.id}
          className="border-1 border-default-200"
          onPress={() => onEdit(campaign.id)}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              alt={campaign.name}
              className="aspect-video w-full object-cover"
              src={campaign.image}
            />
          </CardBody>
          <CardBody className="gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon
                    className="text-primary"
                    icon={typeIconMap[campaign.type]}
                    width={24}
                  />
                </div>
                <div>
                  <h4 className="text-medium font-semibold">{campaign.name}</h4>
                  <p className="text-small text-default-500">
                    {campaign.description}
                  </p>
                </div>
              </div>
              <Chip
                className="capitalize"
                color={statusColorMap[campaign.status]}
                size="sm"
                variant="flat"
              >
                {campaign.status}
              </Chip>
            </div>

            <div className="flex items-center gap-1 text-small text-default-500">
              <Icon icon="solar:calendar-linear" width={16} />
              <span>
                {new Date(campaign.startDate).toLocaleDateString()} -{' '}
                {new Date(campaign.endDate).toLocaleDateString()}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-small">
                <span className="text-default-500">Budget spent</span>
                <span className="text-default-700">
                  ${campaign.spentBudget.toLocaleString()} / $
                  {campaign.budget.toLocaleString()}
                </span>
              </div>
              <Progress
                aria-label="Budget progress"
                classNames={{
                  base: "max-w-full",
                  track: "drop-shadow-md border border-default",
                  indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                  label: "tracking-wider font-medium text-default-600",
                  value: "text-foreground/60",
                }}
                value={(campaign.spentBudget / campaign.budget) * 100}
                showValueLabel
              />
            </div>

            {campaign.abTest?.enabled && (
              <div className="rounded-lg border border-default-200 p-3">
                <div className="mb-2 flex items-center gap-1 text-small font-medium">
                  <Icon icon="solar:test-tube-bold" width={16} />
                  <span>A/B Test Results</span>
                </div>
                <div className="space-y-2">
                  {campaign.abTest.variants.map((variant) => (
                    <div
                      key={variant.name}
                      className="flex items-center justify-between text-small"
                    >
                      <span className="text-default-500">{variant.name}</span>
                      <span className="text-default-700">
                        {((variant.conversions / variant.impressions) * 100).toFixed(
                          1
                        )}
                        % CVR
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex flex-1 flex-col">
              <p className="text-small text-default-500">Conversions</p>
              <p className="text-medium font-semibold">
                {campaign.stats.conversions.toLocaleString()}
              </p>
            </div>
            <div className="flex flex-1 flex-col">
              <p className="text-small text-default-500">Revenue</p>
              <p className="text-medium font-semibold">
                ${campaign.stats.revenue.toLocaleString()}
              </p>
            </div>
            <div className="flex flex-1 flex-col">
              <p className="text-small text-default-500">ROI</p>
              <div className="flex items-center gap-1">
                <span className="text-medium font-semibold">
                  {campaign.stats.roi}x
                </span>
                {campaign.stats.growth > 0 && (
                  <Icon
                    className="text-success"
                    icon="solar:arrow-up-bold"
                    width={16}
                  />
                )}
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}