"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { UsersService } from "@/servises/users.service";
import { Container } from "@/components/ui/Container";

const navItems = [
  { label: "Catalog", href: "/admin/catalog" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Customers", href: "/admin/customers" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    console.log("[Admin] checking auth...");
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("[Admin] unauthorized, redirecting");
      router.replace("/login");
      return;
    }

    UsersService.getProfile()
      .then((profile) => {
        console.log(`[Admin] user role=${profile.role}`);
        if (profile.role?.toUpperCase() !== "ADMIN") {
          console.warn("[Admin] unauthorized, redirecting");
          router.replace("/login");
          return;
        }
        setReady(true);
      })
      .catch((err) => {
        console.error("[Admin] auth check failed:", err);
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          localStorage.removeItem("token");
        }
        router.replace("/login");
      });
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-sm text-gray-400 tracking-widest uppercase">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Container className="flex">
      <aside className="hidden md:flex flex-col w-52 shrink-0 border-r border-gray-100 py-10 px-6">
        <p className="text-[9px] tracking-[0.2em] text-gray-400 uppercase mb-6">Admin</p>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[10px] tracking-widest uppercase py-2 px-3 transition-colors ${
                  active
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <nav className="md:hidden flex gap-1 px-4 pt-6 pb-0 border-b border-gray-100">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[10px] tracking-widest uppercase pb-3 px-2 border-b-2 transition-colors ${
                  active
                    ? "border-gray-900 text-gray-900 font-medium"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 px-6 py-10">{children}</main>
      </div>
      </Container>
    </div>
  );
}
