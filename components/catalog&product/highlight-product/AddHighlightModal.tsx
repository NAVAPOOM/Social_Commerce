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
  Tabs,
  Tab,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';

interface AddHighlightModalProps {
  isOpen: boolean;
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

export default function AddHighlightModal({
  isOpen,
  onClose,
}: AddHighlightModalProps) {
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      size="3xl"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              Add Highlight Product
            </ModalHeader>
            <ModalBody>
              <Tabs aria-label="Product setup">
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
                      variant="bordered"
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
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
                        items={collections}
                        label="Collection"
                        placeholder="Select collection"
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
                      variant="bordered"
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="Start Date"
                        placeholder="Select start date"
                        type="date"
                        variant="bordered"
                      />
                      <Input
                        label="End Date"
                        placeholder="Select end date"
                        type="date"
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
                Add Highlight
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}