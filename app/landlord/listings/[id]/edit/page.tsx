"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader, Button } from "@/component/ui/Primitives";
import { ListingWizard } from "@/component/landlord/ListingWizard";
import { LoadingState, NotFoundState } from "@/component/shared/AppStates";
import { propertyService } from "@/lib/services/property.service";
import { MOCK_PROPERTIES } from "@/mocks";
import type { Property } from "@/lib/types";

export default function EditListingPage() {
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
        title="Edit listing"
        description={property.title}
        actions={
          <Link href={`/landlord/listings/${id}`}>
            <Button variant="ghost">Cancel</Button>
          </Link>
        }
      />
      <ListingWizard propertyId={id} initialProperty={property} />
    </div>
  );
}
