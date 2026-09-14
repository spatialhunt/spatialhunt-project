/**
 * Client auth session helpers.
 * Stores JWT in sessionStorage only (not localStorage for sensitive longevity).
 * NEVER store NIN or identity documents in browser storage.
 */

import type { AuthSession, Role } from "@/lib/types";

const SESSION_KEY = "sh_auth_session";

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function setSession(session: AuthSession): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("sh-auth-changed"));
  }
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("sh-auth-changed"));
  }
}

export function getAccessToken(): string | null {
  return getSession()?.accessToken ?? null;
}

export function requireRole(roles: Role[]): AuthSession | null {
  const session = getSession();
  if (!session) return null;
  if (!roles.includes(session.role)) return null;
  return session;
}

export function authHeaders(extra?: HeadersInit): HeadersInit {
  const token = getAccessToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}
