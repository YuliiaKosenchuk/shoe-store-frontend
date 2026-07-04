import { apiClient } from "@/lib/apiClient";
import type {
  AddCartItemPayload,
  CartResponseDto,
  UpdateCartItemPayload,
} from "@/shemas/cart.shema";

export const CartService = {
  async getCart(cartId: number): Promise<CartResponseDto> {
    console.log("[Cart] getCart", cartId);
    const response = await apiClient.get(`/api/carts/${cartId}`);
    return response.data;
  },

  async addItem(payload: AddCartItemPayload): Promise<CartResponseDto> {
    console.log("[Cart] addItem", payload);
    const response = await apiClient.post("/api/carts/items", payload);
    return response.data;
  },

  async updateItem(
    cartId: number,
    cartItemId: number,
    payload: UpdateCartItemPayload
  ): Promise<CartResponseDto> {
    console.log("[Cart] updateItem", { cartId, cartItemId, payload });
    const response = await apiClient.patch(
      `/api/carts/${cartId}/items/${cartItemId}`,
      payload
    );
    return response.data;
  },

  async removeItem(cartId: number, cartItemId: number): Promise<CartResponseDto> {
    console.log("[Cart] removeItem", { cartId, cartItemId });
    const response = await apiClient.delete(
      `/api/carts/${cartId}/items/${cartItemId}`
    );
    return response.data;
  },

  async mergeCart(cartId: number): Promise<CartResponseDto> {
    console.log("[Cart] mergeCart", cartId);
    const response = await apiClient.post("/api/carts/merge", { cartId });
    return response.data;
  },
};
