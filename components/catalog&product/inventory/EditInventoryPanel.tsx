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
  Button,
  Tabs,
  Tab,
  Card,
  CardBody,
  Progress,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';
import { inventoryData } from './data';
import { QRCodeSVG } from 'qrcode.react';

interface EditInventoryPanelProps {
  itemId: string | null;
  onClose: () => void;
}

const categories = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Home & Living', value: 'home' },
];

const locations = [
  { label: 'Warehouse A', value: 'warehouse_a' },
  { label: 'Warehouse B', value: 'warehouse_b' },
  { label: 'Store Front', value: 'store_front' },
];

export default function EditInventoryPanel({
  itemId,
  onClose,
}: EditInventoryPanelProps) {
  const item = React.useMemo(
    () => inventoryData.find((i) => i.id === itemId),
    [itemId]
  );

  const [image, setImage] = React.useState<File | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  if (!item) return null;

  return (
    <Sheet isOpen={!!itemId} onOpenChange={onClose}>
      <SheetContent size="xl">
        <form className="flex h-full flex-col gap-4" onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Edit Inventory Item</SheetTitle>
          </SheetHeader>

          <Tabs aria-label="Item settings">
            <Tab
              key="details"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:document-text-linear" width={20} />
                  Details
                </div>
              }
            >
              <div className="mt-4 grid gap-4">
                <Input
                  isRequired
                  label="Item Name"
                  placeholder="Enter item name"
                  value={item.name}
                  variant="bordered"
                />
                <Input
                  isRequired
                  label="SKU"
                  placeholder="Enter SKU"
                  value={item.sku}
                  variant="bordered"
                />
                <Select
                  isRequired
                  items={categories}
                  label="Category"
                  placeholder="Select category"
                  selectedKeys={[item.category.toLowerCase()]}
                  variant="bordered"
                >
                  {(category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  )}
                </Select>
                <Select
                  isRequired
                  items={locations}
                  label="Location"
                  placeholder="Select location"
                  selectedKeys={[item.location.toLowerCase().replace(' ', '_')]}
                  variant="bordered"
                >
                  {(location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  )}
                </Select>
                <Input
                  isRequired
                  label="Price"
                  placeholder="0.00"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400">$</span>
                    </div>
                  }
                  type="number"
                  value={item.price.toString()}
                  variant="bordered"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    isRequired
                    label="Stock Level"
                    placeholder="0"
                    type="number"
                    value={item.stockLevel.toString()}
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="Reorder Point"
                    placeholder="0"
                    type="number"
                    value={item.reorderPoint.toString()}
                    variant="bordered"
                  />
                </div>
              </div>
            </Tab>
            <Tab
              key="media"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:gallery-linear" width={20} />
                  Media
                </div>
              }
            >
              <div className="mt-4">
                <div
                  {...getRootProps()}
                  className={`flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-default-200 bg-default-50 transition-colors ${
                    isDragActive ? 'border-primary bg-primary/10' : ''
                  }`}
                >
                  <input {...getInputProps()} />
                  {image ? (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        alt="Preview"
                        className="h-24 w-24 rounded-lg object-cover"
                        src={URL.createObjectURL(image)}
                      />
                      <p className="text-small text-default-500">
                        Click or drag to replace
                      </p>
                    </div>
                  ) : item.image ? (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        alt={item.name}
                        className="h-24 w-24 rounded-lg object-cover"
                        src={item.image}
                      />
                      <p className="text-small text-default-500">
                        Click or drag to replace
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Icon
                        className="text-default-400"
                        icon="solar:gallery-add-bold"
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
              </div>
            </Tab>
            <Tab
              key="qr"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:qr-code-linear" width={20} />
                  QR Code
                </div>
              }
            >
              <div className="mt-4">
                <Card>
                  <CardBody className="items-center gap-4">
                    <QRCodeSVG
                      value={JSON.stringify({
                        id: item.id,
                        sku: item.sku,
                        name: item.name,
                      })}
                      size={200}
                      level="H"
                      includeMargin
                    />
                    <Button
                      color="primary"
                      variant="flat"
                      startContent={
                        <Icon icon="solar:printer-linear" width={20} />
                      }
                    >
                      Print QR Code
                    </Button>
                  </CardBody>
                </Card>
              </div>
            </Tab>
            <Tab
              key="history"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:history-linear" width={20} />
                  History
                </div>
              }
            >
              <div className="mt-4">
                <Card>
                  <CardBody>
                    <p className="text-center text-default-500">
                      Stock history coming soon...
                    </p>
                  </CardBody>
                </Card>
              </div>
            </Tab>
          </Tabs>

          <div className="mt-auto flex justify-end gap-3">
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