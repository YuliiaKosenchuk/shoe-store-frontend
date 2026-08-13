import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const editorials = [
  {
    slug: "between-sea-and-silence",
    title: "Between Sea & Silence",
    description:
      "There is a certain freedom in slowing down. Bare skin, warm stone, the sound of the ocean — and nothing more.",
    image: "/images/editorials/sea-6.png",
    alt: "Between Sea & Silence editorial",
    badge: "Season Edit",
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

          <div className="flex gap-6 overflow-x-auto overscroll-x-contain lg:contents">
            {editorials.map(({ slug, title, description, image, alt, badge }) => (
              <Link
                key={slug}
                href={`/editorials/${slug}`}
                className="group block flex-none w-72 lg:w-auto"
              >
                <div className="relative overflow-hidden mb-4 aspect-302/407">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 288px, 25vw"
                  />
                  {badge && (
                    <span
                      className="absolute top-4 left-4 flex w-[86px] h-[37px] items-center justify-center bg-[#010101] text-[14px] font-normal leading-[150%] text-white"
                      style={{ fontFamily: "var(--font-jost)" }}
                    >
                      {badge}
                    </span>
                  )}
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
