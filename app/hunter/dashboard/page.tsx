"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Surface, Button, PageHeader } from "@/component/ui/Primitives";
import { KpiCard } from "@/component/shared/KpiCard";
import { LoadingState, EmptyState, SkeletonBlock } from "@/component/shared/AppStates";
import { CompactPropertyCard } from "@/component/property/CompactPropertyCard";
import { propertyService } from "@/lib/services/property.service";
import { useAuthSession } from "@/lib/use-auth-session";
import {
  MOCK_HUNTER_PROFILE,
  MOCK_HUNTER_MATCHES,
  MOCK_HUNTER_LEADS,
  MOCK_PROPERTIES,
  formatNaira,
} from "@/mocks";
import type { Property, HunterMatch, HunterLead, HunterMatchStatus } from "@/lib/types";

// ─── helpers ──────────────────────────────────────────────────────────────────

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
    <span
      className={`inline-flex items-center rounded-[5px] px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${map[status]}`}
    >
      {label[status]}
    </span>
  );
}

function LeadStatusBadge({ status }: { status: HunterLead["status"] }) {
  const map: Record<HunterLead["status"], string> = {
    NEW: "bg-[#E5E5E5] text-[#555555]",
    CONTACTED: "bg-[#FFF6D9] text-[#C99A20]",
    VIEWING_SCHEDULED: "bg-[#EAF3F0] text-[#1E5A4F]",
    OFFER_MADE: "bg-[#DDF2E4] text-[#117E25]",
    CONVERTED: "bg-[#DDF2E4] text-[#117E25]",
    LOST: "bg-[#E5E5E5] text-[#555555]",
  };
  const label: Record<HunterLead["status"], string> = {
    NEW: "New",
    CONTACTED: "Contacted",
    VIEWING_SCHEDULED: "Viewing scheduled",
    OFFER_MADE: "Offer made",
    CONVERTED: "Converted",
    LOST: "Lost",
  };
  return (
    <span
      className={`inline-flex items-center rounded-[5px] px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${map[status]}`}
    >
      {label[status]}
    </span>
  );
}

function TierBadge({ tier }: { tier: "STARTER" | "PRO" | "ELITE" }) {
  const map = {
    STARTER: "bg-[#E5E5E5] text-[#555555]",
    PRO: "bg-[#FFF6D9] text-[#C99A20]",
    ELITE: "bg-[#DDF2E4] text-[#117E25]",
  };
  return (
    <span
      className={`inline-flex items-center rounded-[5px] px-2.5 py-1 text-xs font-bold ${map[tier]}`}
    >
      {tier}
    </span>
  );
}

