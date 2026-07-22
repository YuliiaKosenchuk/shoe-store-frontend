"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { useBreadcrumbStore } from "@/store/breadcrumb.store";

const ALLOWED_PREFIXES = ["/bags", "/shoes", "/accessories", "/wishlist", "/new-arrivals", "/bestsellers", "/sale"];

function isAllowed(pathname: string): boolean {
  return ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

const ALL_PREFIX_CATEGORIES = ["bags", "shoes", "accessories"];

function formatSegment(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const pageTitle = useBreadcrumbStore((state) => state.pageTitle);

  if (!isAllowed(pathname)) return null;

  const segments = pathname.split("/").filter(Boolean);
  const isProductPage = segments.length === 2 && /^\d+$/.test(segments[1]);

  const crumbs = segments
    .map((seg, i) => {
      const isLast = i === segments.length - 1;
      const isDynamicId = /^\d+$/.test(seg);
      if (isDynamicId && !pageTitle) return null;
      const isTopCategory = i === 0 && ALL_PREFIX_CATEGORIES.includes(seg);
      const label =
        isDynamicId && pageTitle
          ? pageTitle
          : isTopCategory
            ? `All ${formatSegment(seg)}`
            : formatSegment(seg);
      return {
        label,
        href: "/" + segments.slice(0, i + 1).join("/"),
        isLast,
      };
    })
    .filter((c) => c !== null);

  return (
    <nav aria-label="Breadcrumb" className={isProductPage ? "hidden md:block" : undefined}>
      <Container className="px-8">
        <ol className="flex items-center gap-3 py-4.5 font-(family-name:--font-jost) text-[14px] leading-normal font-light">
          <li>
            <Link
              href="/"
              className="text-black hover:text-[#7A2633] transition-colors"
            >
              Home
            </Link>
          </li>
          {crumbs.map((crumb) => (
            <li key={crumb.href} className="flex items-center gap-3">
              <span className="text-black">/</span>
              {crumb.isLast ? (
                <span className="relative group">
                  <span className="text-black underline underline-offset-4 max-w-60 truncate block">
                    {crumb.label}
                  </span>
                  <span className="pointer-events-none absolute left-0 top-full mt-1.5 z-50 whitespace-nowrap bg-white text-black text-[12px] font-light px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    {crumb.label}
                  </span>
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-black hover:text-[#7A2633] transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  );
}
