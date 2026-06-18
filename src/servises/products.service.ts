import { apiClient } from "@/lib/apiClient";
import type { Product } from "@/shemas/product.shema";

export const ProductsService = {
  async getProducts(): Promise<Product[]> {
    const response = await apiClient.get("/api/products");
    return response.data;
  },

  async getProduct(id: number, color?: string, size?: string): Promise<Product> {
    const response = await apiClient.get(`/api/products/${id}`, {
      params: { color, size },
    });
    return response.data;
  },
};
