"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { OrderService } from "@/servises/order.service";
import {
  DeliveryType,
  PaymentType,
  deliveryTypeOptions,
  paymentTypeOptions,
} from "@/shemas/checkout.shema";
import { useCheckoutStore } from "@/store/checkout.store";
import { useCart } from "@/hooks/useCart";
import { useCartStore } from "@/store/cart.store";
import { Container } from "@/components/ui/Container";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { OrderSummaryPanel } from "@/components/checkout/OrderSummaryPanel";

export default function PaymentPage() {
  const router = useRouter();
  const deliveryDetails = useCheckoutStore((s) => s.deliveryDetails);
  const setLastOrder = useCheckoutStore((s) => s.setLastOrder);
  const { cartId } = useCart();
  const clearCartId = useCartStore((s) => s.clearCartId);

  const [deliveryType, setDeliveryType] = useState<DeliveryType>("COURIER");
  const [paymentType, setPaymentType] = useState<PaymentType>("CARD");

  useEffect(() => {
    if (!deliveryDetails) {
      router.replace("/checkout/delivery");
    }
  }, [deliveryDetails, router]);

  const placeOrder = useMutation({
    mutationFn: () => {
      if (!deliveryDetails || !cartId) {
        throw new Error("Missing delivery details or cart");
      }
      const recipientName = `${deliveryDetails.firstName} ${deliveryDetails.lastName}`.trim();
      const deliveryAddress = `${deliveryDetails.address}, ${deliveryDetails.houseNumber}, ${deliveryDetails.city}, ${deliveryDetails.country}`;
      return OrderService.createOrder({
        cartId,
        customerFirstName: deliveryDetails.firstName,
        customerLastName: deliveryDetails.lastName,
        customerPhone: deliveryDetails.phone,
        customerEmail: deliveryDetails.email,
        deliveryAddress,
        recipientName,
        recipientPhone: deliveryDetails.phone,
        deliveryType,
        paymentType,
        ignoreOutOfStockItems: false,
      });
    },
    onSuccess: (order) => {
      console.log(
        "[Order] createOrder success, orderId:",
        order.orderId,
        "status:",
        order.status
      );
      setLastOrder(order);
      clearCartId();
      router.push("/checkout/complete");
    },
    onError: (error) => {
      console.error("[Order] createOrder failed:", error);
    },
  });

  if (!deliveryDetails) return null;

  return (
    <main>
      <Container className="px-4 lg:px-8 py-6 lg:py-10">
        <CheckoutStepper activeStep={3} />

        <h1 className="mb-10 font-(family-name:--font-cormorant-garamond) text-4xl font-light tracking-widest uppercase text-black">
          Payment
        </h1>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <fieldset>
              <legend className="mb-3 font-(family-name:--font-jost) text-[13px] tracking-widest uppercase text-[#343434]">
                Delivery method
              </legend>
              <div className="space-y-2">
                {deliveryTypeOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-center gap-3 border px-4 py-3 font-(family-name:--font-jost) text-sm transition-colors ${
                      deliveryType === opt.value
                        ? "border-black text-black"
                        : "border-gray-300 text-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryType"
                      checked={deliveryType === opt.value}
                      onChange={() => setDeliveryType(opt.value)}
                      className="accent-black"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 font-(family-name:--font-jost) text-[13px] tracking-widest uppercase text-[#343434]">
                Payment method
              </legend>
              <div className="space-y-2">
                {paymentTypeOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-center gap-3 border px-4 py-3 font-(family-name:--font-jost) text-sm transition-colors ${
                      paymentType === opt.value
                        ? "border-black text-black"
                        : "border-gray-300 text-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentType"
                      checked={paymentType === opt.value}
                      onChange={() => setPaymentType(opt.value)}
                      className="accent-black"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {placeOrder.isError && (
              <p className="text-[14px] text-[#DF4441]">
                Something went wrong placing your order. Please try again.
              </p>
            )}

            <button
              onClick={() => placeOrder.mutate()}
              disabled={placeOrder.isPending || !cartId}
              className="w-full bg-black py-3.75 font-(family-name:--font-jost) text-sm font-medium tracking-widest uppercase text-white transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-black/30"
            >
              {placeOrder.isPending ? "Placing order…" : "Place Order"}
            </button>
          </div>

          <OrderSummaryPanel />
        </div>
      </Container>
    </main>
  );
}
