import FormData from "form-data";
import { coreApi } from "./core";
import { TCreateProductSchema, TUpdateProductSchema } from "@/schemas/form/product";
import { ImagePickerSuccessResult } from "expo-image-picker";
import dayjs from "dayjs";

export async function createProduct(
  data: TCreateProductSchema,
  productImage: ImagePickerSuccessResult,
  token: string
) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", data.price);
  formData.append("categoryName", data.categoryName);
  formData.append("startTime", dayjs(data.startTime).toISOString());
  formData.append("endTime", dayjs(data.endTime).toISOString());
  formData.append("isDaily", data.isDaily);
  formData.append("images", {
    uri: productImage.assets[0].uri as string,
    type: productImage.assets[0].mimeType,
    name: productImage.assets[0].fileName,
  });

  const result = await coreApi.fetch({
    url: "/product",
    method: "POST",
    isFormData: true,
    data: formData,
    token: token!,
  });

  return result;
}

export async function updateProduct({
  productId,
  data = {},
  productImage = null,
  token,
}: {
  productId: string;
  data: Partial<TUpdateProductSchema>;
  productImage?: ImagePickerSuccessResult | null;
  token: string;
}) {
  const formData = new FormData();

  delete data.images;

  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Date) {
      formData.append(key, dayjs(value).toISOString());
    } else {
      formData.append(key, value);
    }
  }

  if (productImage)
    formData.append("images", {
      uri: productImage.assets[0].uri as string,
      type: productImage.assets[0].mimeType,
      name: productImage.assets[0].fileName,
    });

  const result = await coreApi.fetch({
    url: `/product/${productId}`,
    method: "PATCH",
    isFormData: true,
    data: formData,
    token: token!,
  });

  return result;
}

export async function deleteProduct(productId: string, token: string) {
  const result = await coreApi.fetch({
    url: `/product/${productId}`,
    method: "DELETE",
    data: {},
    token: token!,
  });

  return result;
}

export async function reActivateProduct(productId: string, token: string) {
  return await coreApi.fetch({
    url: `/product/${productId}/reactivate`,
    method: "POST",
    data: {},
    token: token!,
  });
}

export async function getSellerById(sellerId: string, token: string) {
  return await coreApi.fetch({
    url: `/seller/${sellerId}`,
    method: "GET",
    token: token!,
  });
}
