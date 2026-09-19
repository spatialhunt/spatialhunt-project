"use client";

import Link from "next/link";
import { PageHeader, Surface, Button } from "@/component/ui/Primitives";
import { MOCK_HUNTER_LEADS, formatNaira } from "@/mocks";

export default function HunterTenantsPage() {
  // Derive unique tenants from leads
  const tenants = MOCK_HUNTER_LEADS.map((l) => ({
    id: l.id,
    name: l.tenantName,
    email: l.tenantEmail,
    phone: l.tenantPhone,
    budget: l.budget,
    location: l.location,
    leadStatus: l.status,
  }));

  return (
    <div>
      <PageHeader
        title="My Tenants"
        description="All tenants currently in your pipeline."
        actions={
          <Link href="/hunter/leads/new">
            <Button variant="amber">+ Add Tenant Lead</Button>
          </Link>
        }
      />

      {tenants.length === 0 ? (
        <p className="py-12 text-center text-sm text-[#777777]">
          No tenants yet. Add a lead to start.
        </p>
      ) : (
        <Surface className="!p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F1F7F5]">
                <tr className="border-b border-[#EEEEEE] text-xs text-[#777777]">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">Budget</th>
                  <th className="px-4 py-3 font-medium">Preferred Area</th>
                  <th className="px-4 py-3 font-medium">Lead Stage</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((t) => (
                  <tr key={t.id} className="border-b border-[#EEEEEE] last:border-0 hover:bg-[#FAFAF8]">
                    <td className="px-4 py-3 font-medium text-[#2E2E2E]">{t.name}</td>
                    <td className="px-4 py-3 text-xs text-[#777777]">
                      <p>{t.email}</p>
                      {t.phone && <p>{t.phone}</p>}
                    </td>
                    <td className="px-4 py-3 text-[#1E5A4F] font-semibold">{formatNaira(t.budget)}/yr</td>
                    <td className="px-4 py-3 text-[#777777]">{t.location}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-[5px] bg-[#EAF3F0] px-2.5 py-1 text-xs font-semibold text-[#1E5A4F]">
                        {t.leadStatus.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/hunter/listings?budget=${t.budget}&location=${encodeURIComponent(t.location)}`}
                        className="rounded-[5px] bg-[#1E5A4F] px-3 py-1 text-xs font-semibold text-white hover:bg-[#17483F]"
                      >
                        Find Match
                      </Link>
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
