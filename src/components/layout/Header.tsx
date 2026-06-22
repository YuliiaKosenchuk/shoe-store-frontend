"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Heart, Menu, X, Handbag } from "lucide-react";
import { UsersService } from "@/servises/users.service";
import { useWishlistStore } from "@/store/wishlist.store";
import LogoComponent from "../ui/LogoComponent";
import { Container } from "../ui/Container";

const navItems = [
  { label: "Bags", href: "/bags" },
  { label: "Shoes", href: "/shoes" },
  { label: "Accessories", href: "/accessories" },
  { label: "About us", href: "/" },
  { label: "Help", href: "/" },
];

const iconCls = "cursor-pointer hover:text-[#7A2633] transition-colors";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [initials, setInitials] = useState<string | null>(null);
  const pathname = usePathname();
  const wishlistCount = useWishlistStore((state) =>
    state.hasHydrated ? state.items.length : 0
  );

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      const token = localStorage.getItem("token");
      if (!token) return null;
      try {
        const profile = await UsersService.getProfile();
        return `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();
      } catch {
        return null;
      }
    }

    loadUser().then((result) => {
      if (!cancelled) setInitials(result);
    });

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <header
      className={
        isHome
          ? "relative w-full z-10 h-18" //bg-[#ece9e2]
          : "relative w-full z-10 h-18"
      }
    >
      <Container className="h-full">
        <div className="grid grid-cols-3 h-full items-center px-8">
        {/* Left — nav (desktop) / hamburger (mobile) */}
        <div className="flex items-center gap-7">
          <button
            className="lg:hidden hover:text-[#7A2633] transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X size={24} strokeWidth={1.25} />
            ) : (
              <Menu size={24} strokeWidth={1.25} />
            )}
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[14px] font-light text-black hover:text-[#7A2633] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <LogoComponent />

        {/* Right — icons */}
        <div className="flex items-center justify-end gap-5">
          <Search size={24} strokeWidth={1.25} className={iconCls} />

          {initials ? (
            <Link href="/cabinet" aria-label="My cabinet" className="hover:opacity-70 transition-opacity">
              <div className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-black text-white">
                <span className="font-(family-name:--font-jost) text-[8px] font-medium tracking-wide leading-none">
                  {initials}
                </span>
              </div>
            </Link>
          ) : (
            <Link href="/login" aria-label="Sign in" className={iconCls}>
              <User size={24} strokeWidth={1.25} />
            </Link>
          )}

          <Link href="/wishlist" aria-label="Wishlist" className={`relative ${iconCls}`}>
            <Heart size={24} strokeWidth={1.25} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-white font-(family-name:--font-jost) text-[8px] font-medium leading-none">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Handbag size={24} strokeWidth={1.25} className={iconCls} />
        </div>
      </div>
      </Container>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="lg:hidden flex flex-col border-t border-[#EBEBEB] bg-white">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-8 py-4 font-(family-name:--font-jost) text-[14px] font-light text-black border-b border-[#EBEBEB] hover:text-[#7A2633] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
