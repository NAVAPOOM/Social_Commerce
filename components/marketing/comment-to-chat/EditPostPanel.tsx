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
  Switch,
  Tabs,
  Tab,
  Card,
  CardBody,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';
import { postData } from './data';

interface EditPostPanelProps {
  postId: string | null;
  onClose: () => void;
}

const platformTypes = [
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram Post', value: 'instagram_post' },
  { label: 'Instagram Story', value: 'instagram_story' },
];

const responseTypes = [
  { label: 'Respond to all comments', value: 'all' },
  { label: 'Respond based on keywords', value: 'keywords' },
];

export default function EditPostPanel({
  postId,
  onClose,
}: EditPostPanelProps) {
  const post = React.useMemo(
    () => postData.find((p) => p.id === postId),
    [postId]
  );

  const [media, setMedia] = React.useState<File | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'video/*': ['.mp4', '.mov'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setMedia(acceptedFiles[0]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  if (!post) return null;

  return (
    <Sheet isOpen={!!postId} onOpenChange={onClose}>
      <SheetContent size="xl">
        <form className="flex h-full flex-col gap-4" onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Edit Post</SheetTitle>
          </SheetHeader>

          <Tabs aria-label="Post settings">
            <Tab
              key="basic"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:document-text-linear" width={20} />
                  Basic Info
                </div>
              }
            >
              <div className="mt-4 grid gap-4">
                <Input
                  isRequired
                  label="Post Title"
                  placeholder="Enter post title"
                  value={post.title}
                  variant="bordered"
                />
                <Input
                  isRequired
                  label="Post ID"
                  placeholder="Enter post ID"
                  value={post.postId}
                  variant="bordered"
                />
                <Select
                  isRequired
                  items={platformTypes}
                  label="Platform"
                  placeholder="Select platform"
                  selectedKeys={[post.platform]}
                  variant="bordered"
                >
                  {(platform) => (
                    <SelectItem
                      key={platform.value}
                      startContent={
                        <Icon
                          icon={`logos:${platform.value.split('_')[0]}`}
                          width={20}
                        />
                      }
                    >
                      {platform.label}
                    </SelectItem>
                  )}
                </Select>
              </div>
            </Tab>
            <Tab
              key="response"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:chat-round-dots-linear" width={20} />
                  Response
                </div>
              }
            >
              <div className="mt-4 space-y-4">
                <Select
                  isRequired
                  items={responseTypes}
                  label="Response Type"
                  placeholder="Select response type"
                  selectedKeys={[post.responseType]}
                  variant="bordered"
                >
                  {(type) => (
                    <SelectItem key={type.value}>
                      {type.label}
                    </SelectItem>
                  )}
                </Select>

                {post.responseType === 'keywords' && (
                  <Input
                    label="Keywords"
                    placeholder="Enter keywords separated by commas"
                    value={post.keywords?.join(', ')}
                    variant="bordered"
                  />
                )}

                <Textarea
                  label="Response Message"
                  placeholder="Enter your automated response message"
                  value={post.responseMessage}
                  variant="bordered"
                />

                <Card>
                  <CardBody className="gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-small">Auto-Response</span>
                      <Switch
                        defaultSelected={post.settings.autoResponse}
                        size="sm"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-small">Include Images</span>
                      <Switch
                        defaultSelected={post.settings.includeImages}
                        size="sm"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-small">Include Products</span>
                      <Switch
                        defaultSelected={post.settings.includeProducts}
                        size="sm"
                      />
                    </div>
                    <Input
                      label="Response Delay (seconds)"
                      type="number"
                      value={post.settings.responseDelay.toString()}
                      variant="bordered"
                    />
                  </CardBody>
                </Card>
              </div>
            </Tab>
            <Tab
              key="analytics"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:graph-new-linear" width={20} />
                  Analytics
                </div>
              }
            >
              <div className="mt-4 space-y-4">
                <Card>
                  <CardBody className="gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-small text-default-500">Total Reach</p>
                        <p className="text-xl font-semibold">
                          {post.stats.reach.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-small text-default-500">Engagement</p>
                        <p className="text-xl font-semibold">
                          {post.stats.engagement.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-small text-default-500">Orders</p>
                        <p className="text-xl font-semibold">
                          {post.stats.orders.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-small text-default-500">Revenue</p>
                        <p className="text-xl font-semibold">
                          ${post.stats.revenue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody className="gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-small text-default-500">Comments</p>
                        <p className="text-xl font-semibold">
                          {post.stats.commentsCount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-small text-default-500">Response Rate</p>
                        <p className="text-xl font-semibold">
                          {post.stats.responseRate.toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-small text-default-500">Avg. Response Time</p>
                        <p className="text-xl font-semibold">
                          {post.stats.averageResponseTime}s
                        </p>
                      </div>
                      <div>
                        <p className="text-small text-default-500">Conversion Rate</p>
                        <p className="text-xl font-semibold">
                          {post.stats.conversionRate.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
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