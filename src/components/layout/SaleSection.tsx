import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function SaleSection() {
  return (
    <section className="mb-16">
      <div className="relative w-full overflow-hidden bg-linear-to-b from-[#ECECEC] via-[#EEEEEE] to-[#F4F4F4]">
        <Container className="flex flex-col items-center gap-0 md:flex-row md:items-stretch md:gap-0 md:h-72.5 lg:h-143.25 lg:gap-25 lg:px-8 xl:gap-0 xl:px-0">
          {/* Left — text */}
          <div className="flex flex-col justify-center items-center py-12 md:py-16 flex-1 h-110.5 md:h-auto">
            <div className="md:py-7 w-89.5 lg:py-12 lg:w-102.5 flex flex-col items-center text-center">
              <p
                className="mb-7 lg:mb-8 text-[24px] md:text-[18px] lg:text-[36px] tracking-[20%] uppercase text-black"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                Atelier
              </p>
              <p
                className="text-[20px] md:text-[13px] lg:text-[26px] tracking-[28%] leading-[1.2] uppercase text-[#343434]/80"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                Summer Sale
              </p>
              <p
                className="text-[152px] md:text-[84px] lg:text-[200px] leading-[1.2] tracking-tight text-[#7A2633]"
                style={{ fontFamily: "var(--font-cormorant-garamond)" }}
              >
                20% <span className="text-[48px] md:text-[32px] lg:text-[64px] leading-[1.2] tracking-tight">off</span>
              </p>
              <p
                className="mb-7 lg:mb-8 text-[20px] md:text-[13px] lg:text-[26px] tracking-[28%] leading-[1.2] uppercase text-[#343434]/80"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                Selected items
              </p>

              <Link
                href="/sale"
                className="md:mt-4 w-full py-3.75 md:py-2 lg:py-3.75 text-[14px] md:text-[7px] lg:text-[14px] font-medium tracking-wide uppercase bg-[#010101] text-white hover:bg-[#2C2C2C] transition-colors text-center"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Right — image */}
          <div className="relative w-full h-110.5 md:h-auto md:flex-1 lg:flex-none xl:w-179">
            <Image
              src="/images/sale-img.png"
              alt="Summer Sale"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 716px, 50vw"
              priority
            />
          </div>
        </Container>
      </div>
    </section>
  );
}
