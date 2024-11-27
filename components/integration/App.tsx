'use client';

import React from 'react';
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Button,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import ProjectSection from './sections/ProjectSection';
import APISection from './sections/APISection';
import WebhookSection from './sections/WebhookSection';
import ServicesSection from './sections/ServicesSection';
import NotificationsSection from './sections/NotificationsSection';
import SecuritySection from './sections/SecuritySection';
import StatsSection from './sections/StatsSection';
import SystemSection from './sections/SystemSection';

export default function IntegrationApp() {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <div className="flex h-full flex-col">
      {/* Fixed Header */}
      <div className="border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Integration</h1>
            <p className="text-small text-default-500">
              Manage your API keys, webhooks, and external service connections
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              color="primary"
              variant="flat"
              startContent={<Icon icon="solar:file-download-linear" width={20} />}
            >
              Export Logs
            </Button>
            <Button
              color="primary"
              endContent={<Icon icon="solar:book-bookmark-linear" width={20} />}
            >
              API Documentation
            </Button>
          </div>
        </div>
      </div>

      {/* Sticky Controls */}
      <div className="sticky top-0 z-10 border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <Tabs
          aria-label="Integration sections"
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
            key="api"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="solar:key-linear" width={20} />
                API Keys
              </div>
            }
          />
          <Tab
            key="webhook"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="solar:link-circle-linear" width={20} />
                Webhooks
              </div>
            }
          />
          <Tab
            key="services"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="solar:widget-5-linear" width={20} />
                Services
              </div>
            }
          />
          <Tab
            key="security"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="solar:shield-keyhole-linear" width={20} />
                Security
              </div>
            }
          />
        </Tabs>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <ProjectSection />
              <StatsSection />
              <SystemSection />
            </div>
          )}
          
          {activeTab === 'api' && (
            <div className="space-y-6">
              <APISection />
            </div>
          )}
          
          {activeTab === 'webhook' && (
            <div className="space-y-6">
              <WebhookSection />
            </div>
          )}
          
          {activeTab === 'services' && (
            <div className="space-y-6">
              <ServicesSection />
              <NotificationsSection />
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="space-y-6">
              <SecuritySection />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}