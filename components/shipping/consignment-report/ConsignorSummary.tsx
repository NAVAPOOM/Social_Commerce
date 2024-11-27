'use client';

import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Progress,
  User,
} from '@nextui-org/react';
import { ConsignmentItem } from './data';

interface ConsignorSummaryProps {
  data: ConsignmentItem[];
  fullWidth?: boolean;
}

interface ConsignorStats {
  id: string;
  name: string;
  totalProducts: number;
  totalValue: number;
  turnoverRate: number;
}

export default function ConsignorSummary({ data, fullWidth }: ConsignorSummaryProps) {
  const consignorStats = React.useMemo(() => {
    const stats = new Map<string, ConsignorStats>();

    data.forEach((item) => {
      const existing = stats.get(item.consignorId) || {
        id: item.consignorId,
        name: item.consignorName,
        totalProducts: 0,
        totalValue: 0,
        turnoverRate: 0,
      };

      stats.set(item.consignorId, {
        ...existing,
        totalProducts: existing.totalProducts + item.quantity,
        totalValue: existing.totalValue + item.totalValue,
        turnoverRate:
          (existing.turnoverRate * existing.totalProducts +
            item.turnoverRate * item.quantity) /
          (existing.totalProducts + item.quantity),
      });
    });

    return Array.from(stats.values()).sort(
      (a, b) => b.totalValue - a.totalValue
    );
  }, [data]);

  return (
    <Card className={fullWidth ? 'w-full' : ''}>
      <CardHeader>
        <h3 className="text-xl font-semibold">Top Consignors</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-6">
          {consignorStats.map((consignor) => (
            <div key={consignor.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <User
                  avatarProps={{
                    radius: "lg",
                    src: `https://i.pravatar.cc/150?u=${consignor.id}`,
                  }}
                  description={`${consignor.totalProducts} products`}
                  name={consignor.name}
                />
                <div className="text-right">
                  <p className="text-small font-semibold">
                    ${consignor.totalValue.toLocaleString()}
                  </p>
                  <p className="text-tiny text-default-500">Total Value</p>
                </div>
              </div>
              <Progress
                aria-label="Turnover rate"
                classNames={{
                  base: "max-w-full",
                  track: "drop-shadow-md border border-default",
                  indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                  label: "tracking-wider font-medium text-default-600",
                  value: "text-foreground/60",
                }}
                label="Turnover Rate"
                size="sm"
                value={consignor.turnoverRate * 100}
                showValueLabel
              />
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}