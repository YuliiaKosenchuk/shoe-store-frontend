"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { ForgotPasswordFormValues, forgotPasswordSchema } from "@/shemas/forgot-password.shema";
import { AuthService } from "@/servises/auth.service";
import { Field } from "./Field";
import { BackButton } from "@/components/ui/BackButton";

export default function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setServerError(null);
    setUserNotFound(false);
    try {
      await AuthService.forgotPassword(data.email);
      setSent(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message: string = error.response?.data?.message ?? "";
        if (status === 404 || /not found|no account|does not exist|no user/i.test(message)) {
          setUserNotFound(true);
          setServerError("No account found with this email address.");
        } else {
          setServerError(message || "Something went wrong. Please try again.");
        }
      }
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-white">
        <BackButton />
        <div className="flex justify-center px-4 py-14">
          <div className="w-full max-w-97.5">
            <h1 className="mb-5 font-serif text-[28px] leading-snug text-gray-900">
              Check your email
            </h1>
            <p className="mb-8 text-[13px] text-gray-500">
              We sent a password reset link to{" "}
              <span className="font-medium text-gray-900">{getValues("email")}</span>.
              Check your inbox and follow the instructions.
            </p>
            <Link
              href="/login"
              className="block w-full py-3.5 text-center text-[11px] font-medium tracking-[0.2em] uppercase border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <BackButton />
      <div className="flex justify-center px-4 py-14">
        <div className="w-full max-w-97.5">
          <h1 className="mb-2 font-serif text-[28px] leading-snug text-gray-900">
            Reset password
          </h1>
          <p className="mb-6 text-[13px] text-gray-500">
            Enter your email to reset your password
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            {serverError && (
              <p className="text-[12px] text-red-500">{serverError}</p>
            )}

            <Field
              label="Email address"
              type="email"
              registration={register("email")}
              placeholder="email address"
              error={errors.email?.message}
              autoComplete="email"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors ${
                isValid
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-black/25 text-white cursor-default"
              } disabled:cursor-not-allowed`}
            >
              {isSubmitting ? "Sending…" : "Reset"}
            </button>

            {userNotFound && (
              <Link
                href="/register"
                className="block w-full py-3.5 text-center text-[11px] font-medium tracking-[0.2em] uppercase border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Create an account
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
