"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UsersService, UserProfile } from "@/servises/users.service";

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
      <div className="min-h-screen bg-[#F2EDE6] flex items-center justify-center px-4">
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
      <div className="min-h-screen bg-[#F2EDE6] flex items-center justify-center">
        <p className="text-sm text-gray-400 tracking-widest uppercase">Loading…</p>
      </div>
    );
  }

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <div className="min-h-screen bg-[#F2EDE6]">
      <div className="flex flex-col items-center px-4 py-20">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-black text-white">
          <span className="font-serif text-2xl tracking-wide">{initials}</span>
        </div>

        <h1 className="mt-6 font-serif text-2xl text-gray-900">
          {user.firstName} {user.lastName}
        </h1>

        <div className="mt-8 w-full max-w-sm divide-y divide-gray-200 border border-gray-200 bg-white">
          <Row label="Email" value={user.email} />
          <Row label="Phone" value={user.phoneNumber} />
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            router.push("/login");
          }}
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
