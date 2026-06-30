import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function SaleSection() {
  return (
    <section className="mb-16">
      <div className="relative w-full overflow-hidden bg-linear-to-b from-[#ECECEC] via-[#EEEEEE] to-[#F4F4F4]">
        <Container className="px-8 flex items-stretch min-h-184">
          {/* Left — text */}
          <div className="flex flex-col justify-center items-center py-16 flex-1">
            <div className="py-12 w-102.5 flex flex-col items-center text-center">
              <p
                className="mb-8 text-[36px] tracking-[20%] uppercase text-black"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                Atelier
              </p>
              <p
                className="text-[26px] tracking-[28%] leading-[1.2] uppercase text-[#343434]/80"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                Summer Sale
              </p>
              <p
                className="text-[200px] leading-[1.2] tracking-tight text-[#7A2633]"
                style={{ fontFamily: "var(--font-cormorant-garamond)" }}
              >
                20% <span className="text-[64px] leading-[1.2] tracking-tight">off</span>
              </p>
              <p
                className="mb-8 text-[26px] tracking-[28%] leading-[1.2] uppercase text-[#343434]/80"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                Selected items
              </p>

              <Link
                href="/sale"
                className="mt-4 w-full py-3.75 text-[14px] font-medium tracking-wide uppercase bg-black text-white hover:bg-gray-900 transition-colors text-center"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Right — image */}
          <div className="relative flex-1 hidden md:block">
            <Image
              src="/images/sale-img.png"
              alt="Summer Sale"
              fill
              className="object-contain object-bottom"
              sizes="50vw"
              priority
            />
          </div>
        </Container>
      </div>
    </section>
  );
}
