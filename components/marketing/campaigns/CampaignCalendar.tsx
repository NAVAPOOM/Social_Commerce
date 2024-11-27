'use client';

import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { Campaign } from './data';

interface CampaignCalendarProps {
  campaigns: Campaign[];
  onCampaignSelect: (id: string) => void;
}

export default function CampaignCalendar({
  campaigns,
  onCampaignSelect,
}: CampaignCalendarProps) {
  return (
    <Card>
      <CardBody>
        {/* Calendar integration coming soon */}
        <div className="flex h-[600px] items-center justify-center">
          <p className="text-default-500">Calendar view coming soon...</p>
        </div>
      </CardBody>
    </Card>
  );
}