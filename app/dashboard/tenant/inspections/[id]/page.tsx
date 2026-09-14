"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import TenantDashboardLayout from "@/component/layout/TenantDashboardLayout";
import { LoadingState, NotFoundState } from "@/component/shared/AppStates";
import { InspectionStatusBadge } from "@/component/verification/StatusBadges";
import { Button, Input, PageHeader, Surface } from "@/component/ui/primitives";
import { MOCK_BOOKINGS } from "@/mocks";
import { inspectionService } from "@/lib/services/inspection.service";
import type { Booking, BookingStatus } from "@/lib/types";

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function InspectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [apiNote, setApiNote] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await inspectionService.getMine();
        const found = data.find((b) => b.id === id);
        if (!cancelled) {
          setBooking(found || MOCK_BOOKINGS.find((b) => b.id === id) || null);
        }
      } catch {
        if (!cancelled) {
          setBooking(MOCK_BOOKINGS.find((b) => b.id === id) || null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function updateStatus(status: BookingStatus) {
    setActionLoading(true);
    setApiNote(null);
    try {
      const updated = await inspectionService.updateStatus(id, status);
      setBooking(updated);
    } catch {
      setBooking((prev) => (prev ? { ...prev, status } : prev));
      setApiNote(
        "Could not reach the bookings API — status updated locally for demo only.",
      );
    } finally {
      setActionLoading(false);
    }
  }

  function handleReschedule() {
    if (!rescheduleDate) return;
    setBooking((prev) =>
      prev
        ? {
            ...prev,
            scheduledAt: new Date(rescheduleDate).toISOString(),
            status: "RESCHEDULED",
          }
        : prev,
    );
    void updateStatus("RESCHEDULED");
  }

  if (loading) {
    return (
      <TenantDashboardLayout>
        <LoadingState title="Loading inspection" />
      </TenantDashboardLayout>
    );
  }

  if (!booking) {
    return (
      <TenantDashboardLayout>
        <NotFoundState
          title="Inspection not found"
          description="This inspection may have been removed or the link is incorrect."
          action={
            <Link href="/dashboard/tenant/inspections">
              <Button variant="primary">Back to inspections</Button>
            </Link>
          }
        />
      </TenantDashboardLayout>
    );
  }

  return (
    <TenantDashboardLayout>
      <PageHeader
        title="Inspection details"
        description={booking.property?.title || "Scheduled property visit"}
        actions={
          <Link href="/dashboard/tenant/inspections">
            <Button variant="secondary">All inspections</Button>
          </Link>
        }
      />

      {apiNote && (
        <p className="mb-4 rounded-[8px] border border-[#FFF4D6] bg-[#FFF6D9] px-4 py-2 text-xs text-[#C99A20]">
          {apiNote}
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Surface className="!bg-white">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-bold text-[#2E2E2E]">Visit summary</h2>
            <InspectionStatusBadge status={booking.status} />
          </div>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-medium text-[#777777]">Property</dt>
              <dd className="mt-0.5 font-semibold text-[#2E2E2E]">
                {booking.property?.title || "—"}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-[#777777]">Address</dt>
              <dd className="mt-0.5 text-[#2E2E2E]">
                {booking.property?.address}, {booking.property?.city}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-[#777777]">Scheduled for</dt>
              <dd className="mt-0.5 font-semibold text-[#1E5A4F]">
                {formatDateTime(booking.scheduledAt)}
              </dd>
            </div>
          </dl>
          {booking.propertyId && (
            <Link
              href={`/properties/${booking.propertyId}`}
              className="mt-4 inline-block text-sm font-semibold text-[#1E5A4F] hover:underline"
            >
              View property listing →
            </Link>
          )}
        </Surface>

        <Surface className="!bg-white">
          <h2 className="text-base font-bold text-[#2E2E2E]">Manage visit</h2>
          <p className="mt-1 text-sm text-[#777777]">
            Need a different time? Request a reschedule or cancel if plans change.
          </p>

          <div className="mt-4">
            <Input
              label="Proposed new date & time"
              type="datetime-local"
              value={rescheduleDate}
              onChange={(e) => setRescheduleDate(e.target.value)}
            />
            <Button
              variant="amber"
              className="mt-3 w-full sm:w-auto"
              disabled={actionLoading || !rescheduleDate}
              onClick={handleReschedule}
            >
              Request reschedule
            </Button>
          </div>

          <div className="mt-6 border-t border-[#EEEEEE] pt-4">
            <Button
              variant="danger"
              className="w-full sm:w-auto"
              disabled={actionLoading || booking.status === "DECLINED"}
              onClick={() => void updateStatus("DECLINED")}
            >
              Cancel inspection
            </Button>
          </div>
        </Surface>
      </div>
    </TenantDashboardLayout>
  );
}
