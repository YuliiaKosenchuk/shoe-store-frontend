"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  RegistrationFormValues,
  registrationSchema,
} from "@/shemas/registration.shema";
import { PasswordField } from "./PasswordField";
import { Field } from "./Field";
import { PhoneField } from "./PhoneField";
import { AuthService } from "@/servises/auth.service";
import { useSyncCartOnAuth } from "@/hooks/useCart";
// import { BackButton } from "@/components/ui/BackButton";
import { PolicyModal } from "@/components/ui/PolicyModal";

export default function RegistrationForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [policyModal, setPolicyModal] = useState<"terms" | "privacy" | null>(null);
  const syncCartOnAuth = useSyncCartOnAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid, touchedFields },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
    defaultValues: { phoneNumber: "" },
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    setServerError(null);
    try {
      await AuthService.register(data);
      await syncCartOnAuth();
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setServerError("User with this email already exists.");
        } else {
          setServerError(
            error.response?.data?.message ?? "Registration failed.",
          );
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* <BackButton /> */}
      <div className="flex justify-center px-4 py-14">
        <div className="w-full max-w-157">
          <h1 className="mb-9 font-serif text-[36px] font-(--font-cormorant-garamond) leading-[1.1] text-black">
            Create an Account
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-1"
          >
            {serverError && (
              <p className="text-[12px] text-red-500">{serverError}</p>
            )}

            <div className="grid grid-cols-2 gap-3">
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
            </div>

            <Field
              label="Email address"
              type="email"
              registration={register("email")}
              placeholder="email address"
              error={errors.email?.message}
              autoComplete="email"
            />

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <PhoneField
                  id="phoneNumber"
                  label="Phone number"
                  value={value || undefined}
                  onChange={(v) => onChange(v ?? "")}
                  onBlur={onBlur}
                  error={touchedFields.phoneNumber ? errors.phoneNumber?.message : undefined}
                />
              )}
            />

            <PasswordField
              label="Password"
              registration={register("password")}
              placeholder="password"
              error={errors.password?.message}
              show={showPassword}
              onToggle={() => setShowPassword((p) => !p)}
              autoComplete="new-password"
              showInfo
            />

            <PasswordField
              label="Confirm Password"
              registration={register("confirmPassword")}
              placeholder="password"
              error={errors.confirmPassword?.message}
              show={showConfirmPassword}
              onToggle={() => setShowConfirmPassword((p) => !p)}
              autoComplete="new-password"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-5.75 py-3.75 text-[14px] font-medium tracking-wide uppercase transition-colors disabled:cursor-not-allowed ${
                isValid
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-black/30 text-white cursor-default"
              }`}
            >
              {isSubmitting ? "Signing up…" : "Sign Up"}
            </button>

            <p className="mt-4 text-[16px] text-[#676767] text-normal leading-[1.3]">
              By signing up you are agreeing to our{" "}
              <button
                type="button"
                onClick={() => setPolicyModal("terms")}
                className="text-[#7A2633] hover:opacity-70 transition-opacity"
              >
                Terms of Service
              </button>
              . View our{" "}
              <button
                type="button"
                onClick={() => setPolicyModal("privacy")}
                className="text-[#7A2633] hover:opacity-70 transition-opacity"
              >
                Privacy Policy
              </button>
              .
            </p>
          </form>
        </div>
      </div>

      <PolicyModal type={policyModal} onClose={() => setPolicyModal(null)} />
    </div>
  );
}
