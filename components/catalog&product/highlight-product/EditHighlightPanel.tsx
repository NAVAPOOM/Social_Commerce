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
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';
import { highlightData } from './data';

interface EditHighlightPanelProps {
  productId: string | null;
  onClose: () => void;
}

const categories = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Home & Living', value: 'home' },
];

const collections = [
  { label: 'Best Sellers', value: 'best_sellers' },
  { label: 'New Arrivals', value: 'new_arrivals' },
  { label: 'Sale Items', value: 'sale' },
];

export default function EditHighlightPanel({
  productId,
  onClose,
}: EditHighlightPanelProps) {
  const product = React.useMemo(
    () => highlightData.find((p) => p.id === productId),
    [productId]
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

  if (!product) return null;

  return (
    <Sheet isOpen={!!productId} onOpenChange={onClose}>
      <SheetContent size="xl">
        <form className="flex h-full flex-col gap-4" onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Edit Highlight Product</SheetTitle>
          </SheetHeader>

          <Tabs aria-label="Product settings">
            <Tab
              key="basic"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:box-minimalistic-linear" width={20} />
                  Basic Info
                </div>
              }
            >
              <div className="mt-4 grid gap-4">
                <Input
                  isRequired
                  label="Product Name"
                  placeholder="Enter product name"
                  value={product.name}
                  variant="bordered"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Select
                    isRequired
                    items={categories}
                    label="Category"
                    placeholder="Select category"
                    selectedKeys={[product.category]}
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
                    items={collections}
                    label="Collection"
                    placeholder="Select collection"
                    selectedKeys={[product.collection]}
                    variant="bordered"
                  >
                    {(collection) => (
                      <SelectItem key={collection.value} value={collection.value}>
                        {collection.label}
                      </SelectItem>
                    )}
                  </Select>
                </div>
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
                  value={product.price.toString()}
                  variant="bordered"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Start Date"
                    placeholder="Select start date"
                    type="date"
                    value={product.startDate}
                    variant="bordered"
                  />
                  <Input
                    label="End Date"
                    placeholder="Select end date"
                    type="date"
                    value={product.endDate}
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
                        alt="Product preview"
                        className="h-24 w-24 rounded-lg object-cover"
                        src={URL.createObjectURL(image)}
                      />
                      <p className="text-small text-default-500">
                        Click or drag to replace
                      </p>
                    </div>
                  ) : product.image ? (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        alt={product.name}
                        className="h-24 w-24 rounded-lg object-cover"
                        src={product.image}
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
              key="analytics"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:graph-new-linear" width={20} />
                  Analytics
                </div>
              }
            >
              <div className="mt-4 space-y-4">
                <Card>
                  <CardBody className="gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-small text-default-500">Total Views</p>
                        <p className="text-xl font-semibold">
                          {product.stats.views.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-small text-default-500">Total Clicks</p>
                        <p className="text-xl font-semibold">
                          {product.stats.clicks.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-small text-default-500">Conversions</p>
                        <p className="text-xl font-semibold">
                          {product.stats.conversions.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-small text-default-500">Revenue</p>
                        <p className="text-xl font-semibold">
                          ${product.stats.revenue.toLocaleString()}
                        </p>
                      </div>
                    </div>
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