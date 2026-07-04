"use client";

import { useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";

// Fires once per real entry (fresh page load / new tab) — layout doesn't
// remount on client-side navigation, so this won't refire per page view.
export function AnalyticsBootstrap() {
  const { track } = useAnalytics();

  useEffect(() => {
    console.log("[AnalyticsBootstrap] entry detected, tracking session_start");
    track("session_start");
  }, [track]);

  return null;
}
