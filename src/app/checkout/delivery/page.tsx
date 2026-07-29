"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import {
  DeliveryDetailsFormValues,
  deliveryDetailsSchema,
} from "@/shemas/checkout.shema";
import { useCheckoutStore } from "@/store/checkout.store";
import { UsersService } from "@/servises/users.service";
import { Field } from "@/components/forms/Field";
import { PhoneField } from "@/components/forms/PhoneField";
import { CheckoutContainer } from "@/components/ui/CheckoutContainer";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { OrderSummaryPanel } from "@/components/checkout/OrderSummaryPanel";
import { ShippingMethodSection } from "@/components/checkout/ShippingMethodSection";

export default function DeliveryDetailsPage() {
  const router = useRouter();
  const deliveryDetails = useCheckoutStore((s) => s.deliveryDetails);
  const setDeliveryDetails = useCheckoutStore((s) => s.setDeliveryDetails);
  const shipping = useCheckoutStore((s) => s.shipping);

  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(!!localStorage.getItem("token"));
  }, []);

  const { data: profile } = useQuery({
    queryKey: ["users", "me"],
    queryFn: UsersService.getProfile,
    enabled: hasToken,
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    getValues,
    formState: { errors, isValid, touchedFields },
  } = useForm<DeliveryDetailsFormValues>({
    resolver: zodResolver(deliveryDetailsSchema),
    mode: "onChange",
    defaultValues: deliveryDetails ?? {
      email: "",
      firstName: "",
      lastName: "",
      country: "",
      city: "",
      address: "",
      houseNumber: "",
      postalCode: "",
      phone: "",
    },
  });

  // Prefill from the logged-in user's profile, but only before the shopper has
  // entered anything themselves (deliveryDetails is only set once they submit this step).
  useEffect(() => {
    if (profile && !deliveryDetails) {
      reset({
        ...getValues(),
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phoneNumber,
      });
    }
  }, [profile, deliveryDetails, reset, getValues]);

  const country = watch("country");
  const city = watch("city");
  const postalCode = watch("postalCode");
  const address = watch("address");
  const houseNumber = watch("houseNumber");

  const onSubmit = (data: DeliveryDetailsFormValues) => {
    setDeliveryDetails(data);
    router.push("/checkout/payment");
  };

  const canContinue = isValid && shipping !== null;

  return (
    <main>
      <CheckoutContainer className="px-4 py-6 sm:px-6 md:px-8 lg:px-8 lg:py-10">
        <CheckoutStepper activeStep={2} />

        <div className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-[519px_410px] lg:justify-between">
          <div className="order-2 lg:order-1">
            <h1 className="mb-4 font-(family-name:--font-cormorant-garamond) text-[36px] font-semibold text-black leading-[1.1]">
              Delivery details
            </h1>

            {!hasToken && (
              <p className="mb-8 font-(family-name:--font-jost) text-base text-[#343434] font-normal leading-[1.3]">
                <Link
                  href="/login"
                  className="text-[#7A2633] underline hover:opacity-70 transition-opacity"
                >
                  Sign in
                </Link>{" "}
                or{" "}
                <Link
                  href="/register"
                  className="text-[#7A2633] underline hover:opacity-70 transition-opacity"
                >
                  Sign up
                </Link>{" "}
                to save favorites, track orders, and check out faster.
              </p>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-1"
            >
              <Field
                label="First name"
                registration={register("firstName")}
                placeholder="first name"
                error={errors.firstName?.message}
                autoComplete="given-name"
              />
              <Field
                label="Last name"
                registration={register("lastName")}
                placeholder="last name"
                error={errors.lastName?.message}
                autoComplete="family-name"
              />
              <Field
                label="Address"
                registration={register("address")}
                placeholder="address"
                error={errors.address?.message}
                autoComplete="street-address"
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field
                  label="House number"
                  registration={register("houseNumber")}
                  placeholder="house number"
                  error={errors.houseNumber?.message}
                />
                <Field
                  label="Postal code"
                  registration={register("postalCode")}
                  placeholder="postal code"
                  error={errors.postalCode?.message}
                  autoComplete="postal-code"
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field
                  label="City"
                  registration={register("city")}
                  placeholder="city"
                  error={errors.city?.message}
                  autoComplete="address-level2"
                />
                <Field
                  label="Country"
                  registration={register("country")}
                  placeholder="country"
                  error={errors.country?.message}
                  autoComplete="country-name"
                />
              </div>
              <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <PhoneField
                    id="phone"
                    label="Phone number"
                    value={value || undefined}
                    onChange={(v) => onChange(v ?? "")}
                    onBlur={onBlur}
                    error={
                      touchedFields.phone ? errors.phone?.message : undefined
                    }
                  />
                )}
              />
              <Field
                label="Email address"
                type="email"
                registration={register("email")}
                placeholder="email address"
                error={errors.email?.message}
                autoComplete="email"
              />

              <ShippingMethodSection
                countryInput={country}
                city={city}
                postalCode={postalCode}
                street={address}
                houseNumber={houseNumber}
              />

              <button
                type="submit"
                disabled={!canContinue}
                className={`mt-5.75 w-full py-3.75 text-[14px] font-medium tracking-widest uppercase transition-colors ${
                  canContinue
                    ? "bg-[#010101] text-white hover:bg-[#2C2C2C]"
                    : "bg-[#DADADA] text-[#818181] cursor-default"
                }`}
              >
                Proceed to Payment
              </button>
            </form>
          </div>

          <div className="order-1 lg:order-2">
            <OrderSummaryPanel />
          </div>
        </div>
      </CheckoutContainer>
    </main>
  );
}
