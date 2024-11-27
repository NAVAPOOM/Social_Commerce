// types/orders/types.ts

export enum OrderState {
  NEW_ORDER = "NEW ORDER",
  PENDING_FOR_SHIPPING_COST = "PENDING_FOR_SHIPPING_COST",
  READY_TO_APPROVE = "READY TO APPROVE",
  READY_TO_SHIP = "READY TO SHIP",
  COMPLETED = "COMPLETED",
  REFUNDED = "REFUNDED",
  CANCELLED = "CANCELLED",
  VOIDED = "VOIDED",
  ABANDONED = "ABANDONED",
}

export enum OrderPlatform {
  FACEBOOK = "FACEBOOK",
  LINE = "LINE",
  OFFLINE = "OFFLINE"
}

export enum PaymentMethodType {
  BANK_QRCODE = "BANK_QR_CODE",
  BANK_TRANSFER = "BANK_TRANSFER",
  BILLPAYMENT_CENPAY = "BILL_PAYMENT_CEN_PAY",
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
  CHILL_PAY_OTHER_METHOD = "CHILL_PAY_OTHER_METHOD",
  CREDITCARD_KBANK = "CREDIT_CARD_K_BANK",
  ONCONVO_PAY = "1convo_PAY",
  EPAYMENT_ALIPAY = "ELECTRONIC_PAYMENT_ALI_PAY",
  EPAYMENT_BLUEPAY = "ELECTRONIC_PAYMENT_BLUE_PAY",
  EPAYMENT_LINEPAY = "ELECTRONIC_PAYMENT_LINE_PAY",
  EPAYMENT_WECHAT_PAY = "ELECTRONIC_PAYMENT_WE_CHAT_PAY",
  INSTALLMENT_KBANK = "INSTALLMENT_K_BANK",
  INSTALLMENT_TBANK = "INSTALLMENT_T_BANK",
  INTERNETBANK_BAY = "INTERNET_BANKING_BAY",
  INTERNETBANK_BBL = "INTERNET_BANKING_BBL",
  INTERNETBANK_KTB = "INTERNET_BANKING_KTB",
  INTERNETBANK_SCB = "INTERNET_BANKING_SCB",
  INTERNETBANK_TBANK = "INTERNET_BANKING_T_BANK",
  PAYPLUS_KBANK = "PAY_PLUS_K_BANK",
  PROMPT_PAY = "PROMPT_PAY"
}

export type VatOptions = "INCLUDED" | "EXCLUDED";

export interface Order {
  customerId: string;
  createdAt: string;
  updatedAt: string;
  shippedAt?: string;
  receiverName: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  streetAddress2?: string;
  district: string;
  subDistrict: string;
  province: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  orderNumber: string;
  paymentMethodType: PaymentMethodType;
  platform: OrderPlatform;
  state: OrderState;
  note?: string;
  grandTotal: number;
  totalPrice: number;
  shippingPrice: number;
  vatPrice: number;
  vatValue: number;
  vatOptions: VatOptions;
  discountTotalPrice: number;
  totalProductDiscount: number;
  items: OrderItem[];
  shippedDetail?: ShippedDetail;
  refCode?: string;
  receiptNo?: string;
  totalWeight?: number;
  largestDimension?: string;
  shippingDescription?: string;
  attachments?: Attachment[];
}

export interface OrderItem {
  productCode: string;
  price: number;
  amount: number;
  digitalContents?: DigitalContent[];
}

export interface DigitalContent {
  content: string;
  refId: string;
}

export interface ShippedDetail {
  detail: ShippedDetailItem[];
}

export interface ShippedDetailItem {
  carrierName: string;
  deliveryDate: string;
  trackingNumber: string;
  otherCarrierName?: string;
}

export interface Attachment {
  id: string;
  type: string;
}