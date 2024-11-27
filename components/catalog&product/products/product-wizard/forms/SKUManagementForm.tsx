'use client';

import type { InputProps } from "@nextui-org/react";
import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Input,
  Select,
  SelectItem,
  Card,
  CardBody,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { cn } from '@/utils/cn';

export type SKUManagementFormProps = React.HTMLAttributes<HTMLFormElement>;

interface SKU {
  id: string;
  variantType: string;
  variantValue: string;
  price: string;
  inventory: string;
  productCode: string;
}

const variantTypes = [
  { label: 'Color', value: 'color' },
  { label: 'Size', value: 'size' },
  { label: 'Material', value: 'material' },
  { label: 'Style', value: 'style' },
];

const SKUManagementForm = React.forwardRef<HTMLFormElement, SKUManagementFormProps>(
  ({ className, ...props }, ref) => {
    const inputProps: Pick<InputProps, "labelPlacement" | "classNames"> = {
      labelPlacement: "outside",
      classNames: {
        label:
          "text-small font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
      },
    };
    const [skus, setSKUs] = React.useState<SKU[]>([]);

    const addSKU = () => {
      setSKUs((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          variantType: '',
          variantValue: '',
          price: '',
          inventory: '',
          productCode: '',
        },
      ]);
    };

    const removeSKU = (id: string) => {
      setSKUs((prev) => prev.filter((sku) => sku.id !== id));
    };

    const updateSKU = (id: string, field: keyof SKU, value: string) => {
      setSKUs((prev) =>
        prev.map((sku) => (sku.id === id ? { ...sku, [field]: value } : sku))
      );
    };

    return (
      <>
        <div className="text-3xl font-bold leading-9 text-default-foreground">
          SKU Management
        </div>
        <div className="py-4 text-base leading-5 text-default-500">
          Manage your product variants and stock keeping units
        </div>
        <form
          ref={ref}
          className={cn('flex-grid grid-cols-12 flex-col gap-4 py-8', className)}
          {...props}
        >
          <div className="col-span-12">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-medium font-semibold">Product SKUs</h3>
              <Button
                color="primary"
                endContent={<Icon icon="solar:add-circle-linear" width={20} />}
                size="sm"
                variant="flat"
                onPress={addSKU}
              >
                Add SKU
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              {skus.map((sku) => (
                <Card key={sku.id}>
                  <CardBody className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <Select
                        label="Variant Type"
                        placeholder="Select type"
                        {...inputProps}
                        onChange={(e) =>
                          updateSKU(sku.id, 'variantType', e.target.value)
                        }
                      >
                        {variantTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </Select>

                      <Input
                        label="Variant Value"
                        placeholder="e.g., Red, XL, Cotton"
                        value={sku.variantValue}
                        {...inputProps}
                        onChange={(e) =>
                          updateSKU(sku.id, 'variantValue', e.target.value)
                        }
                      />

                      <Input
                        label="Price"
                        placeholder="0.00"
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400">$</span>
                          </div>
                        }
                        type="number"
                        value={sku.price}
                        {...inputProps}
                        onChange={(e) =>
                          updateSKU(sku.id, 'price', e.target.value)
                        }
                      />

                      <Input
                        label="Inventory"
                        placeholder="0"
                        type="number"
                        value={sku.inventory}
                        {...inputProps}
                        onChange={(e) =>
                          updateSKU(sku.id, 'inventory', e.target.value)
                        }
                      />

                      <Input
                        label="Product Code"
                        placeholder="Enter product code"
                        value={sku.productCode}
                        {...inputProps}
                        onChange={(e) =>
                          updateSKU(sku.id, 'productCode', e.target.value)
                        }
                      />

                      <div className="flex items-end">
                        <Button
                          color="danger"
                          size="sm"
                          variant="flat"
                          onPress={() => removeSKU(sku.id)}
                        >
                          <Icon
                            icon="solar:trash-bin-trash-linear"
                            width={20}
                          />
                          Remove SKU
                        </Button>
                      </div>
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

SKUManagementForm.displayName = 'SKUManagementForm';

export default SKUManagementForm;