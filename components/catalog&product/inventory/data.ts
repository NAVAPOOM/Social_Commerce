export interface InventoryStats {
  totalItems: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  monthlyTrend: {
    month: string;
    stockValue: number;
    itemCount: number;
  }[];
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  description: string;
  price: number;
  stockLevel: number;
  reorderPoint: number;
  location: string;
  lastUpdated: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  variations?: {
    id: string;
    attributes: Record<string, string>;
    sku: string;
    stockLevel: number;
    price: number;
  }[];
  image?: string;
}

export const inventoryData: InventoryItem[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    sku: 'WH-001',
    category: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    stockLevel: 45,
    reorderPoint: 20,
    location: 'Warehouse A',
    lastUpdated: '2024-03-15T10:00:00',
    status: 'in_stock',
    variations: [
      {
        id: '1-1',
        attributes: { color: 'Black' },
        sku: 'WH-001-BLK',
        stockLevel: 25,
        price: 199.99,
      },
      {
        id: '1-2',
        attributes: { color: 'White' },
        sku: 'WH-001-WHT',
        stockLevel: 20,
        price: 199.99,
      },
    ],
    image: 'https://example.com/headphones.jpg',
  },
  // Add more mock data as needed
];

export const aggregatedStats: InventoryStats = {
  totalItems: 1500,
  totalValue: 275000,
  lowStockItems: 45,
  outOfStockItems: 12,
  monthlyTrend: [
    { month: 'Jan', stockValue: 250000, itemCount: 1400 },
    { month: 'Feb', stockValue: 260000, itemCount: 1450 },
    { month: 'Mar', stockValue: 275000, itemCount: 1500 },
    { month: 'Apr', stockValue: 285000, itemCount: 1550 },
    { month: 'May', stockValue: 290000, itemCount: 1600 },
    { month: 'Jun', stockValue: 275000, itemCount: 1500 },
  ],
};