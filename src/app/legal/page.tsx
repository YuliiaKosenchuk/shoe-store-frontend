import { Container } from "@/components/ui/Container";

const sections = [
  {
    id: "privacy",
    title: "Privacy Policy",
    content: [
      {
        heading: "Information We Collect",
        text: "We collect information you provide directly to us, such as your name, email address, phone number, and shipping address when you create an account or place an order. We also automatically collect certain technical data including your IP address, browser type, and browsing behavior on our site.",
      },
      {
        heading: "How We Use Your Information",
        text: "We use the information we collect to process your orders, communicate with you about your purchases, send promotional materials (with your consent), improve our services, and comply with legal obligations. We do not sell your personal data to third parties.",
      },
      {
        heading: "Data Retention",
        text: "We retain your personal information for as long as your account is active or as needed to provide you with services. You may request deletion of your data at any time by contacting our support team.",
      },
      {
        heading: "Cookies",
        text: "Our website uses cookies to enhance your browsing experience, remember your preferences, and analyze traffic. You can control cookie settings through your browser preferences. Disabling cookies may affect some functionality of the site.",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping Policy",
    content: [
      {
        heading: "Processing Time",
        text: "All orders are processed within 1–2 business days. Orders placed on weekends or public holidays will be processed on the next business day. You will receive a confirmation email with tracking information once your order has been dispatched.",
      },
      {
        heading: "Delivery Timeframes",
        text: "Standard delivery within Ukraine takes 2–5 business days. Express delivery is available for an additional fee and typically arrives within 1–2 business days. International shipping is available to select countries and may take 7–21 business days depending on the destination.",
      },
      {
        heading: "Free Shipping",
        text: "We offer free standard shipping on all orders over 5000 EUR. This threshold applies to the order subtotal after any discounts are applied. Free shipping is not available for express delivery or international orders.",
      },
      {
        heading: "Shipping Carriers",
        text: "We work with Nova Poshta and Ukrposhta for domestic deliveries. International orders are shipped via DHL or FedEx. Once your order is dispatched, you will receive a tracking number to monitor your shipment.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns Policy",
    content: [
      {
        heading: "Return Eligibility",
        text: "We accept returns within 14 days of the delivery date. Items must be unworn, undamaged, and in their original packaging with all tags attached. Sale items and items marked as final sale are not eligible for return.",
      },
      {
        heading: "How to Initiate a Return",
        text: "To start a return, please contact our customer service team at support@atelier.ua with your order number and reason for return. We will provide you with a prepaid return shipping label and instructions within 1–2 business days.",
      },
      {
        heading: "Refunds",
        text: "Once we receive and inspect your returned items, we will process your refund within 5–7 business days. Refunds are issued to the original payment method. Please note that the original shipping cost is non-refundable unless the return is due to a defect or our error.",
      },
      {
        heading: "Exchanges",
        text: "If you would like to exchange an item for a different size or color, please initiate a return and place a new order for the desired item. This ensures the fastest processing time and guarantees availability of your preferred item.",
      },
    ],
  },
];

export default function LegalPage() {
  return (
    <main className="py-16">
      <Container>
        <div className="px-8">
          <h1 className="font-(family-name:--font-cormorant-garamond) text-5xl font-light tracking-wide mb-4">
            Privacy &amp; Legal
          </h1>
          <p className="font-(family-name:--font-jost) text-[14px] text-[#888] mb-16 max-w-2xl">
            Please read the following policies carefully. By using our website and services, you agree to the terms outlined below.
          </p>

          <nav className="flex gap-8 mb-16 border-b border-[#E8E8E8] pb-6">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="font-(family-name:--font-jost) text-[13px] uppercase tracking-widest text-[#888] hover:text-black transition-colors"
              >
                {s.title}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-20">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="font-(family-name:--font-cormorant-garamond) text-3xl font-light mb-10 pb-4 border-b border-[#E8E8E8]">
                  {section.title}
                </h2>
                <div className="grid gap-8">
                  {section.content.map((block) => (
                    <div key={block.heading} className="grid md:grid-cols-[240px_1fr] gap-4">
                      <h3 className="font-(family-name:--font-jost) text-[13px] uppercase tracking-widest text-black pt-0.5">
                        {block.heading}
                      </h3>
                      <p className="font-(family-name:--font-jost) text-[14px] text-[#555] leading-relaxed">
                        {block.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-20 pt-8 border-t border-[#E8E8E8]">
            <p className="font-(family-name:--font-jost) text-[13px] text-[#AAA]">
              Last updated: June 2026. For any questions regarding these policies, contact us at{" "}
              <a href="mailto:support@atelier.ua" className="text-[#7A2633] hover:underline">
                support@atelier.ua
              </a>
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
