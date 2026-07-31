import Image from "next/image";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";

const reviews = [
  {
    id: 1,
    src: "/images/style-1.png",
    username: "@emmaslife",
    name: "Emma S.",
    rating: 5,
    product: "Leather Slingback Heel",
    text: "These heels are everything I dreamed of. The leather quality is outstanding — they feel like they were made specifically for my feet. Wore them to a gallery opening and received compliments all evening.",
  },
  {
    id: 2,
    src: "/images/style-2.png",
    username: "@styledbynico",
    name: "Nicole V.",
    rating: 5,
    product: "Suede Chelsea Boot",
    text: "I've been searching for the perfect Chelsea boot for years and these are it. The suede is incredibly soft yet durable. Paired them with everything from tailored trousers to weekend denim.",
  },
  {
    id: 3,
    src: "/images/style-3.png",
    username: "@foxy",
    name: "Sophia F.",
    rating: 5,
    product: "Strappy Sandal in Nude",
    text: "Elegant, comfortable, and utterly timeless. I wore these all day at a summer wedding without a single blister. The nude tone goes with absolutely everything in my wardrobe.",
  },
  {
    id: 4,
    src: "/images/style-4.png",
    username: "@emmaslife",
    name: "Emma S.",
    rating: 4,
    product: "Classic Mule in Black",
    text: "The craftsmanship on these mules is exceptional. The heel height is perfect for walking around the city. My only note is that the sizing runs slightly narrow — I'd recommend going half a size up.",
  },
  {
    id: 5,
    src: "/images/style-5.png",
    username: "@styledbynico",
    name: "Nicole V.",
    rating: 5,
    product: "Structured Tote Bag",
    text: "Not a shoe, but I couldn't resist styling it here! This tote is the perfect companion to any ATELIER MODE look. The leather ages beautifully and the interior is surprisingly spacious.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          strokeWidth={1.5}
          className={i < rating ? "fill-black text-black" : "text-black/20"}
        />
      ))}
    </div>
  );
}

export default function CommunityPage() {
  return (
    <main className="py-16">
      <Container>
        <div className="px-4 md:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1
              className="text-[48px] leading-[1.05] tracking-tight text-black mb-4"
              style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            >
              Show how you style it
            </h1>
            <p
              className="text-[14px] leading-normal text-[#343434]/70 max-w-[520px]"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              Our community in ATELIER MODE. Tag{" "}
              <span className="text-black font-medium">@ateliermode</span> on
              Instagram for a chance to be featured here.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <article key={review.id} className="flex flex-col">
                {/* Photo */}
                <div className="relative overflow-hidden mb-4" style={{ aspectRatio: "3/4" }}>
                  <Image
                    src={review.src}
                    alt={`Style photo by ${review.username}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Instagram badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black shrink-0" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                    </svg>
                    <span
                      className="text-[12px] text-black leading-none"
                      style={{ fontFamily: "var(--font-jost)" }}
                    >
                      {review.username}
                    </span>
                  </div>
                </div>

                {/* Review content */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <StarRating rating={review.rating} />
                    <span
                      className="text-[12px] uppercase tracking-widest text-[#343434]/50"
                      style={{ fontFamily: "var(--font-jost)" }}
                    >
                      Verified
                    </span>
                  </div>

                  <p
                    className="text-[13px] uppercase tracking-widest text-black font-medium"
                    style={{ fontFamily: "var(--font-jost)" }}
                  >
                    {review.product}
                  </p>

                  <p
                    className="text-[14px] leading-relaxed text-[#343434]/80"
                    style={{ fontFamily: "var(--font-jost)" }}
                  >
                    &ldquo;{review.text}&rdquo;
                  </p>

                  <p
                    className="text-[13px] text-black/50 mt-1"
                    style={{ fontFamily: "var(--font-jost)" }}
                  >
                    — {review.name}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
