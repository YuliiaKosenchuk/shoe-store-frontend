import { NextRequest, NextResponse } from "next/server";
import type { ServicePoint } from "@/shemas/checkout.shema";

const SENDCLOUD_SERVICE_POINTS_URL =
  "https://panel.sendcloud.sc/api/v3/service-points";

interface SendcloudServicePoint {
  id: number;
  name: string;
  carrier: { code: string; name: string; logo_url: string };
  address: {
    street: string;
    house_number: string;
    postal_code: string;
    city: string;
    country_code: string;
  };
  distance: number | null;
  general_shop_type: string;
}

interface SendcloudServicePointsResponse {
  data: { results: SendcloudServicePoint[] };
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const apiKey = process.env.SENDCLOUD_API_KEY;
  const apiSecret = process.env.SENDCLOUD_API_SECRET;

  if (!apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "SENDCLOUD_NOT_CONFIGURED" },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const countryCode = searchParams.get("countryCode");
  const carrier = searchParams.get("carrier");

  if (!countryCode || !carrier) {
    return NextResponse.json(
      { error: "MISSING_PARAMS" },
      { status: 400 }
    );
  }

  const upstreamParams = new URLSearchParams({
    country_code: countryCode,
    limit: "20",
  });
  upstreamParams.append("carrier_code", carrier);

  const postalCode = searchParams.get("postalCode");
  const city = searchParams.get("city");
  const street = searchParams.get("street");
  const houseNumber = searchParams.get("houseNumber");
  if (postalCode) upstreamParams.set("address_postal_code", postalCode);
  if (city) upstreamParams.set("address_city", city);
  if (street) upstreamParams.set("address_street", street);
  if (houseNumber) upstreamParams.set("address_house_number", houseNumber);

  const authHeader = `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`;

  let upstreamResponse: Response;
  try {
    upstreamResponse = await fetch(
      `${SENDCLOUD_SERVICE_POINTS_URL}?${upstreamParams.toString()}`,
      { headers: { Authorization: authHeader } }
    );
  } catch (error) {
    console.error("[api/service-points] Sendcloud request failed:", error);
    return NextResponse.json({ error: "UPSTREAM_UNREACHABLE" }, { status: 502 });
  }

  if (!upstreamResponse.ok) {
    console.error(
      "[api/service-points] Sendcloud responded with",
      upstreamResponse.status
    );
    return NextResponse.json(
      { error: "UPSTREAM_ERROR" },
      { status: 502 }
    );
  }

  const body: SendcloudServicePointsResponse = await upstreamResponse.json();
  const servicePoints: ServicePoint[] = body.data.results.map((sp) => ({
    id: sp.id,
    name: sp.name,
    carrierCode: sp.carrier.code,
    carrierName: sp.carrier.name,
    carrierLogoUrl: sp.carrier.logo_url,
    street: sp.address.street,
    houseNumber: sp.address.house_number,
    postalCode: sp.address.postal_code,
    city: sp.address.city,
    countryCode: sp.address.country_code,
    distance: sp.distance,
    generalShopType: sp.general_shop_type,
  }));

  return NextResponse.json({ results: servicePoints });
}
