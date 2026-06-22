export interface ProductImage {
  id?: number;
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
  variants?: ProductVariantDto[];
}

export interface ProductDto {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  priceOld: number;
  gender: string;
  season: string;
  material: string;
  createdAt: string;
}

export interface ProductVariantDto {
  id: number;
  productId: number;
  size: number;
  color: string;
  stockQty: number;
  sku: string;
}

export interface ProductImageDto {
  id: number;
  productId: number;
  color: string;
  mainUrl: string;
  urls: string[];
}
