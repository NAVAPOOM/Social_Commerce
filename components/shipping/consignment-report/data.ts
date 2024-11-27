export interface ConsignmentItem {
  id: string;
  productCode: string;
  productName: string;
  consignorId: string;
  consignorName: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
  receivedDate: string;
  status: 'active' | 'low_stock' | 'expired' | 'sold_out';
  turnoverRate: number;
  soldQuantity: number;
  remainingQuantity: number;
}

export interface ConsignmentStats {
  totalProducts: number;
  totalValue: number;
  totalSales: number;
  averageTurnover: number;
  monthlyTrend: {
    month: string;
    sales: number;
    products: number;
  }[];
}

export const consignmentData: ConsignmentItem[] = [
  {
    id: '1',
    productCode: 'CSG001',
    productName: 'Organic Coffee Beans',
    consignorId: 'CNS001',
    consignorName: 'Green Bean Co.',
    quantity: 500,
    unitPrice: 15.99,
    totalValue: 7995,
    receivedDate: '2024-02-15',
    status: 'active',
    turnoverRate: 0.85,
    soldQuantity: 425,
    remainingQuantity: 75,
  },
  {
    id: '2',
    productCode: 'CSG002',
    productName: 'Handmade Pottery Set',
    consignorId: 'CNS002',
    consignorName: 'Artisan Crafts',
    quantity: 100,
    unitPrice: 89.99,
    totalValue: 8999,
    receivedDate: '2024-02-10',
    status: 'low_stock',
    turnoverRate: 0.92,
    soldQuantity: 92,
    remainingQuantity: 8,
  },
  {
    id: '3',
    productCode: 'CSG003',
    productName: 'Vintage Vinyl Records',
    consignorId: 'CNS003',
    consignorName: 'Retro Music Store',
    quantity: 200,
    unitPrice: 24.99,
    totalValue: 4998,
    receivedDate: '2024-02-01',
    status: 'active',
    turnoverRate: 0.45,
    soldQuantity: 90,
    remainingQuantity: 110,
  },
  // Add more mock data as needed
];

export const aggregatedStats: ConsignmentStats = {
  totalProducts: 800,
  totalValue: 21992,
  totalSales: 15678,
  averageTurnover: 0.74,
  monthlyTrend: [
    { month: 'Jan', sales: 12500, products: 750 },
    { month: 'Feb', sales: 15000, products: 800 },
    { month: 'Mar', sales: 13750, products: 775 },
    { month: 'Apr', sales: 16250, products: 825 },
    { month: 'May', sales: 14500, products: 785 },
    { month: 'Jun', sales: 17500, products: 850 },
  ],
};