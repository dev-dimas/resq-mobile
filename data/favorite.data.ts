import { ProductNearby, products } from "./product.data";

export type FavoriteProduct = {
  product: ProductNearby[];
};

export const favoritesProduct: FavoriteProduct = {
  product: [products[0], products[15], products[30], products[45], products[59]],
};
