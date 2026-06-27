import Image from "next/image";

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
    <div className="bg-[#F4F3F2] py-6">
      <div className="max-w-336 mx-auto px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {features.map(({ icon, title, subtitle }) => (
            <div key={title} className="flex items-center gap-4">
              <Image src={icon} alt={title} width={36} height={36} className="shrink-0" />
              <div>
                <p
                  className="text-black [font-family:var(--font-jost)]"
                  style={{ fontSize: "20px", lineHeight: 1.3 }}
                >
                  {title}
                </p>
                <p
                  className="text-black/60 [font-family:var(--font-jost)]"
                  style={{ fontSize: "14px", lineHeight: 1.4 }}
                >
                  {subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
