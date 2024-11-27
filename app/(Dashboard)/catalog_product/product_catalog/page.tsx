// app/(DashboardLayout)/catalog_product/product_catalog/page.tsx
"use client";

import React from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import CatalogApp from "@/components/catalog&product/product-catalog/App";


export default function ProductMCatalogPage() {
  const isCompact = useMediaQuery('(max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="flex flex-col min-h-screen">
      <LazyMotion features={domAnimation}>
        <div className="flex-grow grid grid-cols-12 gap-0 overflow-y-hidden p-0 sm:rounded-large sm:border-small sm:border-default-200">
          <div className="col-span-12 h-[calc(100vh-80px)]">
            <CatalogApp />
          </div>
        </div>
      </LazyMotion>
    </div>
  );
}