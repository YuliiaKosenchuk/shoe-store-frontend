import { apiClient } from "@/lib/apiClient";
import type { ProductDto, ProductVariantDto, ProductImageDto } from "@/shemas/product.shema";
import type {
  CreateProductFormValues,
  CreateVariantFormValues,
  CreateImageFormValues,
} from "@/shemas/admin-product.shema";

export const AdminService = {
  async createProduct(data: CreateProductFormValues): Promise<ProductDto> {
    console.log("[Admin] submitting product create", data);
    const response = await apiClient.post("/api/products", data);
    console.log("[Admin] product created: id=", response.data.id);
    return response.data;
  },

  async updateProduct(id: number, data: Partial<CreateProductFormValues>): Promise<ProductDto> {
    console.log(`[Admin] submitting product update id=${id}`, data);
    const response = await apiClient.patch(`/api/products/${id}`, data);
    return response.data;
  },

  async deleteProduct(id: number): Promise<void> {
    console.log(`[Admin] delete confirmed: productId=${id}`);
    await apiClient.delete(`/api/products/${id}`);
    console.log(`[Admin] product ${id} deleted`);
  },

  async getVariants(productId: number): Promise<ProductVariantDto[]> {
    const response = await apiClient.get(`/api/products/${productId}/variants`);
    console.log("[Admin] getVariants raw response:", JSON.stringify(response.data));
    return response.data;
  },

  async createVariant(productId: number, data: CreateVariantFormValues): Promise<ProductVariantDto> {
    console.log(`[Admin] adding variant to productId=${productId}`, data);
    const response = await apiClient.post(`/api/products/${productId}/variants`, data);
    console.log(`[Admin] variant created: id=`, response.data.id);
    return response.data;
  },

  async updateVariant(id: number, data: Partial<CreateVariantFormValues>): Promise<ProductVariantDto> {
    console.log(`[Admin] updating variant id=${id}`, data);
    const response = await apiClient.patch(`/api/products/variants/${id}`, data);
    return response.data;
  },

  async deleteVariant(id: number): Promise<void> {
    console.log(`[Admin] deleting variant id=${id}`);
    await apiClient.delete(`/api/products/variants/${id}`);
  },

  async createImage(productId: number, data: CreateImageFormValues): Promise<ProductImageDto> {
    console.log(`[Admin] submitting image: productId=${productId} color=${data.color} url=${data.mainUrl}`);
    const response = await apiClient.post(`/api/products/${productId}/images`, data);
    console.log(`[Admin] image saved: id=`, response.data.id);
    return response.data;
  },

  async updateImage(id: number, data: Partial<CreateImageFormValues>): Promise<ProductImageDto> {
    const response = await apiClient.patch(`/api/products/images/${id}`, data);
    return response.data;
  },

  async deleteImage(imageId: number): Promise<void> {
    await apiClient.delete(`/api/products/images/${imageId}`);
  },
};
