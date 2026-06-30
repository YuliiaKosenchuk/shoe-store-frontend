"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

export default function Footer() {
  const [showModal, setShowModal] = useState(false);

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
            className="mt-2 bg-black text-white px-8 py-3 text-[13px] uppercase tracking-widest hover:bg-black/80 transition-colors"
            style={jost}
          >
            Close
          </button>
        </div>
      </div>
    )}
    <footer className="mb-6.5 w-full bg-[#F8F8F8]">
      <Container className="px-8">
        {/* Nav columns */}
        <div className="pt-8 pb-6 grid grid-cols-2 gap-6 justify-items-start lg:grid-cols-4 lg:gap-8 xl:pt-12 xl:pb-8 xl:pl-19.25">
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
            <div className="flex flex-col sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="enter your email address"
                {...register("email")}
                className={`w-full sm:w-67 min-w-0 border bg-white px-4 py-3 text-[16px] leading-[1.3] font-normal text-black placeholder:text-[#B3B3B3] outline-none transition-colors ${errors.email ? "border-[#DF4441] focus:border-[#DF4441]" : "border-black/20 focus:border-black"}`}
                style={jost}
              />
              <button
                type="submit"
                className="w-full sm:w-47.25 bg-black text-white py-3.75 text-[14px] leading-[1.3] font-medium uppercase tracking-widest whitespace-nowrap hover:bg-black/80 transition-colors"
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
