'use client';

import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
  Switch,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';

interface AppearanceSectionProps {
  onFormChange: () => void;
}

const languages = [
  { label: 'English', value: 'en' },
  { label: 'Thai', value: 'th' },
  { label: 'Chinese', value: 'zh' },
  { label: 'Japanese', value: 'ja' },
];

const dateFormats = [
  { label: 'MM/DD/YYYY', value: 'mm/dd/yyyy' },
  { label: 'DD/MM/YYYY', value: 'dd/mm/yyyy' },
  { label: 'YYYY-MM-DD', value: 'yyyy-mm-dd' },
];

const currencies = [
  { label: 'USD ($)', value: 'usd' },
  { label: 'THB (฿)', value: 'thb' },
  { label: 'EUR (€)', value: 'eur' },
  { label: 'GBP (£)', value: 'gbp' },
];

export default function AppearanceSection({ onFormChange }: AppearanceSectionProps) {
  return (
    <div className="space-y-6">
      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Theme Settings</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <RadioGroup
            label="Color Theme"
            orientation="horizontal"
            onChange={onFormChange}
          >
            <Radio value="light">Light</Radio>
            <Radio value="dark">Dark</Radio>
            <Radio value="system">System</Radio>
          </RadioGroup>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Reduced Motion</p>
              <p className="text-small text-default-500">
                Reduce interface animations
              </p>
            </div>
            <Switch onValueChange={onFormChange} />
          </div>
        </CardBody>
      </Card>

      {/* Language & Region */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Language & Region</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <Select
            items={languages}
            label="Language"
            placeholder="Select language"
            startContent={
              <Icon
                className="text-default-400"
                icon="solar:global-linear"
                width={16}
              />
            }
            variant="bordered"
            onChange={onFormChange}
          >
            {(language) => (
              <SelectItem key={language.value} value={language.value}>
                {language.label}
              </SelectItem>
            )}
          </Select>

          <Select
            items={dateFormats}
            label="Date Format"
            placeholder="Select date format"
            startContent={
              <Icon
                className="text-default-400"
                icon="solar:calendar-linear"
                width={16}
              />
            }
            variant="bordered"
            onChange={onFormChange}
          >
            {(format) => (
              <SelectItem key={format.value} value={format.value}>
                {format.label}
              </SelectItem>
            )}
          </Select>

          <Select
            items={currencies}
            label="Currency"
            placeholder="Select currency"
            startContent={
              <Icon
                className="text-default-400"
                icon="solar:dollar-linear"
                width={16}
              />
            }
            variant="bordered"
            onChange={onFormChange}
          >
            {(currency) => (
              <SelectItem key={currency.value} value={currency.value}>
                {currency.label}
              </SelectItem>
            )}
          </Select>
        </CardBody>
      </Card>

      {/* Dashboard Layout */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Dashboard Layout</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Compact Mode</p>
              <p className="text-small text-default-500">
                Use a more compact layout
              </p>
            </div>
            <Switch onValueChange={onFormChange} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Show Quick Actions</p>
              <p className="text-small text-default-500">
                Display quick action buttons
              </p>
            </div>
            <Switch defaultSelected onValueChange={onFormChange} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable Animations</p>
              <p className="text-small text-default-500">
                Show interface animations
              </p>
            </div>
            <Switch defaultSelected onValueChange={onFormChange} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
