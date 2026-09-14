import { authHeaders } from "@/lib/auth-client";

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  authenticated = false,
): Promise<T> {
  const headers = authenticated
    ? authHeaders(options.headers)
    : { "Content-Type": "application/json", ...options.headers };

  const res = await fetch(path, { ...options, headers });

  let body: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }

  if (!res.ok) {
    const message =
      typeof body === "object" && body && "message" in body
        ? String((body as { message: unknown }).message)
        : `Request failed (${res.status})`;
    throw new ApiError(message, res.status, body);
  }

  return body as T;
}
