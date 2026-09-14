"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TenantDashboardLayout from "@/component/layout/TenantDashboardLayout";
import { EmptyState, LoadingState } from "@/component/shared/AppStates";
import { InspectionStatusBadge } from "@/component/verification/StatusBadges";
import { Button, PageHeader, Surface } from "@/component/ui/primitives";
import { MOCK_BOOKINGS } from "@/mocks";
import { inspectionService } from "@/lib/services/inspection.service";
import type { Booking } from "@/lib/types";

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-NG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function InspectionsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await inspectionService.getMine();
        if (!cancelled) {
          setBookings(data.length > 0 ? data : MOCK_BOOKINGS);
          setUsingMock(data.length === 0);
        }
      } catch {
        if (!cancelled) {
          setBookings(MOCK_BOOKINGS);
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

  return (
    <TenantDashboardLayout>
      <PageHeader
        title="Inspections"
        description="View and manage your scheduled property visits."
      />

      {usingMock && (
        <p className="mb-4 rounded-[8px] border border-[#FFF4D6] bg-[#FFF6D9] px-4 py-2 text-xs text-[#C99A20]">
          Showing demo inspection bookings — connect bookings API for live data.
        </p>
      )}

      {loading ? (
        <LoadingState title="Loading inspections" />
      ) : bookings.length === 0 ? (
        <EmptyState
          title="No inspections scheduled"
          description="Request an inspection from a property page to arrange a visit with the landlord."
          action={
            <Link href="/properties">
              <Button variant="primary">Browse properties</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <Surface key={booking.id} className="!bg-white">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold text-[#2E2E2E]">
                    {booking.property?.title || "Property inspection"}
                  </h3>
                  <p className="mt-1 text-sm text-[#777777]">
                    {booking.property?.address}, {booking.property?.city}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#1E5A4F]">
                    {formatDateTime(booking.scheduledAt)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <InspectionStatusBadge status={booking.status} />
                  <Link href={`/dashboard/tenant/inspections/${booking.id}`}>
                    <Button variant="secondary" className="!py-1.5 text-xs">
                      View details
                    </Button>
                  </Link>
                </div>
              </div>
            </Surface>
          ))}
        </div>
      )}
    </TenantDashboardLayout>
  );
}
