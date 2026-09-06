"use client";

import { Suspense, useRef } from "react";
import Link from "next/link";
import { CloudinaryImage as Image } from "@/components/ui/CloudinaryImage";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useCheckoutStore } from "@/store/checkout.store";
import { OrderService } from "@/servises/order.service";
import { getOrderItemImage } from "@/lib/orderImageCache";
import type { DeliveryType, OrderResponseDto } from "@/shemas/checkout.shema";
import { paymentTypeOptions } from "@/shemas/checkout.shema";
import { CheckoutContainer } from "@/components/ui/CheckoutContainer";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";

const MAX_POLL_ATTEMPTS = 5;
const POLL_INTERVAL_MS = 2000;

const deliveryTypeLabels: Record<DeliveryType, string> = {
  PERSONAL_PICKUP: "Store pickup",
  PARCEL_LOCKER: "Parcel locker",
  PICKUP_POINT: "Pickup point",
  COURIER: "Courier delivery",
};

function OrderDetails({ order }: { order: OrderResponseDto }) {
  const itemsCount = order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const itemsSubtotal = order.orderItems.reduce((sum, item) => sum + item.subtotal, 0);
  // Backend doesn't return a separate shipping-fee field, so it's derived from
  // the pre-discount total — matches today's reality where pickup/delivery is free.
  const shippingFee = Math.round((order.totalAmound - itemsSubtotal) * 100) / 100;
  const paymentMethodLabel =
    paymentTypeOptions.find((opt) => opt.value === order.paymentType)?.label ?? order.paymentType;

  return (
    <div className="mx-auto max-w-157 py-6 text-center">
      <h1 className="mb-3 font-(family-name:--font-cormorant-garamond) text-[36px] font-semibold leading-[1.1] text-black">
        Thank you for your order
      </h1>
      <p className="font-(family-name:--font-jost) text-sm text-gray-500">
        Your order has been successfully placed and is now being processed.
      </p>

      <p className="mt-6 font-(family-name:--font-jost) text-sm text-gray-500">
        A confirmation email has been sent to
      </p>
      <p className="font-(family-name:--font-jost) text-sm text-black">{order.customerEmail}</p>

      <p className="mt-6 mb-6 font-(family-name:--font-cormorant-garamond) text-lg text-black">
        Order #{order.orderId}
      </p>

      <div className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-gray-200 py-6 text-left">
        <div>
          <p className="mb-1 font-(family-name:--font-jost) text-[13px] tracking-widest text-[#343434]">
            Contact info
          </p>
          <p className="font-(family-name:--font-jost) text-sm text-black">{order.customerEmail}</p>
        </div>
        <div>
          <p className="mb-1 font-(family-name:--font-jost) text-[13px] tracking-widest text-[#343434]">
            Shipping address
          </p>
          <p className="font-(family-name:--font-jost) text-sm text-black">{order.deliveryAddress}</p>
        </div>
        <div>
          <p className="mb-1 font-(family-name:--font-jost) text-[13px] tracking-widest text-[#343434]">
            Payment method
          </p>
          <p className="font-(family-name:--font-jost) text-sm text-black">{paymentMethodLabel}</p>
        </div>
        <div>
          <p className="mb-1 font-(family-name:--font-jost) text-[13px] tracking-widest text-[#343434]">
            Billing address
          </p>
          <p className="font-(family-name:--font-jost) text-sm text-black">Same as shipping address</p>
        </div>
        <div>
          <p className="mb-1 font-(family-name:--font-jost) text-[13px] tracking-widest text-[#343434]">
            Shipping method
          </p>
          <p className="font-(family-name:--font-jost) text-sm text-black">
            {deliveryTypeLabels[order.deliveryType]}
          </p>
        </div>
      </div>

      <div className="space-y-4 border-t border-b border-[#B3B3B3] py-6 text-left">
        {order.orderItems.map((item) => {
          const imageUrl =
            item.imageUrl || getOrderItemImage(item.name, item.color, item.size);
          return (
            <div key={item.id} className="flex items-stretch gap-3">
              <div className="relative h-21.5 w-21.5 shrink-0 bg-[#F8F8F8]">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={item.name}
                    fill
                    sizes="86px"
                    className="object-cover"
                  />
                )}
                <span className="absolute top-0 right-0 flex h-6 w-6 items-center justify-center bg-black font-(family-name:--font-jost) text-base text-white leading-[1.3]">
                  <span className="inline-block" style={{ transform: "translateY(0.5px)" }}>
                    {item.quantity}
                  </span>
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <p className="truncate font-(family-name:--font-cormorant-garamond) text-[20px] font-semibold leading-[1.3] text-black">
                    {item.name}
                  </p>
                  <span className="shrink-0 font-(family-name:--font-jost) text-base text-[#010101] leading-[1.3] font-medium">
                    € {item.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col gap-1 font-(family-name:--font-jost) text-sm text-[#4E4E4E] leading-normal font-normal">
                  <p>
                    Size: <span className="text-[#010101] font-light">{item.size}</span>
                  </p>
                  <p>
                    Colour: <span className="text-[#010101] font-light">{item.color}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-2 py-6 font-(family-name:--font-jost) text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal · {itemsCount} items</span>
          <span className="text-black">€ {itemsSubtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>{deliveryTypeLabels[order.deliveryType]}</span>
          <span className="text-black">{shippingFee <= 0 ? "Free" : `€ ${shippingFee.toLocaleString()}`}</span>
        </div>
        {order.discountAmount > 0 && (
          <div className="flex justify-between text-gray-500">
            <span>Discount code</span>
            <span className="text-[#DF4441]">− € {order.discountAmount.toLocaleString()}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between border-t border-gray-200 pt-6 font-(family-name:--font-jost) text-base font-medium text-black">
        <span>Total</span>
        <span>€ {order.finalAmount.toLocaleString()}</span>
      </div>

      <div className="mt-8 space-y-3">
        <Link
          href="/"
          className="block w-full bg-[#010101] py-3.75 text-center font-(family-name:--font-jost) text-[14px] font-medium tracking-wide leading-[1.4] text-white transition-colors hover:bg-[#2C2C2C]"
        >
          Continue shopping
        </Link>
        {/* Not wired up yet — no customer-facing order history page exists */}
        <button
          type="button"
          className="block w-full border border-black py-3.75 text-center font-(family-name:--font-jost) text-[14px] font-medium tracking-wide leading-[1.4] text-black transition-colors hover:bg-[#F8F8F8]"
        >
          View shopping
        </button>
      </div>
    </div>
  );
}

function CheckoutCompleteContent() {
  const searchParams = useSearchParams();
  const lastOrder = useCheckoutStore((s) => s.lastOrder);

  const orderIdParam = searchParams.get("orderId");
  const orderId = orderIdParam ? Number(orderIdParam) : null;

  // Counts fetch attempts so the pending-payment poll below gives up after
  // a bounded window instead of retrying forever if the webhook never lands.
  const attemptsRef = useRef(0);

  const orderQuery = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => {
      attemptsRef.current += 1;
      return OrderService.getOrder(orderId as number);
    },
    // Only needed for the Stripe return trip: browser did a full cross-origin
    // navigation, so the non-persisted checkout store is empty by now.
    enabled: lastOrder === null && orderId !== null,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status === "PENDING" && attemptsRef.current < MAX_POLL_ATTEMPTS) {
        return POLL_INTERVAL_MS;
      }
      return false;
    },
    // Guest orders can't be fetched by GET /api/orders/{id} at all (backend
    // requires an owner match) — don't burn 3 retries on a failure that will
    // never succeed, just settle into the fallback UI immediately.
    retry: false,
  });

  const order = lastOrder ?? orderQuery.data ?? null;

  return (
    <main>
      <CheckoutContainer className="px-4 py-6 md:px-8 lg:py-10">
        <CheckoutStepper activeStep={4} />

        {!order && orderQuery.isLoading ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center sm:py-24">
            <p className="font-(family-name:--font-jost) text-sm font-light text-gray-500">
              Confirming your order…
            </p>
          </div>
        ) : !order ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center sm:py-24">
            <h1 className="font-(family-name:--font-cormorant-garamond) text-[36px] font-semibold leading-[1.1] text-black">
              Thank you
            </h1>
            <p className="font-(family-name:--font-jost) text-sm font-light text-gray-500">
              Your order has been placed.
            </p>
            <Link
              href="/"
              className="mt-2 inline-block bg-[#010101] px-8 py-3.75 text-center font-(family-name:--font-jost) text-[14px] font-medium tracking-wide leading-[1.4] text-white transition-colors hover:bg-[#2C2C2C]"
            >
              Back to home
            </Link>
          </div>
        ) : (
          <OrderDetails order={order} />
        )}
      </CheckoutContainer>
    </main>
  );
}

export default function CheckoutCompletePage() {
  return (
    <Suspense fallback={null}>
      <CheckoutCompleteContent />
    </Suspense>
  );
}
