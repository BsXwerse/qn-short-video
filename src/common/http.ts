import { Result } from "@/types/result";
import { FetchOptions, ofetch } from "ofetch";
import toast from "react-hot-toast";
import qs from "qs";

export const fetcher = async <T>(
  url: RequestInfo,
  method = "GET",
  data?: Record<any, any>,
  options?: FetchOptions<"json">,
): Promise<T> => {
  const res = await ofetch<Result<T>>(url, {
    method,
    body: data,
    onResponseError({ response }) {
      toast.error("发生错误：" + response.statusText);
    },
    ...options,
    headers: {
      ...options?.headers,
    },
  });

  const { code, msg, body } = res;
  if (code !== 200) {
    toast.error("发生错误：" + msg);
    throw new Error(msg || "未知错误");
  }

  return body;
};

export const get = async <T = any>(
  url: RequestInfo,
  params?: Record<string, any>,
  options?: FetchOptions<"json">,
) => {
  const query = qs.stringify(params, {
    arrayFormat: "comma",
    skipNulls: true,
    addQueryPrefix: true,
    encode: true,
  });
  return await fetcher<T>(`${url}${query}`, "GET", undefined, options);
};

export const post = async <T = any>(
  url: RequestInfo,
  body: Record<any, any> = {},
  options?: FetchOptions<"json">,
) => {
  return await fetcher<T>(url, "POST", body, options);
};
