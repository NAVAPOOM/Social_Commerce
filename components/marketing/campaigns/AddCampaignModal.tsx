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
  Tabs,
  Tab,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';
import {
  campaignTypes,
  audienceSegments,
  communicationChannels,
} from './data';

interface AddCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCampaignModal({
  isOpen,
  onClose,
}: AddCampaignModalProps) {
  const [image, setImage] = React.useState<File | null>(null);
  const [enableABTest, setEnableABTest] = React.useState(false);

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
              Create New Campaign
            </ModalHeader>
            <ModalBody>
              <Tabs aria-label="Campaign setup">
                <Tab
                  key="basic"
                  title={
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:flag-linear" width={20} />
                      Basic Info
                    </div>
                  }
                >
                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <Input
                      isRequired
                      label="Campaign Name"
                      placeholder="Enter campaign name"
                      variant="bordered"
                    />
                    <Select
                      isRequired
                      items={campaignTypes}
                      label="Campaign Type"
                      placeholder="Select campaign type"
                      variant="bordered"
                    >
                      {(type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      )}
                    </Select>
                    <div className="lg:col-span-2">
                      <Textarea
                        label="Description"
                        placeholder="Enter campaign description"
                        variant="bordered"
                      />
                    </div>
                    <Input
                      isRequired
                      label="Start Date"
                      placeholder="Select start date"
                      type="date"
                      variant="bordered"
                    />
                    <Input
                      isRequired
                      label="End Date"
                      placeholder="Select end date"
                      type="date"
                      variant="bordered"
                    />
                    <Input
                      isRequired
                      label="Budget"
                      placeholder="Enter campaign budget"
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400">$</span>
                        </div>
                      }
                      type="number"
                      variant="bordered"
                    />
                  </div>
                </Tab>
                <Tab
                  key="targeting"
                  title={
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:users-group-rounded-linear" width={20} />
                      Targeting
                    </div>
                  }
                >
                  <div className="mt-4 space-y-4">
                    <Select
                      isRequired
                      items={audienceSegments}
                      label="Target Audience"
                      placeholder="Select target audience"
                      selectionMode="multiple"
                      variant="bordered"
                    >
                      {(segment) => (
                        <SelectItem key={segment.value} value={segment.value}>
                          {segment.label}
                        </SelectItem>
                      )}
                    </Select>
                    <Select
                      isRequired
                      items={communicationChannels}
                      label="Communication Channels"
                      placeholder="Select channels"
                      selectionMode="multiple"
                      variant="bordered"
                    >
                      {(channel) => (
                        <SelectItem key={channel.value} value={channel.value}>
                          {channel.label}
                        </SelectItem>
                      )}
                    </Select>
                  </div>
                </Tab>
                <Tab
                  key="creative"
                  title={
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:gallery-linear" width={20} />
                      Creative
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
                            alt="Campaign preview"
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
                Create Campaign
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}