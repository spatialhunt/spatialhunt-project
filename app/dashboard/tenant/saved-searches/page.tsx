"use client";

import { useState } from "react";
import TenantDashboardLayout from "@/component/layout/TenantDashboardLayout";
import { DeleteConfirmationModal } from "@/component/shared/ConfirmationModal";
import { EmptyState } from "@/component/shared/AppStates";
import {
  Button,
  Input,
  PageHeader,
  Select,
  Surface,
} from "@/component/ui/primitives";
import { MOCK_SAVED_SEARCHES, formatNaira } from "@/mocks";
import type { PropertyType, SavedSearch } from "@/lib/types";

const AMENITY_OPTIONS = ["Water", "Security", "Power backup", "Parking", "Kitchen"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const emptyForm = {
  name: "",
  location: "",
  minPrice: "",
  maxPrice: "",
  propertyType: "" as PropertyType | "",
  bedrooms: "",
  amenities: [] as string[],
  alertsEnabled: true,
};

export default function SavedSearchesPage() {
  const [searches, setSearches] = useState<SavedSearch[]>(MOCK_SAVED_SEARCHES);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
  }

  function openEdit(search: SavedSearch) {
    setEditingId(search.id);
    setForm({
      name: search.name,
      location: search.location || "",
      minPrice: search.minPrice?.toString() || "",
      maxPrice: search.maxPrice?.toString() || "",
      propertyType: search.propertyType || "",
      bedrooms: search.bedrooms?.toString() || "",
      amenities: search.amenities || [],
      alertsEnabled: search.alertsEnabled,
    });
    setFormOpen(true);
  }

  function toggleAmenity(amenity: string) {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  }

  function saveSearch() {
    const payload: SavedSearch = {
      id: editingId || `ss-${Date.now()}`,
      name: form.name || "Untitled search",
      location: form.location || undefined,
      minPrice: form.minPrice ? Number(form.minPrice) : undefined,
      maxPrice: form.maxPrice ? Number(form.maxPrice) : undefined,
      propertyType: form.propertyType || undefined,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : undefined,
      amenities: form.amenities,
      alertsEnabled: form.alertsEnabled,
      matchCount: editingId
        ? searches.find((s) => s.id === editingId)?.matchCount
        : 0,
      updatedAt: new Date().toISOString(),
    };

    if (editingId) {
      setSearches((prev) => prev.map((s) => (s.id === editingId ? payload : s)));
    } else {
      setSearches((prev) => [payload, ...prev]);
    }
    setFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function toggleAlerts(id: string) {
    setSearches((prev) =>
      prev.map((s) => (s.id === id ? { ...s, alertsEnabled: !s.alertsEnabled } : s)),
    );
  }

  function confirmDelete() {
    if (deleteId) {
      setSearches((prev) => prev.filter((s) => s.id !== deleteId));
      setDeleteId(null);
    }
  }

  return (
    <TenantDashboardLayout>
      <PageHeader
        title="Saved Searches"
        description="Get alerts when new listings match your criteria."
        actions={
          <Button variant="primary" onClick={openCreate}>
            New search
          </Button>
        }
      />

      {formOpen && (
        <Surface className="mb-6">
          <h2 className="text-base font-bold text-[#2E2E2E]">
            {editingId ? "Edit saved search" : "Create saved search"}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input
              label="Search name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Lekki under ₦3m"
            />
            <Input
              label="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Lekki, Lagos"
            />
            <Input
              label="Min budget (₦)"
              type="number"
              value={form.minPrice}
              onChange={(e) => setForm({ ...form, minPrice: e.target.value })}
            />
            <Input
              label="Max budget (₦)"
              type="number"
              value={form.maxPrice}
              onChange={(e) => setForm({ ...form, maxPrice: e.target.value })}
            />
            <Select
              label="Property type"
              value={form.propertyType}
              onChange={(e) =>
                setForm({ ...form, propertyType: e.target.value as PropertyType | "" })
              }
            >
              <option value="">Any type</option>
              <option value="APARTMENT">Apartment</option>
              <option value="HOUSE">House</option>
              <option value="SINGLE_ROOM">Single room</option>
            </Select>
            <Input
              label="Bedrooms"
              type="number"
              min={0}
              value={form.bedrooms}
              onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium text-[#2E2E2E]">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {AMENITY_OPTIONS.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`rounded-[5px] px-3 py-1.5 text-xs font-semibold transition ${
                    form.amenities.includes(amenity)
                      ? "bg-[#1E5A4F] text-white"
                      : "border border-[#DDDDDD] text-[#444444] hover:border-[#1E5A4F]"
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm text-[#2E2E2E]">
            <input
              type="checkbox"
              checked={form.alertsEnabled}
              onChange={(e) => setForm({ ...form, alertsEnabled: e.target.checked })}
              className="h-4 w-4 accent-[#1E5A4F]"
            />
            Email me when new matches appear
          </label>
          <div className="mt-5 flex gap-2">
            <Button variant="primary" onClick={saveSearch}>
              {editingId ? "Save changes" : "Create search"}
            </Button>
            <Button variant="secondary" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
          </div>
        </Surface>
      )}

      {searches.length === 0 ? (
        <EmptyState
          title="No saved searches"
          description="Save your filters from the properties page to get notified about new matches."
          action={
            <Button variant="primary" onClick={openCreate}>
              Create your first search
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {searches.map((search) => (
            <Surface key={search.id} className="!bg-white">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-[#2E2E2E]">{search.name}</h3>
                  <p className="mt-1 text-sm text-[#777777]">
                    {search.location || "Any location"}
                    {search.minPrice || search.maxPrice
                      ? ` · ${search.minPrice ? formatNaira(search.minPrice) : "—"} – ${search.maxPrice ? formatNaira(search.maxPrice) : "—"}`
                      : ""}
                    {search.bedrooms ? ` · ${search.bedrooms} bed` : ""}
                    {search.propertyType ? ` · ${search.propertyType.replace("_", " ")}` : ""}
                  </p>
                  {search.amenities && search.amenities.length > 0 && (
                    <p className="mt-1 text-xs text-[#8A8A8A]">
                      {search.amenities.join(" · ")}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-[#999999]">
                    Updated {formatDate(search.updatedAt)}
                    {typeof search.matchCount === "number" && (
                      <> · {search.matchCount} current matches</>
                    )}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleAlerts(search.id)}
                    className={`rounded-[5px] px-3 py-1.5 text-xs font-semibold ${
                      search.alertsEnabled
                        ? "bg-[#DDF2E4] text-[#117E25]"
                        : "bg-[#E5E5E5] text-[#555555]"
                    }`}
                  >
                    Alerts {search.alertsEnabled ? "on" : "off"}
                  </button>
                  <Button variant="secondary" className="!py-1.5 text-xs" onClick={() => openEdit(search)}>
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="!py-1.5 text-xs text-[#B42318]"
                    onClick={() => setDeleteId(search.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Surface>
          ))}
        </div>
      )}

      <DeleteConfirmationModal
        open={!!deleteId}
        description="This saved search and its alert settings will be removed."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </TenantDashboardLayout>
  );
}
