import { apiFetch } from "@/lib/services/http";
import type { AuthSession, Role } from "@/lib/types";
import { setSession, clearSession } from "@/lib/auth-client";

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role: Exclude<Role, "ADMIN">;
}

export interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  userId: string;
  email: string;
  role: Role;
  fullName: string;
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthSession> {
    const data = await apiFetch<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const session: AuthSession = {
      accessToken: data.accessToken,
      userId: data.userId,
      email: data.email,
      role: data.role,
      fullName: data.fullName,
    };
    setSession(session);
    return session;
  },

  async register(payload: RegisterPayload): Promise<AuthSession> {
    const data = await apiFetch<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const session: AuthSession = {
      accessToken: data.accessToken,
      userId: data.userId,
      email: data.email,
      role: data.role,
      fullName: data.fullName ?? payload.fullName,
    };
    setSession(session);
    return session;
  },

  logout(): void {
    clearSession();
  },

  async requestPasswordReset(email: string): Promise<void> {
    await apiFetch<{ message: string }>("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await apiFetch<{ message: string }>("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });
  },

  async verifyAccount(code: string): Promise<void> {
    await apiFetch<{ message: string }>("/api/auth/verify-account", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
  },
};
