export interface LiveStats {
  reach: number;
  engagement: number;
  orders: number;
  revenue: number;
  commentsCount: number;
  responseRate: number;
  averageResponseTime: number;
  conversionRate: number;
}

export interface LiveItem {
  id: string;
  title: string;
  postId: string;
  status: 'scheduled' | 'live' | 'ended';
  scheduledFor: string;
  endedAt?: string;
  products: {
    total: number;
    catalogs: number;
    skus: number;
  };
  stats: LiveStats;
  settings: {
    autoResponse: boolean;
    includeImages: boolean;
    includeProducts: boolean;
    responseDelay: number;
  };
}

export const liveData: LiveItem[] = [
  {
    id: '1',
    title: 'Summer Collection Launch Live',
    postId: 'FB-123456789',
    status: 'live',
    scheduledFor: '2024-03-15T10:00:00',
    products: {
      total: 50,
      catalogs: 3,
      skus: 150,
    },
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
    title: 'New Season Preview',
    postId: 'FB-987654321',
    status: 'scheduled',
    scheduledFor: '2024-03-20T14:30:00',
    products: {
      total: 30,
      catalogs: 2,
      skus: 90,
    },
    stats: {
      reach: 0,
      engagement: 0,
      orders: 0,
      revenue: 0,
      commentsCount: 0,
      responseRate: 0,
      averageResponseTime: 0,
      conversionRate: 0,
    },
    settings: {
      autoResponse: true,
      includeImages: true,
      includeProducts: true,
      responseDelay: 30,
    },
  },
  // Add more mock data as needed
];

export const monthlyStats = [
  { month: 'Jan', lives: 45, reach: 75000, engagement: 12500, orders: 850 },
  { month: 'Feb', lives: 52, reach: 82000, engagement: 15800, orders: 920 },
  { month: 'Mar', lives: 48, reach: 79000, engagement: 14200, orders: 880 },
  { month: 'Apr', lives: 55, reach: 88000, engagement: 16900, orders: 950 },
  { month: 'May', lives: 60, reach: 95000, engagement: 18500, orders: 1100 },
  { month: 'Jun', lives: 58, reach: 92000, engagement: 17800, orders: 1050 },
];