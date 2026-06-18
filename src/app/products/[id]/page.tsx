"use client";

import { use, useState } from "react";
import { getMockProduct } from "@/servises/products.mock";
import type { ProductSize } from "@/shemas/product.shema";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { useWishlistStore } from "@/store/wishlist.store";
import { ProductImageGallery } from "./_components/ProductImageGallery";
import { ColorSelector } from "./_components/ColorSelector";
import { SizeSelector } from "./_components/SizeSelector";
import { ProductAccordion } from "./_components/ProductAccordion";
import { Container } from "@/components/ui/Container";

// --- Backend imports (uncomment when API is ready) ---
// import { useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { ProductsService } from "@/servises/products.service";

const DEFAULT_SIZES: ProductSize[] = [
  { size: 35, stock: 5, available: true },
  { size: 36, stock: 5, available: true },
  { size: 37, stock: 5, available: true },
  { size: 38, stock: 5, available: true },
  { size: 39, stock: 5, available: true },
  { size: 40, stock: 5, available: true },
  { size: 41, stock: 5, available: true },
  { size: 42, stock: 5, available: true },
];

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);

  // selectedColor is empty string until the user picks one;
  // effectiveColor falls back to the product's first image color
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [inBag, setInBag] = useState(false);
  const { hasHydrated, items: wishlistItems } = useWishlistStore();

  // --- Backend data fetching (uncomment when API is ready, remove mock block below) ---
  // const { data: product, isPending, isError } = useQuery({
  //   queryKey: ["product", id, selectedColor, selectedSize],
  //   queryFn: () =>
  //     ProductsService.getProduct(
  //       Number(id),
  //       selectedColor || undefined,
  //       selectedSize ? String(selectedSize) : undefined,
  //     ),
  // });
  //
  // // Initialise selectedColor from the first API response
  // useEffect(() => {
  //   if (product && !selectedColor) {
  //     setSelectedColor(product.images[0]?.color ?? product.colors[0] ?? "");
  //   }
  // }, [product, selectedColor]);
  //
  // if (isPending) {
  //   return (
  //     <div className="flex items-center justify-center min-h-[60vh]">
  //       <p className="font-(family-name:--font-jost) text-[#818181] text-sm tracking-widest uppercase">
  //         Loading...
  //       </p>
  //     </div>
  //   );
  // }
  //
  // if (isError || !product) {
  //   return (
  //     <div className="flex items-center justify-center min-h-[60vh]">
  //       <p className="font-(family-name:--font-jost) text-[#818181] text-sm tracking-widest uppercase">
  //         Product not found
  //       </p>
  //     </div>
  //   );
  // }

  // --- Mock (remove once backend is ready) ---
  const product = getMockProduct(Number(id));

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="font-(family-name:--font-jost) text-[#818181] text-sm tracking-widest uppercase">
          Product not found
        </p>
      </div>
    );
  }

  const wishlisted = hasHydrated && wishlistItems.some((p) => p.id === product.id);

  const effectiveColor =
    selectedColor || product.images[0]?.color || product.colors[0] || "";

  const activeImage =
    product.images.find((img) => img.color === effectiveColor) ?? product.images[0];
  const galleryImages = activeImage?.urls?.length
    ? activeImage.urls
    : activeImage?.mainUrl
    ? [activeImage.mainUrl]
    : [];

  const discount =
    product.priceOld > 0 && product.priceOld > product.price
      ? Math.round((1 - product.price / product.priceOld) * 100)
      : null;

  const sizes = product.sizes ?? DEFAULT_SIZES;

  const accordionSections = [
    { title: "Description", content: product.description },
    {
      title: "Product Details",
      content: `Material: ${product.material}  •  Season: ${product.season}  •  Gender: ${product.gender}`,
    },
    {
      title: "Size guide",
      content:
        "Our shoes are sized in European measurements. If you are between sizes, we recommend sizing up for a more comfortable fit.",
    },
    {
      title: "Shipping & Returns",
      content:
        "Free delivery on orders over 150 EUR. Returns accepted within 30 days of delivery. Items must be unworn and in original packaging.",
    },
  ];

  return (
    <Container className="grid grid-cols-1 lg:grid-cols-[628fr_517fr] gap-0 lg:gap-[clamp(40px,11vw,133px)] px-4 lg:px-8 py-6 lg:py-10">
      {/* Image gallery */}
      <div>
        <ProductImageGallery images={galleryImages} productName={product.name} />
      </div>

      {/* Product info panel */}
      <div className="lg:sticky lg:top-8 lg:self-start space-y-6 pt-6 lg:pt-0">
        {/* Name & price */}
        <div className="">
          <h1 className="mb-6 font-(family-name:--font-cormorant-garamond) text-4xl font-semibold leading-[1.1] text-black">
            {product.name}
          </h1>
          <div className="mb-6 flex items-center gap-3">
            <span className="font-(family-name:--font-jost) text-[20px] font-medium">
              ₴{product.price.toLocaleString()}
            </span>
            {discount !== null && (
              <>
                <span className="font-(family-name:--font-jost) text-base font-normal text-[#818181] line-through">
                  ₴{product.priceOld.toLocaleString()}
                </span>
                <span className="font-(family-name:--font-jost) text-base font-normal text-[#DF4441]">
                  -{discount}%
                </span>
              </>
            )}
          </div>
        </div>

        {/* Color selector */}
        {product.images.length > 0 && (
          <ColorSelector
            images={product.images}
            selectedColor={effectiveColor}
            onChange={setSelectedColor}
          />
        )}

        {/* Size selector */}
        <SizeSelector
          sizes={sizes}
          selectedSize={selectedSize}
          onChange={(size) => setSelectedSize(size === selectedSize ? null : size)}
        />

        {/* Add to bag + wishlist */}
        <div className="mb-2 flex gap-px">
          <button
            className={`flex-1 flex items-center justify-center gap-3 h-13 text-white font-(family-name:--font-jost) text-sm tracking-widest uppercase transition-colors duration-200 ${
              inBag ? "bg-[#7A2633]" : "bg-[#010101] hover:bg-[#7A2633]"
            }`}
            onClick={() => setInBag(true)}
          >
            {inBag ? "In Bag" : "Add to Bag"}
          </button>
          <div
            className={`w-13 h-13 flex items-center justify-center border transition-colors duration-200 ${
              wishlisted
                ? "bg-[#7A2633]"
                : "bg-[#010101] hover:bg-[#7A2633]"
            }`}
          >
            <WishlistButton
              product={product}
              activeIconClass="text-white fill-white"
              defaultIconClass="text-white"
            />
          </div>
        </div>

        {/* Stock / shipping info */}
        <div className=" mb-2.75 flex items-center justify-between text-[14px] font-(family-name:--font-jost) text-[#010101]">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400" />
            Low stock
          </span>
          <span>Free delivery on orders over 150 EUR</span>
        </div>

        {/* Accordion */}
        <ProductAccordion sections={accordionSections} />
      </div>
    </Container>
  );
}
