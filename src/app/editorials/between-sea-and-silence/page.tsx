import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Between Sea & Silence | ATELIER",
};

export default function BetweenSeaAndSilencePage() {
  return (
    <main className="">
      {/* Hero */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 -mt-18 h-[70vh] min-h-100 md:h-screen md:max-h-240">
        <Image
          src="/images/editorials/hero-sea.png"
          alt="Between Sea & Silence editorial"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      {/* Intro */}
      <div className="relative min-[1340px]:left-1/2 min-[1340px]:w-screen min-[1340px]:-translate-x-1/2 min-[1340px]:py-16">
        <div className="min-[1340px]:relative min-[1340px]:h-266">
          <div className="px-4 md:px-8 py-12 md:py-16 grid gap-10 max-w-336 mx-auto min-[1340px]:hidden">
            <div>
              <nav className="font-(family-name:--font-jost) text-[14px] text-[#010101] mb-8 flex items-center gap-2">
                <Link href="/" className="hover:text-black transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-black">Between Sea &amp; Silence</span>
              </nav>

              <h1 className="font-(family-name:--font-cormorant-garamond) text-[36px] font-semibold leading-[1.1] tracking-tight text-black mb-6">
                BETWEEN SEA &amp; SILENCE
              </h1>

              <p className="font-(family-name:--font-jost) text-[16px] leading-[1.3] text-[#343434] mb-4">
                There is a certain freedom in slowing down.
              </p>
              <p className="font-(family-name:--font-jost) text-[16px] leading-[1.3] text-[#343434]">
                Bare skin, warm stone, the sound of the ocean — and nothing
                more. Our summer collection is inspired by quiet mornings by
                the sea, soft movement and effortless silhouettes.
              </p>

              <div className="relative mt-12 w-2/3 md:w-1/2 aspect-4/5">
                <Image
                  src="/images/editorials/sea-1.png"
                  alt="Model resting on the rocks in a woven hat"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative w-full aspect-2/3">
              <Image
                src="/images/editorials/sea-2.png"
                alt="Model walking along the shoreline holding a leather bag"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="hidden min-[1340px]:block absolute top-0 right-[calc(50%+133px)] w-129.75 h-full">
            <nav className="font-(family-name:--font-jost) text-[14px] text-[#010101] mb-8 flex items-center gap-2">
              <Link href="/" className="hover:text-black transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-black">Between Sea &amp; Silence</span>
            </nav>

            <h1 className="font-(family-name:--font-cormorant-garamond) text-[48px] font-semibold leading-[1.1] tracking-tight text-black mb-6">
              BETWEEN SEA &amp; SILENCE
            </h1>

            <p className="font-(family-name:--font-jost) text-[16px] leading-[1.3] text-[#343434] mb-4">
              There is a certain freedom in slowing down.
            </p>
            <p className="font-(family-name:--font-jost) text-[16px] leading-[1.3] text-[#343434]">
              Bare skin, warm stone, the sound of the ocean — and nothing
              more. Our summer collection is inspired by quiet mornings by
              the sea, soft movement and effortless silhouettes.
            </p>

            <div className="absolute bottom-0 left-0 w-102.75 h-129.75">
              <Image
                src="/images/editorials/sea-1.png"
                alt="Model resting on the rocks in a woven hat"
                fill
                sizes="411px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="hidden min-[1340px]:block absolute top-0 right-0 w-1/2 h-full">
            <Image
              src="/images/editorials/sea-2.png"
              alt="Model walking along the shoreline holding a leather bag"
              fill
              sizes="50vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Shoe duo */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 grid grid-cols-2 h-100 sm:h-125 md:h-236.25">
        <div className="relative h-full">
          <Image
            src="/images/editorials/sea-3.png"
            alt="Strappy heeled sandals on a coastal rock"
            fill
            sizes="50vw"
            className="object-cover object-center"
          />
        </div>
        <div className="relative h-full">
          <Image
            src="/images/editorials/sea-4.png"
            alt="Sandals suspended against the shimmering sea"
            fill
            sizes="50vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* By the Water */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 bg-white py-16">
        {/* Mobile / tablet stacked layout */}
        <div className="min-[1340px]:hidden grid gap-6 px-4">
          <div>
            <div className="relative w-full aspect-4/3">
              <Image
                src="/images/editorials/sea-5.png"
                alt="Model floating in clear turquoise water"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="pt-8 max-w-sm">
              <h2 className="font-(family-name:--font-cormorant-garamond) text-[20px] font-semibold uppercase tracking-wide text-black mb-4">
                By the Water
              </h2>
              <div className="font-(family-name:--font-jost) text-[14px] leading-[1.8] text-[#343434] space-y-4">
                <p>The ocean became more than a backdrop for this story.</p>
                <p>
                  Its changing shades of blue, the warmth of the rocks and
                  the softness of the surrounding landscape shaped the mood
                  of the collection.
                </p>
                <p>
                  We wanted every image to feel unhurried — as though you
                  have simply arrived somewhere beautiful, with nowhere else
                  to be.
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-full aspect-3/4">
            <Image
              src="/images/editorials/sea-6.png"
              alt="Model looking back over her shoulder by the sea"
              fill
              sizes="100vw"
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden min-[1340px]:block relative h-231.25">
          <div className="absolute top-0 left-0 w-1/2 h-128.75">
            <Image
              src="/images/editorials/sea-5.png"
              alt="Model floating in clear turquoise water"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>

          <div className="absolute top-138.75 right-[calc(50%+100px)] w-129.75 h-47.25">
            <h2 className="font-(family-name:--font-cormorant-garamond) text-[20px] font-semibold uppercase text-black mb-4">
              By the Water
            </h2>
            <div className="font-(family-name:--font-jost) text-[16px] leading-[1.3] text-[#343434] space-y-4">
              <p>The ocean became more than a backdrop for this story.</p>
              <p>
                Its changing shades of blue, the warmth of the rocks and the
                softness of the surrounding landscape shaped the mood of the
                collection.
              </p>
              <p>
                We wanted every image to feel unhurried — as though you have
                simply arrived somewhere beautiful, with nowhere else to be.
              </p>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-1/2 h-full">
            <Image
              src="/images/editorials/sea-6.png"
              alt="Model looking back over her shoulder by the sea"
              fill
              sizes="50vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Studio duo */}
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        {/* Mobile / tablet stacked layout */}
        <div className="min-[1340px]:hidden grid gap-6 px-4">
          <div className="relative w-full aspect-3/4">
            <Image
              src="/images/editorials/sea-7.png"
              alt="Model resting on a studio floor in a white top"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div>
            <div className="relative w-full aspect-3/4">
              <Image
                src="/images/editorials/sea-8.png"
                alt="Brown heeled mules on a coastal rock"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-6 text-right font-(family-name:--font-jost) text-[16px] leading-[1.3] text-[#343434]">
              A moment to sit.
              <br />
              A walk along the coast.
              <br />
              Bare feet on warm stone.
              <br />
              The sound of waves in the distance.
            </p>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden min-[1340px]:block relative h-231.25">
          <div className="absolute top-0 left-0 w-1/2 h-full">
            <Image
              src="/images/editorials/sea-7.png"
              alt="Model resting on a studio floor in a white top"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>

          <div className="absolute top-0 left-[calc(50%+230px)] right-0 h-160">
            <Image
              src="/images/editorials/sea-8.png"
              alt="Brown heeled mules on a coastal rock"
              fill
              sizes="50vw"
              className="object-cover object-center"
            />
          </div>

          <p className="absolute bottom-0 left-[calc(50%+310px)] w-82.5 h-21 text-right font-(family-name:--font-jost) text-[16px] leading-[1.3] text-[#343434]">
            A moment to sit.
            <br />
            A walk along the coast.
            <br />
            Bare feet on warm stone.
            <br />
            The sound of waves in the distance.
          </p>
        </div>
      </div>

      {/* Coastal duo */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 h-100 sm:h-125 md:h-231.25 py-16">
        <div className="grid grid-cols-2 h-full">
          <div className="relative h-full">
            <Image
              src="/images/editorials/sea-9.png"
              alt="Model walking away along a coastal path holding a bag"
              fill
              sizes="50vw"
              className="object-cover object-top"
            />
          </div>
          <div className="relative h-full">
            <Image
              src="/images/editorials/sea-10.png"
              alt="Model holding a leather clutch against a plain wall"
              fill
              sizes="50vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Closing panel */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 bg-white mb-31.75">
        {/* Mobile / tablet stacked layout */}
        <div className="min-[1340px]:hidden grid gap-6 px-4 py-12">
          <p className="font-(family-name:--font-jost) text-[16px] leading-[1.3] text-[#343434] max-w-sm">
            A moment to sit.
            <br />
            A walk along the coast.
            <br />
            Bare feet on warm stone.
            <br />
            The sound of waves in the distance.
          </p>
          <div className="relative w-full aspect-4/5">
            <Image
              src="/images/editorials/sea-11.png"
              alt="Green heeled sandals on a coastal rock"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden min-[1340px]:block relative h-231.25">
          <p className="absolute bottom-16 right-[calc(50%+100px)] w-129.75 font-(family-name:--font-jost) text-[16px] leading-[1.3] text-[#343434]">
            A moment to sit.
            <br />
            A walk along the coast.
            <br />
            Bare feet on warm stone.
            <br />
            The sound of waves in the distance.
          </p>

          <div className="absolute top-0 right-0 w-1/2 h-full">
            <Image
              src="/images/editorials/sea-11.png"
              alt="Green heeled sandals on a coastal rock"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Back link
      <Container>
        <div className="px-4 md:px-8 py-16">
          <Link
            href="/"
            className="font-(family-name:--font-jost) text-[12px] uppercase tracking-widest text-black hover:text-[#7A2633] transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </Container> */}
    </main>
  );
}
