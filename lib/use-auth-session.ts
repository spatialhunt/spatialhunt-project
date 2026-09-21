"use client";

import { useSyncExternalStore } from "react";
import { getSession } from "@/lib/auth-client";
import type { AuthSession } from "@/lib/types";

// Cache the last parsed session so useSyncExternalStore gets a stable reference.
// Without this, getSession() would create a new object on every render,
// triggering React's "getSnapshot should be cached" infinite loop error.
let cachedSession: AuthSession | null = null;
let cachedRaw: string | null = null;

function getSnapshot(): AuthSession | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem("sh_auth_session") ?? null;
  // Return the same object reference if the raw string hasn't changed
  if (raw === cachedRaw) return cachedSession;
  cachedRaw = raw;
  try {
    cachedSession = raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    cachedSession = null;
  }
  return cachedSession;
}

function getServerSnapshot(): AuthSession | null {
  return null;
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => {
    // Invalidate cache so next getSnapshot call re-parses
    cachedRaw = null;
    onStoreChange();
  };
  window.addEventListener("storage", handler);
  window.addEventListener("sh-auth-changed", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("sh-auth-changed", handler);
  };
}

export function useAuthSession(): AuthSession | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function notifyAuthChanged() {
  if (typeof window !== "undefined") {
    cachedRaw = null; // Invalidate cache before notifying
    window.dispatchEvent(new Event("sh-auth-changed"));
  }
}
