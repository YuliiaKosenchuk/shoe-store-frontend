"use client";

import { use, useLayoutEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ProductsService } from "@/servises/products.service";
// import { getMockProduct } from "@/servises/products.mock";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { useWishlistStore } from "@/store/wishlist.store";
import { useBreadcrumbStore } from "@/store/breadcrumb.store";
import { ProductImageGallery } from "./_components/ProductImageGallery";
import { ColorSelector } from "./_components/ColorSelector";
import { SizeSelector } from "./_components/SizeSelector";
import { ProductAccordion } from "./_components/ProductAccordion";
import { Container } from "@/components/ui/Container";


interface ProductPageProps {
  params: Promise<{ category: string; id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const colorFromUrl = searchParams.get("color") ?? "";

  const [userColor, setUserColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [inBag, setInBag] = useState(false);
  const { hasHydrated, items: wishlistItems } = useWishlistStore();
  const { setPageTitle, clearPageTitle } = useBreadcrumbStore();

  // Fetch all images separately — avoids the backend JOIN bug on GET /api/products/:id (no params)
  const { data: allImages = [], isError: imagesError } = useQuery({
    queryKey: ["product-images", id],
    queryFn: () => ProductsService.getImages(Number(id)),
  });

  const { data: variants = [] } = useQuery({
    queryKey: ["product-variants", id],
    queryFn: () => ProductsService.getVariants(Number(id)),
  });

  // Derive selectedColor without an effect: user pick → URL param → first image color
  const selectedColor = userColor ?? (colorFromUrl || (allImages[0]?.color ?? ""));

  // Fetch product with a color param — uses a different backend code path that avoids the bug
  const { data: product, isError: productError } = useQuery({
    queryKey: ["product", id, selectedColor, selectedSize],
    queryFn: () =>
      ProductsService.getProduct(
        Number(id),
        selectedColor || undefined,
        selectedSize ? String(selectedSize) : undefined,
      ),
    enabled: !!selectedColor,
  });

  useLayoutEffect(() => {
    if (product) {
      setPageTitle(product.name);
      return () => clearPageTitle();
    }
  }, [product?.name, setPageTitle, clearPageTitle]);

  // --- Mock (comment in if backend is unavailable) ---
  // const product = getMockProduct(Number(id));

  if (!product) {
    if (imagesError || productError) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="font-(family-name:--font-jost) text-[#818181] text-sm tracking-widest uppercase">
            Product not found
          </p>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="font-(family-name:--font-jost) text-[#818181] text-sm tracking-widest uppercase">
          Loading...
        </p>
      </div>
    );
  }

  const wishlisted = hasHydrated && wishlistItems.some((p) => p.id === product.id);

  // Deduplicate images by color (guards against duplicate DB entries)
  const uniqueImages = allImages.filter(
    (img, idx, arr) => arr.findIndex((i) => i.color === img.color) === idx,
  );

  const effectiveColor = selectedColor || uniqueImages[0]?.color || "";

  const activeImage =
    uniqueImages.find((img) => img.color === effectiveColor) ?? uniqueImages[0];
  const galleryImages = activeImage?.urls?.length
    ? activeImage.urls
    : activeImage?.mainUrl
    ? [activeImage.mainUrl]
    : [];

  const discount =
    product.priceOld > 0 && product.priceOld > product.price
      ? Math.round((1 - product.price / product.priceOld) * 100)
      : null;

  const sizes = variants
    .filter((v) => v.color === effectiveColor)
    .map((v) => ({ size: Number(v.size), stock: v.stockQty, available: v.stockQty > 0 }));

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
        {uniqueImages.length > 0 && (
          <ColorSelector
            images={uniqueImages}
            selectedColor={effectiveColor}
            onChange={setUserColor}
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
