import { apiFetch } from "@/lib/services/http";
import type { NotificationItem, Property } from "@/lib/types";

export const notificationService = {
  async list(): Promise<NotificationItem[]> {
    return apiFetch<NotificationItem[]>("/api/notifications", {}, true);
  },

  async markRead(id: string): Promise<void> {
    await apiFetch(`/api/notifications/${id}/read`, { method: "POST" }, true);
  },

  async markAllRead(): Promise<void> {
    await apiFetch("/api/notifications/read-all", { method: "POST" }, true);
  },
};

export const favoriteService = {
  async list(): Promise<Property[]> {
    return apiFetch<Property[]>("/api/favorites", {}, true);
  },

  async add(propertyId: string): Promise<void> {
    await apiFetch(`/api/favorites/${propertyId}`, { method: "POST" }, true);
  },

  async remove(propertyId: string): Promise<void> {
    await apiFetch(`/api/favorites/${propertyId}`, { method: "DELETE" }, true);
  },
};
