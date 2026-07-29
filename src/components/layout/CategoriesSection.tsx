import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const categories = [
  {
    label: "BAGS",
    href: "/bags",
    src: "/images/categories-bags.png",
    alt: "Bags collection",
  },
  {
    label: "SHOES",
    href: "/shoes",
    src: "/images/categories-shoe.png",
    alt: "Shoes collection",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-16">
      <Container>
        <div className="sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map(({ label, href, src, alt }) => (
            <Link key={href} href={href} className="group relative block h-60 sm:h-80 lg:h-94.5 overflow-hidden">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />

              {/* Text overlay */}
              <div className="absolute inset-0 flex flex-col justify-center pl-8 md:pl-16">
                <h2
                  className="text-[#010101]/90 uppercase tracking-wide leading-none text-[28px] sm:text-[36px] font-semibold"
                  style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                >
                  {label}
                </h2>
                <span
                  className="mt-1.5 inline-block relative w-fit text-[#010101]/90 text-[16px] leading-[1.3] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100"
                  style={{ fontFamily: "var(--font-jost)" }}
                >
                  Shop now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
