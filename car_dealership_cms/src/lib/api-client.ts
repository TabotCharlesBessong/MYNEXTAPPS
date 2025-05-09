import ky, { type Options } from "ky";

export const api = {
  get: <TResponse>(url: string, opts?: Options) =>
    ky.get(url, opts).json<TResponse>(),
  post: <TResponse>(url: string, opts?: Options) =>
    ky.post(url, opts).json<TResponse>(),
};
