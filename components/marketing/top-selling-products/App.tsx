'use client';

import React from 'react';
import {
  Button,
  useDisclosure,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Select,
  SelectItem,
  Tabs,
  Tab,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import ProductStats from './ProductStats';
import ProductGrid from './ProductGrid';
import ProductTable from './ProductTable';
import ProductAnalytics from './ProductAnalytics';
import ProductSettings from './ProductSettings';
import { productData } from './data';

export default function TopSellingProductsApp() {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [timeRange, setTimeRange] = React.useState('30d');
  const [viewMode, setViewMode] = React.useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = React.useState<string>('sales');

  const filteredProducts = React.useMemo(() => {
    let filtered = productData;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'sales':
          return b.stats.totalSales - a.stats.totalSales;
        case 'revenue':
          return b.stats.revenue - a.stats.revenue;
        case 'growth':
          return b.stats.growth - a.stats.growth;
        default:
          return 0;
      }
    });
  }, [searchQuery, categoryFilter, sortBy]);

  return (
    <div className="flex h-full flex-col">
      {/* Fixed Header */}
      <div className="border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Top Selling Products</h1>
            <p className="text-small text-default-500">
              Track and analyze your best-performing products
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              color="primary"
              variant="flat"
              startContent={<Icon icon="solar:file-download-linear" width={20} />}
            >
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Sticky Controls */}
      <div className="sticky top-0 z-10 border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex flex-col gap-4">
          <Tabs
            aria-label="Product sections"
            color="primary"
            selectedKey={activeTab}
            variant="underlined"
            onSelectionChange={(key) => setActiveTab(key.toString())}
          >
            <Tab
              key="overview"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:chart-2-linear" width={20} />
                  Overview
                </div>
              }
            />
            <Tab
              key="products"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:box-minimalistic-linear" width={20} />
                  Products
                </div>
              }
            />
            <Tab
              key="analytics"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:graph-new-linear" width={20} />
                  Analytics
                </div>
              }
            />
            <Tab
              key="settings"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:settings-linear" width={20} />
                  Settings
                </div>
              }
            />
          </Tabs>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 gap-2">
              <Input
                className="max-w-xs"
                placeholder="Search products..."
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
              <Select
                className="max-w-xs"
                placeholder="Category"
                selectedKeys={[categoryFilter]}
                size="sm"
                variant="bordered"
                onSelectionChange={(keys) => setCategoryFilter(Array.from(keys)[0] as string)}
              >
                <SelectItem key="all">All Categories</SelectItem>
                <SelectItem key="electronics">Electronics</SelectItem>
                <SelectItem key="fashion">Fashion</SelectItem>
                <SelectItem key="home">Home & Living</SelectItem>
              </Select>
              <Select
                className="max-w-xs"
                placeholder="Time Range"
                selectedKeys={[timeRange]}
                size="sm"
                variant="bordered"
                onSelectionChange={(keys) => setTimeRange(Array.from(keys)[0] as string)}
              >
                <SelectItem key="7d">Last 7 Days</SelectItem>
                <SelectItem key="30d">Last 30 Days</SelectItem>
                <SelectItem key="90d">Last 90 Days</SelectItem>
                <SelectItem key="1y">Last Year</SelectItem>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                isIconOnly
                aria-label="View as grid"
                className={viewMode === 'grid' ? 'bg-default-100' : ''}
                radius="lg"
                variant="flat"
                onPress={() => setViewMode('grid')}
              >
                <Icon icon="solar:widget-5-linear" width={20} />
              </Button>
              <Button
                isIconOnly
                aria-label="View as table"
                className={viewMode === 'table' ? 'bg-default-100' : ''}
                radius="lg"
                variant="flat"
                onPress={() => setViewMode('table')}
              >
                <Icon icon="solar:table-2-linear" width={20} />
              </Button>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    endContent={<Icon icon="solar:alt-arrow-down-linear" width={16} />}
                    variant="flat"
                  >
                    Sort
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Sort products"
                  selectedKeys={[sortBy]}
                  selectionMode="single"
                  onSelectionChange={(keys) => setSortBy(Array.from(keys)[0] as string)}
                >
                  <DropdownItem key="sales">Total Sales</DropdownItem>
                  <DropdownItem key="revenue">Revenue</DropdownItem>
                  <DropdownItem key="growth">Growth Rate</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          <ProductStats products={filteredProducts} />
          
          {activeTab === 'overview' && (
            viewMode === 'grid' ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <ProductTable products={filteredProducts} />
            )
          )}
          
          {activeTab === 'analytics' && (
            <ProductAnalytics products={filteredProducts} />
          )}
          
          {activeTab === 'settings' && (
            <ProductSettings />
          )}
        </div>
      </div>
    </div>
  );
}