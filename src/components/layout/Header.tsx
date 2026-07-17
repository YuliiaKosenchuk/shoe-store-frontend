"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
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

const handpickedNavItem: NavItem = {
  label: "Handpicked",
  href: "#",
  menu: {
    secondary: [
      { label: "New collection", href: "#" },
      { label: "Gift card", href: "#" },
    ],
  },
};

const mobileNavItems: NavItem[] = navItems.flatMap((item) =>
  item.label === "Accessories" ? [item, handpickedNavItem] : [item],
);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [initials, setInitials] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [menuTop, setMenuTop] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
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

  const toggleSection = (label: string) => {
    setOpenSection((prev) => (prev === label ? null : label));
  };

  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const updateMenuTop = () => {
      if (headerRef.current) {
        setMenuTop(headerRef.current.getBoundingClientRect().bottom);
      }
    };

    updateMenuTop();
    window.addEventListener("resize", updateMenuTop);
    return () => window.removeEventListener("resize", updateMenuTop);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

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

  const isTransparent = isHome && !scrolled && !hoveredNav && !menuOpen;

  const iconCls = isTransparent
    ? "cursor-pointer text-white hover:opacity-70 transition-opacity"
    : "cursor-pointer hover:text-[#7A2633] transition-colors";

  const navLinkCls = (isActive: boolean) =>
    isTransparent
      ? `text-[14px] font-normal text-white relative after:absolute after:-bottom-[2px] after:left-0 after:h-px after:w-full after:bg-current after:origin-left after:transition-transform after:duration-300${isActive ? " after:scale-x-100" : " after:scale-x-0 hover:after:scale-x-100"}`
      : `text-[14px] font-normal text-black relative after:absolute after:-bottom-[2px] after:left-0 after:h-px after:w-full after:bg-current after:origin-left after:transition-transform after:duration-300${isActive ? " after:scale-x-100" : " after:scale-x-0 hover:after:scale-x-100"}`;

  const userIcon = initials ? (
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
  );

  const wishlistIcon = (
    <Link href="/wishlist" aria-label="Wishlist" className={`relative ${iconCls}`}>
      <Heart size={24} strokeWidth={1.25} />
      {wishlistCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-3.25 min-w-3.25 items-center justify-center rounded-full bg-[#7A2633] px-0.75 font-(family-name:--font-jost) text-[10px] font-normal leading-[1.3] text-white">
          <span className="">{wishlistCount}</span>
        </span>
      )}
    </Link>
  );

  const cartButton = (
    <button
      type="button"
      onClick={() => setCartDrawerOpen(true)}
      aria-label="Cart"
      className={`relative ${iconCls}`}
    >
      <CartIcon className="" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-3.25 min-w-3.25 items-center justify-center rounded-full bg-[#7A2633] px-0.75 font-(family-name:--font-jost) text-[10px] font-normal leading-[1.3] text-white">
          <span className="">{cartCount}</span>
        </span>
      )}
    </button>
  );

  return (
    <header
      ref={headerRef}
      onMouseLeave={scheduleClose}
      className={`relative w-full z-10 h-18 ${isTransparent ? "bg-transparent" : "bg-white"}`}
    >
      <Container className="h-full">
        {/* Desktop layout (>=1115px) */}
        <div className="hidden min-[1115px]:grid grid-cols-3 h-full items-center px-4 md:px-8">
          <nav className="flex items-center gap-7">
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
                    <span className={`cursor-default ${navLinkCls(isActive)}`}>
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
            {userIcon}
            {wishlistIcon}
            {cartButton}
          </div>
        </div>

        {/* Mobile layout (<1115px) */}
        <div className="flex min-[1115px]:hidden h-full items-center justify-between px-4 md:px-8">
          <div
            className={`ml-[-37.5px] ${
              isTransparent ? "[&_img]:brightness-0 [&_img]:invert" : ""
            }`}
          >
            <LogoComponent />
          </div>

          <div className="flex items-center gap-5">
            {userIcon}
            {wishlistIcon}
            {cartButton}

            <button
              type="button"
              className={`relative h-5.5 w-6 shrink-0 ${
                isTransparent
                  ? "text-white hover:opacity-70 transition-opacity"
                  : "hover:text-[#7A2633] transition-colors"
              }`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={`absolute left-0 top-1/2 h-[1.25px] w-6 bg-current transition-transform duration-300 ease-in-out ${
                  menuOpen ? "translate-y-0 rotate-45" : "-translate-y-2.25"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[1.25px] w-6 bg-current transition-opacity duration-200 ease-in-out ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[1.25px] w-6 bg-current transition-transform duration-300 ease-in-out ${
                  menuOpen ? "translate-y-0 -rotate-45" : "translate-y-2.25"
                }`}
              />
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
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="min-[1115px]:hidden fixed inset-x-0 bottom-0 z-40 flex flex-col overflow-y-auto border-t border-[#B3B3B3] bg-white"
            style={{ top: menuTop }}
          >
            {mobileNavItems.map((item) => {
            const isOpen = openSection === item.label;
            const hasMenu = !!item.menu;

            if (!hasMenu) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 md:px-8 py-4 font-(family-name:--font-jost) text-[16px] leading-[1.3] font-normal text-[#010101]"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => toggleSection(item.label)}
                  className="w-full flex items-center justify-between px-4 md:px-8 py-4 text-left"
                >
                  <span className="font-(family-name:--font-jost) text-[16px] leading-[1.3] font-normal text-[#010101]">
                    {item.label}
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`shrink-0 text-[#010101] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  >
                    <path
                      d="M19 12L12 19L5 12M12 19V5"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
                      <div className="px-8 pb-6 flex flex-col gap-4">
                        {[
                          ...(item.menu!.categories ?? []),
                          ...(item.menu!.secondary ?? []),
                        ].map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="font-(family-name:--font-jost) text-[14px] leading-normal font-normal text-[#010101]"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          </motion.nav>
        )}
      </AnimatePresence>

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
      />
    </header>
  );
}
