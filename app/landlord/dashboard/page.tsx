"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader, Surface, Button } from "@/component/ui/Primitives";
import { KpiCard } from "@/component/shared/KpiCard";
import { PropertyStatusBadge, VerificationStatusBadge, InspectionStatusBadge } from "@/component/verification/StatusBadges";
import { LoadingState } from "@/component/shared/AppStates";
import { propertyService } from "@/lib/services/property.service";
import { verificationService } from "@/lib/services/verification.service";
import { inspectionService } from "@/lib/services/inspection.service";
import {
  MOCK_PROPERTIES,
  MOCK_BOOKINGS,
  MOCK_CONVERSATIONS,
  MOCK_VERIFICATIONS,
  formatNaira,
} from "@/mocks";
import type { Property, Verification, Booking } from "@/lib/types";

export default function LandlordDashboardPage() {
  const [listings, setListings] = useState<Property[]>([]);
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [inspections, setInspections] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [mine, vers, insp] = await Promise.all([
          propertyService.getMine(),
          verificationService.getMine(),
          inspectionService.getLandlord(),
        ]);
        setListings(mine);
        setVerifications(vers);
        setInspections(insp);
      } catch {
        // TODO: remove mock fallback when landlord APIs are live
        setListings(MOCK_PROPERTIES.filter((p) => p.ownerId === "landlord-1"));
        setVerifications(MOCK_VERIFICATIONS.filter((v) => v.userId === "landlord-1"));
        setInspections(MOCK_BOOKINGS);
        setUsingMock(true);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  if (loading) return <LoadingState title="Loading dashboard" />;

  const activeListings = listings.filter((p) => p.status !== "DRAFT").length;
  const newInquiries = MOCK_CONVERSATIONS.length;
  const trustStatus = verifications.some((v) => v.status === "APPROVED")
    ? "Verified"
    : verifications.some((v) => v.status === "PENDING")
      ? "Pending review"
      : "Not verified";

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Your tasks and listings at a glance."
        actions={
          <Link href="/landlord/listings/new">
            <Button variant="amber">New listing</Button>
          </Link>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Active listings" value={activeListings} demo={usingMock} />
        <KpiCard label="New inquiries" value={newInquiries} hint="From in-app messages" demo={usingMock} />
        <KpiCard label="Occupancy" value="—" hint="Available when lease tracking ships" demo />
        <KpiCard label="Trust status" value={trustStatus} hint="Based on verification, not ratings" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Surface>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-[#2E2E2E]">My listings</h2>
            <Link href="/landlord/listings" className="text-sm text-[#1E5A4F] hover:underline">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#EEEEEE] text-xs text-[#777777]">
                  <th className="pb-2 pr-3">Property</th>
                  <th className="pb-2 pr-3">Price</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {listings.slice(0, 5).map((p) => (
                  <tr key={p.id} className="border-b border-[#EEEEEE]">
                    <td className="py-3 pr-3">
                      <Link href={`/landlord/listings/${p.id}`} className="font-medium text-[#1E5A4F] hover:underline">
                        {p.title}
                      </Link>
                      <p className="text-xs text-[#777777]">{p.city}, {p.state}</p>
                    </td>
                    <td className="py-3 pr-3">{formatNaira(p.price)}</td>
                    <td className="py-3"><PropertyStatusBadge status={p.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Surface>

        <Surface>
          <h2 className="mb-4 font-semibold text-[#2E2E2E]">Verification status</h2>
          {verifications.length === 0 ? (
            <p className="text-sm text-[#777777]">No verification on file. Complete verification to build trust.</p>
          ) : (
            <ul className="space-y-3">
              {verifications.map((v) => (
                <li key={v.id} className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-[#2E2E2E]">{v.type.replace(/_/g, " ")}</span>
                  <VerificationStatusBadge status={v.status} />
                </li>
              ))}
            </ul>
          )}
          <Link href="/landlord/verification/status" className="mt-4 inline-block text-sm text-[#1E5A4F] hover:underline">
            View details →
          </Link>
        </Surface>

        <Surface>
          <h2 className="mb-4 font-semibold text-[#2E2E2E]">Upcoming inspections</h2>
          {inspections.length === 0 ? (
            <p className="text-sm text-[#777777]">No scheduled inspections.</p>
          ) : (
            <ul className="space-y-3">
              {inspections.map((b) => (
                <li key={b.id} className="flex items-center justify-between gap-2 text-sm">
                  <div>
                    <p className="font-medium text-[#2E2E2E]">{b.property?.title ?? "Property"}</p>
                    <p className="text-xs text-[#777777]">
                      {new Date(b.scheduledAt).toLocaleString()}
                    </p>
                  </div>
                  <InspectionStatusBadge status={b.status} />
                </li>
              ))}
            </ul>
          )}
          <Link href="/landlord/inspections" className="mt-4 inline-block text-sm text-[#1E5A4F] hover:underline">
            Manage inspections →
          </Link>
        </Surface>

        <Surface>
          <h2 className="mb-4 font-semibold text-[#2E2E2E]">Recent inquiries</h2>
          <ul className="space-y-3">
            {MOCK_CONVERSATIONS.map((c) => (
              <li key={c.id} className="text-sm">
                <Link href={`/landlord/messages/${c.id}`} className="font-medium text-[#1E5A4F] hover:underline">
                  {c.counterpartName}
                </Link>
                <p className="text-xs text-[#777777]">{c.propertyTitle}</p>
                <p className="mt-1 truncate text-xs text-[#8A8A8A]">{c.lastMessage}</p>
              </li>
            ))}
          </ul>
          <Link href="/landlord/inquiries" className="mt-4 inline-block text-sm text-[#1E5A4F] hover:underline">
            All inquiries →
          </Link>
        </Surface>
      </div>
    </div>
  );
}
