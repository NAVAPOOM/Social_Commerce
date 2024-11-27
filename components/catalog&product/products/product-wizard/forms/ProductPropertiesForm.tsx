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

export type ProductPropertiesFormProps = React.HTMLAttributes<HTMLFormElement>;

interface Property {
  id: string;
  name: string;
  type: string;
  options: string[];
}

const propertyTypes = [
  { label: 'Color', value: 'color' },
  { label: 'Size', value: 'size' },
  { label: 'Material', value: 'material' },
  { label: 'Style', value: 'style' },
];

const ProductPropertiesForm = React.forwardRef<HTMLFormElement, ProductPropertiesFormProps>(
  ({ className, ...props }, ref) => {
    const [properties, setProperties] = React.useState<Property[]>([]);

    const inputProps: Pick<InputProps, "labelPlacement" | "classNames"> = {
        labelPlacement: "outside",
        classNames: {
          label:
            "text-small font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
        },
      };

    const addProperty = () => {
      setProperties((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          name: '',
          type: '',
          options: [''],
        },
      ]);
    };

    const removeProperty = (id: string) => {
      setProperties((prev) => prev.filter((prop) => prop.id !== id));
    };

    const updateProperty = (id: string, field: keyof Property, value: any) => {
      setProperties((prev) =>
        prev.map((prop) => (prop.id === id ? { ...prop, [field]: value } : prop))
      );
    };

    const addOption = (propertyId: string) => {
      setProperties((prev) =>
        prev.map((prop) =>
          prop.id === propertyId
            ? { ...prop, options: [...prop.options, ''] }
            : prop
        )
      );
    };

    const removeOption = (propertyId: string, optionIndex: number) => {
      setProperties((prev) =>
        prev.map((prop) =>
          prop.id === propertyId
            ? {
                ...prop,
                options: prop.options.filter((_, i) => i !== optionIndex),
              }
            : prop
        )
      );
    };

    const updateOption = (
      propertyId: string,
      optionIndex: number,
      value: string
    ) => {
      setProperties((prev) =>
        prev.map((prop) =>
          prop.id === propertyId
            ? {
                ...prop,
                options: prop.options.map((opt, i) =>
                  i === optionIndex ? value : opt
                ),
              }
            : prop
        )
      );
    };

    return (
      <>
        <div className="text-3xl font-bold leading-9 text-default-foreground">
          Product Properties
        </div>
        <div className="py-4 text-base leading-5 text-default-500">
          Define product variations and their properties
        </div>
        <form
          ref={ref}
          className={cn('flex-grid grid-cols-12 flex-col gap-4 py-8', className)}
          {...props}
        >
          <div className="col-span-12">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-medium font-semibold">Properties</h3>
              <Button
                color="primary"
                endContent={<Icon icon="solar:add-circle-linear" width={20} />}
                size="sm"
                variant="flat"
                onPress={addProperty}
              >
                Add Property
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              {properties.map((property) => (
                <Card key={property.id}>
                  <CardBody className="gap-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <Input
                        label="Property Name"
                        placeholder="e.g., Color, Size"
                        value={property.name}
                        {...inputProps}
                        onChange={(e) =>
                          updateProperty(property.id, 'name', e.target.value)
                        }
                      />

                      <Select
                        label="Property Type"
                        placeholder="Select type"
                        selectedKeys={property.type ? [property.type] : []}
                        {...inputProps}
                        onChange={(e) =>
                          updateProperty(property.id, 'type', e.target.value)
                        }
                      >
                        {propertyTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-small font-medium">Options</h4>
                        <Button
                          size="sm"
                          variant="flat"
                          onPress={() => addOption(property.id)}
                        >
                          Add Option
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {property.options.map((option, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2"
                          >
                            <Input
                              className="flex-1"
                              placeholder={`Option ${index + 1}`}
                              size="sm"
                              value={option}
                              variant="bordered"
                              onChange={(e) =>
                                updateOption(
                                  property.id,
                                  index,
                                  e.target.value
                                )
                              }
                            />
                            {property.options.length > 1 && (
                              <Button
                                isIconOnly
                                color="danger"
                                size="sm"
                                variant="flat"
                                onPress={() =>
                                  removeOption(property.id, index)
                                }
                              >
                                <Icon
                                  icon="solar:trash-bin-trash-linear"
                                  width={16}
                                />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        color="danger"
                        size="sm"
                        variant="flat"
                        onPress={() => removeProperty(property.id)}
                      >
                        <Icon
                          icon="solar:trash-bin-trash-linear"
                          width={20}
                        />
                        Remove Property
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </form>
      </>
    );
  }
);

ProductPropertiesForm.displayName = 'ProductPropertiesForm';

export default ProductPropertiesForm;