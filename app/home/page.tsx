"use client";

import React from "react";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Divider,
  Chip,
  Input,
  Tabs,
  Tab,
  useDisclosure,
} from "@nextui-org/react";
import {Icon} from "@iconify/react";

import FiltersWrapper from "./filters-wrapper";
import ecommerceItems from "./ecommerce-items";
import SidebarDrawer from "./sidebar-drawer";
import ProductsGrid from "./products-grid";

export default function Component() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className="max-w-8xl h-full w-full px-2 lg:px-24">
      <nav className="flex gap-2 my-4 px-2 py-2">
        <h1 className="text-2xl font-bold">Products</h1>
        <Chip color="primary" variant="flat">1708 total products</Chip>
      </nav>
      <div className="flex gap-x-6">
        <SidebarDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
          <FiltersWrapper
            className="bg-default-50"
            items={ecommerceItems}
            scrollShadowClassName="max-h-full pb-12"
            showActions={false}
            title="Filter by"
          />
        </SidebarDrawer>
        <div className="w-full flex-1 flex-col">
          <header className="relative z-20 flex flex-col gap-2 rounded-medium bg-default-50 px-4 pb-3 pt-2 md:pt-3">
            <div className="flex items-center gap-1 md:hidden md:gap-2">
              <Input
                isClearable
                placeholder="Search by product name..."
                startContent={<Icon height={24} icon="solar:magnifer-linear" width={24} />}
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-row gap-2 w-full md:w-4/5">
                <Button
                  className="flex border-default-200 md:hidden"
                  startContent={
                    <Icon
                      className="text-default-500"
                      height={16}
                      icon="solar:filter-linear"
                      width={16}
                    />
                  }
                  variant="bordered"
                  onPress={onOpen}
                >
                  Filters
                </Button>
                <div className="hidden md:flex w-full">
                  <Input
                    isClearable
                    placeholder="Search by product name..."
                    startContent={<Icon height={24} icon="solar:magnifer-linear" width={24} />}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Tabs aria-label="Tabs sizes">
                  <Tab title={
                    <div className="flex items-center space-x-2">
                      <Icon height={24} icon="solar:checklist-linear" width={24} />                  
                    </div>
                  }/>
                  <Tab title={
                    <div className="flex items-center space-x-2">
                      <Icon height={24} icon="solar:widget-linear" width={24} />                 
                    </div>
                  }/>
                </Tabs>
                <Divider orientation="vertical" className="h-10 hidden md:block" />
                <Button color="danger" variant="shadow">
                  Add Product
                </Button>
              </div>
            </div>
          </header>
          <main className="mt-4 h-full w-full overflow-visible px-1">
            <div className="block rounded-medium border-medium border-dashed border-divider">
              {/* Put your content here */}
              <ProductsGrid className="grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
