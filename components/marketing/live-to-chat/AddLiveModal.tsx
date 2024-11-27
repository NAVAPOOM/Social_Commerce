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
  Textarea,
  Switch,
  Card,
  CardBody,
  Tabs,
  Tab,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';

interface AddLiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddLiveModal({ isOpen, onClose }: AddLiveModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="3xl">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              Create New Live Stream
            </ModalHeader>
            <ModalBody>
              <Tabs aria-label="Live setup">
                {/* Basic Info Tab */}
                <Tab
                  key="basic"
                  title={
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:play-stream-linear" width={20} />
                      Basic Info
                    </div>
                  }
                >
                  <div className="mt-4 grid gap-4">
                    <Input
                      isRequired
                      label="Live Title"
                      placeholder="Enter live stream title"
                      variant="bordered"
                    />
                    <Input
                      isRequired
                      label="Facebook Post ID"
                      placeholder="Enter Facebook post ID"
                      variant="bordered"
                    />
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

                {/* Products Tab */}
                <Tab
                  key="products"
                  title={
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:box-minimalistic-linear" width={20} />
                      Products
                    </div>
                  }
                >
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Include All Products</p>
                        <p className="text-small text-default-500">
                          Make all store products available during live
                        </p>
                      </div>
                      <Switch size="sm" />
                    </div>

                    <Card>
                      <CardBody className="gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon
                              className="text-default-500"
                              icon="solar:box-minimalistic-linear"
                              width={20}
                            />
                            <span>Selected Products</span>
                          </div>
                          <Button color="primary" size="sm" variant="flat">
                            Add Products
                          </Button>
                        </div>
                        <div className="flex items-center gap-4 text-small text-default-500">
                          <div>0 Products</div>
                          <div>0 Catalogs</div>
                          <div>0 SKUs</div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </Tab>

                {/* Response Tab */}
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
                    <Card>
                      <CardBody className="gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-small">Auto-Response</span>
                          <Switch size="sm" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-small">Include Product Images</span>
                          <Switch size="sm" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-small">Add Response Delay</span>
                          <Switch size="sm" />
                        </div>
                      </CardBody>
                    </Card>

                    <Textarea
                      label="Default Response Message"
                      placeholder="Enter your automated response message"
                      variant="bordered"
                    />

                    <Card>
                      <CardBody>
                        <div className="flex items-center justify-between">
                          <h4 className="text-medium font-semibold">
                            Message Preview
                          </h4>
                          <Button size="sm" variant="flat">
                            Test Response
                          </Button>
                        </div>
                        <div className="mt-4 rounded-lg bg-default-100 p-4">
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-default-200" />
                            <div className="flex-1">
                              <p className="text-small font-medium">Store Name</p>
                              <p className="text-small text-default-500">
                                Thank you for your interest! Here are the product details...
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </Tab>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Create Live
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
