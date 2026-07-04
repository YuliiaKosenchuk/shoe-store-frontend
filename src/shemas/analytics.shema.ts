export interface GeoLocation {
  city: string | null;
  country: string | null;
  region: string | null;
  latitude: string | null;
  longitude: string | null;
}

export interface AnalyticsEventPayload {
  name: string;
  occurredAt: string;
  geo: GeoLocation | null;
  data?: Record<string, unknown>;
}
