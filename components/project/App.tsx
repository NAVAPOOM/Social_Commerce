'use client';

import type { Store } from "./store-card";
import MagnitaLogo from "@/components/icon/magnita-logo";
import { Button, Spacer, Avatar, Image, Input, Select, SelectItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import StoreCard, { StoreCardProps } from "./store-card";
import { Icon } from "@iconify/react";
import CreateStoreModal from "./create-store";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

const businessTypes = [
  { label: "Beauty & Cosmetic", value: "Beauty & Cosmetic" },
  { label: "Clothes & Fashion goods", value: "Clothes & Fashion goods" },
  { label: "Education", value: "Education" },
  { label: "Food, Drink & Bakery", value: "Food, Drink & Bakery" },
  { label: "Furniture & Decoration", value: "Furniture & Decoration" },
  { label: "General goods", value: "General goods" },
  { label: "Gold & Jewels", value: "Gold & Jewels" },
  { label: "Media & Entertainment", value: "Media & Entertainment" },
  { label: "Merchandise", value: "Merchandise" },
  { label: "Health Care Pharmaceutical & Biotech", value: "Health Care Pharmaceutical & Biotech" },
  { label: "Stationery & Sport", value: "Stationery & Sport" },
  { label: "Others", value: "Others" },
];    

const stores: StoreCardProps[] = [
  {
    name: "John's Store",
    imageSrc: "https://i.pravatar.cc/150?u=a04258114e29026708c",
    type: "Retail",
    address: "123 Main St, City, Country",
    social: {
      line: "johns-line",
      facebook: "johns-store",
      instagram: "johns_store",
      website: "https://johnsstore.com",
    },
  },
  {
    name: "Jane's Boutique",
    imageSrc: "https://i.pravatar.cc/150?u=a04258ab4e29066708c",
    type: "Fashion",
    address: "456 High St, City, Country",
    social: {
      line: "janes-line",
      facebook: "janes-boutique",
      instagram: "janes_boutique",
      website: "https://janesboutique.com",
    },
  },
  {
    name: "Robert's Cafe",
    imageSrc: "https://i.pravatar.cc/150?u=a04258114e29066708c",
    type: "Food & Beverage",
    address: "789 Park Ave, City, Country",
    social: {
      line: "roberts-line",
      facebook: "roberts-cafe",
      instagram: "roberts_cafe",
      website: "https://robertscafe.com",
    },
  },
  {
    name: "Mark's Electronics",
    imageSrc: "https://i.pravatar.cc/150?u=a04258a14e29066708c",
    type: "Electronics",
    address: "101 Tech Rd, City, Country",
    social: {
      line: "marks-line",
      facebook: "marks-electronics",
      instagram: "marks_electronics",
      website: "https://markselectronics.com",
    },
  },
];

export default function App() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  // สถานะของการค้นหาคำค้นและประเภทธุรกิจ
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [filteredStores, setFilteredStores] = useState<StoreCardProps[]>(stores);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // ฟังก์ชันการค้นหา
  const onSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // ฟังก์ชันเพิ่มร้านค้าใหม่
  const handleCreateStore = (newStore: StoreCardProps) => {
    setFilteredStores([...filteredStores, newStore]);
  };

  // ฟังก์ชันการกรองประเภทธุรกิจ
  const onTypeChange = (type: string) => {
    setSelectedType(type);
  };

  // ฟังก์ชันกรองร้านค้า
  useEffect(() => {
    const filtered: StoreCardProps[] = stores.filter((store) => {
      const matchesSearchQuery = store.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "All" ? true : store.type === selectedType;
      return matchesSearchQuery && matchesType;
    });
    setFilteredStores(filtered);
  }, [searchQuery, selectedType]);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Left Section - Hidden on Mobile */}
      <div className="hidden lg:flex w-full lg:w-1/3 flex-col justify-between p-10 bg-gradient-to-b from-default-100 via-danger-100 to-secondary-100 min-h-screen">
        {/* Logo and Heading */}
        <div className="flex items-center gap-3 mb-8">
          <MagnitaLogo />
          <p className="font-medium text-lg">MAGNITA</p>
        </div>

        {/* Welcome Message */}
        <h1 className="text-4xl font-bold mb-4 mt-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Welcome to deeple
        </h1>
        <p className="text-large text-default-600 mb-6 leading-relaxed">
          Get started by creating your project and be ready to have just about anything of your project managed all in one place with deeple.
        </p>

        {/* Image */}
        <div className="flex justify-center mt-8 transform hover:scale-105 transition-transform duration-300">
          <Image
            isBlurred
            width={500}
            height={200}
            src="/social commerce.webp"
            alt="social commerce Cover"
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* User Profile */}
        <div className="flex items-center justify-between mt-8 p-4 bg-background/40 rounded-xl backdrop-blur-sm">
          <Avatar
            isBordered
            radius="lg"
            size="md"
            name="Navapoom Punsathit"
            className="ring-2 ring-primary/30"
          />
          <div className="flex flex-grow flex-col ml-4">
            <p className="text-medium font-semibold text-foreground">Navapoom Punsathit</p>
            <p className="text-tiny text-default-500">navapoom.p@kanda.digital</p>
          </div>
          <Button
            variant="light"
            aria-label="Log Out"
            className="text-default-500 hover:text-danger transition-colors"
            onPress={() => console.log("Log Out")}
          >
            <Icon
              className="rotate-180 text-default-500 mr-1"
              icon="solar:logout-3-linear"
              width={24}
            />
            Log Out
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div className="block w-full lg:w-2/3 p-8">
        {/* Mobile User Profile */}
        {isMobile && (
          <div className="flex items-center justify-between mb-8 p-4 bg-content2 rounded-xl">
            <Avatar isBordered radius="lg" size="md" name="Navapoom Punsathit" />
            <div className="flex flex-grow flex-col ml-4">
              <p className="text-small text-foreground">Navapoom Punsathit</p>
              <p className="text-tiny text-default-500">navapoom.p@kanda.digital</p>
            </div>
            <Button
              variant="light"
              aria-label="Log Out"
              className="text-default-500 hover:text-danger transition-colors"
              onPress={() => console.log("Log Out")}
            >
              <Icon
                className="rotate-180 text-default-500 mr-1"
                icon="solar:logout-3-linear"
                width={24}
              />
              Log Out
            </Button>
          </div>
        )}

        {/* Store Cards Section */}
        <section className="flex flex-col items-center py-2">
          <div className="flex max-w-xl flex-col text-center">
            <h2 className="font-medium text-secondary">We're here for you!</h2>
            <h1 className="text-4xl font-medium tracking-tight">Explore Our Stores</h1>
            <Spacer y={4} />
            <h2 className="text-large text-default-500">
              Connect to all social media channels (Facebook Page, Instagram Business, Line OA) by visiting our featured stores.
            </h2>
            <Spacer y={4} />
            <div className="flex w-full justify-center gap-2">
              <Button variant="ghost">About us</Button>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 w-full mb-4 mt-4">
            {/* Search Input */}
            <Input
              className="flex-1 max-w-sm"
              placeholder="Search stores..."
              startContent={<Icon icon="solar:magnifer-linear" />}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />

            {/* Business Type Filter - Desktop */}
            {!isMobile && (
              <Select
                className="w-48"
                placeholder="Business Type"
                selectedKeys={[selectedType]}
                onChange={(e) => onTypeChange(e.target.value)}
              >
                {businessTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </Select>
            )}

            {/* Business Type Filter - Mobile */}
            {isMobile && (
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="flat"
                    startContent={<Icon icon="solar:filter-linear" width={20} />}
                  >
                    Filter
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Business Types"
                  selectedKeys={selectedType ? [selectedType] : []}
                  selectionMode="single"
                  onSelectionChange={(keys) => onTypeChange(Array.from(keys)[0] as string)}
                >
                  {businessTypes.map((type) => (
                    <DropdownItem key={type.value} value={type.value}>
                      {type.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}

            {/* New Store Button */}
            <Button
              color="danger"
              variant="flat"
              startContent={<Icon icon="solar:shop-linear" width={20} />}
              onPress={() => setIsCreateModalOpen(true)}
            >
              {isMobile ? "New Store" : "New Store"}
            </Button>
          </div>

          {/* Store Cards Grid */}
          <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredStores.map((store, index) => (
              <StoreCard key={index} {...store} />
            ))}
          </div>
        </section>
        
        {/* Create Store Modal */}
        <CreateStoreModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateStore={handleCreateStore}
        />
      </div>
    </div>
  );
}