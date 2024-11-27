'use client';

import React from 'react';
import {
  Button,
  useDisclosure,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Select,
  SelectItem,
  Tabs,
  Tab,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import AddPostModal from './AddPostModal';
import EditPostPanel from './EditPostPanel';
import PostStats from './PostStats';
import PostTable from './PostTable';
import { postData } from './data';

const platformTypes = [
  { label: 'All Platforms', value: 'all' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram Post', value: 'instagram_post' },
  { label: 'Instagram Story', value: 'instagram_story' },
];

const postStatuses = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Paused', value: 'paused' },
];

export default function CommentToChatApp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPost, setSelectedPost] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [platformFilter, setPlatformFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [sortBy, setSortBy] = React.useState<string>('date');
  const [activeTab, setActiveTab] = React.useState('overview');

  const handleEditPost = (postId: string) => {
    setSelectedPost(postId);
  };

  const handleCloseEdit = () => {
    setSelectedPost(null);
  };

  const filteredPosts = React.useMemo(() => {
    let filtered = postData;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.postId.toLowerCase().includes(query)
      );
    }

    if (platformFilter !== 'all') {
      filtered = filtered.filter(post => post.platform === platformFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(post => post.status === statusFilter);
    }

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'reach':
          return b.stats.reach - a.stats.reach;
        case 'engagement':
          return b.stats.engagement - a.stats.engagement;
        case 'orders':
          return b.stats.orders - a.stats.orders;
        default:
          return 0;
      }
    });
  }, [searchQuery, platformFilter, statusFilter, sortBy]);

  return (
    <div className="flex h-full flex-col">
      {/* Fixed Header */}
      <div className="border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Comment to Chat</h1>
            <p className="text-small text-default-500">
              Manage your automated comment responses and conversions
            </p>
          </div>
          <Button
            color="primary"
            endContent={<Icon icon="solar:add-circle-bold" width={20} />}
            onPress={onOpen}
          >
            Add Post
          </Button>
        </div>
      </div>

      {/* Sticky Controls */}
      <div className="sticky top-0 z-10 border-b border-divider bg-background/80 px-6 py-4 backdrop-blur-lg">
        <div className="flex flex-col gap-4">
          <Tabs
            aria-label="Post sections"
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
              key="posts"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:posts-carousel-vertical-linear" width={20} />
                  Posts
                </div>
              }
            />
            <Tab
              key="analytics"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:graph-new-linear" width={20} />
                  Analytics
                </div>
              }
            />
            <Tab
              key="settings"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="solar:settings-linear" width={20} />
                  Settings
                </div>
              }
            />
          </Tabs>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 gap-2">
              <Input
                className="max-w-xs"
                placeholder="Search posts..."
                startContent={
                  <Icon
                    className="text-default-400"
                    icon="solar:magnifer-linear"
                    width={16}
                  />
                }
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <Select
                className="max-w-xs"
                placeholder="Platform"
                selectedKeys={[platformFilter]}
                size="sm"
                variant="bordered"
                onSelectionChange={(keys) => setPlatformFilter(Array.from(keys)[0] as string)}
              >
                {platformTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                className="max-w-xs"
                placeholder="Status"
                selectedKeys={[statusFilter]}
                size="sm"
                variant="bordered"
                onSelectionChange={(keys) => setStatusFilter(Array.from(keys)[0] as string)}
              >
                {postStatuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  endContent={<Icon icon="solar:alt-arrow-down-linear" width={16} />}
                  variant="flat"
                >
                  Sort
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Sort posts"
                selectedKeys={[sortBy]}
                selectionMode="single"
                onSelectionChange={(keys) => setSortBy(Array.from(keys)[0] as string)}
              >
                <DropdownItem key="date">Date</DropdownItem>
                <DropdownItem key="reach">Reach</DropdownItem>
                <DropdownItem key="engagement">Engagement</DropdownItem>
                <DropdownItem key="orders">Orders</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          <PostStats posts={filteredPosts} />
          <PostTable posts={filteredPosts} onEdit={handleEditPost} />
        </div>
      </div>

      <AddPostModal isOpen={isOpen} onClose={onClose} />
      <EditPostPanel postId={selectedPost} onClose={handleCloseEdit} />
    </div>
  );
}