"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { UsersService } from "@/servises/users.service";

const navItems = [
  { label: "BAGS", href: "/" },
  { label: "SHOES", href: "/" },
  { label: "ACCESSORIES", href: "/" },
];

const adminNavItems = [
  { label: "CATALOG", href: "/admin/catalog" },
  { label: "ORDERS", href: "/admin/orders" },
  { label: "CUSTOMERS", href: "/admin/customers" },
];

const iconCls = "cursor-pointer hover:opacity-40 transition-opacity";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [initials, setInitials] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      const token = localStorage.getItem("token");
      if (!token) return { initials: null, isAdmin: false };
      try {
        const profile = await UsersService.getProfile();
        const i = `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();
        return { initials: i, isAdmin: profile.role?.toUpperCase() === "ADMIN" };
      } catch {
        return { initials: null, isAdmin: false };
      }
    }

    loadUser().then((result) => {
      if (!cancelled) {
        setInitials(result.initials);
        setIsAdmin(result.isAdmin);
      }
    });

    return () => { cancelled = true; };
  }, [pathname]);

  return (
    <header className="bg-white border-b border-[#EBEBEB] relative z-50">
      <div className="grid grid-cols-3 items-center px-8 py-4">

        {/* Left — nav (desktop) / hamburger (mobile) */}
        <div className="flex items-center gap-7">
          <button
            className="lg:hidden hover:opacity-40 transition-opacity"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={18} strokeWidth={1} /> : <Menu size={18} strokeWidth={1} />}
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[10px] tracking-[0.2em] font-medium text-black hover:opacity-40 transition-opacity"
              >
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <>
                <span className="h-3 w-px bg-black/20" />
                {adminNavItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-[10px] tracking-[0.2em] font-medium text-[#B8893E] hover:opacity-40 transition-opacity"
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            )}
          </nav>
        </div>

        {/* Center — brand */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="font-serif text-xl tracking-wide text-black hover:opacity-60 transition-opacity select-none"
          >
            Sharman
          </Link>
        </div>

        {/* Right — icons */}
        <div className="flex items-center justify-end gap-5">
          <Search size={17} strokeWidth={1} className={iconCls} />

          {initials ? (
            <Link href="/cabinet" aria-label="My cabinet">
              <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-black text-white">
                <span className="text-[8px] font-medium tracking-wide leading-none">{initials}</span>
              </div>
            </Link>
          ) : (
            <Link href="/login" aria-label="Sign in">
              <User size={17} strokeWidth={1} className={iconCls} />
            </Link>
          )}

          <Heart size={17} strokeWidth={1} className={iconCls} />
          <ShoppingBag size={17} strokeWidth={1} className={iconCls} />
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="lg:hidden flex flex-col border-t border-[#EBEBEB] bg-white">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-8 py-4 text-[10px] tracking-[0.2em] font-medium text-black border-b border-[#EBEBEB] hover:opacity-40 transition-opacity"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {isAdmin && (
            <>
              <div className="px-8 pt-5 pb-2 text-[9px] tracking-[0.2em] text-black/35 uppercase">Admin</div>
              {adminNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-8 py-4 text-[10px] tracking-[0.2em] font-medium text-[#B8893E] border-b border-[#EBEBEB] hover:opacity-40 transition-opacity"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </>
          )}
        </nav>
      )}
    </header>
  );
}
