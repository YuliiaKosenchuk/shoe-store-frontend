export interface CartItemDto {
  id: number;
  name: string;
  price: number;
  priceOld: number;
  color: string;
  size: string;
  quantity: number;
  subtotal: number;
  imageUrl: string;
}

export interface CartResponseDto {
  cartId: number;
  productsCount: number;
  cartSubtotal: number;
  cartItems: CartItemDto[];
}

export interface AddCartItemPayload {
  productVariantId: number;
  quantity: number;
  cartId?: number | null;
}

export interface UpdateCartItemPayload {
  quantity: number;
}
