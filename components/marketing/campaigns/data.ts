export interface CampaignStats {
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  roi: number;
  growth: number;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  type: 'email' | 'social' | 'display' | 'search' | 'push';
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
  budget: number;
  spentBudget: number;
  target: {
    audience: string[];
    locations: string[];
    interests: string[];
  };
  channels: string[];
  stats: CampaignStats;
  image?: string;
  abTest?: {
    enabled: boolean;
    variants: {
      name: string;
      impressions: number;
      conversions: number;
    }[];
  };
}

export const campaignData: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sale 2024',
    description: 'Special discounts on summer collection',
    type: 'email',
    status: 'active',
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    budget: 5000,
    spentBudget: 2500,
    target: {
      audience: ['existing_customers', 'cart_abandoners'],
      locations: ['Bangkok', 'Chiang Mai'],
      interests: ['fashion', 'summer_wear'],
    },
    channels: ['email', 'push_notification', 'sms'],
    stats: {
      impressions: 15000,
      clicks: 2250,
      conversions: 450,
      revenue: 22500,
      roi: 9,
      growth: 15.5,
    },
    image: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/campaign/summer-sale.jpg',
    abTest: {
      enabled: true,
      variants: [
        { name: 'Variant A', impressions: 7500, conversions: 225 },
        { name: 'Variant B', impressions: 7500, conversions: 275 },
      ],
    },
  },
  // Add more campaign data...
];

export const campaignTypes = [
  { label: 'Email Campaign', value: 'email' },
  { label: 'Social Media', value: 'social' },
  { label: 'Display Ads', value: 'display' },
  { label: 'Search Ads', value: 'search' },
  { label: 'Push Notification', value: 'push' },
];

export const campaignStatuses = [
  { label: 'Draft', value: 'draft' },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'Active', value: 'active' },
  { label: 'Paused', value: 'paused' },
  { label: 'Completed', value: 'completed' },
];

export const audienceSegments = [
  { label: 'All Customers', value: 'all_customers' },
  { label: 'New Customers', value: 'new_customers' },
  { label: 'Existing Customers', value: 'existing_customers' },
  { label: 'VIP Customers', value: 'vip_customers' },
  { label: 'Cart Abandoners', value: 'cart_abandoners' },
  { label: 'Inactive Customers', value: 'inactive_customers' },
];

export const communicationChannels = [
  { label: 'Email', value: 'email' },
  { label: 'SMS', value: 'sms' },
  { label: 'Push Notification', value: 'push_notification' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Line', value: 'line' },
  { label: 'Instagram', value: 'instagram' },
];

export const monthlyStats = [
  { month: 'Jan', campaigns: 12, revenue: 45000, conversions: 1200 },
  { month: 'Feb', campaigns: 15, revenue: 52000, conversions: 1400 },
  { month: 'Mar', campaigns: 18, revenue: 63000, conversions: 1800 },
  { month: 'Apr', campaigns: 14, revenue: 48000, conversions: 1300 },
  { month: 'May', campaigns: 20, revenue: 75000, conversions: 2100 },
  { month: 'Jun', campaigns: 22, revenue: 82000, conversions: 2400 },
];