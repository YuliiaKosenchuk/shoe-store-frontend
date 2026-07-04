"use client";

import Link from "next/link";
import Image from "next/image";
import { useCheckoutStore } from "@/store/checkout.store";
import { Container } from "@/components/ui/Container";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";

export default function CheckoutCompletePage() {
  const lastOrder = useCheckoutStore((s) => s.lastOrder);

  return (
    <main>
      <Container className="px-4 lg:px-8 py-6 lg:py-10">
        <CheckoutStepper activeStep={4} />

        {!lastOrder ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <h1 className="font-(family-name:--font-cormorant-garamond) text-4xl font-light tracking-widest uppercase text-black">
              Thank you
            </h1>
            <p className="font-(family-name:--font-jost) text-sm font-light text-gray-500">
              Your order has been placed.
            </p>
            <Link
              href="/"
              className="font-(family-name:--font-jost) text-sm font-light tracking-widest uppercase underline underline-offset-4 text-[#7A2633] hover:opacity-70 transition-opacity"
            >
              Back to home
            </Link>
          </div>
        ) : (
          <div className="mx-auto max-w-157 py-6 text-center">
            <h1 className="mb-3 font-(family-name:--font-cormorant-garamond) text-4xl font-light tracking-widest uppercase text-black">
              Thank you for your order
            </h1>
            <p className="mb-10 font-(family-name:--font-jost) text-sm text-gray-500">
              Order #{lastOrder.orderId} · {lastOrder.status}
            </p>

            <div className="space-y-4 border-t border-b border-gray-200 py-6 text-left">
              {lastOrder.orderItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-13 shrink-0 bg-[#F8F8F8]">
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="52px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-(family-name:--font-jost) text-sm text-black">
                      {item.name}
                    </p>
                    <p className="font-(family-name:--font-jost) text-xs text-gray-500">
                      Size: {item.size} | Colour: {item.color} | Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="shrink-0 font-(family-name:--font-jost) text-sm text-black">
                    ₴{item.subtotal.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between font-(family-name:--font-jost) text-base font-medium text-black">
              <span>Total</span>
              <span>₴{lastOrder.totalAmound.toLocaleString()}</span>
            </div>

            <div className="mt-8 text-left font-(family-name:--font-jost) text-sm text-gray-600">
              <p className="mb-1 font-medium text-black">Delivery address</p>
              <p>{lastOrder.recipientName}</p>
              <p>{lastOrder.deliveryAddress}</p>
              <p>{lastOrder.recipientPhone}</p>
            </div>

            <Link
              href="/"
              className="mt-10 inline-block font-(family-name:--font-jost) text-sm font-light tracking-widest uppercase underline underline-offset-4 text-[#7A2633] hover:opacity-70 transition-opacity"
            >
              Back to home
            </Link>
          </div>
        )}
      </Container>
    </main>
  );
}
