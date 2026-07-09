"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart, useRemoveCartItem, useUpdateCartItem, getCartErrorMessage } from "@/hooks/useCart";
import { useCartItemsStock } from "@/hooks/useCartItemsStock";
import { useCartItemsProducts } from "@/hooks/useCartItemsProducts";
import { CheckoutContainer } from "@/components/ui/CheckoutContainer";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { OrderSummaryPanel } from "@/components/checkout/OrderSummaryPanel";
import { CartPageItem } from "@/components/cart/CartPageItem";

export default function CartPage() {
  const router = useRouter();
  const { cart, isLoading, hasHydrated } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  // Sort by id (= order added to cart) — the backend doesn't guarantee stable
  // ordering across mutations, which would otherwise shift rows under the
  // user's cursor mid-click and risk bumping the wrong item's quantity.
  const items = [...(cart?.cartItems ?? [])].sort((a, b) => a.id - b.id);
  const stockByCartItemId = useCartItemsStock(items);
  const productByCartItemId = useCartItemsProducts(items);
  const productsCount = cart?.productsCount ?? 0;
  const showEmpty = hasHydrated && !isLoading && items.length === 0;

  return (
    <main>
      <CheckoutContainer className="px-4 py-6 sm:px-6 md:px-8 lg:px-8 lg:py-10">
        <CheckoutStepper activeStep={1} />

        {showEmpty ? (
          <>
            <h1 className="mb-8 font-(family-name:--font-cormorant-garamond) text-[36px] font-semibold leading-[1.1] text-black">
              Cart {productsCount > 0 && `(${productsCount})`}
            </h1>

            <div className="flex flex-col items-center gap-4 py-16 text-center sm:py-24">
              <p className="font-(family-name:--font-jost) text-base font-light text-gray-500">
                Your bag is empty.
              </p>
              <Link
                href="/"
                className="font-(family-name:--font-jost) text-sm font-light tracking-widest uppercase underline underline-offset-4 text-[#7A2633] hover:opacity-70 transition-opacity"
              >
                Browse something new
              </Link>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-[519px_410px] lg:justify-between">
            <div>
              <h1 className="mb-8 font-(family-name:--font-cormorant-garamond) text-[36px] font-semibold leading-[1.1] text-black">
                Cart {productsCount > 0 && `(${productsCount})`}
              </h1>

              {items.map((item, index) => (
                <div key={item.id}>
                  {index > 0 && <div className="my-4 h-px w-full bg-[#B3B3B3]" />}
                  <CartPageItem
                    item={item}
                    product={productByCartItemId.get(item.id)}
                    onRemove={() => removeItem.mutate(item.id)}
                    onQuantityChange={(quantity) =>
                      updateItem.mutate({ cartItemId: item.id, quantity })
                    }
                    isRemovePending={removeItem.isPending}
                    isUpdatePending={updateItem.isPending}
                    errorMessage={
                      updateItem.isError && updateItem.variables?.cartItemId === item.id
                        ? getCartErrorMessage(updateItem.error)
                        : undefined
                    }
                    maxQuantity={stockByCartItemId.get(item.id)}
                  />
                </div>
              ))}

              <button
                onClick={() => router.push("/checkout/delivery")}
                disabled={items.length === 0}
                className="mt-6 w-full bg-black py-3.75 font-(family-name:--font-jost) text-sm font-medium leading-[1.3] uppercase text-white transition-colors hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-black/30"
              >
                Place order
              </button>
            </div>

            <OrderSummaryPanel showItems={false} />
          </div>
        )}
      </CheckoutContainer>
    </main>
  );
}
