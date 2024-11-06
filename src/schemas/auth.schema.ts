import { z } from "zod";



export const forgetPasswordValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
});

export const userUpdateValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  mobileNumber: z
    .string()
    .min(10, { message: "Mobile number must be at least 10 digits" })
    .max(15, { message: "Mobile number cannot exceed 15 digits" })
    .regex(/^[0-9]+$/, {
      message: "Mobile number should contain only digits",
    }),
  address: z.string().optional(),
  bio: z.string().optional(),
});


export const resetPasswordValidationSchema = z
  .object({
    newPassword: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

