export interface ProductStats {
  totalSales: number;
  revenue: number;
  growth: number;
  averageRating: number;
  reviewCount: number;
  stockLevel: number;
  monthlyTrend: {
    sales: number;
    revenue: number;
  }[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  rank: number;
  stats: ProductStats;
  variants?: {
    name: string;
    sku: string;
    stock: number;
  }[];
  tags: string[];
}

export const productData: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    category: 'electronics',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    image: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/headphones.jpg',
    rank: 1,
    stats: {
      totalSales: 1250,
      revenue: 249875,
      growth: 15.5,
      averageRating: 4.8,
      reviewCount: 450,
      stockLevel: 85,
      monthlyTrend: [
        { sales: 380, revenue: 75962 },
        { sales: 420, revenue: 83958 },
        { sales: 450, revenue: 89955 },
      ],
    },
    variants: [
      { name: 'Black', sku: 'HP-BLK-001', stock: 45 },
      { name: 'White', sku: 'HP-WHT-001', stock: 40 },
    ],
    tags: ['electronics', 'audio', 'wireless'],
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    category: 'electronics',
    description: 'Advanced fitness tracking with heart rate monitoring',
    price: 149.99,
    image: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/smartwatch.jpg',
    rank: 2,
    stats: {
      totalSales: 980,
      revenue: 146990,
      growth: 12.8,
      averageRating: 4.6,
      reviewCount: 320,
      stockLevel: 65,
      monthlyTrend: [
        { sales: 290, revenue: 43497 },
        { sales: 320, revenue: 47997 },
        { sales: 370, revenue: 55496 },
      ],
    },
    variants: [
      { name: 'Black', sku: 'SW-BLK-001', stock: 35 },
      { name: 'Silver', sku: 'SW-SLV-001', stock: 30 },
    ],
    tags: ['electronics', 'fitness', 'wearable'],
  },
  // Add more mock data as needed
];

export const monthlyStats = [
  { month: 'Jan', sales: 850, revenue: 127500 },
  { month: 'Feb', sales: 920, revenue: 138000 },
  { month: 'Mar', sales: 880, revenue: 132000 },
  { month: 'Apr', sales: 950, revenue: 142500 },
  { month: 'May', sales: 1100, revenue: 165000 },
  { month: 'Jun', sales: 1050, revenue: 157500 },
];