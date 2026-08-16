import { useEffect, useState } from "react";
import { faqSections, type AnswerBlock, type FaqItem } from "@/app/customer-service/_data/content";

export interface FaqSearchResult {
  sectionId: string;
  sectionLabel: string;
  itemId: string;
  question: string;
}

function answerToText(answer: FaqItem["answer"]): string {
  if (typeof answer === "string") return answer;
  return answer
    .map((block: AnswerBlock) => {
      if (block.kind === "p") return block.text;
      if (block.kind === "list") return block.items.join(" ");
      return `${block.title} ${block.text}`;
    })
    .join(" ");
}

const searchableItems = faqSections
  .filter((section) => section.type === "accordion")
  .flatMap((section) =>
    section.items.map((item) => ({
      sectionId: section.id,
      sectionLabel: section.label,
      itemId: item.id,
      question: item.question,
      text: `${item.question} ${answerToText(item.answer)}`.toLowerCase(),
    })),
  );

interface UseFaqSearchOptions {
  maxResults?: number;
}

export function useFaqSearch({ maxResults = 6 }: UseFaqSearchOptions = {}) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const trimmed = debouncedQuery.trim().toLowerCase();

  const allResults: FaqSearchResult[] =
    trimmed.length === 0
      ? []
      : searchableItems
          .filter((item) => item.text.includes(trimmed))
          .map(({ sectionId, sectionLabel, itemId, question }) => ({
            sectionId,
            sectionLabel,
            itemId,
            question,
          }));

  const results = allResults.slice(0, maxResults);
  const isEmpty = trimmed.length > 0 && results.length === 0;
  const hasMoreResults = allResults.length > maxResults;

  return {
    query,
    setQuery,
    trimmed,
    results,
    isEmpty,
    hasMoreResults,
  };
}
