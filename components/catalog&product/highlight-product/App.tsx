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
import HighlightStats from './HighlightStats';
import HighlightGrid from './HighlightGrid';
import HighlightTable from './HighlightTable';
import AddHighlightModal from './AddHighlightModal';
import EditHighlightPanel from './EditHighlightPanel';
import { highlightData } from './data';

const categories = [
  { label: 'All Categories', value: 'all' },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Home & Living', value: 'home' },
];

const collections = [
  { label: 'All Collections', value: 'all' },
  { label: 'Best Sellers', value: 'best_sellers' },
  { label: 'New Arrivals', value: 'new_arrivals' },
  { label: 'Sale Items', value: 'sale' },
];

export default function HighlightProductApp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState('overview');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [collectionFilter, setCollectionFilter] = React.useState('all');
  const [viewMode, setViewMode] = React.useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = React.useState<string>('popularity');

  const handleEditProduct = (productId: string) => {
    setSelectedProduct(productId);
  };

  const handleCloseEdit = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = React.useMemo(() => {
    let filtered = highlightData;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    if (collectionFilter !== 'all') {
      filtered = filtered.filter(product => product.collection === collectionFilter);
    }

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.stats.views - a.stats.views;
        case 'price':
          return a.price - b.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [searchQuery, categoryFilter, collectionFilter, sortBy]);

  return (
    <div className="flex h-full flex-col">
      {/* Fixed Header */}
      <div className="border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Highlight Products</h1>
            <p className="text-small text-default-500">
              Manage and showcase your featured products
            </p>
          </div>
          <Button
            color="primary"
            endContent={<Icon icon="solar:add-circle-bold" width={20} />}
            onPress={onOpen}
          >
            Add Highlight
          </Button>
        </div>
      </div>

      {/* Sticky Controls */}
      <div className="sticky top-0 z-10 border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex flex-col gap-4">
          <Tabs
            aria-label="Highlight sections"
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
              key="collections"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:stars-linear" width={20} />
                  Collections
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
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                className="max-w-xs"
                placeholder="Collection"
                selectedKeys={[collectionFilter]}
                size="sm"
                variant="bordered"
                onSelectionChange={(keys) => setCollectionFilter(Array.from(keys)[0] as string)}
              >
                {collections.map((collection) => (
                  <SelectItem key={collection.value} value={collection.value}>
                    {collection.label}
                  </SelectItem>
                ))}
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
                  <DropdownItem key="popularity">Popularity</DropdownItem>
                  <DropdownItem key="price">Price</DropdownItem>
                  <DropdownItem key="name">Name</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          <HighlightStats products={filteredProducts} />
          
          {viewMode === 'grid' ? (
            <HighlightGrid
              products={filteredProducts}
              onEdit={handleEditProduct}
            />
          ) : (
            <HighlightTable
              products={filteredProducts}
              onEdit={handleEditProduct}
            />
          )}
        </div>
      </div>

      <AddHighlightModal isOpen={isOpen} onClose={onClose} />
      <EditHighlightPanel
        productId={selectedProduct}
        onClose={handleCloseEdit}
      />
    </div>
  );
}