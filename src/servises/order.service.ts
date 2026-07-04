import { apiClient } from "@/lib/apiClient";
import type { CreateOrderRequestDto, OrderResponseDto } from "@/shemas/checkout.shema";

export const OrderService = {
  async createOrder(payload: CreateOrderRequestDto): Promise<OrderResponseDto> {
    console.log("[Order] createOrder", payload);
    const response = await apiClient.post("/api/orders", payload);
    return response.data;
  },

  async getOrder(id: number): Promise<OrderResponseDto> {
    console.log("[Order] getOrder", id);
    const response = await apiClient.get(`/api/orders/${id}`);
    return response.data;
  },

  async getOrders(): Promise<OrderResponseDto[]> {
    console.log("[Order] getOrders");
    const response = await apiClient.get("/api/orders");
    return response.data;
  },
};
