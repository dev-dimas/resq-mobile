import env from "@/env";

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

export class FetchError extends Error {
  constructor(
    public res: Response & { statusCode: number },
    message?: string
  ) {
    super(message);
  }
}

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
        accept: "*/*",
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

      if (!res.ok) {
        throw new FetchError({ ...json, statusCode: res.status });
      }
      return json;
    } catch (error) {
      if (error instanceof FetchError) {
        console.log(`Error Fetch ${url} : `, error.res);
      }
      throw error;
    }
  }
}

export const coreApi = new CoreAPI();
