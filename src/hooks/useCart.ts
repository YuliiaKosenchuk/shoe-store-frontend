"use client";

import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CartService } from "@/servises/cart.service";
import { UsersService } from "@/servises/users.service";
import { useCartStore } from "@/store/cart.store";
import type {
  AddCartItemPayload,
  CartResponseDto,
  UpdateCartItemPayload,
} from "@/shemas/cart.shema";

export const cartQueryKey = (cartId: number | null) => ["cart", cartId] as const;

// Turns a cart add/update error into copy safe to show next to the item —
// 409 is how the backend reports "not enough stock for this quantity".
export function getCartErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 409) {
      return "Not enough stock available for this quantity.";
    }
    if (!error.response) {
      return "Unable to connect. Please check your connection.";
    }
  }
  return "Something went wrong. Please try again.";
}

export function useCart() {
  const cartId = useCartStore((s) => s.cartId);
  const hasHydrated = useCartStore((s) => s.hasHydrated);

  const query = useQuery({
    queryKey: cartQueryKey(cartId),
    queryFn: () => CartService.getCart(cartId as number),
    enabled: hasHydrated && !!cartId,
  });

  return {
    cart: query.data,
    isLoading: hasHydrated && !!cartId && query.isLoading,
    isError: query.isError,
    hasHydrated,
    cartId,
  };
}

export function useAddCartItem() {
  const queryClient = useQueryClient();
  const cartId = useCartStore((s) => s.cartId);
  const setCartId = useCartStore((s) => s.setCartId);

  return useMutation({
    mutationFn: (payload: Omit<AddCartItemPayload, "cartId">) =>
      CartService.addItem({ ...payload, cartId }),
    onSuccess: (data: CartResponseDto) => {
      console.log(
        "[Cart] addItem success, cartId:",
        data.cartId,
        "productsCount:",
        data.productsCount
      );
      setCartId(data.cartId);
      queryClient.setQueryData(cartQueryKey(data.cartId), data);
    },
    onError: (error) => {
      console.error("[Cart] addItem failed:", error);
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  const cartId = useCartStore((s) => s.cartId);

  return useMutation({
    mutationFn: ({
      cartItemId,
      quantity,
    }: {
      cartItemId: number;
      quantity: number;
    }) =>
      CartService.updateItem(cartId as number, cartItemId, {
        quantity,
      } satisfies UpdateCartItemPayload),
    onSuccess: (data) => {
      console.log(
        "[Cart] updateItem success, cartId:",
        data.cartId,
        "productsCount:",
        data.productsCount
      );
      queryClient.setQueryData(cartQueryKey(cartId), data);
    },
    onError: (error) => {
      console.error("[Cart] updateItem failed:", error);
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  const cartId = useCartStore((s) => s.cartId);

  return useMutation({
    mutationFn: (cartItemId: number) =>
      CartService.removeItem(cartId as number, cartItemId),
    onSuccess: (data) => {
      console.log(
        "[Cart] removeItem success, cartId:",
        data.cartId,
        "productsCount:",
        data.productsCount
      );
      queryClient.setQueryData(cartQueryKey(cartId), data);
    },
    onError: (error) => {
      console.error("[Cart] removeItem failed:", error);
    },
  });
}

// Runs right after a successful login/register/OAuth callback. There's no
// "get my cart" endpoint, so the client is the only place that can connect
// an authenticated user back to their cart:
//  - if a guest cart exists (cartId already set), merge it into the account
//  - otherwise, restore whatever cart this user last had (saved at logout by
//    cart.store's logoutClearCart) so their cart doesn't appear to vanish
export function useSyncCartOnAuth() {
  const queryClient = useQueryClient();
  const cartId = useCartStore((s) => s.cartId);
  const setCartId = useCartStore((s) => s.setCartId);
  const setCurrentUserId = useCartStore((s) => s.setCurrentUserId);
  const rememberCartForUser = useCartStore((s) => s.rememberCartForUser);

  return async function syncCartOnAuth() {
    console.log("[Cart] syncCartOnAuth called, current cartId:", cartId);

    let userId: number | null = null;
    try {
      const profile = await UsersService.getProfile();
      userId = profile.id;
      setCurrentUserId(userId);
    } catch (error) {
      console.error("[Cart] syncCartOnAuth: failed to load profile:", error);
    }

    if (cartId) {
      try {
        console.log("[Cart] Merging guest cart into account:", cartId);
        const merged = await CartService.mergeCart(cartId);
        setCartId(merged.cartId);
        queryClient.setQueryData(cartQueryKey(merged.cartId), merged);
        if (userId) rememberCartForUser(userId, merged.cartId);
        console.log("[Cart] Merge complete, cartId now:", merged.cartId);
      } catch (error) {
        console.error("[Cart] Merge failed:", error);
      }
      return;
    }

    if (!userId) {
      console.log("[Cart] No guest cart and no user profile — nothing to sync");
      return;
    }

    const remembered = useCartStore.getState().cartIdByUserId[userId];
    if (remembered) {
      console.log("[Cart] Restoring saved cart for user:", userId, "cartId:", remembered);
      setCartId(remembered);
    } else {
      console.log("[Cart] No saved cart for user:", userId);
    }
  };
}
