"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader, Surface, Button } from "@/component/ui/primitives";
import { PropertyStatusBadge, VerificationBadge } from "@/component/verification/StatusBadges";
import { LoadingState, NotFoundState } from "@/component/shared/AppStates";
import { propertyService } from "@/lib/services/property.service";
import { MOCK_PROPERTIES, formatNaira } from "@/mocks";
import type { Property } from "@/lib/types";

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setProperty(await propertyService.getProperty(id));
      } catch {
        // TODO: remove mock fallback when /api/properties/:id is live
        setProperty(MOCK_PROPERTIES.find((p) => p.id === id) ?? null);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [id]);

  if (loading) return <LoadingState title="Loading listing" />;
  if (!property) {
    return (
      <NotFoundState
        title="Listing not found"
        action={
          <Link href="/landlord/listings">
            <Button variant="primary">Back to listings</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <PageHeader
        title={property.title}
        description={`${property.address}, ${property.city}, ${property.state}`}
        actions={
          <>
            <Link href={`/landlord/listings/${id}/edit`}>
              <Button variant="secondary">Edit</Button>
            </Link>
            <Link href={`/properties/${id}`} target="_blank">
              <Button variant="ghost">Preview public page</Button>
            </Link>
          </>
        }
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Surface>
          <div className="mb-4 flex flex-wrap gap-2">
            <PropertyStatusBadge status={property.status} />
            <VerificationBadge verified={property.status === "VERIFIED"} />
          </div>
          <p className="text-2xl font-bold text-[#1E5A4F]">{formatNaira(property.price)}</p>
          <p className="mt-1 text-xs text-[#777777]">Per {property.pricePeriod?.toLowerCase() ?? "year"}</p>
          <p className="mt-4 text-sm text-[#2E2E2E]">{property.description}</p>
          <p className="mt-4 text-sm text-[#777777]">
            {property.bedrooms} bed · {property.bathrooms} bath · {property.type.replace(/_/g, " ")}
          </p>
        </Surface>

        <Surface>
          <h2 className="mb-3 font-semibold text-[#2E2E2E]">Amenities</h2>
          <ul className="flex flex-wrap gap-2">
            {property.amenities.map((a) => (
              <li key={a} className="rounded-[5px] bg-[#EAF3F0] px-2 py-1 text-xs text-[#1E5A4F]">
                {a}
              </li>
            ))}
          </ul>
          {property.photos && property.photos.length > 0 && (
            <>
              <h2 className="mb-3 mt-5 font-semibold text-[#2E2E2E]">Media</h2>
              <ul className="space-y-1 text-xs text-[#777777]">
                {property.photos.map((ph) => (
                  <li key={ph.id}>{ph.isWalkthroughVideo ? "Walkthrough: " : "Photo: "}{ph.url}</li>
                ))}
              </ul>
            </>
          )}
        </Surface>
      </div>
    </div>
  );
}
