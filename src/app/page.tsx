import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import Hero from "@/components/layout/Hero";

const categories = [
  {
    label: "New Arrivals",
    href: "/new-arrivals",
    src: "/images/new-arrivals.jpg",
  },
  { label: "Shoes", href: "/shoes", src: "/images/shoes.jpg" },
  { label: "Bags", href: "/bags", src: "/images/bags.jpg" },
  {
    label: "Accessories",
    href: "/accessories",
    src: "/images/accessories.jpg",
  },
];

export default function Home() {
  return (
    <main>
      <div className="pb-18">
        {/* <Hero /> */}
      </div>
      <Container>
        <div className="px-8 grid grid-cols-1 sm:grid-cols-2">
          {categories.map(({ label, href, src }) => (
            <Link key={href} href={href} className="group block">
              <div className="overflow-hidden">
                <Image
                  src={src}
                  alt={label}
                  width={720}
                  height={905}
                  className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <p className="pt-3.75 pb-10.5 text-center text-black uppercase [font-family:var(--font-jost)] text-[14px] leading-[1.3]">
                {label}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
