"use client";

import { useEffect, useState } from "react";
import { resolveCountryCode } from "@/lib/countryCode";
import {
  ServicePointsNotConfiguredError,
  ServicePointsService,
} from "@/servises/servicePoints.service";
import type { ServicePoint } from "@/shemas/checkout.shema";

interface ServicePointPickerProps {
  carrier: "dhl" | "dpd";
  countryInput: string;
  city: string;
  postalCode: string;
  street: string;
  houseNumber: string;
  selectedServicePointId: number | null;
  onSelect: (servicePoint: ServicePoint) => void;
}

type Result =
  | { kind: "not-configured" }
  | { kind: "error" }
  | { kind: "success"; points: ServicePoint[] };

export function ServicePointPicker({
  carrier,
  countryInput,
  city,
  postalCode,
  street,
  houseNumber,
  selectedServicePointId,
  onSelect,
}: ServicePointPickerProps) {
  const countryCode = resolveCountryCode(countryInput);
  const [result, setResult] = useState<Result | null>(null);
  const [searchToken, setSearchToken] = useState(0);
  const [addressQuery, setAddressQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(addressQuery), 400);
    return () => clearTimeout(timeout);
  }, [addressQuery]);

  const trimmedQuery = debouncedQuery.trim();
  const hasQuery = trimmedQuery.length > 0;
  const isPostalCodeQuery = hasQuery && /^[\d\s-]+$/.test(trimmedQuery);

  const searchParams = hasQuery
    ? {
        city: isPostalCodeQuery ? undefined : trimmedQuery,
        postalCode: isPostalCodeQuery ? trimmedQuery : undefined,
        street: undefined,
        houseNumber: undefined,
      }
    : { city, postalCode, street, houseNumber };

  useEffect(() => {
    if (!countryCode) return;

    let cancelled = false;

    ServicePointsService.search({ countryCode, carrier, ...searchParams })
      .then((points) => {
        if (!cancelled) setResult({ kind: "success", points });
      })
      .catch((error) => {
        if (cancelled) return;
        setResult(
          error instanceof ServicePointsNotConfiguredError
            ? { kind: "not-configured" }
            : { kind: "error" }
        );
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carrier, countryCode, searchToken, trimmedQuery]);

  const retry = () => {
    setResult(null);
    setSearchToken((n) => n + 1);
  };

  return (
    <div className="pt-4 font-(family-name:--font-jost) text-sm">
      {!countryCode && (
        <p className="text-[#4E4E4E]">
          Enter a recognized country name above (e.g. Poland, Germany, Ukraine) to see
          nearby pickup points.
        </p>
      )}

      {countryCode && (
        <div className="relative">
          <label
            htmlFor={`servicePointSearch-${carrier}`}
            className="mb-2 block text-sm text-[#343434] font-medium leading-normal"
          >
            Find a pickup branch
          </label>
          <input
            id={`servicePointSearch-${carrier}`}
            type="text"
            value={addressQuery}
            onChange={(e) => setAddressQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
            placeholder="enter branch address or number"
            className="w-full border border-[#B3B3B3] px-4 py-3 text-sm text-black placeholder:text-[#B3B3B3] focus:border-black focus:outline-none"
          />

          {isOpen && (
            <div className="custom-scrollbar absolute inset-x-0 top-full z-10 mt-1 max-h-26.25 overflow-y-auto bg-white shadow-lg">
              {result === null && (
                <p className="px-4 py-3 text-[#4E4E4E]">Looking for nearby pickup points…</p>
              )}

              {result?.kind === "not-configured" && (
                <p className="px-4 py-3 text-[#4E4E4E]">
                  Pickup point selection is temporarily unavailable. Please choose a
                  different shipping method or try again later.
                </p>
              )}

              {result?.kind === "error" && (
                <div className="space-y-2 px-4 py-3">
                  <p className="text-[#DF4441]">Couldn&apos;t load pickup points.</p>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={retry}
                    className="text-black underline hover:opacity-70 transition-opacity"
                  >
                    Try again
                  </button>
                </div>
              )}

              {result?.kind === "success" && result.points.length === 0 && (
                <p className="px-4 py-3 text-[#4E4E4E]">
                  {hasQuery
                    ? "No pickup points found for that search — try a different address or postal code."
                    : "No pickup points found near this address yet — try refining the city or postal code above."}
                </p>
              )}

              {result?.kind === "success" &&
                result.points.map((sp) => (
                  <button
                    key={sp.id}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      onSelect(sp);
                      setAddressQuery(
                        `${sp.name}, ${sp.street} ${sp.houseNumber}, ${sp.postalCode} ${sp.city}`
                      );
                      setIsOpen(false);
                    }}
                    className={`flex h-5.25 w-full items-center truncate px-4 font-(family-name:--font-jost) text-[14px] leading-normal font-normal text-black transition-colors hover:bg-[#F8F8F8] ${
                      selectedServicePointId === sp.id ? "bg-[#F8F8F8]" : ""
                    }`}
                  >
                    {sp.name}, {sp.street} {sp.houseNumber}, {sp.postalCode} {sp.city}
                  </button>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
