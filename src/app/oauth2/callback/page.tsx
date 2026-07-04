"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSyncCartOnAuth } from "@/hooks/useCart";

function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const syncCartOnAuth = useSyncCartOnAuth();
  // syncCartOnAuth gets a new identity whenever the cart store updates
  // (e.g. after setCartId inside it runs) — this ref stops that from
  // re-triggering the effect and re-running the sync/redirect.
  const syncStartedRef = useRef(false);

  // Derive synchronously from URL params — no setState needed
  const oauthError = searchParams.get("error");
  const token =
    oauthError === null
      ? (searchParams.get("token") ??
          searchParams.get("accessToken") ??
          searchParams.get("access_token"))
      : null;

  const errorMessage = oauthError
    ? "Google sign-in was cancelled or failed. Please try again."
    : token === null
    ? "Authentication failed: no token received. Please try again."
    : null;

  // Side effects only: save token and navigate
  useEffect(() => {
    if (!token || syncStartedRef.current) return;
    syncStartedRef.current = true;

    console.log("[OAuthCallback] Token received, length:", token.length);
    localStorage.setItem("token", token);
    console.log("[OAuthCallback] Token saved to localStorage, syncing cart");
    syncCartOnAuth().finally(() => {
      console.log("[OAuthCallback] Navigating to /cabinet");
      router.replace("/cabinet");
    });
  }, [token, router, syncCartOnAuth]);

  useEffect(() => {
    if (oauthError) {
      const desc = searchParams.get("error_description") ?? oauthError;
      console.error("[OAuthCallback] OAuth error returned by provider:", desc);
    } else if (token === null) {
      console.error(
        "[OAuthCallback] Token extraction failed — params present:",
        [...searchParams.keys()]
      );
    } else {
      console.log("[OAuthCallback] Callback page mounted, processing token");
    }
  }, [oauthError, token, searchParams]);

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-[#F2EDE6] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-sm text-red-600">{errorMessage}</p>
          <button
            onClick={() => router.push("/login")}
            className="text-xs font-medium tracking-widest text-gray-500 uppercase underline underline-offset-4 hover:text-gray-800 transition-colors"
          >
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2EDE6] flex items-center justify-center">
      <p className="text-sm text-gray-400 tracking-widest uppercase">
        Signing you in…
      </p>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F2EDE6] flex items-center justify-center">
          <p className="text-sm text-gray-400 tracking-widest uppercase">
            Signing you in…
          </p>
        </div>
      }
    >
      <OAuthCallbackContent />
    </Suspense>
  );
}
