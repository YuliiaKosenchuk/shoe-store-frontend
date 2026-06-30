"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AccordionRow {
  label: string;
  value: string;
}

interface AccordionSection {
  title: string;
  content: string | AccordionRow[];
}

interface ProductAccordionProps {
  sections: AccordionSection[];
}

export function ProductAccordion({ sections }: ProductAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div>
      {sections.map((section, i) => {
        const isOpen = openIndexes.has(i);
        return (
          <div key={section.title} className="border-b border-[#EBEBEB]">
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between py-4 text-left"
            >
              <span className="font-(family-name:--font-cormorant-garamond) text-[20px] leading-[1.3] font-semibold text-[#010101]">
                {section.title}
              </span>
              <ChevronDown
                size={24}
                strokeWidth={1.25}
                className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
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
                  {Array.isArray(section.content) ? (
                    <dl className="font-(family-name:--font-jost) text-[16px] pb-4">
                      {section.content.map((row) => (
                        <div key={row.label} className="grid grid-cols-[1fr_1.5fr] py-2">
                          <dt className="text-[16px] text-[#4E4E4E]">{row.label}</dt>
                          <dd className="text-[16px] font-medium text-[#010101]">{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="font-(family-name:--font-jost) text-[16px] text-[#4E4E4E] leading-relaxed pb-4">
                      {section.content}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
