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

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormValues) => {
    setUserNotFound(false);
    try {
      await AuthService.login(data);
      router.push("/cabinet");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message: string = error.response?.data?.message ?? "";

        console.log("[LoginForm] Error status:", status);
        console.log("[LoginForm] Error message:", message);

        const isNotFound =
          status === 404 ||
          /not found|does not exist|no user/i.test(message);

        if (isNotFound) {
          setUserNotFound(true);
        } else {
          setError("email", {
            type: "server",
            message: message || "Invalid email or password.",
          });
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EDE6]">
      <div className="flex justify-center px-4 py-14">
        <div className="w-full max-w-90">
          <h1 className="mb-6 font-serif text-[22px] leading-snug text-gray-900">
            Sign in
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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
                className="mt-2 inline-block text-[11px] text-gray-500 underline underline-offset-2 hover:text-gray-800"
              >
                Forgot password?
              </Link>
            </div>

            {userNotFound && (
              <div className="border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-[12px] text-red-700">
                  This user does not exist.{" "}
                  <Link
                    href="/register"
                    className="font-medium underline underline-offset-2 hover:opacity-80"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 text-xs font-medium tracking-widest uppercase transition-colors ${
                isValid
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-[#C8C5BD] text-white cursor-default"
              } disabled:cursor-not-allowed`}
            >
              {isSubmitting ? "Signing in…" : "Sign In"}
            </button>

            <p className="text-[11px] text-gray-500">
              New to Sharman?{" "}
              <Link
                href="/register"
                className="text-[#C4974A] underline underline-offset-2 hover:opacity-80"
              >
                Create account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
