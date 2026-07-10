import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";

const articles: Record<
  string,
  {
    title: string;
    subtitle: string;
    date: string;
    image: string;
    body: { heading?: string; text: string }[];
  }
> = {
  "the-modern-icon": {
    title: "The Modern Icon",
    subtitle: "On quiet confidence and the season of lightness",
    date: "March 2025",
    image: "/images/editorials-1.jpg",
    body: [
      {
        text: "Spring emerges with quiet confidence, marking a graceful transition into a season of lightness, movement, and renewed elegance. It is a moment that does not announce itself loudly — instead it arrives through the subtle shift of a hem, the choice of a natural fibre, the way a shoe meets the ground.",
      },
      {
        heading: "The Shape of Now",
        text: "This season, the modern icon does not seek attention. She has already found it. Her wardrobe is built on considered essentials — a column silhouette, a shoulder bag with clean hardware, sandals that carry the memory of warm stone. Each piece is chosen for how it feels as much as how it looks.",
      },
      {
        text: "The palette borrows from the landscape: undyed linen, warm sand, the muted blush of adobe walls in afternoon light. Texture takes precedence over colour, and proportion is everything.",
      },
      {
        heading: "A Study in Restraint",
        text: "There is discipline in simplicity. The modern icon understands this intuitively. She is not minimal for its own sake, but because excess distracts from what is essential. Her shoes are the punctuation of an outfit — a considered pause, a quiet exclamation.",
      },
      {
        text: "This is dressing as an act of care. For the self, for the craft, for the environment from which these materials came.",
      },
    ],
  },
  "atelier-evora": {
    title: "Atelier & Évora",
    subtitle: "Heritage craft meets the modern wardrobe",
    date: "February 2025",
    image: "/images/editorials-2.jpg",
    body: [
      {
        text: "Évora sits inland, away from the coast, where the light is harder and the shadows more precise. It is a city that has been making shoes since the sixteenth century, and the craft here carries that weight with ease, not burden.",
      },
      {
        heading: "The Workshop",
        text: "Inside a low whitewashed building on the edge of the old quarter, a small team works without hurry. The last is selected by hand. The leather is vegetable-tanned, arriving in hides that smell of oak bark and time. Nothing here is accelerated.",
      },
      {
        text: "The stitching is done by a woman whose grandmother worked the same machines. She does not romanticise this. It is simply what she knows how to do, and she does it with a precision that cannot be replicated by any other means.",
      },
      {
        heading: "What Endures",
        text: "The collection that emerged from this collaboration is small — six styles, each made in limited quantities. They are not designed to be seasonal. They are designed to last, to improve with wear, to carry the mark of the person who wears them.",
      },
      {
        text: "That is the promise of the atelier: not novelty, but permanence. Not trend, but truth.",
      },
    ],
  },
  "silent-steps": {
    title: "Silent Steps",
    subtitle: "Moving through the world with intention",
    date: "January 2025",
    image: "/images/editorials-3.jpg",
    body: [
      {
        text: "There is a particular kind of freedom in a shoe that asks nothing of you. No break-in period, no adjustments, no anxious attention throughout the day. It simply accompanies you — a quiet presence, a reliable foundation.",
      },
      {
        heading: "Form Follows Feeling",
        text: "The shoes in this story were selected for a single quality: the way they disappear. Not literally — they are beautifully made, worth looking at — but practically. You put them on and forget about your feet. Your attention returns to the world.",
      },
      {
        text: "This is harder to achieve than it sounds. It requires precise lasts, materials with memory, soles that absorb the particular rhythm of each wearer. It requires the kind of knowledge that accumulates over decades in a workshop, not months in a design studio.",
      },
      {
        heading: "The Unhurried Pace",
        text: "We photographed this story at dawn, before the city woke. The streets were empty, the light was cool, and there was no pressure to move quickly. It felt like the right context for shoes that ask for nothing — worn in a moment that demanded nothing in return.",
      },
      {
        text: "Silent steps. Considered materials. An unhurried pace. These are the qualities worth carrying forward into any season.",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export default async function EditorialArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) notFound();

  return (
    <main className="py-16">
      <Container>
        <div className="px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-(family-name:--font-jost) text-[12px] uppercase tracking-widest text-[#4E4E4E] mb-10">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-black">Editorials</span>
          </nav>

          {/* Article header */}
          <div className="max-w-2xl mb-10">
            <p className="font-(family-name:--font-jost) text-[12px] uppercase tracking-widest text-[#4E4E4E] mb-4">
              {article.date}
            </p>
            <h1 className="font-(family-name:--font-cormorant-garamond) text-[48px] md:text-[64px] font-semibold leading-[1.05] tracking-tight text-black mb-4">
              {article.title}
            </h1>
            <p className="font-(family-name:--font-jost) text-[18px] leading-[1.5] text-[#4E4E4E]">
              {article.subtitle}
            </p>
          </div>

          {/* Body with floating image */}
          <div className="max-w-2xl mx-auto">
            <div className="float-right ml-8 mb-6 w-[45%] max-sm:float-none max-sm:w-full max-sm:ml-0 max-sm:mb-8">
              <Image
                src={article.image}
                alt={article.title}
                width={0}
                height={0}
                sizes="(max-width: 640px) 100vw, 600px"
                className="w-full h-auto"
                priority
              />
            </div>
            {article.body.map((block, i) => (
              <div key={i} className="mb-8">
                {block.heading && (
                  <h2 className="font-(family-name:--font-cormorant-garamond) text-[28px] font-semibold leading-[1.2] tracking-tight text-black mb-4">
                    {block.heading}
                  </h2>
                )}
                <p className="font-(family-name:--font-jost) text-[16px] leading-[1.75] text-[#4E4E4E]">
                  {block.text}
                </p>
              </div>
            ))}
            <div className="clear-both" />
          </div>

          {/* Back link */}
          <div className="max-w-2xl mx-auto mt-16 pt-8 border-t border-black/10">
            <Link
              href="/"
              className="font-(family-name:--font-jost) text-[12px] uppercase tracking-widest text-black hover:text-[#7A2633] transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
