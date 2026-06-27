import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function MaterialsSection() {
  return (
    <section className="relative w-full h-82.5">
      <Image
        src="/images/materials-section.png"
        alt="Premium materials"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Text content */}
      <div className="absolute inset-0 flex items-center">
        <Container>
          <div className="px-8" style={{ maxWidth: "calc(297px + 4rem)" }}>
            <h2
              className="text-white text-[32px] sm:text-[40px] lg:text-[36px] leading-[1.3] tracking-tight mb-4"
              style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            >
              The details make the design
            </h2>
            <p
              className="text-white/85 text-[14px] leading-[1.6] mb-6"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              True quality knows no compromise. We select the finest materials
              and pay meticulous attention to every detail to create a product
              that inspires.
            </p>
            <Link
              href="/materials"
              className="inline-flex items-center gap-2 h-12 bg-white text-black text-[26px]leading-[1.2] tracking-widest px-4 transition-opacity hover:opacity-80"
              style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            >
              Discover our materials
              <Image src="/images/arrow-right-hero.svg" alt="" width={24} height={24} aria-hidden />
            </Link>
          </div>
        </Container>
      </div>
    </section>
  );
}
