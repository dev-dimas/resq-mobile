import { TEditAccountSchema } from "@/schemas/form/edit-account";
import { ImagePickerSuccessResult } from "expo-image-picker";
import FormData from "form-data";
import { coreApi } from "./core";

export async function postEditAccount(data: TEditAccountSchema, token: string) {
  const result = await coreApi.fetch({
    url: "/account/edit",
    method: "POST",
    data,
    token: token!,
  });

  return result;
}

export async function postAvatarAccount(avatar: ImagePickerSuccessResult, token: string) {
  const formData = new FormData();
  formData.append("avatar", {
    uri: avatar.assets[0].uri as string,
    type: avatar.assets[0].mimeType,
    name: avatar.assets[0].fileName,
  });

  const result = await coreApi.fetch({
    url: "/account/avatar",
    method: "POST",
    isFormData: true,
    data: formData,
    token: token!,
  });

  return result;
}

export async function deleteAvatarAccount(token: string) {
  const result = await coreApi.fetch({
    url: "/account/avatar",
    method: "DELETE",
    data: {},
    token: token!,
  });
}
