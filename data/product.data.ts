import { images } from "constants/";
import { Product } from "types/product.type";

export type ProductNearby = {
  distance: number;
} & Pick<Product, "name" | "images" | "price">;

export const products: ProductNearby[] = [
  {
    name: "Donat Kentang",
    price: "3000",
    images: [images.donutPotato],
    distance: 0.211,
  },
  {
    name: "Donat Cinnamon",
    price: "3000",
    images: [images.donutCinnamon],
    distance: 0.54,
  },
  {
    name: "Donat Coklat",
    price: "3000",
    images: [images.donutChocolate],
    distance: 0.7249,
  },
  {
    name: "Donat Vanila",
    price: "3000",
    images: [images.donutVanilla],
    distance: 0.8241,
  },
];
