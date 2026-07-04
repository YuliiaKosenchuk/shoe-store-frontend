import { apiClient } from "@/lib/apiClient";
import type { CreateSessionPayload } from "@/shemas/session.shema";

export const SessionsService = {
  async createSession(payload: CreateSessionPayload): Promise<void> {
    console.log("[Sessions] createSession", payload);
    await apiClient.post("/api/sessions", payload);
  },
};
