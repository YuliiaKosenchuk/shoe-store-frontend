import { apiClient } from "@/lib/apiClient";
import type { ProductDto, ProductVariantDto, ProductImageDto } from "@/shemas/product.shema";
import type {
  CreateProductFormValues,
  CreateVariantFormValues,
  CreateImageFormValues,
} from "@/shemas/admin-product.shema";

export const AdminService = {
  async createProduct(data: CreateProductFormValues): Promise<ProductDto> {
    console.log("[Admin] createProduct → sending:", data);
    const response = await apiClient.post("/api/products", data);
    console.log("[Admin] createProduct ← received:", response.data);
    return response.data;
  },

  async updateProduct(id: number, data: Partial<CreateProductFormValues>): Promise<ProductDto> {
    console.log(`[Admin] updateProduct → productId=${id}, sending:`, data);
    const response = await apiClient.patch(`/api/products/${id}`, data);
    console.log(`[Admin] updateProduct ← received:`, response.data);
    return response.data;
  },

  async deleteProduct(id: number): Promise<void> {
    console.log(`[Admin] deleteProduct → productId=${id}`);
    await apiClient.delete(`/api/products/${id}`);
    console.log(`[Admin] deleteProduct ← 204 No Content, productId=${id}`);
  },

  async getVariants(productId: number): Promise<ProductVariantDto[]> {
    console.log(`[Admin] getVariants → productId=${productId}`);
    const response = await apiClient.get(`/api/products/${productId}/variants`);
    console.log(`[Admin] getVariants ← received ${response.data.length} variants:`, response.data);
    return response.data;
  },

  async createVariant(productId: number, data: CreateVariantFormValues): Promise<ProductVariantDto> {
    console.log(`[Admin] createVariant → productId=${productId}, sending:`, data);
    const response = await apiClient.post(`/api/products/${productId}/variants`, data);
    console.log(`[Admin] createVariant ← received:`, response.data);
    return response.data;
  },

  async updateVariant(id: number, data: Partial<CreateVariantFormValues>): Promise<ProductVariantDto> {
    console.log(`[Admin] updateVariant → variantId=${id}, sending:`, data);
    const response = await apiClient.patch(`/api/products/variants/${id}`, data);
    console.log(`[Admin] updateVariant ← received:`, response.data);
    return response.data;
  },

  async deleteVariant(id: number): Promise<void> {
    console.log(`[Admin] deleteVariant → variantId=${id}`);
    await apiClient.delete(`/api/products/variants/${id}`);
    console.log(`[Admin] deleteVariant ← 204 No Content, variantId=${id}`);
  },

  async getImages(productId: number): Promise<ProductImageDto[]> {
    console.log(`[Admin] getImages → productId=${productId}`);
    const response = await apiClient.get(`/api/products/${productId}/images`);
    console.log(`[Admin] getImages ← received ${response.data.length} image sets:`, response.data);
    return response.data;
  },

  async createImage(productId: number, data: CreateImageFormValues): Promise<ProductImageDto> {
    console.log(`[Admin] createImage → productId=${productId}, sending:`, {
      color: data.color,
      mainUrl: data.mainUrl,
      urls: data.urls,
    });
    const response = await apiClient.post(`/api/products/${productId}/images`, data);
    console.log(`[Admin] createImage ← received:`, response.data);
    return response.data;
  },

  async deleteImage(productId: number, color: string): Promise<void> {
    console.log(`[Admin] deleteImage → productId=${productId}, color=${color}`);
    await apiClient.delete(`/api/products/images/${productId}/${color}`);
    console.log(`[Admin] deleteImage ← 204 No Content, productId=${productId}, color=${color}`);
  },
};
