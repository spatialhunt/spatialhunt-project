"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader, Surface, Button } from "@/component/ui/Primitives";
import { KpiCard } from "@/component/shared/KpiCard";
import {
  PropertyStatusBadge,
  VerificationStatusBadge,
  InspectionStatusBadge,
} from "@/component/verification/StatusBadges";
import { LoadingState, SkeletonBlock } from "@/component/shared/AppStates";
import { CompactPropertyCard } from "@/component/property/CompactPropertyCard";
import { propertyService } from "@/lib/services/property.service";
import { verificationService } from "@/lib/services/verification.service";
import { inspectionService } from "@/lib/services/inspection.service";
import { useAuthSession } from "@/lib/use-auth-session";
import {
  MOCK_PROPERTIES,
  MOCK_BOOKINGS,
  MOCK_CONVERSATIONS,
  MOCK_VERIFICATIONS,
  MOCK_ESCROWS,
  formatNaira,
} from "@/mocks";
import type { Property, Verification, Booking } from "@/lib/types";

// ─── status dot ──────────────────────────────────────────────────────────────
function StatusDot({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${active ? "bg-[#117E25]" : "bg-[#C58D16]"}`}
    />
  );
}

// ─── tab bar ─────────────────────────────────────────────────────────────────
type Tab = "enquiries" | "applications" | "messages";

function TabBar({
  active,
  onChange,
  counts,
}: {
  active: Tab;
  onChange: (t: Tab) => void;
  counts: Record<Tab, number>;
}) {
  const tabs: { id: Tab; label: string }[] = [
    { id: "enquiries",    label: "My Enquiries" },
    { id: "applications", label: "My Applications" },
    { id: "messages",     label: "Messages" },
  ];
  return (
    <div className="flex overflow-x-auto border-b border-[#EEEEEE]">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={[
            "relative whitespace-nowrap px-3 py-2.5 text-sm font-medium transition-colors sm:px-4",
            active === t.id
              ? "text-[#1E5A4F] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-t-full after:bg-[#1E5A4F]"
              : "text-[#777777] hover:text-[#2E2E2E]",
          ].join(" ")}
        >
          {t.label}
          {counts[t.id] > 0 && (
            <span className="ml-1.5 rounded-full bg-[#F4B942] px-1.5 py-0.5 text-[10px] font-bold text-[#1E5A4F]">
              {counts[t.id]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// ─── enquiry row ─────────────────────────────────────────────────────────────
type EnquiryStatus = "Active" | "Responded" | "Closed";
type PartyStatus   = "Active" | "Pending";

function EnquiryRow({
  id, property, landlordName, landlordStatus, enquiryDate, status,
}: {
  id: string;
  property: string;
  landlordName: string;
  landlordStatus: PartyStatus;
  enquiryDate: string;
  status: EnquiryStatus;
}) {
  const statusColor: Record<string, string> = {
    Active:    "bg-[#DDF2E4] text-[#117E25]",
    Responded: "bg-[#EAF3F0] text-[#1E5A4F]",
    Closed:    "bg-[#E5E5E5] text-[#555555]",
  };
  return (
    <div className="flex flex-col gap-2 border-b border-[#F0F0F0] py-3 last:border-0 sm:flex-row sm:items-center sm:gap-3">
      <div className="flex flex-1 flex-col gap-0.5">
        <p className="text-sm font-medium text-[#2E2E2E]">{property}</p>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#777777]">
          <span className="flex items-center gap-1">
            <span className={`h-1.5 w-1.5 rounded-full ${landlordStatus === "Active" ? "bg-[#117E25]" : "bg-[#C58D16]"}`} />
            {landlordName}
          </span>
          <span>·</span>
          <span>Enquired {enquiryDate}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`rounded-[5px] px-2.5 py-1 text-xs font-semibold ${statusColor[status]}`}>
          {status}
        </span>
        <Link
          href={`/landlord/inquiries/${id}`}
          className="rounded-[5px] border border-[#DDDDDD] px-3 py-1 text-xs font-semibold text-[#444444] hover:border-[#1E5A4F] hover:text-[#1E5A4F]"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

// ─── activity item ────────────────────────────────────────────────────────────
function ActivityItem({
  icon, text, sub, time,
}: {
  icon: string; text: string; sub?: string; time: string;
}) {
  const iconMap: Record<string, string> = {
    message: "💬", enquiry: "🔍", application: "📋",
    payment: "💳", verification: "✅", listing: "🏠",
  };
  return (
    <div className="flex items-start gap-3 border-b border-[#F0F0F0] py-2.5 last:border-0">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF3F0] text-sm">
        {iconMap[icon] ?? "📌"}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-[#2E2E2E]">{text}</p>
        {sub && <p className="text-xs text-[#777777]">{sub}</p>}
      </div>
      <p className="shrink-0 text-xs text-[#AAAAAA]">{time}</p>
    </div>
  );
}

// ─── quick action ─────────────────────────────────────────────────────────────
function QuickAction({ icon, label, href }: { icon: string; label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-2 rounded-[8px] border border-[#EEEEEE] bg-white p-3 text-center transition hover:border-[#1E5A4F] hover:bg-[#F1F7F5]"
    >
      <span className="text-2xl" aria-hidden>{icon}</span>
      <span className="text-xs font-medium text-[#2E2E2E]">{label}</span>
    </Link>
  );
}

// ─── skeleton grid for recommended listings ───────────────────────────────────
function RecommendedSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="overflow-hidden rounded-[8px] border border-[#EEEEEE] bg-white">
          <SkeletonBlock className="h-40 w-full rounded-none" />
          <div className="space-y-2 p-4">
            <SkeletonBlock className="h-4 w-3/4" />
            <SkeletonBlock className="h-3 w-1/2" />
            <SkeletonBlock className="h-4 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────
export default function LandlordDashboardPage() {
  const session = useAuthSession();

  // my listings + verifications + inspections (landlord-scoped, auth-gated)
  const [listings,       setListings]       = useState<Property[]>([]);
  const [verifications,  setVerifications]  = useState<Verification[]>([]);
  const [inspections,    setInspections]    = useState<Booking[]>([]);

  // verified public listings to recommend
  const [recommended,       setRecommended]       = useState<Property[]>([]);
  const [recommendedLoading, setRecommendedLoading] = useState(true);

  const [loading,   setLoading]   = useState(true);
  const [usingMock, setUsingMock] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("enquiries");

  const firstName  = session?.fullName?.split(" ")[0] ?? "Landlord";
  const memberSince = "August 1, 2020";
  const email      = session?.email ?? "—";

  // ── fetch landlord-scoped data ────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [mine, vers, insp] = await Promise.all([
          propertyService.getMine(),
          verificationService.getMine(),
          inspectionService.getLandlord(),
        ]);
        if (cancelled) return;
        setListings(mine);
        setVerifications(vers);
        setInspections(insp);
      } catch {
        if (cancelled) return;
        setListings(MOCK_PROPERTIES.filter((p) => p.ownerId === "landlord-1"));
        setVerifications(MOCK_VERIFICATIONS.filter((v) => v.userId === "landlord-1"));
        setInspections(MOCK_BOOKINGS);
        setUsingMock(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => { cancelled = true; };
  }, []);

  // ── fetch public verified listings for "Recommended" grid ────────────────
  useEffect(() => {
    let cancelled = false;
    propertyService
      .getProperties({ city: "Lagos" })
      .then((data) => {
        if (cancelled) return;
        setRecommended(data.filter((p) => p.status === "VERIFIED").slice(0, 6));
      })
      .catch(() => {
        if (cancelled) return;
        setRecommended(MOCK_PROPERTIES.filter((p) => p.status === "VERIFIED").slice(0, 6));
      })
      .finally(() => { if (!cancelled) setRecommendedLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading) return <LoadingState title="Loading dashboard" />;

  // ── derived stats ─────────────────────────────────────────────────────────
  const activeListings  = listings.filter((p) => p.status !== "DRAFT").length;
  const activeEnquiries = MOCK_CONVERSATIONS.length;
  const applications    = 5;
  const messages        = MOCK_CONVERSATIONS.reduce((s, c) => s + (c.unreadCount ?? 0), 0);
  const rentPayments    = MOCK_ESCROWS.filter((e) => e.status === "RELEASED").length;
  const isVerified      = verifications.some((v) => v.status === "APPROVED");
  const trustStatus     = isVerified
    ? "Verified"
    : verifications.some((v) => v.status === "PENDING")
      ? "Pending review"
      : "Not verified";

  // ── mock tab data ─────────────────────────────────────────────────────────
  const mockEnquiries = [
    { id: "enq-1", property: "2 Bedroom Apartment",  landlordName: "Mr. Johnson",  landlordStatus: "Active" as const,  enquiryDate: "Aug 18, 2026", status: "Active" as const },
    { id: "enq-2", property: "3 Bedroom Apartment",  landlordName: "Mrs. Adeyemi", landlordStatus: "Active" as const,  enquiryDate: "Aug 28, 2026", status: "Responded" as const },
    { id: "enq-3", property: "Mini Flat",             landlordName: "Mr. Ibrahim",  landlordStatus: "Pending" as const, enquiryDate: "Aug 30, 2026", status: "Closed" as const },
  ];
  const mockApplications = [
    { id: "app-1", property: "2 Bedroom Apartment", landlordName: "Mr. Johnson", landlordStatus: "Active" as const, enquiryDate: "Sep 1, 2026", status: "Active" as const },
  ];
  const mockMessages = MOCK_CONVERSATIONS.map((c) => ({
    id: c.id,
    property: c.propertyTitle ?? "Property",
    landlordName: c.counterpartName ?? "Tenant",
    landlordStatus: "Active" as const,
    enquiryDate: c.updatedAt
      ? new Date(c.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
      : "—",
    status: "Active" as const,
  }));

  const tabData: Record<Tab, typeof mockEnquiries> = {
    enquiries:    mockEnquiries,
    applications: mockApplications,
    messages:     mockMessages,
  };
  const tabCounts: Record<Tab, number> = {
    enquiries: activeEnquiries, applications, messages,
  };

  const recentActivity = [
    { icon: "message",     text: "You sent a message to Mr. Adewale Johnson",               sub: undefined,                          time: "30 mins ago"  },
    { icon: "enquiry",     text: "You made an enquiry on Mr. Adewale Sulaimon",              sub: undefined,                          time: "1 hour ago"   },
    { icon: "application", text: "Your application was viewed by Mr. Adewale Johnson",       sub: undefined,                          time: "3 hours ago"  },
    { icon: "listing",     text: "You saved a property",                                     sub: "3 Bedroom Apartment, Lekki",       time: "1 hour ago"   },
  ];

  return (
    <div className="space-y-6">

      {/* ── welcome + account overview (2-col on lg+) ─────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_300px]">

        {/* ── LEFT ──────────────────────────────────────────────────────────── */}
        <div className="space-y-5">

          {/* welcome banner */}
          <div className="rounded-[8px] border border-[#EEEEEE] bg-[#FAFAF8] px-4 py-4 sm:px-5">
            <p className="text-xs text-[#777777]">Here&apos;s what&apos;s happening with your account today</p>
            <h1 className="mt-0.5 text-base font-bold text-[#2E2E2E] sm:text-lg">
              Welcome back, {firstName}!
            </h1>

            {/* stat tiles — 2 cols on mobile, 5 on sm+ */}
            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-5 sm:gap-3">
              {[
                { label: "Saved Properties", value: activeListings, href: "/landlord/listings"     },
                { label: "Active Enquiries", value: activeEnquiries, href: "/landlord/inquiries"   },
                { label: "Applications",      value: applications,   href: "/landlord/applications" },
                { label: "Messages",          value: messages,       href: "/landlord/messages"     },
                { label: "Rent Payments",     value: rentPayments,   href: "/landlord/payments"     },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="flex flex-col items-center rounded-[8px] border border-[#EEEEEE] bg-white p-3 text-center transition hover:border-[#1E5A4F]"
                >
                  <span className="text-xl font-bold text-[#2E2E2E]">{s.value}</span>
                  <span className="mt-0.5 text-[10px] leading-tight text-[#777777] sm:text-xs">
                    {s.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* recommended listings — uses CompactPropertyCard, live data */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold text-[#2E2E2E]">Recommended for You</p>
              <Link href="/properties" className="text-xs font-medium text-[#1E5A4F] hover:underline">
                View all
              </Link>
            </div>

            {recommendedLoading ? (
              <RecommendedSkeleton />
            ) : recommended.length === 0 ? (
              <p className="rounded-[8px] border border-dashed border-[#EEEEEE] py-8 text-center text-sm text-[#777777]">
                No verified listings available right now.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {recommended.slice(0, 6).map((p) => (
                  <CompactPropertyCard key={p.id} property={p} />
                ))}
              </div>
            )}
          </div>

          {/* enquiries / applications / messages tabs */}
          <Surface className="!p-0 overflow-hidden">
            <TabBar active={activeTab} onChange={setActiveTab} counts={tabCounts} />
            <div className="p-4">
              {tabData[activeTab].length === 0 ? (
                <p className="py-6 text-center text-sm text-[#777777]">No {activeTab} yet.</p>
              ) : (
                tabData[activeTab].map((row) => <EnquiryRow key={row.id} {...row} />)
              )}
              <div className="mt-3 flex justify-end">
                <Link
                  href={`/landlord/${activeTab === "enquiries" ? "inquiries" : activeTab}`}
                  className="text-xs font-medium text-[#1E5A4F] hover:underline"
                >
                  View all {activeTab} →
                </Link>
              </div>
            </div>
          </Surface>
        </div>

        {/* ── RIGHT ─────────────────────────────────────────────────────────── */}
        <div className="space-y-5">

          {/* account overview */}
          <Surface>
            <p className="mb-3 font-semibold text-[#2E2E2E]">Account Overview</p>
            <div className="space-y-2.5 text-sm">
              {[
                {
                  label: "Account Status",
                  value: (
                    <span className={`rounded-[5px] px-2.5 py-1 text-xs font-semibold ${isVerified ? "bg-[#DDF2E4] text-[#117E25]" : "bg-[#FFF6D9] text-[#C99A20]"}`}>
                      {isVerified ? "Active" : "Unverified"}
                    </span>
                  ),
                },
                { label: "Member Since", value: <span className="text-[#2E2E2E]">{memberSince}</span> },
                { label: "Email",        value: <span className="max-w-[140px] truncate text-[#2E2E2E]">{email}</span> },
                {
                  label: "Trust Status",
                  value: (
                    <span className="flex items-center gap-1.5 text-[#2E2E2E]">
                      <StatusDot active={isVerified} />
                      {trustStatus}
                    </span>
                  ),
                },
              ].map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-2">
                  <span className="shrink-0 text-[#777777]">{row.label}</span>
                  {row.value}
                </div>
              ))}
            </div>
            <Link
              href="/landlord/profile"
              className="mt-4 flex items-center justify-center gap-1.5 rounded-[6px] border border-[#DDDDDD] py-2 text-sm font-medium text-[#444444] transition hover:border-[#1E5A4F] hover:text-[#1E5A4F]"
            >
              <span aria-hidden>✏️</span> Edit Profile
            </Link>
          </Surface>

          {/* verification prompt */}
          {!isVerified && (
            <div className="rounded-[8px] border border-[#F0D9A8] bg-[#FFF6D9] p-4">
              <p className="text-sm font-semibold text-[#C99A20]">Complete Verification</p>
              <p className="mt-1 text-xs text-[#777777]">
                Verify your ID and property documents to unlock the Verified badge.
              </p>
              <Link href="/landlord/verification">
                <Button variant="amber" className="mt-3 w-full text-xs">
                  Start Verification
                </Button>
              </Link>
            </div>
          )}

          {/* recent activity */}
          <Surface>
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold text-[#2E2E2E]">Recent Activity</p>
              <Link href="/landlord/notifications" className="text-xs font-medium text-[#1E5A4F] hover:underline">
                View all
              </Link>
            </div>
            {recentActivity.map((a, i) => <ActivityItem key={i} {...a} />)}
          </Surface>

          {/* quick actions */}
          <Surface>
            <p className="mb-3 font-semibold text-[#2E2E2E]">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              <QuickAction icon="🏠" label="Find a Home"         href="/properties" />
              <QuickAction icon="📋" label="List Your Property"  href="/landlord/listings/new" />
              <QuickAction icon="💬" label="Messages"            href="/landlord/messages" />
              <QuickAction icon="❓" label="Help & Support"      href="/landlord/settings" />
            </div>
          </Surface>
        </div>
      </div>

      {/* ── bottom: my listings table + verification + inspections ────────── */}
      <div className="grid gap-5 lg:grid-cols-2">

        <Surface>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-[#2E2E2E]">My Listings</h2>
            <Link
              href="/landlord/listings/new"
              className="rounded-[5px] bg-[#F4B942] px-3 py-1.5 text-xs font-semibold text-[#1E5A4F] hover:brightness-95"
            >
              + New Listing
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#EEEEEE] text-xs text-[#777777]">
                  <th className="pb-2 pr-3 font-medium">Property</th>
                  <th className="pb-2 pr-3 font-medium">Price</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {listings.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-xs text-[#777777]">
                      No listings yet.{" "}
                      <Link href="/landlord/listings/new" className="text-[#1E5A4F] underline">
                        Create your first
                      </Link>
                    </td>
                  </tr>
                ) : (
                  listings.slice(0, 5).map((p) => (
                    <tr key={p.id} className="border-b border-[#EEEEEE] last:border-0">
                      <td className="py-3 pr-3">
                        <Link
                          href={`/landlord/listings/${p.id}`}
                          className="font-medium text-[#1E5A4F] hover:underline"
                        >
                          {p.title}
                        </Link>
                        <p className="text-xs text-[#777777]">{p.city}, {p.state}</p>
                      </td>
                      <td className="py-3 pr-3 text-[#2E2E2E]">{formatNaira(p.price)}</td>
                      <td className="py-3"><PropertyStatusBadge status={p.status} /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {listings.length > 0 && (
            <Link href="/landlord/listings" className="mt-3 inline-block text-xs font-medium text-[#1E5A4F] hover:underline">
              View all listings →
            </Link>
          )}
        </Surface>

        <div className="space-y-5">
          {/* verification status */}
          <Surface>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-[#2E2E2E]">Verification Status</h2>
              <Link href="/landlord/verification" className="text-xs font-medium text-[#1E5A4F] hover:underline">
                Manage →
              </Link>
            </div>
            {verifications.length === 0 ? (
              <p className="text-sm text-[#777777]">
                No verification on file.{" "}
                <Link href="/landlord/verification" className="text-[#1E5A4F] hover:underline">
                  Start now
                </Link>
              </p>
            ) : (
              <ul className="space-y-2.5">
                {verifications.map((v) => (
                  <li key={v.id} className="flex items-center justify-between gap-2 rounded-[6px] bg-white px-3 py-2 text-sm">
                    <span className="text-[#2E2E2E]">
                      {v.type === "LANDLORD_ID" ? "Government ID" : "Property Walkthrough"}
                    </span>
                    <VerificationStatusBadge status={v.status} />
                  </li>
                ))}
              </ul>
            )}
          </Surface>

          {/* upcoming inspections */}
          <Surface>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-[#2E2E2E]">Upcoming Inspections</h2>
              <Link href="/landlord/inspections" className="text-xs font-medium text-[#1E5A4F] hover:underline">
                Manage →
              </Link>
            </div>
            {inspections.length === 0 ? (
              <p className="text-sm text-[#777777]">No scheduled inspections.</p>
            ) : (
              <ul className="space-y-2.5">
                {inspections.map((b) => (
                  <li key={b.id} className="flex items-center justify-between gap-2 rounded-[6px] bg-white px-3 py-2 text-sm">
                    <div>
                      <p className="font-medium text-[#2E2E2E]">{b.property?.title ?? "Property"}</p>
                      <p className="text-xs text-[#777777]">
                        {new Date(b.scheduledAt).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })}
                      </p>
                    </div>
                    <InspectionStatusBadge status={b.status} />
                  </li>
                ))}
              </ul>
            )}
          </Surface>
        </div>
      </div>

      {/* demo notice */}
      {usingMock && (
        <div className="rounded-[8px] border border-[#F0D9A8] bg-[#FFF6D9] px-4 py-3 text-xs text-[#C99A20]">
          <strong>Demo data shown</strong> — live API unavailable. Data resets on reload.
        </div>
      )}

    </div>
  );
}
