import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/shemas/product.shema";

interface WishlistState {
  items: Product[];
  hasHydrated: boolean;
  toggleItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,

      toggleItem: (product) => {
        const exists = get().items.some((p) => p.id === product.id);
        set((state) => ({
          items: exists
            ? state.items.filter((p) => p.id !== product.id)
            : [...state.items, product],
        }));
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((p) => p.id !== productId),
        }));
      },

      isInWishlist: (productId) => {
        return get().items.some((p) => p.id === productId);
      },
    }),
    {
      name: "wishlist",
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated = true;
      },
    }
  )
);
