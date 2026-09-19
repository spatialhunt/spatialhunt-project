"use client";

import { PageHeader, Surface } from "@/component/ui/Primitives";
import { KpiCard } from "@/component/shared/KpiCard";
import { MOCK_HUNTER_PROFILE, MOCK_HUNTER_MATCHES, formatNaira } from "@/mocks";
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
    COMMISSION_PAID: "Paid",
    CANCELLED: "Cancelled",
  };
  return (
    <span className={`inline-flex items-center rounded-[5px] px-2.5 py-1 text-xs font-semibold ${map[status]}`}>
      {label[status]}
    </span>
  );
}

const monthlyData = [
  { month: "Apr 2026", amount: 45000, matches: 1 },
  { month: "May 2026", amount: 75000, matches: 2 },
  { month: "Jun 2026", amount: 60000, matches: 1 },
  { month: "Jul 2026", amount: 90000, matches: 2 },
  { month: "Aug 2026", amount: 125000, matches: 3 },
  { month: "Sep 2026", amount: 90000, matches: 2 },
];

export default function HunterEarningsPage() {
  const profile = MOCK_HUNTER_PROFILE;
  const paidMatches = MOCK_HUNTER_MATCHES.filter((m) => m.status === "COMMISSION_PAID");
  const pendingMatches = MOCK_HUNTER_MATCHES.filter((m) => m.status === "LEASE_SIGNED");
  const maxAmount = Math.max(...monthlyData.map((d) => d.amount));

  return (
    <div>
      <PageHeader
        title="Earnings"
        description="Your commission history and pending payouts."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Total Earnings"
          value={formatNaira(profile.totalEarnings)}
          hint="All commissions received"
          demo
        />
        <KpiCard
          label="Pending Payout"
          value={formatNaira(profile.pendingEarnings)}
          hint="Awaiting escrow release"
          demo
        />
        <KpiCard
          label="Paid Commissions"
          value={paidMatches.length}
          hint="Transactions completed"
          demo
        />
        <KpiCard
          label="Commission Rate"
          value={`${profile.commissionRate}%`}
          hint={`${profile.tier} tier`}
          demo
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* monthly breakdown chart */}
        <Surface>
          <h2 className="mb-4 font-semibold text-[#2E2E2E]">Monthly Earnings</h2>
          <div className="space-y-3">
            {monthlyData.map((d) => {
              const pct = Math.round((d.amount / maxAmount) * 100);
              return (
                <div key={d.month} className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-xs text-[#777777]">{d.month}</span>
                  <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-[#EEEEEE]">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-[#1E5A4F]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-24 shrink-0 text-right text-xs font-semibold text-[#2E2E2E]">
                    {formatNaira(d.amount)}
                  </span>
                  <span className="w-12 shrink-0 text-right text-xs text-[#777777]">
                    {d.matches} match{d.matches !== 1 ? "es" : ""}
                  </span>
                </div>
              );
            })}
          </div>
        </Surface>

        {/* commission transactions */}
        <Surface>
          <h2 className="mb-4 font-semibold text-[#2E2E2E]">Commission Transactions</h2>
          {paidMatches.length === 0 && pendingMatches.length === 0 ? (
            <p className="text-sm text-[#777777]">No commission transactions yet.</p>
          ) : (
            <div className="space-y-2">
              {[...paidMatches, ...pendingMatches].map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between gap-2 rounded-[6px] border border-[#EEEEEE] bg-white px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-medium text-[#2E2E2E]">{m.propertyTitle}</p>
                    <p className="text-xs text-[#777777]">
                      {m.tenantName} · {m.propertyCity}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-[#1E5A4F]">
                      {m.commissionAmount ? formatNaira(m.commissionAmount) : "—"}
                    </span>
                    <MatchStatusBadge status={m.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Surface>
      </div>

      {/* how payouts work */}
      <Surface className="mt-5">
        <h2 className="mb-3 font-semibold text-[#2E2E2E]">How Payouts Work</h2>
        <div className="grid gap-3 text-sm sm:grid-cols-3">
          <div className="rounded-[6px] bg-[#F1F7F5] p-3">
            <p className="font-semibold text-[#1E5A4F]">1. Lease Signed</p>
            <p className="mt-1 text-xs text-[#777777]">
              When the tenant signs the tenancy agreement, your commission is calculated at your
              current tier rate ({profile.commissionRate}% of first month&apos;s rent).
            </p>
          </div>
          <div className="rounded-[6px] bg-[#F1F7F5] p-3">
            <p className="font-semibold text-[#1E5A4F]">2. Escrow Released</p>
            <p className="mt-1 text-xs text-[#777777]">
              Once the tenant confirms move-in and the escrow is released to the landlord,
              your commission is moved from pending to payable.
            </p>
          </div>
          <div className="rounded-[6px] bg-[#F1F7F5] p-3">
            <p className="font-semibold text-[#1E5A4F]">3. Commission Paid</p>
            <p className="mt-1 text-xs text-[#777777]">
              SpatialHunt transfers your commission directly to your registered bank account
              within 2 business days of escrow release.
            </p>
          </div>
        </div>
      </Surface>

      <div className="mt-3 rounded-[8px] border border-[#F0D9A8] bg-[#FFF6D9] px-4 py-3 text-xs text-[#C99A20]">
        <strong>Demo data shown</strong> — Earnings API not yet connected.
      </div>
    </div>
  );
}
