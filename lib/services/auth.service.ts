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
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthSession> {
    const data = await apiFetch<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const session: AuthSession = { ...data };
    setSession(session);
    return session;
  },

  async register(payload: RegisterPayload): Promise<AuthSession> {
    const data = await apiFetch<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const session: AuthSession = { ...data, fullName: payload.fullName };
    setSession(session);
    return session;
  },

  logout(): void {
    clearSession();
  },

  // TODO: Wire when backend endpoints exist
  async requestPasswordReset(_email: string): Promise<void> {
    // TODO: POST /api/auth/forgot-password
    await new Promise((r) => setTimeout(r, 400));
  },

  async resetPassword(_token: string, _password: string): Promise<void> {
    // TODO: POST /api/auth/reset-password
    await new Promise((r) => setTimeout(r, 400));
  },

  async verifyAccount(_code: string): Promise<void> {
    // TODO: POST /api/auth/verify-account
    await new Promise((r) => setTimeout(r, 400));
  },
};
