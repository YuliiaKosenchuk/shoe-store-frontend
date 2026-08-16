import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

export function SupportSidebar() {
  return (
    <div className="font-(family-name:--font-jost)">
      <h2 className="font-(family-name:--font-cormorant-garamond) text-[26px] font-semibold text-black mb-6">
        Need a hand?
      </h2>

      <p className="text-[16px] text-[#4E4E4E] leading-relaxed mb-4">
        We&apos;re here to help. Reach out to our support team using one of the options below.
      </p>

      <div className="flex flex-col gap-3 mb-6">
        <Link
          href="/contact"
          className="flex items-center gap-2 text-[14px] text-black hover:text-[#7A2633] transition-colors"
        >
          <MessageCircle size={24} strokeWidth={1.25} />
          Chat with Support
        </Link>
        <a
          href="mailto:support@atelier.ua"
          className="flex items-center gap-2 text-[14px] text-black hover:text-[#7A2633] transition-colors"
        >
          <Mail size={24} strokeWidth={1.25} />
          Send an e-mail
        </a>
      </div>

      <p className="text-[16px] text-[#4E4E4E] leading-relaxed">
        Customer support is available Monday–Friday, 9:00 AM–9:00 PM.
      </p>
    </div>
  );
}
