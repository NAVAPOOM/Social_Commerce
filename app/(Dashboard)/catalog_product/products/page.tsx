'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import App from '@/components/catalog&product/products/App';

export default function ProductsPage() {
  const router = useRouter();
  const isCompact = useMediaQuery('(max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleAddProduct = () => {
    router.push('/catalog_product/add');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <LazyMotion features={domAnimation}>
        <div className="flex-grow grid grid-cols-12 gap-0 overflow-y-hidden p-0 sm:rounded-large sm:border-small sm:border-default-200">
          <div className="col-span-12 h-[calc(100vh-80px)]">
            <App onAddProduct={handleAddProduct} />
          </div>
        </div>
      </LazyMotion>
    </div>
  );
}