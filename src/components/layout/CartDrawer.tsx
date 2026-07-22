"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart, useRemoveCartItem, useUpdateCartItem, getCartErrorMessage } from "@/hooks/useCart";
import { useCartItemsStock } from "@/hooks/useCartItemsStock";
import { useCartItemsProducts } from "@/hooks/useCartItemsProducts";
import { isCartItemOutOfStock } from "@/lib/cartStock";
import { CartDrawerItem } from "@/components/cart/CartDrawerItem";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Sort by id (= order added to cart) — the backend doesn't guarantee stable
  // ordering across mutations, which would otherwise shift rows under the
  // user's cursor mid-click and risk bumping the wrong item's quantity.
  const items = [...(cart?.cartItems ?? [])].sort((a, b) => a.id - b.id);
  const { stockByCartItemId, isLoading: isStockLoading } = useCartItemsStock(items);
  const productByCartItemId = useCartItemsProducts(items);
  const productsCount = cart?.productsCount ?? 0;
  const cartSubtotal = cart?.cartSubtotal ?? 0;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed px-4 md:p-12 right-0 top-0 z-50 flex h-full w-full flex-col bg-white transition-transform duration-300 ease-out md:max-w-132.25 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Cart"
        aria-hidden={!isOpen}
      >
        <div className="mx-auto flex h-full w-full flex-col">
          <div className="flex items-end justify-between px-4 md:px-6 py-6">
            <h2 className="font-(family-name:--font-cormorant-garamond) text-[28px] md:text-[36px] leading-[1.1] font-semibold text-black">
              Your cart
            </h2>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="font-(family-name:--font-jost) text-base font-normal text-black hover:opacity-70 transition-opacity"
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto md:px-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-4 py-24 text-center">
                <p className="font-(family-name:--font-jost) text-sm font-light text-gray-500">
                  Your cart is empty.
                </p>
                <Link
                  href="/"
                  onClick={onClose}
                  className="font-(family-name:--font-jost) text-sm font-light tracking-widest uppercase underline underline-offset-4 text-[#7A2633] hover:opacity-70 transition-opacity"
                >
                  Browse some products
                </Link>
              </div>
            ) : (
              <>
                <ul className="divide-y divide-[#B3B3B3] border-t border-b border-[#B3B3B3]">
                  {items.map((item) => (
                    <CartDrawerItem
                      key={item.id}
                      item={item}
                      product={productByCartItemId.get(item.id)}
                      onRemove={() => removeItem.mutate(item.id)}
                      onDecrease={() =>
                        item.quantity <= 1
                          ? removeItem.mutate(item.id)
                          : updateItem.mutate({ cartItemId: item.id, quantity: item.quantity - 1 })
                      }
                      onIncrease={() =>
                        updateItem.mutate({ cartItemId: item.id, quantity: item.quantity + 1 })
                      }
                      isRemovePending={removeItem.isPending}
                      isUpdatePending={updateItem.isPending}
                      errorMessage={
                        updateItem.isError && updateItem.variables?.cartItemId === item.id
                          ? getCartErrorMessage(updateItem.error)
                          : undefined
                      }
                      maxQuantity={stockByCartItemId.get(item.id)}
                      outOfStock={isCartItemOutOfStock(stockByCartItemId.get(item.id), item.quantity, isStockLoading)}
                    />
                  ))}
                </ul>

                <div className="mt-4">
                  <div className="mb-2.5 flex justify-between font-(family-name:--font-jost) text-[16px] text-[#343434] leading-[1.3]">
                    <span>
                      {productsCount} item{productsCount !== 1 ? "s" : ""}
                    </span>
                    <span className="font-(family-name:--font-jost) text-[16px] text-[#010101] font-medium leading-[1.3]">€ {cartSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-(family-name:--font-jost) text-[16px] text-[#343434] leading-[1.3]">
                    <span className="font-(family-name:--font-jost) text-[16px] text-[#343434] leading-[1.3]">Shipping</span>
                    <span className="font-(family-name:--font-jost) text-[16px] font-medium text-[#010101] leading-[1.3]" >€ 5</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {items.length > 0 && (
            <div className="md:px-6">
              <div className="flex justify-between pb-4 font-(family-name:--font-jost) text-[20px] leading-[1.3] font-medium text-[#010101]">
                <span>Total</span>
                <span className="" >€ {cartSubtotal.toLocaleString()}</span>
              </div>

              <Link
                href="/cart"
                onClick={onClose}
                className="mb-4 block w-full bg-[#010101] py-3.75 text-center font-(family-name:--font-jost) text-sm font-medium leading-normal uppercase text-white transition-colors hover:bg-gray-900"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={onClose}
                className="block w-full border border-[#010101] py-3.75 text-center font-(family-name:--font-jost) text-sm leading-normal text-[#010101] transition-colors hover:bg-gray-50"
              >
                View bag ({productsCount})
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
