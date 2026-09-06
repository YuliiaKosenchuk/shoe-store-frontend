import { UnoptimizedImage as Image } from "@/components/ui/UnoptimizedImage";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

// 0% = show left edge fully, 100% = show right edge fully, 50% = center
const IMAGE_CROP_POSITION_X = "75%";

export default function MaterialsSection() {
  return (
    <section className="relative w-full h-130.5 md:h-82.5">
      <Image
        src="/images/materials-section.png"
        alt="Premium materials"
        fill
        className="object-cover"
        style={{ objectPosition: `${IMAGE_CROP_POSITION_X} center` }}
        sizes="100vw"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Text content */}
      <div className="absolute inset-0 flex items-end pb-4 lg:items-center lg:pb-0">
        <Container>
          <div className="px-4 md:px-8" style={{ maxWidth: "calc(297px + 4rem)" }}>
            <h2
              className="md:max-w-60.75 text-white text-[22px] md:text-[26px] leading-[1.2] tracking-tight mb-4"
              style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            >
              The details make the design
            </h2>
            <p
              className="text-white/85 text-[16px] leading-[1.3] mb-6"
              style={{ fontFamily: "var(--font-jost)" }}
            >
              True quality knows no compromise. We select the finest materials
              and pay meticulous attention to every detail to create a product
              that inspires.
            </p>
            <Link
              href="/materials"
              className="inline-flex items-center gap-2 h-12 bg-white text-[#010101]/90 text-[26px] font-semibold leading-[1.2] p-4 transition-opacity hover:opacity-80"
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
