'use client';

import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Tab,
  Tabs,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useDisclosure } from '@nextui-org/react';
import BasicInfoForm from './BasicInfoForm';
import AddressForm from './AddressForm';
import SocialMediaForm from './SocialMediaForm';
import UnsavedChangesModal from './UnsavedChangesModal';

export default function ShopInformationApp() {
  const [selectedTab, setSelectedTab] = React.useState('basic');
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleTabChange = (key: string) => {
    if (hasUnsavedChanges) {
      onOpen();
    } else {
      setSelectedTab(key);
    }
  };

  const handleSave = () => {
    // Handle save logic here
    setHasUnsavedChanges(false);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Fixed Header */}
      <div className="border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Shop Information</h1>
            <p className="text-small text-default-500">
              Manage your shop details and settings
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              color="danger"
              variant="light"
              onPress={() => setHasUnsavedChanges(false)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              startContent={<Icon icon="solar:diskette-bold-duotone" width={20} />}
              onPress={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Sticky Controls */}
      <div className="sticky top-0 z-10 bg-background/80 px-6 py-4 backdrop-blur-lg">
        <Tabs
          aria-label="Shop information sections"
          color="primary"
          selectedKey={selectedTab}
          variant="underlined"
          onSelectionChange={(key) => handleTabChange(key.toString())}
        >
          <Tab
            key="basic"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="solar:shop-2-linear" width={20} />
                Basic Information
              </div>
            }
          />
          <Tab
            key="address"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="solar:map-point-linear" width={20} />
                Address
              </div>
            }
          />
          <Tab
            key="social"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="solar:share-circle-linear" width={20} />
                Social Media
              </div>
            }
          />
        </Tabs>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl space-y-6 p-6">
          {selectedTab === 'basic' && (
            <BasicInfoForm
              onFormChange={() => setHasUnsavedChanges(true)}
            />
          )}
          {selectedTab === 'address' && (
            <AddressForm onFormChange={() => setHasUnsavedChanges(true)} />
          )}
          {selectedTab === 'social' && (
            <SocialMediaForm
              onFormChange={() => setHasUnsavedChanges(true)}
            />
          )}
        </div>
      </div>

      <UnsavedChangesModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={(key) => {
          setSelectedTab(key);
          setHasUnsavedChanges(false);
          onClose();
        }}
      />
    </div>
  );
}