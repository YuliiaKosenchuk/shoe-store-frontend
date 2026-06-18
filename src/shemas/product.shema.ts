export interface ProductImage {
  color: string;
  mainUrl: string;
  urls: string[];
}

export interface ProductSize {
  size: number;
  stock: number;
  available: boolean;
}

export interface Product {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  priceOld: number;
  gender: string;
  season: string;
  material: string;
  colors: string[];
  sizes?: ProductSize[];
  createdAt: string;
  images: ProductImage[];
}
