const COUNTRY_NAME_TO_ISO2: Record<string, string> = {
  poland: "PL",
  polska: "PL",
  ukraine: "UA",
  ukraina: "UA",
  україна: "UA",
  germany: "DE",
  deutschland: "DE",
  netherlands: "NL",
  holland: "NL",
  belgium: "BE",
  france: "FR",
  austria: "AT",
  "czech republic": "CZ",
  czechia: "CZ",
  slovakia: "SK",
  spain: "ES",
  italy: "IT",
  croatia: "HR",
  hrvatska: "HR",
  "united kingdom": "GB",
  uk: "GB",
};

export function resolveCountryCode(input: string): string | null {
  const normalized = input.trim().toLowerCase();
  if (!normalized) return null;
  if (/^[a-z]{2}$/.test(normalized)) return normalized.toUpperCase();
  return COUNTRY_NAME_TO_ISO2[normalized] ?? null;
}
