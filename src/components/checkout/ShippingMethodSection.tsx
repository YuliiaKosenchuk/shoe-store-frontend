"use client";

import { useState } from "react";
import Image from "next/image";
import { ServicePointPicker } from "@/components/checkout/ServicePointPicker";
import { StorePickupList } from "@/components/checkout/StorePickupList";
import { useCheckoutStore } from "@/store/checkout.store";
import { resolveCountryCode } from "@/lib/countryCode";
import type { ShippingMethod } from "@/shemas/checkout.shema";

const SHIPPING_METHODS: {
  value: ShippingMethod;
  title: string;
  subtitle: string;
  price: string;
  logo?: string;
}[] = [
  {
    value: "DHL",
    title: "Pickup at a DHL branch",
    subtitle: "1-3 business days",
    price: "Free",
    logo: "/images/dhl-logo.svg",
  },
  {
    value: "DPD",
    title: "Pickup at a DPD branch",
    subtitle: "1-3 business days",
    price: "Free",
    logo: "/images/dpd-logo.svg",
  },
  {
    value: "STORE_PICKUP",
    title: "Store pickup",
    subtitle: "1-3 business days",
    price: "Free",
  },
];

interface ShippingMethodSectionProps {
  countryInput: string;
  city: string;
  postalCode: string;
  street: string;
  houseNumber: string;
  error?: boolean;
}

export function ShippingMethodSection({
  countryInput,
  city,
  postalCode,
  street,
  houseNumber,
  error,
}: ShippingMethodSectionProps) {
  const shipping = useCheckoutStore((s) => s.shipping);
  const setShipping = useCheckoutStore((s) => s.setShipping);
  const [expandedMethod, setExpandedMethod] = useState<ShippingMethod | null>(
    shipping?.method ?? null,
  );

  const handleSelectMethod = (method: ShippingMethod) => {
    setExpandedMethod(method);
    if (shipping?.method !== method) {
      setShipping(null);
    }
  };

  return (
    <div className="mt-12.5">
      <div className="h-px w-full bg-[#B3B3B3]" />
      <fieldset className="mt-6">
        <legend className="mb-3 font-(family-name:--font-cormorant-garamond) text-[26px] text-black leading-[1.2] font-semibold">
          Shipping method
        </legend>
        {error && (
          <p className="mb-3 font-(family-name:--font-jost) text-[14px] text-[#DF4441]">
            Please select a shipping method to continue.
          </p>
        )}
        {!resolveCountryCode(countryInput) ? (
          <p className="font-(family-name:--font-jost) text-sm text-[#4E4E4E]">
            Enter your shipping address to see available shipping options.
          </p>
        ) : (
          <div className="divide-y divide-[#B3B3B3]">
            {SHIPPING_METHODS.map((method) => (
              <div key={method.value} className="py-4">
                <label
                  className={`flex cursor-pointer items-center justify-between gap-3 font-(family-name:--font-jost) text-sm transition-colors ${
                    expandedMethod === method.value
                      ? "text-black"
                      : "text-[#4E4E4E]"
                  }`}
                >
                  <span className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={expandedMethod === method.value}
                      onChange={() => handleSelectMethod(method.value)}
                      className={`mt-1 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-full border border-black transition-colors ${
                        expandedMethod === method.value
                          ? "bg-black"
                          : "bg-transparent"
                      }`}
                    />
                    <span>
                      <span className="block font-medium text-[16px] leading-[1.3] text-black">
                        {method.title}
                      </span>
                      <span className="block text-sm leading-normal font-normal text-[#4E4E4E]">
                        {method.subtitle}
                      </span>
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="text-base font-medium leading-[1.3] text-black">
                      {method.price}
                    </span>
                    {method.logo && (
                      <Image
                        src={method.logo}
                        alt={method.value}
                        width={42}
                        height={24}
                        className="h-6 w-10.5 object-contain"
                      />
                    )}
                  </span>
                </label>

                {expandedMethod === method.value &&
                  method.value === "STORE_PICKUP" && (
                    <StorePickupList
                      selectedStoreId={shipping?.store?.id ?? null}
                      onSelect={(store) =>
                        setShipping({
                          method: "STORE_PICKUP",
                          store,
                          servicePoint: null,
                        })
                      }
                    />
                  )}

                {expandedMethod === method.value &&
                  (method.value === "DHL" || method.value === "DPD") && (
                    <ServicePointPicker
                      carrier={method.value === "DHL" ? "dhl" : "dpd"}
                      countryInput={countryInput}
                      city={city}
                      postalCode={postalCode}
                      street={street}
                      houseNumber={houseNumber}
                      selectedServicePointId={shipping?.servicePoint?.id ?? null}
                      onSelect={(servicePoint) =>
                        setShipping({
                          method: method.value,
                          servicePoint,
                          store: null,
                        })
                      }
                    />
                  )}
              </div>
            ))}
          </div>
        )}
      </fieldset>
    </div>
  );
}
