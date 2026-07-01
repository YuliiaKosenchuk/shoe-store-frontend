import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Help | ATELIER",
};

const faqs = [
  {
    id: "orders",
    title: "Orders & Payment",
    items: [
      {
        question: "How do I place an order?",
        answer: "Browse our catalog, select your size and color, and add the item to your cart. Proceed to checkout, enter your shipping and payment details, and confirm your order. You will receive a confirmation email within minutes.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit and debit cards (Visa, Mastercard), Apple Pay, Google Pay, and bank transfers. All transactions are secured with SSL encryption.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer: "Orders can be modified or cancelled within 1 hour of placement. After that, they enter our fulfillment process and cannot be changed. Please contact us immediately at support@atelier.ua if you need assistance.",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping & Delivery",
    items: [
      {
        question: "How long does delivery take?",
        answer: "Standard delivery within Ukraine takes 2–5 business days. Express delivery is available for 1–2 business days. International delivery varies by destination and typically takes 7–21 business days.",
      },
      {
        question: "Do you offer free shipping?",
        answer: "Yes — free standard shipping is available on all orders over 5000 UAH. The threshold applies to the subtotal after discounts.",
      },
      {
        question: "How can I track my order?",
        answer: "Once your order is dispatched, you will receive a shipping confirmation email with a tracking number. You can use this number on the carrier's website (Nova Poshta, Ukrposhta, DHL, or FedEx).",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & Exchanges",
    items: [
      {
        question: "What is your return policy?",
        answer: "We accept returns within 14 days of delivery. Items must be unworn, undamaged, and in original packaging with all tags attached. Sale items marked as final sale are not eligible.",
      },
      {
        question: "How do I start a return?",
        answer: "Email support@atelier.ua with your order number and reason for return. We will send a prepaid return label and instructions within 1–2 business days.",
      },
      {
        question: "How long does a refund take?",
        answer: "Once we receive and inspect your return, we process refunds within 5–7 business days to the original payment method. The original shipping cost is non-refundable unless the return is due to our error.",
      },
    ],
  },
  {
    id: "sizing",
    title: "Sizing & Fit",
    items: [
      {
        question: "How do I find my size?",
        answer: "Each product page includes a size guide specific to that brand. If you are between sizes, we generally recommend sizing up for shoes and down for fitted accessories. Our team is happy to advise — reach out before you order.",
      },
      {
        question: "Do sizes vary between brands?",
        answer: "Yes. Italian and Spanish brands often run narrow; Portuguese makers tend to be truer to size. We note fit guidance on each product page where relevant.",
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <main className="py-16">
      <Container>
        <div className="px-8">
          <h1 className="font-(family-name:--font-cormorant-garamond) text-5xl font-light tracking-wide mb-4">
            Help
          </h1>
          <p className="font-(family-name:--font-jost) text-[14px] text-[#888] mb-16 max-w-2xl">
            Find answers to common questions below. If you need further assistance, our team is available at{" "}
            <a href="mailto:support@atelier.ua" className="text-[#7A2633] hover:underline">
              support@atelier.ua
            </a>
            .
          </p>

          <nav className="flex flex-wrap gap-6 mb-16 border-b border-[#E8E8E8] pb-6">
            {faqs.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="font-(family-name:--font-jost) text-[13px] uppercase tracking-widest text-[#888] hover:text-black transition-colors"
              >
                {section.title}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-20">
            {faqs.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="font-(family-name:--font-cormorant-garamond) text-3xl font-light mb-10 pb-4 border-b border-[#E8E8E8]">
                  {section.title}
                </h2>
                <div className="grid gap-8">
                  {section.items.map((item) => (
                    <div key={item.question} className="grid md:grid-cols-[300px_1fr] gap-4">
                      <h3 className="font-(family-name:--font-jost) text-[13px] font-medium text-black pt-0.5 leading-snug">
                        {item.question}
                      </h3>
                      <p className="font-(family-name:--font-jost) text-[14px] text-[#555] leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-20 pt-8 border-t border-[#E8E8E8]">
            <p className="font-(family-name:--font-jost) text-[14px] text-[#555] mb-1">
              Still have questions?
            </p>
            <a
              href="mailto:support@atelier.ua"
              className="font-(family-name:--font-jost) text-[14px] text-[#7A2633] hover:underline"
            >
              support@atelier.ua
            </a>
          </div>
        </div>
      </Container>
    </main>
  );
}
