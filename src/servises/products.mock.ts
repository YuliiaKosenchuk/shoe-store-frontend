import type { Product, ProductSize } from "@/shemas/product.shema";

const LOCAL_IMAGES = [
  "https://res.cloudinary.com/dmavecpcx/image/upload/q_auto/f_auto/v1781784255/1_n5g5tq.png",
  "https://res.cloudinary.com/dmavecpcx/image/upload/q_auto/f_auto/v1781784255/2_ixjf3w.png",
  "https://res.cloudinary.com/dmavecpcx/image/upload/q_auto/f_auto/v1781784254/3_a4nvt2.png",
];

const BASE_PRODUCT: Product = {
  id: 1,
  category: "shoes",
  name: "Marlowe Suede-Look Strappy Heels",
  description: "Elegant strappy heels in suede-look finish",
  price: 3600,
  priceOld: 4500,
  gender: "FEMALE",
  season: "SUMMER",
  material: "SUEDE",
  colors: ["BROWN", "GREEN", "BLACK"],
  sizes: [
    { size: 35, stock: 6, available: true },
    { size: 36, stock: 2, available: true },
    { size: 37, stock: 8, available: true },
    { size: 38, stock: 1, available: true },
    { size: 39, stock: 4, available: true },
    { size: 40, stock: 0, available: false },
    { size: 41, stock: 0, available: false },
    { size: 42, stock: 3, available: true },
  ] satisfies ProductSize[],
  createdAt: "2026-06-17T00:00:00.000Z",
  images: [
    {
      color: "BROWN",
      mainUrl: LOCAL_IMAGES[0],
      urls: LOCAL_IMAGES,
    },
  ],
};

const MOCK_VARIANTS: Partial<Product>[] = [
  { category: "shoes", name: "Marlowe Suede-Look Strappy Heels", price: 3600, priceOld: 4500, colors: ["BROWN", "GREEN", "BLACK"] },
  { category: "shoes", name: "Celeste Open-Toe Mule", price: 2800, priceOld: 0, colors: ["BLACK", "BEIGE"] },
  { category: "shoes", name: "Aurelia Ankle-Strap Sandal", price: 4200, priceOld: 5600, colors: ["WHITE", "BROWN"] },
  { category: "shoes", name: "Isolde D'Orsay Pump", price: 3100, priceOld: 3100, colors: ["BLACK"] },
  { category: "bags", name: "Vesper Structured Tote", price: 2400, priceOld: 3200, colors: ["BEIGE", "BLACK", "BROWN"] },
  { category: "bags", name: "Orla Mini Crossbody", price: 3900, priceOld: 0, colors: ["GREEN", "BLACK"] },
  { category: "accessories", name: "Cleo Leather Belt", price: 1900, priceOld: 2500, colors: ["BLACK", "WHITE"] },
  { category: "accessories", name: "Thea Silk Scarf", price: 4800, priceOld: 6000, colors: ["BROWN", "BEIGE"] },
];

export const MOCK_PRODUCTS: Product[] = MOCK_VARIANTS.map((variant, i) => ({
  ...BASE_PRODUCT,
  ...variant,
  id: i + 1,
  priceOld: variant.priceOld ?? 0,
}));

export function getMockProduct(id: number): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === id);
}
