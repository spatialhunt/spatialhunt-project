"use client";

import { useSyncExternalStore } from "react";
import { getSession } from "@/lib/auth-client";
import type { AuthSession } from "@/lib/types";

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener("sh-auth-changed", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("sh-auth-changed", handler);
  };
}

export function useAuthSession(): AuthSession | null {
  return useSyncExternalStore(subscribe, getSession, () => null);
}

export function notifyAuthChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("sh-auth-changed"));
  }
}
