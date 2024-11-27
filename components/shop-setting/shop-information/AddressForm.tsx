'use client';

import React from 'react';
import { Card, CardBody, Input, Select, SelectItem } from '@nextui-org/react';
import { Icon } from '@iconify/react';

interface AddressFormProps {
  onFormChange: () => void;
}

const countries = [
  { label: 'Thailand', value: 'th' },
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  // Add more countries as needed
];

export default function AddressForm({ onFormChange }: AddressFormProps) {
  return (
    <Card>
      <CardBody className="gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            isRequired
            className="md:col-span-2"
            label="Street Address"
            labelPlacement="outside"
            placeholder="Enter street address"
            startContent={
              <Icon
                className="text-default-400"
                icon="solar:home-2-linear"
                width={16}
              />
            }
            variant="bordered"
            onChange={onFormChange}
          />
          <Input
            label="Building/Unit"
            labelPlacement="outside"
            placeholder="Enter building or unit number"
            startContent={
              <Icon
                className="text-default-400"
                icon="solar:buildings-2-linear"
                width={16}
              />
            }
            variant="bordered"
            onChange={onFormChange}
          />
          <Input
            label="District/Area"
            labelPlacement="outside"
            placeholder="Enter district or area"
            startContent={
              <Icon
                className="text-default-400"
                icon="solar:map-point-linear"
                width={16}
              />
            }
            variant="bordered"
            onChange={onFormChange}
          />
          <Input
            isRequired
            label="City"
            labelPlacement="outside"
            placeholder="Enter city"
            startContent={
              <Icon
                className="text-default-400"
                icon="solar:city-linear"
                width={16}
              />
            }
            variant="bordered"
            onChange={onFormChange}
          />
          <Input
            isRequired
            label="State/Province"
            labelPlacement="outside"
            placeholder="Enter state or province"
            startContent={
              <Icon
                className="text-default-400"
                icon="solar:map-linear"
                width={16}
              />
            }
            variant="bordered"
            onChange={onFormChange}
          />
          <Select
            isRequired
            items={countries}
            label="Country"
            labelPlacement="outside"
            placeholder="Select country"
            startContent={
              <Icon
                className="text-default-400"
                icon="solar:globe-linear"
                width={16}
              />
            }
            variant="bordered"
            onChange={onFormChange}
          >
            {(country) => (
              <SelectItem key={country.value} value={country.value}>
                {country.label}
              </SelectItem>
            )}
          </Select>
          <Input
            isRequired
            label="Postal Code"
            labelPlacement="outside"
            placeholder="Enter postal code"
            startContent={
              <Icon
                className="text-default-400"
                icon="solar:mailbox-linear"
                width={16}
              />
            }
            variant="bordered"
            onChange={onFormChange}
          />
        </div>
      </CardBody>
    </Card>
  );
}