"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { RegistrationFormValues, registrationSchema } from "@/shemas/registration.shema";
import { PasswordField } from "./PasswordField";
import { Field } from "./Field";
import { AuthService } from "@/servises/auth.service";

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  });

  // Отримуємо ім'я для екрану успіху
  const firstNameValue = watch("firstName", "");

  const onSubmit = async (data: RegistrationFormValues) => {
  try {
    await AuthService.register({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      confirmPassword: data.confirmPassword, // Якщо бекенд чекає repeatedPassword, це можна замапити в сервісі
    });
    
    setSubmitted(true);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      setError("email", {
        type: "server",
        message: error.response?.data?.message ?? "Registration failed.",
      });
    }
  }
};

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F2EDE6]">
        <div className="flex items-center justify-center px-4 py-24">
          <div className="text-center">
            <h2 className="font-serif text-xl text-gray-900">Account created!</h2>
            <p className="mt-2 text-sm text-gray-500">
              Welcome, {firstNameValue}. You can now sign in.
            </p>
            <a
              href="/login"
              className="mt-6 inline-block bg-black px-8 py-3 text-xs font-medium tracking-widest text-white uppercase hover:bg-gray-800"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2EDE6]">
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

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 text-xs font-medium tracking-widest uppercase transition-colors ${
                isValid
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
