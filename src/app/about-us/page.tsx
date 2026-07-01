import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "About Us | ATELIER",
};

const values = [
  {
    label: "Craftsmanship",
    text: "Every piece we carry is selected for its exceptional construction. We work with artisans who treat their craft as a lifelong discipline, not a production target.",
  },
  {
    label: "Sustainability",
    text: "We partner with brands that use responsibly sourced materials and transparent supply chains. Quality and longevity are the most sustainable choices.",
  },
  {
    label: "Curation",
    text: "Our edit is intentional. We choose fewer pieces, chosen well — each with a clear point of view and a long useful life.",
  },
  {
    label: "Service",
    text: "We believe in quiet, attentive service. No pressure, no noise — just honest guidance to help you find what is right for you.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="py-16">
      <Container>
        <div className="px-8">
          <h1 className="font-(family-name:--font-cormorant-garamond) text-5xl font-light tracking-wide mb-4">
            About Us
          </h1>
          <p className="font-(family-name:--font-jost) text-[14px] text-[#888] mb-16 max-w-2xl">
            ATELIER is a curated luxury boutique dedicated to footwear, bags, and accessories of lasting quality. We believe that the things you carry every day should be beautiful, purposeful, and enduring.
          </p>

          <div className="grid md:grid-cols-2 gap-0 mb-20 border border-[#E8E8E8]">
            <div className="p-12 border-b md:border-b-0 md:border-r border-[#E8E8E8]">
              <h2 className="font-(family-name:--font-cormorant-garamond) text-3xl font-light mb-6">
                Our Story
              </h2>
              <p className="font-(family-name:--font-jost) text-[14px] text-[#555] leading-relaxed mb-4">
                Founded in Kyiv, ATELIER grew from a single conviction: that access to truly well-made things should not require a trip abroad or a personal stylist. We set out to bring the world's finest independent makers directly to those who appreciate them.
              </p>
              <p className="font-(family-name:--font-jost) text-[14px] text-[#555] leading-relaxed">
                Over the years we have built relationships with ateliers across Italy, Spain, Portugal, and France — selecting only those whose standards match our own. Each season our edit is small and deliberate.
              </p>
            </div>
            <div className="p-12">
              <h2 className="font-(family-name:--font-cormorant-garamond) text-3xl font-light mb-6">
                Our Philosophy
              </h2>
              <p className="font-(family-name:--font-jost) text-[14px] text-[#555] leading-relaxed mb-4">
                We are not a trend-driven store. We do not chase seasons or markdown calendars. What we carry is chosen to outlast fashion cycles and improve with age — leather that softens, soles that can be resoled, hardware that patinates beautifully.
              </p>
              <p className="font-(family-name:--font-jost) text-[14px] text-[#555] leading-relaxed">
                We think the most considered purchase is the one you make once and keep for a decade.
              </p>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="font-(family-name:--font-cormorant-garamond) text-3xl font-light mb-10 pb-4 border-b border-[#E8E8E8]">
              What We Stand For
            </h2>
            <div className="grid gap-8">
              {values.map((v) => (
                <div key={v.label} className="grid md:grid-cols-[240px_1fr] gap-4">
                  <h3 className="font-(family-name:--font-jost) text-[13px] uppercase tracking-widest text-black pt-0.5">
                    {v.label}
                  </h3>
                  <p className="font-(family-name:--font-jost) text-[14px] text-[#555] leading-relaxed">
                    {v.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#E8E8E8] pt-10">
            <p className="font-(family-name:--font-jost) text-[14px] text-[#555] leading-relaxed mb-2">
              Have a question or would like to visit us in person?
            </p>
            <a
              href="mailto:hello@atelier.ua"
              className="font-(family-name:--font-jost) text-[14px] text-[#7A2633] hover:underline"
            >
              hello@atelier.ua
            </a>
          </div>
        </div>
      </Container>
    </main>
  );
}
