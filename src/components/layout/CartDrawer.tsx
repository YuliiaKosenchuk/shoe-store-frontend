"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useCart, useRemoveCartItem, useUpdateCartItem, getCartErrorMessage } from "@/hooks/useCart";

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

  // Sort by id (= order added to cart) — the backend doesn't guarantee stable
  // ordering across mutations, which would otherwise shift rows under the
  // user's cursor mid-click and risk bumping the wrong item's quantity.
  const items = [...(cart?.cartItems ?? [])].sort((a, b) => a.id - b.id);
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
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[#F2EDE6] transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Cart"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <h2 className="font-(family-name:--font-cormorant-garamond) text-2xl text-black">
            Your cart
          </h2>
          <button onClick={onClose} aria-label="Close cart" className="hover:opacity-70 transition-opacity">
            <X size={22} strokeWidth={1.25} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <p className="font-(family-name:--font-jost) text-sm font-light text-gray-500">
                Your cart is empty.
              </p>
              <Link
                href="/shoes"
                onClick={onClose}
                className="font-(family-name:--font-jost) text-sm font-light tracking-widest uppercase underline underline-offset-4 text-[#7A2633] hover:opacity-70 transition-opacity"
              >
                Browse shoes
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-300/60">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5">
                  <div className="relative h-20 w-16 shrink-0 bg-white">
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-(family-name:--font-jost) text-sm text-black">
                        {item.name}
                      </p>
                      <button
                        onClick={() => removeItem.mutate(item.id)}
                        disabled={removeItem.isPending}
                        aria-label="Remove item"
                        className="shrink-0 text-gray-400 hover:text-black transition-colors"
                      >
                        <X size={16} strokeWidth={1.25} />
                      </button>
                    </div>
                    <p className="mt-1 font-(family-name:--font-jost) text-xs text-gray-500">
                      Size: {item.size}
                    </p>
                    <p className="font-(family-name:--font-jost) text-xs text-gray-500">
                      Colour: {item.color}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-3 border border-gray-300 px-2 py-1">
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
                      <span className="font-(family-name:--font-jost) text-sm text-black">
                        ₴{item.subtotal.toLocaleString()}
                      </span>
                    </div>
                    {updateItem.isError && updateItem.variables?.cartItemId === item.id && (
                      <p className="mt-1 font-(family-name:--font-jost) text-xs text-[#DF4441]">
                        {getCartErrorMessage(updateItem.error)}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-300/60 px-6 py-6">
            <div className="flex justify-between font-(family-name:--font-jost) text-sm text-black">
              <span>
                {productsCount} item{productsCount !== 1 ? "s" : ""}
              </span>
              <span>₴{cartSubtotal.toLocaleString()}</span>
            </div>
            <div className="mt-2 flex justify-between font-(family-name:--font-jost) text-sm text-black">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="mt-4 flex justify-between border-t border-gray-300/60 pt-4 font-(family-name:--font-jost) text-base font-medium text-black">
              <span>TOTAL</span>
              <span>₴{cartSubtotal.toLocaleString()}</span>
            </div>

            <Link
              href="/cart"
              onClick={onClose}
              className="mt-6 block w-full bg-black py-3.75 text-center font-(family-name:--font-jost) text-sm font-medium tracking-widest uppercase text-white transition-colors hover:bg-gray-900"
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              onClick={onClose}
              className="mt-3 block w-full border border-gray-300 py-3.5 text-center font-(family-name:--font-jost) text-sm text-black transition-colors hover:bg-gray-50"
            >
              View bag ({productsCount})
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
