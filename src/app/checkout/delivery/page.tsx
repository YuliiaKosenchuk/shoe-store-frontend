"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DeliveryDetailsFormValues,
  deliveryDetailsSchema,
} from "@/shemas/checkout.shema";
import { useCheckoutStore } from "@/store/checkout.store";
import { Field } from "@/components/forms/Field";
import { PhoneField } from "@/components/forms/PhoneField";
import { Container } from "@/components/ui/Container";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { OrderSummaryPanel } from "@/components/checkout/OrderSummaryPanel";

export default function DeliveryDetailsPage() {
  const router = useRouter();
  const deliveryDetails = useCheckoutStore((s) => s.deliveryDetails);
  const setDeliveryDetails = useCheckoutStore((s) => s.setDeliveryDetails);

  const {
    register,
    handleSubmit,
    control,
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
      phone: "",
    },
  });

  const onSubmit = (data: DeliveryDetailsFormValues) => {
    setDeliveryDetails(data);
    router.push("/checkout/payment");
  };

  return (
    <main>
      <Container className="px-4 lg:px-8 py-6 lg:py-10">
        <CheckoutStepper activeStep={2} />

        <h1 className="mb-4 font-(family-name:--font-cormorant-garamond) text-4xl font-light tracking-widest uppercase text-black">
          Delivery details
        </h1>

        <p className="mb-8 font-(family-name:--font-jost) text-sm text-gray-500">
          <Link href="/login" className="text-[#7A2633] underline hover:opacity-70 transition-opacity">
            Sign in
          </Link>{" "}
          or{" "}
          <Link href="/register" className="text-[#7A2633] underline hover:opacity-70 transition-opacity">
            Sign up
          </Link>{" "}
          to save favorites, track orders, and check out faster.
        </p>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-1">
            <Field
              label="Email address"
              type="email"
              registration={register("email")}
              placeholder="email address"
              error={errors.email?.message}
              autoComplete="email"
            />
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
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Country"
                registration={register("country")}
                placeholder="country"
                error={errors.country?.message}
                autoComplete="country-name"
              />
              <Field
                label="City"
                registration={register("city")}
                placeholder="city"
                error={errors.city?.message}
                autoComplete="address-level2"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Address or postcode"
                registration={register("address")}
                placeholder="address or postcode"
                error={errors.address?.message}
                autoComplete="street-address"
              />
              <Field
                label="House Number"
                registration={register("houseNumber")}
                placeholder="house number"
                error={errors.houseNumber?.message}
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
                  error={touchedFields.phone ? errors.phone?.message : undefined}
                />
              )}
            />

            <button
              type="submit"
              className={`mt-5.75 w-full py-3.75 text-[14px] font-medium tracking-widest uppercase transition-colors ${
                isValid
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-black/30 text-white cursor-default"
              }`}
            >
              Continue to Payment
            </button>
          </form>

          <OrderSummaryPanel />
        </div>
      </Container>
    </main>
  );
}
