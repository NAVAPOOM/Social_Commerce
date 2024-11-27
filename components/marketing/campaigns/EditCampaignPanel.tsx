'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  Tabs,
  Tab,
  Progress,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';
import {
  campaignData,
  campaignTypes,
  audienceSegments,
  communicationChannels,
} from './data';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface EditCampaignPanelProps {
  campaignId: string | null;
  onClose: () => void;
}

const performanceData = [
  { day: 'Mon', impressions: 1200, clicks: 180, conversions: 24 },
  { day: 'Tue', impressions: 1400, clicks: 220, conversions: 32 },
  { day: 'Wed', impressions: 1100, clicks: 160, conversions: 28 },
  { day: 'Thu', impressions: 1600, clicks: 240, conversions: 36 },
  { day: 'Fri', impressions: 1800, clicks: 280, conversions: 42 },
  { day: 'Sat', impressions: 1500, clicks: 200, conversions: 30 },
  { day: 'Sun', impressions: 1300, clicks: 190, conversions: 26 },
];

export default function EditCampaignPanel({
  campaignId,
  onClose,
}: EditCampaignPanelProps) {
  const campaign = React.useMemo(
    () => campaignData.find((c) => c.id === campaignId),
    [campaignId]
  );

  const [image, setImage] = React.useState<File | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  if (!campaign) return null;

  return (
    <Sheet isOpen={!!campaignId} onOpenChange={onClose}>
      <SheetContent size="xl">
        <form className="flex h-full flex-col gap-4" onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Edit Campaign</SheetTitle>
          </SheetHeader>

          <Tabs aria-label="Campaign settings">
            <Tab
              key="details"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:flag-linear" width={20} />
                  Details
                </div>
              }
            >
              <div className="mt-4 grid gap-4">
                <Input
                  isRequired
                  label="Campaign Name"
                  placeholder="Enter campaign name"
                  value={campaign.name}
                  variant="bordered"
                />
                <Select
                  isRequired
                  items={campaignTypes}
                  label="Campaign Type"
                  placeholder="Select campaign type"
                  selectedKeys={[campaign.type]}
                  variant="bordered"
                >
                  {(type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  )}
                </Select>
                <Textarea
                  label="Description"
                  placeholder="Enter campaign description"
                  value={campaign.description}
                  variant="bordered"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    isRequired
                    label="Start Date"
                    placeholder="Select start date"
                    type="date"
                    value={campaign.startDate}
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="End Date"
                    placeholder="Select end date"
                    type="date"
                    value={campaign.endDate}
                    variant="bordered"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-small">
                    <span className="text-default-500">Budget spent</span>
                    <span className="text-default-700">
                      ${campaign.spentBudget.toLocaleString()} / $
                      {campaign.budget.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    aria-label="Budget progress"
                    classNames={{
                      base: "max-w-full",
                      track: "drop-shadow-md border border-default",
                      indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                      label: "tracking-wider font-medium text-default-600",
                      value: "text-foreground/60",
                    }}
                    value={(campaign.spentBudget / campaign.budget) * 100}
                    showValueLabel
                  />
                </div>
              </div>
            </Tab>
            <Tab
              key="targeting"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:users-group-rounded-linear" width={20} />
                  Targeting
                </div>
              }
            >
              <div className="mt-4 space-y-4">
                <Select
                  isRequired
                  items={audienceSegments}
                  label="Target Audience"
                  placeholder="Select target audience"
                  selectedKeys={campaign.target.audience}
                  selectionMode="multiple"
                  variant="bordered"
                >
                  {(segment) => (
                    <SelectItem key={segment.value} value={segment.value}>
                      {segment.label}
                    </SelectItem>
                  )}
                </Select>
                <Select
                  isRequired
                  items={communicationChannels}
                  label="Communication Channels"
                  placeholder="Select channels"
                  selectedKeys={campaign.channels}
                  selectionMode="multiple"
                  variant="bordered"
                >
                  {(channel) => (
                    <SelectItem key={channel.value} value={channel.value}>
                      {channel.label}
                    </SelectItem>
                  )}
                </Select>
              </div>
            </Tab>
            <Tab
              key="creative"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:gallery-linear" width={20} />
                  Creative
                </div>
              }
            >
              <div className="mt-4">
                <div
                  {...getRootProps()}
                  className={`flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-default-200 bg-default-50 transition-colors ${
                    isDragActive ? 'border-primary bg-primary/10' : ''
                  }`}
                >
                  <input {...getInputProps()} />
                  {image ? (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        alt="Campaign preview"
                        className="h-24 w-24 rounded-lg object-cover"
                        src={URL.createObjectURL(image)}
                      />
                      <p className="text-small text-default-500">
                        Click or drag to replace
                      </p>
                    </div>
                  ) : campaign.image ? (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        alt={campaign.name}
                        className="h-24 w-24 rounded-lg object-cover"
                        src={campaign.image}
                      />
                      <p className="text-small text-default-500">
                        Click or drag to replace
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Icon
                        className="text-default-400"
                        icon="solar:gallery-add-bold"
                        width={24}
                      />
                      <p className="text-center text-small text-default-500">
                        {isDragActive
                          ? 'Drop the image here'
                          : 'Click to upload or drag and drop'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Tab>
            <Tab
              key="performance"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:chart-2-linear" width={20} />
                  Performance
                </div>
              }
            >
              <div className="mt-4 space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border border-default-200 p-4">
                    <div className="flex items-center gap-2">
                      <Icon
                        className="text-primary"
                        icon="solar:eye-bold"
                        width={20}
                      />
                      <span className="text-small font-medium">Impressions</span>
                    </div>
                    <p className="mt-2 text-xl font-semibold">
                      {campaign.stats.impressions.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-lg border border-default-200 p-4">
                    <div className="flex items-center gap-2">
                      <Icon
                        className="text-success"
                        icon="solar:cursor-bold"
                        width={20}
                      />
                      <span className="text-small font-medium">Clicks</span>
                    </div>
                    <p className="mt-2 text-xl font-semibold">
                      {campaign.stats.clicks.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-lg border border-default-200 p-4">
                    <div className="flex items-center gap-2">
                      <Icon
                        className="text-warning"
                        icon="solar:cart-check-bold"
                        width={20}
                      />
                      <span className="text-small font-medium">Conversions</span>
                    </div>
                    <p className="mt-2 text-xl font-semibold">
                      {campaign.stats.conversions.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="impressions"
                        name="Impressions"
                        stroke="#8884d8"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="clicks"
                        name="Clicks"
                        stroke="#82ca9d"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="conversions"
                        name="Conversions"
                        stroke="#ffc658"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Tab>
          </Tabs>

          <div className="mt-auto flex justify-end gap-3">
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}