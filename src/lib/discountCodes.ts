export const DISCOUNT_CODES: Record<string, number> = {
  ATELIER25: 5,
  WELCOME10: 10,
};

export function getDiscountPercent(code: string): number | null {
  return DISCOUNT_CODES[code.trim().toUpperCase()] ?? null;
}
