"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, X } from "lucide-react";
import { useCart, useRemoveCartItem, useUpdateCartItem, getCartErrorMessage } from "@/hooks/useCart";
import { Container } from "@/components/ui/Container";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { OrderSummaryPanel } from "@/components/checkout/OrderSummaryPanel";

export default function CartPage() {
  const router = useRouter();
  const { cart, isLoading, hasHydrated } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  // Sort by id (= order added to cart) — the backend doesn't guarantee stable
  // ordering across mutations, which would otherwise shift rows under the
  // user's cursor mid-click and risk bumping the wrong item's quantity.
  const items = [...(cart?.cartItems ?? [])].sort((a, b) => a.id - b.id);
  const productsCount = cart?.productsCount ?? 0;
  const showEmpty = hasHydrated && !isLoading && items.length === 0;

  return (
    <main>
      <Container className="px-4 lg:px-8 py-6 lg:py-10">
        <CheckoutStepper activeStep={1} />

        <h1 className="mb-10 font-(family-name:--font-cormorant-garamond) text-4xl font-light tracking-widest uppercase text-black">
          Cart {productsCount > 0 && `(${productsCount})`}
        </h1>

        {showEmpty ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <p className="font-(family-name:--font-jost) text-base font-light text-gray-500">
              Your bag is empty.
            </p>
            <Link
              href="/shoes"
              className="font-(family-name:--font-jost) text-sm font-light tracking-widest uppercase underline underline-offset-4 text-[#7A2633] hover:opacity-70 transition-opacity"
            >
              Browse shoes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-gray-200 pb-6">
                  <div className="relative h-28 w-22 shrink-0 bg-[#F8F8F8]">
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="88px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-(family-name:--font-jost) text-base text-black">
                        {item.name}
                      </p>
                      <div className="flex shrink-0 items-center gap-3 text-gray-400">
                        <Heart size={18} strokeWidth={1.25} aria-hidden="true" />
                        <button
                          onClick={() => removeItem.mutate(item.id)}
                          disabled={removeItem.isPending}
                          aria-label="Remove item"
                          className="hover:text-black transition-colors"
                        >
                          <X size={18} strokeWidth={1.25} />
                        </button>
                      </div>
                    </div>
                    <p className="mt-1 font-(family-name:--font-jost) text-sm text-gray-500">
                      Size: {item.size} | Colour: {item.color}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="font-(family-name:--font-jost) text-base text-black">
                        €{item.price.toLocaleString()}
                      </span>
                      {item.priceOld > item.price && (
                        <span className="font-(family-name:--font-jost) text-sm text-[#818181] line-through">
                          €{item.priceOld.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 flex items-center gap-3 border border-gray-300 px-2 py-1 w-fit">
                      <button
                        onClick={() =>
                          item.quantity <= 1
                            ? removeItem.mutate(item.id)
                            : updateItem.mutate({
                                cartItemId: item.id,
                                quantity: item.quantity - 1,
                              })
                        }
                        disabled={updateItem.isPending || removeItem.isPending}
                        aria-label={item.quantity <= 1 ? "Remove item" : "Decrease quantity"}
                        className="w-4 text-center hover:text-[#7A2633] transition-colors"
                      >
                        −
                      </button>
                      <span className="font-(family-name:--font-jost) text-sm text-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateItem.mutate({
                            cartItemId: item.id,
                            quantity: item.quantity + 1,
                          })
                        }
                        disabled={updateItem.isPending}
                        aria-label="Increase quantity"
                        className="w-4 text-center hover:text-[#7A2633] transition-colors"
                      >
                        +
                      </button>
                    </div>
                    {updateItem.isError && updateItem.variables?.cartItemId === item.id && (
                      <p className="mt-1 font-(family-name:--font-jost) text-xs text-[#DF4441]">
                        {getCartErrorMessage(updateItem.error)}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <button
                onClick={() => router.push("/checkout/delivery")}
                disabled={items.length === 0}
                className="w-full bg-black py-3.75 font-(family-name:--font-jost) text-sm font-medium tracking-widest uppercase text-white transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-black/30"
              >
                Continue to Delivery
              </button>
            </div>

            <OrderSummaryPanel showItems={false} />
          </div>
        )}
      </Container>
    </main>
  );
}
