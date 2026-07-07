"use client";

import { useEffect } from "react";
import { useAnalytics, getGeoOnce } from "@/hooks/useAnalytics";
import { SessionsService } from "@/servises/sessions.service";
import { getCookie, setSessionCookie } from "@/lib/cookies";

// Session cookie (not sessionStorage) so the flag is shared across every
// tab/window of the browser, not just the one that set it, and is cleared
// once the browser is fully closed.
const SESSION_TRACKED_KEY = "session_tracked";

// Only the origin, not the full referrer URL — the path/query can carry
// search terms, campaign params, or tokens from the referring site that we
// don't want to store.
function getReferrerOrigin(): string | null {
  if (!document.referrer) return null;
  try {
    return new URL(document.referrer).origin;
  } catch {
    return null;
  }
}

// Fires once per real entry (fresh page load / new tab) — layout doesn't
// remount on client-side navigation, so this won't refire per page view.
export function AnalyticsBootstrap() {
  const { track } = useAnalytics();

  useEffect(() => {
    console.log("[AnalyticsBootstrap] entry detected, tracking session_start");
    track("session_start");
  }, [track]);

  // Reports the visit to the backend exactly once per browser session.
  useEffect(() => {
    if (getCookie(SESSION_TRACKED_KEY)) {
      console.log("[AnalyticsBootstrap] session already tracked, skipping createSession");
      return;
    }
    setSessionCookie(SESSION_TRACKED_KEY, "true");

    (async () => {
      try {
        const geo = await getGeoOnce();
        console.log("[AnalyticsBootstrap] geo received for session (countryCode):", geo?.country);

        const payload = {
          referrer: getReferrerOrigin(),
          countryCode: geo?.country ?? null,
        };
        console.log("[AnalyticsBootstrap] sending createSession payload:", payload);

        await SessionsService.createSession(payload);
        console.log("[AnalyticsBootstrap] createSession succeeded");
      } catch (error) {
        console.error("[AnalyticsBootstrap] createSession failed:", error);
      }
    })();
  }, []);

  return null;
}
