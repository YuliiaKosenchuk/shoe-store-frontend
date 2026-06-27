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
        <div className="px-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map(({ label, href, src, alt }) => (
            <div key={href} className="group relative h-60 sm:h-80 lg:h-94.5 overflow-hidden">
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
                  className="text-black uppercase tracking-wide leading-none text-[28px] md:text-[3.5vw] lg:text-[36px] font-semibold"
                  style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                >
                  {label}
                </h2>
                <Link
                  href={href}
                  className="mt-2 inline-block text-black text-[16px] leading-[1.3] underline underline-offset-4 transition-opacity hover:opacity-60"
                  style={{ fontFamily: "var(--font-jost)" }}
                >
                  Shop now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
