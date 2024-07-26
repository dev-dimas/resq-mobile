import { coreApi } from "./core";

export async function getProductById(productId: string, token: string) {
  return await coreApi.fetch({
    url: `/product/${productId}`,
    method: "GET",
    token,
  });
}
