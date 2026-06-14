"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { LoginFormValues, loginSchema } from "@/shemas/login.shema";
import { AuthService } from "@/servises/auth.service";
import { Field } from "./Field";
import { PasswordField } from "./PasswordField";
import { BackButton } from "@/components/ui/BackButton";
import { GoogleIcon } from "../ ui/GoogleIcon";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    try {
      await AuthService.login(data);
      router.push("/cabinet");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message: string = error.response?.data?.message ?? "";
        const isNotFound =
          status === 404 || /not found|does not exist|no user/i.test(message);
        setServerError(
          isNotFound
            ? "This user does not exist. Please register."
            : "Enter your username and password to continue.",
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <BackButton />
      <div className="flex justify-center px-4 py-14">
        <div className="w-full max-w-157">
          <h1 className="mb-9 font-serif text-[28px] font-(--font-cormorant-garamond) leading-[1.1] text-gray-900">
            Sign in
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-1"
          >
            <p className="mt-2 h-5 text-[14px] text-[#DF4441]">
              {serverError || "\u00A0"}
            </p>

            <Field
              label="Email address"
              type="email"
              registration={register("email")}
              placeholder="email address"
              error={errors.email?.message}
              autoComplete="email"
            />

            <div>
              <PasswordField
                label="Password"
                registration={register("password")}
                placeholder="password"
                error={errors.password?.message}
                show={showPassword}
                onToggle={() => setShowPassword((p) => !p)}
                autoComplete="current-password"
              />
              <Link
                href="/forgot-password"
                className="mt-1 mb-8 inline-block font-normal text-[16px] text-[#7A2633] underline hover:opacity-60 transition-opacity"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mb-4 py-3.75 text-[14px] font-medium tracking-wide uppercase transition-colors ${
                isValid
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-black/30 text-white cursor-default"
              } disabled:cursor-not-allowed`}
            >
              {isSubmitting ? "Signing in…" : "Sign In"}
            </button>

            <button
              type="button"
              onClick={() => {
                console.log("[LoginForm] User initiated Google OAuth login");
                AuthService.loginWithGoogle();
              }}
              className="w-full mb-8 flex items-center justify-center gap-2.5 border border-gray-300 py-3 text-[14px] uppercase font-normal text-[#010101] hover:bg-gray-50 transition-colors"
            >
              <GoogleIcon />
              Log in with Google
            </button>
          </form>

          <div className="mt-8 space-y-4">
            <p className="font-serif font-(--font-cormorant-garamond) text-[26px] text-black">
              Don&apos;t have an Account yet?
            </p>
            <Link
              href="/register"
              className="block w-full border border-gray-300 py-3.75 text-center text-[14px] font-medium text-[#010101] hover:bg-gray-50 transition-colors"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
