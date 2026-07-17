import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const editorials = [
  {
    slug: "the-modern-icon",
    title: "The Modern Icon",
    description:
      "Spring emerges with quiet confidence, marking a graceful transition into a season of lightness, movement, and renewed elegance.",
    image: "/images/editorials-1.jpg",
    alt: "The Modern Icon editorial",
  },
  {
    slug: "atelier-evora",
    title: "Atelier & Évora",
    description:
      "A journey through southern light and heritage craft, where traditional artisanship meets the refined silhouette of the modern wardrobe.",
    image: "/images/editorials-2.jpg",
    alt: "Atelier & Évora editorial",
  },
  {
    slug: "silent-steps",
    title: "Silent Steps",
    description:
      "Minimal forms, considered materials, and an unhurried pace — a meditation on what it means to move through the world with intention.",
    image: "/images/editorials-3.jpg",
    alt: "Silent Steps editorial",
  },
];

export default function EditorialsSection() {
  return (
    <section className="py-16">
      <Container>
        <div className="px-4 md:px-8 lg:grid lg:grid-cols-4 lg:gap-6 lg:items-start">
          <h2
            className="text-[28px] md:text-[36px] leading-[1.1] font-semibold tracking-tight text-black mb-8 lg:mb-0"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            Editorials
          </h2>

          <div className="flex gap-6 overflow-x-auto lg:contents">
            {editorials.map(({ slug, title, description, image, alt }) => (
              <Link
                key={slug}
                href={`/editorials/${slug}`}
                className="group block flex-none w-72 lg:w-auto"
              >
                <div className="overflow-hidden mb-4">
                  <Image
                    src={image}
                    alt={alt}
                    width={432}
                    height={560}
                    className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 288px, 25vw"
                  />
                </div>
                <p
                  className="text-[16px] leading-[1.3] tracking-widest uppercase font-medium text-black/90 mb-4"
                  style={{ fontFamily: "var(--font-jost)" }}
                >
                  {title}
                </p>
                <p
                  className="text-[14px] leading-normal text-[#343434]/80"
                  style={{ fontFamily: "var(--font-jost)" }}
                >
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
