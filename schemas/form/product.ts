import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, "Nama produk tidak boleh kosong")
    .min(3, "Nama produk minimal 3 huruf"),
  description: z.string().min(1, "Deskripsi produk tidak boleh kosong"),
  price: z.string().min(3, "Harga produk tidak boleh kosong"),
  categoryName: z
    .string()
    .refine((val) => /^(Makanan|Minuman|Salad|Dessert)$/.test(val), {
      message: "Hanya ada kategori 'Makanan', 'Minuman', 'Salad', atau 'Dessert'.",
    }),
  images: z.string().min(1, "Gambar produk tidak boleh kosong!"),
  startTime: z.date({ message: "Jam mulai tidak boleh kosong" }),
  endTime: z.date({ message: "Jam selesai tidak boleh kosong" }),
  isDaily: z.boolean(),
});
export type TCreateProductSchema = z.infer<typeof createProductSchema>;

export const updateProductSchema = z.object({
  name: z
    .string()
    .min(1, "Nama produk tidak boleh kosong")
    .min(3, "Nama produk minimal 3 huruf"),
  description: z.string().min(1, "Deskripsi produk tidak boleh kosong"),
  price: z.string().min(3, "Harga produk tidak boleh kosong"),
  categoryName: z
    .string()
    .refine((val) => /^(Makanan|Minuman|Salad|Dessert)$/.test(val), {
      message: "Hanya ada kategori 'Makanan', 'Minuman', 'Salad', atau 'Dessert'.",
    }),
  images: z.string().min(1, "Gambar produk tidak boleh kosong!"),
  startTime: z.date({ message: "Jam mulai tidak boleh kosong" }),
  endTime: z.date({ message: "Jam selesai tidak boleh kosong" }),
  isDaily: z.boolean(),
  isActive: z.boolean().optional(),
});
export type TUpdateProductSchema = z.infer<typeof updateProductSchema>;
