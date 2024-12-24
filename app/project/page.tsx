"use client";

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { useMediaQuery } from 'usehooks-ts'; 
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion'; 
import App from '@/components/project/App'; 

export default function ProjectPage() {
  const isCompact = useMediaQuery('(max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen">
        <LazyMotion features={domAnimation}>
          
            
              <div className="col-span-12 min-h-[calc(100vh-120px)]">
                <App />
              </div>
            
          
        </LazyMotion>
      </div>
    </Provider>
  );
}