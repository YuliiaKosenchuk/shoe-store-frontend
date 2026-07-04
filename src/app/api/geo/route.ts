import { geolocation } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";
import type { GeoLocation } from "@/shemas/analytics.shema";

export function GET(request: NextRequest): NextResponse<GeoLocation> {
  // Note: geolocation().region is the Vercel *compute* region (e.g. "dev1"
  // locally, "iad1" in prod) — not the visitor's location. The visitor's
  // state/province is countryRegion, from the x-vercel-ip-country-region header.
  const { city, country, countryRegion, latitude, longitude } = geolocation(request);
  const geo: GeoLocation = {
    city: city ?? null,
    country: country ?? null,
    region: countryRegion ?? null,
    latitude: latitude ?? null,
    longitude: longitude ?? null,
  };
  console.log("[api/geo] resolved from request headers:", geo);
  return NextResponse.json(geo);
}
