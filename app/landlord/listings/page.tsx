"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader, Surface, Button } from "@/component/ui/primitives";
import { PropertyStatusBadge, VerificationBadge } from "@/component/verification/StatusBadges";
import { LoadingState, EmptyState } from "@/component/shared/AppStates";
import { ConfirmationModal } from "@/component/shared/ConfirmationModal";
import { propertyService } from "@/lib/services/property.service";
import { MOCK_PROPERTIES, formatNaira } from "@/mocks";
import type { Property } from "@/lib/types";

export default function LandlordListingsPage() {
  const [listings, setListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);
  const [deactivateId, setDeactivateId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setListings(await propertyService.getMine());
      } catch {
        // TODO: remove mock fallback when /api/properties/mine is live
        setListings(MOCK_PROPERTIES.filter((p) => p.ownerId === "landlord-1"));
        setDemo(true);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  async function deactivate(id: string) {
    try {
      await propertyService.update(id, { status: "DRAFT" });
      setListings((prev) => prev.map((p) => (p.id === id ? { ...p, status: "DRAFT" } : p)));
    } catch {
      setListings((prev) => prev.map((p) => (p.id === id ? { ...p, status: "DRAFT" } : p)));
    }
    setDeactivateId(null);
  }

  if (loading) return <LoadingState title="Loading listings" />;

  return (
    <div>
      <PageHeader
        title="My listings"
        description="Manage properties, verification, and visibility."
        actions={
          <Link href="/landlord/listings/new">
            <Button variant="amber">Add listing</Button>
          </Link>
        }
      />

      {demo && <p className="mb-4 text-xs font-semibold text-[#C99A20]">Demo data</p>}

      {listings.length === 0 ? (
        <EmptyState
          title="No listings yet"
          description="Create your first property listing to start receiving inquiries."
          action={
            <Link href="/landlord/listings/new">
              <Button variant="primary">Create listing</Button>
            </Link>
          }
        />
      ) : (
        <Surface className="overflow-x-auto p-0">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#EEEEEE] bg-white text-xs text-[#777777]">
                <th className="px-4 py-3">Property</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Verification</th>
                <th className="px-4 py-3">Inquiries</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((p) => (
                <tr key={p.id} className="border-b border-[#EEEEEE]">
                  <td className="px-4 py-3 font-medium text-[#2E2E2E]">{p.title}</td>
                  <td className="px-4 py-3 text-[#777777]">{p.city}, {p.state}</td>
                  <td className="px-4 py-3">{formatNaira(p.price)}</td>
                  <td className="px-4 py-3"><PropertyStatusBadge status={p.status} /></td>
                  <td className="px-4 py-3">
                    <VerificationBadge verified={p.status === "VERIFIED"} />
                  </td>
                  <td className="px-4 py-3 text-[#777777]">—</td>
                  <td className="px-4 py-3 text-[#777777]">—</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/landlord/listings/${p.id}`}>
                        <Button variant="ghost" className="!px-2 !py-1 text-xs">View</Button>
                      </Link>
                      <Link href={`/landlord/listings/${p.id}/edit`}>
                        <Button variant="ghost" className="!px-2 !py-1 text-xs">Edit</Button>
                      </Link>
                      <Link href={`/properties/${p.id}`} target="_blank">
                        <Button variant="ghost" className="!px-2 !py-1 text-xs">Preview</Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="!px-2 !py-1 text-xs text-[#C58D16]"
                        onClick={() => setDeactivateId(p.id)}
                      >
                        Deactivate
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Surface>
      )}

      <ConfirmationModal
        open={!!deactivateId}
        title="Deactivate listing?"
        description="This hides the listing from search. You can reactivate later by editing and resubmitting."
        confirmLabel="Deactivate"
        tone="danger"
        onConfirm={() => deactivateId && void deactivate(deactivateId)}
        onCancel={() => setDeactivateId(null)}
      />
    </div>
  );
}
