'use client';

import React from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import TopSellingProductsApp from '@/components/marketing/top-selling-products/App';

export default function TopSellingProductsPage() {
  const isCompact = useMediaQuery('(max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="h-full w-full">
      <LazyMotion features={domAnimation}>
        <div className="grid grid-cols-12 gap-0 overflow-y-hidden p-0 pb-2 sm:rounded-large sm:border-small sm:border-default-200">
          <div className="col-span-12 h-[calc(100vh-80px)]">
            <TopSellingProductsApp />
          </div>
        </div>
      </LazyMotion>
    </div>
  );
}