import { coreApi } from "./core";

export async function getFavoriteList(token: string) {
  return await coreApi.fetch({
    method: "GET",
    url: "/customer/favorite",
    token,
  });
}

export async function addToFavorite(productId: string, token: string) {
  return await coreApi.fetch({
    method: "POST",
    url: "/customer/favorite",
    data: { productId },
    token,
  });
}

export async function removeFromFavorite(productId: string, token: string) {
  return await coreApi.fetch({
    method: "DELETE",
    url: `/customer/favorite`,
    data: { productId },
    token,
  });
}

export async function getSubscriptionList(token: string) {
  return await coreApi.fetch({
    method: "GET",
    url: "/customer/subscription",
    token,
  });
}

export async function subscribeTo(to: string, token: string) {
  return await coreApi.fetch({
    method: "POST",
    url: "/customer/subscription",
    data: { to },
    token,
  });
}

export async function unsubscribeFrom(from: string, token: string) {
  return await coreApi.fetch({
    method: "DELETE",
    url: `/customer/subscription`,
    data: { from },
    token,
  });
}
