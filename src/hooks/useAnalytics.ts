"use client";

import { useCallback } from "react";
import { AnalyticsService } from "@/servises/analytics.service";
import type { GeoLocation } from "@/shemas/analytics.shema";

// Geo is IP-based and identical for every event in a tab, so it's fetched
// once and reused rather than hitting /api/geo per tracked event.
let geoPromise: Promise<GeoLocation | null> | null = null;

export function getGeoOnce(): Promise<GeoLocation | null> {
  if (!geoPromise) {
    geoPromise = AnalyticsService.getGeo();
  }
  return geoPromise;
}

export function useAnalytics() {
  const track = useCallback(async (name: string, data?: Record<string, unknown>) => {
    console.log("[useAnalytics] track called:", name, data);
    const geo = await getGeoOnce();
    const payload = {
      name,
      occurredAt: new Date().toISOString(),
      geo,
      data,
    };
    console.log("[useAnalytics] sending event:", { ...payload, geo: geo?.country });
    try {
      await AnalyticsService.trackEvent(payload);
    } catch (error) {
      console.error("[Analytics] track failed:", error);
    }
  }, []);

  return { track };
}
