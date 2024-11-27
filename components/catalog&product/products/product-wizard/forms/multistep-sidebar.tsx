'use client';

import React from 'react';
import { Button } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { cn } from '@/utils/cn';
import VerticalSteps from './vertical-steps';
import RowSteps from './row-steps';
import MultistepNavigationButtons from './multistep-navigation-buttons';

export type MultiStepSidebarProps = React.HTMLAttributes<HTMLDivElement> & {
  currentPage: number;
  onBack: () => void;
  onNext: () => void;
  onChangePage: (page: number) => void;
};

const stepperClasses = cn(
  '[--step-color:hsl(var(--nextui-secondary-400))]',
  '[--active-color:hsl(var(--nextui-secondary-400))]',
  '[--inactive-border-color:hsl(var(--nextui-secondary-200))]',
  '[--inactive-bar-color:hsl(var(--nextui-secondary-200))]',
  '[--inactive-color:hsl(var(--nextui-secondary-300))]',
  'dark:[--step-color:rgba(255,255,255,0.1)]',
  'dark:[--active-color:hsl(var(--nextui-foreground-600))]',
  'dark:[--active-border-color:rgba(255,255,255,0.5)]',
  'dark:[--inactive-border-color:rgba(255,255,255,0.1)]',
  'dark:[--inactive-bar-color:rgba(255,255,255,0.1)]',
  'dark:[--inactive-color:rgba(255,255,255,0.2)]'
);

const MultiStepSidebar = React.forwardRef<HTMLDivElement, MultiStepSidebarProps>(
  (
    {
      children,
      className,
      currentPage,
      onBack,
      onNext,
      onChangePage,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex h-[calc(100vh_-_40px)] w-full gap-x-2', className)}
        {...props}
      >
        <div className="flex hidden h-full w-[344px] flex-shrink-0 flex-col items-start gap-y-8 rounded-large bg-gradient-to-b from-default-100 via-danger-100 to-secondary-100 px-8 py-6 shadow-small lg:flex">
          <Button
            className="bg-default-50 text-small font-medium text-default-500 shadow-lg"
            isDisabled={currentPage === 0}
            radius="full"
            variant="flat"
            onPress={onBack}
          >
            <Icon icon="solar:arrow-left-outline" width={18} />
            Back
          </Button>
          <div>
            <div className="text-xl font-medium leading-7 text-default-foreground">
              Add New Product
            </div>
            <div className="mt-1 text-base font-medium leading-6 text-default-500">
              Create and configure your product details
            </div>
          </div>
          {/* Desktop Steps */}
          <VerticalSteps
            className={stepperClasses}
            color="secondary"
            currentStep={currentPage}
            steps={[
              {
                title: 'Basic Info',
                description: 'Product details and images',
              },
              {
                title: 'Advanced Details',
                description: 'Additional specifications',
              },
              {
                title: 'Properties',
                description: 'Define product variations',
              },
              {
                title: 'SKU Management',
                description: 'Manage product SKUs',
              },
            ]}
            onStepChange={onChangePage}
          />
        </div>
        <div className="flex h-full w-full flex-col items-center gap-4 md:p-4">
          <div className="sticky top-0 z-10 w-full rounded-large bg-gradient-to-r from-default-100 via-danger-100 to-secondary-100 py-4 shadow-small md:max-w-xl lg:hidden">
            <div className="flex justify-center">
              {/* Mobile Steps */}
              <RowSteps
                className={cn('pl-6', stepperClasses)}
                currentStep={currentPage}
                steps={[
                  {
                    title: 'Basic',
                  },
                  {
                    title: 'Advanced',
                  },
                  {
                    title: 'Properties',
                  },
                  {
                    title: 'SKUs',
                  },
                ]}
                onStepChange={onChangePage}
              />
            </div>
          </div>
          <div className="h-full w-full p-4 sm:max-w-md md:max-w-lg">
            {children}
            <MultistepNavigationButtons
              backButtonProps={{ isDisabled: currentPage === 0 }}
              className="lg:hidden"
              nextButtonProps={{
                children:
                  currentPage === 0
                    ? 'Continue'
                    : currentPage === 3
                    ? 'Create Product'
                    : 'Continue',
              }}
              onBack={onBack}
              onNext={onNext}
            />
          </div>
        </div>
      </div>
    );
  }
);

MultiStepSidebar.displayName = 'MultiStepSidebar';

export default MultiStepSidebar;