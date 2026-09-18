"use client";

import { useState } from "react";
import TenantDashboardLayout from "@/component/layout/TenantDashboardLayout";
import { SuccessState } from "@/component/shared/AppStates";
import { Button, Input, PageHeader, Select, Surface } from "@/component/ui/Primitives";
import type { PropertyType } from "@/lib/types";

const AMENITY_OPTIONS = ["Water", "Security", "Power backup", "Parking", "Kitchen", "Road access"];
const LOCATION_OPTIONS = ["Lekki", "Yaba", "Ikeja", "Surulere", "Victoria Island"];

export default function PreferencesPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    minBudget: "1000000",
    maxBudget: "3500000",
    locations: ["Lekki", "Yaba"] as string[],
    propertyType: "APARTMENT" as PropertyType,
    bedrooms: "2",
    amenities: ["Water", "Security"] as string[],
  });

  function toggleLocation(loc: string) {
    setForm((prev) => ({
      ...prev,
      locations: prev.locations.includes(loc)
        ? prev.locations.filter((l) => l !== loc)
        : [...prev.locations, loc],
    }));
  }

  function toggleAmenity(amenity: string) {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <TenantDashboardLayout>
      <PageHeader
        title="Preferences"
        description="Tell us what you're looking for — we'll tailor recommendations."
      />

      {saved && (
        <div className="mb-4">
          <SuccessState
            title="Preferences saved"
            description="Your rental criteria are stored locally until the preferences API is connected."
          />
        </div>
      )}

      <Surface className="max-w-2xl !bg-white">
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <h2 className="text-base font-bold text-[#2E2E2E]">Budget</h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <Input
                label="Min budget (₦/year)"
                type="number"
                value={form.minBudget}
                onChange={(e) => setForm({ ...form, minBudget: e.target.value })}
              />
              <Input
                label="Max budget (₦/year)"
                type="number"
                value={form.maxBudget}
                onChange={(e) => setForm({ ...form, maxBudget: e.target.value })}
              />
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-[#2E2E2E]">Preferred locations</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {LOCATION_OPTIONS.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => toggleLocation(loc)}
                  className={`rounded-[5px] px-3 py-1.5 text-xs font-semibold transition ${
                    form.locations.includes(loc)
                      ? "bg-[#1E5A4F] text-white"
                      : "border border-[#DDDDDD] text-[#444444] hover:border-[#1E5A4F]"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Property type"
              value={form.propertyType}
              onChange={(e) =>
                setForm({ ...form, propertyType: e.target.value as PropertyType })
              }
            >
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

          <div>
            <h2 className="text-base font-bold text-[#2E2E2E]">Must-have amenities</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {AMENITY_OPTIONS.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`rounded-[5px] px-3 py-1.5 text-xs font-semibold transition ${
                    form.amenities.includes(amenity)
                      ? "bg-[#F4B942] text-[#1E5A4F]"
                      : "border border-[#DDDDDD] text-[#444444] hover:border-[#1E5A4F]"
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" variant="primary">
            Save preferences
          </Button>
        </form>
      </Surface>
    </TenantDashboardLayout>
  );
}
