export interface CreateSessionPayload {
  referrer: string | null;
  // Format matches GeoLocation.country (ISO 3166-1 alpha-2, from Vercel's
  // x-vercel-ip-country header) — only the country, no city/region/coords.
  country: string | null;
}
