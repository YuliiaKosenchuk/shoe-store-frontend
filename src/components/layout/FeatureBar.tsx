import Image from "next/image";
import { Container } from "@/components/ui/Container";

const features = [
  {
    icon: "/images/materials-icon.svg",
    title: "Premium materials",
    subtitle: "Responsably sourced",
  },
  {
    icon: "/images/shipping-icon.svg",
    title: "Free shipping",
    subtitle: "On all orders over 5000₴",
  },
  {
    icon: "/images/returns-icon.svg",
    title: "Easy returns",
    subtitle: "30 - day returns",
  },
  {
    icon: "/images/warranty-icon.svg",
    title: "2-year warranty",
    subtitle: "Quality you can trust",
  },
];

export default function FeatureBar() {
  return (
    <div className="bg-[#F4F3F2] py-4">
      <Container className="px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 justify-items-center">
          {features.map(({ icon, title, subtitle }) => (
            <div key={title} className="flex items-center gap-4">
              <Image src={icon} alt={title} width={36} height={36} className="shrink-0" />
              <div>
                <h3
                  className="mb-1 text-[#010101]/90 text-[20px] leading-[1.3] font-semibold"
                  style={{ fontFamily: "var(--font-cormorant-garamond)" }}
                >
                  {title}
                </h3>
                <p
                  className="text-[#4E4E4E]/70 text-[14px] leading-[1.4]"
                  style={{ fontFamily: "var(--font-jost)" }}
                >
                  {subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
