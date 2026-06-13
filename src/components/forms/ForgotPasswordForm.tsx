"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { ForgotPasswordFormValues, forgotPasswordSchema } from "@/shemas/forgot-password.shema";
import { ResetPasswordFormValues, resetPasswordSchema } from "@/shemas/reset-password.shema";
import { AuthService } from "@/servises/auth.service";
import { Field } from "./Field";
import { PasswordField } from "./PasswordField";
import { BackButton } from "@/components/ui/BackButton";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "password">("email");
  const [token, setToken] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const emailForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const passwordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const onEmailSubmit = async (data: ForgotPasswordFormValues) => {
    setServerError(null);
    setUserNotFound(false);
    try {
      const result = await AuthService.forgotPassword(data.email);
      const receivedToken = result?.token ?? result?.resetToken ?? "";
      setToken(receivedToken);
      setStep("password");
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

  const onPasswordSubmit = async (data: ResetPasswordFormValues) => {
    setServerError(null);
    try {
      await AuthService.resetPassword(token, data.newPassword);
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message: string = error.response?.data?.message ?? "";
        setServerError(message || "Something went wrong. Please try again.");
      }
    }
  };

  if (step === "password") {
    return (
      <div className="min-h-screen bg-white">
        <BackButton />
        <div className="flex justify-center px-4 py-14">
          <div className="w-full max-w-97.5">
            <h1 className="mb-2 font-serif text-[28px] leading-snug text-gray-900">
              Create new password
            </h1>
            <p className="mb-6 text-[13px] text-gray-500">
              Please choose a new password for your account
            </p>

            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} noValidate className="space-y-4">
              {serverError && (
                <p className="text-[12px] text-red-500">{serverError}</p>
              )}

              <PasswordField
                label="Password"
                registration={passwordForm.register("newPassword")}
                placeholder="enter new password"
                error={passwordForm.formState.errors.newPassword?.message}
                show={showNew}
                onToggle={() => setShowNew((p) => !p)}
                autoComplete="new-password"
              />

              <PasswordField
                label="Confirm password"
                registration={passwordForm.register("confirmPassword")}
                placeholder="enter new password"
                error={passwordForm.formState.errors.confirmPassword?.message}
                show={showConfirm}
                onToggle={() => setShowConfirm((p) => !p)}
                autoComplete="new-password"
              />

              <p className="text-[12px] text-gray-400">
                Use at least 8 characters, including a letter and a number
              </p>

              <button
                type="submit"
                disabled={passwordForm.formState.isSubmitting}
                className={`w-full py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors ${
                  passwordForm.formState.isValid
                    ? "bg-black text-white hover:bg-gray-900"
                    : "bg-black/25 text-white cursor-default"
                } disabled:cursor-not-allowed`}
              >
                {passwordForm.formState.isSubmitting ? "Resetting…" : "Reset Password"}
              </button>

              <Link
                href="/login"
                className="block w-full py-3.5 text-center text-[11px] tracking-[0.2em] uppercase font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back to sign in
              </Link>
            </form>
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

          <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} noValidate className="space-y-4">
            {serverError && (
              <p className="text-[12px] text-red-500">{serverError}</p>
            )}

            <Field
              label="Email address"
              type="email"
              registration={emailForm.register("email")}
              placeholder="email address"
              error={emailForm.formState.errors.email?.message}
              autoComplete="email"
            />

            <button
              type="submit"
              disabled={emailForm.formState.isSubmitting}
              className={`w-full py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors ${
                emailForm.formState.isValid
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-black/25 text-white cursor-default"
              } disabled:cursor-not-allowed`}
            >
              {emailForm.formState.isSubmitting ? "Checking…" : "Reset"}
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
