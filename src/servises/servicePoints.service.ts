import type { ServicePoint } from "@/shemas/checkout.shema";

export interface ServicePointSearchParams {
  countryCode: string;
  carrier: "dhl" | "dpd";
  postalCode?: string;
  city?: string;
  street?: string;
  houseNumber?: string;
}

export class ServicePointsNotConfiguredError extends Error {
  constructor() {
    super("Sendcloud is not configured");
    this.name = "ServicePointsNotConfiguredError";
  }
}

export const ServicePointsService = {
  async search(params: ServicePointSearchParams): Promise<ServicePoint[]> {
    const query = new URLSearchParams();
    query.set("countryCode", params.countryCode);
    query.set("carrier", params.carrier);
    if (params.postalCode) query.set("postalCode", params.postalCode);
    if (params.city) query.set("city", params.city);
    if (params.street) query.set("street", params.street);
    if (params.houseNumber) query.set("houseNumber", params.houseNumber);

    const response = await fetch(`/api/service-points?${query.toString()}`);

    if (response.status === 503) {
      throw new ServicePointsNotConfiguredError();
    }
    if (!response.ok) {
      throw new Error("Failed to search service points");
    }

    const body: { results: ServicePoint[] } = await response.json();
    return body.results;
  },
};
