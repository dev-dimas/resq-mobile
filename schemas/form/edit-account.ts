import { z } from "zod";

export const editAccountSchema = z.object({
  email: z.string().min(1, "Email tidak boleh kosong").email("Email tidak valid"),
  name: z.string().min(1, "Nama tidak boleh kosong"),
  avatar: z.string().nullable(),
});
export type TEditAccountSchema = z.infer<typeof editAccountSchema>;
