import { z } from "zod";

export const createComplaintSchema = z.object({
  description: z.string().min(1, "Deskripsi laporan tidak boleh kosong"),
});
export type TCreateComplaintSchema = z.infer<typeof createComplaintSchema>;
