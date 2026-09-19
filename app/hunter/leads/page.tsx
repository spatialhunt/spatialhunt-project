"use client";

import Link from "next/link";
import { PageHeader, Surface, Button } from "@/component/ui/Primitives";
import { EmptyState } from "@/component/shared/AppStates";
import { MOCK_HUNTER_LEADS, formatNaira } from "@/mocks";

function LeadStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    NEW: "bg-[#E5E5E5] text-[#555555]",
    CONTACTED: "bg-[#FFF6D9] text-[#C99A20]",
    VIEWING_SCHEDULED: "bg-[#EAF3F0] text-[#1E5A4F]",
    OFFER_MADE: "bg-[#DDF2E4] text-[#117E25]",
    CONVERTED: "bg-[#DDF2E4] text-[#117E25]",
    LOST: "bg-[#E5E5E5] text-[#555555]",
  };
  const label: Record<string, string> = {
    NEW: "New",
    CONTACTED: "Contacted",
    VIEWING_SCHEDULED: "Viewing scheduled",
    OFFER_MADE: "Offer made",
    CONVERTED: "Converted",
    LOST: "Lost",
  };
  return (
    <span
      className={`inline-flex items-center rounded-[5px] px-2.5 py-1 text-xs font-semibold ${map[status] ?? "bg-[#E5E5E5] text-[#555555]"}`}
    >
      {label[status] ?? status}
    </span>
  );
}

export default function HunterLeadsPage() {
  const leads = MOCK_HUNTER_LEADS;

  return (
    <div>
      <PageHeader
        title="My Leads"
        description="Tenants you are currently helping find a property."
        actions={
          <Link href="/hunter/leads/new">
            <Button variant="amber">+ Add Lead</Button>
          </Link>
        }
      />

      {leads.length === 0 ? (
        <EmptyState
          title="No leads yet"
          description="Add a tenant lead to start connecting them with verified listings."
          action={
            <Link href="/hunter/leads/new">
              <Button variant="amber">Add your first lead</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <Surface key={lead.id} className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-[#2E2E2E]">{lead.tenantName}</p>
                  <LeadStatusBadge status={lead.status} />
                </div>
                <p className="text-xs text-[#777777]">
                  {lead.location} · {formatNaira(lead.budget)}/yr
                  {lead.bedrooms != null && ` · ${lead.bedrooms}-bed`}
                  {lead.propertyType && ` · ${lead.propertyType.toLowerCase()}`}
                </p>
                {lead.tenantEmail && (
                  <p className="text-xs text-[#777777]">{lead.tenantEmail}</p>
                )}
                {lead.notes && (
                  <p className="text-xs italic text-[#888888]">&ldquo;{lead.notes}&rdquo;</p>
                )}
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Link
                  href={`/hunter/listings?budget=${lead.budget}&location=${encodeURIComponent(lead.location)}`}
                  className="rounded-[5px] bg-[#1E5A4F] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#17483F]"
                >
                  Find Match
                </Link>
                <Link
                  href={`/hunter/leads/${lead.id}`}
                  className="rounded-[5px] border border-[#DDDDDD] px-3 py-1.5 text-xs font-semibold text-[#444444] hover:border-[#1E5A4F]"
                >
                  Edit
                </Link>
              </div>
            </Surface>
          ))}
        </div>
      )}
    </div>
  );
}
