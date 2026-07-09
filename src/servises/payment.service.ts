import { apiClient } from "@/lib/apiClient";
import type { CreatePaymentRequestDto, PaymentDto } from "@/shemas/checkout.shema";

export const PaymentService = {
  async createPaymentSession(payload: CreatePaymentRequestDto): Promise<PaymentDto> {
    console.log("[Payment] createPaymentSession", payload);
    const response = await apiClient.post("/api/payments", payload);
    return response.data;
  },
};
