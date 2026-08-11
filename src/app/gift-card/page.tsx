"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ProductImageGallery } from "@/app/[category]/[id]/_components/ProductImageGallery";
import { ProductAccordion } from "@/app/[category]/[id]/_components/ProductAccordion";
import YouMayAlsoLikeSection from "@/components/layout/YouMayAlsoLikeSection";
import SocialSection from "@/components/layout/SocialSection";

const GIFT_CARD_IMAGES = ["/images/gift-1.jpg", "/images/gift-2.jpg", "/images/gift-3.jpg", "/images/gift-4.jpg"];

const DENOMINATIONS = [50, 100, 200, 300, 500];

const accordionSections = [
  {
    title: "Description",
    content:
      "Give the gift of choice. Our gift card can be redeemed online towards any item in the collection and never expires.",
  },
  {
    title: "Shipping & Returns",
    content:
      "Gift cards are delivered digitally by email and are non-returnable.",
  },
];

export default function GiftCardPage() {
  const [selectedDenomination, setSelectedDenomination] = useState(100);

  return (
    <>
      <Container className="grid grid-cols-1 lg:grid-cols-[628fr_517fr] gap-0 lg:gap-[clamp(40px,11vw,133px)] px-4 lg:px-8 py-6 lg:py-10">
        <div>
          <ProductImageGallery images={GIFT_CARD_IMAGES} productName="Gift card" />
        </div>

        <div className="min-w-0 space-y-6 pt-6 lg:pt-0">
          <div>
            <h1 className="font-(family-name:--font-cormorant-garamond) text-4xl font-semibold leading-tight text-black mb-6">
              Gift card
            </h1>
            <div className="mb-6">
              <span className="font-(family-name:--font-jost) text-[20px] font-medium">
                €{selectedDenomination.toLocaleString()}
              </span>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-5 font-(family-name:--font-jost) text-sm text-[#010101] leading-normal">
              {DENOMINATIONS.map((value) => {
                const isSelected = value === selectedDenomination;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSelectedDenomination(value)}
                    aria-pressed={isSelected}
                    className="font-(family-name:--font-jost) text-sm font-light px-0.5 text-[#010101] cursor-pointer hover:text-[#7A2633] transition-colors duration-150"
                  >
                    <span className={isSelected ? "border-b border-[#010101]" : ""}>
                      {value}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-2 flex gap-px">
            <button
              type="button"
              disabled
              className="flex-1 flex items-center justify-center gap-3 h-13 bg-[#DADADA] text-[#818181] font-(family-name:--font-jost) text-sm tracking-widest uppercase cursor-not-allowed"
            >
              Coming soon
            </button>
          </div>

          <ProductAccordion sections={accordionSections} />
        </div>
      </Container>

      <YouMayAlsoLikeSection excludeId={-1} />
      <SocialSection />
    </>
  );
}
