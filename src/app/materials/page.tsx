import Image from "next/image";
import { Container } from "@/components/ui/Container";

const materials = [
  {
    id: "leather",
    title: "Full-Grain Leather",
    image: "/images/materials-section.png",
    description:
      "Full-grain leather is the highest quality cut of leather available. It retains the complete grain layer of the hide, which means it carries the natural markings and imperfections that make each piece unique. Over time, full-grain leather develops a rich patina that only deepens with wear — a hallmark of true luxury.",
    properties: [
      { label: "Durability", value: "Exceptional — outlasts all other leather grades" },
      { label: "Texture", value: "Smooth with natural grain variation" },
      { label: "Aging", value: "Develops patina over time" },
      { label: "Source", value: "European tanneries, ethically certified" },
    ],
  },
  {
    id: "suede",
    title: "Suede & Nubuck",
    image: null,
    description:
      "Suede is crafted from the inner split of the hide, producing a soft, velvety surface ideal for seasonal styles. Nubuck, by contrast, is buffed full-grain leather — offering the same suppleness as suede with greater resistance to wear. Both materials are treated to repel moisture and maintain their texture season after season.",
    properties: [
      { label: "Durability", value: "High with proper care" },
      { label: "Texture", value: "Velvety, matte finish" },
      { label: "Aging", value: "Maintains softness with conditioning" },
      { label: "Source", value: "Italian and Spanish tanneries" },
    ],
  },
  {
    id: "hardware",
    title: "Metal Hardware",
    image: null,
    description:
      "Every buckle, eyelet, and zipper pull is crafted from solid brass or zinc alloy and finished with either antique gold, brushed silver, or matte black plating. Hardware is stress-tested to withstand repeated use without tarnishing or warping, ensuring consistency across the life of each product.",
    properties: [
      { label: "Base material", value: "Solid brass or zinc alloy" },
      { label: "Finishes", value: "Antique gold, brushed silver, matte black" },
      { label: "Testing", value: "10,000-cycle stress test" },
      { label: "Plating", value: "Nickel-free, allergy safe" },
    ],
  },
  {
    id: "lining",
    title: "Interior Lining",
    image: null,
    description:
      "The interior of each shoe and bag is lined with either vegetable-tanned calf leather or breathable textile depending on the model. Leather linings mould to the foot over time, while textile linings offer moisture-wicking properties for all-day comfort. All lining materials are free from harmful dyes and chemicals.",
    properties: [
      { label: "Options", value: "Vegetable-tanned leather or textile" },
      { label: "Comfort", value: "Breathable, moisture-wicking" },
      { label: "Safety", value: "REACH-compliant, chemical-free dyes" },
      { label: "Origin", value: "EU-certified suppliers" },
    ],
  },
];

const values = [
  {
    title: "Responsible Sourcing",
    text: "We partner exclusively with tanneries and suppliers that hold recognised environmental and ethical certifications, including LWG (Leather Working Group) Gold status. Every hide is traceable from farm to finished product.",
  },
  {
    title: "Zero-Waste Cutting",
    text: "Our production partners use precision-cut templates to minimise offcut waste. Remaining leather scraps are repurposed for small accessories and internal components, ensuring nothing goes to landfill unnecessarily.",
  },
  {
    title: "Longevity Over Trend",
    text: "We design and build products to last a decade, not a season. By selecting materials that age beautifully and hold their structure, we reduce the cycle of consumption and give our customers something worth keeping.",
  },
];

export default function MaterialsPage() {
  return (
    <main className="py-16">
      <Container>
        <div className="px-8">

          {/* Header */}
          <h1 className="mb-4 font-(family-name:--font-cormorant-garamond) text-[48px] font-semibold leading-[1.05] tracking-tight text-black sm:text-[60px]">
            Our Materials
          </h1>
          <p className="mb-16 max-w-xl font-(family-name:--font-jost) text-[14px] leading-relaxed text-[#4E4E4E]">
            Every material we use is chosen with intention. We source only from
            suppliers who share our commitment to quality, transparency, and
            responsible production.
          </p>

          {/* Materials list */}
          <div className="flex flex-col gap-20 mb-24">
            {materials.map((material) => (
              <section key={material.id} id={material.id}>
                <div className="grid md:grid-cols-2 gap-12 items-start">

                  {/* Text */}
                  <div>
                    <h2 className="mb-5 font-(family-name:--font-cormorant-garamond) text-[36px] font-semibold leading-[1.1] tracking-tight text-black">
                      {material.title}
                    </h2>
                    <p className="mb-8 font-(family-name:--font-jost) text-[14px] leading-relaxed text-[#4E4E4E]">
                      {material.description}
                    </p>

                    <div className="border-t border-[#D8D2CB]">
                      {material.properties.map((prop) => (
                        <div
                          key={prop.label}
                          className="grid grid-cols-[160px_1fr] gap-4 py-3 border-b border-[#D8D2CB]"
                        >
                          <span className="font-(family-name:--font-jost) text-[12px] uppercase tracking-widest text-[#4E4E4E]">
                            {prop.label}
                          </span>
                          <span className="font-(family-name:--font-jost) text-[14px] text-black">
                            {prop.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Image or placeholder */}
                  <div className="relative h-72 md:h-80 bg-[#E8E2DA] overflow-hidden">
                    {material.image && (
                      <Image
                        src={material.image}
                        alt={material.title}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Values section */}
          <div className="border-t border-[#D8D2CB] pt-16 mb-16">
            <h2 className="mb-12 font-(family-name:--font-cormorant-garamond) text-[36px] font-semibold leading-[1.1] tracking-tight text-black">
              Our Commitment
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {values.map((v) => (
                <div key={v.title}>
                  <h3 className="mb-3 font-(family-name:--font-jost) text-[12px] uppercase tracking-widest text-black">
                    {v.title}
                  </h3>
                  <p className="font-(family-name:--font-jost) text-[14px] leading-relaxed text-[#4E4E4E]">
                    {v.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div className="border-t border-[#D8D2CB] pt-8">
            <p className="font-(family-name:--font-jost) text-[13px] text-gray-500">
              Questions about our materials or sourcing?{" "}
              <a
                href="mailto:support@atelier.ua"
                className="underline underline-offset-4 text-[#7A2633] hover:opacity-70 transition-opacity"
              >
                Contact us
              </a>
            </p>
          </div>

        </div>
      </Container>
    </main>
  );
}
