import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Kata sandi saat ini harus diisi")
      .min(8, "Kata sandi saat ini minimal 8 karakter"),
    newPassword: z
      .string()
      .min(1, "Masukkan kata sandi baru!")
      .min(8, "Kata sandi minimal 8 karakter"),
    confirmPassword: z
      .string()
      .min(1, "Masukkan konfirmasi kata sandi baru!")
      .min(8, "Kata sandi minimal 8 karakter"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Kata sandi baru dan konfirmasi kata sandi baru tidak cocok",
    path: ["confirmPassword"],
  });
export type TChangePasswordSchema = z.infer<typeof changePasswordSchema>;
