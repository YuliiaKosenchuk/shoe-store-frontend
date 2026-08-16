"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { AnswerBlock, FaqItem } from "../_data/content";

interface FaqAccordionProps {
  items: FaqItem[];
  openItemId?: string | null;
}

function AnswerContent({ answer }: { answer: FaqItem["answer"] }) {
  if (typeof answer === "string") {
    return (
      <div className="font-(family-name:--font-jost) text-[16px] text-[#4E4E4E] leading-[1.3] pb-4 space-y-3">
        {answer.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    );
  }

  return (
    <div className="font-(family-name:--font-jost) text-[16px] text-[#4E4E4E] leading-[1.3] pb-4 space-y-3">
      {answer.map((block: AnswerBlock, i) => {
        if (block.kind === "p") {
          return <p key={i}>{block.text}</p>;
        }
        if (block.kind === "list") {
          return (
            <ul key={i} className="list-disc pl-5 space-y-1">
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <div key={i}>
            <p className="text-[#010101] font-medium mb-1">{block.title}</p>
            <p>{block.text}</p>
          </div>
        );
      })}
    </div>
  );
}

export function FaqAccordion({ items, openItemId }: FaqAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Derived-state sync: when a new openItemId arrives (e.g. from search), fold it
  // into openIds during render rather than in an effect, per React's guidance on
  // adjusting state from props without triggering a cascading effect render.
  const [appliedOpenItemId, setAppliedOpenItemId] = useState<string | null>(null);
  if (openItemId && openItemId !== appliedOpenItemId) {
    setAppliedOpenItemId(openItemId);
    setOpenIds((prev) => new Set(prev).add(openItemId));
  }

  useEffect(() => {
    if (!openItemId) return;
    const el = itemRefs.current.get(openItemId);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [openItemId]);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div
            key={item.id}
            ref={(el) => {
              if (el) itemRefs.current.set(item.id, el);
              else itemRefs.current.delete(item.id);
            }}
            className="border-b border-[#EBEBEB]"
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between gap-4 py-4 text-left"
            >
              <span className="text-[16px] font-medium text-black">{item.question}</span>
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
                  <AnswerContent answer={item.answer} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
