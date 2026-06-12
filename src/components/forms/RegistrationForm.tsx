"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { RegistrationFormValues, registrationSchema } from "@/shemas/registration.shema";
import { PasswordField } from "./PasswordField";
import { Field } from "./Field";
import { AuthService } from "@/servises/auth.service";
import { BackButton } from "@/components/ui/BackButton";

export default function RegistrationForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    setServerError(null);
    try {
      await AuthService.register(data);
      router.push("/cabinet");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setServerError("User with this email already exists.");
        } else {
          setServerError(error.response?.data?.message ?? "Registration failed.");
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <BackButton />
      <div className="flex justify-center px-4 py-14">
        <div className="w-full max-w-97.5">
          <h1 className="mb-6 font-serif text-[28px] leading-snug text-gray-900">
            Create an Account
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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

            <Field
              label="Phone number"
              type="tel"
              registration={register("phoneNumber")}
              placeholder="+48123456789"
              error={errors.phoneNumber?.message}
              autoComplete="tel"
            />

            <PasswordField
              label="Password"
              registration={register("password")}
              placeholder="password"
              error={errors.password?.message}
              show={showPassword}
              onToggle={() => setShowPassword((p) => !p)}
              autoComplete="new-password"
            />

            <PasswordField
              label="Repeat Password"
              registration={register("confirmPassword")}
              placeholder="password"
              error={errors.confirmPassword?.message}
              show={showConfirmPassword}
              onToggle={() => setShowConfirmPassword((p) => !p)}
              autoComplete="new-password"
            />

            <p className="text-[11px] text-gray-400">
              Use at least 8 characters, including a letter and a number
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors ${
                isValid
                  ? "bg-black text-white hover:bg-gray-900"
                  : "border border-gray-300 bg-white text-gray-400 cursor-default"
              } disabled:cursor-not-allowed`}
            >
              {isSubmitting ? "Signing up…" : "Sign Up"}
            </button>

            <p className="text-[11px] leading-relaxed text-gray-500">
              By signing up you are agreeing to our{" "}
              <Link href="/terms" className="text-red-500 hover:opacity-70 transition-opacity">
                Terms of Service
              </Link>
              . View our{" "}
              <Link href="/privacy" className="text-red-500 hover:opacity-70 transition-opacity">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
