import { create } from "zustand";
import type {
  DeliveryDetailsFormValues,
  OrderResponseDto,
  ShippingSelection,
} from "@/shemas/checkout.shema";

interface CheckoutState {
  deliveryDetails: DeliveryDetailsFormValues | null;
  setDeliveryDetails: (values: DeliveryDetailsFormValues) => void;
  shipping: ShippingSelection | null;
  setShipping: (shipping: ShippingSelection | null) => void;
  lastOrder: OrderResponseDto | null;
  setLastOrder: (order: OrderResponseDto) => void;
  discountCode: string | null;
  discountPercent: number | null;
  setDiscount: (code: string, percent: number) => void;
  clearDiscount: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  deliveryDetails: null,
  setDeliveryDetails: (values) => set({ deliveryDetails: values }),

  shipping: null,
  setShipping: (shipping) => set({ shipping }),

  lastOrder: null,
  setLastOrder: (order) => set({ lastOrder: order }),

  discountCode: null,
  discountPercent: null,
  setDiscount: (code, percent) => set({ discountCode: code, discountPercent: percent }),
  clearDiscount: () => set({ discountCode: null, discountPercent: null }),
}));
