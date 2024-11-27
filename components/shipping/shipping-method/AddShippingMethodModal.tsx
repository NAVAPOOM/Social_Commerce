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
  Textarea,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';

interface AddShippingMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const methodTypes = [
  { label: 'Online Delivery', value: 'online' },
  { label: 'Offline Pickup', value: 'offline' },
];

export default function AddShippingMethodModal({
  isOpen,
  onClose,
}: AddShippingMethodModalProps) {
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              Add Shipping Method
            </ModalHeader>
            <ModalBody>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <Input
                    autoFocus
                    label="Method Name"
                    placeholder="Enter shipping method name"
                    variant="bordered"
                  />
                  <Textarea
                    label="Description"
                    placeholder="Enter method description"
                    variant="bordered"
                  />
                  <Select
                    label="Method Type"
                    placeholder="Select method type"
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
                    variant="bordered"
                  />
                  <Input
                    label="Delivery Time"
                    placeholder="e.g., 3-5 days"
                    variant="bordered"
                  />
                </div>

                <div className="space-y-4">
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
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Add Method
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}