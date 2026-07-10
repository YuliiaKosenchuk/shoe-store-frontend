import { z } from "zod";

export type DeliveryType =
  | "COURIER"
  | "PARCEL_LOCKER"
  | "PICKUP_POINT"
  | "PERSONAL_PICKUP";

export type PaymentType = "CARD" | "BLIK" | "BANK_TRANSFER" | "CASH_ON_DELIVERY";

export type OrderStatus = "PAID" | "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface OrderItemDto {
  id: number;
  name: string;
  imageUrl: string;
  color: string;
  size: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface OrderResponseDto {
  orderId: number;
  status: OrderStatus;
  totalAmound: number;
  discountAmount: number;
  finalAmount: number;
  customerFirstName: string;
  customerLastName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  recipientName: string;
  recipientPhone: string;
  deliveryType: DeliveryType;
  paymentType: PaymentType;
  createdAt: string;
  orderItems: OrderItemDto[];
}

export interface CreateOrderRequestDto {
  cartId: number;
  customerFirstName: string;
  customerLastName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  recipientName: string;
  recipientPhone: string;
  deliveryType: DeliveryType;
  paymentType: PaymentType;
  ignoreOutOfStockItems?: boolean;
  discountCode?: string;
}

export interface CreatePaymentRequestDto {
  orderId: number;
}

export interface PaymentDto {
  sessionUrl: string;
}

export const deliveryDetailsSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  country: z.string().trim().min(1, "Country is required"),
  city: z.string().trim().min(1, "City is required"),
  address: z.string().trim().min(1, "Address is required"),
  houseNumber: z.string().trim().min(1, "House number is required"),
  postalCode: z.string().trim().min(1, "Postal code is required"),
  phone: z.string().trim().min(1, "Phone number is required"),
});

export type DeliveryDetailsFormValues = z.infer<typeof deliveryDetailsSchema>;

export type ShippingMethod = "DHL" | "DPD" | "STORE_PICKUP";

export interface ServicePoint {
  id: number;
  name: string;
  carrierCode: string;
  carrierName: string;
  carrierLogoUrl: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  countryCode: string;
  distance: number | null;
  generalShopType: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
}

export interface ShippingSelection {
  method: ShippingMethod;
  servicePoint: ServicePoint | null;
  store: StoreLocation | null;
}

export const paymentTypeOptions: { value: PaymentType; label: string }[] = [
  { value: "CARD", label: "Card" },
  { value: "BLIK", label: "BLIK" },
  { value: "BANK_TRANSFER", label: "Bank transfer" },
  { value: "CASH_ON_DELIVERY", label: "Cash on delivery" },
];
