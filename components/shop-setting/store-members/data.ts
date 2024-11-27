export interface MemberStats {
  totalOrders: number;
  totalSpent: number;
  lastActive: string;
  loginCount: number;
  averageOrderValue: number;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'admin' | 'staff' | 'customer';
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  joinDate: string;
  stats: MemberStats;
  permissions: string[];
}

export const memberData: Member[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '+66 81 234 5678',
    role: 'admin',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=1',
    joinDate: '2024-01-15',
    stats: {
      totalOrders: 45,
      totalSpent: 15250,
      lastActive: '2024-03-15T10:30:00',
      loginCount: 128,
      averageOrderValue: 338.89,
    },
    permissions: ['manage_products', 'manage_orders', 'manage_members', 'manage_settings'],
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@example.com',
    phone: '+66 82 345 6789',
    role: 'staff',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=2',
    joinDate: '2024-02-01',
    stats: {
      totalOrders: 28,
      totalSpent: 8920,
      lastActive: '2024-03-14T15:45:00',
      loginCount: 85,
      averageOrderValue: 318.57,
    },
    permissions: ['manage_products', 'manage_orders'],
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'm.brown@example.com',
    phone: '+66 83 456 7890',
    role: 'customer',
    status: 'inactive',
    avatar: 'https://i.pravatar.cc/150?u=3',
    joinDate: '2024-02-15',
    stats: {
      totalOrders: 12,
      totalSpent: 4350,
      lastActive: '2024-03-01T09:20:00',
      loginCount: 25,
      averageOrderValue: 362.50,
    },
    permissions: [],
  },
  // Add more mock data as needed
];

export const rolePermissions = {
  admin: [
    'manage_products',
    'manage_orders',
    'manage_members',
    'manage_settings',
    'manage_finances',
    'view_analytics',
  ],
  staff: [
    'manage_products',
    'manage_orders',
    'view_analytics',
  ],
  customer: [],
};