'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Input,
  Select,
  SelectItem,
  Textarea,
  Button,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';
import { shippingMethods } from './data';

interface EditShippingMethodPanelProps {
  methodId: string | null;
  onClose: () => void;
}

const methodTypes = [
  { label: 'Online Delivery', value: 'online' },
  { label: 'Offline Pickup', value: 'offline' },
];

export default function EditShippingMethodPanel({
  methodId,
  onClose,
}: EditShippingMethodPanelProps) {
  const method = React.useMemo(
    () => shippingMethods.find((m) => m.id === methodId),
    [methodId]
  );

  const [infographic, setInfographic] = React.useState<File | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setInfographic(acceptedFiles[0]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  if (!method) return null;

  return (
    <Sheet isOpen={!!methodId} onOpenChange={onClose}>
      <SheetContent>
        <form className="flex h-full flex-col gap-4" onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Edit Shipping Method</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-4 p-4">
              <Input
                label="Method Name"
                placeholder="Enter shipping method name"
                value={method.name}
                variant="bordered"
              />
              <Textarea
                label="Description"
                placeholder="Enter method description"
                value={method.description}
                variant="bordered"
              />
              <Select
                label="Method Type"
                placeholder="Select method type"
                selectedKeys={[method.type]}
                variant="bordered"
              >
                {methodTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </Select>
              <Input
                label="Price"
                placeholder="0.00"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400">$</span>
                  </div>
                }
                type="number"
                value={method.price.toString()}
                variant="bordered"
              />
              <Input
                label="Delivery Time"
                placeholder="e.g., 3-5 days"
                value={method.deliveryTime}
                variant="bordered"
              />

              <div className="space-y-2">
                <p className="text-small font-medium">Infographic Image</p>
                <div
                  {...getRootProps()}
                  className={`flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-default-200 bg-default-50 transition-colors ${
                    isDragActive ? 'border-primary bg-primary/10' : ''
                  }`}
                >
                  <input {...getInputProps()} />
                  {infographic ? (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        alt="Preview"
                        className="h-24 w-24 object-cover"
                        src={URL.createObjectURL(infographic)}
                      />
                      <p className="text-small text-default-500">
                        Click or drag to replace
                      </p>
                    </div>
                  ) : method.infographic ? (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        alt={`${method.name} infographic`}
                        className="h-24 w-24 object-cover"
                        src={method.infographic}
                      />
                      <p className="text-small text-default-500">
                        Click or drag to replace
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Icon
                        className="text-default-400"
                        icon="solar:upload-linear"
                        width={24}
                      />
                      <p className="text-center text-small text-default-500">
                        {isDragActive
                          ? 'Drop the image here'
                          : 'Click to upload or drag and drop'}
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-tiny text-default-400">
                  Recommended size: 800x400px. Max file size: 2MB
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 p-4">
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}