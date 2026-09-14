import { apiFetch } from "@/lib/services/http";
import type { Property } from "@/lib/types";

export interface PropertyFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: string;
  bedrooms?: number;
}

export const propertyService = {
  async getProperties(filters: PropertyFilters = {}): Promise<Property[]> {
    const params = new URLSearchParams();
    if (filters.city) params.set("city", filters.city);
    if (filters.minPrice != null) params.set("minPrice", String(filters.minPrice));
    if (filters.maxPrice != null) params.set("maxPrice", String(filters.maxPrice));
    if (filters.type) params.set("type", filters.type);
    if (filters.bedrooms != null) params.set("bedrooms", String(filters.bedrooms));
    const qs = params.toString();
    return apiFetch<Property[]>(`/api/properties${qs ? `?${qs}` : ""}`);
  },

  async getProperty(id: string): Promise<Property> {
    return apiFetch<Property>(`/api/properties/${id}`);
  },

  async getMine(): Promise<Property[]> {
    return apiFetch<Property[]>("/api/properties/mine", {}, true);
  },

  async create(payload: Partial<Property>): Promise<Property> {
    return apiFetch<Property>(
      "/api/properties",
      { method: "POST", body: JSON.stringify(payload) },
      true,
    );
  },

  async update(id: string, payload: Partial<Property>): Promise<Property> {
    return apiFetch<Property>(
      `/api/properties/${id}`,
      { method: "PATCH", body: JSON.stringify(payload) },
      true,
    );
  },

  async submit(id: string): Promise<Property> {
    return apiFetch<Property>(
      `/api/properties/${id}/submit`,
      { method: "POST" },
      true,
    );
  },

  async addPhoto(
    id: string,
    payload: { url: string; isWalkthroughVideo?: boolean; order?: number },
  ): Promise<unknown> {
    return apiFetch(
      `/api/properties/${id}/photos`,
      { method: "POST", body: JSON.stringify(payload) },
      true,
    );
  },
};
