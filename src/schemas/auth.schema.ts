import { z } from "zod";

import { BUSINESS_CATEGORIES } from "@/constants";

const passwordRule = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Add at least one uppercase letter")
  .regex(/[a-z]/, "Add at least one lowercase letter")
  .regex(/[0-9]/, "Add at least one number");

export const signInEmailSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

export const signInPhoneSchema = z.object({
  countryCode: z.string().min(2, "Select country code"),
  phoneNumber: z
    .string()
    .min(10, "Enter a valid mobile number")
    .max(15, "Enter a valid mobile number")
    .regex(/^[0-9]+$/, "Use digits only"),
});

export const signUpSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  password: passwordRule,
  acceptTerms: z.boolean().refine((value) => value, {
    message: "Accept the terms to continue",
  }),
});

export const otpSchema = z.object({
  otp: z.string().length(6, "Enter the 6-digit OTP").regex(/^[0-9]+$/, "OTP must contain digits only"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export const businessProfileSchema = z.object({
  businessName: z.string().min(2, "Enter your business name"),
  ownerName: z.string().min(2, "Enter the owner name"),
  gstNumber: z.string().optional(),
  businessAddress: z.string().min(8, "Enter a valid business address"),
  category: z.enum(BUSINESS_CATEGORIES, {
    errorMap: () => ({ message: "Select a business category" }),
  }),
});

export type SignInEmailSchema = z.infer<typeof signInEmailSchema>;
export type SignInPhoneSchema = z.infer<typeof signInPhoneSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
export type OtpSchema = z.infer<typeof otpSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type BusinessProfileSchema = z.infer<typeof businessProfileSchema>;
