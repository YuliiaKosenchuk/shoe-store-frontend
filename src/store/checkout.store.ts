import { create } from "zustand";
import type { DeliveryDetailsFormValues, OrderResponseDto } from "@/shemas/checkout.shema";

interface CheckoutState {
  deliveryDetails: DeliveryDetailsFormValues | null;
  setDeliveryDetails: (values: DeliveryDetailsFormValues) => void;
  lastOrder: OrderResponseDto | null;
  setLastOrder: (order: OrderResponseDto) => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  deliveryDetails: null,
  setDeliveryDetails: (values) => set({ deliveryDetails: values }),

  lastOrder: null,
  setLastOrder: (order) => set({ lastOrder: order }),
}));
