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
        <div className="px-8 grid grid-cols-4 gap-6 items-start">
          <h2
            className="text-[36px] leading-[1.1] font-semibold tracking-tight text-black"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            Editorials
          </h2>

          {editorials.map(({ slug, title, description, image, alt }) => (
            <Link key={slug} href={`/editorials/${slug}`} className="group block">
              <div className="overflow-hidden mb-4">
                <Image
                  src={image}
                  alt={alt}
                  width={432}
                  height={560}
                  className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <p
                className="text-[16px] leading-[1.3] tracking-widest uppercase font-semibold text-black mb-3"
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
      </Container>
    </section>
  );
}
