'use client';

import type { InputProps } from "@nextui-org/react";
import React, { useState, useCallback } from 'react';
import { Input, Textarea, Select, SelectItem, Button, Card, CardBody, Image, Checkbox } from '@nextui-org/react';
import { useDropzone } from 'react-dropzone';
import { Icon } from '@iconify/react';
import { cn } from '@/utils/cn';

export type BasicInfoFormProps = React.HTMLAttributes<HTMLFormElement>;

const BasicInfoForm = React.forwardRef<HTMLFormElement, BasicInfoFormProps>(
  ({className, ...props}, ref) => {
    const inputProps: Pick<InputProps, "labelPlacement" | "classNames"> = {
      labelPlacement: "outside",
      classNames: {
        label:
          "text-small font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
      },
    };

    const [files, setFiles] = useState<File[]>([]);
    const [isFreeProduct, setIsFreeProduct] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
      if (files.length + acceptedFiles.length > 10) {
        alert('Maximum 10 images allowed');
        return;
      }
      setFiles((prev) => [...prev, ...acceptedFiles]);
    }, [files]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      },
      maxFiles: 10,
    });

    const removeImage = (index: number) => {
      setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold leading-9 text-default-foreground">
            Add New Product 👋
          </h1>
          <p className="py-2 text-medium text-default-500">
            Product Details
          </p>
        </header>

        <form
          ref={ref}
          {...props}
          className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)}
        >
          <Input
            className="col-span-full"
            label="Product Name"
            name="product-name"
            placeholder="Enter product name"
            {...inputProps}
          />

          <Input
            label="Brand"
            name="brand"
            placeholder="Enter brand name"
            {...inputProps}
          />

          <Select
            label="Category"
            name="category"
            placeholder="Select Category"
            {...inputProps}
          >
            <SelectItem key="1">ผลิตภัณฑ์กะทิ</SelectItem>
            <SelectItem key="2">อาหารแห้ง</SelectItem>
            <SelectItem key="3">เครื่องดื่ม</SelectItem>
          </Select>

          <Textarea
            className="col-span-full text-left"
            label="Description"
            name="description"
            placeholder="Enter product description"
            minRows={3}
            {...inputProps}
          />

          <Input
            label="Product Code"
            name="product-code"
            placeholder="e.g., Product01, Product-001"
            {...inputProps}
          />

          <Input
            label="Product CF Code (optional)"
            name="product-cfcode"
            placeholder="e.g., CfProduct01, CfProduct-001"
            {...inputProps}
          />

          <div className="col-span-full text-left">
            <Checkbox
              isSelected={isFreeProduct}
              onValueChange={setIsFreeProduct}
            >
              Free product
            </Checkbox>
          </div>

          <Input
            isRequired
            isDisabled={isFreeProduct}
            className="col-span-full md:col-span-1"
            label="Base Price"
            name="base-price"
            placeholder="0.00"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400">$</span>
              </div>
            }
            type="number"
            {...inputProps}
          />

          <Input
            className="col-span-full md:col-span-1"
            label="Cost Price (Optional)"
            name="cost-price"
            placeholder="0.00"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400">$</span>
              </div>
            }
            type="number"
            {...inputProps}
          />

          <div
            {...getRootProps()}
            className={cn(
              'col-span-full flex h-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 hover:bg-gray-100',
              {
                'border-primary bg-primary/10': isDragActive,
              }
            )}
          >
            <input {...getInputProps()} />
            <Icon
              className="mb-4 text-gray-400"
              icon="solar:upload-linear"
              width={40}
            />
            {isDragActive ? (
              <p className="text-center text-gray-600">Drop the files here...</p>
            ) : (
              <p className="text-center text-gray-600">
                Drag & drop images here, or click to select files
              </p>
            )}
            <p className="mt-2 text-sm text-gray-500">
              Maximum 10 images allowed
            </p>
          </div>

          {files.length > 0 && (
            <div className="col-span-full grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {files.map((file, index) => (
                <Card key={index} className="relative">
                  <CardBody className="overflow-visible p-0">
                    <Image
                      alt={`Product image ${index + 1}`}
                      className="aspect-square w-full object-cover"
                      src={URL.createObjectURL(file)}
                    />
                    <Button
                      isIconOnly
                      className="absolute -right-2 -top-2 min-w-unit-8 h-unit-8"
                      color="danger"
                      radius="full"
                      size="sm"
                      variant="solid"
                      onPress={() => removeImage(index)}
                    >
                      <Icon icon="solar:close-circle-bold" width={14} />
                    </Button>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </form>
      </div>
    );
  }
);

BasicInfoForm.displayName = 'BasicInfoForm';

export default BasicInfoForm;

