export interface PostStats {
  reach: number;
  engagement: number;
  orders: number;
  revenue: number;
  commentsCount: number;
  responseRate: number;
  averageResponseTime: number;
  conversionRate: number;
}

export interface Post {
  id: string;
  title: string;
  postId: string;
  platform: 'facebook' | 'instagram_post' | 'instagram_story';
  status: 'active' | 'inactive' | 'paused';
  createdAt: string;
  responseType: 'all' | 'keywords';
  keywords?: string[];
  responseMessage: string;
  stats: PostStats;
  settings: {
    autoResponse: boolean;
    includeImages: boolean;
    includeProducts: boolean;
    responseDelay: number;
  };
}

export const postData: Post[] = [
  {
    id: '1',
    title: 'Summer Collection Launch',
    postId: 'FB-123456789',
    platform: 'facebook',
    status: 'active',
    createdAt: '2024-03-15T10:00:00',
    responseType: 'all',
    responseMessage: 'Thank you for your interest! 🌟 Check out our complete collection here: [link]',
    stats: {
      reach: 15000,
      engagement: 2250,
      orders: 450,
      revenue: 22500,
      commentsCount: 320,
      responseRate: 98.5,
      averageResponseTime: 30,
      conversionRate: 15.2,
    },
    settings: {
      autoResponse: true,
      includeImages: true,
      includeProducts: true,
      responseDelay: 60,
    },
  },
  {
    id: '2',
    title: 'New Product Showcase',
    postId: 'IG-987654321',
    platform: 'instagram_post',
    status: 'active',
    createdAt: '2024-03-14T15:30:00',
    responseType: 'keywords',
    keywords: ['price', 'available', 'shipping'],
    responseMessage: 'Hi! 👋 Thanks for your interest. DM us for more details!',
    stats: {
      reach: 12000,
      engagement: 1800,
      orders: 320,
      revenue: 16000,
      commentsCount: 250,
      responseRate: 95.8,
      averageResponseTime: 45,
      conversionRate: 12.8,
    },
    settings: {
      autoResponse: true,
      includeImages: true,
      includeProducts: false,
      responseDelay: 30,
    },
  },
  // Add more mock data as needed
];

export const monthlyStats = [
  { month: 'Jan', posts: 45, reach: 75000, engagement: 12500, orders: 850 },
  { month: 'Feb', posts: 52, reach: 82000, engagement: 15800, orders: 920 },
  { month: 'Mar', posts: 48, reach: 79000, engagement: 14200, orders: 880 },
  { month: 'Apr', posts: 55, reach: 88000, engagement: 16900, orders: 950 },
  { month: 'May', posts: 60, reach: 95000, engagement: 18500, orders: 1100 },
  { month: 'Jun', posts: 58, reach: 92000, engagement: 17800, orders: 1050 },
];