import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const displayImages = images.length > 0 ? images : [];

  if (displayImages.length === 0) return null;

  if (displayImages.length === 1) {
    return (
      <div className="relative w-full aspect-[3/4] bg-[#F8F8F8]">
        <Image
          src={displayImages[0]}
          alt={productName}
          fill
          className="object-cover"
          priority
          sizes="55vw"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {displayImages.map((url, i) => (
        <div key={i} className="relative aspect-3/4 bg-[#F8F8F8]">
          <Image
            src={url}
            alt={`${productName} — view ${i + 1}`}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="28vw"
          />
        </div>
      ))}
    </div>
  );
}
