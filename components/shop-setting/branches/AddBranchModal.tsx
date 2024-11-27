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
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';
import BusinessHoursEditor from './BusinessHoursEditor';

interface AddBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const branchTypes = [
  { label: 'Main Branch', value: 'main' },
  { label: 'Sub Branch', value: 'sub' },
  { label: 'Warehouse', value: 'warehouse' },
];

export default function AddBranchModal({
  isOpen,
  onClose,
}: AddBranchModalProps) {
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
              Add New Branch
            </ModalHeader>
            <ModalBody>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-4">
                  <Input
                    isRequired
                    label="Branch Name"
                    placeholder="Enter branch name"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="Branch Code"
                    placeholder="Enter branch code"
                    variant="bordered"
                  />
                  <Select
                    isRequired
                    items={branchTypes}
                    label="Branch Type"
                    placeholder="Select branch type"
                    variant="bordered"
                  >
                    {(type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    )}
                  </Select>
                  <Input
                    isRequired
                    label="Manager Name"
                    placeholder="Enter manager name"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="Contact Email"
                    placeholder="Enter contact email"
                    type="email"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="Contact Phone"
                    placeholder="Enter contact phone"
                    type="tel"
                    variant="bordered"
                  />
                </div>

                <div className="space-y-4">
                  <Input
                    isRequired
                    label="Street Address"
                    placeholder="Enter street address"
                    variant="bordered"
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      isRequired
                      label="District"
                      placeholder="Enter district"
                      variant="bordered"
                    />
                    <Input
                      isRequired
                      label="City"
                      placeholder="Enter city"
                      variant="bordered"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      isRequired
                      label="State/Province"
                      placeholder="Enter state/province"
                      variant="bordered"
                    />
                    <Input
                      isRequired
                      label="Postal Code"
                      placeholder="Enter postal code"
                      variant="bordered"
                    />
                  </div>
                  <Input
                    isRequired
                    label="Country"
                    placeholder="Enter country"
                    variant="bordered"
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Latitude"
                      placeholder="Enter latitude"
                      type="number"
                      variant="bordered"
                    />
                    <Input
                      label="Longitude"
                      placeholder="Enter longitude"
                      type="number"
                      variant="bordered"
                    />
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <BusinessHoursEditor />
                </div>

                <div className="lg:col-span-2">
                  <p className="mb-2 text-small font-medium">Branch Image</p>
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
                          alt="Branch preview"
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
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Add Branch
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}