"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { UsersService, UserProfile } from "@/servises/users.service";
import { AuthService } from "@/servises/auth.service";
import { BackButton } from "@/components/ui/BackButton";

const adminNavItems = [
  { label: "CATALOG", href: "/admin/catalog" },
  { label: "ORDERS", href: "/admin/orders" },
  { label: "CUSTOMERS", href: "/admin/customers" },
];

export default function CabinetPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("[Cabinet] token in localStorage:", token);

    if (!token) {
      console.warn("[Cabinet] No token — redirecting to login");
      router.replace("/login");
      return;
    }

    UsersService.getProfile()
      .then((profile) => {
        console.log("[Cabinet] Profile fetched from API:", profile);
        setUser(profile);
      })
      .catch((err) => {
        console.error("[Cabinet] Failed to fetch profile:", err);

        if (axios.isAxiosError(err) && err.response?.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        } else {
          setError("Failed to load profile. Please try again.");
        }
      });
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-4 text-xs font-medium tracking-widest text-gray-500 uppercase underline underline-offset-4 hover:text-gray-800"
          >
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
        <p className="text-sm text-gray-400 tracking-widest uppercase">Loading…</p>
      </div>
    );
  }

  const firstInitial = user.firstName?.[0] ?? "?";
  const lastInitial = user.lastName?.[0] ?? "";
  const initials = `${firstInitial}${lastInitial}`.toUpperCase();
  const isAdmin = user.role?.toUpperCase() === "ADMIN";

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <BackButton />
      <div className="flex flex-col items-center px-4 py-20">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-black text-white">
          <span className="font-serif text-2xl tracking-wide">{initials}</span>
        </div>

        <h1 className="mt-6 font-serif text-2xl text-gray-900">
          {user.firstName} {user.lastName}
        </h1>

        <div className="mt-8 w-full max-w-sm divide-y divide-gray-200 border border-gray-200 bg-white">
          <Row label="Email" value={user.email} />
          {user.phoneNumber && <Row label="Phone" value={user.phoneNumber} />}
        </div>

        {isAdmin && (
          <div className="mt-10 w-full max-w-sm">
            <p className="mb-3 text-[9px] tracking-[0.2em] text-black/35 uppercase">
              Admin
            </p>
            <div className="divide-y divide-gray-200 border border-gray-200 bg-white">
              {adminNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center px-5 py-4 text-[10px] font-medium tracking-[0.2em] text-[#B8893E] hover:opacity-60 transition-opacity"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => AuthService.logout()}
          className="mt-10 text-xs font-medium tracking-widest text-gray-400 uppercase underline underline-offset-4 hover:text-gray-700"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-4 px-5 py-4">
      <span className="w-14 shrink-0 text-[10px] font-medium tracking-widest text-gray-400 uppercase">
        {label}
      </span>
      <span className="text-sm text-gray-900">{value}</span>
    </div>
  );
}
