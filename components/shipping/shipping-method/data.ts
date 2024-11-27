export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  type: 'online' | 'offline';
  icon: string;
  price: number;
  deliveryTime: string;
  isActive: boolean;
  infographic?: string; // Add infographic URL
  stats?: {
    ordersCount: number;
    revenue: number;
    growth: number;
  };
}

export const shippingMethods: ShippingMethod[] = [
  {
    id: '1',
    name: 'Standard Delivery',
    description: 'Delivery within 3-5 business days',
    type: 'online',
    icon: 'solar:truck-bold',
    price: 5.99,
    deliveryTime: '3-5 days',
    isActive: true,
    infographic: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shipping/standard-delivery.png',
    stats: {
      ordersCount: 1250,
      revenue: 7487.50,
      growth: 12.5,
    },
  },
  {
    id: '2',
    name: 'Express Delivery',
    description: 'Next day delivery service',
    type: 'online',
    icon: 'solar:rocket-bold',
    price: 12.99,
    deliveryTime: '1 day',
    isActive: true,
    infographic: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shipping/express-delivery.png',
    stats: {
      ordersCount: 850,
      revenue: 11041.50,
      growth: 8.3,
    },
  },
  {
    id: '3',
    name: 'Store Pickup',
    description: 'Collect from your nearest store',
    type: 'offline',
    icon: 'solar:shop-bold',
    price: 0,
    deliveryTime: 'Same day',
    isActive: true,
    infographic: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shipping/store-pickup.png',
    stats: {
      ordersCount: 450,
      revenue: 0,
      growth: 15.7,
    },
  },
  {
    id: '4',
    name: 'International Shipping',
    description: 'Worldwide delivery service',
    type: 'online',
    icon: 'solar:globe-bold',
    price: 25.99,
    deliveryTime: '7-14 days',
    isActive: false,
    infographic: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shipping/international-shipping.png',
    stats: {
      ordersCount: 320,
      revenue: 8316.80,
      growth: -2.1,
    },
  },
  {
    id: '5',
    name: 'Locker Pickup',
    description: 'Collect from a secure locker',
    type: 'offline',
    icon: 'solar:box-bold',
    price: 3.99,
    deliveryTime: '1-2 days',
    isActive: true,
    infographic: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shipping/locker-pickup.png',
    stats: {
      ordersCount: 580,
      revenue: 2314.20,
      growth: 5.9,
    },
  },
];