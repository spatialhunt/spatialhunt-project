"use client";

import Link from "next/link";
import { PageHeader, Surface, Button } from "@/component/ui/Primitives";
import { EmptyState } from "@/component/shared/AppStates";
import { MOCK_HUNTER_MATCHES, formatNaira } from "@/mocks";
import type { HunterMatchStatus } from "@/lib/types";

function MatchStatusBadge({ status }: { status: HunterMatchStatus }) {
  const map: Record<HunterMatchStatus, string> = {
    PENDING: "bg-[#FFF6D9] text-[#C99A20]",
    CONNECTED: "bg-[#EAF3F0] text-[#1E5A4F]",
    LEASE_SIGNED: "bg-[#DDF2E4] text-[#117E25]",
    COMMISSION_PAID: "bg-[#DDF2E4] text-[#117E25]",
    CANCELLED: "bg-[#E5E5E5] text-[#555555]",
  };
  const label: Record<HunterMatchStatus, string> = {
    PENDING: "Pending",
    CONNECTED: "Connected",
    LEASE_SIGNED: "Lease signed",
    COMMISSION_PAID: "Commission paid",
    CANCELLED: "Cancelled",
  };
  return (
    <span className={`inline-flex items-center rounded-[5px] px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${map[status]}`}>
      {label[status]}
    </span>
  );
}

export default function HunterMatchesPage() {
  const matches = MOCK_HUNTER_MATCHES;

  return (
    <div>
      <PageHeader
        title="My Matches"
        description="All tenant–property connections you have facilitated."
        actions={
          <Link href="/hunter/listings">
            <Button variant="amber">Browse Listings</Button>
          </Link>
        }
      />

      {matches.length === 0 ? (
        <EmptyState
          title="No matches yet"
          description="Browse verified listings and connect tenants to start earning commission."
        />
      ) : (
        <Surface className="!p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F1F7F5]">
                <tr className="border-b border-[#EEEEEE] text-xs text-[#777777]">
                  <th className="px-4 py-3 font-medium">Tenant</th>
                  <th className="px-4 py-3 font-medium">Property</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Commission</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((m) => (
                  <tr key={m.id} className="border-b border-[#EEEEEE] last:border-0 hover:bg-[#FAFAF8]">
                    <td className="px-4 py-3 font-medium text-[#2E2E2E]">{m.tenantName}</td>
                    <td className="px-4 py-3 text-[#2E2E2E]">{m.propertyTitle}</td>
                    <td className="px-4 py-3 text-[#777777]">{m.propertyCity}</td>
                    <td className="px-4 py-3">
                      {m.commissionAmount ? (
                        <span className="font-semibold text-[#1E5A4F]">
                          {formatNaira(m.commissionAmount)}
                        </span>
                      ) : (
                        <span className="text-[#AAAAAA]">TBD</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <MatchStatusBadge status={m.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-[#777777]">
                      {new Date(m.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Surface>
      )}
    </div>
  );
}
