import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().min(1, "Email tidak boleh kosong").email("Email tidak valid"),
    name: z.string().min(1, "Nama tidak boleh kosong"),
    password: z
      .string()
      .min(1, "Kata sandi tidak boleh kosong")
      .min(8, "Kata sandi minimal 8 karakter"),
    confirmPassword: z
      .string()
      .min(1, "Konfirmasi kata sandi tidak boleh kosong")
      .min(8, "Konfirmasi kata sandi minimal 8 karakter"),
    asCustomer: z.string().refine((value) => value === "true" || value === "false", {
      message: "Jenis akun harus dipilih",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi dan konfirmasi kata sandi tidak cocok",
    path: ["confirmPassword"],
  });
export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().min(1, "Email tidak boleh kosong").email("Email tidak valid"),
  password: z
    .string()
    .min(1, "Kata sandi tidak boleh kosong")
    .min(8, "Kata sandi minimal 8 karakter"),
});
export type TSignInSchema = z.infer<typeof signInSchema>;