// ─── quick action tile ────────────────────────────────────────────────────────
function QuickAction({ icon, label, href }: { icon: string; label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-2 rounded-[8px] border border-[#EEEEEE] bg-white p-3 text-center transition hover:border-[#1E5A4F] hover:bg-[#F1F7F5]"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-medium text-[#2E2E2E]">{label}</span>
    </Link>
  );
}

// ─── earnings mini chart bar ──────────────────────────────────────────────────
function EarningsBar({ label, amount, max }: { label: string; amount: number; max: number }) {
  const pct = Math.round((amount / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="w-8 shrink-0 text-xs text-[#777777]">{label}</span>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-[#EEEEEE]">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[#1E5A4F]"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-20 shrink-0 text-right text-xs text-[#2E2E2E]">
        {formatNaira(amount)}
      </span>
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────
export default function HunterDashboardPage() {
  const session = useAuthSession();
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);
  const [matches, setMatches] = useState<HunterMatch[]>([]);
  const [leads, setLeads] = useState<HunterLead[]>([]);

  // live verified listings to browse / match
  const [verifiedListings,        setVerifiedListings]        = useState<Property[]>([]);
  const [listingsLoading,         setListingsLoading]         = useState(true);

  const firstName = session?.fullName?.split(" ")[0] ?? "Hunter";

  useEffect(() => {
    // Hunter service APIs are not yet wired — use mock data
    setMatches(MOCK_HUNTER_MATCHES);
    setLeads(MOCK_HUNTER_LEADS);
    setUsingMock(true);
    setLoading(false);
  }, []);

  // fetch live verified listings for the "Available Verified Listings" grid
  useEffect(() => {
    let cancelled = false;
    propertyService
      .getProperties({ city: "Lagos" })
      .then((data) => {
        if (cancelled) return;
        setVerifiedListings(data.filter((p) => p.status === "VERIFIED").slice(0, 4));
      })
      .catch(() => {
        if (cancelled) return;
        setVerifiedListings(
          MOCK_PROPERTIES.filter((p) => p.status === "VERIFIED").slice(0, 4),
        );
      })
      .finally(() => { if (!cancelled) setListingsLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading) return <LoadingState title="Loading Hunter dashboard" />;

  const profile = MOCK_HUNTER_PROFILE;
  const commissionPaid = matches.filter((m) => m.status === "COMMISSION_PAID").length;
  const leaseSigned = matches.filter((m) => m.status === "LEASE_SIGNED").length;
  const activeConnections = matches.filter(
    (m) => m.status === "CONNECTED" || m.status === "PENDING",
  ).length;

  // mock monthly earnings (last 6 months)
  const earningsHistory = [
    { label: "Apr", amount: 45000 },
    { label: "May", amount: 75000 },
    { label: "Jun", amount: 60000 },
    { label: "Jul", amount: 90000 },
    { label: "Aug", amount: 125000 },
    { label: "Sep", amount: 90000 },
  ];
  const maxEarning = Math.max(...earningsHistory.map((e) => e.amount));

  return (
    <div className="space-y-6">
      {/* ── header ─────────────────────────────────────────────────────────── */}
      <PageHeader
        title={`Welcome back, ${firstName}!`}
        description="Here's your hunting activity at a glance."
        actions={
          <div className="flex gap-2">
            <Link href="/hunter/leads/new">
              <Button variant="secondary">+ Add Lead</Button>
            </Link>
            <Link href="/hunter/listings">
              <Button variant="amber">Browse Listings</Button>
            </Link>
          </div>
        }
      />

      {/* ── KPI row ────────────────────────────────────────────────────────── */}
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        <KpiCard
          label="Total Earnings"
          value={formatNaira(profile.totalEarnings)}
          hint="All-time commission paid"
          demo={usingMock}
        />
        <KpiCard
          label="Pending Earnings"
          value={formatNaira(profile.pendingEarnings)}
          hint="Awaiting escrow release"
          demo={usingMock}
        />
        <KpiCard
          label="Active Leads"
          value={profile.activeLeads}
          hint="Tenants in your pipeline"
          demo={usingMock}
        />
        <KpiCard
          label="Successful Matches"
          value={profile.successfulMatches}
          hint={`${commissionPaid} commissions paid`}
          demo={usingMock}
        />
        <KpiCard
          label="Commission Rate"
          value={`${profile.commissionRate}%`}
          hint={`${profile.tier} tier`}
          demo={usingMock}
        />
      </div>

      {/* ── main two-column layout ─────────────────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_300px]">
        {/* ── left column ─────────────────────────────────────────────────── */}
        <div className="space-y-5">

          {/* recent matches */}
          <Surface>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-[#2E2E2E]">Recent Matches</h2>
              <Link
                href="/hunter/matches"
                className="text-xs font-medium text-[#1E5A4F] hover:underline"
              >
                View all →
              </Link>
            </div>
            {matches.length === 0 ? (
              <EmptyState
                title="No matches yet"
                description="Connect tenants to verified listings to earn commission."
                action={
                  <Link href="/hunter/listings">
                    <Button variant="amber">Browse Listings</Button>
                  </Link>
                }
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#EEEEEE] text-xs text-[#777777]">
                      <th className="pb-2 pr-3 font-medium">Tenant</th>
                      <th className="pb-2 pr-3 font-medium">Property</th>
                      <th className="pb-2 pr-3 font-medium">Commission</th>
                      <th className="pb-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matches.slice(0, 5).map((m) => (
                      <tr key={m.id} className="border-b border-[#EEEEEE] last:border-0">
                        <td className="py-3 pr-3">
                          <p className="font-medium text-[#2E2E2E]">{m.tenantName}</p>
                        </td>
                        <td className="py-3 pr-3">
                          <p className="text-[#2E2E2E]">{m.propertyTitle}</p>
                          <p className="text-xs text-[#777777]">{m.propertyCity}</p>
                        </td>
                        <td className="py-3 pr-3 text-[#1E5A4F]">
                          {m.commissionAmount
                            ? formatNaira(m.commissionAmount)
                            : <span className="text-[#AAAAAA]">TBD</span>}
                        </td>
                        <td className="py-3">
                          <MatchStatusBadge status={m.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Surface>

          {/* leads pipeline */}
          <Surface>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-[#2E2E2E]">Lead Pipeline</h2>
              <Link
                href="/hunter/leads/new"
                className="rounded-[5px] bg-[#F4B942] px-3 py-1.5 text-xs font-semibold text-[#1E5A4F] hover:brightness-95"
              >
                + Add Lead
              </Link>
            </div>
            {leads.length === 0 ? (
              <EmptyState
                title="No leads yet"
                description="Add a tenant lead to start matching them with verified properties."
              />
            ) : (
              <div className="space-y-3">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex flex-col gap-2 rounded-[8px] border border-[#EEEEEE] bg-white p-3 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-[#2E2E2E]">
                          {lead.tenantName}
                        </p>
                        <LeadStatusBadge status={lead.status} />
                      </div>
                      <p className="text-xs text-[#777777]">
                        {lead.location} · {formatNaira(lead.budget)}/yr budget
                        {lead.bedrooms != null && ` · ${lead.bedrooms} bed`}
                        {lead.propertyType && ` · ${lead.propertyType.toLowerCase()}`}
                      </p>
                      {lead.notes && (
                        <p className="text-xs italic text-[#888888]">&ldquo;{lead.notes}&rdquo;</p>
                      )}
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-2">
                      <Link
                        href={`/hunter/leads/${lead.id}`}
                        className="rounded-[5px] border border-[#DDDDDD] px-3 py-1 text-xs font-semibold text-[#444444] hover:border-[#1E5A4F] hover:text-[#1E5A4F]"
                      >
                        View
                      </Link>
                      <Link
                        href={`/hunter/listings?budget=${lead.budget}&location=${encodeURIComponent(lead.location)}`}
                        className="rounded-[5px] bg-[#1E5A4F] px-3 py-1 text-xs font-semibold text-white hover:bg-[#17483F]"
                      >
                        Find Match
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {leads.length > 0 && (
              <Link
                href="/hunter/leads"
                className="mt-3 inline-block text-xs font-medium text-[#1E5A4F] hover:underline"
              >
                Manage all leads →
              </Link>
            )}
          </Surface>

          {/* available verified listings to match */}
          <Surface>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-[#2E2E2E]">Available Verified Listings</h2>
              <Link
                href="/hunter/listings"
                className="text-xs font-medium text-[#1E5A4F] hover:underline"
              >
                Browse all →
              </Link>
            </div>

            {listingsLoading ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="overflow-hidden rounded-[8px] border border-[#EEEEEE] bg-white">
                    <SkeletonBlock className="h-32 w-full rounded-none" />
                    <div className="space-y-2 p-3">
                      <SkeletonBlock className="h-3.5 w-3/4" />
                      <SkeletonBlock className="h-3 w-1/2" />
                      <SkeletonBlock className="h-4 w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : verifiedListings.length === 0 ? (
              <EmptyState
                title="No verified listings available"
                description="Check back soon — new verified properties are added regularly."
              />
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {verifiedListings.map((p) => (
                  <div key={p.id} className="flex flex-col overflow-hidden rounded-[8px] border border-[#EEEEEE] bg-white">
                    <CompactPropertyCard property={p} />
                    {/* Match Tenant CTA appended below the card */}
                    <div className="border-t border-[#F0F0F0] px-4 pb-3 pt-2">
                      <Link
                        href={`/hunter/matches/new?propertyId=${p.id}`}
                        className="flex w-full items-center justify-center rounded-[6px] bg-[#1E5A4F] py-2 text-xs font-semibold text-white transition hover:bg-[#17483F]"
                      >
                        Match a Tenant →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Surface>
        </div>

        {/* ── right column ────────────────────────────────────────────────── */}
        <div className="space-y-5">
          {/* hunter profile card */}
          <Surface>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-[#2E2E2E]">
                  {session?.fullName ?? "Your Profile"}
                </p>
                <p className="mt-0.5 text-xs text-[#777777]">{session?.email ?? "—"}</p>
              </div>
              <TierBadge tier={profile.tier} />
            </div>

            {profile.bio && (
              <p className="mt-3 text-xs italic text-[#777777]">&ldquo;{profile.bio}&rdquo;</p>
            )}

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#777777]">Account Status</span>
                <span
                  className={`rounded-[5px] px-2.5 py-1 text-xs font-semibold ${
                    profile.status === "ACTIVE"
                      ? "bg-[#DDF2E4] text-[#117E25]"
                      : "bg-[#FFF6D9] text-[#C99A20]"
                  }`}
                >
                  {profile.status}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#777777]">Commission rate</span>
                <span className="font-semibold text-[#2E2E2E]">{profile.commissionRate}%</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#777777]">Coverage areas</span>
                <span className="text-right text-xs text-[#2E2E2E]">
                  {profile.coverageAreas.join(", ")}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#777777]">Member since</span>
                <span className="text-[#2E2E2E]">
                  {new Date(profile.joinedAt).toLocaleDateString("en-GB", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <Link
              href="/hunter/profile"
              className="mt-4 flex items-center justify-center gap-1.5 rounded-[6px] border border-[#DDDDDD] py-2 text-sm font-medium text-[#444444] transition hover:border-[#1E5A4F] hover:text-[#1E5A4F]"
            >
              <span>✏️</span> Edit Profile
            </Link>
          </Surface>

          {/* earnings summary */}
          <Surface>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-[#2E2E2E]">Earnings (6 months)</h2>
              <Link
                href="/hunter/earnings"
                className="text-xs font-medium text-[#1E5A4F] hover:underline"
              >
                Full report →
              </Link>
            </div>
            <div className="space-y-2">
              {earningsHistory.map((e) => (
                <EarningsBar key={e.label} label={e.label} amount={e.amount} max={maxEarning} />
              ))}
            </div>
            <div className="mt-4 rounded-[6px] bg-[#EAF3F0] p-3">
              <p className="text-xs text-[#777777]">Pending payout</p>
              <p className="text-lg font-bold text-[#1E5A4F]">
                {formatNaira(profile.pendingEarnings)}
              </p>
              <p className="text-xs text-[#777777]">Released after escrow confirmation</p>
            </div>
          </Surface>

          {/* tier progression */}
          <Surface>
            <h2 className="mb-3 font-semibold text-[#2E2E2E]">Tier Progression</h2>
            <div className="space-y-3">
              {(
                [
                  { tier: "STARTER", label: "Starter", range: "0 – 5 matches", active: profile.tier === "STARTER" },
                  { tier: "PRO", label: "Pro", range: "6 – 20 matches", active: profile.tier === "PRO" },
                  { tier: "ELITE", label: "Elite", range: "21+ matches", active: profile.tier === "ELITE" },
                ] as const
              ).map((t) => (
                <div
                  key={t.tier}
                  className={`flex items-center justify-between rounded-[6px] px-3 py-2 text-sm ${
                    t.active
                      ? "border border-[#1E5A4F] bg-[#EAF3F0]"
                      : "border border-[#EEEEEE] bg-white"
                  }`}
                >
                  <div>
                    <p className={`font-semibold ${t.active ? "text-[#1E5A4F]" : "text-[#777777]"}`}>
                      {t.label}
                      {t.active && (
                        <span className="ml-2 text-[10px] font-normal uppercase tracking-wide text-[#117E25]">
                          Current
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-[#777777]">{t.range}</p>
                  </div>
                  <TierBadge tier={t.tier} />
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-[#777777]">
              Higher tiers unlock priority listing access and increased commission rates.
            </p>
          </Surface>

          {/* quick actions */}
          <Surface>
            <p className="mb-3 font-semibold text-[#2E2E2E]">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              <QuickAction icon="🏘️" label="Browse Listings" href="/hunter/listings" />
              <QuickAction icon="👥" label="Add Lead" href="/hunter/leads/new" />
              <QuickAction icon="💰" label="Earnings" href="/hunter/earnings" />
              <QuickAction icon="💬" label="Messages" href="/hunter/messages" />
            </div>
          </Surface>
        </div>
      </div>

      {/* ── how commission works ─────────────────────────────────────────── */}
      <Surface>
        <h2 className="mb-4 font-semibold text-[#2E2E2E]">How Your Commission Works</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: "1",
              title: "Add a Tenant Lead",
              desc: "Register a tenant looking for a property. Enter their budget, preferred location, and requirements.",
              icon: "👤",
            },
            {
              step: "2",
              title: "Match to a Listing",
              desc: "Browse verified landlord listings and connect your tenant to the right property inside the platform.",
              icon: "🔗",
            },
            {
              step: "3",
              title: "Facilitate the Inspection",
              desc: "Coordinate the property inspection between landlord and tenant. All done in-app — no offline fees.",
              icon: "🏠",
            },
            {
              step: "4",
              title: "Earn Commission",
              desc: "Once the lease is signed and escrow is released, your commission is calculated and paid automatically.",
              icon: "💳",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="flex flex-col gap-2 rounded-[8px] border border-[#EEEEEE] bg-white p-4"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E5A4F] text-xs font-bold text-white">
                  {s.step}
                </span>
                <span className="text-xl">{s.icon}</span>
              </div>
              <p className="text-sm font-semibold text-[#2E2E2E]">{s.title}</p>
              <p className="text-xs text-[#777777]">{s.desc}</p>
            </div>
          ))}
        </div>
      </Surface>

      {/* ── pipeline stats summary ──────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[8px] border border-[#EEEEEE] bg-[#FAFAF8] p-4 text-center">
          <p className="text-2xl font-bold text-[#2E2E2E]">{activeConnections}</p>
          <p className="mt-1 text-xs text-[#777777] uppercase tracking-wide">Active Connections</p>
        </div>
        <div className="rounded-[8px] border border-[#EEEEEE] bg-[#FAFAF8] p-4 text-center">
          <p className="text-2xl font-bold text-[#2E2E2E]">{leaseSigned + commissionPaid}</p>
          <p className="mt-1 text-xs text-[#777777] uppercase tracking-wide">Closed Leases</p>
        </div>
        <div className="rounded-[8px] border border-[#EEEEEE] bg-[#FAFAF8] p-4 text-center">
          <p className="text-2xl font-bold text-[#1E5A4F]">
            {formatNaira(profile.totalEarnings)}
          </p>
          <p className="mt-1 text-xs text-[#777777] uppercase tracking-wide">Lifetime Earnings</p>
        </div>
      </div>

      {/* ── demo notice ─────────────────────────────────────────────────── */}
      {usingMock && (
        <div className="rounded-[8px] border border-[#F0D9A8] bg-[#FFF6D9] px-4 py-3 text-xs text-[#C99A20]">
          <strong>Demo data shown</strong> — Hunter API not yet connected. Data resets on reload.
        </div>
      )}
    </div>
  );
}
