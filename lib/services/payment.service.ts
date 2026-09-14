import { apiFetch } from "@/lib/services/http";
import type { EscrowTransaction } from "@/lib/types";

export const paymentService = {
  async create(payload: {
    propertyId: string;
    landlordId: string;
    amount: number;
  }): Promise<EscrowTransaction> {
    return apiFetch<EscrowTransaction>(
      "/api/escrow",
      { method: "POST", body: JSON.stringify(payload) },
      true,
    );
  },

  async getMine(): Promise<EscrowTransaction[]> {
    return apiFetch<EscrowTransaction[]>("/api/escrow/mine", {}, true);
  },

  async fund(id: string, paystackReference?: string): Promise<EscrowTransaction> {
    return apiFetch<EscrowTransaction>(
      `/api/escrow/${id}/fund`,
      { method: "POST", body: JSON.stringify({ paystackReference }) },
      true,
    );
  },

  async confirmInspection(id: string): Promise<EscrowTransaction> {
    return apiFetch<EscrowTransaction>(
      `/api/escrow/${id}/confirm-inspection`,
      { method: "POST" },
      true,
    );
  },

  async confirmKeys(id: string): Promise<EscrowTransaction> {
    return apiFetch<EscrowTransaction>(
      `/api/escrow/${id}/confirm-keys`,
      { method: "POST" },
      true,
    );
  },

  async confirmAgreement(id: string): Promise<EscrowTransaction> {
    return apiFetch<EscrowTransaction>(
      `/api/escrow/${id}/confirm-agreement`,
      { method: "POST" },
      true,
    );
  },

  async release(id: string): Promise<EscrowTransaction> {
    return apiFetch<EscrowTransaction>(
      `/api/escrow/${id}/release`,
      { method: "POST" },
      true,
    );
  },
};
