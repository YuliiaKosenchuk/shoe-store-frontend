"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { UsersService } from "@/servises/users.service";

const navItems = [
  { label: "NEW ARRIVALS" },
  { label: "DESIGNERS" },
  { label: "SHOES" },
  { label: "BAGS" },
  { label: "ACCESSORIES" },
  { label: "VACATION SHOP" },
  { label: "SALE", className: "text-red-500" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [initials, setInitials] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setInitials(null);
      return;
    }

    UsersService.getProfile()
      .then((profile) => {
        const i = `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();
        setInitials(i);
      })
      .catch(() => {
        setInitials(null);
      });
  }, [pathname]);

  return (
    <header className="bg-white border-b border-gray-100 relative z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          className="lg:hidden p-1 -ml-1 hover:opacity-60 transition-opacity"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>

        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <span
              key={item.label}
              className={`text-[11px] tracking-widest font-medium cursor-pointer hover:opacity-60 transition-opacity ${item.className ?? "text-black"}`}
            >
              {item.label}
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Search size={18} strokeWidth={1.5} className="cursor-pointer hover:opacity-60 transition-opacity" />

          {initials ? (
            <Link href="/cabinet" aria-label="My cabinet">
              <div className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-black text-white">
                <span className="text-[9px] font-medium tracking-wide leading-none">{initials}</span>
              </div>
            </Link>
          ) : (
            <Link href="/login" aria-label="Sign in">
              <User size={18} strokeWidth={1.5} className="cursor-pointer hover:opacity-60 transition-opacity" />
            </Link>
          )}

          <Heart size={18} strokeWidth={1.5} className="cursor-pointer hover:opacity-60 transition-opacity" />
          <ShoppingBag size={18} strokeWidth={1.5} className="cursor-pointer hover:opacity-60 transition-opacity" />
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden flex flex-col border-t border-gray-100 bg-white">
          {navItems.map((item) => (
            <span
              key={item.label}
              className={`px-6 py-4 text-[11px] tracking-widest font-medium cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50 ${item.className ?? "text-black"}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </span>
          ))}
        </nav>
      )}
    </header>
  );
}
