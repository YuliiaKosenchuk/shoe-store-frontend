"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { ResetPasswordFormValues, resetPasswordSchema } from "@/shemas/reset-password.shema";
import { AuthService } from "@/servises/auth.service";
import { PasswordField } from "./PasswordField";
import { BackButton } from "@/components/ui/BackButton";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [userNotFound, setUserNotFound] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) {
      setServerError("Invalid or missing reset token. Please request a new link.");
      return;
    }
    setServerError(null);
    setUserNotFound(false);
    try {
      await AuthService.resetPassword(token, data.newPassword);
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message: string = error.response?.data?.message ?? "";
        if (status === 404 || /not found|does not exist|no user/i.test(message)) {
          setUserNotFound(true);
          setServerError("No account associated with this reset link.");
        } else {
          setServerError(
            message || "The reset link is invalid or has expired. Please request a new one."
          );
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <BackButton />
      <div className="flex justify-center px-4 py-14">
        <div className="w-full max-w-157">
          <h1 className="mb-14 font-serif text-[28px] font-(--font-cormorant-garamond) leading-[1.1] text-gray-900">
            Create new password
          </h1>
          <p className="mb-1 text-[13px] text-gray-500">
            Your link has been verified. Please choose a new password for your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-1">
            <p className="mt-2 h-5 text-[14px] text-[#DF4441]">
              {serverError || "\u00A0"}
            </p>

            <PasswordField
              label="Password"
              registration={register("newPassword")}
              placeholder="enter new password"
              error={errors.newPassword?.message}
              show={showNew}
              onToggle={() => setShowNew((p) => !p)}
              autoComplete="new-password"
            />

            <PasswordField
              label="Confirm password"
              registration={register("confirmPassword")}
              placeholder="enter new password"
              error={errors.confirmPassword?.message}
              show={showConfirm}
              onToggle={() => setShowConfirm((p) => !p)}
              autoComplete="new-password"
            />

            <p className="text-[12px] text-gray-400">
              Use at least 8 characters, including a letter and a number
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-9 w-full py-3.75 text-[14px] font-medium tracking-wide uppercase transition-colors disabled:cursor-not-allowed ${
                isValid
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-black/30 text-white cursor-default"
              }`}
            >
              {isSubmitting ? "Resetting…" : "Reset Password"}
            </button>

            {userNotFound && (
              <Link
                href="/register"
                className="block w-full py-3.75 text-center text-[14px] font-medium uppercase bg-black text-white hover:bg-gray-900 transition-colors"
              >
                Create an account
              </Link>
            )}

            <Link
              href="/login"
              className="block w-full border border-gray-300 py-3.75 text-center text-[14px] font-medium uppercase text-[#010101] hover:bg-gray-50 transition-colors"
            >
              Back to sign in
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
