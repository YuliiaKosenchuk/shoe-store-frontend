"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Heart, Menu, X } from "lucide-react";
import { CartIcon } from "@/components/ui/CartIcon";
import { UsersService } from "@/servises/users.service";
import { useWishlistStore } from "@/store/wishlist.store";
import { useCart } from "@/hooks/useCart";
import LogoComponent from "../ui/LogoComponent";
import { Container } from "../ui/Container";
import MegaMenu, { MegaMenuData } from "./MegaMenu";
import { CartDrawer } from "./CartDrawer";

type NavItem = {
  label: string;
  href: string;
  menu?: MegaMenuData;
  /** When false, the top-level label doesn't navigate on click — only the mega menu links do. */
  navigatesOnClick?: boolean;
};

const navItems: NavItem[] = [
  {
    label: "Bags",
    href: "/bags",
    navigatesOnClick: false,
    menu: {
      categories: [
        { label: "All bags", href: "/bags" },
        { label: "Top handles", href: "#" },
        { label: "Totes", href: "#" },
        { label: "Backpacks", href: "#" },
        { label: "Buckets", href: "#" },
      ],
      secondary: [
        { label: "Bestsellers", href: "#" },
        { label: "Sale", href: "#" },
      ],
      handpicked: [
        { label: "New collection", href: "#" },
        { label: "Gift card", href: "#" },
      ],
      featured: [
        { name: "Dorri chocolate", image: "/images/dori.png", href: "#" },
        { name: "Backpack desert", image: "/images/backpack.png", href: "#" },
      ],
    },
  },
  {
    label: "Shoes",
    href: "/shoes",
    navigatesOnClick: false,
    menu: {
      categories: [
        { label: "All shoes", href: "/shoes" },
        { label: "Sandals", href: "#" },
        { label: "Heels", href: "#" },
        { label: "Loafers", href: "#" },
        { label: "Mules", href: "#" },
        { label: "Sneakers", href: "#" },
        { label: "Boots", href: "#" },
        { label: "Flats", href: "#" },
      ],
      secondary: [
        { label: "Bestsellers", href: "#" },
        { label: "Sale", href: "#" },
      ],
      handpicked: [
        { label: "New collection", href: "#" },
        { label: "Gift card", href: "#" },
      ],
      featured: [
        {
          name: "The Square Sling",
          image: "/images/slings.png",
          href: "/shoes",
        },
        { name: "The Urban", image: "/images/urban.png", href: "/shoes" },
      ],
    },
  },
  {
    label: "Accessories",
    href: "/accessories",
    navigatesOnClick: false,
    menu: {
      categories: [
        { label: "All accessories", href: "/accessories" },
        { label: "Jewellery", href: "#" },
        { label: "Belts", href: "#" },
        { label: "Sunglasses", href: "#" },
        { label: "Wraps", href: "#" },
      ],
      secondary: [
        { label: "Bestsellers", href: "#" },
        { label: "Sale", href: "#" },
      ],
      handpicked: [
        { label: "New collection", href: "#" },
        { label: "Gift card", href: "#" },
      ],
      featured: [
        { name: "Opaline", image: "/images/opaline.png", href: "/accessories" },
        {
          name: "Horizon sunglasses",
          image: "/images/horizon.png",
          href: "/accessories",
        },
      ],
    },
  },
  {
    label: "About us",
    href: "/about-us",
    menu: {
      categoriesLabel: "Customer Service",
      categories: [
        { label: "Our philosophy", href: "/about-us" },
        { label: "Natural materials", href: "#" },
        { label: "Craftsmanship", href: "#" },
        { label: "Sustainability", href: "#" },
        { label: "Editorials", href: "#" },
      ],
      handpicked: [
        { label: "New collection", href: "#" },
        { label: "Gift card", href: "#" },
      ],
      featured: [
        {
          name: "Natural materials",
          image: "/images/materials.png",
          href: "/materials",
        },
      ],
    },
  },
  {
    label: "Help",
    href: "/help",
    menu: {
      categoriesLabel: "Customer Service",
      categories: [
        { label: "Track my order", href: "#" },
        { label: "Contact us", href: "#" },
        { label: "Cookies", href: "#" },
        { label: "Care instructions", href: "#" },
        { label: "FAQ", href: "/help" },
        { label: "Size guide", href: "#" },
      ],
      handpicked: [
        { label: "New collection", href: "#" },
        { label: "Gift card", href: "#" },
      ],
      featured: [{ name: "Gift cards", image: "/images/gift.png", href: "#" }],
    },
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [initials, setInitials] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const wishlistCount = useWishlistStore((state) =>
    state.hasHydrated ? state.items.length : 0,
  );
  const { cart, hasHydrated: cartHydrated } = useCart();
  const cartCount = cartHydrated
    ? (cart?.cartItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0)
    : 0;

  const openDropdown = (label: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setHoveredNav(label);
  };

  const scheduleClose = () => {
    closeTimeout.current = setTimeout(() => setHoveredNav(null), 100);
  };

  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, []);

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

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const isTransparent = isHome && !scrolled && !hoveredNav;

  const iconCls = isTransparent
    ? "cursor-pointer text-white hover:opacity-70 transition-opacity"
    : "cursor-pointer hover:text-[#7A2633] transition-colors";

  const navLinkCls = (isActive: boolean) =>
    isTransparent
      ? `text-[14px] font-normal text-white relative after:absolute after:-bottom-[2px] after:left-0 after:h-px after:w-full after:bg-current after:origin-left after:transition-transform after:duration-300${isActive ? " after:scale-x-100" : " after:scale-x-0 hover:after:scale-x-100"}`
      : `text-[14px] font-normal text-black relative after:absolute after:-bottom-[2px] after:left-0 after:h-px after:w-full after:bg-current after:origin-left after:transition-transform after:duration-300${isActive ? " after:scale-x-100" : " after:scale-x-0 hover:after:scale-x-100"}`;

  return (
    <header
      onMouseLeave={scheduleClose}
      className={`relative w-full z-10 h-18 ${isTransparent ? "bg-transparent" : "bg-white"}`}
    >
      <Container className="h-full">
        <div className="grid grid-cols-3 h-full items-center px-8">
          {/* Left — nav (desktop) / hamburger (mobile) */}
          <div className="flex items-center gap-7">
            <button
              className={
                isTransparent
                  ? "lg:hidden text-white hover:opacity-70 transition-opacity"
                  : "lg:hidden hover:text-[#7A2633] transition-colors"
              }
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
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <div
                    key={item.label}
                    onMouseEnter={() =>
                      item.menu ? openDropdown(item.label) : setHoveredNav(null)
                    }
                  >
                    {item.navigatesOnClick === false ? (
                      <span
                        className={`cursor-default ${navLinkCls(isActive)}`}
                      >
                        {item.label}
                      </span>
                    ) : (
                      <Link href={item.href} className={navLinkCls(isActive)}>
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          <div
            onMouseEnter={scheduleClose}
            className={
              isTransparent ? "[&_img]:brightness-0 [&_img]:invert" : ""
            }
          >
            <LogoComponent />
          </div>

          {/* Right — icons */}
          <div
            onMouseEnter={scheduleClose}
            className="flex items-center justify-end gap-5"
          >
            <Search size={24} strokeWidth={1.25} className={iconCls} />

            {initials ? (
              <Link
                href="/cabinet"
                aria-label="My cabinet"
                className="hover:opacity-70 transition-opacity"
              >
                <div
                  className={`flex h-4.5 w-4.5 items-center justify-center rounded-full ${isTransparent ? "bg-white text-black" : "bg-black text-white"}`}
                >
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

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className={`relative ${iconCls}`}
            >
              <Heart size={24} strokeWidth={1.25} />
              {wishlistCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 flex h-3.25 min-w-3.25 items-center justify-center rounded-full bg-[#7A2633] px-0.75 font-(family-name:--font-jost) text-[10px] font-normal leading-[1.3] text-white"
                >
                  <span className="">{wishlistCount}</span>
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setCartDrawerOpen(true)}
              aria-label="Cart"
              className={`relative ${iconCls}`}
            >
              <CartIcon className="" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 flex h-3.25 min-w-3.25 items-center justify-center rounded-full bg-[#7A2633] px-0.75 font-(family-name:--font-jost) text-[10px] font-normal leading-[1.3] text-white"
                >
                  <span className="">{cartCount}</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mega menu */}
      {navItems.map((item) =>
        item.menu && hoveredNav === item.label ? (
          <MegaMenu
            key={item.label}
            data={item.menu}
            onClose={() => setHoveredNav(null)}
          />
        ) : null,
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="lg:hidden flex flex-col border-t border-[#EBEBEB] bg-white">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-8 py-4 font-(family-name:--font-jost) text-[14px] font-light text-black border-b border-[#EBEBEB] relative after:absolute after:bottom-4 after:left-8 after:h-px after:w-[calc(100%-4rem)] after:bg-current after:origin-left after:transition-transform after:duration-300${isActive ? " after:scale-x-100" : " after:scale-x-0 hover:after:scale-x-100"}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
      />
    </header>
  );
}
