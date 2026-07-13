"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";

const notifySchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
});

type NotifyFormData = z.infer<typeof notifySchema>;

interface NotifyModalProps {
  size?: number;
  color?: string;
  onClose: () => void;
}

export function NotifyModal({ size, color, onClose }: NotifyModalProps) {
  const colorLabel = color ? `colour ${color.charAt(0).toUpperCase() + color.slice(1).toLowerCase()}` : undefined;
  const sizeLabel = size !== undefined ? `size ${size}` : undefined;
  const label = [sizeLabel, colorLabel].filter(Boolean).join(", ");
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NotifyFormData>({
    resolver: zodResolver(notifySchema),
    mode: "onChange",
  });

  const onSubmit = async (_data: NotifyFormData) => {
    setServerError(null);
    // TODO: call API to subscribe notification
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 bg-white w-full max-w-md mx-4 p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#818181] hover:text-black transition-colors"
          aria-label="Close"
        >
          <X size={18} strokeWidth={1.25} />
        </button>

        {submitted ? (
          <div className="text-center space-y-3 py-4">
            <p className="font-(family-name:--font-cormorant-garamond) text-2xl font-semibold text-[#010101]">
              You&apos;re on the list!
            </p>
            <p className="font-(family-name:--font-jost) text-sm text-[#4E4E4E] leading-relaxed">
              We&apos;ll let you know as soon as {label} is back in stock.
            </p>
          </div>
        ) : (
          <div className="">
            <div className="space-y-2">
              <h2 className="font-(family-name:--font-cormorant-garamond) text-2xl font-semibold text-[#010101]">
                Notify me when available
              </h2>
              <p className="font-(family-name:--font-jost) text-sm text-[#4E4E4E]">
                {label.charAt(0).toUpperCase() + label.slice(1)} is currently out of stock. Enter your email and we&apos;ll notify you as soon as it&apos;s available again.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <p className="h-5 font-(family-name:--font-jost) text-xs text-[#DF4441]">
                {serverError || " "}
              </p>
              <div className="space-y-1.5">
                <label
                  htmlFor="notify-email"
                  className="block font-(family-name:--font-jost) text-xs tracking-widest text-[#4E4E4E]"
                >
                  Email address
                </label>
                <input
                  id="notify-email"
                  type="email"
                  placeholder="your@email.com"
                  {...register("email")}
                  className="w-full h-11 border border-[#EBEBEB] px-4 font-(family-name:--font-jost) text-sm text-[#010101] placeholder:text-[#818181] focus:outline-none focus:border-[#010101] transition-colors"
                />
                <p className="h-5 font-(family-name:--font-jost) text-xs text-[#DF4441]">
                  {errors.email?.message || " "}
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-[#010101] text-white font-(family-name:--font-jost) text-sm tracking-widest uppercase hover:bg-[#7A2633] transition-colors duration-200 disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Notify Me"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
