"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { RegistrationFormValues, registrationSchema } from "@/shemas/registration.shema";
import Link from "next/link";
import { PasswordField } from "./PasswordField";
import { Field } from "./Field";
import { AuthService } from "@/servises/auth.service";
import { BackButton } from "@/components/ui/BackButton";

export default function RegistrationForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    setAlreadyExists(false);
    try {
      await AuthService.register(data);
      router.push("/cabinet");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setAlreadyExists(true);
        } else {
          setError("email", {
            type: "server",
            message: error.response?.data?.message ?? "Registration failed.",
          });
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EDE6]">
      <BackButton />
      <div className="flex justify-center px-4 py-14">
        <div className="w-full max-w-90">
          <h1 className="mb-6 font-serif text-[22px] leading-snug text-gray-900">
            Create an Account
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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
              Passwords must contain at least 8 characters
            </p>

            {alreadyExists && (
              <div className="border border-amber-200 bg-amber-50 px-4 py-3">
                <p className="text-[12px] text-amber-800">
                   User with such email already exists.{" "}
                  <Link
                    href="/login"
                    className="font-medium underline underline-offset-2 hover:opacity-80"
                  >
                    Sign in to your account
                  </Link>
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || alreadyExists}
              className={`w-full py-3.5 text-xs font-medium tracking-widest uppercase transition-colors ${
                isValid && !alreadyExists
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-[#C8C5BD] text-white cursor-default"
              } disabled:cursor-not-allowed`}
            >
              {isSubmitting ? "Signing up…" : "Sign Up"}
            </button>

            <p className="text-[11px] leading-relaxed text-gray-500">
              By signing up you are agreeing to our{" "}
              <a href="/terms" className="underline underline-offset-2">
                Terms of Service
              </a>
              . View our{" "}
              <a href="/privacy" className="underline underline-offset-2">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
