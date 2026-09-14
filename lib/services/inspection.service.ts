import { apiFetch } from "@/lib/services/http";
import type { Booking, BookingStatus } from "@/lib/types";

export const inspectionService = {
  async create(payload: { propertyId: string; scheduledAt: string }): Promise<Booking> {
    return apiFetch<Booking>(
      "/api/bookings",
      { method: "POST", body: JSON.stringify(payload) },
      true,
    );
  },

  async getMine(): Promise<Booking[]> {
    return apiFetch<Booking[]>("/api/bookings/mine", {}, true);
  },

  async getLandlord(): Promise<Booking[]> {
    return apiFetch<Booking[]>("/api/bookings/landlord", {}, true);
  },

  async updateStatus(id: string, status: BookingStatus): Promise<Booking> {
    return apiFetch<Booking>(
      `/api/bookings/${id}/status`,
      { method: "PATCH", body: JSON.stringify({ status }) },
      true,
    );
  },
};
