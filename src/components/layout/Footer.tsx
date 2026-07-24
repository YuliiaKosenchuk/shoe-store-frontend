"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/Container";
import LogoComponent from "@/components/ui/LogoComponent";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

const shopLinks = [
  { label: "Bags", href: "/bags" },
  { label: "Shoes", href: "/shoes" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Bestsellers", href: "/bestsellers" },
  { label: "Sale", href: "/sale" },
];

const customerServiceLinks = [
  { label: "Track my order", href: "/track-order" },
  { label: "Contact us", href: "/contact" },
  { label: "Cookies", href: "/cookies" },
  { label: "Care Instructions", href: "/care-instructions" },
  { label: "FAQ", href: "/faq" },
];

const companyLinks = [
  { label: "About us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Stores", href: "/stores" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Returns Policy", href: "/returns-policy" },
];

const navColumns = [
  { heading: "Shop", links: shopLinks },
  { heading: "Customer Service", links: customerServiceLinks },
  { heading: "Company", links: companyLinks },
  { heading: "Privacy & Legal", links: legalLinks },
];

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram", src: "/images/instagram-logo.svg" },
  { href: "https://facebook.com", label: "Facebook", src: "/images/facebook-logo.svg" },
  { href: "https://pinterest.com", label: "Pinterest", src: "/images/pinterest-logo.svg" },
  { href: "https://youtube.com", label: "YouTube", src: "/images/youtube-logo.svg" },
];



const jost = { fontFamily: "var(--font-jost)" } as const;

const minimalFooterRoutes = ["/cart", "/checkout"];

export default function Footer() {
  const pathname = usePathname();
  const isMinimal = minimalFooterRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const [showModal, setShowModal] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  function toggleSection(heading: string) {
    setOpenSection((prev) => (prev === heading ? null : heading));
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  function onSubscribe() {
    setShowModal(true);
    reset();
  }

  if (isMinimal) {
    return (
      <footer className="w-full bg-[#F8F8F8]">
        <Container className="px-8">
          <div className="py-3 flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
            <LogoComponent />

            <div className="flex items-center gap-2 text-[14px] leading-normal font-normal text-black" style={jost}>
              <Image src="/images/copyright.svg" alt="Copyright" width={24} height={24} />
              <span>2026</span>
              <span>Logo</span>
              <span>All rights reserved</span>
            </div>

            <div className="flex items-center gap-4">
              <Image src="/images/klarna-icon.svg" alt="Klarna" width={67} height={40} />
              <Image src="/images/visa-icon.svg" alt="Visa" width={50} height={40} />
              <Image src="/images/mastercard-icon.svg" alt="Mastercard" width={50} height={40} />
              <Image src="/images/gpay-icon.jpg" alt="Google Pay" width={50} height={40} />
              <Image src="/images/paypal-icon.svg" alt="PayPal" width={50} height={40} />
            </div>
          </div>
        </Container>
      </footer>
    );
  }

  return (
    <>
    {showModal && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        onClick={() => setShowModal(false)}
      >
        <div
          className="bg-white px-12 py-10 flex flex-col items-center gap-4 max-w-sm w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <p
            className="text-[24px] leading-[1.1] tracking-tight text-black text-center"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            You&apos;re subscribed!
          </p>
          <p className="text-[14px] leading-normal text-black/70 text-center" style={jost}>
            Thank you for signing up. You&apos;ll be the first to hear about new arrivals and exclusive offers.
          </p>
          <button
            onClick={() => setShowModal(false)}
            className="mt-2 bg-[#010101] text-white px-8 py-3 text-[13px] uppercase tracking-widest hover:bg-[#2C2C2C] transition-colors"
            style={jost}
          >
            Close
          </button>
        </div>
      </div>
    )}
    <footer className="mb-6.5 w-full bg-[#F8F8F8]">
      <Container className="px-4 md:px-8">
        {/* Nav columns — desktop grid */}
        <div className="hidden pt-8 pb-6 lg:grid lg:grid-cols-4 lg:gap-8 xl:pt-12 xl:pb-8 xl:pl-19.25">
          {navColumns.map(({ heading, links }) => (
            <div key={heading}>
              <p
                className="mb-6 text-[16px] leading-[1.3] font-medium text-black tracking-widest"
                style={jost}
              >
                {heading}
              </p>
              <ul className="flex flex-col gap-2">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-[14px] leading-normal font-normal text-black hover:opacity-70 transition-opacity"
                      style={jost}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Nav columns — mobile/tablet accordion */}
        <div className="divide-y divide-[#B3B3B3] lg:hidden">
          {navColumns.map(({ heading, links }) => {
            const isOpen = openSection === heading;
            return (
              <div key={heading}>
                <button
                  type="button"
                  onClick={() => toggleSection(heading)}
                  className="w-full flex items-center justify-between py-4 text-left text-[16px] leading-[1.3] font-medium text-black tracking-widest"
                  style={jost}
                >
                  {heading}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  >
                    <path
                      d="M19.7653 9.26552L12.2653 16.7655C12.2304 16.8004 12.1891 16.828 12.1436 16.8469C12.098 16.8658 12.0492 16.8755 12 16.8755C11.9507 16.8755 11.9019 16.8658 11.8564 16.8469C11.8108 16.828 11.7695 16.8004 11.7347 16.7655L4.23465 9.26552C4.19981 9.23068 4.17217 9.18932 4.15332 9.1438C4.13446 9.09827 4.12476 9.04948 4.12476 9.00021C4.12476 8.95094 4.13446 8.90215 4.15332 8.85662C4.17217 8.8111 4.19981 8.76974 4.23465 8.7349C4.30502 8.66453 4.40045 8.625 4.49996 8.625C4.54924 8.625 4.59803 8.63471 4.64355 8.65356C4.68907 8.67242 4.73044 8.70005 4.76528 8.7349L12 15.9696L19.2347 8.7349C19.2695 8.70005 19.3109 8.67242 19.3564 8.65356C19.4019 8.63471 19.4507 8.625 19.5 8.625C19.5492 8.625 19.598 8.63471 19.6436 8.65356C19.6891 8.67242 19.7304 8.70005 19.7653 8.7349C19.8001 8.76974 19.8278 8.8111 19.8466 8.85662C19.8655 8.90215 19.8752 8.94948 19.8752 9.00021C19.8752 9.04948 19.8655 9.09827 19.8466 9.1438C19.8278 9.18932 19.8001 9.23068 19.7653 9.26552Z"
                      fill="#010101"
                    />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <ul className="flex flex-col gap-2 pb-4">
                        {links.map(({ label, href }) => (
                          <li key={href}>
                            <Link
                              href={href}
                              className="text-[14px] leading-normal font-normal text-black hover:opacity-70 transition-opacity"
                              style={jost}
                            >
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <hr className="border-0 border-t border-[#B3B3B3] h-px" />

        {/* Newsletter + Social */}
        <div className="py-6 flex flex-col gap-8 xl:py-8 xl:pl-19.25 xl:grid xl:grid-cols-4 xl:gap-6 xl:justify-items-start xl:items-center">
          <div className="flex flex-col gap-4 xl:min-w-77.75">
            <p className="text-[16px] leading-[1.3] font-medium text-black tracking-widest" style={jost}>
              Sign up for our newsletter
            </p>
            <p className="text-[14px] leading-normal font-normal text-black" style={jost}>
              Be the first to know about new arrivals, exclusive offers, and special promotions.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubscribe)} noValidate className="xl:col-span-2 relative w-full">
            <div className="flex flex-col gap-6 items-start xl:flex-row xl:items-center xl:gap-0 xl:justify-center">
              <input
                type="email"
                placeholder="enter your email address"
                {...register("email")}
                className={`w-full lg:w-[700px] xl:w-67 min-w-0 border bg-white px-4 py-3 text-[16px] leading-[1.3] font-normal text-black placeholder:text-[#B3B3B3] outline-none transition-colors ${errors.email ? "border-[#DF4441] focus:border-[#DF4441]" : "border-black/20 focus:border-black"}`}
                style={jost}
              />
              <button
                type="submit"
                className="w-full lg:w-[700px] xl:w-47.25 bg-[#010101] text-white py-3.75 text-[14px] leading-[1.3] font-medium uppercase tracking-widest whitespace-nowrap hover:bg-[#2C2C2C] transition-colors"
                style={jost}
              >
                Subscribe
              </button>
            </div>
            <p className="absolute top-full mt-2 h-5 text-[13px] text-[#DF4441]" style={jost}>
              {errors.email?.message ?? " "}
            </p>
          </form>

          <div className="flex flex-col gap-4">
            <p className="text-[16px] leading-[1.3] font-medium text-black tracking-[1%]" style={jost}>
              Follow us
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ href, label, src }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hover:opacity-60 transition-opacity"
                >
                  <Image src={src} alt={label} width={24} height={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-0 border-t border-[#B3B3B3] h-px" />

        {/* Bottom bar */}
        <div className="pt-6 pb-8 flex flex-col items-center gap-6 lg:flex-row lg:justify-between xl:pt-8 xl:pb-12">
          <LogoComponent />

          <div className="flex items-center gap-2 text-[14px] leading-normal font-normal text-black" style={jost}>
            <Image src="/images/copyright.svg" alt="Copyright" width={24} height={24} />
            <span>2026</span>
            <span>Logo</span>
            <span>All rights reserved</span>
          </div>

          <div className="flex items-center gap-4">
            <Image src="/images/klarna-icon.svg" alt="Klarna" width={67} height={40} />
            <Image src="/images/visa-icon.svg" alt="Visa" width={50} height={40} />
            <Image src="/images/mastercard-icon.svg" alt="Mastercard" width={50} height={40} />
            <Image src="/images/gpay-icon.jpg" alt="Google Pay" width={50} height={40} />
            <Image src="/images/paypal-icon.svg" alt="PayPal" width={50} height={40} />
          </div>
        </div>
      </Container>
    </footer>
    </>
  );
}
