// Order items come back from the backend with imageUrl: null (unlike cart
// items, which do have it) — see /api/orders response. This caches the
// image for each name+color+size combo while it's still available on the
// cart, so the confirmation page can show it after the cart is cleared.
const STORAGE_KEY = "orderItemImages";

type ImageMap = Record<string, string>;

function makeKey(name: string, color: string, size: string): string {
  return `${name}::${color}::${size}`.toLowerCase();
}

function readMap(): ImageMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function saveOrderItemImages(
  items: { name: string; color: string; size: string; imageUrl: string }[]
): void {
  if (typeof window === "undefined") return;
  const map = readMap();
  for (const item of items) {
    if (item.imageUrl) map[makeKey(item.name, item.color, item.size)] = item.imageUrl;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function getOrderItemImage(name: string, color: string, size: string): string | undefined {
  return readMap()[makeKey(name, color, size)];
}
