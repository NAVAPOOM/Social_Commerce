'use client';

import React from 'react';
import { Card } from '@nextui-org/react';
import { Branch } from './data';

interface BranchMapProps {
  branches: Branch[];
  onBranchSelect: (id: string) => void;
}

export default function BranchMap({ branches, onBranchSelect }: BranchMapProps) {
  return (
    <Card className="h-[600px]">
      <CardBody>
        {/* Integrate with your preferred map provider (e.g., Google Maps, Mapbox) */}
        <div className="flex h-full items-center justify-center">
          <p className="text-default-500">Map integration coming soon...</p>
        </div>
      </CardBody>
    </Card>
  );
}