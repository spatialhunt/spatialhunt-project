"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Select, Textarea } from "@/component/ui/primitives";
import { Surface } from "@/component/ui/primitives";
import { propertyService } from "@/lib/services/property.service";
import type { Property, PropertyType, PricePeriod } from "@/lib/types";
import { formatNaira } from "@/mocks";

const AMENITIES = [
  "Water",
  "Electricity",
  "Power backup",
  "Security",
  "Road access",
  "Parking",
  "Kitchen",
  "Balcony",
] as const;

const STEPS = ["Basics", "Location", "Pricing", "Amenities", "Photos", "Walkthrough", "Review"] as const;

export type ListingDraft = {
  title: string;
  description: string;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  address: string;
  city: string;
  state: string;
  price: string;
  pricePeriod: PricePeriod;
  amenities: string[];
  photoUrls: string;
  walkthroughUrl: string;
};

const emptyDraft: ListingDraft = {
  title: "",
  description: "",
  type: "APARTMENT",
  bedrooms: 1,
  bathrooms: 1,
  address: "",
  city: "Lagos",
  state: "Lagos",
  price: "",
  pricePeriod: "YEARLY",
  amenities: [],
  photoUrls: "",
  walkthroughUrl: "",
};

function draftFromProperty(p: Property): ListingDraft {
  return {
    title: p.title,
    description: p.description,
    type: p.type,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    address: p.address,
    city: p.city,
    state: p.state,
    price: String(p.price),
    pricePeriod: p.pricePeriod ?? "YEARLY",
    amenities: p.amenities ?? [],
    photoUrls: (p.photos ?? []).filter((ph) => !ph.isWalkthroughVideo).map((ph) => ph.url).join("\n"),
    walkthroughUrl: (p.photos ?? []).find((ph) => ph.isWalkthroughVideo)?.url ?? "",
  };
}

