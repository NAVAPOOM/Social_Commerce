'use client';

import React from 'react';
import {
  Tabs,
  Tab,
  Button,
  useDisclosure,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import AddShippingMethodModal from './AddShippingMethodModal';
import EditShippingMethodPanel from './EditShippingMethodPanel';
import ShippingMethodStats from './ShippingMethodStats';
import ShippingMethodCard from './ShippingMethodCard';
import { shippingMethods } from './data';

export default function ShippingMethodApp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMethod, setSelectedMethod] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState<string>('name');

  const handleEditMethod = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const handleCloseEdit = () => {
    setSelectedMethod(null);
  };

  const filteredMethods = React.useMemo(() => {
    let filtered = shippingMethods;

    if (activeTab !== 'all') {
      filtered = filtered.filter(method => method.type === activeTab);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        method =>
          method.name.toLowerCase().includes(query) ||
          method.description.toLowerCase().includes(query)
      );
    }

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'orders':
          return (b.stats?.ordersCount || 0) - (a.stats?.ordersCount || 0);
        case 'revenue':
          return (b.stats?.revenue || 0) - (a.stats?.revenue || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [activeTab, searchQuery, sortBy]);

  return (
    <div className="flex h-full flex-col">
      {/* Fixed Header */}
      <div className="border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Shipping Methods</h1>
            <p className="text-small text-default-500">
              Manage your available shipping options
            </p>
          </div>
          <Button
            color="primary"
            endContent={<Icon icon="solar:add-circle-bold" width={20} />}
            size="sm"
            onPress={onOpen}
          >
            Add Method
          </Button>
        </div>
      </div>

      {/* Sticky Controls */}
      <div className="sticky top-0 z-10 border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs
            aria-label="Shipping method types"
            color="primary"
            selectedKey={activeTab}
            variant="underlined"
            onSelectionChange={(key) => setActiveTab(key.toString())}
          >
            <Tab key="all" title="All Methods" />
            <Tab key="online" title="Online Delivery" />
            <Tab key="offline" title="Offline Pickup" />
          </Tabs>

          <div className="flex gap-2">
            <Input
              className="w-full sm:w-64"
              placeholder="Search methods..."
              startContent={
                <Icon
                  className="text-default-400"
                  icon="solar:magnifer-linear"
                  width={16}
                />
              }
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <Dropdown>
              <DropdownTrigger>
                <Button
                  endContent={
                    <Icon icon="solar:alt-arrow-down-linear" width={16} />
                  }
                  variant="flat"
                >
                  Sort
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Sort methods"
                selectedKeys={[sortBy]}
                selectionMode="single"
                onSelectionChange={(keys) =>
                  setSortBy(Array.from(keys)[0] as string)
                }
              >
                <DropdownItem key="name">Name</DropdownItem>
                <DropdownItem key="price">Price</DropdownItem>
                <DropdownItem key="orders">Orders</DropdownItem>
                <DropdownItem key="revenue">Revenue</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          <ShippingMethodStats />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMethods.map((method) => (
              <ShippingMethodCard
                key={method.id}
                method={method}
                onEdit={handleEditMethod}
              />
            ))}
          </div>
        </div>
      </div>

      <AddShippingMethodModal isOpen={isOpen} onClose={onClose} />
      <EditShippingMethodPanel
        methodId={selectedMethod}
        onClose={handleCloseEdit}
      />
    </div>
  );
}