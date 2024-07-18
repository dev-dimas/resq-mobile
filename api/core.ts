import env from "env";

type TMethodRequest = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type TFetchOptions<T extends TMethodRequest> = T extends "GET"
  ? {
      token?: string;
      method: "GET";
      url: string;
      data?: never;
      isFormData?: boolean;
    }
  : {
      token?: string;
      method: Exclude<T, "GET">;
      url: string;
      data: any;
      isFormData?: boolean;
    };

export class CoreAPI {
  async fetch<T extends TMethodRequest>({
    token,
    method = "GET",
    url,
    data,
    isFormData = false,
  }: TFetchOptions<T>) {
    try {
      let headers: Record<string, string> = {
        accept: "aplication/json",
        "Content-Type": "application/json",
      };

      if (isFormData) {
        headers = {
          ...headers,
          "Content-Type": "multipart/form-data",
        };
      }

      if (token) {
        headers = {
          ...headers,
          authorization: `Bearer ${token}`,
        };
      }

      const res = await fetch(`${env.EXPO_PUBLIC_API_URL}${url}`, {
        method,
        headers,
        body: isFormData ? data : JSON.stringify(data),
      });

      const json = await res.json();

      return json;
    } catch (error) {
      console.log("Error Fetch : ", error);
    }
  }
}
