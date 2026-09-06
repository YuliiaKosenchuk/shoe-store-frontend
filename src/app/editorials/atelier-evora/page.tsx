import { UnoptimizedImage as Image } from "@/components/ui/UnoptimizedImage";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Atelier & Évora | ATELIER",
};

export default function AtelierEvoraPage() {
  return (
    <main className="">
      {/* Hero */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 -mt-18 h-[70vh] min-h-100 md:h-screen md:max-h-240">
        <Image
          src="/images/editorials/hero-atelier.png"
          alt="Atelier & Évora editorial"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      {/* Intro: Atelier & Évora */}
      <Container className="bg-white py-16">
        {/* Mobile / tablet stacked layout */}
        <div className="min-[1340px]:hidden grid gap-6 px-4">
          <div>
            <nav className="font-(family-name:--font-jost) text-[14px] text-[#010101] mb-6 flex items-center gap-2">
              <Link href="/" className="hover:text-black transition-colors">
                Main page
              </Link>
              <span>/</span>
              <span className="text-black">Atelier &amp; Évora</span>
            </nav>

            <h1 className="font-(family-name:--font-cormorant-garamond) text-[36px] font-semibold leading-[1.1] tracking-tight text-black mb-4">
              Atelier &amp; Évora
            </h1>

            <div className="font-(family-name:--font-jost) text-[16px] leading-[1.3] text-[#343434] space-y-4">
              <p className="mb-4">
                Évora sits inland, away from the coast, where the light is
                harder and the shadows more precise. It is a city that has
                been making shoes since the sixteenth century, and the craft
                here carries that weight with ease, not burden.
              </p>
              <div>
                <h3 className="font-(family-name:--font-cormorant-garamond) text-[20px] font-semibold text-black mb-4">
                  The Workshop
                </h3>
                <p>
                  Inside a low whitewashed building on the edge of the old
                  quarter, a small team works without hurry. The last is
                  selected by hand. The leather is vegetable-tanned, arriving
                  in hides that smell of oak bark and time. Nothing here is
                  accelerated.
                </p>
              </div>
              <p>
                The stitching is done by a woman whose grandmother worked the
                same machines. She does not romanticise this. It is simply
                what she knows how to do, and she does it with a precision
                that cannot be replicated by any other means.
              </p>
            </div>
          </div>
          <div className="relative w-full aspect-3/4">
            <Image
              src="/images/editorials/atelier-1.png"
              alt="Model wading into a pool beside a pair of sandals"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden min-[1340px]:block relative h-231.25">
          <div className="absolute top-0 right-[calc(50%+100px)] w-129.75">
            <nav className="font-(family-name:--font-jost) text-[14px] text-[#010101] mb-8 flex items-center gap-2">
              <Link href="/" className="hover:text-black transition-colors">
                Main page
              </Link>
              <span>/</span>
              <span className="text-black">Atelier &amp; Évora</span>
            </nav>

            <h1 className="font-(family-name:--font-cormorant-garamond) text-[36px] font-semibold leading-[1.1] tracking-tight text-black mb-6">
              Atelier &amp; Évora
            </h1>

            <div className="font-(family-name:--font-jost) text-[16px] leading-[1.3] text-[#343434] space-y-4">
              <p className="mb-4">
                Évora sits inland, away from the coast, where the light is
                harder and the shadows more precise. It is a city that has
                been making shoes since the sixteenth century, and the craft
                here carries that weight with ease, not burden.
              </p>
              <div>
                <h3 className="font-(family-name:--font-cormorant-garamond) text-[20px] font-semibold text-black mb-4">
                  The Workshop
                </h3>
                <p>
                  Inside a low whitewashed building on the edge of the old
                  quarter, a small team works without hurry. The last is
                  selected by hand. The leather is vegetable-tanned, arriving
                  in hides that smell of oak bark and time. Nothing here is
                  accelerated.
                </p>
              </div>
              <p>
                The stitching is done by a woman whose grandmother worked the
                same machines. She does not romanticise this. It is simply
                what she knows how to do, and she does it with a precision
                that cannot be replicated by any other means.
              </p>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-1/2 h-full">
            <div className="relative ml-auto h-full w-[calc(100%-60px)]">
              <Image
                src="/images/editorials/atelier-1.png"
                alt="Model wading into a pool beside a pair of sandals"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* What Endures */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 bg-white pb-16">
        {/* Mobile / tablet stacked layout */}
        <div className="min-[1340px]:hidden grid gap-6 px-4">
          <div className="relative w-full aspect-3/4">
            <Image
              src="/images/editorials/atelier-2.png"
              alt="Model seated poolside on a lounge chair in a straw hat"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="max-w-sm">
            <h3 className="font-(family-name:--font-cormorant-garamond) text-[20px] font-semibold tracking-wide text-black mb-4">
              What Endures
            </h3>
            <div className="font-(family-name:--font-jost) text-[16px] leading-[1.3] text-[#343434] space-y-4">
              <p>
                The collection that emerged from this collaboration is small
                — six styles, each made in limited quantities. They are not
                designed to be seasonal. They are designed to last, to
                improve with wear, to carry the mark of the person who wears
                them.
              </p>
              <p>
                That is the promise of the atelier: not novelty, but
                permanence. Not trend, but truth.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden min-[1340px]:block relative h-231.25">
          <div className="absolute top-0 left-0 w-1/2 h-full">
            <Image
              src="/images/editorials/atelier-2.png"
              alt="Model seated poolside on a lounge chair in a straw hat"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>

          <div className="absolute top-0 left-[calc(50%+100px)] w-129.75">
            <h3 className="font-(family-name:--font-cormorant-garamond) text-[20px] font-semibold text-black mb-4">
              What Endures
            </h3>
            <div className="font-(family-name:--font-jost) text-[16px] leading-[1.3] text-[#343434] space-y-4">
              <p>
                The collection that emerged from this collaboration is small
                — six styles, each made in limited quantities. They are not
                designed to be seasonal. They are designed to last, to
                improve with wear, to carry the mark of the person who wears
                them.
              </p>
              <p>
                That is the promise of the atelier: not novelty, but
                permanence. Not trend, but truth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
