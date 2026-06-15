"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/shemas/forgot-password.shema";
import { AuthService } from "@/servises/auth.service";
import { Field } from "./Field";
import { BackButton } from "@/components/ui/BackButton";

export default function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

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
        if (
          status === 404 ||
          /not found|no account|does not exist|no user/i.test(message)
        ) {
          setUserNotFound(true);
          setServerError("No account found with this email address.");
        } else {
          setServerError(message || "Something went wrong. Please try again.");
        }
      }
    }
  };

  const handleResend = async () => {
    setResendMessage(null);
    setIsResending(true);
    try {
      await AuthService.forgotPassword(getValues("email"));
      setResendMessage("Email resent successfully.");
    } catch {
      setResendMessage("Failed to resend. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-white">
        <BackButton />
        <div className="flex justify-center px-4 py-14">
          <div className="w-full max-w-157">
            <h1 className="mb-9 font-serif text-[36px] font-(--font-cormorant-garamond) leading-[1.1] text-black">
              Recovery email sent
            </h1>
            <p className="mb-6 text-[16px] text-[#676767] leading-[1.3]">
              Please check your inbox (and spam). Didn&apos;t receive an email at{" "}
              <span className="font-semibold text-[#7A2633]">
                {getValues("email")}
              </span>
              ?
            </p>
            {resendMessage && (
              <p className="mb-4 text-[14px] text-[#676767]">{resendMessage}</p>
            )}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setResendMessage(null);
                }}
                className="w-full py-3.75 bg-black text-white text-[14px] font-medium tracking-wide uppercase hover:bg-gray-900 transition-colors"
              >
                Change Email
              </button>
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="w-full py-3.75 border border-gray-300 text-[14px] font-normal leading-normal text-[#010101] hover:bg-gray-50 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isResending ? "Sending…" : "Resend email"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <BackButton />
      <div className="flex justify-center px-4 py-14">
        <div className="w-full max-w-157">
          <h1 className="mb-9 font-serif text-[36px] font-(--font-cormorant-garamond) leading-[1.1] text-black">
            Reset password
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-1"
          >
            <p className="mt-2 h-5 text-[14px] text-[#DF4441]">
              {serverError || "\u00A0"}
            </p>

            <p className="mb-4 text-[16px] text-[#676767] text-normal leading-[1.3]">
              Enter your email to reset your password
            </p>

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
              className={`mt-3.25 w-full py-3.75 text-[14px] font-medium tracking-wide uppercase transition-colors disabled:cursor-not-allowed ${
                isValid
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-black/30 text-white cursor-default"
              }`}
            >
              {isSubmitting ? "Sending…" : "Reset"}
            </button>

            {userNotFound && (
              <Link
                href="/register"
                className="block w-full border border-gray-300 py-3.75 text-center text-[14px] font-medium uppercase text-[#010101] hover:bg-gray-50 transition-colors"
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
