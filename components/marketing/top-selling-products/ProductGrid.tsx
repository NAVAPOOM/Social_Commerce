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

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Card
          isPressable
          key={product.id}
          className="border-1 border-default-200"
        >
          <CardBody className="gap-3">
            <div className="relative">
              <Image
                alt={product.name}
                className="aspect-video w-full object-cover"
                src={product.image}
              />
              <Chip
                className="absolute left-2 top-2"
                color="primary"
                size="sm"
                variant="solid"
              >
                #{product.rank}
              </Chip>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-medium font-semibold">{product.name}</h3>
                <p className="text-small text-default-500">
                  {product.category}
                </p>
              </div>
              <Chip
                className="capitalize"
                color={product.stats.growth >= 0 ? 'success' : 'danger'}
                size="sm"
                variant="flat"
              >
                {product.stats.growth >= 0 ? '+' : ''}
                {product.stats.growth}%
              </Chip>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-small">
                <span className="text-default-500">Stock Level</span>
                <span className="text-default-700">
                  {product.stats.stockLevel}%
                </span>
              </div>
              <Progress
                aria-label="Stock level"
                classNames={{
                  base: "max-w-full",
                  track: "drop-shadow-md border border-default",
                  indicator: product.stats.stockLevel > 50
                    ? "bg-success"
                    : product.stats.stockLevel > 20
                    ? "bg-warning"
                    : "bg-danger",
                  label: "tracking-wider font-medium text-default-600",
                  value: "text-foreground/60",
                }}
                value={product.stats.stockLevel}
                showValueLabel
              />
            </div>

            <div className="flex items-center gap-2">
              <Icon
                className="text-warning"
                icon="solar:star-bold"
                width={16}
              />
              <span className="text-small font-semibold">
                {product.stats.averageRating}
              </span>
              <span className="text-tiny text-default-500">
                ({product.stats.reviewCount} reviews)
              </span>
            </div>
          </CardBody>

          <CardFooter className="gap-3">
            <div className="flex flex-1 flex-col">
              <p className="text-small text-default-500">Total Sales</p>
              <p className="text-medium font-semibold">
                {product.stats.totalSales.toLocaleString()}
              </p>
            </div>
            <div className="flex flex-1 flex-col">
              <p className="text-small text-default-500">Revenue</p>
              <p className="text-medium font-semibold">
                ${product.stats.revenue.toLocaleString()}
              </p>
            </div>
            <Button
              isIconOnly
              className="text-default-500"
              radius="full"
              variant="light"
            >
              <Icon icon="solar:menu-dots-bold" width={16} />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}