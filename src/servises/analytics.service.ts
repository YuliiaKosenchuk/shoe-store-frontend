// import { apiClient } from "@/lib/apiClient";
import type { AnalyticsEventPayload, GeoLocation } from "@/shemas/analytics.shema";

// TODO: backend endpoint for analytics events doesn't exist yet — the actual
// POST is commented out below, logging only, until it's available.
// const ANALYTICS_EVENT_ENDPOINT = "/api/analytics/event";

export const AnalyticsService = {
  async getGeo(): Promise<GeoLocation | null> {
    try {
      const response = await fetch("/api/geo");
      if (!response.ok) {
        console.warn("[Analytics] getGeo: /api/geo responded", response.status);
        return null;
      }
      const geo = await response.json();
      console.log("[Analytics] getGeo received:", geo.country);
      return geo;
    } catch (error) {
      console.error("[Analytics] getGeo failed:", error);
      return null;
    }
  },

  async trackEvent(payload: AnalyticsEventPayload): Promise<void> {
    console.log("[Analytics] trackEvent would send:", payload);
    // await apiClient.post(ANALYTICS_EVENT_ENDPOINT, payload);
  },
};
