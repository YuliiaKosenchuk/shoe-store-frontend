"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import LogoComponent from "@/components/ui/LogoComponent";

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
  { label: "Size Guide", href: "/size-guide" },
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

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram", src: "/images/instagram-logo.svg" },
  { href: "https://facebook.com", label: "Facebook", src: "/images/facebook-logo.svg" },
  { href: "https://pinterest.com", label: "Pinterest", src: "/images/pinterest-logo.svg" },
  { href: "https://youtube.com", label: "YouTube", src: "/images/youtube-logo.svg" },
];


function VisaIcon() {
  return (
    <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
      <rect width="44" height="28" rx="4" fill="#1A1F71" />
      <text x="22" y="19" textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="Arial, sans-serif" fontStyle="italic" letterSpacing="1">VISA</text>
    </svg>
  );
}

function MastercardIcon() {
  return (
    <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
      <rect width="44" height="28" rx="4" fill="#252525" />
      <circle cx="17" cy="14" r="8" fill="#EB001B" />
      <circle cx="27" cy="14" r="8" fill="#F79E1B" />
      <path d="M22 7.67a8 8 0 0 1 0 12.66A8 8 0 0 1 22 7.67z" fill="#FF5F00" />
    </svg>
  );
}

function GooglePayIcon() {
  return (
    <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
      <rect width="44" height="28" rx="4" fill="white" stroke="#E0E0E0" />
      <text x="7" y="18" fill="#4285F4" fontSize="10" fontWeight="700" fontFamily="Arial, sans-serif">G</text>
      <text x="14" y="18" fill="#333" fontSize="10" fontWeight="500" fontFamily="Arial, sans-serif">Pay</text>
    </svg>
  );
}

function PayPalIcon() {
  return (
    <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
      <rect width="44" height="28" rx="4" fill="#003087" />
      <text x="22" y="18" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="Arial, sans-serif">PayPal</text>
    </svg>
  );
}

const jost = { fontFamily: "var(--font-jost)" } as const;

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="w-full bg-[#F8F8F8]">
      <Container>
        {/* Nav columns */}
        <div className="pt-16 pb-12 grid grid-cols-4 gap-8">
          {[
            { heading: "Shop", links: shopLinks },
            { heading: "Customer Service", links: customerServiceLinks },
            { heading: "Company", links: companyLinks },
            { heading: "Privacy & Legal", links: legalLinks },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <p
                className="mb-6 text-[14px] leading-normal font-semibold text-black uppercase tracking-widest"
                style={jost}
              >
                {heading}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-[14px] leading-normal font-normal text-black hover:underline"
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

        <hr className="border-t border-black/10" />

        {/* Newsletter + Social */}
        <div className="py-12 grid grid-cols-[1fr_1fr_auto] gap-16 items-center">
          <div>
            <p className="mb-3 text-[14px] leading-normal font-semibold text-black" style={jost}>
              Sign up for our newsletter
            </p>
            <p className="text-[14px] leading-normal font-normal text-black" style={jost}>
              Be the first to know about new arrivals, exclusive offers, and special promotions.
            </p>
          </div>

          <div className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email address"
              className="flex-1 min-w-0 border border-black/20 bg-transparent px-4 py-3 text-[14px] leading-normal font-normal text-black placeholder:text-black/40 outline-none focus:border-black"
              style={jost}
            />
            <button
              type="button"
              className="bg-black text-white px-6 py-3 text-[14px] leading-normal font-normal uppercase tracking-widest whitespace-nowrap hover:bg-black/80 transition-colors"
              style={jost}
            >
              Subscribe
            </button>
          </div>

          <div>
            <p className="mb-4 text-[14px] leading-normal font-semibold text-black" style={jost}>
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
                  <Image src={src} alt={label} width={20} height={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-t border-black/10" />

        {/* Bottom bar */}
        <div className="py-6 flex items-center justify-between">
          <LogoComponent />

          <p className="text-[14px] leading-normal font-normal text-black" style={jost}>
            © 2026 &nbsp; Logo &nbsp; All rights reserved
          </p>

          <div className="flex items-center gap-2">
            <VisaIcon />
            <MastercardIcon />
            <GooglePayIcon />
            <PayPalIcon />
          </div>
        </div>
      </Container>
    </footer>
  );
}
