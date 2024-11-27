export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
}

export interface BranchStats {
  totalOrders: number;
  totalRevenue: number;
  averageRating: number;
  employeeCount: number;
  monthlyGrowth: number;
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  type: 'main' | 'sub' | 'warehouse';
  status: 'active' | 'inactive' | 'maintenance';
  address: {
    street: string;
    district: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone: string;
    email: string;
    manager: string;
  };
  businessHours: BusinessHours[];
  stats: BranchStats;
  image?: string;
}

export const branchData: Branch[] = [
  {
    id: '1',
    name: 'Main Branch Bangkok',
    code: 'BKK-001',
    type: 'main',
    status: 'active',
    address: {
      street: '123 Sukhumvit Road',
      district: 'Watthana',
      city: 'Bangkok',
      state: 'Bangkok',
      postalCode: '10110',
      country: 'Thailand',
      coordinates: {
        lat: 13.7563,
        lng: 100.5018,
      },
    },
    contact: {
      phone: '+66 2 123 4567',
      email: 'bkk.main@example.com',
      manager: 'John Smith',
    },
    businessHours: [
      { day: 'Monday', open: '09:00', close: '21:00', isOpen: true },
      { day: 'Tuesday', open: '09:00', close: '21:00', isOpen: true },
      { day: 'Wednesday', open: '09:00', close: '21:00', isOpen: true },
      { day: 'Thursday', open: '09:00', close: '21:00', isOpen: true },
      { day: 'Friday', open: '09:00', close: '22:00', isOpen: true },
      { day: 'Saturday', open: '10:00', close: '22:00', isOpen: true },
      { day: 'Sunday', open: '10:00', close: '21:00', isOpen: true },
    ],
    stats: {
      totalOrders: 15234,
      totalRevenue: 892450,
      averageRating: 4.8,
      employeeCount: 45,
      monthlyGrowth: 12.5,
    },
    image: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/store/store-1.jpg',
  },
  {
    id: '2',
    name: 'Chiang Mai Branch',
    code: 'CNX-001',
    type: 'sub',
    status: 'active',
    address: {
      street: '456 Nimmanhaemin Road',
      district: 'Suthep',
      city: 'Chiang Mai',
      state: 'Chiang Mai',
      postalCode: '50200',
      country: 'Thailand',
      coordinates: {
        lat: 18.7883,
        lng: 98.9853,
      },
    },
    contact: {
      phone: '+66 5 234 5678',
      email: 'cnx.branch@example.com',
      manager: 'Jane Doe',
    },
    businessHours: [
      { day: 'Monday', open: '09:00', close: '20:00', isOpen: true },
      { day: 'Tuesday', open: '09:00', close: '20:00', isOpen: true },
      { day: 'Wednesday', open: '09:00', close: '20:00', isOpen: true },
      { day: 'Thursday', open: '09:00', close: '20:00', isOpen: true },
      { day: 'Friday', open: '09:00', close: '21:00', isOpen: true },
      { day: 'Saturday', open: '10:00', close: '21:00', isOpen: true },
      { day: 'Sunday', open: '10:00', close: '20:00', isOpen: true },
    ],
    stats: {
      totalOrders: 8765,
      totalRevenue: 456780,
      averageRating: 4.6,
      employeeCount: 25,
      monthlyGrowth: 8.3,
    },
    image: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/store/store-2.jpg',
  },
  {
    id: '3',
    name: 'Phuket Branch',
    code: 'HKT-001',
    type: 'sub',
    status: 'maintenance',
    address: {
      street: '789 Thawewong Road',
      district: 'Patong',
      city: 'Phuket',
      state: 'Phuket',
      postalCode: '83150',
      country: 'Thailand',
      coordinates: {
        lat: 7.8965,
        lng: 98.3039,
      },
    },
    contact: {
      phone: '+66 7 345 6789',
      email: 'hkt.branch@example.com',
      manager: 'David Wilson',
    },
    businessHours: [
      { day: 'Monday', open: '10:00', close: '22:00', isOpen: true },
      { day: 'Tuesday', open: '10:00', close: '22:00', isOpen: true },
      { day: 'Wednesday', open: '10:00', close: '22:00', isOpen: true },
      { day: 'Thursday', open: '10:00', close: '22:00', isOpen: true },
      { day: 'Friday', open: '10:00', close: '23:00', isOpen: true },
      { day: 'Saturday', open: '10:00', close: '23:00', isOpen: true },
      { day: 'Sunday', open: '10:00', close: '22:00', isOpen: true },
    ],
    stats: {
      totalOrders: 6543,
      totalRevenue: 345670,
      averageRating: 4.5,
      employeeCount: 20,
      monthlyGrowth: -2.1,
    },
    image: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/store/store-3.jpg',
  },
  {
    id: '4',
    name: 'Bangkok Warehouse',
    code: 'BKK-WH1',
    type: 'warehouse',
    status: 'active',
    address: {
      street: '321 Bangna-Trad Road',
      district: 'Bangna',
      city: 'Bangkok',
      state: 'Bangkok',
      postalCode: '10260',
      country: 'Thailand',
      coordinates: {
        lat: 13.6688,
        lng: 100.6418,
      },
    },
    contact: {
      phone: '+66 2 456 7890',
      email: 'bkk.warehouse@example.com',
      manager: 'Sarah Johnson',
    },
    businessHours: [
      { day: 'Monday', open: '08:00', close: '17:00', isOpen: true },
      { day: 'Tuesday', open: '08:00', close: '17:00', isOpen: true },
      { day: 'Wednesday', open: '08:00', close: '17:00', isOpen: true },
      { day: 'Thursday', open: '08:00', close: '17:00', isOpen: true },
      { day: 'Friday', open: '08:00', close: '17:00', isOpen: true },
      { day: 'Saturday', open: '09:00', close: '15:00', isOpen: true },
      { day: 'Sunday', open: '00:00', close: '00:00', isOpen: false },
    ],
    stats: {
      totalOrders: 4321,
      totalRevenue: 234560,
      averageRating: 4.2,
      employeeCount: 15,
      monthlyGrowth: 5.7,
    },
    image: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/store/warehouse-1.jpg',
  },
];