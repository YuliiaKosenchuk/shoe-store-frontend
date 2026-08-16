import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CustomerServiceContent } from "./_components/CustomerServiceContent";

export const metadata = {
  title: "Customer Service | ATELIER",
};

export default function CustomerServicePage() {
  return (
    <main>
      {/* Hero */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 -mt-18 h-[50vh] min-h-75 md:h-207.5">
        <Image
          src="/images/customer-hero.png"
          alt="Customer Service"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      <Container className="pt-6 pb-11 px-4 md:px-8">
        <nav className="font-(family-name:--font-jost) text-[14px] text-[#010101] mb-6 flex items-center gap-4">
          <Link href="/" className="hover:text-black transition-colors">
            Main page
          </Link>
          <span className="text-[#818181]">/</span>
          <span className="text-black">Customer Service</span>
        </nav>

        <Suspense fallback={null}>
          <CustomerServiceContent />
        </Suspense>
      </Container>
    </main>
  );
}
