"use client";

import Link from "next/link";
import { PageHeader, Surface } from "@/component/ui/Primitives";
import { KpiCard } from "@/component/shared/KpiCard";
import { MOCK_USERS, MOCK_PROPERTIES, MOCK_VERIFICATIONS, MOCK_DISPUTES } from "@/mocks";

export default function AdminDashboardPage() {
  const tenants = MOCK_USERS.filter((u) => u.role === "TENANT").length;
  const landlords = MOCK_USERS.filter((u) => u.role === "LANDLORD").length;
  const pendingVerifications = MOCK_VERIFICATIONS.filter((v) => v.status === "PENDING").length;
  const openDisputes = MOCK_DISPUTES.filter((d) => d.status === "OPEN" || d.status === "UNDER_REVIEW").length;

  return (
    <div>
      <PageHeader
        title="Operations dashboard"
        description="Platform overview for SpatialHunt ops."
      />
      <p className="mb-4 text-xs font-semibold text-[#C99A20]">Demo data — metrics labeled until live API</p>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="Users" value={MOCK_USERS.length} demo />
        <KpiCard label="Tenants" value={tenants} demo />
        <KpiCard label="Landlords" value={landlords} demo />
        <KpiCard label="Properties" value={MOCK_PROPERTIES.length} demo />
        <KpiCard label="Pending verifications" value={pendingVerifications} demo />
        <KpiCard label="Active disputes" value={openDisputes} demo />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Surface>
          <h2 className="mb-3 font-semibold text-[#2E2E2E]">Quick links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="/admin/verifications" className="text-[#1E5A4F] hover:underline">Review verification queue</Link></li>
            <li><Link href="/admin/disputes" className="text-[#1E5A4F] hover:underline">Open disputes</Link></li>
            <li><Link href="/admin/users" className="text-[#1E5A4F] hover:underline">Manage users</Link></li>
            <li><Link href="/admin/audit-logs" className="text-[#1E5A4F] hover:underline">Audit logs</Link></li>
          </ul>
        </Surface>
        <Surface>
          <h2 className="mb-3 font-semibold text-[#2E2E2E]">Recent activity</h2>
          <p className="text-sm text-[#777777]">
            Demo snapshot only. Connect audit log API for live activity feed.
          </p>
        </Surface>
      </div>
    </div>
  );
}
