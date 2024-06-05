import { Result } from "@/types/result";

export async function post<T>(url: string, body: any) {
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const respBody = await resp.json();
  const res: Result<T> = {
    code: respBody.code,
    msg: respBody.msg,
    body: respBody.body,
  };
  return res;
}

export async function get<T>(url: string, params?: URLSearchParams) {
  if (params) {
    url += "?" + params.toString();
  }
  const resp = await fetch(url);
  const respBody = await resp.json();
  const res: Result<T> = {
    code: respBody.code,
    msg: respBody.msg,
    body: respBody.body,
  };
  return res;
}
