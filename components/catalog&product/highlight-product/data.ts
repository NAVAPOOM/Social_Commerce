export interface ProductStats {
    views: number;
    clicks: number;
    conversions: number;
    revenue: number;
    growth: number;
  }
  
  export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    collection: string;
    price: number;
    image: string;
    isNew: boolean;
    isPopular: boolean;
    colors?: {
      name: string;
      hex: string;
    }[];
    stats: ProductStats;
    startDate?: string;
    endDate?: string;
    priority: number;
  }
  
  export const highlightData: Product[] = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      category: 'electronics',
      collection: 'best_sellers',
      price: 199.99,
      image: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/headphones.jpg',
      isNew: true,
      isPopular: true,
      colors: [
        { name: 'Black', hex: '#000000' },
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Silver', hex: '#C0C0C0' },
      ],
      stats: {
        views: 15000,
        clicks: 2250,
        conversions: 450,
        revenue: 89955,
        growth: 15.5,
      },
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      priority: 1,
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      description: 'Advanced fitness tracking with heart rate monitoring',
      category: 'electronics',
      collection: 'new_arrivals',
      price: 149.99,
      image: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/smartwatch.jpg',
      isNew: true,
      isPopular: false,
      colors: [
        { name: 'Black', hex: '#000000' },
        { name: 'Blue', hex: '#0000FF' },
      ],
      stats: {
        views: 12000,
        clicks: 1800,
        conversions: 360,
        revenue: 53996,
        growth: 12.8,
      },
      startDate: '2024-03-15',
      endDate: '2024-04-15',
      priority: 2,
    },
    // Add more mock data as needed
  ];
  
  export const monthlyStats = [
    { month: 'Jan', views: 45000, clicks: 6750, conversions: 1350 },
    { month: 'Feb', views: 52000, clicks: 7800, conversions: 1560 },
    { month: 'Mar', views: 48000, clicks: 7200, conversions: 1440 },
    { month: 'Apr', views: 55000, clicks: 8250, conversions: 1650 },
    { month: 'May', views: 60000, clicks: 9000, conversions: 1800 },
    { month: 'Jun', views: 58000, clicks: 8700, conversions: 1740 },
  ];