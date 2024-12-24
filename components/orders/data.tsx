import { ChipProps } from "@nextui-org/react";

export const statusOptions = [
  {name: "Pending", uid: "pending"},
  {name: "Processing", uid: "processing"},
  {name: "Shipped", uid: "shipped"},
  {name: "Delivered", uid: "delivered"},
  {name: "Cancelled", uid: "cancelled"},
] as const;

export type StatusOptions = (typeof statusOptions)[number]["name"];

export const statusColorMap: Record<StatusOptions, ChipProps["color"]> = {
  Pending: "warning",
  Processing: "primary",
  Shipped: "secondary",
  Delivered: "success",
  Cancelled: "danger",
};

export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  customerName: string;
  orderDate: Date;
  status: StatusOptions;
  totalAmount: number;
  items: OrderItem[];
};

export type ColumnsKey =
  | "id"
  | "customerName"
  | "orderDate"
  | "status"
  | "totalAmount"
  | "items"
  | "actions";

export const INITIAL_VISIBLE_COLUMNS: ColumnsKey[] = [
  "id",
  "customerName",
  "orderDate",
  "status",
  "totalAmount",
  "items",
  "actions",
];

export const columns = [
  {name: "Order ID", uid: "id"},
  {name: "Customer Name", uid: "customerName", sortable: true},
  {name: "Order Date", uid: "orderDate", sortable: true},
  {name: "Status", uid: "status"},
  {name: "Total Amount", uid: "totalAmount", sortable: true},
  {name: "Items", uid: "items"},
  {name: "Actions", uid: "actions"},
];

const customerNames = [
  "Alice Johnson", "Bob Smith", "Charlie Brown", "David Wilson", "Eve Martinez",
  "Frank Thompson", "Grace Garcia", "Hannah Lee", "Isaac Anderson", "Julia Roberts",
  "Kevin Lewis", "Laura Miller", "Michael Davis", "Nancy Taylor", "Oliver White",
  "Patricia Moore", "Quentin Harris", "Rachel Clark", "Samuel Walker", "Tina Turner"
];

const productNames = [
  "Laptop", "Smartphone", "Tablet", "Headphones", "Smartwatch",
  "Camera", "Printer", "Monitor", "Keyboard", "Mouse",
  "External Hard Drive", "USB Flash Drive", "Router", "Gaming Console", "Fitness Tracker",
  "Bluetooth Speaker", "Wireless Earbuds", "Power Bank", "Smart Home Hub", "Drone"
];

const generateMockOrderData = (count: number): Order[] => {
  const mockData: Order[] = [];

  for (let i = 0; i < count; i++) {
    const itemCount = Math.floor(Math.random() * 5) + 1;
    const items: OrderItem[] = [];
    let totalAmount = 0;

    for (let j = 0; j < itemCount; j++) {
      const price = Math.floor(Math.random() * 500) + 50;
      const quantity = Math.floor(Math.random() * 3) + 1;
      items.push({
        id: `ITEM-${i}-${j}`,
        name: productNames[Math.floor(Math.random() * productNames.length)],
        quantity: quantity,
        price: price
      });
      totalAmount += price * quantity;
    }

    const order: Order = {
      id: `ORD-${1000 + i}`,
      customerName: customerNames[Math.floor(Math.random() * customerNames.length)],
      orderDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      status: statusOptions[Math.floor(Math.random() * statusOptions.length)].name,
      totalAmount: totalAmount,
      items: items
    };

    mockData.push(order);
  }

  return mockData;
};

export const orders: Order[] = generateMockOrderData(100);