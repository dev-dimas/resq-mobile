import env from "env";

type TMethodRequest = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type TFetchOptions<T extends TMethodRequest> = T extends "GET"
  ? {
      token?: string;
      prefix?: string;
      method: "GET";
      url: string;
      data?: never;
      isFormData?: boolean;
    }
  : {
      token?: string;
      prefix?: string;
      method: Exclude<T, "GET">;
      url: string;
      data: any;
      isFormData?: boolean;
    };

class CoreAPI {
  async fetch<T extends TMethodRequest>({
    token,
    prefix = "/api",
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

      const res = await fetch(`${env.EXPO_PUBLIC_API_URL}${prefix}${url}`, {
        method,
        headers,
        body: isFormData ? data : JSON.stringify(data),
      });

      const json = await res.json();

      console.log("LOG FROM CORE.TS", json);
      if (res.status !== 200 && res.status !== 201) {
        throw new Error(json.message);
      }

      return json;
    } catch (error) {
      console.log("Error Fetch : ", error);
      throw error;
    }
  }
}

export const coreApi = new CoreAPI();
