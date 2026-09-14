import { apiFetch } from "@/lib/services/http";
import type { Verification, VerificationStatus, VerificationType } from "@/lib/types";

export const verificationService = {
  async submit(payload: {
    type: VerificationType;
    documentUrl: string;
    propertyId?: string;
  }): Promise<Verification> {
    return apiFetch<Verification>(
      "/api/verifications",
      { method: "POST", body: JSON.stringify(payload) },
      true,
    );
  },

  async getMine(): Promise<Verification[]> {
    return apiFetch<Verification[]>("/api/verifications/mine", {}, true);
  },

  async getPending(): Promise<Verification[]> {
    return apiFetch<Verification[]>("/api/verifications/pending", {}, true);
  },

  async review(
    id: string,
    payload: { status: Exclude<VerificationStatus, "PENDING">; reviewNotes?: string },
  ): Promise<Verification> {
    return apiFetch<Verification>(
      `/api/verifications/${id}/review`,
      { method: "POST", body: JSON.stringify(payload) },
      true,
    );
  },
};
