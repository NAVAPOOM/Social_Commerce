'use client';

import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Switch,
  Textarea,
  Tabs,
  Tab,
  Card,
  CardBody,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';

interface AddInventoryModalProps {
  isOpen: boolean;
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

export default function AddInventoryModal({
  isOpen,
  onClose,
}: AddInventoryModalProps) {
  const [image, setImage] = React.useState<File | null>(null);
  const [hasVariations, setHasVariations] = React.useState(false);
  const [variations, setVariations] = React.useState<Array<{
    id: string;
    attributes: Record<string, string>;
    sku: string;
    price: string;
    stock: string;
  }>>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
    },
  });

  const addVariation = () => {
    setVariations([
      ...variations,
      {
        id: Math.random().toString(36).substr(2, 9),
        attributes: {},
        sku: '',
        price: '',
        stock: '',
      },
    ]);
  };

  const removeVariation = (id: string) => {
    setVariations(variations.filter((v) => v.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              Add Inventory Item
            </ModalHeader>
            <ModalBody>
              <Tabs aria-label="Item details">
                <Tab
                  key="basic"
                  title={
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:document-text-linear" width={20} />
                      Basic Info
                    </div>
                  }
                >
                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <Input
                      isRequired
                      label="Item Name"
                      placeholder="Enter item name"
                      variant="bordered"
                    />
                    <Input
                      isRequired
                      label="SKU"
                      placeholder="Enter SKU"
                      variant="bordered"
                    />
                    <Select
                      isRequired
                      items={categories}
                      label="Category"
                      placeholder="Select category"
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
                      className="lg:col-span-2"
                      label="Price"
                      placeholder="0.00"
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400">$</span>
                        </div>
                      }
                      type="number"
                      variant="bordered"
                    />
                    <div className="grid gap-4 lg:col-span-2 lg:grid-cols-2">
                      <Input
                        isRequired
                        label="Stock Level"
                        placeholder="0"
                        type="number"
                        variant="bordered"
                      />
                      <Input
                        isRequired
                        label="Reorder Point"
                        placeholder="0"
                        type="number"
                        variant="bordered"
                      />
                    </div>
                    <Textarea
                      className="lg:col-span-2"
                      label="Description"
                      placeholder="Enter item description"
                      variant="bordered"
                    />
                  </div>
                </Tab>
                <Tab
                  key="variations"
                  title={
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:layers-linear" width={20} />
                      Variations
                    </div>
                  }
                >
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable Variations</p>
                        <p className="text-small text-default-500">
                          Add variations like size, color, etc.
                        </p>
                      </div>
                      <Switch
                        isSelected={hasVariations}
                        onValueChange={setHasVariations}
                      />
                    </div>

                    {hasVariations && (
                      <div className="space-y-4">
                        {variations.map((variation) => (
                          <Card key={variation.id}>
                            <CardBody className="gap-4">
                              <div className="grid gap-4 lg:grid-cols-3">
                                <Input
                                  label="Variation Name"
                                  placeholder="e.g., Color: Red"
                                  variant="bordered"
                                />
                                <Input
                                  label="SKU"
                                  placeholder="Enter SKU"
                                  variant="bordered"
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
                                  variant="bordered"
                                />
                                <Input
                                  label="Stock Level"
                                  placeholder="0"
                                  type="number"
                                  variant="bordered"
                                />
                              </div>
                              <div className="flex justify-end">
                                <Button
                                  color="danger"
                                  size="sm"
                                  variant="light"
                                  onPress={() => removeVariation(variation.id)}
                                >
                                  Remove Variation
                                </Button>
                              </div>
                            </CardBody>
                          </Card>
                        ))}
                        <Button
                          color="primary"
                          variant="flat"
                          onPress={addVariation}
                        >
                          Add Variation
                        </Button>
                      </div>
                    )}
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
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Add Item
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}