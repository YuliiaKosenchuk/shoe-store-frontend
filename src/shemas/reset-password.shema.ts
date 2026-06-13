import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Use at least 8 characters, including a letter and a number")
      .regex(/[a-zA-Z]/, "Use at least 8 characters, including a letter and a number")
      .regex(/[0-9]/, "Use at least 8 characters, including a letter and a number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
