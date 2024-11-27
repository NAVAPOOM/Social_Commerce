'use client';

import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Chip,
  Button,
  Progress,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { Product } from './data';

interface HighlightGridProps {
  products: Product[];
  onEdit: (id: string) => void;
}

export default function HighlightGrid({ products, onEdit }: HighlightGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Card
          isPressable
          key={product.id}
          className="border-1 border-default-200"
          onPress={() => onEdit(product.id)}
        >
          <CardBody className="overflow-visible p-0">
            <div className="relative">
              <Image
                alt={product.name}
                className="aspect-video w-full object-cover"
                src={product.image}
              />
              {product.isNew && (
                <Chip
                  className="absolute left-2 top-2"
                  color="success"
                  size="sm"
                  variant="solid"
                >
                  New
                </Chip>
              )}
              {product.isPopular && (
                <Chip
                  className="absolute right-2 top-2"
                  color="warning"
                  size="sm"
                  variant="solid"
                >
                  Popular
                </Chip>
              )}
            </div>
          </CardBody>
          <CardBody className="gap-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-medium font-semibold">{product.name}</h4>
                <p className="text-small text-default-500">
                  {product.description}
                </p>
              </div>
              <p className="text-medium font-semibold">
                ${product.price.toLocaleString()}
              </p>
            </div>

            {product.colors && product.colors.length > 0 && (
              <div className="flex gap-1">
                {product.colors.map((color) => (
                  <div
                    key={color.name}
                    className="h-5 w-5 rounded-full border border-default-200"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between text-small">
                <span className="text-default-500">Views</span>
                <span className="text-default-700">
                  {product.stats.views.toLocaleString()}
                </span>
              </div>
              <Progress
                aria-label="Views progress"
                classNames={{
                  base: "max-w-full",
                  track: "drop-shadow-md border border-default",
                  indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                  label: "tracking-wider font-medium text-default-600",
                  value: "text-foreground/60",
                }}
                value={(product.stats.clicks / product.stats.views) * 100}
                showValueLabel
              />
            </div>
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex flex-1 flex-col">
              <p className="text-small text-default-500">Conversions</p>
              <p className="text-medium font-semibold">
                {product.stats.conversions.toLocaleString()}
              </p>
            </div>
            <div className="flex flex-1 flex-col">
              <p className="text-small text-default-500">Revenue</p>
              <p className="text-medium font-semibold">
                ${product.stats.revenue.toLocaleString()}
              </p>
            </div>
            <div className="flex flex-1 flex-col">
              <p className="text-small text-default-500">Growth</p>
              <div className="flex items-center gap-1">
                <span className="text-medium font-semibold">
                  {product.stats.growth}%
                </span>
                <Icon
                  className={product.stats.growth >= 0 ? 'text-success' : 'text-danger'}
                  icon={product.stats.growth >= 0 ? 'solar:arrow-up-bold' : 'solar:arrow-down-bold'}
                  width={16}
                />
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}