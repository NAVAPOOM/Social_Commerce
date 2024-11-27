'use client';

import type { InputProps } from "@nextui-org/react";
import React from 'react';
import {
  Input,
  Button,
  Select,
  SelectItem,
  Card,
  CardBody,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { cn } from '@/utils/cn';

export type AdvancedDetailsFormProps = React.HTMLAttributes<HTMLFormElement>;

const propertyTypes = [
  { label: 'Text', value: 'text' },
  { label: 'Number', value: 'number' },
  { label: 'Date', value: 'date' },
  { label: 'Boolean', value: 'boolean' },
];

interface CustomProperty {
  id: string;
  type: string;
  name: string;
  value: string;
}

const AdvancedDetailsForm = React.forwardRef<
  HTMLFormElement,
  AdvancedDetailsFormProps
>(({ className, ...props }, ref) => {
  const [customProperties, setCustomProperties] = React.useState<
    CustomProperty[]
  >([]);

  const inputProps: Pick<InputProps, "labelPlacement" | "classNames"> = {
    labelPlacement: "outside",
    classNames: {
      label:
        "text-small font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
    },
  };

  const addCustomProperty = () => {
    setCustomProperties((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        type: 'text',
        name: '',
        value: '',
      },
    ]);
  };

  const removeCustomProperty = (id: string) => {
    setCustomProperties((prev) =>
      prev.filter((property) => property.id !== id)
    );
  };

  const updateCustomProperty = (
    id: string,
    field: keyof CustomProperty,
    value: string
  ) => {
    setCustomProperties((prev) =>
      prev.map((property) =>
        property.id === id ? { ...property, [field]: value } : property
      )
    );
  };

  return (
    <>
      <div className="text-3xl font-bold leading-9 text-default-foreground">
        Advanced Details
      </div>
      <div className="py-4 text-base leading-5 text-default-500">
        Add additional product specifications and custom properties
      </div>
      <form
        ref={ref}
        className={cn('flex-grid grid-cols-12 flex-col gap-4 py-8', className)}
        {...props}
      >
        <Input
          className="col-span-12 md:col-span-6"
          label="Product Unit (Optional)"
          name="product-unit"
          placeholder="e.g., piece, kg, meter"
          {...inputProps}
        />

        <Input
          className="col-span-12 md:col-span-6"
          label="Weight in grams (Optional)"
          name="weight"
          placeholder="0"
          type="number"
          {...inputProps}
        />

        <Input
          className="col-span-12 md:col-span-4"
          label="Width in cm (Optional)"
          name="width"
          placeholder="0"
          type="number"
          {...inputProps}
        />

        <Input
          className="col-span-12 md:col-span-4"
          label="Length in cm (Optional)"
          name="length"
          placeholder="0"
          type="number"
          {...inputProps}
        />

        <Input
          className="col-span-12 md:col-span-4"
          label="Height in cm (Optional)"
          name="height"
          placeholder="0"
          type="number"
          {...inputProps}
        />
      </form>
    </>
  );
});

AdvancedDetailsForm.displayName = 'AdvancedDetailsForm';

export default AdvancedDetailsForm;