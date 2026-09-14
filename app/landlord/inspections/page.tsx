"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader, Surface } from "@/component/ui/primitives";
import { InspectionStatusBadge } from "@/component/verification/StatusBadges";
import { LoadingState, EmptyState } from "@/component/shared/AppStates";
import { inspectionService } from "@/lib/services/inspection.service";
import { MOCK_BOOKINGS } from "@/mocks";
import type { Booking } from "@/lib/types";

export default function LandlordInspectionsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setBookings(await inspectionService.getLandlord());
      } catch {
        // TODO: remove mock fallback when /api/bookings/landlord is live
        setBookings(MOCK_BOOKINGS);
        setDemo(true);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  if (loading) return <LoadingState title="Loading inspections" />;

  return (
    <div>
      <PageHeader
        title="Inspections"
        description="Accept, decline, reschedule, or mark inspections complete."
      />
      {demo && <p className="mb-4 text-xs font-semibold text-[#C99A20]">Demo data</p>}

      {bookings.length === 0 ? (
        <EmptyState
          title="No inspection requests"
          description="When tenants request viewings, they appear here for your response."
        />
      ) : (
        <Surface className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#EEEEEE] bg-white text-xs text-[#777777]">
                <th className="px-4 py-3">Property</th>
                <th className="px-4 py-3">Scheduled</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-[#EEEEEE]">
                  <td className="px-4 py-3">{b.property?.title ?? b.propertyId}</td>
                  <td className="px-4 py-3">{new Date(b.scheduledAt).toLocaleString()}</td>
                  <td className="px-4 py-3"><InspectionStatusBadge status={b.status} /></td>
                  <td className="px-4 py-3">
                    <Link href={`/landlord/inspections/${b.id}`} className="text-sm text-[#1E5A4F] hover:underline">
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Surface>
      )}
    </div>
  );
}
