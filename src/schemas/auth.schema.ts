import { z } from "zod";

export const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(15, "Enter a valid phone number"),
});

export const otpSchema = z.object({
  otp: z.string().length(6, "Enter the 6-digit OTP"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type OtpSchema = z.infer<typeof otpSchema>;
