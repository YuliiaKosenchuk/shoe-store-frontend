"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const InstagramIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-black shrink-0"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const stylePhotos = [
  { id: 1, src: "/images/style-111.jpg", username: "@emmaslife" },
  { id: 2, src: "/images/style-222.jpg", username: "@styledbynico" },
  { id: 3, src: "/images/style-333.jpg", username: "@foxy" },
  { id: 4, src: "/images/style-444.jpg", username: "@emmaslife" },
  { id: 5, src: "/images/style-555.jpg", username: "@styledbynico" },
];

export default function SocialSection() {
  const [hovered, setHovered] = useState<number | null>(3);

  return (
    <section className="pb-16">
      <Container className="px-4 md:px-8">
        <div className="flex items-start justify-between mb-7">
          <div>
            <h2
              className="text-[28px] md:text-[36px] leading-[1.1] tracking-tight text-black font-semibold"
              style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            >
              Show how you style it
            </h2>
          </div>
          <Link
            href="/community"
            className="flex items-center gap-1.5 text-[18px] md:text-[26px] font-semibold leading-[1.2] text-black hover:text-[#7A2633] transition-colors"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            See all
            <Image
              src="/images/arrow-right-hero.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
            />
          </Link>
        </div>
        <p
          className="text-[16px] leading-[1.3] text-black mb-8"
          style={{ fontFamily: "var(--font-jost)" }}
        >
          Inspire our community with your ATELIER MODE style. Share your photo
          and get featured. Tag @ateliermode for a chance to be showcased.
        </p>
      </Container>

      {/* Mobile/tablet: plain horizontal scroll, fixed-width images, no gap */}
      <div className="flex lg:hidden overflow-x-auto h-101.75 md:h-103.75">
        {stylePhotos.map((photo) => (
          <div
            key={photo.id}
            className="relative overflow-hidden w-62.5 shrink-0"
          >
            <Image
              src={photo.src}
              alt={`Style photo by ${photo.username}`}
              fill
              className="object-cover object-top"
              sizes="250px"
              quality={100}
              priority={photo.id === 3}
            />

            {/* Username badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white px-3 py-1.5">
              {InstagramIcon}
              <span
                className="text-[16px] text-black leading-[1.3] whitespace-nowrap"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                {photo.username}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: accordion behavior on hover */}
      <div className="hidden lg:flex overflow-hidden h-168.5">
        {stylePhotos.map((photo) => (
          <motion.div
            key={photo.id}
            className="relative overflow-hidden cursor-pointer shrink-0 basis-0"
            animate={{ flexGrow: hovered === photo.id ? 2.6 : 1 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            onMouseEnter={() => setHovered(photo.id)}
            onMouseLeave={() => setHovered(3)}
          >
            <Image
              src={photo.src}
              alt={`Style photo by ${photo.username}`}
              fill
              className="object-cover object-top"
              sizes="40vw"
              quality={100}
              priority={photo.id === 3}
            />

            {/* Username badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white px-3 py-1.5">
              {InstagramIcon}
              <span
                className="text-[16px] text-black leading-[1.3] whitespace-nowrap"
                style={{ fontFamily: "var(--font-jost)" }}
              >
                {photo.username}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
