"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TenantDashboardLayout from "@/component/layout/TenantDashboardLayout";
import { CompactPropertyCard } from "@/component/property/CompactPropertyCard";
import { EmptyState, LoadingState } from "@/component/shared/AppStates";
import { PageHeader, Button } from "@/component/ui/primitives";
import { MOCK_PROPERTIES } from "@/mocks";
import { favoriteService } from "@/lib/services/notification.service";
import type { Property } from "@/lib/types";

export default function SavedPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await favoriteService.list();
        if (!cancelled) {
          setProperties(data.length > 0 ? data : MOCK_PROPERTIES.slice(0, 2));
          setUsingMock(data.length === 0);
        }
      } catch {
        if (!cancelled) {
          setProperties(MOCK_PROPERTIES.slice(0, 2));
          setUsingMock(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleRemove(id: string) {
    try {
      await favoriteService.remove(id);
    } catch {
      /* mock fallback — update local state only */
    }
    setProperties((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <TenantDashboardLayout>
      <PageHeader
        title="Saved Properties"
        description="Homes you've bookmarked for later. Remove any time."
      />

      {usingMock && (
        <p className="mb-4 rounded-[8px] border border-[#FFF4D6] bg-[#FFF6D9] px-4 py-2 text-xs text-[#C99A20]">
          Showing demo saved homes — connect favorites API to sync across devices.
        </p>
      )}

      {loading ? (
        <LoadingState title="Loading saved properties" />
      ) : properties.length === 0 ? (
        <EmptyState
          title="No saved properties yet"
          description="When you find a home you like, save it here to compare and revisit later."
          action={
            <Link href="/properties">
              <Button variant="primary">Find a home</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <CompactPropertyCard
              key={property.id}
              property={property}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </TenantDashboardLayout>
  );
}
