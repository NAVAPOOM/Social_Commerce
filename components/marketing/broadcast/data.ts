export interface BroadcastStats {
  totalBroadcasts: number;
  totalReach: number;
  averageEngagement: number;
  successRate: number;
}

export interface BroadcastItem {
  id: string;
  title: string;
  platform: 'facebook' | 'line';
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  scheduledFor: string;
  audience: {
    type: string;
    count: number;
  };
  content: {
    type: 'text' | 'image' | 'video';
    preview: string;
  };
  stats: {
    reach: number;
    engagement: number;
    clicks: number;
  };
}

export const broadcastData: BroadcastItem[] = [
  {
    id: '1',
    title: 'Summer Sale Announcement',
    platform: 'facebook',
    status: 'sent',
    scheduledFor: '2024-03-15T10:00:00',
    audience: {
      type: 'All Followers',
      count: 15000,
    },
    content: {
      type: 'image',
      preview: 'https://example.com/summer-sale.jpg',
    },
    stats: {
      reach: 12500,
      engagement: 2800,
      clicks: 950,
    },
  },
  {
    id: '2',
    title: 'New Product Launch',
    platform: 'line',
    status: 'scheduled',
    scheduledFor: '2024-03-20T14:30:00',
    audience: {
      type: 'Premium Members',
      count: 5000,
    },
    content: {
      type: 'text',
      preview: 'Exciting new products arriving next week!',
    },
    stats: {
      reach: 0,
      engagement: 0,
      clicks: 0,
    },
  },
  // Add more mock data as needed
];

export const platformTypes = [
  { label: 'Facebook', value: 'facebook' },
  { label: 'LINE', value: 'line' },
];

export const audienceTypes = [
  { label: 'All Followers', value: 'all_followers' },
  { label: 'Premium Members', value: 'premium_members' },
  { label: 'New Subscribers', value: 'new_subscribers' },
  { label: 'Active Users', value: 'active_users' },
  { label: 'Custom Segment', value: 'custom_segment' },
];

export const contentTypes = [
  { label: 'Text Only', value: 'text' },
  { label: 'Image', value: 'image' },
  { label: 'Video', value: 'video' },
  { label: 'Carousel', value: 'carousel' },
];

export const monthlyStats = [
  { month: 'Jan', broadcasts: 45, reach: 75000, engagement: 12500 },
  { month: 'Feb', broadcasts: 52, reach: 82000, engagement: 15800 },
  { month: 'Mar', broadcasts: 48, reach: 79000, engagement: 14200 },
  { month: 'Apr', broadcasts: 55, reach: 88000, engagement: 16900 },
  { month: 'May', broadcasts: 60, reach: 95000, engagement: 18500 },
  { month: 'Jun', broadcasts: 58, reach: 92000, engagement: 17800 },
];