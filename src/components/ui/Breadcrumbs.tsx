"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { useBreadcrumbStore } from "@/store/breadcrumb.store";

const ALLOWED_PREFIXES = ["/bags", "/shoes", "/accessories", "/wishlist", "/new-arrivals", "/bestsellers", "/sale"];

function isAllowed(pathname: string): boolean {
  return ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

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

  const crumbs = segments
    .map((seg, i) => {
      const isLast = i === segments.length - 1;
      const isDynamicId = /^\d+$/.test(seg);
      if (isDynamicId && !pageTitle) return null;
      return {
        label: isDynamicId && pageTitle ? pageTitle : formatSegment(seg),
        href: "/" + segments.slice(0, i + 1).join("/"),
        isLast,
      };
    })
    .filter((c) => c !== null);

  return (
    <nav aria-label="Breadcrumb">
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
                <span className="text-black underline underline-offset-4">
                  {crumb.label}
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
