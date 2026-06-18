import type { Product } from "@/shemas/product.shema";

const LOCAL_IMAGES = [
  "https://res.cloudinary.com/dmavecpcx/image/upload/q_auto/f_auto/v1781784255/1_n5g5tq.png",
  "https://res.cloudinary.com/dmavecpcx/image/upload/q_auto/f_auto/v1781784255/2_ixjf3w.png",
  "https://res.cloudinary.com/dmavecpcx/image/upload/q_auto/f_auto/v1781784254/3_a4nvt2.png",
];

const BASE_PRODUCT: Product = {
  id: 1,
  category: "Heels",
  name: "Marlowe Suede-Look Strappy Heels",
  description: "Elegant strappy heels in suede-look finish",
  price: 3600,
  priceOld: 4500,
  gender: "FEMALE",
  season: "SUMMER",
  material: "SUEDE",
  colors: ["BROWN", "GREEN", "BLACK"],
  sizes: [35, 36, 37, 38, 39, 40, 41, 42],
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
  { name: "Marlowe Suede-Look Strappy Heels", price: 3600, priceOld: 4500, colors: ["BROWN", "GREEN", "BLACK"] },
  { name: "Celeste Open-Toe Mule", price: 2800, priceOld: 0, colors: ["BLACK", "BEIGE"] },
  { name: "Aurelia Ankle-Strap Sandal", price: 4200, priceOld: 5600, colors: ["WHITE", "BROWN"] },
  { name: "Isolde D'Orsay Pump", price: 3100, priceOld: 3100, colors: ["BLACK"] },
  { name: "Vesper Block-Heel Mule", price: 2400, priceOld: 3200, colors: ["BEIGE", "BLACK", "BROWN"] },
  { name: "Orla Kitten-Heel Slingback", price: 3900, priceOld: 0, colors: ["GREEN", "BLACK"] },
  { name: "Cleo Pointed-Toe Flat", price: 1900, priceOld: 2500, colors: ["BLACK", "WHITE"] },
  { name: "Thea Platform Sandal", price: 4800, priceOld: 6000, colors: ["BROWN", "BEIGE"] },
];

export const MOCK_PRODUCTS: Product[] = MOCK_VARIANTS.map((variant, i) => ({
  ...BASE_PRODUCT,
  ...variant,
  id: i + 1,
  priceOld: variant.priceOld ?? 0,
}));
