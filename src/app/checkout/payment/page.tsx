"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { OrderService } from "@/servises/order.service";
import { PaymentService } from "@/servises/payment.service";
import {
  DeliveryType,
  PaymentType,
  paymentTypeOptions,
} from "@/shemas/checkout.shema";
import { useCheckoutStore } from "@/store/checkout.store";
import { useCart } from "@/hooks/useCart";
import { useCartStore } from "@/store/cart.store";
import { saveOrderItemImages } from "@/lib/orderImageCache";
import { CheckoutContainer } from "@/components/ui/CheckoutContainer";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { OrderSummaryPanel } from "@/components/checkout/OrderSummaryPanel";

function PaymentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deliveryDetails = useCheckoutStore((s) => s.deliveryDetails);
  const shipping = useCheckoutStore((s) => s.shipping);
  const setLastOrder = useCheckoutStore((s) => s.setLastOrder);
  const { cart, cartId } = useCart();
  const clearCartId = useCartStore((s) => s.clearCartId);

  const [paymentType, setPaymentType] = useState<PaymentType>("CARD");

  const orderIdParam = searchParams.get("orderId");
  // Returning from a cancelled (or failed-to-start) Stripe Checkout session:
  // the browser did a full cross-origin round trip, so the non-persisted
  // checkout store is empty by now — orderId in the URL is the only way
  // to know an order already exists and just needs a new payment session.
  const [cancelledOrderId, setCancelledOrderId] = useState<number | null>(
    orderIdParam ? Number(orderIdParam) : null
  );

  useEffect(() => {
    if (cancelledOrderId === null && (!deliveryDetails || !shipping)) {
      router.replace("/checkout/delivery");
    }
  }, [cancelledOrderId, deliveryDetails, shipping, router]);

  const placeOrder = useMutation({
    mutationFn: () => {
      if (!deliveryDetails || !shipping || !cartId) {
        throw new Error("Missing delivery details, shipping method or cart");
      }
      const recipientName = `${deliveryDetails.firstName} ${deliveryDetails.lastName}`.trim();

      let deliveryType: DeliveryType;
      let deliveryAddress: string;
      if (shipping.method === "STORE_PICKUP") {
        deliveryType = "PERSONAL_PICKUP";
        deliveryAddress = `${shipping.store!.name} — ${shipping.store!.address}, ${shipping.store!.city}`;
      } else {
        const sp = shipping.servicePoint!;
        deliveryType = sp.generalShopType === "locker" ? "PARCEL_LOCKER" : "PICKUP_POINT";
        deliveryAddress = `${sp.carrierName} — ${sp.street} ${sp.houseNumber}, ${sp.postalCode} ${sp.city}`;
      }

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
    onSuccess: async (order) => {
      console.log(
        "[Order] createOrder success, orderId:",
        order.orderId,
        "status:",
        order.status
      );
      setLastOrder(order);
      if (cart?.cartItems) saveOrderItemImages(cart.cartItems);
      clearCartId();

      if (paymentType !== "CARD") {
        router.push("/checkout/complete");
        return;
      }

      try {
        const { sessionUrl } = await PaymentService.createPaymentSession({
          orderId: order.orderId,
        });
        window.location.href = sessionUrl;
      } catch (error) {
        console.error("[Payment] createPaymentSession failed:", error);
        setCancelledOrderId(order.orderId);
      }
    },
    onError: (error) => {
      console.error("[Order] createOrder failed:", error);
    },
  });

  const retryPayment = useMutation({
    mutationFn: () => {
      if (cancelledOrderId === null) {
        throw new Error("No order to retry payment for");
      }
      return PaymentService.createPaymentSession({ orderId: cancelledOrderId });
    },
    onSuccess: ({ sessionUrl }) => {
      window.location.href = sessionUrl;
    },
    onError: (error) => {
      console.error("[Payment] retry createPaymentSession failed:", error);
    },
  });

  if (cancelledOrderId === null && (!deliveryDetails || !shipping)) return null;

  return (
    <main>
      <CheckoutContainer className="px-4 py-6 sm:px-6 md:px-8 lg:px-8 lg:py-10">
        <CheckoutStepper activeStep={3} />

        {cancelledOrderId !== null ? (
          <div className="mx-auto max-w-157 py-6 text-center">
            <h1 className="mb-3 font-(family-name:--font-cormorant-garamond) text-2xl font-light tracking-widest uppercase text-black sm:text-3xl lg:text-4xl">
              Payment was not completed
            </h1>
            <p className="mb-10 font-(family-name:--font-jost) text-sm text-gray-500">
              Order #{cancelledOrderId} · your order is saved, you can try the payment again.
            </p>

            {retryPayment.isError && (
              <p className="mb-4 font-(family-name:--font-jost) text-[14px] text-[#DF4441]">
                Something went wrong starting payment. Please try again.
              </p>
            )}

            <button
              onClick={() => retryPayment.mutate()}
              disabled={retryPayment.isPending}
              className="w-full bg-black py-3.75 font-(family-name:--font-jost) text-sm font-medium tracking-widest uppercase text-white transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-black/30"
            >
              {retryPayment.isPending ? "Starting payment…" : "Try payment again"}
            </button>

            <Link
              href="/"
              className="mt-10 inline-block font-(family-name:--font-jost) text-sm font-light tracking-widest uppercase underline underline-offset-4 text-[#7A2633] hover:opacity-70 transition-opacity"
            >
              Back to home
            </Link>
          </div>
        ) : (
          <>
            <h1 className="mb-6 font-(family-name:--font-cormorant-garamond) text-2xl font-light tracking-widest uppercase text-black sm:text-3xl lg:mb-10 lg:text-4xl">
              Payment
            </h1>

            <div className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-[519px_410px] lg:justify-between">
              <div className="space-y-8">
                <div>
                  <p className="mb-1 font-(family-name:--font-jost) text-[13px] tracking-widest uppercase text-[#343434]">
                    Shipping to
                  </p>
                  <p className="font-(family-name:--font-jost) text-sm text-black">
                    {shipping!.method === "STORE_PICKUP"
                      ? `${shipping!.store!.name} — ${shipping!.store!.address}, ${shipping!.store!.city}`
                      : `${shipping!.servicePoint!.carrierName} — ${shipping!.servicePoint!.street} ${shipping!.servicePoint!.houseNumber}, ${shipping!.servicePoint!.postalCode} ${shipping!.servicePoint!.city}`}
                  </p>
                </div>

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
          </>
        )}
      </CheckoutContainer>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={null}>
      <PaymentPageContent />
    </Suspense>
  );
}
