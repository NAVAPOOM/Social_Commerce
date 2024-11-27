// สำหรับรูปภาพสินค้า
export interface ProductImage {
  src: string;
}

export interface VariableType {
  name: string;
  value: string;
}
// สำหรับ SKU ของสินค้า
export interface ProductSKU {
  productCode: string;
  price: number;
  image: string;
  variableTypes: string[]; // [name, value] ex.[name:ขนาดบรรจุ, value: 12x1,000 ml., 1000 ml. ]
  weight?: number;
  dimension?: [number, number, number]; // [length, width, height]
}

// สำหรับคุณสมบัติของหมวดหมู่
export interface CategoryProperty {
  name: string;
  value: string;
}

// สำหรับความแตกต่างของหมวดหมู่
export interface CategoryVariation {
  name: string;
}

// สำหรับหมวดหมู่สินค้า
export interface ProductCategory {
  name: string;
  description: string;
  image: string;
  isFree: boolean;
  isActive: boolean;
  properties: CategoryProperty[];
  variations: CategoryVariation[];
}

// สำหรับสินค้าหลัก
export interface Product {
  createdAt: string;
  updatedAt: string;
  projectId: number;
  name: string;
  brand: string;
  productCode: string;
  description: string;
  images: ProductImage[];
  deleted: boolean;
  unit?: string;
  weight?: number;
  dimension?: [number, number, number];
  productSKUs: ProductSKU[];
  categories: ProductCategory[];
  defaultPrice?: number;
}

// สำหรับการอัปเดตสินค้า
export interface ProductUpdatePayload {
  name?: string;
  brand?: string;
  description?: string;
  productCode?: string;
  defaultPrice?: number;
  unit?: string;
  weight?: number;
  dimension?: [number, number, number];
}

// สำหรับข้อมูลสินค้าคงคลัง
export interface ProductInventory {
  inventory: number;
  reserved: number;
  productCode?: string; // สำหรับการดึงข้อมูลหลายรายการ
}

// สำหรับการอัปเดตสินค้าคงคลัง
export interface InventoryUpdatePayload {
  inventory: number;
  productCode: string;
  action?: 'ADD' | 'REPLACE';
}

// สำหรับการตอบกลับเมื่อเกิดข้อผิดพลาดในการอัปเดตสินค้าคงคลัง
export interface InventoryErrorResponse {
  currentAmount: number;
  productCode: string;
  reservedAmount: number;
  message: string;
}

// สำหรับการตอบกลับเมื่อดึงข้อมูลสินค้าทั้งหมด
export interface ProductListResponse {
  data: Product[];
  total: number;
}

// สำหรับพารามิเตอร์ในการดึงข้อมูลสินค้า
export interface ProductListParams {
  page: number;
  pageSize: number;
}