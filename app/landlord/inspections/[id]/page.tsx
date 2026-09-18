"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader, Surface, Button, Input } from "@/component/ui/Primitives";
import { InspectionStatusBadge } from "@/component/verification/StatusBadges";
import { LoadingState, NotFoundState } from "@/component/shared/AppStates";
import { inspectionService } from "@/lib/services/inspection.service";
import { MOCK_BOOKINGS } from "@/mocks";
import type { Booking, BookingStatus } from "@/lib/types";

export default function InspectionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [rescheduleAt, setRescheduleAt] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const all = await inspectionService.getLandlord();
        setBooking(all.find((b) => b.id === id) ?? null);
      } catch {
        // TODO: remove mock fallback when booking API is live
        setBooking(MOCK_BOOKINGS.find((b) => b.id === id) ?? null);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [id]);

  async function updateStatus(status: BookingStatus) {
    if (!booking) return;
    setUpdating(true);
    try {
      const updated = await inspectionService.updateStatus(booking.id, status);
      setBooking(updated);
    } catch {
      // TODO: remove mock fallback when /api/bookings/:id/status is live
      setBooking({ ...booking, status });
    } finally {
      setUpdating(false);
    }
  }

  if (loading) return <LoadingState title="Loading inspection" />;
  if (!booking) {
    return (
      <NotFoundState
        title="Inspection not found"
        action={
          <Link href="/landlord/inspections">
            <Button variant="primary">Back to inspections</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Inspection request"
        description={booking.property?.title ?? booking.propertyId}
        actions={<InspectionStatusBadge status={booking.status} />}
      />

      <Surface className="mb-5">
        <p className="text-sm text-[#777777]">
          Scheduled: <strong className="text-[#2E2E2E]">{new Date(booking.scheduledAt).toLocaleString()}</strong>
        </p>
      </Surface>

      <Surface>
        <h2 className="mb-4 font-semibold text-[#2E2E2E]">Actions</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" disabled={updating} onClick={() => void updateStatus("CONFIRMED")}>
            Accept
          </Button>
          <Button variant="secondary" disabled={updating} onClick={() => void updateStatus("DECLINED")}>
            Decline
          </Button>
          <Button variant="secondary" disabled={updating} onClick={() => void updateStatus("RESCHEDULED")}>
            Request reschedule
          </Button>
          <Button variant="amber" disabled={updating} onClick={() => void updateStatus("COMPLETED")}>
            Mark complete
          </Button>
        </div>

        <div className="mt-5 max-w-sm">
          <Input
            label="Proposed new time (local)"
            type="datetime-local"
            value={rescheduleAt}
            onChange={(e) => setRescheduleAt(e.target.value)}
          />
          <p className="mt-1 text-xs text-[#777777]">
            {/* TODO: wire reschedule datetime to inspectionService when backend supports it */}
            Reschedule datetime will sync when the booking API adds reschedule fields.
          </p>
        </div>
      </Surface>
    </div>
  );
}
