import { z } from "zod";

export const registrationSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must not exceed 50 characters")
      .regex(
        /^[\p{Script=Latin}\p{Script=Cyrillic}]+$/u,
        "First name can only contain Latin and Cyrillic characters"
      ),
    
    lastName: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must not exceed 50 characters")
      .regex(
        /^[\p{Script=Latin}\p{Script=Cyrillic}]+$/u,
        "Last name can only contain Latin and Cyrillic characters"
      ),
    
    email: z
      .string()
      .trim()
      .min(6, "Email must be at least 6 characters")
      .max(72, "Email must not exceed 72 characters")
      .email("Invalid email address. Please check and try again"),
    
    phoneNumber: z
      .string()
      .trim()
      .min(1, "Phone number is required")
      .regex(
        /^\+[0-9]{12,15}$/,
        "Please enter a valid phone number"
      ),
    
    password: z
      .string()
      .min(8, "Password must contain at least 8 characters")
      .max(64, "Password must not exceed 64 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,64}$/,
        "Invalid password format"
      ),
    
    confirmPassword: z
      .string()
      .min(1, "Please repeat your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegistrationFormValues = z.infer<typeof registrationSchema>;