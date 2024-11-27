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
  platformTypes,
  audienceTypes,
  contentTypes,
} from './data';

interface CreateBroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateBroadcastModal({
  isOpen,
  onClose,
}: CreateBroadcastModalProps) {
  const [media, setMedia] = React.useState<File | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'video/*': ['.mp4', '.mov'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setMedia(acceptedFiles[0]);
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
              Create New Broadcast
            </ModalHeader>
            <ModalBody>
              <Tabs aria-label="Broadcast setup">
                <Tab
                  key="basic"
                  title={
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:document-text-linear" width={20} />
                      Basic Info
                    </div>
                  }
                >
                  <div className="mt-4 grid gap-4">
                    <Input
                      isRequired
                      label="Broadcast Title"
                      placeholder="Enter broadcast title"
                      variant="bordered"
                    />
                    <Select
                      isRequired
                      items={platformTypes}
                      label="Platform"
                      placeholder="Select platform"
                      variant="bordered"
                    >
                      {(platform) => (
                        <SelectItem
                          key={platform.value}
                          startContent={
                            <Icon
                              icon={`logos:${platform.value}`}
                              width={20}
                            />
                          }
                        >
                          {platform.label}
                        </SelectItem>
                      )}
                    </Select>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        isRequired
                        label="Schedule Date"
                        placeholder="Select date"
                        type="date"
                        variant="bordered"
                      />
                      <Input
                        isRequired
                        label="Schedule Time"
                        placeholder="Select time"
                        type="time"
                        variant="bordered"
                      />
                    </div>
                  </div>
                </Tab>
                <Tab
                  key="audience"
                  title={
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:users-group-rounded-linear" width={20} />
                      Audience
                    </div>
                  }
                >
                  <div className="mt-4 space-y-4">
                    <Select
                      isRequired
                      items={audienceTypes}
                      label="Target Audience"
                      placeholder="Select target audience"
                      variant="bordered"
                    >
                      {(audience) => (
                        <SelectItem key={audience.value}>
                          {audience.label}
                        </SelectItem>
                      )}
                    </Select>
                  </div>
                </Tab>
                <Tab
                  key="content"
                  title={
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:gallery-linear" width={20} />
                      Content
                    </div>
                  }
                >
                  <div className="mt-4 space-y-4">
                    <Select
                      isRequired
                      items={contentTypes}
                      label="Content Type"
                      placeholder="Select content type"
                      variant="bordered"
                    >
                      {(type) => (
                        <SelectItem key={type.value}>
                          {type.label}
                        </SelectItem>
                      )}
                    </Select>
                    <Textarea
                      label="Message"
                      placeholder="Enter your message"
                      variant="bordered"
                    />
                    <div
                      {...getRootProps()}
                      className={`flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-default-200 bg-default-50 transition-colors ${
                        isDragActive ? 'border-primary bg-primary/10' : ''
                      }`}
                    >
                      <input {...getInputProps()} />
                      {media ? (
                        <div className="flex flex-col items-center gap-2">
                          {media.type.startsWith('image/') ? (
                            <img
                              alt="Media preview"
                              className="h-24 w-24 rounded-lg object-cover"
                              src={URL.createObjectURL(media)}
                            />
                          ) : (
                            <video
                              className="h-24 w-24 rounded-lg object-cover"
                              src={URL.createObjectURL(media)}
                            />
                          )}
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
                              ? 'Drop the media here'
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
                Create Broadcast
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}