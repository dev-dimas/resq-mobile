import { TSignInSchema, TSignUpSchema } from "@/schemas/form/auth";
import { CoreAPI } from "./core";

const coreApi = new CoreAPI();

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
