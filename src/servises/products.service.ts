import { apiClient } from "@/lib/apiClient";
import type { Product, ProductImageDto, ProductVariantDto } from "@/shemas/product.shema";

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

  async getImages(id: number): Promise<ProductImageDto[]> {
    const response = await apiClient.get(`/api/products/${id}/images`);
    return response.data;
  },

  async getVariants(id: number): Promise<ProductVariantDto[]> {
    const response = await apiClient.get(`/api/products/${id}/variants`);
    return response.data;
  },
};
