import { UnoptimizedImage as Image } from "@/components/ui/UnoptimizedImage";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main className="flex flex-col">
      <Container className="flex gap-8 flex-col px-4 md:px-8">
        <div className="relative flex items-start justify-center overflow-hidden h-[clamp(64px,min(17.6vh,28vw),480px)] lg:h-120">
          <h1 className="mt-[-0.25em] font-(family-name:--font-cormorant-garamond) text-[clamp(80px,min(22vh,35vw),600px)] font-semibold leading-none text-[#CDCDCD] lg:text-[600px]">
            404
          </h1>
          <Image
            src="/images/404.png"
            alt="Bag"
            width={375}
            height={430}
            priority
            className="absolute top-1/2 left-1/2 h-[min(15vh,28vw)] max-h-86 w-auto -translate-x-1/2 translate-y-[-50%] lg:h-107.5"
          />
        </div>

        <div className="pb-10 text-center lg:pb-20 lg:text-left">
          <h2 className="font-(family-name:--font-cormorant-garamond) text-[36px] leading-[1.1] tracking-tight text-black">
            Looks like this page took a little detour
          </h2>
          <p className="mt-6 font-(family-name:--font-jost) text-sm text-gray-500">
            Let&apos;s get you back to something beautiful.
          </p>

          <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:justify-center lg:items-stretch lg:justify-start">
            <Link
              href="/"
              className="inline-block bg-[#010101] px-11 py-3.75 text-center font-(family-name:--font-jost) uppercase text-[14px] font-medium tracking-wide leading-[1.4] text-white transition-colors hover:bg-[#2C2C2C]"
            >
              Back to home
            </Link>
            <Link
              href="/new-arrivals"
              className="inline-block border border-black px-5.25 py-3.25 text-center font-(family-name:--font-jost) uppercase text-[14px] font-medium tracking-wide leading-[1.4] text-black transition-colors hover:bg-[#F8F8F8]"
            >
              Discover collection
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
