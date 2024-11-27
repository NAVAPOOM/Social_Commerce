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
  Switch,
  Tabs,
  Tab,
  Card,
  CardBody,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';

interface AddPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const platformTypes = [
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram Post', value: 'instagram_post' },
  { label: 'Instagram Story', value: 'instagram_story' },
];

const responseTypes = [
  { label: 'Respond to all comments', value: 'all' },
  { label: 'Respond based on keywords', value: 'keywords' },
];

export default function AddPostModal({
  isOpen,
  onClose,
}: AddPostModalProps) {
  const [responseType, setResponseType] = React.useState('all');
  const [keywords, setKeywords] = React.useState<string[]>([]);
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
              Add New Post
            </ModalHeader>
            <ModalBody>
              <Tabs aria-label="Post setup">
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
                      label="Post Title"
                      placeholder="Enter post title"
                      variant="bordered"
                    />
                    <Input
                      isRequired
                      label="Post ID"
                      placeholder="Enter post ID"
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
                              icon={`logos:${platform.value.split('_')[0]}`}
                              width={20}
                            />
                          }
                        >
                          {platform.label}
                        </SelectItem>
                      )}
                    </Select>
                  </div>
                </Tab>
                <Tab
                  key="response"
                  title={
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:chat-round-dots-linear" width={20} />
                      Response
                    </div>
                  }
                >
                  <div className="mt-4 space-y-4">
                    <Select
                      isRequired
                      items={responseTypes}
                      label="Response Type"
                      placeholder="Select response type"
                      selectedKeys={[responseType]}
                      variant="bordered"
                      onSelectionChange={(keys) => setResponseType(Array.from(keys)[0] as string)}
                    >
                      {(type) => (
                        <SelectItem key={type.value}>
                          {type.label}
                        </SelectItem>
                      )}
                    </Select>

                    {responseType === 'keywords' && (
                      <Input
                        label="Keywords"
                        placeholder="Enter keywords separated by commas"
                        variant="bordered"
                        onChange={(e) => setKeywords(e.target.value.split(',').map(k => k.trim()))}
                      />
                    )}

                    <Textarea
                      label="Response Message"
                      placeholder="Enter your automated response message"
                      variant="bordered"
                    />

                    <Card>
                      <CardBody className="gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-small">Include Product Images</span>
                          <Switch size="sm" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-small">Include Product Links</span>
                          <Switch size="sm" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-small">Add Response Delay</span>
                          <Switch size="sm" />
                        </div>
                      </CardBody>
                    </Card>
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
                        isDragActive ? 'border-primary bg-primary/ ```border-primary bg-primary/10' : ''
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
                Add Post
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}