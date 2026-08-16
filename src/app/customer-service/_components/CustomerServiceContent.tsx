"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { faqSections, lastUpdatedBySection } from "../_data/content";
import { FaqAccordion } from "./FaqAccordion";
import { SizeGuideSection } from "./SizeGuideSection";
import { SupportSidebar } from "./SupportSidebar";
import { useFaqSearch } from "@/hooks/useFaqSearch";

const DEFAULT_TAB = faqSections[0].id;

export function CustomerServiceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const tabParam = searchParams.get("tab");
  const activeTab = faqSections.some((section) => section.id === tabParam) ? tabParam! : DEFAULT_TAB;
  const activeSection = faqSections.find((section) => section.id === activeTab) ?? faqSections[0];

  const { query, setQuery, trimmed, results, isEmpty } = useFaqSearch({ maxResults: 6 });

  const goToTab = (tabId: string) => {
    setOpenItemId(null);
    router.replace(`/customer-service?tab=${tabId}`, { scroll: false });
  };

  const selectResult = (sectionId: string, itemId: string) => {
    setOpenItemId(itemId);
    setQuery("");
    if (sectionId !== activeTab) {
      router.replace(`/customer-service?tab=${sectionId}`, { scroll: false });
    }
  };

  const lastUpdated = lastUpdatedBySection[activeTab];

  return (
    <div>
      {/* Search */}
      <div className="relative w-full mb-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="find your question"
          className="w-full border-0 border-b-[0.5px] border-b-[#4E4E4E] bg-transparent px-4 py-3 pr-10 text-[16px] text-[#010101] placeholder:text-[16px] placeholder:text-[#B3B3B3] outline-none transition-colors"
        />
        {query ? (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4E4E4E]"
          >
            <X size={18} strokeWidth={1.25} />
          </button>
        ) : (
          <Search
            size={24}
            strokeWidth={1.25}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4E4E4E]"
          />
        )}

        {trimmed.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-80 overflow-y-auto border border-[#EBEBEB] bg-white shadow-sm">
            {isEmpty ? (
              <p className="px-4 py-3 text-[14px] text-[#888]">No results found.</p>
            ) : (
              results.map((result) => (
                <button
                  key={result.itemId}
                  onClick={() => selectResult(result.sectionId, result.itemId)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-[#F8F8F8] transition-colors"
                >
                  <span className="text-[16px] text-black">{result.question}</span>
                  <span className="shrink-0 text-[12px] tracking-widest text-[#888]">
                    {result.sectionLabel}
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Tab nav */}
      <nav className="flex flex-wrap justify-between gap-4 pb-4 mb-8">
        {faqSections.map((section) => {
          const isActive = section.id === activeTab;
          return (
            <button
              key={section.id}
              onClick={() => goToTab(section.id)}
              className={`w-fit relative font-(family-name:--font-jost) text-[16px] leading-[1.3] text-black after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current after:origin-left after:transition-transform after:duration-300 ${
                isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
              }`}
            >
              {section.label}
            </button>
          );
        })}
      </nav>

      {/* Content + sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-16 md:gap-32.5">
        <div>
          {activeSection.type === "accordion" ? (
            <FaqAccordion items={activeSection.items} openItemId={openItemId} />
          ) : (
            <SizeGuideSection />
          )}
          {lastUpdated && (
            <p className="font-(family-name:--font-jost) font-medium text-[16px] text-[#010101] mt-6">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>
        <SupportSidebar />
      </div>
    </div>
  );
}