export function ListingWizard({
  propertyId,
  initialProperty,
}: {
  propertyId?: string;
  initialProperty?: Property;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<ListingDraft>(
    initialProperty ? draftFromProperty(initialProperty) : emptyDraft,
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof ListingDraft>(key: K, value: ListingDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function toggleAmenity(name: string) {
    setDraft((d) => ({
      ...d,
      amenities: d.amenities.includes(name)
        ? d.amenities.filter((a) => a !== name)
        : [...d.amenities, name],
    }));
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    const payload: Partial<Property> = {
      title: draft.title,
      description: draft.description,
      type: draft.type,
      bedrooms: draft.bedrooms,
      bathrooms: draft.bathrooms,
      address: draft.address,
      city: draft.city,
      state: draft.state,
      price: Number(draft.price),
      pricePeriod: draft.pricePeriod,
      amenities: draft.amenities,
      status: "DRAFT",
    };

    try {
      let saved: Property;
      if (propertyId) {
        saved = await propertyService.update(propertyId, payload);
      } else {
        saved = await propertyService.create(payload);
      }
      const urls = draft.photoUrls.split("\n").map((u) => u.trim()).filter(Boolean);
      for (let i = 0; i < urls.length; i++) {
        // TODO: wire photo upload API when backend supports file storage
        await propertyService.addPhoto(saved.id, { url: urls[i], order: i });
      }
      if (draft.walkthroughUrl.trim()) {
        await propertyService.addPhoto(saved.id, {
          url: draft.walkthroughUrl.trim(),
          isWalkthroughVideo: true,
          order: urls.length,
        });
      }
      await propertyService.submit(saved.id);
      router.push(`/landlord/listings/${saved.id}`);
    } catch {
      // TODO: replace mock fallback when /api/properties is live
      const mockId = propertyId ?? `mock-draft-${Date.now()}`;
      router.push(`/landlord/listings/${mockId}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {STEPS.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(i)}
            className={`rounded-[5px] px-3 py-1.5 text-xs font-semibold ${
              i === step ? "bg-[#1E5A4F] text-white" : "bg-[#EEEEEE] text-[#555555]"
            }`}
          >
            {i + 1}. {label}
          </button>
        ))}
      </div>

      <Surface>
        {step === 0 && (
          <div className="space-y-4">
            <Input label="Title" value={draft.title} onChange={(e) => update("title", e.target.value)} />
            <Textarea
              label="Description"
              rows={4}
              value={draft.description}
              onChange={(e) => update("description", e.target.value)}
            />
            <Select
              label="Property type"
              value={draft.type}
              onChange={(e) => update("type", e.target.value as PropertyType)}
            >
              <option value="SINGLE_ROOM">Single room</option>
              <option value="APARTMENT">Apartment</option>
              <option value="HOUSE">House</option>
            </Select>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Bedrooms"
                type="number"
                min={0}
                value={draft.bedrooms}
                onChange={(e) => update("bedrooms", Number(e.target.value))}
              />
              <Input
                label="Bathrooms"
                type="number"
                min={0}
                value={draft.bathrooms}
                onChange={(e) => update("bathrooms", Number(e.target.value))}
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <Input label="Address" value={draft.address} onChange={(e) => update("address", e.target.value)} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="City" value={draft.city} onChange={(e) => update("city", e.target.value)} />
              <Input label="State" value={draft.state} onChange={(e) => update("state", e.target.value)} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Input
              label="Price (₦)"
              type="number"
              min={0}
              value={draft.price}
              onChange={(e) => update("price", e.target.value)}
            />
            <Select
              label="Price period"
              value={draft.pricePeriod}
              onChange={(e) => update("pricePeriod", e.target.value as PricePeriod)}
            >
              <option value="MONTHLY">Monthly</option>
              <option value="YEARLY">Yearly</option>
            </Select>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-2 sm:grid-cols-2">
            {AMENITIES.map((a) => (
              <label key={a} className="flex items-center gap-2 text-sm text-[#2E2E2E]">
                <input
                  type="checkbox"
                  checked={draft.amenities.includes(a)}
                  onChange={() => toggleAmenity(a)}
                  className="accent-[#1E5A4F]"
                />
                {a}
              </label>
            ))}
          </div>
        )}

        {step === 4 && (
          <Textarea
            label="Photo URLs (one per line)"
            rows={6}
            placeholder="https://example.com/photo1.jpg"
            value={draft.photoUrls}
            onChange={(e) => update("photoUrls", e.target.value)}
          />
        )}

        {step === 5 && (
          <Input
            label="Walkthrough video URL"
            placeholder="https://example.com/walkthrough.mp4"
            value={draft.walkthroughUrl}
            onChange={(e) => update("walkthroughUrl", e.target.value)}
          />
        )}

        {step === 6 && (
          <div className="space-y-3 text-sm text-[#2E2E2E]">
            <p><strong>Title:</strong> {draft.title || "—"}</p>
            <p><strong>Location:</strong> {draft.address}, {draft.city}, {draft.state}</p>
            <p><strong>Price:</strong> {draft.price ? formatNaira(draft.price) : "—"} / {draft.pricePeriod.toLowerCase()}</p>
            <p><strong>Amenities:</strong> {draft.amenities.join(", ") || "None"}</p>
            <p><strong>Photos:</strong> {draft.photoUrls.split("\n").filter(Boolean).length} URL(s)</p>
            {error && <p className="text-[#C58D16]">{error}</p>}
          </div>
        )}

        <div className="mt-6 flex justify-between gap-3">
          <Button variant="secondary" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button variant="primary" onClick={() => setStep((s) => s + 1)}>
              Continue
            </Button>
          ) : (
            <Button variant="primary" disabled={submitting} onClick={() => void submit()}>
              {submitting ? "Submitting…" : "Submit listing"}
            </Button>
          )}
        </div>
      </Surface>
    </div>
  );
}
