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
            : "Enter your username and password to continue."
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <BackButton />
      <div className="flex justify-center px-4 py-14">
        <div className="w-full max-w-97.5">
          <h1 className="mb-5 font-serif text-[28px] leading-snug text-gray-900">
            Sign in
          </h1>

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
                className="mt-2 inline-block text-[12px] text-red-500 hover:opacity-60 transition-opacity"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors ${
                isValid
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-black/25 text-white cursor-default"
              } disabled:cursor-not-allowed`}
            >
              {isSubmitting ? "Signing in…" : "Sign In"}
            </button>

            <button
              type="button"
              onClick={() => {
                console.log('[LoginForm] User initiated Google OAuth login');
                AuthService.loginWithGoogle();
              }}
              className="w-full flex items-center justify-center gap-2.5 border border-gray-300 py-3.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <GoogleIcon />
              Log in with Google
            </button>
          </form>

          <div className="mt-8 space-y-4">
            <p className="font-serif text-[20px] text-gray-900">
              Don&apos;t have an Account yet?
            </p>
            <Link
              href="/register"
              className="block w-full border border-gray-300 py-3.5 text-center text-[11px] tracking-[0.2em] uppercase font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}
