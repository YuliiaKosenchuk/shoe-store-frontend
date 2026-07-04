import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cartId: number | null;
  currentUserId: number | null;
  // Remembers which cartId belonged to which authenticated user, so a
  // returning user gets their cart back on re-login even after logout
  // cleared the active cartId (there's no "GET my cart" endpoint to
  // re-derive this from the backend).
  cartIdByUserId: Record<number, number>;
  hasHydrated: boolean;
  setCartId: (cartId: number | null) => void;
  clearCartId: () => void;
  setCurrentUserId: (userId: number | null) => void;
  rememberCartForUser: (userId: number, cartId: number) => void;
  // Hides the cart for whoever uses the browser next, while preserving
  // this user's cartId so it can be restored the next time they log in.
  logoutClearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartId: null,
      currentUserId: null,
      cartIdByUserId: {},
      hasHydrated: false,

      setCartId: (cartId) => set({ cartId }),

      clearCartId: () => set({ cartId: null }),

      setCurrentUserId: (userId) => set({ currentUserId: userId }),

      rememberCartForUser: (userId, cartId) =>
        set((state) => ({
          cartIdByUserId: { ...state.cartIdByUserId, [userId]: cartId },
        })),

      logoutClearCart: () => {
        const { currentUserId, cartId, cartIdByUserId } = get();
        set({
          cartId: null,
          currentUserId: null,
          cartIdByUserId:
            currentUserId && cartId
              ? { ...cartIdByUserId, [currentUserId]: cartId }
              : cartIdByUserId,
        });
      },
    }),
    {
      name: "cart",
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated = true;
      },
    }
  )
);
