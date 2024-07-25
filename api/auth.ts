import { TSignInSchema, TSignUpSchema } from "@/schemas/form/auth";
import { coreApi } from "./core";

export async function postSignUp(data: Omit<TSignUpSchema, "confirmPassword">) {
  const result = await coreApi.fetch({
    url: "/account/register",
    method: "POST",
    data: {
      ...data,
      asCustomer: JSON.parse(data.asCustomer),
    },
  });

  return result;
}

export async function postSignIn(data: TSignInSchema) {
  const result = await coreApi.fetch({
    url: "/account/login",
    method: "POST",
    data,
  });
  return result;
}

export async function fetchDashboard(token: string) {
  const result = await coreApi.fetch({
    token,
    url: "/account",
    method: "GET",
  });

  return result;
}
