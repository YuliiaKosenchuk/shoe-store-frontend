"use client";

import { Suspense, useEffect, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { OrderService } from "@/servises/order.service";
import { PaymentService } from "@/servises/payment.service";
import { DeliveryType, PaymentType } from "@/shemas/checkout.shema";
import { useCheckoutStore } from "@/store/checkout.store";
import { useCart } from "@/hooks/useCart";
import { useCartStore } from "@/store/cart.store";
import { useCartStockCheck } from "@/hooks/useCartStockCheck";
import { useCartItemsStock } from "@/hooks/useCartItemsStock";
import { isCartItemOutOfStock } from "@/lib/cartStock";
import { saveOrderItemImages } from "@/lib/orderImageCache";
import { CheckoutContainer } from "@/components/ui/CheckoutContainer";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { OrderSummaryPanel } from "@/components/checkout/OrderSummaryPanel";

const paymentIcons = [
  { src: "/images/klarna-icon.svg", alt: "Klarna", width: 47, height: 28 },
  { src: "/images/visa-icon.svg", alt: "Visa", width: 35, height: 28 },
  { src: "/images/mastercard-icon.svg", alt: "Mastercard", width: 35, height: 28 },
  { src: "/images/gpay-icon.jpg", alt: "Google Pay", width: 35, height: 28 },
  { src: "/images/paypal-icon.svg", alt: "PayPal", width: 35, height: 28 },
];

const paymentMethods: {
  value: PaymentType;
  label: ReactNode;
  description: string;
  extra: ReactNode;
}[] = [
  {
    value: "CARD",
    label: (
      <>
        Pay online by<Image src="/images/stripe.svg" alt="Stripe" width={29} height={24} className="relative top-px" />
      </>
    ),
    description:
      "Secure online payment via our trusted payment partner. You'll be redirected to a secure payment page after placing your order.",
    extra: (
      <div className="flex items-center gap-4">
        {paymentIcons.map((icon) => (
          <Image key={icon.alt} src={icon.src} alt={icon.alt} width={icon.width} height={icon.height} />
        ))}
      </div>
    ),
  },
  {
    value: "CASH_ON_DELIVERY",
    label: "Pay on pickup",
    description:
      "Pay when collecting your order at the selected pickup location. Payment can be made by cash or card.",
    extra: (
      <p className="flex items-center font-(family-name:--font-jost) text-sm text-[#343434] leading-normal font-medium">
        Cash
        <span className="mx-0.5 inline-flex size-6 items-center justify-center text-[#343434]">/</span>
        Card
      </p>
    ),
  },
];

function PaymentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deliveryDetails = useCheckoutStore((s) => s.deliveryDetails);
  const shipping = useCheckoutStore((s) => s.shipping);
  const setLastOrder = useCheckoutStore((s) => s.setLastOrder);
  const discountCode = useCheckoutStore((s) => s.discountCode);
  const { cart, cartId } = useCart();
  const clearCartId = useCartStore((s) => s.clearCartId);
  const { checkStock } = useCartStockCheck();
  const { stockByCartItemId, isLoading: isStockLoading } = useCartItemsStock(cart?.cartItems ?? []);
  const hasOutOfStockItem = (cart?.cartItems ?? []).some((item) =>
    isCartItemOutOfStock(stockByCartItemId.get(item.id), item.quantity, isStockLoading)
  );

  const [paymentType, setPaymentType] = useState<PaymentType>("CARD");
  const [isCheckingStock, setIsCheckingStock] = useState(false);

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
        discountCode: discountCode ?? undefined,
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
            <div className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-[519px_410px] lg:justify-between">
              <div className="space-y-4">
                <h1 className="font-(family-name:--font-cormorant-garamond) text-[36px] font-semibold text-black leading-[1.1]">
                  Payment
                </h1>

                {/* <div>
                  <p className="mb-2 font-(family-name:--font-jost) text-[14px] font-medium leading-normal text-[#343434]">
                    Shipping to
                  </p>
                  <p className="font-(family-name:--font-jost) text-sm text-black">
                    {shipping!.method === "STORE_PICKUP"
                      ? `${shipping!.store!.name} — ${shipping!.store!.address}, ${shipping!.store!.city}`
                      : `${shipping!.servicePoint!.carrierName} — ${shipping!.servicePoint!.street} ${shipping!.servicePoint!.houseNumber}, ${shipping!.servicePoint!.postalCode} ${shipping!.servicePoint!.city}`}
                  </p>
                </div> */}

                <fieldset>
                  <legend className="mb-8 font-(family-name:--font-jost) text-base font-normal leading-[1.3] text-black">
                    Choose your payment method
                  </legend>
                  <div className="divide-y divide-[#B3B3B3]">
                    {paymentMethods.map((opt) => (
                      <label
                        key={opt.value}
                        className="flex cursor-pointer flex-col gap-3 py-4"
                      >
                        <span className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentType"
                            checked={paymentType === opt.value}
                            onChange={() => setPaymentType(opt.value)}
                            className="size-4.5 shrink-0 appearance-none rounded-full border border-black checked:border-black checked:bg-black"
                          />
                          <span className="flex items-center gap-2 font-(family-name:--font-jost) text-base font-medium text-black">
                            {opt.label}
                          </span>
                        </span>
                        <p className="pl-7 font-(family-name:--font-jost) text-sm text-[#4E4E4E] leading-normal font-normal">
                          {opt.description}
                        </p>
                        <div className="pl-7">{opt.extra}</div>
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
                  onClick={async () => {
                    // Pay on pickup isn't wired up to the backend yet — stub so the
                    // button stays clickable without sending the shopper anywhere.
                    if (paymentType !== "CARD") return;

                    setIsCheckingStock(true);
                    const result = await checkStock(cart?.cartItems ?? []);
                    setIsCheckingStock(false);

                    if (!result.ok) {
                      router.push("/cart");
                      return;
                    }

                    placeOrder.mutate();
                  }}
                  disabled={placeOrder.isPending || isCheckingStock || !cartId || hasOutOfStockItem}
                  className="w-full bg-black py-3.75 font-(family-name:--font-jost) text-sm font-medium tracking-widest uppercase text-white transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-black/30"
                >
                  {placeOrder.isPending
                    ? "Placing order…"
                    : isCheckingStock
                      ? "Checking availability…"
                      : paymentType === "CARD"
                        ? "Proceed to Payment"
                        : "Place Order"}
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
