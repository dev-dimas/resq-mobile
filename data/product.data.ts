import { Product } from "@/types/product.type";

export type ProductNearby = {
  distance: number;
} & Pick<
  Product,
  "id" | "name" | "categoryName" | "description" | "images" | "price" | "imageBlurHash"
>;
